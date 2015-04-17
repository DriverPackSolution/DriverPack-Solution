//Run DRP in debug mode

var WshShell = new ActiveXObject("WScript.Shell");
var objShell = new ActiveXObject("Shell.Application");
objShell.ShellExecute('iexplore.exe', '"file:\\'+WshShell.CurrentDirectory+'\\DriverPackSolution.html"', 0 , "runas", 3);
