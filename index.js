var express = require('express');
var app = express();
var http = require('http').Server(app);
var gpio = require('onoff').Gpio;
var io = require('socket.io')(http);

const Button = require('./Button');

var led = new gpio(12, 'out');

var button1 = new Button(21, 0);
var button2 = new Button(20, 0);
var button3 = new Button(16, 0);

var buttonCounter = {
	1: 0,
	2: 0,
	3: 0
}

/*
 Config Server
 */
app.use(express.static(__dirname + '/public')); //this will be the static directory
app.get('/', function(req, res, next){
	res.sendFile(__dirname + '/public/index.html');
});


http.listen(1080, function() {
	console.log('socketBoard server started; listening on *:1080');
});


/*
config socket
 */

io.on('connection', function(socket){
	console.log('new user connected');
	io.emit('button_press', buttonCounter);
});



/**
 * BUTTON 1 ACTION
 */
button1.checkButton(function() {
	toggleLed();
	updateButtonPress(1);
});

/**
 * BUTTON 2 ACTION
 */
button2.checkButton(function() {
	updateButtonPress(2);
	toggleLed();
});

/**
 * BUTTON 3 ACTION
 */
button3.checkButton(function() {
	updateButtonPress(3);
	toggleLed();
});


function updateButtonPress(buttonId){
	buttonCounter[buttonId] ++;
	io.emit('button_press', buttonCounter);
}

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


