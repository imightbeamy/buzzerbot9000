// web.js
var express = require('express');
var config = require('configure');
var twilio = require('twilio');

var Buzzer = require('./lib/buzzer.js');
var Passwords = require('./lib/passwords.js')

var app = express(),
    buzzer = new Buzzer(config),
    passwords = new Passwords(config.passwords);

console.log('Starting...');
app.get('/', function(req, res) {
  res.send('Hello World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});