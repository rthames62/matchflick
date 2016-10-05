function dashboardCtrl($scope, mainService){
  $scope.test = "this is a test";
  $scope.getCurrentUser = function(){
      mainService.getCurrentUser().then(function(response){
        $scope.currentUser = response;
        console.log("scope curr user", $scope.currentUser);
        return $scope.currentUser;
      })
  }
  $scope.getCurrentUser();
}

module.exports = dashboardCtrl;
