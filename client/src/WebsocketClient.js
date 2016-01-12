import io from 'socket.io-client';
import bindAll from 'lodash.bindall';
import Mediator from 'shared/Mediator';

export default class WebsocketClient {
  constructor(url) {
    bindAll(this,
      'onConnection',
      'onGyroUpdate',
      'onCompassUpdate',
      'onGameStart',
      'onGameStop',
      'onSoundChange');

    this.url = url;
    this.io = io(url);
    this.io.on('connection:success', this.onConnection);
  }

  onConnection() {
    console.log('[Socket] Connection - success!');
    this.attachEvents();
  }

  attachEvents() {
    this.io.on('gyro:update', this.onGyroUpdate);
    this.io.on('compass:update', this.onCompassUpdate);
    this.io.on('game:stop', this.onGameStop);
    this.io.on('game:start', this.onGameStart);
    Mediator.on('sound:play', this.onSoundChange);
  }

  onGyroUpdate(angles) {
    Mediator.emit('gyro:update', angles);
  }

  onCompassUpdate(data) {
    Mediator.emit('compass:update', data);
  }

  onGameStart() {
    Mediator.emit('client:game:start');
    console.log('[Socket] Game - start');
  }

  onGameStop() {
    Mediator.emit('client:game:stop');
    console.log('[Socket] Game - stop');
  }

  onSoundChange(data) {
    console.log(this.io);
    this.io.emit('sound:play', data)
  }

}
