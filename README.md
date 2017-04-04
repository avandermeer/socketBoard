# socketBoard

Description
-----------
A Raspberry Pi based dashboard/web-application running NodeJS with Socket.io; It receives updates triggered by GPIO events. 

The NodeJS server communicates with GPIO pins using the [onoff library by fivdi](https://github.com/fivdi/onoff). This library provides a watch/interupt method to react upon a button press; However, I had some issues with debouncing, so I wrote my [own wrapper](https://github.com/avandermeer/socketBoard/blob/master/Button.js) that checks for a button press using timeouts. 

![Connections](https://avdm.nl/image/site_portfolio_sb_3.png)
