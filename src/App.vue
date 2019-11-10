<template>
    <div class="hello">
        <el-amap vid="AMapDemo" :amap-manager="amapManager" :events="mapEvents" class="amap-demo">
            <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :title="marker.title" :icon="marker.icon" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
            <el-amap-marker :position="marker.position" :icon="marker.icon"></el-amap-marker>
        </el-amap>
        <div id="info-panel" class="scrollbar1">
            <h1 style="font-family: '楷体'; text-align: center">大事记</h1>
            <div style="text-align:center"><input type="text"><button>查询</button></div>
            <ul id="info-list">
            </ul>
        </div>
    </div>
</template>

<script>
    import VueAMap from "vue-amap";
    let amapManager = new VueAMap.AMapManager();
    var disCountry = new AMap.DistrictLayer.Country({
        zIndex:10,
        SOC:'CHN',
        depth:2,
        styles:{
            'nation-stroke':'#22ffff',
            'coastline-stroke':[0.85, 0.63, 0.94, 1],
            'province-stroke':'white',
            'city-stroke': 'rgba(255,255,255,0.5)',//中国特有字段
            'fill':function(props){//中国特有字段
                return "rgb(159,159,159)";
            }
        }
    })
    var infoWindow;
    function openInfo(name, startTime, endTime, img, details, moreUrl, position) {
        //构建信息窗体中显示的内容
        "12456".substr(0,255);
        var info ="<div id=\"card\">\
        <p id=\"name\">"+name+"</p>"+
        (startTime===endTime?"<p id=\"time\">"+startTime+"</p>":"<p id=\"time\">"+startTime+"至"+endTime+"</p>")+
        "<img src=data:image/bmp;base64,"+img+" alt=\"图片加载失败\" width=\"300px\">\
        <p id=\"details\">"+details+"</p></div>\
        <style>#card{color: rgb(255, 0, 0);text-align: center;width: 300px}\
        #name{color: #c04851;text-align: left;font-size: 25px;margin-block-start: 0em;margin-block-end: 0em;}\
        #time{color: #fc8c23;text-align: right;margin-block-start: 0em;margin-block-end: 0em;}\
        #details{color: rgb(0,0,0);text-align: left;font-size:15px}</style>";
        
        infoWindow = new AMap.InfoWindow({
            content: info  //使用默认信息窗体框样式，显示信息内容
        });
        var map = amapManager.getMap();
        infoWindow.open(map, position);
    }
    export default {
        data() {
            return {
                msg: "历史",
                amapManager,
                mapEvents: {
                    init(o) {
                        disCountry.setMap(o);
                    }
                },
                currentTime: '0-0-0',
                data: [
                    {"adcode":"520000","red":false,"name":"贵州"},
                    {"adcode":"540000","red":false,"name":"西藏"},
                    {"adcode":"530000","red":false,"name":"云南"},
                    {"adcode":"500000","red":false,"name":"重庆"},
                    {"adcode":"360000","red":false,"name":"江西"},
                    {"adcode":"340000","red":false,"name":"安徽"},
                    {"adcode":"510000","red":false,"name":"四川"},
                    {"adcode":"350000","red":false,"name":"福建"},
                    {"adcode":"430000","red":false,"name":"湖南"},
                    {"adcode":"420000","red":false,"name":"湖北"},
                    {"adcode":"410000","red":false,"name":"河南"},
                    {"adcode":"330000","red":false,"name":"浙江"},
                    {"adcode":"640000","red":false,"name":"宁夏"},
                    {"adcode":"650000","red":false,"name":"新疆"},
                    {"adcode":"440000","red":false,"name":"广东"},
                    {"adcode":"370000","red":false,"name":"山东"},
                    {"adcode":"450000","red":false,"name":"广西"},
                    {"adcode":"630000","red":false,"name":"青海"},
                    {"adcode":"320000","red":false,"name":"江苏"},
                    {"adcode":"140000","red":false,"name":"山西"},
                    {"adcode":"460000","red":false,"name":"海南"},
                    {"adcode":"310000","red":false,"name":"上海"},
                    {"adcode":"110000","red":false,"name":"北京"},
                    {"adcode":"130000","red":false,"name":"河北"},
                    {"adcode":"230000","red":false,"name":"黑龙江"},
                    {"adcode":"220000","red":false,"name":"吉林"},
                    {"adcode":"210000","red":false,"name":"辽宁"},
                    {"adcode":"150000","red":false,"name":"内蒙古"},
                    {"adcode":"120000","red":false,"name":"天津"},
                    {"adcode":"620000","red":false,"name":"甘肃"},
                    {"adcode":"610000","red":false,"name":"甘肃"},
                    {"adcode":"710000","red":false,"name":"台湾"},
                    {"adcode":"810000","red":false,"name":"香港"},
                    {"adcode":"820000","red":false,"name":"澳门"}
                ],
                markers: [],
                marker: {
                    position:[0,0],
                    icon: "./img/坐标.png",
                    title:""
                }
            }
        },
        beforeMount() {
            var self = this;
            setInterval(getNextPoint,2000)
            function getNextPoint() {
                self.$http.post('api/events/getNextPoint',{
                    time:self.currentTime
                },{}).then((response) => {
                    var res = response.body;
                    var event = res.event;
                    if (event.substr(0,2)=== "解放") {
                        var address = event.substr(2);
                        console.log(address)
                        for (let i = 0; i < self.data.length; i++) {
                            if(self.data[i].name == address) {
                                self.data[i].red = true;
                            }
                        }
                        var geocoder = new AMap.Geocoder();
                        geocoder.getLocation(address, function(status, result) {
                            if (status === 'complete'&&result.geocodes.length) {
                                var lnglat = result.geocodes[0].location;
                                var marker = {
                                    position: [lnglat.lng, lnglat.lat],
                                    vivible: true,
                                    title: res.event,
                                    icon: "./img/五星.png",
                                    draggable: false,
                                    events: {
                                        click: () => {
                                            alert('click marker');
                                        }
                                    }
                                }
                                self.markers.push(marker);
                            }
                        });
                        self.drawAll();
                        self.currentTime = res.startTime;
                    } else {
                        var geocoder = new AMap.Geocoder();
                        var address  = res.address;
                        geocoder.getLocation(address, function(status, result) {
                            if (status === 'complete'&&result.geocodes.length||address==="莫斯科") {
                                if(address==="莫斯科") {
                                    var lnglat = {
                                        P: 55.75074,
                                        Q: 37.61702,
                                        lng: 37.61702,
                                        lat: 55.75074
                                    }
                                } else {
                                    var lnglat = result.geocodes[0].location;
                                }
                                //openInfo(res.event, res.startTime, res.endTime, res.img, res.details, res.moreUrl, lnglat);
                                var startTime = res.startTime;
                                var endTime = res.endTime;
                                document.getElementById("info-list").innerHTML = "<li>\
                                <div class=\"card\">\
                                <img src=data:image/bmp;base64,"+res.img+" alt=\"Avatar\" style=\"width:100%\">\
                                <div class=\"container\">\
                                    <h3><b>"+res.event+"</b></h3> \
                                    <h6 align=\"right\" style=\"color: #D91C1F\">"+(startTime===endTime?"<p id=\"time\">"+startTime+"</p>":"<p id=\"time\">"+startTime+"至"+endTime+"</p>")+"</h6>\
                                    <p>"+res.details+"</p><button onClick=\"baidu\" type=\"button\" class=\"btn btn-link\"><a href=\""+res.moreUrl+ "\"target=\"_blank\">阅读更多</a></button>\
                                </div>\
                                </div>\
                                </br></br></br></br></li>"+document.getElementById("info-list").innerHTML;
                                self.currentTime = res.startTime;
                                var marker = {
                                    position: [lnglat.lng, lnglat.lat],
                                    vivible: true,
                                    title: res.event,
                                    icon: "./img/坐标.png",
                                    draggable: false,
                                    events: {

                                    }
                                }
                                self.marker.position = [lnglat.lng, lnglat.lat];
                                self.marker.title = event;
                            }else{
                                console.log('查询失败：'+address);
                            }
                        });
                    }
                    
                })
            }
            getNextPoint();
            self.$http.post('api/events/getAll', {},{}).then((response) => {
                var res = response.body;
                console.log(res);
                for (let i = 0; i < res.length; i++) {
                    const element = res[i];
                    document.getElementById("yearList").innerHTML+="<li>"+element+"<i class=\"year-dot\"></i></li>";
                }
                $(function(){
                    $("#timeLine").timeLine({
                        w:850  //每一个li的宽度
                    //            btnPrev:"#btnLeft",      //上一个按钮
                    //            btnNext: "#btnRight",  //下一个按钮
                    //            dateBox:"#yearList", //日期的ul盒子
                    //            dateArr: "#yearList li", //保存每一个日期的数组
                    //            conBox:"#cUl",  //保存切换内容的ul盒子
                    //            conArr:"#cUl li" //保存每一个内容的数
                    });
                    });
            })
        },
            
        mounted() {
            
        },
        methods: {
            drawAll() {
                var data = this.data;
                disCountry.setStyles({
                    'fill':function(props){//中国特有字段
                        for (let i = 0; i < data.length; i++) {
                            const element = data[i];
                            if(element.adcode == props.adcode_pro) {
                                return element.red === true?"rgb(255,0,0)":"rgb(129,129,129)";
                            }
                        }
                    }
                })
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    #AMapDemo {
        position: relative;
        height: 650px;
        width: 100%;
    }
    #info-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        overflow: auto;
        width: 320px;
        z-index: 999;
        border-left: 1px solid #eaeaea;
        background: #fff;
    }
    #info-list li.selected {
        background: green;
    }
    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 300px;
        border-radius: 5px;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    img {
        border-radius: 5px 5px 0 0;
    }

    .container {
        padding: 2px 16px;
    }
</style>
