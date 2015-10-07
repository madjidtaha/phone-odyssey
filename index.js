const Server = require('./server/Server');
const config = require('./config/server.js');

const server = new Server(config.port, config.publicDir);
server.start();
