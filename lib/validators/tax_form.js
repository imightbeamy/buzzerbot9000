"use strict";

function TaxForm() {
    this.config = {
        success_message: "Congratulations! Your 2014 form PARTY-99A has been accepted.",
        fail_message: ""
    };
}

TaxForm.prototype = {
    isValid: function (message, from_raw) {
        var from = this.clean_number(from_raw),
            form_result = this.clean_input(message),
            //Form PARTY-99A formula 
            //box1 = Number(from.slice(-4)),
            box2 = Number(from.slice(0, 3)),
            box3 = Math.ceil(box2 / 2),
            box4 = box2 + box3,
            box5 = 'a' + box4;
        return box5 === form_result;
    },
    canValidate: function (message) {
        var form_result = this.clean_input(message);
        return form_result.slice(0, 1) === 'a' && !isNaN(form_result.slice(1));
    },
    get: function (message, prop) {
        return this.config[prop];
    },
    clean_number: function (number) {
        return number.replace(/\D/g, '');
    },
    clean_input: function (message) {
        return message.split(' ')[0].toLowerCase();
    }
};

module.exports = TaxForm;

