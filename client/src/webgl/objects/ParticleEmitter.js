import THREE from 'three';

export default class ParticleEmitter extends THREE.Object3D {
  constructor() {
    super();

    this.geom = new THREE.Geometry();
    this.mat = new THREE.PointsMaterial({
      color: 0xff0000
    });
    this.mesh = new THREE.Points(this.geom, this.mat);

    this.add(this.mesh);
  }

  update(dt) {

  }
}
