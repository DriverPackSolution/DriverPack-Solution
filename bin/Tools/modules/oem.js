function oem_install(){
	try {
		if (!OEMInstall) { return; }
		
		if (OSVersion>=6) {
			winRun('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Manufacturer" /d "DriverPack Solution" /f',true,false,true);
			winRun('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportURL" /d "http://drp.su/" /f',true,false,true);
			winRun('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Logo" /d "%systemroot%\\system32\\OEMLOGO.bmp" /f',true,false,true);
			winRun('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Model" /d "'+ManufacturerClean(Manufacturer)+' '+Model+'" /f',true,false,true);
			
			winRun('cmd /C copy "tools\\ico\\OEMLOGO.bmp" "%systemroot%\\system32"',true,false,true);
		}
		else {
			if (fso.FileExists(env_windir+'\\System32\\OEMINFO.INI')){ fso.getfile(env_windir+'\\System32\\OEMINFO.INI').Delete(); }
			oeminfo_file = fso.CreateTextFile(env_windir+'\\System32\\OEMINFO.INI', true);
			oeminfo_file.WriteLine('[General]');
			oeminfo_file.WriteLine('Manufacturer=DriverPack Solution');
			oeminfo_file.WriteLine('Model='+ManufacturerClean(Manufacturer)+' '+Model);
			oeminfo_file.WriteLine('[Support Information]');
			oeminfo_file.WriteLine('Line1=DriverPack Solution');
			oeminfo_file.WriteLine('Line2=http://drp.su/');
			oeminfo_file.WriteLine('Line3=');
			oeminfo_file.WriteLine('Line4='+oem_info);
			
			WshShell.Run('cmd /C copy "tools\\ico\\OEMLOGO.bmp" "%systemroot%\\system32"',0,false);
		}
	}
	catch(e) { }
}
