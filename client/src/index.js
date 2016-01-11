import socketConfig from 'config/socket.js';
import domready from 'domready';
import Webgl from './webgl/Webgl';
import WebsocketClient from './WebsocketClient';
import raf from 'raf';
import dat from 'dat-gui';

const socketServer = new WebsocketClient(socketConfig.url);
const webgl = new Webgl(window.innerWidth, window.innerHeight);
const gui = new dat.GUI();

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

// TODO: Make it clean please
const soundManager = {
  testSound() {
    console.log('SOUND CLICKED');
    socketServer.onMusicChange({
      src: 'heyya',
    });

  }
};

domready(() => {
  document.body.appendChild(webgl.renderer.domElement);

  gui.add(webgl.params, 'usePostprocessing');
  gui.add(webgl.params, 'vignette');
  gui.add(soundManager, 'testSound');

  // handle resize
  window.onresize = resizeHandler;
  // let's play !
  animate();
});


function animate() {
  raf(animate);

  webgl.render();
}
