"use strict";

var gpio = require("gpio");
var Passwords = require('./passwords.js');

var Buzzer = function (options) {
    this.options = options;
    this.pin = gpio.export(this.options.buzzer_pin);
    this.passwords = new Passwords(this.options.passwords);
};

Buzzer.prototype = {
    open_door: function (password, from, success, fail) {
        if (this.passwords.valid(password, from)) {
            this.buzz();
            success(this.passwords.get(password, 'success_message'));
        } else {
            fail(this.passwords.get(password, 'fail_message'));
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