function showMovieDetails(){
  return function(scope, element, attrs) {
    $("span.movie-details").on("click", function(){
      $("div.movie-details").slideDown("fast", function(){

      })
    })
    $("span.close-details").on("click", function(){
      $("div.movie-details").slideUp("fast", function(){

      })
    })
  };
}

module.exports = showMovieDetails;
