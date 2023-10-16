import { defineConfig } from "vitepress";
import { nav } from "./utils/nav";
import { getBlogCategory } from "./utils/getBlogCategory";
// https://vitepress.dev/reference/site-config
getBlogCategory();
export default () => {
  return defineConfig({
    title: "Ginlon's blog",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      logo: "/avatar.jpg",
      nav: nav,
      sidebar: [
        {
          text: "施工中...",
          items: [],
        },
      ],

      socialLinks: [{ icon: "github", link: "https://github.com/Gao-Jinlong" }],
    },
  });
};
