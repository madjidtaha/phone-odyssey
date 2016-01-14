import THREE from 'three';
const glslify = require('glslify');
import Mediator from 'shared/Mediator';

export default class Torus extends THREE.Object3D {
  constructor() {
    super();

    this.points = 10;
    this.radius = 8;
    this.isActive = true;
    this.speed = 1.0;

    this.geom = new THREE.TorusGeometry(this.radius, 1, 16, 50);
    this.mat = new THREE.MeshBasicMaterial({
      color: 0xff0000
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.add(this.mesh);

    const colliderGeom = new THREE.SphereGeometry(this.radius, 16, 16);
    const colliderMat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true
    });
    colliderMat.opacity = 0;
    this.collider = new THREE.Mesh(colliderGeom, colliderMat);
    this.add(this.collider);
  }

  onTouch() {
    if (!this.isActive) { return; }

    this.visible = false;
    this.isActive = false;
    this.setRandomPosition();
    Mediator.emit('sound:play', {
      sound: 'sfx-ring'
    });
  }

  setRandomPosition() {
    this.position.set(
      THREE.Math.randFloat(-100, 100),
      THREE.Math.randFloat(0, 50),
      THREE.Math.randFloat(-500, -1000)
    );

    this.speed = THREE.Math.randFloat(1.0, 5.0);
    this.visible = true;
    this.isActive = true;
  }

  update() {
    this.position.z += this.speed;
  }
}
