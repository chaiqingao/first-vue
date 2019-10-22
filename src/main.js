import Vue from 'vue'
import App from './App.vue'
import  VueResource  from 'vue-resource'
import AMap from 'vue-amap'
Vue.use(VueResource);
Vue.use(AMap);
Vue.config.productionTip = false
AMap.initAMapApiLoader({
  key:'b50e99b550e35a54328a6a4dd7a076ee',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})
new Vue({
  render: h => h(App),
}).$mount('#app')
