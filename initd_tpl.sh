#! /bin/bash

case "$1" in

start)
	echo "starting server in: $SERVER_DIR"
	cd $SERVER_DIR
	sudo -u $USER $NODE server.js >> $OUT 2>>$OUT &
	;;

stop)
	killall $NODE
	;;

restart)
	killall $NODE
	echo "starting server in: $SERVER_DIR"
	cd $SERVER_DIR
	sudo -u $USER $NODE server.js >> $OUT 2>>$OUT &
	;;
	
*)
	echo "usage: $0 (start|stop|restart)"
esac

exit 0
