uniform sampler2D groundmap;
uniform float time;

varying vec2 vUVOffset;
varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vWorldPosition;

// chunk(shadowmap_pars_vertex);

void main() {
  vUV = uv;
  vUVOffset = uv + vec2(0.0, 0.35 * time);
  vec4 texCoord = texture2D(groundmap, vUVOffset);

  vec3 newPos = position;
  newPos.z += 25.0 * (texCoord.r + texCoord.g);

  vec4 worldPosition = modelMatrix * vec4(newPos, 1.0);

  vNormal = normalMatrix * normal;

  // chunk(shadowmap_vertex);

  vWorldPosition = worldPosition.xyz;

  // gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
