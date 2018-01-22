
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
            $update_sql="DELETE FROM popcorn_film WHERE id='$id'";
            $updateSqlRun = mysqli_query($link, $update_sql);
            if($updateSqlRun){
                //If success
                echo 'updateSuccessful';
            }

            exit();
        }

        //vars
        
        $name = cleanStr($_POST['name']);
        $cate = cleanStr($_POST['cate']);
        $brief = cleanStr($_POST['brief']);
        $rDate = cleanStr($_POST['rDate']);
        $runningTime = cleanStr($_POST['runningTime']);
        $director = cleanStr($_POST['director']);
        $cast = cleanStr($_POST['cast']);
        $rate = cleanStr($_POST['rate']);
        $posterImg = $_POST['posterImg'];
        $previewImg = $_POST['previewImg'];
        $status = cleanStr($_POST['status']);
        $ts = time();

        if($postType == 0){
            //query line
            $update_sql="INSERT INTO popcorn_film (name, cate, brief, rDate, runningTime, director, cast, rate, posterImg, previewImg, status, ts)
            VALUES ('$name', '$cate','$brief', '$rDate', '$runningTime','$director', '$cast', '$rate', '$posterImg', '$previewImg', '$status', '$ts')";
        }
        if($postType == 1){
            
            $update_sql="UPDATE popcorn_film SET name='$name', cate='$cate', brief='$brief', rDate='$rDate', runningTime='$runningTime', director='$director', cast='$cast', rate='$rate', posterImg='$posterImg', previewImg='$previewImg', status='$status', ts='$ts'
            WHERE id='$id'";
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