'use strict';

angular.module('sexyWeather')
  .controller('MainCtrl', ['$scope', '$http', '$q', '$timeout', 'utilities',
    function($scope, $http, $q, $timeout, utilities) {
      $scope.whens = [
        'today',
        'tomorrow',
        'this week'
      ];

      $scope.response = {
        when: 'today',
        where: 'New York'
      };
      $scope.subline = 'For example: <em>New York</em> or <em>River Edge</em>';
      $scope.isSexy = 0;
      $scope.cityNotFound = false;
      $scope.sexyVideo = null;

      var fetchWeather = function(url, days) {
        var res = [];
        var deferred = $q.defer();
        $http.get(url).success(function(data) {
          if (data.cod === '404') {
          	deferred.reject(data.message);
          } else {
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
          }

        })
          .error(function(error) {
            console.log(error);
          });
        return deferred.promise;
      };

      var makeEndPoint = function(daily, location) {
        var endpoint = 'http://api.openweathermap.org/data/2.5/',
          secret = '&APPID=e464e0c345e366e776a6e248c5428112';
        if (daily) {
          return endpoint + 'forecast/daily?q=' + location + '&cnt=7&mode=json' + secret;
        } else {
          return endpoint + 'weather?q=' + location + secret;
        }
      };

      $scope.tooSexy = function() {
        $scope.isSexy = 0;
        $scope.sexyVideo = 'tooSexy';
      };

      $scope.getWeather = function() {
        utilities.startSpinner();
        var response = $scope.response,
          finalEndPoint = '',
          days = 0;

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
        $scope.isSexy = 0;

        fetchWeather(finalEndPoint, days)
          .then(function(weatherArr) {
              utilities.stopSpinner();
              if (days === 2) {
                if (utilities.inRange(weatherArr[0].min, weatherArr[0].max, 69)) {
                  $scope.isSexy = 2;
                  $scope.sexyVideo = '39YUXIKrOFk';
                } else {
                  $scope.isSexy = 1;
                }
              } else {
                weatherArr.forEach(function(el) {
                  if (utilities.inRange(el.min, el.max, 69)) {
                    $scope.isSexy = 2;
                    $scope.sexyVideo = '39YUXIKrOFk';
                  }
                });
                if ($scope.isSexy !== 2) {
                  $scope.isSexy = 1;
                }
              }
            },
            function(error) {
            	utilities.stopSpinner();
              console.log(error);
              $scope.cityNotFound = true;
              $timeout(function(){
              	$scope.cityNotFound = false;
              }, 2000);
            });
      };
    }
  ]);
