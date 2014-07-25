'use strict';

angular.module('sexyWeather')
  .factory('Weather', ['$http', '$q',
    function($http, $q) {
      var endpoint = 'http://api.openweathermap.org/data/2.5/';
      var secret = '&APPID=e464e0c345e366e776a6e248c5428112';
      var kToF = function(k) {
        return Math.floor(k * 1.8 - 459.67);
      };

      return {
        makeEndPoint: function(daily, location) {
          if (daily) {
            return endpoint + 'forecast/daily?q=' + location + '&cnt=7&mode=json' + secret;
          } else {
            return endpoint + 'weather?q=' + location + secret;
          }
        },
        fetch: function(url, days) {
          var res = [];
          var deferred = $q.defer();
          $http.get(url).success(function(data) {
            if (data.cod === '404') {
              deferred.reject(data.message);
            } else {
              if (days > 1) {
                data.list.forEach(function(el) {
                  res.push({
                    min: kToF(el.temp.min),
                    max: kToF(el.temp.max)
                  });
                });
              } else {
                res.push({
                  min: kToF(data.main.temp_min),
                  max: kToF(data.main.temp_max),
                  now: kToF(data.main.temp)
                });
              }
              deferred.resolve(res);
            }
          })
            .error(function(error) {
              console.log(error);
            });
          return deferred.promise;
        }
      };
    }
  ]);
