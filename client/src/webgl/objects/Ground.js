import THREE from 'three';

export default class Ground extends THREE.Object3D {
  constructor() {
    super();

    const plane = new THREE.PlaneGeometry(400, 300, 32, 32);

    this.geom = new THREE.BufferGeometry()
    this.geom.fromGeometry(plane);
    this.mat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.add(this.mesh);
    this.rotation.x = Math.PI * 0.5;
  }

  update() {}
}
