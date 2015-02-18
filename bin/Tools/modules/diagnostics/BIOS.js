//http://msdn.microsoft.com/en-us/library/Aa394077

var bios=[];

function bios_init(){
	try {
		bios.length=0;
		
		var colItems = objWMIService.ExecQuery("SELECT * FROM Win32_BIOS","WQL");
		var enumItems = new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext()) {
			  var objItem = enumItems.item();
			  
			  bios[bios.length] = {
						BiosCharacteristics: clearArrayVar(objItem.BiosCharacteristics),
						BIOSVersion: clearArrayVar(objItem.BIOSVersion),
						BuildNumber: clearUndefVar(objItem.BuildNumber),
						Caption: clearUndefVar(objItem.Caption),
						Description: clearUndefVar(objItem.Description),
						IdentificationCode: clearUndefVar(objItem.IdentificationCode),
						Manufacturer: clearUndefVar(objItem.Manufacturer),
						ReleaseDate: clearUndefVar(objItem.ReleaseDate),
						SerialNumber: clearUndefVar(objItem.SerialNumber),
						SMBIOSBIOSVersion: clearUndefVar(objItem.SMBIOSBIOSVersion),
						SMBIOSMajorVersion: clearUndefVar(objItem.SMBIOSMajorVersion),
						SMBIOSMinorVersion: clearUndefVar(objItem.SMBIOSMinorVersion),
						SMBIOSPresent: clearUndefVar(objItem.SMBIOSPresent),
						SoftwareElementID: clearUndefVar(objItem.SoftwareElementID),
						Status: clearUndefVar(objItem.Status)
				};
		}
	}
	catch(e) { }
}
//bios_init();
//alert(print_r(bios));