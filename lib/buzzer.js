"use strict";

var gpio = require("pi-gpio");
var Passwords = require('./passwords.js');

var Buzzer = function (options) {
    this.options = options;
    this.passwords = new Passwords(this.options.passwords);
    gpio.close(this.options.buzzer_pin);
};

Buzzer.prototype = {
    open_door: function (password, from, success, fail) {
        if (this.passwords.valid(password, from)) {
            this.buzz(this.options.buzz_secs);
            success(this.passwords.get(password, 'success_message'));
        } else {
            fail(this.passwords.get(password, 'fail_message'));
        }
    },
    buzz: function (secs) {
        this.on(setTimeout(this.off.bind(this), secs * 1000));
    },
    on: function (done) {
        gpio.open(this.options.buzzer_pin, "output", function() {
	    gpio.write(this.options.buzzer_pin, 1, done);
        }.bind(this));
    },
    off: function () {
        gpio.write(this.options.buzzer_pin, 0, function() {
            gpio.close(this.options.buzzer_pin);
        }.bind(this));
    }
};

module.exports = Buzzer;
