uniform vec2 resolution;
uniform float time;

varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vWorldPosition;

// chunk(shadowmap_pars_vertex);

void main() {
  vUV = uv;

  vec4 worldPosition = modelMatrix * vec4(position, 1.0);

  vNormal = normalMatrix * normal;
  // chunk(shadowmap_vertex);

  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
