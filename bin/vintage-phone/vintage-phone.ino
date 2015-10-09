#include <Wire.h>

#define CTRL_REG1 0x20
#define CTRL_REG2 0x21
#define CTRL_REG3 0x22
#define CTRL_REG4 0x23
#define CTRL_REG5 0x24


String SEPARATOR = "#!#";

int L3G4200D_Address = 105; //I2C address of the L3G4200D
int L3G4200D_Sensibility = 500; // Configure L3G4200  - 250, 500 or 2000 deg/sec
float L3G4200D_Scale = 17.5; // 
int xGyro, yGyro, zGyro;
String gyroValues;

void setup() {
  Serial.begin(9600);
  Wire.begin();

  setupL3G4200D(L3G4200D_Sensibility); 

  delay(1500); //wait for the sensor to be ready 
}

void loop() {
  // read data only when we receive data:
  if (Serial.available() > 0) {
    readData();
  }

  getGyroValues();
  gyroValues = formatTripleAxisValues(xGyro, yGyro, zGyro);
  sendData("gyro", gyroValues);

  delay(300);

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


// Code from http://forum.arduino.cc/index.php?topic=120111.msg903930#msg903930
void getGyroValues(){

  byte xMSB = readRegister(L3G4200D_Address, 0x29);
  byte xLSB = readRegister(L3G4200D_Address, 0x28);
  xGyro = ((xMSB << 8) | xLSB);

  byte yMSB = readRegister(L3G4200D_Address, 0x2B);
  byte yLSB = readRegister(L3G4200D_Address, 0x2A);
  yGyro = ((yMSB << 8) | yLSB);

  byte zMSB = readRegister(L3G4200D_Address, 0x2D);
  byte zLSB = readRegister(L3G4200D_Address, 0x2C);
  zGyro = ((zMSB << 8) | zLSB);

  // Convert values into degrees
  xGyro = xGyro * L3G4200D_Scale/1000;
  yGyro = yGyro * L3G4200D_Scale/1000;
  zGyro = zGyro * L3G4200D_Scale/1000;
}

int setupL3G4200D(int scale){
  //From  Jim Lindblom of Sparkfun's code

  // Enable x, y, z and turn off power down:
  writeRegister(L3G4200D_Address, CTRL_REG1, 0b00001111);

  // If you'd like to adjust/use the HPF, you can edit the line below to configure CTRL_REG2:
  writeRegister(L3G4200D_Address, CTRL_REG2, 0b00000000);

  // Configure CTRL_REG3 to generate data ready interrupt on INT2
  // No interrupts used on INT1, if you'd like to configure INT1
  // or INT2 otherwise, consult the datasheet:
  writeRegister(L3G4200D_Address, CTRL_REG3, 0b00001000);

  // CTRL_REG4 controls the full-scale range, among other things:

  if(scale == 250){
    writeRegister(L3G4200D_Address, CTRL_REG4, 0b00000000);
  }else if(scale == 500){
    writeRegister(L3G4200D_Address, CTRL_REG4, 0b00010000);
  }else{
    writeRegister(L3G4200D_Address, CTRL_REG4, 0b00110000);
  }

  // CTRL_REG5 controls high-pass filtering of outputs, use it
  // if you'd like:
  writeRegister(L3G4200D_Address, CTRL_REG5, 0b00000000);
}

void writeRegister(int deviceAddress, byte address, byte val) {
    Wire.beginTransmission(deviceAddress); // start transmission to device 
    Wire.write(address);       // send register address
    Wire.write(val);         // send value to write
    Wire.endTransmission();     // end transmission
}

int readRegister(int deviceAddress, byte address){

    int v;
    Wire.beginTransmission(deviceAddress);
    Wire.write(address); // register to read
    Wire.endTransmission();

    Wire.requestFrom(deviceAddress, 1); // read a byte

    while(!Wire.available()) {
        // waiting
    }

    v = Wire.read();
    return v;
}


