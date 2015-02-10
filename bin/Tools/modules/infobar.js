function infobar(title,text,color,button,img){
	if (progressBar) return;

	var infobar_color = document.getElementById('infobar_color');
	var infobar_img = document.getElementById('infobar_img');

	if (color == 'green') {
		infobar_color.style.backgroundImage = "url(./tools/ico/infobar/green.png)";
		infobar_img.src = "./tools/ico/infobar/greenImg.png";
		infobar_color.style.backgroundColor = "#c4fb9c";
	}
	else if (color == 'yelow') {
		infobar_color.style.backgroundImage = "url(./tools/ico/infobar/yelow.png)";
		infobar_img.src = "./tools/ico/infobar/yelowImg.png";
		infobar_color.style.backgroundColor = "#ffda75";
	}
	else if (color == 'red') {
		infobar_color.style.backgroundImage = "url(./tools/ico/infobar/red.png)";
		infobar_img.src = "./tools/ico/infobar/redImg.png";
		infobar_color.style.backgroundColor = "#ff7575";
	}

	if (button){
		text += button;
	}
	if (img){
		infobar_img.src = "./tools/ico/infobar/"+img+".png";
		fixPNG(infobar_img);
	}

	document.getElementById('infobar_title').innerHTML = title;
	document.getElementById('infobar_info').innerHTML = text;
}

function chkManual(div,noclear){
	if (!noclear) unChkAll();
	for (var i = 0; i < buttonCount; i++) {
		var checkbox = document.getElementById('chk'+i);
		var divname = document.getElementById('type'+i).value;

		if (divname == div) { checkbox.checked="true"; ChangeChkCount(1); }
	}
}

function button_install(type){
	document.getElementById("facebox_drvInst").style.display='';
	noInstDrivers=false;
	if (type=='install'){
		document.getElementById("misc_inst_drv-prog").innerHTML=misc_inst1;
		document.getElementById("misc_inst_drv-only").innerHTML=misc_inst2;
		chkManual("driver_available");
		facebox_dialog();
	}
	else if (type=='update'){
		document.getElementById("misc_inst_drv-prog").innerHTML=misc_inst3;
		document.getElementById("misc_inst_drv-only").innerHTML=misc_inst4;
		chkManual("driver_new");
		facebox_dialog();
	}
	else if (type=='install_and_update'){
		document.getElementById("misc_inst_drv-prog").innerHTML=misc_inst1;
		document.getElementById("misc_inst_drv-only").innerHTML=misc_inst2;
		chkManual("driver_available");
		chkManual("driver_new",true);
		facebox_dialog();
	}
	else if (type=='program'){
		document.getElementById("misc_inst_drv-prog").innerHTML=misc_inst5;
		document.getElementById("facebox_drvInst").style.display='none';
		document.getElementById('StartPackChk').checked=true;
		unChkAll();
		noInstDrivers=true;
		facebox_dialog();
	}
	drivers_catalog();

	return false;
}

function facebox_dialog(){}

function badge_update(name,value){
	document.getElementById(name).innerHTML = value;
}


function infobar_update(){
/*    doc_num['no_driver']       =10;
	doc_num['driver_available']=0;
	doc_num['driver_new']      =0;*/
	
	//Add a counter to the tab
	badge_update('badge-drivers',doc_num['driver_available']+doc_num['driver_new']);
	
	if ((doc_num['driver_available'] > 0) || (!DRPgood)) {
		infobar_driver();
	}
	else if (doc_num['no_driver'] > 0) {
		infobar_drvNone();
	}
	else if (doc_num['driver_new'] > 0) {
		infobar_driver();
	}
	else {
		infobar_drvAllOk();
	}
}

function infobar_driver(){
	var title,text='',button='';

	if (doc_num['driver_available']){ title=infobar_titleDriverAvailable; }
	else if (doc_num['driver_new']){ title=infobar_titleDriverNew; }
	else { title=infobar_titleAllInst; }

	if (doc_num['driver_available']){
		text+='<b>'+doc_num['driver_available']+'</b> - '+morfolog('infobar_infoDriverAvailable',doc_num['driver_available'])+(doc_num['driver_new']?" <a href='#' onclick='return button_install(\"install\")'>"+infobar_buttonInst+'</a><br>':'');
	}
	if (doc_num['driver_new']){
		text+='<b>'+doc_num['driver_new']+'</b> - '+morfolog('infobar_infoDriverNew',doc_num['driver_new'])+(doc_num['driver_available']?" <a href='#' onclick='return button_install(\"update\")'>"+infobar_buttonUpd+'</a>':'');
	}

	if (doc_num['driver_available'] && doc_num['driver_new']){
		button="<button class='infobar_button btn btn-success' onclick='return button_install(\"install_and_update\")'>"+infobar_buttonRunAll+"</button>";
	}
	else if (doc_num['driver_available']){
		button="<button class='infobar_button btn btn-success' onclick='return button_install(\"install\")'>"+infobar_buttonInstAll+"</button>";
	}
	else if (doc_num['driver_new']){
		button="<button class='infobar_button btn btn-success' onclick='return button_install(\"update\")'>"+infobar_buttonUpdAll+"</button>";
	}


	infobar(
		title,
		text,
		(doc_num['driver_available']?'red':'yelow'),
		button
	);

	if (!doc_num['driver_available'] && !doc_num['driver_new']) { infobar_drvAllOk(); }
	setTab('tab-driver');
	set_lists
		(doc_num["driver_available"]?"block":"none",
		 doc_num["no_driver"]?"block":"none",
		 doc_num["driver_new"]?"block":"none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",

		 "block",
		 "none",
		 "block",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none"
		);


	//If driverpacks not exists
	if (!DRPgood){
		infobar(
			infobar_noDriverpacksTitle,
			infobar_noDriverpacks+'<br><br><center><button class="btn btn-primary" onclick="downloadDRP()" id="downloadDRP"><i class="icon-download-alt icon-white"></i> '+infobar_downloadFull+'</button> <button class="btn" onclick="buyDRP()" id="buyDRP">'+infobar_buy+'</button></center>',
			'red',
			''
		);
		hideOrShow('tab-search');
	}
}

function infobar_programm(){
	if ((typeof(programm_list)!="undefined") && (programm_list.length!=0)) {
		infobar(
				infobar_titleProgrammAvailable,
				'<b>'+programm_list.length+'</b> - '+morfolog('infobar_programmAvailable',programm_list.length)+': <i>'+programm_list.join(', ')+'</i>.',
				'yelow',
				"<button class='infobar_button btn btn-success' onclick='return button_install(\"program\")'>"+infobar_buttonRunAll+"</button>",
				'update'
			);
	}
	else if ((typeof(startPack_load)!="undefined") && (!startPack_load)) {
		infobar(
				infobar_noProgramTitle,
				infobar_noProgram+'<br><br><center><button class="btn btn-primary" onclick="downloadDRP()" id="downloadDRP"><i class="icon-download-alt icon-white"></i> '+infobar_downloadFull+'</button> <button class="btn" onclick="buyDRP()" id="buyDRP">'+infobar_buy+'</button></center>',
				'red'
			);
	}
	else{
		infobar(
				infobar_titleProgramm,
				infobar_infoProgramm,
				'green'
			);
		//document.getElementById('infobar_img').src = "./tools/ico/infobar/update.png";
	}
	setTab('tab-programm');
	set_lists
		("none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",

		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none"
		);
}
function infobar_drvAdvanced(){
	infobar(
		infobar_titleAllAdv,
		infobar_infoAllAdv,
		'green',
		'',
		'misc'
	);
	setTab('tab-advanced');
	set_lists
		("none",
		 "none",
		 "none",
		 "none",
		 "none",
		 doc_num["driver_unknown"]?"block":"none",
		 "none",
		 "none",

		 "none",
		 "none",
		 "none",
		 "block",
		 "block",
		 "block",
		 "block",
		 "block"
		);
}

function infobar_drvNone(){
	infobar(
			infobar_titleNoDriver,
			'<b>'+doc_num['no_driver']+'</b> - '+morfolog('infobar_infoNoDriver',doc_num['no_driver'])+' <div id="infobar_urls_div">'+infobar_urls+'</div>',
			'red'
		);
	if (doc_num['no_driver']==0) infobar_drvAllOk();
	setTab('tab-search');
	hideOrShow('tab-search');
	set_lists
		("none",
		 "block",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",

		 "none",
		 "block",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none"
		);
}
function infobar_drvAllOk(){
	infobar(
			infobar_titleAllInst,
			infobar_infoAllInst,
			'green'
		);
	setTab('tab-driver');
	set_lists
		(doc_num["driver_available"]?"block":"none",
		 doc_num["no_driver"]?"block":"none",
		 doc_num["driver_new"]?"block":"none",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none",

		 "block",
		 "none",
		 "block",
		 "none",
		 "none",
		 "none",
		 "none",
		 "none"
		);
}



function infobar_loading(){
	infobar(
		infobar_titleLoading,
		'<img src="tools/load.gif"> '+infobar_infoLoading,
		'yelow',
		'',
		'loading'
	);
}



function setTab(tab){
	$('#tab-driver, #tab-programm, #tab-advanced, #tab-search, #tab-backup').removeClass('active');
	
	if (tab) $('#'+tab).addClass('active');
}