let url="http://up786100.ct.port.ac.uk/api/";
let api_v="data_v.php";
let api_film="data_film.php";
let api_timetable="data_tt.php";

let youtube_url_base = "https://www.youtube.com/embed/";

var video_content=[];
var film_content=[];
var cast_list=[];
var other_film=[];
var movie_time=[];
var tDate=[];
var nowSt;


var isOpen = 0;


var view = new Vue({
  el:"#main",
  data:{
    videoContent1: video_content,
    filmContent1: film_content,
    otherFilm: other_film,
    castList: cast_list,
    movieTime: movie_time,
    date_list: tDate,
    tt_st: tDate,
    now_st: nowSt,
  },

  created: function(){

    //always get data for at first load
    this.$http.post(url+api_film+"?id="+parseInt(getPassId())).then((response)=>{
        var data = JSON.parse(response.body);
        this.filmContent1 = data;
        var t_cast = data[0].cast;
        var after_cast = t_cast.split(",");
        this.castList = after_cast;
    });

    this.$http.post(url+api_film).then((response)=>{
        var data = JSON.parse(response.body);
        this.otherFilm = data;
    });



      //always get data for at first load
      this.$http.post(url+api_v).then((response)=>{
          var data = JSON.parse(response.body);
          this.videoContent1 = data;
      });

      //always get data for at first load
      this.$http.post(url+api_timetable+"?id="+parseInt(getPassId())).then((response)=>{
          var data = JSON.parse(response.body);
          this.movieTime = data;
          for(i=0;i<data.length;i++){
              tDate.push(data[i].date);
          }
          tDate = re_dup(tDate)
          this.date_list = tDate.sort();
          this.tt_st = this.date_list[0];
          this.now_st = this.date_list[0];
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

    tm_switch(){
      this.now_st = this.tt_st;
    },

    toBilling(id){
        window.location.href = './ticketbilling.html?id='+parseInt(getPassId())+"&tid="+id;
    }

  },

});

//Nav to detail page
function navToDetail(id){
  window.location.href = './video.html?id='+id;
}


//Get selected mvoid id
function getPassId(){

  var currentUrl = window.location.href;
  var url4id = new URL(currentUrl);
  var vid = url4id.searchParams.get("id");

  return vid;
}

//Decode YouTube URL
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

//remove duplicates item in array
function re_dup(arr){
    let newArr = []
    for(let i = 0;i < arr.length; i++){
        if(newArr.indexOf(arr[i]) == -1){
            newArr.push(arr[i])
        }
    }
    return newArr;
}
