uniform sampler2D groundmap;

varying vec2 vUVOffset;
varying vec2 vUV;

// vec3 colorA = vec3(0.3, 0.68, 0.64);
vec3 colorA = vec3(1.0, 1.0, 1.0);
vec3 colorB = vec3(0.23, 0.24, 0.48);

void main() {
  vec3 color = mix(colorA, colorB, vec3(vUV.y));

  if (step(0.05, mod(vUV.y, 0.1)) < 0.5) {
    discard;
  }


  gl_FragColor = vec4(color, 1.0);
}
