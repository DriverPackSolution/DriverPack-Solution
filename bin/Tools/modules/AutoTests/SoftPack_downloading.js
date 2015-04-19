
inc("../../../js/ie_fixes.js");
inc("../../../Tools/modules/variables.js");
inc("../../../Tools/modules/SoftPack.js");
//inc("../../../Tools/modules/WgetPack.js");


setTimeout(function() {
	
	echo('-------------- -------------------------- --------------');
	echo('-------------- {     SoftPack: download(), install()     } --------------');
	echo('-------------- -------------------------- --------------');
	echo('');
	
	var defaultJson = [
	{
		"ID": "3",
		"Name": "7-Zip",
		"URL": "http://download.drp.su/soft/7-Zip.exe",
		"Version": "9.30",
		"ReleaseDate": "2014-07-30",
		"UpdateDate": "2014-07-30 00:00:00",
		"Registry": [
			"HKEY_CURRENT_USER\\SOFTWARE\\7-Zip\\Path",
			"HKEY_CURRENT_USER\\Software\\7-Zip\\Path64"
		],
		"Keys": "-aixy -fm0 -gm2",
		"Lang": ""
	},
	{
		"ID": "5",
		"Name": "WinRAR",
		"URL": "http://download0.drp.su/soft/WinRAR.exe",
		"Version": "5.11",
		"ReleaseDate": "2014-07-30",
		"UpdateDate": "2014-09-01 00:00:00",
		"Registry": [
			"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\WinRAR archiver\\DisplayName",
			"HKEY_CURRENT_USER\\Software\\WinRAR SFX\\C%%Program Files%WinRAR"
		],
		"Keys": "/S",
		"Lang": ""
	}
	];
	
	SoftPack.loadDB(defaultJson);
	wget_path = '..\\..\\wget.exe';
	
	
	test(
		typeof(SoftPack._json.soft[0].isDownloaded),
		'undefined'
	);
	
	SoftPack.detectDownloaded();
	test(
		typeof(SoftPack._json.soft[0].isDownloaded),
		'boolean'
	);
	
	
	echo('Downloading started...');
	SoftPack.download(
		[ 3, 5 ],
		function(){
			
			echo('Downloaded:');
			test(driver_exists('http://download.drp.su/soft/7-Zip.exe',SoftPack.softPath),true);
			test(driver_exists('http://download0.drp.su/soft/WinRAR.exe',SoftPack.softPath),true);
			
			test(
				SoftPack._json.soft[0].isDownloaded,
				true
			);
			test(
				SoftPack._json.soft[1].isDownloaded,
				true
			);
			
			echo('Installing started...');
			SoftPack.install(
				[ 3, 5 ],
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
			
		}
	);
	
	
	
	
	/*
    next_script();
	*/

}, 1000);

