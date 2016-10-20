function recommendationsCtrl($scope, mainService){
  let selectedGenres = [];
  $scope.hasOne = true;

  $scope.selectGenre = function(genre, id){
    if($scope[genre] === "genre-selected"){
      $scope[genre] = "";
      let index = selectedGenres.indexOf(id);
      selectedGenres.splice(index, 1);
    } else {
      $scope[genre] = "genre-selected";
      selectedGenres.push(id);
    }
    if(selectedGenres.length > 0){
      $scope.hasOne = false;
    } else {
      $scope.hasOne = true;
    }
    return $scope[genre];
  }

  $scope.getRecommendationsByGenre = function(){
    mainService.getRecommendationsByGenre(selectedGenres).then(function(response){
      console.log("response from ctrl", response);
    })
  }

}

module.exports = recommendationsCtrl;
