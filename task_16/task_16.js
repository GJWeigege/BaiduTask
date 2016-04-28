/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var aqiCity = document.getElementById("aqi-city-input").value;					//获取输入框的值
	var aqiValue = document.getElementById("aqi-value-input").value;					//获取输入框的值
	var zeCity = /^[a-zA-Z\u4E00-\u9FA5]+$/;					//对输入的城市名进行正则表达式判断
	var zeValue = /^[0-9]+$/;					//对输入的空气质量指数进行正则表达式判断
	if(!zeCity.test(aqiCity)){
		alert("城市名称请输入城市的中英文字符");
	}
	else if(!zeValue.test(aqiValue)){
		alert("空气质量指数请输入整数");
	}
	else{
		//更新对象的属性及值
		aqiData[aqiCity] = aqiValue;
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var ulinner = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	var table = document.getElementById("aqi-table");
	for(var item in aqiData){
		//输出对象内容，并设置id属性方便删除
		ulinner += "<tr><td>"+item+"</td><td>"+aqiData[item]+"</td><td><button id='"+item+"'>删除</button></td></tr>";
	}
	table.innerHTML = ulinner;
	//点击提交之后清空输入框
	document.getElementById("aqi-city-input").value = "";
	document.getElementById("aqi-value-input").value = "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(eventId) {
  // do sth.
  delete aqiData[eventId];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn = document.getElementById("add-btn");
  btn.addEventListener("click",function(){
    addBtnHandle();
  },false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var delbtn = document.getElementById("aqi-table");
  delbtn.addEventListener("click",function(event){
  	var e = event.target?event.target:event.srcElement;
  	delBtnHandle(e.id);
  },false);
}

init();
