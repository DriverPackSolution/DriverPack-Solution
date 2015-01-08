//Link to the notebook in the catalog notebooks
function ManufacturerClean(str){
	var replacePattern = /(, inc.)|(inc.)|(corporation)|(corp.)|(computer)|(co., ltd.)|(co., ltd)|(co.,ltd)|(co.)|(ltd)|(international)|(CO., LTD.)|(ELECTRONICS)|(Technology)/ig;
	
	return ManufactorerAliases(trim(str.replace(replacePattern, '')));
}

function ManufactorerAliases(str){
	str = str.toLowerCase();
	if ((str.indexOf('acer')==0) || (str.indexOf('emachine')==0) || (str.indexOf('gateway')!=-1) || (str.indexOf('bell')!=-1)  || (str.indexOf('aspire')!=-1)) { return 'Acer'; }
	if (str.indexOf('apple')!=-1) { return 'Apple'; }
	if (str.indexOf('asus')!=-1) { return 'Asus'; }
	if ((str.indexOf('dell')==0) || (str.indexOf('alienware')!=-1) || (str.indexOf('arima')!=-1) || (str.indexOf('gericom')!=-1) || (str.indexOf('jetway')!=-1)) { return 'Dell'; }
	if ((str.indexOf('fujitsu')!=-1) || (str.indexOf('sieme')!=-1)) { return 'Fujitsu'; }
	if (str.indexOf('gigabyte')!=-1) { return 'Gigabyte'; }
	if ((str.indexOf('hp')==0) || (str.indexOf('hewle')!=-1) || (str.indexOf('compaq')!=-1) || (str.indexOf('to be filled by hpd')!=-1)) { return 'HP'; }
	if ((str.indexOf('lenovo')!=-1) || (str.indexOf('ibm')==0) || (str.indexOf('compal')!=-1)) { return 'Lenovo'; }
	if (str.indexOf('lg')==0) { return 'LG'; }
	if ((str.indexOf('micro-star')!=-1) || (str.indexOf('msi')==0)) { return 'MSI'; }
	if ((str.indexOf('Nec_brand')!=-1) || (str.indexOf('nec')==0)) { return 'NEC'; }
	if ((str.indexOf('panasonic')!=-1) || (str.indexOf('matsushita')!=-1)) { return 'Panasonic'; }
	if (str.indexOf('samsung')!=-1) { return 'Samsung'; }
	if ((str.indexOf('sony')==0) || (str.indexOf('vaio')!=-1)) { return 'Sony'; }
	if (str.indexOf('toshiba')!=-1) { return 'Toshiba'; }
	if ((str.indexOf('benq')==0) || (str.indexOf('clevo')==0) || (str.indexOf('depo')==0) || (str.indexOf('durabook')!=-1) || (str.indexOf('ecs')==0) || (str.indexOf('elitegroup')!=-1) || (str.indexOf('eurocom')==0) || (str.indexOf('getac')==0) || (str.indexOf('intel')==0) || (str.indexOf('iru')==0) || (str.indexOf('k-systems')==0) || (str.indexOf('medion')!=-1) || (str.indexOf('mitac')==0) || (str.indexOf('mtc')==0) || (str.indexOf('nokia')!=-1) ||(str.indexOf('pegatron')!=-1) || (str.indexOf('prolink')!=-1) || (str.indexOf('quanta')!=-1) || (str.indexOf('sager')==0) || (str.indexOf('shuttle')!=-1) || (str.indexOf('twinhead')!=-1) || (str.indexOf('rover')!=-1) || (str.indexOf('roverbook')==0) || (str.indexOf('viewbook')==0) || (str.indexOf('viewsonic')==0) || (str.indexOf('vizio')==0) || (str.indexOf('wistron')!=-1)) { return 'OEM'; }
	
	
	
	
	
	return '';
}

var MainBoard = wpi('Manufacturer','Win32_BaseBoard');
var MainBoardName = wpi('Product','Win32_BaseBoard');
var MainBoardVer = wpi('Version','Win32_BaseBoard');

var ManufacturerNout = wpi('Manufacturer','Win32_ComputerSystem');
var ModelNout = wpi('Model','Win32_ComputerSystem');


if ((ManufacturerNout.toLowerCase().indexOf('o.e.m.')!=-1)||(ManufacturerNout.toLowerCase().indexOf('manufacturer')!=-1)){
	var Manufacturer = ManufacturerClean(MainBoard);
	var Model = MainBoardName.replace(ManufacturerClean(Manufacturer),'');
}
else {
	var Manufacturer = ManufacturerClean(ManufacturerNout);
	var Model = ModelNout.replace(ManufacturerClean(Manufacturer),'');
}
Manufacturer = (ManufactorerAliases(Manufacturer)?ManufactorerAliases(Manufacturer):Manufacturer);


log(ManufacturerNout);
log(Manufacturer);
function compatibleDrvWithNotebook(dev_dir){
	var dev_dir_nb = dev_dir.toLowerCase();
	var dev_dir_nb = dev_dir_nb.substr(0,dev_dir_nb.indexOf('_nb'));
	var dev_dir_nb = dev_dir_nb.substr(dev_dir_nb.lastIndexOf('\\')+1);
	//alert(dev_dir_nb);
	if ((Manufacturer.toLowerCase()==dev_dir_nb) || (!dev_dir_nb)){
		//Allow to install the driver if:
		//marker for it is not set
		//set a handle
		return true;
	}
	
	//Do not allow to install this driver
	return false;
}

