<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Lower Platform Closed | OFFSHORE</title>
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.css">

    <style type="text/css">
    @import "css/jquery.countdown.css";

    #defaultCountdown { position:absolute;z-index:101;font-size:120px;width: 1900px; height: 300px;opacity:0.15 }
    </style>

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
    <header>

      <a class="volume-toggle"><i class="icon-volume-up"></i></a>
    </header>
    <div id="wrapper" class="wrapper">
      <div id="panocontainer" class="lowerplatform_closed"></div>
      <div class="breadcrumb"></div>
    </div>
    <div id="inter-text"></div>
<!--
    <audio id="audio-platform" volume=".6" preload="auto" class="ambient" loop="loop">
      <source src="audio/About_Ambience.mp3" type="audio/ogg" />
      <source src="audio/About_Ambience.mp3" type="audio/mpeg" />
    </audio>


     JavaScripts -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="js/lib/jquery.countdown.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
		<script type="text/javascript" src="js/master-functions.js"></script>
    <script type="text/javascript" src="js/lib/jquery.address.min.js"></script>
    <script type="text/javascript" src="js/lib/krpano/swfkrpano.js"></script>
    <script type="text/javascript" src="js/pano-functions-html5.js"></script>
    <script type="text/javascript" src="js/lib/textualizer.js"></script>

    <script>

    var krpano

    var makeDecision = function() {
      console.log(master.getCookie("hatchStatus"))
        krpano = document.getElementById("krpanoObject");
        if(master.getCookie("hatchStatus")=="open" ){
           krpano.call("action(loadHatchOpen)")
        }else{
           krpano.call("action(loadHatchOpen)")
        }
       
    }

      $(document).ready(function(){


 master.blankTrans()
	 // master.videoTrans()
   //console.log(master.getCookie("hatchStatus"))


	var austDay = new Date();
	austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
	$('#defaultCountdown').countdown({until: austDay});

	$('#year').text(austDay.getFullYear());



var txt = $('#comingsoon');  // The container in which to render the list

var options = {
  duration: 2000,          // Time (ms) each blurb will remain on screen
  rearrangeDuration: 500, // Time (ms) a character takes to reach its position
  effect: 'slideLeft',
  centered: true         // Centers the text relative to its container
}

$("#overlay").click(function() {
  master.hideOverlay();
});

        //txt.textualizer(master.extreme_array, options); // textualize it!
        //txt.textualizer('start'); // start


         master.setDeepLinking("lowerplatform_closed.php")
        document.addEventListener( 'mousedown', function(){$('#inter-text').fadeOut(350);}, false );
      })

    </script>

  </body>
</html>