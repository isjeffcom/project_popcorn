<?php


/**
* Created by JIANFENG WU
* Connect to Database
* Date:2017.10.22
*/

  $link = mysqli_connect('localhost', 'popcorn', '123456', 'popcorn');
  mysqli_select_db($link, 'popcorn');
  mysqli_query($link, 'SET NAMES utf8');
  if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
  }

?>
