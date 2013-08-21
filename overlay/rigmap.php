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

    <link rel="image_src" href="../images/bg_drillhead.jpg" />
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" type="text/css" href="../css/font-awesome.css">

<style>


  #map-container {
    position: relative;
    
    margin-top: 25px;
    margin-left: 25px;

    text-align: center;
    color:#ffffff;
    display:block;

  }

    /* Image */

    .map_image {
      width: 100%;
      height: 100%;
      position: absolute;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      background-image: url(../images/rig_map/RIGMAP.jpg);
    }

    @media (-webkit-min-device-pixel-ratio: 2),(min-resolution: 192dpi),(min-width: 1024px) {
      .map_image {
        background-image: url(../images/rig_map/RIGMAP@2x.jpg);
      }
    }

    /*.map_images {
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
*/
    /* Labels */

    .map_labels {
    }

      .map_labels div,
      .map_legend div span {
        width: 25px;
        height: 25px;
        border-radius: 100%;
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

        .no-touch .map_labels div:hover, 
        .no-touch .map_labels div.hover {
          color: black;
          background: #ecc60a;
        }

      .map_labels .platform {
        left: 45%;
        top: 22.5%;
      }

      .map_labels .hallway {
        left: 56%;
        top: 44%;
      }

      .map_labels .boat {
        left: 83%;
        top: 78%;
      }

      .map_labels .controlroom {
        left: 59%;
        top: 18%;
      }

      .map_labels .theater {
        left: 50%;
        top: 56%;
      }

      .map_labels .chemicalroom {
        left: 55%;
        top: 74%;
      }

      .map_labels .subhanger {
        left: 68%;
        top: 80%;
      }




    /* Legend */
    
    .map_legend {
      position: absolute;
      top: 23.659306%;
      left: 5.8%;
      width: 25.8823529%;
    }

      .map_legend div {
        width: 100%;

        background:#000000;
        margin-bottom: 10%;
        padding: 2% 3%;
        cursor:pointer;
        
        text-align:left;
        font-weight: bold;
        letter-spacing: -1px;
        color: #ecc60a;
        white-space: nowrap;
      }

      .map_legend div span {
        display: inline-block;
        background: #ecc60a;
        color: black;
      }

      .no-touch .map_legend div:hover, 
      .no-touch .map_legend div.hover {
        color: black;
        background: #ecc60a;
      }

      .no-touch .map_legend div:hover span, 
      .no-touch .map_legend div.hover span {
        color: #ecc60a;
        background: black;
      }

      .map_legend div.visited { background-color: #6B6661; } 
      .map_legend div.visited span { color: #6B6661; }





  /*

    Images
  
    map: 850x634

  */

  /*.map_images div {
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  .map_images { 
      width: 100%;
      height: 100%;
  }

  #rigmap_01 {
      width: 38.58800%;
      height: 100.00000%;
      top: 0%;
      left: 0%;
  }

  #rigmap_02 {
      width: 61.41100%;
      height: 16.87600%;
      top: 0%;
      left: 38.5%;
  }

  #rigmap_03 {
      width: 20.11700%;
      height: 29.17900%;
      top: 16.87600%;
      left: 38.5%;
  }

  #rigmap_04 {
      width: 41.29400%;
      height: 29.17900%;
      top: 16.87600%;
      left: 58.617%;
  }

  #rigmap_05a {
      width: 61.41100%;
      height: 6.62400%;
      bottom: 47.318%;
      left: 38.5%;
  }

  #rigmap_05b {
      width: 61.41100%;
      height: 11.35600%;
      bottom: 35.96200%;
      left: 38.5%;
  }

  #rigmap_06 {
      width: 26.35200%;
      height: 35.96200%;
      bottom: 0%;
      left: 38.588%;
  }

  #rigmap_07 {
      width: 14.11700%;
      height: 35.96200%;
      bottom: 0%;
      left: 64.852%;
  }

  #rigmap_08 {
      width: 20.94100%;
      height: 35.96200%;
      bottom: 0%;
      left: 78.969%;
  }
  
  #rigmap_01  { background-image: url(../images/rig_map/rig_map_01.jpg) }
  #rigmap_02  { background-image: url(../images/rig_map/rig_map_02.jpg) }
  #rigmap_03  { background-image: url(../images/rig_map/rig_map_03.jpg) }
  #rigmap_04  { background-image: url(../images/rig_map/rig_map_04.jpg) }
  #rigmap_05a { background-image: url(../images/rig_map/rig_map_05a.jpg) }
  #rigmap_05b { background-image: url(../images/rig_map/rig_map_05b.jpg) }
  #rigmap_06  { background-image: url(../images/rig_map/rig_map_06.jpg) }
  #rigmap_07  { background-image: url(../images/rig_map/rig_map_07.jpg) }
  #rigmap_08  { background-image: url(../images/rig_map/rig_map_08.jpg) }

  @media (-webkit-min-device-pixel-ratio: 2),(min-resolution: 192dpi),(min-width: 1024px) {
    #rigmap_01  { background-image: url(../images/rig_map/rig_map_01@2x.jpg) }
    #rigmap_02  { background-image: url(../images/rig_map/rig_map_02@2x.jpg) }
    #rigmap_03  { background-image: url(../images/rig_map/rig_map_03@2x.jpg) }
    #rigmap_04  { background-image: url(../images/rig_map/rig_map_04@2x.jpg) }
    #rigmap_05a { background-image: url(../images/rig_map/rig_map_05a@2x.jpg) }
    #rigmap_05b { background-image: url(../images/rig_map/rig_map_05b@2x.jpg) }
    #rigmap_06  { background-image: url(../images/rig_map/rig_map_06@2x.jpg) }
    #rigmap_07  { background-image: url(../images/rig_map/rig_map_07@2x.jpg) }
    #rigmap_08  { background-image: url(../images/rig_map/rig_map_08@2x.jpg) }
  }*/



</style>

</head>

<body class="platform" style="background:none">

  <!-- Rig Map -->
  <div id="map-container"> 

    <!-- <div class="map_images">
      <div style="cursor:default"  id="rigmap_01"><img data-baseurl=".././images/rig_map/rig_map_01"></div>
      <div style="cursor:default"  id="rigmap_02"><img data-baseurl=".././images/rig_map/rig_map_02"></div>

      <div data-url="platform"     id="rigmap_03">  <img data-baseurl="../images/rig_map/rig_map_03">  </div>
      <div data-url="controlroom"  id="rigmap_04">  <img data-baseurl="../images/rig_map/rig_map_04">  </div>
      <div data-url="hallway"      id="rigmap_05a"> <img data-baseurl="../images/rig_map/rig_map_05a"> </div>
      <div data-url="theater"      id="rigmap_05b"> <img data-baseurl="../images/rig_map/rig_map_05b"> </div>
      <div data-url="chemicalroom" id="rigmap_06">  <img data-baseurl="../images/rig_map/rig_map_06">  </div>
      <div data-url="subhanger"    id="rigmap_07">  <img data-baseurl="../images/rig_map/rig_map_07">  </div>
      <div data-url="boat"         id="rigmap_08">  <img data-baseurl="../images/rig_map/rig_map_08">  </div>
    </div> -->

    <div class="map_image"></div>

    <div class="map_labels">
      <div class="platform"     data-url="platform"     data-url="platform">1</div>
      <div class="hallway"      data-url="hallway"      data-url="hallway">2</div>
      <div class="boat"         data-url="boat"         data-url="boat">3</div>
      <div class="controlroom"  data-url="controlroom"  data-url="controlroom">4</div>
      <div class="theater"      data-url="theatre"      data-url="theater">5</div>
      <div class="chemicalroom" data-url="chemicalroom" data-url="chemicalroom">6</div>
      <div class="subhanger"    data-url="subhanger"    data-url="subhanger">7</div>

    </div>

    <div class="map_legend">
      <div class="platform"     data-url="platform"     id="t3"  ><span>1</span> Flight Deck</div>
      <div class="hallway"      data-url="hallway"      id="t5a" ><span>2</span> Terminus</div>
      <div class="boat"         data-url="boat"         id="t8"  ><span>3</span> Boat Deck</div>     
      <div class="controlroom"  data-url="controlroom"  id="t4"  ><span>4</span> Control Room</div>
      <div class="theater"      data-url="theatre"      id="t5b" ><span>5</span> Theatre</div>
      <div class="chemicalroom" data-url="chemicalroom" id="t6"  ><span>6</span> Chem-Storage</div>
      <div class="subhanger"    data-url="subhanger"    id="t7"  ><span>7</span> Submersible Hangar</div>


    </div>

  </div>


  <a id="to-control" class="platform-nav">Close</a>

  <!-- JavaScripts -->

  <script type="text/javascript" src="../js/lib/jquery.min.js"></script>
  <script type="text/javascript" src="../js/lib/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../js/lib/modernizr.min.js"></script>


  <script>

    $(document).ready(function(){

      console.log(parent.pano.visited)
      if(parent.pano.visited.platform     === true) $('.map_legend > .platform').addClass('visited')
      if(parent.pano.visited.hallway      === true) $('.map_legend > .hallway').addClass('visited')
      if(parent.pano.visited.boat         === true) $('.map_legend > .boat').addClass('visited')
      if(parent.pano.visited.controlroom  === true) $('.map_legend > .controlroom').addClass('visited')
      if(parent.pano.visited.theatre      === true) $('.map_legend > .theatre').addClass('visited')
      if(parent.pano.visited.chemicalroom === true) $('.map_legend > .chemicalroom').addClass('visited')
      if(parent.pano.visited.subhanger    === true) $('.map_legend > .subhanger').addClass('visited')

      $("#to-control").click(function(e){
        e.stopPropagation();
        parent.master.closeOverlay()
      })

      $('body').click(function(e){
        e.stopPropagation();
        if( $(e.target).is('body') ) 
          parent.master.closeOverlay()
      })

      $("#map-container ul li, .map_legend div, .map_labels div").click(function(e){
        e.stopPropagation();
        if($(this).data("url")) {
          if( $(this).data("url") == parent.master.globalPano ) {
            parent.master.closeOverlay()  
          } else {
            parent.master.closeOverlay($(this).data("url"))
          }
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

      

      if(parent.master.isIOS) {
        $(document).on('touchmove', function(e) { e.preventDefault(); });  
      }
      else {
        $.getScript("../js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
          $( "#map-container" ).draggable({
            contain: "parent"
          });
        });
        $('body').addClass('no-touch')
      }



      // RESPONSIVE FUNCTIONALITY ********************************************************

      var resizetimeout;

      function debounceResize(){
        if(resizetimeout) clearTimeout(resizetimeout);
        resizetimeout = setTimeout(resize, 50)
      }

      resize = function(){

        var ratio = 634/850,
            w, h, t, l;
      
        // CONTAIN
        w = (window.innerWidth-50);
        h = w * ratio;
      
        if(h > (window.innerHeight-50) ) {
          h = (window.innerHeight-50);
          w = h / ratio;
        }
      
        t = ((window.innerHeight-50) - h) / 2;
        l = ((window.innerWidth-50) - w) / 2;

        // Apply dynamic sizing ********************************************************

        $('#map-container').css({
          width:  Math.round(w),
          height: Math.round(h),
          top:    Math.round(t),
          left:   Math.round(l)
        })

        $('.map_legend').css({ // 20 px / 850
          'font-size': w * .023529412
        })

        $('.map_labels > div, .map_legend > div > span').css({
          width: w * .029411765,
          height: w * .029411765,
          'font-size' : w * .023529412,
          'line-height' : '145%'
        })

      }

      $(window).on('resize.global',debounceResize)
      window.addEventListener('onorientationchange', debounceResize);

      resize();
      

    })

  </script>



</body>
</html>