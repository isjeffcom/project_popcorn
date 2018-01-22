<!--CREATE BY WU JIANFENG IN APRIL 11 2016-->

<?php
/**
* Created by JIANFENG WU
* login
* Date:2017.02.20
*/

 //Start SESSION Function


 session_start();
 include('../../api/connect.php');

 if(isset($_POST["submit"]) && $_POST["submit"] == "LOGIN"){
    $email = $_POST["email"]; 
    $acode = $_POST["acode"];

	if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		echo " <script>alert('Error Enter'); history.go(-1)</script> ";
		exit();
    }
    
    if(!ereg("^[0-9a-zA-Z\_]*$",$acode)){
		echo " <script>alert('Error Enter'); history.go(-1)</script> ";
		exit();
	}

	 if($email == ""){
		 echo " <script>alert('Please enter your Email); history.go(-1)</script> ";
	 }else{
		 //Find the username and return a number
		 include('../../api/connect.php');
		 $psw = md5($acode); 
		 $psw = strtoupper($psw);
		 $sql = "SELECT psw, type FROM popcorn_user where email = '$email'";
		 $sqlrun = mysqli_query($link,$sql);
		 $num = mysqli_num_rows($sqlrun);

		 if($num > 0){
            $row = mysqli_fetch_array($sqlrun);
            $type = $row[1];
			//write username id and type to SESSION
            
            if($type = 99){
				$_SESSION['pass'] = $email;
				$_SESSION['type'] = $row[1];
                echo "<script>window.location.href='../main.html';</script>";
            }else{
                echo "<script>alert('Not been authorized'); history.go(-1)</script>";
            }
			

			 
		 //If user does not exist
		 }else{
			mysqli_error($link);
			 echo"<script>alert('User does not exist or wrong password');history.go(-1);</script>";
		 }

	 	}
 	}

	if($_GET['action'] == "logout"){
		
		unset($_SESSION['pass']);
		unset($_SESSION['type']);
		session_destroy();
		//jump to login page
		echo "<script>window.location.href='../index.html';</script>";
	}





?>
</html>
