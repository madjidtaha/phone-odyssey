import THREE from 'three';
const glslify = require('glslify');

function replaceThreeChunkFn(a, b) {
  return THREE.ShaderChunk[b] + '\n';
}

function shaderParse(glsl) {
  return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, replaceThreeChunkFn);
}

export default class Ground extends THREE.Object3D {
  constructor() {
    super();

    const plane = new THREE.PlaneGeometry(700, 700, 128, 128);

    this.geom = new THREE.BufferGeometry();
    this.geom.fromGeometry(plane);

    this.mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.shadowmap,
        {
          time: { type: 'f', value: 0.0 },
          groundmap: { type: 't', value: this.texture },
          resolution: { type: 'v2', value: new THREE.Vector2() },
          lightPosition: { type: 'v3', value: new THREE.Vector3(700, 700, 700) },
        }]),
      vertexShader: shaderParse(glslify('../shaders/ground.vert')),
      fragmentShader: shaderParse(glslify('../shaders/ground.frag')),
      wireframe: false,
    });

    const loader = new THREE.TextureLoader();
    loader.load('assets/images/ground-17.png', (texture) => {
      this.mat.uniforms.groundmap.value = texture;
      this.mat.uniforms.groundmap.value.wrapS = THREE.RepeatWrapping;
      this.mat.uniforms.groundmap.value.wrapT = THREE.RepeatWrapping;
      this.mat.uniforms.groundmap.value.needsUpdate = true;
    });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.castShadow = true;
    this.receiveShadow = true;

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
