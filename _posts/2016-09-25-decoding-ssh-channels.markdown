---
layout: post
title: Decoding ssh channel information
summary: Here's what the output of the ~# escape code means in ssh, since it doesn't seem to be in the man page.
---
If you're using ssh and hit the escape sequence `~#` then it'll tell you about the channels it has open. It looks like this:

```
The following connections are open:
  #0 client-session (t4 r0 i0/0 o0/0 fd 7/8 cc -1)
```

In this case I have just the main ssh connection open. If you're using ssh's port forwarding (and have active connections through it) you'll get more output, like this:

```
The following connections are open:
  #0 client-session (t4 r0 i0/0 o0/0 fd 6/7 cc -1)
  #3 direct-tcpip: listening port 8080 for localhost port 8080, connect from ::1 port 64126 to ::1 port 8080 (t4 r2 i0/0 o0/0 fd 12/12 cc -1)
```

But what does that actually mean? The ssh man page doesn't seem to be much help, so I went digging.

Here's the code in [channel.c](http://cvsweb.openbsd.org/cgi-bin/cvsweb/src/usr.bin/ssh/channel.c) which outputs the line:

```c
snprintf(buf, sizeof buf,
    "  #%d %.300s (t%d r%d i%u/%d o%u/%d fd %d/%d cc %d)\r\n",
    c->self, c->remote_name,
    c->type, c->remote_id,
    c->istate, buffer_len(&c->input),
    c->ostate, buffer_len(&c->output),
    c->rfd, c->wfd, c->ctl_chan);
```

The meanings of these fields are included in [channel.h](http://cvsweb.openbsd.org/cgi-bin/cvsweb/src/usr.bin/ssh/channel.h) which defines the Channel struct (edited for just the fields above):

```c
struct Channel {
    int     type;       /* channel type/state */
    int     self;       /* my own channel identifier */
    int     remote_id;  /* channel identifier for remote peer */

    u_int   istate;     /* input from channel (state of receive half) */
    u_int   ostate;     /* output to channel  (state of transmit half) */

    int     rfd;        /* read fd */
    int     wfd;        /* write fd */
    int     ctl_chan;   /* control channel (multiplexed connections) */

    Buffer  input;      /* data read from socket, to be sent over
                         * encrypted connection */
    Buffer  output;     /* data received over encrypted connection for
                         * send on socket */
...
```

So the first value is the local channel ID, followed by the name of the channel, which tends to be a description of what it's for. Forwarding sets this in `port_open_helper` using the self-explanatory format seen above.

Then in parentheses, the `t` value is the channel type, the `r` is the remote end's channel ID. 

The `i` and `o` values are the state/buffer size for the input and output queues. 

The two values after `fd` are the read and write file descriptor numbers, and finally the `cc` number is the control channel.

The *channel type* is one of these constants:

```c
/* Definitions for channel types. */
#define SSH_CHANNEL_X11_LISTENER    1   /* Listening for inet X11 conn. */
#define SSH_CHANNEL_PORT_LISTENER   2   /* Listening on a port. */
#define SSH_CHANNEL_OPENING         3   /* waiting for confirmation */
#define SSH_CHANNEL_OPEN            4   /* normal open two-way channel */
#define SSH_CHANNEL_CLOSED          5   /* waiting for close confirmation */
#define SSH_CHANNEL_AUTH_SOCKET     6   /* authentication socket */
#define SSH_CHANNEL_X11_OPEN        7   /* reading first X11 packet */
#define SSH_CHANNEL_INPUT_DRAINING  8   /* sending remaining data to conn */
#define SSH_CHANNEL_OUTPUT_DRAINING 9   /* sending remaining data to app */
#define SSH_CHANNEL_LARVAL          10  /* larval session */
#define SSH_CHANNEL_RPORT_LISTENER  11  /* Listening to a R-style port  */
#define SSH_CHANNEL_CONNECTING      12
#define SSH_CHANNEL_DYNAMIC         13
#define SSH_CHANNEL_ZOMBIE          14  /* Almost dead. */
#define SSH_CHANNEL_MUX_LISTENER    15  /* Listener for mux conn. */
#define SSH_CHANNEL_MUX_CLIENT      16  /* Conn. to mux slave */
#define SSH_CHANNEL_ABANDONED       17  /* Abandoned session, eg mux */
#define SSH_CHANNEL_UNIX_LISTENER   18  /* Listening on a domain socket. */
#define SSH_CHANNEL_RUNIX_LISTENER  19  /* Listening to a R-style domain socket. */
```

The *input and output state* values can be decoded with the constants further down the file:

```c
/* possible input states */
#define CHAN_INPUT_OPEN             0
#define CHAN_INPUT_WAIT_DRAIN       1
#define CHAN_INPUT_WAIT_OCLOSE      2
#define CHAN_INPUT_CLOSED           3

/* possible output states */
#define CHAN_OUTPUT_OPEN            0
#define CHAN_OUTPUT_WAIT_DRAIN      1
#define CHAN_OUTPUT_WAIT_IEOF       2
#define CHAN_OUTPUT_CLOSED          3
```

The *control channel* is statically set to -1, presumably set to other values if you're using multiplexing.

Most of these values are of passing interest, it turns out -- most of the time the information I need is in the 2nd field.
