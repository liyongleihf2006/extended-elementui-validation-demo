import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FormItem from './el-components/form-item'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component(FormItem.name,FormItem)
new Vue({
  render: h => h(App),
}).$mount('#app')
