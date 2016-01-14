import socketConfig from 'config/socket.js';
import domready from 'domready';
import Webgl from './webgl/Webgl';
import WebsocketClient from './WebsocketClient';
import Mediator from 'shared/Mediator';
import raf from 'raf';
import dat from 'dat-gui';
import Game from './Game';
import 'gsap';

const socketServer = new WebsocketClient(socketConfig.url);
const game = new Game(document.getElementById('timevalue'), document.getElementById('scorevalue'));
const webgl = new Webgl(window.innerWidth, window.innerHeight, game);
const gui = new dat.GUI();
let rafRef;

const $overlay = document.querySelector('.overlay');
const $textIntro = document.querySelector('.text-intro');
const $svgIntro = document.querySelector('.text-intro svg');
const $startBtn = document.querySelector('.text-intro p');
const $textLoad = document.querySelector('.text-load');
const $textEnd = document.querySelector('.text-end');

$startBtn.addEventListener('click', () => {
  Mediator.emit('app:start');
});

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

// TODO: Make it clean please
const soundManager = {

  testSound() {
    console.log('SOUND CLICKED');
    Mediator.emit('sound:play', {
      sound: 'tts-lose',
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

  Mediator.on('app:start', telephoneDecroche);
  Mediator.on('game:win', onGameWin);
  Mediator.on('game:lose', onGameLoose);

  // handle resize
  window.onresize = resizeHandler;
  // let's play !
  animate();
});

function telephoneDecroche() {
  setTimeout(function () {
    Mediator.emit('sound:play', {
      sound: 'tts-hello',
    });
  }, 2000);

  setTimeout(function () {
    TweenMax.fromTo($textIntro.querySelector('h1'), 0.8,
      { y: 0, alpha: 1 },
      { y: 50, alpha: 0, ease: Expo.easeOut, onComplete: () => {
        $textIntro.style.visibility = 'hidden';
        $textLoad.style.visibility = 'visible';
        decompte();
      } })
  }, 10000);

  TweenMax.staggerFromTo([ $startBtn, $svgIntro ],
    0.8,
    { y: 0, alpha: 1 },
    { y: 50, alpha: 0, ease: Expo.easeOut },
    0.08
  );
}

function decompte() {
  let $3 = $textLoad.querySelector('h1:first-child');
  let $2 = $textLoad.querySelector('h1:nth-child(2)');
  let $1 = $textLoad.querySelector('h1:nth-child(3)');

  let tl = new TimelineMax({
    onComplete: () => {
      game.start();
      Mediator.emit('sound:play', {
        sound: 'music-pink-floyd',
      });
    }
  });
  tl.fromTo($3, 0.6, { alpha: 0, scale: 0.3 }, { alpha: 1, scale: 1, ease: Expo.easeOut}, 0);
  tl.to($3, 0.6, { alpha: 0, scale: 3, ease: Expo.easeOut}, 0.7);
  tl.fromTo($2, 0.6, { alpha: 0, scale: 0.3 }, { alpha: 1, scale: 1, ease: Expo.easeOut}, 1.4);
  tl.to($2, 0.6, { alpha: 0, scale: 3, ease: Expo.easeOut}, 2.1);
  tl.fromTo($1, 0.6, { alpha: 0, scale: 0.3 }, { alpha: 1, scale: 1, ease: Expo.easeOut}, 2.8);
  tl.to($1, 0.6, { alpha: 0, scale: 3, ease: Expo.easeOut}, 3.5);
  tl.to($overlay, 0.6, { alpha: 0, ease: Cubic.easeOut }, 4.1);
}

function onGameWin() {
  console.log('[Game] win');

  raf.cancel(rafRef);

  $textEnd.innerHTML = `
    <h2>VICTOIRE!</h2>
    <p>Vous avez établie la connexion avec votre correspondant</p>
  `;
  $overlay.style.visibility = 'inherit';

  Mediator.emit('sound:play', {
    sound: 'tts-win',
  });
}

function onGameLoose() {
  console.log('[Game] loose');

  raf.cancel(rafRef);

  $textEnd.innerHTML = `
    <h2>DEFAITE!</h2>
    <p>La connexion a été perdue<br>Raccrochez pour réessayer</p>
  `;
  TweenMax.to($overlay, 0.6, { alpha: 0.6, ease: Cubic.easeOut });
  $textEnd.style.visibility = 'visible';

  Mediator.emit('sound:play', {
    sound: 'tts-lose',
  });
}

function animate() {
  rafRef = raf(animate);

  webgl.render();
}
