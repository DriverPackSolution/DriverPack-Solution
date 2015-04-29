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
	myObject.lang = 'ru';
	myObject.logfile = (typeof(logs.logfile)!='undefined'?logs.logfile:null);
	myObject.dialogMode = 2;
	myObject.msg = msg;
	myObject.url = url;
	myObject.linenumber = linenumber;
	myObject.lfnE = lfnE;

	showModelessDialog("tools/modules/bugreport.hta",myObject,"status:false;dialogWidth:470px;dialogHeight:350px;scroll:no;");
}


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