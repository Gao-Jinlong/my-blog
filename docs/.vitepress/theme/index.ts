import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import Copyright from "../../components/Copyright.vue";

console.log("defaultTheme", DefaultTheme);

const { Layout } = DefaultTheme;
export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(Copyright),
    });
  },
};
