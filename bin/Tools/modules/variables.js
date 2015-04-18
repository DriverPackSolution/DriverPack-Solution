var version = "16";
var verType = "";

var WshShell = new ActiveXObject("WScript.Shell");
var AppData = this.WshShell.SpecialFolders("AppData");
var FSO = new ActiveXObject("Scripting.FileSystemObject");
var softPath = this.WshShell.SpecialFolders("AppData") + '\\DRPSu\\PROGRAMS';
var locator = new ActiveXObject("WbemScripting.SWbemLocator");
var objWMIService = locator.ConnectServer(null, "root\\cimv2");

var SVersion = 32;
if (navigator.userAgent.indexOf("WOW64") != -1 ||
        navigator.userAgent.indexOf("Win64") != -1) {
    SVersion = 64;
}
var OperatingSystem = objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL");
var OperatingSystemItems = new Enumerator(OperatingSystem);
for (; !OperatingSystemItems.atEnd(); OperatingSystemItems.moveNext()) {
    var OSVersion = OperatingSystemItems.item().Version.replace(/.\d\d.*/, "");
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

	return fullpath1;
}

var folderReport = getFullPath() + "\\Reports";
var fileReport = folderReport + "\\" + WshShell.ExpandEnvironmentStrings("%computername%") + ".txt";
function echo(str) {

	//Записываем вывод в файл
	if (!FSO.FolderExists(folderReport + "\\")) {
		FSO.CreateFolder(folderReport)
	}
	var fileReportOpen = FSO.OpenTextFile(fileReport, 8, true);
	fileReportOpen.WriteLine(str);
	fileReportOpen.close();

	//Выводим в текстовую форму
	//objTextA.value += str + '\r\n';
	//autoScroll();

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
        document.title = document.title + " " + version + " " + verType;
    }
};

resize.init();
