if (typeof dropddownbutton_src == "undefined") { dropddownbutton_src = 'tools/ico/'; }
// List manipulations

function dropddownbutton_isVisible(div_id){
	return (document.getElementById(div_id).style.display=='none'?false:true);
}

function dropddownbutton_inProcess(div_id){ //Находится ли в процессе свертывания-развертывания
	if (document.getElementById(div_id).style.height!=''){ return true; }
	return false;
}

function dropddownbutton_change(img_id,div_id,img_1,img_2) {
		document.getElementById(img_id).src = dropddownbutton_src +
			(dropddownbutton_isVisible(div_id)?img_1:img_2) + ".png";
	fixPNG(document.getElementById(img_id));

}

function dropddownbutton_Down(img_id,div_id) { dropddownbutton_change(img_id,div_id,'13','12'); }
function dropddownbutton_Over(img_id,div_id) { dropddownbutton_change(img_id,div_id,'11','10'); }
function dropddownbutton_Out(img_id,div_id) { dropddownbutton_change(img_id,div_id,'9','8'); }
function dropddownbutton_Up(img_id,div_id) {
	if (dropddownbutton_inProcess(div_id)){	//Ничего не делать, если идет процесс сворачивания-разворачивания
		dropddownbutton_Over(img_id,div_id);
		return false;
	}
	
	if (!dropddownbutton_isVisible(div_id)) {
		dropddownbutton_change(img_id,div_id,'11','11');
		try {
			$('#'+div_id).slideDown("slow",function(){ dropddownbutton_change(img_id,div_id,'9','9'); });
		} catch(e){
			document.getElementById(div_id).style.display='block';
		}
	} else {
		dropddownbutton_change(img_id,div_id,'10','10');
		try {
			if ($('#'+div_id).css('height')=='1px') { $('#'+div_id).hide(); dropddownbutton_Up(img_id,div_id); return false; }	//Fix with a large number of clicks
			$('#'+div_id).animate({height: '1px'}, 1300, 'swing', function(){ $(this).hide().css('height', ''); dropddownbutton_change(img_id,div_id,'8','8'); });
		} catch(e){
			document.getElementById(div_id).style.display='none';
		}
	}
}
