# Written by paran_son@outlook.com
# updated 190417

# This is server rabbitmq install script
sudo apt update -y

# install rabbitmq-server
sudo apt install rabbitmq-server -y

# setup rabbitmq-server
sudo rabbitmq-plugins enable rabbitmq_management
sudo rabbitmq-plugins enable rabbitmq_mqtt

sudo rabbitmqctl add_user admin yana6728
sudo rabbitmqctl set_user_tags admin administrator
sudo rabbitmqctl set_permissions -p       / admin ".*" ".*" ".*"

sudo rabbitmqctl add_user test1 first
sudo rabbitmqctl set_permissions -p / test1 ".*" ".*" ".*"

sudo rabbitmqctl add_user test2 second
sudo rabbitmqctl set_permissions -p / test2 ".*" ".*" ".*"

sudo rabbitmqctl add_user test3 third
sudo rabbitmqctl set_permissions -p / test3 ".*" ".*" ".*"
