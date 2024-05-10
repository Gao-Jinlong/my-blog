import { createI18n, type I18nOptions } from "vue-i18n";

const i18nConfig: I18nOptions = {
  legacy: false,
  // locale: "zh-CN",
  fallbackLocale: "zh-CN",
  messages: {
    en: {
      home: {
        hero: {
          hello: "Hello, World!",
          selfIntroduction: "I'm Ginlon",
          slogan1: "A Frontend Engineer",
          slogan2: "Coding Enthusiast",
          tagline: "The only way to know for sure is to try.",
        },
        button: {
          aboutMe: "About Me",
          blog: "Blog & Notes",
          contact: "Contact Me",
        },
      },
    },
    zh: {
      home: {
        hero: {
          hello: "你好，世界！",
          selfIntroduction: "我是 Ginlon",
          slogan1: "一名前端工程师",
          slogan2: "一个编程爱好者",
          tagline: "绝知此事，定要躬行",
        },
        button: {
          aboutMe: "关于我",
          blog: "博客 & 笔记",
          contact: "联系我",
        },
      },
    },
    ja: {
      home: {
        hero: {
          hello: "こんにちは、世界！",
          selfIntroduction: "私は Ginlon です",
          slogan1: "フロントエンドエンジニア",
          slogan2: "プログラミング愛好家",
        },
        button: {
          aboutMe: "私について",
          blog: "ブログ&ノート",
          contact: "お問い合わせ",
        },
      },
    },
  },
};
const i18n = createI18n(i18nConfig);
export default i18n;
