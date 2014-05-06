var config = require('configure');
var Buzzer = require('./lib/buzzer.js');

var buzzer = new Buzzer(config);
buzzer.buzz(2);
