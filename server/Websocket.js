'use strict';

var Socket = require('socket.io');
var bindAll = require('lodash.bindall');
var config = require('../config/socket');

function Websocket() {
  bindAll(this, 'onConnection', 'onDisconnect');

  this.clientConnected = false;
  this.io;
}

Websocket.prototype.start = function() {
  this.io = new Socket(config.port);
  this.io.on('connection', this.onConnection);
  console.log('[Socket] waiting for connection...');
};

Websocket.prototype.onConnection = function(socket) {
  if (this.clientConnected) { return; }

  this.clientConnected = true;
  this.attachEvents(socket);
  socket.emit('connection:success');
  console.log('[Socket] client connected');
};

Websocket.prototype.attachEvents = function(socket) {
  socket.on('disconnect', this.onDisconnect);
};

Websocket.prototype.onDisconnect = function() {
  this.clientConnected = false;
  console.log('[Socket] client disconnected');
};

module.exports = Websocket;
