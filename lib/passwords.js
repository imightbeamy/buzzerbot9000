var moment = require('moment');
var _ = require('underscore');

function Passwords(passwords) {
    this.passwords = {};
    _.each(passwords, function(config, password) {
        this.passwords[password.toLowerCase()] = {
            'start': config.start ? moment(config.start) : null,
            'end': config.end ? moment(config.end) : null,
            'numbers': config.numbers || null
        }
    }.bind(this));
};

Passwords.prototype = {
    valid: function(password, from) {
        var config = this.passwords[password.toLowerCase()];
        //Is it even a password?
        if (!config) {
            return false;
        }
        //Is the sender on the whitelist if there is one?
        if (config.whitelist && (!from || !_.contains(config.whitelist, from))) {
            return false;
        }
        //Outside the date range if there is one?
        var today = moment();
        if (config.start_date && config.end_date &&
            !this.inDateRange(today, config.start_date, config.end_date)) {
            return false;
        }
        //All good!
        return true;
    },
    inDateRange: function(date, start, end) {
        return date.isAfter(start, 'day') && date.isBefore(end, 'day') ||
               start.isSame(date, 'day') ||
               end.isSame(date, 'day');
    },
}

module.exports = Passwords;