uniform sampler2D groundmap;
uniform float time;

varying vec2 vUVOffset;
varying vec2 vUV;

void main() {
  vUV = uv;
  vUVOffset = uv + vec2(0.0, 0.35 * time);
  vec4 texCoord = texture2D(groundmap, vUVOffset);

  vec3 newPos = position;
  newPos.z += 30.0 * texCoord.r;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
}
