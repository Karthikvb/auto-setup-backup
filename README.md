# Launchd Backup and Default Dev-kit#
Test with script with external copy list via launchd

A backup of certain parts of my dev setup using automatic pushes with a cronjob. Designed to:
- Simplify sharing my dev setup with others
- Provide a useful change log of my preferences
- Speed transition onto new machines and get working quickly
- Make restoration easier in case I mess something up

I'm someone that really needs things to be functional, well designed, and aesthetically pleasing for me to sit and use it for hours. Because of this, I've spent a lot of time customizing Sublime, Atom, iTerm2, vim, zsh, and more. If you want your setup to look something like this:

![alt text](https://github.com/ryanjhill/cronjobBackup/blob/master/pictures/screenshot1.jpg "Setup Screenshot")

And have lots of extra productivity features, try out my setup! Or, check below to read about how I went about setting some (but not all) of these customizations up, or to see how you can create your own cronjob backup to github!

##Table of contents##
- [cronjob backup explained](#cronjob-backup-explained)
- [iTerm2 setup](#iTerm2-setup)
- [zsh, oh-my-zsh, and .zshrc setup](#zsh-oh-my-zsh-and-zshrc-setup)
- [vim setup](#vim-setup)
- [atom setup](#atom-setup)
- [sublime setup](#sublime-setup)

##cronjob backup explained##
Initially I setup this backup script using a cronjob, but this wasn't an ideal solution for me since cron won't run if my laptop is sleeping. Laucnhd is OS X's tool that can run 'cronjobs' and queue them while the device is sleeping, so I decided to make the switch to launchd. If you want to do git backups with cron, perhaps on something like a server that is essentially always up, I suggest you use crontab and keychain to make pushes with ssh authentication. It's the only real way I know of to get the cronjob to work properly, otherwise you'll have issues with permissions, authentication, location of system id_rsa, and/or environment variables not being set. It's just a general mess.

With launchd, there is definitely a much bigger 'learning curve.' Cron jobs are easily manageable with crontab,  and you can run the job in literally one line. From there, the challenge is writing a script that still works given the way cron will source files/permissions. Writing jobs for launchd is NOT a one liner. It's a very verbose XML syntax.

With all the options, also comes greater power. Specifically for our purpose, in addition to being able to run timed jobs, the 'WatchPaths' key allows the job to watch for changes in a specific file or directory (but not sub directories,) which is very helpful for the purpose of making backups.

I suggest looking at http://launchd.info/ for a good summary of how to create a laucnhd job; with their tutorial you should be able to have your own up in no time.

##iTerm2 setup##
[iTerm][iterm] (and it's updated version, iTerm2) is the power-user terminal for OS X. It's full of great features and OS integrations that make my working experience that much more seamless. It's also very customizable, so even if it doesn't fit your needs right away, it most certainly can be molded to do so. Unfortunately, doing all of this setup can feel like a bit much.
[iterm]:https://www.iterm2.com/

The great thing though is that iTerm stores all of the below listed shortcuts, color schemes, and more in a .plist file, so feel free to use mine as a basis for your setup. Otherwise, below a few of the key points.

###Weird hex codes###
I'm a huge supporter of keyboard commands, so I found it unfortunate when iTerm didn't respond well to most of my usual OS X keybindings. Luckily everything I wanted could be added to iTerm, but it required a bit of googling and learning about iTerm's hex code commands.

Some of the most important ones:
- `alt +  ⟵` for jumping one word back
  - Profiles > Keys > '+' > Send Escape Sequence > b
- `alt + ⟶` for jumping one word forward
  - Profiles > Keys > '+' > Send Escape Sequence > f
- `cmd + del` for deleting all of line behind the cursor
  - Profiles > Keys > '+' > Send Hex Code > 0x18 0x7f
  - As a side note, if you run zsh you will need to run `echo 'bindkey "^X\\x7f" backward-kill-line' >> ~/.zshrc` to have this work properly (or just add the segment directly to your .zshrc instead of piping it into the file)

There are plenty of other bindings to add – if something doesn't work how you want it to, iTerm can probably be made to do it. Try googling it!

###Color schemes###
Especially because I use vim a lot, and am also frequently working over ssh, I end up starting at my terminal a lot. That means I need something that is easy on the eyes, has good color differentiation, and is very readable (even when my eyes are tired and I've taken off my contacts.) I love my color scheme – its something I built specifically so that I'd enjoy looking at it for hours on end. It's part of my .plist file, so check it out!

###Fonts###
I use 12pt 'Hack' and 12pt 'Source Code Powerline' for non-ASCII text. Hack is incredibly readable, which the other font has a wide symbol library that I like for plugins like Powerline.

##zsh, oh-my-zsh, and .zshrc setup##
There are lots of reasons that I prefer zsh to bash, but to be quite honest, the most compelling reason is and has always been the enhanced autocompletion. You know it is good when using bash now becomes frustratingly slow in comparison because you can't use `TAB` like you are used to.

The default terminal for most people is bash, but zsh is also usually preinstall. Just run `chsh -s $(which zsh)` to set zsh as your default, and BAM, your life just got better.

zsh becomes x10 nicer when you add the power of [oh-my-zsh.][omz] The actual guide for this one is pretty thorough, and I use the default theme, so I'll just leave it at that.
[omz]: https://github.com/robbyrussell/oh-my-zsh

And then, on top of all of this, zsh has its own customizable preferences within the .zshrc file. Mine isn't too crazy, but it has the basics plus a few aliases.

##vim setup##

##atom setup##
What is Atom?
Install Atom here
The bulk of customizing Atom goes into adding packages. Your packages are then stored in `~/.atom/packages`. I copied the full package directory into this github's 'Atom' folder, so you can browser my packages by looking at the directory names.

##sublime setup##
