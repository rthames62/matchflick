function dashboardCtrl($scope, mainService){
  $scope.test = "this is a test";
  $scope.getCurrentUser = function(){
    mainService.getCurrentUser().then(function(response){
      $scope.currentUser = response;
      return $scope.currentUser;
    })
  }
  $scope.getCurrentUser();
}

module.exports = dashboardCtrl;
