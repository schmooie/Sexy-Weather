'use strict';

angular.module('sexyWeather')
  .factory('utilities', [

    function() {
      var opts = {
        lines: 7,
        length: 0,
        width: 30,
        radius: 10,
        corners: 1,
        rotate: 25,
        direction: 1,
        color: '#ffe8e7',
        speed: 1.2,
        trail: 100,
        shadow: false,
        hwaccel: false,
        className: 'spinner',
        zIndex: 2e9,
        top: '50%',
        left: '50%'
      };

      var targetSpinner = document.getElementById('progress');
      var spinner = new Spinner(opts);


      return {
        kToF: function(k) {
          return Math.floor(k * 1.8 - 459.67);
        },
        inRange: function(min, max, target) {
          return (min <= target) && (target <= max);
        },
        startSpinner: function() {
        	$(targetSpinner).fadeIn('fast');
        	spinner.spin(targetSpinner);
        },
        stopSpinner: function() {
        	$(targetSpinner).fadeOut('fast');
        	spinner.stop();
        }
      };
    }
  ]);
