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

<style>

  #map-container {
    position: relative;
    top: 100px;
    margin: 0 auto;
    width: auto; height: auto;

    text-align: center;
    color:#ffffff;
    display:block;

    /*
    top: 50%;
    margin-top: -663px;
    left: 50%;
    margin-left: -860px;
    */
   
  }

    .map_images {
      position: absolute;
      font-size: 0;
    }

      .map_images div {
        position:relative;
        float: left;
        padding: 0;
        margin: 0;
        
        cursor: pointer;
      }

    .map_labels {
    }

      .map_labels div,
      .map_legend div span {
        width: 25px;
        height: 25px;
        border-radius: 25px;
        cursor: pointer;
        
        font: 20px/29px 'DinRegular', Helvetica, Arial, sans-serif;
        font-weight: bold;
        text-align: center;
      }


      .map_labels div {
        position: absolute;
        color: #ecc60a;
        background: black;
      }

        .map_labels div:hover, .map_labels div.hover {
          color: black;
          background: #ecc60a;
        }
    
    .map_legend {
      position:absolute;
      top: 150px;
      left: 50px;
    }

      .map_legend div {
        width: 220px;

        background:#000000;
        margin-bottom: 15px;
        padding: 3px 5px;
        cursor:pointer;
        
        text-align:left;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: -1px;
        color: #ecc60a;
      }

      .map_legend div span {
        display: inline-block;
        background: #ecc60a;
        color: black;
      }

      .map_legend div:hover, 
      .map_legend div.hover {
        color: black;
        background: #ecc60a;
      }

      .map_legend div:hover span, 
      .map_legend div.hover span {
        color: #ecc60a;
        background: black;
      }


</style>

</head>

<body class="platform" style="background:none">
        
  <!-- Rig Map -->
  <div id="map-container"> 

    <div class="map_images">
      <div style="cursor:default"  id="rigmap_01"><img data-baseurl="./images/rig_map/rig_map_01"></div>
      <div style="cursor:default"  id="rigmap_02"><img data-baseurl="./images/rig_map/rig_map_02"></div>
 
      <div data-url="platform"     id="rigmap_03">  <img data-baseurl="images/rig_map/rig_map_03">  </div>
      <div data-url="controlroom"  id="rigmap_04">  <img data-baseurl="images/rig_map/rig_map_04">  </div>
      <div data-url="hallway"      id="rigmap_05a"> <img data-baseurl="images/rig_map/rig_map_05a"> </div>
      <div data-url="theater"      id="rigmap_05b"> <img data-baseurl="images/rig_map/rig_map_05b"> </div>
      <div data-url="chemicalroom" id="rigmap_06">  <img data-baseurl="images/rig_map/rig_map_06">  </div>
      <div data-url="subhanger"    id="rigmap_07">  <img data-baseurl="images/rig_map/rig_map_07">  </div>
      <div data-url="boat"         id="rigmap_08">  <img data-baseurl="images/rig_map/rig_map_08">  </div>
    </div>

    <div class="map_labels">
      <div class="platform"     data-url="platform"     style="left: 390px; top: 155px;" data-url="platform">1</div>
      <div class="hallway"      data-url="hallway"      style="left: 485px; top: 270px;" data-url="hallway">2</div>
      <div class="boat"         data-url="boat"         style="left: 705px; top: 490px;" data-url="boat">3</div>
      <div class="controlroom"  data-url="controlroom"  style="left: 510px; top: 105px;" data-url="controlroom">4</div>
      <div class="theater"      data-url="theatre"      style="left: 425px; top: 350px;" data-url="theater">5</div>
      <div class="chemicalroom" data-url="chemicalroom" style="left: 470px; top: 465px;" data-url="chemicalroom">6</div>
      <div class="subhanger"    data-url="subhanger"    style="left: 575px; top: 505px;" data-url="subhanger">7</div>

    </div>

    <div class="map_legend">
      <div class="platform"     data-url="platform"     id="t3"  ><span>1</span> Flight Deck</div>
      <div class="hallway"      data-url="hallway"      id="t5a" ><span>2</span> Terminus</div>
      <div class="boat"         data-url="boat"         id="t8"  ><span>3</span> Boat Deck</div>     
      <div class="controlroom"  data-url="controlroom"  id="t4"  ><span>4</span> Control Room</div>
      <div class="theater"      data-url="theatre"      id="t5b" ><span>5</span> Theatre</div>
      <div class="chemicalroom" data-url="chemicalroom" id="t6"  ><span>6</span> Chem-Storage</div>
      <div class="subhanger"    data-url="subhanger"    id="t7"  ><span>7</span> Submersible Hanger</div>


    </div>

  </div>


  <a id="to-control" class="platform-nav">Close</a>

  <!-- JavaScripts -->

  <script type="text/javascript" src="js/lib/jquery.min.js"></script>
  <script type="text/javascript" src="js/lib/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/lib/modernizr.min.js"></script>


  <script>

    $(document).ready(function(){

      isRetina = function(){ var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\ (min--moz-device-pixel-ratio: 1.5),\ (-o-min-device-pixel-ratio: 3/2),\ (min-resolution: 1.5dppx)"; if (window.devicePixelRatio > 1) return true; if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true; return false; };

      if( isRetina() ) {
        $('#map-container .map_images').find('img').each(function(){ this.src = $(this).data('baseurl') + '@2x.jpg' })
        $('#map-container').css('width','1700px')
      }
        
      else {
        $('#map-container .map_images').find('img').each(function(){ this.src += $(this).data('baseurl') + '.jpg' })
        $('#map-container').css('width','850px')
      }

      $("#to-control").click(function(){
        parent.master.closeOverlay()
      })

      $("#map-container ul li, .map_legend div, .map_labels div").click(function(){
        // if($(this).data("url")) parent.newPage($(this).data("url") + '.php')
        if($(this).data("url")) {
          parent.newPano($(this).data("url"))
          parent.master.closeOverlay()
        }

      })

      // Map Labels corresponding hover
      $('.map_legend div').on('mouseover',function(){
        $('.map_labels').find('div.' + $(this).attr('class')).addClass('hover')
      })

      $('.map_legend div').on('mouseout',function(){
        $('.map_labels').find('div.' + $(this).attr('class')).removeClass('hover')
      })

      $('.map_labels div').on('mouseover',function(){
        // console.log($(this).attr('class'))
        $('.map_legend').find('div.' + $(this).attr('class')).addClass('hover')
      })

      $('.map_labels div').on('mouseout',function(){
        $('.map_legend').find('div.' + $(this).attr('class')).removeClass('hover')
      })

      $.getScript("js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
        $( "#map-container" ).draggable({
          contain: "parent"
        });
      }); 

    })

  </script>



</body>
</html>