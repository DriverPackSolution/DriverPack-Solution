// On change size of the window
try {
	//self.resizeTo(width,height - 25);
	//self.moveTo((screen.width / 2) - (width / 2), (screen.height / 2) - (height / 2));

	//DRP in full screen
	self.resizeTo(screen.width,screen.height-36);
	self.moveTo(0,0);


	//if (screen.width==640){
	if ((screen.width<width)||(screen.height<height)){
		self.resizeTo(800,600 - 25);
		self.moveTo(0,0);
		
		onload(function () {tooglePanel();});
	}

}
catch(err) { }
// Change title window
document.title = document.title + " " + version + " " + verType;


//Auto hide/show left panel
try {
	window.attachEvent('onresize',
		function(){
			if ($(window).width()<718){	//hide panel
				tooglePanel(false);
			}
			else if ($(window).width()>(800)){	//show panel
				tooglePanel(true);
			}
		}
	);
}
catch(err) { }
