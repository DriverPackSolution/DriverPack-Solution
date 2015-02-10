On Error resume next

src = WScript.Arguments.Item(0)
hideMode = WScript.Arguments.Item(1)
wait = WScript.Arguments.Item(2)

Set WshShell = CreateObject("WScript.Shell")
WshShell.Run src,hideMode,wait
'WScript.Echo "src: " & src