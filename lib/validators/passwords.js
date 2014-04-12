"use strict";

var moment = require('moment');
var underscore = require('underscore');
var Validator = require('./validator.js');

function Passwords(passwords) {
    this.passwords = {};
    underscore.each(passwords, this.add.bind(this));
}

Passwords.prototype = new Validator({
    isValid: function (message, from_raw) {
        var config = this.get(message),
            from = this.clean_number(from_raw);
        //Is it even a password?
        if (!config) {
            return false;
        }
        //Is the sender on the whitelist if there is one?
        if (config.whitelist && !underscore.contains(config.whitelist, from)) {
            return false;
        }
        //Outside the date range if there is one?
        if (config.start_date && config.end_date &&
                !this.inDateRange(config.start_date, config.end_date)) {
            return false;
        }
        //All good!
        return true;
    },
    canValidate: function (password) {
        //Is this a password we know about?
        return !!this.get(password);
    },
    inDateRange: function (start, end) {
        var today = moment();
        return (today.isAfter(start, 'day') && today.isBefore(end, 'day')) ||
               start.isSame(today, 'day') ||
               end.isSame(today, 'day');
    },
    add: function (config, password) {
        this.passwords[this.clean_input(password)] = underscore.extend(config, {
            'start_date': config.start ? moment(config.start) : null,
            'end_date': config.end ? moment(config.end) : null,
            'whitelist': config.whitelist ? underscore.map(config.whitelist, this.clean_number) : null
        });
    },
    get: function (password, prop) {
        var config = this.passwords[this.clean_input(password)];
        return config && prop ? config[prop] : config;
    }
});

module.exports = Passwords;