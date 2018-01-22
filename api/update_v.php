
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
            $update_sql="DELETE FROM popcorn_video WHERE id='$id'";
            $updateSqlRun = mysqli_query($link, $update_sql);
            if($updateSqlRun){
                //If success
                echo 'updateSuccessful';
            }

            exit();
        }

        //vars
        
        $name = cleanStr($_POST['name']);
        $url = $_POST['v_url'];
        $toMovieId = cleanStr($_POST['toMovieId']);
        $pImgUrl = $_POST['previewImg'];
        $status = cleanStr($_POST['status']);
        $ts = time();

        if($postType == 0){
            //query line
            $update_sql="INSERT INTO popcorn_video (name, url, toMovieId, pImgUrl, status, ts)
            VALUES ('$name', '$url','$toMovieId', '$pImgUrl', '$status', '$ts')";
        }
        if($postType == 1){
            
            $update_sql="UPDATE popcorn_video SET name='$name', url='$url', toMovieId='$toMovieId', pImgUrl='$pImgUrl', status='$status', ts='$ts'
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