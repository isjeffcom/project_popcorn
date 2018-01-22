

var isOpen = 0;
function openVideo(){

  if(isOpen == 0){
    document.getElementById("video_overlay").style.display = "block";
    isOpen = 1;
  }else{
    document.getElementById("video_overlay").style.display = "none";
    isOpen = 0;
  }
}
