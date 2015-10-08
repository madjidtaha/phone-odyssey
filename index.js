'use strict';

var Server = require('./server/Server');
var Websocket = require('./server/Websocket');
var config = require('./config/server');

var server = new Server(config.port, config.publicDir);
server.start();

var socket = new Websocket();
socket.start();


