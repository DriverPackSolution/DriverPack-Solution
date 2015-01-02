// Detect OS
var colItems = objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem","WQL");
var enumItems = new Enumerator(colItems);
var objShell = new ActiveXObject("Shell.Application");
var current_dir = decodeURIComponent(getFullPath());
WshShell.CurrentDirectory = current_dir;
var OSVersion = 5;
var OSVersionSP = 0;
WshShell.Environment("PROCESS")("SEE_MASK_NOZONECHECKS") = 1; //Fix NTFS zone checks alerts


function getFullPath(){
	var fullpath1 = document.location.pathname;
	var substring_start = 0;
	var substring_end = fullpath1.lastIndexOf('\\');
	
	if (fullpath1.indexOf('/')==0) { substring_start = 1; }	//Fix if slash is first charecter
	if (substring_end==-1) { substring_end = fullpath1.lastIndexOf('/')+1; }	//Fix for run from IE
	fullpath1 = fullpath1.substring(substring_start,substring_end);
	
	return fullpath1;
}

for (; !enumItems.atEnd(); enumItems.moveNext()) {
	var OSfullName = enumItems.item().Caption;
	var objItem = OSfullName.toLowerCase();
	var OSServicePack = enumItems.item().CSDVersion;
	var OSVersionS=enumItems.item().Version.replace(/.\d\d.*/,"");
}


//if (objItem.indexOf("7") != "-1") {
//  alert(alert_win7notSupport);
//  window.close(); WScript.Sleep(1);
//}

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

//Fix IE 9/10 bugs and Feature
winRun('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\Styles" /v "MaxScriptStatements" /t REG_DWORD /d 0xffffffff /f',true,'',true);
winRun('reg add "HKLM\\Software\\Microsoft\\Internet Explorer\\Styles" /v "MaxScriptStatements" /t REG_DWORD /d 0xffffffff /f',true,'',true);
winRun('reg add "HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_NINPUT_LEGACYMODE" /v "mshta.exe" /t REG_DWORD /d 0x00000000 /f',true,'',true); //Touch Screen enabled
winRun('reg add "HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_GPU_RENDERING" /v "mshta.exe" /t REG_DWORD /d 0x00000001 /f',true,'',true); //GPU rendering enabled


if (current_dir.substr(0,1) == "\\") {
	//Pass control to the launcher when running on the network
	if (OSVersion >= 6) {
		objShell.ShellExecute("DriverPackSolution.exe", "", 0 , "runas", 1);
	}
	else {
		WshShell.Run("DriverPackSolution.exe",0,false);
	}
	window.close();
}

/*
if ((OSVersion >= 6) && (OSVersion != 6.2)) {
	//ToDo: DRP should check admin rights
	//ToDo: In IE10 is not possible to get the command line, so you need to do through WMI. And do not check the condition on Windows to version IE.
	// Run as administrator
	if (dpa.commandLine.indexOf('Run') == "-1") {
		objShell.ShellExecute("tools\\mshta.exe", dpa.commandLine + " Run", 0 , "runas", 1);
		window.close();
	}
}
*/


//Modify function 'WshShell.Run'
//Can run x64 programms
function winRun(src,hideMode,wait,bit64,timeout,onComplete,onTimeout_call){
	//try {
		if (!src) { return false; }
		if (!hideMode) { hideMode=false; }
		if (!wait) { wait=false; }
		hideMode=(hideMode?'0':'1');
		wait=!(wait?false:true);

		if (bit64&&is64) {
			hideMode=true;
			wait=false;
			src = 'tools\\cmd64.exe /C '+src;
		}

		//alert(typeof(onComplete));
		if (typeof(onComplete)=='function') {
			if (hideMode==='1') { oExec = WshShell.Exec(src); }
			//else { oExec = WshShell.Exec('tools\\hstart'+(is64?'64':'')+'.exe /NOCONSOLE /WAIT "cscript.exe //nologo tools\\start.vbs "'+src+'" '+hideMode+' '+wait+'"'); }
			  else { oExec = WshShell.Exec('tools\\start.exe "'+current_dir+'" "'+src+'" "'+hideMode+'" "'+wait+'"'); }
			winRun_process(oExec,onComplete,timeout,onTimeout_call);
			return oExec;
		}
		else { return WshShell.Run(src,hideMode,wait); }
	//}
	//catch(e) { return false; }
}

function winRun_process(oExec,onComplete,timeout,onTimeout_call,count){
	if (!count) { count=1; }
	if (!timeout) { timeout=60; }

	if (oExec.Status=='0') {
		//Too long wait
		if (timeout<count){
			if (typeof(onTimeout_call)=='function') {
				onTimeout_call(oExec);
			}
			return;
		}

		//Waiting...
		setTimeout(function (){ winRun_process(oExec,onComplete,timeout,onTimeout_call,(count+1)) },1000);
	}
	else {
		//When the process is completed
		onComplete(oExec);
	}
}

function taskkill(PID){
	if (typeof(PID)=="number"){
		WshShell.Run("TASKKILL /T /F /PID "+PID,0,true);
	}
	else if (typeof(PID)=="string"){
		WshShell.Run("TASKKILL /T /F /im "+PID,0,true);
	}
}


//IE version
function getInternetExplorerVersion(){
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer'){
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	else if (navigator.appName == 'Netscape'){
		var ua = navigator.userAgent;
		var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	return rv;
}

var IEVers = 0;
IEVers = getInternetExplorerVersion();


var IERealVers = 0;
try {
	IERealVers = RegRead('HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\Version').split('.');
	IERealVers = parseInt(IERealVers[0]);
	if (typeof(IERealVers)!='number') { IERealVers = 0; }
}catch(e) { IERealVers = 0; }

//Fix for IE10
try {
	if ((IERealVers==0)||(IERealVers==9)){
		IERealVers = RegRead('HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\svcVersion').split('.');
		IERealVers = parseInt(IERealVers[0]);
		if (typeof(IERealVers)!='number') { IERealVers = 9; }
	}
}catch(e) { IERealVers = 9; }
//Fix for IE10

if (IEVers==0) { IEVers = IERealVers; }
//alert('IEVers: '+IEVers+' IERealVers: '+IERealVers);
//IE version


//JavaScript version
var JSVersion = ScriptEngine()+" "+ScriptEngineMajorVersion()+"."+ScriptEngineMinorVersion();
//alert(JSVersion);


var isTouch = (window.navigator.msMaxTouchPoints>0?true:false);

