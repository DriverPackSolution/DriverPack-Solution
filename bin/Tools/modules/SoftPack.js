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
		setTimeout(function () {
			JSONP(
				(isBeta?'http://update-test2.drp.su/v2/soft/?callback':'http://update.drp.su/v2/soft/?callback')
			);
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

		json = cloneObj(json);

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
				json[i].IsChecked = json[i].CheckedDefault;

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
		    News.html();

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
									News.hide();
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
		document.getElementById('h1-title').innerHTML = drivSign_xp2;
		document.getElementById('getDownloadInstallTop').innerHTML = infobar_buttonInstAll;
		document.getElementById('getDownloadInstallBottom').innerHTML = misc_inst5;
		document.getElementById('loader').style.display = 'none';
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
