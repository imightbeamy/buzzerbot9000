"use strict";

var Passwords = require('./validators/passwords.js');
var TaxForm = require('./validators/tax_form.js');
var Validator = require('./validator.js');

function Validators(config) {
    return [
        new Passwords(config.passwords),
        new TaxForm(),
        new Validator({}), // Default
    ];
}

module.exports = Validators;