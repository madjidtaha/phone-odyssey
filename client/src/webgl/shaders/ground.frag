uniform sampler2D groundmap;
uniform vec2 resolution;
uniform vec3 lightPosition;


varying vec2 vUVOffset;
varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vWorldPosition;

vec3 colorA = vec3(0.3, 0.68, 0.64);
vec3 colorB = vec3(0.23, 0.24, 0.48);

// chunk(shadowmap_pars_fragment);

void main() {

  vec3 shadowMask = vec3( 1.0 );

  vec3 lightDirection = normalize(lightPosition - vWorldPosition);
  vec3 outgoingLight = vec3(1.0);

  vec3 color = mix(colorA, colorB, vec3(vUV.y));

  // chunk(shadowmap_fragment);

  float r = 0.15 + max(0.0, dot(vNormal, lightDirection)) * color.r * shadowMask.x;
  float g = 0.15 + max(0.0, dot(vNormal, lightDirection)) * color.g * shadowMask.x;
  float b = 0.15 + max(0.0, dot(vNormal, lightDirection)) * color.b * shadowMask.x;


  gl_FragColor = vec4(r, g, b, 1.0);
}
