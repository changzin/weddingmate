import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './util/store'
import mixins from './util/mixins'
import './views/mypage/mypage.css'

const app = createApp(App);
app.use(store);
app.mixin(mixins);
app.use(router).mount('#app');
