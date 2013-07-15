<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OFFSHORE | Passageway Theatre</title>
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

<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<header>
  <a class="volume-toggle"><i class="icon-volume-up"></i></a>
</header>

    <div id="scroll-wrapper" class="wrapper">
      <canvas id="walking-canvas" style="position:absolute" width="1200" width="800"></canvas>

       <div id="viewport" style="left:0px">

         <div id='word-container' style='left:0;-webkit-transform:translateZ(-1400px)'>
          <ul>
            <li id="word_01">... in the porches of my ears did pour the leperous distilment.</li>
          </ul>
        </div>       
      </div>
           
      <div id="scroll-start" class="scroll-nav">Go Back?</div>
      <div id="scroll-end" class="scroll-nav">Continue?</div>
      <div class="scroll-directions-container"><div id="scroll-directions"></div></div>
      <!--<div id="panocontainer" class="platform"></div>-->
      <div class="breadcrumb"></div>
      <canvas id="ghost-canvas" width="1200" height="800" style="position:absolute;display:none;position:absolute;top:15%;left:0;pointer-events:none"></canvas>

    </div>

    

    <div id="inter-text" style="display: block"></div>
<!--
   <audio style="display: none" id="audio-platform" preload="auto" class="ambient" loop="loop">
      <source src="audio/Hatch_Ambience_Clock.ogg" type="audio/ogg" />
      <source src="audio/Hatch_Ambience_Clock.mp3" type="audio/mpeg" />
    </audio>

          <audio style="display: none" id="whisper_02" volume=0 preload="auto" class="whisper" loop="loop">
      <source src="audio/whispers/rossina_whisper.ogg" type="audio/ogg" />
      <source src="audio/whispers/deep_water_tech.mp3" type="audio/mpeg" />
    </audio>
-->
    <div id="scroll-proxy"></div>

    <!-- JavaScripts -->

    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="js/lib/modernizr.min.js"></script>
    <script type="text/javascript" src="js/lib/Tween.js"></script>
    <script type="text/javascript" src="js/master-functions.js"></script>



    <script>
      $(document).ready(function(){

       master.blankTrans(1)

       master.setDeepLinking("passage_chemicalroom.php")

       $("#scroll-start").click(function(){
        newPage('hallway.php')
       });

       $("#scroll-end").click(function(){
        newPage("subhanger.php")
       });

      var overlayTrack = parent.audiomaster.mix.getTrack('overlay_01'), overLayFile = 'audio/Hatch_Ambience_Clock.mp3'

        if( overlayTrack){

        var dummysound = { decayFrom:  overlayTrack.options.gainNode.gain.value};

        var driftTweenSound = new TWEEN.Tween( dummysound ).to( { decayFrom: 0}, 3000 )
            .onUpdate( function() {
                master.isTweeningAudio = true
                overlayTrack.gain(this.decayFrom)
            })
            .easing(TWEEN.Easing.Quadratic.Out )
            .onComplete(function() {
            parent.audiomaster.mix.removeTrack('overlay_01')

            if(overLayFile)
            console.log("good to go")  
            master.loadOverlayAudio(overLayFile);
            })
            .start(); 

        }else{
          if(overLayFile)
             master.loadOverlayAudio(overLayFile)
        }

        var setStage = function(){

        var dynamicWidth = window.innerWidth;

        var dynamicHeight = dynamicWidth * .5625;

        var dynamicTop = (window.innerHeight - dynamicHeight)/2;

        $("#walking-canvas").css("top",dynamicTop)

        var walkthrough = new walkthroughFunctions(dynamicWidth,dynamicHeight,"walking-canvas","corridor",65)

        var ghost = new ghostFunctions(dynamicWidth,dynamicHeight,"ghost-canvas","ghost_walktowardscamera2_",16)
 
        ghost.imageSequencer()

        var scrollTrigger,scrollPercent = 0

        parent.audiomaster.mix.getTrack('overlay_01').pan(1)

        function scrollerFunction(){

            var zPos = walkthrough.scrollValue*.4

            $('#word_01').css('-webkit-transform', 'translateZ(' + zPos * 1.6 + 'px)');
            $('#word_01').css('opacity', walkthrough.scrollPos/100);
          
            if(walkthrough.scrollPos  > 40 && walkthrough.scrollPos < 60){
                $("#ghost-canvas").fadeIn(2500)
                $("#ghost-controls").fadeIn(500)
            }else{
                $("#ghost-canvas").fadeOut(2500)
                $("#ghost-controls").fadeOut(2500)
            }

            scrollPercent = Math.ceil((walkthrough.scrollValue / (5000-$(window).height())) * 100);
            //if(!scrollTrigger) $('#whisper_02')[0].play()
            scrollTrigger = true

            if(parent.audiomaster.mix.getTrack('overlay_01') && !master.isTweeningAudio){
                parent.audiomaster.mix.getTrack('overlay_01').pan(1 - scrollPercent/50)    
            } 
            
            if(walkthrough.scrollPos < 5){
                $("#scroll-start").fadeIn(1000)
            }else{
                $("#scroll-start").fadeOut(700)
            }

             if(walkthrough.scrollPos > 85){
                newPage("chemicalroom.php")
                console.log("end of passageway")

                $("#scroll-end").fadeIn(1000)
            }else{
                $("#scroll-end").fadeOut(1000)
            }

            requestAnimationFrame(scrollerFunction)
        }

        scrollerFunction()

      }

      setStage()

      window.onresize = function(event) {
      setStage()
      }

        var runFrameRunner = function(){

            requestAnimationFrame(runFrameRunner);
    
            TWEEN.update()
              
            if(!parent.audiomaster) return

            for ( var i = 0, l = parent.audiomaster.mix.tracks.length; i < l; i++ ){                        
               parent.audiomaster.mix.tracks[i].play()                  
            }  
             
        }
        runFrameRunner()  

      })

    </script>



  </body>
</html>