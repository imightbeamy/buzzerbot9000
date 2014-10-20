"use strict";

var Passwords = require('./validators/passwords.js');
var TaxForm = require('./validators/tax_form.js');
var HomeTown = require('./validators/home_town.js');
var Validator = require('./validators/validator.js');

function Validators(config) {
    return [
        new Passwords(config.passwords),
        new TaxForm(),
	new HomeTown(),
        new Validator({}), // Default
    ];
}

module.exports = Validators;
