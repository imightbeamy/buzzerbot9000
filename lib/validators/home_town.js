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
    isValid: function (message, from_raw) {
        var from = this.clean_number(from_raw),
	    // don't clean the message
            home_town = message;
            
            GoogleAddressApi.getAddresses(home_town, function(locations, count) {
	      if (count === 0) {
		console.log("No place with that name exists.");
	      }
	      else if (count === 1) {
		console.log("Welcome to the haunting, former occupant of " + locations[0].description);
		// TODO: save answer to the database with key
	      }
	      else {
		var options = "I found a few places with that name. Which is yours?";
		for (var i = 0; i < count; i++) {
		   options += "\n";
		   options += (i + 1) + ":" + locations[i].description;
		}
		console.log(options);
		// TODO: Save options to database with key
	      }
	    );
	// help, how do you return something that's callback dependent??
        return true;
    },
    canValidate: function (message) {
        var home_town = message,
            // Valid input is alpha, spaces and ','
            valid_chars = /^[A-Za-z\s,]+$/;
        return home_town.match(valid_chars);
    },
    get: function (message, prop) {
        return this.config[prop];
    },
});

module.exports = HomeTown;
