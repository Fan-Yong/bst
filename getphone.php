<?php
		$query="";
		if (isset($_GET['query'])){
			$query=$_GET['query'];
		}
		if (isset($_POST['query'])){
      $query=$_POST['query'];
    }
		
		if($query==""){
			die("{ \"err\":\"101\" }");//参数为空
		}


		$servername = " ";
		$username = " ";
		$password = " ";
		$conn = new mysqli($servername, $username, $password);
		$conn->set_charset('utf8');
		if ($conn->connect_error) {
    	//die("database error" . $conn->connect_error);
			die("{ \"err\":\"100\" }");//数据库错误
		}
		
		$q=explode('%', $query);
		$num = count($q);
		$query="";
		for($i=0;$i<$num;$i++){
			$temp_str="%".implode("%", preg_split("//u", $q[$i], -1, PREG_SPLIT_NO_EMPTY))."%";
			$query=$query." CONCAT(name,detail,address) like '".$temp_str."' ";
			if($i<$num-1){
				$query=$query." and ";
			}

		}
		//echo $query;
		
		$sql="SELECT  name,detail,phone,inputer,address FROM baishitong.telephone where ".$query."  LIMIT 10";
		//echo $sql;
		$stmt = $conn->prepare($sql);
	  //$stmt->bind_param('s',$query);
		$stmt->execute();
		$reply="";
		$result = $stmt->get_result();
		while($row = $result->fetch_assoc()) {
  		$name=$row["name"];
			$name = str_replace(array("\r\n", "\r", "\n"), "", $name);
  		$phone=$row["phone"];
			$phone = str_replace(array("\r\n", "\r", "\n"), "", $phone);
			$detail=$row["detail"];
			$detail=str_replace(array("\r\n", "\r", "\n"), "", $detail);
			$address=$row["address"];
			$address=str_replace(array("\r\n", "\r", "\n"), "", $address);
			$inputer=$row["inputer"];
			$inputer=str_replace(array("\r\n", "\r", "\n"), "", $inputer);
			if($phone==""){
				$phone=$detail;
				$detail="";

			}

			//echo $detail;
			$reply=$reply."【".$name;
			if($detail!=''){
  			$reply=$reply."(".$detail.")";
			}
			$reply=$reply."】\\n";
			$reply=$reply.$phone;
			if($address!=''){
				$reply=$reply."\\n地址：".$address;
			}
			
			if($inputer!=''){
				$reply=$reply."(信息提供:".$inputer.")";
			}
			$reply=$reply."\\n\\n";
		}
		if($reply!=''){
			$reply=substr($reply,0,-4);
			echo "{ \"err\":\"0\", \"msg\":\"".$reply."\"}";
		}else{
			echo "{ \"err\":\"1\" }";//查无此人
		}




?>
