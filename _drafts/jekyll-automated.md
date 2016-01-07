---
layout: post
title: Jekyll and Continuous Deployment
---

Having changed this site from WordPress to [Jekyll](http://jekyllrb.com) I thought it would be good to have some kind of automated deployment, so I could just `git commit` and push, and have the changes go live automatically.

Jekyll's documentation has a section on [Continuous Integration](http://jekyllrb.com/docs/continuous-integration/) which gives a good overview of how to make [Travis](http://travis-ci) build and test your site for you but it doesn't talk much about deployment steps. (There is a [page about that](http://jekyllrb.com/docs/deployment-methods/) but it doesn't tie it all together much.)

So here's how I'm doing it.

### High-level overview

My webhost limited SSH connections to a few trusted hosts, so I could have set up Travis to do SSH-based deployment via a jump host. However, I decided to get Travis to put the deployable site somewhere and then poke the server to fetch it. Travis deploys the built `_site` folder to an S3 bucket, and then I use the webhook notification method to kick off a script on the server. The script downloads the S3 bucket to a temporary folder, and then swaps symlinks around to point the webserver at the new version. Both the Travis build and my script send notifications to a Slack instance for me to keep an eye on things.

### Travis config

There's two main parts to the `.travis.yml` file to make this work. The first is to deploy it to S3:

{% highlight yaml %}
deploy:
  provider: s3
  access_key_id: [snip]
  secret_access_key:
    secure: [snip]
  bucket: net-jamesoff-www
  local-dir: _site
  acl: private
  on:
    repo: jamesoff/www-jamesoff-net
    branch: master
  skip_cleanup: true
  region: eu-west-1
{% endhighlight %}

This tells Travis to deploy to S3 using the API keys given (with the secret access key encrypted, using `travis` command line tool). That IAM user at AWS has rights to put/get objects in that bucket (and the usual ones for being able to list objects etc) but that's it. It makes sure that it's only triggered for my repo, and on the master branch - I don't want it uploading a branch when I'm trying something out. When I'm ready for something to go live, it gets merged to master. `skip_cleanup` is important, else Travis deletes the build folder before trying to deploy it.

The second section of config handles the webhook to trigger the server to fetch the site from S3:

{% highlight yaml %}
notifications:
  webhooks:
    urls: https://jamesoff.net/_webhook/
    on_success: always
    on_failure: never
    on_start: never
{% endhighlight %}

This calls the webhook URL when the build succeeds, but not when it starts or fails. Unfortunately it does seem possible to tell Travis you only want webhooks fired on certain branches, so the wehbook handler filters for the `master` branch. This is covered later :)

The build at Travis is handled by a script which is the same as the one on the Jekyll documentation.

### htmlproof

As suggested in Jekyll's documention, I'm running [htmlproof](https://github.com/gjtorikian/html-proofer). However, it seems to not work on OS X because a dependency has problems, and [none of their suggested fixes](https://github.com/ffi/ffi/issues/461) helped. At the moment, I can't `htmlproof` my site locally, but Travis can.

### Deployment

Once Travis has built and validated the site, it copies it all to the S3 bucket and triggers the webhook. The webhook consists of two parts: a PHP handler which handles the request from Travis, and a shell script which the PHP script calls to do the actual work.

The PHP script lives in a folder outside of the webroot, handled by a special `location` block in nginx. It looks like this:

{% highlight php %}
<?php
    $auth = false;
    $auth_string = '[snip]';

/*
    $headers = apache_request_headers();
    if (!array_key_exists('Authorization', apache_request_headers())) {
        if ($headers['Authorization'] == $auth_string) {
            $auth = true;
        }
    }
*/

    if (array_key_exists('AUTHORIZATION', $_SERVER)) {
        if ($_SERVER['AUTHORIZATION'] == $auth_string) {
            $auth = true;
        }
    }

    if (!$auth) {
        die('Nope.');
    }

    if (!array_key_exists('payload', $_POST)) {
        die('Nope.');
    }

    $payload = json_decode($_POST['payload'], true);
    if ($payload === NULL) {
        die('Nope.');
    }

    if ($payload['branch'] != 'master') {
        die('Nope.');
    }

    if ($payload['status'] == 0) {
        exec("/usr/bin/sudo /usr/local/bin/update-site.sh | logger &");
        echo "OK";
    }
    else {
        echo "OK (NOP)";
    }
?>
{% endhighlight %}

This script is run through FastCGI, which is why the Apache block is commented out. (I changed from Apache to nginx as part of setting this up, as Apache's config was doing my head in.) There's a `fastcgi_param` directive in the nginx configuration which passes the HTTP Authorization header in to this script. Travis sets this header to show it's a valid call to your webhook. You can calculate your authorization key like so:

1. Go to your profile on Travis and click the little eye icon to see your token:
![travis_token](/i/travis_profile.png)
2. Run this python script (or equivalent in whatever language):
{% highlight python %}
from hashlib import sha256
sha256('username/repository' + TRAVIS_TOKEN).hexdigest()
{% endhighlight %}

This is also where I check the branch Travis is telling me about. Tavis's own documentation is a bit poor on what data is in the webhook payload, but you can see it [in the source](https://github.com/travis-ci/travis-core/blob/master/lib/travis/api/v1/webhook/build/finished.rb#L12-L43), and happily it includes the branch name.

Here's the shell script to deploy the site:

{% highlight bash %}
#!/bin/sh

set -ex

ROOTDIR=/var/www/html
BUCKET=net-jamesoff-www
WEBHOOK='https://hooks.slack.com/services/[snip]'

OLDDIRS=$( ls -d ${ROOTDIR}/jamesoff.net-???? )
NEWDIR=$( mktemp --tmpdir=$ROOTDIR -d jamesoff.net-XXXX )

send_notification() {
    curl -X POST --data-urlencode 'payload={"text":"Updated <http://jamesoff.net> is live.","username":"jamesoff-deploy-bot"}' $WEBHOOK
}

echo New directory is $NEWDIR
echo Old dirs are $OLDDIRS

cd $NEWDIR
aws s3 sync s3://${BUCKET}/ .
chmod -R a+rx $NEWDIR
mv ${NEWDIR}/_htaccess ${NEWDIR}/.htaccess

echo Switching symlink...
rm -f ${ROOTDIR}/jamesoff.net && ln -s $NEWDIR ${ROOTDIR}/jamesoff.net

[ -z "$OLDDIRS" ] && send_notification && exit 0

echo Removing old dirs
rm -rf $OLDDIRS
send_notification
{% endhighlight %}

### Missing bits

There's still a couple of things I'd like to fix up:

* failure notification for deployment
* use `s3 sync` from the awscli instead of Travis's dump copy-everything-every-time mode. This will also fix the case where I remove a file from the site, but it won't get removed from the S3 bucket (and thus will remain on the server).

