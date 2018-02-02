<?php
/**
* Created by JIANFENG WU
* Last update: 2017.10.22
*/
  header("Access-Control-Allow-Origin:*");
  include('./connect.php');
  if(!empty($_POST)){

    $uid = $_POST["uid"];
    $fid = $_POST["fid"];
    $t = $_POST["ftime"];
    $type = $_POST["type"];
    $ts = time();
    $state = 0;
    $seat = explode(",", $_POST["seat"]);
    $res_id = array();
    //echo json_decode($_POST["seat"]);

    for($i=0; $i < count($seat); $i++){
      $refCode = gRS();
      $seat_s = $seat[$i];

      $sql = "INSERT INTO popcorn_ticket (uid, fid, refCode, seat, t, type, state, ts)
      VALUES ('$uid', '$fid', '$refCode', '$seat_s', '$t', '$type', '$state', '$ts')";

      $updateSqlRun = mysqli_query($link, $sql);
      if($updateSqlRun){

        $query = "SELECT id FROM popcorn_ticket WHERE refCode = '".$refCode."'";
        $queryrun = mysqli_query($link, $query);
        $queryRes = mysqli_fetch_array($queryrun);
        array_push($res_id, $queryRes[0]);
      }

      if($i == count($seat) - 1){
        //echo '<pre>'; print_r($res_id); echo '</pre>';
      }
    }

    for($c=0; $c<count($res_id); $c++){
      if($c==0){
        $ret = $res_id[$c];
      }else{
        $ret = $ret.",".$res_id[$c];
      }

    }

    echo $ret;
  }



  function gRS($length = 9){
      $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters);
      $randomString = '';
      for ($i = 0; $i < $length; $i++) {
          $randomString .= $characters[rand(0, $charactersLength - 1)];
      }
      return $randomString;
  }

?>
