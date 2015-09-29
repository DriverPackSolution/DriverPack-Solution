// Thanks to https://github.com/Nummer/Destroy-Windows-10-Spying

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Dws = (function () {
  function Dws() {
    _classCallCheck(this, Dws);

    this.applied = this.checkApplied();
  }

  Dws.prototype.init = function init() {
    if (lang !== 'ru' || OSVersion < 6.1) {
      this.hide();
    } else {
      this.informApplied();
    }
  };

  Dws.prototype.click = function click() {
    var _this = this;

    if (document.getElementById('dws').className === 'dws disabled') {
      return;
    }
    document.getElementById('dws-text').innerText = 'Слежка отключается...';
    document.getElementById('dws').className = 'dws disabled';
    this.progress = 0;
    setTimeout(function () {
      _this.changeProgress();
    }, 600);
    this.start();
    this.informApplied();
    this.progress = -1;
  };

  Dws.prototype.changeProgress = function changeProgress() {
    var _this2 = this;

    if (this.progress === -1) {
      return;
    }
    var text = 'Слежка отключается';
    for (var i = 0; i < 4; i++) {
      if (i < this.progress) {
        text += '.';
      } else {
        text += '&nbsp;';
      }
    }
    document.getElementById('dws-text').innerHTML = text;
    this.progress = (this.progress + 1) % 4;
    setTimeout(function () {
      _this2.changeProgress();
    }, 600);
  };

  Dws.prototype.hide = function hide() {
    document.getElementById('dws').style.display = 'none';
  };

  Dws.prototype.informApplied = function informApplied() {
    if (this.applied) {
      document.getElementById('dws-text').innerText = 'Слежка Windows успешно отключена';
      document.getElementById('dws').className = 'dws disabled';
    } else {
      document.getElementById('dws-text').innerText = 'Хотите отключить слежку Windows?';
    }
  };

  Dws.prototype.checkApplied = function checkApplied() {
    switch (RegRead(Reg + 'DWSApplied')) {
      case 1:
        return true;
      default:
        return false;
    }
  };

  Dws.prototype.start = function start() {
    log('[dws] started');
    statistics.event({ action: 'dws started' });
    this.createRestPoint();
    if (OSVersion === 10.0) {
      this.disableKeyLoggerAndTelemetry();
      this.addToHosts();
      this.addToFirewall();
      this.disablePrivateSettings();
      this.disableSpyingTasks();
    } else if (OSVersion >= 6.1) {
      this.addToHosts();
      this.addToFirewall();
      this.disableSpyingTasks();
      this.deleteUpdatesWin78();
      this.disableWin78Spy();
    }
    var command = 'reg add "' + Reg.slice(0, -1) + '" /v "DWSApplied" /t REG_DWORD /d 1 /f';
    winRun(command, true, true, true);
    this.applied = this.checkApplied();
    log('[dws] finished');
    statistics.event({ action: 'dws finished' });
  };

  Dws.prototype.createRestPoint = function createRestPoint() {
    log('[dws] createRestPoint');
    var command = 'wmic /Namespace:\\\\root\\default Path SystemRestore Call CreateRestorePoint \"DriverPack Solution Disable Windows Spy\", 100, 10';
    winRun(command, true, true, true);
  };

  Dws.prototype.disableKeyLoggerAndTelemetry = function disableKeyLoggerAndTelemetry() {
    log('[dws] disableKeyLoggerAndTelemetry');
    var commands = ['net stop DiagTrack', 'net stop diagnosticshub.standardcollector.service', 'net stop dmwappushservice', 'net stop WMPNetworkSvc', 'sc config DiagTrack start=disabled', 'sc config diagnosticshub.standardcollector.service start=disabled', 'sc config dmwappushservice start=disabled', 'sc config WMPNetworkSvc start=disabled', 'reg add HKLM\\SYSTEM\\ControlSet001\\Control\\WMI\\AutoLogger\\AutoLogger-Diagtrack-Listener /v Start /t REG_DWORD /d 0 /f', 'net stop dmwappushservice', 'net stop diagtrack',
    // 'sc delete dmwappushsvc',
    // 'sc delete \"Diagnostics Tracking Service\"',
    // 'sc delete diagtrack',
    'reg add \"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Device Metadata\" /v \"PreventDeviceMetadataFromNetwork\" /t REG_DWORD /d 1 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection\" /v \"AllowTelemetry\" /t REG_DWORD /d 0 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\MRT\" /v \"DontOfferThroughWUAU\" /t REG_DWORD /d 1 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\SQMClient\\Windows\" /v \"CEIPEnable\" /t REG_DWORD /d 0 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat\" /v \"AITEnable\" /t REG_DWORD /d 0 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat\" /v \"DisableUAR\" /t REG_DWORD /d 1 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection\" /v \"AllowTelemetry\" /t REG_DWORD /d 0 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\WMI\\AutoLogger\\AutoLogger-Diagtrack-Listener\" /v \"Start\" /t REG_DWORD /d 0 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\WMI\\AutoLogger\\SQMLogger\" /v \"Start\" /t REG_DWORD /d 0 /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Siuf\\Rules\" /v \"NumberOfSIUFInPeriod\" /t REG_DWORD /d 0 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat\" /v \"DisableUAR\" /t REG_DWORD /d 1 /f', 'reg add \"HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\SQMClient\\Windows\" /v \"CEIPEnable\" /t REG_DWORD /d 0 /f', 'reg delete \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Siuf\\Rules\" /v \"PeriodInNanoSeconds\" /f'];
    commands.forEach(function (command) {
      winRun(command, true, true, true);
    });
  };

  Dws.prototype.addToHosts = function addToHosts() {
    log('[dws] addToHosts');
    var hostsDomains = ['vortex.data.microsoft.com', 'vortex-win.data.microsoft.com', 'telecommand.telemetry.microsoft.com', 'telecommand.telemetry.microsoft.com.nsatc.net', 'oca.telemetry.microsoft.com', 'sqm.telemetry.microsoft.com', 'sqm.telemetry.microsoft.com.nsatc.net', 'watson.telemetry.microsoft.com', 'watson.telemetry.microsoft.com.nsatc.net', 'redir.metaservices.microsoft.com', 'choice.microsoft.com', 'choice.microsoft.com.nsatc.net', 'wes.df.telemetry.microsoft.com', 'services.wes.df.telemetry.microsoft.com', 'sqm.df.telemetry.microsoft.com', 'telemetry.microsoft.com', 'watson.ppe.telemetry.microsoft.com', 'telemetry.appex.bing.net', 'telemetry.urs.microsoft.com', 'telemetry.appex.bing.net:443', 'settings-sandbox.data.microsoft.com', 'survey.watson.microsoft.com', 'watson.live.com', 'watson.microsoft.com', 'statsfe2.ws.microsoft.com', 'corpext.msitadfs.glbdns2.microsoft.com', 'compatexchange.cloudapp.net', 'a-0001.a-msedge.net', 'statsfe2.update.microsoft.com.akadns.net', 'sls.update.microsoft.com.akadns.net', 'fe2.update.microsoft.com.akadns.net', 'diagnostics.support.microsoft.com', 'corp.sts.microsoft.com', 'statsfe1.ws.microsoft.com', 'feedback.windows.com', 'feedback.microsoft-hohm.com', 'feedback.search.microsoft.com', 'rad.msn.com', 'preview.msn.com', 'ad.doubleclick.net', 'ads.msn.com', 'ads1.msads.net', 'ads1.msn.com', 'a.ads1.msn.com', 'a.ads2.msn.com', 'adnexus.net', 'adnxs.com', 'az361816.vo.msecnd.net', 'az512334.vo.msecnd.net', 'ssw.live.com', 'ca.telemetry.microsoft.com', 'i1.services.social.microsoft.com', 'i1.services.social.microsoft.com.nsatc.net', 'df.telemetry.microsoft.com', 'reports.wes.df.telemetry.microsoft.com', 'cs1.wpc.v0cdn.net', 'vortex-sandbox.data.microsoft.com', 'oca.telemetry.microsoft.com.nsatc.net', 'pre.footprintpredict.com', 'spynet2.microsoft.com', 'spynetalt.microsoft.com', 'fe3.delivery.dsp.mp.microsoft.com.nsatc.net'];

    var hostsLocation = WshShell.ExpandEnvironmentStrings('%windir%\\system32\\drivers\\etc\\hosts');
    var hostsFile = fso.OpenTextFile(hostsLocation, 1, true);
    var hosts = hostsFile.AtEndOfStream ? '' : hostsFile.ReadAll();
    hostsFile.Close();
    hostsFile = fso.OpenTextFile(hostsLocation, 8);
    hostsDomains.forEach(function (domain) {
      if (hosts.indexOf(domain) === -1) {
        hostsFile.WriteLine('0.0.0.0 ' + domain);
      }
    });
    hostsFile.Close();
  };

  Dws.prototype.addToFirewall = function addToFirewall() {
    log('[dws] addToFirewall');
    var ips = ['111.221.29.177', '111.221.29.253', '131.253.40.37', '134.170.30.202', '134.170.115.60', '134.170.165.248', '134.170.165.253', '134.170.185.70', '137.116.81.24', '137.117.235.16', '157.55.129.21', '157.55.133.204', '157.56.121.89', '157.56.91.77', '168.63.108.233', '191.232.139.254', '191.232.80.58', '191.232.80.62', '191.237.208.126', '204.79.197.200', '207.46.101.29', '207.46.114.58', '207.46.223.94', '207.68.166.254', '212.30.134.204', '212.30.134.205', '23.102.21.4', '23.99.10.11', '23.218.212.69', '64.4.54.22', '64.4.54.32', '64.4.6.100', '65.39.117.230', '65.52.100.11', '65.52.100.7', '65.52.100.9', '65.52.100.91', '65.52.100.92', '65.52.100.93', '65.52.100.94', '65.52.108.29', '65.55.108.23', '65.55.138.114', '65.55.138.126', '65.55.138.186', '65.55.252.63', '65.55.252.71', '65.55.252.92', '65.55.252.93', '65.55.29.238', '65.55.39.10', '191.232.139.2', '64.4.23.0-64.4.23.255', '111.221.64.0-111.221.127.255', '157.55.235.0-157.55.235.255', '157.55.56.0-157.55.56.255', '157.55.52.0-157.55.52.255', '157.55.130.0-157.55.130.255', '65.55.223.0-65.55.223.255', '213.199.179.0-213.199.179.255', '195.138.255.0-195.138.255.255'];
    ips.forEach(function (ip) {
      var commands = ['route -p ADD ' + ip + ' MASK 255.255.255.255 0.0.0.0', 'netsh advfirewall firewall delete rule name="' + ip + '_Block"', 'netsh advfirewall firewall add rule name="' + ip + '_Block" dir=out interface=any action=block remoteip=' + ip];
      commands.forEach(function (command) {
        winRun(command, true, true, true);
      });
    });
    winRun('netsh advfirewall firewall delete rule name=\"WSearch_Block\"', true, '', true);
    winRun('netsh advfirewall firewall add rule name=\"WSearch_Block\" dir=out interface=any action=block service=WSearch', true, '', true);
  };

  Dws.prototype.disablePrivateSettings = function disablePrivateSettings() {
    log('[dws] disablePrivateSettings');
    var commands = ['reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{21157C1F-2651-4CC1-90CA-1F28B02263F6}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{2EEF81BE-33FA-4800-9670-1CD474972C3F}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{7D7E8402-7C54-4821-A34E-AEEFD62DED93}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{992AFA70-6F47-4148-B3E9-3003349C1548}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{9D9E0118-1807-4F2E-96E4-2CE57142E196}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{A8804298-2D5F-42E3-9531-9C8C39EB29CE}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{B19F89AF-E3EB-444B-8DEA-202575A71599}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{BFA794E4-F964-4FDB-90F6-51056BFE4B44}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{C1D23ACC-752B-43E5-8448-8D0E519CD6D6}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{D89823BA-7180-4B81-B50C-7E471E6121A3}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{E5323777-F976-4f5b-9B55-B94699C46E44}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{E6AD100E-5F4E-44CD-BE0F-2265D88D14F5}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\{E83AF229-8640-4D18-A213-E22675EBB2C3}\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeviceAccess\\Global\\LooselyCoupled\" /v \"Value\" /d \"Deny\" /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search\" /v \"CortanaEnabled\" /t REG_DWORD /d 0 /f', 'reg add \"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search\" /v \"BingSearchEnabled\" /t REG_DWORD /d 0 /f'];
    commands.forEach(function (command) {
      winRun(command, true, '', true);
    });
  };

  Dws.prototype.disableSpyingTasks = function disableSpyingTasks() {
    log('[dws] disableSpyingTasks');
    var tasks = ['Microsoft\\Office\\Office ClickToRun Service Monitor', 'Microsoft\\Office\\OfficeTelemetryAgentFallBack2016', 'Microsoft\\Office\\OfficeTelemetryAgentLogOn2016', 'Microsoft\\Windows\\Customer Experience Improvement Program\\KernelCeipTask', 'Microsoft\\Windows\\Customer Experience Improvement Program\\UsbCeip', 'Microsoft\\Windows\\Power Efficiency Diagnostics\\AnalyzeSystem', 'Microsoft\\Windows\\Shell\/familySafetyMonitor', 'Microsoft\\Windows\\Shell\/familySafetyRefresh', 'Microsoft\\Windows\\Application Experience\\AitAgent', 'Microsoft\\Windows\\Application Experience\\ProgramDataUpdater', 'Microsoft\\Windows\\Application Experience\\StartupAppTask', 'Microsoft\\Windows\\Autochk\\Proxy', 'Microsoft\\Windows\\Customer Experience Improvement Program\\BthSQM', 'Microsoft\\Windows\\Customer Experience Improvement Program\\Consolidator', 'Microsoft\\Office\\OfficeTelemetry\\AgentFallBack2016', 'Microsoft\\Office\\OfficeTelemetry\\OfficeTelemetryAgentLogOn2016', 'Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser', 'Microsoft\\Windows\\DiskDiagnostic\\Microsoft-Windows-DiskDiagnosticDataCollector', 'Microsoft\\Windows\\Maintenance\\WinSAT', 'Microsoft\\Windows\\Media Center\\ActivateWindowsSearch', 'Microsoft\\Windows\\Media Center\\ConfigureInternetTimeService', 'Microsoft\\Windows\\Media Center\\DispatchRecoveryTasks', 'Microsoft\\Windows\\Media Center\\ehDRMInit', 'Microsoft\\Windows\\Media Center\\InstallPlayReady', 'Microsoft\\Windows\\Media Center\\mcupdate', 'Microsoft\\Windows\\Media Center\\MediaCenterRecoveryTask', 'Microsoft\\Windows\\Media Center\\ObjectStoreRecoveryTask', 'Microsoft\\Windows\\Media Center\\OCURActivate', 'Microsoft\\Windows\\Media Center\\OCURDiscovery', 'Microsoft\\Windows\\Media Center\\PBDADiscovery', 'Microsoft\\Windows\\Media Center\\PBDADiscoveryW1', 'Microsoft\\Windows\\Media Center\\PBDADiscoveryW2', 'Microsoft\\Windows\\Media Center\\PvrRecoveryTask', 'Microsoft\\Windows\\Media Center\\PvrScheduleTask', 'Microsoft\\Windows\\Media Center\\RegisterSearch', 'Microsoft\\Windows\\Media Center\\ReindexSearchRoot', 'Microsoft\\Windows\\Media Center\\SqlLiteRecoveryTask', 'Microsoft\\Windows\\Media Center\\UpdateRecordPath'];
    tasks.forEach(function (task) {
      var command = 'SCHTASKS /Change /TN "' + task + '" /disable';
      winRun(command, true, '', true);
    });
  };

  Dws.prototype.deleteUpdatesWin78 = function deleteUpdatesWin78() {
    log('[dws] deleteUpdatesWin78');
    var updates = ['3080149', '3075249', '3068708', '3044374', '3035583', '3022345', '3021917', '3015249', '3012973', '2990214', '2977759', '2976978', '2952664', '2922324', '971033'];
    updates.forEach(function (update) {
      var command = 'wusa /uninstall /norestart /quiet /kb:' + update;
      winRun(command, true, true, true);
    });
  };

  Dws.prototype.disableWin78Spy = function disableWin78Spy() {
    log('[dws] disableWin78Spy');
    winRun('REG ADD HKLM\\SYSTEM\\CurrentControlSet\\Control\\WMI\\AutoLogger\\AutoLogger-Diagtrack-Listener /v Start /t REG_DWORD /d 0 /f', true, true, true);
  };

  return Dws;
})();

window.dws = new Dws();