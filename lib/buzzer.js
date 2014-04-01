"use strict";

var gpio = require("gpio");
var Passwords = require('./passwords.js');

var Buzzer = function (options) {
    this.options = options;
    this.pin = gpio.export(this.options.buzzer_pin);
    this.passwords = new Passwords(this.options.passwords);
};

Buzzer.prototype = {
    open_door: function (password, from) {
        if (this.passwords.valid(password, from)) {
            this.buzz();
        }
    },
    buzz: function () {
        this.pin.set();
        setTimeout(function () {
            this.pin.set(0);
        }.bind(this), this.options.buzz_secs * 1000);
    },
};

module.exports = Buzzer;