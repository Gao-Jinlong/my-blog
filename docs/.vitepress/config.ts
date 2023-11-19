import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default () => {
  const PRACTICE_BASE_PATH = "/blog/practice/";
  const NOTES_BASE_PATH = "/blog/notes/";
  return defineConfig({
    title: "blog",
    lastUpdated: true,
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      logo: "/avatar.jpg",
      nav: [
        { text: "Home", link: "/" },
        { text: "Blog", link: "/blog/" },
        { text: "Author", link: "/author/" },
      ],
      search: {
        provider: "local",
      },
      sidebar: {
        "/blog/": [
          {
            text: "实践",
            items: [
              {
                text: "搭建阿里云服务器",
                link: `${PRACTICE_BASE_PATH}搭建阿里云服务器.md`,
              },
              {
                text: "我的响应式是如何丢掉的",
                link: `${PRACTICE_BASE_PATH}我的响应式是如何丢掉的.md`,
              },
              {
                text: "前端项目搭建",
                link: `${PRACTICE_BASE_PATH}前端项目搭建.md`,
              },
            ],
          },
          {
            text: "CSS",
            items: [
              {
                text: "CSS 基础知识",
                link: `${NOTES_BASE_PATH}CSS 基础知识.md`,
              },
            ],
          },
        ],
      },

      socialLinks: [{ icon: "github", link: "https://github.com/Gao-Jinlong" }],
    },
  });
};
