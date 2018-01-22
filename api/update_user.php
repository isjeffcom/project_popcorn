
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
            $update_sql="DELETE FROM popcorn_user WHERE id='$id'";
            $updateSqlRun = mysqli_query($link, $update_sql);
            if($updateSqlRun){
                //If success
                echo 'updateSuccessful';
            }

            exit();
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