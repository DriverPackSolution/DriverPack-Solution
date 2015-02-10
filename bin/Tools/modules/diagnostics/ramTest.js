function ramTest(){
	if (OSVersion <= 5) { alert(ramTest_notSupport); return false; }
	
	try { winRun('MdSched.exe','','',true); }
	catch(e) { alert(ramTest_notSupport); }
}
