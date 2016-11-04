function loadingCtrl($scope, mainService){
  console.log("hi");
  $scope.loading = function(){
    return mainService.loading();
  }
  $scope.test = "hi";
  $scope.getFbCurrentUser = function(){
    console.log("from loadingctrl");
      mainService.getFbCurrentUser().then(function(response){
        $scope.currentUser = response;
        return $scope.currentUser;
      })
  }

  $scope.getFbCurrentUser();
  $scope.loading();
}

module.exports = loadingCtrl;
