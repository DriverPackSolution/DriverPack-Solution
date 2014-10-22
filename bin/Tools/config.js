// Main settings
var hidebloatware = true;

var width = 900;
var height = 650;
var devIDFolder = "..\\Indexes";
var drpFolder = "..\\Drivers";
var softFolder = "..\\Soft";
var logsCurFolder = false;

var lang = "default";
var useAliases = true;
var showPackNames = true;
var restorePoint = true;
var ignore_markers=false;
var minCountDRP=30;

// Unused?
var drv_ignor = new RegExp('(PNP0A03)','i');
var UpdateSystem = true;
var autoUpdate = true;
var maxProcesses = "9999999999";

// Bloat
var bloatware = !hidebloatware;
var like_disable = bloatware;
var NewsBlock = bloatware;
var CPU_timeRefresh = 5;
var CPUmax=77;
var expertMode = loadValue("expertMode",false);
var getCPUtemp = loadValue("getCPUtemp;",false);
var DrvUpdater = loadValue("DrvUpdater",false);
var OEMInstall = loadValue("OEMInstall",false);
var signIgnor = loadValue("signIgnor",false);

if(bloatware)getCPUtemp=DrvUpdater=OEMInstall=false

// Markers
var ver_51x64="5x64";
var ver_51x86="5x86";
var ver_60x64="6x64|NTx64|AllNT|67x64";
var ver_60x86="6x86|NTx86|AllNT|67x86";
var ver_61x64="7x64|NTx64|AllNT|67x64|78x64|781x64|7819x64";
var ver_61x86="7x86|NTx86|AllNT|67x86|78x86|781x86|7819x86";
var ver_62x64="8x64|NTx64|AllNT|78x64|All8x64";
var ver_62x86="8x86|NTx86|AllNT|78x86|All8x86";
var ver_63x64="81x64|NTx64|AllNT|781x64|7819x86|All8x64";
var ver_63x86="81x86|NTx86|AllNT|781x86|7819x86|All8x86";
var ver_64x64="9x64|NTx64|AllNT|7819x64|All8x64";
var ver_64x86="9x86|NTx86|AllNT|7819x86|All8x86";

var ver_XXx64="Allx64";
var ver_XXx86="Allx86";
var ver_51xXX="AllXP";
var ver_60xXX="All6";
var ver_61xXX="All7";
var ver_62xXX="All8";
var ver_63xXX="All81";
var ver_64xXX="All9";

var ver_XXxXX="WinAll";
var ver_strict="STRICT";

var ver_known_ver=ver_51x64+"|"+ver_51x86+"|"+ver_60x64+"|"+ver_60x86+"|"+ver_61x64+"|"+ver_61x86+"|"+ver_62x64+"|"+ver_62x86+"|"+ver_63x64+"|"+ver_63x86+"|"+ver_64x64+"|"+ver_64x86;
var ver_Any86=ver_51x86+"|"+ver_60x86+"|"+ver_61x86+"|"+ver_62x86+"|"+ver_63x86+"|"+ver_64x86+"|"+ver_XXx86+"|"+ver_XXxXX;
var ver_Any64=ver_51x64+"|"+ver_60x64+"|"+ver_61x64+"|"+ver_62x64+"|"+ver_63x64+"|"+ver_64x64+"|"+ver_XXx64+"|"+ver_XXxXX;

ver_51x64+="|"+ver_51xXX;
ver_51x86+="|"+ver_51xXX;
ver_60x64+="|"+ver_60xXX;
ver_60x86+="|"+ver_60xXX;
ver_61x64+="|"+ver_61xXX;
ver_61x86+="|"+ver_61xXX;
ver_62x64+="|"+ver_62xXX;
ver_62x86+="|"+ver_62xXX;
ver_63x64+="|"+ver_63xXX;
ver_63x86+="|"+ver_63xXX;
ver_64x64+="|"+ver_64xXX;
ver_64x86+="|"+ver_64xXX;