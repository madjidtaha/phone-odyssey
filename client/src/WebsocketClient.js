import io from 'socket.io-client';
import bindAll from 'lodash.bindAll';

export default class WebsocketClient {
  constructor(url) {
    bindAll(this, 'onConnection', 'onGyroUpdate');

    this.url = url;
    this.io = io(url);
    this.io.on('connection:success', this.onConnection);
  }

  attachEvents() {
    this.io.on('gyro:update', this.onGyroUpdate);
  }

  onConnection() {
    console.log('[Socket] Connection - success!');
    this.attachEvents();
  }

  onGyroUpdate(angles) {
    console.log('[Socket] Gyro update', angles);
  }
}
