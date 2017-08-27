---
layout: post
title: My tmux configuration
summary: Nothing more interesting than reading about more than other people's config files, right?
---
`tmux` [is a terminal multiplexer](https://github.com/tmux/tmux/wiki). If
you're familiar with `screen`, you'll have an idea what tmux can do. This is
not a tutorial for how to use tmux as there are already plenty of those. It's a
description of how I use tmux in case that's of any use to anyone else.

I also don't include or link to my `tmux.conf` verbatim, as I'm not a fan of
canned configurations. I think it's much more productive to understand the
configuration of the tool yourself, and create a configuration that's exactly
what you need. Borrowing snippets are fine, but you should understand what
you're pasting in.

## Some history

You can [skip this section](#my-tmux-workflow) if you don't care. It's about how I ended up using
tmux the way I do.

Some years ago, the only thing I used either program for was running [my IRC
client](https://irssi.org) detached from the terminal, and maybe having another
shell open on the same host without having to start another connection. Then,
after changing jobs, I ended up sitting next to a guy who used screen all the
time on his local machine. This meant he had only one terminal window open
(usually fullscreen, I seem to remember) with many (what tmux calls) windows in
it. "Meh," I thought, "I'm doing that with tabs and split windows in my
[terminal](https://iterm2.com). But he was also doing stuff I'd never really
looked into with screen, like using it to scroll back though long output, and
copy/paste.

At the time I was using tmux, because screen had been doing this weird thing
where it would block the tty while detached, so my IRC client would time out,
and spring to life when I reattached to it. I configured tmux to use the same
prefix key ({% kbd ctrl a %}) and left it as that.

A little while later, I wanted to be able to ssh into my work laptop and share
a terminal session from it, and in realising tmux would allow me to do that -
multiple clients can connect to the same set of windows - I started using it in
the same way my coworker did, and everything ran inside tmux by default.

## My tmux workflow

In the examples below, {% kbd Prefix %} stands for {% kbd ctrl a %} because of
my configuration. By default, it's {% kbd ctrl b %}.  Since I also remap {% kbd
caps %} to {% kbd ctrl %} this prefix is super-easy to hit.

### Sessions

On local machines I tend to have three sessions running: one for a terminal
window, one for a fullscreen terminal window, and one connected to remotely. On
remote machines, I tend to just have one session. The three sessions are
usually named `local`, `fullscreen` and `remote`. I don't use any session
manager like [tmuxp](https://github.com/tony/tmuxp) or
[tmuxinator](https://github.com/tmuxinator/tmuxinator) as my sessions aren't
predictable. However, as described below one of the plugins I use saves my
session state periodically, although this is so that my session and all its
windows can be resumed after restarting the host (or maybe upgrading tmux).

#### Creating multiple shared sessions

The goal here is to have multiple sessions which all share the same set of windows.

Start by creating the first session:

```
% tmux new-session -s local
```

This will create a new session called `local`. (You can use whatever name you want.) You can make some windows with some content here if you want to prove that the subsequent sessions are sharing windows with this one.

In another terminal, make another session called `fullscreen` linked to this one:

```
% tmux new-session -s fullscreen -t local
```

This command creates a session called `fullscreen` which is in the group `local`. The way this works is that `-t` specifies a session group, which can be the name of an existing session. In this case, a group is created named after the target session. This is visible in the output of `list-sessions`:

```
% tmux list-sessions
fullscreen: 4 windows (created Wed Aug 16 20:30:22 2017) [204x66] (group local) (attached)
local: 4 windows (created Wed Aug 16 20:30:05 2017) [136x43] (group local) (attached)
```

If you specify something for `-t` which is neither an existing group name nor an existing session, it creates a new group with that name and puts your new session in it. I don't generally bother, so my group always ends up called `local`.

To attach one of these sessions (for example if you quit your terminal), use

```
% tmux attach-session -t session_name
```

Note that you can attach multiple clients to the same session, which results in
all of them sharing the same view. If you change windows on one client, all the
others attached to that session will show the same. Additionally, if one of the
clients is smaller than the others, the others will shrink their view to match
that one. To avoid this happening if you have a client running elsewhere which
is attached to the session you want, add the `-d` option to the
`attach-session` command to make it detach elsewhere.

If you want to rename a session, {% kbd Prefix $ %}. You can jump between
sessions in a client with {% kbd Prefix ( %} and {% kbd ) %}.

This is all different to creating a separate *server*, which you do using the
`-S` option to tmux. The result of using this to create different "sessions" is
that each will be fully independent, with its own windows. If you want to do
this instead of (or maybe as well as) the technique I'm describing, you can do
it by omitting the `-t` option when creating a new session. This has the
benefit of meaning all your sessions show up in one place (i.e. inside one
server).

### Windows

As above, my sessions aren't predictable, and I tend to just create windows
when I need a new shell to do something. If I'm working on something particular
for a while then I'll name the window {% kbd Prefix :%} `rename-window`.
Otherwise, windows are named automatically by my shell for the current
directory and running process. I also make use of the window list {% kbd Prefix
w %} and find window commands {% kbd Prefix f %}.

When you have multiple sessions sharing a group of windows, if two clients both
select the same window then tmux will shrink the window to the smallest
client's size. Bigger clients will see their extra space filled in with dots.
If the `aggressive-resize` option is enabled (which it is by the
`tmux-sensible` plugin, see below) then tmux will try to size the window up
when it can, which means that selecting a different window in the smaller
client will free up the larger client to resize the window to the full size.

{% image tmux/smaller-client.png alt="Screenshot of tmux showing a window constrained by a smaller client" %}

To move a window between session (groups), for example if it was created in the
wrong session group, you can bring it to your current session (group) with {%
kbd Prefix : %} `move-window -s source-session:0` where `0` is the window id.
This moves the window to the next free slot in the current session. You can
also use `link-window` to have the window show up in multiple sessions
simultaneously.

### Panes

I am a heavy user of panes (split windows) as I find them useful for things
such as having a terminal or two alongside files I'm editing, or documentation.
While my preferred editor ([neovim](https://neovim.io)) supports terminals in
windows, I find I get on better with separating my editor and shell into tmux
panes. I use a tmux/vim plugin which lets me use the same keystroke {% kbd alt
h %}, {% kbd j %}, {% kbd k %}, {% kbd l %} to navigate vim split windows and
tmux panes as though they were all part of a single unified layout.

Another pane feature I use a lot is zooming {% kbd Prefix z %}, which makes the
current pane temporarily use the whole window. (Its equivalent in iTerm2 is {%
kbd cmd shift return %}.)

## Status bar

Status bars seem to be something people feel very strongly about, so this
section is likely to be a YMMV thing. I like mine minimal but informative. The
items on my status bar are:

* session name (left aligned). This goes blue when I've pressed the {% kbd Prefix %}
* window list, where each item is the window number, flags, and title (by default, `process:cwd`) (left aligned). The current window is white-on-blue; the previous window is blue on black, and other windows are white on black. If there's been a bell in another window, it goes red. If it's been monitored for activity or idleness, and triggers, it goes green.
* system load, from my [tmux-loadavg plugin](https://github.com/jamesoff/tmux-loadavg) (right aligned). This changes from green to orange to red as the load increases.
* short hostname (right aligned)

{% image tmux/status-bar.png alt="A screenshot of tmux status bar" %}

The formatting and style is similar to that of
[powerline](https://github.com/powerline/powerline) and indeed I used powerline
for a while, but found a few issues with it:

* it's not very straightforward to customise (or at least, it didn't seem it)
* the pointy widgets separating each section are nice eye candy, but waste some characters which are better used for displaying useful information
* I had a lot of problems on OS X with it causing very high system load. This was not powerline's fault but more it, or tmux, exposing an issue in OS X/macOS - possibly related to notifyd. It was difficult to diagnose, but it had a measurable impact on my system; most notably it sucked so much CPU that the already-heavy Google Hangouts was basically unusable
* it seemed wasteful to have a whole daemon running just to render a line of text
* it's another thing to install and manage

To that end, I switched from using powerline to using static tmux configuration
which used the same style (minus the pointy characters). I dropped the
date/time widget as this isn't something worth wasting those characters on. I
have many other ways to find out the date, and if I want to find out the time
while using a fullscreen terminal (so I have no menu bar) then I use tmux's
clock display {% kbd Prefix t %}.

The load average widget was replaced by writing my own as a tmux plugin, and it
is a single bash script which uses an awk or two to help format text. I find
the hostname display useful despite the fact my shell displays it in the prompt
if I'm connected to a remote machine, as often the content of my tmux window is
a fullscreen editor.

## Plugins

I use the [tpm](https://github.com/tmux-plugins/tpm) plugin manager, with these plugins configured:

* [tmux-sensible](https://github.com/tmux-plugins/tmux-sensible): basic tmux settings everyone can agree on
* [tmux-pane-control](https://github.com/tmux-plugins/tmux-pain-control): standard pane key-bindings for tmux
* [tmux-yank](https://github.com/tmux-plugins/tmux-yank): integration with system clipboard
* [tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect) and [tmux-continuum](https://github.com/tmux-plugins/tmux-continuum): frequently saves the state of the tmux session and automatically restores it
* [tmux-loadavg](https://github.com/jamesoff/tmux-loadavg): my plugin to show the load average in the status bar

## Additional configuration

Some bits from my configuration which aren't described above.

### Binds

{% highlight tmux %}
set -g prefix C-a
unbind C-b
bind C-a send-prefix

bind " " next-window
bind C-" " next-window
bind C-d detach-client
{% endhighlight %}

This section switches {% kbd Prefix %} to {% kbd ctrl a %}, and adds a couple
of other `screen`isms because of my muscle memory.

{% highlight tmux %}
bind-key , command-prompt -I "#W" "rename-window '%%'"; setw allow-rename off
{% endhighlight %}

Normally {% kbd Prefix , %} prompts for a new window name, and this does the
same but then locks the window title from being overwritten with the
`process:cwd` name by the shell.

### Settings

{% highlight tmux %}
set -g status-interval 0
{% endhighlight %}

This may not be required any more, but was a workaround for the issue where
`notifyd` would cause high CPU usage with powerline. The status bar is still
updated as needed, and the only thing which this affects is the load average,
so I haven't bothered removing it yet.

{% highlight tmux %}
set -g status-left-length 12
{% endhighlight %}

By default, the maximum length for the leftmost block on the status bar, which
will contain the session name, is too short for the word `fullscreen` so this
fixes it.

## Supporting cast

### zsh

[zsh](http://www.zsh.org) has excellent tab completion for tmux. Additionally, since I use it be
default, I have this at the end of my `zshrc`:

{% highlight zsh %}
# show available tmux sessions
if [[ -z $TMUX ]]; then
    sessions=$( tmux ls 2> /dev/null | awk '! /attached/ { sub(":", "", $1); print $1; }' | xargs echo )
    if [[ ! -z $sessions ]]; then
        echo "==> Available tmux sessions: $sessions"
    fi
    unset sessions
fi
{% endhighlight %}

This shows me any tmux sessions which are running but not attached when I start a shell:

```
==> Available tmux sessions: fullscreen remote
~ %
```

### vim

I use a couple of vim plugins (via [vim-plug](https://github.com/junegunn/vim-plug)) to help with tmux:

{% highlight vim %}
Plug 'tmux-plugins/vim-tmux-focus-events', Cond($TMUX != '')
Plug 'roxma/vim-tmux-clipboard', Cond($TMUX != '')
Plug 'christoomey/vim-tmux-navigator', Cond($TMUX != '')
{% endhighlight %}

The first allows vim to receive focus events from tmux, so that switching
to/from windows/panes with vim in triggers `autocmd`s for appropriate events.
It's also required for the next item.

The second shares the vim `"` buffer with tmux's clipboard, making for easier
pasting of large amounts of text into vim, or out of it.

The third provides the integrated pane navigation with tmux, and to go with it
I use the following configuration:

{% highlight vim %}
let g:tmux_navigator_no_mappings = 1
let g:tmux_navigator_disable_when_zoomed = 1

if $TMUX !=# ''
  nnoremap <silent> <A-h> :TmuxNavigateLeft<cr>
  nnoremap <silent> <A-j> :TmuxNavigateDown<cr>
  nnoremap <silent> <A-k> :TmuxNavigateUp<cr>
  nnoremap <silent> <A-l> :TmuxNavigateRight<cr>
else
  nnoremap <silent> <A-h> <C-w>h
  nnoremap <silent> <A-k> <C-w>k
  nnoremap <silent> <A-j> <C-w>j
  nnoremap <silent> <A-l> <C-w>l
endif
{% endhighlight %}

The second setting is crucial for me, as without it, trying to move out vim
while vim is in a zoomed pane will unzoom it, which more often than not is not
what I meant.

The `if` is needed so that the bindings still work to navigate panes if the
plugin is loaded, which it won't be if the `$TMUX` environment variable isn't
set, thanks to the `Cond()` part of my plugin definitions.

### iTerm2

iTerm2 has tmux integration so that your windows and panes in tmux are rendered as iTerm windows and panes. However, I found that - cool as this was - it threw off my workflow. I much prefer a single window or tab with my tmux session in it. Maybe more tabs for sessions on other hosts.

## Tips and tricks

A grab bag of useful or cool things I don't use day to day, but have found on my tmux journey.

### Buffer lists

Hopefully you know about copy-mode {% kbd Prefix [ %}. Things which you copy go
into the tmux paste buffer, but there's a history of buffers so you can recall
previously copied stuff! {% kbd Prefix = %} will open a list for you to scroll
and select, and will paste the entry you choose. To view them without pasting,
{% kbd Prefix # %}.

### Windows and panes

If you have a pane you want to move into a window of its own, {% kbd Prefix !
%}. To move a window into being a pane of an existing window. {% kbd Prefix :
%} `join-pane -s WINDOW`. You can also 'mark' the pane to move with
`select-pane -m`, and then use `join-pane` by itself in the target.

To move panes around in a window, for example if you've selected a canned
layout ({% kbd Prefix option 1 %} etc) and want them in a different order, {%
kbd Prefix { %} and {% kbd } %}.

You can make the current window show the time (only) with {% kbd Prefix t %},
which I use in place of having the time in my status bar.

To get a tree view of all your sessions and windows, {% kbd Prefix s %}. Use {%
kbd right %} to expand a session into its list of windows.

### Help

Do not underestimate the man page for tmux. It contains everything you need to
know, although it does make for dry reading. You can also bring up a list of
all the current keystrokes with {% kbd Prefix ? %}, and then search in that
list with {% kbd / %} like `less`.

## Conclusion

{% image tmux/tmux.png alt="Screenshot of iTerm2 showing my tmux session with cowsay" %}

I hope something here has been of use to you, and that you can find tmux a
useful tool. Happy tmuxing!

