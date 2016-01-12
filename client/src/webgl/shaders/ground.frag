uniform sampler2D groundmap;

varying vec2 vUV;

void main() {
  gl_FragColor = texture2D(groundmap, vUV);
}
