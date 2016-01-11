/* eslint-disable */
'use strict';

var Sound = require('./server/Sound');
var Server = require('./server/Server');
var Websocket = require('./server/Websocket');
var App = require('./server/App');
var Player = require('player');
var configServer = require('./config/server');
var configSocket = require('./config/socket');

var app = new App('/dev/cu.usbmodem1421');

var sound = new Sound();

var server = new Server(configServer.port, configServer.publicDir);
server.start();

var socket = new Websocket(configSocket.port);
socket.start();

var player = new Player([
  __dirname + '/server/sounds/tts1.mp3',
])
.on('error', function(){
  console.log('error');
});

player.play();

var player = new Player([
  __dirname + '/server/sounds/heyya.mp3'
]);
player
  .on('playing', function(song){
    console.log('je play lo', song);
  })
  .on('playend', function(song){
    console.log('jer finie', song);
  })
  .on('error', function(err) {
    console.log('jer tromper', err);
  })
  .play(function(err, player){
    console.log('playend!');
  });

setTimeout(function (){
  console.log('timeout');
  player.stop();
}, 5000);
