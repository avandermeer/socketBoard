/**
 * WRAPPER FOR BUTTON FUNCTION WITH ONOFF LIB.
 * Instead of using the watcher, a recursive function is used to check whether the button is pressed.
 * @type {Gpio}
 */

var gpio = require('onoff').Gpio;

class Button {

	/**
	 *
	 * @param pin
	 * @param triggerValue
	 * @param debounceTime
	 * @param waitForRelease
	 */
	constructor(pin, triggerValue, debounceTime=200, waitForRelease=true){
		this.pin=pin;
		this.triggerValue = triggerValue;
		this.debounceTime = debounceTime;
		this.waitForRelease = waitForRelease;
		this.gpio = new gpio(pin, 'in', (triggerValue==1?'rising':'falling') );
		this.lastValue = this.gpio.readSync();

	}

	/**
	 *
	 * @param callback
	 */
	checkButton(callback){
		var self = this;
		if(this.gpio.readSync()==0 && this.checkWaitForRelease()){
			callback();
			setTimeout(function(){self.checkButton(callback)}, this.debounceTime);
		}
		else{
			setTimeout(function(){self.checkButton(callback)}, 100);
		}
		this.lastValue = this.gpio.readSync();
	}

	/**
	 *
	 * @returns {boolean}
	 */
	checkWaitForRelease(){
		if(!this.waitForRelease){
			return true;
		}
		else{
			return this.lastValue!=this.triggerValue;
		}
	}


}

module.exports = Button;