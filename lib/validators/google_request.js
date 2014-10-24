var underscore = require('underscore');
var https = require('https');
var fs = require('fs');

var GoogleAddressApi = {
	getAddress: function(home_town, return_func) {
		var encoded_home_town = encodeURI(home_town.trim());
		var api_key = fs.readFileSync('secrets').toString().trim();
		var options = {
			host: 'maps.googleapis.com',
			path: '/maps/api/place/autocomplete/json?key=' + api_key + '&types=(cities)&input=' + encoded_home_town,
			method: 'GET',
			port: 443
		};
		var callback = function(response) {
			var response_string = '';
			response.on('data', function(chunk) {
				response_string += chunk;
			});

			response.on('end', function() {
				var parsedJson = JSON.parse(response_string),
				predictions = parsedJson.predictions,
				count = predictions.length;

				return_func(predictions, count);
			});
		};
		var req = https.request(options, callback);
		req.end();
	}
};

module.exports = GoogleAddressApi;
