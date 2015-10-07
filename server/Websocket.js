'use strict';

const Socket = require('socket.io');
const bindAll = require('lodash.bindall');
const config = require('../config/socket');

module.exports = class Websocket {
  constructor() {
    bindAll(this, 'onConnection', 'onDisconnect');

    this.clientConnected = false;
    this.io;
  }

  start() {
    this.io = new Socket(config.port);
    this.io.on('connection', this.onConnection);
    console.log('[Socket] waiting for connection...');
  }

  onConnection(socket) {
    if (this.clientConnected) { return; }

    this.clientConnected = true;
    this.attachEvents(socket);
    socket.emit('connection:success');
    console.log('[Socket] client connected');
  }

  attachEvents(socket) {
    socket.on('disconnect', this.onDisconnect);
  }

  onDisconnect() {
    this.clientConnected = false;
    console.log('[Socket] client disconnected');
  }

};
