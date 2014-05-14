Buzzerbot 9000
===========

Source code for the Raspi/twilio/node robot that opens the door to my apartment building.

![buzzerbot](images/buzzerbot.png)

## Installing

Checkout this repo, and run npm install:

    git clone https://github.com/imightbeamy/buzzerbot9000.git
    cd buzzerbot9000
    npm install

This will install the needed node modules.

You'll also need to install and use [gpio-admin](https://github.com/quick2wire/quick2wire-gpio-admin):

    git clone https://github.com/quick2wire/quick2wire-gpio-admin.git
    cd quick2wire-gpio-admin
    make
    sudo make install

Add yourself to the gpio group:

    sudo adduser $USER gpio

If you're correctly in the group, you should see `gpio` when you run:

    groups

Under [bin](/bin) you'll find a script to install a cron to update a DDNS with [freedns](https://freedns.afraid.org/) and a script to install an init.d script to start the server on restart.
If you're following the tutorial you'll run those later.

## Setup

[Check out the how-to](how_to.md) for more detailed instructions and hardware set up.

My Raspberry pi running this connected to my apartment buzzer.
([More pics](https://github.com/imightbeamy/buzzerbot9000/blob/master/how_to.md#extra-pictures))

![hardware](images/hardware.jpg)
