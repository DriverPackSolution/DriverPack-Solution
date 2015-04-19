
//ToDo: реализовать проверку SoftPack.init();

inc("../../../js/ie_fixes.js");
inc("../../../Tools/modules/variables.js");
inc("../../../Tools/modules/SoftPack.js");
//inc("../../../Tools/modules/WgetPack.js");
//inc("../../../test/SoftPack.js");


setTimeout(function() {
	
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
		"Name": "Opera",
		"URL": "http://download.drp.su/soft/OperaBlink.exe",
		"Version": "23.0.1522.72",
		"ReleaseDate": "2014-07-30",
		"UpdateDate": "2014-09-01 00:00:00",
		"Registry": [
			"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 23.0.1522.72\\DisplayName",
			"HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 23.0.1522.72\\DisplayName"
		],
		"Keys": " -install -silent -launchopera=1 -setdefaultbrowser=1",
		"Lang": "[ru,tt,uk,az,be,uz,hy,ka,fr,de]"
	},
	{
		"ID": "22",
		"Name": "Microsoft Visual C++",
		"URL": "http://download.drp.su/soft/VisualCplus.exe",
		"Version": "2005-2013",
		"ReleaseDate": "2014-07-31",
		"UpdateDate": "2014-07-31 00:00:00",
		"Registry": [
			"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\DisplayName",
			"HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\DisplayName"
		],
		"Keys": "",
		"Lang": ""
	},
	{
		"ID": "100",
		"Name": "Test Software",
		"URL": "http://download.drp.su/soft/testsoft.exe",
		"Version": "2005-2013",
		"ReleaseDate": "2014-07-31",
		"UpdateDate": "2014-07-31 00:00:00",
		"Registry": [
			"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ProgramFilesDir"
		],
		"Keys": "",
		"Lang": ""
	},
	{
		"ID": "101",
		"Name": "Mega Software",
		"URL": "http://download.drp.su/soft/soft.exe",
		"Version": "2005-2013",
		"ReleaseDate": "2014-07-31",
		"UpdateDate": "2014-07-31 00:00:00",
		"Registry": [
			"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{BLA-BLA-BLA-BLA-BLA}\\DisplayName"
		],
		"Keys": "",
		"Lang": ""
	}
];
	
	
	
	
	
	//Клонируем объект, чтобы сохранить его
	backupDefaultJson = cloneObj(defaultJson);
	
	
	echo('-------------- -------------------------- --------------');
	echo('-------------- {     SoftPack.loadDB()     } --------------');
	echo('-------------- -------------------------- --------------');
	echo('');
	
	SoftPack.loadDB(defaultJson);
	//Проверяем, правильно ли загрузится тестовая база
	test(
		SoftPack._json.soft,
		defaultJson
	);

	test(
		SoftPack.db(defaultJson),
		defaultJson
	);
	
	
	
	//Параметра test не должно быть созданно
	defaultJson[0].test = 'test';
	test(
		typeof(SoftPack._json.soft[0].test),
		'undefined'
	);
	defaultJson = cloneObj(backupDefaultJson);
	
	
	//Если очистить объект defaultJson, то это
	//не должно отражаться на SoftPack._json.soft
	defaultJson = [];
	test(
		SoftPack._json.soft,
		function (){
			if (JSON.stringify(SoftPack._json.soft) == JSON.stringify(defaultJson)){
				return false;
			}
			return SoftPack._json.soft;
		}
	);
	defaultJson = cloneObj(backupDefaultJson);
	
	
	
	
	//Параметра isInstalled не должно быть в тестовом Json
	test(
		typeof(defaultJson[0].isInstalled),
		'undefined'
	);
	
	//Параметра isInstalled не должно быть в тестовом Json
	test(
		typeof(SoftPack._json.soft[0].isInstalled),
		'undefined'
	);
	
	
	
	echo('-------------- -------------------------- --------------');
	echo('-------------- {     SoftPack.detectInstalled()     } --------------');
	echo('-------------- -------------------------- --------------');
	echo('');
	
	//Этот тест проверяет detectInstalled(), чтобы был найден хоть один элемент со значением
	//isInstalled = true и хоть один с isInstalled = false
	test(
		function (){
			SoftPack.detectInstalled();
			return true;
		},
		function (){
			
			var
				db = SoftPack.db(),
				isInstalled_true = false,
				isInstalled_false = false
			;
			
			db.forEach(function(item) {
				
				if (typeof(item.isInstalled) == 'undefined') { return false; }
				if (item.isInstalled === true) { echo(item.Name); isInstalled_true = true; }
				if (item.isInstalled === false) { isInstalled_false = true; }
				
			});
			
			if (isInstalled_true && isInstalled_false) {
				return true;
			}
			return false;
			
			//return true;
		}
	);
	
	
	//Параметра isInstalled не должно быть в тестовом Json
	test(
		typeof(defaultJson[0].isInstalled),
		'undefined'
	);
	
	
	//Параметра isInstalled должно быть
	test(
		typeof(SoftPack._json.soft[0].isInstalled),
		'boolean'
	);
	
	
	
	
	
	
	
	
	echo('-------------- -------------------------- --------------');
	echo('-------------- {     SoftPack.get()     } --------------');
	echo('-------------- -------------------------- --------------');
	echo('');
	
	//Сравниваем размер объектов, должен быть одинаковым
	test(
		SoftPack.get(
			{
				'SELECT': '*'
			}
		).length,
		defaultJson.length
	);
	
	//Размер объекта с Limit1 должен быть 1
	test(
		SoftPack.get(
			{
				'SELECT': '*',
				'LIMIT': 1
			}
		).length,
		1
	);
	
	
	test(
		SoftPack.get(
			{
				'SELECT': 'Name',
				'WHERE': [
						{ 'ID': '5' },
						//OR
						{ 'ID': '22' }
					],
				'LIMIT': '2'
			}
		),
		[
			{
				"Name": "Opera"
			},
			{
				"Name": "Microsoft Visual C++"
			}
		]
	);
	
	
	
	test(
		SoftPack.get(
			{
				'SELECT': 'Name',
				'WHERE': [ 5 ],
				'LIMIT': '2'
			}
		),
		[
			{
				"Name": "Opera"
			}
		]
	);
	
	
	
	
	test(
		SoftPack.get(
			{
				'SELECT': 'Name',
				'WHERE': [
						{ 'ReleaseDate': '2014-07-31' }
					],
				'LIMIT': '1'
			}
		),
		[
			{
				"Name": "Microsoft Visual C++"
			}
		]
	);
	
	
	test(
		SoftPack.get(
			{
				'SELECT': 'Name',
				'LIMIT': '1'
			}
		),
		[
			{
				"Name": "7-Zip"
			}
		]
	);
	
	

	
	test(
		SoftPack.get(
			{
				'SELECT': '*',
				'WHERE': [ 100, '101' ]
			}
		).length,
		2
	);
	
	
    next_script();
	

}, 1000);

