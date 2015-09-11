var statistics = {
    //clientId: "000000000.0000000000",
    clientId: "",
    drpVersion: version + " " + verType,
    _statisticUrl: "http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&aip=1",
    //_statisticUrl: "http://example.com/?",
	//_statisticUrl: "http://statistics.drp.su/online_v_2.php?v=1&tid=UA-58593486-1&aip=1",
	_yaMetrika: {
		id: 30541482,
		enabled: true,
		url: 'http://client.drp.su/'
	},
    hasGoogleSessionStarted: false,
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
        experimentNumber: "cd13",
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
		this.initYaMetrika();

        var file = "tools\\modules\\clientid.js";
        if (fso.FileExists(file)) {
            var text = fso.GetFile(file);
            if (text.Size > 0) {
                this.setClientId(text.OpenAsTextStream(1).ReadAll());
            }
        } else {
            this.clientId = this.generate();
        }
    },
	initYaMetrika: function(){
		(function (d, w, c) {
			(w[c] = w[c] || []).push(function() {
				try {
					w.yaCounter = new Ya.Metrika({
						id:statistics._yaMetrika.id,
						clickmap:true,
						trackLinks:true,
						accurateTrackBounce:true,
						ut:"noindex",
						defer:true
					});
				} catch(e) { }
			});

			var n = d.getElementsByTagName("script")[0],
				s = d.createElement("script"),
				f = function () { n.parentNode.insertBefore(s, n); };
			s.type = "text/javascript";
			s.async = true;
			s.src = "https://mc.yandex.ru/metrika/watch.js";

			f();
		})(document, window, "yandex_metrika_callbacks");

	},
    setClientId: function (text) {
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

		var dimention = dimention || [];

		var defaultEventParams = {
			category: 'desktop',
			action: '',
			label: statistics.drpVersion.replace(/^\s+|\s+$/gm,'')
		};

        event = extendJSON(defaultEventParams,event);
        if (event.action == '') { return false; }

        if (this.clientId == "")
            this.clientId = this.generate();

        var defaultEventDimenstion = [
            statistics.config.userIdDimension,
            statistics.clientId
        ];

        // check push() return value in HTA
        dimention.push(defaultEventDimenstion);

        var url = this.compileUrl(event, dimention);

		log('[Statistics.js] Send event: '+event.action,event,dimention,[ url ]);

		this.sendUrl(url);
		this.sendYaMetrika(event);

        return true;
    },
	sendYaMetrika:function(event){

		if (!statistics._yaMetrika.enabled){ return false; }
		if (typeof(window.yaCounter) == 'undefined') {

			setTimeout(
				function(){

					statistics.sendYaMetrika(event);

				},
				500
			);
			return false;

		}

		var url = statistics._yaMetrika.url + event.category.replace(/ /ig,'_') + '/' + event.action.replace(/ /ig,'_') + '/' + event.label.replace(/ /ig,'_');
		var params = {
            clientId: statistics.clientId + '',
            language: lang
        };
        if (statistics.experimentNumber) {
            params.experimentNumber = statistics.experimentNumber;
        }

		log('[Statistics.js] Send event Yandex.Metrika: '+event.action,[ url ], params);
		window.yaCounter.hit(url, document.title, null, params);

	},
    compileUrl: function (event, dimention) {
        var ec = encodeURIComponent(event.category);
        var ea = encodeURIComponent(event.action);
        var el = encodeURIComponent(event.label);
        var url = this._statisticUrl + "&cid=" + this.clientId + "&t=event" + "&ec=" + ec + "&ea=" + ea + "&el=" + el + "&ul=" + lang;
        if (!statistics.hasGoogleSessionStarted) {
            url += '&sc=start';
            statistics.hasGoogleSessionStarted = true;
        }

        var param = [];
        for (var key in dimention) {
            var val = dimention [key];
            param[key] = val[0] + "=" + encodeURIComponent(val[1]);
        }

        return (param.join("&") !== '') ? url + "&" + param.join("&") : url;
    },
    sendUrl: function (url) {
        try {
            return this._sendImg(url);
        } catch (e) {
            try {
                return this._sendHttp(url);
            } catch (e) {
                return this._sendAjax(url);
            }
        }
    },
    _sendImg: function (url) {
        var img = document.createElement('img');
        img.src = url;
        return true;
    },
    _sendAjax: function (url) {

        $.ajax({
            type: 'GET',
            url: url,
            crossDomain: true,
            dataType: 'script',
            success: function (data)
            {
                return true;
            },
            error: function (errorThrown)
            {
                return false;
            }
        });
    },
    _sendHttp: function (url) {

        var xmlhttp = false;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        xmlhttp.open("GET", url, false);
        xmlhttp.setRequestHeader("Content-Type", "text/html");
        xmlhttp.send();
        return true;
    },
    pickExperiment: function(lang, ie6, entropy) {
        var not_ru = lang !== 'ru';
        var entropy_3 = entropy % 3 + 1;
        var invalidClientId = isNaN(entropy_3);
        log('[Statistics.js] ie6=' + ie6 + ' not_ru=' + not_ru + ' invalidClientId=' + invalidClientId);
        if (not_ru) {
            return {
                track: false,
                ui: 1,
                copy: 1,
                adapterExperiment: false,
                newsExperiment: false,
                startExperiment: false,
                startCTA: 0
            };
        } else {
            return {
                track: true,
                ui: 1,
                copy: 1,
                adapterExperiment: true,
                newsExperiment: false,
                startExperiment: true,
                startCTA: 1
            };
        }
    },
    setupExperiment: function() {
        var entropy = Math.floor(this.clientId);
        var ie6 = /\bMSIE 6/.test(navigator.userAgent);
        statistics.experiment =  statistics.pickExperiment(lang, ie6, entropy);
        statistics.experimentNumber = statistics.experiment.startExperiment ? ('start_cta-' + statistics.experiment.startCTA) : '';
    },
    patchCopyright: function() {
        if (this.experiment.copy === 2) {
            ui2_singleDriver = "Драйвер";
            infobar_buttonInstAll = "Установить всё автоматически";
            misc_inst2 = "Установить выбранные драйверы";
            misc_inst5 = "Установить выбранные программы";
        }
    },
    sendOpenedEvent: function() {
        var dimensions = [];
        dimensions = [
            [
                statistics.config.drpStartsCountMeasure,
                "1"
            ],
            [
                statistics.config.drpVersion,
                statistics.drpVersion
            ]
        ];
        if (statistics.experimentNumber) {
            dimensions.push([
                statistics.config.experimentNumber,
                statistics.experimentNumber
            ]);
        }
        statistics.event(
            {
                action: 'opened'
            },
            dimensions
        );
        if (!statistics.startExperiment) {
            statistics.event( { action: 'Screen opened Drivers' } );
        }
    }
};

statistics.init();
statistics.setupExperiment();
statistics.patchCopyright();
statistics.sendOpenedEvent();
