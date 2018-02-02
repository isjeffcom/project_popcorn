let url="http://up786100.ct.port.ac.uk/api/";
let api_ticket="data_ticket.php";
let api_film="data_film.php";


var tid = Cookies.get("tid");
tid = tid.split(",")
console.log(tid);

var tc;
var f_id;

var view = new Vue({
  el:"#main",
  data:{
    ticketContent:tc,
    fid: f_id,
    ticketCount: tid,
  },
  created: function(){
    //always get data for at first load
    this.$http.post(url+api_ticket+"?id="+tid[0]).then((response)=>{
        var data = JSON.parse(response.body);
        this.ticketContent = data;
        this.fid = data[0].fid;
        console.log(data);
    }).then(function(){
      this.$http.post(url+api_film+"?id="+this.fid).then((response)=>{
          var f_data = JSON.parse(response.body);
          this.ticketContent = f_data;
          console.log(f_data);
      });
    });


  },



});
