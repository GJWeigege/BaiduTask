(function(){
	// function Data(data){
	// 	this.label = data.label;
	// 	this.type = data.type;
	// 	this.rules = data.rules;
	// 	this.success = data.success;
	// 	this.fail = data.fail;
	// }
	// data.prototype.validator = function(first_argument) {
	// 	// body...
	// };
	// data.prototype.init = function(first_argument) {
	// 	// body...
	// };
	var data = {
        label: '名称',                    	// 表单标签
        type: 'input',                   	// 表单类型
        validator: function(){				// 表单验证规则
        	ds
        },
        init: function(){
        	df
        },
        rules: '必填，长度为4-16个字符',    // 填写规则提示
        success: '格式正确',              	// 验证通过提示
        fail: '名称不能为空'               	// 验证失败提示
	},dataQueue=[];
	function addHandler(element,type,handler){
		if (window.addEventListener) {
			element.addEventListener(type,handler,false);
		}
		else if(window.attachEvent){
			element.attachEvent("on"+type,handler);
		}
		else{
			element["on"+type] = handler;
		}
	};
	function checkedType(id){
		switch(id){
			case "typeLabel1":{
				data.label = "input";
				data.type = "text";
				break;
			}
			case "typeLabel2":{
				data.label = "input";
				data.type = "radio";
				break;
			}
			case "typeLabel3":{
				data.label = "input";
				data.type = "check";
				break;
			}
			case "typeLabel4":{
				data.label = "select";
				data.type = "select";
				showOther(id);
				break;
			}
			case "typeLabel5":{
				data.label = "textarea";
				data.type = "textfield";
				break;
			}
		}
		console.log(id);
		console.log(data);
	}
	var doc = document,
	myForm = doc.getElementById("myForm"),
	checkType = doc.getElementById("checkType"),
	addOther = doc.getElementById("addOther"),
	add = doc.getElementById("add");
	addHandler(myForm,"click",function(event){
		var e = event || window.event,
		target = event.target || event.srcElement;
		// console.log(target.id);
	});
	addHandler(checkType,"click",function(event){
		var e = event || window.event,
		target = event.target || event.srcElement;
		if(target.tagName.toLowerCase() == "label"){
			checkedType(target.id);
		}
		// console.log(target.id);
	});
	addHandler(addOther,"click",function(event){
		var e = event || window.event,
		target = event.target || event.srcElement;
		console.log(target.id);
	});
	addHandler(add,"click",function(){
		// var e = event || window.event,
		// target = event.target || event.srcElement;
		dataQueue.push(data);
		// console.log(target.id);
	});
}());