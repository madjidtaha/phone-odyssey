uniform vec2 resolution;
uniform float time;
uniform vec3 lightPosition;

varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vWorldPosition;

vec3 colorA = vec3(0.41, 0.35, 0.53);
vec3 colorB = vec3(1, 0.94, 0.28);

// chunk(shadowmap_pars_fragment);

void main() {

  vec3 shadowMask = vec3( 1.0 );

  vec3 lightDirection = normalize(lightPosition - vWorldPosition);
  vec3 outgoingLight = vec3(1.0);

  vec2 coord = vec2(gl_FragCoord.xy / resolution);
  vec2 uv = vUV;

  vec3 color = vec3(step(0.05, mod(uv.x, 0.2)));
  color = vec3(sin(time));

  float clr = sin((uv.x + time * 0.15) * 50.0);
  color = smoothstep(0.0, 0.3, clr) < 0.5 ? colorA : colorB;

  // chunk(shadowmap_fragment);


  float r = 0.15 + max(0.0, dot(vNormal, lightDirection)) * color.r * shadowMask.x;
  float g = 0.15 + max(0.0, dot(vNormal, lightDirection)) * color.g * shadowMask.x;
  float b = 0.15 + max(0.0, dot(vNormal, lightDirection)) * color.b * shadowMask.x;

  gl_FragColor = vec4(r, g, b, 1.0);
  // gl_FragColor = vec4(c, c, c, 1.0);
}
