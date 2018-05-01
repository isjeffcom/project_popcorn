window.addEventListener("scroll", function(event) {
    var btn = document.getElementById('ticket_but1_container');
    var btn_1 = document.getElementById('ticket_btn_1');
    var top = this.scrollY;

    if(top >= 100){
        btn.style.opacity = "1";
    }

    if(top <= 100){
        btn.style.opacity = "0.2";
    }

    if(screen.width <= 600){
      if(top <= 3000){
          btn.style.position = "fixed";
          btn.style.marginTop = "0px";
          btn.style.bottom = "32px";
          btn_1.style.marginLeft = "0px";
          btn.style.right = "130px";
      }

      if(top >= 3000){
        btn.style.position = "relative";
        btn.style.marginTop = "100px";
        btn.style.bottom = "0px";
        btn_1.style.marginLeft = "270px";
        btn.style.right = "130px";
      }

    }else{
      if(top <= 1800){
          btn.style.position = "fixed";
          btn.style.marginTop = "0px";
          btn.style.bottom = "32px";
          btn.style.right = "140px";
      }

      if(top >= 1800){
        btn.style.position = "relative";
        btn.style.marginTop = "100px";
        btn.style.bottom = "0px";
        btn.style.right = "0px";
      }
    }




    //console.log(top)

}, false);


function getOrientation(){
   var orientation = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
   return orientation;
}

window.onresize = function(){
  if(getOrientation() == "Landscape"){

    if(window.innerWidth <= 800){
      alert("Landscape mode is unavailable.");
      if($("#nolandscape").length){
        $("#nolandscape").show()
      }else{
        $("#main").append("<div style='position:fixed;z-index:1000;width:100%;height:100%;top:0px;left:0px;background-color:#0c0f19;font-size:24px;color:#fff;font-family:barlowbold;text-align:center' id='nolandscape'><div style='margin-top:100px'><a>Landscape mode is unavailable.</a></div></div>");
      }

    }
  }else{

      $("#nolandscape").hide()

  }
}
