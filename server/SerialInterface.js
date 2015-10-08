'use strict';

var com = require('serialport');
var bindAll = require('lodash.bindall');

function SerialInterface(port, baudrate) {
  bindAll(this, 'onOpen', 'onData');

  this.serialPort = new com.SerialPort(port, {
    baudrate: baudrate,
    parser: com.parsers.readline('\r\n'),
  });

  this.serialPort.on('open', this.onOpen);
  this.serialPort.on('data', this.onData);
}

SerialInterface.prototype.onOpen = function() {
  console.log('[Serial] port open');
};

SerialInterface.prototype.onData = function(data) {
  console.log('[Serial] get data');
  console.log(data);
};

SerialInterface.prototype.send = function(value) {
  // convert to string first
  var str = '' + value;

  this.serialPort.write(str);
};

module.exports = SerialInterface;
