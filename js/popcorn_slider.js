
//Data set
let s_img = ["./asset/img/simg1.jpg", "./asset/img/simg2.jpg","./asset/img/simg3.jpg", "./asset/img/simg4.jpg"];
let s_name = ["Justice League", "Star War: The Last Judi", "Transformer", "X-Man: Dark Phoenix"];

//Get element
let self = $("#ps_img_container");
let self_name = $("#psName");

var count = 0;
self.attr("src", s_img[count]);
self_name.text(s_name[count]);

for(i=0;i<s_name.length;i++){
  $("#sn"+i).text(s_name[i]);
}

//Main Timer & controller
setInterval(function(){

    //Start Animate
    self.addClass("ani");

    //Call back: Change Img
    setTimeout(function(){
      self.attr("src", s_img[count]);
      self_name.text(s_name[count]);
      theRightOne(count);
    },1000)

    count = count + 1;

    //Remove Animate
    setTimeout(function(){self.removeClass("ani");}, 3000)

    //if count bigger than array length then back to 0
    count = count >= s_img.length ? 0 : count;

}, 9000);

$(".ps_controller_single").click(function(){
    count = $(this).attr("data-id");
    self.attr("src", s_img[count]);
    self_name.text(s_name[count]);
    theRightOne(count);
});

//Styling
function theRightOne(c){
  $("#s"+c).removeClass("unselected");
  $("#s"+c).addClass("selected");
  $("#s"+c).css("height","120px");
  $("#s"+c).find("img").css("opacity","0.8");

  $("#sn"+c).removeClass("sn_unselected");
  $("#sn"+c).addClass("sn_selected");
  $("#sn"+c).css("margin-top","85px");

  for(i=0;i<s_img.length;i++){
    if(i!=c){
      if($("#s"+i).hasClass("selected")){
        $("#s"+i).removeClass("selected");
        $("#sn"+i).remove("sn_selected");
        $("#s"+i).addClass("unselected");
        $("#sn"+i).addClass("sn_unselected");
        $("#s"+i).css("height","70px");
        $("#sn"+i).css("margin-top","50px");

        $("#s"+i).find("img").css("opacity","0.5");

      }
    }
  }

}
