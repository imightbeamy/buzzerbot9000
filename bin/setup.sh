# Install DNS update cron

config() {
    node bin/get_config.js $1
}

DDNS_TIME="1,6,11,16,21,26,31,36,41,46,51,56 * * * * sleep 43"
DDNS_KEY=$(config freedns_key)
DDNS_CMD="wget -O - http://freedns.afraid.org/dynamic/update.php?$DDNS_KEY"
DDNS_CRON="$DDNS_TIME ; $DDNS_CMD >> /home/pi/DNS.log 2>&1 &"

echo "Initing DDNS and adding DDNS cron to crontab:"
echo "$DDNS_CMD"
$DDNS_CMD
crontab -l | sed "/$DDNS_KEY/d" > temp_cron
echo "$DDNS_CRON" >> temp_cron
crontab temp_cron
rm temp_cron

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

echo "#! /bin/bash\n" "$VARS" "$(cat initd_tpl.sh)" > buzzerbot_init.sh
chmod +x buzzerbot_init.sh
sudo mv buzzerbot_init.sh /etc/init.d/
sudo update-rc.d buzzerbot_init.sh defaults

ls -l /etc/init.d/buzzerbot_init.sh
echo "Installed init.d, logging to $OUT"
