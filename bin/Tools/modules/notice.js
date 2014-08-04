/*
id - ID in the DOM tree
text - notification text
style - style (success,warning,important,info,inverse) More: http://twitter.github.com/bootstrap/components.html#labels-badges
onClick - action on click
*/
function addDiagAlert(id,text,style,onClick) {
	element = document.getElementById('diaAlert-'+id);
	var icon = (style=='important'?'<i class="icon-warning-sign icon-white"></i> ':'');
	if (element) {
		element.innerHTML='<span class="label label-'+style+'">'+icon+text+'</span>';
	}
	else {
		if (typeof(onClick) != 'function' ) { onClick = function () { dropddownbutton_Up('img_0','div_0'); }; }
		document.getElementById('diagnostics-alert').innerHTML+='<span id="diaAlert-'+id+'" onmousedown="var runOnClick='+onClick+'; runOnClick();"><span class="label label-'+style+'">'+icon+text+'</span></span>';
	}
}

//clear the notification	
function clearDiagAlert(id) {
	if (id){
		element = document.getElementById('diaAlert-'+id);
		if (element) {
			document.getElementById('diaAlert-'+id).innerHTML='';
		}
	}
	else {
		document.getElementById('diagnostics-alert').innerHTML='';
	}
}


function addNotice(message){
	var el0=document.createElement('div');
		el0.innerHTML="<div class='alert alert-block notice-alert'><button type='button' class='close' data-dismiss='alert'>×</button>"+message+"</div>";
		document.getElementById('notice').insertBefore(el0);

}