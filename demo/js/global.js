$(document).ready(function(){
	
	/* Demo controls
	-------------------------------------------------------------- */

	$('#controls a').not('a#reset').click(function(e) {
		e.preventDefault();
		
		var thisBox = $(this).attr('rel');
		var thisSpeed = $('#speedslider').slider("value");
		var thisDistance = $('#distanceslider').slider("value");
		
		var direction;
		if (thisBox == 'left' || thisBox == 'up') direction = '-=';
		else direction = '+=';
		if (thisBox == 'right') thisBox = 'left';
		if (thisBox == 'up') thisBox = 'top';
		
		var args = {};
		args[thisBox] = direction + thisDistance;
		
		$('div#blacksquare').supremate(args,thisSpeed,'swing');
	
	});
	
	$('a#reset').click(function(e){
		e.preventDefault();
		
		var thisSpeed = $('#speedslider').slider("value");
		$('div#blacksquare').supremate({left: "0px",top: "0px"},thisSpeed,'swing');
	});
	
	$("#speedslider").slider({
			value:1500,
			min: 100,
			max: 3000,
			slide: function(event, ui) {
				$("#speeddialog").text('Supremation Speed: ' + ui.value + ' pixels per second');
			}
		});
		
	$("#speeddialog").text('Supremation Speed: ' + $('#speedslider').slider("value") + ' pixels per second');
	
	$("#distanceslider").slider({
		value:175,
		min: 50,
		max: 300,
		slide: function(event, ui) {
			$("#distancedialog").text('Supremation Distance: ' + ui.value + ' pixels');
		}
	});
	
	$("#distancedialog").text('Supremation Distance: ' + $('#distanceslider').slider("value") + ' pixels');
	
});