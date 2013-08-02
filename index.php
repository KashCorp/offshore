<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OFFSHORE</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="OFFSHORE, an interactive documentary about the next chapter of oil exploration and exploitation">
    <meta name="author" content="">
    <link rel="image_src" href="images/offshore_fb_thumb.jpg" />
    <link rel="stylesheet" type="text/css" href="css/style.css">
    
    <meta property="og:image" content="images/offshore_fb_thumb.jpg"/>
    <meta property="og:title" content="OFFSHORE, an interactive documentary about the next chapter of oil exploration and exploitation"/>
    <meta property="og:url" content="http://offshore-interactive.com/"/>
    <meta property="og:site_name" content="OFFSHORE"/>
    <meta property="og:type" content="website"/>


<script>
	

</script>
  </head>

  <body class="p-credits" onload="checkHash()">
  	
  	<!--<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>-->

<iframe id="container-frame" src="all_panos.php"></iframe>

<!--<div style="position:absolute; top:0px; left:0px; right:0px; bottom:0px; display:block;pointer-events:none;background-image:url('images/vignette.png');background-size:100% 100%"></div>-->

<div id="social-media" style="position:absolute; top:0px; left:26px;display:none">
      <div id="fb-root"></div>
      <script>
        // Load the SDK Asynchronously
        (function(d){
           var fbjs, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
           if (d.getElementById(id)) {return;}
           fbjs = d.createElement('script'); fbjs.id = id; fbjs.async = true;
           fbjs.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
           ref.parentNode.insertBefore(fbjs, ref);
         }(document));
      </script>

 <div style="padding-top:5px;float:left;" class="fb-like" data-href="http://www.offshore-interactive.com" data-send="false" data-layout="button_count" data-width="150" data-show-faces="false" data-font="arial"></div>

	<div style="padding-top:5px;padding-left:5px;float:left;width:100px">
    <a  href="https://twitter.com/share" class="twitter-share-button" data-href="http://www.offshore-interactive.com" data-text="Coming soon: OFFSHORE, an interactive documentary about the next chapter of oil exploration and exploitation" data-via="OFFSHOREwebdoc">Tweet</a>
  </div>
</div> 


    
    <!--
    <audio id="vo" preload="auto" class="ambient" autoplay>
      <source src="audio/Klare_01_Risk.ogg" type="audio/ogg" />
    </audio>  

    

    
    	<source src="audio/Transition_Sound.ogg" type="audio/ogg" />
      <source src="audio/Transition_Sound.mp3" type="audio/mpeg" />
   

  -->
      <audio id="transition" preload="auto" class="ambient"><source/></audio>  
      
      <script type="text/javascript" src="js/lib/modernizr.min.js"></script>
      <script type="text/javascript" src="js/lib/jquery.min.js"></script>
      <script type="text/javascript" src="js/lib/audioMixerOFFSHORE.js"></script> 
      <script type="text/javascript" src="js/lib/Tween.js"></script>

      <script>

      var IS_PARENT = true;

      function checkHash(){
        var locationHash = location.hash
        if(locationHash){
          //$('#container-frame').attr('src',locationHash.replace('#',''))
        }else{
          //$('#container-frame').attr('src','all.php')
        }
      }
      
      function setHash(locationHash){
         location.hash = locationHash
      }   
      

 



    

  
      var audioMaster = function() {

        var thisMixer = this;
        var mix = new Mix();
        return {
          mix: mix,
          sources:[],
          loadAudio : function(_src,_name,gain,pan,nolooping,_start){
            if(!_start) _start = 0
              var track = this.mix.createTrack(_name, {source: _src, gain:gain, pan:pan, nolooping:nolooping, start:_start});  

          }

        }

      } 

      var audiomaster = new audioMaster();
      
      audiomaster.loadAudio('audio/Drone_1_norm.mp3','basetrack',1,0)



      </script>   
  </body>
</html>