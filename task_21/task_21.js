(function(){
//闭包自执行函数

	var tagData = [],hobbyData = [];

	//封装监听函数
	var addHandler = function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}
		else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}
		else{
			element["on"+type] = handler;
		}
	};
	var input = document.getElementById("input");
	addHandler(input,"keyup",function(e){
		//监听键盘输入事件，判断是否是正确的输入内容
		var reg = /[,，;；\s\n、]/;
		var val = input.value;
		if(e.keyCode == 13 || reg.test(val)){
			if(!isRepeat(val,tagData)){
			var myval = val.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/)[0];//判断是否为正常字符项
				tagData.push(myval);					//添加标签
			}
			if(tagData.length == 11){					//限制标签数量
				tagData.shift();
			}
			input.value = "";
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
		var e = window.event || event;
		var target = e.target || e.srcElement;
		if(target.tagName.toLowerCase()=="p"){
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
	var btn = document.getElementById("insert");
	addHandler(btn,"click",function(event){
		var texeVal = document.getElementById("text").value.trim();
		if(texeVal == ""){
			alert("请输入内容！");
		}
		else{
			var val = texeVal.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
			var queueDiv = document.getElementById("queue");
			val.forEach(function(item,index,array){
				if(!isRepeat(item,hobbyData)){
					hobbyData.push(item);
				}
				if(hobbyData.length==11){
					hobbyData.shift();
				}
				document.getElementById("text").value = "";
			});
			render(hobbyData,queueDiv);
		}
	});
})();