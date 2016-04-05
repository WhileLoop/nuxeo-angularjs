nuxeoAngularApp.controller("CreateDocumentController", function($scope, $http) {
  $scope.createDocument = function() {
    var encoded = window.btoa('Administrator' + ':' + 'Administrator');
    $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
    $http({
      method: 'POST',
      url: '/nuxeo/api/v1/path/default-domain',
      data: { "entity-type": "document", "name": $scope.fileName, "type": "File","properties": { "dc:title": $scope.fileTitle, "dc:description": $scope.fileDescription, "common:icon": "/icons/file.gif", "common:icon-expanded": null, "common:size": null}} ,
    }).success(function(data, status, headers, config) {
      window.alert('Document successfully created.')
    }).error(function(data, status, headers, config) {
      window.alert('Yikes! Something went wrong.')
    });
  }
});
