/*
Well Played Porject
Created by Jeff Wu
Collaborators: Liam White, Jeff Wu, Simon Stringer
Sign in Function
University of Portsmouth
2017.01.11
*/

//USER Information
var username = ['up793229@myport.ac.uk', 'up123456@myport.ac.uk'];
var password = ['123321', '123456'];

function ifExist(v){
  for(var i=0;i<username.length;i++){
    if(v == username[i]){
      
    }
  }
}

keepLogin();

//Open dialog function
function openDialog(){
  var overlay = document.getElementById('dialogOverlay');
  var dialog = document.getElementById('dialog');
  dialog.style.display='block';
  overlay.style.display='block';
}

//Close dialog function
function closeDialog(){
  var overlay = document.getElementById('dialogOverlay');
  var dialog = document.getElementById('dialog');
  dialog.style.display='none';
  overlay.style.display='none';
}

//Check Username and Password function
function checkUP(u,p){

  for(i=0; i<username.length; i++){
    if(u == username[i]){

      if(p == password[i]){
        result = 1;
        break;
      }else{
        result = 0;
        break;
      }
    }else{
      result = 9;
    }
  }
  return result;
}


//Login Function with alert pop up
function login(){
  var u = document.getElementById('username').value;
  var p = document.getElementById('password').value;


  console.log(navUn);
  var alertContent = document.getElementById('alertContent');
  var alert = document.getElementById('alertOverlay');
  //Get the result from checker
  checkUP(u,p);

  //Username and password are right
  if(result == 1){
    content = 'Log in successful';
    navUn.innerHTML = u;
    navMUN.innerHTML = i;
    alertGreen();
    set2LS(u);
  }

  //Can't find user, sign a new one
  if(result == 9){
    content = 'Successful sign to Well Played';
    navUn.innerHTML = u;
    alertGreen();
    set2LS(u);
    console.log(localStorage.getItem('username'));

  }

  //Right username, wrong password
  if(result == 0){
    content = 'Your password wrong';
    alertRed();
  }

  //Pop Up alert
  alertContent.innerHTML = content;
  alert.style.display='block';



  //Alert display in 3 secound
  setTimeout(function(){document.getElementById('alertOverlay').style.display='none';}, 4000);

  //Close dialog immediatelly
  closeDialog();

}

function signOut(){
  var navIn = document.getElementById('navIn');
  var navUp = document.getElementById('navUp');
  var navUn = document.getElementById('navUn');
  var navOut = document.getElementById('navOut');
  var navMUN = document.getElementById('navMUN');
  var navMBTN = document.getElementById('navMBTN');
  var alert = document.getElementById('alertOverlay');
  navIn.style.display = 'block';
  navUp.style.display = 'block';
  navUn.style.display = 'none';
  navOut.style.display = 'none';
  navMBTN.style.display = 'block';
  navMUN.style.display = 'none';
  localStorage.clear();
}

function alertGreen(){
  var navIn = document.getElementById('navIn');
  var navUp = document.getElementById('navUp');
  var navUn = document.getElementById('navUn');
  var navOut = document.getElementById('navOut');
  var navMUN = document.getElementById('navMUN');
  var navMBTN = document.getElementById('navMBTN');
  var alert = document.getElementById('alertOverlay');
  navMBTN.style.display = 'none';
  navMUN.style.display = 'block';
  navIn.style.display = 'none';
  navUp.style.display = 'none';
  navUn.style.display = 'block';
  navOut.style.display='block';
  alert.style.backgroundColor = '#58c271';
}

function alertRed(){
  var alert = document.getElementById('alertOverlay');
  alert.style.backgroundColor = '#bc2323';
}

function set2LS(u){

  var i = localStorage.getItem('username');

  if(i != null || i != ''){
    localStorage.setItem('username',u);
  }
}

function clearLS(u){
  localStorage.clear();
}

function keepLogin(){
  var i = localStorage.getItem('username');
  var navIn = document.getElementById('navIn');
  var navUp = document.getElementById('navUp');
  var navUn = document.getElementById('navUn');
  var navOut = document.getElementById('navOut');
  var navMUN = document.getElementById('navMUN');
  var navMBTN = document.getElementById('navMBTN');
  if(i != null){
    navIn.style.display = 'none';
    navUp.style.display = 'none';
    navUn.style.display = 'block';
    navOut.style.display = 'block';
    navMBTN.style.display = 'none';
    navUn.innerHTML = i;
    console.log('1: '+i);
  }else{
    navIn.style.display = 'block';
    navUp.style.display = 'block';
    navUn.style.display = 'none';
    navOut.style.display = 'none';
    navMUN.style.display = 'none';
    console.log('2: '+i);
  }
}
