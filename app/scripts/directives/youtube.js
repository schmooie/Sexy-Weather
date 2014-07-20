'use strict';

angular.module('sexyWeather')
  .directive('youtubePlayer', function($sce) {
    return {
      restrict: 'EA',
      scope: {
        code: '='
      },
      replace: true,
      template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
      link: function(scope) {
        scope.$watch('code', function(newVal) {
          if (newVal === 'tooSexy') {
          	scope.url = '';
          } else {
            scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + newVal + '?autoplay=1&iv_load_policy=3&enablejsapi=1');
          }
        });
      }
    };
  });
