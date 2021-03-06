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

  <body style="overflow:hidden" class="platform" data-videos="theatre">

<header>
  <a class="volume-toggle"><i class="icon-volume-up"></i></a>
</header>

    <div id="wrapper" class="wrapper">

       <!-- <div class="pano-underlay">
        <video controls="true" width="100%" height:"100%" autoplay loop = "true" style="position:absolute;top:17%" id="video-underlay" preload="auto">
           <source src="video/oil_shot.webm" type="video/webm" />
           <source src="video/oil_shot.mp4" type="video/mp4" />
        </video> 
      </div> -->

      <div class="underwater">  </div>

  		<div id="panocontainer" class="theater"></div>
      
  		<div class="breadcrumb"></div>

      <!-- VIDEO PLAYER -->
      <div class="video-content-wrap">
        <video class="hide" width="100%" style="position:absolute" id="video-overlay" preload="auto">
          <source/>
        </video>
        <div class="controls hide">
          <div class="play"></div>
          <div class="seek"></div>
          <div class="text"></div>
        </div>

        <a id="to-control" class="platform-nav">Close</a>
      </div>

  	</div>


    <!-- JavaScripts -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
		<script type="text/javascript" src="js/master-functions.js"></script>
  	<script type="text/javascript" src="js/lib/krpano/swfkrpano.js"></script>
  	<script type="text/javascript" src="js/pano-functions-html5.js"></script>


    <script>
      $(document).ready(function(){
        master.blankTrans()
        master.setDeepLinking("theater.php")
      })


      var soundadjust = function(coord,fov) {

        if(fov <45) {
          $('#scroll-directions').fadeIn()
          $('.fastpan, .compass').fadeOut(100)
        } else {
          if(!master.overlayOpen) $('.fastpan, .compass').fadeIn(500)
          $('#scroll-directions').fadeOut()
          $('#walking-canvas').css('opacity', Math.abs(1-fov/90)+.1)
        }

      }



    </script>



  </body>
</html>