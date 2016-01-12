import io from 'socket.io-client';
import bindAll from 'lodash.bindAll';
import Mediator from 'shared/Mediator';

export default class WebsocketClient {
  constructor(url) {
    bindAll(this, 'onConnection', 'onGyroUpdate', 'onCompassUpdate');

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
  }

  onGyroUpdate(angles) {
    Mediator.emit('gyro:update', angles);
  }

  onCompassUpdate(data) {
    Mediator.emit('compass:update', data);
  }

  onSoundChange(data) {
    this.io.emit('sound:play', data)
  }

}
