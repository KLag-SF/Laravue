/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from "vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import IndexComponent from './components/IndexComponent.vue';
import TimeInfoComponent from './components/TimeInfoComponent.vue';
import StationComponent from "./components/StationComponent.vue";
import LineComponent from "./components/LineComponent.vue";
import TimetableComponent from "./components/TimetableComponent.vue";

require('./bootstrap');
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueAxios, axios);
window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('header-component', require('./components/HeaderComponent.vue').default);
Vue.component('time-info-component', require('./components/TimeInfoComponent.vue').default);
Vue.component('line-component', require('./components/LineComponent.vue'))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            // Index
            path: '/',
            name: 'index',
            component: IndexComponent
        },
        {
            // Time information
            path: '/timeinfo',
            name: 'timeinfo',
            component: TimeInfoComponent
        },
        {
            // Station list
            path: '/station',
            name: 'stations',
            component: StationComponent
        },
        {
            // Line list
            path: '/lines',
            name: 'lines',
            component: LineComponent
        },
        {
            // Timetable
            path: '/timetable',
            name: 'timetable',
            component: TimetableComponent
        },
    ]

});

const app = new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(),
});
