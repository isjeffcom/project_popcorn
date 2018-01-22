/*
Well Played Porject
Created by Jeff Wu
Collaborators: Liam White, Jeff Wu, Simon Stringer
Video list scroll Function
University of Portsmouth
2017.01.11
*/


//Scroll Recommened video list

//Scroll from left
function sL(idDiv,idThis,idOp){
  var div = document.getElementById(idDiv); //Get this div
  var next = document.getElementById(idThis);
  var back = document.getElementById(idOp);
  var t = 0;
  var an = setInterval(frame, 5); //Set a timer abd run this function in every 5 mm second
  function frame(){ //Animation Function
    if(t == 150){
      clearInterval(an);  //clear animation
    }else{
      t++;
      div.scrollLeft += 30; //Scroll from left
    }
  }
  back.style.display = "block";
  next.style.display = "none";
}

//Scroll from right
function sR(idDiv,idThis,idOp){
  var div = document.getElementById(idDiv); //Get this div
  var next = document.getElementById(idOp);
  var back = document.getElementById(idThis);
  var t = 0;
  var an = setInterval(frame, 5); //Set a timer abd run this function in every 5 mm second
  function frame(){ //Animation Function
    if(t == 150){
      clearInterval(an);  //clear animation
    }else{
      t++;
      div.scrollLeft -= 30; //Scroll from left
    }
  }
  back.style.display = "none";
  next.style.display = "block";
}
