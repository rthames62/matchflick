function ratings(){
  return function(scope, element, attrs) {
      $("a#rateOne").on("mouseenter", function(){
        $("a#rateOne img").addClass("rate-color");
      })
      $("a#rateOne").on("mouseleave", function(){
        $("a#rateOne img").removeClass("rate-color");
      })


      $("a#rateTwo").on("mouseenter", function(){
        $("a#rateOne img").addClass("rate-color");
        $("a#rateTwo img").addClass("rate-color");
      })
      $("a#rateTwo").on("mouseleave", function(){
        $("a#rateOne img").removeClass("rate-color");
        $("a#rateTwo img").removeClass("rate-color");
      })


      $("a#rateThree").on("mouseenter", function(){
        $("a#rateOne img").addClass("rate-color");
        $("a#rateTwo img").addClass("rate-color");
        $("a#rateThree img").addClass("rate-color");
      })
      $("a#rateThree").on("mouseleave", function(){
        $("a#rateOne img").removeClass("rate-color");
        $("a#rateTwo img").removeClass("rate-color");
        $("a#rateThree img").removeClass("rate-color");
      })


      $("a#rateFour").on("mouseenter", function(){
        $("a#rateOne img").addClass("rate-color");
        $("a#rateTwo img").addClass("rate-color");
        $("a#rateThree img").addClass("rate-color");
        $("a#rateFour img").addClass("rate-color");
      })
      $("a#rateFour").on("mouseleave", function(){
        $("a#rateOne img").removeClass("rate-color");
        $("a#rateTwo img").removeClass("rate-color");
        $("a#rateThree img").removeClass("rate-color");
        $("a#rateFour img").removeClass("rate-color");
      })


      $("a#rateFive").on("mouseenter", function(){
        $("a#rateOne img").addClass("rate-color");
        $("a#rateTwo img").addClass("rate-color");
        $("a#rateThree img").addClass("rate-color");
        $("a#rateFour img").addClass("rate-color");
        $("a#rateFive img").addClass("rate-color");
      })
      $("a#rateFive").on("mouseleave", function(){
        $("a#rateOne img").removeClass("rate-color");
        $("a#rateTwo img").removeClass("rate-color");
        $("a#rateThree img").removeClass("rate-color");
        $("a#rateFour img").removeClass("rate-color");
        $("a#rateFive img").removeClass("rate-color");
      })
  };
}

module.exports = ratings;
