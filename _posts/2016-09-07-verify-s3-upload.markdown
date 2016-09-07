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

{% gist jamesoff/609667f23578aa213174a26dc2d6d6a7 %}

e.g. `./compare-bucket.sh my-archive-bucket aperture_photos`

