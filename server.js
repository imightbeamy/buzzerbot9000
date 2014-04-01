// web.js
var express = require('express');
var config = require('configure');
var twilio = require('twilio');

var Buzzer = require('./lib/buzzer.js');

process.env.TWILIO_AUTH_TOKEN = config.twilio_token;

var app = express(),
    buzzer = new Buzzer(config);

console.log('Starting...');

app.get('/', twilio.webhook({ url: config.url }), function(request, response) {
    console.log(request);

    //buzzer.open_door();

    var twiml = new twilio.TwimlResponse();
    twiml.message('Welcome, our robot will buzz you in momentarily');
    response.send(twiml);
});

var port = Number(config.port);
app.listen(port, function() {
  console.log('Listening on ' + port);
});