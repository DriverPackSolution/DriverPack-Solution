var driverJsonDB = "http://test-st.drp.su/drivers/response.php";

var locator = new ActiveXObject("WbemScripting.SWbemLocator");
var objWMIService = locator.ConnectServer(null, "root\\cimv2");
var colItems = objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL");
var enumItems = new Enumerator(colItems);
var WshShell = new ActiveXObject("WScript.Shell");

var DriverPack = {
    _json: driverJsonDB,
    driverPath: AppData + '\\DRPSu\\DRIVERS',
    devcon: "devcon.exe",
    re: new RegExp("(^[^\\n\\r\\s][^\\n\\r]+)\\r\\n(\\s+[^\\n\\r]+\\r\\n)*[^\\n\\r]*" +
            "((?:DEVICE IS|DEVICE HAS|DRIVER IS|DRIVER HAS)[^\\r]+)", "mg"),
    HWIDS: '',
    dev_IDs: [],
    dev_devname: [],
    dev_curstatus: [],
    dev_manuf: [],
    dev_group: [],
    dev_found: [],
    dev_ind: [],
    dev_inst_ind: [],
    dev_hashval: [],
    dev_provider: [],
    table_instver: [],
    table_instvr: [],
    table_instinf: [],
    table_instsect: [],
    table_key: [],
    result: '',
    // Прямо в SQL отправляем запрос на сервер,
    // а в будущем будем использовать еще и SQLite.
    //
    // Например:
    // DriverPack.SQL("SELECT * WHERE driverName='Nvidia' AND os='XP' AND osbit='32' LIMIT 1");
    // DriverPack.SQL("SELECT * WHERE driverName='ATI' AND os='XP' AND osbit='32' LIMIT 1");
    //
    //

    init: function () {
        if (WshShell.ExpandEnvironmentStrings("%PROCESSOR_ARCHITECTURE%") === "AMD64"
                || WshShell.ExpandEnvironmentStrings("%PROCESSOR_ARCHITEW6432%") !== "%PROCESSOR_ARCHITEW6432%") {
            this.devcon = "devcon64.exe";
        }
        // Inquiry hardware information

        WshShell.Run("tool\\" + this.devcon + " status * > " + this.driverPath + "\\" + "HWIDS.txt\"", 0, false);
        try {
            this.HWIDS = FSO.OpenTextFile(this.driverPath + "\\" + 'HWIDS.txt', 1, false).ReadAll().toUpperCase();
            alert(this.HWIDS);
            return true;
        }
        catch (e) {
            return false;
        }
    },
    html: function () {
        document.getElementById("m-pc").parentNode.classList.add("green");
        document.getElementById("m-apps").parentNode.classList.remove("green");
        this.parse();
        this.format();
    },
    parse: function () {
        // Parse hardware information


        var l = 0, i;
        var groupn = 0;
        var IDlist = [];
        var matches = 0;
        var arr = [];

        while (this.result = this.re.exec(this.HWIDS)) {
            var reg_1 = RegExp.$1;
            var reg_3 = RegExp.$3;
            matches++;
            if (IDlist[reg_1] == null) {
                var enump = "HKLM\\SYSTEM\\CurrentControlSet\\Enum\\" + reg_1 + "\\";
                var devname = this.RegRead(enump + "DeviceDesc");
                devname = devname.replace(/@[^;]+;/, "");
                var manuf = this.RegRead(enump + "Mfg");
                var tmp = this.RegRead(enump + "Class");
                var tmp = this.RegRead(enump + "LocationInformation");
                var tmp = this.RegRead(enump + "ConfigFlags");
                var tmp = this.RegRead(enump + "Capabilities");
                var drvver;

                var pos = this.RegRead(enump + "Driver");
                var dev_id = null;
                var provider = "";
                if (pos !== "") {
                    pos = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\" + pos + "\\";
                    var tmp = this.RegRead(pos + "DriverDesc");

                    provider = this.RegRead(pos + "ProviderName");
                    var ver = this.RegRead(pos + "DriverDate");
                    dev_id = this.RegRead(pos + "MatchingDeviceId");
                    drvver = this.RegRead(pos + "DriverVersion");
                    dev_id = dev_id.toUpperCase();
                    var tmp1 = this.RegRead(pos + "InfPath");
                    var tmp2 = this.RegRead(pos + "InfSection");
                    var tmp3 = this.RegRead(pos + "InfSectionExt");
                    this.table_instinf[dev_id] = tmp1;
                    this.table_instsect[dev_id] = tmp2 + tmp3;
                    this.table_instver[dev_id] = ver;
                    this.table_instvr[dev_id] = drvver;
                }

                var ind = 0;
                var strind = l;
                var nd_ind = null;
                var dup = 0;
                var pos = this.RegRead(enump + "HardwareID");
                if (pos != "") {
                    arr = this.VB2JSArray(pos);
                    for (i in arr) {
                        this.dev_IDs[l] = arr[i].toUpperCase();
                        dup = this.table_key[this.dev_IDs[l]];
                        this.table_key[this.dev_IDs[l]] = 1;
                        this.dev_devname[l] = devname;
                        this.dev_curstatus[l] = reg_3;
                        this.dev_manuf[l] = manuf;
                        this.dev_group[l] = groupn;
                        this.dev_ind[l] = ind;
                        this.dev_provider[l] = provider;
                        if (this.dev_IDs[l] == dev_id)
                            nd_ind = ind;
                        this.dev_hashval[l] = this.get_hash_value(this.dev_IDs[l]);
                        var thisID = this.dev_IDs[l];
                        if (!dev_id)
                            dev_id = thisID.toUpperCase();
                        this.table_instinf[thisID] = this.table_instinf[dev_id];
                        this.table_instsect[thisID] = this.table_instsect[dev_id];
                        this.table_instver[thisID] = this.table_instver[dev_id];
                        this.table_instvr[dev_id] = drvver;
                        if (!dup)
                        {
                            l++;
                            ind++;
                        }
                    }
                }

                var pos = this.RegRead(enump + "CompatibleIDs");
                if (pos != "")
                {
                    arr = this.VB2JSArray(pos);
                    for (i in arr) {
                        this.dev_IDs[l] = arr[i].toUpperCase();
                        dup = this.table_key[this.dev_IDs[l]];
                        this.table_key[this.dev_IDs[l]] = 1;
                        this.dev_devname[l] = devname;
                        this.dev_curstatus[l] = reg_3;
                        this.dev_manuf[l] = manuf;
                        this.dev_group[l] = groupn;
                        this.dev_ind[l] = ind;
                        if (this.dev_IDs[l] == dev_id)
                            nd_ind = ind;
                        this.dev_hashval[l] = this.get_hash_value(this.dev_IDs[l]);
                        var thisID = this.dev_IDs[l];
                        this.table_instinf[thisID] = this.table_instinf[dev_id];
                        this.table_instsect[thisID] = this.table_instsect[dev_id];
                        this.table_instver[thisID] = this.table_instver[dev_id];
                        this.table_instvr[dev_id] = drvver;
                        if (!dup)
                        {
                            l++;
                            ind++;
                        }
                    }
                }
                var j = strind;
                if (nd_ind != null)
                    for (; j < l; j++)
                        this.dev_inst_ind[j] = nd_ind;
                groupn++;
                IDlist[reg_1] = 1;
            }
        }
    },
    format: function () {

        var formatted_str, t;
        var not_installed_drivers = [];
        var installed_drivers = [];
        var not_installed_versions = [];

        for (var i = 0; i < this.dev_IDs.length; i++) {
            if (this.dev_found[i]) {
                continue;
            }

            if (this.dev_curstatus[i].indexOf("DEVICE HAS A PROBLEM") != -1 || this.dev_inst_ind[i] == "undefined") {
                formatted_str = this.dev_IDs[i].toString().replace(/\\/g, "-");
                not_installed_drivers.push(formatted_str);
            } else {
                formatted_str = this.dev_IDs[i].toString().replace(/\\/g, "-");
                if ((formatted_str.indexOf("DEV") != -1 || formatted_str.indexOf("PID") != -1)
                        && (formatted_str.indexOf("VEN") != -1 || formatted_str.indexOf("VID") != -1)
                        && formatted_str.indexOf("ROOT_HUB20") == -1 && formatted_str.indexOf("VID_12d1") == -1) {
                    var exists = false;


                    for (var counter = 0; counter < installed_drivers.length; counter++) {

                        if (installed_drivers[counter].indexOf(formatted_str) != -1 ||
                                formatted_str.indexOf(installed_drivers[counter]) != -1) {
                            exists = true;
                        }
                    }
                    if (exists == false) {
                        installed_drivers.push(formatted_str);

                        if (typeof (this.table_instver[this.dev_IDs[i]]) === "undefined") {
                            var data = new Date();
                            this.table_instver[this.dev_IDs[i]] = data.getMonth() + "-" + data.getDate() + "-" + data.getFullYear();

                        }
                        not_installed_versions[this.dev_IDs[i]] = this.table_instver[this.dev_IDs[i]];
                    }

                }
            }
            for (t = this.dev_group[i]; i < this.dev_IDs.length && this.dev_group[i] == t; i++)
                ;
            i--;
        }

        alert("not_installed_drivers=" + JSON.stringify(not_installed_drivers));
        alert("installed_drivers=" + installed_drivers.length);
        this.sendPost("http://test-st.drp.su/drivers/response.php", not_installed_drivers, installed_drivers, not_installed_versions);

    },
    sendPost: function (url, not_installed, installed, not_versions) {
        var prepared_not_installed = JSON.stringify(not_installed);
        var prepared_installed = JSON.stringify(installed);

        var system_version = 32;
        if (navigator.userAgent.indexOf("WOW64") != -1 ||
                navigator.userAgent.indexOf("Win64") != -1) {
            system_version = 64;
        }

        for (; !enumItems.atEnd(); enumItems.moveNext()) {
            var OSfullName = enumItems.item().Caption;
            var objItem = OSfullName.toLowerCase();
            var OSServicePack = enumItems.item().CSDVersion;
            var OSVersionS = enumItems.item().Version.replace(/.\d\d.*/, "");
        }


//if (objItem.indexOf("7") != "-1") {
//  alert(alert_win7notSupport);
//  window.close(); WScript.Sleep(1);
//}
        var OSVersion, OSVersionSP, OSName;
        switch (OSVersionS)
        {
            case '5.1':
                OSVersion = 5.1;
                break;
            case '6.0':
                OSVersion = 6;
                break;
            case '6.1':
                OSVersion = 6.1;
                break;
            case '6.2':
                OSVersion = 6.2;
                break;
            case '6.3':
                OSVersion = 6.3;
                break;
            case '6.4':
                OSVersion = 6.4;
                break;
            case '10.0':
                OSVersion = 10.0;
                break;
            default:
                OSVersion = parseFloat(OSVersionS);
        }
        if (typeof (OSVersion) != 'number') {
            OSVersion = 5;
        }

//ServicePack
        try {
            if (OSServicePack.indexOf("Service Pack") != "-1") {
                OSServicePack = OSServicePack.replace(/Service Pack /i, "").replace('null', '').replace('undefined', '');
                OSVersionSP = parseInt(OSServicePack);
            }
        }
        catch (e) {
        }

        OSName = "5"
        if (OSVersion == 6.3)
            OSName = "81";
        if (OSVersion == 6.2)
            OSName = "8";
        if (OSVersion == 6.1)
            OSName = "7";
        if (OSVersion == 6.0)
            OSName = "6";
        var parsed_url;

        request.send({
            type: 'GET',
            url: url,
            data: {not_installed: prepared_not_installed, installed: prepared_installed, version: system_version, os: OSName},
            contentType: 'text/json; charset=utf-8',
            async: true,
            success: function (json) {
                if (typeof json == 'string') {
                    if (json[0] == '(') {
                        json = json.substr(1, json.length - 2);
                    }
                    //alert(json);
                    json = JSON.parse(json);
                }
                var tbodys = document.getElementById('list').getElementsByTagName('tbody');
                for (var i = 0, n = tbodys.length; i < n; i++) {
                    if (i in tbodys) {
                        tbodys[i].innerHTML = '';
                    }
                }
                document.getElementById('loader').style.display = 'block';
                var newTbody = document.createElement('tbody');
                for (var i = 0; i < json.not_installed.length; i++) {
                    if (json.not_installed[i] != null) {
                        if (json.not_installed[i][2].indexOf("$CompositeAdbInterface") != 0) {
                            parsed_url = json.not_installed[i][0].replace("http://download.drp.su/driverpacks/repack/", "http://drivers.drp.su/");
                            alert(parsed_url);
                            if (!wGet.exists(DriverPack.driverPath + "\\" + FSO.GetFileName(parsed_url))) {
                                if (parsed_url.indexOf("Touchpad") == -1) {
                                    newTbody.innerHTML += "<!-- { SINGLE LIST ITEM } -->" +
                                            "<tr>" +
                                            "<td class='list-first'><img id='drv-sound' src='img/blank.gif' /></td>" +
                                            "<td class='list-second'>" + json.installed[i][2] + json.installed[i][3] + "</td>" +
                                            "<td class='list-third'><b>" + json.installed[i][1] + "</b></td>" +
                                            "<td class='list-last'><input data-url=" + parsed_url + " type='checkbox' checked=checked/></td>" +
                                            "</tr>";
                                }
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
                }
                // Drivers that need to be updated
                if (json.installed.length != 0) {
                    newTbody = document.createElement('tbody');
                    for (var i = 0; i < json.installed.length; i++) {
                        //alert(json.installed[i][0]);
                        //alert(json.installed[i][1]);
                        //alert(json.installed[i][2]);
                        //alert(json.installed[i][3]);
                        if (json.installed[i][2].indexOf("$CompositeAdbInterface") != 0) {
                            var driver_date = new Date(json.installed[i][1]);
                            var modified_driver = json.installed[i][3].toString().replace('-', '\\');
                            var current_driver_date = new Date(not_versions[modified_driver]);

                            if (driver_date.getTime() > current_driver_date.getTime()) {
                                parsed_url = json.installed[i][0].replace("http://download.drp.su/driverpacks/repack/", "http://drivers.drp.su/");
                                wGet.size(parsed_url, DriverPack.driverPath);
                                if (!wGet.exists(DriverPack.driverPath + "\\" + FSO.GetFileName(parsed_url))) {
                                    if (parsed_url.indexOf("Touchpad") == -1) {
                                        newTbody.innerHTML += "<!-- { SINGLE LIST ITEM } -->" +
                                                "<tr>" +
                                                "<td class='list-first'><img id='drv-sound' src='img/blank.gif' /></td>" +
                                                "<td class='list-second'>" + json.installed[i][2] + " " + json.installed[i][3] + "</td>" +
                                                "<td class='list-third'><b>" + json.installed[i][1] + "</b></td>" +
                                                "<td class='list-last'><input data-url=" + parsed_url + " type='checkbox' checked=checked/></td>" +
                                                "</tr>";
                                    }
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
                    }
                }
                document.getElementById('loader').style.display = 'none';

            },
            error: function (exception) {
                //document.write(this.responseText);
                if (this.status === 0) {
                    alert('AJAX Error: Not connect.n Verify Network.');
                } else if (this.status == 404) {
                    alert('AJAX Error: Requested page not found. [404]');
                } else if (this.status == 500) {
                    alert('AJAX Error: Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    //setTimeout(online_downloader_init,5000);
                    //alert('AJAX Error: Requested JSON parse failed.');
                    refresh();
                    return false;
                } else if (exception === 'timeout') {
                    alert('AJAX Error: Time out error.');
                } else if (exception === 'abort') {
                    alert('AJAX Error: Ajax request aborted.');
                } else {
                    alert('AJAX Error: Uncaught Error.n' + this.responseText);
                }
                debugger;
            }
        });
        //});
        //},4000);
    },
    VB2JSArray: function (objVBArray) {
        var a;
        try {
            a = new VBArray(objVBArray).toArray();
        }
        catch (e) {
            a = new Array(objVBArray);
        }
        return a;
    },
    get_hash_value: function (obj) {

        var hashval = 0;
        for (j = 0; j < obj.length; j++) {
            chr = obj.charCodeAt(j);
            hashval = ((hashval * 32 + hashval) & 0xffffff) ^ chr;
        }
        return hashval;
    },
    RegRead: function (key) {
        var ret = "";
        try {
            ret = WshShell.RegRead(key);
        }
        catch (e) {
            ret = "";
        }
        return ret;
    },
    SQL: function (query) {

        // ...
        this._sendRequest(query);

    },
    _sendRequest: function () {

        //Отправляем запрос на сервер:
        // - DeviceID драйверов требущих установки
        // - DeviceID всех драйверов уже установленных в системе и их версии
        // - Версия Windows

    },
    // Работаем с драйверами.
    //
    // Например:
    // DriverPack.get(1).download();
    // DriverPack.get(1).install();
    // DriverPack.get(1).install();
    // DriverPack.get(1).isInstalled();
    //
    get: function (id) {

        var _this = this;

        var additionFunctions = {
            install: function () {
                // Cleaning
                WshShell.Run('cmd /c rd /S /Q "' + WshShell.ExpandEnvironmentStrings(_this.driverPath + '\\drp') + '"', 0, true);
                // Unzip
                WshShell.Run('tool\\7za.exe x -yo"' + WshShell.ExpandEnvironmentStrings(_this.driverPath + '\\drp') + '" "' + _this.driverPath + '\\*"', 0, true);
                // Installing drivers
                WshShell.Run(
                        WshShell.ExpandEnvironmentStrings(_this.driverPath + '\\drp\\dpinst\\Setup') + (is64 ? '64' : '') + '.exe ' +
                        '/SW /c /sa /PATH "' + WshShell.ExpandEnvironmentStrings(_this.driverPath) + '"',
                        0, true
                        );
                //WshShell.Run(_this._db[softName].cmd1);
            },
            download: function () {
                if (FSO.FileExists('http://test-st.drp.su/drivers/dpinst.zip')) {
                    wGet.get('http://test-st.drp.su/drivers/dpinst.zip', _this.driverPath);
                }
                //wget(_this._db[softName].downloadUrl);
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

/*
 installed[i] = {
 'DeviceID': objItem.DeviceID.toString(),
 'Caption': objItem.Caption.toString(),
 'ClassGuid': objItem.ClassGuid.toString(),
 'CompactID': objItem.CompactID.toString(),
 'CreationClassName': objItem.CreationClassName.toString(),
 'Description': objItem.Description.toString(),
 'DeviceClass': objItem.DeviceClass.toString(),
 'DeviceName': objItem.DeviceName.toString(),
 'DevLoader': objItem.DevLoader.toString(),
 'DriverDate': new Date(objItem.DriverDate).toString(),
 'DriverProviderName': objItem.DriverProviderName.toString(),
 'DriverVersion': objItem.DriverVersion.toString(),
 'FrendlyName': objItem.FrendlyName.toString(),
 'HardWareID': objItem.HardWareID.toString(),
 'InfName': objItem.InfName.toString(),
 'IsSigned': objItem.IsSigned.toString(),
 'Location': objItem.Location.toString(),
 'Manufactirer': objItem.Manufactirer.toString(),
 'Name': objItem.Name.toString(),
 'PDO': objItem.PDO.toString(),
 'Signer': objItem.Signer.toString(),
 'Started': objItem.Started.toString(),
 'StartMode': objItem.StartMode.toString(),
 'Status': objItem.Status.toString(),
 'SystemCreationClassName': objItem.SystemCreationClassName.toString(),
 'SystemName': objItem.SystemName.toString()
 };
 */