'use strict';

var com = require('serialport');
var bindAll = require('lodash.bindall');
var Mediator = require('./utils/Mediator');

function SerialInterface(port, baudrate) {
  bindAll(this, 'onOpen', 'onData', 'send');

  this.serialPort = new com.SerialPort(port, {
    baudrate: baudrate,
    parser: com.parsers.readline('\r\n'),
  });

  this.serialPort.on('open', this.onOpen);
  this.serialPort.on('data', this.onData);
  Mediator.on('serial:send', this.send);
}

SerialInterface.prototype.onOpen = function() {
  console.log('[Serial] port open');
  Mediator.emit('serial:open');
};

SerialInterface.prototype.onData = function(data) {
  console.log('[Serial] get data');
  Mediator.emit('serial:data', data);
};

SerialInterface.prototype.send = function(value) {
  // convert to string first
  var str = '' + value;

  this.serialPort.write(str);
};

module.exports = SerialInterface;
