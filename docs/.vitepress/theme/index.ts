import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import Copyright from "../../components/Copyright.vue";
import { useData } from "vitepress";

const { Layout } = DefaultTheme;

export default {
  ...DefaultTheme,
  Layout() {
    return h(Layout, null, {
      "layout-bottom": () => h(Copyright),
    });
  },
};
