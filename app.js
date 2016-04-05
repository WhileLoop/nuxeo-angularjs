var nuxeoAngularApp = angular.module('NuxeoAngular',['ngRoute']);

nuxeoAngularApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/workspace', {
	    template: 'workspace.html',
        controller: 'DefaultWorkspaceController'
      }).
      when('/workspace/:uid', {
        templateUrl: 'workspace.html',
        controller: 'UserWorkspaceController'
      }).
      when('/create', {
        templateUrl: 'create.html',
        controller: 'CreateDocumentController'
      }).
      otherwise({
        redirectTo: '/workspace'
      });
  }
]);
