const gpio = require("rpi-gpio")

// rpi-gpio uses pin numbering
const ledPin = 5; // GPIO3
const buttonPin = 3; // GPIO2

let isOn = false;

/*
  takes isOn as argument
*/
const writeLed = (isOn, err) => {
  if (err) throw err;

  // write() takes as argument pin number, boolean, and callback function
  gpio.write(ledPin, isOn, function (err) {   // Writes isOn to ledPin
    if (err) throw err;
    console.log(`Pin ${ledPin} is`, isOn);
  });
}

// setup gpio pins for use
gpio.setup(ledPin, gpio.DIR_OUT, false)
gpio.setup(buttonPin, gpio.DIR_IN, gpio.EDGE_BOTH)

// event handler for gpio changes
gpio.on("change", (channel, value) => {
  console.log(`Channel ${channel} is`, value)
  if (buttonPin && value === true) isOn = !isOn;
  writeLed(isOn)
})
