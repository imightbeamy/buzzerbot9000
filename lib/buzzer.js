var gpio = require("gpio");

var Buzzer = function(options) {
    this.options = options;
    this.pin = gpio.export(this.options.buzzer_pin);
};

Buzzer.prototype = {
    buzz: function() {
        this.pin.set();
        setTimeout(function() {
            this.pin.set(0);
        }.bind(this), this.options.buzz_secs * 1000);
    }, 
}

module.exports = Buzzer;