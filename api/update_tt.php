
<?php
/**
* Created by JIANFENG WU
* update to database
* Last update: 2017.05.04
*/
    //start session function

    include('./connect.php');
    include('../admin/services/security.php');
    //新增活动开始
    if(!empty($_POST)){
        
        $id = cleanStr($_POST['id']);
        $postType = $_POST['postType'];


        if($postType == 99){
            $update_sql="DELETE FROM popcorn_timetable WHERE id='$id'";
            $updateSqlRun = mysqli_query($link, $update_sql);
            if($updateSqlRun){
                //If success
                echo 'updateSuccessful';
            }

            exit();
        }

        //vars
        
        $date = $_POST['date'];
        $time = $_POST['time'];
        $type = $_POST['type'];
        $toMovieId = cleanStr($_POST['toMovieId']);
        $ts = time();

        if($postType == 0){
            //query line
            $update_sql="INSERT INTO popcorn_timetable (date, time, type, toMovieId, ts)
            VALUES ('$date', '$time','$type', '$toMovieId', '$ts')";
            echo "c";
        }
        if($postType == 1){
            
            $update_sql="UPDATE popcorn_timetable SET date='$date', time='$time', type='$type', toMovieId='$toMovieId', ts='$ts'
            WHERE id='$id'";
            echo $update_sql;
        }

        
        

        //start query order in database
        $updateSqlRun = mysqli_query($link, $update_sql);
        if($updateSqlRun){
        //If success
        echo 'updateSuccessful';
        }else{
            //If can not update
            echo mysqli_error($link);
            echo mysqli_connect_error();
            exit();
        }
    }
    //新增活动结束