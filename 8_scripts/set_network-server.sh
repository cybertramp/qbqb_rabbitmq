IP="10.0.0.10/24"
hostnamectl set-hostname server
service network-manager stop
touch /etc/netplan/02-init.yaml

cat << EOF > "/etc/netplan/02-init.yaml"
network:
    ethernets:
        ens33:
            addresses: [$IP]
            dhcp4: no
    version: 2
EOF

netplan apply
service network-manager restart

echo "Network setting finished!"
