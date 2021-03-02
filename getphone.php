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


		$servername = "localhost";
		$username = " ";
		$password = " ";
		$conn = new mysqli($servername, $username, $password);
		$conn->set_charset('utf8');
		if ($conn->connect_error) {
    	//die("database error" . $conn->connect_error);
			die("{ \"err\":\"100\" }");//数据库错误
		}
		$query="%$query%";
		//echo $query;
		
		$sql="SELECT name,detail,phone FROM baishitong.telephone where name  like  ?  LIMIT 5";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param('s',$query);
		$stmt->execute();
		$reply="";
		$result = $stmt->get_result();
		while($row = $result->fetch_assoc()) {
  		$name=$row["name"];
  		$phone=$row["phone"];
			$detail=$row["detail"];
			//echo $detail;
			if($detail==''){
  			$reply=$reply.$name.":".$phone."\\n";
			}else{
				$reply=$reply.$name."(".$detail."):".$phone."\\n";
			}
		}
		if($reply!=''){
			$reply=substr($reply,0,-2);
			echo "{ \"err\":\"0\", \"msg\":\"".$reply."\"}";
		}else{
			echo "{ \"err\":\"1\" }";//查无此人
		}




?>
