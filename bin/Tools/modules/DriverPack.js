var DriverPack = {
    _json: driverJsonDB,
    driverPath: AppData + '\\DRPSu\\DRIVERS',
    not_installed: [],
    installed: [],
    not_versions: [],
	_allDrivers: [],
	getDevType: function(DevID) {
		if (DevID == "") { return ""; }
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
	driverDetect: function(callback){
		
		
		//var DrivercolItems = objWMIService.ExecQuery("SELECT HardWareID FROM Win32_PnPSignedDriver WHERE HardWareID != null AND (HardWareID LIKE 'PCI%' OR HardWareID LIKE 'HDAUDIO%' OR HardWareID LIKE 'USB%' OR HardWareID LIKE 'ACPI%' OR HardWareID LIKE '*%')", "WQL");
		/*
		ClassGuid, CompatID, Description, DeviceClass, DeviceID, DeviceName, DriverDate, DriverProviderName, DriverVersion, HardWareID, InfName, IsSigned, Location, Manufacturer, Signer, 
		*/
		/*
		var start = new Date();
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
		
		
		
		var start = new Date();
		
		var DrivercolItems = objWMIService.ExecQuery("SELECT * FROM  Win32_PnPSignedDriver WHERE HardWareID != null", "WQL");
		var DriverenumItems = new Enumerator(DrivercolItems);
		DriverenumItems.moveFirst();
		
		var counter = 0,
			limit = 1000000000,
			handle,
			action = function(){
				if ((DriverenumItems.atEnd() == true) || (counter >= limit)){
					
					callback();
					
					clearTimeout(handle);
					return;
				}
				
				
				for (var i = 0; i < 10 && DriverenumItems.atEnd() == false; i++) {
					
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
	getDrivers: function(where, what){
		
		var allDrivers = DriverPack._allDrivers.installed;
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
    init: function (callback) {
		
		setTimeout(function(){
		
			DriverPack.driverDetect(function(){
				
				
				document.getElementById('loader').style.display = 'none';
				echo("JSON drivers:\r\n "+JSON.stringify(DriverPack.installed));
				
				
				if (DriverPack._json === '') {
					DriverPack._json = {
						'soft': new Array()
					};
					var data = {
						not_installed: JSON.stringify(DriverPack.not_installed).replace(/\\\\/ig,"-"),
						installed: JSON.stringify(DriverPack.installed).replace(/\\\\/ig,"-"),
						version: SVersion,
						os: (OSVersion=='6.1'?'7':OSVersion)
					};
					var get = Object.keys(data).map(function (k) {
						return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
					}).join('&');
					
					echo('http://test-st.drp.su/drivers/response.php?callback=drivers_callback&' + get);
					JSONP('http://test-st.drp.su/drivers/response.php?callback=drivers_callback&' + get);
					
					drivers_callback = function (json) {
							json = JSON.parse(JSON.stringify(json));
							echo("");
							echo("JSON drivers_callback():");
							echo(JSON.stringify(json));
							echo("");
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
							
							
							echo(print_r(output));
							DriverPack._allDrivers = output;
							//alert(print_r(DriverPack.getDrivers('ID','0')));
							
							/*
							for (var key in output) {
								if (output.hasOwnProperty(key)) {
									DriverPack._db.exec('CREATE TABLE ' + key);
									for (var column in output[key][0]) {
										if (output[key][0].hasOwnProperty(column)) {
											DriverPack._db.exec('ALTER TABLE ' + key + ' ADD COLUMN ' + column + ' STRING');
										}
									}
									for (var num in output[key]) {
										DriverPack._db.exec('INSERT INTO ' + key + ' VALUES ?', [output[key][num]]);
									}
								}
							}
							DriverPack.dbReady = true;
							*/
							
							callback();
					};
				}
			});
		},0);
        /*echo('  DriverPack.init();');
         echo('  test(JSON.stringify(DriverPack._db), \'' + JSON.stringify(DriverPack._db) + '\');');*/
    },
    SQL: function (query) {
        //echo('  test(DriverPack.SQL(\''+ query +'\'), \'' + JSON.stringify(this._db.exec(query)) + '\');');
        //return DriverPack._db.exec(query);
    },
    html: function () {
        //document.getElementById("m-apps").parentNode.classList.remove("green");
        //document.getElementById("m-down").parentNode.classList.remove("green");
        //document.getElementById("m-pc").parentNode.classList.add("green");
        //var installed = DriverPack.SQL('SELECT * FROM installed');
		var installed = DriverPack.getDrivers();
		//alert(print_r(installed));
		//var tbodys = document.getElementById('list').getElementsByTagName('tbody');
		//var tbodys = document.body.all.tags("tbody");
		//alert(JSON.stringify(tbodys));
		
        
		//alert(print_r(tbodys));
        //for (var i = 0, n = tbodys.length; i < n; i++) {
        //    if (i in tbodys) {
        //        tbodys[i].innerHtml = '';
        //    }
        //}
        document.getElementById('loader').style.display = 'block';
        var newTbody = document.createElement('tbody');
        for (var i = 0; i < installed.length; i++) {
            if (installed[i] && installed[i].Name != 'dpinst.zip') {
                if (!DriverPack.get(installed[i].ID).isNeedUpdate()) {
                    //var descr = DriverPack.SQL('SELECT * FROM installed WHERE Name="' + installed[i].Name + '"')[0];
					var descr = DriverPack.getDrivers('Name',installed[i].Name)[0];
                    newTbody.innerHTML += "<!-- { SINGLE LIST ITEM } -->" +
                            "<tr>" +
                            "<td class='list-first'> &nbsp; <input data-name='" + encodeURIComponent(descr.ID) + "' type='checkbox' checked=checked/> <img src='Tools/ico/button/" + DriverPack.getDriverIcon(installed[i].URL) + ".png' /></td>" +
                            "<td class='list-second' title='" + descr.ID.replace('-','\\') + "'>" + descr.Name + "</td>" +
                            "<td class='list-third' title='" + descr.URL + "'><b>" + descr.Date + "</b></td>" +
                            "<td class='list-last'></td>" +
                            "</tr><br>";
                }
            }
        }
        //if (newTbody.innerHTML != '') {
//            var tbodys = document.getElementById('list').getElementsByTagName('tbody');
			//var tbodys = document.getElementById('tbody');
            //if (tbodys.length) {
            //    document.getElementById('list').removeChild(tbodys);
            //}
			//alert(newTbody.innerHTML);
            //document.getElementById('tbody').innerHTML = '123';
			document.getElementById('tbody').innerHTML = newTbody.innerHTML;
			//document.getElementById('tbody').innerHTML = 'sdfasdfasdfasdfasdfasdfasdfasdfsda';
        //}
        document.getElementById('loader').style.display = 'none';
    },
    get: function (driverID) {


        var additionFunctions = {
            install: function () {
                //var installed = DriverPack.SQL('SELECT * FROM installed WHERE ID = "' + driverID + '"');
				var installed = DriverPack.getDrivers('ID',driverID);
                if (installed.length > 0) {
                    if (WgetPack.get().isDownload(installed[0].URL)) {
                        return true
                    }
                    setTimeout(function () {
                        if (document.getElementById("m-apps").parentNode.classList.contains("green")) {
                            DriverPack.html();
                        }
                        DriverPack.get(softName).install();
                    }, 1000);
                } else {
                    
                     WshShell.Run('cmd /c rd /S /Q "' + WshShell.ExpandEnvironmentStrings(DriverPack.driverPath) + '"', 0, true);
                     WshShell.Run('Tools\\7za.exe x -yo"' + WshShell.ExpandEnvironmentStrings(DriverPack.driverPath) + '" "' + DriverPack.driverPath + '\\*"', 0, true);
                     WshShell.Run(
                     WshShell.ExpandEnvironmentStrings(DriverPack.driverPath + '\\dpinst\\Setup') + (SVersion == '64' ? '64' : '') + '.exe ' +
                     '/SW /c /sa /PATH "' + WshShell.ExpandEnvironmentStrings(DriverPack.driverPath) + '"',
                     0, true
                     );
                     
                }
                return true;
            },
            download: function () {
                //var url = DriverPack.SQL('SELECT * FROM installed WHERE ID="' + driverID + '"');
				var url = DriverPack.getDrivers('ID',driverID);
                return WgetPack.get(url[0]).download(url[0].URL);
            },
            complite: function () {
                DriverPack.SQL('DELETE FROM installed WHERE ID = "' + driverID + '"');
            },
            isNeedUpdate: function (id) {
                var ret = false,
                        date = DriverPack.SQL('SELECT * FROM installed WHERE ID="' + id + '"');
						date = DriverPack.getDrivers('ID',id);
                try {
                    if (new Date(date[0].Date).getTime() > new Date(DriverPack.installed[id]).getTime()) {
                        ret = true;
                    }
                }
                catch (e) {
                    ret = false;
                }
                return ret;
            }
        }
        return additionFunctions;
    },
	
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

//DriverPack.init();

