import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import MyLayout from "./Layout.vue";
import { i18nConfig } from "../i18n";
import { get } from "lodash-es";

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    const $t = (path) => {
      return get(i18nConfig.messages!.en, path, "");
    };
    app.provide("$t", $t);
    app.use(ElementPlus);
  },
};
