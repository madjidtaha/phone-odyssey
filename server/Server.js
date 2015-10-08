'use strict';

var express = require('express');

function Server(port, publicDir) {
  this.port = port || 3000;
  this.publicDir = publicDir || __dirname;
  this.expressInstance = express();
}

Server.prototype.start = function() {
  this.expressInstance.use(express.static(this.publicDir));
  this.expressInstance.listen(this.port);

  console.log('[Server] started');
  console.log('[Server] listening port ' + this.port);
  console.log('[Server] serving ' + this.publicDir);
};

module.exports = Server;
