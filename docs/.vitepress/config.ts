import { defineConfig } from "vitepress";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";

// https://vitepress.dev/reference/site-config
export default () => {
  const PRACTICE_BASE_PATH = "/blog/practice/";
  const NOTES_BASE_PATH = "/blog/notes/";
  return defineConfig({
    vite: {
      plugins: [
        AutoImport({
          imports: ["vue"],
          dts: true,
        }),
      ],
    },
    title: "ginlon的定义域",
    lastUpdated: true,
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      logo: "/avatar.jpg",
      nav: [
        { text: "首页", link: "/" },
        { text: "文章", link: "/blog/" },
        { text: "日志", link: "/journal/" },
        { text: "关于", link: "/author/" },
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
            text: "笔记",
            items: [
              {
                text: "CSS 基础知识",
                link: `${NOTES_BASE_PATH}CSS基础知识.md`,
              },
              {
                text: "页面性能优化",
                link: `${NOTES_BASE_PATH}页面性能优化.md`,
              },
            ],
          },
        ],
        "/journal": [],
      },

      socialLinks: [{ icon: "github", link: "https://github.com/Gao-Jinlong" }],
    },
  });
};
