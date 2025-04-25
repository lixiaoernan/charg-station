import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "virtual:windi.css";
import "./style.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");

// 在main.ts中按需加载
if (import.meta.env.DEV) {
  import("./mock").then(({ default: mock }) => {
    console.log("Mock enabled");
  });
}

// 全局注册所有图标
for (const [componentName, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(componentName, component);
}
