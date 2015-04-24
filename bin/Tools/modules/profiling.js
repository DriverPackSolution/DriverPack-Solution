/*
@author: Remy Sharp / http://remysharp.com
@date: 2007-04-20
@name: time
@methods:
  start - start named timer
  stop - stop named timer
  event - hook predefined event
  func - hook existing function, or hook anonymous function (note refrence is passed back)
  report - output timings
*/

if (typeof window.time == 'undefined') {  
  (function() {
    window.time = {
      // start + stop taken from firebuglite.js - http://getfirebug.com/firebuglite
      start: function(name) {
        if (!name) {
          error('start: If starting a timer manually a name must be set');
        } else {
          timeMap[name] = (new Date()).getTime();
        }
      },

      stop: function(name) {
        if (name in timeMap) {
          var stop = (new Date()).getTime();
          var l = new Report(name, timeMap[name], stop);
          log.push(l);
          if (lineReport) lineReportMethod.call(this, l);
          delete timeMap[name];
        } else {
          error('stop:' + name + ' not found');
        }
      },

      event: function(name, elm, type) {
        if (typeof name != 'string') {
          // name has not been passed in
          type = elm;
          elm = name;
          name = '';
        }

        if (!elm.length) {
          elm = [elm];
        }

        if (type.indexOf('on') == -1) {
          type = 'on' + type;
        }

        var i = elm.length;
        var timerN = null;
        var c = null;
        while (i--) {
          timerN = name;
          if (!timerN) {
            timerN = elm[i].id || elm[i].getAttribute('class') || elm[i].getAttribute('className') || elm[i].tagName;
          }

          mapEvent(elm[i], type, timerN);
        }
      },

      func: function(name, fn) {
        if (typeof name == 'function') {
          fn = name;
        }
        
        // get function name as this browser may not support fn.name (IE + Safari + Opera)
        if (!fn.name && typeof fn == 'function') {
          var m = fn.toString().match(/function\s*(.*)\s*\(/);
          if (m[1]) {
            fn.name = m[1];
          }
        }

        if (typeof fn == 'function' && !fn.name) {
          // function is anonymous - 
          // time function using var func = time.fn(function() { ...do stuff });
          if (typeof name != 'string') {
            anonFuncId++;
            name = 'anonymous' + anonFuncId;
          }

          return function() {
            time.start(name);
            var ret = fn.apply(window, arguments);
            time.stop(name);
            return ret;
          };
        } else {
          var fnName = fn.name || fn;
          if (typeof name != 'string') {
            name = fnName;
          }

          eval('var fnCopy = ' + fnName);
          if (typeof fnCopy == 'function') {
            var wrap = function() {
              time.start(name);
              var ret = fnCopy.apply(this, arguments);
              time.stop(name);
              return ret;
            };
            wrap.hooked = true;
            eval(fnName + ' = wrap;');
            return eval(fnName);
          } else { 
            // error hooking
            error('func: Could not hook function (name: ' + name + ')');
          }          
        }
      },
      
      report: function(name) {
        if (typeof name == 'undefined') {
          reportMethod.call(this, log);
        } else {
          var i = log.length;
          var l = [];
          while (i--) {
            if (name == log[i].name) {
              l.push(log[i]);
            }
          }
          reportMethod.call(this, l);
        }        
      },

      setReportMethod: function(fn) {
        if (fn.hooked) {
          error('setReportMethod: Cannot use hooked method ' + fn.name);
        } else {
          reportMethod = fn;
        }        
      },

      setLineReportMethod: function(fn) {
        if (fn.hooked) {
          error('setLineReportMethod: Cannot use hooked method ' + fn.name);
        } else {
          lineReportMethod = fn;
          lineReport = true;
        }        
      },

      errors: false
    };

    var timeMap = {};
    var log = [];
    var reportMethod = defaultReport;
    var lineReport = false;
    var lineReportMethod = defaultLineReport;
    var anonFuncId = 0;

    var Report = function(n, s, e) {
      this.name = n;
      this.start = s;
      this.stop = e;
      this.delta = e - s;
      // useful if I could grab the call - but can't see how due to anon functions (though I can see them in the start method)
    };

    Report.prototype.toString = function() {
      return this.name + ": " + this.delta + "ms";
    };

    function defaultReport(l) {
      alert(l.join("\n"));
    }

    function defaultLineReport(l) {
      alert(l);
    }

    function error(e) {
      if (time.errors) alert(e);
    }
    
    // required to create a brand new instance of our copied function
    function mapEvent(e, t, n) {
      var c = e[t];
      if (typeof c == 'function') {
        e[t] = function() {
            time.start(n + ':' + t);
            var ret = c.apply(this, arguments);
            time.stop(n + ':' + t);
            return ret;
        };
      } else {
        error('event: Function must be set on element.' + t + ' before hooking (name: ' + n + ')');
      }
    }
  })();
}