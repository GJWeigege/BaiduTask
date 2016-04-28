(function(){
//闭包自执行函数

	//创建一个数组存放数据
	var queue=[];
	function checkValue(value){
		var partten = /^[1-9][0-9]*$/;
		if(partten.test(value)){
			return true;
		}
		else{
			alert("请输入整数！");
			return false;
		}
	}
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
	//封装插入数据的函数
	function InOut(btnId,inputVal){
		switch(btnId){
			case "leftIn": {				//数组前面插入数据
				if(checkValue(inputVal)){
					queue.unshift(parseInt(inputVal));
				}
				break;
			}
			case "rightIn": {				//数组后面插入数据
				if(checkValue(inputVal)){
					queue.push(parseInt(inputVal));
				}
				break;
			}
			case "leftOut": {				//数组前面弹出数据
				queue.shift(parseInt(inputVal));break;
			}
			case "rightOut": {				//数组后面弹出数据
				queue.pop(parseInt(inputVal));break;
			}
		}
	}
	function renderQueue(){
		//渲染数组
		var span = document.getElementById("queue");
		var spanInner = "";
		for (var i = 0; i < queue.length; i++) {
			spanInner = spanInner+"<p>"+queue[i]+"</p>";
		};
		span.innerHTML = spanInner;
	}
	var btns = document.getElementsByTagName("button");
	for(var i=0;i<btns.length;i++){
		//绑定点击事件
		addHandler(btns[i],"click",function(event){
			var e = window.event || event;				//浏览器兼容性
			var target = e.target || e.srcElement;				//浏览器兼容性
			var btnId = target.getAttribute("id");
			var inputVal = document.getElementById("input").value;
			InOut(btnId,inputVal);
			renderQueue();
		});
	}
	var span = document.getElementById("queue");
	addHandler(span,"click",function(event){
		//绑定点击函数
		var e = window.event || event;
		var target = e.target || e.srcElement;
		var pNode = document.getElementsByTagName("p");
		var index = Array.prototype.indexOf.call(pNode,target);				//获取点击元素所在的位置
		queue.splice(index,1);
		renderQueue();
	});
})();