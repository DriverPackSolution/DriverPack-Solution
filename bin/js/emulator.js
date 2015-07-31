var hasActiveX;
try{
    hasActiveX = new window.ActiveXObject('WScript.Shell');
} catch(e) {
    hasActiveX = false;
}
if (!hasActiveX) {
    window.emulatingIE = true;

    window.localStorage = window.localStorage || {};
    window.console = window.console || {log: function() {}};
    window.ActiveXObject = function(name) {
        switch (name) {
        case 'WScript.Shell':
            return {
                Environment: function () {
                  return function () {}
                },
                ExpandEnvironmentStrings: function () {},
                RegRead: function (key) {
                    switch (key){
                        case 'HKCU\\Control Panel\\International\\Locale':
                            return '0419';
                        case 'HKCU\\SOFTWARE\\drpsu\\lang':
                            return localStorage.lang;
                    }
                },
                RegWrite: function (key, value) {
                    switch (key){
                        case 'HKCU\\SOFTWARE\\drpsu\\lang':
                            localStorage.lang = value;
                    }
                },
                Run: function () {},
                run: function () {},
                SpecialFolders: function () {}
            };
        case 'WbemScripting.SWbemLocator':
            return {
                ConnectServer: function () {
                    return {
                        ExecQuery: function (query) {
                            if (/Win32_OperatingSystem/.test(query)) {
                                return [{Caption: 'Windows XP', Version: '5.1'}]
                            }
                            if (/Win32_PnPSignedDriver/.test(query)) {
                                var ids = ["ACPI\\PNP0A03", "PCI\\VEN_8086&DEV_1237&SUBSYS_00000000&REV_02", "PCI\\VEN_8086&DEV_7000&SUBSYS_00000000&REV_00", "ACPI\\PNP0303", "ACPI\\PNP0200", "ACPI\\PNP0F03", "ACPI\\PNP0400", "ACPI\\PNP0100", "ACPI\\PNP0000", "PCI\\VEN_8086&DEV_7111&SUBSYS_00000000&REV_01", "PCI\\VEN_80EE&DEV_BEEF&SUBSYS_00000000&REV_00", "PCI\\VEN_1022&DEV_2000&SUBSYS_20001022&REV_40", "PCI\\VEN_80EE&DEV_CAFE&SUBSYS_00000000&REV_00", "PCI\\VEN_8086&DEV_2415&SUBSYS_00008086&REV_01", "PCI\\VEN_106B&DEV_003F&SUBSYS_00000000&REV_00", "USB\\ROOT_HUB&VID106B&PID003F&REV0000", "USB\\VID_80EE&PID_0021&REV_0100", "ACPI\\ACPI0003", "ACPI\\FIXEDBUTTON", "ACPI\\GENUINEINTEL_\\_X86_FAMILY_6_MODEL_45"];
                                return ids.map(function(x) {return {HardWareID: x}});
                            }
                        }
                    }
                }
            };
        case 'Scripting.FileSystemObject':
            return {
                CreateFolder: function () {},
                GetFile: function (file) {
                    switch (file) {
                    case 'tools\\modules\\clientid.js':
                        return {
                            Size: localStorage.clientId.length,
                            OpenAsTextStream: function() {
                                return {
                                    ReadAll: function() {
                                        return "'_" + localStorage.clientId + ".exe'";
                                    }
                                };
                            }
                        };
                    }
                },
                GetFileName: function () {},
                GetFolder: function (dir) {
                    switch (dir) {
                    case 'tools\\language':
                        return {Files: [
                            {name: 'ru.js'},
                            {name: 'uk.js'},
                            {name: 'de.js'},
                            {name: 'en.js'}
                        ]};
                    }
                },
                FileExists: function (file) {
                    switch (file) {
                    case 'tools\\wget.exe':
                        return true;
                    case 'tools\\modules\\clientid.js':
                        return !!localStorage.clientId;
                    }
                },
                FolderExists: function () {},
                OpenTextFile: function () {
                    return {
                        ReadAll: function () {}
                    };
                }
            };
        case 'WbemScripting.SWbemNamedValueSet':
            return {
                Add: function () {}
            };
        case 'Wbemscripting.SWbemLocator':
            return {
                ConnectServer: function () {
                    return {
                        Get: function () {
                            return {
                                Methods_: {
                                    Item: function () {
                                        return {
                                            InParameters: {
                                                SpawnInstance_: function () {
                                                    return {};
                                                }
                                            }
                                        };
                                    }
                                },
                                ExecMethod_: function () {
                                    return {};
                                }
                            };
                        }
                    };
                }
            };
        default:
            throw new Error('undefined ActiveXObject ' + name + ' in emulator.js');
        };
    };

    window.Enumerator = function (array) {
        if (!array) throw new Error('Enumerator expected array');
        this.index = 0;
        this.array = array;
    };
    window.Enumerator.prototype.atEnd = function () {
        return this.index >= this.array.length;
    };
    window.Enumerator.prototype.item = function () {
        return this.array[this.index];
    }
    window.Enumerator.prototype.moveFirst = function () {};
    window.Enumerator.prototype.moveNext = function () {
        this.index += 1;
    };
}
