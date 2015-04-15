
inc("../../../Tools/modules/variables.js");
inc("../../../modules-online/statistic.js");
inc("http://code.jquery.com/jquery-1.11.2.min.js");

function updateFileClientId(data) {
    var file = "..\\clientid.js";
    if (fso.FileExists(file)) {
        var text = fso.OpenTextFile(file, 2);
        text.WriteLine(data);
        text.Close();
    }
    else {
        var text = fso.CreateTextFile(file, true);
        text.WriteLine(data);
        text.Close();
    }
}

setTimeout(function () {

    // ******************* setClientId ***********************//

    statistics.clientId = "none"; // принудительно указываем отсутвие clientid
    var data = "clientid_callback({executeFileName: 'DriverPack-Online_000000000.0000000000.exe'});"; // допускаем что в файле clientid лежат следующие данные
    statistics.setClientId(data); // проверяем правильность установки clientid функцией setClientId 

    test(statistics.clientId, "000000000.0000000000"); // проверяем установлен ли clientId
    // *******************************************************//




    // ******************* compileUrl ************************//

    var url = statistics.compileUrl(// проверяем правильность сборки url функцией compileUrl 
            {
                category: 'desktop',
                action: 'opened',
                label: "13 Free"
            });
    test(url, 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=000000000.0000000000&t=event&ec=desktop&ea=opened&el=13%20Free');

    statistics.clientId = "142161064.2424801783"; // принудительно устанавливаем clientid = 142161064.2424801783

    url = statistics.compileUrl(// проверяем правильность сборки url функцией compileUrl 
            {
                category: 'desktop',
                action: 'opened',
                label: "13 Free"
            });
    test(url, 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=142161064.2424801783&t=event&ec=desktop&ea=opened&el=13%20Free');
    // *******************************************************//       




    // ******************** sendUrl **************************//
    
    test(statistics.sendUrl(url), true);// проверяем правильность отправки url с clientid = 142161064.2424801783
    // *******************************************************//
     
     
     
    // *********************** event *************************//
    
    test(statistics.event(// проверяем правильность работы event 
            {
                category: 'desktop',
                action: 'opened',
                label: "13 Free"
            }), true);
    // *******************************************************//
     
     
             
    // ******************* compileUrl ************************//
    
    url = statistics.compileUrl(// проверяем правильность сборки url функцией compileUrl с clientid = 142161064.2424801783
            {
                category: 'desktop',
                action: 'opened',
                label: version + " " + verType
            },
    [
        [
            statistics.config.userIdDimension,
            statistics.clientId
        ],
        [
            statistics.config.drpStartsCountMeasure,
            "1"
        ],
        [
            statistics.config.drpVersion,
            version + " " + verType
        ]
    ]);
    // *******************************************************//
     
     
    
    // ******************** send **************************//
    
    test(statistics._sendImg(url), true);// проверяем правильность отправки данных через получение картинки
    test(statistics._sendAjax(url), undefined);// проверяем правильность отправки данных через ajax 
    test(statistics._sendHttp(url), true);// проверяем правильность отпраки данных через 
    // *******************************************************//
     
     
     
    // ********************** init **************************//
    
    data = "clientid_callback({executeFileName: 'DriverPack-Online_000000000.4000000000.exe'});"; // допускаем что в файле clientid лежат следующие данные
    updateFileClientId(data);// обновляем содержимое файла
    statistics.init(); // запускаем инициализацию статистики
    test(statistics.clientId, "000000000.4000000000"); // проверяем пральность заполнения clientid
    // *******************************************************//
     
     
     
    // ******************* compileUrl ************************//
    
    test(statistics.compileUrl(// проверяем правильность сборки url функцией compileUrl с clientid = 000000000.4000000000
            {
                category: 'desktop',
                action: 'installation started',
                label: "13 Free"
            }), 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=000000000.4000000000&t=event&ec=desktop&ea=installation%20started&el=13%20Free');

    statistics.clientId = "000000000.0000000000"; // переопределяем перменную clientId
    url = statistics.compileUrl(// проверяем правильность сборки url функцией compileUrl с clientid = 000000000.0000000000
            {
                category: 'desktop',
                action: 'installation started',
                label: "13 Free"
            });
    test(url, 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=000000000.0000000000&t=event&ec=desktop&ea=installation%20started&el=13%20Free');        
    // *******************************************************//
     
     
    
    // ********************* sendUrl *************************//      
    
    test(statistics.sendUrl(url), true);// проверяем правильность отправки url с clientid = 000000000.0000000000
    // *******************************************************//
     
     
    
    // ******************* compileUrl ************************//
    
    url = statistics.compileUrl(// проверяем правильность сборки url функцией compileUrl с clientid = 000000000.0000000000
            {
                category: 'desktop',
                action: 'installation started',
                label: "13 Free"
            },
    [
        [
            statistics.config.userIdDimension,
            statistics.clientId
        ],
        [
            statistics.config.installedSoftData,
            "DR-softName"
        ],
        [
            statistics.config.installedSoftIndicator,
            "1"
        ]
    ]);
    // *******************************************************//
     
     
    
    
    // ********************* send ***************************//
    
    test(statistics._sendImg(url), true);// проверяем правильность отправки данных через получение картинки
    test(statistics._sendAjax(url), undefined);// проверяем правильность отправки данных через ajax 
    test(statistics._sendHttp(url), true);// проверяем правильность отпраки данных через 
    // *******************************************************//
     
     
    
    
    // ********************** init **************************//

    data = "clientid_callback({executeFileName: 'DriverPack-Online_qwe.qwe.exe'});"; // допускаем что в файле clientid лежат следующие данные
    statistics.setClientId(data) // проверяем правильность установки clientid функцией setClientId 
    test(statistics.clientId, "qwe.qwe"); // проверяем пральность заполнения clientid
    // *******************************************************//
     
     
    
    
    // ******************* compileUrl ************************//
    
    test(statistics.compileUrl(// проверяем правильность сборки url функцией compileUrl с clientid = qwe.qwe
            {
                category: 'desktop',
                action: 'opened',
                label: "14 Online"
            }), 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=qwe.qwe&t=event&ec=desktop&ea=opened&el=14%20Online');

    statistics.clientId = "000000000.1230000000"; // переопределяем перменную clientId
    url = statistics.compileUrl(// проверяем правильность сборки url функцией compileUrl с clientid = 000000000.0000000000
            {
                category: 'desktop',
                action: 'opened',
                label: "14 Online"
            });
    test(url, 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=000000000.1230000000&t=event&ec=desktop&ea=opened&el=14%20Online'); // роверяем правильность сборки url функцией compileUrl с clientid = 000000000.0000000000
    // *******************************************************//
     
     
    
    
    
    // ********************* sendUrl *************************//      
    
    test(statistics.sendUrl(url), true);// проверяем правильность отправки url с clientid = 000000000.1230000000
    // *******************************************************//



    // ******************* compileUrl ************************//
    
    url = statistics.compileUrl(// проверяем правильность сборки url функцией compileUrl с clientid = 000000000.1230000000
            {
                category: 'desktop',
                action: 'opened',
                label: version + " " + verType
            },
    [
        [
            statistics.config.userIdDimension,
            statistics.clientId
        ],
        [
            statistics.config.drpStartsCountMeasure,
            "1"
        ],
        [
            statistics.config.drpVersion,
            version + " " + verType
        ]
    ]);
    
    test(url, 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=000000000.1230000000&t=event&ec=desktop&ea=opened&el=15.0.2%20Beta'); // роверяем правильность сборки url функцией compileUrl с clientid = 000000000.1230000000
    // *******************************************************//



    
    // ********************* send ***************************//
    
    test(statistics._sendImg(url), true);// проверяем правильность отправки данных через получение картинки
    test(statistics._sendAjax(url), undefined);// проверяем правильность отправки данных через ajax 
    test(statistics._sendHttp(url), true);// проверяем правильность отпраки данных через 
    // *******************************************************//




    // ********************** init **************************//
    
    data = "clientid_callback({executeFileName: 'DriverPack-Online_qwe.qwe.exe'});"; // допускаем что в файле clientid лежат следующие данные
    updateFileClientId(data);// обновляем содержимое файла
    statistics.init(); // запускаем инициализацию статистики
    test(statistics.clientId, "qwe.qwe");

    test(statistics.compileUrl(
            {
                category: 'desktop',
                action: 'installation downloaded',
                label: "14 Online"
            }), 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=qwe.qwe&t=event&ec=desktop&ea=installation%20downloaded&el=14%20Online');

    statistics.clientId = "000000000.0000000000";
    url = statistics.compileUrl(
            {
                category: 'desktop',
                action: 'installation downloaded',
                label: "14 Online"
            });
    test(statistics.sendUrl(url), true);

    url = statistics.compileUrl(
            {
                category: 'desktop',
                action: 'installation downloaded',
                label: "14 Online"
            },
    [
        [
            statistics.config.userIdDimension,
            statistics.clientId
        ],
        [
            statistics.config.installedSoftData,
            "DR-softName"
        ],
        [
            statistics.config.installedSoftIndicator,
            "1"
        ]
    ]);
    test(statistics._sendImg(url), true);
    test(statistics._sendAjax(url), undefined);
    test(statistics._sendHttp(url), true);

    data = "clientid_callback({executeFileName: 'DriverPack-Online.exe'});";
    statistics.setClientId(data)
    test(statistics.clientId, "000000000.0000000000");

    test(statistics.compileUrl(
            {
                category: 'desktop',
                action: 'installation completed',
                label: "15 Online"
            }), 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=000000000.0000000000&t=event&ec=desktop&ea=installation%20completed&el=15%20Online');

    statistics.clientId = "000000000.0000000000";
    url = statistics.compileUrl(
            {
                category: 'desktop',
                action: 'installation completed',
                label: "15 Online"
            });
    test(statistics.sendUrl(url), true);

    url = statistics.compileUrl(
            {
                category: 'desktop',
                action: 'installation completed',
                label: "15 Online"
            },
    [
        [
            statistics.config.userIdDimension,
            statistics.clientId
        ],
        [
            statistics.config.installedSoftData,
            "DR-softName"
        ],
        [
            statistics.config.installedSoftIndicator,
            "1"
        ]
    ]);
    test(statistics._sendImg(url), true);
    test(statistics._sendAjax(url), undefined);
    test(statistics._sendHttp(url), true);

    updateFileClientId(data);
    statistics.init();
    test(statistics.clientId, "000000000.0000000000");


    test(statistics.compileUrl(
            {
                category: 'desktop',
                action: 'opened',
                label: version + " " + verType
            }), 'http://www.google-analytics.com/collect?v=1&tid=UA-58593486-1&cid=000000000.0000000000&t=event&ec=desktop&ea=opened&el=15.0%20Beta');

    statistics.clientId = "000000000.0000000000";
    url = statistics.compileUrl(
            {
                category: 'desktop',
                action: 'opened',
                label: version + " " + verType
            });
    test(statistics.sendUrl(url), true);

    url = statistics.compileUrl(
            {
                category: 'desktop',
                action: 'opened',
                label: version + " " + verType
            },
    [
        [
            statistics.config.userIdDimension,
            statistics.clientId
        ],
        [
            statistics.config.drpStartsCountMeasure,
            "1"
        ],
        [
            statistics.config.drpVersion,
            version + " " + verType
        ]
    ]);
    test(statistics._sendImg(url), true);
    test(statistics._sendAjax(url), undefined);
    test(statistics._sendHttp(url), true);

    next_script();

}, 1000);

