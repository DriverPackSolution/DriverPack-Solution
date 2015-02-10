/**
 * @fileOverview 
 * @author 
 * @version 
 */

/** @lends Person.prototype */
 function defrag(){
	if (OSVersion >= 6) {

		try { winRun('dfrgui.exe','','',true); }
		catch(e) {
			try { winRun('dfrgui.exe','','',true); }
			catch(e) { alert(defrag_notSupport); }
		}
	}
	else {
		try { WshShell.Run('dfrg.msc', 0, false); }
		catch(e) { alert(defrag_notSupport); }
	}
}