var app = angular.module('socialBaseApp', ['ngRoute']);



app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getMessages = function(){
        return $http.get(serviceBase + 'messages');
    }
    
    obj.insertMessage = function (message) {
    return $http.post(serviceBase + 'insertMessage', message);
	};

	return obj;   
}]);

app.controller('listCtrl', function ($scope, $location, services) {

    var loadMessages = function () {
      services.getMessages().success(function (data) {
        $scope.messages = data;
      });
    };

    $scope.saveMessage = function(message) {

        services.insertMessage(message).success(function(){
            delete $scope.message;
        $scope.myForm.$setPristine();
        loadMessages();
        });
        
    
    }

    loadMessages();

});


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'Mensagens',
        templateUrl: 'views/listMessages.html',
        controller: 'listCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);