"use strict";

var Passwords = require('./passwords.js');
var TaxForm = require('./tax_form.js');

function Validators(config) {
    return [
        new Passwords(config.passwords),
        new TaxForm(),
    ];
}

module.exports = Validators;