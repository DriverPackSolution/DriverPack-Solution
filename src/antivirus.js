class Antivirus {
  constructor () {
    this.scanAntiviruses = this.memoize(this.scanAntiviruses)
    this.isSecurityCenterServiceRunning = this.memoize(this.isSecurityCenterServiceRunning)
  }

  init () {
    try {
      let center = this.isSecurityCenterServiceRunning()
      let antiviruses = this.scanAntiviruses()
      log(`[antivirus] Security Center Service is ${center ? '' : 'NOT'} running`)
      if (antiviruses.length) {
        log(`[antivirus] Antiviruses:`, antiviruses)
      } else {
        log(`[antivirus] No antiviruses found`)
      }
    } catch(err) {
      log('[antivirus] init failed', err)
    }
  }

  memoize (func) {
    let cache
    return () => {
      if (cache) {
        return cache
      } else {
        cache = func.call(this)
        return cache
      }
    }
  }

  clearUndefVar (varib) {
    try {
      varib = varib + ''
      return varib.replace('null', '').replace('undefined', '')
    } catch(err) {
      return ''
    }
  }

  getSystemWMIScalar (query) {
    try {
      let colItems = objWMIService.ExecQuery(query)
      if (colItems.count) {
        var e = new Enumerator(colItems)
        return e.item()
      }
    } catch(err) {}
    return null
  }

  isSecurityCenterServiceRunning () {
    const service = this.getSystemWMIScalar('SELECT State, Name FROM Win32_Service WHERE Name="wscsvc"')
    return service.State === 'Running'
  }

  scanAntiviruses () {
    const antivirus = []
    let objWMIService_antivir = locator.ConnectServer(null, '\\root\\SecurityCenter' + (OSVersion >= 6 ? '2' : ''))
    let colItems = objWMIService_antivir.ExecQuery('SELECT * FROM AntiVirusProduct', 'WQL')
    let enumItems = new Enumerator(colItems)
    for (; !enumItems.atEnd(); enumItems.moveNext()) {
      var objItem = enumItems.item()
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
        })
      }
    }
    return antivirus
  }

  hasAntiviruses () {
    try {
      return this.isSecurityCenterServiceRunning() && this.scanAntiviruses().length > 0
    } catch(err) {
      return true
    }
  }
}

window.antivirus = new Antivirus()
