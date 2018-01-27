

let url = "http://up786100.ct.port.ac.uk";
let api_film = "/api/data_film.php";
let api_user = '/api/data_user.php';
let api_timetable = '/api/data_tt.php';
let api_video = '/api/data_v.php';
let api_slider = '/api/data_s.php';
let api_ticket = '/api/data_ticket.php';

let sapi_film = '/api/update_film.php';
let sapi_video = '/api/update_v.php';
let sapi_user = '/api/update_user.php';
let sapi_slider = '/api/update_slider.php';
let sapi_timetable = '/api/update_tt.php';

let api_imgUpload = '/api/upload_img.php';
let api_vidUpload = '/api/upload_video.php';


let youtube_url_base = "https://www.youtube.com/embed/"



var viewTable = true;

var viewIsNew = true;
var viewIsEdit = true;
var isYouTube = false;
var youtubeURL = 0;

//Edit ui view
var viewFilm = false;
var viewVideo = false;
var viewSlider = false;
var viewTimeTable = false;
var ttEditView = false;
var ttNewView = false;
var img;
var tt_id = 1;

/*page get doc

    $sBI_id: Function page id control by sidebar
        0: film
        1: video
        2. Timetable
        3. User
        4. Slider

    $IBA_id: item id control by listview
*/


//default view flag
var sBI_cS = 0;

//let sideBarItem = document.getElementsByClassName("sideBar_item");

let viewNT=["MOVIE", "VIDEO", "SLIDER"];
let view_title_0 = ["Name","Category","Release Data","Status", "Action"];
let view_title_1 = ["Name","URL","Belong to","Status", "Action"];
let view_title_3 = ["Email","Address","Postcode","Payment", "Action"];
let view_title_4 = ["Name","Image","Link to","Order", "Action"];
let view_title_5 = ["User","Film","Reference Code","Seat", "Action"];

let viewFilmRate = ["All", "PG", "12+", "15+", "18+", "19R"];
let viewFilmStatus = ["Coming", "NowOn", "Pass"];
let viewTTType = ["2D-AD", "2D", "3D-AD", "3D"];

var movieToIdList = [];
var ttDateList = [];
var tttTime;
var tttDate;
var tttMov;

//default selected item
$("#default_sBI").css("background-color","#0c0f19");

//sidebar controller
$(document).on("click", ".sideBar_item", function(){
    var sBI_id = $(this).attr("data-id");
    $(this).css("background-color","#0c0f19");
    $(".sideBar_item").not(this).css("background-color","#2a3045");
    $(".sideBar_item").not(this).css("cursor","pointer");

    viewFilm = true ? false : true;
    viewVideo = true ? false : true;
    viewIsEdit = false;
    viewIsNew = false;

    //console.log("id: " + sBI_id)
    sBI_cS = parseInt(sBI_id);
    if (sBI_cS == 2){
        viewTable = false;
        viewTimeTable = true ? true : false;
        view.tt_m_switch();
        view.getData(sBI_cS)
        view.getMovieToId();
    }else{
        viewTable = true;
        viewTimeTable = true ? false : true;
    }


    if(sBI_cS == 3 || sBI_cS == 5){
        $(".addNewBtn").hide();
    }else{
        $(".addNewBtn").show();
    }

    view.getData(sBI_cS);
    return sBI_cS;
});

//new film
$(document).on("click", ".addNewBtn", function(){
    viewTable = true ? false : true;

    if(sBI_cS == 0){
        viewFilm = true ? true : false;
    }

    if(sBI_cS == 1){
        viewVideo = true ? true : false;
        view.getMovieToId()
    }

    if(sBI_cS == 4){
        viewSlider = true ? true : false;
        view.getMovieToId()
    }


    viewIsEdit = true ? false : true;
    viewIsNew = true ? true : false;
    let isNew = 90;
    view.getData(isNew);

});

//edit film
$(document).on("click", ".movieEditBtn", function(){
    var IBA_id = $(this).attr("data-id");
    viewTable = true ? false : true;
    viewFilm = true ? true : false;
    viewIsEdit = true ? true : false;
    viewIsNew = true ? false : true;
    viewSlider = true ? false : true;
    view.getData(sBI_cS, IBA_id);
});

//edit video
$(document).on("click", ".videoEditBtn", function(){
    var IBA_id = $(this).attr("data-id");
    viewTable = true ? false : true;
    viewVideo = true ? true : false;
    viewIsEdit = true ? true : false;
    viewIsNew = true ? false : true;
    viewSlider = true ? false : true;
    view.getData(sBI_cS, IBA_id);
});

//edit slider
$(document).on("click", ".sliderEditBtn", function(){
    var IBA_id = $(this).attr("data-id");
    viewTable = true ? false : true;
    viewSlider = true ? true : false;
    viewIsEdit = true ? true : false;
    viewIsNew = true ? false : true;
    view.getData(sBI_cS, IBA_id);
});








//init vue js
var view = new Vue({
    el: '#main',
    data:{
        //img_cover:"/cv",
        posterImageUploading:"",
        previewImageUploading:"",
        table_content:[],
        single_data_content:[],
        table_title: view_title_0,
        view_table: viewTable,
        view_new_title: viewNT,
        view_timetable:viewTimeTable,
        vid: sBI_cS,
        view_film: viewFilm,
        view_video: viewVideo,
        view_slider: viewSlider,
        view_is_edit:viewIsEdit,
        view_is_new: viewIsNew,
        view_film_rate: viewFilmRate,
        view_film_status: viewFilmStatus,
        img: img,
        movie_to_id_list:movieToIdList,
        is_youtube: isYouTube,
        youtube_Url: youtubeURL,
        tt_content:[],
        tt_s:[],
        tt_id:tt_id,
        tt_datelist: ttDateList,
        tt_editview: ttEditView,
        tt_newview: ttNewView,
        tt_typelist:viewTTType,

    },
    //dont know what it is but it work
    http: {
        emulateJSON: true,
        emulateHTTP: true
    },

    created: function(){
        //always get data for at first load
        this.$http.post(url+api_film).then((response)=>{
            var data = JSON.parse(response.body);
            this.table_content = data;
        });

    },

    ready: function(){



    },

    methods: {


        sub_f(e){
            //select a api
            var sApi = this.idSubApi(sBI_cS);


            //view is edit of not
            var postType = viewIsEdit ? 1 : 0;
            var f_id= viewIsEdit ? $('#f_id').val() : 0;
            var posterImg = $('#f_posterImg').attr("path") ? $('#f_posterImg').attr("path") : $('#f_posterImgExist').attr("src");
            var previewImg = $('#f_previewImg').attr("path") ? $('#f_previewImg').attr("path")  : $('#f_previewImgExist').attr("src");

            var s_film_data = {
                name: $('#f_name').val(),
                cate: $('#f_cate').val(),
                brief: $('#f_brief').val(),
                rDate: $('#f_rdate').val(),
                runningTime: $('#f_runningTime').val(),
                director: $('#f_director').val(),
                cast: $('#f_cast').val(),
                rate: $('#f_rate').find(":selected").val(),
                status: $('#f_status').find(":selected").val(),
                posterImg: posterImg,
                previewImg: previewImg,
                postType: postType,
                id: f_id,
            }

            //NO BLANK INFO
            if(this.sub_checkBlank(s_film_data) == false){
                console.log(s_film_data)
                alert("All information is required");
                return;
            }

            //post func
            this.$http.post(url+sapi_film, s_film_data).then((response)=>{
                if(response.status == 200){
                    //go back
                    viewTable = true;
                    viewIsEdit = false;
                    viewIsNew = false;
                    viewFilm = false;
                    view.getData(sBI_cS);
                }else{
                    alert("submit false");
                }
            }).catch ((error)=> console.log(error));
        },

        sub_v(e){
            //select a api
            var sApi = this.idSubApi(sBI_cS);


            //view is edit of not
            var postType = viewIsEdit ? 1 : 0;
            var f_id= viewIsEdit ? $('#v_id').val() : 0;
            var previewImg = $('#v_previewImg').attr("path") ? $('#v_previewImg').attr("path") : $('#v_previewImgExist').attr("src");


            var s_video_data = {
                name: $('#v_name').val(),
                toMovieId: $('#v_toid').val(),
                v_url: $('#v_url').val(),
                previewImg: previewImg,
                postType: postType,
                status:1,
                id: f_id,
            }

            //NO BLANK INFO
            if(this.sub_checkBlank(s_video_data) == false){
                console.log(s_video_data)
                alert("All information is required");
                return;
            }

            //post func
            this.$http.post(url+sapi_video, s_video_data).then((response)=>{
                if(response.status == 200){
                    //go back
                    viewTable = true;
                    viewIsEdit = false;
                    viewIsNew = false;
                    viewVideo = false;
                    view.getData(sBI_cS);
                }else{
                    alert("submit false");
                }
            }).catch ((error)=> console.log(error));
        },

        sub_s(e){
            //select a api
            var sApi = this.idSubApi(sBI_cS);

            //view is edit of not
            var postType = viewIsEdit ? 1 : 0;
            var s_id= viewIsEdit ? $('#s_id').val() : 0;
            var slider_img = $('#s_img').attr("path") ? $('#s_img').attr("path") : $('#s_imgExist').attr("src");

            var s_slider_data = {
                name: $('#s_name').val(),
                toMovieId: $('#s_toid').val(),
                s_img: slider_img,
                s_od:$('#s_od').val(),
                postType: postType,
                id: s_id,
            }

            //NO BLANK INFO
            if(this.sub_checkBlank(s_slider_data) == false){
                alert("All information is required");
                return;
            }

            //post func
            this.$http.post(url+sapi_slider, s_slider_data).then((response)=>{
                if(response.status == 200){
                    //go back
                    viewTable = true;
                    viewIsEdit = false;
                    viewIsNew = false;
                    viewSlider = false;
                    view.getData(sBI_cS);
                    console.log(response.body)
                }else{
                    alert("submit false");
                }
            }).catch ((error)=> console.log(error));
        },

        sub_t(e){
            //select a api
            var sApi = this.idSubApi(sBI_cS);
            //view is edit of not
            var postType = viewIsEdit ? 1 : 0;
            var tid= viewIsEdit ? $(e.target).attr("data-id") : 0;

            tttDate = tttDate ? tttDate : $('#t_date_'+tid).val();
            tttTime = tttTime ? tttTime : $('#t_time_'+tid).val();

            var t_data = {
                date: tttDate,
                time: tttTime,
                type: $('#t_type_'+tid).val(),
                toMovieId: $('#t_toMovieId_'+tid).val(),
                postType: postType,
                id: tid,
            }

            //NO BLANK INFO
            if(this.sub_checkBlank(t_data) == false){
                alert("All information is required");
                return;
            }

            //post func
            this.$http.post(url+sapi_timetable, t_data).then((response)=>{
                if(response.status == 200){
                    //go back
                    ttEditView = true ? false : true;
                    ttNewView = true ? false : true;
                    this.tt_editview = ttEditView;
                    this.tt_newview = ttNewView;
                    view.tt_m_switch();
                }else{
                    alert("submit false");
                }
            }).catch ((error)=> console.log(error));
        },

        //check all infomation been fill before post to back-end
        sub_checkBlank(dataObj){
            var cb_res = true;
            for(var i in dataObj){
                if(dataObj[i]==null || typeof dataObj== undefined){
                    cb_res = false;
                }
            }
            return cb_res;
        },

        movChange(e){
            tttMov = e.target.value;
        },

        timeChange(e){
            tttTime = e.target.value;
        },

        dateChange(e){
            tttDate = e.target.value;
            console.log(tttDate)
        },

        sub_del(e){
            //post func
            var self = $(e.target);
            var fdel_id = self.attr("data-id");
            var del_postType = 99;
            this.$http.post(url+this.idSubApi(sBI_cS), {id: fdel_id, postType: del_postType}).then((response)=>{
                if(response.status == 200){
                    view.getData(sBI_cS);
                    alert("Item Deleted");
                }else{
                    alert("submit false");
                }
            }).catch ((error)=> console.log(error));
        },

        tt_del(e){
            //post func
            var self = $(e.target);
            var fdel_id = self.attr("data-id");
            var del_postType = 99;
            this.$http.post(url+this.idSubApi(sBI_cS), {id: fdel_id, postType: del_postType}).then((response)=>{
                if(response.status == 200){
                    this.tt_m_switch();
                    ttEditView = false;
                    this.tt_editview = ttEditView;
                    console.log(ttEditView);
                    alert("Item Deleted");
                }else{
                    alert("submit false");
                }
            }).catch ((error)=> console.log(error));
        },

        //image upload function, return image url
        upload(e){
            var file = event.target.files[0];
            var formData = new FormData();
            formData.append("fileToUpload", file)
            var self=$(e.target);

            this.$http.post(url+api_imgUpload, formData).then(response => {
                // get status
                if(response.status == 200){
                    //remove url when official deploy
                    var finalUrl = url + String(response.body); //combine image url
                    finalUrl=finalUrl.replace(/[\r\n]/g,""); //remove spacing in text assest for decode
                    self.attr("path", finalUrl);
                    self.next().find('img').remove(); //remove previous preview image (if exist no need cuz no warning)
                    self.next().append("<img src=" + finalUrl + " width='200px'>"); //append preview image

                };
            }).catch ((error)=> console.log(error));

        },

        //video upload function, return video url
        upload_v(e){
            var file = event.target.files[0];
            var formData = new FormData();
            formData.append("fileToUpload", file)
            var self=$(e.target);

            this.$http.post(url+api_vidUpload, formData).then(response => {
                // get status
                if(response.status == 200){
                    //remove url when official deploy
                    var finalUrl_v = url + String(response.body); //combine image url
                    finalUrl_v=finalUrl_v.replace(/[\r\n]/g,""); //remove spacing in text assest for decode
                    $("#v_url").val(finalUrl_v);
                    self.attr("path", finalUrl_v);
                    self.next().find('video').remove(); //remove previous preview image (if exist no need cuz no warning)
                    self.next().append("<video width='320' height='240' controls><source id='v_url' v-bind:src="+finalUrl_v+" type='video/mp4'></video>"); //append preview image
                };
            }).catch ((error)=> console.log(error));
        },

        tt_m_switch(){
            var tt_mid = this.tt_id;
            ttDateList = [];

            this.$http.post(url+api_timetable+"?id="+tt_mid).then((response)=>{
                var data = JSON.parse(response.body);
                if(typeof data != undefined || data != null || data != ""){
                    this.tt_content = data;
                    for(i=0;i<data.length;i++){
                        ttDateList.push(data[i].date);
                    }
                    this.tt_datelist = re_dup(ttDateList);
                }
            });
        },

        tt_single_edit(e){
            var tt_self = e.target.parentElement;
            var tt_this_id = $(tt_self).attr("data-id");
            var tid= viewIsEdit ? $(e.target).attr("data-id") : 0;

            ttEditView = true ? true : false;
            viewIsEdit = true ? true : false;

            tttDate = $('#t_date_'+tid).val();
            tttTime = $('#t_time_'+tid).val();

            this.tt_editview = ttEditView;
            this.getMovieToId();

            this.$http.post(url+api_timetable+"?sid="+tt_this_id).then((response)=>{
                var data = JSON.parse(response.body);
                if(typeof data != undefined || data != null || data != ""){
                    this.tt_s = data;
                }
            });

        },

        tt_addNew(){
            ttNewView = true ? true : false;
            viewIsEdit = true ? false : true;
            this.tt_newview = ttNewView;
        },

        tt_closeEditView(){
            ttEditView = true ? false : true;
            this.tt_editview = ttEditView;
        },

        tt_closeNewView(){
            ttNewView = true ? false : true;
            this.tt_newview = ttNewView;
        },

        //main func for getting data and refresh page
        getData(currentViewId, singleId){

            var api;
            var cid = currentViewId
            var tTitle = this.idTitle(cid);
            api = this.idCidApi(cid);

            //Important View Refresh Controller
            this.table_title = tTitle;
            this.vid = cid;
            this.view_table = viewTable;
            this.view_film = viewFilm;
            this.view_video = viewVideo;
            this.view_timetable = viewTimeTable;
            this.view_slider = viewSlider;
            this.view_is_edit = viewIsEdit;
            this.view_is_new = viewIsNew;

            console.log(cid);

            //if no need to get data
            if(currentViewId == 90){return;}



            if(singleId != undefined){
                var sid = singleId;
                this.$http.post(url+api+"?id="+singleId).then((response)=>{
                    var data = JSON.parse(response.body);
                    if(typeof data != undefined || data != null || data != ""){
                        this.single_data_content = data;
                        if(data[0].url){
                            if(data[0].url.search('youtube') != -1){
                                isYouTube = true;
                                this.is_youtube = isYouTube;
                                this.youtube_Url = this.readYoutubeURL(data[0].url);
                            }else{
                                isYouTube = false;
                                this.is_youtube = isYouTube;
                            }
                        }

                    }
                });

                if(currentViewId == 1){
                    this.getMovieToId();
                }

                if(currentViewId == 4){
                    this.getMovieToId();
                }

            }else{
                this.$http.post(url+api).then((response)=>{
                    var data = JSON.parse(response.body);
                    if(typeof data != undefined || data != null || data != ""){
                        this.table_content = data;
                    }
                });
            }

        },

        //get movie id list (for toId selection)
        getMovieToId(){
            this.$http.post(url+api_film).then((response)=>{
                var data = JSON.parse(response.body);
                if(typeof data != undefined || data != null || data != ""){
                    this.movie_to_id_list = data;
                }
            });
        },

        //id data api by current view id
        idCidApi(cid){
            var tempApi;

            switch (cid) {
                case 0:
                    tempApi = api_film
                break;

                case 1:
                    tempApi = api_video
                break;

                case 2:
                    tempApi = api_timetable
                break;

                case 3:
                    tempApi = api_user
                break;

                case 4:
                    tempApi = api_slider
                break;

                case 5:
                    tempApi = api_ticket
                break;
            }

            return tempApi;
        },

        //id table title by current view id
        idTitle(cid){

            var tempTitle;
            switch (cid) {
                case 0:
                    tempTitle = view_title_0
                break;

                case 1:
                    tempTitle = view_title_1
                break;

                case 3:
                    tempTitle = view_title_3
                break;

                case 4:
                    tempTitle = view_title_4
                break;

                case 5:
                    tempTitle = view_title_5
                break;

                default:
                    break;
            }

            return tempTitle;

        },

        //id submit api by current view id
        idSubApi(sBI_cS){
            var tempsApi;
            switch(sBI_cS){
                case 0:
                tempsApi = sapi_film;
                break;

                case 1:
                tempsApi = sapi_video;
                break;

                case 2:
                tempsApi = sapi_timetable;
                break;

                case 3:
                tempsApi = sapi_user;
                break;

                case 4:
                tempsApi = sapi_slider;
                break;
            }
            return tempsApi;
        },

        //convert youtube normal url
        //ONLY SUPPORT https://www.youtube.com/watch?v=AIAtRVaxFaU without any thing else at the end
        readYoutubeURL(url){

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

    }
})




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
