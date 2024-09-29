---
layout: post
title: Mastodon on FreeBSD
summary: Setting up Mastodon on FreeBSD
---

Updated 2023-12-17 to add FreeBSD 14.0 notes at end.

Updated 2023-02-11: Mastodon is now available in ports, so you can just `pkg install` it if you want. I went through this process while the version in ports was abandoned, but it was adopted again not long after. I'm keeping with my install though, and publishing my notes in case they're of use to anyone else doing similar.

<hr />

Here's the steps I used to install Mastodon 4.0.2 on FreeBSD.

I started from Colin Percival's FreeBSD 13.0-RELEASE EC2 image, and first updated it to 13.1-RELEASE.

Starting logged in as root:

```shell
freebsd-update -r 13.1-RELEASE upgrade
freebsd-update install

# reboot as requested by freebsd-update

freebsd-update install
```

I also installed tmux, in case I got disconnected during any long-running tasks. It also makes it easier to have a couple of shells on the go (for example, as different users).

```shell
pkg install -y tmux
```

Then we can follow the Mastodon install guide, with some adjustments for FreeBSD.

```shell
pkg install -y curl wget gnupg sudo node16 npm yarn-node16 postgresql15-server
```

Enable postgresql:

```shell
sysrc postgresql_enable=yes
```

Do the initial configuration for postgresql:

```shell
/usr/local/etc/rc.d/postgresql initdb
service postgresql start
```

Install some more required things:

```shell
pkg install ImageMagick7-nox11 ffmpeg libxml2 libxslt git bison libyaml libffi redis nginx py39-certbot-nginx icu bash
```

Create the mastodon user:

```
pw user add -m mastodon
pw user mod mastodon -s /usr/local/bin/bash
```

Switch to the mastodon user:

```shell
su - mastodon
```

As the mastodon user, continue setting up:

```shell
corepack enable
yarn set version classic

git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
```

Once bash is relaunched with rbenv configured, continue:

```shell
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
rbenv install 3.0.4
```

The install of Ruby will take a short while. Once it's done:

```shell
rbenv global 3.0.4
gem install bundler --no-document
```

And return to your root shell:

```shell
exit
```

[TODO: tune pgsql?]

Create the mastodon database:

```shell
sudo -u postgres psql
```

```sql
CREATE USER mastodon CREATEDB;
\q
```

Enable redis and start it:

```shell
sysrc redis_enable=yes
service redis start
```

Back to the mastodon user to install Mastodon itself:

```shell
su - mastodon
git clone https://github.com/mastodon/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)

bundle config deployment 'true'
bundle config without 'development test'
```

I found I needed this to make `bundle install` succeed:

```shell
bundle config set build.idn-ruby -- --with-idn-dir=/usr/local
```

Now we can install all the gems:

```shell
bundle install
```

Once they're installed, run the initial Mastodon setup:

```shell
RAILS_ENV=production bundle exec rake mastodon:setup
```

During the configuration questions, change the Postgres host to `localhost`.

Back to root:

```shell
exit
```

Configure nginx. Replace `YOUR_HOSTNAME` in the `sed` command with your mastodon hostname.

```shell
cp ~mastodon/live/dist/nginx.conf /usr/local/etc/nginx/mastodon.conf
sed -I bak s/example.com/YOUR_HOSTNAME/ /usr/local/etc/nginx/mastodon.conf
```

Edit the main nginx config file and remove the two `server { ... }` blocks provided (one is commented out).

Add `include 'mastodon.conf';` in their place.

```shell
vi /usr/local/etc/nginx/nginx.conf
```

Save and quit.

Edit the mastodon nginx config file. In order for nginx to start, which is needed for the certbot verification, you need to comment out the entire `server { .. }` block with the SSL configuration.

```shell
vi /usr/local/etc/nginx/mastodon.conf
```

Save and quit.

Ensure DNS points to your host.

Enable and start nginx:

```shell
sysrc nginx_enable=yes
service nginx start
```

Request your SSL cert:

```shell
certbot --nginx -d YOUR_HOSTNAME
```

Ignore error about server configuration.

Edit the mastodon nginx config file again, and uncomment the `server { ... }` block. Update the two cert paths to add `/usr/local` at the start (i.e. `/usr/local/etc/letsencrypt/...`).

Verify and reload nginx.

```shell
nginx -t
nginx -s reload
```

You should now be able to hit your Mastodon hostname and receive (over HTTPS) the Mastodon error page.

Now we need to make sure the Mastodon services run. Install and enable daemontools:

```shell
pkg install daemontools
sysrc svscan_enable=yes
```

Create the service directories for the three services:

```shell
mkdir -p /var/service/mastodon-{sidekiq,web,streaming}/{env,log}
```

Create the `run` files for each. Starting with Sidekiq:

```shell
cd /var/service/mastodon-sidekiq
vi run
```

Content for the sidekiq `run` file:

```shell
#!/bin/sh

cd /home/mastodon/live

exec envdir /var/service/mastodon-sidekiq/env \
	setuidgid mastodon \
	/home/mastodon/.rbenv/shims/bundle exec sidekiq -c 25 2>&1
```

Save and quit. Set the values for the environment variables:

```shell
echo production > env/RAILS_ENV
echo 25 > env/DB_POOL
echo 2 > env/MALLOC_ARENA_MAX
```

Create the `run` file for logging:

```shell
vi log/run
```

with content:

```shell
#!/bin/sh

exec /usr/local/bin/multilog n30 s16777215 /var/log/mastodon-sidekiq 2>&1
```

Save and quit.

Fix the permissions on the two `run` files:

```shell
chmod 755 run log/run
```

Now the streaming service:

```shell
cd /var/service/mastodon-streaming
vi run
```

With content:

```shell
#!/bin/sh

cd /home/mastodon/live

exec envdir /var/service/mastodon-streaming/env \
	setuidgid mastodon \
	/usr/local/bin/node ./streaming 2>&1
```

Save and quit. Set the values for the environment variables:

```shell
echo production > env/NODE_ENV
echo 4000 > env/PORT
echo 1 > env/STREAMING_CLUSTER_NUM
```

Create the `run` file for logging:

```shell
vi log/run
```

with content:

```shell
#!/bin/sh

exec /usr/local/bin/multilog n30 s16777215 /var/log/mastodon-streaming 2>&1
```

Save and quit.

Fix the permissions on the two `run` files:

```shell
chmod 755 run log/run
```

Finally the web service:

```shell
cd /var/service/mastodon-web
vi run
```

With content:

```shell
#!/bin/sh

cd /home/mastodon/live

exec envdir /var/service/mastodon-web/env \
	setuidgid mastodon \
	/home/mastodon/.rbenv/shims/bundle exec puma -C config/puma.rb 2>&1
```

Save and quit. Set the values for the environment variables:

```shell
echo 3000 > env/PORT
echo production > env/RAILS_ENV
```

Create the `run` file for logging:

```shell
vi log/run
```

with content:

```shell
#!/bin/sh

exec /usr/local/bin/multilog n30 s16777215 /var/log/mastodon-web 2>&1
```

Save and quit.

Fix the permissions on the two `run` files:

```shell
chmod 755 run log/run
```

Now start the `svscan` service, which will then start the Mastodon services:

```shell
service svscan start
```

Wait a few seconds, then check that all the services are running correctly. Running this command should show that the three services are staying up rather than having an uptime of 0 or 1 seconds:

```shell
svstat /var/service/*
```

Your Mastdon install should now be functional.

## Updating

To update Mastodon, follow these steps.

Create a backup using whatever method is suitable for your environment. I shut down the host and snapshot the disk, then start it up again.

Consult the release notes for the release of Mastodon you're updating to. If you're upgrading from more than one release ago, consult the release notes for the intervening versions too as they can have their own requirements.

Verify you have the right versions of the external dependencies installed.

```shell
su - mastodon
cd live
ruby --version
postgres --version
# I'm not using Elasticsearch
redis-server --version
node --version
```

Fetch and check out the version of the code you're upgrading to (per the release notes)

```shell
git fetch && git checkout v4.1.0
```

Follow the non-Docker and the "both" instructions from the release notes.

If instructed to restart all the Mastodon services, you do it with `svc`:

```shell
svc -d /var/service/mastodon-*

# check they're stopped
svstat !$

svc -u !$

# wait a few seconds for things to (hopefully) stay running and check
svstat !$
```

If any of the services have an uptime of 0 to a couple of seconds, they're likely crashing and restarting. Check the right log file in `/var/log/mastodon-SERVICE/current` for clues.

When you're happy, remember to delete your backup/snapshot, especially if you pay for storing it (assuming that you have some other regular backup mechanism set up anyway! and if you don't, do that).

## Troubleshooting

I found during my preflight checks ("is it working ok before I mess with it?") before upgrading that Sidekiq wouldn't (re)start because it was using a Gem built against a version of a library which had changed, so I had to rebuild that particular Gem to make it work. For reference, here's how I figured that out and fixed it.

First, looking in the Sidekiq log:

```shell
less /var/log/mastodon-sidekiq/current
```

and jumping to the end of the file (by pressing `G`) showed this error repeating every time the service tried to start:

```
bundler: failed to load command: sidekiq (/usr/home/mastodon/live/vendor/bundle/ruby/3.0.0/bin/sidekiq)
/usr/home/mastodon/live/vendor/bundle/ruby/3.0.0/gems/bootsnap-1.13.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:32:in `require': Shared object "libicudata.so.71" no
t found, required by "charlock_holmes.so" - /usr/home/mastodon/live/vendor/bundle/ruby/3.0.0/gems/charlock_holmes-0.7.7/lib/charlock_holmes/charlock_holmes.so (LoadError)
        from /usr/home/mastodon/live/vendor/bundle/ruby/3.0.0/gems/bootsnap-1.13.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:32:in `require'
        from /usr/home/mastodon/live/vendor/bundle/ruby/3.0.0/gems/activesupport-6.1.7/lib/active_support/dependencies.rb:332:in `block in require'
        from /usr/home/mastodon/live/vendor/bundle/ruby/3.0.0/gems/activesupport-6.1.7/lib/active_support/dependencies.rb:299:in `load_dependency'
[snip]
```

The two key bits of information in this log are that it's a shared object (library, `.so` file) called `libicudata.so.71` which can't be found, and that it's the `charlock_holmes` gem trying to load it.

First I tried finding that file to see if it was present but not being loaded:

```shell
locate libicudata.so.71
```

which returned no output, so that file doesn't exist now. The numbers at the end are a version, so I repeated the search without the version to see what was around:

```shell
locate libicudata.so
```

This gave me

```
/usr/local/lib/libicudata.so
/usr/local/lib/libicudata.so.72
/usr/local/lib/libicudata.so.72.1
```

So the library got updated (by `pkg`), which means (because it worked before with the other version) we probably just need to get the gem rebuilt so it links to the new version instead.

```shell
# in the ~mastodon/live directory
bundle pristine charlock_holmes
```

After this, sidekiq started straight up.

## FreeBSD 14.0 notes

Upgrading to FreeBSD 14.0 was pretty straightforward. Ruby needed rebuilding to work (as you would expect). 3.0.4 wouldn't build so I moved to 3.2.2:

```
rbenv install 3.2.2
rbenv global 3.2.2
```

(This needed rbenv and rbenv-build to be updated, by `git pull`ing in each of their directories as above.)

I also needed to add some build options for `bundle install` to succeed:

```
bundle config build.cbor --with-cflags="-Wno-incompatible-function-pointer-types"
bundle config build.posix-spawn --with-cflags="-Wno-incompatible-function-pointer-types"
```

With these updates, everything started right back up.

## Mastodon 4.3 notes

### Versions

Yarn needs updating. Everything else seems like it should be an acceptable version (spoiler: Ruby gets updated below).

There doesn't seem to be a suitable version in `pkg` nor in ports (`make search name=yarn | grep Port`). Poking around the docs reveals https://yarnpkg.com/migration/guide. Running `corepack enable` will result in a clash with installed yarn1, so remove that first. Additionally, I point it at a location in my non-privileged user's `$PATH`.

```
# pkg remove yarn-node20-1.22.19

$ corepack enable --install-dir /data/mastodon/bin

$ yarn set version berry
! Corepack is about to download https://repo.yarnpkg.com/4.5.0/packages/yarnpkg-cli/bin/yarn.js
? Do you want to continue? [Y/n] y

➤ YN0000: Done in 0s 20ms

$ yarn --version
4.5.0
```

We also want to move to libvips. Installing that needed removing a conflicting ImageMagick7 first.

```
# pkg install vips
```

## Changes

Generate new Active Record secrets and make available to the processes by adding them to files in `/var/service/mastodon-*/env`. I copied them between each service (rather than trying to symlink them). Generate keys with `bin/rails db:encryption:init`. They also need to go in your `.env.production` file.

Generate keys with `bin/rails db:encryption:init`.

Also put `true` in `MASTODON_USE_LIBVIPS` in each service's `env` dir.

Check out the new version from git.

Update Ruby, as this brings a new `.ruby-version` file.

```
git -C /data/mastodon/.rbenv/plugins/ruby-build pull

RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install

corepack prepare

bundle install

yarn install --immutable

bundle exec rails assets:precompile
```

