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


		$servername = "";
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
			$query=$query." CONCAT(name,detail) like '".$temp_str."' ";
			if($i<$num-1){
				$query=$query." and ";
			}

		}
		//echo $query;
		
		$sql="SELECT  name,detail,phone,inputer FROM baishitong.telephone where ".$query."  LIMIT 5";
		$stmt = $conn->prepare($sql);
	  //$stmt->bind_param('s',$query);
		$stmt->execute();
		$reply="";
		$result = $stmt->get_result();
		while($row = $result->fetch_assoc()) {
  		$name=$row["name"];
  		$phone=$row["phone"];
			$detail=$row["detail"];
			$inputer=$row["inputer"];
			//echo $detail;
			if($detail==''){
  			$reply=$reply.$name.":".$phone."\\n";
			}else{
				$reply=$reply.$name."(".$detail."):".$phone;
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
