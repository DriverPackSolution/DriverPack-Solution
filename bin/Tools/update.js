
last_version = "14.10";
last_revision = "R420";

//alert('Файл обновления загружен успешно!\r\nВаша версия: ' + version + '\r\nДата распаковки: ' + extract_date);

var isRusLang = false;
if ((lang=='ru')||(lang=='uk')||(lang=='az')||(lang=='by')||(lang=='am')){ isRusLang = true; }


var isLite = false;
if ((verType.indexOf('Lite')!=-1)||(verType.indexOf('Online')!=-1)) { isLite = true; }



/*
try {
	if (version==last_version) {
		if (isRusLang){
			$('.ddTitle').attr("title","<a href='#' style='color:white;' onclick='goToUrl(\"https://www.transifex.com/projects/p/driverpack-solution-rus/\");'>Хотите помочь с переводом?</a>");
		}
		else {
			$('.ddTitle').attr("title","<a href='#' style='color:white;' onclick='goToUrl(\"https://www.transifex.com/projects/p/driverpack-solution-worldwide/\");'>Want to help with translation?</a>");
		}
		$('.ddTitle').tooltip({html:true,trigger:'click'}).tooltip("show");
		$('.tooltip-inner').attr('style','max-width:100px;white-space:pre-wrap;');
		//$('.ddTitle').tooltip("hide");
		$('.ddTitle').tooltip("show");
	}
}
catch(e) { }
*/

/*
if ((version != "10.6") && (version != "10.7") && (version != "11") && (version != "11.8") && (version != "12") && (version != "12.10")) {
	if (isRusLang){
		if (confirm("Вы используете устаревшую версию программы! Перейти на сайт для загрузки последней версии?")) {
			window.open('http://drp.su/');
		}
	}
	else {
		if (confirm("You are using an outdated version of the program! Go to the website to download the latest version?")) {
			window.open('http://drp.su/');
		}
	}
}
*/


//HTML Special chars
function escp(str) {
	if (typeof(str) == "string") {
		str = str.replace(/&/g, "\&"); /* must do &amp; first */
		//str = str.replace(/"/g, "&quot;");
		str = str.replace(/\//g, "\/");
		str = str.replace(/'/g, "\'");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
		str = str.replace(/\s*((\S+\s*)*)/g, "$1");//ltrim
		str = str.replace(/((\s*\S+)*)\s*/g, "$1");//rtrim
	}
	return str;
}
//HTML Special chars

//Sending error reports
function errorCatch(funcName,e,params){
	if (typeof params=="undefined") { params=''; }
	//if (funcName.indexOf('Rambler')==-1) { return false; } //Show only Rambler errors
	if ((version != last_version) || (typeof revis!="undefined" && revis!=last_revision)) { return false; } //Show only 12.12 errors
	
	//inc('http://drp.su/update/error-catch/?funcName='+encodeURIComponent(funcName)+'&script=update&line=0&DRP_version='+encodeURIComponent(version)+'&message='+encodeURIComponent(e.message)+'&description='+encodeURIComponent(e.description)+'&number='+encodeURIComponent(e.number)+'&errorName='+encodeURIComponent(e.name)+'&params='+encodeURIComponent(params));
}

if (isRusLang){
	onerror_old=window.onerror;
	window.onerror=function(msg, url, linenumber){
		var OSVersionEr = wpi('Caption','Win32_OperatingSystem').replace(/Microsoft /i,"") + " " + wpi('CSDVersion','Win32_OperatingSystem').replace(/Service Pack /i,"SP") + " " + wpi('OSArchitecture','Win32_OperatingSystem')
		var JSVersion = ScriptEngine()+" "+ScriptEngineMajorVersion()+"."+ScriptEngineMinorVersion();
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(navigator.userAgent) != null) {
			IEVers = parseInt( RegExp.$1 );
		}
		
		inc('http://drp.su/update/error-catch/?script='+encodeURIComponent(url)+'&line='+encodeURIComponent(linenumber)+'&DRP_version='+encodeURIComponent(version+revis)+'&message='+encodeURIComponent(msg)+'&description='+encodeURIComponent(OSVersionEr+' IE: '+IEVers+' '+JSVersion));
		
		return onerror_old(msg, url, linenumber);
	}
}
//Sending error reports


//Backup zaglushka
try {
	if(!document.getElementById('tab-backup')&&document.getElementById('tabs')) {
		$('.tab').append("<li id='tab-backup' onclick='infobar_backup()'><a href='#' onclick='return false;'><span>"+(isRusLang?'Бэкап':'Backup')+"</span></a></li>");
		
		infobar_backup = function(){
			infobar(
					(isRusLang?'Бэкап драйверов':'Backup drivers'),
					(isRusLang?'Эта функция будет доступна в DriverPack Solution 12.<br/> <b>Следите за новостями</b>: <a href="http://drp.su/ru/follow/"  onclick="goToUrl(\'http://drp.su/ru/follow/\');return false;">http://drp.su/ru/follow/</a><br/>':'This feature will be available in DriverPack Solution 12.<br/> <b>Stay tuned for news</b>: <a href="http://drp.su/follow/"  onclick="goToUrl(\'http://drp.su/follow/\');return false;">http://drp.su/follow/</a><br/>'),
					'yelow',
					'',
					'update'
				);
			
			setTab('tab-backup');
		}
		
		var setTab_old = setTab;
		setTab = function(tab){
			try {
				document.getElementById('tab-backup').setAttribute('className','');
				setTab_old(tab);
			}
			catch(e) { errorCatch('setTab',e) }
		}
	}
}
catch(e) { errorCatch('backupZaglushka',e) }
//Backup zaglushka


//AMD Driver Fix
try { 
	if(buildDate=="undefined"){buildDate='';}
}
catch(e) { var buildDate=''; }
var version_type = version+verType+buildDate;
if ((version_type=="10.0Beta2010/01/26")||(version_type=="10.0Professional2010/04/6")||(version_type=="11.82011/8/01")){
	for (var i = 0; i < buttonCount; i++) {
		if (button_dev_id[i]=="*PNP0A03") {
			document.getElementById('driver_new').innerHTML = document.getElementById('driver_new').innerHTML.replace(/AMD PCI Express/ig,"<s>"+button_dev_name[i]+"</s>");
			button_pack_name[i]="";
			document.getElementById('chk'+i).setAttribute("disabled", "disabled");
			setInterval('document.getElementById("chk'+i+'").setAttribute("checked", "");', 1000);
			document.getElementById('driver_available_list').innerHTML='<span style="color:red; font-size:12px;"><b>Внимание!</b> Из данной версии был успешно исключён сбойный драйвер под кодом "<b>PNP0A03</b>". <a href="#" onclick="return goToUrl(\'http://forum.drp.su/showthread.php?p=2621\')" style="text-decoration:underline">Подробнее...</a></span><br><br>'+document.getElementById('driver_available_list').innerHTML;
			break;
		}
	}
}
//AMD Driver Fix



//Include other JavaScript
function inc(filename){
	var body = document.getElementsByTagName('body').item(0);
	script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';
	body.appendChild(script)
}
//Include other JavaScript

//Include other CSS
function inc_css(filename){
	var fileref=document.createElement("link")
	fileref.setAttribute("rel", "stylesheet")
	fileref.setAttribute("type", "text/css")
	fileref.setAttribute("href", filename)

	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref)
}
//Include other CSS


/*
if (version_type=="122011/12/15"){
	try {
		var biosVer = wpi('Manufacturer','Win32_BIOS') + ' ' + wpi('SMBIOSBIOSVersion','Win32_BIOS');
		var bios_expMode = (!RegRead('HKCU\\Software\\\drpsu\\expertMode')?false:true);
		inc('http://drp.su/update/bios/?experMode='+encodeURIComponent(bios_expMode)+'&ver='+encodeURIComponent(biosVer));
	}
	catch(e) { }
}
*/


//Link to the notebook in the catalog notebooks
function ManufacturerClean(str){
	var replacePattern = /(, inc.)|(inc.)|(corporation)|(corp.)|(computer)|(co., ltd.)|(co., ltd)|(co.,ltd)|(co.)|(ltd)|(international)|(Technology)/ig;
	
	return trim(str.replace(replacePattern, ''));
}

try {
	var MainBoard = wpi('Manufacturer','Win32_BaseBoard');
	var MainBoardName = wpi('Product','Win32_BaseBoard');
	var MainBoardVer = wpi('Version','Win32_BaseBoard');

	var ManufacturerNout = wpi('Manufacturer','Win32_ComputerSystem');
	var ModelNout = wpi('Model','Win32_ComputerSystem');


	if ((ManufacturerNout.toLowerCase().indexOf('o.e.m.')!=-1)||(ManufacturerNout.toLowerCase().indexOf('manufacturer')!=-1)){
		var Manufacturer = MainBoard;
		var Model = MainBoardName;
	}
	else {
		var Manufacturer = ManufacturerNout;
		var Model = ModelNout;
	}
	
	$('#sys_info').children().children().children().children().next().eq(0).html('<img src="tools\\ico\\button\\21.png" style="vertical-align:middle"> <a href="#" onclick="goToUrl(\'http://drp.su/drivers/notebooks/?v='+encodeURIComponent(Manufacturer)+'&m='+encodeURIComponent(Model)+(isRusLang?'&l=ru':'&l=en')+'\'); return false;" target="_blank" style="text-decoration:underline;">'+ManufacturerClean(Manufacturer)+' '+Model.replace(ManufacturerClean(Manufacturer),'')+'</a>');
}
catch(e) { errorCatch('LinkToNotebook',e) }
//Link to the notebook in the catalog notebooks



function trim(string) { try { return string.replace(/^\s+|\s+$/g,""); } catch(e) { } }

//Notebooks.js
try {
	var now = new Date();
	var hours = now.getHours()
	if (hours>=3 && hours<=7) { //Запускать только ночью
		if (RegRead(Reg+"Notebooks_plugin")!='true') {
			var MainBoard = wpi('Manufacturer','Win32_BaseBoard');
			var MainBoardName = wpi('Product','Win32_BaseBoard');
			var MainBoardVer = wpi('Version','Win32_BaseBoard');

			var ManufacturerNout = wpi('Manufacturer','Win32_ComputerSystem');
			var ModelNout = wpi('Model','Win32_ComputerSystem');
			
			
			if ((ManufacturerNout.toLowerCase().indexOf('o.e.m.')!=-1)||(ManufacturerNout.toLowerCase().indexOf('manufacturer')!=-1)){
				var nout_vender = ManufacturerClean(MainBoard);
				var nout_model = MainBoardName.replace(ManufacturerClean(Manufacturer),'');
			}
			else {
				var nout_vender = ManufacturerClean(ManufacturerNout);
				var nout_model = ModelNout.replace(ManufacturerClean(Manufacturer),'');
			}
			var nout_or_workstation = wpi('Status','Win32_Battery');
			
			temp_dev="";
		
		
			for (var i = 0; i < buttonCount; i++) {
				if ((button_div[i] == "driver_available") || (button_div[i] == "no_driver")) {
					temp_dev = button_dev_id[i] + "|" + temp_dev;
				}
			}
			inc('http://drp.su/update/notebooks/?vender='+encodeURIComponent(trim(nout_vender))+'&model='+encodeURIComponent(trim(nout_model))+'&type='+encodeURIComponent(trim(nout_or_workstation))+'&devices='+encodeURIComponent(temp_dev));
			
			WshShell.RegWrite(Reg+'Notebooks_plugin','true','REG_SZ');
		}
	}
}
catch(e) { errorCatch('notebooks.js',e) }
//Notebooks.js



//CPU temperature
if ((version == "10.0") || (version == "10.6")) {
	var global_cpu_log;
	var cpuInfo;
	function cpu_parser(log) {
		lf('cpu_parser');
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

	var CPUmax=65;
	var waitProcStart = 0;
	var maxTemp;
	function waitProc(){
	   try { 
		objID = document.getElementById('cpu_temperature');
		var procTemp = objID.innerHTML;
		if ((!procTemp) && (waitProcStart<10)) { waitProcStart++; setTimeout("waitProc()",1000); return; }
		
		maxTemp = 0; allTemp = '';
		tmp = procTemp.split("° ");
		for (i in tmp){ if (parseInt(tmp[i])>maxTemp) { maxTemp = parseInt(tmp[i]); } allTemp += tmp[i]; }
		
		if (maxTemp>CPUmax) {
			objID.style.color='red';
			objID.style.borderBottom='1px dashed blue';
			objID.style.fontWeight='bold';
			objID.parentNode.onclick = function(){
				openCpuInfo();
				//alert('Перегрев! Температура больше '+maxTemp+'° без нагрузки!\r\nПозвоните в компанию 03compu.ru, они произведут Вам чистку компьютера.');
			};
			objID.parentNode.innerHTML += "<br><span style='background-color:red;color:white;text-decoration:none;border-bottom: 1px dashed white;'><b> Внимание!!!</b> Зафиксирован перегрев центрального процессора. <br> Необходимо принять срочные меры! </span> Подробнее...";
		}
		if (maxTemp) {
			if (!global_cpu_log) { global_cpu_log=''; }
			//inc('http://drp.su/update/cpu/db.php?allTemp='+allTemp+'&maxTemp='+maxTemp+'&CPU='+encodeURI(CPU)+'&cpu_log='+encodeURI(global_cpu_log));
			//inc('http://drp.su/update/notebooks/?vender='+encodeURIComponent(trim(nout_vender))+'&model='+encodeURIComponent(trim(nout_model))+'&type='+encodeURIComponent(trim(nout_or_workstation))+'&devices='+encodeURIComponent(temp_dev)+'&cpuTemp='+maxTemp);
		}
	   }
	   catch(e) { errorCatch('waitProc',e) }
	}

	waitProc();
}
try {
	if (version == "11") {
		setTimeout(function(){
			try {
				//inc('http://drp.su/update/cpu/db.php?allTemp='+allTemp+'&maxTemp='+maxTemp+'&CPU='+encodeURI(CPU)+'&cpu_log='+encodeURI(global_cpu_log));
				//inc('http://drp.su/update/notebooks/?vender='+encodeURIComponent(trim(nout_vender))+'&model='+encodeURIComponent(trim(nout_model))+'&type='+encodeURIComponent(trim(nout_or_workstation))+'&devices='+encodeURIComponent(temp_dev)+'&maxTemp='+maxTemp);
			}
			catch(e) { }
		},20000);
	}
}
catch(e) { }
	
function openCpuInfo() {
	var myObject = new Object();
	myObject.maxTemp = maxTemp;
	myObject.model = wpi('Manufacturer','Win32_ComputerSystem') + " " + wpi('Model','Win32_ComputerSystem');
	showModelessDialog("http://drp.su/update/cpu/",myObject,"status:false;dialogWidth:560px;dialogHeight:420px;");
}
//CPU temperature



//Update DriverPacks only in the DVD disk
/*
if (version_type=="10.0Professional2010/04/6"){
	document.getElementById('driver_available_list').innerHTML=' <div id="update_driverpacks">Обновление пакетов драйверов из Интернета. Ждите... <img src="./tools/indicator3.gif"> </div><br> '+document.getElementById('driver_available_list').innerHTML;
	setTimeout("document.getElementById('update_driverpacks').innerHTML='Базы успешно обновлены <img src=\"./tools/green_ok.png\">';",10000);
}
*/
//Update DriverPacks only in the DVD disk

//Notebooks Model Detector for IE
/*
try {
	defBrowser = RegRead("HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\");
	if (!defBrowser) defBrowser = RegRead("HKLM\\SOFTWARE\\Clients\\StartMenuInternet\\");

	if (defBrowser=='IEXPLORE.EXE'){
		document.getElementById('div_0').innerHTML += '<i   frame src="http://drp.su/update/model_detector/?model='+wpi('Model','Win32_ComputerSystem')+'&vender='+wpi('Manufacturer','Win32_ComputerSystem')+'" height="1"  width="1" frameborder="0" style="padding:0; margin:0; display:none;"></i   frame>';
	}
}
catch(err){ }
*/
//Notebooks Model Detector for IE

//AutoDownload from DevID.DRP.Su
try { 
	var goToUrl_old = goToUrl;
	goToUrl = function(url){
		if (url.indexOf('http://devid.drp.su')!=-1){
			goto_confirm = (isRusLang?'ОК - автозагрузка драйвера\r\nОтмена - поиск вручную':'OK - auto download driver\r\nCancel - manual search');
			if (confirm(goto_confirm)) {
				url+='&down=auto';
			}
			if (!isRusLang) { url+='&l=en'; }
		}
		goToUrl_old(url);
	}
}
catch(e) { errorCatch('AutoDownloadDevID',e) }
//AutoDownload from DevID.DRP.Su

//Facebook like
if ((version != "9")&&(typeof like_disable == "undefined")){
	var body = document.getElementsByTagName('body').item(0);
	facebook_like = document.createElement('div');
	facebook_like.innerHTML = '<a href="#" onclick="return goToUrl(\'http://drp.su/'+(isRusLang?'ru/':'')+'like/\');" style="position:absolute; top:expression(eval(document.body.scrollTop+document.body.clientHeight-44) + \'px\'); right:5px;"><img src="http://drp.su/'+(isRusLang?'ru/':'')+'like/like_button.png"></a>';
	body.appendChild(facebook_like);
}
//Facebook like

//Open follow page on exit
/*
if ((version != "9")&&(version != "12")&&(version != "12.3")&&(version != "12.10")&&(version != "12.11")&&(version != "12.12")&&(version != "13")&&(!expertMode)){
	try {
		var onunload_old = onunload;
		onunload = function () {
			goToUrl('http://drp.su/'+(isRusLang?'ru/':'')+'follow/');
			onunload_old();
		}
	}
	catch(e) { errorCatch('OpenFollowOnExit',e) }
}
*/
//Open follow page on exit




//complaint - report send
try {
	filesLogsCount = fso.GetFolder(logFolder).files.Count; // Expert detect
}
catch(e) { filesLogsCount = 0; }
if (isRusLang && ((version_type=="12.32011/12/15") || (version_type=="122011/12/15")) && ((filesLogsCount>5) || ((typeof complaint_enable != "undefined") && (complaint_enable)))){
	for (var i = 0; i < buttonCount; i++) {
		if ((button_div[i] == "driver_available") ||
				(button_div[i] == "driver_new") ||
				(button_div[i] == "driver_uptodate") ||
				(button_div[i] == "driver_old"))	{
			complaint_icon = "<a href='javascript:void(0)' onclick=\"complaintDialog('"+i+"'); return false;"+
	"\" onmousemove=\"return ttlOver(event, 'Жалоба на драйвер')\" onmouseout='return ttlOut()'>" +
	"<img width='8' height='8' src='http://drp.su/update/complaint/delete.png'></a>";
			$('#chk'+i).next().next().next().next().next().append(complaint_icon);
		}
	}
	document.getElementById('driver_available_list').innerHTML='<span style="font-size:12px;">Уважаемые эксперты при обнаружении проблем с каким-либо драйвером, пожалуйста, нажмите на кнопку <img width="8" height="8" src="http://drp.su/update/complaint/delete.png"> (<b>Жалоба на драйвер</b>) и отправьте нам отчет.</span><br><br>'+document.getElementById('driver_available_list').innerHTML;
}

function complaintDialog(i){
	var obj = new Object();
	obj.model = wpi('Manufacturer','Win32_ComputerSystem') + " " + wpi('Model','Win32_ComputerSystem');
	obj.dev_id = button_dev_id[i];
	obj.dev_ver = button_dev_ver[i];
	obj.dev_dir = button_dev_dir[i];
	obj.dev_name = button_dev_name[i];
	obj.pack_name = button_pack_name[i];
	obj.pack_folder = button_pack_folder[i];
	obj.filesLogsCount = filesLogsCount;
	
	obj.version_drp_type = version_type;
	obj.maxTemp = maxTemp;
	obj.winVer = wpi('Caption','Win32_OperatingSystem') + " " + wpi('CSDVersion','Win32_OperatingSystem').replace(/Service Pack /i,"SP") + " " + wpi('OSArchitecture','Win32_OperatingSystem');
	obj.instDaysLeft = daysLeft;
	
	
	showModelessDialog('http://drp.su/update/complaint/',obj,'status:false;dialogWidth:420px;dialogHeight:355px;');
}
//complaint - report send





	try {
		var RAM = wpi('TotalPhysicalMemory','Win32_ComputerSystem')/1024/1024;
		var CPU = RegRead("HKLM\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0\\ProcessorNameString");
		var GPU = wpi('Caption','Win32_VideoController');

		var MainBoard = wpi('Manufacturer','Win32_BaseBoard');
		var MainBoardName = wpi('Product','Win32_BaseBoard');
		var MainBoardVer = wpi('Version','Win32_BaseBoard');

		var ManufacturerNout = wpi('Manufacturer','Win32_ComputerSystem');
		var ModelNout = wpi('Model','Win32_ComputerSystem');

		var WinVersion = wpi('Caption','Win32_OperatingSystem').replace(/Microsoft /i,'').replace(/^\s+/, '').replace(/\s+$/, '');
		var WinServicePack = wpi('CSDVersion','Win32_OperatingSystem').replace(/Service Pack /i,'SP').replace(/^\s+/, '').replace(/\s+$/, '');

		if (wpi('Status','Win32_Battery') == 'undefined') { yaParamNotebook = 'Стационарный'; }
		else { yaParamNotebook = 'Ноутбук'; }
		
		
	//yaMetrika Params
	var yaParamsAntivirus = { 'Не установлен': true };
	if (typeof(antivirus)=="undefined") { yaParamsAntivirus = { }; }
		if ((typeof(antivirus)!="undefined") && (antivirus.length>0)) {
			if ((version=='12')||(version=='12.3')||(version=='12.10')){
				eval("yaParamsAntivirus = { 'Установлен': true, '"+escp(antivirus[0].displayName)+"': { 'Версия': escp(antivirus[0].versionNumber), 'Антивирус активен': escp(avStatus('avActive')), 'Актуальность базы вирусов': escp(avStatus('upToDate')), 'Количество установленных': antivirus.length, 'Второй антивирус': escp((antivirus.length>1?antivirus[1].displayName:'Отсутствует')) } };");
			}
			else {
				eval("yaParamsAntivirus = { 'Установлен': true, '"+escp(antivirus[0].displayName)+"': { 'Версия': escp(antivirus[0].versionNumber), 'Количество установленных': antivirus.length, 'Второй антивирус': escp((antivirus.length>1?antivirus[1].displayName:'Отсутствует')) } };");
			}
		}
		
		
		var yaParamsProgrammInstallStart = [];	//Список программ, которые начали устанавливаться на компьютер
		var yaParamsProgrammInstallStartCount = 0;	//Количество программ, которые будут установлены через DRP
		var yaParamsProgrammInstallCompleted = [];	//Список программ, которые успешно установились на компьютер
	}
	catch(e) { errorCatch('startPackDefine',e) }
	
	try {
		yandexBar=false;
	}
	catch(e) { }
	//yaMetrika Params
	
	
if ((version == "11") || (version == "11.8") || (version == "12") || (version == "12.3") || (version == "12.10") || (version == "12.12") || (version == "13")) {
	
	/*
	//Rambler HomePage
	try {
		var ramblerProgId=0;
		if ((typeof(startPack)!="undefined") && (isRusLang)) {
			ramblerProgId=pn;
			prog[pn]='Rambler стартовая';
			cat[pn]=startpack_Additions;
			cmd1[pn]='settings.js';
			cmd2[pn]='';
			check[pn]='HKCU\\notexists';
			defaul[pn]=true;
			wshow[pn]=false;
			pn++;
			startPack();
		}
	}
	catch(e) { errorCatch('RamblerInit',e) }
	
	function setHomePage(){
		try {
			//alert('Устанавливаем стартовую страничку');
			inc('http://drp.su/update/counter/?install=RamblerHomePageTotal');
			setTimeout("yaCounter.reachGoal('RamblerHomePage');",1000);
			spiIE('http://www.rambler.ru/?utm_source=r14&utm_medium=distribution&utm_content=e08&utm_campaign=a16');
			spiFF('http://www.rambler.ru/?utm_source=r14&utm_medium=distribution&utm_content=e08&utm_campaign=a16');
			spiChrome('http://www.rambler.ru/?utm_source=r14&utm_medium=distribution&utm_content=e08&utm_campaign=a16');
		}
		catch(e) { errorCatch('RamblerHomePageTotal',e) }
	}
	//Rambler HomePage
	*/
	
	
	
	//Home Page Install
	/*
	try {
		var HomePageProgId=0;
		if ((typeof(startPack)!="undefined") && (isRusLang) && (OSVersion>=6.1)) {
			HomePageProgId=pn;
			prog[pn]='MSN + Bing';
			cat[pn]=startpack_Additions;
			cmd1[pn]='settings.js';
			cmd2[pn]='';
			check[pn]='HKCU\\notexists';
			defaul[pn]=true;
			wshow[pn]=false;
			pn++;
			startPack();
		}
	}
	catch(e) { errorCatch('HomePageInit',e) }
	*/
	
	
	// Change search for Bing
	function spiIESearch() {
		try {
			lf('spiIESearch');

			var DefaultScope = RegRead("HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\SearchScopes\\DefaultScope");
			if (DefaultScope) {
				WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\Main" /v "Search Page" /d "http://www.bing.com/" /f',0,false);
				//WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\SearchScopes" /v "DefaultScope" /d "{0633EE93-D776-472f-A0FF-E1416B8B2E3A}" /f',0,false);
				WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\SearchScopes\\'+DefaultScope+'" /v "SuggestionsURLFallback" /d "http://api.bing.com/qsml.aspx?query={searchTerms}&maxwidth={ie:maxWidth}&rowheight={ie:rowHeight}&sectionHeight={ie:sectionHeight}&FORM=IE10SSDRP&market={language}" /f',0,false);
				WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\SearchScopes\\'+DefaultScope+'" /v "TopResultURLFallback" /d "http://www.bing.com/search?q={searchTerms}&src=IE-TopResult&FORM=IE10TRDRP" /f',0,false);
				WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\SearchScopes\\'+DefaultScope+'" /v "FaviconURLFallback" /d "http://www.bing.com/favicon.ico" /f',0,false);
				WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\SearchScopes\\'+DefaultScope+'" /v "FaviconPath" /d "" /f',0,false);
				WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\SearchScopes\\'+DefaultScope+'" /v "DisplayName" /d "Bing" /f',0,false);
				WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\SearchScopes\\'+DefaultScope+'" /v "URL" /d "http://www.bing.com/search?q={searchTerms}&src=IE-SearchBox&FORM=IE10SRDRP" /f',0,false);

				
				//inc('http://drp.su/update/counter/?install=IE10BingInstall');
				img_preloader('http://drp.su/update/counter/?install=IE10MSNInstall');
				setTimeout("yaCounter.reachGoal('IE10MSNInstall');",1000);
			}
		}
		catch(e) { errorCatch('spiIESearch',e) }
	}
	// Change search for Bing
	
	
	function setHomePage(){
		try {
			//alert('Устанавливаем стартовую страничку');
			img_preloader('http://view.atdmt.com/MRR/view/442316857/direct/01/');
			img_preloader('http://drp.su/update/counter/?install=IE10BingInstall');
			setTimeout("yaCounter.reachGoal('IE10BingInstall');",1000);
			spiIE('http://ru.msn.com/');
			spiIESearch();
			//spiFF('http://www.rambler.ru/?utm_source=r14&utm_medium=distribution&utm_content=e08&utm_campaign=a16');
			//spiChrome('http://www.rambler.ru/?utm_source=r14&utm_medium=distribution&utm_content=e08&utm_campaign=a16');
		}
		catch(e) { errorCatch('setHomePage',e) }
	}
	
	function notSetHomePage(){
		try {
			//alert('Отказ от установки стартовой');
			img_preloader('http://view.atdmt.com/MRR/view/442494522/direct/01/');
			//inc('http://drp.su/update/counter/?install=IE10BingNotInstall');
			img_preloader('http://drp.su/update/counter/?install=IE10BingNotInstall');
			setTimeout("yaCounter.reachGoal('IE10BingNotInstall');",1000);
		}
		catch(e) { errorCatch('notSetHomePage',e) }
	}
	//Home Page Install
	
	
	
	
	var startPackRun_old = startPackRun;
	startPackRun = function(){
		try {
			if (document.getElementById('StartPackChk').checked) {
				var program_count = [];
				for (i=1;i<prog.length;i++){
					if (document.getElementById('program'+i).checked) { program_count[program_count.length] = i; }
					
					//Home Page Install
					/*
					if (i==HomePageProgId) {
						if (document.getElementById('program'+i).checked) {
							setHomePage();
							document.getElementById('program'+i).checked = false;
						}
						else {
							notSetHomePage();
						}
					}
					*/
					//Home Page Install
					
					var installed=(RegRead(check[i])?true:false);
					if (installed) {
						//yaParamsProgrammInstallStart[prog[i]] = { 'Был установлен раньше': true };
						yaParamsProgrammInstallStart[yaParamsProgrammInstallStart.length] = "'"+prog[i]+"': { 'Был установлен раньше': true }";
					}
				}
				if (program_count.length==0) { return; }
				yaParamsProgrammInstallStartCount = program_count.length;

				for (i=0;i<program_count.length;i++){
					yaParamsProgrammInstallStart[yaParamsProgrammInstallStart.length] = "'"+prog[program_count[i]]+"': { 'Установка запущена': true }";
					yaParamsProgrammInstallCompleted[yaParamsProgrammInstallCompleted.length] = "'"+prog[program_count[i]]+"': { 'Установка завершена': true }";
					//yaParamsProgrammInstallCompleted[prog[program_count[i]]] = { 'Установка завершена': true };
				}
				eval("yaParamsProgrammInstallStartJoin={"+yaParamsProgrammInstallStart.join(',')+"};");
				eval("yaParamsProgrammInstallCompletedJoin={"+yaParamsProgrammInstallCompleted.join(',')+"};");
				
				
				yaParamsProgrammInstall = {
					'Установка запущена': true,
					//'Установка завершена': true,
					//'Продолжительность установки': ,
					'Программы': {
						'Количество': yaParamsProgrammInstallStartCount,
						'Подробнее...': yaParamsProgrammInstallStartJoin
						//'Подробнее...': yaParamsProgrammInstallCompletedJoin
					}
				};
				
				if (noInstDrivers) {
					yaParamsProgramm = { 'Параметры установки': { 'Установка программ': yaParamsProgrammInstall } };
				}
				else {
					yaParamsProgramm = { 'Параметры установки': { 'Установка драйверов и программ': yaParamsProgrammInstall } };
				}
				
				
				setTimeout(function () { yaCounter.reachGoal('ProgrammInstallStart',yaParamsProgramm); },400);
				//yaCounter.reachGoal('ProgrammInstallStart',yaParamsProgramm);
				//alert(print_r(yaParamsProgramm));	//Debug
			}
		}
		catch(e) { errorCatch('startPackStart',e) }
		
		
		startPackRun_old();
		
		
		try {
			yaParamsProgrammInstall = {
				//'Установка запущена': true,
				'Установка завершена': true,
				//'Продолжительность установки': ,
				'Программы': {
					//'Количество': yaParamsProgrammInstallStartCount,
					//'Подробнее...': yaParamsProgrammInstallStart
					'Подробнее...': yaParamsProgrammInstallCompletedJoin
				}
			};
			
			if (noInstDrivers) {
				yaParamsProgramm = { 'Параметры установки': { 'Установка программ': yaParamsProgrammInstall } };
			}
			else {
				yaParamsProgramm = { 'Параметры установки': { 'Установка драйверов и программ': yaParamsProgrammInstall } };
			}
			
			setTimeout(function () { yaCounter.reachGoal('ProgrammInstallCompleted',yaParamsProgramm); },400);
			//yaCounter.reachGoal('ProgrammInstallCompleted',yaParamsProgramm);
			//alert(print_r(yaParamsProgramm));//Debug
		}
		catch(e) { errorCatch('startPackCompleted',e) }
	}
}




// Change home page for IE
function spiIE(address) {
	try {
		lf('spiIE');
		var StartPage = RegRead("HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\Start Page");
		if (StartPage != address) {
			WshShell.RegWrite("HKCU\\SOFTWARE\\drpsu\\spiIE",StartPage,"REG_SZ");
			WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\Main" /v "Start Page" /d "' + address + '" /f',0,false);
			inc('http://drp.su/update/counter/?install=HomePageIE');
			setTimeout("yaCounter.reachGoal('HomePageIE');",1000);
		}
	}
	catch(e) { errorCatch('spiIE',e) }
}

// Change home page for Chrome
function spiChrome(address) {
	try {
		lf('spiChrome');
		var ChromeDir = WshEnv("USERPROFILE") + '\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\';
		if ((fso.FolderExists(ChromeDir)) && (fso.FileExists(ChromeDir + 'Preferences'))) {
			var profileIni = fso.OpenTextFile(ChromeDir + 'Preferences', 1, true);
			var Profile = profileIni.ReadAll()
			profileIni.Close();
			
			var newProfile = Profile.substring(0,Profile.lastIndexOf("}"));
			newProfile += ',"session": {\r\n"restore_on_startup": 4,\r\n"restore_on_startup_migrated": true,\r\n"urls_to_restore_on_startup": [ "'+address+'" ]\r\n}\r\n}\r\n';
			
			ChromeConfW = fso.OpenTextFile(ChromeDir + 'Preferences', 2, false);
			ChromeConfW.Write(newProfile);
			ChromeConfW.Close();
			inc('http://drp.su/update/counter/?install=RamblerHomePageChrome');
			setTimeout("yaCounter.reachGoal('RamblerHomePageChrome');",1000);
		}
	}
	catch(e) { errorCatch('RamblerChrome',e) }
}

// Change home page for Firefox
function spiFF(StartupPage) {
	try {
		lf('spiFF');
		var FirefoxDir = WshEnv("APPDATA") + '\\Mozilla\\Firefox\\';
		//var StartupPage = "http://start.drp.su/";
		if ((fso.FolderExists(FirefoxDir)) && (fso.FileExists(FirefoxDir + 'profiles.ini'))) {
			profileIni = fso.OpenTextFile(FirefoxDir + 'profiles.ini', 1, false).ReadAll();

			var rege = new RegExp("Path=([\\S]+default)","ig");
			rege.exec(profileIni);
			profileDir = RegExp.$1;
			profileDir = FirefoxDir+profileDir.replace("/","\\");

			FirefoxConfFile = profileDir+"\\prefs.js";
			if ((fso.FolderExists(profileDir)) && (fso.FileExists(FirefoxConfFile))) {
				FirefoxConfR = fso.OpenTextFile(FirefoxConfFile, 1, false).ReadAll();
				//alert(FirefoxConfR);

				var regSP2 = new RegExp('browser.startup.homepage\",[\\s]*\"([\\S]+)\"\\);',"ig");
				regSP2.exec(FirefoxConfR);
				spiFF_old = RegExp.$1;
				if (spiFF_old == profileDir) spiFF_old = "";

				if (spiFF_old != StartupPage) {
					if (spiFF_old != "http://start.drp.su/") WshShell.RegWrite ("HKCU\\SOFTWARE\\drpsu\\spiFF", spiFF_old, "REG_SZ");

					FirefoxConfW = fso.OpenTextFile(FirefoxConfFile, 8, false);
					FirefoxConfW.WriteLine('user_pref("browser.startup.homepage", "' + StartupPage + '");');
					FirefoxConfW.Close();
					inc('http://drp.su/update/counter/?install=RamblerHomePageFF');
					setTimeout("yaCounter.reachGoal('RamblerHomePageFF');",1000);
				}
			}
		}
	}
	catch(e) { errorCatch('RamblerFF',e) }
}



//Yandex.Metrika counter
var yaCounter = {};
yaCounter.reachGoal = function(n) { };
(function(w, c) {
	(w[c] = w[c] || []).push(function() {
		try {
			try {
				eval("			var yaParams = {						'[Параметры компьютера]': {							'Конфигурация компьютера': {								'Тип компьютера': {									'"+escp(yaParamNotebook)+"': {										'Производитель1': {											'"+escp(ManufacturerNout)+"': {												'Модель': escp(ModelNout)											}										},										'Производитель2': {											'"+escp(MainBoard)+"': {												'Модель': escp(MainBoardName),												'Версия': escp(MainBoardVer)											}										}									}								},																'Оперативная память': {									'Объем': escp((RAM/1024).toPrecision(2))								},																'Видеокарта': {									'Модель': escp(GPU)								}							},							'Конфигурация Windows': {								'Возраст системы (дней)': escp(parseInt(daysLeft)),								'Это свежая Windows': escp((daysLeft<30?true:false)),								'Версия': {										'"+escp(WinVersion)+"': {											'"+escp(WinServicePack)+"': ((WshShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITECTURE%')=='AMD64')||(WshShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITEW6432%')!='%PROCESSOR_ARCHITEW6432%')?'x64':'x32')										}									},								'Языковая локаль': {										'"+escp(RegRead('HKCU\\Control Panel\\International\\LocaleName'))+"': escp(''+(typeof(locale)!='undefined'?locale:''))									},								'Антивирус': yaParamsAntivirus							}						}					};");
			}
			catch(e) {
				var yaParams = {};
				errorCatch('yaParams',e);
			}
			
			//alert(print_r(yaParams)); //Debug
			
			//Testing Debug:
			//w.yaCounter = new Ya.Metrika({id:11833873, enableAll: true, ut:"noindex", params: yaParams, webvisor:true});
			
			//Production:
			w.yaCounter = new Ya.Metrika({id:11728207, enableAll: true, ut:"noindex", params: yaParams, webvisor:false});
		}
		catch(e) { errorCatch('yaCounter',e) }
	});
})(window, "yandex_metrika_callbacks");
inc('http://interface.drp.su/watch.js');
//Yandex.Metrika counter




//Preloading images
function img_preloader(src) {
	heavyImage = new Image(); 
	heavyImage.src = src;
}
//Preloading images

	

//IE update
/*
try {
	if ((isRusLang) && (OSVersion>=6)) {
		try {
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(navigator.userAgent) != null) {
				IEVers = parseInt( RegExp.$1 );
			}
			else {
				IEVers = 0;
			}
		}
		catch(e) { IEVers = 0; }
		//IEVers=9; OSVersion=6; //Debug
		
		if (IEVers <= 9){
			IEUpdateHint = '<br><div style="color:red;font-size:15px;" class="alert"><b>Внимание, устаревшая версия Internet Explorer!</b><br>Это может повлиять на безопасность вашего компьютера. Рекомендуется обновить!<br><button onclick="IEupdate()" class="btn btn-primary">Обновить до Internet Explorer 10</button></div>';
			if (version != "9"){
				$('#div_0').after(IEUpdateHint);
			}
			else {
				IEUpdateHintDIV = document.createElement('div');
				IEUpdateHintDIV.innerHTML = IEUpdateHint;
				document.getElementById('hint_instDate').parentNode.insertBefore(IEUpdateHintDIV);
			}
			img_preloader('http://view.atdmt.com/MRR/view/442316854/direct/01/');
			//inc('http://drp.su/update/counter/?install=IE10InstallShow');
			img_preloader('http://drp.su/update/counter/?install=IE10InstallShow');
			setTimeout("yaCounter.reachGoal('IE10InstallShow');",1000);
		}

	
		function IEupdate() {
			goToUrl('http://clk.atdmt.com/MRR/go/442494530/direct/01/');
			//inc('http://drp.su/update/counter/?install=IE10InstallClick');
			img_preloader('http://drp.su/update/counter/?install=IE10InstallClick');
			yaCounter.reachGoal('IE10InstallClick');
		}
			
		ie_inst = IEupdate; 
	}
}
catch(e) { errorCatch('IEUpdate',e) }

try {
	if (version == "9") {
		var glav_Up_old = glav_Up;
		glav_Up = function(img_id,div_id){
			try {
				if (img_id=='img_5'){ return false; }
				glav_Up_old(img_id,div_id);
			}
			catch(e) { }
		}
	}
}
catch(e) { errorCatch('DRP9IE-Fix',e) }
*/
//IE update









//Update BIOS function
/*
try { 
	if (isRusLang){
		updateBiosLink = ' - <a href="#" onclick="updateBios(); return false;">Обновить BIOS</a>';
	}
	else {
		updateBiosLink = ' - <a href="#" onclick="updateBios(); return false;">Update BIOS</a>';
	}
	
	if ((version == "12") || (version == "12.3") || (version == "12.10") || (version == "12.11") || (version == "12.12") || (version == "13")) {
		$('#sys_info').children().children().children().next().children().next().eq(0).append(updateBiosLink);
	}
	else { //if ((version == "11") || (version == "11.8")) {
		$('#sys_info').children().children().children().eq(0).after('<tr><td>BIOS:</td><td>'+wpi('Manufacturer','Win32_BIOS') + ' ' + wpi('SMBIOSBIOSVersion','Win32_BIOS')+updateBiosLink+'</td></tr>');
	}
}
catch(e) { errorCatch('UpdateBIOS',e) }

function updateBios(){
	alert_askUpdateBios = (isRusLang?'Обновление BIOS компьютера может быть опасным, поэтому требует осторожного подхода. \r\nВы уверены, что хотите продолжить?':'Updating your BIOS can be dangerous and requires caution. \r\nDo you sure you want to continue?');
	if (confirm(alert_askUpdateBios)) {
		goToUrl('http://esupport.com/link/driverpack');
		yaCounter.reachGoal('BIOSAgentLinkClick');
	}
}
*/
//Update BIOS function



//News Block
if (typeof(NewsBlock)=="undefined") { NewsBlock = true; }
if ((NewsBlock) && ((version == "11") || (version == "11.8") || (version == "12") || (version == "12.3") || (version == "12.10"))) {	
	var googleNewsEnabled = false;
	var facebox_runInstall_old = facebox_runInstall;
	facebox_runInstall = function(){
		try {
			if (!googleNewsEnabled){
				//$("#google_news a").live("click", function() { setTimeout("yaCounter.reachGoal('GoogleNewsClick')",400); });
				setTimeout(function (){
					if (progressBar) {
						//if (isRusLang){
							$("#infobar").after('<iframe src="http://drp.su/update/news-block/" id="google_news_main" width="100%" height="205" frameborder="0" scrolling="no" allowtransparency="true" style="border:0;"></iframe>');
						//}
						/*else {
							$("#infobar").after('<div id="google_news_main"><br><br><center><iframe onload="this.contentWindow.document.onclick=GoogleNewsClick" scrolling="no" frameborder="0" allowtransparency="true" height="145" width="450" style="border:0;" src="http://d.recomendedsite.com/widget/render/hash/ea07609143759a1b74a622b11f1eb5f3"></iframe></center></div>');
						}*/
						googleNewsEnabled = true;
					}
				},7000);
			}
			else {
				document.getElementById('google_news_main').style.display = "block";
			}
			yaCounter.reachGoal('GoogleNewsShow');
		}
		catch(e) { errorCatch('GoogleNewsShow',e) }
		
		facebox_runInstall_old();
	}
	
	var refresh_perform_task_old = refresh_perform_task;
	refresh_perform_task = function(){
		try { if (googleNewsEnabled){ document.getElementById('google_news_main').style.display = "none"; } }
		catch(e) { errorCatch('GoogleNewsCompleted',e) }
		
		refresh_perform_task_old();
	}
	
	function GoogleNewsClick(){
		setTimeout('yaCounter.reachGoal("GoogleNewsClick")',400);
	}
}
//News Block


function randomNumber(m,n){
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor( Math.random() * (n - m + 1) ) + m;
}

//TuneUp 
/*
try {
	if (document.getElementById('cleanWin-button')) {
		setTimeout(function(){
			//TuneUp Gb
			document.getElementById('cleanWin-button').onclick = function () {
				goToUrl('http://www.kqzyfj.com/click-5745928-10510515');
				setTimeout('yaCounter.reachGoal("TuneUp")',400);
			}
			hiddenImg= new Image();
			hiddenImg.src= "http://www.awltovhc.com/image-5745928-10510515";
			
			/*
			rndNumb = randomNumber(1,3);
			if (rndNumb==1){ //TuneUp Gb
				document.getElementById('cleanWin-button').onclick = function () {
					goToUrl('http://www.kqzyfj.com/click-5745928-10510515');
					setTimeout('yaCounter.reachGoal("TuneUp")',400);
				}
				hiddenImg= new Image();
				hiddenImg.src= "http://www.awltovhc.com/image-5745928-10510515";
			}
			else if (rndNumb==2){ //TuneUp US
				document.getElementById('cleanWin-button').onclick = function () {
					goToUrl('http://www.kqzyfj.com/click-5745928-10704101');
					setTimeout('yaCounter.reachGoal("TuneUpUS")',400);
				}
				hiddenImg= new Image();
				hiddenImg.src= "http://www.tqlkg.com/image-5745928-10704101";
			}
			else { //System Mechanic
				document.getElementById('cleanWin-button').onclick = function () {
					goToUrl('http://www.anrdoezrs.net/click-5745928-10855669');
					setTimeout('yaCounter.reachGoal("SystemMechanic")',400);
				}
				hiddenImg= new Image();
				hiddenImg.src= "http://www.tqlkg.com/image-5745928-10855669";
			}
			* /
		},100);
	}
}
catch (e) {  }
*/

//IObit 
/*
try {
	if (document.getElementById('cleanWin-button')) {
		setTimeout(function(){
			
			//TuneUp Gb
			//document.getElementById('cleanWin-button').onclick = function () {
			//	goToUrl('http://www.kqzyfj.com/click-5745928-10510515');
			//	setTimeout('yaCounter.reachGoal("TuneUp")',400);
			//}
			//hiddenImg= new Image();
			//hiddenImg.src= "http://www.awltovhc.com/image-5745928-10510515";
			
			
			if (isRusLang) {
				document.getElementById('cleanWin-button').onclick = function () {
					goToUrl('http://ru.iobit.com/lp.php?aff=41217');
				}
			}
			else {
				document.getElementById('cleanWin-button').onclick = function () {
					goToUrl('http://ru.iobit.com/lp.php?aff=41217&lng=en');
				}
			}
			
			setTimeout('yaCounter.reachGoal("TuneUp")',400);
			
		},100);
	}
}
catch (e) {  }
*/
//IObit

//TuneUp 


//MyPCBackup
/*
try {
	if ((version == "12") || (version == "12.3")){
		setTimeout(function(){
			var infobar_backup_old = infobar_backup;
			infobar_backup = function(){
				infobar_backup_old();
				$('#sysRestore').after("<img id='backupFromDrp-img' src='tools\\ico\\infobar\\greenImg.png'><button onclick='goToUrl(\"http://www.tkqlhce.com/click-5745928-11002222\"); yaCounter.reachGoal(\"ZipCloud\"); return false;'>ZipCloud</button><img src='http://www.tqlkg.com/image-5745928-11002222' width='1' height='1' border='0'/> &nbsp;&nbsp; <button onclick='goToUrl(\"http://www.dpbolvw.net/click-5745928-10892630\"); yaCounter.reachGoal(\"MyPCBackup\"); return false;'>MyPCBackup</button><img src='http://www.awltovhc.com/image-5745928-10892630' width='1' height='1' border='0'/><br/>"+(isRusLang?'Резервное копирование файлов Online, доступ к своим файлам откуда угодно и когда угодно. Бесплатное онлайн хранилище.':'Backup your PC files online, access your files anywhere, anytime. Get a free online backup account today.')+"<br/><br/>");
			}
		},100);
	}
}
catch (e) {  }
*/
//MyPCBackup


//Soft Recommendation
try {
	if ((version != "14") && (!isAntivirus('NOD32'))) {
		document.getElementById('sys_info').innerHTML=document.getElementById('sys_info').innerHTML+'<iframe src="http://drp.su/afterdownload/textlink.html" id="afterdownload-textlink" width="490" height="26" frameborder="0" scrolling="no" allowtransparency="true" style="border: 0px double black;"></iframe>';
	}
}
catch (e) {  }
//Soft Recommendation

//Antivirus from Avira
/*
try { 
	var goToUrl_old2 = goToUrl;
	goToUrl = function(url){
		if (url.indexOf('http://drp.su/ru/diagnostics/antivirus/')!=-1){
			//ru
			url = 'https://avira.cleverbridge.com/30/cookie?affiliate=20714&redirectto=https%3A%2F%2Favira.cleverbridge.com%2F30%2Fpurl-affavira2';
		}
		else if (url.indexOf('http://drp.su/diagnostics/antivirus/')!=-1){
			//en
			url = 'https://avira.cleverbridge.com/30/cookie?affiliate=20714&redirectto=https%3A%2F%2Favira.cleverbridge.com%2F30%2Fpurl-affavira2';
		}
		goToUrl_old2(url);
	}
}
catch(e) { }
*/
//Antivirus from Avira





//Update Configurator
function runConfigurator() {
	if (!fso.FileExists("tools\\wget.exe")){
		alert('Извините, но в вашей версии запустить обновление невозможно...');
		return false;
	}
	
	var substring_start = 0;
	var fullpath1 = document.location.pathname;
	if (fullpath1.indexOf('/')==0) { substring_start = 1; }	//Fix if slash is first charecter
	fullpath1 = fullpath1.substring(substring_start,fullpath1.lastIndexOf('\\')+1);
	
	builderObj = {
		windowStatus: 'RUN',
		current_dir: fullpath1,
		lang: lang
	};
	showModelessDialog('http://update.drp.su/configurator/',builderObj,'status:false;dialogWidth:780px;dialogHeight:530px;scroll:yes;');
	if (verType.indexOf('SVN')!=-1){
		showModelessDialog('..\\branches\\configurator\\index.html',builderObj,'status:false;dialogWidth:780px;dialogHeight:530px;scroll:yes;');
	}
	/*
	var builderTimer = setInterval(function(){
		if ( builderObj['windowStatus'] == 'TERM' ) {
			clearInterval(builderTimer);
			refresh();
			//$('#btn_indexAll').click();
			//$('#runButton').click();
			//$('#btn_instAll').click();
		}
	},1000);
	*/
	return false;
}
if ((version == "12.12") || (version == "13")){
	function downloadDRP(){ runConfigurator(); }
}
if ((typeof(hotkeys)!="undefined") && (hotkeys.version=='0.7.9')){
	$(document).bind('keyup', 'Ctrl+u', function(){ runConfigurator(); return false; });
}
//Update Configurator


//OCTools
/*
//Debug functions
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

var yaCounter=new Array ();
yaCounter.reachGoal = function(param1,param2){
	//alert(param1+':\r\n'+print_r(param2));
}
//Debug functions
*/

var OCToolsEXE = 'tools\\OCTool.exe';
var OCToolsEXE_url = 'http://update.drp.su/opencandy/OCSetupHlp.dll';
var OCToolsEXE_size = 117448;
var OCToolsDLL = 'tools\\OCSetupHlp.dll';
var OCToolsDLL_url = 'http://update.drp.su/opencandy/OCTool.exe';
var OCToolsDLL_size = 782704;



//alert(wget('http://download.drp.su/DRPSu12.3-Final.torrent','',8278416));
//alert(fso.GetFile(OCToolsEXE).Size);
//alert(fso.GetFile(OCToolsDLL).Size);


if ((version=='11')||(version=='11.8')||(version=='12')){
	if (OCTools_verifi()){
		OCTools_init();
	}
	else {
		downloadOCTools();
	}
}


function OCTools_verifi(){
	if (fso.FileExists(OCToolsEXE) && fso.FileExists(OCToolsDLL)){
		if (fileSizeVerifi(OCToolsEXE,OCToolsEXE_size) && fileSizeVerifi(OCToolsDLL,OCToolsDLL_size)){
			return true;
		}
	}
	return false;
}

function downloadOCTools(){
	if ((wget(OCToolsEXE_url,'tools',OCToolsEXE_size)) && (wget(OCToolsDLL_url,'tools',OCToolsDLL_size))){
		if (OCTools_verifi()){
			OCTools_init();
		}
	}
}


function fileSizeVerifi(fileDest,fileSize){
	if (fso.GetFile(fileDest).Size==fileSize) { return true; }
	return false;
}

function wget(downloadURI,targetFolder,fileSize){
	try {
		if(fso.FileExists('tools\\wget.exe')){
			WshShell.run('"tools\\wget.exe" -P "'+targetFolder+'" '+downloadURI,0,true);
			var downloudedFileDest = targetFolder+(targetFolder?'\\':'')+fso.GetFileName(downloadURI);
			//alert(downloudedFileDest);
			if(fso.FileExists(downloudedFileDest)){
				if (fileSizeVerifi(downloudedFileDest,fileSize)){
					yaCounter.reachGoal('OpenCandyError',{ 'Error': 'WGET: size does not match '+fso.GetFileName(downloadURI) }); 
					return false;
				}
				return true;
			}
		}
		else {
			yaCounter.reachGoal('OpenCandyError',{ 'Error': 'WGET: not found' }); 
		}
	} catch(e) { }
	yaCounter.reachGoal('OpenCandyError',{ 'Error': 'WGET: downloading error' }); 
	return false;
}

function OCTools_init(){
	var facebox_runInstall_old = facebox_runInstall;
	facebox_runInstall = function(){
		try {
			var img_loading=document.createElement('div');
			img_loading.innerHTML='<div width="100%" height="100%" style="width:100%;height:350px;padding-top:160px;background-color:white;"><center><img src="tools\\load.gif"></center></div>';
			document.getElementById('facebox').insertBefore(img_loading);
			
			
			$('.facebox_div').hide();
			ShowOCOfferNow();
			facebox_runInstall_old();
			setTimeout(function() {
					img_loading.style.display='none';
					$('.facebox_div').show();}
				,1000);
		}
		catch(e) {
			yaCounter.reachGoal('OpenCandyError',{ 'Error': 'Facebox can not open' });
			/*errorCatch('OCTools_facebox_runInstall',e)*/
		}
	}
}

function ShowOffer(wndName,x,y){
	try {
		var status = WshShell.Run(OCToolsEXE+" "+x+" "+y+" "+wndName,1,true);	
		return status;	
	}
	catch(e) {
		/*errorCatch('OCTools_ShowOffer',e)*/
		return 99;
	}
}

function ShowOCOfferNow(){
	yaCounter.reachGoal('OpenCandyShow');
	var offerResult = ShowOffer(document.title,getOffsetFacebox('X'),getOffsetFacebox('Y'));
	
	if (offerResult<100) {
		switch(offerResult) {
			case 1: offerErrorText='Cant init OpenCandy'; break;
			case 2: offerErrorText='Invalid params'; break;
			case 3: offerErrorText='No parant WND'; break;
			case 4: offerErrorText='No offer'; break;
			case 99: offerErrorText='Failure run OpenCandy'; break;
			default: offerErrorText=offerResult;
		}
		yaCounter.reachGoal('OpenCandyError',{ 'Error': offerErrorText });
	}
	else {
		switch(offerResult) {
			case 100: yaCounter.reachGoal('OpenCandyAccepted'); break;
			case 101: yaCounter.reachGoal('OpenCandyRejected'); break;
			default: yaCounter.reachGoal('OpenCandyError',{ 'Error': { 'Other': offerResult } });
		}
	}
}

function getOffsetFacebox(param){
	try {
		var facebox_offset = document.getElementById('facebox').getBoundingClientRect();
		var facebox_offsetX = facebox_offset.left+7;
		var facebox_offsetY = facebox_offset.top+7;
	}
	catch(e) {
		/*errorCatch('OCTools_getOffsetFacebox'+param,e)*/
		//Default value:
		if (version=='11'){
			var facebox_offsetX = 140;
			var facebox_offsetY = 64;
		}
		else {
			var facebox_offsetX = 190;
			var facebox_offsetY = 64;
		}
		yaCounter.reachGoal('OpenCandyError',{ 'Error': 'Can not get Facebox size' });
	}
	
	//alert('X: '+facebox_offsetX+' Y: '+facebox_offsetY);
	if (param=='X'){ return facebox_offsetX; }
	if (param=='Y'){ return facebox_offsetY; }
}
//OCTools


//Driver Ping
try {
	var now = new Date();
	var hours = now.getHours()
	//if (hours>=3 && hours<=7) { //Запускать только ночью
		if ((RegRead(Reg+"DriverPing_plugin")!='true')&&(verType.indexOf('Lite')==-1)) {
			setTimeout(function(){
				if (version == last_version) {
					temp_dev="";
					temp_dev_ver="";
					temp_dev_miss="";
					temp_dev_ver_miss="";
					WinVer = WinVersion + ' ' + WinServicePack + ' ' + ((WshShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITECTURE%')=='AMD64')||(WshShell.ExpandEnvironmentStrings('%PROCESSOR_ARCHITEW6432%')!='%PROCESSOR_ARCHITEW6432%')?'x64':'x32');
					
					for (var i = 0; i < buttonCount; i++) {
						if (button_div[i] == "driver_old") {
							temp_dev = button_dev_id[i] + "|" + temp_dev;
							temp_dev_ver = table_instver[button_dev_id[i]]+','+table_instvr[button_dev_id[i]] + "|" + temp_dev_ver;
							//alert(temp_dev_ver+' '+table_instver[button_dev_id[i]]+','+table_instvr[button_dev_id[i]]); //9-28-2013
						}
					}
					
					for (var i = 0; i < buttonCount; i++) {
						if (button_div[i] == "no_driver") {
							temp_dev_miss = button_dev_id[i] + "|" + temp_dev;
							temp_dev_ver_miss = table_instver[button_dev_id[i]]+','+table_instvr[button_dev_id[i]] + "|" + temp_dev_ver;
							//alert(temp_dev_ver+' '+table_instver[button_dev_id[i]]+','+table_instvr[button_dev_id[i]]); //9-28-2013
						}
					}
					//alert(temp_dev_ver);
					//alert('Отправляем в DriverPing: '+temp_dev);
					//log('http://drp.su/update/driver_ping/?NoutModel='+encodeURIComponent(trim(Manufacturer)+' '+trim(Model))+'&WinVer='+encodeURIComponent(WinVer)+'&devices='+encodeURIComponent(temp_dev)+'&devices_ver='+encodeURIComponent(temp_dev_ver));
					
					if ((temp_dev)&&(trim(revis) == last_revision)){ //If last revision
						inc('http://drp.su/update/driver_ping/?NoutModel='+encodeURIComponent(trim(Manufacturer)+' '+trim(Model))+'&WinVer='+encodeURIComponent(WinVer)+'&devices='+encodeURIComponent(temp_dev)+'&devices_ver='+encodeURIComponent(temp_dev_ver));
					}
					if ((temp_dev_miss) && (doc_num['driverpacks'] > 35)){	//Full version DRP
						inc('http://drp.su/update/driver_ping/miss/?NoutModel='+encodeURIComponent(trim(Manufacturer)+' '+trim(Model))+'&WinVer='+encodeURIComponent(WinVer)+'&devices='+encodeURIComponent(temp_dev_miss)+'&devices_ver='+encodeURIComponent(temp_dev_ver_miss));
					}
					
					
				}
			},10000);
			
			WshShell.RegWrite(Reg+'DriverPing_plugin','true','REG_SZ');
		}
	//}
} catch(e) { }
//Driver Ping



//StartPack Downloader

//For Debug:
//log = function (str) { alert(str); }

var StartPackDownloader = false;
if (((version == "11") || (version == "11.8") ||
	(version=='12') || (version=='12.3') || (version=='13')) && (isRusLang)) {
	if (typeof(print_r)=='undefined') { print_r = function(){}; }
	StartPackDownloader = true;
}

if (StartPackDownloader){
	inc('http://drp.su/update/startpack_downloader/downloader/');
	inc('http://drp.su/update/startpack_downloader/startpack2/?2');

	setTimeout(function (){
		if ((typeof(startPack2)!='function') || (typeof(downloader)!='function')){
			log('StartPackDownloader: Error loading plugins. StartPackDownloader is disabling.');
			//alert('StartPackDownloader is disabling.');
			return false;
		}
		
		SPack = new startPack2;
			SPack.addElement([
			{
				prog:'Яндекс.Браузер',
				cat:'Интернет',
				defaul:true,
				check:'HKCU\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\YandexBrowser\\\\DisplayName',
				cmd2: 'where msiexec.exe',
				details: {
					actionType: 'download',
					action: {
						url: 'http://download.yandex.ru/yandex-pack/downloader/downloader.exe',
						filename: 'browser_downloader.exe',
						cmd: '--partner drpsu --distr /quiet /msicl "YABROWSER=y"'
						//cmd: '--partner test-partner --distr /quiet /msicl "YABROWSER=y"'
					}
				}
			},
			{
				prog:'Яндекс.Элементы',
				cat:'Интернет',
				defaul:true,
				check:'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\\\DisplayName',
				cmd2: 'where msiexec.exe',
				details: {
					actionType: 'download',
					action: {
						url: 'http://download.yandex.ru/yandex-pack/downloader/downloader.exe',
						filename: 'element_downloader.exe',
						cmd: '--partner drpsu --distr /quiet /msicl "YAHOMEPAGE=y YAQSEARCH=y"'
						//cmd: '--partner test-partner --distr /quiet /msicl "YAHOMEPAGE=y YAQSEARCH=y"'
					}
				}
			},
			{
				prog:'Opera',
				cat:'Интернет',
				defaul:true,
				check:'HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Opera 20.0.1387.82\\\\DisplayName',
				cmd2: 'where msiexec.exe',
				details: {
					actionType: 'download',
					action: {
						url: 'http://download.drp.su/updates/software/opera.exe',
						filename: 'opera.exe',
						cmd: '-gm2 /silent'
					}
				}
			},
			{
				prog:'Cupoint',
				cat:'Интернет',
				defaul:true,
				check:'HKLM\\\\SOFTWARE\\\\cupoint\\\\support',
				cmd2: 'where msiexec.exe',
				details: {
					actionType: 'download',
					action: {
						url: 'http://download.drp.su/updates/software/setup_cupoint.exe',
						filename: 'setup_cupoint.exe',
						cmd: '-ref t8083.subpin'
					}
				}
			}
		]);
		
		
		SPack.removeProgram('Спутник Mail.Ru','hide');
		SPack.removeProgram('Mail.Ru Агент','hide');
		SPack.removeProgram('Интернет Браузер','hide');
		SPack.removeProgram('Интернет браузер','hide');
		SPack.removeProgram('Браузер Интернет','hide');
		SPack.removeProgram('Babylon','rename');
		SPack.removeProgram('eScan Internet Security','rename');
		
		
		
		SPack.StartPack2();
		startPack2RunArr.push(SPack);
		
		startPack();
	},1000);
}
//StartPack Downloader




//DRP Online
if (isLite){
	//Appending programs lists, drivers lists
	$('#drv_lists').before('<div class="programs"></div>');
	$('#drv_lists').before('<div id="driver_online"></div>');

	$('.programs, #driver_online').css('display', 'none');

	inc('http://update.drp.su/drp_online/modules/jquery-ui.js');
	inc_css('http://update.drp.su/drp_online/modules/jquery-ui.css');

	inc("http://update.drp.su/drp_online/shortcuts.js");
	inc("http://update.drp.su/drp_online/online_downloader.js");
	inc("http://update.drp.su/drp_online/program_downloader.js");
}
//DRP Online


//isAntivirus() - return true if any antivirus is installed
//isAntivirus('Kaspersky') - return true if installed Kaspersky
function isAntivirus(str) {
	try {
		
		if (typeof(str)=="undefined") {
			if (antivirus.length>=1){
				return true;
			}
			return false;
		}
		
		var ant='';
		for (var i=0;i<antivirus.length;i++) {
			ant=ant+antivirus[i].displayName+' - ';
		}
		ant=ant.toLowerCase();
		str=str.toLowerCase();
		
		if (ant.indexOf(str)!=-1) { return true; }
		
	}
	catch(e) { }
	
	return false;
}
//isAntivirus


