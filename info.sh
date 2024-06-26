cat /etc/os-release | grep -w "NAME" | cut -d= -f2 | tr -d '"'

lsb_release -d | cut -f2
