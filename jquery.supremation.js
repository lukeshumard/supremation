/*
+ SUPREMATION
+ copyright Luke Shumard & Dave Donahue, licensed GPL & MIT
+ version 0.1

+ Documentation: http://www.supremation.com
+ GitHub: https://github.com/lukeshumard/supremation

+ lukeshumard.com
+ monowi.net

*/
(function($) {
  // SupreMate class
  var SupreMate = window.SupreMate = function(element, properties, speed, easing, callback){
    this.element = $(element);
    this.speed = speed;
      
    var p =this.properties = properties;
    var e = this.easing = easing;
    var c = this.callback = callback;
    var d = this._duration = this.calcDuration();
    console.log(d);
    this.element.animate(p,d,e,c);
  };
  
  SupreMate.prototype = {
    calcDuration: function(){
      // Get positioning info for original element
      var before = this.element.measurePosition();
      
      // Clone original element
      this._cloned = this.element.clone().insertBefore(this.element);
      
      // Hide original element (so that cloned element can be placed in the exact position of the original)
      this.element.hide();
      
      // Apply properties to cloned element
      this._cloned.animate(this.properties,0);
      
      // Get positioning info for cloned element
      var after = this._cloned.measurePosition();
      
      // Revert to normal
      this._cloned.remove();
      this.element.show();

      // Calculate the distance between before and after elements
      var distance = this.calcDistance(before,after);
      console.log(distance);
      // Compute and return the duration (time = distance/speed)
      
      return distance / ( this.speed / 1000 );     // Speed provided in px/s; convert to px/ms
    },
    
    calcDistance: function(before,after){
      var max = 0,
          distance;   
      $.each(before, function(key, value) {
        distance = Math.abs( before[key] - after[key] );
        max = (distance > max) ? distance : max;
        console.log(distance);
      }); 
      return max;
    }
  };
  
  $.fn.measurePosition = function(){
    var el = $(this),
        offset = el.offset();
    return {
      "top" : offset.top,
      "left" : offset.left,
      "width" : el.width(),
      "height" : el.height()
    };
  };
  
  // Extend jQuery with supermate function
  $.fn.supremate = function(properties, speed, easing, callback) {
    // Get current element
    var obj = new SupreMate(this,properties,speed,easing,callback);
      
    this.data('supremate',obj);
    return this;
  };
})(jQuery);