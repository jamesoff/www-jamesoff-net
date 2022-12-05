---
layout: post
title: Mastodon on FreeBSD
summary: Setting up Mastodon on FreeBSD
---

Here's the steps I used to install Mastodon 4.0.2 on FreeBSD.

I started from Colin Percival's FreeBSD 13.0-RELEASE EC2 image, and first updated it to 13.1-RELEASE.

Starting logged in as root:

```shell
freebsd-update -r 13.1-RELEASE upgrade
freebsd-update install

# reboot

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

[TODO: tune pgsql]

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

