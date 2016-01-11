import './stylus/main.styl';
import socketConfig from 'config/socket.js';
import domready from 'domready';
import Webgl from './webgl/Webgl';
import WebsocketClient from './WebsocketClient';
import raf from 'raf';

const socketServer = new WebsocketClient(socketConfig.url);
const webgl = new Webgl(window.innerWidth, window.innerHeight);

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

domready(() => {
  console.log('Hello world');
  document.getElementById('testSound').addEventListener('click', function onClick(event) {
    console.log('startSound');
  });

  document.body.appendChild(webgl.renderer.domElement);
  // handle resize
  window.onresize = resizeHandler;
  // let's play !
  animate();

});

function animate() {
  raf(animate);

  webgl.render();
}
