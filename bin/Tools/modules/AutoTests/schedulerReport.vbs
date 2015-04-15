Set fso = CreateObject("Scripting.FileSystemObject")
set wshshell = CreateObject("WScript.Shell")
computer = WshShell.ExpandEnvironmentStrings("%computername%")
folderReport = "Reports"
fileReportName = folderReport + "\\" + computer + ".txt"


If fso.FolderExists(folderReport) AND fso.FileExists(fileReportName) Then
   Wscript.Quit
End If 


RetCode = WshShell.Run("RunTests.hta /start", 1, False)


'msgbox fileReportName