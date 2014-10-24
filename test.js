"use strict";


var HomeTown = require('./lib/validators/home_town.js');
    
var ht = new HomeTown({});
ht.isValid("hello", "123-124-2341");

