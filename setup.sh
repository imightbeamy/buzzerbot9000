# Install DNS update cron
function config {
    node get_config.js $1
}

DDNS_KEY=$(config freedns_key)
DDNS_CRON="1,6,11,16,21,26,31,36,41,46,51,56 * * * * sleep 43"
DDNS_CRON="$DDNS_CRON ; wget -O - http://freedns.afraid.org/dynamic/update.php?$DDNS_KEY"
DDNS_CRON="$DDNS_CRON >> /tmp/DNS.log 2>&1 &"

echo "Adding DDNS cron to crontab:"
echo "$DDNS_CRON"
crontab -l > temp_cron
echo "$DDNS_CRON" >> temp_cron
crontab temp_cron
rm temp_cron