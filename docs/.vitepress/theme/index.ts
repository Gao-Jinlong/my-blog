import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import Copyright from "../../components/Copyright.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const { Layout } = DefaultTheme;

export default {
  ...DefaultTheme,
  Layout() {
    return h(Layout, null, {
      "layout-bottom": () => h(Copyright),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus);
  },
};
