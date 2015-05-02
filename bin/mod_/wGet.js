
var wGet = {
    get: function (url, folder) {
        if (fso.FileExists('Tools\\wget.exe')) {
            if (!this.exists(folder + "\\" + fso.GetFileName(url))) {
                if (!fso.FolderExists(folder)) {
                    fso.CreateFolder(folder);
                }
                WshShell.Run('"Tools\\wget.exe" -P "' + folder + '" ' + url + " -o " + folder + fso.GetFileName(url).slice(0, fso.GetFileName(url).lastIndexOf(".")) + ".txt", 0, true);
                return true;
            } else {
                return false;
            }
        }
    },
    size: function (url, folder) {
        if (fso.FileExists('Tools\\wget.exe')) {
            if (!this.exists(folder + "\\" + fso.GetFileName(url))) {
                WshShell.Run('"Tools\\wget.exe" --spider -o "' + folder + "\\" + fso.GetFileName(url).replace(/\.exe/g, "").replace(/\.zip/g, "") + ".txt" + '" ' + url, 0, true);
                return ret;
            } else {
                return false;
            }
        }
    },
    exists: function (file) {

        if (fso.FileExists(file)) {
            return true;
        } else {
            return false;
        }
    }


};