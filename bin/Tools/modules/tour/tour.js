var tour = new Tour({
    template: "<div class='popover tour' style='z-index: 4000;'>\
                    <div class='arrow'></div>\
                    <h3 class='popover-title'></h3>\
                    <h5 class='popover-content'></h5>\
                    <div class='popover-navigation'>\
                        <button class='btn btn-default' data-role='prev'>« " + button_prev + "</button>\
                        <button class='btn btn-default' data-role='next'>" + button_next + " »</button>\
                        <button class='btn btn-lg btn-danger' data-role='end'>X</button>\
                    </div>\
                  </div>",
    steps: [
        {
            element: "#tab-driver",
            title: infobar_tabDriver,
            content: content_driver
        },
        {
            element: "#tab-programm",
            title: infobar_tabProgramm,
            content: content_programm
        },
        {
            element: "#div_0",
            title: con_diagnostics,
            content: content_diagnostics,
            placement: "bottom"
        },
        {
            element: "#settings",
            title: button_settings,
            content: content_settings
        }
    ],
    backdrop: true,
    onStart: function () {
        $('#settings_mode').css({'background': '#fff'});
        $('#settings_mode').css({'padding': '10px'});
        $('#settings_mode').css({'border': '1px solid #c3c3c3'});
        $('#settings_mode').css({'border-radius': '10px'});
        dropddownbutton_Up('img_0', 'div_0');
    },
    onEnd: function () {
        $('#settings_mode').css({'background': 'none'});
        $('#settings_mode').css({'padding': 'none'});
        $('#settings_mode').css({'border': 'none'});
        $('#settings_mode').css({'border-radius': 'none'});
        dropddownbutton_Up('img_0', 'div_0');
    }
});

// Initialize the tour
tour.init();
