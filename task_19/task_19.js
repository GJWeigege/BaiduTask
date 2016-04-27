(function(){
//闭包自执行函数

	//创建一个数组存放数据
	var queue=[];
	function checkValue(value){
		var partten = /^(?:[1-9][0-9]{1}|100)$/;
		if(partten.test(value)){
			return true;
		}
		else{
			alert("请输入10—100的整数！");
			return false;
		}
	}

	function mySort(){
		//可视化排序算法
		renderQueue();
		var j=0;
		var len = queue.length;
		var i=0;
		function delayQueue(){						//延迟调用函数
			if(queue[j]>queue[j+1]){				//比较大小，进行交换
				var temp = queue[j];
				queue[j] = queue[j+1];
				queue[j+1] = temp;
				renderQueue();						//交换后就进行渲染
			}
			j++;									//内部循环加一
			if(j===len-i){							//判断内部循环次数是否等于外部循环
				i++;								//外部循环加一
				j=0;
				if(i===len-1){						//判断外部循环是否等于数组长度
					return false;
				}
			}
			setTimeout(delayQueue,100);				//延迟调用自身函数
		}
			setTimeout(delayQueue,100);
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
					if(queue.length<60){
						queue.unshift(parseInt(inputVal));
					}
					else{
						alert("队列个数超过60个！");
					}
					renderQueue();
				}
				break;
			}
			case "rightIn": {				//数组后面插入数据
				if(checkValue(inputVal)){
					if(queue.length<=60){
						queue.push(parseInt(inputVal));
					}
					else{
						alert("队列个数超过60个！");
					}
					renderQueue();
				}
				break;
			}
			case "leftOut": {				//数组前面弹出数据
				queue.shift(parseInt(inputVal));
				renderQueue();
				break;
			}
			case "rightOut": {				//数组后面弹出数据
				queue.pop(parseInt(inputVal));
				renderQueue();
				break;
			}
			case "mySort": {
				mySort();
			}
		}
	}
	function renderQueue(){
		//渲染数组
		var span = document.getElementById("queue");
		var spanInner = "";
		for (var i = 0; i < queue.length; i++) {
			spanInner = spanInner+"<p style='height:"+(2*queue[i])+"px;' title='"+queue[i]+"'></p>";
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
		});
	}
	var span = document.getElementById("queue");
	addHandler(span,"click",function(event){
		//绑定点击函数
		var e = window.event || event;
		var target = e.target || e.srcElement;
		if(target.tagName.toLowerCase() == "p"){
			//判断点击目标，若为p元素则进行删除事件
			var pNode = document.getElementsByTagName("p");
			var index = Array.prototype.indexOf.call(pNode,target);				//获取点击元素所在的位置
			queue.splice(index,1);
			renderQueue();
		}
	});
})();