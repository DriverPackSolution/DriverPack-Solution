if (typeof emulatingIE !== 'undefined') {
  window.log = console.log.bind(console);
  var _sendYaMetrika;
  if (window.statistics) _sendYaMetrika = window.statistics.sendYaMetrika;
  if (window.statistics) window.statistics.sendUrl = function() {};
  if (window.statistics) window.statistics.sendYaMetrika = function(event) {
    if (window.yaCounter) window.yaCounter.hit = function() {};
    _sendYaMetrika(event);
  };

  if (window.DriverPack) window.DriverPack.install = function (IDs, events) {
    setTimeout(function() {
      events.afterInstalled();
    }, 4000);
  }

  if (window.SoftPack) window.SoftPack.install = function (IDs, events) {
    setTimeout(function() {
      events.afterAllInstalled();
    }, 4000);
  }

}
