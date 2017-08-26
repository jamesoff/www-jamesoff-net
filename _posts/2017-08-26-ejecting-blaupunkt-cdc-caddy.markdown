---
layout: post
title: Powering up a Blaupunkt CDC-A05
summary: How to power up a Blaupunkt CDC A05 CD changer when it's not in the car so you can get your CDs out
---

Recently I swapped an old broken Blaupunkt "Frankfurt RCM 104" headunit and its accompanying boot-installed CD changer out for a newer headunit which a) worked and b) supported Bluetooth. After all the work was complete I realised that the CD changer still had the caddy in, with a bunch of CDs. Since I plan on eBaying the hardware I thought I'd better get them out. Of course, with no power, and no apparent manual physical eject (and no desire to put it all back in the car), I was a bit stuck.

Luckily, some Googling turned up a document describing how to install one of these [in a Citroen Xantia](http://www.citroenkerho.fi/xantia/pdf/ohjeet/CD%20Changer.pdf) which helpfully listed the pinout of the 13-pin DIN used by the CD changer's connection to the headunit.

The answer was that pin 2 is GND and pins 3 and 4 are switched/permanent live 12V. If you look at the socket on the device, pins 1 to 4 are the row nearest the notch. With the notch at the top, as viewed on the device when it's the right way up, pin 1 is the rightmost one and 4 is the leftmost one. While they weren't numbered on my CD changer, I had the wiring loom(s) from the back of the headunit and the 13 pin DIN breakout from that was numbered. I used this along with the pinout for the headunit connector to verify I had the right ones with a multimeter.

The final step, then, was to jam some wires in the pins (I used some spare speaker wire), hook it up to a bench supply at 12V, and power it up. Powering just the permanent or switched live by themselves made the changer make a clunk or two and didn't release any magic smoke, but it also didn't release my CDs. I had to power both together, and then the eject button worked.

{% image half power-cdc/IMG_4467.JPG alt="Blaupunkt CDC-A05 connected to bench supply" %}

{% image half power-cdc/IMG_4468.JPG alt="Blaupunkt CDC-A05 pins connected to power" %}

