import Vue from 'vue'
//import router from '@/routers/main'



//import mixin from '@/mixins/init';
//Vue.mixin(mixin);

import globalPlugin from '../js/plugins/global.js';

Vue.use(globalPlugin);// 全局插件



Vue.config.productionTip = false;
Vue.config.devtools = true;

export default function(entry) {
    console.log(entry);
    return new Vue({
        //mixins:[mixin],
        //router,
        render: h => h(entry)
      }).$mount('#app');
}
