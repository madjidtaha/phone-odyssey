import THREE from 'three';
const glslify = require('glslify');

export default class Ground extends THREE.Object3D {
  constructor() {
    super();

    const plane = new THREE.PlaneGeometry(700, 700, 32, 32);

    this.geom = new THREE.BufferGeometry()
    this.geom.fromGeometry(plane);

    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { type: 'f', value: 0.0 },
        groundmap: { type: 't', value: this.texture },
        resolution: { type: 'v2', value: new THREE.Vector2() }
      },
      vertexShader: glslify('../shaders/ground.vert'),
      fragmentShader: glslify('../shaders/ground.frag'),
      wireframe: false
    });

    const loader = new THREE.TextureLoader();
    loader.load('assets/images/ground-2.jpg', (texture) => {
      this.mat.uniforms.groundmap.value = texture;
      this.mat.uniforms.groundmap.value.wrapS = THREE.RepeatWrapping;
      this.mat.uniforms.groundmap.value.wrapT = THREE.RepeatWrapping;
      this.mat.uniforms.groundmap.value.needsUpdate = true;
    });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.add(this.mesh);
    this.rotation.x = Math.PI * -0.5;
  }

  resize(width, height) {
    this.mat.uniforms.resolution.value.x = width;
    this.mat.uniforms.resolution.value.y = height;
  }

  update(dt) {
    this.mat.uniforms.time.value += dt;
  }
}
