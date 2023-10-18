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

const net = require("net")

const port = 8000;

const server = new net.Server();

server.listen(port, () => console.log("Server listening on port ", port));

server.on("connection", (socket) => {
  console.log("A new connection has been established.");
  socket.write("Hello, client");

  socket.on("data", (chunk) => {

    console.log(
      `Data received from ${socket.localAddress}, ${socket.remoteAddress}:`,
      chunk.toString(),
      `\nF`
    )
    // WRITE LED
    isOn = !isOn
    writeLed(isOn)
  });

  socket.on("end", () => console.log("closing connection"));
  server.on("error", (err) => console.log(`Error: ${{ err }}`));
});



