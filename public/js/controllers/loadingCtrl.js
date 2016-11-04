function loadingCtrl($scope, mainService){
  // $scope.loading = function(){
  //   return mainService.loading();
  // }
  $scope.userLoaded = mainService.userLoaded;

  $scope.test = "hi";
  $scope.getFbCurrentUser = function(){
      mainService.getFbCurrentUser().then(function(response){
        $scope.currentUser = response;
        return $scope.currentUser;
      })
  }

  $scope.$watch('userLoaded', function(newValue, oldValue){
    console.log(newValue, oldValue);
    if($scope.userLoaded.length > 0){
      console.log("time to roll, TINY RICK");
    }
  }, true)

  $scope.getFbCurrentUser();
  // $scope.loading();
}

module.exports = loadingCtrl;
