function addToWatchlist(){
  return function(scope, element, attrs) {
    $("span.watchlist").on("click", function(){
      let that = this
      console.log("fired");
      $(this).css("color", "#FC7100");
      $(this).parent().siblings("div.added-to-watchlist").fadeIn("slow");
      setTimeout(function(){
        console.log("help");
        $(that).parent().siblings("div.added-to-watchlist").fadeOut("slow");
      }, 4000)
    })
  }
}

module.exports = addToWatchlist;
