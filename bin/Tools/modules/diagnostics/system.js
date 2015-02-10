function CheckWinUpdateService()
{
	try {
		var service = GetSystemWMIScalar("select Name,Caption,State,StartMode from Win32_Service where Name='wuauserv'");
		if(service.StartMode=="Disabled")
		{
			addDiagAlert(
				'services',
				services_alert,
				'important',
				function () {
					WshShell.Run('control.exe /name Microsoft.WindowsUpdate',0,false);
				} //ToDo: Dialog "Do you want to start a service update Windows?"
			);
		}
		else
		{
			//$("#services_alert").html("");
			clearDiagAlert('services');
		}
	} catch (e){}
}

onload(function () { CheckWinUpdateService(); });

function CheckServicePack()
{
	try {
		var info = GetSystemWMIScalar("select * from Win32_OperatingSystem");
		
		if(info)
		{
			if(parseFloat(info.Version.substring(0,3))<6.2 &&
				info.ServicePackMajorVersion==0)
			{
				$("#servicePack_alert").html("<div class='alert alert-block'><button type='button' class='close' data-dismiss='alert'>×</button>"+servicePack_alert+"</div>");
			}
			else
			{
				$("#servicePack_alert").html("");
			}
		}
	} catch (e){}
}

function GetSecurityCenterServiceState()
{
	try {
		var service = GetSystemWMIScalar("select Name,Caption,State from Win32_Service where Name='wscsvc'");
		return service.State=="Running";
	} catch (e){ return true; }
}