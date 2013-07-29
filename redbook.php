<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
<meta name="viewport" content="width = 1050, user-scalable = no" />
<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
<link rel="stylesheet" type="text/css" href="css/style.css">
<!-- JavaScripts -->
<script type="text/javascript" src="js/lib/jquery.min.js"></script>
<script type="text/javascript" src="js/lib/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/lib/turn/modernizr.2.5.3.min.js"></script>
</head>
<body style="background:none">

<div class="flipbook-viewport">
	<div class="container">
		<div class="flipbook">
			<div class="hard" style="background-image:url(images/Red_Book.jpg)"></div>
			<div class="hard" style="background-image:url(images/journal/techdrawing01.jpg)"></div>

			<div style="background-image:url(images/journal/Journal01.jpg)"></div>
			<div style="background-image:url(images/journal/techdrawing04.jpg)"></div>

			<div style="background-image:url(images/journal/Journal02.jpg)"></div>
			<div style="background-image:url(images/journal/techdrawing09.jpg)"></div>


			<div style="background-image:url(images/journal/Journal03.jpg)"></div>
			<div style="background-image:url(images/journal/techdrawing05.jpg)"></div>


			<div style="background-image:url(images/journal/techdrawing10.jpg)"></div>
			<div style="background-image:url(images/journal/blank_paper.jpg)"></div>				
	

			<div class="hard" style="background-image:url(images/journal/blank_paper.jpg)"></div>
			<div class="hard" style="background-image:url(images/Red_Book.jpg)"></div>										
		</div>
	</div>
</div>

<a id="to-control" class="platform-nav">Close</a>


<script type="text/javascript">

$("#to-control").click(function(){
	parent.master.closeOverlay()
})


function loadApp() {

	// Create the flipbook
	$('.flipbook').turn({
		width:922,
		height:600,
		elevation: 50,
		gradients: true,
		autoCenter: true,
		pages: 4
	});
}

// Load the HTML4 version if there's not CSS transform

yepnope({
	test : Modernizr.csstransforms,
	yep: ['js/lib/turn/turn.js'],
	nope: ['js/lib/turn/turn.html4.min.js'],
	both: ['css/basicbook.css'],
	complete: loadApp
});

</script>

</body>
</html>