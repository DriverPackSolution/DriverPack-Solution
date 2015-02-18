// Get CPU temp
var cpuReadCountZ;
function cpuz_temp() {
	lf('cpuz_temp');
	Processes = GetProcesses2().toLowerCase();
	if (!fso.FolderExists(temp + '\\drp')) {
		try {
			fso.CreateFolder(temp + '\\drp');
			if (!fso.FolderExists(temp + '\\drp')) {
				log("Failed to create DRP dir");
			}
		}
		catch(e) {
			log("Failed to create DRP dir (expection)");
		}
	}
	if ((fso.FileExists(temp + '\\drp\\cpuz.txt')) && (Processes.indexOf('cpuz') == -1)) {
		try {
			var tempfile = fso.OpenTextFile(temp + '\\drp\\cpuz.txt', 1, false);
			cpu_txt = tempfile.ReadAll();
		}
		catch(e) {
			log("Failed to open "+temp + '\\drp\\cpuz.txt');
			cpuz_notRead();
			return;
		}
		tempfile.Close();

		//alert(cpu_txt);
		//alert(cpuReadCountZ);

		var cpuparse = cpuz_parser(cpu_txt);
		document.getElementById('cpu_temperature').innerHTML = cpuparse;
		cpu_warning_show(cpuparse);
		document.getElementById('cpu_img').src = './tools/ico/6-white.png';
		if ((getCPUtemp)&& (!getCPUautorun)){
			setTimeout('cpuz_get();',CPU_timeRefresh);
		}
		getCPUautorun = false;
	}
	else
		cpuz_notRead();
}
function cpuz_notRead(){
	lf('cpuz_notRead');
	if ((cpuReadCountZ < 5) && (getCPUtemp)) {
		setTimeout('cpuz_temp();',1000); cpuReadCountZ++;
	}
	else {
		//The temperature does not really get...
		document.getElementById('cpu_img').src = './tools/modules/blank.gif';
	}
}
var cpuInfo;
function cpuz_parser(log) {
	lf('cpuz_parser');
	log = log.substring(log.indexOf('Hardware Monitors'));
	log = log.substring(0,log.indexOf('Software'));
	cpuInfo = log;


	//The exact definition of a processor
	var cpu_vender='';
	var cpuInfoLC=cpuInfo.toLowerCase();
	var cputin='';
	if (cpuInfoLC.indexOf('intel')!=-1) { cpu_vender='intel'; }
	else if (cpuInfoLC.indexOf('amd')!=-1) { cpu_vender='amd'; }
	else if (cpuInfoLC.indexOf('via')!=-1) { cpu_vender='via'; }
	else if (cpuInfoLC.indexOf('cputin')!=-1) {
		cputin = cpuInfo.substring(0,cpuInfoLC.indexOf('cputin')-1);
		cputin = cputin.substring(cputin.lastIndexOf('\r\n'));
		log = cputin;
	}

	if (cpu_vender) {
		cpuInfo = cpuInfo.substring(cpuInfoLC.indexOf(cpu_vender));
		cpuInfo = cpuInfo.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); //trim
		log = cpuInfo;
	}
	else if (!cputin) { return ''; }
	//The exact definition of a processor


	log = log.toLowerCase();
	var re = new RegExp("temperature [0-9][\\t]([0-9]{0,2})","mg");
	result = "";
	while (regResult = re.exec(log)) { result += RegExp.$1 + "° "; }
	return result;
}
function cpuz_get() {
	lf('cpuz_get');
	if (OSVersion==6.2||!getCPUtemp) { return false; }//CPUz doesn't work in Windows 8

	cpuReadCountZ = 0;
	if (document.getElementById('cpu_img').src.indexOf('indicator3') == -1){ document.getElementById('cpu_img').src = './tools/indicator3.gif'; }

	Processes = GetProcesses2().toLowerCase();
	if (Processes.indexOf('cpuz') == -1){
		var cpuz='cpuz.exe';
		if (is64) { cpuz='cpuz64.exe'; }
		//setTimeout('WshShell.Run("cmd /C cd tools\\\\CPUz & start '+cpuz+' -txt=%temp%\\\\drp\\\\cpuz",0,false);',0);
		winRun("tools\\CPUz\\"+cpuz+" -txt=%temp%\\drp\\cpuz",true,true,false,10,function (){ cpuz_temp(); },function (oExec){ document.getElementById('cpu_img').src = './tools/modules/blank.gif'; });
	}
}
function toogleCPUztemp() {
	lf('toogleCPUztemp');
	if (getCPUtemp){ getCPUtemp = false; }
	else { getCPUtemp = true; cpuz_get(); }
}
