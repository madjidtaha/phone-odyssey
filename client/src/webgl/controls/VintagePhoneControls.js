export default class VintagePhoneControls {
  constructor(camera) {
    this.camera = camera;

    this.toX = 0;
    this.toY = 0;
    this.toZ = 0;

    this.originalPos = undefined;
  }

  updateFromCompass(pos, dir) {
    if (!this.originalPos) {
      this.originalPos = pos;

      return;
    }

    this.toX = pos.x - this.originalPos.x;
    this.toY = pos.y - this.originalPos.y;
    this.toZ = pos.z - this.originalPos.z;
  }

  updateFromGyro(ax, ay, az) {}

  update() {
    this.camera.position.x += (this.toX - this.camera.position.x) * 0.1;
    this.camera.position.y += (this.toY - this.camera.position.y) * 0.1;
    // this.camera.position.z += (this.toZ - this.camera.position.z) * 0.1;
  }
}
