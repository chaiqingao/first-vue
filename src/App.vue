<template>
    <div class="hello">
        <el-amap vid="AMapDemo" :amap-manager="amapManager" :events="mapEvents" class="amap-demo">
            <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" onclick="marker.windowVisible=true" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
        </el-amap>
        <div id="info-panel" class="scrollbar1">
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
                data: {
                    '520000':false,//贵州
                    '540000':false,//西藏
                    '530000':false,//云南 
                    '500000':false,//重庆
                    '360000':false,//江西
                    '340000':false,//安徽
                    '510000':false,//四川
                    '350000':false,//福建
                    '430000':false,//湖南
                    '420000':false,//湖北
                    '410000':false,//河南
                    '330000':false,//浙江
                    '640000':false,//宁夏
                    '650000':false,//新疆
                    '440000':false,//广东
                    '370000':false,//山东
                    '450000':false,//广西
                    '630000':false,//青海
                    '320000':false,//江苏
                    '140000':false,//山西
                    '460000':false,//海南
                    '310000':false,//上海
                    '110000':false,//北京
                    '130000':false,//河北
                    '230000':false,//黑龙江
                    '220000':false,//吉林
                    '210000':false,//辽宁
                    '150000':false,//内蒙古
                    '120000':false,//天津
                    '620000':false,//甘肃
                    '610000':false,//甘肃
                    '710000':false,//台湾
                    '810000':false,//香港
                    '820000':false //澳门
                },
                markers: [
                    {
                        position: [114.3621826172, 30.5344679988],
                        visible: true,
                        content: "你好",
                        events: {
                            click: (e) => {
                                openInfo("你好", e);
                            }
                        },
                        draggable: false
                    }
                ],
            }
        },
        beforeMount() {
            var self = this;
            setInterval(getNextPoint,5000)
            function getNextPoint() {
                self.$http.post('api/point/getNextPoint',{
                    time:self.currentTime
                },{}).then((response) => {
                    var res = response.body;
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
                            console.log(lnglat);
                            openInfo(res.event, res.startTime, res.endTime, res.img, res.details, res.moreUrl, lnglat);
                            self.currentTime = res.startTime;
                        }else{
                            console.log('查询失败：'+address);
                        }
                    });
                })
            }
            //getNextPoint();
            document.getElementById("timeLine").innerHTML="<ul id=\"yearList\">\
            <li>1921年7月23日<i class=\"year-dot\"></i></li>\
            <li>1922年7月16日<i class=\"year-dot\"></i></li>\
            <li>1923年6月12日<i class=\"year-dot\"></i></li>\
        </ul>";
        },
        mounted() {
            
        },
        methods: {
            drawAll() {
                var data = this.data;
                disCountry.setStyles({
                    'fill':function(props){//中国特有字段
                        return data[props.adcode_pro] === true?"rgb(255,0,0)":"rgb(129,129,129)";
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
    .hello {
        background-color: rgb(238, 238, 238);
        color: rgb(255, 192, 163);
        text-align: center;
    }
    #AMapDemo {
        position: relative;
        height: 900px;
        width: 100%;
    }
    #info-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        overflow: auto;
        width: 300px;
        z-index: 999;
        border-left: 1px solid #eaeaea;
        background: #fff;
    }
</style>
