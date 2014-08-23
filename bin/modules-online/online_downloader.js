not_installed_drivers = [];
not_installed_versions = {};
installed_drivers = [];
var Shell = new ActiveXObject("WScript.Shell");
var appdata = Shell.SpecialFolders("AppData");
if(!fso.FolderExists(appdata+"\\DRPSu")){
	fso.CreateFolder(appdata+"\\DRPSu");
}
if(!fso.FolderExists(appdata+"\\DRPSu\\DRIVERS")){
	fso.CreateFolder(appdata+"\\DRPSu\\DRIVERS");
}
var driversPath = appdata+"\\DRPSu\\DRIVERS";


var infobar_drvNone_old = infobar_drvNone;
infobar_drvNone = function(){
	infobar_drvNone_old();
	
	
	infobar(
			'<img id="infobar_img" src="tools\\load.gif" style="padding-right:10px;"/>' + about_connecting,
			'<div class="status" style="font-size: 16px; margin-bottom: 1%"></div><div id="progressbar" style="width: 10%; float: left; margin-right: 10px"></div><div class="driver_percents" style="margin-left: 3%"></div><div class="speed" style="margin-left: 3%; margin-top: 1%"></div>',
			'red'
		);
	
	
	set_lists
		("none",
		 "block",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",

		 "none",
		 "none", //"block",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none"
		);
}
infobar_drvNone();

//$('#tab-driver a span').html(infobar_tabDriver + ' Offline <b class="badge badge-warning" id="badge-drivers">0</b>');
$('#tab-search a span').html(infobar_tabDriver + ' Online <b class="badge badge-warning" id="badge-online-drivers">0</b>');
$('.tab').prepend( $('#tab-search') );
$('#badge-drivers').hide();



var JSON = JSON || {};
// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {

	var t = typeof (obj);
	if (t != "object" || obj === null) {

		// simple data type
		if (t == "string") obj = '"'+obj+'"';
		return String(obj);

	}
	else {

		// recurse array or object
		var n, v, json = [], arr = (obj && obj.constructor == Array);

		for (n in obj) {
			v = obj[n]; t = typeof(v);

			if (t == "string") v = '"'+v+'"';
			else if (t == "object" && v !== null) v = JSON.stringify(v);

			json.push((arr ? "" : '"' + n + '":') + String(v));
		}

		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
};
// implement JSON.parse de-serialization
JSON.parse = JSON.parse || function (str) {
	if (str === "") str = '""';
	eval("var p=" + str + ";");
	return p;
};



function online_downloader_init(){
	//Forming the arrays of the not installed drivers and all installed drivers
	for (var i = 0; i < dev_IDs.length; i++) {
		if (dev_found[i]) {
			continue;
		}
		//Filling the array of the not installed drivers
		if (dev_curstatus[i].indexOf("DEVICE HAS A PROBLEM") != -1 || dev_inst_ind[i] == "undefined") {
			formatted_str = dev_IDs[i].toString().replace(/\\/g, "-");
			not_installed_drivers.push(formatted_str);
		} else {
			formatted_str = dev_IDs[i].toString().replace(/\\/g, "-");
			if ((formatted_str.indexOf("DEV") != -1 || formatted_str.indexOf("PID") != -1) && (formatted_str.indexOf("VEN") != -1 || formatted_str.indexOf("VID") != -1) && formatted_str.indexOf("ROOT_HUB20") == -1 && formatted_str.indexOf("VID_12d1") == -1) {
				var exists = false;
				/*installed_drivers.push(formatted_str);
				 not_installed_versions[dev_IDs[i]] = table_instver[dev_IDs[i]];*/
				for (var counter = 0; counter < installed_drivers.length; counter++) {

					if (installed_drivers[counter].indexOf(formatted_str) != -1 ||
						formatted_str.indexOf(installed_drivers[counter]) != -1) {
						exists = true;
					}
				}
				if (exists == false) {
					installed_drivers.push(formatted_str);
					not_installed_versions[dev_IDs[i]] = table_instver[dev_IDs[i]];
				}

			}
		}
		for (t = dev_group[i]; i < dev_IDs.length && dev_group[i] == t; i++);
		i--;
	}
	

	sendPost("http://test-st.drp.su/drivers/response.php", not_installed_drivers, installed_drivers);
	
}


if (IEVers=='10'){
	$(window).load(function(){
		setTimeout(function(){
			online_downloader_init();
		},5000);
	});
}
else {
	online_downloader_init();
}



/*
 Method to send prepared data to the server via the JSONP request. The callback with the necessary data will be returned
 */

function sendPost(url, not_installed, installed) {
    var prepared_not_installed = JSON.stringify(not_installed);
    var prepared_installed = JSON.stringify(installed);

    var system_version = 32;
    if (navigator.userAgent.indexOf("WOW64") != -1 ||
        navigator.userAgent.indexOf("Win64") != -1) {
        system_version = 64;
    }
	
	
    OSName = "5"
    if (OSVersion == 6.3) OSName = "81";
    if (OSVersion == 6.2) OSName = "8";
    if (OSVersion == 6.1) OSName = "7";
    if (OSVersion == 6.0) OSName = "6";

	//setTimeout(function(){
	//$(window).load(function(){
		$.ajax({
			url: url,
			dataType: 'jsonp',
			type: 'GET',
			crossDomain: true,
			cache: false,
			contentType: 'text/json; charset=utf-8',
			//Request with the data about the drivers
			data: {not_installed: prepared_not_installed, installed: prepared_installed, version: system_version, os: OSName},
			success: function (json) {
				try {
					f = fso.OpenTextFile(logFolder+"DRP-Lite-Drivers.txt", 2, true);
				} 
				catch(e) {}
				
				$('#driver_online').html("<table style='font-size: 14px; margin: 30px 0;' " +
					"class='button-table'></table>");
				for (var i = 0; i < json.not_installed.length; i++) {
					if (json.not_installed[i] != null) {
						//Changing the extension of the file that needs to be downloaded
						//parsed_url = json.not_installed[i][0].replace(/(zip)$/, "exe")
						parsed_url = json.not_installed[i][0];
						if (!driver_exists(parsed_url, 'tools//DRIVERS')) {
							if (parsed_url.indexOf("Touchpad") == -1) {
								try {
									f.WriteLine("RECIEVED DRIVER - " + json.not_installed[i][2] + " URL -" + parsed_url);
								}
								catch(e) { }
								//Forming the table with drivers
								$('#driver_online table').append("<tr class='driver_approved'>" +
									"<td width='50'><input type='checkbox' checked><img src='tools\\ico\\button\\0.png'></td>" +
									//I am storing the URL of the drivers in the ID of TD to have a pretty easy access.
									"<td class='driver_url' style='width: 63%; text-align:left' id='" + parsed_url + "'>" + json.not_installed[i][2] + "</td>" +
									//Just a size of the file that was returned by the get_size function
									"<td class='size' style='width: 30%'>" + get_size(parsed_url) + "</td>" +
									"</tr>");
							}
						}
					}
				}
				// Drivers that need to be updated
				if (json.installed.length != 0) {

					for (var i = 0; i < json.installed.length; i++) {
						var driver_date = new Date(json.installed[i][1]);
						var modified_driver = json.installed[i][3].toString().replace('-', '\\');
						var current_driver_date = new Date(not_installed_versions[modified_driver]);
						//If the driver needs to be updated


						if (driver_date.getTime() > current_driver_date.getTime()) {
							//parsed_url = json.installed[i][0].replace(/(zip)$/, "exe");
							parsed_url = json.installed[i][0];
							if (!driver_exists(parsed_url, driversPath)) {
								if (parsed_url.indexOf("Touchpad") == -1) {
									try {
										f.WriteLine("RECIEVED DRIVER - " + json.installed[i][2] + " URL -" + parsed_url);
									}
									catch(e) { }
									$('#driver_online table').append("<tr class='driver_approved'>" +
										"<td width='50'><input type='checkbox' checked><img src='tools\\ico\\button\\0.png'></td>" +
										//I am storing the URL of the drivers in the ID of TD to have a pretty easy access.
										"<td class='driver_url' style='width: 83%; text-align:left' id='" + parsed_url + "'>" + json.installed[i][2] + "</td>" +
										//Just a size of the file that was returned by the get_size function
										"<td class='size' style='width: 10%'>" + get_size(parsed_url) + "</td>" +
										"</tr>");
								}
							}

						}

					}
					try {
						f.Close();
					}
					catch(e) { }
				}

				//Check if all of the drivers were downloaded
				if ($('.driver_approved').length > 0) {
					$('#driver_online table').after("<div class='install' style='margin-top: 20px;'>" +
						"<a href='#' class=' btn btn-success drivers_download'>" + infobar_buttonInst + " " +
						"<span class='sum'></span>" +
						"</a>" +
						"</div>");
					recalculate();
				} else {
					//$('#driver_online table').after("<h4>" + infobar_infoAllUpd + "</h4>");
					infobar_drvAllOk();
					setTab('tab-search');
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
					//setTimeout(online_downloader_init,5000);
					//alert('AJAX Error: Requested JSON parse failed.');
					refresh();
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
	//});
	//},4000);
}


function randomNumber(m,n){
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor( Math.random() * (n - m + 1) ) + m;
}
function sizeConvert(folderSize,unit) {
	folderSize = parseFloat(folderSize);
	unit = (typeof(unit)=='string'?unit.toUpperCase():'');

	switch(unit){
		case 'KB':
		  folderSize = folderSize /1024;
		  break;
		case 'MB':
		  folderSize = folderSize /1024 /1024;
		  break;
		case 'GB':
		  folderSize = folderSize /1024 /1024 /1024;
		  break;
		case 'BITS':
		  folderSize = folderSize * 8;
		  break;
		case 'KBITS':
		  folderSize = folderSize /1024 * 8;
		  break;
		case 'MBITS':
		  folderSize = folderSize /1024 /1024 * 8;
		  break;
		case 'GBITS':
		  folderSize = folderSize /1024 /1024 /1024 * 8;
		  break;
		default:
		  folderSize = folderSize;
	}
	return +folderSize.toFixed(1);
};
/*
 Just a size getter by
 */
function get_size(url) {
	var StatusFile = logFolder + 'WgetStatus-' + randomNumber(1,9999999999) + '.txt';
	//alert(StatusFile);
	
    WshShell.run('"tools\\wget.exe" --spider -o "' + StatusFile + '" ' + url, 0, true);
	var ret = ' ' + sizeConvert(get_info(StatusFile, /Length: (.+) \(/),'MB') +' Mb';
	if (ret.indexOf('NaN') != -1) { ret = 'null'; }
	//alert(ret);
	
    return ret;
}

function get_info(file, regex) {
	try {
		objFile = fso.openTextFile(file, 1);
		strContents = objFile.ReadAll();
		progress = strContents.match(regex)[1];
		return progress;
	}
	catch(e) {
		return false;
	}
}

/*
 Calculation of the total chosen drivers size
 */
function recalculate() {
    var sum = 0.0;
    var number = $('.size').length;
	$('#badge-online-drivers').html(number);
	
    $('.size').each(function (index, element) {
        if ($(element).parent().hasClass('driver_approved')) {
            if ($(element).html() != 'null' && $(element).html() != drv_notKnown) {
                sum += parseFloat($(element).html().slice(1, -2));

            } else {
                $(element).html(drv_notKnown);
                $(element).parent().removeClass('driver_approved');
                $(element).parent().find('input:checkbox').removeAttr('checked');
                $(element).parent().find('input:checkbox').attr('checked', false);
            }
        }
    });
    $('.sum').html("(" + sum.toFixed(1) + " MB )");
    if (number > 0) {
        /*$('.drivers_title').html("<div style='margin-bottom: 10px; font-size: 18px; font-weight: bold;'>" + manual_con_findDrv + "</div>" +
            " <span style='font-weight: 100'>" + con_driver_available + " </span>" + number + " " +
            "<br><a href='#' class='btn btn-success all_drivers_download'>" + infobar_buttonInstAll + "</a>");*/
			
		infobar(
				"<div class='program_title'>" + manual_con_findDrv + "</div>",
				"<div class='program_infobar_content'><b>" + number + "</b> - " + morfolog('infobar_infoDriverAvailable',number) + "<br><button class='infobar_button btn btn-success all_drivers_download' onclick='all_drivers_download(); return false;' style='float:left'>"+infobar_buttonRunAll+"</button></div>",
				'red'
			);
			
    }else{
		infobar(
				"<div class='program_title'>" + infobar_titleAllInst + "</div>",
				"<div class='program_infobar_content'>" + drv_allSuccess + "</div>",
				'green'
			);
    }
    if(sum > 0.0){
        $('.drivers_download').show();
    } else {
        $('.drivers_download').hide();
    }
}

function tabSearch_OnClick(){
	if($('#tab-search').hasClass('active')){
		$('#driver_online').show();
	}
	$('.tab').on('mousedown', 'li', function(){
		$('#driver_online').hide();
		
		if($(this).attr('id') == 'tab-search'){
			$('#driver_online').show();
			recalculate();
		}
	});
}












function all_drivers_download() {
	$('#driver_online input:checkbox').attr('checked', true);
	
	
	var instSoft = false;
	//if (confirm(misc_inst1 + "?")) { instSoft = true; }
	/*
	var btn = WshShell.Popup(misc_inst1 + "?", 60, "DriverPack Solution", 0x3 + 0x20);
	switch(btn) {
		// Cancel button pressed.
		case 2:
			return false;
			break;
		// Yes button pressed.
		case 6:
			instSoft = true;
			break;
		// No button pressed.
		case 7:
			instSoft = false;
			break;
		// Timed out.
		case -1:
		   return false;
		   break;
	}
	*/
	

	try{
		$('.drivers_download').click();
	}
	catch (Ex){ debugger; }
	
	if (instSoft) {
		try{
			$('.programs_download').click();
		}
		catch (Ex){ debugger; }
	}

}





$('document').ready(function () {
	
	tabSearch_OnClick();


    $('.drivers_title').html('<img id="infobar_img" src="tools\\load.gif" style="padding-right:10px;"/>' + about_connecting + ' <div class="status" style="font-size: 16px; margin-bottom: 1%"></div><div id="progressbar" style="width: 10%; float: left; margin-right: 10px"></div>' +
        '<div class="driver_percents" style="margin-left: 3%"></div>' +
        '<div class="speed" style="margin-left: 3%; margin-top: 1%"></div>');

    //Checkboxes event. Recalculation of the total size
    $('#driver_online').on('click', 'input:checkbox', function () {
        /*if($('.install').css('display') == 'none' || $('.install').css('visibility') == 'none'){
         $('.install').show();
         }*/
        var parent_tr = $(this).parent().parent();
        if (parent_tr.hasClass('driver_approved')) {
            parent_tr.removeClass('driver_approved');
            recalculate();
        } else {
            parent_tr.addClass('driver_approved');
            recalculate();
        }
    });

    /*  $('#driver_online').on('click', '.check', function () {
     $('#driver_online input:checkbox').attr('checked', true);
     recalculate();
     });*/


    /*
     $('#driver_online').on('click', '.uncheck', function () {
     $('#driver_online input:checkbox').attr('checked', false);
     recalculate();
     });*/

    /*
     Event to be triggered by the "Download the drivers" href
     */
    $('#driver_online').on('click', '.drivers_download', function(){
        try {
			$('#tabs').css('visibility','hidden');
			
            var drivers_to_launch = [];
            var drivers_number = $('.driver_approved').length;
            //Change the title, add the progress bar
            //$('.drivers_title').html('<div class="status" style="font-size: 16px; margin-bottom: 1%"></div><div id="progressbar" style="width: 10%; float: left; margin-right: 10px"></div>' +
            //    '<div class="driver_percents" style="margin-left: 3%"></div>' +
            //    '<div class="speed" style="margin-left: 3%; margin-top: 1%"></div>');
			
			//infobar(
			//	"<div class='program_title'>" + manual_con_findDrv + "</div>",
			//	"<div class='program_infobar_content'><b>" + number + "</b> - " + morfolog('infobar_infoDriverAvailable',number) + "<br><button class='infobar_button btn btn-success all_drivers_download' style='float:left'>"+infobar_buttonRunAll+"</button></div>",
			//	'red'
			//);
			
					infobar(
						"<div class='drivers_title'>" + about_connecting + "</div>",
						'<div class="status" style="font-size: 16px; margin-bottom: 1%"></div> <div id="progressbar" style="width: 10%; float: left; margin-right: 10px; height:15px;"></div> <div class="driver_percents" style="margin-left: 3%"></div> <div class="speed" style="margin-left: 3%; margin-top: 1%"></div> ',
						'green'
					);
			
            //Default value for the progress bars
            $("#progressbar").progressbar({
                value: 0
            });
            //Setting the background, etc of the progressbar
            $('.ui-progressbar-value').css('background', "#4AFF40");
            $('.ui-progressbar').css('height', "3px");

			

			
			
            //Not a magic. Just a first driver for the "Driver 1 of N" string
            var number = 1;
            $('.driver_url').each(function (index, element) {
                if ($(element).parent().hasClass('driver_approved') && !driver_exists($(element).attr('id'), driversPath)) {
					
					//logoRotation = true;
					//rotation();
					if (!fso.FileExists('http://test-st.drp.su/drivers/dpinst.zip')) {
						wget_driver('http://test-st.drp.su/drivers/dpinst.zip', driversPath);
					}
					
					//"Driver N of M" string former
                    $('.drivers_title').html(about_connecting + " " + number + " / " + drivers_number);
                    //Getting the names of the downloaded drivers
                    drivers_to_launch.push(wget_driver($(element).attr('id'), driversPath));
                    //Removing the TR's of the drivers that were downloaded.
                    $(element).parent().remove();
                    number += 1;

                }
            });

            //Changing the title - removing the progtressbar, changing the text for "Installing drivers"
            $('.drivers_title').html('<div class="status" style="font-size: 16px; margin-bottom: 1%">' + infobar_tabInstall + '... <img id="infobar_img" src="tools\\load.gif" style="padding-right:10px;"/></div>');
			
			//Clear interval
			clearInterval(getPercents_interval);
			getPercents_interval='';
			
            //If there is no more drivers needs to be installed - just removing the download href, adding the label.
            /*if (!$('.driver_approved').length > 0) {
             $('.install').remove();
             $('#driver_online table').after("<h4>" + drivers_all_ok + "</h4>");
             }*/

            //Launching the downloaded drivers
			// 1. Распаковка дров
			// 2. Распаковка dpinst
			// 3. Запуск dpinst
			// 4. Удаление temp файлов
			
			// Cleaning
			WshShell.Run('cmd /c rd /S /Q "' + WshShell.ExpandEnvironmentStrings('%temp%\\drp\\unzip\\drp') + '"',0,true);
			// Unzip
			WshShell.Run('tools\\7za.exe x -yo"' + WshShell.ExpandEnvironmentStrings('%temp%\\drp\\unzip\\drp') + '" "' + driversPath + '\\*"',0,true);
			// Installing drivers
			WshShell.Run(
				WshShell.ExpandEnvironmentStrings('%temp%\\drp\\unzip\\drp\\dpinst\\Setup') + (is64?'64':'') + '.exe ' + 
				'/SW /c /sa /PATH "' + WshShell.ExpandEnvironmentStrings('%temp%\\drp\\unzip') + '"',
				0,true
			);
			// Unzip
			//WshShell.Run('tools\\7za.exe x -yo"' + WshShell.ExpandEnvironmentStrings('%temp%\\drp\\unzip\\drp') + '" "' + driversPath + '\\*"',0,true);
			
			
			/*
            for (var counter = 0; counter < drivers_to_launch.length; counter++) {
                if (drivers_to_launch[counter] != null) {
                    if (fso.FileExists(driversPath +'\\' + drivers_to_launch[counter])) {
                        WshShell.Exec('"'+driversPath+ '\\' + drivers_to_launch[counter] + '"');
                    }
                }
            }
			*/
			$('#tabs').css('visibility','');
            recalculate();
        } catch (Ex) {

        }
    });

});



//var refresh_old = refresh;
refresh = function(){
	//refresh_old();
	
	// Cleaning
	WshShell.Run('cmd /c rd /S /Q "' + driversPath + '"',0,true);
	WshShell.Run('cmd /c rd /S /Q "' + programsPath + '"',0,true);
	// ReInit
	//online_downloader_init();
	location.reload();
	
}
	
	

/*
 A function that downloads the drivers by the string.
 */
var getPercents_interval;
function wget_driver(downloadURI, targetFolder, size) {
    if (fso.FileExists('tools\\wget.exe')) {
        if (!driver_exists(downloadURI, targetFolder)) {
            var parsed_url = downloadURI.split("/");
            //Function to be run during the downloading to check the progress.
            if (!getPercents_interval) { getPercents_interval = setInterval('getPercents()', 150); }
            var wsShellObj = WshShell.run('"tools\\wget.exe" -P "' + targetFolder + '" ' + downloadURI + " -o "+logFolder+"DRP-Lite-Status.txt", 0, true);
            var downloudedFileDest = targetFolder + (targetFolder ? '\\' : '') + fso.GetFileName(downloadURI);
            return parsed_url[parsed_url.length - 1];
        } else {
            return null;
        }
    }
}
/*
 Function that reads the file with the status of the file that is being downloaded.
 */
function getPercents() {
    //File that is being used as a temp storage.
    try {
        objFile = fso.openTextFile(logFolder+"DRP-Lite-Status.txt", 1);
        var reader = objFile.ReadAll();
        //getting all of the percents in the file.
        var percents = reader.match(/(\d+)\%/gi);
        if (percents !== null) {
            var num = percents[percents.length - 1].slice(0, -1);
            $('.driver_percents').html(num + "%");
            $("#progressbar").progressbar({
                value: parseInt(num)
            });
            var speed = reader.match(/(% +\d+\.*\d+.{1})/gi);
            var last_speed = speed[speed.length - 1].slice(2);
            $('.speed').html(last_speed + "/s");
        }
    } catch (Ex) {

    } finally {
        return 1;
    }
}

/*
 Checking the driver in the folder. NOT in tha system, but only in the folder
 */
function driver_exists(downloadURI, targetFolder) {
	var number = $('.size').length;
	$('#badge-online-drivers').html(number);
	
    var parsed_url = downloadURI.split("/");
    var downloaded_driver = targetFolder + "//" + parsed_url[parsed_url.length - 1];
	
    if (fso.FileExists(downloaded_driver)) {
        return true;
    } else {
        return false;
    }
}