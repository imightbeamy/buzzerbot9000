"use strict";

var underscore = require('underscore');

function Validator(prototype) {
    return underscore.extend(underscore.clone(Validator.prototype), prototype);
}

Validator.prototype = {
    validate: function (message, from_raw) {
        // Given the incomming message and who it's 
        // from, should we let them in?
        false;
    },
    canValidate: function (message) {
        // Simple check for if this *could* be valid, 
        // i.e. it's a password we know about, or in
        // the correct format.
        return true;
    },
    get: function (message, prop) {
        // Returns information about a given input.
        return {
            fail_message: "Sorry, that's not a valid password :("
        }[prop];
    },
    clean_number: function (number) {
        // Util for converting twillo number into
        // 10 clean digits.
        return number.replace(/\D/g, '').slice(-10);
    },
    clean_input: function (message) {
        // Util for getting the first word in the 
        // message, lower cased.
        return message.split(' ')[0].toLowerCase();
    },
};

module.exports = Validator;
