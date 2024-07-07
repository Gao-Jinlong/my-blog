import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import MyLayout from "./Layout.vue";
import { i18nConfig } from "../i18n";
import { get } from "lodash-es";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

import "@mdi/font/css/materialdesignicons.css";
import useMessage from "../components/v-message/useMessage";
import VMessage from "../components/v-message/VMessage.vue";

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    const $t = (path) => {
      return get(i18nConfig.messages!.en, path, "");
    };

    const message = useMessage();
    console.log("🚀 ~ enhanceApp ~ message:", message);

    const myCustomLightTheme = {
      dark: false,
      colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        "surface-bright": "#FFFFFF",
        "surface-light": "#EEEEEE",
        "surface-variant": "#424242",
        "on-surface-variant": "#EEEEEE",
        primary: "#1867C0",
        "primary-darken-1": "#1F5592",
        secondary: "#48A9A6",
        "secondary-darken-1": "#018786",
        error: "#B00020",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
      variables: {
        "border-color": "#000000",
        "border-opacity": 0.12,
        "high-emphasis-opacity": 0.87,
        "medium-emphasis-opacity": 0.6,
        "disabled-opacity": 0.38,
        "idle-opacity": 0.04,
        "hover-opacity": 0.04,
        "focus-opacity": 0.12,
        "selected-opacity": 0.08,
        "activated-opacity": 0.12,
        "pressed-opacity": 0.12,
        "dragged-opacity": 0.08,
        "theme-kbd": "#212529",
        "theme-on-kbd": "#FFFFFF",
        "theme-code": "#F5F5F5",
        "theme-on-code": "#000000",
      },
    };

    const vuetify = createVuetify({
      icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
          mdi,
        },
      },
      theme: {
        defaultTheme: "myCustomLightTheme",
        themes: {
          myCustomLightTheme,
        },
      },
      aliases: {
        VBtnSecondary: components.VBtn,
        VBtnTertiary: components.VBtn,
      },
      defaults: {
        VBtn: {
          color: "primary",
          variant: "elevated",
        },
        VBtnSecondary: {
          color: "danger",
          variant: "flat",
        },
        VBtnTertiary: {
          rounded: true,
          variant: "plain",
        },
      },
      components,
      directives,
    });

    app.component("VMessage", VMessage);
    app.provide("$t", $t);
    app.provide("$message", message);
    app.use(ElementPlus).use(vuetify);
  },
};
