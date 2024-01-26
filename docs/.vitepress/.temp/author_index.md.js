import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs } from "vue/server-renderer";
import { ElTimeline, ElTimelineItem, ElCard } from "element-plus/es";
import "element-plus/es/components/base/style/css";
import "element-plus/es/components/card/style/css";
import "element-plus/es/components/timeline-item/style/css";
import "element-plus/es/components/timeline/style/css";
import { defineComponent, ref, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TimeLine",
  __ssrInlineRender: true,
  setup(__props) {
    const myTimeLine = ref([
      {
        startTime: "2022-08",
        endTime: "now",
        title: "web 开发",
        organize: "上海地听信息科技有限公司"
      },
      {
        startTime: "2022-08",
        endTime: "2023-07",
        title: "前端开发工程师",
        organize: "青岛拓宇数智科技有限公司"
      },
      {
        startTime: "2018-09",
        endTime: "2022-06",
        title: "数字媒体技术（学士学位）",
        organize: "潍坊学院"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_timeline = ElTimeline;
      const _component_el_timeline_item = ElTimelineItem;
      const _component_el_card = ElCard;
      _push(ssrRenderComponent(_component_el_timeline, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(myTimeLine), (item) => {
              _push2(ssrRenderComponent(_component_el_timeline_item, {
                timestamp: `${item.startTime} - ${item.endTime}`,
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, { class: "timeLine__card" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(item.title)}</span><span class="sub-title"${_scopeId3}>${ssrInterpolate(item.organize)}</span>`);
                        } else {
                          return [
                            createVNode("span", null, toDisplayString(item.title), 1),
                            createVNode("span", { class: "sub-title" }, toDisplayString(item.organize), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, { class: "timeLine__card" }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(item.title), 1),
                          createVNode("span", { class: "sub-title" }, toDisplayString(item.organize), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(myTimeLine), (item) => {
                return openBlock(), createBlock(_component_el_timeline_item, {
                  timestamp: `${item.startTime} - ${item.endTime}`,
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, { class: "timeLine__card" }, {
                      default: withCtx(() => [
                        createVNode("span", null, toDisplayString(item.title), 1),
                        createVNode("span", { class: "sub-title" }, toDisplayString(item.organize), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["timestamp"]);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const TimeLine_vue_vue_type_style_index_0_lang = "";
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("author/components/TimeLine.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"author/index.md","filePath":"author/index.md","lastUpdated":1706256230000}');
const __default__ = { name: "author/index.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="经历" tabindex="-1">经历 <a class="header-anchor" href="#经历" aria-label="Permalink to &quot;经历&quot;">​</a></h2>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<h2 id="技术栈" tabindex="-1">技术栈 <a class="header-anchor" href="#技术栈" aria-label="Permalink to &quot;技术栈&quot;">​</a></h2><h3 id="前端技术栈" tabindex="-1">前端技术栈 <a class="header-anchor" href="#前端技术栈" aria-label="Permalink to &quot;前端技术栈&quot;">​</a></h3><ul><li>vue3</li><li>typescript</li><li>微信小程序</li><li>scss、less、tailwindcss</li><li>webpack、vite</li></ul><h3 id="后端技术栈" tabindex="-1">后端技术栈 <a class="header-anchor" href="#后端技术栈" aria-label="Permalink to &quot;后端技术栈&quot;">​</a></h3><ul><li>nestjs</li><li>redis</li><li>mysql</li><li>docker</li><li>nginx</li></ul><h3 id="其他技术栈" tabindex="-1">其他技术栈 <a class="header-anchor" href="#其他技术栈" aria-label="Permalink to &quot;其他技术栈&quot;">​</a></h3><ul><li>rust</li></ul></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("author/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
