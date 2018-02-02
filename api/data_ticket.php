

<?php

/**
* Created by JIANFENG WU
* Last update: 2017.10.22
*/
  //header('Access-Control-Allow-Origin: *');
  //connect to database
  include('./connect.php');

  if(isset($_GET['fid'])){
    $sql = "SELECT * FROM popcorn_ticket WHERE fd=".$_GET['id']."";

  }
  if(isset($_GET['uid'])){
    $sql = "SELECT * FROM popcorn_ticket WHERE uid=".$_GET['sid']."";

  }

  if(isset($_GET['id'])){
    $sql = "SELECT * FROM popcorn_ticket WHERE id=".$_GET['id']."";
  }

  if(!isset($_GET['id']) && !isset($_GET['uid']) && !isset($_GET['fid'])){
    $sql = "SELECT * FROM popcorn_ticket ORDER BY ts DESC";

  }

  //Catch mutiple id
  if(isset($_GET['mtid'])){
    //pass data from get par saperate by '-'
    $tid = explode('-', $_GET['mtid']);
    
    //Generate sql code after WHERE 
    for($i=0;$i<count($tid);$i++){
      if($i == 0){
        $tid_c = " id = ".$tid[$i];
      }else{
        $tid_c = $tid_c." OR id = ".$tid[$i];
      }
      
    }

    //Write sql
    $sql = "SELECT * FROM popcorn_ticket WHERE ".$tid_c."";

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
