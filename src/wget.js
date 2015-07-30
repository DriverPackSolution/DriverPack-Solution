class Wget {
  constructor() {
    this.timer = null
    this.onDownloaded = {}
    this.concurrency = 5
  }

  wrapInCmd (command) {
    return `cmd /c "${command}"`
  }

  wgetRun (downloadURI, targetFolder, job_id) {
    log(`[wget] downloading ${downloadURI}`)
    if (!fso.FolderExists(`${AppData}\\DRPSu\\temp`)) {
        fso.CreateFolder(`${AppData}\\DRPSu\\temp`)
    }
    if (fso.FileExists(wget_path)) {
      if (1 || !driver_exists(downloadURI, targetFolder)) {
        const parsed_url = downloadURI.split("/")
        const log_file = this.pathToLogFile(job_id)
        const trigger_file = this.pathToTriggerFile(job_id)
        const wgetCommand = `"${wget_path}" -P "${targetFolder}" "${downloadURI}" -o "${log_file}" & echo DONE > "${trigger_file}"`
        const command = this.wrapInCmd(wgetCommand)
        log(`[wget] Running: ${command}`)
        const wsShellObj = WshShell.Run(command, 0, false)
        return parsed_url[parsed_url.length - 1]
      } else {
        return null
      }
    } else {
      log('[wget] wget.exe not found')
    }
  }

  wgetWrapper (events, path, item, i, items) {
    return new Promise((resolve, reject) => {
      log('Downloading: ' + item.URL + '. To folder: ' + path)
      events.beforeDownloading(item, i, items)
      const job_id = this.generateJobId()
      this.wgetRun(item.URL, path, job_id)
      this.saveJob(job_id, resolve, item)
    }).tap(() => {
      events.afterDownloading(item, i, items)
    })
  }

  generateJobId () {
    return +Math.round(1e5 * Math.random())
  }

  saveJob (id, resolve, item) {
    log('saveJob')
    this.onDownloaded[id] = () => resolve(item)
    this.start()
  }

  pathToLogFile (id) {
    return `${AppData}\\DRPSu\\temp\\wget_log_${id}.log`
  }

  pathToTriggerFile (id) {
    return `${AppData}\\DRPSu\\temp\\wget_finished_${id}.txt`
  }

  tick () {
    const keys = Object.keys(this.onDownloaded)
    if (keys.length > 0) {
      keys.forEach(job_id => {
        const trigger_file = this.pathToTriggerFile(job_id)
        if (fso.FileExists(trigger_file)) {
          log(`[wget] downloaded job ${job_id}`)
          this.onDownloaded[job_id]()
          delete this.onDownloaded[job_id]
          try {
            const log_file = this.pathToLogFile(job_id)
            log([fso.OpenTextFile(log_file, 1, false).ReadAll()])
          } catch(e) {
          }
        }
      })
    } else {
      log('[wget] tick: no downloads')
      this.stop()
    }
  }

  stop () {
    clearInterval(this.timer)
  }

  start () {
    this.stop()
    this.timer = setInterval(() => this.tick(), 2000)
  }

  downloadFiles (events, path, items) {
    log(`[wget] downloading ${items.length} files`)
    return Promise.map(
      items,
      (item, i) => this.wgetWrapper(events, path, item, i, items),
      {concurrency: this.concurrency}
    )
  }
}

window.wget = new Wget()
