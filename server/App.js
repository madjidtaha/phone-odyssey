'use strict';

var SerialInterface = require('./SerialInterface');
var com = new SerialInterface('/dev/cu.usbmodem1411', 9600);

setTimeout(function() {
  console.log('[Test] call write');
  com.send('Test');
}, 2000);
