"use strict";

var gpio = require("pi-gpio");
var underscore = require('underscore');

var Buzzer = function (options, validators) {
    this.options = options;
    this.validators = validators;
    gpio.close(this.options.buzzer_pin);
};

Buzzer.prototype = {
    open_door: function (message, from, success, fail) {
        var validator = this.findValidator(message, from);
        var is_valid = validator.isValid(message, from);
        if (is_valid.success) {
            this.buzz(this.options.buzz_secs);
            success(validator.get(message, 'success_message'));
        } else {
            fail(validator.get(message, 'fail_message'));
        }
    },
    findValidator: function (message, from) {
        return underscore.find(this.validators, function (v) {
            return v.canValidate(message, from);
        });
    },
    buzz: function (secs) {
        this.on(setTimeout(this.off.bind(this), secs * 1000));
    },
    on: function (done) {
        gpio.open(this.options.buzzer_pin, "output", function () {
            gpio.write(this.options.buzzer_pin, 1, done);
        }.bind(this));
    },
    off: function () {
        gpio.write(this.options.buzzer_pin, 0, function () {
            gpio.close(this.options.buzzer_pin);
        }.bind(this));
    }
};

module.exports = Buzzer;
