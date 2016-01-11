'use strict';

var fs = require('fs');
var path = require('path');
// var Socket = require('socket.io');
var bindAll = require('lodash.bindall');
var Mediator = require('../shared/Mediator');
var soundPath = __dirname + '/server/sounds';


function Sound() {
  // bindAll(this, 'onConnection', 'onDisconnect', 'onGyroUpdate', 'onCompassUpdate');

  fs.readdir(soundPath, function(err, files) {
    if (err) {
      console.error('Path does not exist');
      process.exit(1);
    }

    files.forEach( function(file, i) {
      console.log('files :', path.join(soundPath, file));
    });

  });

}

module.exports = Sound;
