function enterSubmit(){
  return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                  console.log("hit enter");
                    scope.$apply(function(){
                        scope.$eval(attrs.enterSubmit, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
}

module.exports = enterSubmit;
