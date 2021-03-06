---
layout: post
title: Using tcltest with bMotion
summary: Using tcltest for automated builds with Travis to verify bMotion's code
---
For a while now I've wanted to have automated tests for [bMotion](http://www.bmotion.net). It doesn't help that there seems to be no useful linting for TCL, so it's hard to catch things like mismatched brackets in the editor. TCL itself makes tracking down problems difficult too (maybe it's just TCL inside eggdrop) as it doesn't give the location of a failed script, but instead just reports the initial function which was invoked (i.e. the event handler).

For a long time now, bMotion has provided its own `rehash` command (to be used instead of eggdrop's `.rehash`) which does something broadly like this:

```tcl
catch {
  source "bMotion.tcl"
} msg

if {$msg != ""} {
  putlog "nope"
  return 0
}
rehash
```

However, this only guards against code broken enough to kill the bot when you rehash it. Luckily, broken code later on doesn't tend to kill the bot but does of course mean that bMotion won't work right.

I've been pondering getting Travis to do some kind of automated tests against an eggdrop install, but that has a few issues:

1. The test run would need to install and configure eggdrop
1. ... and an ircd for it to connect to
1. And then connect a client to it
1. ... and that client would have to have some way to script test messages into a channel and validate the responses
1. Also bMotion's output isn't quite deterministic enough for that to work - aside from the fact that each trigger can pick from a number of outputs, make typos and transform them with prefixes and postfixes

I then considered using eggdrop just as a test harness and writing a unit testing script which would run alongside bMotion inside that. Again, this presented some problems around getting sensible output from that process for testing.

## Using tcltest

The next iteration of my thinking was that the reason I needed to run bMotion inside eggdrop was because bMotion uses some eggdrop-specific functions it provides, so maybe I could just write a shim which provided a minimally functional eggdrop-like interface so bMotion would execute. This could then run in a test harness which would call bMotion's functions and verify the return values. A quick Google later revealed the existence of the [tcltest](http://www.tcl.tk/man/tcl8.5/TclCmd/tcltest.htm) package which "provides several utility commands useful in the construction of test suites for code instrumented to be run by evaluation of Tcl commands."

The recommended way to use tcltest is to create `.test` files which the framework will run as the test cycle. Each test file can either be run using the main TCL interpreter, or in a separate one. One gotcha is that if using separate interpreters, the results from a test file will not be passed up to the main test loop if you do not call `tcltest::cleanupTests` at the end. If you don't, the run/passed/failed/skipped counts at the end of the test run will not include the numbers from that file. If you run the tests in the main interpreter, this step is not required.

I opted to run the tests in individual interpreters so that the state of the environment is reset for each set of tests.

My main test TCL file looks like this:

```tcl
package require tcltest
namespace import ::tcltest::*

::tcltest::configure -testdir tests

runAllTests
```

This loads the tcltest package and brings it into the top-level namespace (more a convenience that a requirement I feel, but I was being a good copy/paste dev and following the examples I was finding). It then configures tcltest to look in the `tests` dir for the test files. This is not strictly required, as by default it looks in the current directory and recurses down looking for `*.test` files, but it limits the scope to make sure that it doesn't accidentally pick up things it shouldn't in the future.

It then calls the method to run all the tests, which does so and outputs the results. You can also use `::tcltest::configure` to change the debug level, or what information is printed, which I found useful when trying to figure out why things weren't working right.

Then, my `.test` files start like this:

```tcl
# vim: ft=tcl
source "tests/eggdrop-shim.tcl"

set botnick "NoTopic"
set bMotionRoot "."

source "bMotion.tcl"

package require tcltest
namespace import ::tcltest::*

eval ::tcltest::configure $argv
```

First, I tell vim that this is a TCL file, as the file extension doesn't do that for me. Next, I load my eggdrop shim file which lets bMotion run outside of a bot. (Details on that later.) I then set two global variables needed for bMotion to load, and then load it. This initialises the script the same as loading it in the eggdrop config file, so when the `source` statement returns, it's ready to be used (abstracts and plugins loaded, etc). Then there's some boilerplate to load the tcltest package into this interpreter and configure it from the parent.

Now tests can actually appear in the file, and the basic syntax is:

```tcl
test test_name-number description -body {
  # statements to run
} -result "expected result"
```

There are more parameters such as setup and clean up steps which can be given, although I haven't needed them yet. Here's an example test statement which verifies that after bMotion has started, the output queue has length 0:

```tcl
test empty_queue-1 "queue should start empty" -body {
  bMotion_queue_size
} -result 0
```

Since bMotion is loaded into our interpreter, the only way it can do stuff is if we call it, which means there's no danger of it deciding to put output in the queue by itself.

The test file then needs to end with a call to `cleanupTests` as mentioned above.

We can now run our tests with tclsh:

```
% tclsh tests/run-tests.tcl
Tests running in interp:  /usr/bin/tclsh
Tests located in:  /Users/james/src/bmotion/tests
Tests running in:  /Users/james/src/bmotion
Temporary files stored in /Users/james/src/bmotion
Test files run in separate interpreters
Running tests that match:  *
Skipping test files that match:  l.*.test
Only running test files that match:  *.test
Tests began at Sun Nov 20 20:26:41 GMT 2016
queue.test
eggdrop shim loading

[bMotion startup output skipped]

[LOG] bMotion 0.1.0+svn AI online :D
[LOG] (d) (d)bMotion: Freezing output queue
[LOG] (d) (d)bMotion: Thawing output queue

Tests ended at Sun Nov 20 20:26:43 GMT 2016
run-tests.tcl:  Total   9       Passed  9       Skipped 0       Failed  0
Sourced 1 Test Files.
```

Hooray!

## Running the tests with Travis

Let's get Travis to run those tests, so we'll make `.travis.yml` look something like this:

```yaml
addons:
  apt:
    packages:
    - tcl-dev
script: tests/run-tests.sh
```

The script copies the sample settings file into place so bMotion can load, then runs the `run-tests.tcl` file. This seems fine until we decide to verify that a failing test breaks the build, and it doesn't.

It turns out that tcltest doesn't set an exit code or any kind of return value based on if the tests all passed or not.

Some web searching turned up a [thread on comp.lang.tcl](https://groups.google.com/forum/#!topic/comp.lang.tcl/mAaGxQ1Die8) where the tcltest author suggests using some hooks to read the number of successful/failed tests from the package after they've completed, and setting the exit code yourself based on that. However, I couldn't make that work.

Instead, I created a wrapper script which (as well as ensuring the copy of bMotion under test is configured enough) saves a copy of the tcltest output and greps it for lines indicating tests failed. If so, it exits 1 so that the build fails:

```sh
#!/usr/bin/env bash

set -ex

logfile=tests/output.txt

rm -f "$logfile"

# check if we need to copy the sample config file over
mkdir -p local
[ -f local/settings.tcl ] || cp modules/settings.sample.tcl local/settings.tcl

# tcltest doesn't know how to do exit codes, sigh
tclsh tests/run-tests.tcl | tee "$logfile"

grep -qF 'Files with failing tests' "$logfile" && exit 1
grep -qF 'Test files exiting with errors' "$logfile" && exit 1

# consume grep's error if the were no matches
exit 0
```

This script is wired up as the `script` field in the Travis configuration file, and now when pushing to Github Travis will spring into life and run the tests:

{% image big bmotion-tests.png alt="bMotion tests running on travis-ci.org" %}

## The eggdrop shim

This section is less about tcltest and more about how I made bMotion run outside of eggdrop.

bMotion uses a number of eggdrop-provided TCL functions - not least of all those related to receiving events from IRC and sending text back that way. However, there's also things like user management (so bMotion can store your IRL names), timers, rand (eggdrop provides a wrapped version of TCL's own) and others. Running bMotion outside of eggdrop in tclsh results very quickly in it failing as it tries to call an eggdrop function.

In order to allow the test environment to run the script, I created a TCL script with stub functions so that bMotion can work. This also means that I can do some behind-the-scenes checking or changes, so the test environment can validate that e.g. bMotion created times or binds (to events) it should have, or the return values from eggdrop functions can be loaded in order to test certain code paths.

Most of the shim functions just, currently, output text saying they were called. Those which write eggdrop log messages, or send output to IRC, display that text labelled as such.

The shim file is sourced by each test file, before it sources bMotion's main file. I also created a script with some interactive helper functions which sources the shim and bMotion, which can be used in tclsh for interactively testing bMotion. Using it looks a bit like this:

```
~/s/bmotion % tclsh
% source tests/bMotion-test.tcl
eggdrop shim loading
[SHIM] setudef
[LOG] (d) bMotion: bMotion_testing is not defined, setting to 0.
[LOG] bMotion 0.1.0+svn starting up...
[LOG] (d) (d)bMotion: loaded settings from modules directory
[LOG] bMotion: loaded settings from the following files: ./modules/settings.tcl
[SHIM] bind join - *!*@* bMotion_event_onjoin
[SHIM] bind mode - * bMotion_event_mode
[SHIM] bind pubm - * bMotion_event_main
[SHIM] bind sign - * bMotion_event_onquit
[SHIM] bind nick - * bMotion_event_nick
[SHIM] bind part - * bMotion_event_onpart
[SHIM] bind ctcp - ACTION bMotion_event_action
[SHIM] bind pub - !mood pubm_moodhandler
[SHIM] bind pub - !bminfo bMotionInfo
[SHIM] bind pub - !bmstats bMotionStats
[SHIM] bind msg - bmotion msg_bmotioncommand
[SHIM] bind pub - !bmadmin bMotionAdminHandler
[SHIM] bind pub - !bmotion bMotionAdminHandler2
[SHIM] bind pub - .bmotion bMotionAdminHandler2
[SHIM] bind dcc m mood moodhandler
[SHIM] bind dcc m bmotion* bMotion_dcc_command
[SHIM] bind dcc m bmadmin* bMotion_dcc_command
[SHIM] bind dcc m bmhelp bMotion_dcc_help
[SHIM] bind time - {* * * * *} bMotion_check_tired2
[SHIM] channel method get
[SHIM] channel method get
[LOG] (d) (d)bMotion: sleepy: next state change at 1480030860 = Thu Nov 24 23:41:00 GMT 2016
[LOG] (d) (d)bMotion:  system module loaded
[SHIM] bind time - {* * * * *} bMotion_abstract_auto_gc
[LOG] (d) (d)bMotion: loading system abstracts for lang en
[LOG] (d) (d)bMotion: abstract generic_greeting reduced by 1 items with filter %%!% %VAR{food}
[LOG] (d) (d)bMotion: abstract answerDoyous reduced by 1 items with filter %ruser
[LOG] (d) (d)bMotion: Abstract sillyVerbs has too many elements (632 > 600), tidying up
[SHIM] rand

(snipped a lot of output)

[LOG] (d) (d)bMotion: Running a level 5 self-diagnostic...
[LOG] bMotion: diagnostics indicate you haven't loaded the userinfo TCL script
[LOG]          this is not required, but is strongly recommended
[LOG] (d) (d)bMotion: running level 3 diagnostic on binds
[SHIM] timer: 10 driftmood
[SHIM] rand
[SHIM] timer: 25 doRandomStuff
[SHIM] rand
[SHIM] utimer: 1743 bMotion_interbot_next_elect
[SHIM] timer: 10 bMotion_mood_drift_timer
[LOG] (d) (d)bMotion: running level 4 diagnostic on utimers
[SHIM] utimers
[LOG] (d) (d)bMotion: running level 4 diagnostic on timers
[SHIM] timers
[LOG] bMotion 0.1.0+svn AI online :D
[LOG] bMotion is Copyright (C) 2001-2012 James Seward. bMotion comes with ABSOLUTELY NO WARRANTY;
[LOG] This is free software, and you are welcome to redistribute it under certain conditions.
[LOG] See the COPYRIGHT file for details. See bMotion.tcl to hide this message once you have read it.
===== bMotion test environment
      q: run event queue
      e <text>: inject channel event

% e "notopic: test"
[SHIM] matchattr
[SHIM] matchattr
[SHIM] channel method get
[SHIM] matchattr
[SHIM] rand
[SHIM] rand
[SHIM] rand
[SHIM] validuser
[SHIM] rand
[SHIM] validuser
[SHIM] rand
[SHIM] validuser
[SHIM] rand
[SHIM] channel method get

(snip)

[SHIM] chandname2name
% q
{1 #bmotion Howdy.}
% q
[HELP] PRIVMSG #bmotion :Howdy.
% q
%
```

The `e` command sends an event to bMotion as though the text had come from IRC, which bMotion responds to by sending some text to the queue. The `q` command then runs the queue (usually this happens once every second so or with a timer in eggdrop). The first time, there is no output as the queued message is marked as being delayed by 2s. The output from the first time is the queue item showing it has 1s left, and will send `Howdy.` to #bmotion. The 2nd call then outputs the text to IRC. The `[HELP]` indicates that the text is sent to eggdrop's "help" IRC output queue, which is its lowest-priority one.

Now all I need to do is write some more tests! There's also a mechanism in tcltest which can capture output and validate it, which I need to look in to.
