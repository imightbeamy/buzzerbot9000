"use strict";

var express = require('express');
var config = require('configure');
var twilio = require('twilio');

var Buzzer = require('./lib/buzzer.js');

process.env.TWILIO_AUTH_TOKEN = config.twilio_token;

var app = express(),
    buzzer = new Buzzer(config);

console.log('Starting...');

app.get('/sms', twilio.webhook(), function (request, response) {
    console.log(request.query);

    var sms = request.query,
        twil_res = new twilio.TwimlResponse();

    buzzer.open_door(sms.Body, sms.From);

    twil_res.message('Welcome, our robot will buzz you in momentarily');
    response.send(twil_res);
});

var port = Number(config.port);
app.listen(port, function () {
    console.log('Listening on ' + port);
});