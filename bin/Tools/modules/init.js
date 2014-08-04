//function init
function ttlOver() {}
function ttlOut() {}
function infobar_update() {}
function infobar_loading() {}
function log() {}
function setTab(){}
function hideDetails(){}
function fixPNG(){}
var yaCounter = {}
yaCounter.reachGoal = function(n) { }

//Last call function
var lfn = ''; var lfn_count = 1;
function lf(fname) {
	if (lfn!=fname){
//  	  try{ log(' FC: Function call '+lfn+' ('+lfn_count+')'); } catch(e){}
		lfn=fname;
		lfn_count = 1;
	}
	else { lfn_count++; }
}

// Read registry
function RegRead(key) {
	lf('RegRead');
	var ret = "";
	try { ret = WshShell.RegRead(key); }
	catch(e) { ret = ""; }
	return ret;
}

function RegRead64(key) {
	var HKEY_LOCAL_MACHINE = 0x80000002;
	var context = new ActiveXObject("WbemScripting.SWbemNamedValueSet");
	context.Add("__ProviderArchitecture", 64);
	context.Add("__RequiredArchitecture", true);
	var locator = new ActiveXObject("Wbemscripting.SWbemLocator");
	var wbem = locator.ConnectServer(null ,"root\\default", null, null, null, null, null, context);
	var StdRegProv = wbem.Get("StdRegProv");
	var method = StdRegProv.Methods_.Item("GetStringValue");
	var inParameters = method.InParameters.SpawnInstance_();
	inParameters.hDefKey = HKEY_LOCAL_MACHINE;
	inParameters.sSubKeyName = "SOFTWARE\\Space Sciences Laboratory, U.C. Berkeley\\BOINC Setup";
	inParameters.sValueName = "DATADIR";
	var outParameters = StdRegProv.ExecMethod_("GetStringValue", inParameters, 0, context);
	alert(outParameters.sValue);
}

// Get registry Value
function loadValue(key,default_val) {
	lf('loadValue');
	ret = RegRead(Reg+key) ? Boolean(parseInt(RegRead(Reg+key))) : default_val;
	return ret;
}

// Open url
function goToUrl(url){
	lf('goToUrl');
	try {
		defBrowser = RegRead("HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\");
		if (!defBrowser) defBrowser = RegRead("HKLM\\SOFTWARE\\Clients\\StartMenuInternet\\");
		runComm = RegRead("HKLM\\SOFTWARE\\Clients\\StartMenuInternet\\" + defBrowser + "\\shell\\open\\command\\");
		runComm = runComm.replace(/"/ig,'');
		if (runComm)
			WshShell.Run('"' + runComm + '" ' + '"' + url + '"',1,false);
		else
			window.open(url);
	}
	catch(e) {
		log("Failed to open "+url);
		WshShell.Run('rundll32 url.dll,FileProtocolHandler '+url,1,false);
	}
	return false;
}

// htmlspecialchars
function htmlspecialchars(html) {
	lf('htmlspecialchars');
	html = html.replace(/&/g, "&amp;");
	html = html.replace(/</g, "&lt;");
	html = html.replace(/>/g, "&gt;");
	html = html.replace(/"/g, "&quot;");
	html = html.replace(/'/g, "&quot;");
	return html;
}

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

function trim(string) { try { return string.replace(/^\s+|\s+$/g,""); } catch(e) { } }

function onunload(func) {
	if (window.addEventListener) {
		window.addEventListener('unload', func, false); 
	}
	else if (window.attachEvent)  {
		window.attachEvent('onunload', func);
	}
}

function onload(func) {
	if (window.addEventListener) {
		window.addEventListener('load', func, false); 
	}
	else if (window.attachEvent)  {
		window.attachEvent('onload', func);
	}
}
