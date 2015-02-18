function cmp_hash(a, b)
  if (a.hash < b.hash) then
	cmp_hash = CMP_LESS
  elseif (a.hash > b.hash) then
	cmp_hash = CMP_GREATER
  else
	cmp_hash = CMP_EQUAL
  end if
end function

function PadDigits(n, totaldigits)
	PadDigits = right(string(totaldigits,"0") & hex(n), totaldigits)
end function

public const CMP_LESS = -1
public const CMP_EQU = 0
public const CMP_GREATER = 1

function array_swap0(values, i,j)
	dim temp : set temp = values(i)
	set values(i) = values (j)
	set values(j) = temp
end function


function QSort(byref values, loBound,hiBound)
	dim pivot,loSwap,hiSwap
	if hiBound - loBound = 1 then
		if cmp_hash(values(loBound), values(hiBound)) = CMP_GREATER then
			array_swap0  values,loBound,hiBound
		end if
		exit function
	end If
	dim pivotIndex : pivotIndex = int((loBound + hiBound) / 2)
	set pivot = values(pivotIndex)
	array_swap0 values, pivotIndex, loBound
	loSwap = loBound + 1
	hiSwap = hiBound

	do
		while (loSwap < hiSwap) and (cmp_hash(values(loSwap), pivot) <> CMP_GREATER)
			loSwap = loSwap + 1
		wend
		while (cmp_hash(values(hiSwap), pivot) = CMP_GREATER)
			hiSwap = hiSwap - 1
		wend
		if loSwap < hiSwap then
			array_swap0 values, loSwap, hiSwap
		end If
	loop while loSwap < hiSwap

	set values(loBound) = values(hiSwap)
	set values(hiSwap) = pivot

	if loBound < hiSwap-1 then QSort values, loBound, hiSwap-1
	if hiSwap+1 < hibound then QSort values, hiSwap+1, hiBound
end function

function StartSort(byref values, size)
	if UBound(values) < 1 then exit function
	QSort values, LBound(values), size
end function

class lineobj
  public hash
  public line
end class

function binary32(val)
  while val > 4294967295
	val = val - 4294967296
  wend
  binary32 = val
end function

function binary24(val)
  while val > 16777215
	val = val - 16777216
  wend
  binary24 = val
end function

'option explicit

dim dev_id,inf_path,dev_name,inf_name,drv_date,drv_version
dim strings

dim file_dir
dim dir
dim tab,output
dim catpresent

dim starttime,point1

dim r_beg,r_date,r_version
dim r_identS,r_str,r_strORind,r_subs
dim regex_mansect,regex_strsect,regex_version,regex_devs_l,regex_devs_r
dim regex_devid,regex_mandef,regex_devdef,regex_strings,regex_sectnames

dim lines(1000000)
dim hash(1000000)
dim numlines

'dim HashOutput,Hashtest
dim indexFile
dim hashFile

numlines = 0
file_dir = WScript.Arguments.Item(0)
dir = WScript.Arguments.Item(1) & "\"
temp_drp = WScript.Arguments.Item(2) & "\"

tab = chr(9)
output = ""

WScript.Echo "dir: " & dir
starttime = timer
point1 = starttime

r_beg = "^[ \t]*"
r_date =		  "(%[^%]*%|(?:[\w/ ])+)"
r_version = 	  "(%[^%]*%|(?:[\w/ .])+)"

r_identS = "([^; \t\r\n][^;\t\r\n]*[^; \t\r\n])"
r_str = "(?:""([^\r\n""]*)""|([^\r\n;]*))"

' %var%   "str"   text
r_strORind = "(?:%([^%\r\n]+)%|""([^\r\n]+)""|([^;=\r\n]+))"

'r_subs = "(?:&(?:VEN_....|DEV_....|PID_....|SUBCLASS_..|FW[\w]+|Ozonic|TYP_.|ID_.|FN_..|PCI_........|SUBSYS_\w{8}|FireDTV_[\w/]+))*"
r_subs = "(?:&(?:[\w/]+))*"

' sections
regex_mansect = r_beg & "\[Manufacturer\](?:([\s\S]*?)" & r_beg & "(?=\[)|([\s\S]*))"
regex_strsect = r_beg & "\[strings\](?:([\s\S]*?)" & r_beg & "(?=\[)|([\s\S]*))"
regex_version = r_beg & "\[Version\][\s\S]*?^[ \t]*DriverVer[ \t]*=[ \t]*" & r_date & "(?:[ \t]*,[ \t]*" & r_version & ")?"
regex_devs_l  = "^[ \t]*" & "\[("
regex_devs_r  = ")\](?:([\s\S]*?)" & r_beg & "(?=\[)|([\s\S]*))"

' ,ID,ID, ...
regex_devid   = ",[ \t]*""?([^ \t\r\n,][^ \t\r\n&,]+" & r_subs & ")"

' name = sectname,suffix,suffix,...
regex_mandef  = r_beg & "[^;\r\n=]*=[ \t]*([^;\r\n]*)"

' name = driver,ID,ID,...
regex_devdef  = r_beg & r_strORind & "[^=\r\n]*=[^\r\n,]*" & "([^;\r\n]*)"

' variable = "str"
regex_strings = r_beg & r_identS & "[ \t]*=[ \t]*" & r_str

regex_sectnames = "(?:,?[ \t]*""([^""\r\n]+)""|,?[ \t]*([^,\t\r\n;]+[^,\t\r\n ;]))"

WScript.Echo "regex_version " & regex_version
WScript.Echo "regex_mansect " & regex_mansect
WScript.Echo "regex_strsect " & regex_strsect
WScript.Echo "regex_strings " & regex_strings
WScript.Echo "regex_devid   " & regex_devid
WScript.Echo "regex_devdef  " & regex_devdef

set HashOutput = CreateObject ("Scripting.Dictionary")
set Hashtest = CreateObject ("Scripting.Dictionary")
HashOutput.CompareMode = 1
set indexFile = CreateObject("Scripting.FileSystemObject").CreateTextFile(temp_drp & "result" & file_dir & ".txt", true)
indexFile.Write("Version5;" & VbCrLf)

On Error resume next
set listFile = CreateObject("Scripting.FileSystemObject").OpenTextFile(temp_drp & "list" & file_dir & ".txt",1,false,-2)
set list7z = CreateObject("Scripting.FileSystemObject").OpenTextFile(temp_drp & "list7z.txt",1,false,-2)
list7zcontent = UCase(list7z.ReadAll)

if Err.Number<>0 then
	WScript.Echo "Cannot read the driver list." & VbCrLf & "Disk may be writeprotected or file is corrupted."
else
	' Init regexps
	set RegExpStrSect = CreateObject("VBScript.RegExp")
	RegExpStrSect.Pattern = regex_strsect
	RegExpStrSect.Multiline = true
	RegExpStrSect.IgnoreCase = true
	RegExpStrSect.Global = false ' Note: "XP Alternative (by Greg)\D\3\M\A\12\prime.inf" has two [strings] sections

	set RegExpStrDefs = CreateObject("VBScript.RegExp")
	RegExpStrDefs.Pattern = regex_strings
	RegExpStrDefs.Multiline = true
	RegExpStrDefs.IgnoreCase = true
	RegExpStrDefs.Global = true

	set RegExpVerSect = CreateObject("VBScript.RegExp")
	RegExpVerSect.Pattern = regex_version
	RegExpVerSect.Multiline = true
	RegExpVerSect.IgnoreCase = true
	RegExpVerSect.Global = false

	set RegExpManSect = CreateObject("VBScript.RegExp")
	RegExpManSect.Pattern = regex_mansect
	RegExpManSect.Multiline = true
	RegExpManSect.IgnoreCase = true
	RegExpManSect.Global = false

	set RegExpManDef = CreateObject("VBScript.RegExp")
	RegExpManDef.Pattern = regex_mandef
	RegExpManDef.Multiline = true
	RegExpManDef.IgnoreCase = true
	RegExpManDef.Global = true

	set RegManID = CreateObject("VBScript.RegExp")
	RegManID.Pattern = regex_sectnames
	RegManID.Multiline = true
	RegManID.IgnoreCase = true
	RegManID.Global = true

	set RegExpDevDef = CreateObject("VBScript.RegExp")
	RegExpDevDef.Pattern = regex_devdef
	RegExpDevDef.Multiline = true
	RegExpDevDef.IgnoreCase = true
	RegExpDevDef.Global = true

	set RegExpDevID = CreateObject("VBScript.RegExp")
	RegExpDevID.Pattern = regex_devid
	RegExpDevID.IgnoreCase = true
	RegExpDevID.Global = true

	set RegExpDevSect = CreateObject("VBScript.RegExp")
	'RegExpDevSect.Pattern = regex_devs_l & sectlist & regex_devs_r
	RegExpDevSect.Multiline = true
	RegExpDevSect.IgnoreCase = true
	RegExpDevSect.Global = true

	' Read the list of paths of INF files
	do until listFile.AtEndOfStream
		inf_fullname = listFile.Readline
		inf_name = inf_fullname
		inf_path = Left(inf_fullname, InStrRev(inf_fullname,"\"))
		inf_path = Replace(inf_path,dir,"",1,-1,1)
		inf_name = Replace(inf_fullname,dir,"",1,-1,1)
		inf_filename_l = inf_name
		inf_filename_l = Replace(inf_filename_l,"inf","cat",1,-1,1)
		inf_filename_l = Ucase(inf_filename_l)
		inf_name = Replace(inf_name,inf_path,"",1,-1,1)
		WScript.Echo "inf_fullname:" & inf_fullname
		'WScript.Echo "inf_path:" & inf_path
		WScript.Echo "inf_name:" & inf_filename_l
'       	 WScript.Echo list7zcontent
		if inStr(list7zcontent,inf_filename_l) then
			catpresent = 1
			WScript.Echo "+++"
		else
			catpresent = 0
			WScript.Echo "---"
		end if
																									'WScript.Echo "1 " & timer-point1
																									point1 = timer
																									point2 = point1
		' Read INF file
		filecontent = ""
		set objInfFile = CreateObject("Scripting.FileSystemObject").OpenTextFile(inf_fullname,1,false,-2)
		filecontent = objInfFile.ReadAll()
		objInfFile.Close
																									'WScript.Echo "2 " & timer-point1
																									point1 = timer
		' Find [strings] section
		strings = ""
		set stringhash = CreateObject("Scripting.Dictionary")
		stringhash.CompareMode = 1
		set MatchesStrSect = RegExpStrSect.Execute(filecontent)
		if MatchesStrSect.Count>=1 then
			set objMatch = MatchesStrSect.Item(0)
			strings = objMatch.SubMatches(0) & objMatch.SubMatches(1)
			set MatchesStrDefs = RegExpStrDefs.Execute(strings)
			for i=0 To MatchesStrDefs.Count-1
				set objMatch = MatchesStrDefs.Item(i)
				key = objMatch.SubMatches(0)
				value = objMatch.SubMatches(1)
				if value = "" then value = objMatch.SubMatches(2)
				stringhash.add key, value
				stringhash.add "%"&key&"%", value
			next
		end if
																									'WScript.Echo "3 " & timer-point1
																									point1 = timer
		' Find [version] section
		unkver = 0
		set MatchesVerSect = RegExpVerSect.Execute(filecontent)
		if MatchesVerSect.Count>=1 then
			set objMatch = MatchesVerSect.Item(0)
			drv_date = objMatch.SubMatches(0)
			if InStr(drv_date,"%") then
				varname = Left(drv_date, InStrRev(drv_date,"%"))
				val = stringhash.item(varname)
				if val = "" then
					WScript.Echo "Cannot find '" & varname & "'"
				else
					drv_date = replace(drv_date,varname,val)
				end if
			end if
			drv_version = objMatch.SubMatches(1)
			if InStr(drv_version,"%") then
				varname = Left(drv_version, InStrRev(drv_version,"%"))
				val = stringhash.item(varname)
				if val = "" then
					WScript.Echo "Cannot find '" & varname & "'"
				else
					drv_version = replace(drv_version,varname,val)
				end if
			end if
'   		 WScript.Echo drv_version
		else
			'WScript.Echo "Section [version] not found"
			drv_date = ""
			drv_version = ""
		end if
																									'WScript.Echo "4 " & timer-point1
																									point1 = timer
		' Find [manufacturer] section
		set MatchesManSect = RegExpManSect.Execute(filecontent)
		if MatchesManSect.Count>=1 then
			set objMatch = MatchesManSect.Item(0)
			sections = objMatch.SubMatches(0) & objMatch.SubMatches(1)
			sectlist = ""
			set MatchesManDef = RegExpManDef.Execute(sections)
			for i=0 To MatchesManDef.Count-1
				set objMatch = MatchesManDef.Item(i)
				ss= objMatch.SubMatches(0)
				set MatchesManID = RegManID.Execute(ss)
				basename=""
				'found =0
				for j=0 To MatchesManID.Count-1
					set objMatch1 = MatchesManID.Item(j)
					sb= objMatch1.SubMatches(0) & objMatch1.SubMatches(1)
					sb = rtrim(sb)
					'WScript.Echo sb
					if i<>0 or j<>0 then
						sectlist = sectlist & "|"
					end if
					sectname=""
					if j=0 then
						basename = sb
						sectlist = sectlist&sb
						sectname = sb
					else
						sectlist = sectlist& basename&"."&sb
'   					 WScript.Echo "*"&sectlist
						'found = 1
					end if

					'set RegManTest = CreateObject("VBScript.RegExp")
					'RegManTest.Pattern = r_beg & "\[(?:"&sectname &")\](?:([\s\S]*?)" & r_beg & "(?=\[)|([\s\S]*))"
					'RegManTest.Multiline = true
					'RegManTest.IgnoreCase = true
					'RegManTest.Global = false
					'set MatchesManTest = RegManTest.Execute(filecontent)
					'if MatchesManTest.Count=0 and sectname<>"" and MatchesManID.Count=1 then
					'    WScript.Echo "$$"&sectname
					'end if
					'WScript.Echo "|" & sb
				next ' man_ids
			next	 ' man_defs

'   		 set RegExpDevSect = CreateObject("VBScript.RegExp")
			RegExpDevSect.Pattern = regex_devs_l & sectlist & regex_devs_r
'   		 RegExpDevSect.Multiline = true
'   		 RegExpDevSect.IgnoreCase = true
'   		 RegExpDevSect.Global = true
			set MatchesDevSect = RegExpDevSect.Execute(filecontent)
			for k=0 To MatchesDevSect.Count-1
				set objMatch = MatchesDevSect.Item(k)
				thissection = objMatch.SubMatches(1) & objMatch.SubMatches(2)
				arch = objMatch.SubMatches(0)
				' Find device definitions
				defenitionlist = ""
				set MatchesDevDef = RegExpDevDef.Execute(thissection)
				' Handle definition
				for i=0 To MatchesDevDef.Count-1
					set objMatch = MatchesDevDef.Item(i)
					dev_ids = objMatch.SubMatches(3)
					' Find name
					if objMatch.SubMatches(0)<>"" then ' %var%
						dev_name = stringhash.item(objMatch.SubMatches(0))
						if dev_name = "" then
							dev_name = "Variable: " & objMatch.SubMatches(0)
						end if
'   					 dev_name = objMatch.SubMatches(0)
'   					 pos = InStr(dev_name,"%")
'   					 if pos>0 then
'   						 varname = mid(dev_name, pos, InStrRev(dev_name,"%"))
'   						 'replace(dev_name,varname,val)
'   						 'WScript.Echo  "##"&varname&"##"
'   						 val = stringhash.item(varname)
'   						 if val = "" then
'   						 WScript.Echo "Cannot find '" & varname & "'"
'   						 else
'   							 dev_name = replace(dev_name,varname,val)
'   						 end if
'   					 end if
					else
						if objMatch.SubMatches(1)<>"" then ' "str"
							dev_name = objMatch.SubMatches(1)
							if asc(mid(dev_name,1,1) = "%") then
								pos = InStr(dev_name,"%")
								if pos>0 then
									varname = mid(dev_name, pos, InStrRev(dev_name,"%"))
									'replace(dev_name,varname,val)
									'WScript.Echo  "##"&varname&"##"
									val = stringhash.item(varname)
									if val = "" then
										WScript.Echo "Cannot find '" & varname & "'"
									else
										dev_name = replace(dev_name,varname,val)
									end if
								end if
							end if
						else
							if objMatch.SubMatches(2)<>"" then  ' text
								dev_name = objMatch.SubMatches(2)
								pos = InStr(dev_name,"%")
								if pos>0 then
									varname = mid(dev_name, pos, InStrRev(dev_name,"%"))
									'replace(dev_name,varname,val)
									'WScript.Echo  "##"&varname&"##"
									val = stringhash.item(varname)
									if val = "" then
										WScript.Echo "Cannot find '" & varname & "'"
									else
										dev_name = replace(dev_name,varname,val)
									end if
								end if
							else
								WScript.Echo "Something messed up really bad in " & inf_fullname
							end if
						end if
					end if

					' add IDs
					set MatchesDevID = RegExpDevID.Execute(dev_ids)
					for j=0 To MatchesDevID.Count-1
						set objMatch = MatchesDevID.Item(j)
						dev_id = objMatch.SubMatches(0)
						if dev_id <> "" then
						ss = dev_id & inf_path & inf_name & dev_name & arch
						r=HashOutput.Exists(ss)
						if r=false then
							HashOutput.item(ss)= "+"
						end if

						if r=false then
							unkver = unkver + 1
							if drv_version="" and drv_date="" then
							ver = "Unknown"
							else
								if drv_version<>"" then
									ver = drv_date & "," & drv_version
								else
									ver = drv_date
								end if
							end if

'   	 h = ((h << 5) + h) ^ ch;

							hashval = 0
							str = ucase(dev_id)
'   						 WScript.Echo str
							for k1 = 1 to len(str)
							  t = asc(mid(str,k1,1))
'   						   hashval = binary24(hashval*2 + t)
							  hashval = (binary24(hashval*32+hashval) xor t)
'   						   WScript.Echo hashval&"("&t&")"
							next

							a = ""
							for k1 = 1 to len(dev_name)
							  t = asc(mid(dev_name,k1,1))
							  a = a + chr(t)
							next

							set lines(numlines) = new lineobj
							lines(numlines).hash = hashval
							lines(numlines).line = dev_id & tab & inf_path & tab & inf_name & tab & arch & tab & catpresent & tab & ver & tab & a & VbCrLf
							numlines = numlines + 1
'   						 indexFile.Write(dev_id & tab & inf_path & tab & inf_name & tab & arch & tab & ver & tab & dev_name & VbCrLf)
						end if ' dev_entry
						end if
					next	   ' dev_ids
				next		   ' dev_defs
			next			   ' dev_sects
		end if  			   ' sect_list
																									'WScript.Echo "5 " & timer-point1
																									point1 = timer
		HashOutput.removeall()
		stringhash.removeall()
		c=point1
		'WScript.Echo "L: " & (c-point2)
		'WScript.Echo "S: " & (c-starttime)
	loop  ' inf list file
end if    ' file read

point1 = timer



numbuckets = round(numlines)
if numbuckets<400 then
  numbuckets = 400
end if
set hashFile = CreateObject("Scripting.FileSystemObject").CreateTextFile(temp_drp & "result" & file_dir & ".hash", true)
VbCrLf_ =""
sp = ""

hashFile.Write(PadDigits((numbuckets),8)&sp)

WScript.Echo "Items:"&numlines&"  Buckets:"&numbuckets
dim buckets(100000)
dim blocks(100000)
for i = 0 to numlines-1
	lines(i).hash = lines(i).hash mod numbuckets
'    lines(i).line = lines(i).hash & " " & lines(i).line
'    WScript.Echo lines(i).line
	buckets(lines(i).hash) = buckets(lines(i).hash) + 1
	blocks(lines(i).hash) = blocks(lines(i).hash) + len(lines(i).line)
next

StartSort lines, numlines-1

lasthash = -1
lastlines = -1
curhs = -1
pos = 11
WScript.Echo "Beg"
for i = 0 to numlines-1
		while lasthash<>lines(i).hash
			lasthash = lasthash + 1
			if lasthash<>lines(i).hash then
			hashFile.Write("00000000"&sp&"00000000"&sp)
			end if
		wend

	if curhs<>lines(i).hash then
		hashFile.Write(PadDigits((pos),8)&sp&PadDigits((blocks(lasthash)),8)&sp&VbCrLf_)
		curhs=lines(i).hash
	end if
	pos = pos + len(lines(i).line)

	indexFile.Write(lines(i).line)
next

for i = lasthash+1 to numbuckets-1
	hashFile.Write("00000000"&sp&"00000000"&sp)
next
WScript.Echo "Done"
listFile.Close
indexFile.Close
hashFile.Close
list7z.Close
WScript.Echo "Sum: " & timer-starttime
