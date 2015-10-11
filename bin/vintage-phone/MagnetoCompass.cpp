#include "MagnetoCompass.h"

/* =======================================================
 * CONSTRUCTOR
 * ====================================================== */
MagnetoCompass::MagnetoCompass(int address) {
  _address = address;
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
void MagnetoCompass::setup() {
  //open communication with HMC5883
  Wire.beginTransmission(_address);
  //select mode register
  Wire.write(0x02);
  //continuous measurement mode
  Wire.write(0x00);
  Wire.endTransmission();
}

/**
 * Read values from sensor
 */
void MagnetoCompass::read() {
   //Tell the HMC5883 where to begin reading data
   Wire.beginTransmission(_address);
   //select register 3, X MSB register
   Wire.write(0x03);
   Wire.endTransmission();

  //Read data from each axis, 2 registers per axis
   Wire.requestFrom(_address, 6);
   if(6<=Wire.available()){
     _x = Wire.read()<<8; //X msb
     _x |= Wire.read(); //X lsb
     _z = Wire.read()<<8; //Z msb
     _z |= Wire.read(); //Z lsb
     _y = Wire.read()<<8; //Y msb
     _y |= Wire.read(); //Y lsb
   }
}

/**
 * Get angle on X axis (in degrees)
 * @return int
 */
int MagnetoCompass::getX() {
  return _x;
}

/**
 * Get angle on Y axis (in degrees)
 * @return int
 */
int MagnetoCompass::getY() {
  return _y;
}

/**
 * Get angle on Z axis (in degrees)
 * @return int
 */
int MagnetoCompass::getZ() {
  return _z;
}
