---
layout: post
title: Some FZF tricks
summary: How to use the fzf fuzzy finder to search files, upgrade packages and more.
---

If you're not using [fzf](https://github.com/junegunn/fzf) it's worth checking out. It's a very fast fuzzy-finder which out of the box can do things like search your shell history, find files under the current directory, and change directories.

But the real power of it comes from just being able to feed it a list of strings and be able to interactively filter it before acting on one more more items.

Here's a few of the things I do with it:

### History search

Install the fzf-supplied shell functions, and hit `Ctrl-R` (in zsh at least) for your command history. Anything already typed is used to pre-load the search line. The selected line is pasted at the prompt so you can edit it before executing it.

### File search

Similar to history search, but hit `Ctrl-T` and fzf pops up with a list of all the files found recursively under the current directory. Use it after typing a command to add it as a parameter.

### Finding text in files with The Silver Searcher

This uses the [Silver Searcher](https://github.com/ggreer/the_silver_searcher) to build a list of files matching a search pattern, then presents them with fzf. The selected file is opened in vim, and vim is also triggered to populate the location list with all the matches. The cursor is jumped to the matching line.

If there are no matches, you're returned to your shell prompt, and if there is only one, that's opened automatically.

This is a shell function. You will need the [Ag vim plugin](https://github.com/vim-scripts/ag.vim) installed - if you don't have it, then remove the `+LAg` and everything after it.

{% highlight sh %}
agvim () {
	CHOICE=$(ag --color $* | fzf -0 -1 --ansi)
	if [ ! -z "$CHOICE" ]
	then
		vim $( echo "$CHOICE" | awk 'BEGIN { FS=":" } { printf "+%d %s\n", $2, $1 } ') +"LAg! '$*'" "+wincmd k"
	fi
}
{% endhighlight %}

This does have a minor issue where if you search in a big directory tree, you wait for `ag` to spit out the list of results for the `fzf` list, and then when vim starts you have to wait for the script to perform the same search again for the location list. This can probably be improved by `tee`ing the results to a temporary file, and then populate the location list by reading that file. This happens infrequently enough for me to not have invested the time or effort in fixing it.

### Viewing a list of homebrew formulae to upgrade

After a `brew update`, try this:

{% highlight sh %}
brew outdated | \
fzf -m -n 1 --tac --header='Select formulae to upgrade with tab' | \
xargs brew upgrade
{% endhighlight %}

Don't forget to `brew cleanup` afterwards.

### vim magic

Install the [fzf.vim](https://github.com/junegunn/fzf.vim) plugin, and it adds commands which give you fzf-powered lists of open buffers, recently opened files, command and search history and more.
