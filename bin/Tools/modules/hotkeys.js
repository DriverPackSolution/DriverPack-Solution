
$(document).bind('keydown', 'd', function(){ devmgmt(); return false; });
$(document).bind('keydown', 's', function(){ msinfo(); return false; });
$(document).bind('keydown', 'r', function(){ refresh(); return false; });
$(document).bind('keydown', 'a', function(){ chkAll(); return false; });
$(document).bind('keydown', 'i', function(){ run_button(true); return false; });
$(document).bind('keydown', 'f1', function(){ help(); return false; });
$(document).bind('keydown', 'p', function(){ toogleCPUtemp(); return false; });
