var DriverPack = {
    _db: new alasql.Database(),
    _json: driverJsonDB,
    driverPath: AppData + '\\DRPSu\\DRIVERS',
    not_installed: [],
    installed: [],
    not_versions: [],
    init: function () {
        var i = 0;
        for (; !DriverenumItems.atEnd(); DriverenumItems.moveNext()) {
            this.installed[i++] = DriverenumItems.item().DeviceID.toString().replace(/\\/g, "-").toUpperCase();
        }
        if (this._json === '') {
            this._json = {
                'soft': new Array()
            };
            var data = {
                not_installed: JSON.stringify(this.not_installed),
                installed: JSON.stringify(this.installed),
                version: SVersion,
                os: OSVersion
            };
            var get = Object.keys(data).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }).join('&');

            JSONP('http://test-st.drp.su/drivers/response.php?' + get, function (json) {
                    json = JSON.parse(JSON.stringify(json));
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
                            ID: json.installed[i][3]
                        };
                        output.installed.push(tmp);
                    }
                    for (var i = 0; i < ninst; i++) {
                        tmp = {
                            URL: json.not_installed[i][0],
                            Date: json.not_installed[i][1].toString().replace(/\//g, "."),
                            Name: json.not_installed[i][2],
                            ID: json.not_installed[i][3]
                        };
                        output.not_installed.push(tmp);
                    }
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
            });
        }
        /*echo('  DriverPack.init();');
         echo('  test(JSON.stringify(DriverPack._db), \'' + JSON.stringify(DriverPack._db) + '\');');*/
    },
    SQL: function (query) {
        //echo('  test(DriverPack.SQL(\''+ query +'\'), \'' + JSON.stringify(this._db.exec(query)) + '\');');
        return this._db.exec(query);
    },
    html: function () {
        document.getElementById("m-apps").parentNode.classList.remove("green");
        document.getElementById("m-down").parentNode.classList.remove("green");
        document.getElementById("m-pc").parentNode.classList.add("green");
        var installed = this.SQL('SELECT * FROM installed');
        var tbodys = document.getElementById('list').getElementsByTagName('tbody');
        for (var i = 0, n = tbodys.length; i < n; i++) {
            if (i in tbodys) {
                tbodys[i].innerHtml = '';
            }
        }
        document.getElementById('loader').style.display = 'block';
        var newTbody = document.createElement('tbody');
        for (var i = 0; i < installed.length; i++) {
            if (installed[i] && installed[i].Name != 'dpinst.zip') {
                if (!this.get(installed[i].ID).isNeedUpdate()) {
                    var descr = this.SQL('SELECT * FROM installed WHERE Name="' + installed[i].Name + '"')[0];
                    newTbody.innerHTML += "<!-- { SINGLE LIST ITEM } -->" +
                            "<tr>" +
                            "<td class='list-first'><img id='drv-wifi' src='img/blank.gif' /></td>" +
                            "<td class='list-second'>" + descr.Name + "</td>" +
                            "<td class='list-third'><b>" + descr.Date + "</b></td>" +
                            "<td class='list-last'><input data-name='" + encodeURIComponent(descr.ID) + "' type='checkbox' checked=checked/></td>" +
                            "</tr>";
                }
            }
        }
        if (newTbody.innerHTML != '') {
            var tbodys = document.getElementById('list').getElementsByTagName('tbody');
            if (tbodys.length) {
                document.getElementById('list').removeChild(tbodys[0]);
            }
            document.getElementById('list').appendChild(newTbody);
        }
        document.getElementById('loader').style.display = 'none';
    },
    get: function (driverID) {

        var _this = this;

        var additionFunctions = {
            install: function () {
                var installed = _this.SQL('SELECT * FROM installed WHERE ID = "' + driverID + '"');
                if (installed.length > 0) {
                    if (WgetPack.get().isDownload(installed[0].URL)) {
                        return true
                    }
                    setTimeout(function () {
                        if (document.getElementById("m-apps").parentNode.classList.contains("green")) {
                            _this.html();
                        }
                        _this.get(softName).install();
                    }, 1000);
                } else {
                    /*
                     WshShell.Run('cmd /c rd /S /Q "' + WshShell.ExpandEnvironmentStrings(_this.driverPath) + '"', 0, true);
                     WshShell.Run('tool\\7za.exe x -yo"' + WshShell.ExpandEnvironmentStrings(_this.driverPath) + '" "' + _this.driverPath + '\\*"', 0, true);
                     WshShell.Run(
                     WshShell.ExpandEnvironmentStrings(_this.driverPath + '\\dpinst\\Setup') + (SVersion == '64' ? '64' : '') + '.exe ' +
                     '/SW /c /sa /PATH "' + WshShell.ExpandEnvironmentStrings(_this.driverPath) + '"',
                     0, true
                     );
                     */
                }
                return true;
            },
            download: function () {
                var url = _this.SQL('SELECT * FROM installed WHERE ID="' + driverID + '"');
                return WgetPack.get(url[0]).download(url[0].URL);
            },
            complite: function () {
                _this.SQL('DELETE FROM installed WHERE ID = "' + driverID + '"');
            },
            isNeedUpdate: function (id) {
                var ret = false,
                        date = _this.SQL('SELECT * FROM installed WHERE ID="' + id + '"');
                try {
                    if (new Date(date[0].Date).getTime() > new Date(_this.installed[id]).getTime()) {
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
    }
};

DriverPack.init();

