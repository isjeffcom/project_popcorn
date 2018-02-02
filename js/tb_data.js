let url="http://up786100.ct.port.ac.uk/api/";
let api_film ="data_film.php";
let api_timetable="data_tt.php";
let api_user="data_user.php";
let sapi_ticket="update_ticket.php";

var filmContent = [];
var timeContent = [];
var filmList = [];
var movie_time=[];
var usList=[];
var isS2Open = false;
var isS3Open = false;
var defaultFilm = false;
var selected_value = "Please select a movie";
var selected_time;
var nowSt;
var tDate=[];
var ttId;
var iTs = false;
var iTs_s = false;
var noUsList = false;
var haveUsList = false;
var uid;
var fid;





var view = new Vue({
  el:"#main",
  http: {
    emulateJSON: true,
    emulateHTTP: true
  },
  data:{
    film_content:filmContent,
    film_list:filmList,
    time_content: timeContent,
    default_film: defaultFilm,
    isTimeSelected: iTs,
    step2: isS2Open,
    step3: isS3Open,
    sv: selected_value,
    st: selected_time,
    date_list: tDate,
    movieTime: movie_time,
    tt_st: tDate,
    now_st: nowSt,
    tt_id: ttId,
    isTimeSelectedComplete: iTs_s,
    hello:"hello",
    us_list: usList,
    have_us_list: haveUsList,
    no_us_list: noUsList,
    u_id: uid,
    f_id: fid,
  },

  created: function(){

    this.$http.post(url+api_film).then((response)=>{
        var fl_data = JSON.parse(response.body);
        this.film_list = fl_data;
        this.f_id = fl_data[0].id;
    });

    if(Cookies.get('email')){
      this.$http.post(url+api_user+"?e="+Cookies.get('email')).then((response)=>{
          var us_data = JSON.parse(response.body);
          this.us_list = us_data;
          this.u_id = us_data[0].id;

          this.no_us_list = false;
          this.have_us_list = true;
      });
    }else{
      this.no_us_list = true;
      this.have_us_list = false;
    }


    if(getPassId()){

      this.step2 = true;
      this.$http.post(url+api_film+"?id="+parseInt(getPassId())).then((response)=>{
          var data = JSON.parse(response.body);
          this.film_content = data;
      });
      this.$http.post(url+api_timetable+"?sid="+parseInt(getTId())).then((response)=>{
          var time_data = JSON.parse(response.body);
          this.time_content = time_data;
      });
      this.sv = getPassId();
      this.ifsTimeSelected = false;
      this.isTimeSelectedComplete = true;
      iTs_s = true;
    }else{
      this.default_film = true;
      this.isTimeSelected = false;
      this.isTimeSelectedComplete = false;
      iTs_s = false;
      //do nothing...
    }
  },

  methods:{

    film_change(e){
      tDate = [];
      this.sv = e.target.value;
      this.$http.post(url+api_film+"?id="+this.sv).then((response)=>{
          var data = JSON.parse(response.body);
          this.film_content = data;
      });
      this.default_film = false;
      this.isTimeSelected = true;
      this.step2 = true;

      this.$http.post(url+api_timetable+"?id="+this.sv).then((response)=>{
          var tt_data = JSON.parse(response.body);
          this.movieTime = tt_data;
          for(i=0;i<tt_data.length;i++){
              tDate.push(tt_data[i].date);
          }
          tDate = re_dup(tDate);
          this.date_list = tDate.sort();
          this.tt_st = this.date_list[0];
          this.now_st = this.date_list[0];
          $("html, body").animate({ scrollTop: $('#date_select').offset().top }, 400);
      });



    },

    tm_switch(){
      this.now_st = this.tt_st;
    },

    timeSelected(tid){
      this.$http.post(url+api_timetable+"?sid="+tid).then((response)=>{
          var time_data = JSON.parse(response.body);
          this.time_content = time_data;
      });
      iTs_s = true;
      this.isTimeSelectedComplete = true;
      this.isTimeSelected = true;
      $("#seat_area").show();
      $("html, body").animate({ scrollTop: $('#seat_area').offset().top }, 400);
    },

    tk_submit(){

      var tk_info = this.time_content;
      var tk_uid = this.u_id;
      var tk_fid = this.f_id;
      var tk_time = tk_info[0].time;
      var tk_type = tk_info[0].type;
      var tk_date = tk_info[0].date;

      var tk_st_arr = [];
      var toTicketPar;

      $.each( $(".tk_position"), function(){
        tk_st_arr.push($(this).text());
      });

      if(tk_st_arr.length < 1){
        alert("Please select a seat.");
        return;
      }

      var tk_data = {
        uid: tk_uid,
        fid: tk_fid,
        ftime: tk_time,
        fdate: tk_date,
        type: tk_type,
        seat: String(tk_st_arr),
      }
      this.$http.post(url+sapi_ticket, tk_data).then((response)=>{
          if(response.status == 200){
            var tk_res = response.body;
            Cookies.set("tid", tk_res);
          }
      }).then(function(){
        window.location.href = './ticket.html';
      }).catch ((error)=> console.log(error));

    },

  },

});

$(document).ready(function() {
  if(iTs_s){
    $("#seat_area").show();
  }else{
    $("#seat_area").hide();
  }
});

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

//Get selected mvoid id
function getPassId(){
    var currentUrl = window.location.href;
    var url4id = new URL(currentUrl);
    var vid = url4id.searchParams.get("id");
    return vid;
}

//Get selected mvoid id
function getTId(){
  var currentUrl = window.location.href;
  var url4id = new URL(currentUrl);
  var tid = url4id.searchParams.get("tid");
  return tid;
}
