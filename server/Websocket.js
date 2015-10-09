'use strict';

var Socket = require('socket.io');
var bindAll = require('lodash.bindall');
var Mediator = require('./utils/Mediator');

function Websocket(port) {
  bindAll(this, 'onConnection', 'onDisconnect', 'onGyroUpdate');

  this.port = port;
  this.clientConnected = false;
  this.io;
}

Websocket.prototype.start = function() {
  this.io = new Socket(this.port);
  this.io.on('connection', this.onConnection);
  console.log('[Socket] waiting for connection...');
};

Websocket.prototype.attachEvents = function(socket) {
  socket.on('disconnect', this.onDisconnect);
  Mediator.on('gyro:change', this.onGyroUpdate);
};

Websocket.prototype.onConnection = function(socket) {
  if (this.clientConnected) { return; }

  console.log('[Socket] client connected');
  this.clientConnected = true;
  this.attachEvents(socket);
  socket.emit('connection:success');
};

Websocket.prototype.onDisconnect = function() {
  console.log('[Socket] client disconnected');
  this.clientConnected = false;
};

Websocket.prototype.onGyroUpdate = function(angles) {
  this.io.emit('gyro:update', angles);
};

module.exports = Websocket;
