/*
+ SUPREMATION
+ copyright Luke Shumard & Dave Donahue, licensed GPL & MIT
+ version 0.1

+ Documentation: http://www.supremation.com
+ GitHub: https://github.com/lukeshumard/supremation

+ lukeshumard.com
+ monowi.net

*/
; (function($) {

  // Extend jQuery with supermate function
  $.fn.supremate = function(properties, speed, easing, callback) {

    // Get current element
    var element = this;
      
    // Calculate the duration for .animate
    duration = calcDuration(element, properties, speed);
      
    // Call .animate
    $(element).animate(properties, duration, easing, callback);

    // Given an element, an array of CSS changes, and a speed (in px/s), calculate the duration for .animate
    function calcDuration(element, properties, speed) {
      
      // Get positioning info for original element
      before = measurePosition(element);
      
      // Clone original element
      cloned = element.clone().insertBefore(element);
      
      // Hide original element (so that cloned element can be placed in the exact position of the original)
      element.hide();
      
      // Apply specified CSS changes to cloned element
      // note: relative positioning needs to be changed into a singular function with a variable operator.
      // ...you know, to be cleaner
      $.each(properties, function(key, value) {
        var isRelative = value.substr(0,2);
        if (isRelative == '+=') {
        	value = value.substr(2);
        	value = parseFloat(value);
        	elemRelative = element.css('position');
        	if (elemRelative == 'relative') {
        		var prevState = element.css(key);
        		prevState = parseFloat(prevState);
        		value = prevState + value;
        	} else {
        		value = Math.abs(value);
        	};
        } else if (isRelative == '-=') {
        	value = value.substr(2);
        	value = parseFloat(value);
        	elemRelative = element.css('position');
        	if (elemRelative == 'relative') {
        		var prevState = element.css(key);
        		prevState = parseFloat(prevState);
        		value = prevState - value;
        	} else {
        		value = Math.abs(0 - value);
        	}
        };
        cloned.css(key, value);
      });
      
      // Get positioning info for cloned element
      after = measurePosition(cloned);
      
      // Revert to normal
      cloned.remove();
      element.show();

      // Calculate the distance between before and after elements
      distance = calcDistance(before,after);
      
      // Compute and return the duration (time = distance/speed)
      // console.log ( 'duration: ' + distance / ( speed / 1000 ) );
      return distance / ( speed / 1000 );     // Speed provided in px/s; convert to px/ms
    }
    
    // Calculate distance between two objects
    function calcDistance(elem1,elem2) {
      var max = 0; var distance = 0;
      
      $.each(elem1, function(key, value) {
        if (elem1[key] >= elem2[key]) {
        	distance = Math.abs( elem1[key] - elem2[key] );
        } else {
        	distance = Math.abs( elem2[key] - elem1[key] );
        };
        max = (distance > max) ? distance : max;
      });
      
      return max;
    }
    
    // Take a snapshot of positioning attributes of an object (offset, dimensions)
    function measurePosition(elem) {
      return {
        "top" : $(elem).offset().top,
        "left" : $(elem).offset().left,
        "width" : $(elem).width(),
        "height" : $(elem).height()
      };
    };
  }
})(jQuery);