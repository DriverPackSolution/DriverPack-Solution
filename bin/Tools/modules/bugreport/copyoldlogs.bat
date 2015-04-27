xcopy "..\..\..\logs\*.txt" "%WINDIR%\Temp\DRPLog\*.txt" /C /Y
xcopy "..\..\..\logs\*.png" "%WINDIR%\Temp\DRPLog\*.png" /C /Y
xcopy "..\..\..\logs\*.snp" "%WINDIR%\Temp\DRPLog\*.snp" /C /Y
copy "%TEMP%\DRP.png" "%WINDIR%\Temp\DRPLog\DRP.png" /Y
copy "%TEMP%\DPS.png" "%WINDIR%\Temp\DRPLog\DPS.png" /Y