uniform vec2 resolution;
uniform float time;

varying vec2 vUV;

vec3 colorA = vec3(0.41, 0.35, 0.53);
vec3 colorB = vec3(1, 0.94, 0.28);

void main() {

  vec2 coord = vec2(gl_FragCoord.xy / resolution);
  vec2 uv = vUV;

  vec3 color = vec3(step(0.05, mod(uv.x, 0.2)));
  color = vec3(sin(time));

  float clr = sin((uv.x + time * 0.15) * 50.0);
  color = smoothstep(0.0, 0.3, clr) < 0.5 ? colorA : colorB;


  gl_FragColor = vec4(color, 1.0);
}
