#ifndef MagnetoCompass_h
#define MagnetoCompass_h
#endif

#include "Arduino.h"
#include "Wire.h"

/* =======================================================
 * MagnetoCompass class
 * read values from HMC5883L sensor
 * ====================================================== */
class MagnetoCompass
{
  public:
    MagnetoCompass(int address);
    void setup();
    void read();
    int getX();
    int getY();
    int getZ();

  private:
    int _address;
    int _x;
    int _y;
    int _z;
};
