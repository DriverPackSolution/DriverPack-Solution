/*
http://neophob.com/2010/03/wmi-query-windows-securitycenter2/
http://msdn.microsoft.com/en-us/library/bb432509(VS.85).aspx

See this tweak:
http://technet.microsoft.com/en-us/magazine/hh351215.aspx


Avira - Av enabled and updated:
266240 -> 41000

Avira - Av disabled and updated:
270336 -> 42000

Avira - Av enabled and not updated:
266256 -> 41010

Avira - Av disabled and not updated:
270352 -> 42010

Microsoft Essentional - enabled and updated:
397312 -> 61000

Microsoft Essentional - disabled and updated:
393216 -> 60000
*/

function avScanner(){
	var mrtInSystem = env_windir+'\\System32\\MRT.exe';
	var mrtInDRP = softFolder+'\\MBAM.exe /S';
	
	try {
		if (fso.FileExists(mrtInSystem)) {
			var mrtInSystemDate = fso.GetFile(mrtInSystem).DateLastModified;
			var mrtInDRPDate = fso.GetFile(mrtInDRP).DateLastModified;
			if (mrtInSystemDate>mrtInDRPDate) {
				//Run av-scanner from Windows
				WshShell.Run(mrtInSystem,1,false);
			}
			else {
				//Run av-scanner from DRP
				WshShell.Run(mrtInDRP,1,false);
			}
		}
		else if (is64) {
			winRun(mrtInSystem,'','',true);
		}
		else {
			//Run av-scanner from DRP
			WshShell.Run(mrtInDRP,1,false);
		}
	}
	catch(e) { alert(avScanner_error); }
}


function avStatus(type){
	
	
	var ret=false;
	if (OSVersion >= 6) {
		var productState = parseInt(antivirus[0].productState).toString(16);
		
		if (type=='upToDate'){
			var parseState=productState.substring(productState.length-2,productState.length);
			var ret=(parseState!='00'?false:true);
		}
		
		if (type=='avActive'){
			var parseState=productState.substring(productState.length-4,productState.length-2);
			var ret=(parseState!='10'?false:true);
		}
		
		if (type=='avType'){
			var parseState=productState.substring(productState.length-6,productState.length-4);
			var ret=parseState;
		}
	}
	else {
		if (type=='upToDate'){
			var parseState=antivirus[0].productUptodate;
			var ret=(parseState!=='false'?true:false);
		}
		
		if (type=='avActive'){
			var parseState=antivirus[0].onAccessScanningEnabled;
			var ret=(parseState!=='false'?true:false);
		}
		
		if (type=='avType'){
			return false;
		}
	}
	
	return ret;
}

function avStatus_alert(){
	if (antivirus.length==0) { return false; }
	var ant='';
	var ant_before="<div class='alert alert-block alert-diagn' id='antivirus-alert'><button type='button' class='close' data-dismiss='alert'>×</button>";
	var ant_after="</div>";
	var ant_offer_reinstall='<div id="antivirus-alert-btn"><a href="#" class="btn btn-info" onclick="antivirus_inst(); return false;" id="avScanner_installNewAv">'+avScanner_installNewAv+'</a> &nbsp;&nbsp; <a href="#" class="btn btn-warning btn-mini" onclick="return avRemove();" id="avScanner_remove">'+avScanner_remove+'</a></div>';

	//Debug
	//if ((avStatus('avActive'))||(avStatus('upToDate'))){
	
	if ((!avStatus('avActive'))&&(!avStatus('upToDate'))){
		ant=ant_before+avScanner_notActiveNotUpToDate+ant_offer_reinstall+ant_after;
		addDiagAlert('antivirus','Antivirus','warning');
	}
	else if (!avStatus('avActive')){
		ant=ant_before+avScanner_notActive+ant_offer_reinstall+ant_after;
		addDiagAlert('antivirus','Antivirus','warning');
	}
	else if (!avStatus('upToDate')){
		ant=ant_before+avScanner_notUpToDate+ant_offer_reinstall+ant_after;
		addDiagAlert('antivirus','Antivirus','warning');
	}
	document.getElementById('avStatus_alert').innerHTML=ant;
}