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

const express = require("express")
const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  isOn = !isOn
  writeLed(isOn)
  res.send(`LED is ${isOn}`)
})


app.get("/on", (req, res) => {
  writeLed(true)
  res.send("LED on")
})

app.get("/off", (req, res) => {
  writeLed(false)
  res.send("Led off")
})


app.listen(PORT, () => {
  console.log("Server started on port", PORT)
})