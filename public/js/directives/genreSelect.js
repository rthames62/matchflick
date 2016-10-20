function genreSelect(){
  return function(scope, element, attrs) {
      $("div.genre").click(function(){
        console.log("clicked");
          $(this).toggleClass("genre-selected");
      })
  };
}

module.exports = genreSelect;
