/**
 * SUPREMATION
 * GitHub: https://github.com/lukeshumard/supremation
 * copyright Luke Shumard & Dave Donahue, licensed GPL & MIT
 * version 1.0
 */
;(function($) {

  // Extend jQuery with supermate function
  $.fn.supremate = function(properties, speed, easing, callback) {

    var $el = $(this);                                                // Get current element
    var duration = $.fn.supremate._duration($el, properties, speed);  // Calculate the duration for .animate
    
    $el.animate(properties, duration, easing, callback);  // Call .animate

    return this;  // Ensure chainability

  }

  /**
   * Duration
   * Calculate duration needed to maintain consistent speed
   * @private
   *
   * @param $el {jQuery Object} Element to be animated
   * @param properties {Object} CSS changes to element
   * @param speed {Number} Speed of changes in px/s
   *
   * @returns {Integer} Duration for change at speed
   */
  $.fn.supremate._duration = function calcDuration($el, properties, speed) {

    var before = this._position($el);               // Get positioning info for original element
    var $cloned = $el.clone().insertBefore($el);    // Clone original element

    $el.hide();                                     // Hide original element
    $cloned.animate(properties,0);                  // Apply properties to cloned element
    
    var after = this._position($cloned);            // Get positioning info for cloned element
    
    $cloned.remove();                               // Revert to normal
    $el.show();                                     // Show original element

    var distance = this._distance(before,after);    // Calculate the distance between before and after elements
    
    return distance / ( speed / 1000 );     // Speed provided in px/s; convert to px/ms
  }

  /**
   * Distance
   * Calculate distance between original element and cloned element
   * @private
   *
   * @param original {Object} Original element position
   * @param cloned {Object} Cloned element position
   *
   * @returns {Integer} Distance between objects
   */
  $.fn.supremate._distance = function calcDistance(before,after) {
    var max = distance = 0;   
    $.each(before, function(key, value) {
      distance = Math.abs( before[key] - after[key] );
      max = (distance > max) ? distance : max;
    }); 
    return max;
  }

  /**
   * Position
   * Take a snapshot of positioning attributes of an object (offset, dimensions)
   * @private
   *
   * @param $el {jQuery Object} Element to capture position
   *
   * @returns {Object} Top, left, width, and height measurements of object
   */
  $.fn.supremate._position = function measurePosition($el) {
    var offset = $el.offset();
    return {
      "top" : offset.top,
      "left" : offset.left,
      "width" : $el.width(),
      "height" : $el.height()
    };
  }

})(jQuery);
