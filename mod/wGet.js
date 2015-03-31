
var wGet = {
    get: function (url, folder) {
        if (FSO.FileExists('tool\\wget.exe')) {
            if (!this.exists(folder + "\\" + FSO.GetFileName(url))) {
                if (!FSO.FolderExists(folder)) {
                    FSO.CreateFolder(folder);
                }
                WshShell.Run('"tool\\wget.exe" -P "' + folder + '" ' + url + " -o " + folder + FSO.GetFileName(url).slice(0, FSO.GetFileName(url).lastIndexOf(".")) + ".txt", 0, true);
                return true;
            } else {
                return false;
            }
        }
    },
    size: function (url, folder) {
        if (FSO.FileExists('tool\\wget.exe')) {
            if (!this.exists(folder + "\\" + FSO.GetFileName(url))) {
                WshShell.Run('"tool\\wget.exe" --spider -o "' + folder + "\\" + FSO.GetFileName(url).replace(/\.exe/g, "").replace(/\.zip/g, "") + ".txt" + '" ' + url, 0, true);
                return ret;
            } else {
                return false;
            }
        }
    },
    exists: function (file) {

        if (FSO.FileExists(file)) {
            return true;
        } else {
            return false;
        }
    }


};