var yandexBar=true;
var startPack_load = false;
var pn=1, programm_list=[], prog=[], cat=[], cmd1=[], cmd2=[], wshow=[], defaul=[], check=[], onclick=[], onCompleteInst=[], nowait=[], prog_exists=[], prog_installed=[], prog_timeout=[];


$(document).ready(function (){
	//ToDo: uncommented TRY statement
	try {
		if (!fso.FolderExists(softFolder)) {
			try {
				fso.CreateFolder(softFolder);
			}
			catch(e) { }
		}
		
		if (fso.FileExists(softFolder+'\\settings.js')) { inc(softFolder+'\\settings.js'); startPack_load = true; }
		else { startPack_load = false; }
	}
	catch(e) { startPack_load = false; }
	try {
		if (!fso.FileExists('tools\\yabar.msi')) { yandexBar = false; hideOrShow('yabar_inst_div',true); hideOrShow('yabar_inst_div2',true); hideOrShow('yabar_start_div',true); hideOrShow('yabar_search_div',true); hideOrShow('yandex_license',true); }
	}
	catch(e) { yandexBar = true; }
});


function yabar_install(){
	if (!yandexBar) { return; }
	var yabar_type = '';
	var yabar = false;

	if (document.getElementById('yabar_inst').checked) { yabar = true; }
	if (document.getElementById('yabar_start').checked){ yabar_type += 'YAHOMEPAGE="y" '; yabar = true; }
	if (document.getElementById('yabar_search').checked){ yabar_type += 'YAQSEARCH="y" '; yabar = true; }
	if ((!document.getElementById('yabar_inst').checked) && ((document.getElementById('yabar_start').checked) || (document.getElementById('yabar_search').checked))){ yabar_type += 'ILIGHT=1 '; yabar = true; }

	if (yabar){
		//alert('msiexec /i tools\\yabar.msi '+yabar_type+'VENDORSPECIFIC="'+version+'" /qn');
		//return false;
		WshShell.Run('msiexec /i tools\\yabar.msi '+yabar_type+'VENDORSPECIFIC="drp11" /qn',0,false);
	}
}

//window.attachEvent('onload',startPack);
$(document).ready(function() { setTimeout("startPack()",500); });
function startPack(){
	if (!yandexBar) { document.getElementById('title_yaBar').style.display='none'; }
	if (startPack_load) {
		var last_cat=null;
		var html='';
		var at_least_one=false;
		programm_list.length = 0;
		for (i=1;i<prog.length;i++){
			prog_exists[i]=((fso.FileExists(softFolder+'\\'+cmd1[i]))?true:false);
			//prog_installed[i]=(RegRead(check[i])||RegRead(check[i].replace('\\Microsoft\\Windows','Wow6432Node\\Microsoft\\Windows'))?true:false);
			prog_installed[i]=(RegRead(check[i])?true:false);
			//prog_installed[i]=false; //Debug
			if ((prog_exists[i]) && (!prog_installed[i])) {
				if (last_cat!=cat[i]) {
					if (last_cat!=null) { html+='</span></div>'; }
					html+='<div class="cat"><span>'+cat[i]+'<br>';
				}
				last_cat = cat[i];
				
				html+='<nobr><label onclick="SP_click(\''+i+'\')"><input type="checkbox" '+(defaul[i]?'checked=""':'')+' id="program'+i+'" /> '+prog[i]+'</label></nobr><br>';
				if (defaul[i]) { programm_list[programm_list.length]=prog[i]; }
				at_least_one=true;
			}
			else {
				html+='<input type="checkbox" id="program'+i+'" style="display:none;" />';
			}
		}
		html+='</span></div>';
		document.getElementById('catalog').innerHTML=html;
		
		//Add a counter to the tab
		badge_update('badge-programms',programm_list.length);
		
		//Folder "program" is empty
		if ((!at_least_one) || (programm_list.length==0)) {
			document.getElementById('drv_only').checked=true;
			//document.getElementById('tab-programm').style.display='none';
			document.getElementById('startPack').style.display='none';
			document.getElementById('catalog_program').style.display='none';
		}
		else {
			document.getElementById('StartPackChk').checked=true;
			//document.getElementById('tab-programm').style.display='';
			document.getElementById('startPack').style.display='';
			document.getElementById('catalog_program').style.display='';
		}
	}
}

var startPack_program_count = [];
function startPackRun(){
	oem_install();
	yabar_install();
	if (!document.getElementById('StartPackChk').checked) { setTimeout('refresh_perform_task()',1000); return; }
	
	startPack_program_count = [];
	for (i=1;i<prog.length;i++){
		if (document.getElementById('program'+i).checked) { startPack_program_count[startPack_program_count.length] = i; }
	}
	if (startPack_program_count.length==0) {setTimeout('refresh_perform_task()',1000); return; }
	
	infobar_runInstall(infobar_programInstall,startPack_program_count.length);
	startPackNext(0);
}

function startPackNext(i){
	if (i<startPack_program_count.length){
		r=startPack_program_count[i];
		i++;
		document.getElementById('progressBar_Description').innerHTML=prog[r];
		
		var run;
		var timeout_wait=60;
		if (typeof(prog_timeout[r]) == "number") { timeout_wait=prog_timeout[r]; }
		if (cmd2[r].indexOf('msiexec.exe')!=-1) {
			if ((OSVersion == 5) && (OSVersionSP <= 1)) { cmd2[r] = cmd2[r].replace('/norestart',''); } //Fix on Windows XP (SP0,SP1) - Windows Installer 2.0
			run = cmd2[r];
		}
		else if (cmd2[r].indexOf('wusa ')!=-1) {
			run = cmd2[r];
		}
		else { run = softFolder+'\\'+cmd1[r]+' '+cmd2[r]; }
		//WshShell.Run(run,(wshow[r]?1:0),!(nowait[r]?true:false));
		//prBarNext(i);
		if (i==startPack_program_count.length) { timeout_wait=timeout_wait+60; }
		winRun(run,!wshow[r],!nowait[r],false,timeout_wait,function (){ /*alert('onComplete');*/ if (typeof(onCompleteInst[r]) != "undefined") { eval(onCompleteInst[r]); } prBarNext(i); startPackNext(i); },function (oExec){ /*alert('onTimeOut');*/ defaul[r]=false; prBarNext(i); startPackNext(i); });
	}
	else { setTimeout('refresh_perform_task()',1000); }
}

//If 'onclick' then execute it by clicking on the checkbox.
function SP_click(id,from){
	if (typeof(onclick[id]) != "undefined") { eval(onclick[id]); }
}

function drivers_catalog(){
	if (noInstDrivers) { $('#catalog_drivers').hide(); return false; }
	else { $('#catalog_drivers').show(); }
	
	// !Markup
    //var k=1;
	var html="";//='<table border=0 cellpadding=1 cellspacing=1 ><tr>';
	for (var i = 0; i < buttonCount; i++) {
		if (((button_div[i] == "driver_available") ||
			(button_div[i] == "driver_new")) && (document.getElementById("chk"+i).checked))
		{	
			if (html.indexOf(button_pack_desc[i]) == -1)
			{
				var drv_hint='';
				var devicesDescription=[];
				for (var r = 0; r < buttonCount; r++) 
				{
					if ((button_pack_desc[i]==button_pack_desc[r]) && (button_dev_dir[r])) 
					{
						if(!devicesDescription[button_dev_id[r]])
						{
							devicesDescription[button_dev_id[r]]=[];
						}
						devicesDescription[button_dev_id[r]].push(r);
						
						drv_hint+=button_dev_name[r]+'\r\n';
					}
				}

				// !Markup				
                //if (k==4) { html+='</tr><tr>'; k=1; }
                //k++;	
				//html+="<td>"
				
				html+="<div title='"+drv_hint+"'> <input type='checkbox' checked='' id='SPDRV_"+i+"' onclick='SPDRV_click(\""+button_pack_desc[i]+"\",\"SPDRV_"+i+"\")' /> <img src='tools\\ico\\button\\"+button_pack_icon[i]+".png'> "+button_pack_desc[i]+"</div>";

				// Showing devices drivers by group (if there's more then one driver in a group)
				for(var id in devicesDescription)
				{
					if(devicesDescription[id].length>1)
					{				
						html+="<div style='margin-left:15px'>"+button_dev_name[devicesDescription[id][0]]+"</div>";
						html+="<div style='margin-left:30px'>";
						for(j in devicesDescription[id])
						{
							var devIndex = devicesDescription[id][j];
							html+="<input type='radio' class='"+button_pack_desc[devIndex]+" radioBtn' id='radio"+devIndex+"'name='"+id+"' onclick='OnRadioClick(this.getAttribute(\"name\"),"+devIndex+");'>"
								+button_pack_name[devIndex]+" ("+button_dev_ver[devIndex]+")</input><br>";
						}
						html+="</div>";
					}
				}
				html+="</td>";
			}
		}
	}
	// !Markup
    // html=html+'</tr></table>';
	document.getElementById('catalog_drivers').innerHTML=html;
	
	// Now clicking on radio button with best version (that will clean up other version buttons too).
	var bestVersions=findBestVersions();
	for(devID in bestVersions)
	{
		var radioButton = $("#catalog_drivers #radio"+bestVersions[devID]);
		if(radioButton.length>0)
		{
			radioButton.attr("checked",true);
			radioButton.get(0).onclick();
		}
	}	
}

function SPDRV_click(pack_desc,SPDRV_chk)
{
	if(document.getElementById(SPDRV_chk).checked)
	{
		$("#catalog_drivers input.radioBtn."+pack_desc).removeAttr("disabled");	
		var selectedRadioButtons=$("#catalog_drivers input.radioBtn."+pack_desc+":checked");
		if(selectedRadioButtons.length>0)
		{
			// Select only driver selected in radio button list
			selectedRadioButtons.each(function(i,val)
			{
				OnRadioClick($(val).attr("name"),$(val).attr("id").substr(5));
			});
		}
		else
		{
			// Select all
			for (var i = 0; i < buttonCount; i++) 
			{
				if (((button_div[i] == "driver_available") ||
					(button_div[i] == "driver_new")) &&
					button_pack_desc[i]==pack_desc)
				{
					SelectDriver(i);
				}
			}					
		}
	}
	else
	{
		$("#catalog_drivers input.radioBtn."+pack_desc).attr("disabled","disabled");
		
		for (var i = 0; i < buttonCount; i++) 
		{
			if (((button_div[i] == "driver_available") ||
				(button_div[i] == "driver_new")) &&
				button_pack_desc[i]==pack_desc)
			{
				DeselectDriver(i);
			}
		}			
	}
}

function OnRadioClick(devID,index)
{
	// Damn you, IE6 ! No attribute selector in IE6 !!!
	var radioButtons=$("#catalog_drivers input.radioBtn");
	if(document.getElementById("radio"+index).checked)
	{
		radioButtons.each(function(key,val)
		{
			valObj = $(val);
			if(valObj.attr('name')==devID)
			{
				var i = valObj.attr('id').substr(5);
				if ((button_div[i] == "driver_available") ||
					(button_div[i] == "driver_new"))	
				{
					if (i==index) 
					{ 
						SelectDriver(i);
					}
					else 
					{
						DeselectDriver(i);
					}
				}
			}
		});
	}
}

function SelectDriver(i)
{
	if(!document.getElementById("chk"+i).checked)
	{
		ChangeChkCount(1); 						
	}
	document.getElementById("chk"+i).checked="true"; 
}

function DeselectDriver(i)
{
	if(document.getElementById("chk"+i).checked)
	{
		ChangeChkCount(-1); 
	}
	document.getElementById("chk"+i).checked=""; 						
}

// Возвращает массив. Ключ - devID, значение - индекс кнопки лучшего драйвера (из выбранных чекбоксов)
function findBestVersions()
{
	var best_ver = [];

	for (var i = 0; i < buttonCount; i++) 
	{
		var checkbox = document.getElementById('chk'+i);
		if (checkbox.checked) 
		{
			if (!best_ver[button_dev_id[i]])
			{
				best_ver[button_dev_id[i]] = i; 
			}
			else
			{
				if (isNewerThan(button_dev_ver[i],button_dev_ver[best_ver[button_dev_id[i]]]) > 0)
				{
					best_ver[button_dev_id[i]] = i;
				}				
			}
		}
	}
	return best_ver;
}