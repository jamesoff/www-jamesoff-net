---
layout: post
title: Verifying S3 uploads
summary: A script to compare local checksums with those of files in S3 to make sure they uploaded successfully.
---
I just archived a bunch of old photo stuff from Aperture into S3/Glacier, and I wanted to make sure everything uploaded correctly before I deleted my local copy.

Here's a script which will compare the checksums for all the files in the current directory with those in S3. It will report missing files and mismatched checksums. Pass it the name of the bucket and the prefix it should look in as parameters.

## You will need:

* `s3md5` from [antespi/s3md5](https://github.com/antespi/s3md5)
* Valid AWS credentials somewhere `awscli` can find them

## Script:

{% highlight bash %}
#!/bin/bash

missing_s3md5() {
        echo "Can't find/exec s3md5"
        echo "Get it from https://github.com/antespi/s3md5 and put in PATH, or export S3MD5 to point at it."
        exit 1
}

S3MD5=${S3MD5:-$( which s3md5 )}

[ -x "$S3MD5" ] || missing_s3md5

if [[ $# -ne 2 ]]; then
        echo "Compare local files by checksum in cwd to a folder in S3"
        echo "usage: $0 BUCKET_NAME PREFIX"
        exit 1
fi

BUCKET=$1
PREFIX=$2

for i in *; do
        echo -n "Checking $i..."
        REMOTE_SUM=$(aws s3api head-object --bucket "$BUCKET" --key "$PREFIX/$i" 2>/dev/null| jq -r .ETag | tr -d \")
        if [ -z "$REMOTE_SUM" ]; then
                echo "  does not exist in S3"
                continue
        fi
        LOCAL_SUM=$($S3MD5 10 "$i")
        if [[ $LOCAL_SUM = "$REMOTE_SUM" ]]; then
                echo ok
        else
                echo mismatch
        fi
done
{% endhighlight %}

e.g. `./compare-bucket.sh my-archive-bucket aperture_photos`

