
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
            $update_sql="DELETE FROM popcorn_slider WHERE id='$id'";
            $updateSqlRun = mysqli_query($link, $update_sql);
            if($updateSqlRun){
                //If success
                echo 'updateSuccessful';
            }

            exit();
        }

        //vars
        
        $name = cleanStr($_POST['name']);
        $s_img = $_POST['s_img'];
        $toMovieId = cleanStr($_POST['toMovieId']);
        $od = cleanStr($_POST['s_od']);

        if($postType == 0){
            //query line
            $update_sql="INSERT INTO popcorn_slider (name, img, toMovieId, od)
            VALUES ('$name', '$s_img','$toMovieId', '$od')";
        }
        if($postType == 1){
            
            $update_sql="UPDATE popcorn_slider SET name='$name', img='$s_img', toMovieId='$toMovieId', od='$od'
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