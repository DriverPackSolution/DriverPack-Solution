//var objWMIService = GetObject("winmgmts://./root/cimv2"); // It works only on older versions of IE (or in compatibility mode)

try {
	var locator = new ActiveXObject("WbemScripting.SWbemLocator");
	var objWMIService = locator.ConnectServer(null, "root\\cimv2");
} catch (e){}


function wpi(name,sorce) {
	lf('wpi');
	try {
		var colItems = objWMIService.ExecQuery("SELECT * FROM " + sorce,"WQL");
		var enumItems = new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext()) {
			  var objItem = enumItems.item();
			  eval("var ret = objItem." + name + ";");
			  ret = ret.replace('null','');
			  ret = ret.replace('undefined','');

			  if (ret == null) { return ""; }
			  return ret;
		}
	}
	catch(e) { return ""; }
}
//Clear undef var from WPI-query
function clearUndefVar(varib){
	try { varib=varib+''; ret = varib.replace('null','').replace('undefined',''); }
	catch(e) { ret = ''; }
	return ret;
}
function clearArrayVar(varib){
	try { ret=varib.toArray(); }
	catch(e) { ret = ''; }
	return ret;
}


var RAM = wpi('TotalPhysicalMemory','Win32_ComputerSystem')/1024/1024;
var CPU = RegRead("HKLM\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0\\ProcessorNameString");
var GPU = wpi('Caption','Win32_VideoController');


//--- Functions for working with OHM WMI provider
try
{
	var objOHWMIService = locator.ConnectServer(null, "root\\OpenHardwareMonitor");
}
catch(e){}

function GetOHWMIData(query)
{
	try
	{
		var colItems = objOHWMIService.ExecQuery(query);

		var retVal=[];
		var e = new Enumerator(colItems);

		if(colItems.count>0)
		{
			// Show only items corresponding to the very first process
			var processId = e.item().ProcessId;
			for(; ! e.atEnd(); e.moveNext())
			{
				if(e.item().ProcessId==processId)
				{
					retVal.push(e.item());
				}
			}
		}
		return retVal;
	}
	catch(e){}
	return null;	
}

function GetOHWMIScalar(query)
{
	try
	{
		var colItems = objOHWMIService.ExecQuery(query);

		if(colItems.count)
		{
			var e = new Enumerator(colItems);
			return e.item();
		}
	}
	catch(e){};
	return null;	
}

//--- Function for getting WMI data from root\\cimv2 as array
function GetSystemWMIData(query)
{
	try
	{
		var colItems = objWMIService.ExecQuery(query);

		var retVal=[];
		var e = new Enumerator(colItems);
		for(; ! e.atEnd(); e.moveNext())
		{
			retVal.push(e.item());
		}
		return retVal;
	}
	catch(e){}
	return null;	
}

function GetSystemWMIScalar(query)
{
	try
	{
		var colItems = objWMIService.ExecQuery(query);

		if(colItems.count)
		{
			var e = new Enumerator(colItems);
			return e.item();
		}
	}
	catch(e){};
	return null;	
}