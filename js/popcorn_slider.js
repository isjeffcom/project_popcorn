let ps_url="http://up786100.ct.port.ac.uk/api/";
let ps_api_s ="data_s.php";
//Data set
var s_img = [];
var s_name = [];
var s_id = [];
getSlider();

let self = $("#ps_img_container");
let self_name = $("#psName");
var count = 0;

//Run after document ready
$(document).ready(function(){
  //Click slider controller function
  $(".ps_controller_single").click(function(){
      count = $(this).attr("data-id");
      self.attr("src", s_img[count]);
      self_name.attr("data-id",s_id[count]);
      $("#s_play_btn").attr("data-id", s_id[count]);
      self_name.text(s_name[count]);
      theRightOne(count);
  });

});

//Main Timer & controller
setInterval(function(){

    //Start Animate
    self.addClass("ani");
    $("#s_play_btn").attr("data-id", s_id[count]);
    //Call back: Change Img
    setTimeout(function(){
      self.attr("src", s_img[count]);
      self_name.attr("data-id",s_id[count]);
      self_name.text(s_name[count]);
      theRightOne(count);
    },1000)

    count = count + 1;

    //Remove Animate
    setTimeout(function(){self.removeClass("ani");}, 3000)

    //if count bigger than array length then back to 0
    count = count >= s_img.length ? 0 : count;

}, 9000);



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

function getSlider() {
  var xhttp = new XMLHttpRequest();
  $.getJSON(ps_url+ps_api_s,function(result){
    for(i=0;i<result.length;i++){
      s_img.push(result[i].img);
      s_name.push(result[i].name);
      s_id.push(result[i].toMovieId);
    }

    //Get element
    let self = $("#ps_img_container");
    let self_name = $("#psName");

    $("#s_play_btn").attr("data-id", s_id[count]);
    self.attr("src", s_img[count]);
    self_name.attr("data-id",s_id[count]);
    self_name.text(s_name[count]);


    for(i=0;i<s_name.length;i++){
      $("#sn"+i).text(s_name[i]);
    }
  });
}
