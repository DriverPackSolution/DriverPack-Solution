//IE update
//try {
/*
	if (rusLang){
		try { IEVers = RegRead('HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\Version').split('.'); IEVers = parseInt(IEVers[0]); }
		catch(e) { IEVers = 0; }
		//IEVers=8; OSVersion=7; //Debug
		
		if (((OSVersion >= 6) && (IEVers < 9)) || ((OSVersion < 6) && (IEVers < 8)) || (IEVers==0)){
			IEUpdateHint = '<br><div style="color:red;">'+ie_out_of_date+'<br><button onclick="ie_inst()">'+ie_out_of_date_button+' '+(OSVersion>=6?'9':'8')+'</button></div>';
			if (version != "9"){ $('#hint_instDate').after(IEUpdateHint); }
			else {
				IEUpdateHintDIV = document.createElement('div');
				IEUpdateHintDIV.innerHTML = IEUpdateHint;
				document.getElementById('hint_instDate').parentNode.insertBefore(IEUpdateHintDIV);
			}
			inc('http://drp.su/update/counter/?install=IEUpdateDRPShow');
			setTimeout("yaCounter.reachGoal('IEUpdateDRPShow');",20000);
		}
	}
*/
//}
//catch(e) { errorCatch('IEUpdate',e) }

function ie_inst(){
	inc('http://drp.su/update/counter/?install=IEUpdateDRPInstall');
	yaCounter.reachGoal('IEUpdateDRPInstall');
	
	for (var i=1;i<prog.length;i++) {
		if ((prog[i].indexOf('Internet Explorer')!=-1) && (prog_exists[i]) && (!prog_installed[i])){
			button_install('program');
			hideOrShow('startPack');
			hideOrShow('catalog_program');
			$('#program'+i).parent().css('color','red');
			return;
		}
	}
	goToUrl('http://drp.su/'+(rusLang?'ru/':'')+'diagnostics/ie/');
}

//IE update