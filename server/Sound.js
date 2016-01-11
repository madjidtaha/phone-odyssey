'use strict';

var fs = require('fs');
var path = require('path');
// var Socket = require('socket.io');
var bindAll = require('lodash.bindall');
var Mediator = require('../shared/Mediator');
var soundPath = __dirname + '/sounds';


function Sound() {
  // bindAll(this, 'onConnection', 'onDisconnect', 'onGyroUpdate', 'onCompassUpdate');
  var sounds = [];

  sounds = fs.readdirSync(soundPath);

  sounds.forEach( function(file, i) {
    sounds[i] = file.slice(0, file.lastIndexOf('.')));
  });


  this.sounds = sounds;

  console.log('files :', this.sounds);


}

module.exports = Sound;
