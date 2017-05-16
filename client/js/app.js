// here we initialize all our material componetns


$(document).ready(function() {
	// initalize the side-nav
	$(".button-collapse").sideNav();
})

 var num = 200; //number of pixels before modifying styles

$(window).bind('scroll', function () {
    if ($(window).scrollTop() > num) {
        $('nav').addClass('fixed');
    } else {
        $('nav').removeClass('fixed');
    }
});

setInterval(function(){
	$('#brother').removeClass('pulsed')
	$('#brother').addClass('pulsed')
},5000)
