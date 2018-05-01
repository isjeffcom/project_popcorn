let url="https://isjeff.com/popcorn/api/";
//let url="http://localhost:7888/project_popcorn/api/";
let api_film ="data_film.php";
let api_v ="data_v.php";
let api_t ="data_tt.php";
let api_s ="data_s.php";
let timelineColor = ["#ffb03b", "#ff983c", "#ff803c", "#ff693d", "#ff513e"]

let youtube_url_base = "https://www.youtube.com/embed/"

var isOpen = 0;

var filmContent=[];
var videoContent=[];
var timeContent=[];
var sliderContent=[];
var dateList = [];

var view = new Vue({
  el:"#main",
  data:{
    film_content: filmContent,
    video_content: videoContent,
    time_content: timeContent,
    slider_content: sliderContent,
    date_list: dateList,
    timeline_color: timelineColor,
  },
  created: function(){

      //always get data for at first load
      this.$http.post(url+api_film).then((response)=>{
          var data = JSON.parse(response.body);
          this.film_content = data;

          for(i=0;i<data.length;i++){
            dateList.push(dateFormat(data[i].rDate));
          }
          var dl = (dateList.sort());
          dl = dl.reverse();
          this.date_list = dl;
      });

      this.$http.post(url+api_v).then((response)=>{
          var dataVideo = JSON.parse(response.body);
          this.video_content = dataVideo;
      });

      this.$http.post(url+api_s).then((response)=>{
          var dataSlider = JSON.parse(response.body);
          this.slider_content = dataSlider;
      });

  },
  methods:{
    openVideo(vid){
      //always get data for at first load
      if(vid){
        this.$http.post(url+api_v+"?id="+vid).then((response)=>{
            var data = JSON.parse(response.body);
            var vurl = readYoutubeURL(data[0].url);
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

    sliderOpenVideo(){
      this.$http.post(url+api_v+"?vid="+$("#s_play_btn").attr("data-id")).then((response)=>{
          var sov_data = JSON.parse(response.body);
          var sov_vid = sov_data[0].id
          this.openVideo(sov_vid);
      });

    },
  }
});

function navToDetail(id){
  window.location.href = 'https://isjeff.com/popcorn/video.html?id='+id;
}

function sliderToDetail(){
  window.location.href = 'https://isjeff.com/popcorn/video.html?id='+ $("#psName").attr("data-id");
}


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

//remove duplicate item in array
function re_dup(arr){
    let newArr = [];
    for(let i = 0;i < arr.length; i++){
        if(newArr.indexOf(arr[i]) == -1){
            newArr.push(arr[i])
        }
    }
    return newArr;
}

function dateFormat(val){
  var re = val.substring(8,10) + "/" + val.substring(5,7);
  return re;
}
