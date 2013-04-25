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
        <video width="100%" height="100%" loop = "true" autoplay style="position:absolute" id="video-underlay">
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

            <li data-url="video/doc_content/ControlRoom_MK_Deadly_Encounters" data-popcorn="klare_01" class="vid-menu-nav">
              <video width="250" volume = "0" loop = "true"  preload="auto">
                  <source src="video/doc_content/ControlRoom_MK_Deadly_Encounters_thumb.webm" type="video/webm" />
              </video> 
              <br>
              Michael Klare: Deadly Encounters
            </li>

            <li data-url="video/doc_content/ControlRoom_MK_Disappearing_Fields" data-popcorn="klare_02" class="vid-menu-nav">
              <video width="250" volume = "0" loop = "true"  preload="auto">
                  <source src="video/doc_content/ControlRoom_MK_Disappearing_Fields_thumb.webm" type="video/webm" />
              </video> 
              <br>
              Michael Klare: Disappearing Fields
            </li>
                        
            <li data-url="video/doc_content/ControlRoom_MK_Nowhere_else_to_go" data-popcorn="klare_03" class="vid-menu-nav">
              <video width="250" volume = "0" loop = "true"  preload="auto">
                  <source src="video/doc_content/ControlRoom_MK_Nowhere_else_to_go_thumb.webm" type="video/webm" />
              </video> 
              <br>
              Michael Klare: Nowhere else to go
            </li>

            <li data-url="video/doc_content/ControlRoom_MK_Spaceship_to_Mars" data-popcorn="klare_04" class="vid-menu-nav">
              <video width="250" volume = "0" loop = "true"  preload="auto">
                  <source src="video/doc_content/ControlRoom_MK_Spaceship_to_Mars_thumb.webm" type="video/webm" />
              </video> 
              <br>
              Michael Klare: Sending a Spaceship to Mars
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


   if(closing){ master.loadVideoUnderlay("video/transitions/action_05",null,true)  
   } else { master.loadVideoUnderlay("video/transitions/oil_shot",null,true) }

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


var klaxxon = function(){
  console.log("KLAXXON")
}
var soundadjust = function(coord,fov) {
  //console.log(coord)

  var convCoord =  Math.abs(coord+60%360);
  var convCoord1 =  Math.abs((coord-120)%360);

  if(convCoord < 180 ){
    soundVector1 = convCoord/180;
  }else{
    soundVector1 = (360-convCoord)/180;
  }
     
  if(convCoord1 < 180 ){
    soundVector2 = (convCoord1)/180;
  }else{
    soundVector2 = (360-(convCoord1))/180;
  }


  if(parent.audiomaster.mix.getTrack('overlay_01') && !master.isTweeningAudio){
    parent.audiomaster.mix.getTrack('basetrack').pan(soundVector2*2-1)
    parent.audiomaster.mix.getTrack('overlay_01').pan(soundVector1*2-1)       
  }

  
  if(fov <5) {
    $('#underlay-control-wrapper').fadeIn(500)
    $('.breadcrumb').fadeOut(500)
    $("#offshorelogo").fadeOut(500)
    $(".compass").fadeOut()
    $(".fastpan").fadeOut()
  }else{
    $('#underlay-control-wrapper').fadeOut(500)
    $('.breadcrumb').fadeIn(500)
     $("#offshorelogo").fadeIn(500)
     $(".fastpan").fadeIn()
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
  var movieMenuWidth = 800

  $('.movie-menu').css("width",movieMenuWidth)
  $('.movie-menu').css("margin-left",-movieMenuWidth/2)

  $('.movie-menu li').each(function(i,v){
    $(this).find("video").prop('muted', true)
    $(this).css("margin", 50);
  })

   


  $("#video-overlay").css("top",dynamicTop)
  $("#video-overlay").css("width",window.innerWidth)
 

  $("#to-control-vid-menu").click(function(){
    $('.movie-menu').fadeOut(500,function(){
    krpano = document.getElementById("krpanoObject");
    krpano.call('tween(view.fov,90,2,easeOutCubic,js(showMapIcon()))')
    parent.audiomaster.mix.setGain(1.0)
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