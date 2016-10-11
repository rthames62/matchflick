function loadingCtrl($scope, mainService){
  $scope.loading = function(){
    return mainService.loading();
  }
  $scope.loading();
}

module.exports = loadingCtrl;
