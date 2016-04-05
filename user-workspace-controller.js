nuxeoAngularApp.controller("UserWorkspaceController", function($scope, $http, $routeParams) {

  $scope.isFolderish = function(entry) {
    var facets = entry['facets'];
    var l = facets.length;
    for (var i = 0; i < l; i++) {
      if (facets[i] == 'Folderish')
        return true;
    }
    return false;
  }

  $scope.stepIn = function() {

  }

  $scope.download = function() {

  }

  var getFiles = function(uid) {
    $http({
      method: 'POST',
      url: '/nuxeo/site/automation/Document.Query',
      headers: {
        'Content-Type': 'application/json+nxrequest; charset=UTF-8',
        'Accept': 'application/json+nxentity, */*'
      },
      data: '{"params":{"query":"SELECT * FROM Document WHERE ecm:parentId = \\"' + uid + '\\" AND ecm:mixinType != \\"HiddenInNavigation\\" AND ecm:isProxy = 0 AND ecm:isCheckedInVersion = 0 AND ecm:currentLifeCycleState != \\"deleted\\""},"context":{}}',
    })
    .success(function(data, status, headers, config) {
      $scope.files = data;
    })
  }

  var getDefaultWorkspace = function() {
    $http({
      method: 'GET',
      url: '/nuxeo/api/v1/path/default-domain',
      headers: {
        'Content-Type': 'application/json+nxrequest; charset=UTF-8',
        'Accept': 'application/json+nxentity, */*'
      }
    }).success(function(data, status, headers, config) {
      $scope.workspace = data;
    }).then(function(result) {
      var uid = $scope.workspace['uid'];
      getFiles(uid);
    })
  }

  var getWorkspace = function(uid) {
    $http({
      method: 'GET',
      url: '/nuxeo/api/v1/id/' + uid,
      headers: {
        'Content-Type': 'application/json+nxrequest; charset=UTF-8',
        'Accept': 'application/json+nxentity, */*'
      }
    }).success(function(data, status, headers, config) {
      $scope.workspace = data;
    }).then(function(result) {
      var uid = $scope.workspace['uid'];
      getFiles(uid);
    })
  }

  var init = function() {
    var encoded = window.btoa('Administrator' + ':' + 'Administrator');
    $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
    if ($routeParams.uid == -1)
      getDefaultWorkspace();
    else
      getWorkspace($routeParams.uid);
  }
  init();
});
