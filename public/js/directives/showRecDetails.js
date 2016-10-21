function showRecDetails(){
  return function(scope, element, attrs) {
    $("span.movie-details").on("click", function(){
      $(this).parent().siblings("#show-rec-details").children("div.movie-details").fadeIn("fast", function(){

      })
    })
    $("span.close-details").on("click", function(){
      $("div.movie-details").fadeOut("fast", function(){

      })
    })
    $("a#play-trailer").on("click", function(){
      $("div.trailer-modal").fadeIn("fast", function(){

      })
    })
    $("span#close-trailer").on("click", function(){
      $("div.trailer-modal").fadeOut("fast", function(){

      })
    })
  };
}

module.exports = showRecDetails;
