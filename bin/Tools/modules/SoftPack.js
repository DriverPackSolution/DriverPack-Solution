var SoftPack = {
    _json: softJsonDB,
    path: AppData + '\\DRPSu\\PROGRAMS',
    init: function(callback) {
		log('SoftPack.init()');

		SoftPack.jsonCallback = function (json) {

			log('SoftPack.init() - JSONP response:',json);

			SoftPack.loadDB(json);
			SoftPack.detectInstalled();
			SoftPack.detectDownloaded();

			callback();

		}

		// JSONP breaks when response is cached and there is no timeout
		antivirus.init()

		setTimeout(function () {
window.geoip = { geoip_city_country_code: "RU", geoip_area_code: "0", geoip_city: "Moscow", geoip_city_continent_code: "EU", geoip_city_country_code: "RU", geoip_city_country_code3: "RUS", geoip_city_country_name: "Russian Federation", geoip_country_code: "US", geoip_country_code3: "RUS", geoip_country_name: "Russian Federation", geoip_dma_code: "0", geoip_latitude: "55.7522", geoip_longitude: "37.6156", geoip_org: "", geoip_postal_code: "101194", geoip_region: "48", geoip_region_name: "Moscow City" };

SoftPack.jsonCallback([
   {
      "ID":"3",
      "Name":"7-Zip",
      "URL":"http://download.drp.su/soft/7-Zip.exe",
      "CheckedDefault":false,
      "Version":"15.06",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKEY_CURRENT_USER\\\\SOFTWARE\\\\7-Zip\\\\Path",
      "Registry_64":"HKEY_CURRENT_USER\\\\Software\\\\7-Zip\\\\Path64",
      "Keys":"/S",
      "Category": "Archiver",
      "Lang":""
   },
   {
      "ID":"5",
      "Name":"Opera",
      "URL":"http://download.drp.su/soft/OperaBlink.exe",
      "CheckedDefault":true,
      "Version":"31.0.1889.99",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Opera 30.0.1835.52\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Opera 30.0.1835.52\\\\DisplayName",
      "Keys":"-install -silent -launchopera=1 -setdefaultbrowser=1",
      "Category": "Browser",
      "Lang":""
   },
   {
      "ID":"6",
      "Name":"Firefox",
      "URL":"http://download.drp.su/soft/Firefox.exe",
      "CheckedDefault":true,
      "Version":"40.0",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Mozilla Firefox 39.0 (x86 ru)\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Mozilla Firefox 39.0 (x86 ru)\\\\DisplayName",
      "Keys":"-ms -ira",
      "Category": "Browser",
      "Lang":""
   },
   {
      "ID":"7",
      "Name":"Yandex.Browser (Russian)",
      "URL":"http://download.drp.su/updates/ya-downloader/downloader_browser.exe",
      "CheckedDefault":true,
      "Version":"40.0.2214.3645",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\YandexBrowser\\\\DisplayName",
      "Registry_64":"HKLM\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\YandexBrowser\\\\DisplayName",
      "Keys":'--partner drpsu --distr /passive /msicl "ILIGHT=1 YABM=n YABROWSER=y YBSENDSTAT=n VID="001"" --try 10 /log "%temp%\\YaBrInstall.log"',
      "Category": "Browser",
      "CheckedDefaultIf": function (data) {
         return data.geoip.geoip_country_code.toUpperCase() === 'RU';
      },
      "Lang":"rus"
   },
   {
      "ID":"8",
      "Name":"Yandex.Browser (Worldwide)",
      "URL":"http://download.cdn.yandex.net/downloadable_soft/browser/350408/Yandex.exe",
      "CheckedDefault":false,
      "Version":"40.0.2214.3645",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\YandexBrowser\\\\DisplayName",
      "Registry_64":"HKLM\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\YandexBrowser\\\\DisplayName",
      "Keys":'--silent --do-not-launch-browser',
      "Category": "Browser",
      "CheckedDefaultIf": function (data) {
         var code = data.geoip.geoip_country_code.toUpperCase();
         return code !== 'RU' && code !== 'TR';
      },
      "Lang":"rus"
   },
   {
     "ID":"9",
     "Name":"Yandex.Browser (Turkish)",
     "URL":"http://download.drp.su/updates/ya-downloader/downloader_browser_tr.exe",
     "CheckedDefault":false,
     "Version":"40.0.2214.3645",
     "ReleaseDate":"2014-07-30",
     "UpdateDate":"2015-08-18",
     "Registry_32":"HKLM\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\YandexBrowser\\\\DisplayName",
     "Registry_64":"HKLM\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\YandexBrowser\\\\DisplayName",
     "Keys":'--partner drpsu-turk --distr /passive /msicl "YAHOMEPAGE=y YAQSEARCH=y YABM=y YABROWSER=y YBSENDSTAT=n VID="001"" --try 10 /log "%temp%\\YaBrTrInstall.log"',
     "Category": "Browser",
     "CheckedDefaultIf": function (data) {
         return data.geoip.geoip_country_code.toUpperCase() === 'TR';
     },
      "Lang":"rus"
   },
   {
      "ID":"10",
      "Name":"Foxit PDF Reader",
      "URL":"http://download.drp.su/soft/FoxitReader.exe",
      "CheckedDefault":false,
      "Version":"7.2.0.722",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Foxit Reader\\\\DisplayName",
      "Registry_64":"HKEY_CURRENT_USER\\\\Software\\\\Foxit Software\\\\Foxit Reader 7.0\\\\Windows\\\\bShowStatusBar",
      "Keys":"-ai1MUD -gm2 -fm0",
      "Category": "Viewer",
      "Lang":""
   },
   {
      "ID":"11",
      "Name":"Codec Pack",
      "URL":"http://download.drp.su/soft/SAMCoDeCs.exe",
      "CheckedDefault":false,
      "Version":"5.85",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\SAM CoDeC Pack\\\\DisplayName",
      "Registry_64":"HKEY_CURRENT_USER\\\\Software\\\\SamLab.ws\\\\SAM CoDeC Pack\\\\Install_Dir",
      "Keys":"/S",
      "Category": "System",
      "Lang":"[ru,tt,uk,az,be,uz,hy,ka]"
   },
   {
      "ID":"11",
      "Name":"Skype",
      "URL":"http://download.drp.su/soft/Skype.exe",
      "CheckedDefault":false,
      "Version":"7.8.0.102",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\\\DisplayName",
      "Keys":"/VERYSILENT /NOLAUNCH /NOGOOGLE /NOSTARTUP /NOPLUGINS",
      "Category": "Messenger",
      "Lang":""
   },
   {
      "ID":"12",
      "Name":"uTorrent",
      "URL":"http://download.drp.su/soft/uTorrent.exe",
      "CheckedDefault":false,
      "Version":"3.2.3.28705",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\uTorrent\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\uTorrent\\\\DisplayName",
      "Keys":"/S",
      "Category": "Internet",
      "Lang":""
   },
   {
      "ID":"14",
      "Name":"PotPlayer",
      "URL":"http://download.drp.su/soft/PotPlayer.exe",
      "CheckedDefault":false,
      "Version":"1.6.55391",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\PotPlayer\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\PotPlayer\\\\DisplayName",
      "Keys":"/S /Video-1 /Audio-0 /Sub-1 /Lists-0 /Shortcut-1010110 /AutoPlayVideo-1 /AutoPlayAudio-0 /ImpIni",
      "Category": "Player",
      "Lang":"rus"
   },
   {
      "ID":"15",
      "Name":"AIMP",
      "URL":"http://download.drp.su/soft/AIMP3.exe",
      "CheckedDefault":false,
      "Version":"3.60.1497",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\AIMP3\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\AIMP3\\\\DisplayName",
      "Keys":"/AUTO=\"%PROGRAMFILES%\\\\AIMP3\"",
      "Category": "Player",
      "Lang":""
   },
   {
      "ID":"17",
      "Name":"FastStone Image Viewer",
      "URL":"http://download.drp.su/soft/FSImage.exe",
      "CheckedDefault":false,
      "Version":"5.5",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\FastStone Image Viewer\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\FastStone Image Viewer\\\\DisplayName",
      "Keys":"/VERYSILENT /NORESTART",
      "Category": "Viewer",
      "Lang":""
   },
   {
      "ID":"18",
      "Name":"TeamViewer",
      "URL":"http://download.drp.su/soft/TeamViewer.exe",
      "CheckedDefault":false,
      "Version":"10.0.45471",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\TeamViewer\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\TeamViewer\\\\DisplayName",
      "Keys":"/S",
      "Category": "Internet",
      "Lang":""
   },
   {
      "ID":"19",
      "Name":"AOMEI Backupper",
      "URL":"http://download.drp.su/soft/Backupper.exe",
      "CheckedDefault":false,
      "Version":"3.1.0",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09D}_is1\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09F}_is1\\\\DisplayName",
      "Keys":"/VERYSILENT /NORESTART",
      "Category": "System",
      "Lang":""
   },
   {
      "ID":"20",
      "Name":"Adobe Flash Player",
      "URL":"http://download0.drp.su/soft/FlashPlayer.exe",
      "CheckedDefault":false,
      "Version":"18.0.0.232",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Adobe Flash Player ActiveX\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\MozillaPlugins\\\\@adobe.com/FlashPlayer\\\\Description",
      "Keys":"-y -gm2 -fm0",
      "Category": "System",
      "Lang":""
   },
   {
      "ID":"21",
      "Name":"DirectX",
      "URL":"http://download.drp.su/soft/DirectX.exe",
      "CheckedDefault":false,
      "Version":"9.0c",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\.NETFramework\\\\AssemblyFolders\\\\DX_1.0.2911.0\\\\",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\.NETFramework\\\\AssemblyFolders\\\\DX_1.0.2911.0\\\\",
      "Keys":"",
      "Category": "System",
      "Lang":""
   },
   {
      "ID":"22",
      "Name":"Microsoft Visual C++",
      "URL":"http://download.drp.su/soft/VisualCplus.exe",
      "CheckedDefault":false,
      "Version":"2005-2015",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\\\DisplayName",
      "Keys":"",
      "Category": "System",
      "Lang":""
   },
   {
      "ID":"23",
      "Name":"Yandex.Elements",
      "URL":"http://download.drp.su/updates/ya-downloader/downloader_elements.exe",
      "CheckedDefault":true,
      "Version":"8.9",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-18",
      "Registry_32":"1HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\\\DisplayName",
      "Registry_64":"1HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\\\DisplayName",
      "Keys":'--partner drpsu --distr /passive /msicl "YAHOMEPAGE=y YAQSEARCH=y YABM=y YABROWSER=y YBSENDSTAT=n VID="002"" --try 10 /log "%temp%\\YaElInstall.log"',
      "Category": "Browser",
      "CheckedDefaultIf": function (data) {
         return data.geoip.geoip_country_code.toUpperCase() !== 'TR';
      },
      "Lang":"rus"
   },
   {
      "ID":"24",
      "Name":"360 Total Security",
      "URL":"http://download.drp.su/soft/360tsRU.exe",
      "CheckedDefault":true,
      "Version":"7.2.0.1052",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-08-21",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\360TotalSecurity\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\360TotalSecurity\\\\DisplayName",
      "Keys":"/S",
      "CheckedDefaultIf": function (data) {
         return !data.antivirus.hasAntiviruses() && data.geoip.geoip_country_code.toUpperCase() === 'RU';
      },
      "Category": "Antivirus",
      "Lang":"rus"
   },
   {
     "ID":"25",
     "Name":"360 Total Security (Turkish)",
     "URL":"http://download.drp.su/soft/360tsTR.exe",
     "CheckedDefault":false,
     "Version":"7.2.0.1052",
     "ReleaseDate":"2014-07-30",
     "UpdateDate":"2015-08-21",
     "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\360TotalSecurity\\\\DisplayName",
     "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\360TotalSecurity\\\\DisplayName",
     "Keys":"/S",
     "CheckedDefaultIf": function (data) {
         return !data.antivirus.hasAntiviruses() && data.geoip.geoip_country_code.toUpperCase() === 'TR';
     },
     "Category": "Antivirus",
      "Lang":"rus"
   },
   {
     "ID":"26",
     "Name":"Advanced SystemCare",
     "URL":"http://download.drp.su/soft/SystemCare.exe",
     "CheckedDefault":true,
     "Version":"8.4.0",
     "ReleaseDate":"2014-07-30",
     "UpdateDate":"2015-09-02",
     "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Advanced SystemCare 8_is1\\\\DisplayName",
     "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Advanced SystemCare 8_is1\\\\DisplayName",
     "Keys":"/verysilent",
     "CheckedDefaultIf": function (data) {
         return data.geoip.geoip_country_code.toUpperCase() === 'RU';
     },
     "Category": "Tools",
     "Lang":"rus"
   },
   {
      "ID":"30",
      "Name":"AdGuard",
      "URL":"http://download.drp.su/soft/AdGuard.exe",
      "CheckedDefault":true,
      "Version":"5.10",
      "ReleaseDate":"2014-07-30",
      "UpdateDate":"2015-09-03",
      "Registry_32":"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{1f974034-d972-42fa-9b6f-3833c0a8a0c8}\\\\DisplayName",
      "Registry_64":"HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{1f974034-d972-42fa-9b6f-3833c0a8a0c8}\\\\DisplayName",
      "Keys":"-quiet Y=0 AID=24321",
      "Category": "Tools",
      "Lang":""
   }
]);
		}, 100);

    },
	detectInstalled: function () {

		var check = SoftPack.get({
			'SELECT': '*'
		});
		log('SoftPack.detectInstalled() - start',SoftPack._json.soft);

		check.forEach(function(item, i, check) {

			//isInstalled
			SoftPack._json.soft[i].isInstalled = false;
			if (typeof(item.Registry) != 'undefined') {
				for (var r = 0; r < item.Registry.length; r++) {

					var registryCheck = (RegRead(item.Registry[r])?true:false);
					if (registryCheck === true){
						SoftPack._json.soft[i].isInstalled = true;
						break;
					}

				}
			}

		});

		log('SoftPack.detectInstalled() - end',SoftPack._json.soft);
	},

	detectDownloaded: function () {

		var check = SoftPack.get({
			'SELECT': '*'
		});
		log('SoftPack.detectDownloaded() - start',SoftPack._json.soft);

		check.forEach(function(item, i, check) {

			//isDownloaded
			SoftPack._json.soft[i].isDownloaded = false;
			if (driver_exists(item.URL,SoftPack.path)) {
				SoftPack._json.soft[i].isDownloaded = true;
			}

		});

		log('SoftPack.detectDownloaded() - end',SoftPack._json.soft);

	},


	loadDB: function(json){

		SoftPack._json = {
			'soft': new Array()
		};


		//Фиксим неправильный формат JSON,
		//это чтобы не переписывать на стороне сервера
		if (typeof(json[0]['Registry']) == 'undefined'){
			json.forEach(function(item, i, json) {

				json[i].Registry = [];
				if (item.Registry_32){
					json[i].Registry[json[i].Registry.length] = item.Registry_32.replace(/\\\\/ig,'\\');
				}
				if (item.Registry_64){
					json[i].Registry[json[i].Registry.length] = item.Registry_64.replace(/\\\\/ig,'\\');
				}
				if (json[i].CheckedDefaultIf) {
					try {
						json[i].IsChecked = json[i].CheckedDefaultIf({
							antivirus: antivirus,
							geoip: geoip
						});
					} catch(err) {
						json[i].IsChecked = json[i].CheckedDefault;
						log('[SoftPack] CheckedDefaultIf failed', err);
					}
				} else {
					json[i].IsChecked = json[i].CheckedDefault;
				}

			});
		}

		log('SoftPack.loadDB() - Фиксим неправильный формат параметра Registry это чтобы не переписывать на стороне сервера',json);


		//Клонируем объект
		SoftPack._json.soft = json;


	},
	db: function(){

		//return SoftPack._json.soft.slice();
		return cloneObj(SoftPack._json.soft);

	},


    get: function (query) {

    	if (!SoftPack._json) {
    		log('Error: race condition: SoftPack vs DriverPack');
    		return false
    	}
		var filteredArr = SoftPack.db();
		if (typeof(filteredArr) == 'undefined') { return false; }

		//Фильтруем массив только по полю ID
		//Например: 'WHERE': [ 1, 2, 3 ]
		if ((typeof(query.WHERE) == 'object') && ((typeof(query.WHERE[0]) == 'string') || (typeof(query.WHERE[0]) == 'number'))) {

			filteredArr = filteredArr.filter(function(obj) {

				for (var i = 0; i < query.WHERE.length; i++) {

					if (obj.ID == query.WHERE[i]){

						return true;

					}
				}

			});

		}
		//Фильтруем массив по любым полям
		//Например, 'WHERE': [ { 'ID': '5' }, { 'ID': '22' } ]
		else if (typeof(query.WHERE) != 'undefined') {


			filteredArr = filteredArr.filter(function(obj) {

				for (var i = 0; i < query.WHERE.length; i++) {

					//Где ищем
					subject = JSON.stringify(obj).toUpperCase();

					//Что ищем
					searchValue = JSON.stringify(query.WHERE[i]);
					searchValue = searchValue.substring(1,searchValue.length-1);
					searchValue = searchValue.toUpperCase();

					if (subject.indexOf(searchValue) != -1){

						return true;

					}
				}

			});

		}



		if (query.SELECT != '*') {

			for (var i = 0; i < filteredArr.length; i++) {

				//Сохраняем ключ и значение до того,
				//как удалим весь объект
				var key = query.SELECT;
				var value = filteredArr[i][query.SELECT];

				//Очищаем массив и заполняем только одним элементом
				filteredArr[i] = {};
				filteredArr[i][key] = value;

			}

		}


		if (typeof(query.LIMIT) != 'undefined') {

			//Обрезаем массив
			filteredArr = filteredArr.slice(0,query.LIMIT);

		}



		return filteredArr;


    },

    setChecked: function(ID, value) {
    	SoftPack._json.soft.forEach(function(soft) {
    		if (soft.ID === ID.toString()) {
    			soft.IsChecked = value;
    		}
    	})
    },




	download: function (IDs, events) {

		var defaultEvents = {
			beforeAllDownloaded: function(){},
			beforeDownloading: function(){},
			afterDownloading: function(){},
			afterAllDownloaded: function(){}
		};
		events = extendJSON(defaultEvents,events);


		var url = SoftPack.get({
			'SELECT': '*',
			'WHERE': IDs
		});


		setTimeout(
			function(){
				log('Started downloading IDs: ' + IDs);
				events.beforeAllDownloaded();
				wget.downloadFiles(events, SoftPack.path, url).caught(function(err) {
					log('SoftPack: error on downloading:', err);
				}).lastly(function () {
					log('Downloaded soft!');
					events.afterAllDownloaded();
				});
			},
			0
		);

	},


	install: function (IDs, events) {

		var defaultEvents = {
			beforeAllInstalled: function(){},
			beforeInstalled: function(){},
			afterInstalled: function(){},
			afterAllInstalled: function(){}
		};
		events = extendJSON(defaultEvents,events);


		var url = SoftPack.get({
			'SELECT': '*',
			'WHERE': IDs
		});


		setTimeout(
			function(){

				log('Installing started soft...');
				events.beforeAllInstalled(); //Событие: beforeInstalled()

				url.forEach(function(item,i) {
					//if (item.isDownloaded){

						log('Starting to install: ' + '"' + SoftPack.path + '\\' + item.URL.substring(item.URL.lastIndexOf('/')+1) + '" ' + item.Keys);
						events.beforeInstalled(item,i,url);

						try {
							WshShell.Run('"' + SoftPack.path + '\\' + item.URL.substring(item.URL.lastIndexOf('/')+1) + '" ' + item.Keys,1,true);
						}
						catch(e){
								log('!!! ERROR !!! Не удалось установить софтину!');
						}
						SoftPack._json.soft[i].isInstalled = true;

						events.afterInstalled(item,i,url);

					//}
				});


				log('Installation soft completed!');
				events.afterAllInstalled(); //Событие: afterInstalled()

				//callback();

			},
			0
		);

	},



    get_old: function (softName) {

        var _this = this;

        var additionFunctions = {

			where: function(what){

				var where = softName;
				var allDrivers = SoftPack._json.soft;
				var res = [];
				if ((typeof(where) == 'string') && (typeof(what) == 'string')) {

					for (var i = 0; i < allDrivers.length; i++) {
						if (allDrivers[i][where] == what){
							res[res.length] = allDrivers[i];
						}
					}

					return res;
				}
				else if ((typeof(where) != 'string') && (typeof(what) != 'string')) {
					return allDrivers;
				}
				else if ((typeof(where) != 'string') || (typeof(what) != 'string')) {
					return false;
				}


			},


            install: function () {
                //var soft = _this.SQL('SELECT * FROM soft WHERE Name = "' + softName + '"');
				var soft = SoftPack.get('Name').where(softName);
                if (soft.length > 0) {
                    for (var i = 0; i < soft.length; i++) {
                        if (WgetPack.get().isDownload(soft[0].URL)) {
                            WshShell.Run('"' + WgetPack.get().isDownload(soft[0].URL) + "\\" + fso.GetFileName(soft[0].URL) + '" ' + soft[0].Keys, 0, true);
                            _this.get(softName).complite();
                            return fso.DeleteFile(WgetPack.get().isDownload(soft[0].URL) + "\\" + fso.GetFileName(soft[0].URL), true);
                        }
                    }
                    setTimeout(function () {
                        if (document.getElementById("m-apps").parentNode.classList.contains("active")) {
                            _this.html();
                        }
                        _this.get(softName).install();
                    }, 1000);
                }
                return true;
            },
            download: function () {
                //var url = _this.SQL('SELECT * FROM soft WHERE Name = "' + softName + '"');
				var url = SoftPack.get('Name').where(softName);
                //echo('  test(WgetPack.get(\'' + JSON.stringify(url[0]) + '\').download("' + url[0].URL + '"), \'' + JSON.stringify(WgetPack.get(url[0]).download(url[0].URL)) + '\');');
                return WgetPack.get(url[0]).download(url[0].URL);
            },
            complite: function () {
				//ToDo!!!!
                //_this.SQL('DELETE FROM soft WHERE Name = "' + softName + '"');
            },
            // Проверяет в реестре, через ветку Uninstall
            isInstalled: function () {
                var ret = false,
                        //check = _this.SQL('SELECT Registry_' + _this.OSbit() + ' FROM soft WHERE Name="' + softName + '"'),
						check = SoftPack.get('Name').where(softName),
                        RegKey = check[0]["Registry_" + _this.OSbit()].replace(/\\\\/gim, '\\');
                while (RegKey.indexOf('\\\\') + 1) {
                    RegKey = WshShell.RegRead(RegKey);
                }
                try {
                    ret = WshShell.RegRead(RegKey);
                }
                catch (err) {
                    ret = false;
                }
                return ret;
            }
        };
        return additionFunctions;

    },






	html: function () {
		nowShowedScreen = 'Soft';

		document.getElementById("menu-drivers").className = document.getElementById("menu-drivers").className.replace(/\b active\b/ig,'');
		document.getElementById("menu-soft").className = document.getElementById("menu-soft").className + ' active';
		document.getElementById("menu-adapter").className = document.getElementById("menu-adapter").className.replace(/\b active\b/ig,'');
		document.getElementById('loader').style.display = 'block';
		document.getElementById('loader').style.backgroundImage = 'url(Tools/load8.gif)';

		window.scrollTo(0, 0);
        var newTbody = document.createElement('tbody');
		var newTbody = '';
		var drivers = DriverPack.get({ 'SELECT': '*' });
		var drivers_count = 0;

		for (var i = 1; i < drivers.length; i++) {

			if (!driver_exists(drivers[i].URL,DriverPack.path)){
				/*
				newTbody += '<tr><td class="list-first"><input data-name="' + encodeURIComponent(drivers[i].Name)  + '" id="checkDrivers'+drivers[i].ID+'" type="checkbox" checked/> <img src="Tools/ico/button/' + DriverPack.getDriverIcon(drivers[i].URL) + '.png" /> </td>' +
						'<td class="list-second" title="' + drivers[i].DevID + '">' + drivers[i].Name + '</td>' +
						'<td class="list-third" title="' + drivers[i].URL + '"><b>' + drivers[i].Date + '</b></td>' +
						'<td class="list-last"></td>' +
						'</tr>';
				*/
				drivers_count++;
			}

        }


		var softs = SoftPack.get({ 'SELECT': '*', 'WHERE': [ { 'isInstalled': false } ] });

		for (var i = 0; i < softs.length; i++) {

			if (!driver_exists(softs[i].URL,SoftPack.path)){
				newTbody += '<tr' + (i % 2 ? '' : ' class="list-odd"') + '>' +
						'<td class="list-first"><input data-name="' + encodeURIComponent(softs[i].Name)  +
						'" id="checkSoft'+softs[i].ID+'" type="checkbox" ' + (softs[i].IsChecked?'checked':'') +
						' onclick="SoftPack.setChecked('+softs[i].ID+', this.checked ? true : false); SoftPack.renderCounter(); statistics.event( { action: \'Checkbox click\' });"/> </td>' +
						'<td class="list-second"><label for="checkSoft'+softs[i].ID+'">' + softs[i].Name + '</label></td>' +
						'<td class="list-third" title="' + softs[i].URL + '"><b>' + softs[i].Version + '</b></td>' +
						'<td class="list-last"></td>' +
						'</tr>';
			}

        }


		getDownloadInstall = function(onComplite){

			onComplite = onComplite || function(){};

			var IDs = [];
			for (var i = 0; i < softs.length; i++) {

				if (!driver_exists(softs[i].URL,SoftPack.path)){
					if (document.getElementById('checkSoft'+softs[i].ID).checked === true){
						IDs[IDs.length] = softs[i].ID;
					}
				}

			}

			if (IDs.length < 1) { onComplite(); return false; }


			document.getElementById('loader').style.display = 'block';
			document.getElementById('loader').style.backgroundImage = 'url(Tools/load8.gif)';
			window.scrollTo(0, 0);
			document.getElementById('progressDescription').innerHTML = '<br>'+about_connecting;
			//alert(JSON.stringify(IDs));
			log('Downloading soft started...');




			SoftPack.download(

				IDs,

				/* EVENTS */
				{


					beforeAllDownloaded: function(){
						statistics.event(
							{
								action: 'installation started'
							},
							[
								[
									statistics.config.installedSoftData,
									statistics.drpVersion
								]
							]
						);
					},

					beforeDownloading: function(item,i,url){

						progressCounter.start({
					        startCount: (i==0?1:progressCounter.settings.endCount),
					        endCount: Math.floor(i==0?2:(80/url.length*(i+1))) // (80/arr.lenght*i)
					    });

						statistics.event(
							{
								action: 'installation started ' + item.Name
							},
							[
								[
									statistics.config.installedSoftData,
									item.Name
								]
							]
						);

					},

					afterDownloading: function(item,i,url){

						statistics.event(
							{
								action: 'installation downloaded ' + item.Name
							},
							[
								[
									statistics.config.installedSoftData,
									item.Name
								]
							]
						);

					},


					afterAllDownloaded: function(){

						statistics.event(
							{
								action: 'installation downloaded'
							},
							[
								[
									statistics.config.installedSoftData,
									statistics.drpVersion
								]
							]
						);

						//alert('Готово, переходим к установке!');
						document.getElementById('progressDescription').innerHTML = '<br>' + drivSign_xp2 + '...';

						progressCounter.start({
							startCount: 80,
							endCount: 99
						});



						SoftPack.install(

							IDs,

							/* EVENTS */
							{
								beforeAllInstalled: function(){

								// ---

								},

								beforeInstalled: function(item,i,url){


									progressCounter.start({
										startCount: (i==0?1:progressCounter.settings.endCount),
										endCount: Math.floor(80/url.length*(i+1)) // (80/arr.lenght*i)
									});


								},

								afterInstalled: function(item,i,url){

									statistics.event(
										{
											action: 'installation completed ' + item.Name
										},
										[
											[
												statistics.config.installedSoftData,
												item.Name
											],
											[
												statistics.config.installedSoftIndicator,
												"1"
											]
										]
									);

								},

								afterAllInstalled: function(){

									statistics.event(
										{
											action: 'installation completed'
										},
										[
											[
												statistics.config.installedSoftData,
												statistics.drpVersion
											]
										]
									);



									progressCounter.start({
										startCount: 100,
										endCount: 100
									});


									document.getElementById('loader').style.backgroundImage = "none";
									document.getElementById('progressDescription').innerHTML = infobar_infoProgramm + ' <br><button onclick="DriverPack.init(function () { DriverPack.html(); })">' + button_finish + '</button>';
									//document.getElementById('loader').style.display = 'none';
									//alert('Установка завершена!');

									statistics.event( { action: 'Screen opened ThxScreen' } );

									//SoftPack.html();
									onComplite();

								}
							}
						);

					}
				}
			);




		};



		document.getElementById('div-list').innerHTML = '<table id="list"><thead><tr><td></td><td>' + infobar_tabProgramm + '</td><td class="head-third">' + dev_hint_version + '</td><td></td></tr></thead><tbody class=>'+newTbody+'</tbody></table>';
		document.getElementById('h1-title').innerHTML = (rusLang==true?'<center><img src="img/appeal_to_the_users.gif" width="80%"></center> <br>':'') + drivSign_xp2;
		document.getElementById('getDownloadInstallTop').innerHTML = infobar_buttonInstAll;
		document.getElementById('getDownloadInstallBottom').innerHTML = misc_inst5;
		document.getElementById('loader').style.display = 'none';
		document.getElementById('DriverSoft').style.display = 'block';
		document.getElementById('AppDriversSoft').style.display = 'block';
		document.getElementById('Adapter').style.display = 'none';
		this.renderCounter();
    },

    getSoftCount: function () {
        var softs_count = 0;
        SoftPack._json.soft.forEach(function(soft) {
            if (soft.IsChecked && !soft.isInstalled && !driver_exists(soft.URL, SoftPack.path)) {
                softs_count++;
            }
        });
        return softs_count;
    },

    renderCounter: function () {
        var drivers_count = DriverPack.getDriverCount();
        var softs_count = SoftPack.getSoftCount();
        document.getElementById('description').innerHTML = infobar_titleDriverNew + ': <b>(' + drivers_count + ')</b><br>' + infobar_titleProgrammAvailable + ': <b>(' + softs_count + ')</b>';
    }
};
