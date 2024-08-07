import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './util/store'
import mixins from './util/mixins'
import vueCookies from 'vue-cookies'

import EventCalendar from './components/EventCalendar.vue';
import MateHeader from './components/MateHeader.vue';
import MateFooter from './components/MateFooter.vue';

import VCalendar from 'v-calendar'; // v-calendar 플러그인 임포트
import 'v-calendar/dist/style.css'; // v-calendar 스타일 임포트
import './views/mypage/mypage.css'

import GChart from 'vue-google-charts'

const app = createApp(App);

app.use(store);
app.use(vueCookies);
app.$cookies.config("7d");
app.mixin(mixins);

app.component('EventCalendar', EventCalendar);
app.component('MateHeader', MateHeader);
app.component('MateFooter', MateFooter);
app.component('GChart', GChart);

app.use(VCalendar, {});
app.use(GChart, {});
app.use(router).mount('#app');
window.Kakao.init(process.env.VUE_APP_KAKAO_APP_KEY);
