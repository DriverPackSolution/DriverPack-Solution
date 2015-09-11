var Adapter = {
  active: 1,
  lastSlide: 3,
  html: function () {
    document.getElementById('Adapter').style.display = 'block';
    document.getElementById('AppDriversSoft').style.display = 'none';
    document.getElementById("menu-adapter").className = document.getElementById("menu-adapter").className + ' active';
    document.getElementById("menu-soft").className = document.getElementById("menu-soft").className.replace(/\b active\b/ig,'');
    document.getElementById("menu-drivers").className = document.getElementById("menu-drivers").className.replace(/\b active\b/ig,'');

    if (Adapter.active === 0) {
      Adapter.nextScreen();
    }
    statistics.event( { action: 'adapter store opened' } );
  },

  nextScreen: function () {
    var old = Adapter.active;
    Adapter.active++;
    var active = Adapter.active;
    if (old === 0) {
      old = Adapter.lastSlide;
    }
    document.getElementById('adapter'+old).style.display = 'none';
    document.getElementById('adapter'+active).style.display = 'block';
    if (active === 3) {
      setTimeout(
        Adapter.hideProgress,
        3000
      );
    };
    if (active === 2) {
      statistics.event( { action: 'adapter connect opened' } );
    }
  },

  clickApp: function (event, id, isCheckbox) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
    var checked = document.getElementById('adapter_label-input' + id).checked;
    if (isCheckbox) {checked = !checked}
    document.getElementById('adapter_label-input' + id).checked = !checked;
    if (checked) {
      document.getElementById('adapter_cell' + id).className = 'adapter_cell';
    } else {
      document.getElementById('adapter_cell' + id).className = 'adapter_cell active';
    }
  },

  hideProgress: function () {
    document.getElementById('adapter_progress').style.display = 'none';
    document.getElementById('adapter_form').style.display = 'block';
    statistics.event( { action: 'adapter devicemodel opened' } );
  },

  clickButton: function () {
    setTimeout(
      function() {
        document.getElementById('adapter_form-text').innerText = 'Готово!';
        document.getElementById('adapter_form-controls').style.display = 'none';
        Adapter.active = 0;
        statistics.event( { action: 'adapter devicemodel send clicked' } );
      },
      500
    )
  }
};
