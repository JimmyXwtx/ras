# Raspberry Pi Workshop

This repository is for a Raspberry Pi workshop to control an LED via GPIO pins as well as through HTTP, TCP, and UDP. The GPIO programming is done with node.js using the [`rpi-gpio` library](https://github.com/JamesBarwell/rpi-gpio.js).

Additional instructions for [setting up a Raspberry Pi](https://itp.nyu.edu/networks/setting-up-a-raspberry-pi). 

## Setup
* Please setup your Raspberry Pi via the [Raspberry Pi Imager](https://www.raspberrypi.com/software/). 
* Install node.js using [nvm](https://github.com/nvm-sh/nvm): `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
* Install `git`: `sudo apt update && sudo apt upgrade -y && sudo apt install git`
* Clone repository to Raspberry Pi
* Install modules with `npm install`

### Circuit
Connect an LED and switch to the Raspberry Pi with the following circuit:  

![Circuit diagram](docs/circuit.png)

## Run
* Run `node button` to control LED via switch
* Run `node tcpServer` to start TCP server and control LED by connecting via TCP  
* Run `node udpServer` to start UDP server and control LED by sending UDP packet
* Run `node webApp` to start express server and control LED with a web browser:
  * [http://raspberrypihost:8000/on](http://raspberrypi:8000/on) will turn on LED
  * [http://raspberrypihost:8000/off](http://raspberrypi:8000/off) will turn off LED
  * [http://raspberrypihost:8000/](http://raspberrypi:8000/) will toggle LED
* Run `node p5Server` to start server and visit [http://rapsberrypihost:8000](http://raspberrypi:8000) to control LED via a p5 server

### Arduino Client
A simple Arduino client is found [here](client/). 

### WPA_SUPPLICANT
Configure multiple wireless networks. [Details](https://raspberrypi.stackexchange.com/questions/11631/how-to-setup-multiple-wifi-networks)

1. Edit `/etc/wpa_supplicant`
2. Add:  
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="SCHOOLS NETWORK NAME"
    psk="SCHOOLS PASSWORD"
    id_str="school"
    priority=1 
}

network={
    ssid="HOME NETWORK NAME"
    psk="HOME PASSWORD"
    id_str="home"
    priority=2
}
```
Note: If multiple wireless networks are found it will go down the priority list

Follow [instructions](https://itp.nyu.edu/networks/setting-up-a-raspberry-pi) for instructions about setting up wpa-enterprise. # ras
# ras
