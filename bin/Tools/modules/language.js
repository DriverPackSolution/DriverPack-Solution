// All Flags -> \tools\language\ico\flags\all_flags.zip
var lang_support = {
	ar:'Arabic',   			// India
	az:'Azerbaijani',   		// Azerbaijan
	be:'Белорусский',		// Belarus
	bg:'Bulgarian',			// Bulgaria
	bs:'Bosnian',			// Bosnia
	da:'Danish',			// Denmark
	de:'German',   			// Germany
	el:'Greek',			// Greece
	en:'English',   		// English
	es:'Spanish',  			// Spain
	et:'Estonian',  		// Estonian
	co:'Colombia',  		// Colombia
	cz:'Czech',			// Czechia
	cs:'Czech',			// Czechia
	fa:'Persian',			// Iran
	fr:'French', 			// France
	he:'Hebrew',			// Israel
	hr:'Croatian',  		// Croatia
	hu:'Hungarian',			// Hungary
	hy:'Armenian',			// Armenia
	id:'Indonesian',		// Indonesia
	it:'Italian',  			// Italy
	ka:'Georgian', 			// Georgia
	ku:'Kurdish',			// Turkey
	lt:'Lithuanian', 		// Lithuania
	mk:'Macedonian', 		// Macedonia
	nl:'Dutch',			// Belgium
	nn:'Norwegian',			// Norway
	pl:'Polish',			// Poland
	pt:'Português',			// Brazil
	ro:'Roumanian',			// Romania
	ru:'Русский',			// Russia
	sk:'Slovak',			// Slovakia
	sl:'Slovenian',			// Slovenia
	sr:'Serbian',			// Serbia
	srl:'Serbian (Latin)',		// Serbia
	th:'Thai',			// Thailand
	tr:'Turkish',   		// Turkey
	tt:'Tatar',   			// Tatarstan
	uk:'Українська',		// Ukraine
	ur:'Urdu',			// Pakistan
	uz:'Uzbek',			// Uzbekistan
	vi:'Vietnamese',		// Viet Nam
	zh:'Chinese'			// China
};

var locale = parseInt("0x" + RegRead("HKCU\\Control Panel\\International\\Locale"));
switch(locale){
	case 0x0009: // English
	case 0x0c09: // English (Australia)
	case 0x2809: // English (Belize)
	case 0x1009: // English (Canada)
	case 0x2409: // English (Caribbean)
	case 0x4009: // English (India)
	case 0x1809: // English (Ireland)
	case 0x2009: // English (Jamaica)
	case 0x4409: // English (Malaysia)
	case 0x1409: // English (New Zealand)
	case 0x3409: // English (Philippines)
	case 0x4809: // English (Singapore)
	case 0x1c09: // English (South Africa)
	case 0x2c09: // English (Trinidad)
	case 0x0809: // English (United Kingdom)
	case 0x0409: // English (United States)
	case 0x3009: // English (Zimbabwe)
	case 0x3c09: // English (Hong Kong)
	case 0x3809: // English (Indonesia)
		lang = "en";break;

	case 0x000c: // French
	case 0x080c: // French (Belgium)
	case 0x2c0c: // French (Cameroon)
	case 0x0c0c: // French (Canada)
	case 0x240c: // French (Congo, DRC)
	case 0x300c: // French (Cote d'Ivoire)
	case 0x3c0c: // French (Haiti)
	case 0x040c: // French (France)
	case 0x140c: // French (Luxembourg)
	case 0x340c: // French (Mali)
	case 0x180c: // French (Monaco)
	case 0x380c: // French (Morocco)
	case 0xe40c: // French (North Africa)
	case 0x200c: // French (Reunion)
	case 0x280c: // French (Senegal)
	case 0x100c: // French (Switzerland)
	case 0x1c0c: // French (West Indies)
		lang = "fr";break;

	case 0x000a: // Spanish
	case 0x3c0a: // Spanish (Paraguay)
	case 0x140a: // Spanish (Costa Rica)
	case 0x1c0a: // Spanish (Dominican Republic)
	case 0x300a: // Spanish (Ecuador)
	case 0x440a: // Spanish (El Salvador)
	case 0x100a: // Spanish (Guatemala)
	case 0x480a: // Spanish (Honduras)
	case 0x0c0a: // Spanish (International Sort)
	case 0x340a: // Spanish (Chile)
	case 0x4c0a: // Spanish (Nicaragua)
	case 0x080a: // Spanish (Mexico)
	case 0x280a: // Spanish (Peru)
	case 0x500a: // Spanish (Puerto Rico)
	case 0x040a: // Spanish (Traditional Sort)
	case 0x380a: // Spanish (Uruguay)
	case 0x200a: // Spanish (Venezuela)
	case 0x180a: // Spanish (Panama)
	case 0x2c0a: // Spanish (Argentina)
	case 0x400a: // Spanish (Bolivia)
	case 0x580a: // Spanish (Latin America)
	case 0x540a: // Spanish (United States)
	case 0x200a: // Spanish (Venezuela)
		lang = "es";break;

	case 0x240a: // Spanish (Colombia)
		lang = "co";break;

	case 0x0007: // German
	case 0x0c07: // German (Austria)
	case 0x0407: // German (Germany)
	case 0x1407: // German (Liechtenstein)
	case 0x1007: // German (Luxembourg)
	case 0x0807: // German (Switzerland)
		lang = "de";break;

	case 0x0437: // Georgian (Georgia)
		lang = "ka";break;

	case 0x002c: // Azeri
	case 0x742C: // Azeri (Cyrillic)
	case 0x082C: // Azeri (Cyrillic, Azerbaijan)
	case 0x782C: // Azeri (Latin)
	case 0x042C: // Azeri (Latin, Azerbaijan)
		lang = "az";break;

	case 0x0010: // Italian
	case 0x0410: // Italian (Italy)
	case 0x0810: // Italian (Switzerland)
		lang = "it";break;

	case 0x0019: // Russian
	case 0x0419: // Russian (Russia)
	case 0x0819: // Russian (Moldova)
		lang = "ru";break;

	case 0x0022: // Ukrainian
	case 0x0422: // Ukrainian (Ukraine)
		lang = "uk";break;

	case 0x001f: // Turkish
	case 0x041f: // Turkish (Turkey)
		lang = "tr";break;

	case 0x0027: // Lithuanian
	case 0x0427: // Lithuanian (Lithuania)
		lang = "lt";break;

	case 0x0013: // Dutch
	case 0x0413: // Dutch (Netherlands)
	case 0x0813: // Dutch (Belgium)
		lang = "nl";break;

	case 0x181a: // Serbian_Latin_Bosnia_Herzegovina
	case 0x081a: // Serbian_Latin
		lang = "srl";break;

	case 0x0c1a: // Serbian_Cyrillic
	case 0x1c1a: // Serbian_Cyrillic_Bosnia_Herzegovina
		lang = "sr";break;

	case 0x0001: // Arabic
	case 0x1401: // Arabic (Algeria)
	case 0x3C01: // Arabic (Bahrain)
	case 0x0C01: // Arabic (Egypt)
	case 0x0801: // Arabic (Iraq)
	case 0x2C01: // Arabic (Jordan)
	case 0x3401: // Arabic (Kuwait)
	case 0x3001: // Arabic (Lebanon)
	case 0x1001: // Arabic (Libya)
	case 0x1801: // Arabic (Morocco)
	case 0x2001: // Arabic (Oman)
	case 0x4001: // Arabic (Qatar)
	case 0x0401: // Arabic (Saudi Arabia)
	case 0x2801: // Arabic (Syria)
	case 0x1C01: // Arabic (Tunisia)
	case 0x3801: // Arabic (U.A.E.)
	case 0x2401: // Arabic (Yemen)
		lang = "ar";break;

	case 0x0415: // Polish
		lang = "pl";break;

	case 0x042b: // Armenian
		lang = "hy";break;

	case 0x0405: // Czech
		lang = "cs";break;

	case 0x0406: // Danish (Denmark)
		lang = "da";break;

	case 0x0423: // Belarusian
		lang = "be";break;

	case 0x0416: // Portuguese - Brazil
	case 0x0816: // Portuguese - Portugal
		lang = "pt";break;

	case 0x0804: // Chinese - People's Republic of China
	case 0x1004: // Chinese - Singapore
	case 0x0404: // Chinese - Taiwan
	case 0x0c04: // Chinese - Hong Kong SAR
	case 0x1404: // Chinese - Macao SAR
		lang = "zh";break;

	case 0x0429: // Farsi (Persian)
		lang = "fa";break;

	case 0x0408: // Greek
		lang = "el";break;

	case 0x040d: // Hebrew
		lang = "he";break;

	case 0x040E: // Hungarian
		lang = "hu";break;

	case 0x0421: // Indonesian
		lang = "id";break;

	case 0x0410: // Italiano
		lang = "it";break;

	case 0x0492: // Central Kurdish (ku)
		lang = "ku";break;

	case 0x0427: // Lithuanian
		lang = "lt";break;

	case 0x0424: // Slovenian
		lang = "sl";break;

	case 0x041B: // Slovak
		lang = "sk";break;

	case 0x0418: // Romanian
	case 0x0818: // Romanian - Moldava
		lang = "ro";break;

	case 0x0444: // Tatar
		lang = "tt";break;

	case 0x041a: // Croatian
	case 0x101a: // Croatian (Bosnia/Herzegovina)
		lang = "hr";break;

	case 0x0425: // Estonian
		lang = "vi";break;

	case 0x042a: // Vietnamese
		lang = "vi";break;


	default:
		lang = "en";
}

var langr = RegRead(Reg + "lang");
if (langr) lang = langr;
//lang='en';
var rusLang = false;
if ((lang=='ru')||(lang=='uk')||(lang=='az')||(lang=='by')||(lang=='am')){ rusLang = true; }


// Load language files
document.write('<script type="text/javascript" src="Tools/language/ru.js"><\/script>');
if (!rusLang){	//If not RusLang
	document.write('<script type="text/javascript" src="Tools/language/en.js"><\/script>');
}
document.write('<script type="text/javascript" src="Tools/language/' + lang + '.js"><\/script>');


//function l(text) { document.write(text); }
function l(varibles) {
	try{
		eval('var text = '+varibles+';');
		eval('if (typeof '+varibles+'_h != "undefined") { var test_var = '+varibles+'_h; }');
		if (typeof test_var != 'undefined') { test_var = test_var; text = "<span onmousemove=\"return ttlOver(event, '"+htmlspecialchars(test_var)+"')\" onmouseout='return ttlOut()'>"+text+"</span>"; document.write(text);  }
		else { document.write(text); }
	}
	catch(e){ document.write(varibles); }
}

// Save language settings
function language_onChange(objSel) {
	if (objSel.selectedIndex != -1) {
		WshShell.RegWrite (Reg + "lang",objSel.options[objSel.selectedIndex].value,"REG_SZ");
		window.location.reload();
	}
}

// Select language in dropdown menu
function language_list() {
	var f = fso.GetFolder("tools\\language");
	var fc = new Enumerator(f.Files);
	var lanSelect = document.getElementById("language");
	var i = 4;
	for (fc.moveFirst();!fc.atEnd();fc.moveNext()) {
		var langFileName = fc.item().name;
		if (langFileName.indexOf('.js') != -1){
			langFileName = langFileName.replace(/.js/i,"");

			//Manual priority
			if (langFileName=='en') { r=0; i--; }
			else if (langFileName=='ru') { r=1; i--; }
			else if (langFileName=='uk') { r=2; i--; }
			else if (langFileName=='de') { r=3; i--; }
			else { r=i; }
			//Manual priority

			lanSelect.options[r] = new Option((lang_support[langFileName]?lang_support[langFileName]:langFileName), langFileName);
			lanSelect.options[r].title = 'tools/language/ico/' + langFileName + '.gif';
			if (langFileName == lang) lanSelect.options[r].selected=true;
			i++;
		}
	}
	lanSelect.style.visibility="visible";
}

function morfolog(val,days){
	ret = val;
	switch(lang){
	   case "ru":
			var sDaysLeft = String(days);
			var sDaysText = "_morf1"; // 5 days
			var nDaysLeftLength = sDaysLeft.length;
			if (sDaysLeft.charAt(nDaysLeftLength - 2) != "1"){
			  if (sDaysLeft.charAt(nDaysLeftLength - 1) == "2" || sDaysLeft.charAt(nDaysLeftLength - 1) == "3" || sDaysLeft.charAt(nDaysLeftLength - 1) == "4") sDaysText = "_morf2"; // 2 days
			  else if (sDaysLeft.charAt(nDaysLeftLength - 1) == "1") sDaysText = "_morf3"; // 1 day
			}
			try { eval("ret = "+val+sDaysText+";"); }
			catch(e){ }
			return ret;
		default:
			try { eval("ret = "+val+";"); }
			catch(e){ }
			return ret;
	}
}
