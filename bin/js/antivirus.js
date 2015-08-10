'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Antivirus = (function () {
  function Antivirus() {
    _classCallCheck(this, Antivirus);

    this.scanAntiviruses = this.memoize(this.scanAntiviruses);
    this.isSecurityCenterServiceRunning = this.memoize(this.isSecurityCenterServiceRunning);
  }

  Antivirus.prototype.init = function init() {
    try {
      var center = this.isSecurityCenterServiceRunning();
      var antiviruses = this.scanAntiviruses();
      log('[antivirus] Security Center Service is ' + (center ? '' : 'NOT') + ' running');
      if (antiviruses.length) {
        log('[antivirus] Antiviruses:', antiviruses);
      } else {
        log('[antivirus] No antiviruses found');
      }
    } catch (err) {
      log('[antivirus] init failed', err);
    }
  };

  Antivirus.prototype.memoize = function memoize(func) {
    var _this = this;

    var cache = undefined;
    return function () {
      if (cache) {
        return cache;
      } else {
        cache = func.call(_this);
        return cache;
      }
    };
  };

  Antivirus.prototype.clearUndefVar = function clearUndefVar(varib) {
    try {
      varib = varib + '';
      return varib.replace('null', '').replace('undefined', '');
    } catch (err) {
      return '';
    }
  };

  Antivirus.prototype.getSystemWMIScalar = function getSystemWMIScalar(query) {
    try {
      var colItems = objWMIService.ExecQuery(query);
      if (colItems.count) {
        var e = new Enumerator(colItems);
        return e.item();
      }
    } catch (err) {}
    return null;
  };

  Antivirus.prototype.isSecurityCenterServiceRunning = function isSecurityCenterServiceRunning() {
    var service = this.getSystemWMIScalar('SELECT State, Name FROM Win32_Service WHERE Name="wscsvc"');
    return service.State === 'Running';
  };

  Antivirus.prototype.scanAntiviruses = function scanAntiviruses() {
    var antivirus = [];
    var objWMIService_antivir = locator.ConnectServer(null, '\\root\\SecurityCenter' + (OSVersion >= 6 ? '2' : ''));
    var colItems = objWMIService_antivir.ExecQuery('SELECT * FROM AntiVirusProduct', 'WQL');
    var enumItems = new Enumerator(colItems);
    for (; !enumItems.atEnd(); enumItems.moveNext()) {
      var objItem = enumItems.item();
      if (objItem.displayName !== 'Windows Defender') {
        antivirus.push({
          companyName: this.clearUndefVar(objItem.companyName),
          displayName: this.clearUndefVar(objItem.displayName),
          productState: this.clearUndefVar(objItem.productState),
          instanceGuid: this.clearUndefVar(objItem.instanceGuid),
          onAccessScanningEnabled: this.clearUndefVar(objItem.onAccessScanningEnabled),
          pathToSignedProductExe: this.clearUndefVar(objItem.pathToSignedProductExe),
          productHasNotifiedUser: this.clearUndefVar(objItem.productHasNotifiedUser),
          productUptoDate: this.clearUndefVar(objItem.productUptoDate),
          productWantsWscNotifications: this.clearUndefVar(objItem.productWantsWscNotifications),
          versionNumber: this.clearUndefVar(objItem.versionNumber)
        });
      }
    }
    return antivirus;
  };

  Antivirus.prototype.hasAntiviruses = function hasAntiviruses() {
    try {
      return this.isSecurityCenterServiceRunning() && this.scanAntiviruses().length > 0;
    } catch (err) {
      return true;
    }
  };

  return Antivirus;
})();

window.antivirus = new Antivirus();