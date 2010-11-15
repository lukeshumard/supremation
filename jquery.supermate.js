/*
+ Supermate
+ copyright Luke Shumard & Dave Donahue, licensed GPL & MIT
+ version 0.1

+ Documentation: xxx
+ GitHub: https://github.com/lukeshumard/supermate

+ lukeshumard.com
+ monowi.net

*/
; (function($) {

  $.fn.supermate = function(properties, speed, easing, callback) {

    // Get current element
    var element = this;
      
    // Calculate the duration
    duration = calcDuration(element, properties, speed);
      
    // Call .animate
    $(element).animate(properties, duration, easing, callback);

    // Calculate duration of animation
    function calcDuration(element, properties, speed) {
      
      // Take measurements on original element (offset, height, width)
      before = measurePosition(element);
      
      // Clone original element
      cloned = element.clone().insertBefore(element);
      
      // Hide original element
      element.hide();
      
      // Apply CSS to cloned element
      $.each(properties, function(key, value) {
        cloned.css(key, value);
      });
      
      // Take new measurements
      after = measurePosition(cloned);
      
      // Go back to normal
      cloned.remove();
      element.show();

      // Compute distance between before and after
      distance = calcDistance(before, after);
      
      // Compute duration
      return distance / ( speed / 1000 );
      
    }
    
    // Calculate distance between two objects (by property)
    function calcDistance(elem1, elem2) {
      var max = 0; var distance = 0;
      
      $.each(elem1, function(key, value) {
        distance = Math.abs( elem1[key] - elem2[key] );
        max = (distance > max) ? distance : max;
      });
      
      return max;
    }
    
    function measurePosition(elem) {
      top = $(elem).offset().top;
      left = $(elem).offset().left;
      width = $(elem).width();
      height = $(elem).height();
      
      return {
        "top" : top,
        "left" : left,
        "width" : width,
        "height" : height
      };
    }
    
  }
})(jQuery);