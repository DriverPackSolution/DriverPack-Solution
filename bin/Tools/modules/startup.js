// Toggle "home page" checkbox
function chk_StartP_Click() {
	lf('chk_StartP_Click');
	if (document.getElementById('chk_startPage').checked)
		set_home_page();
	else
		restore_home_page();
}

// Set home page
function set_home_page() {
	lf('set_home_page');
	if (document.getElementById('chk_startPage').checked) {
		spiIE("http://start.drp.su/");
		spiFF("http://start.drp.su/");
	}
}

/*
if (startPageIns) {
	document.getElementById('chk_startPage').checked = true;
	set_home_page();
}
else
{
	//document.getElementById('chk_startPage').checked = false;
}
*/

// Restore previous home page
function restore_home_page() {
	lf('restore_home_page');
	StartPage = RegRead("HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\Start Page");
	spiIEv = RegRead("HKCU\\SOFTWARE\\drpsu\\spiIE");
	spiFFv = RegRead("HKCU\\SOFTWARE\\drpsu\\spiFF");
	if ((StartPage == "http://start.drp.su/") && (spiIEv)) {
		WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\Main" /v "Start Page" /d "' + spiIEv + '" /f',0,true);
		document.getElementById('chk_startPage').checked = false;
		spiFF(spiFFv);
		alert(alert_startOK);
	}
	else
		alert(alert_startError);
}


// Change home page for IE
function spiIE(address) {
	lf('spiIE');
	var StartPage = RegRead("HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\Start Page");
	if (StartPage != address) {
		WshShell.RegWrite("HKCU\\SOFTWARE\\drpsu\\spiIE",StartPage,"REG_SZ");
		WshShell.Run('reg add "HKCU\\Software\\Microsoft\\Internet Explorer\\Main" /v "Start Page" /d "' + address + '" /f',0,false);
	}
}

// Change home page for Firefox
function spiFF(StartupPage) {
	lf('spiFF');
	var FirefoxDir = WshEnv("APPDATA") + '\\Mozilla\\Firefox\\';
	//var StartupPage = "http://start.drp.su/";
	if ((fso.FolderExists(FirefoxDir)) && (fso.FileExists(FirefoxDir + 'profiles.ini'))) {
		profileIni = fso.OpenTextFile(FirefoxDir + 'profiles.ini', 1, false).ReadAll();

		var rege = new RegExp("Path=([\\S]+default)","ig");
		rege.exec(profileIni);
		profileDir = RegExp.$1;
		profileDir = FirefoxDir+profileDir.replace("/","\\");

		FirefoxConfFile = profileDir+"\\prefs.js";
		if ((fso.FolderExists(profileDir)) && (fso.FileExists(FirefoxConfFile))) {
			FirefoxConfR = fso.OpenTextFile(FirefoxConfFile, 1, false).ReadAll();
			//alert(FirefoxConfR);

			var regSP2 = new RegExp('browser.startup.homepage\",[\\s]*\"([\\S]+)\"\\);',"ig");
			regSP2.exec(FirefoxConfR);
			spiFF_old = RegExp.$1;
			if (spiFF_old == profileDir) spiFF_old = "";

			if (spiFF_old != StartupPage) {
				if (spiFF_old != "http://start.drp.su/") WshShell.RegWrite ("HKCU\\SOFTWARE\\drpsu\\spiFF", spiFF_old, "REG_SZ");

				FirefoxConfW = fso.OpenTextFile(FirefoxConfFile, 8, false);
				FirefoxConfW.WriteLine('user_pref("browser.startup.homepage", "' + StartupPage + '");');
				FirefoxConfW.Close();
			}
		}
	}
}
