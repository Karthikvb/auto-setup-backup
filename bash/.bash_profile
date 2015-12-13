
[[ -s "$HOME/.profile" ]] && source "$HOME/.profile" # Load the default .profile

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

if [ -x /usr/bin/keychain ]; then
      /usr/bin/keychain --quiet --clear $HOME/.ssh/id_rsa
fi`
