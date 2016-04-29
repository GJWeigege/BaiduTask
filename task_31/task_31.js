(function(){
	date = {
		"北京":["北京大学","清华大学","北京交通大学","中央财经大学","中国政法大学"],
		"大连":["大连理工大学","大连海事大学","东北财经大学","大连舰艇学院","大连海洋大学"],
		"厦门":["厦门大学","厦门理工大学","华侨大学","集美大学"],
		"上海":["复旦大学","上海交通大学","东华大学","同济大学"]
		};
	var doc = document;
	var divRadio = doc.getElementById("divRadio");
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
	}
	function init(target){
		var val = target.value;
		var school = doc.getElementById("school");
		var company = doc.getElementById("company");
		if(val == "student"){
			school.style.display = "block";
			company.style.display = "none";
		}else{
			company.style.display = "block";
			school.style.display = "none";
		}
	}
	addHandler(divRadio,"click",function(event){
		var e = event || window.event,
		target = e.target || e.srcElement;
		if(target.tagName.toLowerCase() == "input"){
			init(target);
		}
	});
	var select = doc.getElementById("divSelect");
	addHandler(select,"change",function(event){
		var e = event || window.event,
		target = e.target || e.srcElement;
		if(target.id.toLowerCase() == "city"){
			// console.log("aaa");
			var val = target.value,inner="";
			// console.log(val);
			for(item in date){
				if(val == item){
					for (var i = date[item].length - 1; i >= 0; i--) {
						inner += "<option>"+date[item][i]+"</option>";
					}
				}
			}
			doc.getElementById("collage").innerHTML = inner;
		}
	});
})();