import THREE from 'three';
const glslify = require('glslify');
import Mediator from 'shared/Mediator';

function replaceThreeChunkFn(a, b) {
  return THREE.ShaderChunk[b] + '\n';
}

function shaderParse(glsl) {
  return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, replaceThreeChunkFn);
}

export default class Torus extends THREE.Object3D {
  constructor() {
    super();

    this.points = 10;
    this.radius = 8;
    this.isActive = true;
    this.speed = 1.0;

    this.geom = new THREE.TorusGeometry(this.radius, 1, 32, 100);
    this.mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.shadowmap,
        {
          time: { type: 'f', value: 0.0 },
          resolution: { type: 'v2', value: new THREE.Vector2() },
          lightPosition: { type: 'v3', value: new THREE.Vector3(700, 700, 700) },
        }]),
      vertexShader: shaderParse(glslify('../shaders/torus.vert')),
      fragmentShader: shaderParse(glslify('../shaders/torus.frag')),
      wireframe: false,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.castShadow = true;
    this.receiveShadow = true;
    this.add(this.mesh);

    const colliderGeom = new THREE.SphereGeometry(this.radius, 16, 16);
    const colliderMat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
    });
    colliderMat.opacity = 0;
    this.collider = new THREE.Mesh(colliderGeom, colliderMat);
    this.add(this.collider);
  }

  resize(width, height) {

    this.mat.uniforms.resolution.value.x = width;
    this.mat.uniforms.resolution.value.y = height;
  }

  onTouch() {
    if (!this.isActive) { return; }

    this.visible = false;
    this.isActive = false;
    this.setRandomPosition();
    Mediator.emit('sound:play', {
      sound: 'sfx-ring',
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

  update(dt) {

    this.mat.uniforms.time.value += dt;
    this.position.z += this.speed;

  }
}
