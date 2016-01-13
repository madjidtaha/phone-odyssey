uniform sampler2D groundmap;
uniform vec2 resolution;

varying vec2 vUVOffset;
varying vec2 vUV;

vec3 colorA = vec3(0.3, 0.68, 0.64);
vec3 colorB = vec3(0.23, 0.24, 0.48);

void main() {
  gl_FragColor = vec4(mix(colorA, colorB, vec3(vUV.y)), 1.0);
}
