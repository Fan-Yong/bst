var http=require('http');
const hostname = '127.0.0.1';
const port = 80;



//request 模块需要另外安装
var request = require('request');

const server = http.createServer((req, res) => {
    let data = []
    req.on('data', chunk => {
        data.push(chunk)  // 将接收到的数据暂时保存起来
    })
    req.on('end', () => {
    		 try{ 
    		 	
    	  	obj=getUrlVars(decodeURIComponent(data))  
    	  	//console.log(":::"+decodeURIComponent(data))	    	  	  	 
    	  	
    	  }catch(e){
    	  	obj={"type":99999}
    	  	 console.log('---------解析失败');
    	  }		
    	  
        
        if(isCanReply(obj)) {
        	getmsg_reply(obj) 
        }else{
       		//console.log("不符合回复条件")
        }	
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
	


function getmsg_reply(obj){	
	let a=obj.msg.split(" ");	
	a.shift();
	obj.msg=a.join("%");
	
	console.log(obj.msg);	
	var url="http://www.datun.com.cn/ ";
	
	request.post({url:url, form: {'query':obj.msg}}, function(error, response, body) {
		if (!error &&  response.statusCode == 200) {
			
			re = JSON.parse(body);
			if(re.err=='0')
				reply(obj,re.msg);
			return;	
		   //console.log(body) // 请求成功的处理逻辑  
		}
	}) 
				
		
}


//回复微信用户消息

function reply(obj,rmsg){ 
	console.log("reply................"); 

	var url="http://127.0.0.1:8073/send";	
	rmsg=encodeURI(rmsg);
	
	var requestData="{\"type\":100,\"msg\":\""+rmsg+"\",\"to_wxid\":\""+obj.from_wxid+"\",\"robot_wxid\":\""+obj.robot_wxid+"\"}";	

	request.post({url:url, form: requestData}, function(error, response, body) {
	  if (!error &&  response.statusCode == 200) {
	     console.log(body) // 请求成功的处理逻辑  
	  }
	})
}



function getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
    }
    return myJson;
}




//是否符合回复条件
function isCanReply(obj){
	// console.log(obj.final_from_name+"----------------")
	if(obj.type==99999) return false;
	
	//if((obj.final_from_name).indexOf("元气")>-1 && obj.type==100) 		return true;	
	//if((obj.from_name).indexOf("老队友")>-1  )  return true;	
	
	//console.log(obj.msg)
	let a=obj.msg.split(" ");
	if(a.length<2) 	 
		return false;
	if(a[0]!="电话") 
		return false;
	
	 
	return true;
	
}