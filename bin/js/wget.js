'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Wget = (function () {
  function Wget() {
    _classCallCheck(this, Wget);

    this.timer = null;
    this.onDownloaded = {};
    this.concurrency = 5;
  }

  Wget.prototype.wrapInCmd = function wrapInCmd(command) {
    return 'cmd /c "' + command + '"';
  };

  Wget.prototype.wgetRun = function wgetRun(downloadURI, targetFolder, job_id) {
    log('[wget] downloading ' + downloadURI);
    if (!fso.FolderExists(AppData + '\\DRPSu\\temp')) {
      fso.CreateFolder(AppData + '\\DRPSu\\temp');
    }
    if (fso.FileExists(wget_path)) {
      if (1 || !driver_exists(downloadURI, targetFolder)) {
        var parsed_url = downloadURI.split('/');
        var log_file = this.pathToLogFile(job_id);
        var trigger_file = this.pathToTriggerFile(job_id);
        var wgetCommand = '"' + wget_path + '" -P "' + targetFolder + '" "' + downloadURI + '" -o "' + log_file + '" & echo DONE > "' + trigger_file + '"';
        var command = this.wrapInCmd(wgetCommand);
        log('[wget] Running: ' + command);
        WshShell.Run(command, 0, true);
        return parsed_url[parsed_url.length - 1];
      } else {
        return null;
      }
    } else {
      log('[wget] wget.exe not found');
    }
  };

  Wget.prototype.wgetWrapper = function wgetWrapper(events, path, item, i, items) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      log('Downloading: ' + item.URL + '. To folder: ' + path);
      events.beforeDownloading(item, i, items);
      var job_id = _this.generateJobId();
      setTimeout(function () {
        return _this.wgetRun(item.URL, path, job_id);
      }, 0);
      _this.saveJob(job_id, resolve, item);
    }).tap(function () {
      events.afterDownloading(item, i, items);
    });
  };

  Wget.prototype.generateJobId = function generateJobId() {
    return +Math.round(1e5 * Math.random());
  };

  Wget.prototype.saveJob = function saveJob(id, resolve, item) {
    log('saveJob');
    this.onDownloaded[id] = function () {
      return resolve(item);
    };
    this.start();
  };

  Wget.prototype.pathToLogFile = function pathToLogFile(id) {
    return AppData + '\\DRPSu\\temp\\wget_log_' + id + '.log';
  };

  Wget.prototype.pathToTriggerFile = function pathToTriggerFile(id) {
    return AppData + '\\DRPSu\\temp\\wget_finished_' + id + '.txt';
  };

  Wget.prototype.tick = function tick() {
    var _this2 = this;

    var keys = Object.keys(this.onDownloaded);
    if (keys.length > 0) {
      keys.forEach(function (job_id) {
        var trigger_file = _this2.pathToTriggerFile(job_id);
        if (fso.FileExists(trigger_file)) {
          log('[wget] downloaded job ' + job_id);
          _this2.onDownloaded[job_id]();
          delete _this2.onDownloaded[job_id];
          try {
            var log_file = _this2.pathToLogFile(job_id);
            log([fso.OpenTextFile(log_file, 1, false).ReadAll()]);
          } catch (e) {}
        }
      });
    } else {
      log('[wget] tick: no downloads');
      this.stop();
    }
  };

  Wget.prototype.stop = function stop() {
    clearInterval(this.timer);
  };

  Wget.prototype.start = function start() {
    var _this3 = this;

    this.stop();
    this.timer = setInterval(function () {
      return _this3.tick();
    }, 2000);
  };

  Wget.prototype.downloadFiles = function downloadFiles(events, path, items) {
    var _this4 = this;

    log('[wget] downloading ' + items.length + ' files');
    return Promise.map(items, function (item, i) {
      return _this4.wgetWrapper(events, path, item, i, items);
    }, { concurrency: this.concurrency });
  };

  return Wget;
})();

window.wget = new Wget();