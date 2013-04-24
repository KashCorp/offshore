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

#map-container, #image-container  {
  position: absolute;
  width: 1720px; 
  text-align: center;
  color:#ffffff;
  display:block;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;

 
}

#map-container  {
    -webkit-transform: translateZ(-500px)
}

#image-container  {
    -webkit-transform: translateZ(-1000px)
}

#map-container, #image-container ul {
  position: absolute;
  font-size: 0;
}

#map-container ul li {
  float: left;
  list-style-type: none;
  box-shadow: 0px 0px 0px rgba(0,0,0,.5);*/
  position:relative;
  padding:0;
  margin:-1px;
 -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  
  cursor: pointer;
}

#image-container ul li {
  display: table;
  width:100%;
  text-align: center;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  list-style-type: none;
  padding:0;
  position: absolute; 
  top:0; 
  bottom:0; 
  left:0; 
  right:0;
}

#image-container ul li div {
  display: block;
  width:100%;
  padding:5px;
  position: absolute; 
  top:0; 
  left:0; 
  font-size: 20px;
  text-align:left;
  background: url(images/bg_black_50.png);
}

#photo-container ul li img { 
vertical-align: middle; 

}



.textholder {
/*position: absolute;
top:40%;
left:20%;
*/
text-align:left;
color: #ffffff;
font-size: 30px;
-webkit-transform: translateZ(0px);
background:#000000;
border:1px solid;
margin-bottom: 20px;
padding:5px;
cursor:pointer;

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
  opacity: .2;
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

    <div id="scroll-wrapper" class="wrapper" style="display:block">
      <div id="scan_image_holder">
        <!--<div id="scan_image_lines"></div>-->
      </div>
      
      <div id="viewport" style="left:0px">
        <div id='image-container'>
          <ul>
            <li id="leasemap_05"><img src="images/rig_map/leases/lease_05.jpg"><div>Contextual text goes here</div></li>
            <li id="leasemap_04"><img src="images/rig_map/leases/lease_04.jpg"><div>Contextual text goes here</div></li>
            <li id="leasemap_03"><img src="images/rig_map/leases/lease_03.jpg"><div>Contextual text goes here</div></li>
            <li id="leasemap_01"><img src="images/rig_map/leases/lease_01.jpg"><div>Contextual text goes here</div></li>
          </ul>
        </div>
      </div>
      
      

      <a id="to-control" class="platform-nav">Close</a>
      <div id="scroll-directions"></div>
  		<div class="breadcrumb"></div>
       
     
       
  	</div>
     
    <div id="scroll-proxy"></div>






  

    <!-- JavaScripts -->

    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="js/lib/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>




    <script>
      $(document).ready(function(){

      $(".platform-nav").click(function(){
       parent.master.closeBook()
      })

      $("#map-container ul li,.textholder").click(function(){
        if($(this).data("url")) parent.newPage($(this).data("url") + '.php')
       //window.history.back();
      })



    


    var  currentWebPos = 0

      $(function() {
            $( "#viewport" ).draggable();
      });

       var setStage = function(){

         var dynamicWidth = window.innerWidth;

         var dynamicHeight = dynamicWidth * .5625;

         var dynamicTop = (window.innerHeight - dynamicHeight)/2;

         var dynamicRatio = window.innerHeight/window.innerWidth


         

        // var walkthrough = new walkthroughFunctions(dynamicWidth,dynamicHeight,"walking-canvas","video/video_clips/downstairs/",241)
         //$("#words-container").css("top", -dynamicHeight*.5)
         //scrollPos = walkthrough.scrollStopFunction()


        var scrollValue = 0

        $.getScript("js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
           $( "#scroll-directions" ).draggable({ 
              axis: "y",
              drag: function() {
                scrollValue =  (parseInt($( "#scroll-directions" ).css('top'))- 80) * 10000 / (window.innerHeight -160)
                 scrollFunction()
              }
             });
         }); 


        var scrollPercent = 0,transZPos = -4000

        function scrollFunction() {

        scrollPercent =  scrollValue / (5000 - $(window).height()) * 100;
  	       


           var zPos = scrollValue*.4
           //box-shadow: ;
          //$("#map-container ul li").css("box-shadow","20px 30px "+scrollPercent*4+"px rgba(0,0,0,.5)")
           $('#leasemap_05').css('-webkit-transform', 'translateZ(' + zPos * .6 + 'px)');
           $('#leasemap_04').css('-webkit-transform', 'translateZ(' + zPos * .8 + 'px)');
           $('#leasemap_03').css('-webkit-transform', 'translateZ(' + zPos * 1.2 + 'px)');
           $('#leasemap_01').css('-webkit-transform', 'translateZ(' + zPos * 1.6 + 'px)');
           /*
           $('#rigmap_01').css('-webkit-transform', 'translateZ(' + zPos * .8 + 'px)');
           $('#rigmap_02').css('-webkit-transform', 'translateZ(' + zPos + 'px)');
           $('#rigmap_05,#t5').css('-webkit-transform', 'translateZ(' + zPos * 1.1  + 'px)');
           $('#rigmap_04,#t4').css('-webkit-transform', 'translateZ(' + zPos * 1.2 + 'px)');
           $('#rigmap_03,#t3').css('-webkit-transform', 'translateZ(' + zPos * 1.3 + 'px)');
           $('#rigmap_06,#t6').css('-webkit-transform', 'translateZ(' + zPos * 1.4 + 'px)');
           $('#rigmap_08,#t8').css('-webkit-transform', 'translateZ(' + zPos * 1.5 + 'px)');
           $('#rigmap_07,#t7').css('-webkit-transform', 'translateZ(' + zPos * 1.6 + 'px)');
           */


         }


       }

      setStage()

      window.onresize = function(event) {
      setStage()
      }

      })

    </script>



  </body>
</html>