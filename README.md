# cronjob Backup #
A backup of parts of my dev setup using automatic pushes with a cronjob. Designed to:
* Simplify sharing my dev setup with others
* Speed transition onto new machines and get working quickly
* Make restoration easier in case I mess something up switching setups, or sharing practices easier.

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

##iTerm2 setup##
The great thing though is that iTerm stores all of the below listed shortcuts, color schemes, and more in a .plist file, so feel free to use mine as a basis for your setup.

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
Especially because I use vim a lot, and am also frequently working over ssh, I end up starting at my terminal a lot. That means I need something that is easy on the eyes, has good color differentiation, and is very readable (even when my eyes are tired and I've taken off my contacts.)

###Fonts###
I use 12pt 'Hack' and 12pt 'Source Code Powerline' for non-ASCII text. Hack is incredibly readable, which the other font has a wide symbol library that I like for plugins like Powerline.

##zsh, oh-my-zsh, and .zshrc setup##
There are lots of reasons that I prefer zsh to bash, but to be quite honest, the most compelling reason is and has always been the enhanced autocompletion. You know it is good when using bash now becomes frustratingly slow in comparison because you can't use `TAB` like you are used to.

The default terminal for most people is bash, but zsh is also usually preinstall. Just run `chsh -s $(which zsh)` to set zsh as your default, and BAM, your life just got better.

zsh becomes x10 nicer when you add the power of [oh-my-zsh.][1] The actual guide for this one is pretty thorough, and I use the default theme, so I'll just leave it at that.
[1]: https://github.com/robbyrussell/oh-my-zsh

And then, on top of all of this, zsh has its own customizable preferences within the .zshrc file. Mine isn't too crazy, but it has the basics plus a few aliases.

##vim setup##

##atom setup##

##sublime setup##
