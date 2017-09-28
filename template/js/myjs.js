//echo('here i am');
$(document).ready(function(){
	
var navpos = $("#navbar").offset().top;
	$(window).scroll(function(){
		//echo("here");
		var windpos = $(window).scrollTop();
		if (windpos>navpos){
			$("#navbar").addClass("fixed-top");
		}else{
			$("#navbar").removeClass("fixed-top");
		}
	})
});
