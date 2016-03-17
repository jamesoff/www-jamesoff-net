---
layout: post
title: Audio from Plex on PS3
summary: Fixing an audio problem with the Plex app on PlayStation 3.
---
A few months ago, I was pleased to discover the existence of a native [Plex](https://plex.tv) app for PlayStation 3, as I hadn't had much luck with its reliability on Chromecast or Apple TV. Both these platforms require you to use the companion app on e.g. an iPad and tell it to stream to the device, and it seems to drop out with annoying frequency.

The PS3 native one has been much more reliable, but some files have had an odd problem with dialogue where it comes out of the front right channel, despite the fact that the rest of the audio sounds correct. The PS3 is connected to an Onkyo AV receiver by HDMI, and the receiver sees in the input as Multich(annel). No amount of changing the processing mode of the receiver helped, nor did adjusting the PS3's output format list.

Performing the following has fixed it for me:

* From the main view of the Plex app (after logging in), select the dropdown with your username top right, and select *Settings*
* In the Settings window, select *Audio*
* Enable *Dolby Digital (AC3)*

