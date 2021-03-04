manifest.json

"js": ["js/jquery.min.js","js/content-script.js"]:
在  只要打开 https://www.dashengpan.com/*页面，就会嵌入："js/jquery.min.js","js/content-script.js"

background
包含 "scripts": ["js/jquery.min.js","js/background.js"] ,background.js可直接使用 jquery


content-script.js 嵌入页面，读取相关内容，通过消息传到后台，后台获取后，ajax传到php，然后记入数据库

另外：
tab 收消息：
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	is_reg=request.is_reg;
	speeches=request.speeches;
	sendCSWXMessage(request.msg);
	//console.log(request.msg);
}	)
background 发消息：
chrome.tabs.sendMessage(chat_id,{'msg': request.curcon,'talker':request.talker,'newmsg':request.newmsg,'is_reg':is_reg,'speeches':speeches},  function(response) { });

