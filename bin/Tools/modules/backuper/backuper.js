try {
 if(!document.getElementById('tab-backup')&&document.getElementById('tabs')) {
	$('.tab').append("<li id='tab-backup' onmousedown='infobar_backup()'><a href='#' onclick='return false;'><span>"+infobar_tabBackup+"</span></a></li>");
	
	var backuper_bd_exe=true;
	var backuper_packer_exe=true;
	
	infobar_backup = function(){
		infobar(
				infobar_titleBackuper,
				"<a href='#' onclick='sysRestore(); return false;' id='sysRestore'>"+bacuper_sysRestore+"</a><img src='./tools/modules/backuper/database.png' id='backupFromDrp-img'><button class='btn btn-success' onclick='return backupFromDrp()'"+(!DRPgood?" disabled='disabled'":"")+">"+bacuper_backupFromDrp+"</button> <span id='backupSystemEXE' style='visibility:"+(expertMode?"visible":"hidden")+";'><input type='checkbox' name='backuper-bd-exe' id='backuper-bd-exe' checked onclick='backuper_bd_exe=this.checked;'> "+bacuper_backupFromDrpEXE+"</span><br/>"+bacuper_backupFromDrpInfo+"<br/><br/><img src='./tools/modules/backuper/exec_wine.png' id='backupFromSystem-img'><button class='btn btn-success' onclick='backupFromSystem()'>"+bacuper_backupFromSystem+"</button> <span id='backupPackerEXE' style='visibility:"+(expertMode?"visible":"hidden")+";'><input type='checkbox' name='backuper-packer-exe' id='backuper-packer-exe' checked onclick='backuper_packer_exe=this.checked;'> "+bacuper_backupFromSystemEXE+"</span><br/>"+bacuper_backupFromSystemInfo+"<br/>",
				'yelow',
				'',
				'update'
			);
		document.getElementById('infobar_img').src="./tools/modules/blank.gif";
		fixPNG(document.getElementById('infobar_img'));
		setTab('tab-backup');
		
		set_lists
		("none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",

		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none"
		);
	}
	
	var toggle_expert_mode_old = toggle_expert_mode;
	toggle_expert_mode = function (mode){
		try {
			document.getElementById('backupSystemEXE').style.visibility=(mode?"visible":"hidden");
			document.getElementById('backupPackerEXE').style.visibility=(mode?"visible":"hidden");
		}
		catch(e) { }
		toggle_expert_mode_old(mode);
	}
	
	
	
	function backupFromSystem(){
		backup_init();
		
		//Run Double Driver to create backup
		WshShell.Run('tools\\modules\\backuper\\ddriver\\ddc.exe b /target:"' + temp + "\\drp\\DRPSuPacker\\drp\\"+'"',0,true);
		
		if ((!fso.FolderExists(temp+"\\drp\\DRPSuPacker\\drp")) || (fso.GetFolder(temp+"\\drp\\DRPSuPacker\\drp").Size<1000000)) {
			alert(bacuper_error);
			//Refresh
			setTimeout("progressBar=false;refresh();infobar_backup();",100);
			return false;
		}
		
		//Save the backup to desktop
		if (backuper_packer_exe){
			backupCreateEXE('win');
		}
		else {
			backupCreateOriginal('win');
		}
		
		backupCreateFinish();
	}
	
	
	function backupFromDrp(){
		if (exportCount==0) { export_init(); }
		backup_init();
		
		
		//Extracting all drivers
		var i=0;
		for (var i = 0; i < exportCount; i++) {
			var ret = 0;
			var unpack_str = "tools\\7za.exe x -yo" +
				"\"" + temp + "\\drp\\DRPSuPacker\\drp\\" + export_pack_name[i] + "\" " +
				"\"" + export_pack_folder[i] + "\\" + export_pack_name[i] +".7z\"" + " " +
				"\"" + export_dev_dirs[i] + "\"";
			
			//alert(unpack_str);
			prBarNext(exportCount); pb_desc.innerHTML=bacuper_extract+": <br/>"+export_pack_name[i];
			ret = WshShell.Run(unpack_str,0,true);
		}
		
		
		//Save the backup to desktop
		if (backuper_bd_exe){
			backupCreateEXE('drp');
		}
		else {
			backupCreateOriginal('drp');
		}
		
		
		backupCreateFinish();
	}
	
	
	function backupCreateEXE(postfix){
		var name_file = createBackupFileName();//The file name based on computer models
		
		//Unpack packer.7z and create the archive
		prBarNext(exportCount+1); pb_desc.innerHTML=bacuper_createArchive+"<br/>";
		WshShell.Run("tools\\7za.exe x -pdrp -yo" + "\"" + temp + "\\drp\\DRPSuPacker\" " + "\"tools\\modules\\backuper\\packer\\packer.7z\"",0,true);
		WshShell.Run('tools\\7za.exe a "' + temp + '\\drp\\pack_ready.7z" "' + temp + '\\drp\\DRPSuPacker"',0,true);
		
		//The completion creating backup
		prBarNext(exportCount+1); pb_desc.innerHTML=bacuper_finish+"<br/>";
		WshShell.Run('cmd /C mkdir "' + WshShell.SpecialFolders("Desktop") + '\\Drivers" & copy /b "tools\\modules\\backuper\\packer\\7zsd.sfx" + "tools\\modules\\backuper\\packer\\config.txt" + "' + temp + '\\drp\\pack_ready.7z" "' + WshShell.SpecialFolders("Desktop") + '\\Drivers\\' + name_file + '_' + postfix + '.exe"',0,true);
	}
	
	
	function backupCreateOriginal(postfix){
		var name_file = createBackupFileName();//The file name based on computer models
		
		prBarNext(exportCount+1); pb_desc.innerHTML=bacuper_finish+"<br/>";
		WshShell.Run('cmd /C mkdir "' + WshShell.SpecialFolders("Desktop") + '\\Drivers\\' + name_file + '" & XCOPY "' + temp + '\\drp\\DRPSuPacker\\drp" "' + WshShell.SpecialFolders("Desktop") + '\\Drivers\\' + name_file + '_' + postfix + '\\" /H /E /G /Q /R /Y',0,true);
	}
	
	function backup_init(){
		infobar_runInstall(bacuper_createBackup,exportCount+2);
		pb_desc = document.getElementById('progressBar_Description');
		pb_desc.innerHTML=bacuper_createPrepare+'<br/>';
		
		//Cleaning
		WshShell.Run("cmd /C rd /S /Q \""+temp+"\\drp\\DRPSuPacker\"",0,true);
	}
	
	function backupCreateFinish(){
		//Open result folder
		WshShell.Run("explorer \"" + WshShell.SpecialFolders("Desktop") + "\\Drivers\"",1,false);
		
		//Refresh
		setTimeout("progressBar=false;refresh();infobar_backup();",1000);
	}
	
	function createBackupFileName(){
		//The file name based on computer models
		var name_file = Manufacturer.substring(0,Manufacturer.indexOf(' ')+1);
		name_file = name_file.charAt(0).toUpperCase() + name_file.substr(1).toLowerCase();
		name_file = name_file + '_' + Model;
		name_file = name_file.replace(/\s+/g, "");
		name_file = name_file.replace(/(\.|\,|\#|\/)/g, "_");
		if (!name_file) { name_file = 'drpsu'; }
		
		return name_file;
	}
	
	
	
	var exportCount=0;export_pack_name=[],export_pack_folder=[],export_dev_dirs=[];
	function export_init(){
		//The function looks for drivers that are needed for this computer
		var last_pack_name='',last_pack_folder='',last_dev_dirs='';
		for (var i = 0; i < buttonCount; i++) {
			if ((button_div[i] == "driver_available") ||
			(button_div[i] == "driver_new") ||
			(button_div[i] == "driver_uptodate") ||
			(button_div[i] == "driver_old"))	{
				if (last_pack_name!=button_pack_name[i]){
					export_pack_name[exportCount]=button_pack_name[i];
					export_pack_folder[exportCount]=button_pack_folder[i];
					export_dev_dirs[exportCount]=button_dev_dir[i];
					exportCount++;
				}
				else if (last_dev_dirs.indexOf(button_dev_dir[i])==-1){
					export_dev_dirs[exportCount-1]+='" "'+button_dev_dir[i];
				}
				
				last_pack_name=button_pack_name[i];
				last_pack_folder=button_pack_folder[i];
				last_dev_dirs=(export_dev_dirs[exportCount]?export_dev_dirs[exportCount]:button_dev_dir[i]);
			}
		}
	}
 }
}
catch(e) { }
