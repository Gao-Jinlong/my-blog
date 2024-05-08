import { defineConfig } from "vitepress";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import { fileURLToPath, URL } from "node:url";

// https://vitepress.dev/reference/site-config
export default () => {
  const PRACTICE_BASE_PATH = "/blog/practice";
  const NOTES_BASE_PATH = "/blog/notes";
  return defineConfig({
    vite: {
      plugins: [
        AutoImport({
          imports: ["vue"],
          dts: true,
        }),
      ],
      resolve: {
        // 使用 alias 覆盖源码中的默认 alias，从而达到替换默认组件的目的
        alias: [
          {
            find: /^.*\/VPHero\.vue$/,
            replacement: fileURLToPath(
              new URL("./components/MyHero.vue", import.meta.url)
            ),
          },
        ],
      },
    },
    head: [
      [
        "script",
        {
          async: "",
          src: "https://www.googletagmanager.com/gtag/js?id=G-TD35ZQXL2E",
          crossorigin: "anonymous",
        },
      ],
      [
        "script",
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-TD35ZQXL2E');`,
      ],
      [
        "script",
        {},
        `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "m0nmyla1jj");`,
      ],
    ],
    title: "ginlon的定义域",
    lastUpdated: true,
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      logo: "/avatar.jpg",
      outline: [2, 4],
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
                link: `${PRACTICE_BASE_PATH}/搭建阿里云服务器.md`,
              },
              {
                text: "我的响应式是如何丢掉的",
                link: `${PRACTICE_BASE_PATH}/我的响应式是如何丢掉的.md`,
              },
              {
                text: "前端项目搭建",
                link: `${PRACTICE_BASE_PATH}/前端项目搭建.md`,
              },
              // {
              //   text: "openlayers with OffscreenCanvas",
              //   link: `${PRACTICE_BASE_PATH}/openlayersWithOffscreenCanvas/index.md`,
              // },
            ],
          },
          {
            text: "笔记",
            items: [
              {
                text: "CSS 基础知识",
                link: `${NOTES_BASE_PATH}/CSS基础知识/index.md`,
              },
              {
                text: "性能优化",
                link: `${NOTES_BASE_PATH}/性能优化/index.md`,
              },
              {
                text: "编程实践",
                link: `${NOTES_BASE_PATH}/编程实践/index.md`,
              },
            ],
          },
          {
            text: "demo-test",
            items: [
              {
                text: "VideoDecoder",
                link: `${NOTES_BASE_PATH}/VideoDecoder/index.md`,
              },
              {
                text: "rolldown源码学习",
                link: `${NOTES_BASE_PATH}/rolldown源码/index.md`,
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
