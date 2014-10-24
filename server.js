"use strict";

var express = require('express');
var config = require('configure');
var twilio = require('twilio');

var Buzzer = require('./lib/buzzer.js');
var Validators = require('./lib/validators.js');

process.env.TWILIO_AUTH_TOKEN = config.twilio_token;

var app = express(),
    buzzer = new Buzzer(config, new Validators(config));

console.log('Starting...');

app.get('/sms', twilio.webhook(), function (request, response) {
    console.log(request.query);

    var sms = request.query;

    buzzer.open_door(sms.Body, sms.From, function (message) {
        var twil_res = new twilio.TwimlResponse();

        twil_res.message(message || "???");
        console.log('"' + message + '"', sms.Body, sms.From);

        response.send(twil_res);
    });

});

var port = Number(config.port);
app.listen(port, function () {
    console.log('Listening on ' + port);
});
