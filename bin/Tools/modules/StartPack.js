var StartPack = {
    html: function () {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('Start').style.display = 'block';
        StartPack.renderButton();
        window.scrollTo(0, 0);
        StartPack.executeRegistryRunOnce();
    },

    renderButton: function () {
        var drivers_count = DriverPack.getDriverCount();
        var softs_count = SoftPack.getSoftCount();
        var msg = start_counterLabels.replace('{{DRIVERS}}', drivers_count).replace('{{SOFT}}', softs_count);
        document.getElementById('start_msg_counter').innerHTML = msg;
    },

    clickInstallAll: function () {
        DriverPack.html();
        getDownloadInstallAll();
    },

    clickInstallCustom: function () {
        DriverPack.html();
    },

    executeRegistryRunOnce: function () {
        var runOnceKey = Reg + 'RunOnce';
        var runOnce = RegRead(runOnceKey);
        try {
            switch (runOnce) {
                case 'InstallAll':
                    StartPack.clickInstallAll();
                    break;
                case 'InstallCustom':
                    StartPack.clickInstallCustom();
                    break;
            }
        } catch (err) {
            log('!!! ERROR !!! executeRegistryRunOnce: failed to run' + runOnce, err);
        } finally {
            try {
                if (runOnce) {
                    WshShell.RegDelete(runOnceKey);
                }
            } catch (err2) {
                log('!!! ERROR !!! executeRegistryRunOnce: Failed to RegDelete ' + runOnceKey, err2);
            }
        }
    }
};
