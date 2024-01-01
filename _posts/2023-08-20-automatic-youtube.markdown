---
layout: post
title: Automatically fetching YouTube videos
summary: With a shell script or two, you can fetch YouTube videos for convenient local viewing
---

I prefer watching YouTube content via [Plex](https://plex.tv), so a little while back I scribbled a shell script or two to fetch videos using [yt-dlp](https://github.com/yt-dlp/yt-dlp) (a fork of youtube-dl). The videos are saved to a folder Plex considers a library, so they're easy to find. They're saved in a folder named for the channel they're from, which makes it easy to browse a particular channel (at least, the videos I have from it, which is what I want), or I can view the whole library sorted by date added to give me a "what's new" type view.

One benefit of yt-dlp is its integration with [SponsorBlock](https://sponsor.ajay.app/), which I've set to write additional chapter markers in to videos (rather than chop segments out) so I can use them as I wish when viewing a video. Plus, when I tried having it chop segments a couple of years back when testing it out, the resulting video suffered desync quite heavily.

I also have it write the original video's thumbnail in to the file, which Plex seems to pick up. I don't think everyone is keen on these as they can be click-baity, but generally the channels I'm following don't do that, and since I've explicitly chosen to download these videos I'm not being baited :P

One script downloads the latest videos from channels, and the other downloads videos I've bookmarked in [Pinboard](https://pinboard.in). I tend to use the latter for ad hoc "I'll watch this later" things. Both run nightly via a cronjob. The channel-downloading function limits itself to the most recent five items, and also videos older than one day, and newer than four weeks. The item count and newer-than limit are both there to stop it getting carried away; since it runs nightly there shouldn't be more than a couple of new videos on a channel. The older-than limit is to give SponserBlock time to gather some data for the video. Videos must be longer than 5 minutes to be downloaded, which is a heavy-handed way of getting "Shorts" skipped. There's some collateral damage on a couple of channels from this, but I'm happy with that.

The actual download logic is in two functions, one which just downloads a single video, and the other a playlist-type URL (including a channel). They're in a separate file so I can source it in my shell config, and then use the functions on an ad hoc basis too.

The functions take a second parameter (after the URL) to specify the size of video it should try to download. The resulting video may not be exactly this size as it depends what resolutions are available. I do this so I can download videos which I'll be watching on a smaller screen, or ones which are mostly just for music, at a reduced size.

The playlist-downloading function can also take a third parameter, which is a yt-dlp [filter expression](https://github.com/yt-dlp/yt-dlp#filtering-formats) to be added to the duration one. For example, this could be `" & title !~='(?i)podcast'"` to ignore videos with `podcast` in the title. This allows additional tweaking on a per-channel basis.

The script for downloading from pinboard uses a [Python CLI tool](https://github.com/lionheart/pinboard.py) to reach the API, parsing the results with [jq](https://jqlang.github.io/jq/). I did this because faffing with the Pinboard API myself with `curl` was more effort than I felt like putting in.

Now you have a feel for what all the moving parts are, here are the scripts.

## The scripts

This is the file with the shared functions in; it's in `$HOME/.local/bin/download-util.sh`. My `yt-dlp` is installed directly from a clone of the repo (in editable mode) to make it easier to chase updates. The `PATH` modification is there to make sure tools like `ffmpeg` can be found.

These scripts are offered as-is; some customisation is likely to be required.

```bash
export PATH=/usr/local/bin:$PATH

YT_DLP="/home/james/.pyenv/shims/yt-dlp"

download_one() {
    # video, height
    $YT_DLP \
        -f "mp4/bestvideo+m4a/bestaudio" \
        -S "height:$1" \
        --no-playlist \
        --sponsorblock-mark all \
        --embed-metadata \
        --embed-thumbnail \
        --output "%(uploader)s/%(uploader)s - %(upload_date)s - %(title)s (%(id)s).%(ext)s" \
        --paths home:/drobo/video/Youtube --paths temp:/drobo/video/tmp \
        --no-overwrites \
        --download-archive $HOME/yt-download-archive \
        "$2"
}

download() {
    # video, height, extra filters
    echo
    echo "==> $2"
    $YT_DLP \
        -f "mp4/bestvideo+m4a/bestaudio" \
        -S "height:$1" \
        --sponsorblock-mark all \
        --embed-metadata \
        --embed-thumbnail \
        --output "%(uploader)s/%(uploader)s - %(upload_date)s - %(title)s (%(id)s).%(ext)s" \
        --paths home:/drobo/video/Youtube --paths temp:/drobo/video/tmp \
        --no-overwrites \
        --dateafter today-4weeks \
        --datebefore today-1day \
        --match-filters "duration>300$3" \
        --playlist-items 1:5 \
        --download-archive $HOME/yt-download-archive \
        "$2"
}
```

This is the script which downloads my "subscriptions", with some sample entries so you can see how I use it. It's called by cron overnight. The `touch` at the end was originally for a sentinel file for monitoring, but I had an issue with yt-dlp exiting with an error which encountering a "coming soon" entry for a live broadcast - specifically Above & Beyond's - which made using `set -e` pointless.

```bash
#!/usr/bin/env bash

export PATH=/usr/local/bin:$PATH

source $HOME/.local/bin/download-util.sh

download 1080 "https://www.youtube.com/@AMMO-NYC/videos"

# Dashcams AU monthly compiliations playlist
download 1080 "https://www.youtube.com/playlist?list=PLlFN1tsXeNsymgnTb9jTv87YO7wEG02ck"

download 720 "https://www.youtube.com/@aboveandbeyond/streams"
download 720 "https://www.youtube.com/@astateoftrance/videos" " & title !~='(?i)podcast'"

touch $HOME/did-downloading
```

Finally this is the script for downloading from Pinboard. It takes one optional argument; if you specify `all` then it will download every YouTube video you have bookmarked, instead of recent ones. This is for bootstrapping.

You'll need the pinboard tool installed, and to have run `pinboard login` to save your API key.

```bash
#!/usr/bin/env bash

source $HOME/.local/bin/download-util.sh

if [[ $1 == "all" ]]; then
    command="bookmarks"
    jq_bit='.[]'
else
    command="recent"
    jq_bit='.posts[]'
fi

videos=$(
        $HOME/.local/bin/pinboard "$command" | \
                jq -r "$jq_bit"' | select(.href | contains("youtube.com") or contains("youtu.be")) | select(.toread == "yes").href'
        )
for video in $videos; do
    download_one 1080 "$video"
done
```

