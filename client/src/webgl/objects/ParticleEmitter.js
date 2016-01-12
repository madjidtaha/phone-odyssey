import THREE from 'three';

export default class ParticleEmitter extends THREE.Object3D {
  constructor() {
    super();

    this.particleCount = 20;

    this.geom = new THREE.Geometry();
    this.populate();
    this.mat = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 2,
      map: THREE.ImageUtils.loadTexture(
        'assets/images/particle2.png'
      ),
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.mesh = new THREE.Points(this.geom, this.mat);

    this.add(this.mesh);
  }

  populate() {
    for (var i = 0; i < this.particleCount; i++) {
      let particle = new THREE.Vector3(
        0,
        0,
        0
      );
      particle.velocity = new THREE.Vector3(
        THREE.Math.randFloat(-0.1, 0.1),
        THREE.Math.randFloat(-0.1, 0.1),
        THREE.Math.randFloat(0.0, 0.5)
      );

      this.geom.vertices.push(particle);
    }
  }

  update(dt) {
    let pCount = this.particleCount;

    while (pCount--) {
      let p = this.geom.vertices[pCount];
      p.velocity.z += Math.random() * 0.01;

      if (p.z > 20) {
        p.x = 0;
        p.y = 0;
        p.z = 0;
        p.velocity.x = THREE.Math.randFloat(-0.1, 0.1);
        p.velocity.y = THREE.Math.randFloat(-0.1, 0.1);
        p.velocity.z = THREE.Math.randFloat(0.0, 0.5);
      }

      p.add(p.velocity);
    }

    this.mesh.geometry.verticesNeedUpdate = true;
  }
}
