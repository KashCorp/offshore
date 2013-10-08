<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
<meta name="viewport" content="width = 1050, user-scalable = no" />
<link rel="stylesheet" type="text/css" href="../css/font-awesome.css">
<link rel="stylesheet" type="text/css" href="../css/style.css">
<!-- JavaScripts -->
<script type="text/javascript" src="../js/lib/jquery.min.js"></script>
<script type="text/javascript" src="../js/lib/jquery-ui.min.js"></script>
<script type="text/javascript" src="../js/lib/turn/modernizr.2.5.3.min.js"></script>
</head>
<body style="background:none">

<div class="close-overlay"></div>

<div class="flipbook-viewport">
  <!-- <div class="container"> -->

    <div class="flipbook">
      <div class="hard" style="background-image:url(../images/books/folder_front.png)"></div>
      <div class="hard" style="background-image:url(../images/books/folder_left.png)"></div>

      <div class="hard" style="background-image:url(../images/books/dossier/AccidentInquest.jpg)"></div>
      <div class="hard" style="background-image:url(../images/books/dossier/blank_paper.jpg)"></div>

      <div class="hard" style="background-image:url(../images/books/dossier/spartan_brief.jpg)"></div>
      <div class="hard" style="background-image:url(../images/books/dossier/blank_paper.jpg)"></div>

      <div class="hard" style="background-image:url(../images/books/dossier/01.jpg)"></div>
      <div class="hard" style="background-image:url(../images/books/dossier/blank_paper.jpg)"></div>

      <div class="hard" style="background-image:url(../images/books/dossier/02.jpg)"></div>
      <div class="hard" style="background-image:url(../images/books/dossier/blank_paper.jpg)"></div>     

      <div class="hard" style="background-image:url(../images/books/dossier/03.jpg)"></div>
      <div class="hard" style="background-image:url(../images/books/dossier/blank_paper.jpg)"></div>   

      <div class="hard" style="background-image:url(../images/books/dossier/04.jpg)"></div>
      <div class="hard" style="background-image:url(../images/books/dossier/blank_paper.jpg)"></div>   

      <div class="hard" style="background-image:url(../images/books/folder_right.png)"></div>
      <div class="hard" style="background-image:url(../images/books/folder_back.png)"></div>
    </div>

  <!-- </div> -->
</div>

<a id="close-control" class="platform-nav">Close</a>


<script type="text/javascript">

$(document).ready(function(){

  var init = false;

  function loadApp() {


    $(".platform-nav").click(function(){
      parent.master.closeOverlay()
    })

    var isFF = !!window.sidebar;
    if(!isFF) {
      $('.close-overlay').click(function(e){
        parent.master.closeOverlay()
      })
    }

    var w, h, t, l;

    function resize(){

      var ratio = 600/922,
          w, h, t, l;
    
      // CONTAIN
      w =  parent.window.innerWidth * 0.9;
      h = w * ratio;
    
      if(h > parent.window.innerHeight) {
        h =  parent.window.innerHeight * 0.9;
        w = h / ratio;
      }
    
      t = ( parent.window.innerHeight - h) / 2;
      l = ( parent.window.innerWidth - w) / 2;

      $('.flipbook').css({ left: l, top: t })

      w = Math.floor(w)
      h = Math.floor(h)
      t = Math.floor(t)
      l = Math.floor(l)

      if(!init) {
        init=true;
        $('.flipbook').turn({
            width: w,
            height: h,
            elevation: 50,
            gradients: true,
            autoCenter: false
        });
      }
      
    }

    $(window).on('resize.turn',resize)
    
    resize();

    $(document).on('touchmove',  function(e) { e.preventDefault(); });
  }

  // Load the HTML4 version if there's not CSS transform

  yepnope({
    test : Modernizr.csstransforms,
    yep: ['../js/lib/turn/turn.js'],
    nope: ['../js/lib/turn/turn.html4.min.js'],
    both: ['../css/basicbook.css'],
    complete: loadApp
  });
})



</script>

</body>
</html>