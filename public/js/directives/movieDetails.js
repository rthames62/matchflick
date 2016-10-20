function movieDetails(){
  return function(scope, element, attrs) {
    $("div.movie-poster").on("mouseenter", function(){
      $("span.overlay").css("visibility", "visible")
    })
    $("div.movie-poster").on("mouseleave", function(){
      $("span.overlay").css("visibility", "hidden")
    })
  };

  $("li.movie-poster").on("mouseenter", function(){
    console.log("enter");
    $("span.overlay", this).css("visibility", "visible")
  })
}

module.exports = movieDetails;
