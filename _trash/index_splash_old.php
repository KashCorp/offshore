<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OFFSHORE</title>
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.css">

    <script type="text/javascript">

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-35229652-1']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>

  </head>

  <body>
  	<div id="splash-wrapper">
   
      <img src="images/splash_bg.jpg" class="splashbg-img" />
    
     
		  <div class="splashlogo">
        <img src="images/hd_splash_logo.png">
        <a id="enter_site" href="#"><img src="images/nav_mainenter.png"></a>
        <p class="disclaimer">Best viewed in Chrome and Firefox.</p>
			</div>

      
    </div>		
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>		

<script>
$(document).ready(function(){  
 
    var fadeToBlack = function(){
 		  $("#splash-wrapper").fadeOut(1000, function(){
 		  	window.location="trailer_froog.php"
		});	
    }
    
    $("#enter_site").click(function(){
      fadeToBlack()
		}) 
		
		$(".splashbg-img").fadeIn(2000, function(){
 		  $(".splashlogo").fadeIn(2000)
		});	
		 
    		
		    	})
	</script>


  </body>
</html>