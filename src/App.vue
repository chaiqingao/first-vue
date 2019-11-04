<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <button v-on:click="drawAll">Greet</button>
    <el-amap vid="AMapDemo" :amap-manager="amapManager" :events="mapEvents" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" onclick="marker.windowVisible=true" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
    </el-amap>
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
    function openInfo(img, name, position) {
        //构建信息窗体中显示的内容
        var content = "<div><h1>"+name+"</h1><img src=data:image/bmp;base64,"+img+" alt=\"哈哈\" width=\"200px\"></div>"
        
        infoWindow = new AMap.InfoWindow({
            content: content  //使用默认信息窗体框样式，显示信息内容
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
            setInterval(getNextPoint,10000)
            function getNextPoint() {
                self.$http.post('api/point/getNextPoint',{
                    time:self.currentTime
                },{}).then((response) => {
                    var res = response.body;
                    var geocoder = new AMap.Geocoder();
                    var address  = res.address;
                    geocoder.getLocation(address, function(status, result) {
                        if (status === 'complete'&&result.geocodes.length) {
                            var lnglat = result.geocodes[0].location
                            openInfo(res.img, res.name, lnglat);
                            self.currentTime = res.time;
                        }else{
                            console.log('查询失败');
                        }
                    });
                })
            }
            //getNextPoint();
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
        width: 100%;
        height: 800px;
    }
</style>
