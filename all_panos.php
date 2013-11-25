<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OFFSHORE | Helipad</title>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
    <meta name="description" content="Coming soon: OFFSHORE, an interactive documentary about the next chapter of oil exploration and exploitation">
    <meta name="author" content="">

    <link rel="image_src" href="images/bg_drillhead.jpg" />
    <link rel="stylesheet" type="text/css" href="css/style.css?v=20131030">
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

  <body style="overflow:hidden" class="platform" data-videos="platform">


  <header>
    <a class="volume-toggle"><i class="icon-volume-up"></i></a>
  </header>

  <div id="scroll-wrapper" class="wrapper">
    
    <video id="walking-canvas" style="position:absolute;display:block" looping="false" width="1200" width="800"></video>

    <div class="vignette"></div>

    <div id="viewport" class="no-pointer-events" style="left:0px">
      
      <div id='word-container' style='left:0;-webkit-transform:translateZ(-1400px)'>
        
        <ul>
            <li id="word_01">... in the porches of my ears did pour the leperous distilment.</li>
        </ul>

      </div>

    </div>
    
    <!-- <canvas id="ghost-canvas" width="1200" height="800" style="position:absolute;display:none;position:absolute;top:0;left:0;pointer-events:none"></canvas> -->
    
    <div id="scroll-start" class="scroll-nav">Go Back?</div>
      
    <div id="scroll-end" class="scroll-nav">Continue?</div>
    
    <div class="scroll-directions-container">
      <div class="scroll-directions"></div>
      <div class="hotspot"></div>
    </div>

    

  </div>   



           

  <div id="wrapper" class="wrapper" style='display:none'>

   <div class="oil-shot-bg pano-underlay"><video width="100%" height="100%" autoplay loop="true" style="position:absolute; display:none" class="video-underlay" id="video-underlay" preload="auto"><source src="video/transitions/oil_shot.webm" type="video/webm" /><source src="video/transitions/oil_shot.mov" type="video/mov" /></video> </div>
    
    <video id="walking-canvas-pano" style="position:absolute;display:block"  looping="false" width="1200" width="800"></video> 

    <div id="panocontainer" class="show"></div>

    
    <div class="vignette"></div>


    
   




      
        <div class="video-content-wrap">
          <video class="" width="100%" style="position:absolute" id="video-overlay" preload="auto">
            <source  />
          </video>
          <div id="video-overlay-title"></div>
          <div class="controls hide">
            <div class="play"></div>
            <div class="seek"></div>
            <div class="text"></div>
            <div class="content-viewed"></div>
          </div>

          <a id="to-control" class="platform-nav">Close</a>
        </div>

    <div class="video-content-walkthrough">
      <video controls="false" width="100%" style="position:absolute;display:block" id="video-overlay-walkthrough" preload="auto">
        <source/>
      </video>
    </div>   

      <div class="scroll-directions-container panoversion">
        <div class="scroll-directions"></div>
        <div class="hotspot"></div>
      </div>

      <div id="walking-exit" class="platform-nav">Close</div>

      <div class="pan-directions"></div>

      <div id="autopilot-warning">
        <h1>Autopilot Active</h1>
        <h2>Interact to disable</h2>
      </div>

  </div>





    <canvas id="ghost-canvas-trans" width="1200" height="800" style="position:absolute;display:none;position:absolute;top:0;left:0;pointer-events:none"></canvas>

    <iframe allowtransparency="true" class="" id="overlay_frame" src=""></iframe>
    

    <div id="loading" class="loading"></div> 

    <div class="compass" style="display:none"><img src="images/icons/map_icon.png"></div>

    <div class="breadcrumb" id="toolbelt"></div>

    <!--<video id="walkthrough-video" width="100%" style="position:absolute;display:block;top:0px;pointer-events:none" preload="auto">-->

    <!-- Libraries -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
    <script type="text/javascript" src="js/lib/pxloader/PxLoader.js"></script>
    <script type="text/javascript" src="js/lib/pxloader/PxLoaderImage.js"></script>
    <script type="text/javascript" src="js/lib/Tween.js"></script>
    <script type="text/javascript" src="js/lib/krpano/swfkrpano.js"></script>
  
    <!-- Javascripts -->
		<script type="text/javascript" src="js/master-functions-all-panos.js?v=<?php echo date('U') ?>"></script>
    <script type="text/javascript" src="js/pano-functions-html-all.js?v=<?php echo date('U') ?>"></script>
    <script type="text/javascript" src="js/external-control.js?v=<?php echo date('U') ?>"></script>
    <script type="text/javascript" src="js/panoLoader.js?v=<?php echo date('U') ?>"></script>

  </body>
</html>