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

  <body style="overflow:hidden;"  class="platform">

<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<header>
  <a class="volume-toggle"><i class="icon-volume-up"></i></a>
</header>

    <div id="wrapper" class="wrapper">

       <div class="pano-underlay">
        <video width="100%" autoplay loop = "true" style="position:absolute;" id="video-underlay" preload="auto">
           <source src="video/transitions/oil_shot.webm" type="video/webm" />
        </video> 
      </div>
      <div class="underwater">  </div>

      <div id="panocontainer" class="hallway"></div>
      <img id = "gradient" src = "images/overlay_gradient_blue_upside_down.png" style="pointer-events:none;bottom:0px; display:block; position: absolute;width:100%;height:40%;opacity:0.7"/>
  	
<!-- UNDERLAY VIDEOS -->
      <div id="underlay-control-wrapper" style="position:absolute; display:none;bottom:0;right:0;top:0px;left:0px;">
      
          <a id="to-control-vid-menu" class="platform-nav" style="display:block">Close</a>

          <a id="to-control-vid" class="platform-nav" style="display:none;">Close</a>

          <ul class="movie-menu">
            <!-- VIDEO THUMBS -->
            //dean_blanchard_720

            <li data-url="video/doc_content/dean_blanchard_720" class="vid-menu-nav">
                <video width="250" volume = 0 loop = "true" autoplay preload="auto">
                  <source src="video/doc_content/dean_blanchard_720_thumb.webm" type="video/webm" />
                </video> 
                <br>
                Dean Blanchard: Mad as Hell
            </li>

            <li data-url="video/transitions/3d_seismic_cube05_10sec" data-popcorn="seismic" class="vid-menu-nav">
                <video width="250" volume = 0 loop = "true" autoplay preload="auto">
                  <source src="video/transitions/3d_seismic_cube05_10sec.webm" type="video/webm" />
                </video> 
                <br>
                Digital Imaging: Seismic Survey #2
            </li>

            <li data-url="video/doc_content/MK_ExtremeFrontiers" data-popcorn="klare_01" class="vid-menu-nav">
              <video width="250" volume = "0" loop = "true"  preload="auto">
                  <source src="video/doc_content/MK_ExtremeFrontiers_thumb.webm" type="video/webm" />
              </video> 
              <br>
              Michael Klare: At the Frontier of Extreme Oil
            </li>
            <!-- END VIDEO THUMBS -->
          </ul>
          <!-- POPCORN -->
          <div id="footnote-container" style="position:absolute; bottom:20px;left:20px; right:20px;font-size:12pt;text-shadow: 1px 1px 3px #000;"></div>
          
      </div>   
<!-- UNDERLAY VIDEOS -->


      <div class="breadcrumb"></div>

      <div class="video-content-wrap">
       
      <video width="100%" style="position:absolute;display:none;" id="video-overlay" preload="auto">
        <source/>
      </video>

       <a id="to-control" class="platform-nav">Close</a>
      </div>

  	</div>



    <div id="inter-text" style="display: block"></div>
<!--
   <audio style="display: none" id="audio-platform" preload="auto" class="ambient" loop="loop">
      <source src="audio/Bong.ogg" type="audio/ogg" />
    </audio>

      <audio style="display: none" id="whisper_01" volume=0 preload="auto" class="whisper" loop="loop">
      <source src="audio/Helipad_Ambiance_Music1.ogg" type="audio/ogg" />
 
    </audio>
      
    <audio style="display: none" id="whisper_02" volume=0  preload="auto" class="whisper" loop="loop">
      <source src="audio/whispers/rosemary_whisper_01.ogg" type="audio/ogg" />
  
    </audio>
    -->



    <!-- JavaScripts -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
		<script type="text/javascript" src="js/master-functions.js"></script>
  	<script type="text/javascript" src="js/lib/krpano/swfkrpano.js"></script>
  	<script type="text/javascript" src="js/pano-functions-html5.js"></script>
     <script src="http://popcornjs.org/code/dist/popcorn-complete.js"></script>


    <script>


    	
    	  var convCoord = 0, soundVector1 = soundVector2 = soundVector3 = 0;
        var focus1 = 180,focus2 = 290

	var soundadjust = function(coord,fov) {
		
		 
		 
		 
		var convCoord =  Math.abs(coord%360);
		var convCoord1 =  Math.abs((coord-180)%360);
		

       if(convCoord > 150 && convCoord < 180){
          $("#ghost-canvas-trans").fadeIn(500)
        }else{
          $("#ghost-canvas-trans").fadeOut(500)
        }

    if(fov <5) {
      $('#underlay-control-wrapper').fadeIn(500)
      $('.breadcrumb').fadeOut(500)
      $("#offshorelogo").fadeOut(500)
      $(".compass").fadeOut()
      $("#gradient").fadeOut()
      $(".vignette").fadeOut()
    }else{
      $('#underlay-control-wrapper').fadeOut(500)
      $('.breadcrumb').fadeIn(500)
      $("#offshorelogo").fadeIn(500)
      $("#gradient").fadeIn()
      $(".vignette").fadeIn()
    }
  
     
    
		if(convCoord < 180 ){
			soundVector1 = convCoord/180 *.07;
		}else{
			soundVector1 = (360-convCoord)/180 *.07;
		}
		 
	  if(convCoord1 < 180 ){
			soundVector2 = (convCoord1)/180 *.07;
		}else{
			soundVector2 = (360-(convCoord1))/180 *.07;
		}

   //console.log(Math.exp(soundVector2))
   /*
    $('#whisper_01')[0].play()
     $('#whisper_02')[0].play()
   
		$('#whisper_01')[0].volume = soundVector2;
		$('#whisper_02')[0].volume = soundVector1;
    */

	}
	
$(document).ready(function(){

  var dynamicWidth = window.innerWidth;
  var dynamicHeight = dynamicWidth * .5625;
  var dynamicTop = (window.innerHeight - dynamicHeight)/2; 
  var closeTrigger = 0

  master.ghostTrans('2guys_walk_away3',14)
  master.setDeepLinking("hallway.php")


  /// VIDEO LOGIC 
  var movieMenuWidth = 300 * $('.movie-menu video').length

  $('.movie-menu').css("width",movieMenuWidth)
  $('.movie-menu').css("margin-left",-movieMenuWidth/2)

  $('.movie-menu li').each(function(i,v){
    $(this).find("video").prop('muted', true)
    $(this).css("margin-top", Math.random()*(window.innerHeight - 300) + 20)
  })

   

  function loadVideoUnderlay(_id,_popcorn,_load_menu){
    
    master.audioFadeAll(0.1)
    if( this.popcorn) Popcorn.destroy(  this.popcorn );
    $('#footnote-container').html('')
    if(_popcorn){
       this.popcorn = Popcorn("#video-underlay");
       this.popcorn.parseJSON( "json/"+_popcorn+".json?rnd="+Math.random()*10, function() {

        console.log( _popcorn + " parsed successfully" );
      });
    }

    $("#video-underlay").fadeOut(1000, function() {        
        $('#video-underlay source').attr('src', _id + ".webm");
        $('#video-underlay video').load();
        $("#video-underlay")[0].load()
        $("#video-underlay")[0].play()
        $("#video-underlay").fadeIn(500)
        if(_load_menu) $('.movie-menu').css('display','block')
       // }
        
    })

  }






  $("#video-overlay").css("top",dynamicTop)
  $("#video-overlay").css("width",window.innerWidth)
 

  $("#to-control-vid-menu").click(function(){
    $('.movie-menu').fadeOut(500,function(){
    krpano = document.getElementById("krpanoObject");
    krpano.call('tween(view.fov,90,2,easeOutCubic)')
     master.audiocontrol('play')
    loadVideoUnderlay("video/transitions/oil_shot",null,true)   
    })

  })

  $("#to-control-vid").click(function(){
    $('.movie-menu').fadeIn(500,function(){
     $('#to-control-vid').css('display','none')
     $('#to-control-vid-menu').css('display','block')     
    })

    loadVideoUnderlay("video/transitions/oil_shot",null)
  })

  $(".vid-menu-nav").click(function(){
   var that = this      

    $('#to-control-vid').css('display','block')
    $('#to-control-vid-menu').css('display','none')

    $('.movie-menu').fadeOut(500,function(){
      loadVideoUnderlay($(that).data('url'),$(that).data('popcorn'))
    })
    
  })

  $("#to-control").click(function(){
    
     console.log("close video")
    closeVideo()
  })
  ///END VIDEO LOGIC
        


})

    </script>


  </body>
</html>