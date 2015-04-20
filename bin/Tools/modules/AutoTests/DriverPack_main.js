


inc("../../../js/ie_fixes.js");
inc("../../../Tools/modules/variables.js");
inc("../../../Tools/modules/DriverPack.js");
//inc("../../../Tools/modules/WgetPack.js");
//inc("../../../test/SoftPack.js");


setTimeout(function() {
	
	var defaultJson = {
	"installed": [
		[
			"http://download.drp.su/driverpacks/repack/WLAN/WWAN/Huawei/NTx64/Huawei/WWAN-Huawei-NTx64-Huawei-drp.zip",
			"09/11/2014",
			"HUAWEI Mobile Connect - 3G Network Card",
			"USB-ROOT_HUB20&VID15AD&PID0770&REV0000"
		],
		[
			"http://download.drp.su/driverpacks/repack/Touchpad_Others/VMware/Allx64/VMware-Allx64-drp.zip",
			"03/26/2012",
			"VMware USB Pointing Device",
			"USB-VID_0E0F&PID_0003&REV_0102&MI_01"
		],
		[
			"http://download.drp.su/driverpacks/repack/Touchpad_Others/VMware/Allx64/VMware-Allx64-drp.zip",
			"03/26/2012",
			"VMware USB Pointing Device",
			"USB-VID_0E0F&PID_0003&REV_0102&MI_00"
		],
		[
			"http://download.drp.su/driverpacks/repack/Touchpad_Others/VMware/Allx64/VMware-Allx64-drp.zip",
			"03/26/2012",
			"VMware USB Pointing Device",
			"USB-VID_0E0F&PID_0003&REV_0102"
		],
		[
			"http://download.drp.su/driverpacks/repack/WLAN/WWAN/Huawei/NTx64/Huawei/WWAN-Huawei-NTx64-Huawei-drp.zip",
			"09/11/2014",
			"HUAWEI Mobile Connect - 3G Network Card",
			"USB-ROOT_HUB&VID15AD&PID0774&REV0000"
		],
		[
			"http://download.drp.su/driverpacks/repack/MassStorage/VMware/FORCED/Allx64/VMware-FORCED-Allx64-drp.zip",
			"02/13/2013",
			"VMware VMCI Bus Device",
			"PCI-VEN_15AD&DEV_0740&SUBSYS_074015AD&REV_10"
		]
	],
	"not_installed": []
	};
	
	
	/*
	DriverPack.init(function(){
		
		alert(DriverPack._json);
		
	});
	*/
	
	
	DriverPack._json = cloneObj(defaultJson);
	
	
	
	test(
		DriverPack.get(
			{
				'SELECT': '*'
			}
		).length,
		defaultJson.length
	);
	
	
	DriverPack.loadDB(defaultJson);
	
	/*echo(DriverPack.get(
			{
				'SELECT': '*'
			}
		)[0].URL);*/
	
	test(DriverPack.get(
			{
				'SELECT': '*'
			}
		)[1].URL,
		defaultJson.installed[0][0]
	);
	
	test(
		DriverPack.get(
			{
				'SELECT': '*'
			}
		)[1].DevID,
		defaultJson.installed[0][3].replace(/-/ig,"\\")
	);
	
	
	test(
		typeof(DriverPack.get(
			{
				'SELECT': '*'
			}
		)[0].isDownloaded),
		'undefined'
	);
	
	
	
	DriverPack.detectDownloaded();
	test(
		typeof(DriverPack.get(
			{
				'SELECT': '*'
			}
		)[0].isDownloaded),
		'boolean'
	);
	
	
	
	
	
	wget_path = '..\\..\\wget.exe';
	echo('Downloading started...');
	DriverPack.download(
		[ 0, 1 ],
		function(){
			
			echo('Downloaded:');
			test(driver_exists('http://test-st.drp.su/drivers/dpinst.zip',DriverPack.driverPath),true);
			test(driver_exists('http://download.drp.su/driverpacks/repack/WLAN/WWAN/Huawei/NTx64/Huawei/WWAN-Huawei-NTx64-Huawei-drp.zip',DriverPack.driverPath),true);
			
			test(
				DriverPack._json[0].isDownloaded,
				true
			);
			test(
				DriverPack._json[1].isDownloaded,
				true
			);
			
			//echo('Installing started...');
			/*
			DriverPack.install(
				[ 0, 1 ],
				function(){
					
					echo('Installed:');
					
					test(
						SoftPack._json.soft[0].isInstalled,
						true
					);
					test(
						SoftPack._json.soft[1].isInstalled,
						true
					);
					
				}
			);
			*/
			
		}
	);
	
	
	
	
	
	
    next_script();
	

}, 1000);

