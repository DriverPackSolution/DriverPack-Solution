if (typeof emulatingIE !== 'undefined') {
  window.log = console.log.bind(console);
  var _sendYaMetrika;
  if (window.statistics) _sendYaMetrika = window.statistics.sendYaMetrika;
  if (window.statistics) window.statistics.sendUrl = function() {};
  if (window.statistics) window.statistics.sendYaMetrika = function(event) {
    window.yaCounter.hit = function() {};
    _sendYaMetrika(event);
  };
}
