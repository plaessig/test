import { ref as z, readonly as ze, getCurrentInstance as Ge, onMounted as Xe, nextTick as Ye, watch as Ze, mergeProps as P, createElementBlock as O, openBlock as C, createCommentVNode as x, createElementVNode as j, renderSlot as T, createTextVNode as je, toDisplayString as oe, resolveComponent as pe, resolveDirective as Je, withDirectives as Qe, createBlock as Q, normalizeClass as ee, defineComponent as et, Fragment as ge, normalizeStyle as tt, renderList as nt, unref as me, createSlots as rt, withCtx as N, createVNode as it } from "vue";
import { createVueBlockDecorator as ot } from "../../scripts/vue-utils.js";
import { createOptimizedPicture as at } from "../../scripts/aem.js";
function G(n, e) {
  var t = typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (!t) {
    if (Array.isArray(n) || (t = ae(n)) || e) {
      t && (n = t);
      var r = 0, i = function() {
      };
      return { s: i, n: function() {
        return r >= n.length ? { done: !0 } : { done: !1, value: n[r++] };
      }, e: function(l) {
        throw l;
      }, f: i };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var o = !0, a = !1, s;
  return { s: function() {
    t = t.call(n);
  }, n: function() {
    var l = t.next();
    return o = l.done, l;
  }, e: function(l) {
    a = !0, s = l;
  }, f: function() {
    try {
      !o && t.return != null && t.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function st(n) {
  return dt(n) || lt(n) || ae(n) || ut();
}
function ut() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lt(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function dt(n) {
  if (Array.isArray(n)) return te(n);
}
function k(n) {
  "@babel/helpers - typeof";
  return k = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, k(n);
}
function X(n, e) {
  return pt(n) || ft(n, e) || ae(n, e) || ct();
}
function ct() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ae(n, e) {
  if (n) {
    if (typeof n == "string") return te(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set") return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return te(n, e);
  }
}
function te(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = n[t];
  return r;
}
function ft(n, e) {
  var t = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (t != null) {
    var r, i, o, a, s = [], u = !0, l = !1;
    try {
      if (o = (t = t.call(n)).next, e !== 0) for (; !(u = (r = o.call(t)).done) && (s.push(r.value), s.length !== e); u = !0) ;
    } catch (d) {
      l = !0, i = d;
    } finally {
      try {
        if (!u && t.return != null && (a = t.return(), Object(a) !== a)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function pt(n) {
  if (Array.isArray(n)) return n;
}
var _ = {
  innerWidth: function(e) {
    if (e) {
      var t = e.offsetWidth, r = getComputedStyle(e);
      return t += parseFloat(r.paddingLeft) + parseFloat(r.paddingRight), t;
    }
    return 0;
  },
  width: function(e) {
    if (e) {
      var t = e.offsetWidth, r = getComputedStyle(e);
      return t -= parseFloat(r.paddingLeft) + parseFloat(r.paddingRight), t;
    }
    return 0;
  },
  getWindowScrollTop: function() {
    var e = document.documentElement;
    return (window.pageYOffset || e.scrollTop) - (e.clientTop || 0);
  },
  getWindowScrollLeft: function() {
    var e = document.documentElement;
    return (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0);
  },
  getOuterWidth: function(e, t) {
    if (e) {
      var r = e.offsetWidth;
      if (t) {
        var i = getComputedStyle(e);
        r += parseFloat(i.marginLeft) + parseFloat(i.marginRight);
      }
      return r;
    }
    return 0;
  },
  getOuterHeight: function(e, t) {
    if (e) {
      var r = e.offsetHeight;
      if (t) {
        var i = getComputedStyle(e);
        r += parseFloat(i.marginTop) + parseFloat(i.marginBottom);
      }
      return r;
    }
    return 0;
  },
  getClientHeight: function(e, t) {
    if (e) {
      var r = e.clientHeight;
      if (t) {
        var i = getComputedStyle(e);
        r += parseFloat(i.marginTop) + parseFloat(i.marginBottom);
      }
      return r;
    }
    return 0;
  },
  getViewport: function() {
    var e = window, t = document, r = t.documentElement, i = t.getElementsByTagName("body")[0], o = e.innerWidth || r.clientWidth || i.clientWidth, a = e.innerHeight || r.clientHeight || i.clientHeight;
    return {
      width: o,
      height: a
    };
  },
  getOffset: function(e) {
    if (e) {
      var t = e.getBoundingClientRect();
      return {
        top: t.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
        left: t.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index: function(e) {
    if (e)
      for (var t, r = (t = this.getParentNode(e)) === null || t === void 0 ? void 0 : t.childNodes, i = 0, o = 0; o < r.length; o++) {
        if (r[o] === e) return i;
        r[o].nodeType === 1 && i++;
      }
    return -1;
  },
  addMultipleClasses: function(e, t) {
    var r = this;
    e && t && [t].flat().filter(Boolean).forEach(function(i) {
      return i.split(" ").forEach(function(o) {
        return r.addClass(e, o);
      });
    });
  },
  removeMultipleClasses: function(e, t) {
    var r = this;
    e && t && [t].flat().filter(Boolean).forEach(function(i) {
      return i.split(" ").forEach(function(o) {
        return r.removeClass(e, o);
      });
    });
  },
  addClass: function(e, t) {
    e && t && !this.hasClass(e, t) && (e.classList ? e.classList.add(t) : e.className += " " + t);
  },
  removeClass: function(e, t) {
    e && t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "));
  },
  hasClass: function(e, t) {
    return e ? e.classList ? e.classList.contains(t) : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className) : !1;
  },
  addStyles: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    e && Object.entries(t).forEach(function(r) {
      var i = X(r, 2), o = i[0], a = i[1];
      return e.style[o] = a;
    });
  },
  find: function(e, t) {
    return this.isElement(e) ? e.querySelectorAll(t) : [];
  },
  findSingle: function(e, t) {
    return this.isElement(e) ? e.querySelector(t) : null;
  },
  createElement: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (e) {
      var r = document.createElement(e);
      this.setAttributes(r, t);
      for (var i = arguments.length, o = new Array(i > 2 ? i - 2 : 0), a = 2; a < i; a++)
        o[a - 2] = arguments[a];
      return r.append.apply(r, o), r;
    }
  },
  setAttribute: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", r = arguments.length > 2 ? arguments[2] : void 0;
    this.isElement(e) && r !== null && r !== void 0 && e.setAttribute(t, r);
  },
  setAttributes: function(e) {
    var t = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.isElement(e)) {
      var i = function o(a, s) {
        var u, l, d = e != null && (u = e.$attrs) !== null && u !== void 0 && u[a] ? [e == null || (l = e.$attrs) === null || l === void 0 ? void 0 : l[a]] : [];
        return [s].flat().reduce(function(c, f) {
          if (f != null) {
            var p = k(f);
            if (p === "string" || p === "number")
              c.push(f);
            else if (p === "object") {
              var y = Array.isArray(f) ? o(a, f) : Object.entries(f).map(function(h) {
                var g = X(h, 2), v = g[0], w = g[1];
                return a === "style" && (w || w === 0) ? "".concat(v.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), ":").concat(w) : w ? v : void 0;
              });
              c = y.length ? c.concat(y.filter(function(h) {
                return !!h;
              })) : c;
            }
          }
          return c;
        }, d);
      };
      Object.entries(r).forEach(function(o) {
        var a = X(o, 2), s = a[0], u = a[1];
        if (u != null) {
          var l = s.match(/^on(.+)/);
          l ? e.addEventListener(l[1].toLowerCase(), u) : s === "p-bind" ? t.setAttributes(e, u) : (u = s === "class" ? st(new Set(i("class", u))).join(" ").trim() : s === "style" ? i("style", u).join(";").trim() : u, (e.$attrs = e.$attrs || {}) && (e.$attrs[s] = u), e.setAttribute(s, u));
        }
      });
    }
  },
  getAttribute: function(e, t) {
    if (this.isElement(e)) {
      var r = e.getAttribute(t);
      return isNaN(r) ? r === "true" || r === "false" ? r === "true" : r : +r;
    }
  },
  isAttributeEquals: function(e, t, r) {
    return this.isElement(e) ? this.getAttribute(e, t) === r : !1;
  },
  isAttributeNotEquals: function(e, t, r) {
    return !this.isAttributeEquals(e, t, r);
  },
  getHeight: function(e) {
    if (e) {
      var t = e.offsetHeight, r = getComputedStyle(e);
      return t -= parseFloat(r.paddingTop) + parseFloat(r.paddingBottom) + parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth), t;
    }
    return 0;
  },
  getWidth: function(e) {
    if (e) {
      var t = e.offsetWidth, r = getComputedStyle(e);
      return t -= parseFloat(r.paddingLeft) + parseFloat(r.paddingRight) + parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), t;
    }
    return 0;
  },
  absolutePosition: function(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (e) {
      var i = e.offsetParent ? {
        width: e.offsetWidth,
        height: e.offsetHeight
      } : this.getHiddenElementDimensions(e), o = i.height, a = i.width, s = t.offsetHeight, u = t.offsetWidth, l = t.getBoundingClientRect(), d = this.getWindowScrollTop(), c = this.getWindowScrollLeft(), f = this.getViewport(), p, y, h = "top";
      l.top + s + o > f.height ? (p = l.top + d - o, h = "bottom", p < 0 && (p = d)) : p = s + l.top + d, l.left + a > f.width ? y = Math.max(0, l.left + c + u - a) : y = l.left + c, e.style.top = p + "px", e.style.left = y + "px", e.style.transformOrigin = h, r && (e.style.marginTop = h === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  relativePosition: function(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (e) {
      var i = e.offsetParent ? {
        width: e.offsetWidth,
        height: e.offsetHeight
      } : this.getHiddenElementDimensions(e), o = t.offsetHeight, a = t.getBoundingClientRect(), s = this.getViewport(), u, l, d = "top";
      a.top + o + i.height > s.height ? (u = -1 * i.height, d = "bottom", a.top + u < 0 && (u = -1 * a.top)) : u = o, i.width > s.width ? l = a.left * -1 : a.left + i.width > s.width ? l = (a.left + i.width - s.width) * -1 : l = 0, e.style.top = u + "px", e.style.left = l + "px", e.style.transformOrigin = d, r && (e.style.marginTop = d === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  nestedPosition: function(e, t) {
    if (e) {
      var r = e.parentElement, i = this.getOffset(r), o = this.getViewport(), a = e.offsetParent ? e.offsetWidth : this.getHiddenElementOuterWidth(e), s = this.getOuterWidth(r.children[0]), u;
      parseInt(i.left, 10) + s + a > o.width - this.calculateScrollbarWidth() ? parseInt(i.left, 10) < a ? t % 2 === 1 ? u = parseInt(i.left, 10) ? "-" + parseInt(i.left, 10) + "px" : "100%" : t % 2 === 0 && (u = o.width - a - this.calculateScrollbarWidth() + "px") : u = "-100%" : u = "100%", e.style.top = "0px", e.style.left = u;
    }
  },
  getParentNode: function(e) {
    var t = e?.parentNode;
    return t && t instanceof ShadowRoot && t.host && (t = t.host), t;
  },
  getParents: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = this.getParentNode(e);
    return r === null ? t : this.getParents(r, t.concat([r]));
  },
  getScrollableParents: function(e) {
    var t = [];
    if (e) {
      var r = this.getParents(e), i = /(auto|scroll)/, o = function(g) {
        try {
          var v = window.getComputedStyle(g, null);
          return i.test(v.getPropertyValue("overflow")) || i.test(v.getPropertyValue("overflowX")) || i.test(v.getPropertyValue("overflowY"));
        } catch {
          return !1;
        }
      }, a = G(r), s;
      try {
        for (a.s(); !(s = a.n()).done; ) {
          var u = s.value, l = u.nodeType === 1 && u.dataset.scrollselectors;
          if (l) {
            var d = l.split(","), c = G(d), f;
            try {
              for (c.s(); !(f = c.n()).done; ) {
                var p = f.value, y = this.findSingle(u, p);
                y && o(y) && t.push(y);
              }
            } catch (h) {
              c.e(h);
            } finally {
              c.f();
            }
          }
          u.nodeType !== 9 && o(u) && t.push(u);
        }
      } catch (h) {
        a.e(h);
      } finally {
        a.f();
      }
    }
    return t;
  },
  getHiddenElementOuterHeight: function(e) {
    if (e) {
      e.style.visibility = "hidden", e.style.display = "block";
      var t = e.offsetHeight;
      return e.style.display = "none", e.style.visibility = "visible", t;
    }
    return 0;
  },
  getHiddenElementOuterWidth: function(e) {
    if (e) {
      e.style.visibility = "hidden", e.style.display = "block";
      var t = e.offsetWidth;
      return e.style.display = "none", e.style.visibility = "visible", t;
    }
    return 0;
  },
  getHiddenElementDimensions: function(e) {
    if (e) {
      var t = {};
      return e.style.visibility = "hidden", e.style.display = "block", t.width = e.offsetWidth, t.height = e.offsetHeight, e.style.display = "none", e.style.visibility = "visible", t;
    }
    return 0;
  },
  fadeIn: function(e, t) {
    if (e) {
      e.style.opacity = 0;
      var r = +/* @__PURE__ */ new Date(), i = 0, o = function a() {
        i = +e.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - r) / t, e.style.opacity = i, r = +/* @__PURE__ */ new Date(), +i < 1 && (window.requestAnimationFrame && requestAnimationFrame(a) || setTimeout(a, 16));
      };
      o();
    }
  },
  fadeOut: function(e, t) {
    if (e)
      var r = 1, i = 50, o = t, a = i / o, s = setInterval(function() {
        r -= a, r <= 0 && (r = 0, clearInterval(s)), e.style.opacity = r;
      }, i);
  },
  getUserAgent: function() {
    return navigator.userAgent;
  },
  appendChild: function(e, t) {
    if (this.isElement(t)) t.appendChild(e);
    else if (t.el && t.elElement) t.elElement.appendChild(e);
    else throw new Error("Cannot append " + t + " to " + e);
  },
  isElement: function(e) {
    return (typeof HTMLElement > "u" ? "undefined" : k(HTMLElement)) === "object" ? e instanceof HTMLElement : e && k(e) === "object" && e !== null && e.nodeType === 1 && typeof e.nodeName == "string";
  },
  scrollInView: function(e, t) {
    var r = getComputedStyle(e).getPropertyValue("borderTopWidth"), i = r ? parseFloat(r) : 0, o = getComputedStyle(e).getPropertyValue("paddingTop"), a = o ? parseFloat(o) : 0, s = e.getBoundingClientRect(), u = t.getBoundingClientRect(), l = u.top + document.body.scrollTop - (s.top + document.body.scrollTop) - i - a, d = e.scrollTop, c = e.clientHeight, f = this.getOuterHeight(t);
    l < 0 ? e.scrollTop = d + l : l + f > c && (e.scrollTop = d + l - c + f);
  },
  clearSelection: function() {
    if (window.getSelection)
      window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0 && window.getSelection().removeAllRanges();
    else if (document.selection && document.selection.empty)
      try {
        document.selection.empty();
      } catch {
      }
  },
  getSelection: function() {
    return window.getSelection ? window.getSelection().toString() : document.getSelection ? document.getSelection().toString() : document.selection ? document.selection.createRange().text : null;
  },
  calculateScrollbarWidth: function() {
    if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;
    var e = document.createElement("div");
    this.addStyles(e, {
      width: "100px",
      height: "100px",
      overflow: "scroll",
      position: "absolute",
      top: "-9999px"
    }), document.body.appendChild(e);
    var t = e.offsetWidth - e.clientWidth;
    return document.body.removeChild(e), this.calculatedScrollbarWidth = t, t;
  },
  calculateBodyScrollbarWidth: function() {
    return window.innerWidth - document.documentElement.offsetWidth;
  },
  getBrowser: function() {
    if (!this.browser) {
      var e = this.resolveUserAgent();
      this.browser = {}, e.browser && (this.browser[e.browser] = !0, this.browser.version = e.version), this.browser.chrome ? this.browser.webkit = !0 : this.browser.webkit && (this.browser.safari = !0);
    }
    return this.browser;
  },
  resolveUserAgent: function() {
    var e = navigator.userAgent.toLowerCase(), t = /(chrome)[ ]([\w.]+)/.exec(e) || /(webkit)[ ]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
    return {
      browser: t[1] || "",
      version: t[2] || "0"
    };
  },
  isVisible: function(e) {
    return e && e.offsetParent != null;
  },
  invokeElementMethod: function(e, t, r) {
    e[t].apply(e, r);
  },
  isExist: function(e) {
    return !!(e !== null && typeof e < "u" && e.nodeName && this.getParentNode(e));
  },
  isClient: function() {
    return !!(typeof window < "u" && window.document && window.document.createElement);
  },
  focus: function(e, t) {
    e && document.activeElement !== e && e.focus(t);
  },
  isFocusableElement: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.isElement(e) ? e.matches('button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(t, `,
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t)) : !1;
  },
  getFocusableElements: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", r = this.find(e, 'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(t, `,
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t, `,
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(t)), i = [], o = G(r), a;
    try {
      for (o.s(); !(a = o.n()).done; ) {
        var s = a.value;
        getComputedStyle(s).display != "none" && getComputedStyle(s).visibility != "hidden" && i.push(s);
      }
    } catch (u) {
      o.e(u);
    } finally {
      o.f();
    }
    return i;
  },
  getFirstFocusableElement: function(e, t) {
    var r = this.getFocusableElements(e, t);
    return r.length > 0 ? r[0] : null;
  },
  getLastFocusableElement: function(e, t) {
    var r = this.getFocusableElements(e, t);
    return r.length > 0 ? r[r.length - 1] : null;
  },
  getNextFocusableElement: function(e, t, r) {
    var i = this.getFocusableElements(e, r), o = i.length > 0 ? i.findIndex(function(s) {
      return s === t;
    }) : -1, a = o > -1 && i.length >= o + 1 ? o + 1 : -1;
    return a > -1 ? i[a] : null;
  },
  getPreviousElementSibling: function(e, t) {
    for (var r = e.previousElementSibling; r; ) {
      if (r.matches(t))
        return r;
      r = r.previousElementSibling;
    }
    return null;
  },
  getNextElementSibling: function(e, t) {
    for (var r = e.nextElementSibling; r; ) {
      if (r.matches(t))
        return r;
      r = r.nextElementSibling;
    }
    return null;
  },
  isClickable: function(e) {
    if (e) {
      var t = e.nodeName, r = e.parentElement && e.parentElement.nodeName;
      return t === "INPUT" || t === "TEXTAREA" || t === "BUTTON" || t === "A" || r === "INPUT" || r === "TEXTAREA" || r === "BUTTON" || r === "A" || !!e.closest(".p-button, .p-checkbox, .p-radiobutton");
    }
    return !1;
  },
  applyStyle: function(e, t) {
    if (typeof t == "string")
      e.style.cssText = t;
    else
      for (var r in t)
        e.style[r] = t[r];
  },
  isIOS: function() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  },
  isAndroid: function() {
    return /(android)/i.test(navigator.userAgent);
  },
  isTouchDevice: function() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  },
  hasCSSAnimation: function(e) {
    if (e) {
      var t = getComputedStyle(e), r = parseFloat(t.getPropertyValue("animation-duration") || "0");
      return r > 0;
    }
    return !1;
  },
  hasCSSTransition: function(e) {
    if (e) {
      var t = getComputedStyle(e), r = parseFloat(t.getPropertyValue("transition-duration") || "0");
      return r > 0;
    }
    return !1;
  },
  exportCSV: function(e, t) {
    var r = new Blob([e], {
      type: "application/csv;charset=utf-8;"
    });
    if (window.navigator.msSaveOrOpenBlob)
      navigator.msSaveOrOpenBlob(r, t + ".csv");
    else {
      var i = document.createElement("a");
      i.download !== void 0 ? (i.setAttribute("href", URL.createObjectURL(r)), i.setAttribute("download", t + ".csv"), i.style.display = "none", document.body.appendChild(i), i.click(), document.body.removeChild(i)) : (e = "data:text/csv;charset=utf-8," + e, window.open(encodeURI(e)));
    }
  },
  blockBodyScroll: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    document.body.style.setProperty("--scrollbar-width", this.calculateBodyScrollbarWidth() + "px"), this.addClass(document.body, e);
  },
  unblockBodyScroll: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    document.body.style.removeProperty("--scrollbar-width"), this.removeClass(document.body, e);
  }
};
function ve(n, e) {
  return vt(n) || mt(n, e) || se(n, e) || gt();
}
function gt() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mt(n, e) {
  var t = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (t != null) {
    var r, i, o, a, s = [], u = !0, l = !1;
    try {
      if (o = (t = t.call(n)).next, e !== 0) for (; !(u = (r = o.call(t)).done) && (s.push(r.value), s.length !== e); u = !0) ;
    } catch (d) {
      l = !0, i = d;
    } finally {
      try {
        if (!u && t.return != null && (a = t.return(), Object(a) !== a)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function vt(n) {
  if (Array.isArray(n)) return n;
}
function ye(n) {
  return bt(n) || ht(n) || se(n) || yt();
}
function yt() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ht(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function bt(n) {
  if (Array.isArray(n)) return ne(n);
}
function Y(n, e) {
  var t = typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (!t) {
    if (Array.isArray(n) || (t = se(n)) || e) {
      t && (n = t);
      var r = 0, i = function() {
      };
      return { s: i, n: function() {
        return r >= n.length ? { done: !0 } : { done: !1, value: n[r++] };
      }, e: function(l) {
        throw l;
      }, f: i };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var o = !0, a = !1, s;
  return { s: function() {
    t = t.call(n);
  }, n: function() {
    var l = t.next();
    return o = l.done, l;
  }, e: function(l) {
    a = !0, s = l;
  }, f: function() {
    try {
      !o && t.return != null && t.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function se(n, e) {
  if (n) {
    if (typeof n == "string") return ne(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set") return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return ne(n, e);
  }
}
function ne(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = n[t];
  return r;
}
function V(n) {
  "@babel/helpers - typeof";
  return V = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, V(n);
}
var m = {
  equals: function(e, t, r) {
    return r ? this.resolveFieldData(e, r) === this.resolveFieldData(t, r) : this.deepEquals(e, t);
  },
  deepEquals: function(e, t) {
    if (e === t) return !0;
    if (e && t && V(e) == "object" && V(t) == "object") {
      var r = Array.isArray(e), i = Array.isArray(t), o, a, s;
      if (r && i) {
        if (a = e.length, a != t.length) return !1;
        for (o = a; o-- !== 0; ) if (!this.deepEquals(e[o], t[o])) return !1;
        return !0;
      }
      if (r != i) return !1;
      var u = e instanceof Date, l = t instanceof Date;
      if (u != l) return !1;
      if (u && l) return e.getTime() == t.getTime();
      var d = e instanceof RegExp, c = t instanceof RegExp;
      if (d != c) return !1;
      if (d && c) return e.toString() == t.toString();
      var f = Object.keys(e);
      if (a = f.length, a !== Object.keys(t).length) return !1;
      for (o = a; o-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(t, f[o])) return !1;
      for (o = a; o-- !== 0; )
        if (s = f[o], !this.deepEquals(e[s], t[s])) return !1;
      return !0;
    }
    return e !== e && t !== t;
  },
  resolveFieldData: function(e, t) {
    if (!e || !t)
      return null;
    try {
      var r = e[t];
      if (this.isNotEmpty(r)) return r;
    } catch {
    }
    if (Object.keys(e).length) {
      if (this.isFunction(t))
        return t(e);
      if (t.indexOf(".") === -1)
        return e[t];
      for (var i = t.split("."), o = e, a = 0, s = i.length; a < s; ++a) {
        if (o == null)
          return null;
        o = o[i[a]];
      }
      return o;
    }
    return null;
  },
  getItemValue: function(e) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
      r[i - 1] = arguments[i];
    return this.isFunction(e) ? e.apply(void 0, r) : e;
  },
  filter: function(e, t, r) {
    var i = [];
    if (e) {
      var o = Y(e), a;
      try {
        for (o.s(); !(a = o.n()).done; ) {
          var s = a.value, u = Y(t), l;
          try {
            for (u.s(); !(l = u.n()).done; ) {
              var d = l.value;
              if (String(this.resolveFieldData(s, d)).toLowerCase().indexOf(r.toLowerCase()) > -1) {
                i.push(s);
                break;
              }
            }
          } catch (c) {
            u.e(c);
          } finally {
            u.f();
          }
        }
      } catch (c) {
        o.e(c);
      } finally {
        o.f();
      }
    }
    return i;
  },
  reorderArray: function(e, t, r) {
    e && t !== r && (r >= e.length && (r %= e.length, t %= e.length), e.splice(r, 0, e.splice(t, 1)[0]));
  },
  findIndexInList: function(e, t) {
    var r = -1;
    if (t) {
      for (var i = 0; i < t.length; i++)
        if (t[i] === e) {
          r = i;
          break;
        }
    }
    return r;
  },
  contains: function(e, t) {
    if (e != null && t && t.length) {
      var r = Y(t), i;
      try {
        for (r.s(); !(i = r.n()).done; ) {
          var o = i.value;
          if (this.equals(e, o)) return !0;
        }
      } catch (a) {
        r.e(a);
      } finally {
        r.f();
      }
    }
    return !1;
  },
  insertIntoOrderedArray: function(e, t, r, i) {
    if (r.length > 0) {
      for (var o = !1, a = 0; a < r.length; a++) {
        var s = this.findIndexInList(r[a], i);
        if (s > t) {
          r.splice(a, 0, e), o = !0;
          break;
        }
      }
      o || r.push(e);
    } else
      r.push(e);
  },
  removeAccents: function(e) {
    return e && e.search(/[\xC0-\xFF]/g) > -1 && (e = e.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y")), e;
  },
  getVNodeProp: function(e, t) {
    if (e) {
      var r = e.props;
      if (r) {
        var i = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), o = Object.prototype.hasOwnProperty.call(r, i) ? i : t;
        return e.type.extends.props[t].type === Boolean && r[o] === "" ? !0 : r[o];
      }
    }
    return null;
  },
  toFlatCase: function(e) {
    return this.isString(e) ? e.replace(/(-|_)/g, "").toLowerCase() : e;
  },
  toKebabCase: function(e) {
    return this.isString(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, function(t, r) {
      return r === 0 ? t : "-" + t.toLowerCase();
    }).toLowerCase() : e;
  },
  toCapitalCase: function(e) {
    return this.isString(e, {
      empty: !1
    }) ? e[0].toUpperCase() + e.slice(1) : e;
  },
  isEmpty: function(e) {
    return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && V(e) === "object" && Object.keys(e).length === 0;
  },
  isNotEmpty: function(e) {
    return !this.isEmpty(e);
  },
  isFunction: function(e) {
    return !!(e && e.constructor && e.call && e.apply);
  },
  isObject: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
  },
  isDate: function(e) {
    return e instanceof Date && e.constructor === Date;
  },
  isArray: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return Array.isArray(e) && (t || e.length !== 0);
  },
  isString: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return typeof e == "string" && (t || e !== "");
  },
  isPrintableCharacter: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return this.isNotEmpty(e) && e.length === 1 && e.match(/\S| /);
  },
  /**
   * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlast
   */
  findLast: function(e, t) {
    var r;
    if (this.isNotEmpty(e))
      try {
        r = e.findLast(t);
      } catch {
        r = ye(e).reverse().find(t);
      }
    return r;
  },
  /**
   * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
   */
  findLastIndex: function(e, t) {
    var r = -1;
    if (this.isNotEmpty(e))
      try {
        r = e.findLastIndex(t);
      } catch {
        r = e.lastIndexOf(ye(e).reverse().find(t));
      }
    return r;
  },
  sort: function(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, i = arguments.length > 3 ? arguments[3] : void 0, o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1, a = this.compare(e, t, i, r), s = r;
    return (this.isEmpty(e) || this.isEmpty(t)) && (s = o === 1 ? r : o), s * a;
  },
  compare: function(e, t, r) {
    var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1, o = -1, a = this.isEmpty(e), s = this.isEmpty(t);
    return a && s ? o = 0 : a ? o = i : s ? o = -i : typeof e == "string" && typeof t == "string" ? o = r(e, t) : o = e < t ? -1 : e > t ? 1 : 0, o;
  },
  localeComparator: function() {
    return new Intl.Collator(void 0, {
      numeric: !0
    }).compare;
  },
  nestedKeys: function() {
    var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return Object.entries(t).reduce(function(i, o) {
      var a = ve(o, 2), s = a[0], u = a[1], l = r ? "".concat(r, ".").concat(s) : s;
      return e.isObject(u) ? i = i.concat(e.nestedKeys(u, l)) : i.push(l), i;
    }, []);
  },
  stringify: function(e) {
    var t = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = " ".repeat(i), a = " ".repeat(i + r);
    return this.isArray(e) ? "[" + e.map(function(s) {
      return t.stringify(s, r, i + r);
    }).join(", ") + "]" : this.isDate(e) ? e.toISOString() : this.isFunction(e) ? e.toString() : this.isObject(e) ? `{
` + Object.entries(e).map(function(s) {
      var u = ve(s, 2), l = u[0], d = u[1];
      return "".concat(a).concat(l, ": ").concat(t.stringify(d, r, i + r));
    }).join(`,
`) + `
`.concat(o) + "}" : JSON.stringify(e);
  }
};
function D(n) {
  "@babel/helpers - typeof";
  return D = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, D(n);
}
function he(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function be(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? he(Object(t), !0).forEach(function(r) {
      $t(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : he(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function $t(n, e, t) {
  return e = St(e), e in n ? Object.defineProperty(n, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : n[e] = t, n;
}
function St(n) {
  var e = wt(n, "string");
  return D(e) == "symbol" ? e : String(e);
}
function wt(n, e) {
  if (D(n) != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e);
    if (D(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function Pt(n) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  Ge() ? Xe(n) : e ? n() : Ye(n);
}
var _t = 0;
function Ie(n) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = z(!1), r = z(n), i = z(null), o = _.isClient() ? window.document : void 0, a = e.document, s = a === void 0 ? o : a, u = e.immediate, l = u === void 0 ? !0 : u, d = e.manual, c = d === void 0 ? !1 : d, f = e.name, p = f === void 0 ? "style_".concat(++_t) : f, y = e.id, h = y === void 0 ? void 0 : y, g = e.media, v = g === void 0 ? void 0 : g, w = e.nonce, I = w === void 0 ? void 0 : w, ue = e.props, We = ue === void 0 ? {} : ue, le = function() {
  }, de = function(Me) {
    var Ne = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (s) {
      var M = be(be({}, We), Ne), Re = M.name || p, fe = M.id || h, Ke = M.nonce || I;
      i.value = s.querySelector('style[data-primevue-style-id="'.concat(Re, '"]')) || s.getElementById(fe) || s.createElement("style"), i.value.isConnected || (r.value = Me || n, _.setAttributes(i.value, {
        type: "text/css",
        id: fe,
        media: v,
        nonce: Ke
      }), s.head.appendChild(i.value), _.setAttribute(i.value, "data-primevue-style-id", p), _.setAttributes(i.value, M)), !t.value && (le = Ze(r, function(qe) {
        i.value.textContent = qe;
      }, {
        immediate: !0
      }), t.value = !0);
    }
  }, Ue = function() {
    !s || !t.value || (le(), _.isExist(i.value) && s.head.removeChild(i.value), t.value = !1);
  };
  return l && !c && Pt(de), {
    id: h,
    name: p,
    css: r,
    unload: Ue,
    load: de,
    isLoaded: ze(t)
  };
}
function F(n) {
  "@babel/helpers - typeof";
  return F = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, F(n);
}
function Ct(n, e) {
  return At(n) || Et(n, e) || Tt(n, e) || Ot();
}
function Ot() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Tt(n, e) {
  if (n) {
    if (typeof n == "string") return $e(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set") return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return $e(n, e);
  }
}
function $e(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = n[t];
  return r;
}
function Et(n, e) {
  var t = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (t != null) {
    var r, i, o, a, s = [], u = !0, l = !1;
    try {
      if (o = (t = t.call(n)).next, e !== 0) for (; !(u = (r = o.call(t)).done) && (s.push(r.value), s.length !== e); u = !0) ;
    } catch (d) {
      l = !0, i = d;
    } finally {
      try {
        if (!u && t.return != null && (a = t.return(), Object(a) !== a)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function At(n) {
  if (Array.isArray(n)) return n;
}
function Se(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function Z(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Se(Object(t), !0).forEach(function(r) {
      xt(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : Se(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function xt(n, e, t) {
  return e = jt(e), e in n ? Object.defineProperty(n, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : n[e] = t, n;
}
function jt(n) {
  var e = It(n, "string");
  return F(e) == "symbol" ? e : String(e);
}
function It(n, e) {
  if (F(n) != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e);
    if (F(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
var kt = `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: var(--scrollbar-width);
}
`, Vt = {}, Dt = {}, E = {
  name: "base",
  css: kt,
  classes: Vt,
  inlineStyles: Dt,
  loadStyle: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.css ? Ie(this.css, Z({
      name: this.name
    }, e)) : {};
  },
  getStyleSheet: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var r = Object.entries(t).reduce(function(i, o) {
        var a = Ct(o, 2), s = a[0], u = a[1];
        return i.push("".concat(s, '="').concat(u, '"')) && i;
      }, []).join(" ");
      return '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(r, ">").concat(this.css).concat(e, "</style>");
    }
    return "";
  },
  extend: function(e) {
    return Z(Z({}, this), {}, {
      css: void 0
    }, e);
  }
};
function B(n) {
  "@babel/helpers - typeof";
  return B = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, B(n);
}
function we(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function Ft(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? we(Object(t), !0).forEach(function(r) {
      Bt(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : we(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function Bt(n, e, t) {
  return e = Lt(e), e in n ? Object.defineProperty(n, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : n[e] = t, n;
}
function Lt(n) {
  var e = Ht(n, "string");
  return B(e) == "symbol" ? e : String(e);
}
function Ht(n, e) {
  if (B(n) != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e);
    if (B(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
var J = E.extend({
  name: "common",
  loadGlobalStyle: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Ie(e, Ft({
      name: "global"
    }, t));
  }
});
function L(n) {
  "@babel/helpers - typeof";
  return L = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, L(n);
}
function Wt(n) {
  return De(n) || Ut(n) || Ve(n) || ke();
}
function Ut(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function R(n, e) {
  return De(n) || Mt(n, e) || Ve(n, e) || ke();
}
function ke() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ve(n, e) {
  if (n) {
    if (typeof n == "string") return Pe(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set") return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return Pe(n, e);
  }
}
function Pe(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = n[t];
  return r;
}
function Mt(n, e) {
  var t = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (t != null) {
    var r, i, o, a, s = [], u = !0, l = !1;
    try {
      if (o = (t = t.call(n)).next, e === 0) {
        if (Object(t) !== t) return;
        u = !1;
      } else for (; !(u = (r = o.call(t)).done) && (s.push(r.value), s.length !== e); u = !0) ;
    } catch (d) {
      l = !0, i = d;
    } finally {
      try {
        if (!u && t.return != null && (a = t.return(), Object(a) !== a)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function De(n) {
  if (Array.isArray(n)) return n;
}
function _e(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function $(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? _e(Object(t), !0).forEach(function(r) {
      K(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : _e(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function K(n, e, t) {
  return e = Nt(e), e in n ? Object.defineProperty(n, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : n[e] = t, n;
}
function Nt(n) {
  var e = Rt(n, "string");
  return L(e) == "symbol" ? e : String(e);
}
function Rt(n, e) {
  if (L(n) != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e);
    if (L(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
var q = {
  name: "BaseComponent",
  props: {
    pt: {
      type: Object,
      default: void 0
    },
    ptOptions: {
      type: Object,
      default: void 0
    },
    unstyled: {
      type: Boolean,
      default: void 0
    }
  },
  inject: {
    $parentInstance: {
      default: void 0
    }
  },
  watch: {
    isUnstyled: {
      immediate: !0,
      handler: function(e) {
        if (!e) {
          var t, r;
          J.loadStyle({
            nonce: (t = this.$primevueConfig) === null || t === void 0 || (t = t.csp) === null || t === void 0 ? void 0 : t.nonce
          }), this.$options.style && this.$style.loadStyle({
            nonce: (r = this.$primevueConfig) === null || r === void 0 || (r = r.csp) === null || r === void 0 ? void 0 : r.nonce
          });
        }
      }
    }
  },
  beforeCreate: function() {
    var e, t, r, i, o, a, s, u, l, d, c, f = (e = this.pt) === null || e === void 0 ? void 0 : e._usept, p = f ? (t = this.pt) === null || t === void 0 || (t = t.originalValue) === null || t === void 0 ? void 0 : t[this.$.type.name] : void 0, y = f ? (r = this.pt) === null || r === void 0 || (r = r.value) === null || r === void 0 ? void 0 : r[this.$.type.name] : this.pt;
    (i = y || p) === null || i === void 0 || (i = i.hooks) === null || i === void 0 || (o = i.onBeforeCreate) === null || o === void 0 || o.call(i);
    var h = (a = this.$primevueConfig) === null || a === void 0 || (a = a.pt) === null || a === void 0 ? void 0 : a._usept, g = h ? (s = this.$primevue) === null || s === void 0 || (s = s.config) === null || s === void 0 || (s = s.pt) === null || s === void 0 ? void 0 : s.originalValue : void 0, v = h ? (u = this.$primevue) === null || u === void 0 || (u = u.config) === null || u === void 0 || (u = u.pt) === null || u === void 0 ? void 0 : u.value : (l = this.$primevue) === null || l === void 0 || (l = l.config) === null || l === void 0 ? void 0 : l.pt;
    (d = v || g) === null || d === void 0 || (d = d[this.$.type.name]) === null || d === void 0 || (d = d.hooks) === null || d === void 0 || (c = d.onBeforeCreate) === null || c === void 0 || c.call(d);
  },
  created: function() {
    this._hook("onCreated");
  },
  beforeMount: function() {
    var e;
    E.loadStyle({
      nonce: (e = this.$primevueConfig) === null || e === void 0 || (e = e.csp) === null || e === void 0 ? void 0 : e.nonce
    }), this._loadGlobalStyles(), this._hook("onBeforeMount");
  },
  mounted: function() {
    this._hook("onMounted");
  },
  beforeUpdate: function() {
    this._hook("onBeforeUpdate");
  },
  updated: function() {
    this._hook("onUpdated");
  },
  beforeUnmount: function() {
    this._hook("onBeforeUnmount");
  },
  unmounted: function() {
    this._hook("onUnmounted");
  },
  methods: {
    _hook: function(e) {
      if (!this.$options.hostName) {
        var t = this._usePT(this._getPT(this.pt, this.$.type.name), this._getOptionValue, "hooks.".concat(e)), r = this._useDefaultPT(this._getOptionValue, "hooks.".concat(e));
        t?.(), r?.();
      }
    },
    _mergeProps: function(e) {
      for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
        r[i - 1] = arguments[i];
      return m.isFunction(e) ? e.apply(void 0, r) : P.apply(void 0, r);
    },
    _loadGlobalStyles: function() {
      var e, t = this._useGlobalPT(this._getOptionValue, "global.css", this.$params);
      m.isNotEmpty(t) && J.loadGlobalStyle(t, {
        nonce: (e = this.$primevueConfig) === null || e === void 0 || (e = e.csp) === null || e === void 0 ? void 0 : e.nonce
      });
    },
    _getHostInstance: function(e) {
      return e ? this.$options.hostName ? e.$.type.name === this.$options.hostName ? e : this._getHostInstance(e.$parentInstance) : e.$parentInstance : void 0;
    },
    _getPropValue: function(e) {
      var t;
      return this[e] || ((t = this._getHostInstance(this)) === null || t === void 0 ? void 0 : t[e]);
    },
    _getOptionValue: function(e) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = m.toFlatCase(t).split("."), o = i.shift();
      return o ? m.isObject(e) ? this._getOptionValue(m.getItemValue(e[Object.keys(e).find(function(a) {
        return m.toFlatCase(a) === o;
      }) || ""], r), i.join("."), r) : void 0 : m.getItemValue(e, r);
    },
    _getPTValue: function() {
      var e, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, a = /./g.test(r) && !!i[r.split(".")[0]], s = this._getPropValue("ptOptions") || ((e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.ptOptions) || {}, u = s.mergeSections, l = u === void 0 ? !0 : u, d = s.mergeProps, c = d === void 0 ? !1 : d, f = o ? a ? this._useGlobalPT(this._getPTClassValue, r, i) : this._useDefaultPT(this._getPTClassValue, r, i) : void 0, p = a ? void 0 : this._getPTSelf(t, this._getPTClassValue, r, $($({}, i), {}, {
        global: f || {}
      })), y = this._getPTDatasets(r);
      return l || !l && p ? c ? this._mergeProps(c, f, p, y) : $($($({}, f), p), y) : $($({}, p), y);
    },
    _getPTSelf: function() {
      for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
        r[i - 1] = arguments[i];
      return P(
        this._usePT.apply(this, [this._getPT(e, this.$name)].concat(r)),
        // Exp; <component :pt="{}"
        this._usePT.apply(this, [this.$_attrsPT].concat(r))
        // Exp; <component :pt:[passthrough_key]:[attribute]="{value}" or <component :pt:[passthrough_key]="() =>{value}"
      );
    },
    _getPTDatasets: function() {
      var e, t, r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", i = "data-pc-", o = r === "root" && m.isNotEmpty((e = this.pt) === null || e === void 0 ? void 0 : e["data-pc-section"]);
      return r !== "transition" && $($({}, r === "root" && $(K({}, "".concat(i, "name"), m.toFlatCase(o ? (t = this.pt) === null || t === void 0 ? void 0 : t["data-pc-section"] : this.$.type.name)), o && K({}, "".concat(i, "extend"), m.toFlatCase(this.$.type.name)))), {}, K({}, "".concat(i, "section"), m.toFlatCase(r)));
    },
    _getPTClassValue: function() {
      var e = this._getOptionValue.apply(this, arguments);
      return m.isString(e) || m.isArray(e) ? {
        class: e
      } : e;
    },
    _getPT: function(e) {
      var t = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 ? arguments[2] : void 0, o = function(s) {
        var u, l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, d = i ? i(s) : s, c = m.toFlatCase(r), f = m.toFlatCase(t.$name);
        return (u = l ? c !== f ? d?.[c] : void 0 : d?.[c]) !== null && u !== void 0 ? u : d;
      };
      return e != null && e.hasOwnProperty("_usept") ? {
        _usept: e._usept,
        originalValue: o(e.originalValue),
        value: o(e.value)
      } : o(e, !0);
    },
    _usePT: function(e, t, r, i) {
      var o = function(h) {
        return t(h, r, i);
      };
      if (e != null && e.hasOwnProperty("_usept")) {
        var a, s = e._usept || ((a = this.$primevueConfig) === null || a === void 0 ? void 0 : a.ptOptions) || {}, u = s.mergeSections, l = u === void 0 ? !0 : u, d = s.mergeProps, c = d === void 0 ? !1 : d, f = o(e.originalValue), p = o(e.value);
        return f === void 0 && p === void 0 ? void 0 : m.isString(p) ? p : m.isString(f) ? f : l || !l && p ? c ? this._mergeProps(c, f, p) : $($({}, f), p) : p;
      }
      return o(e);
    },
    _useGlobalPT: function(e, t, r) {
      return this._usePT(this.globalPT, e, t, r);
    },
    _useDefaultPT: function(e, t, r) {
      return this._usePT(this.defaultPT, e, t, r);
    },
    ptm: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this._getPTValue(this.pt, e, $($({}, this.$params), t));
    },
    ptmi: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return P(this.$_attrsNoPT, this.ptm(e, t));
    },
    ptmo: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return this._getPTValue(e, t, $({
        instance: this
      }, r), !1);
    },
    cx: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.isUnstyled ? void 0 : this._getOptionValue(this.$style.classes, e, $($({}, this.$params), t));
    },
    sx: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (t) {
        var i = this._getOptionValue(this.$style.inlineStyles, e, $($({}, this.$params), r)), o = this._getOptionValue(J.inlineStyles, e, $($({}, this.$params), r));
        return [o, i];
      }
    }
  },
  computed: {
    globalPT: function() {
      var e, t = this;
      return this._getPT((e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.pt, void 0, function(r) {
        return m.getItemValue(r, {
          instance: t
        });
      });
    },
    defaultPT: function() {
      var e, t = this;
      return this._getPT((e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.pt, void 0, function(r) {
        return t._getOptionValue(r, t.$name, $({}, t.$params)) || m.getItemValue(r, $({}, t.$params));
      });
    },
    isUnstyled: function() {
      var e;
      return this.unstyled !== void 0 ? this.unstyled : (e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.unstyled;
    },
    $params: function() {
      var e = this._getHostInstance(this) || this.$parent;
      return {
        instance: this,
        props: this.$props,
        state: this.$data,
        attrs: this.$attrs,
        parent: {
          instance: e,
          props: e?.$props,
          state: e?.$data,
          attrs: e?.$attrs
        },
        /* @deprecated since v3.43.0. Use the `parent.instance` instead of the `parentInstance`.*/
        parentInstance: e
      };
    },
    $style: function() {
      return $($({
        classes: void 0,
        inlineStyles: void 0,
        loadStyle: function() {
        },
        loadCustomStyle: function() {
        }
      }, (this._getHostInstance(this) || {}).$style), this.$options.style);
    },
    $primevueConfig: function() {
      var e;
      return (e = this.$primevue) === null || e === void 0 ? void 0 : e.config;
    },
    $name: function() {
      return this.$options.hostName || this.$.type.name;
    },
    $_attrsPT: function() {
      return Object.entries(this.$attrs || {}).filter(function(e) {
        var t = R(e, 1), r = t[0];
        return r?.startsWith("pt:");
      }).reduce(function(e, t) {
        var r = R(t, 2), i = r[0], o = r[1], a = i.split(":"), s = Wt(a), u = s.slice(1);
        return u?.reduce(function(l, d, c, f) {
          return !l[d] && (l[d] = c === f.length - 1 ? o : {}), l[d];
        }, e), e;
      }, {});
    },
    $_attrsNoPT: function() {
      return Object.entries(this.$attrs || {}).filter(function(e) {
        var t = R(e, 1), r = t[0];
        return !(r != null && r.startsWith("pt:"));
      }).reduce(function(e, t) {
        var r = R(t, 2), i = r[0], o = r[1];
        return e[i] = o, e;
      }, {});
    }
  }
}, Kt = {
  root: "p-card p-component",
  header: "p-card-header",
  body: "p-card-body",
  caption: "p-card-caption",
  title: "p-card-title",
  subtitle: "p-card-subtitle",
  content: "p-card-content",
  footer: "p-card-footer"
}, qt = E.extend({
  name: "card",
  classes: Kt
}), zt = {
  name: "BaseCard",
  extends: q,
  style: qt
}, Fe = {
  name: "Card",
  extends: zt,
  inheritAttrs: !1
};
function Gt(n, e, t, r, i, o) {
  return C(), O("div", P({
    class: n.cx("root")
  }, n.ptmi("root")), [n.$slots.header ? (C(), O("div", P({
    key: 0,
    class: n.cx("header")
  }, n.ptm("header")), [T(n.$slots, "header")], 16)) : x("", !0), j("div", P({
    class: n.cx("body")
  }, n.ptm("body")), [n.$slots.title || n.$slots.subtitle ? (C(), O("div", P({
    key: 0,
    class: n.cx("caption")
  }, n.ptm("caption")), [n.$slots.title ? (C(), O("div", P({
    key: 0,
    class: n.cx("title")
  }, n.ptm("title")), [T(n.$slots, "title")], 16)) : x("", !0), n.$slots.subtitle ? (C(), O("div", P({
    key: 1,
    class: n.cx("subtitle")
  }, n.ptm("subtitle")), [T(n.$slots, "subtitle")], 16)) : x("", !0)], 16)) : x("", !0), j("div", P({
    class: n.cx("content")
  }, n.ptm("content")), [T(n.$slots, "content")], 16), n.$slots.footer ? (C(), O("div", P({
    key: 1,
    class: n.cx("footer")
  }, n.ptm("footer")), [T(n.$slots, "footer")], 16)) : x("", !0)], 16)], 16);
}
Fe.render = Gt;
var Xt = {
  root: function(e) {
    var t = e.props, r = e.instance;
    return ["p-badge p-component", {
      "p-badge-no-gutter": m.isNotEmpty(t.value) && String(t.value).length === 1,
      "p-badge-dot": m.isEmpty(t.value) && !r.$slots.default,
      "p-badge-lg": t.size === "large",
      "p-badge-xl": t.size === "xlarge",
      "p-badge-info": t.severity === "info",
      "p-badge-success": t.severity === "success",
      "p-badge-warning": t.severity === "warning",
      "p-badge-danger": t.severity === "danger",
      "p-badge-secondary": t.severity === "secondary",
      "p-badge-contrast": t.severity === "contrast"
    }];
  }
}, Yt = E.extend({
  name: "badge",
  classes: Xt
}), Zt = {
  name: "BaseBadge",
  extends: q,
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    severity: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    }
  },
  style: Yt,
  provide: function() {
    return {
      $parentInstance: this
    };
  }
}, Be = {
  name: "Badge",
  extends: Zt,
  inheritAttrs: !1
};
function Jt(n, e, t, r, i, o) {
  return C(), O("span", P({
    class: n.cx("root")
  }, n.ptmi("root")), [T(n.$slots, "default", {}, function() {
    return [je(oe(n.value), 1)];
  })], 16);
}
Be.render = Jt;
var Qt = `
.p-icon {
    display: inline-block;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`, en = E.extend({
  name: "baseicon",
  css: Qt
});
function H(n) {
  "@babel/helpers - typeof";
  return H = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, H(n);
}
function Ce(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function Oe(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ce(Object(t), !0).forEach(function(r) {
      tn(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : Ce(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function tn(n, e, t) {
  return e = nn(e), e in n ? Object.defineProperty(n, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : n[e] = t, n;
}
function nn(n) {
  var e = rn(n, "string");
  return H(e) == "symbol" ? e : String(e);
}
function rn(n, e) {
  if (H(n) != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e);
    if (H(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
var on = {
  name: "BaseIcon",
  extends: q,
  props: {
    label: {
      type: String,
      default: void 0
    },
    spin: {
      type: Boolean,
      default: !1
    }
  },
  style: en,
  methods: {
    pti: function() {
      var e = m.isEmpty(this.label);
      return Oe(Oe({}, !this.isUnstyled && {
        class: ["p-icon", {
          "p-icon-spin": this.spin
        }]
      }), {}, {
        role: e ? void 0 : "img",
        "aria-label": e ? void 0 : this.label,
        "aria-hidden": e
      });
    }
  }
}, Le = {
  name: "SpinnerIcon",
  extends: on
}, an = /* @__PURE__ */ j("path", {
  d: "M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",
  fill: "currentColor"
}, null, -1), sn = [an];
function un(n, e, t, r, i, o) {
  return C(), O("svg", P({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, n.pti()), sn, 16);
}
Le.render = un;
function W(n) {
  "@babel/helpers - typeof";
  return W = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, W(n);
}
function Te(n, e) {
  return fn(n) || cn(n, e) || dn(n, e) || ln();
}
function ln() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function dn(n, e) {
  if (n) {
    if (typeof n == "string") return Ee(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set") return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return Ee(n, e);
  }
}
function Ee(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = n[t];
  return r;
}
function cn(n, e) {
  var t = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (t != null) {
    var r, i, o, a, s = [], u = !0, l = !1;
    try {
      if (o = (t = t.call(n)).next, e !== 0) for (; !(u = (r = o.call(t)).done) && (s.push(r.value), s.length !== e); u = !0) ;
    } catch (d) {
      l = !0, i = d;
    } finally {
      try {
        if (!u && t.return != null && (a = t.return(), Object(a) !== a)) return;
      } finally {
        if (l) throw i;
      }
    }
    return s;
  }
}
function fn(n) {
  if (Array.isArray(n)) return n;
}
function Ae(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function S(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ae(Object(t), !0).forEach(function(r) {
      re(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : Ae(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function re(n, e, t) {
  return e = pn(e), e in n ? Object.defineProperty(n, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : n[e] = t, n;
}
function pn(n) {
  var e = gn(n, "string");
  return W(e) == "symbol" ? e : String(e);
}
function gn(n, e) {
  if (W(n) != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e);
    if (W(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
var b = {
  _getMeta: function() {
    return [m.isObject(arguments.length <= 0 ? void 0 : arguments[0]) || arguments.length <= 0 ? void 0 : arguments[0], m.getItemValue(m.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 0 ? void 0 : arguments[0] : arguments.length <= 1 ? void 0 : arguments[1])];
  },
  _getConfig: function(e, t) {
    var r, i, o;
    return (r = (e == null || (i = e.instance) === null || i === void 0 ? void 0 : i.$primevue) || (t == null || (o = t.ctx) === null || o === void 0 || (o = o.appContext) === null || o === void 0 || (o = o.config) === null || o === void 0 || (o = o.globalProperties) === null || o === void 0 ? void 0 : o.$primevue)) === null || r === void 0 ? void 0 : r.config;
  },
  _getOptionValue: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = m.toFlatCase(t).split("."), o = i.shift();
    return o ? m.isObject(e) ? b._getOptionValue(m.getItemValue(e[Object.keys(e).find(function(a) {
      return m.toFlatCase(a) === o;
    }) || ""], r), i.join("."), r) : void 0 : m.getItemValue(e, r);
  },
  _getPTValue: function() {
    var e, t, r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "", a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, u = function() {
      var w = b._getOptionValue.apply(b, arguments);
      return m.isString(w) || m.isArray(w) ? {
        class: w
      } : w;
    }, l = ((e = r.binding) === null || e === void 0 || (e = e.value) === null || e === void 0 ? void 0 : e.ptOptions) || ((t = r.$primevueConfig) === null || t === void 0 ? void 0 : t.ptOptions) || {}, d = l.mergeSections, c = d === void 0 ? !0 : d, f = l.mergeProps, p = f === void 0 ? !1 : f, y = s ? b._useDefaultPT(r, r.defaultPT(), u, o, a) : void 0, h = b._usePT(r, b._getPT(i, r.$name), u, o, S(S({}, a), {}, {
      global: y || {}
    })), g = b._getPTDatasets(r, o);
    return c || !c && h ? p ? b._mergeProps(r, p, y, h, g) : S(S(S({}, y), h), g) : S(S({}, h), g);
  },
  _getPTDatasets: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", r = "data-pc-";
    return S(S({}, t === "root" && re({}, "".concat(r, "name"), m.toFlatCase(e.$name))), {}, re({}, "".concat(r, "section"), m.toFlatCase(t)));
  },
  _getPT: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", r = arguments.length > 2 ? arguments[2] : void 0, i = function(a) {
      var s, u = r ? r(a) : a, l = m.toFlatCase(t);
      return (s = u?.[l]) !== null && s !== void 0 ? s : u;
    };
    return e != null && e.hasOwnProperty("_usept") ? {
      _usept: e._usept,
      originalValue: i(e.originalValue),
      value: i(e.value)
    } : i(e);
  },
  _usePT: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, r = arguments.length > 2 ? arguments[2] : void 0, i = arguments.length > 3 ? arguments[3] : void 0, o = arguments.length > 4 ? arguments[4] : void 0, a = function(g) {
      return r(g, i, o);
    };
    if (t != null && t.hasOwnProperty("_usept")) {
      var s, u = t._usept || ((s = e.$primevueConfig) === null || s === void 0 ? void 0 : s.ptOptions) || {}, l = u.mergeSections, d = l === void 0 ? !0 : l, c = u.mergeProps, f = c === void 0 ? !1 : c, p = a(t.originalValue), y = a(t.value);
      return p === void 0 && y === void 0 ? void 0 : m.isString(y) ? y : m.isString(p) ? p : d || !d && y ? f ? b._mergeProps(e, f, p, y) : S(S({}, p), y) : y;
    }
    return a(t);
  },
  _useDefaultPT: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0, i = arguments.length > 3 ? arguments[3] : void 0, o = arguments.length > 4 ? arguments[4] : void 0;
    return b._usePT(e, t, r, i, o);
  },
  _hook: function(e, t, r, i, o, a) {
    var s, u, l = "on".concat(m.toCapitalCase(t)), d = b._getConfig(i, o), c = r?.$instance, f = b._usePT(c, b._getPT(i == null || (s = i.value) === null || s === void 0 ? void 0 : s.pt, e), b._getOptionValue, "hooks.".concat(l)), p = b._useDefaultPT(c, d == null || (u = d.pt) === null || u === void 0 || (u = u.directives) === null || u === void 0 ? void 0 : u[e], b._getOptionValue, "hooks.".concat(l)), y = {
      el: r,
      binding: i,
      vnode: o,
      prevVnode: a
    };
    f?.(c, y), p?.(c, y);
  },
  _mergeProps: function() {
    for (var e = arguments.length > 1 ? arguments[1] : void 0, t = arguments.length, r = new Array(t > 2 ? t - 2 : 0), i = 2; i < t; i++)
      r[i - 2] = arguments[i];
    return m.isFunction(e) ? e.apply(void 0, r) : P.apply(void 0, r);
  },
  _extend: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = function(o, a, s, u, l) {
      var d, c;
      a._$instances = a._$instances || {};
      var f = b._getConfig(s, u), p = a._$instances[e] || {}, y = m.isEmpty(p) ? S(S({}, t), t?.methods) : {};
      a._$instances[e] = S(S({}, p), {}, {
        /* new instance variables to pass in directive methods */
        $name: e,
        $host: a,
        $binding: s,
        $modifiers: s?.modifiers,
        $value: s?.value,
        $el: p.$el || a || void 0,
        $style: S({
          classes: void 0,
          inlineStyles: void 0,
          loadStyle: function() {
          }
        }, t?.style),
        $primevueConfig: f,
        /* computed instance variables */
        defaultPT: function() {
          return b._getPT(f?.pt, void 0, function(g) {
            var v;
            return g == null || (v = g.directives) === null || v === void 0 ? void 0 : v[e];
          });
        },
        isUnstyled: function() {
          var g, v;
          return ((g = a.$instance) === null || g === void 0 || (g = g.$binding) === null || g === void 0 || (g = g.value) === null || g === void 0 ? void 0 : g.unstyled) !== void 0 ? (v = a.$instance) === null || v === void 0 || (v = v.$binding) === null || v === void 0 || (v = v.value) === null || v === void 0 ? void 0 : v.unstyled : f?.unstyled;
        },
        /* instance's methods */
        ptm: function() {
          var g, v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return b._getPTValue(a.$instance, (g = a.$instance) === null || g === void 0 || (g = g.$binding) === null || g === void 0 || (g = g.value) === null || g === void 0 ? void 0 : g.pt, v, S({}, w));
        },
        ptmo: function() {
          var g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return b._getPTValue(a.$instance, g, v, w, !1);
        },
        cx: function() {
          var g, v, w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return (g = a.$instance) !== null && g !== void 0 && g.isUnstyled() ? void 0 : b._getOptionValue((v = a.$instance) === null || v === void 0 || (v = v.$style) === null || v === void 0 ? void 0 : v.classes, w, S({}, I));
        },
        sx: function() {
          var g, v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, I = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return w ? b._getOptionValue((g = a.$instance) === null || g === void 0 || (g = g.$style) === null || g === void 0 ? void 0 : g.inlineStyles, v, S({}, I)) : void 0;
        }
      }, y), a.$instance = a._$instances[e], (d = (c = a.$instance)[o]) === null || d === void 0 || d.call(c, a, s, u, l), a["$".concat(e)] = a.$instance, b._hook(e, o, a, s, u, l);
    };
    return {
      created: function(o, a, s, u) {
        r("created", o, a, s, u);
      },
      beforeMount: function(o, a, s, u) {
        var l, d, c, f, p = b._getConfig(a, s);
        E.loadStyle({
          nonce: p == null || (l = p.csp) === null || l === void 0 ? void 0 : l.nonce
        }), !((d = o.$instance) !== null && d !== void 0 && d.isUnstyled()) && ((c = o.$instance) === null || c === void 0 || (c = c.$style) === null || c === void 0 || c.loadStyle({
          nonce: p == null || (f = p.csp) === null || f === void 0 ? void 0 : f.nonce
        })), r("beforeMount", o, a, s, u);
      },
      mounted: function(o, a, s, u) {
        var l, d, c, f, p = b._getConfig(a, s);
        E.loadStyle({
          nonce: p == null || (l = p.csp) === null || l === void 0 ? void 0 : l.nonce
        }), !((d = o.$instance) !== null && d !== void 0 && d.isUnstyled()) && ((c = o.$instance) === null || c === void 0 || (c = c.$style) === null || c === void 0 || c.loadStyle({
          nonce: p == null || (f = p.csp) === null || f === void 0 ? void 0 : f.nonce
        })), r("mounted", o, a, s, u);
      },
      beforeUpdate: function(o, a, s, u) {
        r("beforeUpdate", o, a, s, u);
      },
      updated: function(o, a, s, u) {
        r("updated", o, a, s, u);
      },
      beforeUnmount: function(o, a, s, u) {
        r("beforeUnmount", o, a, s, u);
      },
      unmounted: function(o, a, s, u) {
        r("unmounted", o, a, s, u);
      }
    };
  },
  extend: function() {
    var e = b._getMeta.apply(b, arguments), t = Te(e, 2), r = t[0], i = t[1];
    return S({
      extend: function() {
        var a = b._getMeta.apply(b, arguments), s = Te(a, 2), u = s[0], l = s[1];
        return b.extend(u, S(S(S({}, i), i?.methods), l));
      }
    }, b._extend(r, i));
  }
}, mn = {
  root: "p-ink"
}, vn = E.extend({
  name: "ripple",
  classes: mn
}), yn = b.extend({
  style: vn
});
function hn(n) {
  return wn(n) || Sn(n) || $n(n) || bn();
}
function bn() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function $n(n, e) {
  if (n) {
    if (typeof n == "string") return ie(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set") return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return ie(n, e);
  }
}
function Sn(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function wn(n) {
  if (Array.isArray(n)) return ie(n);
}
function ie(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = n[t];
  return r;
}
var Pn = yn.extend("ripple", {
  mounted: function(e) {
    var t, r = e == null || (t = e.$instance) === null || t === void 0 ? void 0 : t.$primevueConfig;
    r && r.ripple && (this.create(e), this.bindEvents(e), e.setAttribute("data-pd-ripple", !0));
  },
  unmounted: function(e) {
    this.remove(e);
  },
  timeout: void 0,
  methods: {
    bindEvents: function(e) {
      e.addEventListener("mousedown", this.onMouseDown.bind(this));
    },
    unbindEvents: function(e) {
      e.removeEventListener("mousedown", this.onMouseDown.bind(this));
    },
    create: function(e) {
      var t = _.createElement("span", {
        role: "presentation",
        "aria-hidden": !0,
        "data-p-ink": !0,
        "data-p-ink-active": !1,
        class: !this.isUnstyled() && this.cx("root"),
        onAnimationEnd: this.onAnimationEnd.bind(this),
        "p-bind": this.ptm("root")
      });
      e.appendChild(t), this.$el = t;
    },
    remove: function(e) {
      var t = this.getInk(e);
      t && (this.unbindEvents(e), t.removeEventListener("animationend", this.onAnimationEnd), t.remove());
    },
    onMouseDown: function(e) {
      var t = this, r = e.currentTarget, i = this.getInk(r);
      if (!(!i || getComputedStyle(i, null).display === "none")) {
        if (!this.isUnstyled() && _.removeClass(i, "p-ink-active"), i.setAttribute("data-p-ink-active", "false"), !_.getHeight(i) && !_.getWidth(i)) {
          var o = Math.max(_.getOuterWidth(r), _.getOuterHeight(r));
          i.style.height = o + "px", i.style.width = o + "px";
        }
        var a = _.getOffset(r), s = e.pageX - a.left + document.body.scrollTop - _.getWidth(i) / 2, u = e.pageY - a.top + document.body.scrollLeft - _.getHeight(i) / 2;
        i.style.top = u + "px", i.style.left = s + "px", !this.isUnstyled() && _.addClass(i, "p-ink-active"), i.setAttribute("data-p-ink-active", "true"), this.timeout = setTimeout(function() {
          i && (!t.isUnstyled() && _.removeClass(i, "p-ink-active"), i.setAttribute("data-p-ink-active", "false"));
        }, 401);
      }
    },
    onAnimationEnd: function(e) {
      this.timeout && clearTimeout(this.timeout), !this.isUnstyled() && _.removeClass(e.currentTarget, "p-ink-active"), e.currentTarget.setAttribute("data-p-ink-active", "false");
    },
    getInk: function(e) {
      return e && e.children ? hn(e.children).find(function(t) {
        return _.getAttribute(t, "data-pc-name") === "ripple";
      }) : void 0;
    }
  }
});
function U(n) {
  "@babel/helpers - typeof";
  return U = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, U(n);
}
function A(n, e, t) {
  return e = _n(e), e in n ? Object.defineProperty(n, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : n[e] = t, n;
}
function _n(n) {
  var e = Cn(n, "string");
  return U(e) == "symbol" ? e : String(e);
}
function Cn(n, e) {
  if (U(n) != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e);
    if (U(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
var On = {
  root: function(e) {
    var t = e.instance, r = e.props;
    return ["p-button p-component", A(A(A(A(A(A(A(A({
      "p-button-icon-only": t.hasIcon && !r.label && !r.badge,
      "p-button-vertical": (r.iconPos === "top" || r.iconPos === "bottom") && r.label,
      "p-disabled": t.$attrs.disabled || t.$attrs.disabled === "" || r.loading,
      "p-button-loading": r.loading,
      "p-button-loading-label-only": r.loading && !t.hasIcon && r.label,
      "p-button-link": r.link
    }, "p-button-".concat(r.severity), r.severity), "p-button-raised", r.raised), "p-button-rounded", r.rounded), "p-button-text", r.text), "p-button-outlined", r.outlined), "p-button-sm", r.size === "small"), "p-button-lg", r.size === "large"), "p-button-plain", r.plain)];
  },
  loadingIcon: "p-button-loading-icon pi-spin",
  icon: function(e) {
    var t = e.props;
    return ["p-button-icon", {
      "p-button-icon-left": t.iconPos === "left" && t.label,
      "p-button-icon-right": t.iconPos === "right" && t.label,
      "p-button-icon-top": t.iconPos === "top" && t.label,
      "p-button-icon-bottom": t.iconPos === "bottom" && t.label
    }];
  },
  label: "p-button-label"
}, Tn = E.extend({
  name: "button",
  classes: On
}), En = {
  name: "BaseButton",
  extends: q,
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconPos: {
      type: String,
      default: "left"
    },
    iconClass: {
      type: String,
      default: null
    },
    badge: {
      type: String,
      default: null
    },
    badgeClass: {
      type: String,
      default: null
    },
    badgeSeverity: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: !1
    },
    loadingIcon: {
      type: String,
      default: void 0
    },
    link: {
      type: Boolean,
      default: !1
    },
    severity: {
      type: String,
      default: null
    },
    raised: {
      type: Boolean,
      default: !1
    },
    rounded: {
      type: Boolean,
      default: !1
    },
    text: {
      type: Boolean,
      default: !1
    },
    outlined: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: null
    },
    plain: {
      type: Boolean,
      default: !1
    }
  },
  style: Tn,
  provide: function() {
    return {
      $parentInstance: this
    };
  }
}, He = {
  name: "Button",
  extends: En,
  inheritAttrs: !1,
  methods: {
    getPTOptions: function(e) {
      var t = e === "root" ? this.ptmi : this.ptm;
      return t(e, {
        context: {
          disabled: this.disabled
        }
      });
    }
  },
  computed: {
    disabled: function() {
      return this.$attrs.disabled || this.$attrs.disabled === "" || this.loading;
    },
    defaultAriaLabel: function() {
      return this.label ? this.label + (this.badge ? " " + this.badge : "") : this.$attrs.ariaLabel;
    },
    hasIcon: function() {
      return this.icon || this.$slots.icon;
    }
  },
  components: {
    SpinnerIcon: Le,
    Badge: Be
  },
  directives: {
    ripple: Pn
  }
}, An = ["aria-label", "disabled", "data-p-severity"];
function xn(n, e, t, r, i, o) {
  var a = pe("SpinnerIcon"), s = pe("Badge"), u = Je("ripple");
  return Qe((C(), O("button", P({
    class: n.cx("root"),
    type: "button",
    "aria-label": o.defaultAriaLabel,
    disabled: o.disabled
  }, o.getPTOptions("root"), {
    "data-p-severity": n.severity
  }), [T(n.$slots, "default", {}, function() {
    return [n.loading ? T(n.$slots, "loadingicon", {
      key: 0,
      class: ee([n.cx("loadingIcon"), n.cx("icon")])
    }, function() {
      return [n.loadingIcon ? (C(), O("span", P({
        key: 0,
        class: [n.cx("loadingIcon"), n.cx("icon"), n.loadingIcon]
      }, n.ptm("loadingIcon")), null, 16)) : (C(), Q(a, P({
        key: 1,
        class: [n.cx("loadingIcon"), n.cx("icon")],
        spin: ""
      }, n.ptm("loadingIcon")), null, 16, ["class"]))];
    }) : T(n.$slots, "icon", {
      key: 1,
      class: ee([n.cx("icon")])
    }, function() {
      return [n.icon ? (C(), O("span", P({
        key: 0,
        class: [n.cx("icon"), n.icon, n.iconClass]
      }, n.ptm("icon")), null, 16)) : x("", !0)];
    }), j("span", P({
      class: n.cx("label")
    }, n.ptm("label")), oe(n.label || " "), 17), n.badge ? (C(), Q(s, P({
      key: 2,
      value: n.badge,
      class: n.badgeClass,
      severity: n.badgeSeverity,
      unstyled: n.unstyled
    }, n.ptm("badge")), null, 16, ["value", "class", "severity", "unstyled"])) : x("", !0)];
  })], 16, An)), [[u]]);
}
He.render = xn;
const jn = ["innerHTML"], In = ["innerHTML"], kn = { class: "card-footer" }, Vn = /* @__PURE__ */ et({
  __name: "Cards",
  props: {
    cards: {},
    borderColor: {},
    theme: {}
  },
  setup(n) {
    return (e, t) => (C(), O(
      ge,
      null,
      [
        x(" PrimeVue Cards Grid "),
        j(
          "div",
          {
            class: ee(["cards-container", n.theme ? `cards-theme-${n.theme}` : ""]),
            style: tt(n.borderColor ? `--cards-border-color: ${n.borderColor}` : "")
          },
          [
            (C(!0), O(
              ge,
              null,
              nt(n.cards, (r, i) => (C(), Q(
                me(Fe),
                {
                  key: i,
                  class: "card-item"
                },
                rt({
                  header: N(() => [
                    j("div", {
                      class: "cards-card-image",
                      innerHTML: r.picture
                    }, null, 8, jn)
                  ]),
                  content: N(() => [
                    j("div", {
                      class: "cards-card-content",
                      innerHTML: r.body
                    }, null, 8, In)
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, [
                  r.title ? {
                    name: "title",
                    fn: N(() => [
                      je(
                        oe(`${r.title}`),
                        1
                        /* TEXT */
                      )
                    ]),
                    key: "0"
                  } : void 0,
                  r.buttonText ? {
                    name: "footer",
                    fn: N(() => [
                      j("div", kn, [
                        it(me(He), {
                          label: r.buttonText,
                          size: "small"
                        }, null, 8, ["label"])
                      ])
                    ]),
                    key: "1"
                  } : void 0
                ]),
                1024
                /* DYNAMIC_SLOTS */
              ))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    ));
  }
});
function Dn(n) {
  return (n?.innerHTML || "").trim();
}
function Fn(n, e) {
  if (!n) return "";
  const t = n.querySelector("img") || n.querySelector("picture img");
  if (!t?.getAttribute("src")) return "";
  const r = t.getAttribute("src"), i = e.alt ?? t.getAttribute("alt") ?? "";
  return at(r, i, !1, [{ width: String(e.width) }]).outerHTML;
}
function Bn(n) {
  const e = {};
  return [...n.children].forEach((r) => {
    const i = [...r.children];
    if (i.length < 2) return;
    const o = i[0];
    if (!(o.querySelector("img") !== null)) {
      const s = Wn(o.textContent?.trim() || ""), u = i[1].textContent?.trim() || "";
      s && u && (e[s] = u);
    }
  }), e;
}
function Ln(n) {
  return (n?.textContent || "").trim();
}
function xe(n) {
  const e = Ln(n);
  return e || void 0;
}
function Hn(n) {
  return [...n.children].filter((e) => e.children[0]?.querySelector("img") !== null);
}
function Wn(n) {
  return n.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s(.)/g, (e, t) => t.toUpperCase()).replace(/^(.)/, (e, t) => t.toLowerCase());
}
function Un(n) {
  const e = Bn(n), r = Hn(n).map((i, o) => {
    const a = [...i.children];
    return {
      picture: Fn(a[0], { width: 750 }),
      body: Dn(a[1]),
      title: xe(a[2]),
      buttonText: xe(a[3])
    };
  });
  return { ...e, cards: r };
}
const Mn = Un, qn = ot(Vn, Mn);
export {
  qn as default
};
