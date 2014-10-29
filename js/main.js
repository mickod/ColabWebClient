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
