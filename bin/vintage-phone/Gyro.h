#ifndef Gyro_h
#define Gyro_h
#endif

#include "Arduino.h"
#include "Wire.h"

#define CTRL_REG1 0x20
#define CTRL_REG2 0x21
#define CTRL_REG3 0x22
#define CTRL_REG4 0x23
#define CTRL_REG5 0x24

/* =======================================================
 * Gyro class
 * read values from L3G4200D sensor
 * inspired by http://forum.arduino.cc/index.php?topic=120111.msg903930#msg903930
 * ====================================================== */
class Gyro
{
  public:
    Gyro(int address, int sensibility, float scale);
    void setup();
    void read();
    int getX();
    int getY();
    int getZ();

  private:
    int _address;
    int _sensibility;
    float _scale;
    int _x;
    int _y;
    int _z;
    void writeRegister(int deviceAddress, byte address, byte val);
    int readRegister(int deviceAddress, byte address);
};
