// Get CPU temp
var OpenHMReport;
var cpuReadCount;
CPU_timeRefresh = CPU_timeRefresh * 1000;
var OHMHandler=null;
var stillReadingTemp=false;

function cpu_ShowTemp(cpuparse) {
	lf('cpu_ShowTemp');
		
	//--- Getting CPU readings using WMI
	if (cpuparse==null || cpuparse=="") 
	{ 
		cpu_notRead(); 
		return; 
	}
	cpuparse = cpuparse.toString();
	
	document.getElementById('cpu_temperature').innerHTML = cpuparse;
	if (cpuparse.length>11) 
	{
		document.getElementById('cpu_temperature').style.width = '80px';
	}
	cpu_warning_show(cpuparse);
	document.getElementById('cpu_img').src = './tools/ico/6-white.png';
	if ((getCPUtemp) && (!getCPUautorun))
	{
		setTimeout('cpu_get();',CPU_timeRefresh);
	}
	getCPUautorun = false;
}

function cpu_notRead(){
	lf('cpu_notRead');
	if ((cpuReadCount < 5) && (getCPUtemp)) {
		setTimeout('cpu_temp();',1000); cpuReadCount++;
	}
	else {
		//The temperature does not really get...
		cpuz_start();
	}
}
var cpuInfo='';
function cpu_GetTemp() {
	lf('cpu_GetTemp');
	var result="";
	
	//The exact definition of a processor
	try
	{
		//Parsing CPU temperature
		data = GetOHWMIData("select Value from Sensor where Identifier like '/%cpu/%/temperature/%'");
		result = "";
		
		for(var count=0;count<data.length;count++)
		{
			if(data[count].Value!=0)
			{
				result += data[count].Value + "° ";
			}
			else 
			{
				return "";
			}
		}
	}catch(e){return "";}
	
	return result;
}

function cpu_get() {
	lf('cpu_get');
	if (OSVersion<=5.1) { cpuz_get(); return false; }
	if (stillReadingTemp || !getCPUtemp) { return false; }

	stillReadingTemp=true;	
	if (document.getElementById('cpu_img').src.indexOf('indicator3') == -1){ document.getElementById('cpu_img').src = './tools/indicator3.gif'; }
	//setTimeout('cpu_temp();',0);
	//setTimeout('cpuz_start();',10000);

	Processes = GetProcesses2().toLowerCase();
	if (Processes.indexOf('cpuz') == -1){
		//if (is64) { cpuz='cpuz64.exe'; }
		//WshShell.Run('cmd /C tools\\modules\\CPU\\OpenHardwareMonitorReport.exe /id="'+ohmrID+'" > "%temp%\\drp\\cpu1.txt\"',0,false);
//		winRun('tools\\modules\\CPU\\OpenHardwareMonitorReport'+ohwr_type+'.cmd',true,true,false,10,function (){ cpu_temp(); },function (oExec){ cpuz_start(); });
		if(!OHMHandler)
		{
			OHMHandler=WshShell.Exec('tools\\modules\\CPU\\OpenHardwareMonitor.exe');
		}

		setTimeout('TryToGetTemp(0);',1000);
	}
}

function TryToGetTemp(count)
{
	var temp = cpu_GetTemp();
	if(temp!="" || count>10)
	{	
		if(getCPUautorun || !getCPUtemp)
		{
			KillOHM();
		}
		stillReadingTemp=false;
		cpu_ShowTemp(count>10 ? null : temp);		
	}
	else
	{
		count++;
		setTimeout(function(){TryToGetTemp(count)},1000);
	}
}

function KillOHM()
{
	if(OHMHandler)
	{
		try
		{
			OHMHandler.Terminate();
		}catch(e){}
		OHMHandler=null;
	}
}

onunload(function () { KillOHM(); });

function czzpuz_start() {
	if (document.getElementById('cpu_img').src.indexOf('indicator3')!=-1) {
		cpuz_get();
	}
}
function OpenHardwareMonitorReportID() { 
	try {
		if ((typeof(ohmrID) == "undefined") || (!ohmrID)) {
				tf = fso.CreateTextFile("tools\\modules\\CPU\\OpenHardwareMonitorId.js", 8, false);
				tf.WriteLine('var ohmrID='+Math.floor(Math.random( ) * (100000000000+1))+';');
				tf.Close();
		}
	}
	catch(e) { ohmrID=0; }
}
OpenHardwareMonitorReportID();

var toogleCPUtempFirst=true;
function toogleCPUtemp() {
	lf('toogleCPUtemp');
	if ((getCPUtemp)&&(!toogleCPUtempFirst)){ getCPUtemp = false; }
	else { getCPUtemp = true; cpu_get(); }
	toogleCPUtempFirst=false;
}


var maxTemp;
function cpu_warning_show(procTemp){
   try {
	if (!procTemp) { return; }
	objID = document.getElementById('cpu_warning');

	maxTemp = 0; allTemp = '';
	tmp = procTemp.split("° ");
	for (i in tmp){ if (parseInt(tmp[i])>maxTemp) { maxTemp = parseInt(tmp[i]); } allTemp += tmp[i]; }

	if (maxTemp>CPUmax) {
		objID.parentNode.onclick = function(){
			openCpuWarningInfo();
		};
		element = document.getElementById('cpu-alert');
		if (!element){
			objID.parentNode.innerHTML += "<br><div class='alert alert-block alert-diagn' id='cpu-alert'><button type='button' class='close' data-dismiss='alert'>×</button>"+cpu_warning+"<br><button href='#' class='btn btn-danger btn-small'>"+cpu_warning_button+"</button></div>";
		}
	}
	if (maxTemp) {
		if (maxTemp>CPUmax){
			addDiagAlert('cpu','CPU: '+maxTemp+'°','important');
		}
		else {
			addDiagAlert('cpu','CPU: '+maxTemp+'°','success');
		}
		//if (!global_cpu_log) { global_cpu_log=''; }
		//inc('http://drp.su/update/cpu/db.php?allTemp='+allTemp+'&maxTemp='+maxTemp+'&CPU='+encodeURI(CPU)+'&cpu_log='+encodeURI(global_cpu_log));
	}
   }
   catch(e) { }
}


function openCpuWarningInfo() {
	var myObject = new Object();
	myObject.maxTemp = maxTemp;
	myObject.model = Manufacturer + " " + Model;
	myObject.lang = lang;
	showModelessDialog("http://drp.su/update/cpu/",myObject,"status:false;dialogWidth:560px;dialogHeight:420px;");
}

function cpuz_start() {
	if (document.getElementById('cpu_img').src.indexOf('indicator3')!=-1) {
		cpuz_get();
	}
}
