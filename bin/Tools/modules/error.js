var firstError = true;
window.onerror=function(msg, url, linenumber){
	shortUrl = url.substring(url.lastIndexOf('/')+1,url.length);

	if (firstError) {
		if (confirm(
			error_title+'\r\n\r\n   '+
			error_error+': '+
			msg+'\n   '+
			error_module+': '+
			shortUrl+'\n   '+
			error_inline+': '+
			linenumber+'\r\n   '+
			error_lastfunc+': '+
			lfn)) {
						htaError(msg, shortUrl, linenumber, lfn);
		}
		firstError = false;
	}
	else {
		if (confirm(error_titleSecond)) {
						window.close();
		}
	}
	
	
	log(
		'\r\n\r\n   !!! ERROR: '+
		msg+'\r\n'+
		'   !!! In the module: '+
		url+'\r\n'+
		'   !!! Line: '+
		linenumber+'\r\n'+
		'   !!! Last function: '+
		lfn+'\r\n\r\n');

	return true;
}

function htaError(msg, url, linenumber, lfnE) {
	var myObject = new Object();
	myObject.lang = lang;
	myObject.logfile = logfile;
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