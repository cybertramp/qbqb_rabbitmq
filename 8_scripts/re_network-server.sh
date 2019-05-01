#### re connect internet
service network-manager stop
rm -f /etc/netplan/02-init.yaml
netplan apply
service network-manager start
