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

#dossier-container {
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
top: 0;
width:100%;
pointer-events:none;
text-align: center;
color: #ffffff;
font-size: 25px;
text-shadow: 1px 1px 3px #000;
background: url(images/bg_black_50.png);
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

<header>
  <a class="volume-toggle"><i class="icon-volume-up"></i></a>
</header>

    <div id="wrapper" class="wrapper" style="display:block">

      <div id="scan_image_holder">
        

      <!--<div id="scan_image_lines"></div>-->

      </div>
      
    	
      

          <div id="dossier-container">

          <ul>
            <li data-label="5"><img class="photo" style="top:20px;width:70%;left:60%" src="images/books/dossier/04.jpg"></li>
            <li data-label="4"><img class="photo" style="top:30px;width:70%;left:20%" width="650" src="images/books/dossier/03.jpg"></li>
            <li data-label="3"><img class="photo" style="top:5px;width:70%;left:40%" width="560" src="images/books/dossier/02.jpg"></li>
            <li data-label="2"><img class="photo" style="top:10px;width:70%;left:80%" src="images/books/dossier/01.jpg"></li>
            <li data-label="1" ><img src="images/folder_front.png"></li>
          </ul>



          </div>
      </div>
      
       
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
        parent.master.closeOverlay()
      })

      $("#map-container ul li").click(function(){
       // parent.newPage($(this).data("url") + '.php')
       //window.history.back();
      })



      var titleArray ={
      '1':'This is SPARTAN 208, somewhere OFFSHORE.',
      '2':'SPARTAN 208 is a virtual drilling platform, a digital phantom.',
      '3':'OFFSHORE is global, operating in the Gulf of Mexico, Brasil, Africa, the Arctic.',
      '4':'OFFSHORE is an imaginary entry point into a very real world.',
      '5':'This is a world where things go wrong ...'
      }

      var currentWebPos = 0, arrayKey = 1

$.getScript("js/lib/jquery-ui-touch-punch.min.js", function(data, textStatus, jqxhr) {
      $(function() {
            $( "ul li" ).draggable();
      });

    });

      $("ul li").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
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




       } //end setStage

      setStage()

      window.onresize = function(event) {
      setStage()
      }

      })

    </script>



  </body>
</html>