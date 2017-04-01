var app = require('express')();
var http = require('http').Server(app);
var Gpio = require('onoff').Gpio;

var led = new Gpio(21, 'out');
var button = new Gpio(20, 'in', 'rising', {debounceTimeout: 1000});

app.get('/', function(req, res) {
	res.send('<h1>Hello world, this is socketboard</h1>');
});

http.listen(1080, function() {
	console.log('hallo! listening on *:1080');
});

button.watch(function(err, value) {
	console.log('button pressed', value)
	var ledVal = led.readSync();
	console.log('read ledval', ledVal)
	if(ledVal == 1) {
		led.writeSync(0)
	}
	else {
		led.writeSync(1)
	}

});



