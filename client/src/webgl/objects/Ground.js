import THREE from 'three';
const glslify = require('glslify');

export default class Ground extends THREE.Object3D {
  constructor() {
    super();

    const plane = new THREE.PlaneGeometry(400, 300, 32, 32);

    this.geom = new THREE.BufferGeometry()
    this.geom.fromGeometry(plane);

    this.mat = new THREE.ShaderMaterial( {
      uniforms: {
        groundmap: { type: 't', value: this.texture }
      },
      vertexShader: glslify('../shaders/ground.vert'),
      fragmentShader: glslify('../shaders/ground.frag'),
      wireframe: true
    });
    // this.mat = new THREE.MeshBasicMaterial({
    //   color: 0x00ff00
    // });

    const loader = new THREE.TextureLoader();
    loader.load('assets/images/ground-1.jpg', (texture) => {
      this.mat.uniforms.groundmap.value = texture;
    });


    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.add(this.mesh);
    this.rotation.x = Math.PI * -0.45;
  }

  update() {}
}
