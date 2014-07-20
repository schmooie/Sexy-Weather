'use strict';

angular.module('sexyWeather')
  .controller('MainCtrl', ['$scope', '$http', '$q', 'utilities',
    function($scope, $http, $q, utilities) {
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

      var makeEndPoint = function(daily, location) {
        var endpoint = 'http://api.openweathermap.org/data/2.5/',
          apiKey = '&APPID=e464e0c345e366e776a6e248c5428112';
        if (daily) {
          return endpoint + 'forecast/daily?q=' + location + '&cnt=7&mode=json' + apiKey;
        } else {
          return endpoint + 'weather?q=' + location + apiKey;
        }
      };

      var fetchWeather = function(url, days) {
        var res = [];
        var deferred = $q.defer();
        $http.get(url).success(function(data) {
          if (days > 1) {
            data.list.forEach(function(el) {
              res.push({
                min: utilities.kToF(el.temp.min),
                max: utilities.kToF(el.temp.max)
              });
            });
          } else {
            res.push({
              min: utilities.kToF(data.main.temp_min),
              max: utilities.kToF(data.main.temp_max),
              now: utilities.kToF(data.main.temp)
            });
          }
          deferred.resolve(res);
        });
        return deferred.promise;
      };

      $scope.getWeather = function() {
        var response = $scope.response,
          finalEndPoint = '',
          days = 0,
          weatherData;

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

        fetchWeather(finalEndPoint, days).then(function(weatherArr) {
          console.log(weatherArr);
          $scope.isSexy = false;
          if (days === 2) {
            if (utilities.inRange(weatherArr[0].min, weatherArr[0].max, 69)) {
              $scope.isSexy = true;
            }
          } else {
            weatherArr.forEach(function(el) {
              if (utilities.inRange(el.min, el.max, 69)) {
                $scope.isSexy = true;
              }
            });
          }
          console.log($scope.isSexy);
        });
      };
    }
  ]);
