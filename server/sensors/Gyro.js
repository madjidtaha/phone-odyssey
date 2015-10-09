'use strict';

var Mediator = require('../utils/Mediator');

function Gyro() {
  this.angles = {
    x: 0,
    y: 0,
    z: 0,
  };
}

Gyro.prototype.setAngles = function(x, y, z) {
  this.angles.x = x;
  this.angles.y = y;
  this.angles.z = z;

  this.onOrientationChange();
};

Gyro.prototype.onOrientationChange = function() {
  Mediator.emit('gyro:change', this.angles);
};

module.exports = Gyro;
