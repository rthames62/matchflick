function ratings(){
  return function(scope, element, attrs) {
      $("a#rateOne").on("mouseenter", function(){
        $(this).children().addClass("rate-color");
      })
      $("a#rateOne").on("mouseleave", function(){
        $(this).children().removeClass("rate-color");
      })


      $("a#rateTwo").on("mouseenter", function(){
        $(this).parent().siblings().children("a#rateOne").children().addClass("rate-color");
        $(this).children().addClass("rate-color");
      })
      $("a#rateTwo").on("mouseleave", function(){
        $(this).parent().siblings().children("a#rateOne").children().removeClass("rate-color");
        $(this).children().removeClass("rate-color");
      })


      $("a#rateThree").on("mouseenter", function(){
        $(this).parent().siblings().children("a#rateOne").children().addClass("rate-color");
        $(this).parent().siblings().children("a#rateTwo").children().addClass("rate-color");
        $(this).children().addClass("rate-color");
      })
      $("a#rateThree").on("mouseleave", function(){
        $(this).parent().siblings().children("a#rateOne").children().removeClass("rate-color");
        $(this).parent().siblings().children("a#rateTwo").children().removeClass("rate-color");
        $(this).children().removeClass("rate-color");
      })


      $("a#rateFour").on("mouseenter", function(){
        $(this).parent().siblings().children("a#rateOne").children().addClass("rate-color");
        $(this).parent().siblings().children("a#rateTwo").children().addClass("rate-color");
        $(this).parent().siblings().children("a#rateThree").children().addClass("rate-color");
        $(this).children().addClass("rate-color");
      })
      $("a#rateFour").on("mouseleave", function(){
        $(this).parent().siblings().children("a#rateOne").children().removeClass("rate-color");
        $(this).parent().siblings().children("a#rateTwo").children().removeClass("rate-color");
        $(this).parent().siblings().children("a#rateThree").children().removeClass("rate-color");
        $(this).children().removeClass("rate-color");
      })


      $("a#rateFive").on("mouseenter", function(){
        $(this).parent().siblings().children("a#rateOne").children().addClass("rate-color");
        $(this).parent().siblings().children("a#rateTwo").children().addClass("rate-color");
        $(this).parent().siblings().children("a#rateThree").children().addClass("rate-color");
        $(this).parent().siblings().children("a#rateFour").children().addClass("rate-color");
        $(this).children().addClass("rate-color");
      })
      $("a#rateFive").on("mouseleave", function(){
        $(this).parent().siblings().children("a#rateOne").children().removeClass("rate-color");
        $(this).parent().siblings().children("a#rateTwo").children().removeClass("rate-color");
        $(this).parent().siblings().children("a#rateThree").children().removeClass("rate-color");
        $(this).parent().siblings().children("a#rateFour").children().removeClass("rate-color");
        $(this).children().removeClass("rate-color");
      })
  };
}

module.exports = ratings;
