'use strict';

angular.module('sexyWeather')
  .factory('utilities',[ function(){
    return {
      kToF: function (k) {
        return Math.floor(k * 1.8 - 459.67);
      },
      inRange: function (min, max, target) {
        return (min <= target) && (target <= max);
      }
    };
  }]);