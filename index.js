'use strict';

var Server = require('./server/Server');
var Websocket = require('./server/Websocket');
var App = require('./server/App');
var configServer = require('./config/server');
var configSocket = require('./config/socket');

// var app = new App('/dev/cu.usbmodem1411');

var server = new Server(configServer.port, configServer.publicDir);
server.start();

var socket = new Websocket(configSocket.port);
socket.start();
