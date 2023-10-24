const gpio = require('rpi-gpio');

try {
  // Set the pin numbers
  const PIN_TRIGGER = 7;
  const PIN_ECHO = 11;

  gpio.setup(PIN_TRIGGER, gpio.DIR_OUT, () => {
    gpio.write(PIN_TRIGGER, false, (err) => {
      if (err) {
        console.error("Error setting up trigger pin:", err);
        return;
      }
      
      gpio.setup(PIN_ECHO, gpio.DIR_IN, () => {
        console.log("Waiting for sensor to settle");
        setTimeout(() => {
          console.log("Calculating distance");
          gpio.write(PIN_TRIGGER, true, () => {
            setTimeout(() => {
              gpio.write(PIN_TRIGGER, false);
            }, 10);
          });

          let pulse_start_time = 0;
          let pulse_end_time = 0;

          gpio.on('change', (channel, value) => {
            if (channel === PIN_ECHO) {
              if (value === true) {
                pulse_start_time = Date.now();
                console.log("pulse_start_time");
              } else {
                pulse_end_time = Date.now();
                const pulse_duration = pulse_end_time - pulse_start_time;
                const distance = Math.round(pulse_duration / 58.82, 2);
                console.log("Distance:", distance, "cm");
                gpio.destroy(() => {
                  console.log("GPIO pins cleaned up.");
                });
              }
            }
          });
        }, 2000);
      });
    });
  });
} catch (error) {
  console.error("Error:", error.toString());
}
