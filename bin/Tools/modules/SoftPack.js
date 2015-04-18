var SoftPack = {
    // В качестве базы данных используем softJsonDB
    //_sb: new alasql.Database(),
    _json: softJsonDB,
    softPath: AppData + '\\DRPSu\\PROGRAMS',
    OSbit: 32,
    init: function () {
        if (WshShell.ExpandEnvironmentStrings("%PROCESSOR_ARCHITECTURE%") === "AMD64"
                || WshShell.ExpandEnvironmentStrings("%PROCESSOR_ARCHITEW6432%") !== "%PROCESSOR_ARCHITEW6432%") {
            this.OSbit = 64;
        }
        if (this._json === '') {
            this._json = {
                'soft': new Array()
            };
            
            JSONP(
                    'http://test-st.drp.su/admin/index.php?r=response&callback=soft',
                    function (json) {

                        SoftPack._json.soft = JSON.parse(JSON.stringify(json));
                        for (var key in SoftPack._json) {
                            if (SoftPack._json.hasOwnProperty(key)) {
                                SoftPack._sb.exec('CREATE TABLE ' + key);
                                for (var column in SoftPack._json[key][0]) {
                                    if (SoftPack._json[key][0].hasOwnProperty(column)) {
                                        SoftPack._sb.exec('ALTER TABLE ' + key + ' ADD COLUMN ' + column + ' STRING');
                                    }
                                }
                                for (var num in SoftPack._json[key]) {
                                    SoftPack._sb.exec('INSERT INTO ' + key + ' VALUES ?', [SoftPack._json[key][num]]);
                                }
                            }
                        }

                    }
            );
        }
        //echo('  SoftPack.init();');
    },
    SQL: function (query) {
        //echo('  test(JSON.stringify(SoftPack.SQL("' + query + '")), "' + JSON.stringify(this._sb.exec(query)) + '");');
        return this._sb.exec(query);

    },
    html: function () {
        document.getElementById("m-pc").parentNode.classList.remove("green");
        document.getElementById("m-down").parentNode.classList.remove("green");
        document.getElementById("m-apps").parentNode.classList.add("green");
        var softs = this.SQL('SELECT * FROM soft');
        var tbodys = document.getElementById('list').getElementsByTagName('tbody');
        for (var i = 0, n = tbodys.length; i < n; i++) {
            if (i in tbodys) {
                tbodys[i].innerHtml = '';
            }
        }
        document.getElementById('loader').style.display = 'block';
        var newTbody = document.createElement('tbody');
        for (var i = 0; i < softs.length; i++) {
            if (softs[i]) {
                if (!this.get(softs[i].Name).isInstalled()) {
                    var descr = this.SQL('SELECT * FROM soft WHERE Name="' + softs[i].Name + '"')[0];
                    newTbody.innerHTML += "<!-- { SINGLE LIST ITEM } -->" +
                            "<tr>" +
                            "<td class='list-first'> &nbsp; <input data-name='" + encodeURIComponent(descr.Name) + "' type='checkbox' checked=checked/> <img id='drv-sound' src='img/blank.gif' /></td>" +
                            "<td class='list-second'>" + descr.Name + "</td>" +
                            "<td class='list-third' title='" + descr.URL + "'><b>" + descr.Version + "</b></td>" +
                            "<td class='list-last'></td>" +
                            "</tr>";
                }
            }
        }
        var tbodys = document.getElementById('list').getElementsByTagName('tbody');
        if (tbodys.length) {
            document.getElementById('list').removeChild(tbodys[0]);
        }
        document.getElementById('list').appendChild(newTbody);
        document.getElementById('loader').style.display = 'none';
    },
    get: function (softName) {

        var _this = this;

        var additionFunctions = {
            install: function () {
                var soft = _this.SQL('SELECT * FROM soft WHERE Name = "' + softName + '"');
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
                var url = _this.SQL('SELECT * FROM soft WHERE Name = "' + softName + '"');
                //echo('  test(WgetPack.get(\'' + JSON.stringify(url[0]) + '\').download("' + url[0].URL + '"), \'' + JSON.stringify(WgetPack.get(url[0]).download(url[0].URL)) + '\');');
                return WgetPack.get(url[0]).download(url[0].URL);
            },
            complite: function () {
                _this.SQL('DELETE FROM soft WHERE Name = "' + softName + '"');
            },
            // Проверяет в реестре, через ветку Uninstall
            isInstalled: function () {
                var ret = false,
                        check = _this.SQL('SELECT Registry_' + _this.OSbit + ' FROM soft WHERE Name="' + softName + '"'),
                        RegKey = check[0]["Registry_" + _this.OSbit].replace(/\\\\/gim, '\\');
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

    }
};
SoftPack.init();
// 'SELECT * FROM soft WHERE Lang like \'r%\''  -  не забываем про вид запросов

