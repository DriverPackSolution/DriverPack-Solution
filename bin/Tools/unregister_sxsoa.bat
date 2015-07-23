@echo off

ver | find "XP" > nul
if %ERRORLEVEL% == 0 goto ver_xp

goto exit

:ver_xp
echo Windows XP detected
regsvr32.exe Tools\sxsoa.dll /s /u

:exit