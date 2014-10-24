"use strict";

var Validator = require('./validator.js');
var GoogleAddressApi = require('./google_request.js');

function HomeTown() {
    this.config = {
        success_message: "Welcome to the Haunting.",
        fail_message: ""
    };
}

HomeTown.prototype = new Validator({
    validate: function (message, from_raw, buzz) {
        var from = this.clean_number(from_raw),
            home_town = message;

        GoogleAddressApi.getAddress(home_town, function(locations, count) {
            if (count === 0) {
                buzz(false, "You think you can fool me? That's not even a real place.");
            } else if (count === 1) {
                // TODO: save answer to the database with key
                buzz(true, "Welcome to the haunting, former occupant of " + locations[0].description);
            } else {
                var options = "You'll need to be more specific. ";
                for (var i = 0; i < count && i < 3; i++) {
                    options += locations[i].description + "? "
                }
                options += " ...or somewhere else?"
                buzz(false, options);
                // TODO: Save options to database with key
            }
        });
    },
    canValidate: function (message) {
        return true;
    },
    get: function (message, prop) {
        return this.config[prop];
    },
});

module.exports = HomeTown;
