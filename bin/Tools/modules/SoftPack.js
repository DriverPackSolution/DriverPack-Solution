var SoftPack = {
    _json: softJsonDB,
    softPath: AppData + '\\DRPSu\\PROGRAMS',
    init: function (callback) {
		
		JSONP(
			'http://test-st.drp.su/admin/index.php?r=response&callback=soft',
			function (json) {
				
				
				//Фиксим неправильный формат JSON,
				//это чтобы не переписывать на стороне сервера
				json.forEach(function(item, i, json) {
					
					json[i].Registry = [];
					if (item.Registry_32){
						json[i].Registry[json[i].Registry.length] = item.Registry_32.replace(/\\\\/ig,'\\');
					}
					if (item.Registry_64){
						json[i].Registry[json[i].Registry.length] = item.Registry_64.replace(/\\\\/ig,'\\');
					}
					
				});
				
				SoftPack.loadDB(cloneObj(json));
				SoftPack.detectInstalled();
				SoftPack.detectDownloaded();
				
				callback();

			}
		);

    },
	detectInstalled: function () {
		
		var check = SoftPack.get({
			'SELECT': '*'
		});
		
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
			
			//isDownloaded
			SoftPack._json.soft[i].isDownloaded = false;
			if (driver_exists(item.URL,SoftPack.softPath)) {
				SoftPack._json.soft[i].isDownloaded = true;
			}
			
		});
		
		
	},
	
	detectDownloaded: function () {
		
		var check = SoftPack.get({
			'SELECT': '*'
		});
		
		check.forEach(function(item, i, check) {
			
			//isDownloaded
			SoftPack._json.soft[i].isDownloaded = false;
			if (driver_exists(item.URL,SoftPack.softPath)) {
				SoftPack._json.soft[i].isDownloaded = true;
			}
			
		});
		
		
	},
	
	
	loadDB: function(json){
		
		SoftPack._json = {
			'soft': new Array()
		};
		//SoftPack._json.soft = json.slice();
		//SoftPack._json.soft = json.clone()[0];
		
		//Клонируем объект
		SoftPack._json.soft = cloneObj(json);
		
		
	},
	db: function(){
		
		//return SoftPack._json.soft.slice();
		return cloneObj(SoftPack._json.soft);
		
	},
	
	
    get: function (query) {
		
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
	
	
	
	
	
	download: function (IDs, callback) {
		
		var url = SoftPack.get({
			'SELECT': '*',
			'WHERE': IDs
		});
		
		
		setTimeout(
			function(){
				echo('Started downloading IDs: ' + IDs);
				
				url.forEach(function(item,i,url) {
					
					echo('Downloading: ' + item.URL + '. To folder: ' + SoftPack.softPath);
					wget_driver(item.URL,SoftPack.softPath);
					SoftPack._json.soft[i].isDownloaded = true;
					
				});
				
				callback();
				
			},
			0
		);
		
	},
	
	
	install: function (IDs, callback) {
		
		var url = SoftPack.get({
			'SELECT': '*',
			'WHERE': IDs
		});
		
		
		setTimeout(
			function(){
				
				url.forEach(function(item,i) {
					if (item.isDownloaded){
						
						//echo(SoftPack.softPath + '\\' + item.URL.substring(item.URL.lastIndexOf('/')+1));
						echo('Starting to install: ' + '"' + SoftPack.softPath + '\\' + item.URL.substring(item.URL.lastIndexOf('/')+1) + '" ' + item.Keys);
						WshShell.Run('"' + SoftPack.softPath + '\\' + item.URL.substring(item.URL.lastIndexOf('/')+1) + '" ' + item.Keys,1,true);
						SoftPack._json.soft[i].isInstalled = true;
						
					}
				});
				
				callback();
				
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
                            WshShell.Run('"' + WgetPack.get().isDownload(soft[0].URL) + "\\" + FSO.GetFileName(soft[0].URL) + '" ' + soft[0].Keys, 0, true);
                            _this.get(softName).complite();
                            return FSO.DeleteFile(WgetPack.get().isDownload(soft[0].URL) + "\\" + FSO.GetFileName(soft[0].URL), true);
                        }
                    }
                    setTimeout(function () {
                        if (document.getElementById("m-apps").parentNode.classList.contains("green")) {
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
		
		//alert(document.getElementById("list").lastChild.innerHTML);
		
		
		document.getElementById("menu-drivers").className = document.getElementById("menu-drivers").className.replace(/\bgreen\b/,'');
		document.getElementById("menu-soft").className = document.getElementById("menu-soft").className + ' green';
        //document.getElementById("menu-wget").className = document.getElementById("menu-wget").className.replace(/\bgreen\b/,'');
		
        //document.getElementById("m-pc").parentNode.classList.remove("green");
        //document.getElementById("m-down").parentNode.classList.remove("green");
        //document.getElementById("m-apps").parentNode.classList.add("green");
        //var softs = this.SQL('SELECT * FROM soft');
        //var tbodys = document.getElementById('list').getElementsByTagName('tbody');
        //for (var i = 0, n = tbodys.length; i < n; i++) {
        //    if (i in tbodys) {
        //        tbodys[i].innerHtml = '';
        //    }
        //}
        document.getElementById('loader').style.display = 'block';
        var newTbody = document.createElement('tbody');
		var newTbody = '';
		var softs = SoftPack.get({ 'SELECT': '*', 'WHERE': [ { 'isInstalled': false } ] });
		
		for (var i = 0; i < softs.length; i++) {
			
			newTbody += '<tr><td class="list-first"><input data-name="' + encodeURIComponent(softs[i].Name)  + '" id="checkSoft'+softs[i].ID+'" type="checkbox" checked1/> </td>' +
					'<td class="list-second">' + softs[i].Name + '</td>' +
					'<td class="list-third" title="' + softs[i].URL + '"><b>' + softs[i].Version + '</b></td>' +
					'<td class="list-last"></td>' +
					'</tr>';
			
        }
		
		
		getDownloadInstall = function(){
			
			var IDs = [];
			for (var i = 0; i < softs.length; i++) {
				if (document.getElementById('checkSoft'+softs[i].ID).checked === true){
					IDs[IDs.length] = softs[i].ID;
				}
				
			}
			
			if (IDs.length < 1) { return false; }
			
			document.getElementById('loader').style.display = 'block';
			//alert(JSON.stringify(IDs));
			echo('Downloading started...');
			SoftPack.download(
				IDs,
				function(){
					
					echo('Downloaded!');
					alert('Готово, переходим к установке!');
					
					echo('Installing started...');
					SoftPack.install(
						IDs,
						function(){
							
							echo('Installed!');
							document.getElementById('loader').style.display = 'none';
							alert('Установка завершена!');
							
						}
					);
					
				}
			);
		};
		
        //var tbodys = document.getElementById('list').getElementsByTagName('tbody');
        //if (tbodys.length) {
        //    document.getElementById('list').removeChild(tbodys[0]);
        //}
        //document.getElementById('list').appendChild(newTbody);
		//alert(newTbody);
		document.getElementById('div-list').innerHTML = '<table id="list"><thead><tr><td></td><td>Название</td><td>Версия</td><td></td></tr></thead><tbody>'+newTbody+'</tbody></table>';
        document.getElementById('loader').style.display = 'none';
    }
};
