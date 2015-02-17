var Shell = new ActiveXObject("WScript.Shell");
var appdata = Shell.SpecialFolders("AppData");
var softJson;

if(!fso.FolderExists(appdata+"\\DRPSu")){
	fso.CreateFolder(appdata+"\\DRPSu");
}
if(!fso.FolderExists(appdata+"\\DRPSu\\icons")){
	fso.CreateFolder(appdata+"\\DRPSu\\icons");
}
if(!fso.FolderExists(appdata+"\\DRPSu\\PROGRAMS")){
	fso.CreateFolder(appdata+"\\DRPSu\\PROGRAMS");
}
var iconsPath = appdata+"\\DRPSu\\icons\\";
var uninstallerPath = appdata+"\\DRPSu\\uninstall.cmd";
var programsPath = appdata+"\\DRPSu\\PROGRAMS";
var appdataDrpPath = appdata+"\\DRPSu\\";
var system_version = 32;
if (navigator.userAgent.indexOf("WOW64") != -1 ||
	navigator.userAgent.indexOf("Win64") != -1) {
	system_version = 64;
}


var infobar_programm_old = infobar_programm;
infobar_programm = function(){
	infobar_programm_old();
	
	var program_count = $('.programs input:checkbox').length;
	if (program_count > 0) {
		infobar(
			"<div class='program_title'>" + misc_inst5 + ":</div>",
			"<div class='program_infobar_content'><b>" + program_count + "</b> - " + morfolog('infobar_programmAvailable',program_count) + ".<br><button class='infobar_button btn btn-success all_programs_download' onclick='all_programs_download();return false;' style='float:left;'>"+infobar_buttonInstAll+"</button></div>",
			'red'
		);
	}
	else {
		infobar(
			"<div class='program_title'>" + infobar_titleProgramm + "</div>",
			"<div class='program_infobar_content'>" + infobar_infoProgramm + "</div>",
			'green'
		);
	}
	
}







graphicsRender();
$(document).ready(function(){
	getPrograms();
});


function getPrograms() {
	
	$.ajax({
		url: "http://test-st.drp.su/admin/index.php?r=response",
		dataType: 'jsonp',
		type: 'POST',
		crossDomain: true,
		cache: false,
		contentType: 'text/json; charset=utf-8',
		//Request with the data about the drivers
		success: function (json) {
			
			softJson = json;
			for (var i = 0; i < json.length; i++) {
				if (json[i]['Registry_' + system_version] != "") {
					if (!checkProgramExistence(json[i]['Registry_' + system_version])) {
						if (!driver_exists(json[i]['URL'], programsPath)) {
							
							if ((!json[i]['Lang']) || (json[i]['Lang'].indexOf(lang) != -1) || (isRusLang && (json[i]['Lang'].indexOf('rus') != -1)) ){
								$('.programs table').append("<tr class='approved'>" +
									"<td width='50'><input type='checkbox' checked><img src='tools\\ico\\button\\0.png'></td>" +
									//I am storing the URL of the drivers in the ID of TD to have a pretty easy access.
									"<td class='program_td' style='width: 63%; text-align:left' data-id='" + json[i]['URL'] + "' data-keys='" + json[i]['Keys'] + "'>" + json[i]['Name'] + "</td>" +
									//Just a size of the file that was returned by the get_size function
									"<td class='program_size' style='width: 30%'>" + get_size(json[i]['URL']) + "</td>" +
									"</tr>");

							}
							
						}
					}
				}
			}
			if(!fso.FileExists(uninstallerPath)){
			$('.programs table').append("<tr class='approved'>" +
				"<td width='50'><input type='checkbox' class='install_shortcuts' checked><img src='tools\\ico\\button\\0.png'></td>" +
				//I am storing the URL of the drivers in the ID of TD to have a pretty easy access.
				"<td class='program_shortcuts' style='width: 63%; text-align:left'>" +(rusLang?'Установка ярлыков':'Install shorcuts')+"</td>" +
				//Just a size of the file that was returned by the get_size function
				"<td class='shortcut_size' style='width: 30%'></td>" +
				"</tr>");
			}
/*

			$('.programs table').after("<div class='btn-group' style='margin: 20px 0;'>"+
					"<a href='#' style='font-size: 14px' class='shortcuts_install btn btn-info'>Установить ярлыки</a>"+
					"</div>");
*/


			if($('.approved').length > 0){
				$('.programs table').after("<div class='programs_install' style='margin-top: 20px;'><!--<img src='tools\\ico\\5.png'>--> <a href='#' style='font-size: 14px' class='btn btn-success programs_download'>" + infobar_buttonInst + " <span class='programs_sum'></span></a></div>");
				program_recalculate();
			} else {
				//$('.program_title').html('123');
			}
		},
		error: function(jqXHR, exception) {
			if (jqXHR.status === 0) {
				alert('AJAX Error: Not connect.n Verify Network.');
			} else if (jqXHR.status == 404) {
				alert('AJAX Error: Requested page not found. [404]');
			} else if (jqXHR.status == 500) {
				alert('AJAX Error: Internal Server Error [500].');
			} else if (exception === 'parsererror') {
				alert('AJAX Error: Requested JSON parse failed.');
				getPrograms();
				return false;
			} else if (exception === 'timeout') {
				alert('AJAX Error: Time out error.');
			} else if (exception === 'abort') {
				alert('AJAX Error: Ajax request aborted.');
			} else {
				alert('AJAX Error: Uncaught Error.n' + jqXHR.responseText);
			}
			debugger;
		}
	});
	
}

function program_recalculate() {
	var sum = 0.0;
	var number = $('.program_size').length;
	$('#badge-programms2').html(number);
	
	$('.program_size').each(function (index, element) {
		if ($(element).parent().hasClass('approved')) {
			if ($(element).html() != 'null' && $(element).html() != drv_notKnown) {
				 var this_prog_size = parseFloat($(element).html().slice(0, -2));
				sum += (isNaN(this_prog_size)?0:this_prog_size);
			} else {
				$(element).html(drv_notKnown);
				$(element).parent().removeClass('approved');
				$(element).parent().find('input:checkbox').removeAttr('checked');
			}
		}
	});
	$('.programs_sum').html("(" + sum.toFixed(1) + " Mb )");
    if(sum > 0.0){
        $('.programs_download').show();
    } else {
        $('.programs_download').hide();
    }
}

function addShortcut(shortcut) {
	myObject = new ActiveXObject("Scripting.FileSystemObject");
	var pinItem = myObject.GetAbsolutePathName("tools\\PinItem.vbs");
	var mypath = Shell.SpecialFolders("Desktop");
	var myshortcut = Shell.CreateShortcut(mypath + "\\" + shortcut.name + ".lnk");
	myshortcut.TargetPath = Shell.ExpandEnvironmentStrings(shortcut.link);
	myshortcut.WorkingDirectory = Shell.ExpandEnvironmentStrings(mypath);
	myshortcut.WindowStyle = 4; //Window Type(standart)
	myshortcut.IconLocation = Shell.ExpandEnvironmentStrings(saveShortcutIcon(shortcut.icon, shortcut.name));
	myshortcut.Save();
	var pinned = ''
	if (shortcut.pinned) {
		 pinned = 'cscript '+pinItem+' /item:"'+mypath + '\\' + shortcut.name + '.lnk'+'" /taskbar';
	}
	return pinned;
}

function saveShortcutIcon(base, name){
	var data = decode64(base);
	var stream = new ActiveXObject("ADODB.Stream");
	stream.Type = 2;
	stream.Charset = "ISO-8859-1";
	stream.Open();
	stream.WriteText(data);
	stream.SaveToFile(iconsPath+name+".ico", 2);
	stream.Close();
	myObject = new ActiveXObject("Scripting.FileSystemObject");
	path = myObject.GetAbsolutePathName(iconsPath+name+".ico");
	return path;
}

function deleteShortcut(name){
	try {
		DesktopPath = Shell.SpecialFolders("Desktop");
		fso.DeleteFile(DesktopPath + "\\" + name + ".lnk")
	} catch (Ex){

	}
}

function getInstalledShortcuts(){
	var installed = [];
	if(fso.FileExists('shortcuts.txt')) {
		objFile = fso.openTextFile("shortcuts.txt", 1);
		while (!objFile.AtEndOfStream) {
			var rawName = objFile.ReadLine().match(/\\(?:.(?!\\))+$/ig);
			installed.push(rawName[0].substr(1, rawName[0].length-6));
		}
		objFile.Close();
	}
	return installed;
}


function checkProgramExistence(program) {
	var parsed_reg = program.replace(/\\\\/g, '\\');
	if (RegRead(parsed_reg) == "") {
		return false;
	} else {
		return true;
	}
}

function createUninstaller(){
	myObject = new ActiveXObject("Scripting.FileSystemObject");
	f = fso.OpenTextFile(appdataDrpPath+"shortcutsUninstaller.cmd", 2, true);
	f.WriteLine('chcp 1251 >nul');
	f.WriteLine('reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\handyShortcuts" /v "DisplayName" /d "Удобные ярлыки" /f ');
	f.WriteLine('REG ADD "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\handyShortcuts" /V "DisplayVersion" /D "1.0.0.0"');
	f.WriteLine('REG ADD "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\handyShortcuts" /V "DisplayIcon" /D "'+appdataDrpPath+'Icon.ico"');
	f.WriteLine('REG ADD "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\handyShortcuts" /V "Publisher" /D "DriverPack"');
	f.WriteLine('REG ADD "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\handyShortcuts" /V "UninstallString" /D "'+uninstallerPath+'"');
	f.WriteLine('REG ADD "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\handyShortcuts" /V "UninstallPath" /D "'+uninstallerPath+'"');
f.Close();
var cmd = '"'+appdataDrpPath+'shortcutsUninstaller.cmd"';
	WshShell.Run(cmd, 0, true);
}

function graphicsRender() {
	$('.programs').append("<table style='font-size: 14px; margin: 30px 0;' " +
		"class='button-table'></table>");
}

function tabProgram_OnClick(){
	if($('#tab-program').hasClass('active')){
		$('.programs').show();
	}
	$('.tab').on('mousedown', 'li', function(){
		$('.programs').hide();
		
		 if($(this).attr('id') == 'tab-programm'){
			$('.programs').show();
			program_recalculate();
		}
	});
}





function all_programs_download() {
	$('.programs table input:checkbox').attr('checked', true);
	
	try{
		$('.programs_download').click();
	}
	catch (Ex){ debugger; }
}







$(document).ready(function () {
	
	tabProgram_OnClick();

	$('#badge-programms').hide();
	$('#badge-programms').after('<b class="badge badge-warning" id="badge-programms2">0</b>');
	program_recalculate();
	
	$('.programs').on('click', 'input:checkbox', function () {
		var parent_tr = $(this).parent().parent();
		if (parent_tr.hasClass('approved')) {
			parent_tr.removeClass('approved');
			program_recalculate();
		} else {
			parent_tr.addClass('approved');
			program_recalculate();
		}
	});


	function shortcutsInstall() {
		myObject = new ActiveXObject("Scripting.FileSystemObject");
		var removePinned = myObject.GetAbsolutePathName("tools\\removePinned.vbs");
		var removeIcon = myObject.GetAbsolutePathName("tools\\Icon.ico");
		fso.CopyFile(removePinned, appdataDrpPath);
		fso.CopyFile(removeIcon, appdataDrpPath);
		Shell = new ActiveXObject("WScript.Shell");
		DesktopPath = Shell.SpecialFolders("Desktop");
		var pinned = '';

		if(fso.FileExists(uninstallerPath)){
		   /* installed = getInstalledShortcuts();

			f = fso.OpenTextFile("tools\\uninstall.cmd", 2);
			f.WriteLine('REG DELETE "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\handyShortcuts" /f');
			for(var counter = 0 ; counter < shortcuts.length ; counter ++){
				if(installed.indexOf(shortcuts[counter]['name']) == -1){
					f.WriteLine('cscript '+removePinned+' /item:"'+shortcuts[counter]['name']+'"');
				}
				f.WriteLine('del  "'+DesktopPath+'\\'+shortcuts[counter]['name']+'.lnk"');
			}
			f.WriteLine("DEL %0");
			f.Close();*/
		} else {
			createUninstaller();
			fso.CreateTextFile(uninstallerPath, true);
			f = fso.OpenTextFile(uninstallerPath, 2, true);
			f.WriteLine('chcp 1251 >nul');
			f.WriteLine('REG DELETE "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\handyShortcuts" /f');
			f.WriteLine('REG DELETE "HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\handyShortcuts" /f');
			for(var counter = 0 ; counter < shortcuts.length ; counter ++){
				var pinCheck = addShortcut(shortcuts[counter]);
				if(pinCheck != ''){
					pinned += pinCheck+"\n";
					WshShell.Run(pinCheck, 0, true);
					f.WriteLine('cscript '+appdataDrpPath+'removePinned.vbs'+' /item:"'+shortcuts[counter]['name']+'"');
				}
				f.WriteLine('del  "'+DesktopPath+'\\'+shortcuts[counter]['name']+'.lnk"');
			}
			f.WriteLine('del "'+appdataDrpPath+'removePinned.vbs'+'"');
			f.WriteLine('del "'+appdataDrpPath+'Icon.ico'+'"');
			f.WriteLine('del "'+appdataDrpPath+'shortcutsUninstaller.cmd'+'"');
			f.WriteLine('rmdir '+iconsPath.substr(0, iconsPath.length-1)+ ' /S /Q');
			f.WriteLine("DEL %0");
			f.Close();
		}
		/*var pin =  fso.OpenTextFile("tools\\installPinned.cmd", 2);
		pin.Write(pinned);
		pin.Close();
		WshShell.Run('tools\\installPinned.cmd /S', 0, true);*/
	}


	$('.programs').on('click', '.shortcuts_delete', function (){
		if(fso.FileExists('shortcuts.txt')) {
			try {
				objFile = fso.openTextFile("shortcuts.txt", 1);
				while (!objFile.AtEndOfStream) {
					deleteShortcut(objFile.ReadLine());
				}
				objFile.Close();
				fso.DeleteFile("shortcuts.txt");
			} catch (Ex){}
			$('#shortcuts-alert').removeClass();
			$('#shortcuts-alert').addClass('alert alert-error').html("Ярлыки были удалены");
		}
	});
	
	


	$('.programs').on('click', '.programs_download', function () {
		$('#tabs').css('visibility','hidden');
		
		if($('.install_shortcuts').is(':checked')){
			//fso.CreateTextFile("tools\\installPinned.cmd", true);
			shortcutsInstall();
		}
		var programs_to_launch = []
		var programs_number = $('.approved').length;
		$('.program_title').html('<div class="status" style="font-size: 16px; margin-bottom: 1%"></div><div id="progressbar" style="width: 10%; float: left; margin-right: 10px"></div>' +
			'<div class="driver_percents" style="margin-left: 3%"></div>'+
			'<div class="speed" style="margin-left: 3%; margin-top: 1%"></div>');
		$('.program_infobar_content').hide();

		//Default value for the progress bars
		$("#progressbar").progressbar({
			value: 0
		});
		//Setting the background, etc of the progressbar
		$('.ui-progressbar-value').css('background', "#4AFF40");
		$('.ui-progressbar').css('height', "0.7em");

		$('.counter').fadeIn();
		$('.popup_control').hide();
		var number = 1;
		$('.program_td').each(function (index, element) {
			if ($(element).parent().hasClass('approved')) {
				$('.status').html(about_connecting + " " + number + " / " + programs_number);
				programs_to_launch.push(wget_driver($(element).attr('data-id'), programsPath) + '" ' + $(element).attr('data-keys'));
				number++;
			}
		});
		
		//Changing the title - removing the progtressbar, changing the text for "Installing drivers"
		//$('.program_title').html('<div class="status" style="font-size: 16px; margin-bottom: 1%">' + infobar_tabInstall + '... <img id="infobar_img" src="tools\\load.gif" style="padding-right:10px;"/></div>');
		infobar(
			'<img id="infobar_img" src="tools\\load.gif" style="padding-right:10px;"/>' + infobar_tabInstall + '... <span id="programs_to_launch_count">0</span> / ' + programs_to_launch.length,
			'',
			'green'
		);
		
		for (var counter = 0; counter < programs_to_launch.length; counter++) {
			if (programs_to_launch[counter] != null) {
				$('#programs_to_launch_count').html(counter+1);
				WshShell.Run('"' + programsPath +"\\"+ programs_to_launch[counter], 0, true);
                                installedSoft(programs_to_launch[counter].slice(0, programs_to_launch[counter].lastIndexOf(".")));
			}
		}
		location.reload();
		
		$('#tabs').css('visibility','');
	});
});



function decode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	var keyStr = "ABCDEFGHIJKLMNOP" +
		"QRSTUVWXYZabcdef" +
		"ghijklmnopqrstuv" +
		"wxyz0123456789+/" +
		"=";

	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) {
		alert("There were invalid base64 characters in the input text.\n" +
			"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
			"Expect errors in decoding.");
	}
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}

		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";

	} while (i < input.length);
	return unescape(output);
}
