var antivirus=[];

function antivirus_wmi(){
	try {
		antivirus.length=0;
		
		var objWMIService_antivir = locator.ConnectServer(null, "\\root\\SecurityCenter"+(OSVersion>=6?'2':''));
		var colItems = objWMIService_antivir.ExecQuery("SELECT * FROM AntiVirusProduct","WQL");
		var enumItems = new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext()) {
			  var objItem = enumItems.item();
			  if (objItem.displayName!='Windows Defender'){
			  //Get data
			  antivirus[antivirus.length] = {
						companyName: clearUndefVar(objItem.companyName),
						displayName: clearUndefVar(objItem.displayName),
						productState: clearUndefVar(objItem.productState),
						instanceGuid: clearUndefVar(objItem.instanceGuid),
						onAccessScanningEnabled: clearUndefVar(objItem.onAccessScanningEnabled),
						pathToSignedProductExe: clearUndefVar(objItem.pathToSignedProductExe),
						productHasNotifiedUser: clearUndefVar(objItem.productHasNotifiedUser),
						productUptoDate: clearUndefVar(objItem.productUptoDate),
						productWantsWscNotifications: clearUndefVar(objItem.productWantsWscNotifications),
						versionNumber: clearUndefVar(objItem.versionNumber)
				};
			  }
		}
		return true;
	}
	catch(e) { return false; }
}


//Fills the section "System" in the main window.
//Runs every time you update the window.
function antivirus_detect(){
	if(!antivirus_wmi() || !GetSecurityCenterServiceState()) { //Check Security Center and get data
		addDiagAlert('antivirus',SCNotActive_alert,'warning');
		var ant_before="<div class='alert alert-block alert-diagn' id='antivirus-alert'><button type='button' class='close' data-dismiss='alert'>×</button>";
		var ant_after="</div>";
		setTimeout(function(){
			try {
				document.getElementById('avStatus_alert').innerHTML=ant_before+SCNotActive_messageAlert+ant_after;
			}catch(e) {}
		},1000);
		return false;
	}
	
	
	var ant_before="<div class='alert alert-block alert-diagn' id='antivirus-alert'><button type='button' class='close' data-dismiss='alert'>×</button>";
	var ant_after="</div>";
	
	//antivirus.length=0;	//debug
	//antivirus[1]= { displayName: 'Kaspersky', versionNumber: '2012' }	//debug

	if (antivirus.length==0) {	//If the antivirus is not installed
		document.getElementById('antivirus_alert').innerHTML=ant_before+antivirus_needInst+'<br><nobr><a href="#" class="btn btn-primary" onclick="antivirus_inst(); return false;" id="avScanner_installNewAv">'+antivirus_install+'</a></nobr>'+ant_after;
		addDiagAlert('antivirus','Antivirus','important');
	}
	else if (antivirus.length>1) {	//If you have installed any antivirus
		var ant='';
		for (var i=0;i<antivirus.length;i++) { ant=ant+antivirus[i].displayName+' - '; }
		document.getElementById('antivirus_alert').innerHTML=ant+ant_before+antivirus_warning+'<br><a href="#" class="btn btn-danger btn-small" id="remove-antivirus" onclick="return appwiz();">'+antivirus_warning_button+'</a>'+ant_after;
		addDiagAlert('antivirus','Antivirus','important');
	}
	else if (antivirus.length==1) {	//If the antivirus is installed
		document.getElementById('antivirus_alert').innerHTML=antivirus[0].displayName+' '+antivirus[0].versionNumber;
	}
}


//Prepare the box confirming the installation to make it work even if you have already installed all the programs.
//Allocates antivirus red.
function antivirus_inst(){
	for (var i=1;i<prog.length;i++) {
		if ((cat[i]==startpack_Antivirus) && (prog_exists[i]) && (!prog_installed[i])){
			button_install('program');
			hideOrShow('startPack');
			hideOrShow('catalog_program');
			$('#program'+i).parent().parent().css('color','red');
			return;
		}
	}
	goToUrl('http://drp.su/'+(rusLang?'ru/':'')+'diagnostics/antivirus/');
}

//Remove ticks with other antivirus solutions, so it was impossible to select multiple.
function deselectOtherAntivir(id){
	for (var i=1;i<prog.length;i++) {
		if ((cat[i]==startpack_Antivirus) && (i!=id)){
			document.getElementById('program'+i).checked=false;
		}
	}
}

function avRemove(){
	appwiz();
	return false;
}