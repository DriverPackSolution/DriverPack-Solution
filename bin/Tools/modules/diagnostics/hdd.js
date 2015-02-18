//More: http://msdn.microsoft.com/en-us/library/windows/desktop/aa394132(v=vs.85).aspx
//http://msdn.microsoft.com/en-us/library/Aa394173
//http://msdn.microsoft.com/en-us/library/Aa394135
//See this tweak: http://stackoverflow.com/questions/1346450/win32-diskdrive-signature-property
//http://zheleznov.info/invent_comp.htm
//http://www.sysengineering.ru/administration/administrationusingwmi.aspx



/**
 * @name Foo
 * @tutorial tutorial-1
 */
var hdd=[];
function hdd_init(){
	try {
		hdd.length=0;
		
		var colItems = objWMIService.ExecQuery("SELECT * FROM Win32_DiskDrive","WQL");
		var enumItems = new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext()) {
			  var objItem = enumItems.item();
			  
			  hdd[hdd.length] = {
						RealName: clearUndefVar(objItem.Model),
						BytesPerSector: clearUndefVar(objItem.BytesPerSector),
						Caption: clearUndefVar(objItem.Caption),
						Capabilities: clearArrayVar(objItem.Capabilities),
						CapabilityDescriptions: clearArrayVar(objItem.CapabilityDescriptions),
						ConfigManagerErrorCode: clearUndefVar(objItem.ConfigManagerErrorCode),
						Description: clearUndefVar(objItem.Description),
						DeviceID: clearUndefVar(objItem.DeviceID),
						FirmwareRevision: clearUndefVar(objItem.FirmwareRevision),
						InstallDate: clearUndefVar(objItem.InstallDate),
						InterfaceType: clearUndefVar(objItem.InterfaceType),
						LastErrorCode: clearUndefVar(objItem.LastErrorCode),
						Manufacturer: clearUndefVar(objItem.Manufacturer),
						MediaType: clearUndefVar(objItem.MediaType),
						Model: clearUndefVar(objItem.Model),
						Name: clearUndefVar(objItem.Name),
						NeedsCleaning: clearUndefVar(objItem.NeedsCleaning), //What is it?
						Partitions: clearUndefVar(objItem.Partitions),
						PNPDeviceID: clearUndefVar(objItem.PNPDeviceID),
						SectorsPerTrack: clearUndefVar(objItem.SectorsPerTrack),
						SerialNumber: clearUndefVar(objItem.SerialNumber),
						Signature: clearUndefVar(objItem.Signature),
						Size: clearUndefVar(objItem.Size),
						Status: clearUndefVar(objItem.Status),
						StatusInfo: clearUndefVar(objItem.StatusInfo),
						TotalCylinders: clearUndefVar(objItem.TotalCylinders),
						TotalHeads: clearUndefVar(objItem.TotalHeads),
						TotalSectors: clearUndefVar(objItem.TotalSectors),
						TotalTracks: clearUndefVar(objItem.TotalTracks),
						TracksPerCylinder: clearUndefVar(objItem.TracksPerCylinder)
				};
		}
	}
	catch(e) { }
}


/**
 * Содержит информацию о подключенных к системе локальных дисках.
 * @type {Array}
 * @tutorial tutorial-1
 */
var logicalDisk=[];
function logicalDisk_init(){
	try {
		logicalDisk.length=0;
		
		var colItems = objWMIService.ExecQuery("SELECT * FROM Win32_LogicalDisk","WQL");
		var enumItems = new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext()) {
			  var objItem = enumItems.item();
			  
			  logicalDisk[logicalDisk.length] = {
						Access: clearUndefVar(objItem.Access),
						Caption: clearUndefVar(objItem.Caption),
						Compressed: clearUndefVar(objItem.Compressed),
						Description: clearUndefVar(objItem.Description),
						DeviceID: clearUndefVar(objItem.DeviceID),
						DriveType: clearUndefVar(objItem.DriveType),
						FileSystem: clearUndefVar(objItem.FileSystem),
						FreeSpace: clearUndefVar(objItem.FreeSpace),
						InstallDate: clearUndefVar(objItem.InstallDate),
						MediaType: clearUndefVar(objItem.MediaType),
						Name: clearUndefVar(objItem.Name),
						Size: clearUndefVar(objItem.Size),
						Status: clearUndefVar(objItem.Status),
						StatusInfo: clearUndefVar(objItem.StatusInfo),
						VolumeName: clearUndefVar(objItem.VolumeName),
						VolumeSerialNumber: clearUndefVar(objItem.VolumeSerialNumber)
				};
		}
	}
	catch(e) { }
}


 /**
 * @name hiliteSearchTerm
 * @function
 */
function hdd_detect(){
	//Get data
	hdd_init();
	
	//hdd.length=0;	//debug

	if (hdd.length==0) {	//If the HDD is not visible
		document.getElementById('hdd_alert').innerHTML=hdd_notSupport;
	}
	else if (hdd.length>=1) {	//If the HDD is found
		var ant='';
		for (var i=0;i<hdd.length;i++) {
			var MediaType=hdd[i].MediaType;
			if (MediaType.indexOf('hard disk') != -1){
				if (MediaType.indexOf('External') != -1){
					ant=ant+'<i>'+hdd_external+'</i>: ';
				}
				ant=ant+hdd[i].RealName+'<br>';
			}
		}
		document.getElementById('hdd_alert').innerHTML=ant;
	}
}

/**
 * Выводит предупреждение, если на жестком диске меньше 90% свободного пространства.
 * @return  document.getElementById('hddFreeSpace_alert').innerHTML
 * @requires HDD
 */
 /**
 * @name hiliteSearchTerm
 * @function
 */
function hddFreeSpace_detect(){
	//Get data
	logicalDisk_init();
	
	//logicalDisk.length=0;	//debug

	if (logicalDisk.length==0) {	//If the local disk not found
		document.getElementById('hddFreeSpace_alert').innerHTML='';
	}
	else if (logicalDisk.length>=1) {	//If the local disk is found
		var ant='';
		for (var i=0;i<logicalDisk.length;i++) {
			if ((logicalDisk[i].DriveType=='3')&&(logicalDisk[i].FreeSpace)){
				var procentag = (100-(logicalDisk[i].FreeSpace*100/logicalDisk[i].Size));
				
				//procentag=98;	//Debug
				if (procentag>90){
					ant=ant+logicalDisk[i].Name+'/ - <span style="color:red;font-weight:bolder;" title="'+hdd_noFreeSpace+'">'+ procentag.toFixed(0) +'%</span>; ';
					addDiagAlert('hdd','HDD: '+hdd_noFreeSpace,'warning');
				}
				//break;	//Debug
			}
		}
		document.getElementById('hddFreeSpace_alert').innerHTML=ant;
	}
}
