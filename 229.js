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
    	  	if(decodeURIComponent(data).indexOf("nickname=涿州查号台,wxid=wxid_dm9fvc38kmpj22")>0){
    	  		obj.msg="help";
    	  	}	    	  	  	 
    	  	
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
	reply(obj,"☆☆感谢使用☆☆\n\n【查询电话方法】\n \"电话＋空格＋要查的内容1＋空格＋要查的内容2.....\"\n※※※※※※※※※※\n例如这样可查麦当劳电话：\n电话 麦当劳\n\n【录入电话方法】\n \"名称＋句号＋电话＋句号＋备注＋句号＋地址\"\n(备注和地址是可选项)\n※※※※※※※※※※\n例如这样可录入麦当劳电话:\n麦当劳。123456789");	
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
	/*console.log(obj.msg);
	console.log(obj.msg.indexOf("nickname=涿州查号台,wxid=wxid_dm9fvc38kmpj22"));
	if(obj.msg.indexOf("nickname=涿州查号台,wxid=wxid_dm9fvc38kmpj22")>=0){
		return {"type":0};
	}*/
	if(/select|delete|update/.test(obj.msg)) return {"type":-100};//sql注入
			
	//console.log(obj.msg)
	//查找信息
	let a=obj.msg.split(" ");		
	if(a.length>=2 ){
			if(a[0]=="电话"){ 
					a.shift();
					for(let j=0;j<a.length;j++){
						a[j]=a[j].replace(/电话/g,'');
					}	
					let query=a.join("%");
					if (query.length<2) {
						return {"type":-2};
					}	
					return {"type":1,"msg":query};
			}	
	}
		
	a=obj.msg.split("。");	
	if(a.length>=2 ){
		let name=a[0];
		let phone=a[1];
		if(!checkTel(phone)) return {"type":-3};
		let detail="";
		if(a.length>2) detail=a[2];
		let address="";
		if(a.length>3) address=a[3];
		return {"type":2,"msg":{"name":name,"phone":phone,"detail":detail,"address":address,"input":obj.final_from_name}};
		console.log({"name":name,"phone":phone,"detail":detail,"address":address,"input":obj.final_from_name}.stringify());
	}		 
	return {"type":-4};
	
}
function  checkTel(str) {
	  console.log(str);
    
    let matches = str.match(/\d+/g);
    let m="";
    try{
    for(let i=0;i<matches.length;i++)
		{
		     m=m+""+matches[i];
		 
		}
		if(m.length>=5) return true;
		return false;
	}catch(e){
		return false;
	}	
    
}
function getdetail(detail){
	detail=detail.replace(/（/g, "(")
	detail=detail.replace(/）/g, ")")
  let matches=detail.match(/\([\s\S]*?\)/);
  if(matches==null) return "";
  return matches[0];
	
} 