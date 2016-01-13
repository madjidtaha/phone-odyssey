'use strict';

var fs = require('fs');
var path = require('path');
var Player = require('play-sound')();
var bindAll = require('lodash.bindall');
var Mediator = require('../shared/Mediator');
var soundPath = __dirname + '/sounds';


function Sound() {
  bindAll(
  	this,
  	'onClientPlay'
  );

  Mediator.on('sound:play', this.onClientPlay);

}

Sound.prototype.onClientPlay = function(data) {
  console.log('[Sound] client play', data);
  Player.play(soundPath + '/' + data.sound + '.mp3');

}

module.exports = new Sound();
