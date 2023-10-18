// CONTENTS FROM button.js  START //
const gpio = require("rpi-gpio")

const ledPin = 5;
const buttonPin = 3;

let isOn = false;

const writeLed = (isOn, err) => {
  if (err) throw err;
  gpio.write(ledPin, isOn, function (err) {
    if (err) throw err;
    console.log(`Pin ${ledPin} is`, isOn);
  });
}


gpio.setup(ledPin, gpio.DIR_OUT, false)
gpio.setup(buttonPin, gpio.DIR_IN, gpio.EDGE_BOTH)

gpio.on("change", (channel, value) => {
  console.log(`Channel ${channel} is`, value)
  if (buttonPin && value === true) isOn = !isOn;
  writeLed(isOn)
})
// CONTENTS FROM button.js END //

const datagram = require("dgram");
const socket = datagram.createSocket("udp4");
const PORT = 8000;

socket.on("message", (msg, recvInfo) => {
  console.log(`${msg} from ${recvInfo.address}:${recvInfo.port}`);
  // Write LED
  isOn = !isOn
  writeLed(isOn)
});

socket.on("close", () => console.log("Server closed"));

socket.bind(PORT, () => console.log("Server running on port", PORT));
