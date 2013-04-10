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
 
  <a class="volume-toggle"><i class="icon-volume-up"></i></a>
</header>

    <div id="wrapper" class="wrapper">

       <div class="pano-underlay">
        <video width="100%" hieght="100%" loop = "true" style="position:absolute" autoplay id="video-underlay">
           <source src="video/transitions/oil_shot.webm" type="video/webm" />
           <source src="video/transitions/oil_shot.mp4" type="video/mp4" />
        </video> 

      </div>
      <div class="underwater">  </div>

  		<div id="panocontainer" class="controlroom"></div> 
<!-- UNDERLAY VIDEOS -->
      <div id="underlay-control-wrapper" style="position:absolute; display:none;bottom:0;right:0;top:0px;left:0px;">
      
          <a id="to-control-vid-menu" class="platform-nav" style="display:block">Close</a>

          <a id="to-control-vid" class="platform-nav" style="display:none;right:90px">Close</a>

          <ul class="movie-menu">
            <!-- VIDEO THUMBS -->

            <li data-url="video/doc_content/MK_ExtremeFrontiers" data-popcorn="klare_01" class="vid-menu-nav">
              <video width="250" volume = "0" loop = "true" autoplay  preload="auto">
                  <source src="video/doc_content/MK_ExtremeFrontiers_thumb.webm" type="video/webm" />
              </video> 
              <br>
              Michael Klare: At the Frontier of Extreme Oil
            </li>
                        
            <li data-url="video/transitions/3d_seismic_cube03_10sec" data-popcorn="seismic" class="vid-menu-nav">
                <video width="250" volume = 0 loop = "true" autoplay preload="auto">
                  <source src="video/transitions/3d_seismic_cube03_10sec.webm" type="video/webm" />
                </video> 
                <br>
                Digital Imaging: Seismic Survey #1
            </li>

            <li data-url="video/doc_content/MK_EasyOil" data-popcorn="klare_01" class="vid-menu-nav">
              <video width="250" volume = "0" loop = "true" autoplay  preload="auto">
                  <source src="video/doc_content/MK_EasyOil_thumb.webm" type="video/webm" />
              </video> 
              <br>
              Michael Klare: Extreme Oil
            </li>
            <!-- END VIDEO THUMBS -->
          </ul>
          <!-- POPCORN -->
          <div id="footnote-container" style="position:absolute; bottom:20px;left:20px; right:20px;font-size:12pt;text-shadow: 1px 1px 3px #000;"></div>
          
      </div>   
<!-- END UNDERLAY VIDEOS -->

<!-- OVERLAY VIDEOS -->
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
      <source src="audio/21_w.ogg" type="audio/ogg" />

    </audio>



    <!-- JavaScripts -->
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
		<script type="text/javascript" src="js/master-functions.js"></script>
  	<script type="text/javascript" src="js/lib/krpano/swfkrpano.js"></script>
  	<script type="text/javascript" src="js/pano-functions-html5.js"></script>
    <script src="http://popcornjs.org/code/dist/popcorn-complete.js"></script>


    <script>
 var soundVector1 = soundVector2 = soundVector3 = 0;

 var openHatch = function(closing){

  console.log(closing)

   if(closing){
    
   master.loadVideoUnderlay("video/transitions/action_05",null,true)  

   }else{

   master.loadVideoUnderlay("video/transitions/oil_shot",null,true)  

   }
   var transition_audio = $('#transition', window.parent.document)
   transition_audio[0].src = "audio/Hatch_Open.mp3"
   transition_audio[0].play()
   $("#wrapper").delay(200).animate({'bottom': '-10','top': '10'}, 100, function(){
   $("#wrapper").animate({'bottom': '0','top': '0'}, 100)
   })
 }

  var startDrilling = function(stopping){

  console.log($(document))

   if(stopping){
    
    master.loadVideoUnderlay("video/transitions/oil_shot",null,true)  

   }else{

    master.loadVideoUnderlay("video/transitions/action_04",null,true)  

   }
   var transition_audio = $('#transition', window.parent.document)
   transition_audio[0].src = "audio/Hatch_Open.mp3"
   transition_audio[0].play()
   $("#wrapper").delay(200).animate({'bottom': '-10','top': '10'}, 100, function(){
   $("#wrapper").animate({'bottom': '0','top': '0'}, 100)
   })
 }

var soundadjust = function(coord,fov) {
  
  if(fov <5) {
    $('#underlay-control-wrapper').fadeIn(500)
    $('.breadcrumb').fadeOut(500)
    $("#offshorelogo").fadeOut(500)
    $(".compass").fadeOut()
  }else{
    $('#underlay-control-wrapper').fadeOut(500)
    $('.breadcrumb').fadeIn(500)
     $("#offshorelogo").fadeIn(500)
     //$(".compass").fadeIn()
  }

}

$(document).ready(function(){

  var dynamicWidth = window.innerWidth;
  var dynamicHeight = dynamicWidth * .5625;
  var dynamicTop = (window.innerHeight - dynamicHeight)/2; 
  var closeTrigger = 0

  $("#video-underlay").css("top",dynamicTop)
  $("#video-underlay").css("width",window.innerWidth)
  $("#video-underlay").css("height",dynamicHeight)

 //master.videoTrans()
  master.setDeepLinking("controlroom.php")
  master.blankTrans()

  $("#ghost-canvas").css("top",dynamicTop)

  /// VIDEO LOGIC 
  var movieMenuWidth = 300 * $('.movie-menu video').length

  $('.movie-menu').css("width",movieMenuWidth)
  $('.movie-menu').css("margin-left",-movieMenuWidth/2)

  $('.movie-menu li').each(function(i,v){
    $(this).find("video").prop('muted', true)
    $(this).css("margin-top", Math.random()*(window.innerHeight - 300) + 20)
  })

   








  $("#video-overlay").css("top",dynamicTop)
  $("#video-overlay").css("width",window.innerWidth)
 

  $("#to-control-vid-menu").click(function(){
    $('.movie-menu').fadeOut(500,function(){
    krpano = document.getElementById("krpanoObject");
    krpano.call('tween(view.fov,90,2,easeOutCubic,js(showMapIcon()))')
    master.loadVideoUnderlay("video/transitions/oil_shot",null,true)   
    })

  })

  $("#to-control-vid").click(function(){
    $('.movie-menu').fadeIn(500,function(){
     $('#to-control-vid').css('display','none')
     $('#to-control-vid-menu').css('display','block')     
    })

     master.loadVideoUnderlay("video/transitions/oil_shot",null)
  })

  $(".vid-menu-nav").click(function(){
   var that = this      

    $('#to-control-vid').css('display','block')
    $('#to-control-vid-menu').css('display','none')

    $('.movie-menu').fadeOut(500,function(){
       master.loadVideoUnderlay($(that).data('url'),$(that).data('popcorn'))
    })
    
  })

  $("#to-control").click(function(){
    closeVideo()
  })
  ///END VIDEO LOGIC
})

    </script>



  </body>
</html>