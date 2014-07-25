'use strict';

angular.module('sexyWeather')
  .controller('MainCtrl', ['$scope', '$timeout', 'Spinner', 'Weather',
    function($scope, $timeout, Spinner, Weather) {
      var inRange = function(min, max, target) {
        return (min <= target) && (target <= max);
      };
      var rightSaidFred = '39YUXIKrOFk';

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

      $scope.tooSexy = function() {
        $scope.isSexy = 0;
        $scope.sexyVideo = 'tooSexy';
      };

      $scope.getWeather = function() {
        var location = $scope.response.where;
        var period = $scope.response.when;
        var epOptions = {
          'today': [false, location, 1],
          'tomorrow': [true, location, 2],
          'this week': [true, location, 7]
        };
        var finalEndPoint = Weather.makeEndPoint(epOptions[period][0], epOptions[period][1]);
        var days = epOptions[period][2];
        $scope.isSexy = 0;

        Spinner.startSpinner();

        Weather.fetch(finalEndPoint, days)
          .then(function(weatherArr) {
              Spinner.stopSpinner();
              if (days === 2) {
                if (inRange(weatherArr[0].min, weatherArr[0].max, 69)) {
                  $scope.isSexy = 2;
                  $scope.sexyVideo = rightSaidFred;
                } else {
                  $scope.isSexy = 1;
                }
              } else {
                weatherArr.forEach(function(el) {
                  if (inRange(el.min, el.max, 69)) {
                    $scope.isSexy = 2;
                    $scope.sexyVideo = rightSaidFred;
                  }
                });
                if ($scope.isSexy !== 2) {
                  $scope.isSexy = 1;
                }
              }
            },
            function() {
              Spinner.stopSpinner();
              $scope.cityNotFound = true;
              $timeout(function() {
                $scope.cityNotFound = false;
              }, 2000);
            });
      };
    }
  ]);