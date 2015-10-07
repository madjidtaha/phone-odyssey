'use strict';

const Server = require('./server/Server');
const Websocket = require('./server/Websocket');
const config = require('./config/server');

const server = new Server(config.port, config.publicDir);
server.start();

const socket = new Websocket();
socket.start();


