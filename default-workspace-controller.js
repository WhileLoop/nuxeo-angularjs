nuxeoAngularApp.controller("DefaultWorkspaceController", function($scope, $http, $location) {
  var getDefaultWorkspace = function() {
    $http({
      method: 'GET',
      url: '/nuxeo/api/v1/path/default-domain',
      headers: {
        'Content-Type': 'application/json+nxrequest; charset=UTF-8',
        'Accept': 'application/json+nxentity, */*'
      }
    }).success(function(data, status, headers, config) {
	    $location.path('workspace/' + data['uid']);
    })
  }
  getDefaultWorkspace();
})
