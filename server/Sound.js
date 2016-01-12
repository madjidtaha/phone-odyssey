'use strict';

var fs = require('fs');
var path = require('path');
// var Player = require('player');
var Player = require('play-sound')();
// var Socket = require('socket.io');
var bindAll = require('lodash.bindall');
var Mediator = require('../shared/Mediator');
var soundPath = __dirname + '/sounds';


function Sound() {
  bindAll(
	this, 
	'onSoundPlaying',
	'onSoundPlayend',
	'onSoundError',
	'onClientPlay',
	'onClientStop'
  );
  var soundContainer = {};
  var soundList = fs.readdirSync(soundPath);

  /*soundList.forEach( function(file, i) {
    console.log('[Sound] find :', file);
    soundList[i] = file.slice(0, file.lastIndexOf('.'));
    soundContainer[soundList[i]] = new Player(soundPath + '/' + file);
    soundContainer[soundList[i]].on('playing', this.onSoundPlaying);
    soundContainer[soundList[i]].on('playend', this.onSoundPlayend);
    soundContainer[soundList[i]].on('error', this.onSoundError);
    
  }.bind(this));

  this.soundList = soundList;
  this.soundContainer = soundContainer;
  */

  Mediator.on('sound:play', this.onClientPlay);
  Mediator.on('sound:stop', this.onClientStop); 

}

Sound.prototype.onSoundPlaying = function(item) {
  console.log('[Sound] playing', item); 
}

Sound.prototype.onSoundPlayend = function(item) {
  console.log('[Sound] playend', item);
}

Sound.prototype.onSoundError = function(err) {
  console.error('[Sound] error : ', err);
}

Sound.prototype.onClientPlay = function(data) {
  console.log('[Sound] client play', data);
  // var sound = this.soundContainer[data.sound];
  // sound.stop();

  // sound = this.soundContainer[data.sound] = new Player(soundPath + '/' + data.sound + '.mp3');
  
  //  sound.on('playing', this.onSoundPlaying);
  // sound.on('playend', this.onSoundPlayend);
  // sound.on('error', this.onSoundError);
  // this.soundContainer[data.sound].play();
  Player.play(soundPath + '/' + data.sound + '.mp3');

}

Sound.prototype.onClientStop = function(data) {
  console.log('[Sound] client stop', data);
  // this.soundContainer[data.sound].stop();
}

module.exports = Sound;
