export default class VintagePhoneControls {
  constructor(object) {
    this.object = object;

    this.toX = 0;
    this.toY = 0;
    this.toZ = 0;

    this.intencityReduction = {
      x: 0.35,
      y: 0.5
    };
    this.dampingFactor = 0.1;

    this.originalPos = undefined;
  }

  updateFromCompass(pos, dir) {
    if (!this.originalPos) {
      this.originalPos = pos;

      return;
    }

    this.toX = -(pos.x - this.originalPos.x) * this.intencityReduction.x;
    this.toY = (pos.y - this.originalPos.y) * this.intencityReduction.y;
    // this.toZ = (pos.z - this.originalPos.z) * this.intencityReduction;
  }

  updateFromGyro(ax, ay, az) {}

  update() {
    this.object.position.x += (this.toX - this.object.position.x) * this.dampingFactor;
    this.object.position.y += (this.toY - this.object.position.y) * this.dampingFactor;
    // this.object.position.z += (this.toZ - this.object.position.z) * this.dampingFactor;
  }
}
