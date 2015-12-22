'use strict';

var Mediator = require('../utils/Mediator');

var MARGIN = 5;

function Compass() {
  this.position = { x: 0, y: 0, z: 0 };
  this.direction = { x: 0, y: 0, z: 0 };
}

Compass.prototype.setValues = function(x, y, z) {
  var oldPosition = {
    x: this.position.x,
    y: this.position.y,
    z: this.position.z
  };

  this.position.x = x;
  this.position.y = y;
  this.position.z = z;

  this.setDirection('x', oldPosition, this.position);
  this.setDirection('y', oldPosition, this.position);
  this.setDirection('z', oldPosition, this.position);

  this.onChange();
};

Compass.prototype.onChange = function() {
  Mediator.emit('compass:change', { position: this.position, direction: this.direction });
};

Compass.prototype.setDirection = function(coord, oldPos, pos) {
  var res = 0;

  if (Math.abs(oldPos[coord] - pos[coord]) > MARGIN) { // avoid micro movements
    if (oldPos[coord] > pos[coord]) {
      res = -1;
    }

    if (oldPos[coord] < pos[coord]) {
      res = 1;
    }
  }

  this.direction[coord] = res;
};

module.exports = Compass;
