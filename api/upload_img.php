

<?php

/**
* Created by JIANFENG WU
* upload
* Date:2017.02.20
*/

		
	//If triger the uplaad
			if($_FILES["fileToUpload"]["name"] != null){
				$time = time();
				$target_dir = "../upload/img/";
                $fake_dir = "/upload/img/";
                $basicName = basename($_FILES["fileToUpload"]["name"]);
                $imageFileType = pathinfo($basicName,PATHINFO_EXTENSION);
				$fileName = $time.'_'.rand(1000,9999).'.'.$imageFileType;
				$upAddress = $target_dir.$fileName;
				$uploadOk = 1;
				//$imageFileType = pathinfo($upAddress,PATHINFO_EXTENSION);
				//File type checker
							//Check image file type
							if($imageFileType != "jpg" && $imageFileType != "JPG" && $imageFileType != "png" && $imageFileType != "PNG" && $imageFileType != "jpeg" && $imageFileType != "JPEG" && $imageFileType != "gif" ) {
							    
								exit();
							    $uploadOk = 0;
							}
							// Check image is image
							$check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
							   	if($check !== false) {
							        
							        $uploadOk = 1;
							    } else {
							        
							        $uploadOk = 0;
							}
							// Check file size
							if ($_FILES["fileToUpload"]["size"] > 9000000) {
							    
							    $uploadOk = 0;
							}
				// Check if file already exists
				/*if (file_exists($upAddress)) {
				    $uploadOk = 0;
				}*/
				// Check if $uploadOk is set to 0 by an error
				if ($uploadOk == 0) {
				    
					exit();
				}else{
					    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $upAddress)){
                  //For Debug only
					        
									//var tf = Output URL. Multiple File Use ';' for Separate
									if(isset($tf)){
										$tf = $tf.";".$fake_dir.$fileName;
									}else{
										$tf = $fake_dir.$fileName;
										echo $tf;
									}
					    }else{
					        
							exit();
					    }
				}
			}
			

?>
