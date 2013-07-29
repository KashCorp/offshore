<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OFFSHORE</title>
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="css/style.css">

    <link href="css/video-js.css" rel="stylesheet">

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

  <body class="p-trailer">

  <div id="wrapper">
    <div id="vimeo">
       <!-- <iframe id="player1" allowtransparency="true" src="http://player.vimeo.com/video/50174437?api=1&player_id=player1&autoplay=1" width="635" height="357" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> -->
      <iframe id="player1" allowtransparency="true" src="http://player.vimeo.com/video/64732153?api=1&player_id=player1&autoplay=1" width="635" height="357" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
    </div>

	</div>
  <a href="#" class="skiptrailer" data-url="index_container.php">SKIP</a>


    <!-- JavaScripts -->
    <script src="http://a.vimeocdn.com/js/froogaloop2.min.js"></script>
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
		<script type="text/javascript" src="js/lib/modernizr.min.js"></script>
		<script type="text/javascript" src="js/master-functions.js"></script>
    <script type="text/javascript" src="js/lib/video-js/video.js"></script> 
    
    
    <script>

    // VIDEO

    /*_V_("trailer").ready(function(){

      var myPlayer = this;
      var vidWidth = $('#wrapper').width();
      var vidHeight = $('#wrapper').height();
      // EXAMPLE: Start playing the video.
      myPlayer.size(vidWidth, vidHeight);

      myPlayer.addEvent('ended', function(){
        $('#video-js').fadeOut(500);
        master.pageChange('platform.php');
      });

    });*/

$(document).ready(function(){   
var iframe = $('#player1')[0],
    player = $f(iframe),
    status = $('.status');

// When the player is ready, add listeners for pause, finish, and playProgress
player.addEvent('ready', function() {
    console.log('ready');
    //player.api('play')
    player.addEvent('pause', onPause);
    player.addEvent('finish', onFinish);
    player.addEvent('playProgress', onPlayProgress);
});

// Call the API when a button is pressed
$('button').bind('click', function() {
    player.api($(this).text().toLowerCase());
});

function onPause(id) {
    console.log('paused');
}

function onFinish(id) {
    console.log('finished');
    master.pageChange('index_container.php')
}

function onPlayProgress(data, id) {
    //console.log(data.seconds + 's played');
}
   
      $('#wrapper').show();
    })
  </script>
  </body>
</html>