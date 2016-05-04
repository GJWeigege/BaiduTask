(function(){
	var date = {
        label: '名称',                    	// 表单标签
        type: 'input',                   	// 表单类型
        validator: function () {			// 表单验证规
        	ds
        },
        rules: '必填，长度为4-16个字符',    // 填写规则提示
        success: '格式正确',              	// 验证通过提示
        fail: '名称不能为空'               	// 验证失败提示
	},dateArray = [];
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
	var doc = document,
	myForm = doc.getElementById("myForm"),
	checkType = doc.getElementById("checkType"),
	addOther = doc.getElementById("addOther"),
	add = doc.getElementById("add");
	addHandler(myForm,"click",function(event){
		var e = event || window.event,
		target = event.target || event.srcElement;
		console.log(target.id);
	});
	addHandler(checkType,"click",function(event){
		var e = event || window.event,
		target = event.target || event.srcElement;
		console.log(target.id);
	});
	addHandler(addOther,"click",function(event){
		var e = event || window.event,
		target = event.target || event.srcElement;
		console.log(target.id);
	});
	addHandler(add,"click",function(event){
		var e = event || window.event,
		target = event.target || event.srcElement;
		console.log(target.id);
	});
}());