---
layout: post
title: Controlling LaMetric TIME over HTTP
summary: Adding a missing feature to LaMetric TIME
---
[LaMetric TIME](https://lametric.com/en-US/time/overview) is a connected clock which uses a dot-matrix style display. I use it as my alarm clock, as one of its features is that it uses [NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol) to set itself. My old alarm clock used the [Time from NPL](https://en.wikipedia.org/wiki/Time_from_NPL_(MSF)) (neé Rugby Clock) radio signal and had trouble reliably receving it. Also, I couldn't talk HTTP to it.

One of the other features of the TIME is that you can add other apps to it (and indeed [write your own](https://github.com/jamesoff/lametric-darksky)). You then scroll through the apps using buttons on the device, or the iPhone app. You can also configure it to rotate automatically between them, and switch to certain ones at a particular time of day. This last feature seemed like something I wanted, so that it could show me the time when I wake up, the forecast during the day, the time again when I would be going to bed, and finally blank around the time I'd actually go to sleep (I like a dark room).

Unfortunately, when set to this last mode, you are prevented from changing the display manually. What I wanted was for it to change to a predefined display at a certain time, but let me control it directly still. Fortunately, it has an [API](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html)!

## Requirements

* You'll need to have registered on the LaMetric [Developer site](https://developer.lametric.com/).
* Fetch your device API key from the Developer site. Go to the "My devices" page once logged in. It's a long hex string.
* You need somewhere to run the script/commands from which can reach your clock over the network (I run it on a Raspberry Pi).
* Install [httpie](https://httpie.org) (or adapt the script to use `curl`)

## Get your apps/widgets list

First you'll need to know what identifiers to use for your apps when you're trying to select them with the script.

Begin by exporting your API token to a variable so that you can easily reuse it in later commands. Your shell may also allow you to omit commands from history by starting them with a space, so that your token isn't stored. On zsh, you need the `histignorespace` option set for this to work.

```shell
export TOKEN=123456789012345678901234567890abc
```

You will also need to know the IP of your clock. You can find this in the app under Settings > Wifi.

Now we can call the API on the device to find out what the apps and widgets are called. The device listens with HTTPS on port 4343, and the certificate is self-signed so we need to skip verification. The authentication in use is Basic, with username `dev`, so we can just pass that to httpie and let it handle all the base64 encoding and so on.

```
% http --auth dev:$TOKEN --verify no https://192.168.3.31:4343/api/v2/device/apps
```

```json
{
    "com.lametric.4cd400f1e4aaf750bd7763d0dc1e7324": {
        "package": "com.lametric.4cd400f1e4aaf750bd7763d0dc1e7324",
        "title": "Dark",
        "triggers": {},
        "vendor": "Enrico",
        "version": "1-2",
        "version_code": "1",
        "widgets": {
            "8baa315cc53245859d58da5a9e91b9df": {
                "index": -1,
                "package": "com.lametric.4cd400f1e4aaf750bd7763d0dc1e7324"
            }
        }
    },
    "com.lametric.clock": {
        "actions": {
            "clock.alarm": {
                "enabled": {
                    "data_type": "bool",
                    "name": "enabled",
                    "required": false
                },
...
```

The components you need are the package name, which for the clock is just `com.lametric.clock` but for other apps may include a unique identifier. You also need tje identifier under `widgets`. You then assemble them like so:

```
$PACKAGE/widgets/$WIDGET
```

For example, the "Dark" app above would be `com.lametric.4cd400f1e4aaf750bd7763d0dc1e7324/widgets/8baa315cc53245859d58da5a9e91b9df`.

## Write the script for cron

Once you have your list of widget identifiers for the things you want your script to be able to show, it's time to write the script itself. Mine looks like this:

```shell
#!/usr/bin/env bash

# Ensure that http is in my PATH when run from cron
export PATH=/home/james/.local/bin:$PATH

CLOCK="com.lametric.clock/widgets/08b8eac21074f8f7e5a29f2855ba8060"
WEATHER="com.lametric.f6825f2ea71f986dc9a9002de5e4188d/widgets/16aa4984257b4dea8ed8ee88b4565fe7"
DARK="com.lametric.4cd400f1e4aaf750bd7763d0dc1e7324/widgets/8baa315cc53245859d58da5a9e91b9df"
KEY="123456789012345678901234567890abc"
IP="192.168.3.31"

if [[ $1 == clock ]]; then
    WIDGET=$CLOCK
elif [[ $1 == weather ]]; then
    WIDGET=$WEATHER
elif [[ $1 == dark ]]; then
    WIDGET=$DARK
else
    exit 1
fi

http \
    --auth dev:$KEY \
    --verify no \
    PUT \
    https://$IP:4343/api/v2/device/apps/$WIDGET/activate >$HOME/tmp/lametric.log
```

You will need to add/modify the widget variables to match your requirements. Fill in the `KEY` and `IP` accordingly too, and update the `if/elif` block. This could probably be better done using an associative array and a lookup, but I didn't write this to be extensible originally ;)

Note that the script as above outputs debug info to a log file in `~/tmp` so you may need to adjust that or create the directory as you require.

Make the script executable, and then test it. Hopefully you should be able to make your clock change display by running the script with a different parameter.

Finally you can pop some lines into your `crontab` to make it happen automatically:

```
0 7 * * * /home/james/src/lametric-cron/lametric.sh clock
```
