

var view = new Vue({

  el:"#main",
  data:{
    
  },
  methods:{
    openVideo(vid){
      //always get data for at first load
      if(vid){
        this.$http.post(url+api_v+"?id="+vid).then((response)=>{
            var data = JSON.parse(response.body);
            var vurl = readYoutubeURL(data[0].url);
            console.log(vurl);
            $("#video_overlay_player").find("iframe").attr("src", vurl);
        });
      }

      if(isOpen == 0){
        $("#video_overlay").css("display", "block");
        $("#video_overlay_player").css("display", "block");

        isOpen = 1;
      }else{
        $("#video_overlay").css("display", "none");
        $("#video_overlay_player").css("display", "none");
        $("#video_overlay_player").find("iframe").attr("src", "");
        isOpen = 0;
      }
    },
  }

});

function readYoutubeURL(url){

    //if other var exist in url like &feature=youtu.be
    if(url.search('&')!= -1){
        youtube_video_id = url.substring(url.search('=')+1,url.search('&'));
    }else{
        youtube_video_id = url.substring(url.search('=')+1);
    }

    //final
    youtube_return_url = youtube_url_base + youtube_video_id;
    return youtube_return_url;
}
