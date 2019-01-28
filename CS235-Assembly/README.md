## IOT Smart irrigation system
In CS235-Assembly language course, we built an IoT enabled smart irrigation system for watering plants and crops. 

It used the ESP-8266 Node MCU microprocessor (with in-built Wi-Fi), which was connected to a mini-waterpump via a magnetic relay.

Various sensors e.g. temperature sensor, humidity sensor etc. were embedded in the soil to monitor the health of the plant. 

As soon as the readings fell below a certain threshold, the microprocessor sent high voltage signals through the relay to turn the pump on
for a certain time period.

The readings and pump could also be controlled via an off-the-shelf web app or mobile app. The code to interface all these things was written in C using the Arduino IDE.

> File irrigator.ino contains the code

