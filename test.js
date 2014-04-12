var config = require('configure');
var Buzzer = require('./lib/buzzer.js');

var buzzer = new buzzer(config);
buzzer.buzz(2);

