import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse(`{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"你好","text":"我是 Ginlon","tagline":"平平无奇程序员","image":{"src":"https://avatars.githubusercontent.com/u/41514616?v=4","alt":"Ginlon's avatar"},"actions":[{"theme":"brand","text":"博客文档","link":"/blog/index"},{"theme":"alt","text":"关于","link":"/author/index"}]},"features":[{"title":"github","icon":"🐙","details":"https://github.com/Gao-Jinlong","link":"https://github.com/Gao-Jinlong"},{"title":"掘金","icon":"🏆","details":"https://juejin.cn/user/2775585439885320","link":"https://juejin.cn/user/2775585439885320"},{"title":"邮箱","icon":"📧","details":"ginlon5241@gmail.com","link":"mailto:ginlon5241@gmail.com"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1702695837000}`);
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
