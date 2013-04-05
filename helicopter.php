<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Helicopter | OFFSHORE</title>
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

  <body class="p-helicopter">
    <header>


      <a class="volume-toggle"><i class="icon-volume-up"></i></a>
    </header>

    <div id="wrapper" class="wrapper">
      <div id="panocontainer" class="helicopter"></div>

      <div class="breadcrumb"></div>
    </div>

    <div style="display:none">
      <img src="images/panos/platform/hotspots/entry.png" />
    </div>
    <!--<div id="wrapper" class="wrapper">
    	 <div class="countdownhatch"></div>

      <ul class="nav">
        <li><a href="blog"><img src="images/nav/blog.png" alt="Helipad"></a></li>
      </ul>

    </div>--><!-- /.wrapper 
    <div id="inter-text"></div>

    <audio id="audio-platform" preload="auto" class="ambient" loop="loop">
      <source src="audio/Helicopter_Voices.ogg" type="audio/ogg" />
      <source src="audio/Helicopter_Voices.mp3" type="audio/mpeg" />
    </audio>
 

    <audio style="display: none" id="whisper_01" volume=0 preload="auto" class="whisper" loop="loop">
      <source src="audio/Bong.ogg" type="audio/ogg" />
    </audio>
 -->

    <!-- JavaScripts -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
    <!--<script type="text/javascript" src="js/lib/jquery.countdown.min.js"></script>-->
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
		<script type="text/javascript" src="js/master-functions.js"></script>
    <!--<script type="text/javascript" src="js/lib/jquery.address.min.js"></script>-->
    <script type="text/javascript" src="js/lib/krpano/swfkrpano.js"></script>
    <script type="text/javascript" src="js/pano-functions-html5.js"></script>
    <script type="text/javascript" src="js/lib/jquery.countdown.min.js"></script>

    <script>

      var soundVector1 = soundVector2 = soundVector3 = 0,currentSoundVector;


      
      var soundadjust = function(coord) {
    
     
      var convCoord =  Math.abs(coord%360);
      var convCoord1 =  Math.abs((coord-270)%360);
      if (currentSoundVector){

         var soundDelta = convCoord - currentSoundVector

         //console.log(soundDelta)
      }

      currentSoundVector = convCoord
      

        if(convCoord < 180 ){
          soundVector1 = convCoord/180;
        }else{
          soundVector1 = (360-convCoord)/180;
        }

        //console.log(soundVector1*2-1)
       

   
        if(convCoord1 < 180 ){
          soundVector2 = (convCoord1)/180;
        }else{
          soundVector2 = (360-(convCoord1))/180;
        }

        if(parent.audiomaster.mix.getTrack('overlay_01') && !master.isTweeningAudio){
          
           parent.audiomaster.mix.tracks[0].pan(soundVector2*2-1)
           parent.audiomaster.mix.tracks[0].gain(soundVector2)
       
            parent.audiomaster.mix.getTrack('overlay_01').gain(soundVector1/3)
            parent.audiomaster.mix.getTrack('overlay_01').pan(soundVector1*2-1)       
           }
 
/*
        $('#whisper_01')[0].play()

       
        $('#whisper_01')[0].volume = soundVector1;

        $('#audio-1',parent.document)[0].volume = soundVector2

  */
       }
      $(document).ready(function(){

      // $('#inter-text' ).shuffleLetters();
		 master.blankTrans()
     master.setCookie('transition','0')
        document.addEventListener( 'mousedown', function(){$('#inter-text').fadeOut(350);}, false );
        master.setDeepLinking("helicopter.php")

      })
      //if(parent.audiomaster) parent.audiomaster.loadAudio('audio/Helicopter_Voices1.mp3','overlay_01',0.2,-1)

    </script>

  </body>
</html>