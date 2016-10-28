function genreSelect(){
  return function(scope, element, attrs) {
      $("div.genre").click(function(){
          $(this).toggleClass("genre-selected");
      })
  };
}

module.exports = genreSelect;
