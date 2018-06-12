// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

import '@/icons' // icon

import '@/mixin'

import store from '@/store'

import i18n from '@/lang' //intetnationalization

Vue.use(ElementUI);
import { router } from './router'

Vue.use(ElementUI,{
    size:'mediun',
    i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    i18n,
    components: { App },
    template: '<App/>'
})