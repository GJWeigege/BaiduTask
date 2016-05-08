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
        label: '',              //标签名字
        type: '',               //表单类型
        isRequire: true,        //是否必需
        inputType: '',         	//input表单的种类
        rulesType: '',			//规则的类型
        minlen: 0,          	//text之类文本的最小长度限制
        maxlen: 1,          	//text之类文本的最大长度限制
        item: [],               //radio的选项
        id: 0,                  //表单的id，初始值为0
        validator: function () {
        } //表单的验证规则
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
	function showOther(id){
		var rules = doc.getElementById("rules"),textlen = doc.getElementById("long"),leninner="",textinner = "";
		switch(id){
			case "typeLabel1":{
				textinner += "数据类型：<label><input type='radio' name='rules' value='txt' checked>文本</label><label><input type='radio' name='rules' value='num'>数字</label><label><input type='radio' name='rules' value='tel'>手机</label><label><input type='radio' name='rules' value='mail'>邮箱</label><label><input type='radio' name='rules' value='psw'>密码</label>";
				leninner += "字符长度：<input id='minlen' type='number' name='minlen'> — <input id='maxlen' name='maxlen' type='number'>";
				rules.innerHTML = textinner;
				textlen.innerHTML = leninner;
				break;
			}
			case "typeLabel5":{
				leninner += "字符长度：<input id='minlen' type='number' name='minlen'> — <input id='maxlen' name='maxlen' type='number'>";
				textlen.innerHTML = leninner;
				rules.innerHTML = textinner;
				break;
			}
			case "typeLabel2":
			case "typeLabel3":
			case "typeLabel4":{
				rules.innerHTML = "<label>输入选项内容：<input name='inputRule' type='text' id='inputRule' placeholder='以逗号、空格、分号提交'></label><br><div id='tagQueue'></div>";
				textlen.innerHTML = leninner;
				item = addTag();
				console.log(item);
				break;
			}
		}
	}
	function addTag(){
		var tagData = [];
		var inputRule = document.getElementById("inputRule");
		addHandler(inputRule,"keyup",function(e){
			var reg = /[,，;；\s\n、]/;
			var val = inputRule.value;
			if(e.keyCode == 13 || reg.test(val)){
				if(!isRepeat(val,tagData)){
				var myval = val.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/)[0];
					tagData.push(myval);
				}
				if(tagData.length == 11){
					tagData.shift();
				}
				inputRule.value = "";
				render(tagData,div);
			}
		});
		function del(){}
		function isRepeat(value,myArray){
			//判断是否重复，重复的话返回true，否则返回false
				var reg = /[0-9a-zA-Z\u4e00-\u9fa5]+/;
				var inputval = value.match(reg);
				if(inputval!==null){
					return myArray.some(function(item,index,array){
						return inputval==item;
					});
				}
				else{
					return true;
				}
		}
		var div = document.getElementById("tagQueue");
		addHandler(div,"mouseover",function(event){
			var e = window.event || event;
			var target = e.target || e.srcElement;
			if(target.tagName.toLowerCase()=="p"){
				target.innerHTML = "点击删除"+target.innerHTML;
			}
		});
		addHandler(div,"click",function(event){
			var e = window.event || event;
			var target = e.target || e.srcElement;
			if(target.tagName.toLowerCase()=="p"){
				var index = Array.prototype.indexOf.call(document.getElementsByTagName("p"),target);
				tagData.splice(index,1);
				render(tagData,div);
			}
		});
		addHandler(div,"mouseout",function(event){
			var e = window.event || event;
			var target = e.target || e.srcElement;
			if(target.tagName.toLowerCase()=="p"){
				var index = Array.prototype.indexOf.call(document.getElementsByTagName("p"),target);
				target.innerHTML = tagData[index];
			}
		});
		function render(q,ele){
			var inner = "";
			q.forEach(function(item,index,array){
				inner = inner+"<p>"+item+"</p>";
			});
			ele.innerHTML = inner;
		}
	}
	function checkedType(id){
		switch(id){
			case "typeLabel1":{
				data.label = "input";
				data.type = "text";
				showOther(id);
				break;
			}
			case "typeLabel2":{
				data.label = "input";
				data.type = "radio";
				showOther(id);
				break;
			}
			case "typeLabel3":{
				data.label = "input";
				data.type = "check";
				showOther(id);
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
				showOther(id);
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
		if(target.tagName.toLowerCase() == "label" || target.parentNode.tagName.toLowerCase() == "label"){
			checkedType(target.id || target.parentNode.id);
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
		// dataQueue.push(data);
		// console.log(target.id);
		addForm();
		// console.log(form);
	});
	function addForm(){
		var form = doc.forms["frmAdd"],
		textName = form["textName"],
		isRequire = form["isRequire"],
		rules = form["rules"],
		minlen = form["minlen"],
		maxlen = form["maxlen"],
		type = doc.forms["frmType"];
		for (var i = isRequire.length - 1; i >= 0; i--) {
			if(isRequire[i].checked == true && isRequire[i].value =="require"){
				data.isRequire = true;
			}
		}
		for (var i = type.length - 1; i >= 0; i--) {
			if(type[i].checked){
				if(textName.value==""){
					alert("标签名称还没输入！");
					return false;
				}
				else{
					data.label = textName.value;
				}
				// console.log(type[i].value);
				var typeVal = type[i].value;
				switch(typeVal){
					case "text":{
						data.type = "input";
						data.inputType = "text";
						if(rules!=undefined){
							for (var i = rules.length - 1; i >= 0; i--) {
								var rulesVal = rules[i];
								switch(rulesVal.value){
									case "txt":{
										data.rulesType = "txt";
										break;
									}
									case "num":{
										data.rulesType = "num";
										break;
									}
									case "tel":{
										data.rulesType = "tel";
										break;
									}
									case "mail":{
										data.rulesType = "mail";
										break;
									}
									case "psw":{
										data.rulesType = "psw";
										break;
									}
								}
							};
						}
						if(parseInt(minlen.value) > parseInt(maxlen.value)){
							alert("长度参数不正确");
							return false;
						}
						else{
							data.minlen = parseInt(minlen.value);
							data.maxlen = parseInt(maxlen.value);
						}
						data.id=data.id++;
						break;
					}
					case "radio":{
						var tagQueueVal = doc.getElementById("tagQueue").childNodes;
						data.type = "input";
						data.inputType = "radio";
						// if()
						if(tagQueueVal.length == 0){
							alert("选项内容尚未添加！");
							return false;
						}
						else{
							for (var i = tagQueueVal.length - 1; i >= 0; i--) {
								// console.log(tagQueueVal[i].innerText);
								data.item.push(tagQueueVal[i].innerText);
							};
						}
						// console.log(data.item);
						data.id=data.id++;
						break;
					}
					case "check":{
						var tagQueueVal = doc.getElementById("tagQueue").childNodes;
						data.type = "input";
						data.inputType = "check";
						if(tagQueueVal.length == 0){
							alert("选项内容尚未添加！");
							return false;
						}
						else{
							for (var i = tagQueueVal.length - 1; i >= 0; i--) {
								// console.log(tagQueueVal[i].innerText);
								data.item.push(tagQueueVal[i].innerText);
							};
						}
						data.id=data.id++;
						break;
					}
					case "select":{
						var tagQueueVal = doc.getElementById("tagQueue").childNodes;
						data.type = "select";
						data.inputType = "select";
						if(tagQueueVal.length == 0){
							alert("选项内容尚未添加！");
							return false;
						}
						else{
							for (var i = tagQueueVal.length - 1; i >= 0; i--) {
								// console.log(tagQueueVal[i].innerText);
								data.item.push(tagQueueVal[i].innerText);
							};
						}
						data.id=data.id++;
						break;
					}
					case "textarea":{
						data.type = "textarea";
						data.inputType = "textarea";
						if(parseInt(minlen.value) > parseInt(maxlen.value)){
							alert("长度参数不正确");
							return false;
						}
						else{
							data.minlen = minlen;
							data.maxlen = maxlen;
						}
						data.id=data.id++;
						break;
					}
				}
			}
		};
		
		console.log(data);
	}
}());