import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import MyLayout from "./Layout.vue";
import i18n from "../i18n";

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    i18n.global.locale = siteData.lang;
    app.use(ElementPlus);
    app.use(i18n);
  },
};
