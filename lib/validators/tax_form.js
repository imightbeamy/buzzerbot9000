"use strict";

var Validator = require('./validator.js');

function TaxForm() {};

TaxForm.prototype = new Validator({
    validate: function (message, from_raw, buzz) {
        var from = this.clean_number(from_raw),
            form_result = this.clean_input(message),
            //Form PARTY-99A formula 
            //box1 = Number(from.slice(-4)),
            box2 = Number(from.slice(0, 3)),
            box3 = Math.ceil(box2 / 2),
            box4 = box2 + box3,
            box5 = 'a' + box4;
        if (box5 === form_result) {
            buzz(true, "Congratulations! Your 2014 form PARTY-99A has been accepted.");
        } else {
            buzz(false, "Sorry that's not quite right.");
        }
    },
    canValidate: function (message) {
        var form_result = this.clean_input(message);
        return form_result.slice(0, 1) === 'a' && !isNaN(form_result.slice(1));
    },
});

module.exports = TaxForm;

