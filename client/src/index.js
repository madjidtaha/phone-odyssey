import './stylus/main.styl';
import socketConfig from 'config/socket.js';
import io from 'socket.io-client';
import domready from 'domready';

domready(() => {
  const socketServer = io(socketConfig.url);
  socketServer.on('connection:success', () => {
    console.log('[Socket] Connection - success!');
  });

  socketServer.on('gyro:update', (angles) => {
    console.log('[Socket] Gyro update', angles);
  });
});
