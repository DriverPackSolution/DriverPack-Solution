//// Drivers ////


// PhysX
for (var i = 0; i < buttonCount; i++) {
	if (((button_div[i]=='driver_available')||(button_div[i]=='driver_new')||(button_div[i]=='driver_uptodate'))
			&& (button_pack_desc[i]==synonym_video_nvidia)
			&& (button_dev_name[i].toUpperCase().indexOf('NVIDIA') != -1)){
		
		prog[pn]='NVIDIA PhysX';
		version[pn]='9.14.0702';
		cat[pn]=startpack_Drivers;
		cmd1[pn]='PhysX.exe';
		cmd2[pn]='';
		if (is64){
			check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{8B922CF8-8A6C-41CE-A858-F1755D7F5D29}\\DisplayName';
		} else {
			check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{8B922CF8-8A6C-41CE-A858-F1755D7F5D29}\\DisplayName';
		}
		defaul[pn]=true;
		wshow[pn]=false;
		onCompleteInst[pn]='defaul['+pn+']=false;';
		pn++;
		
		break;
	}
}




//// System ////


// DirectX
prog[pn]='DirectX';
version[pn]='9.0c June 2010';
cat[pn]=startpack_Needs;
cmd1[pn]='DirectX.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\.NETFramework\\AssemblyFolders\\DX_1.0.2911.0\\';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\.NETFramework\\AssemblyFolders\\DX_1.0.2911.0\\';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// SAM CoDeC Pack
prog[pn]='Codec Pack';
version[pn]='5.77';
cat[pn]=startpack_Needs;
cmd1[pn]='SAMCoDeCs.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\SamLab.ws\\SAM CoDeC Pack\\Install_Dir';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\SAM CoDeC Pack\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// AOMEI Backupper
prog[pn]='AOMEI Backupper';
version[pn]='2.2.0';
cat[pn]=startpack_Needs;
cmd1[pn]='Backupper.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09F}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09D}_is1\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Flash Player
prog[pn]='Flash Player';
version[pn]='16.0.0.257';
cat[pn]=startpack_Needs;
cmd1[pn]='FlashPlayer.exe';
cmd2[pn]='-y -gm2 -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\MozillaPlugins\\@adobe.com/FlashPlayer\\Description';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Adobe Flash Player ActiveX\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Shockwave Player
prog[pn]='Shockwave Player';
version[pn]='12.1.6.156';
cat[pn]=startpack_Needs;
cmd1[pn]='Shockwave.exe';
cmd2[pn]='-y -gm2 -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Adobe Shockwave Player + Authorware Web Player\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Adobe Shockwave Player + Authorware Web Player\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// RuntimePack
prog[pn]=(rusLang?'Библиотеки Windows':'System Libraries');
version[pn]='14.4.12';
cat[pn]=startpack_Needs;
cmd1[pn]='RuntimeRun.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\SamLab.ws\\RuntimePack\\Version';
} else {
	check[pn]='HKEY_CURRENT_USER\\Software\\SamLab.ws\\RuntimePack\\Version';
}
defaul[pn]=true;
wshow[pn]=false;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Visual C++
prog[pn]='Microsoft Visual C++';
version[pn]='2005-2013';
cat[pn]=startpack_Needs;
cmd1[pn]='VisualCplus.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
prog_timeout[pn]=300
pn++;


// .Net Framework All
if (OSVersion == 6.1) {
prog[pn]='.Net Framework';
version[pn]='4.5.2';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNet.exe';
cmd2[pn]='';
if (is64){
	check[pn]='';
} else {
	check[pn]='';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// .Net Framework All
if (OSVersion == 6.2) {
prog[pn]='.Net Framework';
version[pn]='4.5.2';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNet.exe';
cmd2[pn]='';
if (is64){
	check[pn]='';
} else {
	check[pn]='';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// .Net Framework All
if (OSVersion == 6.3) {
prog[pn]='.Net Framework';
version[pn]='4.5.2';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNet.exe';
cmd2[pn]='';
if (is64){
	check[pn]='';
} else {
	check[pn]='';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// .Net Framework All
if (OSVersion == 6.4) {
prog[pn]='.Net Framework';
version[pn]='4.5.2';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNet.exe';
cmd2[pn]='';
if (is64){
	check[pn]='';
} else {
	check[pn]='';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// .Net Framework 3.5 для Windows 8.x [x86\x64]
if (OSVersion == 6.3) {
prog[pn]='.Net Framework';
version[pn]='3.5';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNet8.exe';
cmd2[pn]='/ai1';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{1AD147D0-BE0E-3D6C-AC11-64F6DC4163F1}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{1AD147D0-BE0E-3D6C-AC11-64F6DC4163F1}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// .Net FrameWork 1.1-4.0 для Windows XP SP3 [x86]
if (OSVersion == 5.1) {
prog[pn]='.Net FrameWork';
version[pn]='4.0';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNetXP.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{3C3901C5-3455-3E0A-A214-0B093A5070A6}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{3C3901C5-3455-3E0A-A214-0B093A5070A6}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// .Net FrameWork 4.5.2 для Windows 7 SP1 [x86\x64]
if (OSVersion == 6.1) {
prog[pn]='.Net FrameWork';
version[pn]='4.5.2';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNet7.exe';
cmd2[pn]='-y ! NR';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{1AD147D0-BE0E-3D6C-AC11-64F6DC4163F1}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{1AD147D0-BE0E-3D6C-AC11-64F6DC4163F1}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// Silverlight
prog[pn]='Silverlight';
version[pn]='5.1.31211.0';
cat[pn]=startpack_Needs;
cmd1[pn]='Silverlight.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Silverlight\\UpdateMode';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{89F4137D-6C26-4A84-BDB8-2E5A4BB71E00}\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Java
prog[pn]='Java Runtime';
version[pn]='8.0.25';
cat[pn]=startpack_Needs;
cmd1[pn]='Java.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{26A24AE4-039D-4CA4-87B4-2F83218005FF}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{26A24AE4-039D-4CA4-87B4-2F83218005FF}\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;



//// Browsers ////


// Internet Explorer 8 для Windows XP
if (OSVersion == 5.1) {
prog[pn]='Internet Explorer 8';
version[pn]='8.0.7600.16385';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/IE8-XPx86.exe';
cmd2[pn]='/Q';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ie8\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ie8\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// Internet Explorer 10 для Windows 7
if (OSVersion == 6.1) {
prog[pn]='Internet Explorer 10';
version[pn]='10.0.9200.16438';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/IE10-7x'+(is64?'64':'86')+'.exe';
cmd2[pn]='/Q';
if (is64){
check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{B1DDC387-5E2C-4CF4-BD8B-05B65E987B0C}\\DisplayName';
} else {
check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{B1DDC387-5E2C-4CF4-BD8B-05B65E987B0C}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// Chrome
prog[pn]='Google Chrome';
version[pn]='39.0.2171.99';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/Chrome.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome\\DisplayName';
} else {
	check[pn]='HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Яндекс.Браузер
prog[pn]=(rusLang?'Яндекс.Браузер':'Yandex.Browser');
version[pn]='37.0.2062.12521';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/Yandex.exe';
cmd2[pn]='--silent --do-not-launch-browser';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\YandexBrowser\\DisplayName';
} else {
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\YandexBrowser\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


if (rusLang) {
	// Элементы Яндекса
	prog[pn]=(rusLang?'Яндекс.Элементы':'Yandex.Elements');
	version[pn]='7.2';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/YandexPack1.exe';
	cmd2[pn]='/quiet';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;

	// Firefox
	prog[pn]='Mozilla Firefox';
	version[pn]='35.0';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Firefox.exe';
	cmd2[pn]='-ms -ira';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Firefox 35.0 (x86 ru)\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Firefox 35.0 (x86 ru)\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;


	// Opera
	prog[pn]='Opera';
	version[pn]='26.0.1656.60';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/OperaBlink.exe';
	cmd2[pn]='-install -silent -launchopera=1 -setdefaultbrowser=1';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 26.0.1656.60\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 26.0.1656.60\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
}
else {
	// Яндекс.Браузер
	prog[pn]=(rusLang?'Яндекс.Браузер':'Yandex.Browser');
	version[pn]='35.0.1916.15705';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Yandex.exe';
	cmd2[pn]='--silent --do-not-launch-browser';
	if (is64){
		check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\YandexBrowser\\DisplayName';
	} else {
		check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\YandexBrowser\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;


	// Элементы Яндекса
	prog[pn]=(rusLang?'Яндекс.Элементы':'Yandex.Elements');
	version[pn]='7.2';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/YandexPack.exe';
	cmd2[pn]='/quiet';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
	
	
	// Firefox
	prog[pn]='Mozilla Firefox';
	version[pn]='29.0.1';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Firefox.exe';
	cmd2[pn]='-ms -ira';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Firefox 29.0.1 (x86 ru)\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Firefox 29.0.1 (x86 ru)\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
	
	
	// Opera
	prog[pn]='Opera';
	version[pn]='21.0.1432.67';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Opera.exe';
	cmd2[pn]='-install -silent';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 21.0.1432.67\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 21.0.1432.67\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
}




//// Files ////


// 7-Zip
prog[pn]='7-Zip';
version[pn]='9.38';
cat[pn]=startpack_Files;
cmd1[pn]='Files/7-Zip.exe';
cmd2[pn]='-aixy -fm0 -gm2';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\SOFTWARE\\7-Zip\\Path64';
} else {
	check[pn]='HKEY_CURRENT_USER\\SOFTWARE\\7-Zip\\Path';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// BurnAware
prog[pn]='BurnAware';
version[pn]='7.8';
cat[pn]=startpack_Files;
cmd1[pn]='Files/BurnAware.exe';
cmd2[pn]='-y -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\BurnAware Free\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\BurnAware Free\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// HaoZip
prog[pn]='HaoZip';
version[pn]='4.4.1.9596';
cat[pn]=startpack_Files;
cmd1[pn]='Files/HaoZip.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\HaoZip_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\HaoZip_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Viewers ////


// Foxit PDF Reader
prog[pn]='Foxit PDF Reader';
version[pn]='7.0.8.1216';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/FoxitReader.exe';
cmd2[pn]='-ai1MUD -gm2 -fm0';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Foxit Software\\Foxit Reader 7.0\\Windows\\bShowStatusBar';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Foxit Reader\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// FastStone Image Viewer
prog[pn]='FS Image Viewer';
version[pn]='5.3';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/FSImage.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\FastStone Image Viewer\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\FastStone Image Viewer\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;



//// Players ////


// AIMP
prog[pn]='AIMP';
version[pn]='3.60.1470';
cat[pn]=startpack_Players;
cmd1[pn]='Player/AIMP3.exe';
cmd2[pn]='/AUTO="%PROGRAMFILES%\\AIMP3"';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\AIMP3\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\AIMP3\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


if (rusLang) {
	// PotPlayer
	prog[pn]='PotPlayer';
	version[pn]='1.6.52150';
	cat[pn]=startpack_Players;
	cmd1[pn]='Player/PotPlayer.exe';
	if (OSVersion == 5.1){
	cmd2[pn]='/S /Video-1 /Audio-0 /Sub-1 /Lists-0 /Shortcut-1010110 /AutoPlayVideo-1 /AutoPlayAudio-0 /ImpIni';
	} else {
	cmd2[pn]='/S /Video-1 /Audio-0 /Sub-1 /Lists-0 /Shortcut-1010111 /AutoPlayVideo-1 /AutoPlayAudio-0 /ImpIni';
	}
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PotPlayer\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PotPlayer\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
	}

else {
	// PotPlayer
	prog[pn]='PotPlayer';
	version[pn]='1.6.52150';
	cat[pn]=startpack_Players;
	cmd1[pn]='Player/PotPlayer.exe';
	if (OSVersion == 5.1){
	cmd2[pn]='/S /Video-1 /Audio-0 /Sub-1 /Lists-0 /Shortcut-1011010 /AutoPlayVideo-1 /AutoPlayAudio-0 /ImpIni';
	} else {
	cmd2[pn]='/S /Video-1 /Audio-0 /Sub-1 /Lists-0 /Shortcut-1011011 /AutoPlayVideo-1 /AutoPlayAudio-0 /ImpIni';
	}
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PotPlayer\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PotPlayer\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
	}




//// Socials ////


// QIP 2012
prog[pn]='QIP 2012';
version[pn]='4.0.9380';
cat[pn]=startpack_Socials;
cmd1[pn]='Socials/QIP2012.exe';
cmd2[pn]='/VERYSILENT /NORESTART /tasks=install,normal,iconpackplus';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\QIP 2012_is1\\DisplayName';
} else {
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\QIP 2012_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Skype
prog[pn]='Skype';
version[pn]='7.0.0.102';
cat[pn]=startpack_Socials;
cmd1[pn]='Socials/Skype.exe';
cmd2[pn]='/VERYSILENT /NOLAUNCH /NOGOOGLE /NOSTARTUP /NOPLUGINS';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Internet ////


// TeamViewer
prog[pn]='TeamViewer';
version[pn]='10.0.36897';
cat[pn]=startpack_Internet;
cmd1[pn]='WWW/TeamViewer.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\TeamViewer\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\TeamViewer\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// uTorrent
prog[pn]='uTorrent';
version[pn]='3.4.2.37951';
cat[pn]=startpack_Internet;
cmd1[pn]='WWW/uTorrent.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\uTorrent\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\uTorrent\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;



//// Antivirus ////


// 360is
prog[pn]='360 Total Security';
version[pn]='5.2.0.1086';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/360ts.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\360TotalSecurity\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\360TotalSecurity\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onclick[pn]='deselectOtherAntivir('+pn+')';
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;



// Baidu
prog[pn]='Baidu Antivirus';
version[pn]='5.2.3.105318';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/Baidu.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Baidu Antivirus\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Baidu Antivirus\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onclick[pn]='deselectOtherAntivir('+pn+')';
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Other ////


if (rusLang) {
	// Classic Shell
	prog[pn]='Classic Shell';
	version[pn]='4.1.0';
	cat[pn]=startpack_Other;
	cmd1[pn]='Other/ClassicShellRu.exe';
	cmd2[pn]='/quiet';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Installer\\UserData\\S-1-5-18\\Products\\C70986326F8E05740A3252C4E3B2E5D8\\InstallProperties\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Installer\\UserData\\S-1-5-18\\Products\\C70986326F8E05740A3252C4E3B2E5D8\\InstallProperties\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
}
else {
	// Classic Shell
	prog[pn]='Classic Shell';
	version[pn]='4.1.0';
	cat[pn]=startpack_Other;
	cmd1[pn]='Other/ClassicShellEn.exe';
	cmd2[pn]='/quiet';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Installer\\UserData\\S-1-5-18\\Products\\C70986326F8E05740A3252C4E3B2E5D8\\InstallProperties\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Installer\\UserData\\S-1-5-18\\Products\\C70986326F8E05740A3252C4E3B2E5D8\\InstallProperties\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
}


// Punto Switcher
prog[pn]='Punto Switcher';
version[pn]='3.3.1.373';
cat[pn]=startpack_Other;
cmd1[pn]='Other/PuntoSwitcher.exe';
cmd2[pn]='/passive /norestart';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{57B1BFB9-44BD-4190-954C-37ABB193A557}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{57B1BFB9-44BD-4190-954C-37ABB193A557}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;