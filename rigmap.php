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

    top: 50%;
    margin-top: -663px;
    left: 50%;
    margin-left: -860px;

    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
  }

  #map-container  {-webkit-transform: translateZ(-500px) }
  #image-container  {-webkit-transform: translateZ(-2500px) }

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
    /*margin:-1px;*/
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

  .map_labels div {
    position: absolute;
    width: 50px;
    height: 50px;
    background: black;
    border-radius: 50px;
    cursor: pointer;
    
    font-family: 'DinRegular', Helvetica, Arial, sans-serif;
    font-weight: bold;
    text-align: center;
    font-size: 45px;
    line-height: 55px;
    color: #ecc60a;

  }

    .map_labels div:hover, .map_labels div.hover {
      color: black;
      background: #ecc60a;
    }
  
  .text_labels {
    position:absolute;
    top:300px;
    left:100px
  }

    .text_labels div {
      width: 445px;
      -webkit-transform: translateZ(0px);
      background:#000000;
      margin-bottom: 30px;
      padding: 5px 10px;
      cursor:pointer;
      
      text-align:left;
      font-size: 40px;
      font-weight: bold;
      color: #ecc60a;
    }

    .text_labels div span {
      display: inline-block;
      width: 50px;
      height: 50px;
      background: #ecc60a;
      border-radius: 50px;
      
      font-family: 'DinRegular', Helvetica, Arial, sans-serif;
      font-weight: bold;
      text-align: center;
      font-size: 45px;
      line-height: 55px;
      color: black;
    }

    .text_labels div:hover, 
    .text_labels div.hover {
      color: black;
      background: #ecc60a;
    }

    .text_labels div:hover span, 
    .text_labels div.hover span {
      color: #ecc60a;
      background: black;
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
        
        <!-- Lease Map -->
        <div id='image-container'>
          <ul>
            <li id="leasemap_05"><img src="images/rig_map/leases/lease_05.jpg"><div>Caribbean</div></li>
            <li id="leasemap_04"><img src="images/rig_map/leases/lease_04.jpg"><div>Brazil</div></li>
            <li id="leasemap_03"><img src="images/rig_map/leases/lease_03.jpg"><div>Alaska</div></li>
            <li id="leasemap_02"><img src="images/rig_map/leases/lease_02.jpg"><div>West Africa</div></li>
            <li id="leasemap_01"><img src="images/rig_map/leases/lease_01.jpg"><div>Gulf of Mexico</div></li>
          </ul>
        </div>
        
        <!-- Rig Map -->
        <div id="map-container">
          <ul>
            <li style="cursor:default" id="rigmap_01"><img src="images/rig_map/rig_map_01.jpg"></li>
            <li style="cursor:default" id="rigmap_02"><img src="images/rig_map/rig_map_02.jpg"></li>
            <li data-url="platform" id="rigmap_03"><img src="images/rig_map/rig_map_03.jpg"></li>
            <li data-url="controlroom" id="rigmap_04"><img src="images/rig_map/rig_map_04.jpg"></li>
            <li data-url="hallway" id="rigmap_05a"><img src="images/rig_map/rig_map_05a.jpg"></li>
            <li data-url="theater" id="rigmap_05b"><img src="images/rig_map/rig_map_05b.jpg"></li>
            <li data-url="chemicalroom" id="rigmap_06"><img src="images/rig_map/rig_map_06.jpg"></li>
            <li data-url="subhanger" id="rigmap_07"><img src="images/rig_map/rig_map_07.jpg"></li>
            <li data-url="boat" id="rigmap_08"><img src="images/rig_map/rig_map_08.jpg"></li>
          </ul>

          <div class="map_labels">
            <div class="platform"     data-url="platform"     style="left:  740px; top:  310px;" data-url="platform">1</div>
            <div class="controlroom"  data-url="controlroom"  style="left: 1020px; top:  215px;" data-url="controlroom">2</div>
            <div class="theater"      data-url="theater"      style="left:  850px; top:  700px;" data-url="theater">3</div>
            <div class="chemicalroom" data-url="chemicalroom" style="left:  940px; top:  930px;" data-url="chemicalroom">4</div>
            <div class="subhanger"    data-url="subhanger"    style="left: 1150px; top: 1010px;" data-url="subhanger">5</div>
            <div class="boat"         data-url="boat"         style="left: 1410px; top:  980px;" data-url="boat">6</div>
            <div class="hallway"      data-url="hallway"      style="left:  970px; top:  590px;" data-url="hallway">7</div>
          </div>

          <div class="text_labels">
            <div class="platform"     data-url="platform"     id="t3"  ><span>1</span> Flight Deck</div>
            <div class="controlroom"  data-url="controlroom"  id="t4"  ><span>2</span> Control Room</div>
            <div class="theater"      data-url="theater"      id="t5b" ><span>3</span> Theatre</div>
            <div class="chemicalroom" data-url="chemicalroom" id="t6"  ><span>4</span> Chem-Storage</div>
            <div class="subhanger"    data-url="subhanger"    id="t7"  ><span>5</span> Submersible Hanger</div>
            <div class="boat"         data-url="boat"         id="t8"  ><span>6</span> Boat Deck</div>
            <div class="hallway"      data-url="hallway"      id="t5a" ><span>7</span> Terminus</div>
          </div>


        </div>

      </div>

      <a id="to-control" class="platform-nav">Close</a>
      <div id="scroll-directions"></div>
  		<div class="breadcrumb"></div>
       
  	</div>
     
    <div id="scroll-proxy"></div>
    <div id="inter-text" style="display: block"></div>

    <!-- JavaScripts -->

    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="js/lib/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>


    <script>
      $(document).ready(function(){

      $("#to-control").click(function(){
        parent.master.closeMap()
      })

      $("#map-container ul li, .text_labels div, .map_labels div").click(function(){
        if($(this).data("url")) parent.newPage($(this).data("url") + '.php')
       //window.history.back();
      })

      // Map Labels corresponding hover
      $('.text_labels div').on('mouseover',function(){
        $('.map_labels').find('div.' + $(this).attr('class')).addClass('hover')
      })

      $('.text_labels div').on('mouseout',function(){
        $('.map_labels').find('div.' + $(this).attr('class')).removeClass('hover')
      })

      $('.map_labels div').on('mouseover',function(){
        // console.log($(this).attr('class'))
        $('.text_labels').find('div.' + $(this).attr('class')).addClass('hover')
      })

      $('.map_labels div').on('mouseout',function(){
        $('.text_labels').find('div.' + $(this).attr('class')).removeClass('hover')
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
         $("#map-container").css("top", dynamicTop)
         $("#scan_image_holder").css("top", dynamicTop)
         $("#scan_image_holder").css("height", dynamicHeight)

         

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

          $("#map-container ul li").css("box-shadow","20px 30px "+scrollPercent*4+"px rgba(0,0,0,.5)")
          $('#leasemap_05').css('-webkit-transform', 'translateZ(' + zPos * .6 + 'px)');
          $('#leasemap_04').css('-webkit-transform', 'translateZ(' + zPos * .75 + 'px)');
          $('#leasemap_03').css('-webkit-transform', 'translateZ(' + zPos * 1.0 + 'px)');
          $('#leasemap_02').css('-webkit-transform', 'translateZ(' + zPos * 1.3 + 'px)');
          $('#leasemap_01').css('-webkit-transform', 'translateZ(' + zPos * 1.8 + 'px)');

          $('#rigmap_01').css('-webkit-transform', 'translateZ(' + zPos * .8 + 'px)');
          $('#rigmap_02').css('-webkit-transform', 'translateZ(' + zPos + 'px)');

          $('#rigmap_05a,#t5a').css('-webkit-transform', 'translateZ(' + zPos * 1.3  + 'px)');
          $('#rigmap_05b,#t5b').css('-webkit-transform', 'translateZ(' + zPos * 1.1  + 'px)');

          $('#rigmap_04,#t4').css('-webkit-transform', 'translateZ(' + zPos * 1.2 + 'px)');
          $('#rigmap_03,#t3').css('-webkit-transform', 'translateZ(' + zPos * 1.3 + 'px)');
          $('#rigmap_06,#t6').css('-webkit-transform', 'translateZ(' + zPos * 1.4 + 'px)');
          $('#rigmap_08,#t8').css('-webkit-transform', 'translateZ(' + zPos * 1.5 + 'px)');
          $('#rigmap_07,#t7').css('-webkit-transform', 'translateZ(' + zPos * 1.6 + 'px)');

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