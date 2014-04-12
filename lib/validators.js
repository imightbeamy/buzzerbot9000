"use strict";

var Passwords = require('./validators/passwords.js');
var TaxForm = require('./validators/tax_form.js');

function Validators(config) {
    return [
        new Passwords(config.passwords),
        new TaxForm(),
    ];
}

module.exports = Validators;