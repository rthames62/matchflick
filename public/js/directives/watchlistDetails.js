 function watchlistDetails(){
  return function(scope, element, attrs) {

  $("li.movie-poster").on("mouseenter", function(){
    $("span.overlay", this).css("visibility", "visible")
  })
  $("li.movie-poster").on("mouseleave", function(){
    $("span.overlay", this).css("visibility", "hidden")
  })


  }
}
module.exports = watchlistDetails;
