# Written by paran_son@outlook.com
# updated 190417
#
# Rabbitmq reset and test account settting script
# Caution! RabbitMQ Queue will be deleted.
#
# administrator: admin
# user: test1, test2, test3

echo "###### RESET YOUR RABBITMQ ######"

# reset rabbitmq-server
sudo rabbitmqctl stop_app
sudo rabbitmqctl reset
sudo rabbitmqctl start_app

# setup rabbitmq-server
sudo rabbitmqctl add_user admin qwer1234
sudo rabbitmqctl set_user_tags admin administrator
sudo rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"

sudo rabbitmqctl add_user test1 1234
sudo rabbitmqctl set_permissions -p / test1 ".*" ".*" ".*"

sudo rabbitmqctl add_user test2 1234
sudo rabbitmqctl set_permissions -p / test2 ".*" ".*" ".*"

sudo rabbitmqctl add_user test3 1234
sudo rabbitmqctl set_permissions -p / test3 ".*" ".*" ".*"
