import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"文档记录","description":"","frontmatter":{},"headers":[],"relativePath":"blog/index.md","filePath":"blog/index.md","lastUpdated":1706238910000}');
const _sfc_main = { name: "blog/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Badge = resolveComponent("Badge");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="文档记录" tabindex="-1">文档记录 <a class="header-anchor" href="#文档记录" aria-label="Permalink to &quot;文档记录&quot;">​</a></h1><h3 id="实践" tabindex="-1">实践 <a class="header-anchor" href="#实践" aria-label="Permalink to &quot;实践&quot;">​</a></h3><p>编程中总结的经验，架构、API、业务等等</p><h3 id="读书笔记" tabindex="-1">读书笔记 <a class="header-anchor" href="#读书笔记" aria-label="Permalink to &quot;读书笔记&quot;">​</a></h3><p>读书过程中做的摘要，思考，总结</p><h3 id="文档" tabindex="-1">文档 <a class="header-anchor" href="#文档" aria-label="Permalink to &quot;文档&quot;">​</a></h3><p>学习技术的过程中，做的笔记，遇到及解决的问题</p><h2 id="todo" tabindex="-1">TODO <a class="header-anchor" href="#todo" aria-label="Permalink to &quot;TODO&quot;">​</a></h2><h3 id="实践-1" tabindex="-1">实践 <a class="header-anchor" href="#实践-1" aria-label="Permalink to &quot;实践&quot;">​</a></h3><ul><li>[ ] 开放图谱协议（The Open Graph protocol） `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "pending",
    type: "info"
  }, null, _parent));
  _push(`</li><li>[ ] 服务端渲染 `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "pending",
    type: "info"
  }, null, _parent));
  _push(`</li><li>[ ] 多媒体流 `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "pending",
    type: "info"
  }, null, _parent));
  _push(`</li><li>[ ] http 缓存 `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "pending",
    type: "info"
  }, null, _parent));
  _push(`</li><li>[ ] buffer `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "pending",
    type: "info"
  }, null, _parent));
  _push(`</li><li>[ ] sass 主题切换 `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "pending",
    type: "info"
  }, null, _parent));
  _push(`</li><li>[ ] 跨站登录状态 `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "pending",
    type: "info"
  }, null, _parent));
  _push(`</li></ul><h3 id="读书笔记-1" tabindex="-1">读书笔记 <a class="header-anchor" href="#读书笔记-1" aria-label="Permalink to &quot;读书笔记&quot;">​</a></h3><ul><li>[ ] 图解 HTTP `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "delay",
    type: "danger"
  }, null, _parent));
  _push(`</li><li>[ ] 《clean code 代码整洁之道》 `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "delay",
    type: "danger"
  }, null, _parent));
  _push(`</li><li>[ ] 《clean architecture 架构整洁之道》 `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "doing",
    type: "tip"
  }, null, _parent));
  _push(`</li></ul><h3 id="文档-1" tabindex="-1">文档 <a class="header-anchor" href="#文档-1" aria-label="Permalink to &quot;文档&quot;">​</a></h3><ul><li>[ ] clean code 整洁代码实践 `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "doing",
    type: "tip"
  }, null, _parent));
  _push(`</li><li>[ ] 代码规范 `);
  _push(ssrRenderComponent(_component_Badge, {
    text: "pending",
    type: "info"
  }, null, _parent));
  _push(`</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("blog/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
