$(document).ready( function(){
    loadDoc("slider.json", openJson);
    let sldr,txt;
    let t;
    let imgs = []; 
    let cardTxt = [];
    let urls = [];
    let cardText = document.getElementById("card-text");
    let inc=0;
    //with AJAX take data from json 
    function loadDoc(url, cFunction) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          cFunction(this);
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    }

    function openJson(xml) {
      sldr = JSON.parse(xml.responseText).slider;
      for( i=0; i< sldr.length; i++){
        txt = sldr[i];
        imgs[i] = txt.image;
        cardTxt[i] = txt.text;
        urls[i] = txt.url;
        
      }
      createList();
      start();
      click();
    }
    //create thumbs div
    function createList(){
      for( i=1; i <=imgs.length; i++ ){
          $("#thumbs").append('<div></div>');
      }
    }
    function click(){
      $("#thumbs>div").click(function(){
        inc = $(this).index()-1;
        start();
      });
    }
    function show(){
        if( inc >= imgs.length ) inc = 0;
        if( inc < 0 ) inc = imgs.length-1;
        $("#slider")
            .css("background","url('img/"+ imgs[inc] +" ') top/cover no-repeat")
            .fadeOut(0)
            .fadeIn("slow");
            content(inc);
        
    }

    function content() {
        let kod = "";
        kod += '<h1>' + cardTxt[inc].h1 + '</h1>';
        kod += '<p>' + cardTxt[inc].p + '</p>';
        cardText.innerHTML = kod;
    }

    $("#slider").click(function(e){
		console.log()
     if(e.pageX - $(this).offset().left>$("#slider").outerWidth()/20 &&
	 e.pageX - $(this).offset().left < $("#slider").outerWidth()-$("#slider").outerWidth()/20&&
	 e.pageY - $(this).offset().top<$("#slider").height()
	 ){
        window.location = urls[inc];
     }
    });

    $(".right").click(function(){ inc++; start(); })
    
    $(".left").click(function(){ inc--; start(); })
    
    function start(){
        stop();
        show();
        t = setInterval( ()=>{ inc ++; show(); },3000)
    }

    function stop(){ clearInterval(t) }
})