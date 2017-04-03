require('./bootstrap');

angular.module('socketBoardApp', [])
	.controller('MainController', ['$scope', function(vm) {

		vm.socket = io();

		//init buttondata
		vm.buttonData = {
			1: 0,
			2: 0,
			3: 0
		};

		vm.newButtonData = {
			1: 0,
			2: 0,
			3: 0
		};

		vm.socket.on('button_press', function(data) {
			console.log(data);
			vm.newButtonData = angular.copy(vm.buttonData);

			vm.newButtonData.forEach(function(val, key){
				if(val != vm.buttonData[key] ){
					//add animation
				}
			});

			vm.buttonData = data;
			vm.$apply();
		});

		vm.$watchCollection('buttonData', function(newVal, oldVal) {
			vm.oldButtonData = oldVal;

		});

	}])
