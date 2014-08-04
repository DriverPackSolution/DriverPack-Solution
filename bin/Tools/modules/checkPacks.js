$(document).ready(function ()
{
	if(typeof(drpFolder)!="undefined")
	{
		CheckPacks(drpFolder);
	}
	else
	{
		CheckPacks("Drivers");
	}
});

function CheckPacks(packsFolder)
{
	try
	{
		// Getting fileNames
		var fileNames=[];
		var files = new Enumerator(fso.GetFolder(packsFolder).Files);
		for (files.moveFirst(); !files.atEnd(); files.moveNext()) 
		{
			fileNames.push(files.item().name);
		}
		
		// Finiding duplicates
		var packsDuplicates=[];
		for(var i in fileNames)
		{
			var fnParts=fileNames[i].split(/^(.+)_(.+)\..+$/g);		
			if(fnParts[1])
			{
				if(!packsDuplicates[fnParts[1]])
				{
					packsDuplicates[fnParts[1]]=[];
				}
				packsDuplicates[fnParts[1]].push({"Index":i,"Ver":fnParts[2]});
			}
		}
		
		// Creating warning message
		var count=0;
		var maxVerIndexes=[];
		var msg = alert_duplicateDriverPacks1;
		for(var dpName in packsDuplicates)
		{
			if(packsDuplicates[dpName].length>1)
			{
				count++;
				var maxVerIndex=0;
				msg+="<ul>";
				for(var i in packsDuplicates[dpName])
				{
					msg+="<li>"+fileNames[packsDuplicates[dpName][i].Index]+"</li>";
					var v1 = parseInt(packsDuplicates[dpName][maxVerIndex].Ver);
					var v2 = parseInt(packsDuplicates[dpName][i].Ver);
					if(isNaN(v1) || isNaN(v2))
					{
						if(packsDuplicates[dpName][maxVerIndex].Ver < packsDuplicates[dpName][i].Ver)
						{
							maxVerIndex=i;
						}
					}
					else
					{
						if(v1<v2)
						{
							maxVerIndex=i;
						}
					}
				}
				msg+="</ul><br>";
				maxVerIndexes[dpName]=maxVerIndex;
			}
		}
		msg += alert_duplicateDriverPacks2;
		
		PrepareDeletingDuplicatesList(fileNames,packsDuplicates,maxVerIndexes,packsFolder);
		// Showing warning message and deleting files if needed
		if(count>0)
		{
			//if(confirm(msg))
			if($("#noticeDupPacks").length==0)
			{
				addNotice("<div id='noticeDupPacks'>"+msg+
				"<br><a href='#' class='btn'"+
				"onclick='DeleteDuplicatePacks();'>"+button_delete+"</a></div>");
			}
		}
	}
	catch(e)
	{
		alert(e);
	}
}

var packsForDeleting=[];
function PrepareDeletingDuplicatesList(fileNames,packsDuplicates,maxVerIndexes,packsFolder)
{
	for(var dpName in packsDuplicates)
	{
		if(packsDuplicates[dpName].length>1)
		{
			var maxVerIndex=packsDuplicates[dpName][0];
			for(var i in packsDuplicates[dpName])
			{
				if(maxVerIndexes[dpName]!=i)
				{
					//alert("Deleting:"+fileNames[packsDuplicates[dpName][i].Index]);
					try
					{
						packsForDeleting.push(packsFolder+"\\"+fileNames[packsDuplicates[dpName][i].Index]);
//						fso.DeleteFile(packsFolder+"\\"+fileNames[packsDuplicates[dpName][i].Index]);
					}
					catch(e){}
				}
			}
		}
	}
}

function DeleteDuplicatePacks()
{
	if(confirm(alert_duplicateDriverPacks2))
	{
		for(var i in packsForDeleting)
		{
//			alert("Deleting:"+packsForDeleting[i]);
			try
			{
						fso.DeleteFile(packsForDeleting[i]);
			}
			catch(e){}
		}
		packsForDeleting=[];
		$("#noticeDupPacks").parent().alert("close");
	}
}

// Split funxtion workaround for IE6
var split;
// Avoid running twice; that would break the `nativeSplit` reference
split = split || function (undef) {

var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
    self;

self = function (str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
        return nativeSplit.call(str, separator, limit);
    }
    var output = [],
        flags = (separator.ignoreCase ? "i" : "") +
                (separator.multiline  ? "m" : "") +
                (separator.extended   ? "x" : "") + // Proposed for ES6
                (separator.sticky     ? "y" : ""), // Firefox 3+
        lastLastIndex = 0,
        // Make `global` and avoid `lastIndex` issues by working with a copy
        separator = new RegExp(separator.source, flags + "g"),
        separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
        // Doesn't need flags gy, but they don't hurt
        separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ?
        -1 >>> 0 : // Math.pow(2, 32) - 1
        limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
        // `separator.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0].length;
        if (lastIndex > lastLastIndex) {
            output.push(str.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for
            // nonparticipating capturing groups
            if (!compliantExecNpcg && match.length > 1) {
                match[0].replace(separator2, function () {
                    for (var i = 1; i < arguments.length - 2; i++) {
                        if (arguments[i] === undef) {
                            match[i] = undef;
                        }
                    }
                });
            }
            if (match.length > 1 && match.index < str.length) {
                Array.prototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
                break;
            }
        }
        if (separator.lastIndex === match.index) {
            separator.lastIndex++; // Avoid an infinite loop
        }
    }
    if (lastLastIndex === str.length) {
        if (lastLength || !separator.test("")) {
            output.push("");
        }
    } else {
        output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
};

// For convenience
String.prototype.split = function (separator, limit) {
    return self(this, separator, limit);
};

return self;
}();