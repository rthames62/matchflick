function loadingCtrl($scope, mainService){
  // $scope.loading = function(){
  //   return mainService.loading();
  // }
  $scope.userLoaded = false;

  $scope.test = "hi";
  $scope.getFbCurrentUser = function(){
      mainService.getFbCurrentUser().then(function(response){
        $scope.currentUser = response;
        $scope.userLoaded = true;
        return $scope.currentUser;
      })
  }

  $scope.$watch('userLoaded', function(newValue, oldValue){
    console.log("hello from watch");
    console.log(newValue, oldValue);
    if($scope.userLoaded){
      console.log("time to roll, TINY RICK");
    }
  }, true)

  $scope.getFbCurrentUser();
  // $scope.loading();
}

module.exports = loadingCtrl;
