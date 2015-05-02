var folderReport = AppData + '\\DRPSu\\Reports';
var fileReport = folderReport + "\\SoftPack.txt";
fso.OpenTextFile(fileReport, 2, true);
function echo(str) {

    //Записываем вывод в файл
    if (!fso.FolderExists(folderReport + "\\")) {
        fso.CreateFolder(folderReport)
    }
    var fileReportOpen = fso.OpenTextFile(fileReport, 8, true);
    fileReportOpen.WriteLine(str);
    fileReportOpen.WriteLine('');
    fileReportOpen.close();
}