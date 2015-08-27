var app = angular.module('myApp', []);

var apiKey = 'MDIwMzA5MzkzMDE0NDA2ODU1MDkxNTNmMQ001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerController', function($scope, $http) {
    $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    }).success(function(data, status) {
    // Now we have a list of the stories (data.list.story)
    // in the data object that the NPR API 
    // returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...
        $scope.programs = data.list.story;
    }).error(function(data, status) {
        console.log('error');
    });
});

app.directive('nprLink', function() {
    return {
        restrict: 'EA',
        require: ['^ngModel'],
        replace: true,
        scope: {
          ngModel: '=',
          play: '&'
        },
        templateUrl: '/views/nprListItem.html',
        link: function(scope, ele, attr) {
          scope.duration = scope.ngModel.audio[0].duration.$text;
        }
    }
});

app.controller('PlayerController', ['$scope', function ($scope) {
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = '';
    $scope.play = function(program) {
        if ($scope.playing) $scope.audio.pause();
        var url = program.audio[0].format.mp4.$text;
        audio.src = url;
        audio.play();
        // Store the state of the player as playing
        $scope.playing = true;
    }
    $scope.stop = function () {
    	$scope.audio.pause();
    	$scope.playing = false;
    };
    $scope.audio.addEventListener('ended', function () {
    	$scope.$apply(function () {
    		$scope.stop();
    	});
    });
}]);

app.controller('RelatedController', ['$scope', function ($scope) {

}]);