

<?php

/**
* Created by JIANFENG WU
* Last update: 2017.10.22
*/
  //header('Access-Control-Allow-Origin: *');
  //connect to database
  include('./connect.php');


  if(isset($_GET['e'])){
    $sql = "SELECT id, address, postcode, pcard FROM popcorn_user WHERE email = '".$_GET['e']."'";
  }



  //query type:select, get data from database: py
  $result = $link->query($sql);

  //fetch data
  if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
        $jsonArr[] = $row;
      }
  }



  //print out data
  echo stripslashes(json_encode($jsonArr, JSON_UNESCAPED_UNICODE));

?>
