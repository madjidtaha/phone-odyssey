import THREE from 'three';
import Ground from './objects/Ground';
import Torus from './objects/Torus';
import ParticleEmitter from './objects/ParticleEmitter';
import VintagePhoneControls from './controls/VintagePhoneControls';
import Mediator from 'shared/Mediator';
import bindall from 'lodash.bindall';
import WAGNER from '@superguigui/wagner';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import Vignette2Pass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import OrbitControlsNode from 'three-orbit-controls';
const OrbitControls = OrbitControlsNode(THREE);

export default class Webgl {
  constructor(width, height, gameInstance) {
    bindall(this, 'onCompassUpdate', 'start', 'stop');

    this.gameInstance = gameInstance;

    this.params = {
      constrolsDebug: false,
      usePostprocessing: true,
      vignette: true
    };

    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock(false);
    this.started = false;

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;
    this.cameraBounds = {
      top: 60,
      bottom: -60,
      right: 120,
      left: -120
    };

    this.orbitControls = new OrbitControls(this.camera);
    this.orbitControls.enabled = this.params.constrolsDebug;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x393B74);
    this.renderer.autoClear = false;

    this.torusPool = [];
    this.nbTorus = 10;
    this.populateToruses();

    this.particles = new ParticleEmitter();
    this.particles.position.set(0, 0, 0);
    this.scene.add(this.particles);
    this.particlesPosition2D = new THREE.Vector2();
    this.normalizeParticlePos();

    this.controls = new VintagePhoneControls(this.particles);

    this.ground = new Ground();
    this.ground.position.set(0, -25, -100);
    this.scene.add(this.ground);

    if (this.params.usePostprocessing) {
      this.initPostprocessing();
    }

    Mediator.on('game:start', this.start);
    Mediator.on('game:stop', this.stop);
  }

  populateToruses() {
    let t;
    for (let i = 0; i < this.nbTorus; i++) {
      t = new Torus();
      t.setRandomPosition();
      this.torusPool.push(t)
      this.scene.add(t);
    }
  }

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    if (this.params.postprocessing) {
      this.composer.setSize(width, height);
    }

    this.renderer.setSize(width, height);

    this.ground.resize(width, height);
  }

  // onGyroUpdate(angles) {
  //   this.controls.updateFromGyro(angles.x, angles.y, angles.z);
  // }

  start() {
    this.clock.start();
    this.started = true;
    Mediator.on('compass:update', this.onCompassUpdate);
  }

  stop() {
    this.clock.stop();
    this.started = false;
  }

  onCompassUpdate(data) {
    this.controls.updateFromCompass(data.position, data.direction);
    this.particlesPosition2D = this.normalizeParticlePos();
  }

  initPostprocessing() {
    this.renderer.autoClearColor = true;
    this.composer = new WAGNER.Composer(this.renderer);
    this.fxaaPass = new FXAAPass();
    this.vignette2Pass = new Vignette2Pass();
  }

  normalizeParticlePos() {
    let x;
    let y;

    if (this.particles.position.x >= 0) {
      x = this.particles.position.x / this.cameraBounds.right;
    } else {
      x = this.particles.position.x / this.cameraBounds.left;
    }

    if (this.particles.position.y >= 0) {
      y = this.particles.position.y / this.cameraBounds.top;
    } else {
      y = this.particles.position.y / this.cameraBounds.bottom;
    }

    return { x, y };
  }

  render() {
    if (this.params.usePostprocessing) {
      this.composer.reset();
      this.composer.render(this.scene, this.camera);
      if (this.params.vignette) { this.composer.pass(this.vignette2Pass); }
      this.composer.pass(this.fxaaPass);
      this.composer.toScreen();
    } else {
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }

    if (!this.started) { return; }

    const dt = this.clock.getDelta();

    this.gameInstance.removeTime(dt);

    this.particles.update(dt);
    this.ground.update(dt);
    this.controls.update();

    this.torusPool.forEach((torus) => {
      torus.update(dt);

      const d = this.particles.position.distanceTo(torus.position);

      if (torus.isActive && d <= torus.radius) {
        torus.onTouch();
        this.gameInstance.addPoints(torus.points);
      }

      if (torus.position.z > 100) {
        torus.setRandomPosition();
      }
    })
  }
}
