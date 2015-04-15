var folderReport = AppData + '\\DRPSu\\Reports';
var fileReport = folderReport + "\\SoftPack.txt";
FSO.OpenTextFile(fileReport, 2, true);
function echo(str) {

    //Записываем вывод в файл
    if (!FSO.FolderExists(folderReport + "\\")) {
        FSO.CreateFolder(folderReport)
    }
    var fileReportOpen = FSO.OpenTextFile(fileReport, 8, true);
    fileReportOpen.WriteLine(str);
    fileReportOpen.WriteLine('');
    fileReportOpen.close();
}