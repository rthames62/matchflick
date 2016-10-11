function trashMovie(){
  return function(scope, element, attrs) {
      $("ul.top-five-results li").on("mouseenter", function(){
        $("span.remove-from-top-five", this).css("visibility", "visible")
      })
      $("ul.top-five-results li").on("mouseleave", function(){
        $("span.remove-from-top-five", this).css("visibility", "hidden")
      })
  };
}

module.exports = trashMovie;
