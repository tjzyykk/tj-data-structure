import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

// 引入element UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'  // 中文

// 解决 ElTable 自动宽度高度导致的「ResizeObserver loop limit exceeded」问题
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}

app.use(ElementPlus, {
  locale: zhCn,
});

app.config.globalProperties.$ELEMENT = { size: 'small' };

// 引入element icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app');

// 引入全局样式
import './assets/base.css'



//用于去掉eazyplayer警告,开发时禁用，打包开启
app.config.warnHandler = () => {}
