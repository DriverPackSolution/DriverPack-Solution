:start.cmd <drp_name> <drp_path> <index_dir>
:
:<drp_name>:   Driverpack filename without extension
:<drp_path>:   Full driverpack filename
:<index_dir>:  Index dir

set DRP_NAME=%1
set DRP_PATH=%2
set INDEX_DIR=%3

rem set TEMP_PATH=C:\mytmp\Temp\drp\%1\drp
set TEMP_PATH=%TEMP%\drp\%1\drp
set TEMP_DRP=%TEMP%\drp

call :Clear
mkdir %INDEX_DIR%
mkdir "%TEMP%\drp"
for /R %DRP_PATH% %%j in (*.inf) do echo %%j>>"%TEMP_DRP%\list%DRP_NAME%.txt"
cscript.exe //nologo tools\devparser\dev_parser.vbs %DRP_NAME% %CD%\%DRP_PATH% "%TEMP_DRP%" >> tools\devparser\log.txt 2>> tools\devparser\errors.txt
copy /B /Y "%TEMP_DRP%\result%DRP_NAME%.txt" %INDEX_DIR%\%DRP_NAME%.txt
copy /B /Y "%TEMP_DRP%\result%DRP_NAME%.hash" %INDEX_DIR%\%DRP_NAME%.hash
copy /B /Y "%DRP_PATH%\%INI_FILE%\DriverPack_*.ini" %INDEX_DIR%\%DRP_NAME%.ini
