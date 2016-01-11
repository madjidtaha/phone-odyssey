import THREE from 'three';
import Cube from './objects/Cube';
import VintagePhoneControls from './controls/VintagePhoneControls';
import Mediator from 'shared/Mediator';
import bindAll from 'lodash.bindAll';

export default class Webgl {
  constructor(width, height) {
    bindAll(this, 'onGyroUpdate', 'onCompassUpdate');

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.controls = new VintagePhoneControls(this.camera);
    // Mediator.on('gyro:update', this.onGyroUpdate);
    Mediator.on('compass:update', this.onCompassUpdate);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);

    this.cube = new Cube();
    this.cube.position.set(0, 0, 0);
    this.scene.add(this.cube);
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

  render() {
    this.renderer.autoClear = false;
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.cube.update();
    this.controls.update();
  }
}
