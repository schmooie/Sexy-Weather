var app = angular.module('sexyWeather', ['nlForm']);

app.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('MainCtrl', ['$scope', '$http', '$q', 'utilities', function ($scope, $http, $q, utilities) {
	$scope.whens = [
		'today',
		'tomorrow',
		'this week'
	];

	$scope.response = {
		when: 'today',
		where: 'New York'
	};

	$scope.subline = "For example: <em>New York</em> or <em>River Edge</em>";
	$scope.isSexy = false;

	var makeEndPoint = function (daily, location) {
		var endpoint = 'http://api.openweathermap.org/data/2.5/',
				apiKey = '&APPID=e464e0c345e366e776a6e248c5428112';
		if (daily) {
			return endpoint + 'forecast/daily?q=' + location + '&cnt=7&mode=json' + apiKey;
		} else {
			return endpoint + 'weather?q=' + location + apiKey;
		}
	};

	var fetchWeather = function (url, days) {
		var res = [];
		$http.get(url).success(function(data) {
			if (days > 1) {
				data.list.forEach(function(el){
					res.push({
						min:utilities.kToF(el.temp.min),
						max: utilities.kToF (el.temp.max)
					});
				});
			} else {
				res.push({
					min:utilities.kToF(data.main.temp_min),
					max: utilities.kToF(data.main.temp_max),
					now: utilities.kToF(data.main.temp)
				});
			}
			console.log(res);
			return res;
		});
	};

	$scope.getWeather = function () {
		var response = $scope.response,
				finalEndPoint = '',
				days = 0,
				weatherData;
		var deferred = $q.defer();

		if (response.when === 'today') {
			finalEndPoint = makeEndPoint(false, response.where);
			days = 1;
		} else if (response.when === 'tomorrow') {
			finalEndPoint = makeEndPoint(true, response.where);
			days = 2;
		} else if (response.when === 'this week') {
			finalEndPoint = makeEndPoint(true, response.where);
			days = 7;
		}

		deferred.resolve(fetchWeather(finalEndPoint, days));

		console.log(deferred.promise);
		deferred.promise.then(function(data){
			console.log(data);
		});


	};
}]);
