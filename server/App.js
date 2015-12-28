'use strict';

var SerialInterface = require('./SerialInterface');
var Mediator = require('../shared/Mediator');
var bindAll = require('lodash.bindAll');
var Gyro = require('./sensors/Gyro');
var Compass = require('./sensors/Compass');

function App(port) {
  bindAll(this, 'start', 'onData');

  this.port = port;
  this.com = new SerialInterface(port, 9600);

  // register the sensors
  this.sensors = {
    gyro: new Gyro(),
    compass: new Compass()
  };

  Mediator.once('serial:open', this.start);
}

App.prototype.start = function() {
  console.log('[App] started');
  Mediator.on('serial:data', this.onData);
};

App.prototype.onData = function(data) {
  var arr = data.split('#!#');

  if (arr.length < 3) { return; }

  var sensorClass = arr[1];
  var data;

  switch(sensorClass) {
  case 'gyro':
    data = JSON.parse(arr[2]);
    this.sensors.gyro.setAngles(data.x, data.y, data.z);
    break;
  case 'compass':
    data = JSON.parse(arr[2]);
    this.sensors.compass.setValues(data.x, data.y, data.z);
    break;
  }

};

module.exports = App;
