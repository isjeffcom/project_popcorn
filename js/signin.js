/*
Well Played Porject
Created by Jeff Wu
Collaborators: Liam White, Jeff Wu, Simon Stringer
Sign in Function
University of Portsmouth
2017.01.11
*/

//USER Information
let sapi_user ="update_signin.php";
let sapi_ifexist ="update_ifexist.php";

//Get value from input box
var u = $('#username').val();
var p = $('#password').val();

//Open pop-up dialog function
function openDialog(){
  if(Cookies.get('email')){
    everythingKeep();
    $("#dhi_wel").text("WELCOME BACK");
    $("#dhi_acc").text(Cookies.get('email'));
    $("#signout_btn").css("display", "block");
    return;
  }else{
    var overlay = document.getElementById('dialogOverlay');
    var dialog = document.getElementById('dialog');
    everythingBack();
    dialog.style.display='block';
    overlay.style.display='block';
    $("#signout_btn").css("display", "none");
  }

}

//Sign out function
function signout(){
  Cookies.remove('email');
  Cookies.remove('login');
  $('#username').val("");
  $('#password').val("");
  $("#dhi_acc").text("SIGN IN FOR OUR VIP");
  everythingBack();
}

//Close pop-up dialog function
function closeDialog(){
  var overlay = document.getElementById('dialogOverlay');
  var dialog = document.getElementById('dialog');
  dialog.style.display='none';
  overlay.style.display='none';
}

//Login Function with alert pop up
function login(){
  u = $('#username').val();
  p = $('#password').val();

  $.ajax({
    type: "POST",
    url: url+sapi_user,
    data: {
      email: u,
      psw: p,
    },
    success: function(res){
      console.log(res)
      if(res == 1){
        Cookies.set('email', u);
        Cookies.set('login', '1');
        $("#dhi_wel").text("WELCOME BACK");
        $("#dhi_acc").text(u);
        everythingGo();
      }

      if(res == 9){
          $("#password_alert").css("opacity", "0.95");
          $("#password_alert_text").text("CHECK YOUR EMAIL OR PASSWORD");
          return;
      }

      if(res == 11){
        Cookies.set('email', u);
        Cookies.set('login', '1');
        $("#dhi_wel").text("YOU HAVE CREATE A NEW ACCOUNT");
        $("#dhi_acc").text(u);
        everythingGo();
        //do nothing for now
      }
      //closeDialog();
    },
  });

}

//Animate Open
function everythingGo(){
  $("#dialog_headline_inner").css("animation-name", "goDown");
  $("#dialog_headline_inner").css("transform", "translateY(160px)");

  $("#dialog_sign_input").css("animation-name", "fadeout");
  $("#dialog_sign_input").css("opacity", "0");
  $("#dialog_button_area").css("animation-name", "fadeout");
  $("#dialog_button_area").css("opacity", "0");
  $("#dialog_iForgot").css("animation-name", "fadeout");
  $("#dialog_iForgot").css("opacity", "0");
  setTimeout(function(){$("#dialog").hide();$("#dialogOverlay").hide();}, 1500)

}

//Animate Close
function everythingBack(){
  $("#dialog_headline_inner").css("transform", "translateY(0px)");
  $("#dialog_headline_inner").css("animation-name", "none");

  $("#dialog_sign_input").css("animation-name", "none");
  $("#dialog_sign_input").css("opacity", "1");
  $("#dialog_button_area").css("animation-name", "none");
  $("#dialog_button_area").css("opacity", "0.5");
  $("#dialog_iForgot").css("animation-name", "none");
  $("#dialog_iForgot").css("opacity", "1");
  $("#signout_btn").css("display", "none");
  $("#dialog").show();
  $("#dialogOverlay").show();
}

//Animate Close
function everythingKeep(){
  $("#dialog_headline_inner").css("animation-name", "goDown");
  $("#dialog_headline_inner").css("transform", "translateY(160px)");

  $("#dialog_sign_input").css("animation-name", "fadeout")
  $("#dialog_sign_input").css("opacity", "0")
  $("#dialog_button_area").css("animation-name", "fadeout")
  $("#dialog_button_area").css("opacity", "0")
  $("#dialog_iForgot").css("animation-name", "fadeout")
  $("#dialog_iForgot").css("opacity", "0")
  $("#dialog").show();
  $("#dialogOverlay").show();
}

function checkPsw(){
  if(p.length < 6 || p.length > 16){
    $("#password_alert").css("opacity", "0.95");
    return;
  }
}

//if condition is enough to login
function ifPsw(){
  u = $('#username').val();
  p = $('#password').val();
  $("#password_alert").css("opacity", "0");

  if(p.length>=6 && u.length>=4){
    $("#dialog_button_area").css("opacity", "1");
    $("#dialog_button_area").attr("onclick", "login()");
    return;
  }else{
    $("#dialog_button_area").css("opacity", "0.5");
    $("#dialog_button_area").attr("onclick", "");
    return;
  }
}

//Hide NEW sign when input
function hideNew(){
  $("#username_new").css("opacity", "0");
}

//check if account is exist
function ifExist(){
  u = $('#username').val();
  p = $('#password').val();

  if(u.search("@") == -1 || u.search("@") == 1){
    $("#dialog_button_area").css("opacity", "0.5");
    return;
  }else{
    //do nothing
  }

  $.ajax({
    type: "POST",
    url: url+sapi_ifexist,
    data: {
      email: u,
    },
    success: function(res){
      console.log(res);
      if(res == 1){
        console.log("isExist");
        $("#username_new").css("opacity", "0");
      }else{
        console.log("notExist");
        $("#username_new").css("opacity", "1");

      }
      //closeDialog();
    },
  });

}
