function recommendationCtrl($scope, $location, $timeout, mainService){
  let selectedGenres = [];
  $scope.hasOne = true;
  $scope.test = "tesdfasdst";
  $scope.loading = false;
  let leftoverMovies = [];
  $scope.rankedMovies = mainService.myRecMoviesByGenre;

  $scope.randomTest = 0;

  $scope.assignRandomTest = function(){
    $scope.randomTest = 1;
    return $scope.randomTest;
  }



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
    $scope.loading = true;
    return mainService.getRecommendationsByGenre(selectedGenres).then(function(response){
      $scope.rankedMovies = response;
      // $scope.loading = false;
      //   $location.path("/recommendations");
      leftoverMovies = $scope.rankedMovies.splice(50);
      $scope.rankedMovies = $scope.rankedMovies.slice(0, 50);
      return $scope.rankedMovies;
    })
  }

  $scope.loadMore = function(){
    for (var i = 0; i < 1; i++) {
      $scope.rankedMovies.push(leftoverMovies[0]);
      leftoverMovies.splice(0, 1);
    }
  }

  $scope.addToRatedOne = function(movie){

    mainService.addToRatedOne(movie);

    for (var i = 0; i < $scope.rankedMovies.length; i++) {
      if(movie._id === $scope.rankedMovies[i]._id){
        $scope.rankedMovies.splice(i, 1);
      }
    }
  }

  $scope.addToRatedTwo = function(movie){

    mainService.addToRatedTwo(movie);

    for (var i = 0; i < $scope.rankedMovies.length; i++) {
      if(movie._id === $scope.rankedMovies[i]._id){
        $scope.rankedMovies.splice(i, 1);
      }
    }
  }

  $scope.addToRatedThree = function(movie){

    mainService.addToRatedThree(movie);

    for (var i = 0; i < $scope.rankedMovies.length; i++) {
      if(movie._id === $scope.rankedMovies[i]._id){
        $scope.rankedMovies.splice(i, 1);
      }
    }
  }

  $scope.addToRatedFour = function(movie){

    mainService.addToRatedFour(movie);

    for (var i = 0; i < $scope.rankedMovies.length; i++) {
      if(movie._id === $scope.rankedMovies[i]._id){
        $scope.rankedMovies.splice(i, 1);
      }
    }
  }

  $scope.addToRatedFive = function(movie){

    mainService.addToRatedFive(movie);
    for (var i = 0; i < $scope.rankedMovies.length; i++) {
      if(movie._id === $scope.rankedMovies[i]._id){
        console.log("remove", movie._id, $scope.rankedMovies[i]._id);
        $scope.rankedMovies.splice(i, 1);
      }
    }
  }

  $scope.addToUnseen = function(movie){
    mainService.addToUnseen(movie);
    for (var i = 0; i < $scope.rankedMovies.length; i++) {
      if(movie._id === $scope.rankedMovies[i]._id){
        $scope.rankedMovies.splice(i, 1);
      }
    }
  }

  $scope.addToWatchlist = function(movie){
    mainService.addToWatchlist(movie);
    // $("span.watchlist").on("click", function(){
    //   let that = this
    //   console.log("fired");
    //   $(this).css("color", "#FC7100");
    //   $(this).parent().siblings("div.added-to-watchlist").fadeIn("slow");
    //   setTimeout(function(){
    //     console.log("help");
    //     $(that).parent().siblings("div.added-to-watchlist").fadeOut("slow");
    //   }, 2000)
    // })
  }


}

module.exports = recommendationCtrl;
