angular.module('socketBoardApp', [])
	.controller('MainController', ['$scope', function(vm) {
		vm.pizza = "lekker"
		vm.socket = io();
		vm.buttonData = {
			1: 0,
			2: 0,
			3: 0
		};
		vm.socket.on('button_press', function(data) {
			console.log(data);
			vm.buttonData = data;
			vm.$apply();
		});
	}])
