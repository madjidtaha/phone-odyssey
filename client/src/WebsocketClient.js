import io from 'socket.io-client';
import bindAll from 'lodash.bindall';
import Mediator from 'shared/Mediator';

export default class WebsocketClient {
  constructor(url) {
    bindAll(this,
      'onConnection',
      'onGyroUpdate',
      'onCompassUpdate',
      'onAppStart',
      'onAppStop',
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
    this.io.on('game:stop', this.onAppStop);
    this.io.on('game:start', this.onAppStart);
    Mediator.on('sound:play', this.onSoundChange);
  }

  onGyroUpdate(angles) {
    Mediator.emit('gyro:update', angles);
  }

  onCompassUpdate(data) {
    Mediator.emit('compass:update', data);
  }

  onAppStart() {
    Mediator.emit('app:start');
    console.log('[Socket] App - start');
  }

  onAppStop() {
    Mediator.emit('app:stop');
    console.log('[Socket] App - stop');
  }

  onSoundChange(data) {
    console.log(this.io);
    this.io.emit('sound:play', data)
  }

}
