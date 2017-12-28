---
layout: post
title: Undoing part of a git commit
summary: Some magic with rebase if you accidentally commit a change you meant to keep local
---
Sometimes when I'm working on some code which gets committed and pushed to a remote repository (e.g. so that it can be built by something like Travis or Jenkins), I need local changes for testing but which aren't valid to push remotely.

For example, working with [Packer](https://packer.io) builds for AMIs means a reasonably long test cycle, as Packer has to start up an EC2 instance, wait for SSH to be available, then run your provisioning steps. Once it completes, successfully or not, you have to wait while it all gets torn down afterwards.

To speed up that cycle slightly, I tend to add a Docker builder to the Packer configuration, and then run the build locally in Docker on my laptop. This saves cluttering up the repo with commits which try to fix problems (although I'll rebase those out before merging), and saves a lot of time while you're getting the provisioners set up right (I'm looking at you, Chef). Once I'm happy the build works, I'll commit and push, but avoid committing the JSON block which adds the Docker build, as that's not something the build host knows how to handle.

## Partial commits

That's easy if your fixes don't involved changes to your Packer build template as you can just not include that in a commit.

If you do need to commit it, you can use `git add --patch` to have Git ask you interactively about each part of the file. Simply say `n` to the Docker block, and `y` to the bits you need to commit.

If you say `y` to a bit you didn't mean to, and didn't commit yet, you can undo the `add` with `git checkout --patch`, which will interactively ask you which bits you want to un-stage.

## Undoing part of a commit

What if you've committed already? We can use the `rebase` command to edit the commit with the bad change in to remove it but leave everything else.

**Before doing this**, you should be aware that we are going to rewrite the commit history, which will have implications if anyone else has pulled your branch with the bad commit in it. (If they haven't yet, then you're ok.) There's no harm if things like Jenkins have seen the bad commit as they know to work around this change. You should also make sure that there are no commits on your origin which you don't have yet, else they could be lost when you push at the end of this process.

First, you should stash any changes you have in your working tree as you can't rebase with those around. You can restore them after the process.

```
git stash -u
```

Now, start the rebase process. You need to specify a commit range which goes back far enough. If it's a few commits back, you can use something like `HEAD^^^`. Or, use `git log` to find the error which needs fixing, and specify the parent of that (`1234567^`).

Git will present you with the list of commits it will work on, and you should change the verb for the one which needs fixing to `edit`. Save and quit from your editor, and wait for Git to stop.

```
% git rebase -i 'HEAD^^^'
HEAD is now at 192c1f3 Install latest Chef 12
Stopped at 66640bf...  Use larger instance to build
You can amend the commit now, with

  git commit --amend

Once you are satisfied with your changes, run

  git rebase --continue
```

Now reset HEAD and staging to the parent of the commit you're on. This will make the changes to the file show up as uncommited and unstaged again.

```
% git reset 'HEAD^'
Unstaged changes after reset:
M       packer/template.json
```

If you need to keep other changes from the file, add those with `git add --patch` and skip the ones to ignore. Add other files if needed.

```
% git add -p packer/template.json
diff --git a/packer/template.json b/packer/template.json
index 1c7230d..4247473 100644
--- a/packer/template.json
+++ b/packer/template.json
@@ -1,7 +1,7 @@
 {
        "variables": {
                "ssh_username": "ec2-user",
-               "instance_type": "t2.medium",
+               "instance_type": "t2.large",
                "region": "us-east-1",
                "source_ami": null
        },
Stage this hunk [y,n,q,a,d,/,j,J,g,e,?]? y
@@ -21,6 +21,12 @@
                "subnet_id": "subnet-12345678",
                "user_data_file": ""

+       },
+       {
+               "type": "docker",
+               "image": "jms-chef:12",
+               "commit": true,
+               "pull": false
        }
        ],
        "description": "packer template for thing",
Stage this hunk [y,n,q,a,d,/,K,g,e,?]? n

% git commit -m 'Use larger instance to build'
[detached HEAD fd32f60] Use larger instance to build
 1 file changed, 1 insertion(+), 1 deletion(-)
```

However, because we have unstaged changes we can't continue the rebase:

```
% git rebase --continue
packer/c3s_web.json: needs update
You must edit all merge conflicts and then
mark them as resolved using git add

% git status -s
 M packer/template.json
```

Luckily we can stash those changes for now, getting them out of the way:

```
% git stash
Saved working directory and index state WIP on (no branch): fd32f60 Use larger instance to build

% git rebase --continue
Successfully rebased and updated refs/heads/feature/thing.
```

Now that the rebase is complete, we can pop the stash with our un-committed change in it:

```
% git stash pop
Auto-merging packer/template.json
On branch feature/thing
Your branch and 'origin/feature/thing' have diverged,
and have 2 and 2 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   packer/template.json

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (4444b54315f248e4372e2b24b9c988177cf7aeb4)

% git diff packer/template.json
diff --git a/packer/template.json b/packer/template.json
index 3d72173..585037e 100644
--- a/packer/template.json
+++ b/packer/template.json
@@ -21,6 +21,12 @@
                "subnet_id": "subnet-12345678",
                "user_data_file": ""

+       },
+       {
+               "type": "docker",
+               "image": "jms-chef:12",
+               "commit": true,
+               "pull": false
        }
        ],
        "description": "packer template for thing",
```

If you stashed changes before starting the rebase, you should `git stash pop` again to get those back now.

Note the warning that our branch and the origin's have diverged. This is because we rewrote the commit history. You will need to force-push to the origin to overwrite its history with your new one, which you can do (remember the warning at the start!) with `git push --force-with-lease`.

