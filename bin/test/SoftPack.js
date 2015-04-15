
setTimeout(function() {

    SoftPack.init();
    var soft;
    
    
    
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKEY_CURRENT_USER\\\\\\\\Software\\\\\\\\7-Zip\\\\\\\\Path64'");
    test(soft[0].Registry_64, 'HKEY_CURRENT_USER\\\\Software\\\\7-Zip\\\\Path64');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\Opera 23.0.1522.72\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Opera 23.0.1522.72\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKEY_CURRENT_USER\\\\\\\\Software\\\\\\\\WinRAR SFX\\\\\\\\C%%Program Files%WinRAR'");
    test(soft[0].Registry_64, 'HKEY_CURRENT_USER\\\\Software\\\\WinRAR SFX\\\\C%%Program Files%WinRAR');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKEY_CURRENT_USER\\\\\\\\Software\\\\\\\\Foxit Software\\\\\\\\Foxit Reader 6.0\\\\\\\\Windows\\\\\\\\bShowStatusBar'");
    test(soft[0].Registry_64, 'HKEY_CURRENT_USER\\\\Software\\\\Foxit Software\\\\Foxit Reader 6.0\\\\Windows\\\\bShowStatusBar');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKEY_CURRENT_USER\\\\\\\\Software\\\\\\\\SamLab.ws\\\\\\\\SAM CoDeC Pack\\\\\\\\Install_Dir'");
    test(soft[0].Registry_64, 'HKEY_CURRENT_USER\\\\Software\\\\SamLab.ws\\\\SAM CoDeC Pack\\\\Install_Dir');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\uTorrent\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\uTorrent\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\PotPlayer\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\PotPlayer\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\AIMP3\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\AIMP3\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKEY_CURRENT_USER\\\\\\\\Software\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\QIP 2012_is1\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKEY_CURRENT_USER\\\\Software\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\QIP 2012_is1\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\FastStone Image Viewer\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\FastStone Image Viewer\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\TeamViewer 9\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\TeamViewer 9\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09F}_is1\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09F}_is1\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\MozillaPlugins\\\\\\\\@adobe.com/FlashPlayer\\\\\\\\Description'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\MozillaPlugins\\\\@adobe.com/FlashPlayer\\\\Description');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\.NETFramework\\\\\\\\AssemblyFolders\\\\\\\\DX_1.0.2911.0\\\\\\\\'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\.NETFramework\\\\AssemblyFolders\\\\DX_1.0.2911.0\\\\');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_64='HKLM\\\\\\\\SOFTWARE\\\\\\\\Wow6432Node\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\\\\\\\DisplayName'");
    test(soft[0].Registry_64, 'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\\\DisplayName');
    
    /*************************** test registry_32 ***********************/
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKEY_CURRENT_USER\\\\\\\\SOFTWARE\\\\\\\\7-Zip\\\\\\\\Path'");
    test(soft[0].Registry_32, 'HKEY_CURRENT_USER\\\\SOFTWARE\\\\7-Zip\\\\Path');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\Opera 23.0.1522.72\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Opera 23.0.1522.72\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\WinRAR archiver\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\WinRAR archiver\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\Foxit Reader\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Foxit Reader\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\SAM CoDeC Pack\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\SAM CoDeC Pack\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\uTorrent\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\uTorrent\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\PotPlayer\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\PotPlayer\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\AIMP3\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\AIMP3\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKEY_CURRENT_USER\\\\\\\\Software\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\QIP 2012_is1\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKEY_CURRENT_USER\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\QIP 2012_is1\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\FastStone Image Viewer\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\FastStone Image Viewer\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\TeamViewer 9\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\TeamViewer 9\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09D}_is1\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09D}_is1\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\Adobe Flash Player ActiveX\\\\\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Adobe Flash Player ActiveX\\\\DisplayName');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\.NETFramework\\\\\\\\AssemblyFolders\\\\\\\\DX_1.0.2911.0\\\\\\\\'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\.NETFramework\\\\AssemblyFolders\\\\DX_1.0.2911.0\\\\');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Registry_32='HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Uninstall\\\\\\\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\\\DisplayName'");
    test(soft[0].Registry_32, 'HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\\\DisplayName');
    

    /*************************** test url *******************************/
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/7-Zip.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/7-Zip.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/OperaBlink.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/OperaBlink.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/YandexPack.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/YandexPack.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download0.drp.su/soft/WinRAR.exe'");
    test(soft[0].URL, 'http://download0.drp.su/soft/WinRAR.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/FoxitReader.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/FoxitReader.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/SAMCoDeCs.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/SAMCoDeCs.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/Skype.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/Skype.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/uTorrent.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/uTorrent.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/PotPlayer.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/PotPlayer.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/AIMP3.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/AIMP3.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download0.drp.su/soft/QIP2012.exe'");
    test(soft[0].URL, 'http://download0.drp.su/soft/QIP2012.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/FSImage.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/FSImage.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/TeamViewer.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/TeamViewer.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/Backupper.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/Backupper.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download0.drp.su/soft/FlashPlayer.exe'");
    test(soft[0].URL, 'http://download0.drp.su/soft/FlashPlayer.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/DirectX.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/DirectX.exe');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE URL='http://download.drp.su/soft/VisualCplus.exe'");
    test(soft[0].URL, 'http://download.drp.su/soft/VisualCplus.exe');
    
    /********************** test names ***********************/
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='Skype'");
    test(soft[0].Name, 'Skype');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='7-Zip'");
    test(soft[0].Name, '7-Zip');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='Opera'");
    test(soft[0].Name, 'Opera');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='Яндекс.Браузер'");
    test(soft[0].Name, 'Яндекс.Браузер');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='WinRAR'");
    test(soft[0].Name, 'WinRAR');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='Foxit PDF Reader'");
    test(soft[0].Name, 'Foxit PDF Reader');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='PotPlayer'");
    test(soft[0].Name, 'PotPlayer');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='QIP'");
    test(soft[0].Name, 'QIP');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='AIMP'");
    test(soft[0].Name, 'AIMP');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='Codec Pack'");
    test(soft[0].Name, 'Codec Pack');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='uTorrent'");
    test(soft[0].Name, 'uTorrent');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='FastStone Image Viewer'");
    test(soft[0].Name, 'FastStone Image Viewer');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='TeamViewer'");
    test(soft[0].Name, 'TeamViewer');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='AOMEI Backupper'");
    test(soft[0].Name, 'AOMEI Backupper');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='Adobe Flash Player'");
    test(soft[0].Name, 'Adobe Flash Player');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='DirectX'");
    test(soft[0].Name, 'DirectX');
    soft = SoftPack.SQL("SELECT * FROM soft WHERE Name='Microsoft Visual C++'");
    test(soft[0].Name, 'Microsoft Visual C++');


    next_script();

}, 1000);

