var version = "16";
var verType = "Alpha";
var buildDate = "2015/04/27"; // YYYY/MM/DD

var WshShell = new ActiveXObject("WScript.Shell");
var WshEnv = WshShell.Environment("PROCESS");
var AppData = WshShell.SpecialFolders("AppData");
var FSO = new ActiveXObject("Scripting.FileSystemObject");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var softPath = WshShell.SpecialFolders("AppData") + '\\DRPSu\\PROGRAMS';
var locator = new ActiveXObject("WbemScripting.SWbemLocator");
var objWMIService = locator.ConnectServer(null, "root\\cimv2");

//Fix IE 9/10 bugs and Feature
WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\Styles" /v "MaxScriptStatements" /t REG_DWORD /d 0xffffffff /f',0,true);
WshShell.Run('reg add "HKLM\\Software\\Microsoft\\Internet Explorer\\Styles" /v "MaxScriptStatements" /t REG_DWORD /d 0xffffffff /f',0,true);
WshShell.Run('reg add "HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_NINPUT_LEGACYMODE" /v "mshta.exe" /t REG_DWORD /d 0x00000000 /f',0,true); //Touch Screen enabled
WshShell.Run('reg add "HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_GPU_RENDERING" /v "mshta.exe" /t REG_DWORD /d 0x00000001 /f',0,true); //GPU rendering enabled
//Fix NTFS zone checks alerts
WshShell.Environment("PROCESS")("SEE_MASK_NOZONECHECKS") = 1;




var is64 = false;
if (WshShell.ExpandEnvironmentStrings("%PROCESSOR_ARCHITECTURE%")=="AMD64"
        ||WshShell.ExpandEnvironmentStrings("%PROCESSOR_ARCHITEW6432%")!="%PROCESSOR_ARCHITEW6432%"){
        is64 = true;
}


var OSVersion = 5;
var OSVersionSP = 0;

var colItems = objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem","WQL");
var enumItems = new Enumerator(colItems);
for (; !enumItems.atEnd(); enumItems.moveNext()) {
	var OSfullName = enumItems.item().Caption;
	var objItem = OSfullName.toLowerCase();
	var OSServicePack = enumItems.item().CSDVersion;
	var OSVersionS=enumItems.item().Version.replace(/.\d\d.*/,"");
}

switch(OSVersionS)
{
	case '5.1':OSVersion=5.1;break;
	case '6.0':OSVersion=6;break;
	case '6.1':OSVersion=6.1;break;
	case '6.2':OSVersion=6.2;break;
	case '6.3':OSVersion=6.3;break;
	case '6.4':OSVersion=6.4;break;
	case '10.0':OSVersion=10.0;break;
	default: OSVersion=parseFloat(OSVersionS);
}
if (typeof(OSVersion)!='number') { OSVersion = 5; }

//ServicePack
try {
	if (OSServicePack.indexOf("Service Pack") != "-1") {
		OSServicePack = OSServicePack.replace(/Service Pack /i,"").replace('null','').replace('undefined','');
		OSVersionSP = parseInt(OSServicePack);
	}
}
catch (e) {}
//ServicePack




//Include other JavaScript or CSS
function inc(filename){
	var head = document.getElementsByTagName('head').item(0);
	if (fso.GetFileName(filename).split('.')[1].toLowerCase()=='css'){
		script=document.createElement("link");
		script.setAttribute("rel", "stylesheet");
		script.setAttribute("type", "text/css");
		script.setAttribute("href", filename);
	}
	else {
		script = document.createElement('script');
		script.src = filename;
		script.type = 'text/javascript';
	}
	
	if (typeof script!="undefined"){
		head.appendChild(script);
	}
}


function print_r(arr, level) {
    var print_red_text = "";
    if(!level) level = 0;
    var level_padding = "";
    for(var j=0; j<level+1; j++) level_padding += "    ";
    if(typeof(arr) == 'object') {
        for(var item in arr) {
            var value = arr[item];
            if(typeof(value) == 'object') {
                print_red_text += level_padding + "'" + item + "' :\n";
                print_red_text += print_r(value,level+1);
        } 
            else 
                print_red_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
        }
    } 

    else  print_red_text = "===>"+arr+"<===("+typeof(arr)+")";
    return print_red_text;
}


function getFullPath() {
	var fullpath1 = document.location.pathname;
	var substring_start = 0;
	var substring_end = fullpath1.lastIndexOf('\\');

	if (fullpath1.indexOf('/') == 0) {
		substring_start = 1;
	}	//Fix if slash is first charecter
	if (substring_end == -1) {
		substring_end = fullpath1.lastIndexOf('/') + 1;
	}	//Fix for run from IE
	fullpath1 = fullpath1.substring(substring_start, substring_end);
	fullpath1 = decodeURI(fullpath1);

	return fullpath1;
}

var folderReport = getFullPath() + "\\Reports";
var fileReport = folderReport + "\\" + WshShell.ExpandEnvironmentStrings("%computername%") + ".txt";



function cloneObj(object){
	return JSON.parse(JSON.stringify(object));
}








//var logFolder = WshEnv("WINDIR")+'\\Logs\\DRPLog\\';
var logFolder = AppData+'\\DRPSu\\Logs\\DRPLog\\';
if (!fso.FolderExists(AppData+'\\DRPSu')) { fso.CreateFolder(AppData+'\\DRPSu'); }
if (!fso.FolderExists(AppData+'\\DRPSu\\Logs')) { fso.CreateFolder(AppData+'\\DRPSu\\Logs'); }
if (!fso.FolderExists(AppData+'\\DRPSu\\Logs\\DRPLog')) { fso.CreateFolder(AppData+'\\DRPSu\\Logs\\DRPLog'); }
//if (!fso.FolderExists(WshEnv("WINDIR")+'\\Logs')) { fso.CreateFolder(WshEnv("WINDIR")+'\\Logs'); }
//if (!fso.FolderExists(WshEnv("WINDIR")+'\\Logs\\DRPLog')) { fso.CreateFolder(WshEnv("WINDIR")+'\\Logs\\DRPLog'); }

var wget_path = 'tools\\wget.exe';
function wget_driver(downloadURI, targetFolder, size) {
	log('Wget start');
    if (fso.FileExists(wget_path)) {
		log('Wget exists');
        if (!driver_exists(downloadURI, targetFolder)) {
            var parsed_url = downloadURI.split("/");
            //Function to be run during the downloading to check the progress.
            //if (!getPercents_interval) {
            //    getPercents_interval = setInterval('getPercents()', 150);
            //}
			
			log('Starting wget.exe: ' + '"'+wget_path+'" -P "' + targetFolder + '" "' + downloadURI + '" -o "' + logFolder + 'DRP-Lite-Status.txt"');
			var wsShellObj = WshShell.run('"'+wget_path+'" -P "' + targetFolder + '" "' + downloadURI + '" -o "' + logFolder + 'DRP-Lite-Status.txt"', 0, true);
            log( [ fso.OpenTextFile(logFolder + "DRP-Lite-Status.txt", 1, false).ReadAll() ] );
			
			var downloudedFileDest = targetFolder + (targetFolder ? '\\' : '') + fso.GetFileName(downloadURI);
            return parsed_url[parsed_url.length - 1];
        } else {
            return null;
        }
    }
}

/*
 Checking the driver in the folder. NOT in tha system, but only in the folder
 */
function driver_exists(downloadURI, targetFolder) {
    //var number = $('.size').length;
    //$('#badge-online-drivers').html(number);

    var parsed_url = downloadURI.split("/");
    var downloaded_driver = targetFolder + "\\" + parsed_url[parsed_url.length - 1];
	
    if (fso.FileExists(downloaded_driver)) {
		log('Downloaded file exists - TRUE:' + downloaded_driver);
        return true;
    } else {
		log('Downloaded file exists - FALSE:' + downloaded_driver);
        return false;
    }
}



/*
 A function that downloads the drivers by the string.
 *
var getPercents_interval;
function wget_driver(downloadURI, targetFolder, size) {

        if (!driver_exists(downloadURI, targetFolder)) {
            var parsed_url = downloadURI.split("/");
            //Function to be run during the downloading to check the progress.
            if (!getPercents_interval) {
                getPercents_interval = setInterval('getPercents()', 150);
            }
            downloadFile(downloadURI);
            return parsed_url[parsed_url.length - 1];
        } else {
            return null;
        }

}
*/

/*
 Function that reads the file with the status of the file that is being downloaded.
 */
function getPercents() {
    //File that is being used as a temp storage.
    try {
        objFile = fso.openTextFile(logFolder + "DRP-Lite-Status.txt", 1);
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












// Read registry
// ToDo: Придумать авто-тесты!!!
function RegRead(key){
	
	key = key.replace('HKEY_LOCAL_MACHINE\\','HKLM\\');
	key = key.replace('HKEY_CURRENT_USER\\','HKCU\\');
	
	ret = RegRead32(key);
	
	if ((!ret) && (key.indexOf('\\SOFTWARE\\Microsoft\\') != -1)) {
		t_key = key.replace('\\SOFTWARE\\Microsoft\\','\\SOFTWARE\\Wow6432Node\\Microsoft\\');
		
		ret = RegRead32(key);
	}
	
	if (!ret){
		ret = RegRead64(key);
	}
	
	return ret;
	
}

function RegRead32(key) {
	//lf('RegRead');
	var ret = "";
	try { ret = WshShell.RegRead(key); }
	catch(e) { ret = ""; }
	return ret;
}


function RegRead64(key) {
	var HKEY_LOCAL_MACHINE = 0x80000002;
	var HKEY_CURRENT_USER = 0x80000001;
	
	var context = new ActiveXObject("WbemScripting.SWbemNamedValueSet");
	context.Add("__ProviderArchitecture", 64);
	context.Add("__RequiredArchitecture", true);
	var locator = new ActiveXObject("Wbemscripting.SWbemLocator");
	var wbem = locator.ConnectServer(null ,"root\\default", null, null, null, null, null, context);
	var StdRegProv = wbem.Get("StdRegProv");
	var method = StdRegProv.Methods_.Item("GetStringValue");
	var inParameters = method.InParameters.SpawnInstance_();
	
	if (key.indexOf('HKLM\\') == 0){
		inParameters.hDefKey = HKEY_LOCAL_MACHINE;
	}
	else if (key.indexOf('HKCU\\') == 0){
		inParameters.hDefKey = HKEY_CURRENT_USER;
	}
	
	inParameters.sSubKeyName = key.substring(5);
	inParameters.sValueName = "";
	var outParameters = StdRegProv.ExecMethod_("GetStringValue", inParameters, 0, context);
	//alert(outParameters.sValue);
	
	return outParameters.sValue;
}



var driverJsonDB = '';
var softJsonDB = '';
var wgetJsonDB = '';


//JSONP
var JSONP = function(global){
    // (C) WebReflection Essential - Mit Style
	// 216 bytes minified + gzipped via Google Closure Compiler
    function JSONP(uri, callback) {
        function JSONPResponse() {
            try { delete global[src] } catch(e) {
                // kinda forgot < IE9 existed
                // thanks @jdalton for the catch
                global[src] = null
            }
            documentElement.removeChild(script);
            callback.apply(this, arguments);
        }
        var
            src = prefix + id++,
            script = document.createElement("script")
        ;
        global[src] = JSONPResponse;
        documentElement.insertBefore(
            script,
            documentElement.lastChild
        ).src = uri + "=" + src;
    }
    var
        id = 0,
        prefix = "__JSONP__",
        document = global.document,
        documentElement = document.documentElement
    ;
    return JSONP;
}(this);
//JSONP

var request = {
    getXmlHttp: function () {     // функция для создания объекта AJax
        var request = false;
        try {
            request = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (othermicrosoft) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    request = false;
                }
            }
        }
        if (!request) {
            throw new Error("Error initializing XMLHttpRequest!");
        }
        return(request);
    },
    /*parseObj: function (obj, start_key) {
     var data = '';
     for (var key in obj) {
     if (typeof obj[key] == 'object') {
     data += (data == '' ? '' : '&') + this.parseObj(obj[key], start_key !== '' ? (start_key + '[' + key + ']') : key);
     } else {
     data += (data == '' ? '' : '&') + (start_key !== '' ? (start_key + '[' + key + ']') : key) + '=' + encodeURIComponent(obj[key]);
     }
     }
     return data;
     },*/
    send: function (params) {
        var xmlhttp = this.getXmlHttp();
		//var xmlhttp = XMLHttpRequest;
		//var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		//var xmlhttp = new XHR();
		//var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		//var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		//var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200 && typeof params.success == 'function') {
                    params.success.call(xmlhttp, xmlhttp.responseText);
                } else if (typeof params.error == 'function') {
                    params.error.call(xmlhttp, xmlhttp.statusText);
                }
            }
        };
        if (typeof params.data === 'object') {
            var data = Object.keys(params.data).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(params.data[k])
            }).join('&');
        } else {
            data = params.data;
        }
        if (params.type === 'GET') {
			//alert(params.type+ ' '+ params.url + '?' + data + ' '+ params.async);
            xmlhttp.open(params.type, params.url + '?' + data, params.async);
            //xmlhttp.setRequestHeader('Content-Type', params.contentType);
            xmlhttp.setRequestHeader('Accept-Charset', 'utf-8');
            xmlhttp.setRequestHeader('Content-Type', params.contentType);
            xmlhttp.send();
        } else if (params.type === 'POST') {
            xmlhttp.open(params.type, params.url, params.async);
            xmlhttp.setRequestHeader('Content-Type', params.contentType);
            xmlhttp.send(data);
        }
    }
};

var resize = {
    init: function () {
        try {
            self.resizeTo(screen.width, screen.height - 36);
            self.moveTo(0, 0);
            if ((screen.width < width) || (screen.height < height)) {
                self.resizeTo(800, 600 - 25);
                self.moveTo(0, 0);
                onload(function () {
                    tooglePanel();
                });
            }
        }
        catch (err) {
        }
    }
};
//resize.init();

document.title = document.title + " " + version + " " + verType;

