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

rd /S /Q "%TEMP%\drp\%1"
mkdir %INDEX_DIR%
tools\7za.exe l %DRP_PATH%>"%TEMP_DRP%\list7z.txt"
tools\7za.exe x -yo"%TEMP_PATH%" -r %DRP_PATH% *.inf DriverPack_*.ini
del /F /S /Q "%TEMP_DRP%\list%DRP_NAME%.txt"
for /R "%TEMP_PATH%" %%j in (*.inf) do echo %%j>>"%TEMP_DRP%\list%DRP_NAME%.txt"
cscript.exe //nologo tools\devparser\dev_parser.vbs %DRP_NAME% "%TEMP_PATH%" "%TEMP_DRP%" >> tools\devparser\log.txt 2>> tools\devparser\errors.txt
move /Y "%TEMP_DRP%\result%DRP_NAME%.txt" %INDEX_DIR%\%DRP_NAME%.txt
move /Y "%TEMP_DRP%\result%DRP_NAME%.hash" %INDEX_DIR%\%DRP_NAME%.hash
move /Y "%TEMP_PATH%\%INI_FILE%\DriverPack_*.ini" %INDEX_DIR%\%DRP_NAME%.ini
rd /S /Q "%TEMP%\drp\%1"
del /F /S /Q "%TEMP_DRP%\list%DRP_NAME%.txt"
