import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './util/store'
import mixins from './util/mixins'
import vueCookies from 'vue-cookies'

import EventCalendar from './components/EventCalendar.vue';

import VCalendar from 'v-calendar'; // v-calendar 플러그인 임포트
import 'v-calendar/dist/style.css'; // v-calendar 스타일 임포트

const app = createApp(App);
app.use(store);
app.use(vueCookies);
app.$cookies.config("7d");
app.mixin(mixins);

app.component('EventCalendar', EventCalendar);
app.use(VCalendar, {});
app.use(router).mount('#app');

