var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope', '$http',
	function($scope,$http) {
		$scope.remove = function() {
			$http.delete('/book/' + $scope.id).success(function(response) {
				var url = location.origin + '/books';
				window.location.assign(url);
			});
		};
}]);
