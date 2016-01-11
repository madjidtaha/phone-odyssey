'use strict';

var fs = require('fs');
var path = require('path');
// var Socket = require('socket.io');
var bindAll = require('lodash.bindall');
var Mediator = require('../shared/Mediator');
var soundPath = __dirname + '/sounds';


function Sound() {
  // bindAll(this, 'onConnection', 'onDisconnect', 'onGyroUpdate', 'onCompassUpdate');
  this.sounds = [];

  fs.readdir(soundPath, function(err, files) {
    if (err) {
      console.error('Path does not exist');
      process.exit(1);
    }

    files.forEach( function(file, i) {
      this.sounds.push(file.slice(0, file.lastIndexOf('.'));
    });

  });

  console.log('files :', this.sounds);


}

module.exports = Sound;
