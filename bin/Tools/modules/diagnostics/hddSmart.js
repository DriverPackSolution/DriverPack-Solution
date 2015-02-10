var hddSmart=[];
var hddSmartCSV;

function hddSmart_init(){
	try {
		hddSmart.length=0;
		
		WshShell.Run('cscript.exe //nologo tools\\modules\\diagnostics\\HDD_Smart.vbs',0,true);
		hddSmartCSV_file = fso.OpenTextFile(temp + '\\drp\\HDD_Smart.csv', 1, false)
		hddSmartCSV = hddSmartCSV_file.ReadAll();
		hddSmartCSV_file.Close();
		hddSmart=CSVToArray(hddSmartCSV,';');
		//alert(print_r(hddSmart));
		//alert(hddSmart[4][8]);
	}
	catch(e) { }
}


function hddSmart_detect(){
	//Get data
	hddSmart_init();
	
	//hddSmart.length=0;	//debug

	if (hddSmart.length<10) {	//If CSV is empty
		document.getElementById('hddSmart_alert').innerHTML='';
	}
	else {	//If Smart report found 
		var ant='';
		for (var i=4;i<hddSmart.length;i++) {
			var hddSmartAllRight = true;
			if (hddSmart[i][8]=='NOT OK'){ hddSmartAllRight = false; break; }
		}
		//hddSmartAllRight = false;//debug
		
		document.getElementById('hddSmart_alert').innerHTML='SMART: <a href="" onclick="alert(hddSmartCSV.replace(/;/ig,\'\t\')); return false;" '+(hddSmartAllRight?'title="'+hddSmart_normal+'" class="tooltips"><img src="./tools/green_ok.png" style="margin-right:4px;" title="1">OK':'title="'+hddSmart_notNormal+'"><img src="./tools/no.png" style="margin-right:4px;"><span style="color:red;font-weight:bold;">Error!</span>')+'</a>';
		if (!hddSmartAllRight) {
			addDiagAlert('hdd','HDD: '+hddSmart_notNormal,'important');
		}
	}
}


// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
		),
		"gi"
		);


	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arrData = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;


	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec( strData )){

		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[ 1 ];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			(strMatchedDelimiter != strDelimiter)
			){

			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push( [] );

		}


		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[ 2 ]){

			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			var strMatchedValue = arrMatches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),
				"\""
				);

		} else {

			// We found a non-quoted value.
			var strMatchedValue = arrMatches[ 3 ];

		}


		// Now that we have our value string, let's add
		// it to the data array.
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}

	// Return the parsed data.
	return( arrData );
}
