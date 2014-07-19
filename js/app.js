angular.module('sexyWeather', ['nlForm'])
	.controller('MainCtrl', ['$scope', function($scope){
		$scope.whens = [
			'today',
			'tomorrow',
			'this week'
		];

		$scope.response = {
			when: 'today',
			where: 'New York'
		};

		$scope.subline = "For example: <em>New York</em> or <em>10005</em>";

		$scope.getWeather = function () {
			console.log($scope.when, $scope.location);
		};
	}]);