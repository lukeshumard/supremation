/*
+ Supermate
+ copyright Luke Shumard, licensed GPL & MIT
+ version 0.01

+ Documentation: xxx
+ GitHub: xxx

*/
;(function($){
	
	$.fn.supermate = function(options,callback){
		
		// CALLING ALL FUNCTIONS
		
		// console log wrapper.
	    function debug(){
	      if (opts.debug) { window.console && console.log.call(console,arguments)}
	    }
	    
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
	    	duration = distance * (1 / opts.ratio);
	    }
	    
	    function initAnimation(selector) {
	    	debug(duration);
	    	selector.animate(opts.properties,duration,opts.easing,callback.call());
	    }
	    
	    // BEGIN
	    var opts	= $.extend({}, $.supermate.defaults, options),
        props		= $.supermate,
        beginning, end, distance, duration;
        
        // DEFINE CALLBACK ARGUEMENT AS A FUNCTION
        callback    = callback || function(){};
        
        // CHECK FOR VALID OPTIONS
        // if (!areSelectorsValid(opts)){ return false; }
        
        determineRatio();
        initAnimation($(this));
        
        return this;
        
        }; // end $.fn.supermate
		
		$.supermate = {     
	        defaults      : {
		        debug           : false,
		        properties		: null,
		        ratio			: null,
		        easing			: null,
		    },
	        //properties go here
	  	};
	  	
	
})(jQuery);