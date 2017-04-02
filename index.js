var app = require('express')();
var http = require('http').Server(app);
var Gpio = require('onoff').Gpio;

var led = new Gpio(12, 'out');
var button1 = new Gpio(21, 'in', 'falling', {debounceTimeout: 0, activeLow: false});
var button2 = new Gpio(20, 'in', 'falling', {debounceTimeout: 0, activeLow: false});
var button3 = new Gpio(16, 'in', 'falling', {debounceTimeout: 0, activeLow: false});

app.get('/', function(req, res) {
	res.send('<h1>Hello world, this is socketboard</h1>');
});

http.listen(1080, function() {
	console.log('hallo! listening on *:1080');
});

var lastButton1 = button1.readSync();
/**
 * CHECKBUTTON 1
 */
function checkButton1(){
	//BUTTON 1
	if(button1.readSync()==0 && lastButton1!=0){
		toggleLed();
		setTimeout(checkButton1, 500);
	}
	else{
		setTimeout(checkButton1, 50);
	}
	lastButton1 = button1.readSync();
}
checkButton1();


/**
 * CHECKBUTTON 2
 */
var lastButton2 = button1.readSync();
function checkButton2(){
	//BUTTON 2
	if(button2.readSync()==0 && lastButton2!=0){
		toggleLed();
		setTimeout(checkButton2, 500);
	}
	else{
		setTimeout(checkButton2, 50);
	}
	lastButton2 = button2.readSync();
}
checkButton2();

/**
 * CHECKBUTTON 3
 */
var lastButton3 = button1.readSync();
function checkButton3(){
	//BUTTON 2
	if(button3.readSync()==0 && lastButton3!=0){
		toggleLed();
		setTimeout(checkButton3, 500);
	}
	else{
		setTimeout(checkButton3, 50);
	}
	lastButton3 = button3.readSync();
}
checkButton3();

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


