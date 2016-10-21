function showMovieRecDetails(){
  return function(scope, element, attrs) {
    $("ul.recommended-movies > li").on("mouseenter", function(){
      $("span.overlay", this).css("visibility", "visible")
    })
    $("ul.recommended-movies > li").on("mouseleave", function(){
      $("span.overlay", this).css("visibility", "hidden")
    })
  };
}

module.exports = showMovieRecDetails;
