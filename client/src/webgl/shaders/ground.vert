uniform sampler2D groundmap;

void main() {
  vec4 texCoord = texture2D(groundmap, uv);

  vec3 newPos = position;
  newPos.z += 10.0 * texCoord.r;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
}
