	
	if (logsCurFolder){
		var disableCurDir = false;
		try{
			if (!logging)throw "fail"
			if (fso.FolderExists('probe')) fso.DeleteFolder('probe');
			fso.CreateFolder('probe');
			if (fso.FolderExists('probe')) fso.DeleteFolder('probe'); else disableCurDir = true;
		}catch(e){disableCurDir = true;}

		if (disableCurDir) logsCurFolder = false;
	}

if (logsCurFolder)  { logFolder = 'logs\\'; }
else				{ logFolder = WshEnv("WINDIR")+'\\Logs\\DRPLog\\';  }

var logNameEnding = '_'+today.getFullYear()+'-'+pad(today.getMonth()+1,2)+'-'+pad(today.getDate(),2)+'_'
	+pad(today.getHours(),2)+'-'+pad(today.getMinutes(),2)+'-'+pad(today.getSeconds(),2);
try{
	if (!fso.FolderExists(logFolder) && logging) { fso.CreateFolder(logFolder); }
	if (!fso.FolderExists(logFolder)) { logging = false; }
}
catch(e){log("Failed to create "+logFolder);}

//alert(pathLogFile('DRPLogFile'));

function saveDPInstLog(path){
	path = path.replace(/\\/g,'_');
	try{
		if ((logging) && (fso.FileExists(WshEnv("WINDIR")+"\\DPINST.LOG"))) {
			fso.CopyFile(WshEnv("WINDIR")+"\\DPINST.LOG", logFolder+'\\DPINST'+logNameEnding+'_'+path+'.txt');
		}
	}
	catch(e){log("Failed to copy "+WshEnv("WINDIR")+"\\DPINST.LOG to "+logFolder+'\\DPINST'+logNameEnding+'_'+path+'.txt');}
}

function delete_dpinst_log(){
	try{
		if (fso.FileExists(WshEnv("WINDIR")+"\\DPINST.LOG")){
			fso.getfile(WshEnv("WINDIR")+"\\DPINST.LOG").Delete();
		}
	}
	catch(e){log("Failed to delete "+WshEnv("WINDIR")+"\\DPINST.LOG");}
}

function pathLogFile(name){ return logFolder+name+logNameEnding+'.txt'; }

function openLogHWID() { WshShell.Run("Notepad.exe " + temp + "\\drp\\HWIDS.txt",1,false); }
function openDRPLog() { WshShell.Run("Notepad.exe " + temp + "\\DRPLogFile.txt",1,false); }

function pad(number, length) {

	var str = "" + number;
	while (str.length < length) {
		str = '0' + str;
	}
	return str;
}

function msinfo_export(){
	ret = WshShell.Run('msinfo32.exe /report "' + pathLogFile("msinfo") + '"',0,true);
	if (fso.FileExists(pathLogFile("msinfo"))){ return true; }
	else { return false; }
}
//msinfo_export();

// Profiling and logging
function log(str){
	try{
		if (!str) str = "";
		str = "" +str;
		if (logfile) logfile.WriteLine(str.replace(/#/g," "));
	}
	catch(e){ }
}
var lasttime;
function reset_timer(str){
	log(str);
	lasttime = new Date();
}
function timer(str){
	if(logfile){
		var now = new Date();
		try{ logfile.WriteLine(str+(now.getTime()-lasttime.getTime())); } catch(e){ }
	}
}
function timer_new(str){
	timer(str);
	reset_timer();
}
