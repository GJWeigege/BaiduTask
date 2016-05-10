(function(){
	function Data(data){
		this.label = data.label;
		this.type = data.type;
		this.inputType = data.inputType;
		this.isRequire = data.isRequire;
		this.rulesType = data.rulesType;
		this.minlen = data.minlen;
		this.maxlen = data.maxlen;
		this.item = [];
		this.id = data.id;
		if(data.item.length != 0){
			for (var i = data.item.length - 1; i >= 0; i--) {
				this.item[i] = data.item[i]
			};
		}
	}
	Data.prototype = {
		init: function(){
			var inner = doc.forms["formInit"].innerHTML;
			switch(this.inputType){
				case "text":{
					inner += "<label><span>"+this.label+"：</span><input type='"+this.rulesType+"' id='"+this.id+"'></label>";
					break;
				}
				case "radio":{
					inner += "<label><span>"+this.label+"：</span>";
					for (var i = data.item.length - 1; i >= 0; i--) {
						inner += "<label><input type='"+this.inputType+"' name='"+this.id+"' id='"+this.id+"'>"+data.item[i]+"</label>";
					};
					inner += "</label>";
					break;
				}
				case "checkbox":{
					inner += "<label><span>"+this.label+"：</span>";
					for (var i = data.item.length - 1; i >= 0; i--) {
						inner += "<label><input type='"+this.inputType+"' name='"+this.id+"' id='"+this.id+"'>"+data.item[i]+"</label>";
					};
					inner += "</label>";
					break;
				}
				case "select":{
					inner += "<label><span>"+this.label+"：</span><select id='"+this.id+"'>";
					for (var i = data.item.length - 1; i >= 0; i--) {
						inner += "<option>"+data.item[i]+"</option>";
					};
					inner += "</select></label>";
					break;
				}
				case "textarea":{
					inner += "<label><span>"+this.label+"：</span><textarea id='"+this.id+"' placeholder='请输入您要输入的内容~'></textarea></label>";
					break;
				}
			}
			console.log(inner);
			doc.forms["formInit"].innerHTML = inner;
		},
		// validator: function(){
		// 	var id= this.id,elem = doc.getElementById("0");
		// 	console.log(elem);
		// 	addHandler(elem,"click",function(){
		// 		console.log(elem);
		// 	});
		// },
		// isempty: function(type,id){
		// 	var val = doc.getElementById(id).value;
		// 	// switch
		// },
		// iserror: function(id){},
		// isRequire: function(id){}
	};
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
    },dataQueue=[];
	// data.prototype = {
	// 	validator: function(){
	// 		// if (this.) {};
	// 	}
	// };
	function addHandler(element,type,handler){
		//创建事件监听函数
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
		//该函数用于显示其他规则的内容
		var rules = doc.getElementById("rules"),
		textlen = doc.getElementById("long"),
		leninner="",textinner = "";
		switch(id){										//根据获取的事件id进行判断
			case "typeLabel1":{							//若为普通文本标签则显示相应内容
				textinner += "数据类型：<label><input type='radio' name='rules' value='txt' checked>文本</label><label><input type='radio' name='rules' value='num'>数字</label><label><input type='radio' name='rules' value='tel'>手机</label><label><input type='radio' name='rules' value='mail'>邮箱</label><label><input type='radio' name='rules' value='psw'>密码</label>";
				leninner += "字符长度：<input id='minlen' type='number' name='minlen'> — <input id='maxlen' name='maxlen' type='number'>";
				rules.innerHTML = textinner;
				textlen.innerHTML = leninner;
				break;
			}
			case "typeLabel5":{							//若为文本域标签则显示相应内容
				leninner += "字符长度：<input id='minlen' type='number' name='minlen' value='4' min='0'> — <input id='maxlen' name='maxlen' type='number' value='16' min='1'>";
				textlen.innerHTML = leninner;
				rules.innerHTML = textinner;
				break;
			}
			case "typeLabel2":
			case "typeLabel3":
			case "typeLabel4":{							//若为单选、多选、下拉框标签则显示相应内容
				rules.innerHTML = "<label>输入选项内容：<input name='inputRule' type='text' id='inputRule' placeholder='以逗号、空格、分号提交'></label><br><div id='tagQueue'></div>";
				textlen.innerHTML = leninner;
				item = addTag();
				break;
			}
		}
	}
	function addTag(){
		// 该函数用于添加单选、多选、下拉框标签的选项内容
		var tagData = [],
		inputRule = document.getElementById("inputRule");
		addHandler(inputRule,"keyup",function(e){
			//监听键盘输入事件，判断是否是正确的输入内容
			var reg = /[,，;；\s\n、]/,
			val = inputRule.value;
			if(e.keyCode == 13 || reg.test(val)){
				if(!isRepeat(val,tagData)){
				var myval = val.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/)[0];//判断是否为正常字符项
					tagData.push(myval);					//添加标签
				}
				if(tagData.length == 11){					//限制标签数量
					tagData.shift();
				}
				inputRule.value = "";
				render(tagData,div);						//渲染标签队列
			}
		});
		function isRepeat(value,myArray){
			//判断是否重复，重复的话返回true，否则返回false
				var reg = /[0-9a-zA-Z\u4e00-\u9fa5]+/;		//判断是否为正常字符项
				var inputval = value.match(reg);
				if(inputval!==null){
					return myArray.some(function(item,index,array){//判断队列里是否有重复值，若有返回true，否则返回false
						return inputval==item;
					});
				}
				else{
					return true;
				}
		}
		var div = document.getElementById("tagQueue");
		addHandler(div,"mouseover",function(event){
			//监听鼠标移进事件
			var e = window.event || event;
			var target = e.target || e.srcElement;
			if(target.tagName.toLowerCase()=="p"){
				target.innerHTML = "点击删除"+target.innerHTML;				//鼠标进入则显示“点击删除”内容
			}
		});
		addHandler(div,"click",function(event){
			//监听标签点击事件，点击则删除
			var e = window.event || event;
			var target = e.target || e.srcElement;
			if(target.tagName.toLowerCase()=="p"){
				var index = Array.prototype.indexOf.call(document.getElementsByTagName("p"),target);//获取点击的索引值
				tagData.splice(index,1);					//删除点击的标签
				render(tagData,div);						//重新渲染标签队列
			}
		});
		addHandler(div,"mouseout",function(event){
			//监听鼠标移除事件
			var e = window.event || event;
			var target = e.target || e.srcElement;
			if(target.tagName.toLowerCase()=="p"){
				console.log(target);
				var index = Array.prototype.indexOf.call(document.getElementsByTagName("p"),target);//获取点击的索引值
				target.innerHTML = tagData[index];			//删除“点击删除”内容
			}
		});
		function render(q,ele){
			//渲染标签队列
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
				data.type = "checkbox";
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
	}
	var doc = document,
	myForm = doc.getElementById("myForm"),
	checkType = doc.getElementById("checkType"),
	addOther = doc.getElementById("addOther"),
	add = doc.getElementById("add");
	addHandler(myForm,"click",function(event){
		// var e = event || window.event,
		// target = event.target || event.srcElement;

		// addHandler()
	});
	addHandler(checkType,"click",function(event){
		var e = event || window.event,
		target = event.target || event.srcElement;
		if(target.tagName.toLowerCase() == "label" || target.parentNode.tagName.toLowerCase() == "label"){
			checkedType(target.id || target.parentNode.id);
		}
	});
	addHandler(addOther,"click",function(event){
		var e = event || window.event,
		target = event.target || event.srcElement;
	});
	addHandler(add,"click",function(){
		// var e = event || window.event,
		// target = event.target || event.srcElement;
		// dataQueue.push(data);
		if(addForm()){
			dataQueue.push(new Data(data));
			doc.getElementById("formInit").innerHTML = "";
			for (var i = 0; i < dataQueue.length; i++) {
				dataQueue[i].init();
			};
			doc.getElementById("formInit").innerHTML += "<br><button id='btn'>提交</button>";
		}
		var inputs = myForm.getElementsByTagName("input"),
		textareas = myForm.getElementsByTagName("textarea");
		for(var i=0;i<inputs.length;i++){
			console.log(inputs[i]);
			addHandler(inputs[i],"focus",function(event){
				var e = event || window.event;
				var target = e.target || e.srcElement;
				addtip(target);
			});
			addHandler(inputs[i],"blur",function(event){
				var e =event || window.event;
				var target = e.target || e.srcElement;
				checkWarm(target);
			});
		}
		for(var i=0;i<textareas.length;i++){
			addHandler(textareas[i],"focus",function(event){
				var e = event || window.event;
				var target = e.target || e.srcElement;
				addtip(target);
			});
			addHandler(textareas[i],"blur",function(event){
				var e =event || window.event;
				var target = e.target || e.srcElement;
				checkWarm(target);
			});
		}
		console.log(dataQueue);
	});
	function addtip(target){
		var p = target.parentNode.getElementsByTagName("p");
		var text = null,textMessage="",id=target.id,data = dataQueue[id];
		console.log(data);
		if(p[0]!==undefined){
			p[0].parentNode.removeChild(p[0]);
		}
		var pTip = document.createElement("p");
		switch(data.type){
			case "input":{
				switch(data.rulesType){
					case "text":{
						if(data.isRequire){
							textMessage = "必填，长度为"+data.minlen+"~"+data.maxlen+"个字符";
						}
						else{
							textMessage = "选填，长度为"+data.minlen+"~"+data.maxlen+"个字符";
						}
						break;
					}
					case "password":{
						if(data.isRequire){
							textMessage = "必填，长度为"+data.minlen+"~"+data.maxlen+"个字符";
						}
						else{
							textMessage = "选填，长度为"+data.minlen+"~"+data.maxlen+"个字符";
						}
						break;
					}
					case "email":{
						if(data.isRequire){
							textMessage = "必填，必须为常见邮箱格式";
						}
						else{
							textMessage = "选填，必须为常见邮箱格式";
						}
						break;
					}
					case "telphone":{
						if(data.isRequire){
							textMessage = "必填，为11位数字";
						}
						else{
							textMessage = "选填，为11位数字";
						}
						break;
					}
					case "number":{
						if(data.isRequire){
							textMessage = "必填，长度为"+data.minlen+"~"+data.maxlen+"个数字";
						}
						else{
							textMessage = "选填，长度为"+data.minlen+"~"+data.maxlen+"个数字";
						}
						break;
					}
				}
				break;
			}
			case "textarea":{
				if(data.isRequire){
					textMessage = "必填，长度为"+data.minlen+"~"+data.maxlen+"个数字";
				}
				else{
					textMessage = "选填，长度为"+data.minlen+"~"+data.maxlen+"个数字";
				}
				break;
			}
		}
			
		text = document.createTextNode(textMessage);
		pTip.appendChild(text);
		target.parentNode.appendChild(pTip);
	}
	function checkWarm(target){
		var p = target.parentNode.parentNode.getElementsByTagName("p");
		// console.log(span[0]!==undefined);
		var text = null;
		if(p[0]!==undefined){
			p[0].parentNode.removeChild(p[0]);
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
		// span.appendChild(text);
		// target.parentNode.parentNode.appendChild(span);
	}
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
				var typeVal = type[i].value;
				switch(typeVal){
					case "text":{
						data.type = "input";
						data.inputType = "text";
						if(rules!=undefined){
							for (var i = rules.length - 1; i >= 0; i--) {
								var rulesVal = rules[i];
								console.log();
								if(rulesVal.checked){
									switch(rulesVal.value){
										case "txt":{
											data.rulesType = "text";
											break;
										}
										case "num":{
											data.rulesType = "number";
											break;
										}
										case "tel":{
											data.rulesType = "telphone";
											break;
										}
										case "mail":{
											data.rulesType = "email";
											break;
										}
										case "psw":{
											data.rulesType = "password";
											break;
										}
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
						data.item = [];
						data.inputType = "radio";
						// if()
						if(tagQueueVal.length == 0){
							alert("选项内容尚未添加！");
							return false;
						}
						else{
							for (var i = tagQueueVal.length - 1; i >= 0; i--) {
								data.item.push(tagQueueVal[i].innerText);
							};
						}
						data.id=data.id++;
						break;
					}
					case "checkbox":{
						var tagQueueVal = doc.getElementById("tagQueue").childNodes;
						data.type = "input";
						data.item = [];
						data.inputType = "checkbox";
						if(tagQueueVal.length == 0){
							alert("选项内容尚未添加！");
							return false;
						}
						else{
							for (var i = tagQueueVal.length - 1; i >= 0; i--) {
								data.item.push(tagQueueVal[i].innerText);
							};
						}
						data.id=data.id++;
						break;
					}
					case "select":{
						var tagQueueVal = doc.getElementById("tagQueue").childNodes;
						data.type = "select";
						data.item = [];
						data.inputType = "select";
						if(tagQueueVal.length == 0){
							alert("选项内容尚未添加！");
							return false;
						}
						else{
							for (var i = tagQueueVal.length - 1; i >= 0; i--) {
								// .log(tagQueueVal[i].innerText);
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
							data.minlen = parseInt(minlen.value);
							data.maxlen = parseInt(maxlen.value);
						}
						data.id=data.id++;
						break;
					}
				}
			}
		};
		return true;
		console.log(data);
	}
}());