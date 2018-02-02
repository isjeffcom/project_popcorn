<?php


include('./connect.php');
include('../admin/services/security.php');

$email = $_POST['email'];

if(!empty($_POST)){
    $checkUE = "SELECT * FROM popcorn_user WHERE email = '$email'";
    $checkUERun = mysqli_query($link,$checkUE);
    $checkUERow = mysqli_num_rows($checkUERun);
    if($checkUERow == 1){
      echo "1";
    }else{
      echo "0";
    }
}





?>
