function addHandler(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}else{
		element["on"+type] = handler;
	}
}
function check(value){
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
var btn = document.getElementById("btn");
var span = document.getElementById("tip");
addHandler(btn,"click",function(){
	var input = document.getElementById("text");
	var val = input.value;
	if(val==""){
		input.className = "error";
		span.className = "error";
		span.textContent = "姓名不能为空";
	}
	else if(check(val)){
		input.className = "right";
		span.className = "right";
		span.textContent = "名字格式正确";
	}
	else{
		input.className = "error";
		span.className = "error";
		span.textContent = "名字长度不正确";
	}
});