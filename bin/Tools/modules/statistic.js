//alert("START");
var isAction = false;
var errorTime = 0;
var reportType = "Undefined";
var currentComponent = "Undefined";

var Shell = new ActiveXObject("WScript.Shell");
var appdata = Shell.SpecialFolders("AppData");
if (!fso.FolderExists(appdata + "\\DRPSu")) {
    fso.CreateFolder(appdata + "\\DRPSu");
}

var paramsPath = appdata + "\\DRPSu\\reports.txt"; //путь к файлу с параметрами запросов 
var userPath = appdata + "\\DRPSu\\user.txt"; //путь к файлу с идентификатором пользователя

//var address = "http://www.google-analytics.com/collect"; //URL для отправки запроса по Measurement Protocol
var address = "http://statistics.drp.su/online.php";
var v = "1";
//var tid = "UA-55108042-1"; //"UA-54491896-1";
var tid = "UA-58593486-1";

var t = "event";
var ec = "Category";
var ea = "Virtual";
var el = "Completed";

var cid = getUserId(); //ga.getAll()[0].get('clientId');

var constantParams = "v=" + v + "&tid=" + tid + "&cid=" + cid + "&t=" + t + "&ec=" + ec + "&ea=" + ea + "&el=" + el;
var count = 0;

var report = {
    "drpStartCount": {
        "userIdDimension": "&cd1=",
        "drpStartsCountMeasure": "&cm1=",
        "drpVersion": "&cd10="

    },
    "drpInstall": {
        "userIdDimension": "&cd1=",
        "component": "&cd5=",
        "drpInstallationTimeMeasure": "&cm2=",
        "count": "&cm12="
    },
    "drpExitCount": {
        "userIdDimension": "&cd1=",
        "drpVersion": "&cd10=",
        "drpExitType": "&cd11=",
        "drpExitCountMeasure": "&cm8="
    },
    "hardwareData": {
        "userIdDimension": "&cd1=",
        "data": "&cd6=",
        "count": "&cm9="
    },
    "drpErrors": {
        "name": "&cd7=",
        "drpVersion": "&cd10=",
        "count": "&cm10="
    },
    "softInstallationCount": {
        "softDimension": "&cd3=",
        "totalInstallCountMeasure": "&cm5=",
        "failureInstallCountMeasure": "&cm6="
    },
    "driversInstallationCount": {
        "driverDimension": "&cd2=",
        "totalInstallCountMeasure": "&cm3=",
        "failureInstallCountMeasure": "&cm4="
    },
    "installedSoft": {
        "userIdDimension": "&cd1=",
        "data": "&cd4=",
        "indicator": "&cm7="
    },
    "checkedSoft": {
        "drpVersion": "&cd10=",
        "softDimension": "&cd3=",
        "indicator": "&cm13="
    },
    "checkedDriver": {
        "drpVersion": "&cd10=",
        "driverDimension": "&cd2=",
        "indicator": "&cm14="
    },
    "failures": {
        "component": "&cd8=",
        "count": "&cm11="
    },
    "targets": {
        "component": "&cd8=",
        "count": "&cm15="
    },
    "runningSoft": {
        "drpVersion": "&cd10=",
        "softName": "&cd9=",
        "count": "&cm16="
    }


};

/*===============================================================*/
/* Можно вызов организовать по ID элемента. Это работает */

/*
 
 $('#testId').click(function(){
 drpExitCount();
 });
 
 */
/*=====================================================================*/

//(10) Отчет. Запускаемое ПО
//Вызов wpi.js (function wpi(name,sorce), стр.9)
function runningSoft(soft) {
    reportType = "10.Запускаемое ПО";
    var drpVersion = version + verType;
    var params = constantParams + report.runningSoft.drpVersion + drpVersion + report.runningSoft.softName + soft + report.runningSoft.count + 1;
    sendRequest(params);
}

//(13) Отчет. Цели
function targets(component, switched) {
    reportType = "13.Цели";
    var params = constantParams + report.targets.component + component + report.targets.count + 1;
    sendRequest(params);

    failures(component, switched);
}

//(3) Отчет. Отказы
function failures(component, switched) {
    if (switched) {
        if (!isAction) {
            reportType = "3.Отказы";
            var params = constantParams + report.failures.component + currentComponent + report.failures.count + 1;
            sendRequest(params);
        }
        isAction = false;
        currentComponent = component;
    }
    else {
        isAction = true;
    }
}

//(8)Отчет У каких драйверов стояла галочка для установки 
//Вызов: online_downloader.js (function recalculate(), стр.373)
function checkedDriver(element) {
    reportType = "8.У каких драйверов стояла галочка для установки";
    var driver = $(element).parent()[0]['cells'][1]['innerText'];
    var drpVersion = version + verType;

    var params = constantParams + report.checkedDriver.drpVersion + drpVersion +
            report.checkedDriver.driverDimension + driver +
            report.checkedDriver.indicator + 1;
    sendRequest(params);
}

//(6)Отчет У какого софта стояла галочка для установки 
//Вызов: program_downloader.js (function program_recalculate(), стр. 157)
function checkedSoft(element) {
    reportType = "6.У какого софта стояла галочка для установки";
    var soft = $(element).parent()[0]['cells'][1]['innerText'];
    var drpVersion = version + verType;

    var params = constantParams + report.checkedSoft.drpVersion + drpVersion +
            report.checkedSoft.softDimension + soft +
            report.checkedSoft.indicator + 1;
    sendRequest(params);
}

//(12)Отчет "Ошибки"
//Вызов из error.js
function drpErrors(msg, url, linenumber, lfn) {
    reportType = "12.Ошибки";
    errorTime = new Date().getTime();

    var textLength = 40;
    var name = "Undefined";
    if (msg != null) {
        if (msg.length > textLength) {
            name = "ERROR: " + msg.substr(0, textLength) + "..." + "; Line: " + linenumber + "; Last function: " + lfn;
        }
        else {
            name = "ERROR: " + msg + "; In the module: " + url + "; Line: " + linenumber + "; Last function: " + lfn;
        }
    }
    var drpVersion = version + verType;

    var params = constantParams + report.drpErrors.drpVersion + drpVersion + report.drpErrors.name + name + report.drpErrors.count + 1;
    sendRequest(params);

    failures(currentComponent);
}

//(4)Отчет Данные аппаратного обеспечения
//Вызов из DriverPackSolution.html (строка 510)
function hardwareData() {
    reportType = "4.Данные аппаратного обеспечения";

    var value = 1;

    var data = system_comp + ManufacturerClean(Manufacturer) + " " + Model.replace(ManufacturerClean(Manufacturer));
    var params = constantParams + report.hardwareData.userIdDimension + cid + report.hardwareData.data + data + report.hardwareData.count + value;
    sendRequest(params);

    data = system_BIOS + ManufacturerClean(wpi('Manufacturer', 'Win32_BIOS')) + ' ' + wpi('SMBIOSBIOSVersion', 'Win32_BIOS');
    params = constantParams + report.hardwareData.userIdDimension + cid + report.hardwareData.data + data + report.hardwareData.count + value;
    sendRequest(params);

    data = system_processor + CPU + "  -  " + system_procTemp.replace(/ :: /gi, "<br>") + " : " + cpu_get();
    params = constantParams + report.hardwareData.userIdDimension + cid + report.hardwareData.data + data + report.hardwareData.count + value;
    sendRequest(params);

    data = system_memory + (RAM / 1024).toPrecision(2) + " Gb";
    params = constantParams + report.hardwareData.userIdDimension + cid + report.hardwareData.data + data + report.hardwareData.count + value;
    sendRequest(params);

    data = system_HDD + statisticsHdd_detect() + "; " + statisticsHddFreeSpace_detect();
    params = constantParams + report.hardwareData.userIdDimension + cid + report.hardwareData.data + data + report.hardwareData.count + value;
    sendRequest(params);

    data = "OS:" + wpi('Caption', 'Win32_OperatingSystem').replace(/Microsoft /i, "") + " " +
            wpi('CSDVersion', 'Win32_OperatingSystem').replace(/Service Pack /i, "SP") + " " +
            wpi('OSArchitecture', 'Win32_OperatingSystem');
    params = constantParams + report.hardwareData.userIdDimension + cid + report.hardwareData.data + data + report.hardwareData.count + value;
    sendRequest(params);

    data = antivirus_title + antivirus_detect();
    params = constantParams + report.hardwareData.userIdDimension + cid + report.hardwareData.data + data + report.hardwareData.count + value;
    sendRequest(params);

    data = system_video + GPU;
    params = constantParams + report.hardwareData.userIdDimension + cid + report.hardwareData.data + data + report.hardwareData.count + value;
    sendRequest(params);
}

//(11)Отчет Событие «закрытие программы»
//Вызов из onExit.js (window.onbeforeunload = function())
function drpExitCount() {
    reportType = "11.Событие «закрытие программы»";
    var drpVersion = version + verType;
    var exitType = "Закрыто в нормальном режиме";
    var exitTime = new Date().getTime();
    if (exitTime - errorTime > 60000) {
        exitType = "Закрыто в аварийном режиме";
    }

    var params = constantParams + report.drpExitCount.userIdDimension + cid + report.drpExitCount.drpVersion + drpVersion +
            report.drpExitCount.drpExitType + exitType + report.drpExitCount.drpExitCountMeasure + 1;
    sendRequest(params);
}
window.onbeforeunload = (drpExitCount);
//(5)Отчет Данные установленного на компьютере ПО
//Вызов: 
//1.program_downloader.js (function getPrograms(), стр. 91)
//2.online_downloader.js (function sendPost(url, not_installed, installed), стр.218)
function installedSoft(soft) {
    reportType = "5.Данные установленного на компьютере ПО";
    var params = constantParams + report.installedSoft.userIdDimension + cid + report.installedSoft.data + soft + report.installedSoft.indicator + 1;
    sendRequest(params);
}


//(7)Отчет Количество установок софта
//soft - название софта
//failure = 1 - неудачная установка. Если софт установился failure = 0
//Вызов: program_downloader.js ($('.programs').on('click', '.programs_download', function (), стр.414)
function softInstallationCount(soft, failure) {
    reportType = "7.Количество установок софта";
    var params = constantParams + report.softInstallationCount.softDimension + soft +
            report.softInstallationCount.totalInstallCountMeasure + 1 +
            report.softInstallationCount.failureInstallCountMeasure + failure;
    sendRequest(params);
}

//(9)Отчет Количество установок драйвера
//driver - название драйвера
//failure = 1 - неудачная установка. Если драйвер установился failure = 0
//Вызов: online_downloader.js ($('#driver_online').on('click', '.drivers_download', function(), стр.600)
function driversInstallationCount(driver, failure) {
    reportType = "9.Количество установок драйвера";
    var params = constantParams + report.driversInstallationCount.driverDimension + driver +
            report.driversInstallationCount.totalInstallCountMeasure + 1 +
            report.driversInstallationCount.failureInstallCountMeasure + failure;
    sendRequest(params);
}

//(2)Отчет Время установки компонент DRP
//component - название устанавливаемого компонента
//interval - время установки в секундах
//Вызов:
//1. drp_install.js (InstallAll: function(), стр.124)
//2. program_downloader.js ($('.programs').on('click', '.programs_download', function (), стр.414)
//3. online_downloader.js ($('#driver_online').on('click', '.drivers_download', function(), стр.600)
function drpInstall(component, interval) {
    reportType = "2.Время установки компонент DRP";
    var params = constantParams + report.drpInstall.userIdDimension + cid + report.drpInstall.component + component +
            report.drpInstall.drpInstallationTimeMeasure + interval + report.drpInstall.count + 1;
    sendRequest(params);
}

//(1)Отчет Количество запусков DRP
//Вызов из init.js (function onload(func))
function drpStartCount() {
    reportType = "1.Количество запусков DRP";
    var drpVersion = version + verType;
    if (count == 0) {
        count++;
        var params = constantParams + report.drpStartCount.userIdDimension + cid + report.drpStartCount.drpVersion + drpVersion + report.drpStartCount.drpStartsCountMeasure + 1;
        sendRequest(params);
    }
}
onload(drpStartCount);



//Отправка запроса
function sendRequest(params) {
    try {
        sendXMLHttpRequest(params);
    }
    catch (e) {
        sendAjaxRequest(params);
    }
}

// Данная функция создаёт кроссбраузерный объект XMLHTTP 
function getXmlHttp() {
    var xmlhttp;
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
    return xmlhttp;
}

//Отправка 	XMLHttp запроса
function sendXMLHttpRequest(params) {
    try {
        var xmlhttp = getXmlHttp();
        xmlhttp.open("POST", address, false);
        xmlhttp.setRequestHeader("Content-Type", "text/html");
        xmlhttp.send(params);
        var data = xmlhttp.responseText;
//		alert(reportType + " : params = " + params + "; xmlhttp.responseText = " + data);
    }
    catch (e) {
        saveRequestParams(params);
    }
}

//Отправка Ajax запроса
function sendAjaxRequest(params) {
    $.ajax({
        type: 'POST',
        url: address,
        crossDomain: true,
        data: params,
        dataType: 'text',
        success: function (responseData)
        {
            //               alert(reportType + ": response = " + responseData + "; params = " + params);
        },
        error: function (errorThrown)
        {
            saveRequestParams(params);
//               alert(reportType + ": error = " + errorThrown);
        }
    });
}

//Сохранение параметров запроса в файл
function saveRequestParams(params) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (fso.FileExists(paramsPath)) {
        var file = fso.OpenTextFile(paramsPath, 8);
        var data = file.WriteLine(params);
        file.Close();
    }
    else {
        var file = fso.CreateTextFile(paramsPath, true);
        var data = file.WriteLine(params);
        indexfile.Close();
    }
}

//Сохранение идентификатора пользователя в файл
function saveUserId(userId) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (!fso.FileExists(userPath)) {
        var file = fso.CreateTextFile(userPath, true);
        var data = file.WriteLine(userId);
        file.Close();
    }
}

//Получение идентификатора пользователя из файла
//var executeFileName = "DriverPack-Solution_23423423.23423423.exe";
//executeFileName.slice(executeFileName.lastIndexOf("_") + 1, executeFileName.lastIndexOf(".")); 
function getUserId() {
    var userId;
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (fso.FileExists(userPath)) {
        var file = fso.OpenTextFile(userPath);
        userId = file.ReadLine();
        file.Close();
    }
    else {
        if (executeFileName !== undefined) {
            userId = getClientId(executeFileName);
        } else {
            userId = generateUUID();
        }
        saveUserId(userId);
    }
    return userId;
}

//Подсчет количества строк (параметров) сохраненных в файле
function getFileLines(filepath) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var file = fso.GetFile(filepath);
    var size = file.Size; // Объем файла
    file = fso.OpenTextFile(filepath);
    file.Skip(size); // Перемещаем указатель в конец файла
    var lines = file.Line - 1; // Количество строк
    file.Close();
    return lines;
}

//отсылка параметров из файла
function sendFromFile() {
    var fso = new ActiveXObject("Scripting.FileSystemObject"); // Создаем объект
    if (fso.FileExists(paramsPath)) {
        var params;
        var file = fso.OpenTextFile(paramsPath, 1, false);
        var lines = getFileLines(paramsPath);
        var i = 0;
        while (i < lines)
        {
            params = file.ReadLine(); // Чтение строк файла
            try {
                sendXMLHttpRequest(params);
            }
            catch (e) {
                sendAjaxRequest(params);
            }
            i++;
        }
        file.Close();
        deleteFile();
    }
}

function deleteFile() {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    fso.DeleteFile(paramsPath, true);
}

//Генерация идентификатора пользователя
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
}

//Получение идентификатора пользователя из статистики
function getClientId(executeFileName) {
    var dot = executeFileName.lastIndexOf(".");
    var _ = executeFileName.lastIndexOf("_");
    var id = executeFileName.slice(_ + 1, dot).replace(/\(.*?\)/gim, "");
    return id;
}





