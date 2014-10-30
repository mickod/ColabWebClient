/** Main AngularJS Web Application */ 
var app = angular.module('colabVideoServerWebApp', [ 'ngRoute', 'colabConfig']); 

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
app.controller('PageCtrl', function (/*$scope, colabConfig*/) { 
	console.log("Page Controller reporting for duty."); 

	// Activates the Carousel 
	$('.carousel').carousel({
		 interval: 5000 }); 

});

// Controls video list page
app.controller('VideoListCtrl', ['$scope', 'GetUploadedVideosFactory', function ($scope, GetUploadedVideosFactory)  { 
	console.log("VideoList controller"); 
	
	$scope.videoList = [];
	
	// Get the video list from the Colab Server
	GetUploadedVideosFactory.getVideoList().then(function(data) {

		// Should really do some type checking etc here on the returned value
	   	console.dir(data.data);
		
		$scope.videoList = data.data;
	});

}]);

// Controls video test play page
app.controller('VideoPlayTestCtrl', ['$scope', 'colabConfig', function ($scope, colabConfig)  { 
	console.log("VideoList controller"); 
	
	//Set the base URL for the server
	$scope.collabServerBaseURL = colabConfig.colabServerBaseURL;

}]);

/** Factories **/

/* factory to get the video list from the server */
(function() {
  'use strict';
 
  app.factory('GetUploadedVideosFactory', ['$http', 'colabConfig',
    function($http, colabConfig) {
      var _factory = {};
 
      _factory.getVideoList = function() {
        return $http.get(colabConfig.colabServerBaseURL + '/video_list');
      };
 
      return _factory;
    }
  ]);
 
}());


/** Modules **/

/* module for general app config that can be injected as a dependency where needed */
angular.module('colabConfig', [])
  .value('colabConfig', {
	  // Set the base URL for the colab server
	  colabServerBaseURL: 'http://localhost:3000' 
});
