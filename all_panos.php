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

  <body style="overflow:hidden" class="platform" data-videos="platform">


  <header>
    <a class="volume-toggle"><i class="icon-volume-up"></i></a>
  </header>

  <!-- <div class="pano-underlay"><video width="100%" autoplay loop="true" style="position:absolute;" id="video-underlay" preload="auto"><source src="video/transitions/oil_shot.webm" type="video/webm" /></video> </div> -->





  <div id="scroll-wrapper" class="wrapper">
    
    <canvas id="walking-canvas" style="position:absolute" width="1200" width="800"></canvas>

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



           

  <div id="wrapper" class="wrapper">

    <canvas id="walking-canvas-pano" style="position:absolute" width="1200" width="800"></canvas>
    

    <div id="panocontainer" class="platform"></div>
        
        <div class="video-content-wrap">
          <video class="" width="100%" style="position:absolute" id="video-overlay" preload="auto">
            <source/>
          </video>
          <div id="video-overlay-title"></div>
          <div class="controls hide">
            <div class="play"></div>
            <div class="seek"></div>
            <div class="text"></div>
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

     


  </div>





    <canvas id="ghost-canvas-trans" width="1200" height="800" style="position:absolute;display:none;position:absolute;top:0;left:0;pointer-events:none"></canvas>

    <iframe allowtransparency="true" class="" id="overlay_frame" src=""></iframe>
    

    <!--<div class="loading"></div>--> 

    <div class="compass"><img src="images/icons/map_icon.png"></div>

    <div class="breadcrumb" id="toolbelt"></div>

    <!-- JavaScripts -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
    <script type="text/javascript" src="js/lib/pxloader/PxLoader.js"></script>
    <script type="text/javascript" src="js/lib/pxloader/PxLoaderImage.js"></script>
    <script type="text/javascript" src="js/panoLoader.js"></script>
		<script type="text/javascript" src="js/master-functions-all-panos.js"></script>
    <script type="text/javascript" src="js/lib/Tween.js"></script>
  	<script type="text/javascript" src="js/lib/krpano/swfkrpano.js"></script>
  	<script type="text/javascript" src="js/pano-functions-html-all.js"></script>



    <script>
      // var soundVector1 = soundVector2 = soundVector3 = 0;

      // var soundadjust = function(coord,fov) {

      //   var convCoord =  Math.abs( (coord+60) % 360);
      //   var convCoord1 =  Math.abs((coord-120)%360);

      //   // console.log('convCoord: '+'\t'+convCoord)


      //   if(convCoord < 180 ){
      //     soundVector1 = convCoord/180;
      //   }else{
      //     soundVector1 = (360-convCoord)/180;
      //   }

      //         //console.log(soundVector1*2-1)

         
      //   if(convCoord1 < 180 ){
      //     soundVector2 = (convCoord1)/180;
      //   }else{
      //     soundVector2 = (360-(convCoord1))/180;
      //   }


      //   if(parent.audiomaster.mix.getTrack('overlay_01') && !master.isTweeningAudio){
      //     parent.audiomaster.mix.getTrack('basetrack').pan(soundVector2*2-1)
      //     parent.audiomaster.mix.getTrack('overlay_01').pan(soundVector1*2-1)       
      //   }

      //   if(parent.audiomaster.mix.getTrack('overlay_02') && !master.isTweeningAudio){
      //     parent.audiomaster.mix.getTrack('overlay_02').pan(soundVector2*2-1)       
      //   }

      //   // show ghosts only in specific spot (recalculated every pano)
      //   if(convCoord > master.ghostMinCoord && convCoord < master.ghostMaxCoord) {
      //     master.ghostBuster = false
      //   } else {
      //     master.ghostBuster = true
      //   }


      //   /* sequences */
      //   if(master.globalPano == 'chemicalroom' || master.globalPano == 'subhanger' ) {
      //     if(fov < 25) {
      //       //$('.scroll-directions').css('opacity',1.0)

      //       $('.scroll-directions, .panoversion, #walking-exit').fadeIn()
      //       $('#panocontainer, .fastpan, .compass').fadeOut(500)

      //     }else{

      //       if(!master.overlayOpen) $('#panocontainer, .fastpan, .compass').fadeIn(500)
      //       $('.scroll-directions, .panoversion, #walking-exit').fadeOut(function(){
      //         $('.scroll-directions').css('top','100px') // reset scrubber position
      //       })
      //       $('#walking-canvas-pano').css('opacity', Math.abs(1-fov/90)+.1)
      //     }
      //   }

      // }

       


      $(document).ready(function(){


        var dynamicWidth = window.innerWidth;
        var dynamicHeight = dynamicWidth * .5625;
        var dynamicTop = (window.innerHeight - dynamicHeight)/2;
        var intervalKey,moviePlaying;

        $("#video-overlay").css("top",dynamicTop)
        $("#video-overlay").css("width",window.innerWidth)
       
      })



      /**************************************************************************
        
        Misc Functions from individual scenes
      
      **************************************************************************/
        
      // Control Room
      var startDrilling = function(stopping){

        // if(stopping){
        //   master.loadVideoUnderlay("video/transitions/oil_shot",null,true)
        // }else{
        //   master.loadVideoUnderlay("video/transitions/action_04",null,true) 
        // }

        var transition_audio = $('#transition', window.parent.document)
        transition_audio[0].src = "audio/Hatch_Open.mp3"
        transition_audio[0].play()
        $("#wrapper").delay(200).animate({'bottom': '-10','top': '10'}, 100, function(){
          $("#wrapper").animate({'bottom': '0','top': '0'}, 100)
        })
      }

      // Control Room
      var zoomIn = function() {
        master.overlayOpen = true
        $('.fastpan, .compass').fadeOut()

        // create
        $('#zoom-out').remove()
        $('.vignette').after('<div id="zoom-out" class="platform-nav dynamic hide"></div>')
        $("#zoom-out").removeClass('hide')

        $("#zoom-out").on('click',function(){
          master.overlayOpen = false
          $('.fastpan, .compass').fadeIn()
          $("#zoom-out").fadeOut()

          krpano = document.getElementById("krpanoObject");
          krpano.call('tween(view.fov,90,2,easeOutCubic,js(showMapIcon()))')
          krpano.call('set(autorotate.enabled,true)')
          $("#zoom-out").off('click')
          $('#zoom-out').remove()
        })    
      }

      // Submarine
      var loadUnderWater = function(_id){
        console.log('loadUnderWater() '+_id)

        $("#video-underwater").addClass('hide')

        $('#video-underwater')[0].src = master.cdn_video + _id + master.videoType
        $('#video-underwater')[0].load()

        $('#video-underwater')[0].addEventListener('canplaythrough', function(e) {
          e.stopPropagation()
          $('#video-underwater').removeClass('hide')
          $('#video-underwater')[0].play();
        }, false);

      }






    </script>



  </body>
</html>