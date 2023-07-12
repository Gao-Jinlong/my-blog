import { defineConfig } from "vitepress";
import { nav } from "./utils/nav";
import { getBlogCategory } from "./utils/getBlogCategory";
// https://vitepress.dev/reference/site-config
getBlogCategory();
export default () => {
  return defineConfig({
    title: "Ginlon's blog",
    description: "growth is the only thing that matters",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      logo: "/avatar.jpg",
      nav: nav,
      sidebar: [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],

      socialLinks: [
        { icon: "github", link: "https://github.com/vuejs/vitepress" },
      ],
    },
  });
};
