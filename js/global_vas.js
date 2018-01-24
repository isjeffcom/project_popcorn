var isOpen = 0;
var sBarIsOpen = 0;
function openVideo(){

        if(isOpen == 0){
            document.getElementById("video_overlay").style.display = "block";
            document.getElementById("video_overlay_player").style.display = "block";
            $("#video_overlay_player").find("iframe").attr("src", "https://www.youtube.com/embed/52x5HJ9H8DM");
            isOpen = 1;
        }else{
            document.getElementById("video_overlay").style.display = "none";
            document.getElementById("video_overlay_player").style.display = "none";
            $("#video_overlay_player").find("iframe").attr("src", "");
            isOpen = 0;
        }
    }

function openSearchBar(){
    if(sBarIsOpen == 0){
        document.getElementById("searchBarOverlay").style.display="block";
        document.getElementById("sbar_overlay").style.display = "block";
        sBarIsOpen = 1;
    }else{
        document.getElementById("searchBarOverlay").style.display="none";
        document.getElementById("sbar_overlay").style.display = "none";
        sBarIsOpen = 0;
    }

}