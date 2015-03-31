

var DriverPack = {
    _db: new alasql.Database(),
    _json: driverJsonDB,
    driverPath: AppData + '\\DRPSu\\DRIVERS',
    not_installed: [],
    installed: [],
    not_versions: [],
    // Прямо в SQL отправляем запрос на сервер,
    // а в будущем будем использовать еще и SQLite.
    //
    // Например:
    // DriverPack.SQL("SELECT * WHERE driverName='Nvidia' AND os='XP' AND osbit='32' LIMIT 1");
    // DriverPack.SQL("SELECT * WHERE driverName='ATI' AND os='XP' AND osbit='32' LIMIT 1");
    //
    //

    init: function () {
        var i = 0;
        for (; !DriverenumItems.atEnd(); DriverenumItems.moveNext()) {
            this.installed[i++] = DriverenumItems.item().DeviceID.toString().replace(/\\/g, "-").toUpperCase();
        }
        if (this._json === '') {
            this._json = {
                'soft': new Array()
            };
            request.send({
                type: 'GET',
                url: 'http://test-st.drp.su/drivers/response.php',
                data: {not_installed: JSON.stringify(this.not_installed), installed: JSON.stringify(this.installed), version: SVersion, os: OSVersion},
                contentType: 'text/json; charset=utf-8',
                async: true,
                success: function (json) {
                    if (typeof json == 'string') {
                        if (json[0] == '(') {
                            json = json.substr(1, json.length - 2);
                        }
                        json = JSON.parse(json);
                        var output = {installed: new Array(), not_installed: new Array()},
                        inst = json.installed.length, ninst = json.not_installed.length, tmp;
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
                                DriverPack._db.exec("CREATE TABLE " + key);
                                DriverPack._db.tables[key].data = output[key];
                            }
                        }
                    }
                }
            });
        }
    },
    html: function () {
        document.getElementById("m-apps").parentNode.classList.remove("green");
        document.getElementById("m-pc").parentNode.classList.add("green");
        var installed = this.SQL("SELECT * FROM installed");
        var tbodys = document.getElementById('list').getElementsByTagName('tbody');
        for (var i = 0, n = tbodys.length; i < n; i++) {
            if (i in tbodys) {
                tbodys[i].innerHtml = '';
            }
        }
        document.getElementById('loader').style.display = 'block';
        var newTbody = document.createElement('tbody');
        for (var i = 0; i < installed.length; i++) {
            if (installed[i]) {

                var descr = this.SQL("SELECT * FROM installed WHERE Name='" + installed[i].Name + "'")[0];
                newTbody.innerHTML += "<!-- { SINGLE LIST ITEM } -->" +
                        "<tr>" +
                        "<td class='list-first'><img id='drv-wifi' src='img/blank.gif' /></td>" +
                        "<td class='list-second'>" + descr.Name + "</td>" +
                        "<td class='list-third'><b>" + descr.Date + "</b></td>" +
                        "<td class='list-last'><input data-name='" + encodeURIComponent(descr.ID) + "' type='checkbox' checked=checked/></td>" +
                        "</tr>";

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
    SQL: function (query) {

        return this._db.exec(query);

    },
    get: function (driverID) {

        var _this = this;

        var additionFunctions = {
            install: function () {
                if (FSO.FileExists('http://test-st.drp.su/drivers/dpinst.zip')) {
                    wGet.get('http://test-st.drp.su/drivers/dpinst.zip', _this.driverPath + '\\drp');
                }
                /*
                WshShell.Run('cmd /c rd /S /Q "' + WshShell.ExpandEnvironmentStrings(_this.driverPath + '\\drp') + '"', 0, true);
                WshShell.Run('tool\\7za.exe x -yo"' + WshShell.ExpandEnvironmentStrings(_this.driverPath + '\\drp') + '" "' + _this.driverPath + '\\*"', 0, true);
                WshShell.Run(
                        WshShell.ExpandEnvironmentStrings(_this.driverPath + '\\drp\\dpinst\\Setup') + (is64 ? '64' : '') + '.exe ' +
                        '/SW /c /sa /PATH "' + WshShell.ExpandEnvironmentStrings(_this.driverPath) + '"',
                        0, true
                        );
                        */
            },
            download: function () {
                var url = _this.SQL("SELECT * FROM installed WHERE ID='" + driverID + "'");
                if (url = url[0]) {
                    return wGet.get(url.URL, _this.driverPath + "\\" + driverID);
                } else {
                    return false
                }
            },
            isNeedUpdate: function () {
                var ret = false,
                        check = _this.SQL("SELECT [check] FROM driver WHERE appName='" + id + "'");

                try {
                    ret = WshShell._this.RegRead(check[0].check);
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

