import THREE from 'three';

export default class Sky extends THREE.Object3D {
  constructor() {
    super();

    this.width = 1200;
    this.height = 560;

    const g = new THREE.PlaneGeometry(1200, 560, 32, 32);
    const m = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(
        'assets/images/sky-2.png'
      ),
    });
    const mesh = new THREE.Mesh(g, m);

    this.add(mesh);
  }
}
