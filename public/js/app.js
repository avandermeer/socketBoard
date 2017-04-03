require('./bootstrap');

angular.module('socketBoardApp', ['ngAnimate'])

	.controller('MainController', ['$scope', function(vm) {

		vm.socket = io();

		//init buttondata
		vm.buttonData = {
			1: 0,
			2: 0,
			3: 0
		};

		vm.socket.on('button_press', function(data) {
			vm.oldButtonData = angular.copy(vm.buttonData);
			vm.$apply(); //to trigger readding 'run' class

			angular.forEach(data, function(val, key) {
				if(val != vm.buttonData[key]) {
					//update only updated value, for triggering the animation
					vm.buttonData[key] = val;
				}
			});

			vm.$apply(); //apply scope change
		});

		vm.$watchCollection('buttonData', function(newVal, oldVal) {
			vm.oldButtonData = oldVal;

		});

	}])
