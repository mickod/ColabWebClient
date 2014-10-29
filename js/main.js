/** Main AngularJS Web Application */ 
var app = angular.module('colabVideoServerWebApp', [ 'ngRoute' ]); 

/** Configure the Routes */ 
app.config(['$routeProvider', function ($routeProvider) { 
	$routeProvider 
		// Home 
		.when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"}) 
		
		// Pages 
		.when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
		.when("/video_list", {templateUrl: "partials/video_list.html", controller: "PageCtrl"})
		.when("/play_test_video", {templateUrl: "partials/play_test_video.html", controller: "PageCtrl"})
		
		// else 404 
		.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"}); 
}]);


/** Controllers */

// Controls Pages
app.controller('PageCtrl', function (/* $scope, $location, $http */) { 
	console.log("Page Controller reporting for duty."); 
	
	// Activates the Carousel 
	$('.carousel').carousel({
		 interval: 5000 }); 

});

// Controls video list page
app.controller('VideoListCtrl', ['$scope', 'GetUploadedVideosFactory', function ($scope, GetUploadedVideosFactory)  { 
	console.log("VideoList controller"); 
	
	// Get the video list from the Colab Server
	GetUploadedVideosFactory.getVideoList().then(function(data) {
		var _d = data.data;
	    if (typeof _d == 'object') {
	    	//http://stackoverflow.com/a/7220510/1015046//
	        _d = JSON.stringify(_d, undefined, 2);
	    }
	    	console.dir(_d);
	    });
	
    $scope.videoList = [
        {"id": 0, "name": "Video 0"},
        {"id": 1, "name": "Video 1"},
        {"id": 2, "name": "Video 2"},
        {"id": 3, "name": "Video 3"},
        {"id": 4, "name": "Video 4"},
        {"id": 5, "name": "Video 5"},
        {"id": 6, "name": "Video 6"},
        {"id": 7, "name": "Video 7"},
        {"id": 8, "name": "Video 8"}
    ];

}]);

/** Factories **/

/* factory to get the video list from the server */
(function() {
  'use strict';
 
  app.factory('GetUploadedVideosFactory', ['$http',
    function($http) {
      var _factory = {};
 
      _factory.getVideoList = function() {
        return $http.get('/video_list');
      };
 
      return _factory;
    }
  ]);
 
}());
