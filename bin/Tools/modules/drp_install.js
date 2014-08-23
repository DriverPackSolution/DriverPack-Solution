//1. + Копирование файлов в ProgrammFiles
//2. + Ярлык в панель управления
//3. + Ярлык на рабочий стол
//4. + Ярлык в Пуск
//5. Ярлык в Windows 8 Metro
//6. Установка удаление программ



DRPinstall = {
	
	options: {
		AppName: "DriverPack Solution",
		InstallDir: WshShell.ExpandEnvironmentStrings('%ProgramFiles%\\DriverPackSolution'),
		AppPublisher: "Kuzyakov Artur",
		AppURL: "http://drp.su/",
		AppID: "{9DD6B5CC-328F-4203-A8C0-28617BD98950}"
	},
	
	
	ShowLicence: function(){
		
		var licenceText = 
'                                              DriverPack Solution\r\n' +
'                             Copyright (C) 2008-2014 Artur Kuzyakov\r\n' +
'\r\n' +
'      This program is free software: you can redistribute it and/or modify\r\n' +
'      it under the terms of the GNU General Public License as published by\r\n' +
'      the Free Software Foundation, either version 3 of the License, or\r\n' +
'      (at your option) any later version.\r\n' +
'\r\n' +
'      This program is distributed in the hope that it will be useful,\r\n' +
'      but WITHOUT ANY WARRANTY; without even the implied warranty of\r\n' +
'      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.\r\n' +
'      See the GNU General Public License for more details.\r\n' +
'\r\n' +
'      You should have received a copy of the GNU General Public License\r\n' +
'      along with this program. If not, see http://www.gnu.org/licenses/.\r\n';
		
		$('body').append(
			'<style>.modal-body label { font-size:13px; padding:0px; margin:0px; padding-left:10px; line-height:5px; display:block; } .modal-body input { height: 12px; width: 12px; vertical-align:middle; margin-right:5px; margin-bottom:6px; }</style>' +
			'<!-- Modal -->' +
			'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">' +
			'  <div class="modal-dialog">' +
			'	<div class="modal-content">' +
			'	  <div class="modal-header">' +
			//'		<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"></span></button>' +
			'		<h4 class="modal-title" id="myModalLabel">' + about_license + '</h4>' +
			'	  </div>' +
			'	  <div class="modal-body">' +
			'		<textarea class="form-control" rows="7" style="width:500px">' + licenceText + '</textarea>' +
			'		<label onclick=""><input type="checkbox" checked="checked" id="chk_licence" /> ' + license_agreement + '</label>' +
			'		<label onclick=""><input type="checkbox" checked="checked" id="chk_DRPOnlineInstall" /> ' + license_installDRP + '</label>' +
			'	  </div>' +
			'	  <div class="modal-footer">' +
			'		<center><button type="button" class="btn btn-primary btn-large" id="licence-accept"><i class="fa fa-check"></i> &nbsp;' + button_continue + '&nbsp;</button></center>' +
			'	  </div>' +
			'	</div>' +
			' </div>' +
			'</div>'
		);
		
		
		if (IEVers<=6){
			$('body').append(
				'<style type="text/css">' +
				'.modal {' +
				'	position:absolute;' +
				'	top:25%;' +
				'}' +
				'#modalOverlay {' +
				'	position:absolute;' +
				'	top:expression(eval(document.body.scrollTop) + "px");' +
				'	z-index:1001;' +
				'	width:100%;' +
				'	height: 100%;' +
				'	background-color:#000;' +
				'	filter: alpha(opacity=80);' +
				'}' +
				'</style>' +
				'<div id="modalOverlay"></div>'
			);
		}
		
		$('#myModal').modal('show');
		$('#licence-accept').focus();
        $('#licence-accept').on('click', function () {
			
			$('#myModal').modal('hide');
			WshShell.RegWrite('HKCU\\SOFTWARE\\drpsu\\LicenceAccept',version,'REG_SZ');
			
			if (IEVers<=6){
				$('#modalOverlay').hide();
			}
			
		});
		
		$('#chk_licence').on('change', function () {
			
			if ($('#chk_licence').attr('checked')=='checked') {
				$('#licence-accept').removeAttr('disabled');
			}
			else {
				$('#licence-accept').attr('disabled','disabled');
			}
			
		});
		
		$('#myModal').on('hidden.bs.modal', function (e) {
			
			if ($('#chk_DRPOnlineInstall').attr('checked')=='checked') {
			
				setTimeout(function(){
					DRPinstall.InstallAll();
				},0);
				
			}
			
		});
		
	},
	
	
	InstallAll: function(){
		
		DRPinstall.InstallInSystem();
		DRPinstall.InstallDrvUpdater();
		DRPinstall.Shortcut_Desktop();
		DRPinstall.Shortcut_ControlPanel();
		DRPinstall.Shortcut_StartMenu();
		
	},
	
	
	GetFullPath: function(){
		
		//Fullpath
		fullpath1 = current_dir;
		if (fullpath1.indexOf('\\bin') != -1) {
			fullpath1 = fullpath1.replace('\\bin','');
		}
		
		if (fullpath1.charAt(fullpath1.length-1) == '\\') {
			var fullpath1 = fullpath1.substring(0,fullpath1.length-1);
		}
		
		return fullpath1;
		
	},

	
	Shortcut_ControlPanel: function(){
		reg_CLSID = 'HKCR\\CLSID\\' + this.options.AppID;

		RegWrite64(reg_CLSID + '\\', this.options.AppName, 'REG_SZ');
		//RegWrite64(reg_CLSID + '\\InfoTip', 'Установка и обновление драйверов', 'REG_SZ');
		RegWrite64(reg_CLSID + '\\System.ControlPanel.Category', '5', 'REG_SZ');
		RegWrite64(reg_CLSID + '\\DefaultIcon\\', this.options.InstallDir + '\\DriverPackSolution.exe', 'REG_SZ');
		RegWrite64(reg_CLSID + '\\Shell\\Open\\Command\\', this.options.InstallDir + '\\DriverPackSolution.exe', 'REG_EXPAND_SZ');
		RegWrite64(reg_CLSID + '\\ShellFolder\\Attributes', '0', 'REG_DWORD');
		WshShell.RegWrite('HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ControlPanel\\NameSpace\\' + this.options.AppID + '\\', 'Programs and Features', 'REG_SZ');

	},
	
	
	Shortcut: function(dest){
		
		// Create shortcut object.
		var Shortcut = WshShell.CreateShortcut(dest);
		//Shortcut.IconLocation = WshShell.ExpandEnvironmentStrings("%windir%\\regedit.exe, 0");
		Shortcut.Description = this.options.AppName;
		Shortcut.WindowStyle = 1;
		Shortcut.TargetPath = this.options.InstallDir + '\\DriverPackSolution.exe';
		Shortcut.WorkingDirectory = this.options.InstallDir;
		Shortcut.Save();
		
		/*
		 var oUrlLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") + "\\Microsoft Web Site.url");
         oUrlLink.TargetPath = "http://www.microsoft.com";
         oUrlLink.Save();
		*/

	},
	
	Shortcut_Desktop: function(){
		this.Shortcut(WshShell.SpecialFolders("Desktop") + '\\DriverPack Solution.lnk');
	},
	
	Shortcut_StartMenu: function(){
		this.Shortcut(WshShell.SpecialFolders("AllUsersPrograms") + '\\DriverPack Solution.lnk');
	},
	
	AddToUninstall: function(){
		//ToDo
	},
	
	IsRunFromInstalled: function(){
		
		if (this.GetFullPath().indexOf(this.options.InstallDir) != -1) {
			return true;
		}
		return false;
		
	},
	
	IsNeedLicenceAccept: function(){
		
		if (RegRead('HKCU\\SOFTWARE\\drpsu\\LicenceAccept') != version){
			return true;
		}
		return false;
		
	},
	
	InstallDrvUpdater: function(){
		
		if (fso.FileExists('tools\\DrvUpdater.exe')) {
			WshShell.Run('tools\\DrvUpdater.exe /install',0,false);
			WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "DrvUpdater" /d "' + WshEnv("APPDATA") + '\\DRPSu\\DrvUpdater.exe /hide" /f',0,false);
        }
		
	},
	
	InstallInSystem: function(){
		if (this.IsRunFromInstalled()) { return false; }
		
		//Create exclude file (ignoring folders)
		var exclude_file = WshShell.ExpandEnvironmentStrings('%temp%\\drp\\DRP_copy_exclude.txt');
		try {
			if(fso.FileExists(exclude_file)) { fso.DeleteFile(exclude_file); }
			
			f = fso.openTextFile(exclude_file, 2, true);		
			f.WriteLine('\\Drivers\\');
			f.WriteLine('\\Indexes\\');
			f.WriteLine('\\Soft\\');
			f.Close();
		}
		catch (e){}
		
		// Cleaning
		WshShell.Run('cmd /c rd /S /Q "' + WshShell.ExpandEnvironmentStrings(this.options.InstallDir) + '"',0,true);
		
		
		//Start copy DRP in ProgramFiles
		var copyFrom = this.GetFullPath();
		WshShell.Run('xcopy "' + copyFrom + '" "' + this.options.InstallDir + '\\" /S /E /Y /EXCLUDE:'+exclude_file,0,false);
	}
}


function RegWrite64(key, value, type){
	if (!key) { return false; }
	
	var name = key.substring(key.lastIndexOf('\\')+1, key.length);
	if (name) { key = key.replace('\\' + name,	''); }
	else { key = key.substring(0, key.length-1); }	
	
	WshShell.Run(
		(is64?'tools\\cmd64.exe':'cmd.exe') + 
		' /C reg add ' + key + ' ' + 
		(!name?'/ve':'/v "' + name + '"') + 
		' /d "' + value + 
		'" /t ' + type + 
		' /f',
		0,true
	);
}


if (DRPinstall.IsNeedLicenceAccept()){
	DRPinstall.ShowLicence();
}





		
