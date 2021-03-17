<?php

header("Access-Control-Allow-Origin: *");
/////////////////////////////数据库连接////////////////////
$servername = " ";
$username = " ";
$password = " ";
$conn = new mysqli($servername, $username, $password);
$conn->set_charset('utf8');
if ($conn->connect_error) {
   // die("数据库连接失败: " . $conn->connect_error);
	die("{ \"err\":\"100\" }");//数据库错误
}
$privatePs="1106";
$name = $_POST['name'];
$phone = $_POST['phone'];
$detail = $_POST['detail'];
$address = $_POST['address'];
$inputer = $_POST['input'];

$privatemsg='0';
$tempstr=substr($name,-4);
if($tempstr==$privatePs){
	$name = substr($name,0,strlen($name)-4);
	$privatemsg='1';
}
	
$sql = "insert into baishitong.telephone (name,phone,detail,address,inputer,privatemsg) values (?,?,?,?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssssss',$name,$phone,$detail,$address,$inputer,$privatemsg );
	
if($stmt->execute()){
	echo "{ \"err\":\"0\" }";//正常
}else{
	echo "{ \"err\":\"1\" }";//执行失败
}


$conn->close();
?>
