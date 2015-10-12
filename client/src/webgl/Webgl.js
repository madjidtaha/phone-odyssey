import THREE from 'three';
window.THREE = THREE;
import Cube from './objects/Cube';

export default class Webgl {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

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

  render() {
    this.renderer.autoClear = false;
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.cube.update();
  }
}
