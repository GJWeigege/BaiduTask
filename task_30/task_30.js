function addHandler(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}else{
		element["on"+type] = handler;
	}
}
function checkName(value){
	var len = 0;
	for(var i=0;i<value.length;i++){
		if(value.charCodeAt(i)>127 || value.charCodeAt(i)==94) {  
       		len += 2;  
     	}else{
       		len++;  
     	}
	}
	if(len<=16 && len>=4){
		return true;
	}
	else{
		return false;
	}
}
function addChild(target){
	var respan = target.parentNode.parentNode.getElementsByTagName("span");
	// console.log(span[0]!==undefined);
	var text = null;
	if(respan[0]!==undefined){
		respan[0].parentNode.removeChild(respan[0]);
	}
	span = document.createElement("span");
	switch(target.id){
		case "text-name":{
			text = document.createTextNode("必填，长度为4~16个字符");
			break;
		}
		case "password":{
			text = document.createTextNode("必填，长度为4~16个字母或数字");
			break;
		}
		case "passwordCheck":{
			text = document.createTextNode("必填，与上面的密码保持一致");
			break;
		}
		case "text-mail":{
			text = document.createTextNode("必填，长度为4~16个字母或数字");
			break;
		}
		case "text-tel":{
			text = document.createTextNode("必填，为11位数字");
			break;
		}
	}
	span.appendChild(text);
	target.parentNode.parentNode.appendChild(span);
}
function checkWarm(target){
	var respan = target.parentNode.parentNode.getElementsByTagName("span");
	// console.log(span[0]!==undefined);
	var text = null;
	if(respan[0]!==undefined){
		respan[0].parentNode.removeChild(respan[0]);
	}
	span = document.createElement("span");
	switch(target.id){
		case "text-name":{
			if(target.value==""){
				text = document.createTextNode("姓名不能为空");
				target.className = "error";
				span.className = "error";
			}
			else if(checkName(target.value)) {
				text = document.createTextNode("名字格式正确");
				target.className = "right";
				span.className = "right";
			}
			else{
				text = document.createTextNode("名字格式不正确");
				target.className = "error";
				span.className = "error";
			}
			break;
		}
		case "password":{
			if(target.value==""){
				text = document.createTextNode("密码不能为空");
				target.className = "error";
				span.className = "error";
			}
			else if(/^[0-9a-zA-Z]{4,16}$/.test(target.value)) {
				text = document.createTextNode("密码可用");
				target.className = "right";
				span.className = "right";
			}
			else{
				text = document.createTextNode("密码格式不正确");
				target.className = "error";
				span.className = "error";
			}
			break;
		}
		case "passwordCheck":{
			var psw = document.getElementById("password").value;
			if(target.value==""){
				text = document.createTextNode("验证密码不能为空");
				target.className = "error";
				span.className = "error";
			}
			else if(target.value===psw) {
				text = document.createTextNode("密码输入一致");
				target.className = "right";
				span.className = "right";
			}
			else{
				text = document.createTextNode("密码输入不一致");
				target.className = "error";
				span.className = "error";
			}
			break;
		}
		case "text-mail":{
			if(target.value==""){
				text = document.createTextNode("邮箱不能为空");
				target.className = "error";
				span.className = "error";
			}
			else if(/^[\w\.\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9\-]{2,4}$/.test(target.value)) {
				text = document.createTextNode("邮箱格式正确");
				target.className = "right";
				span.className = "right";
			}
			else{
				text = document.createTextNode("邮箱格式不正确");
				target.className = "error";
				span.className = "error";
			}
			break;
		}
		case "text-tel":{
			if(target.value==""){
				text = document.createTextNode("手机不能为空");
				target.className = "error";
				span.className = "error";
			}
			else if(/^[0-9]{11}$/.test(target.value)) {
				text = document.createTextNode("手机格式正确");
				target.className = "right";
				span.className = "right";
			}
			else{
				text = document.createTextNode("手机格式不正确");
				target.className = "error";
				span.className = "error";
			}
			break;
		}
	}
	span.appendChild(text);
	target.parentNode.parentNode.appendChild(span);
}
var inputs = document.getElementsByTagName("input");
// var span = document.getElementById("tip");
for(var i=0;i<inputs.length;i++){
	// console.log(inputs[i]);
	addHandler(inputs[i],"focus",function(event){
		var e = event || window.event;
		var target = e.target || e.srcElement;
		addChild(target);
	});
	addHandler(inputs[i],"blur",function(event){
		var e =event || window.event;
		var target = e.target || e.srcElement;
		checkWarm(target);
	});
}
var btn = document.getElementById("btn");
addHandler(btn,"click",function(){
	var rig = document.querySelectorAll(".right");
	console.log(rig.length);
	if(rig.length == 10){
		alert("提交成功");
	}
	else{
		alert("提交失败");
	}
});