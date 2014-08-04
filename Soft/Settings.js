//// Drivers ////


// PhysX
for (var i = 0; i < buttonCount; i++) {
	if (((button_div[i]=='driver_available')||(button_div[i]=='driver_new')||(button_div[i]=='driver_uptodate'))
			&& (button_pack_desc[i]==synonym_video_nvidia)
			&& (button_dev_name[i].toUpperCase().indexOf('NVIDIA') != -1)){
		
		prog[pn]='NVIDIA PhysX';
		version[pn]='9.13.1220';
		cat[pn]=startpack_Drivers;
		cmd1[pn]='PhysX.exe';
		cmd2[pn]='';
		if (is64){
			check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{8B922CF8-8A6C-41CE-A858-F1755D7F5D29}\\DisplayName';
		} else {
			check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{8B922CF8-8A6C-41CE-A858-F1755D7F5D29}\\DisplayName';
		}
		defaul[pn]=true;
		wshow[pn]=true;
		onCompleteInst[pn]='defaul['+pn+']=false;';
		pn++;
		
		break;
	}
}


// DRPSu Updater
//prog[pn]='Driver Updater';
//version[pn]='0.0.25.0';
//cat[pn]=startpack_Drivers;
//cmd1[pn]='DrvUpdater.exe';
//cmd2[pn]='';
//check[pn]='HKEY_USERS\\S-1-5-21-2644774118-2097645955-2881486694-1001\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\DRPSu Updater\\DisplayName1';
//defaul[pn]=true;
//wshow[pn]=true;
//onCompleteInst[pn]='defaul['+pn+']=false;';
//pn++;




//// System ////


// DirectX
prog[pn]='DirectX';
version[pn]='9.0c June 2010';
cat[pn]=startpack_Needs;
cmd1[pn]='DirectX.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\.NETFramework\\AssemblyFolders\\DX_1.0.2911.0\\';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\.NETFramework\\AssemblyFolders\\DX_1.0.2911.0\\';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// SAM CoDeC Pack
prog[pn]='Codec Pack';
version[pn]='5.50';
cat[pn]=startpack_Needs;
cmd1[pn]='SAMCoDeCs.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\SamLab.ws\\SAM CoDeC Pack\\Install_Dir';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\SAM CoDeC Pack\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Flash Player
prog[pn]='Flash Player';
version[pn]='13.0.0.214';
cat[pn]=startpack_Needs;
cmd1[pn]='FlashPlayer.exe';
cmd2[pn]='-y -gm2 -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\MozillaPlugins\\@adobe.com/FlashPlayer\\Description';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Adobe Flash Player ActiveX\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Shockwave Player
prog[pn]='Shockwave Player';
version[pn]='12.1.0.150';
cat[pn]=startpack_Needs;
cmd1[pn]='Shockwave.exe';
cmd2[pn]='-y -gm2 -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Adobe Shockwave Player + Authorware Web Player\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Adobe Shockwave Player + Authorware Web Player\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// RuntimePack
prog[pn]=(rusLang?'Системные библиотеки':'System Libraries');
version[pn]='14.4.12';
cat[pn]=startpack_Needs;
cmd1[pn]='RuntimeRun.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\SamLab.ws\\RuntimePack\\Version';
} else {
	check[pn]='HKEY_CURRENT_USER\\Software\\SamLab.ws\\RuntimePack\\Version';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Visual C++
prog[pn]='Microsoft Visual C++';
version[pn]='2005-2013';
cat[pn]=startpack_Needs;
cmd1[pn]='VisualCplus.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{F0C3E5D1-1ADE-321E-8167-68EF0DE699A5}\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// .Net Framework 3.5 для Windows 8.x [x86\x64]
if (OSVersion == 6.3) {
prog[pn]='.Net Framework';
version[pn]='3.5';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNet8.exe';
cmd2[pn]='/ai1';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{1AD147D0-BE0E-3D6C-AC11-64F6DC4163F1}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{1AD147D0-BE0E-3D6C-AC11-64F6DC4163F1}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// .Net FrameWork 1.1-4.0 для Windows XP SP3 [x86]
if (OSVersion == 5.1) {
prog[pn]='.Net FrameWork';
version[pn]='4.0';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNetXP.exe';
cmd2[pn]='-ai -nf';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{3C3901C5-3455-3E0A-A214-0B093A5070A6}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{3C3901C5-3455-3E0A-A214-0B093A5070A6}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// .Net FrameWork 4.5.2 для Windows 7 SP1 [x86\x64]
if (OSVersion == 6.1) {
prog[pn]='.Net FrameWork';
version[pn]='4.5.2';
cat[pn]=startpack_Needs;
cmd1[pn]='DotNet7.exe';
cmd2[pn]='-y ! NR';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{1AD147D0-BE0E-3D6C-AC11-64F6DC4163F1}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{1AD147D0-BE0E-3D6C-AC11-64F6DC4163F1}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// AOMEI Backupper
prog[pn]='AOMEI Backupper';
version[pn]='2.0';
cat[pn]=startpack_Needs;
cmd1[pn]='Backupper.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09F}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{A83692F5-3E9B-4E95-9E7E-B5DF5536C09D}_is1\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Silverlight
prog[pn]='Silverlight';
version[pn]='5.1.30214.0';
cat[pn]=startpack_Needs;
cmd1[pn]='Silverlight.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Silverlight\\UpdateMode';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{89F4137D-6C26-4A84-BDB8-2E5A4BB71E00}\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Java
prog[pn]='Java Runtime';
version[pn]='7.0.55';
cat[pn]=startpack_Needs;
cmd1[pn]='Java.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{26A24AE4-039D-4CA4-87B4-2F83217013FF}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{26A24AE4-039D-4CA4-87B4-2F83217045FF}\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Viewers ////


// Adobe Reader
prog[pn]='Adobe Reader';
version[pn]='11.0.06';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/AdobeReader.exe';
cmd2[pn]='-ai -gm2 -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{AC76BA86-7AD7-1049-7B44-AB0000000001}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{AC76BA86-7AD7-1049-7B44-AB0000000001}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Foxit PDF Reader
prog[pn]='Foxit PDF Reader';
version[pn]='6.2.0.0429';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/FoxitReader.exe';
cmd2[pn]='-ai1MUD -gm2 -fm0';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Foxit Software\\Foxit Reader 6.0\\Windows\\bShowStatusBar';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Foxit Reader\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// FastStone Image Viewer
prog[pn]='FS Image Viewer';
version[pn]='5.0';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/FSImage.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\FastStone Image Viewer\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\FastStone Image Viewer\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Picasa
prog[pn]='Google Picasa';
version[pn]='3.9.137.118';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/Picasa.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Picasa 3\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Picasa 3\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// STDU Viewer
prog[pn]='STDU Viewer';
version[pn]='1.6.313';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/STDU.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\STDU Viewer_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\STDU Viewer_is1\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// SumatraPDF
prog[pn]='SumatraPDF';
version[pn]='2.6.8774';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/SumatraPDF.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\SumatraPDF\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\SumatraPDF\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// XnView
prog[pn]='XnView';
version[pn]='2.2.2';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/XnView.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\XnView_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\XnView_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// doPDF
prog[pn]='doPDF';
version[pn]='7.3.398';
cat[pn]=startpack_Viewers;
cmd1[pn]='Viewer/doPDF.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\doPDF 7 printer_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\doPDF 7 printer_is1\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Players ////


// AIMP
prog[pn]='AIMP';
version[pn]='3.55.1345';
cat[pn]=startpack_Players;
cmd1[pn]='Player/AIMP3.exe';
cmd2[pn]='/AUTO="%PROGRAMFILES%\\AIMP3"';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\AIMP3\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\AIMP3\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Foobar
prog[pn]='Foobar';
version[pn]='1.3.1';
cat[pn]=startpack_Players;
cmd1[pn]='Player/Foobar.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{BFB8681C-7D7F-44C8-BD68-E6AAB51EB734}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{BFB8681C-7D7F-44C8-BD68-E6AAB51EB734}_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// JetAudio
prog[pn]='JetAudio';
version[pn]='8.11.2010';
cat[pn]=startpack_Players;
cmd1[pn]='Player/JetAudio.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\JetAudio Plus VX\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\JetAudio Plus VX\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// KMPlayer
prog[pn]='KMPlayer';
version[pn]='3.8.0.122';
cat[pn]=startpack_Players;
cmd1[pn]='Player/KMPlayer.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{ACBA5A14-2D62-4820-8206-D768C74C1E10}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{ACBA5A14-2D62-4820-8206-D768C74C1E10}_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// MPC-BE
prog[pn]='MPC-BE';
version[pn]='1.4.3';
cat[pn]=startpack_Players;
cmd1[pn]='Player/MPC-BE.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{903D098F-DD50-4342-AD23-DA868FCA3126}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{903D098F-DD50-4342-AD23-DA868FCA3126}_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


if (rusLang) {
	// PotPlayer
	prog[pn]='PotPlayer';
	version[pn]='1.6.47995';
	cat[pn]=startpack_Players;
	cmd1[pn]='Player/PotPlayer.exe';
	cmd2[pn]='/S /Video-1 /Audio-0 /Sub-1 /Lists-0 /Shortcut-101011 /AutoPlayVideo-1 /AutoPlayAudio-0 /ImpIni';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PotPlayer\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PotPlayer\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
}
else {
	// PotPlayer
	prog[pn]='PotPlayer';
	version[pn]='1.6.47995';
	cat[pn]=startpack_Players;
	cmd1[pn]='Player/PotPlayer.exe';
	cmd2[pn]='/S /Video-1 /Audio-0 /Sub-1 /Lists-0 /Shortcut-101101 /ImpIni';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PotPlayer\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PotPlayer\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
}


// VLC
prog[pn]='VLC';
version[pn]='2.1.3';
cat[pn]=startpack_Players;
cmd1[pn]='Player/VLCMedia.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\VLC media player\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\VLC media player\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Winamp
prog[pn]='Winamp';
version[pn]='5.666.3516';
cat[pn]=startpack_Players;
cmd1[pn]='Player/Winamp.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Winamp\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Winamp\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Antivirus ////


// 360is
prog[pn]='360 Internet Security';
version[pn]='5.0.0.5000';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/360is.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\360 Internet Security\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\360 Internet Security\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Avast
prog[pn]='Avast Free';
version[pn]='9.0.2018';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/Avast.exe';
cmd2[pn]='/silent';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Avast\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Avast\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Avira
prog[pn]='Avira';
version[pn]='14.0.3.350';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/Avira.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Avira\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Avira\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// AVG
prog[pn]='AVG Free';
version[pn]='2014.4592';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/AVG.exe';
cmd2[pn]='/UILevel=silent /AppMode=setup /InstallToolbar=0 /ChangeBrowserSearchProvider=0 /InstallSidebar=0 /ParticipateProductImprovement=0 /DontRestart /DisableScan /KillProcessesIfNeeded';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\AVG\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\AVG\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Baidu
prog[pn]='Baidu Antivirus';
version[pn]='4.4.3.69503';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/Baidu.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Baidu Antivirus\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Baidu Antivirus\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// ClamWin
prog[pn]='ClamWin Free Antivirus';
version[pn]='0.98.1 MANUAL';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/ClamWin.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ClamWin Free Antivirus_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ClamWin Free Antivirus_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// COMODO
prog[pn]='Comodo Inet Security';
version[pn]='7.0.317799.4142';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/CISx'+(is64?'64':'86')+'.msi';
cmd2[pn]='msiexec /I CISx'+(is64?'64':'86')+'.msi INSTALLANTIVIRUS=1 INSTALLFIREWALL=1 /Passive /NoRestart';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{8899F0F2-03D8-4DDE-ADCA-4F0A7CE18A74}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{8899F0F2-03D8-4DDE-ADCA-4F0A7CE18A74}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// herdProtect Anti-Malware Scanner
prog[pn]='herdProtect Scanner';
version[pn]='1.0.3.5';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/herdProtectScan.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\herdProtectScan\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\herdProtectScan\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Malwarebytes Anti-Malware
prog[pn]='M-bytes Anti-Malware';
version[pn]='2.0.1.1004';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/Anti-Malware.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Malwarebytes Anti-Malware_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Malwarebytes Anti-Malware_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Malwarebytes Anti-Exploit
prog[pn]='M-bytes Anti-Exploit';
version[pn]='0.10.3.0100';
cat[pn]=startpack_Antivirus;
cmd1[pn]='Antivirus/Anti-Exploit.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Malwarebytes Anti-Exploit_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Malwarebytes Anti-Exploit_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Browsers ////


// Internet Explorer 8 для Windows XP
if (OSVersion == 5.1) {
prog[pn]='Internet Explorer 8';
version[pn]='8.0.7600.16385';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/IE8-XPx86.exe';
cmd2[pn]='/Q';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ie8\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ie8\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// Internet Explorer 10 для Windows 7
if (OSVersion == 6.1) {
prog[pn]='Internet Explorer 10';
version[pn]='10.0.9200.16438';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/IE10-7x'+(is64?'64':'86')+'.exe';
cmd2[pn]='/Q';
if (is64){
check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{B1DDC387-5E2C-4CF4-BD8B-05B65E987B0C}\\DisplayName';
} else {
check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{B1DDC387-5E2C-4CF4-BD8B-05B65E987B0C}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}


// COMODO Dragon
prog[pn]='COMODO Dragon';
version[pn]='33.0.0.0';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/DragonSetup.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Comodo Dragon\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Comodo Dragon\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Chrome
prog[pn]='Google Chrome';
version[pn]='34.0.1847.116';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/Chrome.exe';
cmd2[pn]='-install -silent';
if (is64){
	check[pn]='HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome\\DisplayName';
} else {
	check[pn]='HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Maxthon
prog[pn]='Maxthon';
version[pn]='4.4.0.4000';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/Maxthon.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Maxthon Browser 4_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Maxthon Browser 4_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


if (rusLang) {
	// Яндекс.Браузер
	prog[pn]=(rusLang?'Яндекс.Браузер':'Yandex.Browser');
	version[pn]='32.0.1700.12508';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Yandex.exe';
	cmd2[pn]='--silent --do-not-launch-browser';
	if (is64){
		check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\YandexBrowser\\DisplayName';
	} else {
		check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\YandexBrowser\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;


	// Элементы Яндекса
	prog[pn]=(rusLang?'Яндекс.Элементы':'Yandex.Elements');
	version[pn]='7.2';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/YandexPack.exe';
	cmd2[pn]='/quiet';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;

	// Firefox
	prog[pn]='Mozilla Firefox';
	version[pn]='29.0.1';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Firefox.exe';
	cmd2[pn]='-ms -ira';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Firefox 29.0.1 (x86 ru)\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Firefox 29.0.1 (x86 ru)\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;


	// Opera
	prog[pn]='Opera';
	version[pn]='21.0.1432.67';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Opera.exe';
	cmd2[pn]='-install -silent -setdefaultbrowser=1';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 21.0.1432.67\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 21.0.1432.67\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
	
}
else {

	// Яндекс.Браузер
	prog[pn]=(rusLang?'Яндекс.Браузер':'Yandex.Browser');
	version[pn]='32.0.1700.12508';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Yandex.exe';
	cmd2[pn]='--silent --do-not-launch-browser';
	if (is64){
		check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\YandexBrowser\\DisplayName';
	} else {
		check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\YandexBrowser\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;


	// Элементы Яндекса
	prog[pn]=(rusLang?'Яндекс.Элементы':'Yandex.Elements');
	version[pn]='7.2';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/YandexPack.exe';
	cmd2[pn]='/quiet';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{EE24665C-844A-4489-9F11-70E41F4EE476}\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
	
	
	// Firefox
	prog[pn]='Mozilla Firefox';
	version[pn]='29.0.1';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Firefox.exe';
	cmd2[pn]='-ms -ira';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Firefox 29.0.1 (x86 ru)\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Firefox 29.0.1 (x86 ru)\\DisplayName';
	}
	defaul[pn]=true;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
	
	
	// Opera
	prog[pn]='Opera';
	version[pn]='21.0.1432.67';
	cat[pn]=startpack_Browsers;
	cmd1[pn]='Browser/Opera.exe';
	cmd2[pn]='-install -silent';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 21.0.1432.67\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 21.0.1432.67\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
}


// Palemoon
prog[pn]='Palemoon';
version[pn]='24.4.1 MANUAL';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/Palemoon.exe';
cmd2[pn]='-ms -ira';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Pale Moon 24.4.1 (x86 en-US)\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Pale Moon 24.4.1 (x86 en-US)\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Iron
prog[pn]='SRWare Iron';
version[pn]='34.0.1850.0';
cat[pn]=startpack_Browsers;
cmd1[pn]='Browser/SRWareIron.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{C59CF2CE-B302-4833-AA35-E0E07D8EBC52}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{C59CF2CE-B302-4833-AA35-E0E07D8EBC52}_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Socials ////


// Mail.ru Агент
prog[pn]='Mail.ru Агент';
version[pn]='6.3.7760';
cat[pn]=startpack_Socials;
cmd1[pn]='Socials/MailRU.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MRA\\DisplayName';
} else {
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MRA\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Miranda
prog[pn]='Miranda NG';
version[pn]='0.94.9 MANUAL';
cat[pn]=startpack_Socials;
cmd1[pn]='Socials/Miranda.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Miranda NG_is1\\DisplayName';
} else {
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Miranda NG_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// QIP 2012
prog[pn]='QIP 2012';
version[pn]='4.0.9373';
cat[pn]=startpack_Socials;
cmd1[pn]='Socials/QIP2012.exe';
cmd2[pn]='/tasks=install,normal,iconpackplus';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\QIP 2012_is1\\DisplayName';
} else {
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\QIP 2012_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// R&Q
prog[pn]='R&Q';
version[pn]='1123';
cat[pn]=startpack_Socials;
cmd1[pn]='Socials/RnQ.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\RnQ\\DisplayName';
} else {
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\RnQ\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Skype
prog[pn]='Skype';
version[pn]='6.16.0.105';
cat[pn]=startpack_Socials;
cmd1[pn]='Socials/Skype.exe';
cmd2[pn]='/VERYSILENT /NOLAUNCH /NOGOOGLE /NOSTARTUP /NOPLUGINS';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{7A3C7E05-EE37-47D6-99E1-2EB05A3DA3F7}\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Internet ////


// Download Master
prog[pn]='Download Master';
version[pn]='5.20.1.1393';
cat[pn]=startpack_Internet;
cmd1[pn]='WWW/DownloadMaster.exe';
cmd2[pn]='/VERYSILENT /NORESTART /LOADINF="dmaster.ini"';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Download Master_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Download Master_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Free Download Manager
prog[pn]='Free Download Manager';
version[pn]='3.9.4.1474';
cat[pn]=startpack_Internet;
cmd1[pn]='WWW/FreeDownload.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Free Download Manager_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Free Download Manager_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// FileZilla
prog[pn]='FileZilla';
version[pn]='3.8.0';
cat[pn]=startpack_Internet;
cmd1[pn]='WWW/FileZilla.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\FileZilla Client\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\FileZilla Client\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// TeamViewer
prog[pn]='TeamViewer';
version[pn]='9.0.28223';
cat[pn]=startpack_Internet;
cmd1[pn]='WWW/TeamViewer.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\TeamViewer 9\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\TeamViewer 9\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// uTorrent
prog[pn]='uTorrent';
version[pn]='3.4.2.31515';
cat[pn]=startpack_Internet;
cmd1[pn]='WWW/uTorrent.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\uTorrent\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\uTorrent\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Files ////


// 7-Zip
prog[pn]='7-Zip';
version[pn]='9.30';
cat[pn]=startpack_Files;
cmd1[pn]='Files/7-Zip.exe';
cmd2[pn]='-aixy -fm0 -gm2';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\7-Zip\\Path64';
} else {
	check[pn]='HKEY_CURRENT_USER\\SOFTWARE\\7-Zip\\Path';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// HaoZip
prog[pn]='HaoZip';
version[pn]='4.3.1.9468';
cat[pn]=startpack_Files;
cmd1[pn]='Files/HaoZip.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\HaoZip Lite (x86)_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\HaoZip Lite (x86)_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Far Manager
prog[pn]='Far Manager';
version[pn]='3.0.3628';
cat[pn]=startpack_Files;
cmd1[pn]='Files/FarManager.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{9CD47852-24ED-426B-A940-427BC91456AF}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{9CD47852-24ED-426B-A940-427BC91456AF}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Recuva
prog[pn]='Recuva';
version[pn]='1.51.1063';
cat[pn]=startpack_Files;
cmd1[pn]='Files/Recuva.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Recuva\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Recuva\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Total Commander
prog[pn]='Total Commander';
version[pn]='8.50';
cat[pn]=startpack_Files;
cmd1[pn]='Files/TotalCmdPP.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Total Commander\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Total Commander\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Universal Extractor
prog[pn]='Universal Extractor';
version[pn]='1.7.9.95';
cat[pn]=startpack_Files;
cmd1[pn]='Files/UExtract.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Universal Extractor_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Universal Extractor_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// ViewFD
prog[pn]='ViewFD';
version[pn]='3.5.0';
cat[pn]=startpack_Files;
cmd1[pn]='Files/ViewFD.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ViewFD 3_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ViewFD 3_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// WinRAR
prog[pn]='WinRAR';
version[pn]='5.0.1';
cat[pn]=startpack_Files;
cmd1[pn]='Files/WinRAR.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\WinRAR SFX\\C%%Program Files%WinRAR';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\WinRAR archiver\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// System ////


// CPU-Z
prog[pn]='CPU-Z';
version[pn]='1.69.2';
cat[pn]=startpack_System;
cmd1[pn]='Inform/CPU-Z.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CPUID CPU-Z_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CPUID CPU-Z_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// CrystalDiskInfo
prog[pn]='CrystalDiskInfo';
version[pn]='6.1.12';
cat[pn]=startpack_System;
cmd1[pn]='Inform/CrystalDiskInfo.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CrystalDiskInfo_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CrystalDiskInfo_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// CrystalDiskMark
prog[pn]='CrystalDiskMark';
version[pn]='3.0.3a';
cat[pn]=startpack_System;
cmd1[pn]='Inform/CrystalDiskMark.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CrystalDiskMark_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CrystalDiskMark_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// HWiNFO
prog[pn]='HWiNFO';
version[pn]='4.38';
cat[pn]=startpack_System;
cmd1[pn]='Inform/HWiNFO.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\HWiNFO32_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\HWiNFO32_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// HWMonitor
prog[pn]='HWMonitor';
version[pn]='1.25';
cat[pn]=startpack_System;
cmd1[pn]='Inform/HWMonitor.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CPUID HWMonitor_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CPUID HWMonitor_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// OCCT
prog[pn]='OCCT';
version[pn]='4.4.0';
cat[pn]=startpack_System;
cmd1[pn]='Inform/OCCT.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\OCCT\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\OCCT\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// PC Wizard
prog[pn]='PC Wizard';
version[pn]='2013.2.12';
cat[pn]=startpack_System;
cmd1[pn]='Inform/PCWizard.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PC Wizard 2013_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\PC Wizard 2013_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Speccy
prog[pn]='Speccy';
version[pn]='1.25.674';
cat[pn]=startpack_System;
cmd1[pn]='Inform/Speccy.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Speccy\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Speccy\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


if (rusLang) {
// Апплеты панели управления
prog[pn]='Софт панели управ-я';
version[pn]='14.03b';
cat[pn]=startpack_System;
cmd1[pn]='Inform/CPLDAPU.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Дополнительные апплеты_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Дополнительные апплеты_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}
else {}




//// Drives ////


// Auslogics Disk Defrag
prog[pn]='Auslogics Disk Defrag';
version[pn]='4.5.3.0';
cat[pn]=startpack_Drives;
cmd1[pn]='Drives/AuslogicsDiskDefrag.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Auslogics DiskDefrag_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Auslogics DiskDefrag_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Defraggler
prog[pn]='Defraggler';
version[pn]='2.18.945';
cat[pn]=startpack_Drives;
cmd1[pn]='Drives/Defraggler.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Defraggler\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Defraggler\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Smart Defrag
prog[pn]='IObit Smart Defrag';
version[pn]='3.1.0.319';
cat[pn]=startpack_Drives;
cmd1[pn]='Drives/SmartDefrag.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Smart Defrag 3_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Smart Defrag 3_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Partition Wizard
prog[pn]='MiniTool Partition Wizard';
version[pn]='8.1.1';
cat[pn]=startpack_Drives;
cmd1[pn]='Drives/PartitionWizard.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{05D996FA-ADCB-4D23-BA3C-A7C184A8FAC6}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{05D996FA-ADCB-4D23-BA3C-A7C184A8FAC6}_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Paragon Partition Manager
prog[pn]='Paragon Partition Manager';
version[pn]='10.1.21.236';
cat[pn]=startpack_Drives;
cmd1[pn]='Drives/ParagonPartition.msi';
cmd2[pn]='/qb';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{47E5588F-C3A0-11DE-9857-005056C00008}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{47E5588F-C3A0-11DE-9857-005056C00008}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// AOMEI Partition Assistant
prog[pn]='Partition Assistant';
version[pn]='5.5';
cat[pn]=startpack_Drives;
cmd1[pn]='Drives/PartitionAssistant.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{02F850ED-FD0E-4ED1-BE0B-54981f5BD3D4}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{02F850ED-FD0E-4ED1-BE0B-54981f5BD3D4}_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Utilities ////


// Advanced SystemCare
prog[pn]='Advanced SystemCare';
version[pn]='7.2.1.434';
cat[pn]=startpack_Utilities;
cmd1[pn]='Utilities/SystemCare.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Advanced SystemCare 7_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Advanced SystemCare 7_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// CCleaner
prog[pn]='CCleaner';
version[pn]='4.13.4693';
cat[pn]=startpack_Utilities;
cmd1[pn]='Utilities/CCleaner.exe';
cmd2[pn]='-y -gm2 -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CCleaner\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\CCleaner\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// WinUtilities
prog[pn]='WinUtilities';
version[pn]='11.14';
cat[pn]=startpack_Utilities;
cmd1[pn]='Utilities/WinUtilities.exe';
cmd2[pn]='-ai1UM -gm2 -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\WinUtilities\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\WinUtilities\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Wise Care 365 Free
prog[pn]='Wise Care 365';
version[pn]='2.99.245';
cat[pn]=startpack_Utilities;
cmd1[pn]='Utilities/WiseCare365.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{E864A1C8-EEE1-47D0-A7F8-00CC86D26D5E}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{E864A1C8-EEE1-47D0-A7F8-00CC86D26D5E}_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Office ////


// AkelPad
prog[pn]='AkelPad';
version[pn]='4.8.8';
cat[pn]=startpack_Office;
cmd1[pn]='Office/AkelPad.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\AkelPad\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\AkelPad\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// LibreOffice
prog[pn]='LibreOffice';
version[pn]='4.2.2.1';
cat[pn]=startpack_Office;
cmd1[pn]='Office/LibreOffice.msi';
cmd2[pn]='msiexec /qb REGISTER_ALL_MSO_TYPES=1';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{0ECDB550-79ED-4E9E-851B-19A8B2B4EBFA}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{0ECDB550-79ED-4E9E-851B-19A8B2B4EBFA}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


if (rusLang) {
// OpenOffice
prog[pn]='OpenOffice';
version[pn]='4.1.0';
cat[pn]=startpack_Office;
cmd1[pn]='Office/OpenOffice.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{5D1D123E-8F33-4282-A47E-58A29F833F7A}\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{5D1D123E-8F33-4282-A47E-58A29F833F7A}\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
}
else {}


// NotePad++
prog[pn]='NotePad++';
version[pn]='6.6.3';
cat[pn]=startpack_Office;
cmd1[pn]='Office/NotePad++.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Notepad++\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Notepad++\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Mozilla Thunderbird
prog[pn]='Mozilla Thunderbird';
version[pn]='24.4.0';
cat[pn]=startpack_Office;
cmd1[pn]='Office/Thunderbird.exe';
cmd2[pn]='-ms -ira';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Thunderbird 24.4.0 (x86 ru)\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Mozilla Thunderbird 24.4.0 (x86 ru)\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Opera Mail
prog[pn]='Opera Mail';
version[pn]='1.0.1040';
cat[pn]=startpack_Office;
cmd1[pn]='Office/OperaMail.exe';
cmd2[pn]='-install -silent';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 1.0.1040\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Opera 1.0.1040\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Punto Switcher
prog[pn]='Punto Switcher';
version[pn]='3.3.1.364';
cat[pn]=startpack_Office;
cmd1[pn]='Office/PuntoSwitcher.exe';
cmd2[pn]='-ai3 -gm2';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Punto Switcher\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Punto Switcher\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Sylpheed Mail
prog[pn]='Sylpheed Mail';
version[pn]='3.4.1';
cat[pn]=startpack_Office;
cmd1[pn]='Office/Sylpheed.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Sylpheed\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Sylpheed\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Sublime Text
prog[pn]='Sublime Text';
version[pn]='3.0.3059';
cat[pn]=startpack_Office;
cmd1[pn]='Office/SublimeText.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Sublime Text 3_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Sublime Text 3_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Zoner Photo Studio
prog[pn]='Zoner Photo Studio';
version[pn]='16.0.1.5';
cat[pn]=startpack_Office;
cmd1[pn]='Office/ZonerPhoto.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ZonerPhotoStudio16_RU_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ZonerPhotoStudio16_RU_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Burners ////


// Alcohol 52% Free
prog[pn]='Alcohol 52%';
version[pn]='2.0.2.5830';
cat[pn]=startpack_Burners;
cmd1[pn]='Burner/Alcohol52.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Alcohol\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Alcohol\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Ashampoo Burning Studio
prog[pn]='Ashampoo Burn Studio';
version[pn]='1.14.5';
cat[pn]=startpack_Burners;
cmd1[pn]='Burner/Ashampoo.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{91B33C97-91F8-FFB3-581B-BC952C901685}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{91B33C97-91F8-FFB3-581B-BC952C901685}_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Astroburn
prog[pn]='Astroburn Lite';
version[pn]='1.8.0';
cat[pn]=startpack_Burners;
cmd1[pn]='Burner/Astroburn.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Astroburn Lite\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Astroburn Lite\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// BurnAware
prog[pn]='BurnAware';
version[pn]='6.9.4';
cat[pn]=startpack_Burners;
cmd1[pn]='Burner/BurnAware.exe';
cmd2[pn]='-y -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\BurnAware Free\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\BurnAware Free\\DisplayName';
}
defaul[pn]=true;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// CDBurnerXP
prog[pn]='CDBurnerXP';
version[pn]='4.5.3.4746';
cat[pn]=startpack_Burners;
cmd1[pn]='Burner/CDBurnerXP.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{7E265513-8CDA-4631-B696-F40D983F3B07}_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{7E265513-8CDA-4631-B696-F40D983F3B07}_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// DAEMON Tools
prog[pn]='DAEMON Tools';
version[pn]='4.49.1.356';
cat[pn]=startpack_Burners;
cmd1[pn]='Burner/DAEMONTools.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\DAEMON Tools Lite\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\DAEMON Tools Lite\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// ImgBurn
prog[pn]='ImgBurn';
version[pn]='2.5.8.0';
cat[pn]=startpack_Burners;
cmd1[pn]='Burner/ImgBurn.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ImgBurn\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ImgBurn\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// InfraRecorder
prog[pn]='InfraRecorder';
version[pn]='0.53';
cat[pn]=startpack_Burners;
cmd1[pn]='Burner/InfraRecorder.exe';
cmd2[pn]='-y -fm0';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\InfraRecorder\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\InfraRecorder\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// UltraISO
prog[pn]='UltraISO';
version[pn]='9.6.1.3016';
cat[pn]=startpack_Burners;
cmd1[pn]='Burner/UltraISO.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\UltraISO_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\UltraISO_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Medias ////


// Any Video Converter
prog[pn]='Any Video Converter';
version[pn]='5.5.9';
cat[pn]=startpack_Medias;
cmd1[pn]='Media/AnyVideoConverter.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Any Video Converter_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Any Video Converter_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Audacity
prog[pn]='Audacity';
version[pn]='2.0.5';
cat[pn]=startpack_Medias;
cmd1[pn]='Media/Audacity.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Audacity_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Audacity_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Format Factory
prog[pn]='Format Factory';
version[pn]='3.3.4.0';
cat[pn]=startpack_Medias;
cmd1[pn]='Media/FormatFactory.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\FormatFactory\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\FormatFactory\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Freemake Video Converter
prog[pn]='Freemake Video Converter';
version[pn]='4.1.4.0';
cat[pn]=startpack_Medias;
cmd1[pn]='Media/FreemakeVideoConverter.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Freemake Video Converter_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Freemake Video Converter_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// Free Studio
prog[pn]='Free Studio';
version[pn]='6.3.0.430';
cat[pn]=startpack_Medias;
cmd1[pn]='Media/FreeStudio.exe';
cmd2[pn]='/VERYSILENT /NORESTART';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Free Studio_is1\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Free Studio_is1\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// MKVToolNix
prog[pn]='MKVToolNix';
version[pn]='6.9.1';
cat[pn]=startpack_Medias;
cmd1[pn]='Media/MKVToolNix.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MKVToolNix\\DisplayName';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MKVToolNix\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;


// VirtualDub
prog[pn]='VirtualDub';
version[pn]='1.5.10';
cat[pn]=startpack_Medias;
cmd1[pn]='Media/VirtualDub.exe';
cmd2[pn]='/S';
if (is64){
	check[pn]='HKEY_CURRENT_USER\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\VirtualDub\\DisplayName';
} else {
	check[pn]='HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\VirtualDub\\DisplayName';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;




//// Other ////


if (rusLang) {
	// Classic Shell
	prog[pn]='Classic Shell';
	version[pn]='4.1.0';
	cat[pn]=startpack_Other;
	cmd1[pn]='Other/ClassicShellRu.exe';
	cmd2[pn]='/quiet';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Installer\\UserData\\S-1-5-18\\Products\\C70986326F8E05740A3252C4E3B2E5D8\\InstallProperties\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Installer\\UserData\\S-1-5-18\\Products\\C70986326F8E05740A3252C4E3B2E5D8\\InstallProperties\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
}
else {
	// Classic Shell
	prog[pn]='Classic Shell';
	version[pn]='4.1.0';
	cat[pn]=startpack_Other;
	cmd1[pn]='Other/ClassicShellEn.exe';
	cmd2[pn]='/quiet';
	if (is64){
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Installer\\UserData\\S-1-5-18\\Products\\C70986326F8E05740A3252C4E3B2E5D8\\InstallProperties\\DisplayName';
	} else {
		check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Installer\\UserData\\S-1-5-18\\Products\\C70986326F8E05740A3252C4E3B2E5D8\\InstallProperties\\DisplayName';
	}
	defaul[pn]=false;
	wshow[pn]=true;
	onCompleteInst[pn]='defaul['+pn+']=false;';
	pn++;
}


// Unlocker
prog[pn]='Unlocker';
version[pn]='1.9.2';
cat[pn]=startpack_Other;
cmd1[pn]='Other/Unlocker.exe';
cmd2[pn]='';
if (is64){
	check[pn]='HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Unlocker\\Language';
} else {
	check[pn]='HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Unlocker\\Language';
}
defaul[pn]=false;
wshow[pn]=true;
onCompleteInst[pn]='defaul['+pn+']=false;';
pn++;
