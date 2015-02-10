chcp 1251 >nul
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall\handyShortcuts" /v "DisplayName" /d "”добные €рлыки" /f 
REG ADD "HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall\handyShortcuts" /V "DisplayVersion" /D "1.0.0.0"
REG ADD "HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall\handyShortcuts" /V "DisplayIcon" /D "C:\Users\Dmitriy\AppData\Roaming\DRPSu\Icon.ico"
REG ADD "HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall\handyShortcuts" /V "Publisher" /D "DriverPack"
REG ADD "HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall\handyShortcuts" /V "UninstallString" /D "C:\Users\Dmitriy\AppData\Roaming\DRPSu\uninstall.cmd"
REG ADD "HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall\handyShortcuts" /V "UninstallPath" /D "C:\Users\Dmitriy\AppData\Roaming\DRPSu\uninstall.cmd"
