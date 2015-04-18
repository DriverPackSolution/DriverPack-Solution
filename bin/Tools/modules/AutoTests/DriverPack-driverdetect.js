
inc("../../../js/ie_fixes.js");
inc("../../../Tools/modules/variables.js");
inc("../../../Tools/modules/DriverPack.js");
//inc("../../../test/SoftPack.js");


setTimeout(function() {

    //DriverPack.init();
	
    echo(' ------- Installed: ------');
    echo(JSON.stringify(DriverPack.installed));
    echo(' ------- Not Installed: ------');
    echo(JSON.stringify(DriverPack.not_installed));
	
	
	next_script();
	
}, 1000);

