import THREE from 'three';

export default class Torus extends THREE.Object3D {
  constructor() {
    super();

    this.radius = 8;

    this.geom = new THREE.TorusGeometry(this.radius, 1, 16, 50);
    this.mat = new THREE.MeshBasicMaterial({
      color: 0xff0000
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.add(this.mesh);

    const colliderGeom = new THREE.SphereGeometry(this.radius, 16, 16);
    const colliderMat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    colliderMat.opacity = 0;
    console.log(colliderMat.opacity);
    this.collider = new THREE.Mesh(colliderGeom, colliderMat);
    // this.collider.visible = false;
    this.add(this.collider);
  }

  update() {}
}
