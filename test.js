var config = require('configure');
var Buzzer = require('./lib/buzzer.js');

buzzer = new Buzzer(config);
buzzer.buzz(2);

