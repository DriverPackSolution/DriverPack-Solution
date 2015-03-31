


var WgetPack = {
    // В качестве базы данных используем softJsonDB
    _wb: new alasql.Database(),
    _folder: '',
    thread: true,
    timer: false,
    wgetPath: AppData + '\\DRPSu',
    init: function () {
        if (!FSO.FolderExists(this.wgetPath)) {
            FSO.CreateFolder(this.wgetPath);
        }
        if (!FSO.FolderExists(this.wgetPath + '\\LOGS')) {
            FSO.CreateFolder(this.wgetPath + '\\LOGS');
        }
        WgetPack._wb.exec("CREATE TABLE download");
        WgetPack._wb.exec("ALTER TABLE download ADD complite");
    },
    SQL: function (query) {
        //console.log(JSON.stringify(this._wb.exec(query)));
        return this._wb.exec(query);

    },
    html: function () {
        document.getElementById("m-pc").parentNode.classList.remove("green");
        document.getElementById("m-apps").parentNode.classList.remove("green");
        document.getElementById("m-e").parentNode.classList.add("green");
        var wgets = this.SQL("SELECT * FROM wgets");
        var tbodys = document.getElementById('list').getElementsByTagName('tbody');
        for (var i = 0, n = tbodys.length; i < n; i++) {
            if (i in tbodys) {
                tbodys[i].innerHtml = '';
            }
        }
        document.getElementById('loader').style.display = 'block';
        var newTbody = document.createElement('tbody');
        for (var i = 0; i < wgets.length; i++) {
            if (wgets[i]) {
                if (!this.get(wgets[i].Name).isDownload()) {
                    var descr = this.SQL("SELECT * FROM soft WHERE Name='" + wgets[i].Name + "'")[0];
                    newTbody.innerHTML += "<!-- { SINGLE LIST ITEM } -->" +
                            "<tr>" +
                            "<td class='list-first'><img id='drv-generic' src='img/blank.gif' /></td>" +
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
    get: function (json) {

        /*
         * {
         'column_1_name': 'value_1',
         'column_2_name': 'value_2',
         'column_3_name': 'value_3',
         'column_4_name': 'value_4'
         }
         
         если 
         
         [{
         'column_1_name': 'value_1',
         'column_2_name': 'value_2',
         'column_3_name': 'value_3',
         'column_4_name': 'value_4'
         }]
         
         json[0]
         */
        var _this = this;
        if (typeof json == 'string') {
            _this.folder = '';
            json[0].complite = '';
            WgetPack._wb.tables['download'].data.push(json[0]);
        }

        var additionFunctions = {
            download: function (url) {
                if (this.exists('tool\\wget.exe')) {
                    if (FSO.GetFileName(url).lastIndexOf(".exe")) {
                        _this.folder = _this.wgetPath + '\\PROGRAMS';
                    } else if (FSO.GetFileName(url).lastIndexOf(".zip")) {
                        _this.folder = _this.wgetPath + '\\DRIVERS';
                    } else {
                        _this.folder = _this.wgetPath;
                    }

                    if (!this.exists(_this.folder + "\\" + FSO.GetFileName(url))) {
                        if (!FSO.FolderExists(_this.folder)) {
                            FSO.CreateFolder(_this.folder);
                        }
                        WshShell.Run('"tool\\wget.exe" -P "' + _this.folder + '" ' + url + " -o " + _this.wgetPath + "\\LOGS\\" + FSO.GetFileName(url).slice(0, FSO.GetFileName(url).lastIndexOf(".")) + ".txt", 0, _this._thread);

                    } else {
                        return false;
                    }
                }
            },
            proccess: function () {
                var downloads = _this.SQL("SELECT * FROM download");
                if (count(downloads) > 0) {
                    for (var i = 0; i < count(downloads); i++) {
                        var tempfile, line;
                        if (this.exists(_this.wgetPath + "\\LOGS\\" + FSO.GetFileName(downloads[i].URL).slice(0, FSO.GetFileName(downloads[i].URL).lastIndexOf(".")) + ".txt")) {
                            tempfile = FSO.OpenTextFile(_this.wgetPath + "\\LOGS\\" + FSO.GetFileName(downloads[i].URL).slice(0, FSO.GetFileName(downloads[i].URL).lastIndexOf(".")) + ".txt", 1, false);
                            line = tempfile.ReadAll();
                            _this.SQL("UPDATE download SET complite = " + line.slice(line.lastIndexOf("%") - 3, line.lastIndexOf("%")) + "WHERE URL = " + downloads[i].URL);
                            tempfile.Close();
                            if (line.slice(line.lastIndexOf("%") - 3, line.lastIndexOf("%")) === '100') {
                                _this.get().complite(downloads[i].URL);
                            }
                        }
                    }
                    this.timer = setInterval(function () {
                        _this.get().proccess();
                    }, 1000);
                } else {
                    clearInterval(this.timer);
                }
                _this.html();
            },
            complite: function (url) {
                _this.SQL("DELETE FROM download WHERE URL = " + url);
            },
            // Проверяет скачан ли файл
            isDownload: function (url) {
                return _this.SQL("SELECT * FROM download WHERE URL = " + url);
            }
        };
        return additionFunctions;

    },
    exists: function (file) {

        if (FSO.FileExists(file)) {
            return true;
        } else {
            return false;
        }
    }

};
WgetPack.init();
// 'SELECT * FROM soft WHERE Lang like \'r%\''  -  не забываем про вид запросов




