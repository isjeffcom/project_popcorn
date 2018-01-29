/*
Well Played Porject
Created by Jeff Wu
Collaborators: Liam White, Jeff Wu, Simon Stringer
Mobile page video list adapter
University of Portsmouth
2017.01.11
*/


//Hide elements from video list, only 4 should left
function hideImage(){
  var div;
  var divClass = document.getElementsByClassName('content_video_list');
  //console.log('divClass: ' + divClass.length);
  if(divClass.length != 0)
    for(i=1;i<divClass.length + 1;i++){
      div = document.getElementById('cvl_' + i);
      var vlChildDiv = div.getElementsByClassName('vl_container');

      if(vlChildDiv.length > 4){
        vlChildDiv[4].style.display = 'none';
        vlChildDiv[5].style.display = 'none';
        vlChildDiv[6].style.display = 'none';
        vlChildDiv[7].style.display = 'none';
      }
    }
  }



//Unhide elements from video list, display all
function showImage(){
  var div;
  var divClass = document.getElementsByClassName('content_video_list');
  //console.log('divClass: ' + divClass.length);
  if(divClass.length != 0){
    for(i=1;i<divClass.length + 1;i++){
      div = document.getElementById('cvl_' + i);
      var vlChildDiv = div.getElementsByClassName('vl_container');

      if(vlChildDiv.length > 4){
        vlChildDiv[4].style.display = 'block';
        vlChildDiv[5].style.display = 'block';
        vlChildDiv[6].style.display = 'block';
        vlChildDiv[7].style.display = 'block';
      }
    }
  }

}

//Check if in mobile device
if(document.body.clientWidth < 600){
  hideImage();
}else{
  showImage();
}
