var DriverPack = {
    path: AppData + '\\DRPSu\\DRIVERS',
    not_installed: [],
    installed: [],
    not_versions: [],
	_json: [],
	getDevType: function(DevID) {
		if (DevID.indexOf("VEN")  != -1) { return "PCI"; }
		if (DevID.indexOf("VID")  != -1) { return "USB"; }
		if (DevID.indexOf("ACPI") != -1) { return "ACPI"; }
		if (DevID.indexOf("PNP")  != -1) { return "PNP"; }
		if (DevID.indexOf("IDE")  != -1) { return "IDE"; }
		if (DevID.indexOf("USB")  != -1) { return "USB"; }
		if (DevID.indexOf("ROOT") != -1) { return "ROOT"; }
		if (DevID.indexOf("SCSI") != -1) { return "SCSI"; }
		if (DevID.indexOf("STORAGE") != -1) { return "STORAGE"; }
		if (DevID.indexOf("MONITOR") != -1) { return "MONITOR"; }
		return "UNK";
    },

    /*
		driverDetect()
		Сканирует устройства компьютера и получает их DeviceID.

		ToDo:
		- Эта функция довольно требовательна к ресурсам и нужнается в оптимизации
		- IE10+ может использовать Web Workers
		- Вместо setTimeout() использовать setImmediate(), это может улучшить скорость на ~500мс.
    */
	driverDetect: function(callback){


		/*
		ClassGuid, CompatID, Description, DeviceClass, DeviceID, DeviceName, DriverDate, DriverProviderName, DriverVersion, HardWareID, InfName, IsSigned, Location, Manufacturer, Signer,
		*/

		/*
		var start = new Date();
		//var DrivercolItems = objWMIService.ExecQuery("SELECT HardWareID FROM Win32_PnPSignedDriver WHERE HardWareID != null AND (HardWareID LIKE 'PCI%' OR HardWareID LIKE 'HDAUDIO%' OR HardWareID LIKE 'USB%' OR HardWareID LIKE 'ACPI%' OR HardWareID LIKE '*%')", "WQL");
		var DrivercolItems = objWMIService.ExecQuery("SELECT * FROM  Win32_PnPSignedDriver WHERE HardWareID != null", "WQL");
		var DriverenumItems = new Enumerator(DrivercolItems);

		var i = 0;
        for (; !DriverenumItems.atEnd(); DriverenumItems.moveNext()) {
			//var devid = DriverenumItems.item().DeviceID.toString().toUpperCase();
			var driverItem = DriverenumItems.item();
			var driverDeviceID = driverItem.HardWareID.toString().toUpperCase()

			if ((driverDeviceID.indexOf('PCI\\')==0) || (driverDeviceID.indexOf('USB\\')==0) || (driverDeviceID.indexOf('HDAUDIO\\')==0) || (driverDeviceID.indexOf('ACPI\\')==0) || (driverDeviceID.indexOf('*')==0)) {
				//Добавляем устройства только таких типов: PCI, USB, HDAUDIO, ACPI

				if (this.installed.indexOf(driverDeviceID) == -1){ //Только уникальные DeviceID
					//this.installed[i++] = driverDeviceID;
				}

			}
        }

		var end = new Date();
		alert('Speed driverDetect(): ' + (end.getTime()-start.getTime()) + ' ms');
		*/


		log('DriverPack.driverDetect() - start');
		var start = new Date();

		var DrivercolItems = objWMIService.ExecQuery("SELECT * FROM  Win32_PnPSignedDriver WHERE HardWareID != null", "WQL");
		var DriverenumItems = new Enumerator(DrivercolItems);
		DriverenumItems.moveFirst();

		var counter = 0,
			limit = 1000000000,
			handle,
			action = function(){
				if ((DriverenumItems.atEnd() == true) || (counter >= limit)){

					log('DriverPack.driverDetect() - end');
					log('DriverPack.installed JSON',DriverPack.installed);
					callback();

					clearTimeout(handle);
					return;
				}


				for (var i = 0; i < 5 && DriverenumItems.atEnd() == false; i++) {

					var driverItem = DriverenumItems.item();
					var driverDeviceID = driverItem.HardWareID.toString().toUpperCase();

					if ((driverDeviceID.indexOf('PCI\\')==0) || (driverDeviceID.indexOf('USB\\')==0) || (driverDeviceID.indexOf('HDAUDIO\\')==0) || (driverDeviceID.indexOf('ACPI\\')==0) || (driverDeviceID.indexOf('*')==0)) {
						//Добавляем устройства только таких типов: PCI, USB, HDAUDIO, ACPI

						if (DriverPack.installed.indexOf(driverDeviceID) == -1){ //Только уникальные DeviceID
							DriverPack.installed[DriverPack.installed.length] = driverDeviceID;
						}

					}

					DriverenumItems.moveNext();
				}


				counter++;
				handle = setTimeout(action, 0);
			};

		action();


	},

	stringifyWithLimit: function (array, limit)  {
		var safe;
		var take = limit * 0.02;
		var decoded_limit = limit * 0.75;
		var serialized;
		while (true) {
			serialized = JSON.stringify(array.slice(0, take));
			if (take > array.length - 1) {
				log('[stringifyWithLimit] picked ' + array.length + ' out of ' + array.length + ' (all)');
				return serialized;
			} else if (serialized.length > decoded_limit) {
				if (safe) {
					log('[stringifyWithLimit] picked ' + take + ' out of ' + array.length);
					return safe;
				} else {
					if (take > 0) {
						log('[stringifyWithLimit] could not pick, restarting loop...');
						take = 0;
						continue;
					} else {
						log('failed to serialize drivers');
						return JSON.stringify([]);
					}
				}
			} else {
				safe = serialized;
			}
			take++;
		}
	},


	/*
		init()
		Запускать процесс сканирования компьютера, отправляет информацию об устройствах на сервер. Принимает JSON ответ.
	*/
    init: function (callback) {
		log('DriverPack.init()');

		DriverPack.driverDetect(function(){

			//document.getElementById('loader').style.display = 'none';
			log("JSON drivers:",DriverPack.installed);


			// TODO: send installed and not_installed without cutting it to 2000 characters
			var data = {
				not_installed: DriverPack.stringifyWithLimit(DriverPack.not_installed, 2000).replace(/\\\\/ig,"-"),
				installed: DriverPack.stringifyWithLimit(DriverPack.installed, 2000).replace(/\\\\/ig,"-"),
				version: (is64 ? '64': '32'),
				os: (OSVersion=='6.1'?'7':OSVersion)
			};
			var get = Object.keys(data).map(function (k) {
				return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
			}).join('&');




			log('JSONp URL:', [ 'http://test-st.drp.su/drivers/response.php?' + get + '&callback' ] );
			JSONP(
				'http://test-st.drp.su/drivers/response.php?' + get + '&callback',
				function(json){

					log('DriverPack.init() - JSONP response:',json);
					DriverPack.loadDB(json);
					DriverPack.detectDownloaded();

					callback();

				}
			);



		});

        /*echo('  DriverPack.init();');
         echo('  test(JSON.stringify(DriverPack._db), \'' + JSON.stringify(DriverPack._db) + '\');');*/
    },



	/*
		detectDownloaded()
		Проходится по всей базе и расставляет свойство isDownloaded тем, которые уже были скачанны.
	*/
	detectDownloaded: function () {

		var check = DriverPack.get({
			'SELECT': '*'
		});
		log('DriverPack.detectDownloaded() - start:',DriverPack._json);

		check.forEach(function(item, i, check) {

			//isDownloaded
			DriverPack._json[i].isDownloaded = false;
			if (driver_exists(item.URL,DriverPack.path)) {
				DriverPack._json[i].isDownloaded = true;
			}

		});

		log('DriverPack.detectDownloaded() - end:',DriverPack._json);
	},


	/*
		download()
		Скачивает драйверы из массива IDs.

		ToDo:
		- Убрать лишний setTimeout()
		- Убрать вызов statistics.event отсюда
		- Убрать вызов progressCounter отсюда
	*/
	download: function (IDs, events) {

		var defaultEvents = {
			beforeAllDownloaded: function(){},
			beforeDownloading: function(){},
			afterDownloading: function(){},
			afterAllDownloaded: function(){}
		};
		events = extendJSON(defaultEvents,events);


		var url = DriverPack.get({
			'SELECT': '*',
			'WHERE': IDs
		});


		setTimeout(
			function(){
				log('Started downloading IDs: ' + IDs);
				events.beforeAllDownloaded();
				wget.downloadFiles(events, DriverPack.path, url).caught(function(err) {
					log('DriverPack: error on downloading:', err);
				}).lastly(function () {
					log('Downloaded drivers!');
					events.afterAllDownloaded();
				});
			},
			0
		);

	},


	/*
		install()
		Устанавливает драйверы с номерами из массива IDs.
	*/
	install: function (IDs, events) {

		var defaultEvents = {
			beforeInstalled: function(){},
			afterInstalled: function(){}
		};
		events = extendJSON(defaultEvents,events);


		var installed = DriverPack.get({
			'SELECT': '*',
			'WHERE': IDs
		});


		setTimeout(
			function(){
				log('Installing started drivers...');
				events.beforeInstalled(); //Событие: beforeInstalled()

				// Cleaning
				WshShell.Run('cmd /c rd /S /Q "' + WshShell.ExpandEnvironmentStrings('%temp%\\drp\\unzip\\drp') + '"', 0, true);
				// Unzip
				WshShell.Run('tools\\7za.exe x -yo"' + WshShell.ExpandEnvironmentStrings('%temp%\\drp\\unzip\\drp') + '" "' + DriverPack.path + '\\*"', 0, true);
				// Installing drivers
				try {
					WshShell.Run(
						'"' + WshShell.ExpandEnvironmentStrings('%temp%\\drp\\unzip\\drp\\dpinst\\Setup') + '' + (is64 ? '64' : '') + '.exe" ' +
						'/SW /c /sa /PATH "' + WshShell.ExpandEnvironmentStrings('%temp%\\drp\\unzip') + '"',
						0,true
					);
				}
				catch(e){
					log('!!! ERROR !!! Не удалось установить драйвер!');
				}


				log('Installation drivers completed!');
				events.afterInstalled(); //Событие: afterInstalled()

				//callback();
			},
			0
		);

		return true;

	},








	loadDB: function (json) {


			//return false;
			json = cloneObj(json);

			log("loadDB():",json);
			var output = {installed: new Array(), not_installed: new Array()},
			inst = json.installed.length, ninst = json.not_installed.length, tmp;
			tmp = {
				URL: 'http://test-st.drp.su/drivers/dpinst.zip',
				Date: new Date().toString().replace(/\//g, "."),
				Name: 'dpinst.zip',
				ID: '0'
			};
			output.installed.push(tmp);
			for (var i = 0; i < inst; i++) {
				tmp = {
					URL: json.installed[i][0],
					Date: json.installed[i][1].toString().replace(/\//g, "."),
					Name: json.installed[i][2],
					ID: json.installed[i][3].replace(/-/ig,"\\")
				};
				output.installed.push(tmp);
			}
			for (var i = 0; i < ninst; i++) {
				tmp = {
					URL: json.not_installed[i][0],
					Date: json.not_installed[i][1].toString().replace(/\//g, "."),
					Name: json.not_installed[i][2],
					ID: json.not_installed[i][3].replace(/-/ig,"\\\\")
				};
				output.not_installed.push(tmp);
			}



			output_installed = output.installed;
			//Фиксим неправильный формат JSON,
			//это чтобы не переписывать на стороне сервера
			output_installed.forEach(function(item, i) {

				output_installed[i].DevID = output_installed[i].ID;
				output_installed[i].ID = i;
				output_installed[i].IsChecked = true;

			});

			//Фильтруем дубликаты драйверов
			var output_installed_filtered = [];
			var urlArr = [];
			for (var i = 0; i < output_installed.length; i++) {

				//Фильтруем кривой драйвер
				if (output_installed[i].URL.indexOf('WLAN/WWAN/Huawei/NTx64/Huawei/WWAN-Huawei-') != -1) { continue; }

				if (urlArr.indexOf(output_installed[i].URL) == -1){

					output_installed_filtered[output_installed_filtered.length] = output_installed[i];
					urlArr[urlArr.length] = output_installed[i].URL;

				}

			}
			output_installed = output_installed_filtered;



			//echo(print_r(output));
			DriverPack._json = output_installed;

	},





	show: function () {
		document.getElementById('startPage').style.display = 'none';
		document.getElementById('driverPackPage').style.display = 'block';
	},






    html: function () {
		nowShowedScreen = 'Drivers';

		document.getElementById("menu-drivers").className = document.getElementById("menu-drivers").className + ' active';
		document.getElementById("menu-soft").className = document.getElementById("menu-soft").className.replace(/\b active\b/ig,'');
        document.getElementById('loader').style.display = 'block';
		document.getElementById('loader').style.backgroundImage = 'url(Tools/load8.gif)';

		window.scrollTo(0, 0);
        var newTbody = document.createElement('tbody');
		var newTbody = '';
		var drivers = DriverPack.get({ 'SELECT': '*' });

		for (var i = 1; i < drivers.length; i++) {

			if (!driver_exists(drivers[i].URL,DriverPack.path)){
				newTbody += '<tr' + ( (i - 1) % 2 ? '' : ' class="list-odd"') + '>' +
						'<td class="list-first"><input data-name="' + encodeURIComponent(drivers[i].Name)  + '" id="checkDrivers'+drivers[i].ID+'" type="checkbox" ' + (DriverPack._json[i].IsChecked ? 'checked' : '') +' onclick="DriverPack._json['+i+'].IsChecked = (this.checked ? true : false); DriverPack.renderCounter(); statistics.event( { action: \'Checkbox click\' });"/></td>' +
						'<td class="list-second" title="' + drivers[i].DevID + '"><label for="checkDrivers'+drivers[i].ID+'"><img class="list-driver-icon" src="Tools/ico/button/' + DriverPack.getDriverIcon(drivers[i].URL) + '.png" />' + DriverPack.getDriverName(drivers[i]) + '</label></td>' +
						'<td class="list-third" title="' + drivers[i].URL + '"><b>' + drivers[i].Date + '</b></td>' +
						'<td class="list-last"></td>' +
						'</tr>';
			}

        }


		var softs = SoftPack.get({ 'SELECT': '*', 'WHERE': [ { 'isInstalled': false } ] });
		var softs_count = 0;

		for (var i = 0; i < softs.length; i++) {

			if (!driver_exists(softs[i].URL,SoftPack.path)){
				/*
				newTbody += '<tr><td class="list-first"><input data-name="' + encodeURIComponent(softs[i].Name)  + '" id="checkSoft'+softs[i].ID+'" type="checkbox" checked/> </td>' +
						'<td class="list-second">' + softs[i].Name + '</td>' +
						'<td class="list-third" title="' + softs[i].URL + '"><b>' + softs[i].Version + '</b></td>' +
						'<td class="list-last"></td>' +
						'</tr>';
				*/
				if (softs[i].CheckedDefault){
					softs_count++;
				}
			}

        }


		getDownloadInstall = function(onComplite){

			onComplite = onComplite || function(){};

			var IDs = [];
			IDs[IDs.length] = 0; //Тупой фикс, чтобы dpinst всегда устанавливался
			for (var i = 1; i < drivers.length; i++) {

				if (!driver_exists(drivers[i].URL,DriverPack.path)){
					if (document.getElementById('checkDrivers'+drivers[i].ID).checked === true){
						IDs[IDs.length] = drivers[i].ID;
					}
				}

			}

			if (IDs.length < 2) { onComplite(); return false; }


			document.getElementById('loader').style.display = 'block';
			//document.getElementById('loader').style.backgroundImage = (IEVers=='6'?'url(Tools/load8.gif)':'url(img/loading.gif)');
			document.getElementById('loader').style.backgroundImage = 'url(Tools/load8.gif)';
			window.scrollTo(0, 0);
			document.getElementById('progressDescription').innerHTML = '<br>'+about_connecting;
			//alert(JSON.stringify(IDs));
			log('Downloading drivers started...');


			DriverPack.download(

				IDs,

				/* EVENTS */
				{

					beforeDownloading: function(item,i,url){



					    progressCounter.start({
					        startCount: (i==0?1:progressCounter.settings.endCount),
					        endCount: Math.floor(80/url.length*(i+1)) // (80/arr.lenght*i)
					    });




					},

					afterDownloading: function(item,i,url){


					},

					beforeAllDownloaded: function(){

						statistics.event(
							{
								action: 'drivers installation started'
							},
							[
								[
									statistics.config.driverDimension,
									statistics.drpVersion
								]
							]
						);

					},

					afterAllDownloaded: function(){

						statistics.event(
							{
								action: 'drivers installation downloaded'
							},
							[
								[
									statistics.config.driverDimension,
									statistics.drpVersion
								]
							]
						);

						//alert('Готово, переходим к установке!');
						document.getElementById('progressDescription').innerHTML = '<br>' + manual_con_title + '...';

					    progressCounter.start({
					        startCount: 80,
					        endCount: 99
					    });



						DriverPack.install(

							IDs,

							/* EVENTS */
							{

								beforeInstalled: function(){

									//Вроде тут нам нечего делать...

								},

								afterInstalled: function(){

									statistics.event(
										{
											action: 'drivers installation completed'
										},
										[
											[
												statistics.config.driverDimension,
												statistics.drpVersion
											]
										]
									);



									progressCounter.start({
										startCount: 100,
										endCount: 100
									});


									document.getElementById('loader').style.backgroundImage = "none";
									document.getElementById('progressDescription').innerHTML = infobar_infoAllInst + ' <br><button onclick="DriverPack.init(function () { DriverPack.html(); })">' + button_finish + '</button>';
									//document.getElementById('loader').style.display = 'none';
									//alert('Установка завершена!');

									statistics.event( { action: 'Screen opened ThxScreen' } );

									//DriverPack.html();
									onComplite();


								}

							}

						);

					}

				}


			);


		};


		document.getElementById('div-list').innerHTML = '<table id="list"><thead><tr><td></td><td class="head-second">' + infobar_tabDriver + '</td><td class="head-third">' + dev_hint_version + '</td><td></td></tr></thead><tbody>'+newTbody+'</tbody></table>';
        document.getElementById('h1-title').innerHTML = infobar_DrvInst;
		document.getElementById('getDownloadInstallTop').innerHTML = infobar_buttonInstAll;
		document.getElementById('getDownloadInstallBottom').innerHTML = misc_inst2;
		document.getElementById('Start').style.display = 'none';
		document.getElementById('DriverSoft').style.display = 'block';
		document.getElementById('loader').style.display = 'none';
		this.renderCounter();
    },

    getDriverCount: function () {
        var drivers_count = 0;
        DriverPack._json.forEach(function(driver) {
            if (driver.IsChecked && driver.Name !== 'dpinst.zip') {
                drivers_count++;
            }
        });
        return drivers_count;
    },

    renderCounter: function () {
        var drivers_count = DriverPack.getDriverCount();
        var softs_count = SoftPack.getSoftCount();
        document.getElementById('description').innerHTML = infobar_titleDriverNew + ': <b>(' + drivers_count + ')</b><br>' + infobar_titleProgrammAvailable + ': <b>(' + softs_count + ')</b>';
    },









	/*
		get()
		Возвращает записи из базы, которые соответствуют параметрам query: { WHERE, SELECT, LIMIT }.

		ToDo:
		- В идеале найти готовую либу, которая умеет тоже самое через Xpath или подобное.
	*/
	get: function (query) {

		var filteredArr = DriverPack._json;
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










	getDriverName: function (driver) {
		if (driver.Name) {
			return driver.Name;
		} else {
			// Workaround for "Name": ""
			// Remove when API will always return non-empty name
			var segments = driver.URL.split('/');
			var filename = segments[segments.length - 1];
			return filename.replace(/-drp.zip$/, '').replace(/-/g, ' ')
		}
	},

	/*
		ToDo:
		- Эта функция здесь не нужна. Её нужно перенести в шаблон. Вернее даже, чтобы иконка через CSS классы подставлялась.
	*/
	getDriverIcon: function (driverUrl){
		driverIcon = "0";
		var driverUrl = driverUrl.toLowerCase();

		if (driverUrl.indexOf("audio") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("biometric") != -1) { driverIcon = "11"; }
		else if (driverUrl.indexOf("input") != -1) { driverIcon = "11"; }
		else if (driverUrl.indexOf("bluetooth") != -1) { driverIcon = "5"; }
		else if (driverUrl.indexOf("cardreader") != -1) { driverIcon = "14"; }
		else if (driverUrl.indexOf("smartcard") != -1) { driverIcon = "14"; }
		else if (driverUrl.indexOf("chipset") != -1) { driverIcon = "2"; }
		else if (driverUrl.indexOf("filter") != -1) { driverIcon = "2"; }
		else if (driverUrl.indexOf("cpu") != -1) { driverIcon = "2"; }
		else if (driverUrl.indexOf("wlan") != -1) { driverIcon = "13"; }
		else if (driverUrl.indexOf("massstorage") != -1) { driverIcon = "4"; }
		else if (driverUrl.indexOf("masstorage") != -1) { driverIcon = "4"; }
		else if (driverUrl.indexOf("misc") != -1) { driverIcon = "1"; }
		else if (driverUrl.indexOf("gaming") != -1) { driverIcon = "1"; }
		else if (driverUrl.indexOf("hid") != -1) { driverIcon = "11"; }
		else if (driverUrl.indexOf("modem") != -1) { driverIcon = "6"; }
		else if (driverUrl.indexOf("broadband") != -1) { driverIcon = "6"; }
		else if (driverUrl.indexOf("monitor") != -1) { driverIcon = "15"; }
		else if (driverUrl.indexOf("notebook") != -1) { driverIcon = "23"; }
		else if (driverUrl.indexOf("printer") != -1) { driverIcon = "16"; }
		else if (driverUrl.indexOf("scanner") != -1) { driverIcon = "17"; }
		else if (driverUrl.indexOf("sound_adi") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("sound_cmedia") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("sound_conexant") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("sound_creative") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("sound_idt") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("sound_via") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("sounds_realtek") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("sounds_hdmi") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("sound") != -1) { driverIcon = "8"; }
		else if (driverUrl.indexOf("phone") != -1) { driverIcon = "22"; }
		else if (driverUrl.indexOf("touchpad_alps") != -1) { driverIcon = "20"; }
		else if (driverUrl.indexOf("touchpad_cypress") != -1) { driverIcon = "20"; }
		else if (driverUrl.indexOf("touchpad_elan") != -1) { driverIcon = "20"; }
		else if (driverUrl.indexOf("touchpad_synaptics") != -1) { driverIcon = "20"; }
		else if (driverUrl.indexOf("touchpad") != -1) { driverIcon = "20"; }
		else if (driverUrl.indexOf("tv_aver") != -1) { driverIcon = "15"; }
		else if (driverUrl.indexOf("tv_beholder") != -1) { driverIcon = "15"; }
		else if (driverUrl.indexOf("tv_dvb") != -1) { driverIcon = "15"; }
		else if (driverUrl.indexOf("_tv") != -1) { driverIcon = "15"; }
		else if (driverUrl.indexOf("vendor") != -1) { driverIcon = "23"; }
		else if (driverUrl.indexOf("video_amd") != -1) { driverIcon = "12"; }
		else if (driverUrl.indexOf("video_intel") != -1) { driverIcon = "12"; }
		else if (driverUrl.indexOf("video_nvidia") != -1) { driverIcon = "12"; }
		else if (driverUrl.indexOf("video_server") != -1) { driverIcon = "12"; }
		else if (driverUrl.indexOf("video") != -1) { driverIcon = "12"; }
		else if (driverUrl.indexOf("graphics") != -1) { driverIcon = "12"; }
		else if (driverUrl.indexOf("runtimes") != -1) { driverIcon = "12"; }
		else if (driverUrl.indexOf("webcam") != -1) { driverIcon = "7"; }
		else if (driverUrl.indexOf("usb") != -1) { driverIcon = "10"; }
		else if (driverUrl.indexOf("lan_intel") != -1) { driverIcon = "9"; }
		else if (driverUrl.indexOf("lan_realtek") != -1) { driverIcon = "9"; }
		else if (driverUrl.indexOf("lan") != -1) { driverIcon = "9"; }

		return driverIcon;
	}
};


