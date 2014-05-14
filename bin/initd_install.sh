# Install initd script to run buzzer bot server on start up

NODE=`which node`
SERVER_DIR=`pwd`
USER=`whoami`
OUT=/home/pi/buzzerbot.log

VARS=$( cat <<EOF
NODE=$NODE
SERVER_DIR=$SERVER_DIR
USER=$USER
OUT=$OUT
EOF
)

echo -e "#! /bin/bash\n$VARS" "$(cat initd_tpl.sh)" > buzzerbot_init.sh
chmod +x buzzerbot_init.sh
sudo mv buzzerbot_init.sh /etc/init.d/
sudo update-rc.d buzzerbot_init.sh defaults

ls -l /etc/init.d/buzzerbot_init.sh
echo "Installed init.d, logging to $OUT"
