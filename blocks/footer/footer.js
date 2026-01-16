import { defineComponent as l, createElementBlock as s, openBlock as a, createElementVNode as r } from "vue";
import { createVueBlockDecorator as i } from "../../scripts/vue-utils.js";
const f = { class: "portal-footer" }, _ = { class: "portal-footer-inner" }, m = ["innerHTML"], d = ["innerHTML"], u = /* @__PURE__ */ l({
  __name: "Footer",
  props: {
    left: {},
    right: {}
  },
  setup(t) {
    return (e, o) => (a(), s("footer", f, [
      r("div", _, [
        r("div", {
          class: "portal-footer-left",
          innerHTML: t.left
        }, null, 8, m),
        r("div", {
          class: "portal-footer-right",
          innerHTML: t.right
        }, null, 8, d)
      ])
    ]));
  }
});
function p(t) {
  const e = (/* @__PURE__ */ new Date()).getFullYear(), o = Array.from(t.querySelectorAll("td")), n = (o[0]?.textContent || "").trim(), c = (o[1]?.innerHTML || "").trim();
  return {
    left: n ? `${n} ${e}` : `${e}`,
    right: c
  };
}
const h = p, H = i(u, h);
export {
  H as default
};
