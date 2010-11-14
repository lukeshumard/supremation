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
			    
	    function areSelectorsValid(opts){
	    	for (var key in opts){
		        //if (/* NO MATCH */){
		        //    debug('Your ' + key + ' found no elements.');    
		        //    return false;
		        //} // ELSE, MATCH
		        return true;
		    }
	    }
	    
	    function determineRatio() {
	    	// 1. Get beginning state
	    	// 2. Get end state
	    	// 3. Determine total distance
	    	// 5. Distance * (inverse of ratio) = duration
	    	beginning = 10;
	    	end = 800;
	    	distance = end - beginning;
	    	duration = distance * (1 / speed);
	    }
	    
	    function initAnimation(selector) {
	    	console.log(duration);
	    	selector.animate(properties,duration,easing,callback.call());
	    }
	    
	    // BEGIN
	    var opts	= $.supermate,
        beginning, end, distance, duration;
        
        // DEFINE CALLBACK ARGUEMENT AS A FUNCTION
        callback    = callback || function(){};
        
        // CHECK FOR VALID OPTIONS
        // if (!areSelectorsValid()){ return false; }
        
        determineRatio();
        initAnimation($(this));
        
        return this;
        
        }; // end $.fn.supermate
		
		$.supermate = {     
		        properties		: null,
		        ratio			: null,
		        easing			: null,
	  	};
	  	
	
})(jQuery);