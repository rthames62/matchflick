function movieDetails(){
  return function(scope, element, attrs) {
    $("div.movie-poster").on("mouseenter", function(){
      $("span.overlay").css("visibility", "visible")
    })
    $("div.movie-poster").on("mouseleave", function(){
      $("span.overlay").css("visibility", "hidden")
    })
  };
}

module.exports = movieDetails;
