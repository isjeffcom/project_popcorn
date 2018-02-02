<?php


/**
* Created by JIANFENG WU
* update to database
* Last update: 2017.05.04
*/

  include('./connect.php');
  include('../admin/services/security.php');

  $email = $_POST['email'];
  $psw = $_POST['psw'];

  if(!empty($_POST)){

      $checkUE = "SELECT * FROM popcorn_user WHERE email = '$email'";
      $checkUERun = mysqli_query($link,$checkUE);
      $checkUERow = mysqli_num_rows($checkUERun);

      if($checkUERow == 1){

        $checkPSW = "SELECT psw FROM popcorn_user WHERE email = '".$email."'";
        $checkPSWRun = mysqli_query($link,$checkPSW);
        $checkPSWArr = mysqli_fetch_array($checkPSWRun);
        if($checkPSWArr[0] == md5($psw) || strtolower($checkPSWArr[0]) == md5($psw)){
          echo "1"; //password right
        }else{
          echo "9"; //password wrong
        }

      }else{

        $psw = md5($psw);
        $ts = time();
        $newAcc = "INSERT INTO popcorn_user (type, email, psw, ts) VALUES ('1', '$email', '$psw', '$ts')";

        $newAccRun = mysqli_query($link,$newAcc);
        if($newAccRun){
          echo "11"; //create successful
        }else{
          echo "99"; //create fail
        }

      }
  }


?>
