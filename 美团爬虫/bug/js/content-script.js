name="";
phone="";
address="";
function getDSPContent(){
	try {
		 
		var x = document.getElementsByClassName("name");
		name=x[0].innerText.replace(/食品安全档案/,"");
		name=name.replace(/\n/g,"");
		name=name.replace(/\"/g,"");
	
	  console.log(name);
	  x = document.getElementsByClassName("address");
	  d = x[0].children;
	  address=d[0].innerText.replace(/地址：/,"");
	  address=address.replace(/\n/g,"");
		address=address.replace(/\"/g,"");
		if(address==null) address="";		
		if(address=="") address="";
		console.log(address);
	  
	  phone=d[1].innerText.replace(/电话：/,"");
	  phone=phone.replace(/\n/g,"");
		phone=phone.replace(/\"/g,"");
		if(phone==null) phone="";		
		if(phone=="") phone="";
		console.log(phone);
		
 
	}catch{
		
		parent.location.reload()
	}		
	
}

function  selfBackMsg(){
	  getDSPContent();	 
	  //alert( name+":"+phone+":"+address); 
		chrome.runtime.sendMessage({name:name,phone:phone,address:address}, function(response) {	    
	  });	
	
}	
setTimeout(function () {selfBackMsg()},1000)

 
