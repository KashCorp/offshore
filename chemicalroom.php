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

<body class="platform">

  <!--<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>-->

  <header>
    <a class="volume-toggle"><i class="icon-volume-up"></i></a>
  </header>

  <div id="scroll-proxy" style="display:none"></div>


  <div id="wrapper" class="wrapper" style="position:fixed">
    
    <canvas id="walking-canvas" style="position:absolute;opacity:0" width="1200" width="800"></canvas> 

		<div id="panocontainer" class="chemicalroom"></div>
   
    <!-- OVERLAY VIDEOS -->
    <div class="video-content-wrap">

      <video width="100%" style="position:absolute;display:none;" id="video-overlay" preload="auto">
        <source/>
      </video>

      <a id="to-control" class="platform-nav">Close</a>
    </div>

    <div class="video-content-wrap-engine-room">
      <video width="100%" style="position:absolute;display:block" id="video-overlay-engine-room" preload="auto">
        <source/>
      </video>
    </div>
    <!-- END OVERLAY VIDEOS -->

    <canvas id="ghost-canvas" width="1200" height="800" style="opacity:.6;position:absolute;display:none;position:absolute;top:0;left:0;pointer-events:none"></canvas>
		<div class="breadcrumb"></div>
    <div class="scroll-directions-container"><div id="scroll-directions"></div></div>

    <div id="walking-exit" class="platform-nav">Close</div>
	</div>





    <!-- JavaScripts -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
		<script type="text/javascript" src="js/master-functions.js"></script>
  	<script type="text/javascript" src="js/lib/krpano/swfkrpano.js"></script>
    <script type="text/javascript" src="js/pano-functions-html5.js"></script>


  <script>

    var krpano, isVideoPlaying
    var loadsecondscene = function() {
      $('.wrapper').fadeOut(800, function() {
        krpano = document.getElementById("krpanoObject");
        krpano.call("action(loadsecondscene)")
      })
    }

    var preload = function(){
      walkthrough.preload()
      console.log('walkthrough.preload()')
    }


    var soundadjust = function(coord,fov) {

      var convCoord =  Math.abs(coord%360);

        if(fov > 100) {
          $("#ghost-canvas").fadeOut(500)
        } else {
          if(convCoord > 100 && convCoord < 160){
              $("#ghost-canvas").fadeIn(2500)
            }else{
              $("#ghost-canvas").fadeOut(2500)
          }
        }

      if(fov < 25) {
        $('#scroll-directions, #walking-exit').fadeIn()
        $('#panocontainer, .fastpan, .compass').fadeOut(500)

      }else{
        $('#panocontainer, .fastpan, .compass').fadeIn(500)
        $('#scroll-directions, #walking-exit').fadeOut(function(){
          $('#scroll-directions').css('top','100px') // reset scrubber position
        })
        $('#walking-canvas').css('opacity', Math.abs(1-fov/90)+.1)
      }

    }

    var walkthrough;

    $(document).ready(function(){
      master.setDeepLinking("chemicalroom.php")

      var playTrigger = 0
      master.blankTrans(1) 
      //master.ghostTrans('ghost_01',16)

      
      

        var setStage = function(){

          $video_overlay = $("#video-overlay-engine-room")
          $video_wrap    = $("#video-content-wrap-engine-room")

          var dynamicWidth = window.innerWidth;
          var dynamicHeight = dynamicWidth * .5625;
          var dynamicTop = (window.innerHeight - dynamicHeight)/2;

          walkthrough = new walkthroughFunctions(dynamicWidth,dynamicHeight,"walking-canvas","engineroom",601,true)


          $video_overlay.css("top",dynamicTop)
          $video_overlay.css("width",window.innerWidth)
          $video_wrap.css("width",window.innerWidth)
          $("#walking-canvas").css("top",dynamicTop)

          // Exit button
          $("#walking-exit").click(function(){
            walkthrough.scrollPos = 0
            scrollTrigger = 0
            krpano = document.getElementById("krpanoObject");
            krpano.call("lookto(0,0,90,smooth(),true,true))")
          });


          

          var scrollTrigger,scrollPercent = 1

          closeWalkthroughVid = function(){
            playTrigger = 0
            $(".video-content-wrap-engine-room").fadeOut(1000,function(){
              $("#video-overlay-engine-room")[0].pause()
              parent.audiomaster.mix.setGain(1.0)
            })
            $(".compass").fadeIn()
          }

          function scrollerFunction(){

            if(walkthrough.scrollPos > 85 && playTrigger == 0){
              $(".compass").fadeOut()
              $(".video-content-wrap-engine-room").fadeIn(1500)
              $('#video-overlay-engine-room source').attr('src', master.cdn_video + "EngineRoom_Mr_Jack" + master.videoType);
              // master.audioFadeAll(0.5)
              parent.audiomaster.mix.setGain(0.1)
              $("#video-overlay-engine-room")[0].load()
              $("#video-overlay-engine-room")[0].play()
              $("#video-overlay-engine-room")[0].onended = function(e) {
                closeWalkthroughVid()
              }
              playTrigger = 1
           }

            if(walkthrough.scrollPos < 85 && playTrigger == 1) {
              //master.audioFadeInAll(0.7)
              console.log("Closing video...")
              closeWalkthroughVid()
           }

            requestAnimationFrame(scrollerFunction)
        }
       scrollerFunction()

       var ghost = new ghostFunctions(dynamicWidth,dynamicHeight,"ghost-canvas","hologram_ghost02_",13,true)
        ghost.imageSequencer()

        $("#to-control").click(function(){
          closeVideo()
        })

        }

        setStage()

        window.onresize = function(event) { setStage() }

      })


    </script>


<iframe style="position:absolute; width:100%; height: 100%; top:0; left:0;" width="100%" allowtransparency="true" id="map-container-frame" src="rigmap.php"></iframe>

  </body>
</html>