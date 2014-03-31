# Install DNS update cron
function config {
    node get_config.js $1
}

DDNS_TIME="1,6,11,16,21,26,31,36,41,46,51,56 * * * * sleep 43"
DDNS_KEY=$(config freedns_key)
DDNS_CMD="wget -O - http://freedns.afraid.org/dynamic/update.php?$DDNS_KEY"
DDNS_CRON="$DDNS_TIME ; $DDNS_CMD >> /tmp/DNS.log 2>&1 &"

echo "Initing DDNS and adding DDNS cron to crontab:"
echo "$DDNS_CMD"
$DDNS_CMD
crontab -l > temp_cron
echo "$DDNS_CRON" >> temp_cron
crontab temp_cron
rm temp_cron