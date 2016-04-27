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
		var reg = /[,，;；\s\n、]/;
		var val = input.value;
		if(e.keyCode == 13 || reg.test(val)){
			if(!isRepeat(val,tagData)){
			var myval = val.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/)[0];
				tagData.push(myval);
			}
			if(tagData.length == 11){
				tagData.shift();
			}
			input.value = "";
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