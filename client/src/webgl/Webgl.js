import THREE from 'three';
import Cube from './objects/Cube';
import Ground from './objects/Ground';
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
  constructor(width, height) {
    bindall(this, 'onGyroUpdate', 'onCompassUpdate');

    this.params = {
      usePostprocessing: true,
      vignette: true
    };

    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock(true);

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.controls = new OrbitControls(this.camera);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);
    this.renderer.autoClear = false;

    // this.cube = new Cube();
    // this.cube.position.set(0, 0, 0);
    this.particles = new ParticleEmitter();
    this.particles.position.set(0, 0, 0);
    this.scene.add(this.particles);

    this.controls = new VintagePhoneControls(this.particles);
    // Mediator.on('gyro:update', this.onGyroUpdate);
    Mediator.on('compass:update', this.onCompassUpdate);

    this.ground = new Ground();
    this.ground.position.set(0, -25, -100);
    this.scene.add(this.ground);

    if (this.params.usePostprocessing) {
      this.initPostprocessing();
    }
  }

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  onGyroUpdate(angles) {
    this.controls.updateFromGyro(angles.x, angles.y, angles.z);
  }

  onCompassUpdate(data) {
    this.controls.updateFromCompass(data.position, data.direction);
  }

  initPostprocessing() {
    this.renderer.autoClearColor = true;
    this.composer = new WAGNER.Composer(this.renderer);
    this.fxaaPass = new FXAAPass();
    this.vignette2Pass = new Vignette2Pass();
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

    const dt = this.clock.getDelta();

    this.particles.update(dt);
    this.ground.update(dt);
  }
}
