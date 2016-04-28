(function(){
//闭包自执行函数

	//创建一个数组存放数据
	var queue=[];
	function checkValue(value){
		var val = value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
		var len = val.length;
		for(var i=0;i<len;i++){
			if(!val[i].length>0){
				continue;
			}
			else{
				queue.push(val[i]);
			}
		}
		renderQueue(queue);
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
	function renderQueue(q){
		//渲染数组
		var span = document.getElementById("queue");
		var spanInner = "";
		for (var i = 0; i < q.length; i++) {
			spanInner = spanInner+"<p>"+q[i]+"</p>";
		};
		span.innerHTML = spanInner;
	}

	var insertBtn = document.getElementById("insert");
	var queryBtn = document.getElementById("query");
	addHandler(insertBtn,"click",function(){
		var texeVal = document.getElementById("text").value.trim();
		if(texeVal == ""){
			alert("请输入内容！");
		}
		else{
			checkValue(texeVal);
		}
	});
	addHandler(queryBtn,"click",function(){
		var inputVal = document.getElementById("input").value.trim();
		if(inputVal == ""){
			alert("请输入内容！");
		}
		else{
			var reg = new RegExp(inputVal,"g");
			var str = [];
			for(var i=0;i<queue.length;i++){
				str[i] = queue[i];
				if(reg.test(str[i])){
					str[i] = str[i].replace(reg,"<span>"+inputVal+"</span>");
				}
			}
			renderQueue(str);
		}
	});
})();