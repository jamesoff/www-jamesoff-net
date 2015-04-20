---
layout: post
status: publish
published: true
title: VMware Server&#8217;s httpd
author:
  display_name: jamesoff
  login: jamesoff
  email: james@jamesoff.net
  url: http://jamesoff.net
author_login: jamesoff
author_email: james@jamesoff.net
author_url: http://jamesoff.net
wordpress_id: 246
wordpress_url: http://jamesoff.net/site/2006/10/02/vmware-servers-httpd/
date: '2006-10-02 09:03:59 -0400'
date_gmt: '2006-10-02 08:03:59 -0400'
categories:
- Sysadmin
- VMware
- Linux
tags: []
comments: []
---
<p>After a brief powercut at work this morning the machine running VMware Server restarted. It came up fine, but wouldn't start the VMware Apache server for the web interface. In `&#47;var&#47;log&#47;vmware-mui&#47;error_log` it was complaining:</p>
<p>    [Mon Oct  2 08:37:46 2006] [error] ModVmdb load: Address of ModVmdb_InitCore: 0xb7c745a0\n<br />
    [Mon Oct  2 08:37:46 2006] [error] Failed to create named-pipe directory:<br />
      &#47;var&#47;run&#47;vmware&#47;&#47;httpd&#47;3854: No such file or directory\n<br />
    [Mon Oct  2 08:37:46 2006] [error] VMWARE PANIC: \nNOT_IMPLEMENTED F(4023):707\n<br />
    [Mon Oct  2 08:37:46 2006] [error] Panic: Could not allocate temporary context.\n</p>
<p>This is apparently a known problem on Ubuntu (which is what I'm running it on), and [someone came up with this fix](http:&#47;&#47;www.vmware.com&#47;community&#47;message.jspa?messageID=439558) on the VMware community forums. However, I'm not entirely happy with setting a directory to `777` so instead I created the `httpd` directory and changed the owner to `www-data`, which is who the VMware Apache server runs as. That meant I could set the permissions to `700`.</p>
<p>    # mkdir &#47;var&#47;run&#47;vmware&#47;httpd<br />
    # chown www-data &#47;var&#47;run&#47;vmware&#47;httpd<br />
    # chmod 700 &#47;var&#47;run&#47;vmware&#47;httpd</p>
<p>Seems to be working fine now. I didn't modify the startup script as suggested in the forum post yet, so I'll see when I next restart this machine if I need to do that. (Possibly Ubuntu clears `&#47;var&#47;run` when it starts, which would explain it.)</p>
