//Touch Screen
//Debug:
//isTouch=true;

if (isTouch) {
	inc('tools\\modules\\touch\\touch2.js');
	inc('tools\\modules\\touch\\style.css');
	
	onload(function () {
		addDiagAlert('touchscreen','<i class="icon-hand-up icon-white"></i> Touch Screen','success');
		document.getElementById('diaAlert-touchscreen').style.styleFloat="right";
	});
	document.oncontextmenu=function(e){return false}; //Blocking the right click
}
else {
	if (OSVersion>=6.2){ //If Windows 8, but without the touch-screen
	
		onload(function () {
			addDiagAlert('nontouchscreen','<i class="icon-wrench icon-white"></i> Non-Touch Screen','success');
			document.getElementById('diaAlert-nontouchscreen').style.styleFloat="right";
		});
	}
}


function touchOnMouseDown(objID){
	allobj = $(objID);
	for (var i=0, count=allobj.length; i<count; i++) {
		obj = allobj.get(i);
		alert(obj.onclick);
		obj.onmousedown = obj.onclick;
		obj.onclick = function () { return false; }
	}
}

//touchOnMouseDown('.tab li'); //Infobar tabs
//touchOnMouseDown('#diagnostics-alert span'); //Infobar tabs
