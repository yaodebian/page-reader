import { createApp } from "vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from "./App.vue";

const app = createApp(App)
app.use(ElementPlus)
try {
  app.mount('#app')
} catch (error) {
  console.error('应用挂载失败：', error)
}
