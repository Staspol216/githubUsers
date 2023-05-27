import { createApp } from 'vue';
import App from './app/App.vue';
import router from './router/index';
import store from './store/index';

const app = createApp(App).use(router).use(store);
app.mount('#app');