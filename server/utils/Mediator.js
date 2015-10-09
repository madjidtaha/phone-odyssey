'use strict';

var util = require('util');
var EventEmitter = require('events');

function Mediator() {
  EventEmitter.call(this);
}
util.inherits(Mediator, EventEmitter);

module.exports = new Mediator();
