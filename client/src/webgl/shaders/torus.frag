uniform vec2 resolution;
uniform float time;

varying vec2 vUV;

vec3 colorA = vec3(0.3, 0.68, 0.64);
vec3 colorB = vec3(0.23, 0.24, 0.48);

void main() {

  vec2 coord = vec2(gl_FragCoord.xy / resolution);
  vec2 uv = vUV;

  gl_FragColor = vec4(uv.x * cos(time), uv.y * sin(time), 1.0, 1.0);
  // gl_FragColor = vec4(mix(colorA, colorB, vec3(vUV.y)), 1.0);
}
