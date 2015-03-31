
var SoftPack = {
    // В качестве базы данных используем softJsonDB
    _sb: new alasql.Database(),
    _json: softJsonDB,
    softPath: AppData + '\\DRPSu\\PROGRAMS',
    init: function () {
        if (this._json === '') {
            this._json = {
                'soft': new Array()
            };
            request.send({
                type: 'GET',
                url: 'http://test-st.drp.su/admin/index.php',
                data: {'r': 'response'},
                contentType: 'text/json; charset=utf-8',
                async: true,
                success: function (json) {
                    if (typeof json == 'string') {
                        if (json[0] == '(') {
                            json = json.substr(1, json.length - 2);
                        }
                        //alert(json);
                        SoftPack._json.soft = JSON.parse(json);
                        for (var key in SoftPack._json) {
                            if (SoftPack._json.hasOwnProperty(key)) {
                                SoftPack._sb.exec("CREATE TABLE " + key);
                                SoftPack._sb.tables[key].data = SoftPack._json[key]
                            }
                        }
                    }
                }
            });
        }
    },
    SQL: function (query) {
        //console.log(JSON.stringify(this._sb.exec(query)));
        return this._sb.exec(query);

    },
    html: function () {
        document.getElementById("m-pc").parentNode.classList.remove("green");
        document.getElementById("m-apps").parentNode.classList.add("green");
        var softs = this.SQL("SELECT * FROM soft");
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
                    var descr = this.SQL("SELECT * FROM soft WHERE Name='" + softs[i].Name + "'")[0];
                    newTbody.innerHTML += "<!-- { SINGLE LIST ITEM } -->" +
                            "<tr>" +
                            "<td class='list-first'><img id='drv-sound' src='img/blank.gif' /></td>" +
                            "<td class='list-second'>" + descr.Name + "</td>" +
                            "<td class='list-third'><b>" + descr.Version + "</b></td>" +
                            "<td class='list-last'><input data-name='" + encodeURIComponent(descr.Name) + "' type='checkbox' checked=checked/></td>" +
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
    // Работаем с софтом.
    //
    // Например:
    // SoftPack.get('Skype').download();
    // SoftPack.get('Skype').install();
    // SoftPack.get('Skype').install();
    // SoftPack.get('Skype').isInstalled();
    //
    get: function (softName) {

        var _this = this;

        var additionFunctions = {
            install: function () {
                var soft = _this.SQL("SELECT * FROM soft WHERE Name='" + softName + "'");
                alert(JSON.stringify(soft));
                if (wGet.exists(_this.softPath + "\\" + soft[0].Name + "\\" + FSO.GetFileName(soft[0].URL))) {
                    //WshShell.Run('"' + _this.softPath + "\\" + soft[0].Name + "\\" + FSO.GetFileName(soft[0].URL) + '" ' + soft[0].Keys, 0, true);
                }

            },
            download: function () {
                var url = _this.SQL("SELECT * FROM soft WHERE Name='" + softName + "'");
                alert(JSON.stringify(url));
                if (url = url[0]) {
                    return wGet.get(url.URL, _this.softPath + "\\" + url.Name);
                } else {
                    return false
                }
            },
            // Проверяет в реестре, через ветку Uninstall
            isInstalled: function () {
                var ret = false,
                        check = _this.SQL("SELECT [check] FROM soft WHERE Name='" + softName + "'");

                try {
                    ret = WshShell.RegRead(check[0].check);
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
SoftPack.init();
// 'SELECT * FROM soft WHERE Lang like \'r%\''  -  не забываем про вид запросов