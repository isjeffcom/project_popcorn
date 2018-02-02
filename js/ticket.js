let url="http://up786100.ct.port.ac.uk/api/";
let api_ticket="data_ticket.php";
let api_film="data_film.php";


var tid = Cookies.get("tid");
tid = tid.split(",")
var tc;
var f_id;
var film_name;

var view = new Vue({
  el:"#main",
  http: {
    emulateJSON: true,
    emulateHTTP: true
  },
  data:{
    ticketContent:tc,
    fid: f_id,
    ticketCount: tid,
    filmName:film_name,
  },
  created: function(){

    
    t_id_push = function(){
      var frid;
      for(i=0;i<tid.length;i++){
        console.log(tid.length);
        if(i == 0){
          frid = tid[i];
        }else{
          frid = frid + "-" + tid[i];
        }
      }
      return frid;
    }


    //always get data for at first load
    this.$http.post(url+api_ticket+"?mtid="+t_id_push()).then((response)=>{
        var data = JSON.parse(response.body);
        this.ticketContent = data;
        this.fid = data[0].fid;
        console.log(data);
        //console.log(response.body);
    }).then(function(){
      this.$http.post(url+api_film+"?id="+this.fid).then((response)=>{
        var f_data = JSON.parse(response.body);
        this.filmName = f_data[0].name;
      });
    });


  },



});
