'use strict';

var Socket = require('socket.io');
var bindAll = require('lodash.bindall');
var Mediator = require('../shared/Mediator');

function Websocket(port) {
  bindAll(
    this,
    'onConnection',
    'onDisconnect',
    'onGyroUpdate',
    'onCompassUpdate',
    'onSoundChange',
    'stopGame',
    'startGame'
  );

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
  Mediator.on('compass:change', this.onCompassUpdate);
  Mediator.on('phone:close', this.stopGame);
  Mediator.on('phone:open', this.startGame);
  socket.on('sound:play', this.onSoundChange);
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

Websocket.prototype.onCompassUpdate = function(pos) {
  this.io.emit('compass:update', pos);
};

Websocket.prototype.onGyroUpdate = function(angles) {
  this.io.emit('gyro:update', angles);
};

Websocket.prototype.onSoundChange = function(data) {
  Mediator.emit('sound:play', data);
}

Websocket.prototype.startGame = function () {
  console.log('[Phone] open');
  this.io.emit('game:start');
  Mediator.emit('sound:play', {
    sound: 'music-pink-floyd'
  });
};

Websocket.prototype.stopGame = function () {
  console.log('[Phone] close');
  this.io.emit('game:stop');
};

module.exports = Websocket;
