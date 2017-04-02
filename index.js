var app = require('express')();
var http = require('http').Server(app);
var gpio = require('onoff').Gpio;

const Button = require('./Button');

var led = new gpio(12, 'out');

var button1 = new Button(21, 0);
var button2 = new Button(20, 0);
var button3 = new Button(16, 0);

app.get('/', function(req, res) {
	res.send('<h1>Hello world, this is socketboard</h1>');
});

http.listen(1080, function() {
	console.log('hallo! listening on *:1080');
});

/**
 * BUTTON 1 ACTION
 */
button1.checkButton(function() {
	console.log('button1 pressed');
	toggleLed();
});

/**
 * BUTTON 2 ACTION
 */
button2.checkButton(function() {
	console.log('button2 pressed');
	toggleLed();
});

/**
 * BUTTON 3 ACTION
 */
button3.checkButton(function() {
	console.log('button3 pressed');
	toggleLed();
});

/**
 * TOGGLE LED
 */
function toggleLed() {
	var ledVal = led.readSync();
	if(ledVal == 1) {
		led.writeSync(0)
	}
	else {
		led.writeSync(1)
	}
}


