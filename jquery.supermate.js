/*
+ Supermate
+ copyright Luke Shumard & Dave Donahue, licensed GPL & MIT
+ version 0.01

+ Documentation: xxx
+ GitHub: https://github.com/lukeshumard/Supermate

+ lukeshumard.com
+ monowi.net

*/
;(function($){
	
	$.fn.supermate = function(properties,speed,easing,callback){
		
		// CALLING ALL FUNCTIONS	    
	    function determineRatio() {
	    	selectorClone = $(selector).clone();
	    	// THIS WORKS, SO WHY NOT BELOW
	    	// selector.css({left: '200px'});
	    	
	    	selectorClone.css({left: '200px'});
	    	// console.log(properties);
	    	// console.log(selector.css('left'));
	    	// console.log(selectorClone.css('left'));
	    	// append selectorClone to use new css properties
	    	
	    	function distance(selector, selectorClone, attr) {
	    		val1 = selector.css(attr).match(/\d+/g);
	    		val2 = selectorClone.css(attr).match(/\d+/g);
	    		// console.log(val1 + ' / ' + val2);
	    		// console.log(Math.abs(val1 - val2));
	    		return Math.abs(val1 - val2);
	    	}
	    	
	    	dist = /*Math.max(*/[
		    	distance(selector, selectorClone, "top"),
		    	distance(selector, selectorClone, "left"),
		    	distance(selector, selectorClone, "width"),
		    	distance(selector, selectorClone, "height")
	    	]/*)*/;
	    	// console.log(dist);
	    	
	    	// beginning = 10;
	    	// end = 800;
	    	// distanceProof = end - beginning;
	    	duration = dist * (1 / speed);
	    	selectorClone.remove();
	    }
	    
	    function initAnimation() {
	    	// console.log(duration);
	    	selector.animate(properties,duration,easing,callback.call());
	    }
	    
	    // BEGIN
	    var opts	= $.supermate,
	    selector	= $(this),
        max, dist, distance, val1, val2,
        beginning, end, distanceProof, duration;
        
        // DEFINE CALLBACK ARGUEMENT AS A FUNCTION
        callback    = callback || function(){};
        
                
        determineRatio();
        initAnimation();
        
        return this;
        
        }; // end $.fn.supermate
		
		$.supermate = {     
		        properties		: null,
		        ratio			: null,
		        easing			: null,
	  	};
	  	
	
})(jQuery);