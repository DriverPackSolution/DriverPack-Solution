statistics = {
    //clientId: "000000000.0000000000",
    clientId: "",
    drpVersion: version + verType,
    _statisticUrl: "http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1",
    //_statisticUrl: "http://statistics.drp.su/online_v_2.php?v=1&tid=UA-58593486-1&aip=1",
    config: {
        userIdDimension: "cd1", //ClientID
        driverDimension: "cd2",
        softDimension: "cd3",
        installedSoftData: "cd4",
        drpInstallComponent: "cd5",
        hardwareData: "cd6",
        drpErrorsName: "cd7",
        targetsComponent: "cd8",
        failuresComponent: "cd8",
        softName: "cd9",
        drpVersion: "cd10",
        drpExitType: "cd11",
        drpStartsCountMeasure: "cm1",
        drpInstallationTimeMeasure: "cm2",
        totalDriversInstallationCount: "cm3",
        failureDriversInstallationCount: "cm4",
        totalSoftInstallationCount: "cm5",
        failureSoftInstallationCount: "cm6",
        installedSoftIndicator: "cm7",
        drpExitCountMeasure: "cm8",
        hardwareDataCount: "cm9",
        drpErrorsCunt: "cm10",
        failuresCount: "cm11",
        drpInstallCount: "cm12",
        checkedSoftIndicator: "cm13",
        checkedDriverIndicator: "cm14",
        targetsCount: "cm15",
        runningSoftCount: "cm16"

    },
    init: function () {
        var file = "tools\\modules\\clientid.js";
        //echo(this.clientId);
        if (fso.FileExists(file)) {
            var text = fso.GetFile(file);
            if (text.Size > 0) {
                //echo(this.clientId);
                this.clientid(text.OpenAsTextStream(1).ReadAll());
                //echo(this.clientId);
            }
        } else {
            this.clientId = this.generate();
        }
    },
    clientid: function (text) {
        text = text.substr(text.indexOf("'") + 1, text.indexOf("'", text.indexOf("'") + 1) - text.indexOf("'") - 1);
        var pos = text.indexOf("_");
        var lenght = text.indexOf(".exe");
        var id = text.substr(pos + 1, lenght - pos - 1);
        this.clientId = id;
    },
    generate: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxx.xxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 10) % 10 | 0;
            //d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString();
        });
        return uuid;
    },
    event: function (event, dimention) {
        if (this.clientId == "")
            this.clientId = this.generate();
        var url = this.compile(event, dimention);
        this.send(url);
        //echo(url);
    },
    compile: function (event, dimention) {
        var ec = encodeURIComponent(event.category);
        var ea = encodeURIComponent(event.action);
        var el = encodeURIComponent(event.label);
        var url = this._statisticUrl + "&cid=" + this.clientId + "&t=event" + "&ec=" + ec + "&ea=" + ea + "&el=" + el;

        var param = [];
        for (var key in dimention) {
            var val = dimention [key];
            param[key] = val[0] + "=" + encodeURIComponent(val[1]);
        }
        return (param.join("&") !== '') ? url + "&" + param.join("&") : url;
    },
    send: function (url) {
        try {
            request.send({
            type: 'GET',
            url: url,
            data: {'r': 'response'},
            contentType: 'text/json; charset=utf-8',
            async: true,
            success: function (data) {
                return true;
            },
            failure: function (){
                return  false;
            }
        });
        } catch (e) {
            return false;
        }
    }
};
	