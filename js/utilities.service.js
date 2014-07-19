angular.module('sexyWeather')
  .factory('utilities',[ function(){
  	return {
  		kToF: function (k) {
  			return Math.floor(k * 1.8 - 459.67);
  		}
  	};
  }]);