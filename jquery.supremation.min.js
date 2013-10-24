/**
 * SUPREMATION
 * GitHub: https://github.com/lukeshumard/supremation
 * copyright Luke Shumard & Dave Donahue, licensed GPL & MIT
 * version 1.0
 */
(function(e){e.fn.supremate=function(t,n,r,i){var s=e(this);var o=e.fn.supremate._duration(s,t,n);s.animate(t,o,r,i);return this};e.fn.supremate._duration=function(t,n,r){var i=this._position(t);var s=t.clone().insertBefore(t);t.hide();s.animate(n,0);var o=this._position(s);s.remove();t.show();var u=this._distance(i,o);return u/(r/1e3)};e.fn.supremate._distance=function(n,r){var i=distance=0;e.each(n,function(e,t){distance=Math.abs(n[e]-r[e]);i=distance>i?distance:i});return i};e.fn.supremate._position=function(t){var n=t.offset();return{top:n.top,left:n.left,width:t.width(),height:t.height()}}})(jQuery);
