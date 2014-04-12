"use strict";

var cp = require('child_process');

process.env.DISPLAY = ":0";

var Display = function (options) {
    this.options = options;
    this.options.contact_file;
    this.options.picture_mins;
};

Display.prototype = {
    show: function (name, image) {
        //show in browser
        cp.exec("xdg-screensaver reset");
        cp.exec("midori -a ./index.html -e Fullscreen", { timeout: 1 });
        setTimeout(function () { this.screen_saver(false); }.bind(this), 10 * 1000);
        setTimeout(function () {
            this.screen_saver(true);
            cp.exec("killall midori");
        }.bind(this), 30 * 1000);

    },
    screen_saver: function (on) {
        if (on) {
            cp.exec("xdg-screensaver activate");
        } else {
            cp.exec("xdg-screensaver reset");
        }
    }
};

var d = new Display({});
d.show("Amy Ciavolino", "ialksjdfad");
module.exports = Display;
