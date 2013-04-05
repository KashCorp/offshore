<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OFFSHORE | Helipad</title>
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="Coming soon: OFFSHORE, an interactive documentary about the next chapter of oil exploration and exploitation">
    <meta name="author" content="">

    <link rel="image_src" href="images/bg_drillhead.jpg" />
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

<body style="overflow:hidden" class="platform">

<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<header><a class="volume-toggle"><i class="icon-volume-up"></i></a></header>



    <div id="wrapper" class="wrapper">

  		<div id="panocontainer" class="boat"></div>
       <img id = "gradient" src = "images/overlay_gradient_blue" style="pointer-events:none;top:0px; display:block; position: absolute;width:100%;height:60%;opacity:0.7"/>

      <div class="video-content-wrap">
       
      <video width="100%" style="position:absolute;display:none;" id="video-overlay" preload="auto">
        <source/>
      </video>

       <a id="to-control" class="platform-nav">Close</a>
      </div>

  		<div class="breadcrumb"></div>

  	</div>



    <div id="inter-text" style="display: block"></div>

    <audio style="display: none" id="audio-platform" preload="auto" class="ambient" loop="loop">
      <source src="audio/The_Zone.ogg" type="audio/ogg" />
      <source src="audio/The_Zone.mp3" type="audio/mpeg" />
    </audio>



    <!-- JavaScripts -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
		<script type="text/javascript" src="js/master-functions.js"></script>
  	<script type="text/javascript" src="js/lib/krpano/swfkrpano.js"></script>
  	<script type="text/javascript" src="js/pano-functions-html5.js"></script>


    <script>

 

      $(document).ready(function(){

      //$('#inter-text' ).shuffleLetters();
        master.videoTrans("video/transitions/explosion")

        document.addEventListener( 'mousedown', function(){$('#inter-text').fadeOut(350);}, false );

        master.setDeepLinking("boat.php")

        var dynamicWidth = window.innerWidth;
        var dynamicHeight = dynamicWidth * .5625;
        var dynamicTop = (window.innerHeight - dynamicHeight)/2;
        var intervalKey,moviePlaying;

        $("#video-overlay").css("top",dynamicTop)
        $("#video-overlay").css("width",window.innerWidth)
       

        $("#to-control").click(function(){ 
          var kpano = document.getElementById("krpanoObject");
          console.log(kpano)
          kpano.call("lookto(" + cachedAuth   + ",0," + cachedFov + ",smooth(),true,true))")
          closeVideo()
        })
        


      })

    </script>



  </body>
</html>