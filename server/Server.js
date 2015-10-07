'use strict';

const express = require('express');

module.exports = class Server {
  constructor(port, publicDir) {
    this.port = port || 3000;
    this.publicDir = publicDir || __dirname;
    this.expressInstance = express();
  }

  start() {
    this.expressInstance.use(express.static(this.publicDir));
    this.expressInstance.listen(this.port);

    console.log('[Server] started');
    console.log(`[Server] listening port ${this.port}`);
    console.log(`[Server] serving ${this.publicDir}`);
  }
};
