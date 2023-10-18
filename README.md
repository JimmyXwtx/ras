# Raspberry Pi Workshop

This repository is for a Raspberry Pi workshop to control an LED via GPIO pins as well as through HTTP, TCP, and UDP.

## Setup
* Please setup your Raspberry Pi via the [Raspberry Pi Imager](https://www.raspberrypi.com/software/). 
* Install node.js using [nvm](https://github.com/nvm-sh/nvm)
* Install `git`
* Clone repository to Raspberry Pi
* Install modules with `npm install`

### Circuit
Connect an LED and switch to the Raspberry Pi with the following circuit:  

![Circuit diagram](docs/circuit.png)

## Run
* Run `node button` to control LED via switch
* Run `node tcpServer` to start TCP server and control LED by connecting via TCP
* Run `node udpServer` to start UDP server and control LED by sending UDP packet
* run `node webApp` to start express server and control LED witha web browser:
  * [http://raspberrypihost/on](http://raspberrypi/on) will turn on LED
  * [http://raspberrypihost/off](http://raspberrypi/off) will turn off LED
  * [http://raspberrypihost/](http://raspberrypi/) will toggle LED