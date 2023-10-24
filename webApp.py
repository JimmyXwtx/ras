import RPi.GPIO as GPIO
from flask import Flask
from flask import Flask

app = Flask(__name__)

# Define your routes and application logic below
# ...

if __name__ == "__main__":
    app.run()

# GPIO Pin configuration
ledPin = 5
buttonPin = 3

GPIO.setmode(GPIO.BCM)
GPIO.setup(ledPin, GPIO.OUT)
GPIO.setup(buttonPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

isOn = False

def write_led(is_on):
    GPIO.output(ledPin, is_on)
    print(f"Pin {ledPin} is {'On' if is_on else 'Off'}")

# Setup GPIO event for button press
GPIO.add_event_detect(buttonPin, GPIO.BOTH, callback=write_led, bouncetime=200)

@app.route("/")
def toggle_led():
    global isOn
    isOn = not isOn
    write_led(isOn)
    return f"LED is {'On' if isOn else 'Off'}"

@app.route("/on")
def turn_led_on():
    write_led(True)
    return "LED on"

@app.route("/off")
def turn_led_off():
    write_led(False)
    return "LED off"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)

# Don't forget to clean up GPIO on exit
def cleanup():
    GPIO.cleanup()

import atexit
atexit.register(cleanup)
