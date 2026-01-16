import { defineComponent as k, ref as p, createElementBlock as s, openBlock as c, normalizeClass as v, createCommentVNode as l, createElementVNode as u, toDisplayString as m, Fragment as x, renderList as H } from "vue";
import { createVueBlockDecorator as N } from "../../scripts/vue-utils.js";
import { createOptimizedPicture as b } from "../../scripts/aem.js";
const _ = {
  key: 0,
  class: "nav-brand"
}, A = { class: "nav-brand-container" }, S = ["innerHTML"], M = {
  key: 1,
  class: "nav-brand-name"
}, T = { class: "nav-header" }, B = ["aria-label"], q = {
  key: 0,
  class: "nav-title"
}, I = { class: "nav-list" }, E = ["href", "title"], R = ["innerHTML"], z = {
  key: 1,
  class: "nav-label"
}, D = /* @__PURE__ */ k({
  __name: "Nav",
  props: {
    items: {},
    title: {},
    defaultCollapsed: { type: Boolean, default: !1 },
    brandName: {},
    brandLogo: {}
  },
  setup(t) {
    const e = p(t.defaultCollapsed);
    return (i, o) => (c(), s(
      "nav",
      {
        class: v(["nav-sidebar", { "nav-collapsed": e.value }])
      },
      [
        l(" Brand Banner "),
        t.brandName || t.brandLogo ? (c(), s("div", _, [
          u("div", A, [
            t.brandLogo ? (c(), s("div", {
              key: 0,
              class: "nav-brand-logo",
              innerHTML: t.brandLogo
            }, null, 8, S)) : l("v-if", !0),
            t.brandName && !e.value ? (c(), s(
              "span",
              M,
              m(t.brandName),
              1
              /* TEXT */
            )) : l("v-if", !0)
          ])
        ])) : l("v-if", !0),
        u("div", T, [
          u("button", {
            class: "nav-toggle",
            onClick: o[0] || (o[0] = (a) => e.value = !e.value),
            "aria-label": e.value ? "Expand navigation" : "Collapse navigation"
          }, [...o[1] || (o[1] = [
            u(
              "span",
              { class: "nav-toggle-icon" },
              "☰",
              -1
              /* CACHED */
            )
          ])], 8, B),
          !e.value && t.title ? (c(), s(
            "h2",
            q,
            m(t.title),
            1
            /* TEXT */
          )) : l("v-if", !0)
        ]),
        u("ul", I, [
          (c(!0), s(
            x,
            null,
            H(t.items, (a, d) => (c(), s(
              "li",
              {
                key: d,
                class: v(["nav-item", { active: a.active }])
              },
              [
                u("a", {
                  href: a.link,
                  class: "nav-link",
                  title: a.name
                }, [
                  a.icon ? (c(), s("span", {
                    key: 0,
                    class: "nav-icon",
                    innerHTML: a.icon
                  }, null, 8, R)) : l("v-if", !0),
                  a.name ? (c(), s(
                    "span",
                    z,
                    m(a.name),
                    1
                    /* TEXT */
                  )) : l("v-if", !0)
                ], 8, E)
              ],
              2
              /* CLASS */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ],
      2
      /* CLASS */
    ));
  }
});
function g(t) {
  return (t?.textContent || "").trim();
}
function C(t) {
  return g(t).toLowerCase();
}
function P(t) {
  return (t?.innerHTML || "").trim();
}
function h(t) {
  if (!t) return "";
  const n = t.querySelector("a");
  return n?.href ? n.href : g(t);
}
function V(t, n) {
  if (!t) return "";
  const e = t.querySelector("img") || t.querySelector("picture img");
  if (!e?.getAttribute("src")) return "";
  const i = e.getAttribute("src"), o = n.alt ?? e.getAttribute("alt") ?? "";
  return b(i, o, !1, [{ width: String(n.width) }]).outerHTML;
}
function O(t, n) {
  return V(t, n) || P(t);
}
function U(t, n) {
  if (!t) return "";
  const e = t.querySelector("img");
  if (e?.getAttribute("src"))
    return b(e.getAttribute("src"), e.getAttribute("alt") ?? "", !1, [{ width: String(n.width) }]).outerHTML;
  const i = t.querySelector("svg");
  return i ? i.outerHTML : g(t);
}
function Z(t, n) {
  const e = Array.isArray(n) ? n : [n];
  return t.findIndex((i) => {
    const o = [...i.children];
    if (o.length < 1) return !1;
    const a = C(o[0]);
    return e.includes(a);
  });
}
function $(t, n) {
  const e = n.toLowerCase();
  for (const i of t) {
    const o = [...i.children];
    if (!(o.length < 2) && C(o[0]) === e)
      return { row: i, cells: o };
  }
  return null;
}
function j(t) {
  const n = {};
  return [...t.children].forEach((i) => {
    const o = [...i.children];
    if (o.length < 2) return;
    const a = o[0];
    if (!(a.querySelector("img") !== null)) {
      const f = G(a.textContent?.trim() || ""), r = o[1].textContent?.trim() || "";
      f && r && (n[f] = r);
    }
  }), n;
}
function G(t) {
  return t.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s(.)/g, (n, e) => e.toUpperCase()).replace(/^(.)/, (n, e) => e.toLowerCase());
}
function J(t) {
  const n = j(t), e = [...t.children], i = $(e, "brand logo"), o = i ? O(i.cells[1], { width: 200 }) : "", a = Z(e, ["icon", "name", "link"]), d = a >= 0 ? a + 1 : 0;
  return {
    items: e.slice(d).map((r) => [...r.children]).filter((r) => r.length >= 2).filter((r) => !["brand logo", "icon"].includes((r[0].textContent || "").trim().toLowerCase())).map((r) => {
      const y = r.length >= 3 ? U(r[0], { width: 56 }) : "", L = r.length >= 3 ? (r[1].textContent || "").trim() : (r[0].textContent || "").trim(), w = r.length >= 3 ? h(r[2]) : h(r[1]);
      return { icon: y || void 0, name: L, link: w };
    }).filter((r) => r.name && r.link),
    title: n.title,
    defaultCollapsed: n.defaultCollapsed === "true",
    brandName: n.brandName,
    brandLogo: o
  };
}
const K = J, Y = N(D, K);
export {
  Y as default
};
