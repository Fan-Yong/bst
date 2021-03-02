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
    	  
    	  icr=isCanReply(obj);
        console.log("icr:"+icr.type);
        
        if(icr.type==0) {
        	help(obj) ;
        }
        if(icr.type==1) {
        	getmsg(obj,icr.msg) 
        }
        
        if(icr.type==2) {
        	setmsg(obj,icr.msg) 
        }
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
	

function help(obj){	
	reply(obj,"查询电话方法:\n输入 \"电话＋空格＋关键字1＋空格＋关键字2....\"\n录入电话方法:\n输入 \"名称＋空格＋电话＋空格＋备注(可以不加备注)\"");	
}	



function getmsg(obj,query){	
	console.log(query);	
	var url="http://www.datun.com.cn/bst/getphone.php";
	
	request.post({url:url, form: {'query':query}}, function(error, response, body) {
		if (!error &&  response.statusCode == 200) {
			
			re = JSON.parse(body);
			if(re.err=='0')
				reply(obj,re.msg);
			return;	
		   //console.log(body) // 请求成功的处理逻辑  
		}
	})
}


function setmsg(obj,msg){	
	console.log(JSON.stringify(msg));	
	 
	var url="http://www.datun.com.cn/bst/setphone.php";
	
	request.post({url:url, form:  msg }, function(error, response, body) {
		if (!error &&  response.statusCode == 200) {
			
			re = JSON.parse(body);
			if(re.err=='0'){
				reply(obj,"录入成功");
				return;
			}	
			if(re.err=='1'){
				reply(obj,"录入失败");
				return;
			}					 
				reply(obj,"数据库错误");		
			return;	
		   //console.log(body) // 请求成功的处理逻辑  
		}
	})
}



//回复微信用户消息

function reply(obj,rmsg){ 
	//console.log("reply................"); 

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
	if(obj.type==99999) return {"type":-1};
	
	//if((obj.final_from_name).indexOf("元气")>-1 && obj.type==100) 		return true;	
	//if((obj.from_name).indexOf("老队友")>-1  )  return true;	
	
	if(obj.msg=="help"){
		return {"type":0};
	}		
	//console.log(obj.msg)
	let a=obj.msg.split(" ");		 
	
	if(a.length>=2 && a.length<4){
			if(a[0]=="电话"){ 
					a.shift();
					let query=a.join("%");
					if (obj.msg.length<3) return {"type":-2};
					return {"type":1,"msg":query};
			}	else{
					if(!checkTel(a[1])) return {"type":-2};
				  if(a.length==2){
				  	a[2]="";//备注
				  }	 
					return {"type":2,"msg":{"name":a[0],"phone":a[1],"detail":a[2],"input":obj.final_from_name}};
			}			
	}	
	
	 
	return {"type":-2};
	
}
function  checkTel(str) {
    var  re = /1(\d|\s){10}/;
    if (re.test(str)) {
        return true;
    }  
    
    
    re = /\d{7,8}/;
    if (re.test(str)) {
        return true;
    }  
    return false;
    
}