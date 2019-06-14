// 样式
import 'swiper/dist/css/swiper.min.css';
import "@a/styles/base.less";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);
import { Toast,Popup,Rate,List,PullRefresh,Tabbar, TabbarItem, Search, button, ImagePreview, Field, Picker, DatetimePicker,Uploader,Cell,NavBar } from 'vant';
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Rate);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Search)
Vue.use(button)
Vue.use(ImagePreview)
Vue.use(Field)
Vue.use(Picker)
Vue.use(DatetimePicker)
Vue.use(Uploader)
Vue.use(Cell)
Vue.use(NavBar)
// Vue.use(vMessage)
Vue.config.productionTip = false;

// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount("#app");

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    template: '<App/>'
})