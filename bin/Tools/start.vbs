On Error resume next

src = WScript.Arguments.Item(0)
hideMode = WScript.Arguments.Item(1)
wait = WScript.Arguments.Item(2)
executeFileName = WScript.Arguments.Item(3)

Set WshShell = CreateObject("WScript.Shell")
WshShell.Run src,hideMode,wait
'WScript.Echo "src: " & src

Set FSO = CreateObject("Scripting.FileSystemObject")
Set ClientIdFile=FSO.OpenTextFile("clientid.js", 8, true)
ClientIdFile.WriteLine("var executeFileName='" & executeFileName & "';")
ClientIdFile.Close
