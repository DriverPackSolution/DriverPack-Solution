
inc("../../../js/ie_fixes.js");
inc("../../../js/alasql.js");
inc("../../../js/variables.js");
inc("../../../mod/DriverPack.js");
//inc("../../../test/SoftPack.js");


setTimeout(function() {

    //DriverPack.init();
	
    echo(' ------- Installed: ------');
    echo(JSON.stringify(DriverPack.installed));
    echo(' ------- Not Installed: ------');
    echo(JSON.stringify(DriverPack.not_installed));
	
	
	next_script();
	
}, 1000);

