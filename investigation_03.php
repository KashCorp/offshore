<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OFFSHORE | Wirefame Waves</title>
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="Coming soon: OFFSHORE, an interactive documentary about the next chapter of oil exploration and exploitation">
    <meta name="author" content="">

    <link rel="image_src" href="images/bg_drillhead.jpg" />
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
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

<style>

#map-container {
  position: absolute;
  color:#ffffff;
  height:50%;
  width:50%;
  display:block;

  -webkit-perspective: 500; 
  -moz-perspective: 1000; 
  -o-perspective: 1000; 
  -webkit-perspective-origin: 50% 50%;  
}

ul {
  font-size: 0;
}

.transition-class{

  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;

}
ul li {



  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  list-style-type: none;
  padding:0;
  cursor: pointer;
}

ul li img { 
 position: absolute; 

}

.dragger {
position: absolute;
top:300px;
right:500px;
width:24px;
height:24px;
opacity:.5;
background: url('images/icn_dragger.png');
}

.photo{
  border:5px solid white;
  box-shadow: 10px 10px 10px rgba(0,0,0,.5);
}


#textholder {
position: absolute;
top: 10%;
width:100%;
pointer-events:none;
text-align: center;
color: #ffffff;
font-size: 25px;
text-shadow: 1px 1px 3px #000;
}



#scan_image_holder {
  position: absolute;
  width: 100%;
  left:0px;
  overflow:hidden;


}

#scan_image_lines {
  position: absolute;
  width: 100%;
  height: 100%;
  left:0px;
  opacity:.5;
  background: url('images/bg_linematrix2x2_blue.gif');
  overflow:hidden;

}

.lease_maps {
  position: absolute;
  opacity: .4;
  left:0px;
  width: 100%;
}

.word {

position: absolute;
  width: 100%; 
  text-align: center;
  bottom: 40%;
  color: #fff;
  font-family: 'DinRegular', Helvetica, Arial, sans-serif;
  font-size: 50px;
  text-shadow: 1px 1px 3px #000;


}

.cloud {
  position: absolute;
  width: 100%; 
}

</style>

  </head>

<body class="platform" style="background:none">

<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<header>
  <a class="volume-toggle"><i class="icon-volume-up"></i></a>
</header>

    <div id="wrapper" class="wrapper" style="display:block">

      <div id="scan_image_holder">
        
      <img class="lease_maps"  id="lease_map_01" src="http://www.offshoreenergytoday.com/wp-content/uploads/2012/04/USA-Western-GoM-Lease-Sale-Generates-USD-325-mln.jpg">

      <div id="scan_image_lines"></div>

      </div>
      
        <div id="map-container">

        <ul>
          <li data-label="6"><img class="photo" style="top:220px" width="100%" src="images/report_01/alaska_horizon.jpg"></li>
          <li data-label="5"><img class="photo" src="images/report_01/oil_leak.jpg"></li>
          <li data-label="4"><img class="photo"style="top:180px" width="650" src="images/report_01/grating.jpg"></li>
          <li data-label="3"><img class="photo" style="top:100px" width="560" src="images/report_01/offshore_anywhere.jpg"></li>
          <li data-label="2"><img class="photo" width="520" src="images/report_01/spartan_map_sm.jpg"></li>
          <li data-label="1" ><img src="images/folder_front.png"></li>
        </ul>



        </div>
      </div>
      
       <img id = "gradient" src = "images/overlay_gradient_blue" style="pointer-events:none;top:0px; display:block; position: absolute;width:100%;height:50%;opacity:0.7"/>
      <div id="textholder">Welcome to SPARTAN 208</div>
      <a id="to-control" class="platform-nav">Close</a>
  		<div class="breadcrumb"></div>
         
  	</div>
     



    <div id="inter-text" style="display: block"></div>



  

    <!-- JavaScripts -->

    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="js/lib/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>




    <script>
      $(document).ready(function(){

      $("#to-control").click(function(){
        parent.master.closeBook()
      })

      $("#map-container ul li").click(function(){
       // parent.newPage($(this).data("url") + '.php')
       //window.history.back();
      })



      
      var webArray = [
      'images/rig_map/lease_map_bg_china.png', 
      'images/rig_map/lease_map_bg_brazil.png', 
      'images/rig_map/lease_map_bg_africa.png', 
      ]

      var titleArray ={
      '1':'Welcome to SPARTAN 208',
      '2':'SPARTAN 208 is a virtual drilling platform, operating in ...',
      '3':'the Gulf of Mexico, Brasil, Africa, the Arctic ...',
      '4':'an imaginary entry point into ...',
      '5':'a very real world ...',
      '6':'a place where things go wrong ...'
      }

      var webPos = Math.floor(Math.random()*webArray.length) , currentWebPos = 0, arrayKey = 1

      $(function() {
            $( "ul li" ).draggable();
      });

      $("ul li").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
        console.log("removeClass")
         $("ul li").removeClass('transition-class')
      })

      $("ul li").click(function(){ 
        if(arrayKey == $(this).data('label')) return
        var that = this
         $('ul li').each(function(i, v){
            $("ul li").addClass('transition-class')
            if(this==that){
               $(this).css('z-index', '1');
               $(this).css('-webkit-transform', 'translateZ(100px)');
            }else{
               $(this).css('z-index', '-1');
               $(this).css('-webkit-transform', 'translateZ(-300px)');
            }
        });
       
        arrayKey = $(this).data('label')
        $('#textholder').fadeOut(500, function(){
          $('#textholder').html(titleArray[arrayKey])
          $('#textholder').fadeIn(500)
        })
      })

       var setStage = function(){

         var dynamicWidth = window.innerWidth;

         var dynamicHeight = dynamicWidth * .5625;

         var dynamicTop = (window.innerHeight - dynamicHeight)/2;

         var dynamicRatio = window.innerHeight/window.innerWidth
         $("#map-container").css("top", dynamicTop)
         $("#scan_image_holder").css("top", dynamicTop)
         $("#scan_image_holder").css("height", dynamicHeight)

         

        // var walkthrough = new walkthroughFunctions(dynamicWidth,dynamicHeight,"walking-canvas","video/video_clips/downstairs/",241)
         //$("#words-container").css("top", -dynamicHeight*.5)
         //scrollPos = walkthrough.scrollStopFunction()

        var intervalID = setInterval(function() {

          if  (webPos < webArray.length-1) {
            webPos ++ 
              $("#lease_map_01").fadeOut(500, function() {
              $("#lease_map_01")[0].src = webArray[webPos]
              $("#lease_map_01").fadeIn(500)
            })
          }else{
           webPos = 0
           }
        },5000)

        $("#lease_map_01")[0].src = webArray[webPos]



       } //end setStage

      setStage()

      window.onresize = function(event) {
      setStage()
      }

      })

    </script>



  </body>
</html>