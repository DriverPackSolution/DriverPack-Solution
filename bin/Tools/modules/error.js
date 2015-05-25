error_title =   		"Внимание!!! В программе возникла непредвиденная ошибка!\r\nНажмите OK для отладки или ОТМЕНА для продолжения.";
error_titleSecond = 	"Предыдущая ошибка привела к появлению новой!\r\nРекомендуется прекратить работу программы и отправить разработчикам отчёт об ошибках.\r\n\r\nНажмите OK для выхода или ОТМЕНА для продолжения.";
error_error =   		"Ошибка";
error_module =  		"В модуле";
error_inline =  		"Строка";
error_lastfunc =		"Последняя функция";



var firstError = true;
window.onerror=function(msg, url, linenumber){
	shortUrl = url.substring(url.lastIndexOf('/')+1,url.length);
	
	/*
	if (firstError) {
		if (confirm(
			error_title+'\r\n\r\n   '+
			error_error+': '+
			msg+'\n   '+
			error_module+': '+
			shortUrl+'\n   '+
			error_inline+': '+
			linenumber)) {
						
						var lfn = '';
						try {
							if (arguments.callee.caller) {
								lfn = arguments.callee.caller.toString().match(/function ([^(]*)\(/)[1]
							}
						}
						catch(e){}
						
						htaError(msg, shortUrl, linenumber, lfn);
						
		}
		firstError = false;
	}
	else {
		if (confirm(error_titleSecond)) {
						window.close();
		}
	}
	*/
	
	
	var lfn = '';
	try {
		if (arguments.callee.caller) {
			lfn = arguments.callee.caller.toString().match(/function ([^(]*)\(/)[1]
		}
	}
	catch(e){}
	
	htaError(msg, shortUrl, linenumber, lfn);
	
	
	log(
		'!!! ERROR !!! '+
		msg+'\r\n'+
		' Module: '+
		url+'\r\n'+
		' Line: '+
		linenumber);

	return true;
}

function htaError(msg, url, linenumber, lfnE) {
	var myObject = new Object();
	myObject.lang = lang;
	myObject.logfile = (typeof(logs.logfile)!='undefined'?logs.logfile:null);
	myObject.dialogMode = 2;
	myObject.msg = msg;
	myObject.url = url;
	myObject.linenumber = linenumber;
	myObject.lfnE = lfnE;

	showModelessDialog("tools/modules/bugreport.hta",myObject,"status:false;dialogWidth:470px;dialogHeight:350px;scroll:no;");
}



//Sending error reports
function errorCatch(funcName,e,params){
	if (typeof params=="undefined") { params=''; }
	//if (funcName.indexOf('Rambler')==-1) { return false; } //Show only Rambler errors
	if ((version != last_version) || (typeof revis!="undefined" && revis!=last_revision)) { return false; } //Show only 12.12 errors
	
	inc('http://drp.su/update/error-catch/?funcName='+encodeURIComponent(funcName)+'&script=update&line=0&DRP_version='+encodeURIComponent(version)+'&message='+encodeURIComponent(e.message)+'&description='+encodeURIComponent(e.description)+'&number='+encodeURIComponent(e.number)+'&errorName='+encodeURIComponent(e.name)+'&params='+encodeURIComponent(params));
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







onerror_old=window.onerror;
window.onerror=function(msg, url, linenumber){
	var OSVersionEr = wpi('Caption','Win32_OperatingSystem').replace(/Microsoft /i,"") + " " + wpi('CSDVersion','Win32_OperatingSystem').replace(/Service Pack /i,"SP") + " " + wpi('OSArchitecture','Win32_OperatingSystem')
	var JSVersion = ScriptEngine()+" "+ScriptEngineMajorVersion()+"."+ScriptEngineMinorVersion();
	var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	
	log([ 'http://static.drp.su/update/error-catch/?script='+encodeURIComponent(url)+'&line='+encodeURIComponent(linenumber)+'&DRP_version='+encodeURIComponent(version + " " + verType)+'&message='+encodeURIComponent(msg)+'&description='+encodeURIComponent(OSVersionEr+' IE: '+IEVers+' '+JSVersion) ]);
	inc('http://static.drp.su/update/error-catch/?script='+encodeURIComponent(url)+'&line='+encodeURIComponent(linenumber)+'&DRP_version='+encodeURIComponent(version + " " + verType)+'&message='+encodeURIComponent(msg)+'&description='+encodeURIComponent(OSVersionEr+' IE: '+IEVers+' '+JSVersion));
	
	onerror_old(msg, url, linenumber);
	return true;
}
//Sending error reports



/*
window.onerror=function(msg, url, linenumber){
	var dialog=document.createElement("div")
	dialog.className='errordialog'
	dialog.innerHTML='&nbsp;<b style="color:red">JavaScript Error: </b>' + msg +' at line number ' + linenumber +'. Please inform webmaster.'
	document.body.appendChild(dialog)
	return true
}
*/

/*
var old_func=new Array ();
var windows=['l','RegRead','infobar']
for (var key in windows) {
//alert(window[key]);
	if ( (window[key] instanceof Function) && (window[key].toString().search('native code') == -1) ){ // for Google Chrome
		old_func[key] = window[key];
		window[key] = function(){
			var args = Array.prototype.slice.call(arguments)
			//alert(window[key].toString());
			//alert(print_r(args));
			return old_func[key].apply(this, args);
		}
	}
}
*/