var moment = require('moment');
var _ = require('underscore');

function Passwords(passwords) {
    this.passwords = {};
    _.each(passwords, this.add.bind(this));
};

Passwords.prototype = {
    valid: function(password, from_raw) {
        var config = this.get(password),
            from = this.clean_number(from_raw);
        //Is it even a password?
        if (!config) {
            return false;
        }
        //Is the sender on the whitelist if there is one?
        if (config.whitelist && !_.contains(config.whitelist, from)) {
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
    add: function (config, password) {
        this.passwords[this.clean_password(password)] = {
            'start': config.start ? moment(config.start) : null,
            'end': config.end ? moment(config.end) : null,
            'whitelist': config.whitelist ? _.map(config.whitelist, this.clean_number) : null
        };
    },
    get: function (password) {
        return this.passwords[clean_password(password)];
    },
    clean_number: function (number) {
        return number.replace(/\D/g, '');
    },
    clean_password: function (password) {
        return password.split(' ')[0].toLowerCase();
    }
}

module.exports = Passwords;