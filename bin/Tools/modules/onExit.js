function GetProcesses2() {
        lf('GetProcesses2');
        try {
        var colProcesses = objWMIService.ExecQuery("SELECT * FROM Win32_Process");

        var enumItems = new Enumerator(colProcesses);
        var ret;
        for (; !enumItems.atEnd(); enumItems.moveNext())
                ret = enumItems.item().name + " " + ret;

        return ret;
}
        catch (e) { log("Cannot get GetProcesses2"); return ""; }
}


// Clear temporary files on exit
onunload(function () {
        lf('onunload');
        if (typeof(main)=="undefined") { return; }      //Not run this function if DRP reloaded from 'checkOS.js'
        
        if ((DrvUpdater) && (fso.FileExists('tools\\DrvUpdater.exe'))) {
                WshShell.Run('tools\\DrvUpdater.exe /install',0,false);
                WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "DrvUpdater" /d "' + WshEnv("APPDATA") + '\\DRPSu\\DrvUpdater.exe /hide" /f',0,false);
        }
        
        //Processes = GetProcesses2().toLowerCase();
        WshShell.Run('tools\\modules\\bugreport\\copyoldlogs.bat',0,false);
        reset_timer("Deleting temp files...");
        WshShell.Run("cmd /C del /F /S /Q \"%TEMP%\\drp\"",0,false);
        WshShell.Run("cmd /C NET USE \"Z:\" /DELETE /YES",0,false);
        timer("Done ");
        log("Shutting down...");
        if (logfile)logfile.Close();
});



function DrvUpdaterUninstall(){
        if ((!DrvUpdater) && (fso.FileExists('tools\\DrvUpdater.exe'))) {
                WshShell.Run('tools\\DrvUpdater.exe /uninstall',1,false);
        }
}