import THREE from 'three';

export default class ParticleEmitter extends THREE.Object3D {
  constructor() {
    super();

    this.time = 0;

    this.particleCount = 20;
    this.geom = new THREE.Geometry();
    this.populate();
    this.mat = new THREE.PointsMaterial({
      color: 0x00FFFF,
      size: 2,
      map: THREE.ImageUtils.loadTexture(
        'assets/images/particle2.png'
      ),
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    this.particles = new THREE.Points(this.geom, this.mat);
    this.add(this.particles);

    const spriteMaterial = new THREE.SpriteMaterial({
      map: THREE.ImageUtils.loadTexture(
        'assets/images/sprite-2.png'
      ),
      depthTest: false
    });
    this.sprite = new THREE.Sprite(spriteMaterial);
    this.sprite.scale.set(8, 8, 1);
    this.add(this.sprite);

  }

  populate() {
    for (var i = 0; i < this.particleCount; i++) {
      let particle = new THREE.Vector3(
        0,
        0,
        0
      );
      particle.velocity = new THREE.Vector3(
        THREE.Math.randFloat(-0.05, 0.05),
        THREE.Math.randFloat(-0.05, 0.05),
        THREE.Math.randFloat(0.0, 0.5)
      );

      this.geom.vertices.push(particle);
    }
  }

  update(dt) {
    this.time += dt;
    this.sprite.scale.set(
      Math.abs(Math.sin(0.8 * this.time) * Math.cos(0.8 * this.time)) * 8 + 7.5,
      Math.abs(Math.sin(0.8 * this.time) * Math.cos(0.8 * this.time)) * 8 + 7.5,
      1
    );

    let pCount = this.particleCount;

    while (pCount--) {
      let p = this.geom.vertices[pCount];
      p.velocity.z += Math.random() * 0.01;

      if (p.z > 30) {
        p.x = 0;
        p.y = 0;
        p.z = 0;
        p.velocity.x = THREE.Math.randFloat(-0.05, 0.05);
        p.velocity.y = THREE.Math.randFloat(-0.05, 0.05);
        p.velocity.z = THREE.Math.randFloat(0.0, 0.5);
      }

      p.add(p.velocity);
    }

    this.particles.geometry.verticesNeedUpdate = true;
  }
}
