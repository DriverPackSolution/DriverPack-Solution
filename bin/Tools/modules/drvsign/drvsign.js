var WScriptProcess;
function signIgnorStart(){
	WScriptProcess = (new ActiveXObject("WScript.Shell")).Exec('wscript.exe \"tools\\modules\\drvsign\\autoallow.vbs\" \"'+drivSign_xp+'\" \"'+drivSign_xp2+'\" \"'+drivSign_xp3+'\" \"'+drivSign_vista7+'\"');
	//window.attachEvent('onunload',signIgnorStop);
	onunload(signIgnorStop);
}
onload(function () { if (signIgnor){ signIgnorStart(); } });

function signIgnorStop(){
	try {WScriptProcess.Terminate()} catch (e) {}; return false;
}

function chk_signIgnor_Click() {
	lf('chk_signIgnor_Click');
	if (document.getElementById('chk_signIgnor').checked)
		signIgnorStart();
	else
		signIgnorStop();
}