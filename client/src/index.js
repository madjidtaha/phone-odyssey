import socketConfig from 'config/socket.js';
import domready from 'domready';
import Webgl from './webgl/Webgl';
import WebsocketClient from './WebsocketClient';
import Mediator from 'shared/Mediator';
import raf from 'raf';
import dat from 'dat-gui';
import Game from './Game';

const socketServer = new WebsocketClient(socketConfig.url);
const game = new Game(document.getElementById('timevalue'), document.getElementById('scorevalue'));
const webgl = new Webgl(window.innerWidth, window.innerHeight, game);
const gui = new dat.GUI();

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

// TODO: Make it clean please
const soundManager = {

  testSound() {
    console.log('SOUND CLICKED');
    Mediator.emit('sound:play', {
      sound: 'sfx-ring',
    });
  }

};

domready(() => {
  document.body.appendChild(webgl.renderer.domElement);

  const fPost = gui.addFolder('PostProcessing');
  fPost.add(webgl.params, 'usePostprocessing');
  fPost.add(webgl.params, 'vignette');
  const fGame = gui.addFolder('Game');
  fGame.add(game, 'start');
  fGame.add(game, 'stop');
  gui.add(webgl.params, 'constrolsDebug').onChange(() => {
    webgl.orbitControls.enabled = webgl.params.constrolsDebug
  });
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
