import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import router from "./router";

createApp(App).use(router).mount("#app");

/*
const app = createApp(app)

app.use(createPinia())
app.use(router)
app.use(bootstrap)

app.mount('#app') 
*/
