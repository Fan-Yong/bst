manifest.json

"js": ["js/jquery.min.js","js/content-script.js"]:
��  ֻҪ�� https://www.dashengpan.com/*ҳ�棬�ͻ�Ƕ�룺"js/jquery.min.js","js/content-script.js"

background
���� "scripts": ["js/jquery.min.js","js/background.js"] ,background.js��ֱ��ʹ�� jquery


content-script.js Ƕ��ҳ�棬��ȡ������ݣ�ͨ����Ϣ������̨����̨��ȡ��ajax����php��Ȼ��������ݿ�

���⣺
tab ����Ϣ��
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	is_reg=request.is_reg;
	speeches=request.speeches;
	sendCSWXMessage(request.msg);
	//console.log(request.msg);
}	)
background ����Ϣ��
chrome.tabs.sendMessage(chat_id,{'msg': request.curcon,'talker':request.talker,'newmsg':request.newmsg,'is_reg':is_reg,'speeches':speeches},  function(response) { });

