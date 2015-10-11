#include <Wire.h>
#include "Gyro.h";
#include "MagnetoCompass.h";

String SEPARATOR = "#!#";

//
// Gyro stuff
//
int L3G4200D_Address = 105; //I2C address of the L3G4200D
int L3G4200D_Sensibility = 500; // Configure L3G4200  - 250, 500 or 2000 deg/sec
float L3G4200D_Scale = 17.5;
String gyroValues;
Gyro gyro(L3G4200D_Address, L3G4200D_Sensibility, L3G4200D_Scale);

//
// Compass stuff
//
MagnetoCompass compass(30); // 0x1E 0011110b, I2C 7bit address of HMC5883
String compassValues;

void setup() {
  Serial.begin(9600);
  Wire.begin();

  gyro.setup();
  compass.setup();

  delay(1500); //wait for the sensor to be ready
}

void loop() {
  // read data only when we receive data:
  if (Serial.available() > 0) {
    readData();
  } else {
    gyro.read();
    gyroValues = formatTripleAxisValues(gyro.getX(), gyro.getY(), gyro.getZ());
    sendData("gyro", gyroValues);

    compass.read();
    compassValues = formatTripleAxisValues(compass.getX(), compass.getY(), compass.getZ());
    sendData("compass", compassValues);

    delay(300);
  }
}

void sendData(String room, String value) {
  Serial.println("data" + SEPARATOR + room + SEPARATOR + value);
}

void readData() {
  // Get the incomming string
  String str = Serial.readString();

  // TODO parse the string and call the desired method
}

String formatTripleAxisValues(int x, int y, int z) {
  return "{\"x\":" + String(x) + ", \"y\":" + String(y) + ", \"z\":" + String(z) + "}";
}


