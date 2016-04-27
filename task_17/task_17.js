/**
 * Created by Administrator on 2016/4/27.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var chart = document.getElementById("aqi-chart-wrap");
    var chartInner = "";
    for(var item in chartData){
        if(chartData[item]>300){
            var divColor = "rgb(131,3,0)";
        }
        else if(chartData[item]>200 && chartData[item]<=300){
            divColor = "rgb(108,56,252)";
        }
        else if(chartData[item]>150 && chartData[item]<=200){
            divColor = "rgb(255,0,0)";
        }
        else if(chartData[item]>100 && chartData[item]<=150){
            divColor = "rgb(255,101,1)";
        }
        else if(chartData[item]>50 && chartData[item]<=100){
            divColor = "rgb(247,241,21)";
        }
        else{
            divColor = "rgb(153,255,0)";
        }
        if(pageState.nowGraTime == "day"){
            var width = "0.5%";
        }
        else if(pageState.nowGraTime == "week"){
            width = "3%";
        }
        else{
            width = "10%";
        }
        chartInner += "<div style='background-color:"+divColor+";height:"+parseInt(chartData[item])+"px;width:"+width+";margin-left:"+width+";display:inline-block;' title=\""+item+"空气质量为"+parseInt(chartData[item])+"\"></div>";
    }
    chart.innerHTML = chartInner;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
    // 确定是否选项发生了变化
    var e = event.target?event.target:event.srcElement;
    var value = e.value;
    // alert(radio);
    if(pageState.nowGraTime != value){
        pageState.nowGraTime = value;
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var select = document.getElementById("city-select");
    var value = select.value;
    if(pageState.nowSelectCity != value){
        pageState.nowSelectCity = value;
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio = document.getElementById("form-gra-time");
    radio.addEventListener("click",function(event){
        graTimeChange(event);
    },false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var select = document.getElementById("city-select");
    inner = "";
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    for(item in aqiSourceData){
        inner += "<option>"+item+"</option>";
    }
    select.innerHTML = inner;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener("change",function(){
        citySelectChange();
    },false)
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    if(pageState.nowGraTime == "day"){
        chartData = aqiSourceData[pageState.nowSelectCity];
    }
    else if(pageState.nowGraTime == "week"){
        var dataa = aqiSourceData[pageState.nowSelectCity];
        chartData={};
        var num = 1,
            count = 0,
            sum = 0,
            mon = 0;
        for(var item in dataa){
            var newdate = new Date(item);
            day = newdate.getDay();
            var newdate = new Date(item);
            month = newdate.getMonth();
            if(mon != month){
                mon++;
                num = 1;
                if (day == 6) {
                    count++;
                    sum = sum+dataa[item];
                    weekNum = (mon+1)+"月第"+(num++)+"周";
                    chartData[weekNum] = sum/count;
                    count = 0;
                    num = 1;
                    sum = 0;
                }
                else{
                    count++;
                    sum+=dataa[item];
                }
            }
            else{
                if (day == 6) {
                    count++;
                    sum = sum+dataa[item];
                    weekNum = (mon+1)+"月第"+(num++)+"周";
                    chartData[weekNum] = sum/count;
                    count = 0;
                    sum = 0;
                }
                else{
                    count++;
                    sum+=dataa[item];
                }
            }

        }
        weekNum = (mon+1)+"月第"+(num++)+"周";
        chartData[weekNum] = sum/count;
    }
    else{
        dataa = aqiSourceData[pageState.nowSelectCity];
        chartData={};
        var num = 0,
            count = 0,
            sum = 0;
        for(item in dataa){
            var newdate = new Date(item);
            month = newdate.getMonth();
            if(num != month){
                monName = (++num)+"月";
                chartData[monName] = sum/count;
                count = 0;
                sum = dataa[item];
            }
            else{
                sum+=dataa[item];
                count++;
            }
        }
        monName = (++num)+"月";
        chartData[monName] = sum/count;
    }
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
