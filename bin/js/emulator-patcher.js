if (typeof emulatingIE !== 'undefined') {
  window.log = console.log.bind(console);
  if (window.statistics) window.statistics.sendUrl = function() {};
  if (window.statistics) window.statistics.sendYaMetrika = function() {};
}
