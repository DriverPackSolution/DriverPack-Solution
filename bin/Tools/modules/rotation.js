var logoRotation = false;
var rotation = function (){
	if (logoRotation){
		$('#logo-img').unbind();
		$("#logo-img").rotate({
			angle:0, 
			animateTo:360, 
			callback: function () { setTimeout('rotation()',1000); }
		});
	}
	else {
		$('#logo-img').unbind();
		logoRotateBind();
	}
}
rotation();

function logoRotateBind(){
	$("#logo-img").rotate({ 
		bind: 
		{ 
			mouseover : function() { 
				$(this).rotate({animateTo:360})
			},
			mouseout : function() { 
				$(this).rotate({animateTo:0})
			}
		}
	});
}
