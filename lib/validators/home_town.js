"use strict";

var underscore = require('underscore');
var Validator = require('./validator.js');
var GoogleAddressApi = require('./google_request.js');
var fs = require('fs');

function HomeTown() {
    this.config = {
        success_message: "Welcome to the Haunting.",
        fail_message: ""
    };
    this.known_towns = JSON.parse(fs.readFileSync('towns.json').toString().trim());
}

HomeTown.prototype = new Validator({
    validate: function (message, from_raw, buzz) {
        var from = this.clean_number(from_raw),
            home_town = message;


        var api_key = fs.readFileSync('secrets').toString().trim();
        GoogleAddressApi.getAddress(home_town, underscore.bind(function(locations, count) {
            if (count === 0) {
                buzz(false, "You think you can fool me? That's not even a real place.");
            } else if (count === 1) {

                if (this.known_towns[from] && this.known_towns[from].id != locations[0].id) {
                    buzz(false, "Aren't you from " + this.known_towns[from].description + "?");
                } else {
                    this.known_towns[from] = {
                        id: locations[0].id,
                        description: locations[0].description
                    };
                    fs.writeFile('towns.json', JSON.stringify(this.known_towns));
                    buzz(true, "Welcome to the haunting, former occupant of " + locations[0].description);
                }
            } else {
                var options = "You'll need to be more specific. ";
                for (var i = 0; i < count && i < 3; i++) {
                    options += locations[i].description + "? "
                }
                options += " ...or somewhere else?"
                buzz(false, options);
                // TODO: Save options to database with key
            }
        }, this));
    },
    canValidate: function (message) {
        return true;
    },
    get: function (message, prop) {
        return this.config[prop];
    },
});

module.exports = HomeTown;
