#include <WiFiNINA.h>

/*
  Based off of https://github.com/tigoe/Wifi_examples/blob/main/simpleUDPClient/simpleUDPClient.ino by Tom Igoe
*/
#include <SPI.h>
#include <WiFiNINA.h>  // use this for MKR1010 board and Nano 33 IoT
//#include <WiFi101.h>        // use this for the MKR1000 board
#include <WiFiUdp.h>
#include "arduino_secrets.h"

WiFiUDP Udp;  // instance of UDP library
// the address and port of the server
const char serverAddress[] = ""; // IP Address of Raspberry Pi
const int port = ;  // port on which this client sends and receives

// BUTTON
const int buttonPin = 2;  // the number of the pushbutton pin

int buttonState;            // the current reading from the input pin
int lastButtonState = HIGH;  // the previous reading from the input pin

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers


void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);  // Uses internal resister

  // while you're not connected to a WiFi AP,
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(SECRET_SSID);           // print the network name (SSID)
    WiFi.begin(SECRET_SSID, SECRET_PASS);  // try to connect
    delay(2000);
  }
  // When you're connected, print out the device's network status:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  Udp.begin(port);
}

void loop() {

  int reading = digitalRead(buttonPin);
  // Uncomment for debugging
  // If the switch changed, due to noise or pressing:
  // const String readline = "Reading: "+ String(reading)+ " Last: "+ String(lastButtonState);
  // Serial.println(readline);

 if (reading != lastButtonState) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    // whatever the reading is at, it's been there for longer than the debounce
    // delay, so take it as the actual current state:
    // if the button state has changed:
    if (reading != buttonState) {
      buttonState = reading;

      // only toggle the LED if the new button state is Pressed
      if (buttonState == LOW) {
        Serial.println("Sending packet.");
        String now = String(millis() / 10000);
        // start a new packet:
        Udp.beginPacket(serverAddress, port);
        Udp.println(now + "from button press");    // add payload to it
        Udp.endPacket();     // finish and send packet
        Serial.println(now);
        
      }
    }
  }

  lastButtonState = reading;
}