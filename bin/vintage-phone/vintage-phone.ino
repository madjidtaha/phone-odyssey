void setup() {
  Serial.begin(9600);
}

void loop() {
  // read data only when we receive data:
  if (Serial.available() > 0) {
    readData();
  }

  sendData("test", "Hello world");
  delay(1000);
}

void sendData(String room, String value) {
  Serial.println("data:" + room + ":" + value);
}

void readData() {
  Serial.println("read:start");
  
  // Get the incomming string
  String str = Serial.readString();

  // TODO parse the string and call the desired method

  Serial.println("read:end");
}

