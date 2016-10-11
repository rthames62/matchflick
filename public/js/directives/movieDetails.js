function movieDetails(){
  return function(scope, element, attrs) {
    $("div.movie-poster").on("mouseenter", function(){
      console.log("entered");
      $("span.overlay").css("visibility", "visible")
    })
    $("div.movie-poster").on("mouseleave", function(){
      console.log("left");
      $("span.overlay").css("visibility", "hidden")
    })
  };
}

module.exports = movieDetails;
