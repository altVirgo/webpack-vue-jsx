import Vue from 'vue';
import router from './router/router.js';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import App from './app/app.jsx';
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    el: '#app',
    components: { App },
    router: router,
    template: '<App/>'
})