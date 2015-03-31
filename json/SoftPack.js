var softJsonNew = {
    "soft": [{
            appName: 'Skype',
            version: '6.16.0.105',
            date: '1.5.2015',
            os: 'XP,7,8,10',
            osbit: '32,64',
            languages: 'ru,en,de',
            screenshots: {
                'home': 'http://skype.com/home.jpg',
                'call': 'http://www.skypeassets.com/i/ui-library/images/components/icons/icons-medium-blue.png'
            },
            favicon: 'http://www.skypeassets.com/i/common/images/icons/favicon.ico',
            category: 'Месседжер',
            downloadUrl: 'http://download.drp.su/soft/Skype.exe',
            cmd1: 'Socials',
            cmd2: '/VERYSILENT /NOLAUNCH /NOGOOGLE /NOSTARTUP /NOPLUGINS',
            check: "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\\\DisplayName",
            'default': true,
            hiddenMode: true,
            size: '32MB',
            onCompleteInstallation: function () {
                alert('Skype is installed');
            }
        },
        {
            appName: '7-Zip',
            version: '11.0.06',
            category: 'Архиватор',
            downloadUrl: 'http://download.drp.su/soft/7-Zip.exe',
            cmd1: 'Archive',
            cmd2: '-ai -gm2 -fm0',
            check: 'HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{AC76BA86-7AD7-1049-7B44-AB0000000001}\\DisplayName',
            'default': true,
            hiddenMode: true,
            size: '18MB',
            onCompleteInstallation: function () {
                alert('Adobe Reader is installed');
            }
        }]
};

var softJsonDB = {
    "soft": [{
            "ID": "3",
            "Name": "7-Zip",
            "URL": "http:\/\/download.drp.su\/soft\/7-Zip.exe",
            "Version": "9.30",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-07-30 00:00:00",
            "Registry_32": "HKEY_CURRENT_USER\\\\SOFTWARE\\\\7-Zip\\\\Path",
            "Registry_64": "HKEY_CURRENT_USER\\\\Software\\\\7-Zip\\\\Path64",
            "Keys": "-aixy -fm0 -gm2",
            "Lang": ""
        }, {
            "ID": "5",
            "Name": "Opera",
            "URL": "http:\/\/download.drp.su\/soft\/OperaBlink.exe",
            "Version": "23.0.1522.72",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-09-01 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Opera 23.0.1522.72\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Opera 23.0.1522.72\\\\DisplayName",
            "Keys": "-install -silent -launchopera=1 -setdefaultbrowser=1",
            "Lang": "['ru','tt','uk','az','be','uz','hy','ka','fr','de']"
        }, {
            "ID": "7",
            "Name": "\u042f\u043d\u0434\u0435\u043a\u0441.\u042d\u043b\u0435\u043c\u0435\u043d\u0442\u044b",
            "URL": "http:\/\/download.drp.su\/soft\/YandexPack.exe",
            "Version": "7.2",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-07-30 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\\\DisplayName",
            "Keys": "\/quiet",
            "Lang": "rus"
        }, {
            "ID": "13",
            "Name": "WinRAR",
            "URL": "http:\/\/download0.drp.su\/soft\/WinRAR.exe",
            "Version": "5.11",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-09-01 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\WinRAR archiver\\\\DisplayName",
            "Registry_64": "HKEY_CURRENT_USER\\\\Software\\\\WinRAR SFX\\\\C%%Program Files%WinRAR",
            "Keys": "\/S",
            "Lang": ""
        }, {
            "ID": "9",
            "Name": "Foxit PDF Reader",
            "URL": "http:\/\/download.drp.su\/soft\/FoxitReader.exe",
            "Version": "6.2.3.0815",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-09-01 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Foxit Reader\\\\DisplayName",
            "Registry_64": "HKEY_CURRENT_USER\\\\Software\\\\Foxit Software\\\\Foxit Reader 6.0\\\\Windows\\\\bShowStatusBar",
            "Keys": "-ai1MUD -gm2 -fm0",
            "Lang": ""
        }, {
            "ID": "10",
            "Name": "Codec Pack",
            "URL": "http:\/\/download.drp.su\/soft\/SAMCoDeCs.exe",
            "Version": "5.60",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-07-30 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\SAM CoDeC Pack\\\\DisplayName",
            "Registry_64": "HKEY_CURRENT_USER\\\\Software\\\\SamLab.ws\\\\SAM CoDeC Pack\\\\Install_Dir",
            "Keys": "\/S",
            "Lang": "['ru','tt','uk','az','be','uz','hy','ka']"
        }, {
            "ID": "11",
            "Name": "Skype",
            "URL": "http:\/\/download.drp.su\/soft\/Skype.exe",
            "Version": "6.18.0.106",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-07-30 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\\\DisplayName",
            "Keys": "\/VERYSILENT \/NOLAUNCH \/NOGOOGLE \/NOSTARTUP \/NOPLUGINS",
            "Lang": ""
        }, {
            "ID": "12",
            "Name": "uTorrent",
            "URL": "http:\/\/download.drp.su\/soft\/uTorrent.exe",
            "Version": "3.4.2.33394",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-09-01 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\uTorrent\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\uTorrent\\\\DisplayName",
            "Keys": "\/S",
            "Lang": ""
        }, {
            "ID": "14",
            "Name": "PotPlayer",
            "URL": "http:\/\/download.drp.su\/soft\/PotPlayer.exe",
            "Version": "1.6.49608",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-09-01 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\PotPlayer\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\PotPlayer\\\\DisplayName",
            "Keys": "\/S \/Video-1 \/Audio-0 \/Sub-1 \/Lists-0 \/Shortcut-1010110 \/AutoPlayVideo-1 \/AutoPlayAudio-0 \/ImpIni",
            "Lang": ""
        }, {
            "ID": "15",
            "Name": "AIMP",
            "URL": "http:\/\/download.drp.su\/soft\/AIMP3.exe",
            "Version": "3.55.1355",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-07-30 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\AIMP3\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\AIMP3\\\\DisplayName",
            "Keys": "\/AUTO=\"%PROGRAMFILES%\\\\AIMP3\"",
            "Lang": ""
        }, {
            "ID": "16",
            "Name": "QIP",
            "URL": "http:\/\/download0.drp.su\/soft\/QIP2012.exe",
            "Version": "4.0.9379",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-07-30 00:00:00",
            "Registry_32": "HKEY_CURRENT_USER\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\QIP 2012_is1\\\\DisplayName",
            "Registry_64": "HKEY_CURRENT_USER\\\\Software\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\QIP 2012_is1\\\\DisplayName",
            "Keys": "\/VERYSILENT \/NORESTART \/tasks=install,normal,iconpackplus",
            "Lang": ""
        }, {
            "ID": "17",
            "Name": "FastStone Image Viewer",
            "URL": "http:\/\/download.drp.su\/soft\/FSImage.exe",
            "Version": "5.1",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-07-30 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\FastStone Image Viewer\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\FastStone Image Viewer\\\\DisplayName",
            "Keys": "\/VERYSILENT \/NORESTART",
            "Lang": ""
        }, {
            "ID": "18",
            "Name": "TeamViewer",
            "URL": "http:\/\/download.drp.su\/soft\/TeamViewer.exe",
            "Version": "9.0.31064",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-09-01 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\TeamViewer 9\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\TeamViewer 9\\\\DisplayName",
            "Keys": "\/S",
            "Lang": ""
        }, {
            "ID": "19",
            "Name": "AOMEI Backupper",
            "URL": "http:\/\/download.drp.su\/soft\/Backupper.exe",
            "Version": "2.0.2",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-09-01 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09D}_is1\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09F}_is1\\\\DisplayName",
            "Keys": "\/VERYSILENT \/NORESTART",
            "Lang": ""
        }, {
            "ID": "20",
            "Name": "Adobe Flash Player",
            "URL": "http:\/\/download0.drp.su\/soft\/FlashPlayer.exe",
            "Version": "14.0.0.176",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-09-01 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Adobe Flash Player ActiveX\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\MozillaPlugins\\\\@adobe.com\/FlashPlayer\\\\Description",
            "Keys": "-y -gm2 -fm0",
            "Lang": ""
        }, {
            "ID": "21",
            "Name": "DirectX",
            "URL": "http:\/\/download.drp.su\/soft\/DirectX.exe",
            "Version": "9.0c",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-07-30 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\.NETFramework\\\\AssemblyFolders\\\\DX_1.0.2911.0\\\\",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\.NETFramework\\\\AssemblyFolders\\\\DX_1.0.2911.0\\\\",
            "Keys": "",
            "Lang": ""
        }, {
            "ID": "22",
            "Name": "Microsoft Visual C++",
            "URL": "http:\/\/download.drp.su\/soft\/VisualCplus.exe",
            "Version": "2005-2013",
            "ReleaseDate": "2014-07-30",
            "UpdateDate": "2014-07-30 00:00:00",
            "Registry_32": "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\\\DisplayName",
            "Registry_64": "HKLM\\\\SOFTWARE\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\\\DisplayName",
            "Keys": "",
            "Lang": "ru"
        }]
};