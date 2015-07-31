var News = {
    timers: [],
    html: function () {
        if (!statistics.experiment.newsExperiment) {
            return;
        }

        document.getElementById('News').style.display = 'block';
        News.loop();
        statistics.event( { action: 'Loader Ad Showed' } );
    },

    hide: function () {
        document.getElementById('News').style.display = 'none';
        News.stopAnimation();
    },

    stopAnimation: function () {
        News.timers.forEach(function(timer) {clearTimeout(timer)});
        News.timers = [];
    },

    loop: function() {
        News.stopAnimation();
        // TODO: refactor into separate timers
        var timers = News.timers = [];
        timers.push(setTimeout(function() {
            $('.news_feed').animate({top: -200}, 1000)
        }, 8000));
        timers.push(setTimeout(function() {
            $('.news_feed').animate({top: -400}, 1000)
        }, 16000));
        timers.push(setTimeout(function() {
            $('.news_feed').animate({top: -600}, 1000)
        }, 24000));
        timers.push(setTimeout(function() {
            $('.news_feed').animate({top: -800}, 1000)
        }, 32000));
        timers.push(setTimeout(function() {
            $('.news_feed').animate({top: -1000}, 1000)
        }, 40000));
        timers.push(setTimeout(function() {
            $('.news_feed').animate({top: 0}, 1000)
        }, 48000));
        timers.push(setTimeout(News.loop, 48000));
    },

    pause: function() {
        // TODO: Pause animation
    }
};
