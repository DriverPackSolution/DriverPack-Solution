//SoftPack
//http://msdn.microsoft.com/ru-ru/library/windows/desktop/aa369767(v=vs.85).aspx

var softpack=new Array ();
softpack.version = 0.1;

softpack.programsInstalled=new Array ();
softpack.programsInstalled.add = function(name,guid,params) {
   this[guid] = params;
   this[name] = { 'GUID': guid };
}


function GetRegSubKey() {
    var reg = GetObject("winmgmts:{impersonationLevel=impersonate}!root/default:StdRegProv");
    method = reg.Methods_.Item("EnumKey");
    var inParams = method.InParameters.SpawnInstance_();
    inParams.hDefKey = 0x80000002; //HKLM
    inParams.sSubKeyName = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall";
    var outParams = reg.ExecMethod_(method.Name, inParams);
    return outParams.sNames.toArray();
}

function softpack_RegRead(key,argument){
	return RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\'+key+'\\'+argument);
}

function softpack_InitRegUninstall(){
	var subKey=new Array (); 
	subKey = GetRegSubKey();
	for ( var i = 0; i < subKey.length; i++ ) {
		softpack.programsInstalled.add(softpack_RegRead(subKey[i],'DisplayName'),softpack_RegRead(subKey[i],'DisplayName'),{
			'DisplayName':softpack_RegRead(subKey[i],'DisplayName')
			
		});
		
		break;//Debug
   }
}



function softpack_InitWinInstaller(){
	try {
		var installer = new ActiveXObject("WindowsInstaller.Installer");
	} catch(e) { }
	if (typeof(installer)!="object") { return false; }
	
	var products = installer.Products;
	if (products != null) {
		for ( var i = 0; i < products.Count; i++ ) {
			var productCode = products.Item(i);
			var productName = (installer.ProductInfo(productCode, "InstalledProductName")?installer.ProductInfo(productCode, "InstalledProductName"):installer.ProductInfo(productCode, "ProductName"));
			
			softpack.programsInstalled.add(productName,productCode,{
				'DisplayName':productName,
				'ProductName':installer.ProductInfo(productCode, "PackageName"),
				'ProductCode':productCode,
				'Version':installer.ProductInfo(productCode, "VersionString"),
				'Language':installer.ProductInfo(productCode, "Language"),
				'InstallDate':installer.ProductInfo(productCode, "InstallDate"),
				'Vendor':installer.ProductInfo(productCode, "Publisher"),
				'Icon':installer.ProductInfo(productCode, "ProductIcon"),
				'HelpLink':installer.ProductInfo(productCode, "HelpLink"),
				//'UninstallString':installer.ProductInfo(productCode, ""),
				'InstallLocation':installer.ProductInfo(productCode, "InstallLocation"),
				'Transforms':installer.ProductInfo(productCode, "Transforms"),
				'AssignmentType':installer.ProductInfo(productCode, "AssignmentType"),
				'RegCompany':installer.ProductInfo(productCode, "RegCompany"),
				'RegOwner':installer.ProductInfo(productCode, "RegOwner"),
				'ProductID':(installer.ProductInfo(productCode, "ProductID")!='none'?installer.ProductInfo(productCode, "ProductID"):''),
				'InstallSource':installer.ProductInfo(productCode, "InstallSource"),
				'LocalPackage':installer.ProductInfo(productCode, "LocalPackage"),
				'HelpTelephone':installer.ProductInfo(productCode, "HelpTelephone"),
				'URLInfoAbout':installer.ProductInfo(productCode, "URLInfoAbout"),
				'URLUpdateInfo':installer.ProductInfo(productCode, "URLUpdateInfo")
			});
			//break;//Debug
	   }
	}
}
