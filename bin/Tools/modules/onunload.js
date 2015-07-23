var myEvent = window.attachEvent || window.addEventListener;
var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; // make IE7, IE8 compitable

myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
	/*
	var confirmationMessage = 'Are you sure to leave the page?';  // a space
	(e || window.event).returnValue = confirmationMessage;
	return confirmationMessage;
	*/
	
	statistics.event( { action: 'Closed' } );
	
	WshShell.Run('"Tools\\unregister_sxsoa.bat" ', 0, false);
});