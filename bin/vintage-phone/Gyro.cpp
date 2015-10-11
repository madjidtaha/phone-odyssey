#include "Gyro.h"

/* =======================================================
 * CONSTRUCTOR
 * ====================================================== */
Gyro::Gyro(int address, int sensibility, float scale) {
  _address = address;
  _sensibility = sensibility;
  _scale = scale;
  _x = 0;
  _y = 0;
  _z = 0;
}

/* =======================================================
 * PUBLIC API
 * ====================================================== */

/**
 * Init sensor
 */
void Gyro::setup() {
  // Enable x, y, z and turn off power down:
  this->writeRegister(CTRL_REG1, 0b00001111);
  // Configure CTRL_REG2 to adjust/use the HPF
  this->writeRegister(CTRL_REG2, 0b00000000);
  // Configure CTRL_REG3 to generate data ready interrupt on INT2
  this->writeRegister(CTRL_REG3, 0b00001000);
  // Configur CTRL_REG4 to control the full-scale range
  if(_sensibility == 250){
    this->writeRegister(CTRL_REG4, 0b00000000);
  }else if(_sensibility == 500){
    this->writeRegister(CTRL_REG4, 0b00010000);
  }else{
    this->writeRegister(CTRL_REG4, 0b00110000);
  }
  // Configure CTRL_REG5 controls high-pass filtering of outputs
  this->writeRegister(CTRL_REG5, 0b00000000);
}

/**
 * Read values from sensor
 */
void Gyro::read() {
  byte xMSB = this->readRegister(0x29);
  byte xLSB = this->readRegister(0x28);
  _x = ((xMSB << 8) | xLSB);

  byte yMSB = this->readRegister(0x2B);
  byte yLSB = this->readRegister(0x2A);
  _y = ((yMSB << 8) | yLSB);

  byte zMSB = this->readRegister(0x2D);
  byte zLSB = this->readRegister(0x2C);
  _z = ((zMSB << 8) | zLSB);
}

/**
 * Get angle of rotation on X axis (in degrees)
 * @return int
 */
int Gyro::getX() {
  return _x * _scale * 0.001;
}

/**
 * Get angle of rotation on Y axis (in degrees)
 * @return int
 */
int Gyro::getY() {
  return _y * _scale * 0.001;
}

/**
 * Get angle of rotation on Z axis (in degrees)
 * @return int
 */
int Gyro::getZ() {
  return _z * _scale * 0.001;
}

/* =======================================================
 * PRIVATE API
 * ====================================================== */

/**
 * Send value via I2C
 * @param address
 * @param val
 */
void Gyro::writeRegister(byte address, byte val) {
  // start transmission to device
  Wire.beginTransmission(_address);
  // send register address
  Wire.write(address);
  // send value to write
  Wire.write(val);
  // end transmission
  Wire.endTransmission();
}

/**
 * Read vale via I2C
 * @param  address
 * @return int
 */
int Gyro::readRegister(byte address) {
  int v;
  Wire.beginTransmission(_address);
  // register to read
  Wire.write(address);
  Wire.endTransmission();

  Wire.requestFrom(_address, 1); // read a byte

  while(!Wire.available()) {
      // waiting
  }

  v = Wire.read();
  return v;
}
