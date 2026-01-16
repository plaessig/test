import { ref as te, readonly as Ot, getCurrentInstance as wt, onMounted as It, nextTick as Ct, watch as Pt, mergeProps as S, createElementBlock as C, openBlock as O, createElementVNode as T, renderSlot as A, createBlock as U, createCommentVNode as V, Teleport as $t, resolveComponent as q, Fragment as X, renderList as $e, createVNode as Y, resolveDirective as Tt, createTextVNode as be, toDisplayString as F, normalizeClass as ee, resolveDynamicComponent as me, withCtx as Z, Transition as Lt, createSlots as Et, withDirectives as At, defineComponent as xt, unref as je } from "vue";
import { createVueBlockDecorator as _t } from "../../scripts/vue-utils.js";
function Se(t, e) {
  var n = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!n) {
    if (Array.isArray(t) || (n = Ve(t)) || e) {
      n && (t = n);
      var i = 0, o = function() {
      };
      return { s: o, n: function() {
        return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] };
      }, e: function(u) {
        throw u;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var r = !0, s = !1, a;
  return { s: function() {
    n = n.call(t);
  }, n: function() {
    var u = n.next();
    return r = u.done, u;
  }, e: function(u) {
    s = !0, a = u;
  }, f: function() {
    try {
      !r && n.return != null && n.return();
    } finally {
      if (s) throw a;
    }
  } };
}
function Vt(t) {
  return jt(t) || Ft(t) || Ve(t) || kt();
}
function kt() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ft(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function jt(t) {
  if (Array.isArray(t)) return Te(t);
}
function ne(t) {
  "@babel/helpers - typeof";
  return ne = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ne(t);
}
function Oe(t, e) {
  return Mt(t) || zt(t, e) || Ve(t, e) || Dt();
}
function Dt() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ve(t, e) {
  if (t) {
    if (typeof t == "string") return Te(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Te(t, e);
  }
}
function Te(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function zt(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var i, o, r, s, a = [], l = !0, u = !1;
    try {
      if (r = (n = n.call(t)).next, e !== 0) for (; !(l = (i = r.call(n)).done) && (a.push(i.value), a.length !== e); l = !0) ;
    } catch (d) {
      u = !0, o = d;
    } finally {
      try {
        if (!l && n.return != null && (s = n.return(), Object(s) !== s)) return;
      } finally {
        if (u) throw o;
      }
    }
    return a;
  }
}
function Mt(t) {
  if (Array.isArray(t)) return t;
}
var y = {
  innerWidth: function(e) {
    if (e) {
      var n = e.offsetWidth, i = getComputedStyle(e);
      return n += parseFloat(i.paddingLeft) + parseFloat(i.paddingRight), n;
    }
    return 0;
  },
  width: function(e) {
    if (e) {
      var n = e.offsetWidth, i = getComputedStyle(e);
      return n -= parseFloat(i.paddingLeft) + parseFloat(i.paddingRight), n;
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
  getOuterWidth: function(e, n) {
    if (e) {
      var i = e.offsetWidth;
      if (n) {
        var o = getComputedStyle(e);
        i += parseFloat(o.marginLeft) + parseFloat(o.marginRight);
      }
      return i;
    }
    return 0;
  },
  getOuterHeight: function(e, n) {
    if (e) {
      var i = e.offsetHeight;
      if (n) {
        var o = getComputedStyle(e);
        i += parseFloat(o.marginTop) + parseFloat(o.marginBottom);
      }
      return i;
    }
    return 0;
  },
  getClientHeight: function(e, n) {
    if (e) {
      var i = e.clientHeight;
      if (n) {
        var o = getComputedStyle(e);
        i += parseFloat(o.marginTop) + parseFloat(o.marginBottom);
      }
      return i;
    }
    return 0;
  },
  getViewport: function() {
    var e = window, n = document, i = n.documentElement, o = n.getElementsByTagName("body")[0], r = e.innerWidth || i.clientWidth || o.clientWidth, s = e.innerHeight || i.clientHeight || o.clientHeight;
    return {
      width: r,
      height: s
    };
  },
  getOffset: function(e) {
    if (e) {
      var n = e.getBoundingClientRect();
      return {
        top: n.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
        left: n.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index: function(e) {
    if (e)
      for (var n, i = (n = this.getParentNode(e)) === null || n === void 0 ? void 0 : n.childNodes, o = 0, r = 0; r < i.length; r++) {
        if (i[r] === e) return o;
        i[r].nodeType === 1 && o++;
      }
    return -1;
  },
  addMultipleClasses: function(e, n) {
    var i = this;
    e && n && [n].flat().filter(Boolean).forEach(function(o) {
      return o.split(" ").forEach(function(r) {
        return i.addClass(e, r);
      });
    });
  },
  removeMultipleClasses: function(e, n) {
    var i = this;
    e && n && [n].flat().filter(Boolean).forEach(function(o) {
      return o.split(" ").forEach(function(r) {
        return i.removeClass(e, r);
      });
    });
  },
  addClass: function(e, n) {
    e && n && !this.hasClass(e, n) && (e.classList ? e.classList.add(n) : e.className += " " + n);
  },
  removeClass: function(e, n) {
    e && n && (e.classList ? e.classList.remove(n) : e.className = e.className.replace(new RegExp("(^|\\b)" + n.split(" ").join("|") + "(\\b|$)", "gi"), " "));
  },
  hasClass: function(e, n) {
    return e ? e.classList ? e.classList.contains(n) : new RegExp("(^| )" + n + "( |$)", "gi").test(e.className) : !1;
  },
  addStyles: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    e && Object.entries(n).forEach(function(i) {
      var o = Oe(i, 2), r = o[0], s = o[1];
      return e.style[r] = s;
    });
  },
  find: function(e, n) {
    return this.isElement(e) ? e.querySelectorAll(n) : [];
  },
  findSingle: function(e, n) {
    return this.isElement(e) ? e.querySelector(n) : null;
  },
  createElement: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (e) {
      var i = document.createElement(e);
      this.setAttributes(i, n);
      for (var o = arguments.length, r = new Array(o > 2 ? o - 2 : 0), s = 2; s < o; s++)
        r[s - 2] = arguments[s];
      return i.append.apply(i, r), i;
    }
  },
  setAttribute: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 ? arguments[2] : void 0;
    this.isElement(e) && i !== null && i !== void 0 && e.setAttribute(n, i);
  },
  setAttributes: function(e) {
    var n = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.isElement(e)) {
      var o = function r(s, a) {
        var l, u, d = e != null && (l = e.$attrs) !== null && l !== void 0 && l[s] ? [e == null || (u = e.$attrs) === null || u === void 0 ? void 0 : u[s]] : [];
        return [a].flat().reduce(function(c, f) {
          if (f != null) {
            var p = ne(f);
            if (p === "string" || p === "number")
              c.push(f);
            else if (p === "object") {
              var m = Array.isArray(f) ? r(s, f) : Object.entries(f).map(function(v) {
                var h = Oe(v, 2), b = h[0], w = h[1];
                return s === "style" && (w || w === 0) ? "".concat(b.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), ":").concat(w) : w ? b : void 0;
              });
              c = m.length ? c.concat(m.filter(function(v) {
                return !!v;
              })) : c;
            }
          }
          return c;
        }, d);
      };
      Object.entries(i).forEach(function(r) {
        var s = Oe(r, 2), a = s[0], l = s[1];
        if (l != null) {
          var u = a.match(/^on(.+)/);
          u ? e.addEventListener(u[1].toLowerCase(), l) : a === "p-bind" ? n.setAttributes(e, l) : (l = a === "class" ? Vt(new Set(o("class", l))).join(" ").trim() : a === "style" ? o("style", l).join(";").trim() : l, (e.$attrs = e.$attrs || {}) && (e.$attrs[a] = l), e.setAttribute(a, l));
        }
      });
    }
  },
  getAttribute: function(e, n) {
    if (this.isElement(e)) {
      var i = e.getAttribute(n);
      return isNaN(i) ? i === "true" || i === "false" ? i === "true" : i : +i;
    }
  },
  isAttributeEquals: function(e, n, i) {
    return this.isElement(e) ? this.getAttribute(e, n) === i : !1;
  },
  isAttributeNotEquals: function(e, n, i) {
    return !this.isAttributeEquals(e, n, i);
  },
  getHeight: function(e) {
    if (e) {
      var n = e.offsetHeight, i = getComputedStyle(e);
      return n -= parseFloat(i.paddingTop) + parseFloat(i.paddingBottom) + parseFloat(i.borderTopWidth) + parseFloat(i.borderBottomWidth), n;
    }
    return 0;
  },
  getWidth: function(e) {
    if (e) {
      var n = e.offsetWidth, i = getComputedStyle(e);
      return n -= parseFloat(i.paddingLeft) + parseFloat(i.paddingRight) + parseFloat(i.borderLeftWidth) + parseFloat(i.borderRightWidth), n;
    }
    return 0;
  },
  absolutePosition: function(e, n) {
    var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (e) {
      var o = e.offsetParent ? {
        width: e.offsetWidth,
        height: e.offsetHeight
      } : this.getHiddenElementDimensions(e), r = o.height, s = o.width, a = n.offsetHeight, l = n.offsetWidth, u = n.getBoundingClientRect(), d = this.getWindowScrollTop(), c = this.getWindowScrollLeft(), f = this.getViewport(), p, m, v = "top";
      u.top + a + r > f.height ? (p = u.top + d - r, v = "bottom", p < 0 && (p = d)) : p = a + u.top + d, u.left + s > f.width ? m = Math.max(0, u.left + c + l - s) : m = u.left + c, e.style.top = p + "px", e.style.left = m + "px", e.style.transformOrigin = v, i && (e.style.marginTop = v === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  relativePosition: function(e, n) {
    var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (e) {
      var o = e.offsetParent ? {
        width: e.offsetWidth,
        height: e.offsetHeight
      } : this.getHiddenElementDimensions(e), r = n.offsetHeight, s = n.getBoundingClientRect(), a = this.getViewport(), l, u, d = "top";
      s.top + r + o.height > a.height ? (l = -1 * o.height, d = "bottom", s.top + l < 0 && (l = -1 * s.top)) : l = r, o.width > a.width ? u = s.left * -1 : s.left + o.width > a.width ? u = (s.left + o.width - a.width) * -1 : u = 0, e.style.top = l + "px", e.style.left = u + "px", e.style.transformOrigin = d, i && (e.style.marginTop = d === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  nestedPosition: function(e, n) {
    if (e) {
      var i = e.parentElement, o = this.getOffset(i), r = this.getViewport(), s = e.offsetParent ? e.offsetWidth : this.getHiddenElementOuterWidth(e), a = this.getOuterWidth(i.children[0]), l;
      parseInt(o.left, 10) + a + s > r.width - this.calculateScrollbarWidth() ? parseInt(o.left, 10) < s ? n % 2 === 1 ? l = parseInt(o.left, 10) ? "-" + parseInt(o.left, 10) + "px" : "100%" : n % 2 === 0 && (l = r.width - s - this.calculateScrollbarWidth() + "px") : l = "-100%" : l = "100%", e.style.top = "0px", e.style.left = l;
    }
  },
  getParentNode: function(e) {
    var n = e?.parentNode;
    return n && n instanceof ShadowRoot && n.host && (n = n.host), n;
  },
  getParents: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], i = this.getParentNode(e);
    return i === null ? n : this.getParents(i, n.concat([i]));
  },
  getScrollableParents: function(e) {
    var n = [];
    if (e) {
      var i = this.getParents(e), o = /(auto|scroll)/, r = function(h) {
        try {
          var b = window.getComputedStyle(h, null);
          return o.test(b.getPropertyValue("overflow")) || o.test(b.getPropertyValue("overflowX")) || o.test(b.getPropertyValue("overflowY"));
        } catch {
          return !1;
        }
      }, s = Se(i), a;
      try {
        for (s.s(); !(a = s.n()).done; ) {
          var l = a.value, u = l.nodeType === 1 && l.dataset.scrollselectors;
          if (u) {
            var d = u.split(","), c = Se(d), f;
            try {
              for (c.s(); !(f = c.n()).done; ) {
                var p = f.value, m = this.findSingle(l, p);
                m && r(m) && n.push(m);
              }
            } catch (v) {
              c.e(v);
            } finally {
              c.f();
            }
          }
          l.nodeType !== 9 && r(l) && n.push(l);
        }
      } catch (v) {
        s.e(v);
      } finally {
        s.f();
      }
    }
    return n;
  },
  getHiddenElementOuterHeight: function(e) {
    if (e) {
      e.style.visibility = "hidden", e.style.display = "block";
      var n = e.offsetHeight;
      return e.style.display = "none", e.style.visibility = "visible", n;
    }
    return 0;
  },
  getHiddenElementOuterWidth: function(e) {
    if (e) {
      e.style.visibility = "hidden", e.style.display = "block";
      var n = e.offsetWidth;
      return e.style.display = "none", e.style.visibility = "visible", n;
    }
    return 0;
  },
  getHiddenElementDimensions: function(e) {
    if (e) {
      var n = {};
      return e.style.visibility = "hidden", e.style.display = "block", n.width = e.offsetWidth, n.height = e.offsetHeight, e.style.display = "none", e.style.visibility = "visible", n;
    }
    return 0;
  },
  fadeIn: function(e, n) {
    if (e) {
      e.style.opacity = 0;
      var i = +/* @__PURE__ */ new Date(), o = 0, r = function s() {
        o = +e.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - i) / n, e.style.opacity = o, i = +/* @__PURE__ */ new Date(), +o < 1 && (window.requestAnimationFrame && requestAnimationFrame(s) || setTimeout(s, 16));
      };
      r();
    }
  },
  fadeOut: function(e, n) {
    if (e)
      var i = 1, o = 50, r = n, s = o / r, a = setInterval(function() {
        i -= s, i <= 0 && (i = 0, clearInterval(a)), e.style.opacity = i;
      }, o);
  },
  getUserAgent: function() {
    return navigator.userAgent;
  },
  appendChild: function(e, n) {
    if (this.isElement(n)) n.appendChild(e);
    else if (n.el && n.elElement) n.elElement.appendChild(e);
    else throw new Error("Cannot append " + n + " to " + e);
  },
  isElement: function(e) {
    return (typeof HTMLElement > "u" ? "undefined" : ne(HTMLElement)) === "object" ? e instanceof HTMLElement : e && ne(e) === "object" && e !== null && e.nodeType === 1 && typeof e.nodeName == "string";
  },
  scrollInView: function(e, n) {
    var i = getComputedStyle(e).getPropertyValue("borderTopWidth"), o = i ? parseFloat(i) : 0, r = getComputedStyle(e).getPropertyValue("paddingTop"), s = r ? parseFloat(r) : 0, a = e.getBoundingClientRect(), l = n.getBoundingClientRect(), u = l.top + document.body.scrollTop - (a.top + document.body.scrollTop) - o - s, d = e.scrollTop, c = e.clientHeight, f = this.getOuterHeight(n);
    u < 0 ? e.scrollTop = d + u : u + f > c && (e.scrollTop = d + u - c + f);
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
    var n = e.offsetWidth - e.clientWidth;
    return document.body.removeChild(e), this.calculatedScrollbarWidth = n, n;
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
    var e = navigator.userAgent.toLowerCase(), n = /(chrome)[ ]([\w.]+)/.exec(e) || /(webkit)[ ]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
    return {
      browser: n[1] || "",
      version: n[2] || "0"
    };
  },
  isVisible: function(e) {
    return e && e.offsetParent != null;
  },
  invokeElementMethod: function(e, n, i) {
    e[n].apply(e, i);
  },
  isExist: function(e) {
    return !!(e !== null && typeof e < "u" && e.nodeName && this.getParentNode(e));
  },
  isClient: function() {
    return !!(typeof window < "u" && window.document && window.document.createElement);
  },
  focus: function(e, n) {
    e && document.activeElement !== e && e.focus(n);
  },
  isFocusableElement: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.isElement(e) ? e.matches('button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(n, `,
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n)) : !1;
  },
  getFocusableElements: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = this.find(e, 'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(n, `,
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n, `,
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`).concat(n)), o = [], r = Se(i), s;
    try {
      for (r.s(); !(s = r.n()).done; ) {
        var a = s.value;
        getComputedStyle(a).display != "none" && getComputedStyle(a).visibility != "hidden" && o.push(a);
      }
    } catch (l) {
      r.e(l);
    } finally {
      r.f();
    }
    return o;
  },
  getFirstFocusableElement: function(e, n) {
    var i = this.getFocusableElements(e, n);
    return i.length > 0 ? i[0] : null;
  },
  getLastFocusableElement: function(e, n) {
    var i = this.getFocusableElements(e, n);
    return i.length > 0 ? i[i.length - 1] : null;
  },
  getNextFocusableElement: function(e, n, i) {
    var o = this.getFocusableElements(e, i), r = o.length > 0 ? o.findIndex(function(a) {
      return a === n;
    }) : -1, s = r > -1 && o.length >= r + 1 ? r + 1 : -1;
    return s > -1 ? o[s] : null;
  },
  getPreviousElementSibling: function(e, n) {
    for (var i = e.previousElementSibling; i; ) {
      if (i.matches(n))
        return i;
      i = i.previousElementSibling;
    }
    return null;
  },
  getNextElementSibling: function(e, n) {
    for (var i = e.nextElementSibling; i; ) {
      if (i.matches(n))
        return i;
      i = i.nextElementSibling;
    }
    return null;
  },
  isClickable: function(e) {
    if (e) {
      var n = e.nodeName, i = e.parentElement && e.parentElement.nodeName;
      return n === "INPUT" || n === "TEXTAREA" || n === "BUTTON" || n === "A" || i === "INPUT" || i === "TEXTAREA" || i === "BUTTON" || i === "A" || !!e.closest(".p-button, .p-checkbox, .p-radiobutton");
    }
    return !1;
  },
  applyStyle: function(e, n) {
    if (typeof n == "string")
      e.style.cssText = n;
    else
      for (var i in n)
        e.style[i] = n[i];
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
      var n = getComputedStyle(e), i = parseFloat(n.getPropertyValue("animation-duration") || "0");
      return i > 0;
    }
    return !1;
  },
  hasCSSTransition: function(e) {
    if (e) {
      var n = getComputedStyle(e), i = parseFloat(n.getPropertyValue("transition-duration") || "0");
      return i > 0;
    }
    return !1;
  },
  exportCSV: function(e, n) {
    var i = new Blob([e], {
      type: "application/csv;charset=utf-8;"
    });
    if (window.navigator.msSaveOrOpenBlob)
      navigator.msSaveOrOpenBlob(i, n + ".csv");
    else {
      var o = document.createElement("a");
      o.download !== void 0 ? (o.setAttribute("href", URL.createObjectURL(i)), o.setAttribute("download", n + ".csv"), o.style.display = "none", document.body.appendChild(o), o.click(), document.body.removeChild(o)) : (e = "data:text/csv;charset=utf-8," + e, window.open(encodeURI(e)));
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
function re(t) {
  "@babel/helpers - typeof";
  return re = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, re(t);
}
function Ht(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Bt(t, e) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, Rt(i.key), i);
  }
}
function Kt(t, e, n) {
  return e && Bt(t.prototype, e), Object.defineProperty(t, "prototype", { writable: !1 }), t;
}
function Rt(t) {
  var e = Wt(t, "string");
  return re(e) == "symbol" ? e : String(e);
}
function Wt(t, e) {
  if (re(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (re(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Ut = /* @__PURE__ */ (function() {
  function t(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    };
    Ht(this, t), this.element = e, this.listener = n;
  }
  return Kt(t, [{
    key: "bindScrollListener",
    value: function() {
      this.scrollableParents = y.getScrollableParents(this.element);
      for (var n = 0; n < this.scrollableParents.length; n++)
        this.scrollableParents[n].addEventListener("scroll", this.listener);
    }
  }, {
    key: "unbindScrollListener",
    value: function() {
      if (this.scrollableParents)
        for (var n = 0; n < this.scrollableParents.length; n++)
          this.scrollableParents[n].removeEventListener("scroll", this.listener);
    }
  }, {
    key: "destroy",
    value: function() {
      this.unbindScrollListener(), this.element = null, this.listener = null, this.scrollableParents = null;
    }
  }]), t;
})();
function Nt() {
  var t = /* @__PURE__ */ new Map();
  return {
    on: function(n, i) {
      var o = t.get(n);
      o ? o.push(i) : o = [i], t.set(n, o);
    },
    off: function(n, i) {
      var o = t.get(n);
      o && o.splice(o.indexOf(i) >>> 0, 1);
    },
    emit: function(n, i) {
      var o = t.get(n);
      o && o.slice().map(function(r) {
        r(i);
      });
    }
  };
}
function De(t, e) {
  return Zt(t) || qt(t, e) || ke(t, e) || Gt();
}
function Gt() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qt(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var i, o, r, s, a = [], l = !0, u = !1;
    try {
      if (r = (n = n.call(t)).next, e !== 0) for (; !(l = (i = r.call(n)).done) && (a.push(i.value), a.length !== e); l = !0) ;
    } catch (d) {
      u = !0, o = d;
    } finally {
      try {
        if (!l && n.return != null && (s = n.return(), Object(s) !== s)) return;
      } finally {
        if (u) throw o;
      }
    }
    return a;
  }
}
function Zt(t) {
  if (Array.isArray(t)) return t;
}
function ze(t) {
  return Jt(t) || Yt(t) || ke(t) || Xt();
}
function Xt() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Yt(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function Jt(t) {
  if (Array.isArray(t)) return Le(t);
}
function we(t, e) {
  var n = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!n) {
    if (Array.isArray(t) || (n = ke(t)) || e) {
      n && (t = n);
      var i = 0, o = function() {
      };
      return { s: o, n: function() {
        return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] };
      }, e: function(u) {
        throw u;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var r = !0, s = !1, a;
  return { s: function() {
    n = n.call(t);
  }, n: function() {
    var u = n.next();
    return r = u.done, u;
  }, e: function(u) {
    s = !0, a = u;
  }, f: function() {
    try {
      !r && n.return != null && n.return();
    } finally {
      if (s) throw a;
    }
  } };
}
function ke(t, e) {
  if (t) {
    if (typeof t == "string") return Le(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Le(t, e);
  }
}
function Le(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function ie(t) {
  "@babel/helpers - typeof";
  return ie = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ie(t);
}
var g = {
  equals: function(e, n, i) {
    return i ? this.resolveFieldData(e, i) === this.resolveFieldData(n, i) : this.deepEquals(e, n);
  },
  deepEquals: function(e, n) {
    if (e === n) return !0;
    if (e && n && ie(e) == "object" && ie(n) == "object") {
      var i = Array.isArray(e), o = Array.isArray(n), r, s, a;
      if (i && o) {
        if (s = e.length, s != n.length) return !1;
        for (r = s; r-- !== 0; ) if (!this.deepEquals(e[r], n[r])) return !1;
        return !0;
      }
      if (i != o) return !1;
      var l = e instanceof Date, u = n instanceof Date;
      if (l != u) return !1;
      if (l && u) return e.getTime() == n.getTime();
      var d = e instanceof RegExp, c = n instanceof RegExp;
      if (d != c) return !1;
      if (d && c) return e.toString() == n.toString();
      var f = Object.keys(e);
      if (s = f.length, s !== Object.keys(n).length) return !1;
      for (r = s; r-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(n, f[r])) return !1;
      for (r = s; r-- !== 0; )
        if (a = f[r], !this.deepEquals(e[a], n[a])) return !1;
      return !0;
    }
    return e !== e && n !== n;
  },
  resolveFieldData: function(e, n) {
    if (!e || !n)
      return null;
    try {
      var i = e[n];
      if (this.isNotEmpty(i)) return i;
    } catch {
    }
    if (Object.keys(e).length) {
      if (this.isFunction(n))
        return n(e);
      if (n.indexOf(".") === -1)
        return e[n];
      for (var o = n.split("."), r = e, s = 0, a = o.length; s < a; ++s) {
        if (r == null)
          return null;
        r = r[o[s]];
      }
      return r;
    }
    return null;
  },
  getItemValue: function(e) {
    for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
      i[o - 1] = arguments[o];
    return this.isFunction(e) ? e.apply(void 0, i) : e;
  },
  filter: function(e, n, i) {
    var o = [];
    if (e) {
      var r = we(e), s;
      try {
        for (r.s(); !(s = r.n()).done; ) {
          var a = s.value, l = we(n), u;
          try {
            for (l.s(); !(u = l.n()).done; ) {
              var d = u.value;
              if (String(this.resolveFieldData(a, d)).toLowerCase().indexOf(i.toLowerCase()) > -1) {
                o.push(a);
                break;
              }
            }
          } catch (c) {
            l.e(c);
          } finally {
            l.f();
          }
        }
      } catch (c) {
        r.e(c);
      } finally {
        r.f();
      }
    }
    return o;
  },
  reorderArray: function(e, n, i) {
    e && n !== i && (i >= e.length && (i %= e.length, n %= e.length), e.splice(i, 0, e.splice(n, 1)[0]));
  },
  findIndexInList: function(e, n) {
    var i = -1;
    if (n) {
      for (var o = 0; o < n.length; o++)
        if (n[o] === e) {
          i = o;
          break;
        }
    }
    return i;
  },
  contains: function(e, n) {
    if (e != null && n && n.length) {
      var i = we(n), o;
      try {
        for (i.s(); !(o = i.n()).done; ) {
          var r = o.value;
          if (this.equals(e, r)) return !0;
        }
      } catch (s) {
        i.e(s);
      } finally {
        i.f();
      }
    }
    return !1;
  },
  insertIntoOrderedArray: function(e, n, i, o) {
    if (i.length > 0) {
      for (var r = !1, s = 0; s < i.length; s++) {
        var a = this.findIndexInList(i[s], o);
        if (a > n) {
          i.splice(s, 0, e), r = !0;
          break;
        }
      }
      r || i.push(e);
    } else
      i.push(e);
  },
  removeAccents: function(e) {
    return e && e.search(/[\xC0-\xFF]/g) > -1 && (e = e.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y")), e;
  },
  getVNodeProp: function(e, n) {
    if (e) {
      var i = e.props;
      if (i) {
        var o = n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), r = Object.prototype.hasOwnProperty.call(i, o) ? o : n;
        return e.type.extends.props[n].type === Boolean && i[r] === "" ? !0 : i[r];
      }
    }
    return null;
  },
  toFlatCase: function(e) {
    return this.isString(e) ? e.replace(/(-|_)/g, "").toLowerCase() : e;
  },
  toKebabCase: function(e) {
    return this.isString(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, function(n, i) {
      return i === 0 ? n : "-" + n.toLowerCase();
    }).toLowerCase() : e;
  },
  toCapitalCase: function(e) {
    return this.isString(e, {
      empty: !1
    }) ? e[0].toUpperCase() + e.slice(1) : e;
  },
  isEmpty: function(e) {
    return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && ie(e) === "object" && Object.keys(e).length === 0;
  },
  isNotEmpty: function(e) {
    return !this.isEmpty(e);
  },
  isFunction: function(e) {
    return !!(e && e.constructor && e.call && e.apply);
  },
  isObject: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return e instanceof Object && e.constructor === Object && (n || Object.keys(e).length !== 0);
  },
  isDate: function(e) {
    return e instanceof Date && e.constructor === Date;
  },
  isArray: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return Array.isArray(e) && (n || e.length !== 0);
  },
  isString: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return typeof e == "string" && (n || e !== "");
  },
  isPrintableCharacter: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return this.isNotEmpty(e) && e.length === 1 && e.match(/\S| /);
  },
  /**
   * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlast
   */
  findLast: function(e, n) {
    var i;
    if (this.isNotEmpty(e))
      try {
        i = e.findLast(n);
      } catch {
        i = ze(e).reverse().find(n);
      }
    return i;
  },
  /**
   * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
   */
  findLastIndex: function(e, n) {
    var i = -1;
    if (this.isNotEmpty(e))
      try {
        i = e.findLastIndex(n);
      } catch {
        i = e.lastIndexOf(ze(e).reverse().find(n));
      }
    return i;
  },
  sort: function(e, n) {
    var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, o = arguments.length > 3 ? arguments[3] : void 0, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1, s = this.compare(e, n, o, i), a = i;
    return (this.isEmpty(e) || this.isEmpty(n)) && (a = r === 1 ? i : r), a * s;
  },
  compare: function(e, n, i) {
    var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1, r = -1, s = this.isEmpty(e), a = this.isEmpty(n);
    return s && a ? r = 0 : s ? r = o : a ? r = -o : typeof e == "string" && typeof n == "string" ? r = i(e, n) : r = e < n ? -1 : e > n ? 1 : 0, r;
  },
  localeComparator: function() {
    return new Intl.Collator(void 0, {
      numeric: !0
    }).compare;
  },
  nestedKeys: function() {
    var e = this, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return Object.entries(n).reduce(function(o, r) {
      var s = De(r, 2), a = s[0], l = s[1], u = i ? "".concat(i, ".").concat(a) : a;
      return e.isObject(l) ? o = o.concat(e.nestedKeys(l, u)) : o.push(u), o;
    }, []);
  },
  stringify: function(e) {
    var n = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, r = " ".repeat(o), s = " ".repeat(o + i);
    return this.isArray(e) ? "[" + e.map(function(a) {
      return n.stringify(a, i, o + i);
    }).join(", ") + "]" : this.isDate(e) ? e.toISOString() : this.isFunction(e) ? e.toString() : this.isObject(e) ? `{
` + Object.entries(e).map(function(a) {
      var l = De(a, 2), u = l[0], d = l[1];
      return "".concat(s).concat(u, ": ").concat(n.stringify(d, i, o + i));
    }).join(`,
`) + `
`.concat(r) + "}" : JSON.stringify(e);
  }
}, Me = 0;
function He() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pv_id_";
  return Me++, "".concat(t).concat(Me);
}
function Qt(t) {
  return rn(t) || nn(t) || tn(t) || en();
}
function en() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function tn(t, e) {
  if (t) {
    if (typeof t == "string") return Ee(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ee(t, e);
  }
}
function nn(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function rn(t) {
  if (Array.isArray(t)) return Ee(t);
}
function Ee(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function on() {
  var t = [], e = function(a, l) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 999, d = o(a, l, u), c = d.value + (d.key === a ? 0 : u) + 1;
    return t.push({
      key: a,
      value: c
    }), c;
  }, n = function(a) {
    t = t.filter(function(l) {
      return l.value !== a;
    });
  }, i = function(a, l) {
    return o(a, l).value;
  }, o = function(a, l) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    return Qt(t).reverse().find(function(d) {
      return !0;
    }) || {
      key: a,
      value: u
    };
  }, r = function(a) {
    return a && parseInt(a.style.zIndex, 10) || 0;
  };
  return {
    get: r,
    set: function(a, l, u) {
      l && (l.style.zIndex = String(e(a, !0, u)));
    },
    clear: function(a) {
      a && (n(r(a)), a.style.zIndex = "");
    },
    getCurrent: function(a) {
      return i(a, !0);
    }
  };
}
var Ie = on();
function Be(t, e) {
  var n = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!n) {
    if (Array.isArray(t) || (n = sn(t)) || e) {
      n && (t = n);
      var i = 0, o = function() {
      };
      return { s: o, n: function() {
        return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] };
      }, e: function(u) {
        throw u;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var r = !0, s = !1, a;
  return { s: function() {
    n = n.call(t);
  }, n: function() {
    var u = n.next();
    return r = u.done, u;
  }, e: function(u) {
    s = !0, a = u;
  }, f: function() {
    try {
      !r && n.return != null && n.return();
    } finally {
      if (s) throw a;
    }
  } };
}
function sn(t, e) {
  if (t) {
    if (typeof t == "string") return Ke(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ke(t, e);
  }
}
function Ke(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
  return i;
}
var an = {
  filter: function(e, n, i, o, r) {
    var s = [];
    if (!e)
      return s;
    var a = Be(e), l;
    try {
      for (a.s(); !(l = a.n()).done; ) {
        var u = l.value;
        if (typeof u == "string") {
          if (this.filters[o](u, i, r)) {
            s.push(u);
            continue;
          }
        } else {
          var d = Be(n), c;
          try {
            for (d.s(); !(c = d.n()).done; ) {
              var f = c.value, p = g.resolveFieldData(u, f);
              if (this.filters[o](p, i, r)) {
                s.push(u);
                break;
              }
            }
          } catch (m) {
            d.e(m);
          } finally {
            d.f();
          }
        }
      }
    } catch (m) {
      a.e(m);
    } finally {
      a.f();
    }
    return s;
  },
  filters: {
    startsWith: function(e, n, i) {
      if (n == null || n === "")
        return !0;
      if (e == null)
        return !1;
      var o = g.removeAccents(n.toString()).toLocaleLowerCase(i), r = g.removeAccents(e.toString()).toLocaleLowerCase(i);
      return r.slice(0, o.length) === o;
    },
    contains: function(e, n, i) {
      if (n == null || n === "")
        return !0;
      if (e == null)
        return !1;
      var o = g.removeAccents(n.toString()).toLocaleLowerCase(i), r = g.removeAccents(e.toString()).toLocaleLowerCase(i);
      return r.indexOf(o) !== -1;
    },
    notContains: function(e, n, i) {
      if (n == null || n === "")
        return !0;
      if (e == null)
        return !1;
      var o = g.removeAccents(n.toString()).toLocaleLowerCase(i), r = g.removeAccents(e.toString()).toLocaleLowerCase(i);
      return r.indexOf(o) === -1;
    },
    endsWith: function(e, n, i) {
      if (n == null || n === "")
        return !0;
      if (e == null)
        return !1;
      var o = g.removeAccents(n.toString()).toLocaleLowerCase(i), r = g.removeAccents(e.toString()).toLocaleLowerCase(i);
      return r.indexOf(o, r.length - o.length) !== -1;
    },
    equals: function(e, n, i) {
      return n == null || n === "" ? !0 : e == null ? !1 : e.getTime && n.getTime ? e.getTime() === n.getTime() : g.removeAccents(e.toString()).toLocaleLowerCase(i) == g.removeAccents(n.toString()).toLocaleLowerCase(i);
    },
    notEquals: function(e, n, i) {
      return n == null || n === "" ? !1 : e == null ? !0 : e.getTime && n.getTime ? e.getTime() !== n.getTime() : g.removeAccents(e.toString()).toLocaleLowerCase(i) != g.removeAccents(n.toString()).toLocaleLowerCase(i);
    },
    in: function(e, n) {
      if (n == null || n.length === 0)
        return !0;
      for (var i = 0; i < n.length; i++)
        if (g.equals(e, n[i]))
          return !0;
      return !1;
    },
    between: function(e, n) {
      return n == null || n[0] == null || n[1] == null ? !0 : e == null ? !1 : e.getTime ? n[0].getTime() <= e.getTime() && e.getTime() <= n[1].getTime() : n[0] <= e && e <= n[1];
    },
    lt: function(e, n) {
      return n == null ? !0 : e == null ? !1 : e.getTime && n.getTime ? e.getTime() < n.getTime() : e < n;
    },
    lte: function(e, n) {
      return n == null ? !0 : e == null ? !1 : e.getTime && n.getTime ? e.getTime() <= n.getTime() : e <= n;
    },
    gt: function(e, n) {
      return n == null ? !0 : e == null ? !1 : e.getTime && n.getTime ? e.getTime() > n.getTime() : e > n;
    },
    gte: function(e, n) {
      return n == null ? !0 : e == null ? !1 : e.getTime && n.getTime ? e.getTime() >= n.getTime() : e >= n;
    },
    dateIs: function(e, n) {
      return n == null ? !0 : e == null ? !1 : e.toDateString() === n.toDateString();
    },
    dateIsNot: function(e, n) {
      return n == null ? !0 : e == null ? !1 : e.toDateString() !== n.toDateString();
    },
    dateBefore: function(e, n) {
      return n == null ? !0 : e == null ? !1 : e.getTime() < n.getTime();
    },
    dateAfter: function(e, n) {
      return n == null ? !0 : e == null ? !1 : e.getTime() > n.getTime();
    }
  },
  register: function(e, n) {
    this.filters[e] = n;
  }
};
function oe(t) {
  "@babel/helpers - typeof";
  return oe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, oe(t);
}
function Re(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function We(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Re(Object(n), !0).forEach(function(i) {
      ln(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Re(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function ln(t, e, n) {
  return e = un(e), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function un(t) {
  var e = dn(t, "string");
  return oe(e) == "symbol" ? e : String(e);
}
function dn(t, e) {
  if (oe(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (oe(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function cn(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  wt() ? It(t) : e ? t() : Ct(t);
}
var fn = 0;
function st(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = te(!1), i = te(t), o = te(null), r = y.isClient() ? window.document : void 0, s = e.document, a = s === void 0 ? r : s, l = e.immediate, u = l === void 0 ? !0 : l, d = e.manual, c = d === void 0 ? !1 : d, f = e.name, p = f === void 0 ? "style_".concat(++fn) : f, m = e.id, v = m === void 0 ? void 0 : m, h = e.media, b = h === void 0 ? void 0 : h, w = e.nonce, $ = w === void 0 ? void 0 : w, I = e.props, M = I === void 0 ? {} : I, k = function() {
  }, D = function(W) {
    var x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (a) {
      var _ = We(We({}, M), x), N = _.name || p, G = _.id || v, z = _.nonce || $;
      o.value = a.querySelector('style[data-primevue-style-id="'.concat(N, '"]')) || a.getElementById(G) || a.createElement("style"), o.value.isConnected || (i.value = W || t, y.setAttributes(o.value, {
        type: "text/css",
        id: G,
        media: b,
        nonce: z
      }), a.head.appendChild(o.value), y.setAttribute(o.value, "data-primevue-style-id", p), y.setAttributes(o.value, _)), !n.value && (k = Pt(i, function(K) {
        o.value.textContent = K;
      }, {
        immediate: !0
      }), n.value = !0);
    }
  }, j = function() {
    !a || !n.value || (k(), y.isExist(o.value) && a.head.removeChild(o.value), n.value = !1);
  };
  return u && !c && cn(D), {
    id: v,
    name: p,
    css: i,
    unload: j,
    load: D,
    isLoaded: Ot(n)
  };
}
function se(t) {
  "@babel/helpers - typeof";
  return se = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, se(t);
}
function pn(t, e) {
  return vn(t) || mn(t, e) || gn(t, e) || hn();
}
function hn() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gn(t, e) {
  if (t) {
    if (typeof t == "string") return Ue(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ue(t, e);
  }
}
function Ue(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function mn(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var i, o, r, s, a = [], l = !0, u = !1;
    try {
      if (r = (n = n.call(t)).next, e !== 0) for (; !(l = (i = r.call(n)).done) && (a.push(i.value), a.length !== e); l = !0) ;
    } catch (d) {
      u = !0, o = d;
    } finally {
      try {
        if (!l && n.return != null && (s = n.return(), Object(s) !== s)) return;
      } finally {
        if (u) throw o;
      }
    }
    return a;
  }
}
function vn(t) {
  if (Array.isArray(t)) return t;
}
function Ne(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function Ce(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ne(Object(n), !0).forEach(function(i) {
      yn(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ne(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function yn(t, e, n) {
  return e = bn(e), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function bn(t) {
  var e = Sn(t, "string");
  return se(e) == "symbol" ? e : String(e);
}
function Sn(t, e) {
  if (se(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (se(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var On = `
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
`, wn = {}, In = {}, R = {
  name: "base",
  css: On,
  classes: wn,
  inlineStyles: In,
  loadStyle: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.css ? st(this.css, Ce({
      name: this.name
    }, e)) : {};
  },
  getStyleSheet: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var i = Object.entries(n).reduce(function(o, r) {
        var s = pn(r, 2), a = s[0], l = s[1];
        return o.push("".concat(a, '="').concat(l, '"')) && o;
      }, []).join(" ");
      return '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(i, ">").concat(this.css).concat(e, "</style>");
    }
    return "";
  },
  extend: function(e) {
    return Ce(Ce({}, this), {}, {
      css: void 0
    }, e);
  }
};
function ae(t) {
  "@babel/helpers - typeof";
  return ae = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ae(t);
}
function Ge(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function Cn(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ge(Object(n), !0).forEach(function(i) {
      Pn(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ge(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function Pn(t, e, n) {
  return e = $n(e), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function $n(t) {
  var e = Tn(t, "string");
  return ae(e) == "symbol" ? e : String(e);
}
function Tn(t, e) {
  if (ae(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (ae(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var Pe = R.extend({
  name: "common",
  loadGlobalStyle: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return st(e, Cn({
      name: "global"
    }, n));
  }
});
function le(t) {
  "@babel/helpers - typeof";
  return le = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, le(t);
}
function Ln(t) {
  return ut(t) || En(t) || lt(t) || at();
}
function En(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function ge(t, e) {
  return ut(t) || An(t, e) || lt(t, e) || at();
}
function at() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lt(t, e) {
  if (t) {
    if (typeof t == "string") return qe(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return qe(t, e);
  }
}
function qe(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function An(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var i, o, r, s, a = [], l = !0, u = !1;
    try {
      if (r = (n = n.call(t)).next, e === 0) {
        if (Object(n) !== n) return;
        l = !1;
      } else for (; !(l = (i = r.call(n)).done) && (a.push(i.value), a.length !== e); l = !0) ;
    } catch (d) {
      u = !0, o = d;
    } finally {
      try {
        if (!l && n.return != null && (s = n.return(), Object(s) !== s)) return;
      } finally {
        if (u) throw o;
      }
    }
    return a;
  }
}
function ut(t) {
  if (Array.isArray(t)) return t;
}
function Ze(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function L(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ze(Object(n), !0).forEach(function(i) {
      ve(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ze(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function ve(t, e, n) {
  return e = xn(e), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function xn(t) {
  var e = _n(t, "string");
  return le(e) == "symbol" ? e : String(e);
}
function _n(t, e) {
  if (le(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (le(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var ye = {
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
          var n, i;
          Pe.loadStyle({
            nonce: (n = this.$primevueConfig) === null || n === void 0 || (n = n.csp) === null || n === void 0 ? void 0 : n.nonce
          }), this.$options.style && this.$style.loadStyle({
            nonce: (i = this.$primevueConfig) === null || i === void 0 || (i = i.csp) === null || i === void 0 ? void 0 : i.nonce
          });
        }
      }
    }
  },
  beforeCreate: function() {
    var e, n, i, o, r, s, a, l, u, d, c, f = (e = this.pt) === null || e === void 0 ? void 0 : e._usept, p = f ? (n = this.pt) === null || n === void 0 || (n = n.originalValue) === null || n === void 0 ? void 0 : n[this.$.type.name] : void 0, m = f ? (i = this.pt) === null || i === void 0 || (i = i.value) === null || i === void 0 ? void 0 : i[this.$.type.name] : this.pt;
    (o = m || p) === null || o === void 0 || (o = o.hooks) === null || o === void 0 || (r = o.onBeforeCreate) === null || r === void 0 || r.call(o);
    var v = (s = this.$primevueConfig) === null || s === void 0 || (s = s.pt) === null || s === void 0 ? void 0 : s._usept, h = v ? (a = this.$primevue) === null || a === void 0 || (a = a.config) === null || a === void 0 || (a = a.pt) === null || a === void 0 ? void 0 : a.originalValue : void 0, b = v ? (l = this.$primevue) === null || l === void 0 || (l = l.config) === null || l === void 0 || (l = l.pt) === null || l === void 0 ? void 0 : l.value : (u = this.$primevue) === null || u === void 0 || (u = u.config) === null || u === void 0 ? void 0 : u.pt;
    (d = b || h) === null || d === void 0 || (d = d[this.$.type.name]) === null || d === void 0 || (d = d.hooks) === null || d === void 0 || (c = d.onBeforeCreate) === null || c === void 0 || c.call(d);
  },
  created: function() {
    this._hook("onCreated");
  },
  beforeMount: function() {
    var e;
    R.loadStyle({
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
        var n = this._usePT(this._getPT(this.pt, this.$.type.name), this._getOptionValue, "hooks.".concat(e)), i = this._useDefaultPT(this._getOptionValue, "hooks.".concat(e));
        n?.(), i?.();
      }
    },
    _mergeProps: function(e) {
      for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
        i[o - 1] = arguments[o];
      return g.isFunction(e) ? e.apply(void 0, i) : S.apply(void 0, i);
    },
    _loadGlobalStyles: function() {
      var e, n = this._useGlobalPT(this._getOptionValue, "global.css", this.$params);
      g.isNotEmpty(n) && Pe.loadGlobalStyle(n, {
        nonce: (e = this.$primevueConfig) === null || e === void 0 || (e = e.csp) === null || e === void 0 ? void 0 : e.nonce
      });
    },
    _getHostInstance: function(e) {
      return e ? this.$options.hostName ? e.$.type.name === this.$options.hostName ? e : this._getHostInstance(e.$parentInstance) : e.$parentInstance : void 0;
    },
    _getPropValue: function(e) {
      var n;
      return this[e] || ((n = this._getHostInstance(this)) === null || n === void 0 ? void 0 : n[e]);
    },
    _getOptionValue: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = g.toFlatCase(n).split("."), r = o.shift();
      return r ? g.isObject(e) ? this._getOptionValue(g.getItemValue(e[Object.keys(e).find(function(s) {
        return g.toFlatCase(s) === r;
      }) || ""], i), o.join("."), i) : void 0 : g.getItemValue(e, i);
    },
    _getPTValue: function() {
      var e, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, s = /./g.test(i) && !!o[i.split(".")[0]], a = this._getPropValue("ptOptions") || ((e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.ptOptions) || {}, l = a.mergeSections, u = l === void 0 ? !0 : l, d = a.mergeProps, c = d === void 0 ? !1 : d, f = r ? s ? this._useGlobalPT(this._getPTClassValue, i, o) : this._useDefaultPT(this._getPTClassValue, i, o) : void 0, p = s ? void 0 : this._getPTSelf(n, this._getPTClassValue, i, L(L({}, o), {}, {
        global: f || {}
      })), m = this._getPTDatasets(i);
      return u || !u && p ? c ? this._mergeProps(c, f, p, m) : L(L(L({}, f), p), m) : L(L({}, p), m);
    },
    _getPTSelf: function() {
      for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
        i[o - 1] = arguments[o];
      return S(
        this._usePT.apply(this, [this._getPT(e, this.$name)].concat(i)),
        // Exp; <component :pt="{}"
        this._usePT.apply(this, [this.$_attrsPT].concat(i))
        // Exp; <component :pt:[passthrough_key]:[attribute]="{value}" or <component :pt:[passthrough_key]="() =>{value}"
      );
    },
    _getPTDatasets: function() {
      var e, n, i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", o = "data-pc-", r = i === "root" && g.isNotEmpty((e = this.pt) === null || e === void 0 ? void 0 : e["data-pc-section"]);
      return i !== "transition" && L(L({}, i === "root" && L(ve({}, "".concat(o, "name"), g.toFlatCase(r ? (n = this.pt) === null || n === void 0 ? void 0 : n["data-pc-section"] : this.$.type.name)), r && ve({}, "".concat(o, "extend"), g.toFlatCase(this.$.type.name)))), {}, ve({}, "".concat(o, "section"), g.toFlatCase(i)));
    },
    _getPTClassValue: function() {
      var e = this._getOptionValue.apply(this, arguments);
      return g.isString(e) || g.isArray(e) ? {
        class: e
      } : e;
    },
    _getPT: function(e) {
      var n = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", o = arguments.length > 2 ? arguments[2] : void 0, r = function(a) {
        var l, u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, d = o ? o(a) : a, c = g.toFlatCase(i), f = g.toFlatCase(n.$name);
        return (l = u ? c !== f ? d?.[c] : void 0 : d?.[c]) !== null && l !== void 0 ? l : d;
      };
      return e != null && e.hasOwnProperty("_usept") ? {
        _usept: e._usept,
        originalValue: r(e.originalValue),
        value: r(e.value)
      } : r(e, !0);
    },
    _usePT: function(e, n, i, o) {
      var r = function(v) {
        return n(v, i, o);
      };
      if (e != null && e.hasOwnProperty("_usept")) {
        var s, a = e._usept || ((s = this.$primevueConfig) === null || s === void 0 ? void 0 : s.ptOptions) || {}, l = a.mergeSections, u = l === void 0 ? !0 : l, d = a.mergeProps, c = d === void 0 ? !1 : d, f = r(e.originalValue), p = r(e.value);
        return f === void 0 && p === void 0 ? void 0 : g.isString(p) ? p : g.isString(f) ? f : u || !u && p ? c ? this._mergeProps(c, f, p) : L(L({}, f), p) : p;
      }
      return r(e);
    },
    _useGlobalPT: function(e, n, i) {
      return this._usePT(this.globalPT, e, n, i);
    },
    _useDefaultPT: function(e, n, i) {
      return this._usePT(this.defaultPT, e, n, i);
    },
    ptm: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this._getPTValue(this.pt, e, L(L({}, this.$params), n));
    },
    ptmi: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return S(this.$_attrsNoPT, this.ptm(e, n));
    },
    ptmo: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return this._getPTValue(e, n, L({
        instance: this
      }, i), !1);
    },
    cx: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.isUnstyled ? void 0 : this._getOptionValue(this.$style.classes, e, L(L({}, this.$params), n));
    },
    sx: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (n) {
        var o = this._getOptionValue(this.$style.inlineStyles, e, L(L({}, this.$params), i)), r = this._getOptionValue(Pe.inlineStyles, e, L(L({}, this.$params), i));
        return [r, o];
      }
    }
  },
  computed: {
    globalPT: function() {
      var e, n = this;
      return this._getPT((e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.pt, void 0, function(i) {
        return g.getItemValue(i, {
          instance: n
        });
      });
    },
    defaultPT: function() {
      var e, n = this;
      return this._getPT((e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.pt, void 0, function(i) {
        return n._getOptionValue(i, n.$name, L({}, n.$params)) || g.getItemValue(i, L({}, n.$params));
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
      return L(L({
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
        var n = ge(e, 1), i = n[0];
        return i?.startsWith("pt:");
      }).reduce(function(e, n) {
        var i = ge(n, 2), o = i[0], r = i[1], s = o.split(":"), a = Ln(s), l = a.slice(1);
        return l?.reduce(function(u, d, c, f) {
          return !u[d] && (u[d] = c === f.length - 1 ? r : {}), u[d];
        }, e), e;
      }, {});
    },
    $_attrsNoPT: function() {
      return Object.entries(this.$attrs || {}).filter(function(e) {
        var n = ge(e, 1), i = n[0];
        return !(i != null && i.startsWith("pt:"));
      }).reduce(function(e, n) {
        var i = ge(n, 2), o = i[0], r = i[1];
        return e[o] = r, e;
      }, {});
    }
  }
}, Vn = `
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
`, kn = R.extend({
  name: "baseicon",
  css: Vn
});
function ue(t) {
  "@babel/helpers - typeof";
  return ue = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ue(t);
}
function Xe(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function Ye(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Xe(Object(n), !0).forEach(function(i) {
      Fn(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Xe(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function Fn(t, e, n) {
  return e = jn(e), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function jn(t) {
  var e = Dn(t, "string");
  return ue(e) == "symbol" ? e : String(e);
}
function Dn(t, e) {
  if (ue(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (ue(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var J = {
  name: "BaseIcon",
  extends: ye,
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
  style: kn,
  methods: {
    pti: function() {
      var e = g.isEmpty(this.label);
      return Ye(Ye({}, !this.isUnstyled && {
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
}, dt = {
  name: "BlankIcon",
  extends: J
}, zn = /* @__PURE__ */ T("rect", {
  width: "1",
  height: "1",
  fill: "currentColor",
  "fill-opacity": "0"
}, null, -1), Mn = [zn];
function Hn(t, e, n, i, o, r) {
  return O(), C("svg", S({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), Mn, 16);
}
dt.render = Hn;
var ct = {
  name: "CheckIcon",
  extends: J
}, Bn = /* @__PURE__ */ T("path", {
  d: "M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z",
  fill: "currentColor"
}, null, -1), Kn = [Bn];
function Rn(t, e, n, i, o, r) {
  return O(), C("svg", S({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), Kn, 16);
}
ct.render = Rn;
var ft = {
  name: "ChevronDownIcon",
  extends: J
}, Wn = /* @__PURE__ */ T("path", {
  d: "M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z",
  fill: "currentColor"
}, null, -1), Un = [Wn];
function Nn(t, e, n, i, o, r) {
  return O(), C("svg", S({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), Un, 16);
}
ft.render = Nn;
var pt = {
  name: "SearchIcon",
  extends: J
}, Gn = /* @__PURE__ */ T("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z",
  fill: "currentColor"
}, null, -1), qn = [Gn];
function Zn(t, e, n, i, o, r) {
  return O(), C("svg", S({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), qn, 16);
}
pt.render = Zn;
var Fe = {
  name: "SpinnerIcon",
  extends: J
}, Xn = /* @__PURE__ */ T("path", {
  d: "M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",
  fill: "currentColor"
}, null, -1), Yn = [Xn];
function Jn(t, e, n, i, o, r) {
  return O(), C("svg", S({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), Yn, 16);
}
Fe.render = Jn;
var ht = {
  name: "TimesIcon",
  extends: J
}, Qn = /* @__PURE__ */ T("path", {
  d: "M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z",
  fill: "currentColor"
}, null, -1), ei = [Qn];
function ti(t, e, n, i, o, r) {
  return O(), C("svg", S({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), ei, 16);
}
ht.render = ti;
var ni = Nt(), gt = {
  name: "Portal",
  props: {
    appendTo: {
      type: [String, Object],
      default: "body"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data: function() {
    return {
      mounted: !1
    };
  },
  mounted: function() {
    this.mounted = y.isClient();
  },
  computed: {
    inline: function() {
      return this.disabled || this.appendTo === "self";
    }
  }
};
function ii(t, e, n, i, o, r) {
  return r.inline ? A(t.$slots, "default", {
    key: 0
  }) : o.mounted ? (O(), U($t, {
    key: 1,
    to: n.appendTo
  }, [A(t.$slots, "default")], 8, ["to"])) : V("", !0);
}
gt.render = ii;
function de(t) {
  "@babel/helpers - typeof";
  return de = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, de(t);
}
function Je(t, e) {
  return ai(t) || si(t, e) || oi(t, e) || ri();
}
function ri() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function oi(t, e) {
  if (t) {
    if (typeof t == "string") return Qe(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Qe(t, e);
  }
}
function Qe(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function si(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var i, o, r, s, a = [], l = !0, u = !1;
    try {
      if (r = (n = n.call(t)).next, e !== 0) for (; !(l = (i = r.call(n)).done) && (a.push(i.value), a.length !== e); l = !0) ;
    } catch (d) {
      u = !0, o = d;
    } finally {
      try {
        if (!l && n.return != null && (s = n.return(), Object(s) !== s)) return;
      } finally {
        if (u) throw o;
      }
    }
    return a;
  }
}
function ai(t) {
  if (Array.isArray(t)) return t;
}
function et(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function E(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? et(Object(n), !0).forEach(function(i) {
      Ae(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : et(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function Ae(t, e, n) {
  return e = li(e), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function li(t) {
  var e = ui(t, "string");
  return de(e) == "symbol" ? e : String(e);
}
function ui(t, e) {
  if (de(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (de(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var P = {
  _getMeta: function() {
    return [g.isObject(arguments.length <= 0 ? void 0 : arguments[0]) || arguments.length <= 0 ? void 0 : arguments[0], g.getItemValue(g.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 0 ? void 0 : arguments[0] : arguments.length <= 1 ? void 0 : arguments[1])];
  },
  _getConfig: function(e, n) {
    var i, o, r;
    return (i = (e == null || (o = e.instance) === null || o === void 0 ? void 0 : o.$primevue) || (n == null || (r = n.ctx) === null || r === void 0 || (r = r.appContext) === null || r === void 0 || (r = r.config) === null || r === void 0 || (r = r.globalProperties) === null || r === void 0 ? void 0 : r.$primevue)) === null || i === void 0 ? void 0 : i.config;
  },
  _getOptionValue: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = g.toFlatCase(n).split("."), r = o.shift();
    return r ? g.isObject(e) ? P._getOptionValue(g.getItemValue(e[Object.keys(e).find(function(s) {
      return g.toFlatCase(s) === r;
    }) || ""], i), o.join("."), i) : void 0 : g.getItemValue(e, i);
  },
  _getPTValue: function() {
    var e, n, i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "", s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, l = function() {
      var w = P._getOptionValue.apply(P, arguments);
      return g.isString(w) || g.isArray(w) ? {
        class: w
      } : w;
    }, u = ((e = i.binding) === null || e === void 0 || (e = e.value) === null || e === void 0 ? void 0 : e.ptOptions) || ((n = i.$primevueConfig) === null || n === void 0 ? void 0 : n.ptOptions) || {}, d = u.mergeSections, c = d === void 0 ? !0 : d, f = u.mergeProps, p = f === void 0 ? !1 : f, m = a ? P._useDefaultPT(i, i.defaultPT(), l, r, s) : void 0, v = P._usePT(i, P._getPT(o, i.$name), l, r, E(E({}, s), {}, {
      global: m || {}
    })), h = P._getPTDatasets(i, r);
    return c || !c && v ? p ? P._mergeProps(i, p, m, v, h) : E(E(E({}, m), v), h) : E(E({}, v), h);
  },
  _getPTDatasets: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = "data-pc-";
    return E(E({}, n === "root" && Ae({}, "".concat(i, "name"), g.toFlatCase(e.$name))), {}, Ae({}, "".concat(i, "section"), g.toFlatCase(n)));
  },
  _getPT: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 ? arguments[2] : void 0, o = function(s) {
      var a, l = i ? i(s) : s, u = g.toFlatCase(n);
      return (a = l?.[u]) !== null && a !== void 0 ? a : l;
    };
    return e != null && e.hasOwnProperty("_usept") ? {
      _usept: e._usept,
      originalValue: o(e.originalValue),
      value: o(e.value)
    } : o(e);
  },
  _usePT: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0, i = arguments.length > 2 ? arguments[2] : void 0, o = arguments.length > 3 ? arguments[3] : void 0, r = arguments.length > 4 ? arguments[4] : void 0, s = function(h) {
      return i(h, o, r);
    };
    if (n != null && n.hasOwnProperty("_usept")) {
      var a, l = n._usept || ((a = e.$primevueConfig) === null || a === void 0 ? void 0 : a.ptOptions) || {}, u = l.mergeSections, d = u === void 0 ? !0 : u, c = l.mergeProps, f = c === void 0 ? !1 : c, p = s(n.originalValue), m = s(n.value);
      return p === void 0 && m === void 0 ? void 0 : g.isString(m) ? m : g.isString(p) ? p : d || !d && m ? f ? P._mergeProps(e, f, p, m) : E(E({}, p), m) : m;
    }
    return s(n);
  },
  _useDefaultPT: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = arguments.length > 2 ? arguments[2] : void 0, o = arguments.length > 3 ? arguments[3] : void 0, r = arguments.length > 4 ? arguments[4] : void 0;
    return P._usePT(e, n, i, o, r);
  },
  _hook: function(e, n, i, o, r, s) {
    var a, l, u = "on".concat(g.toCapitalCase(n)), d = P._getConfig(o, r), c = i?.$instance, f = P._usePT(c, P._getPT(o == null || (a = o.value) === null || a === void 0 ? void 0 : a.pt, e), P._getOptionValue, "hooks.".concat(u)), p = P._useDefaultPT(c, d == null || (l = d.pt) === null || l === void 0 || (l = l.directives) === null || l === void 0 ? void 0 : l[e], P._getOptionValue, "hooks.".concat(u)), m = {
      el: i,
      binding: o,
      vnode: r,
      prevVnode: s
    };
    f?.(c, m), p?.(c, m);
  },
  _mergeProps: function() {
    for (var e = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++)
      i[o - 2] = arguments[o];
    return g.isFunction(e) ? e.apply(void 0, i) : S.apply(void 0, i);
  },
  _extend: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = function(r, s, a, l, u) {
      var d, c;
      s._$instances = s._$instances || {};
      var f = P._getConfig(a, l), p = s._$instances[e] || {}, m = g.isEmpty(p) ? E(E({}, n), n?.methods) : {};
      s._$instances[e] = E(E({}, p), {}, {
        /* new instance variables to pass in directive methods */
        $name: e,
        $host: s,
        $binding: a,
        $modifiers: a?.modifiers,
        $value: a?.value,
        $el: p.$el || s || void 0,
        $style: E({
          classes: void 0,
          inlineStyles: void 0,
          loadStyle: function() {
          }
        }, n?.style),
        $primevueConfig: f,
        /* computed instance variables */
        defaultPT: function() {
          return P._getPT(f?.pt, void 0, function(h) {
            var b;
            return h == null || (b = h.directives) === null || b === void 0 ? void 0 : b[e];
          });
        },
        isUnstyled: function() {
          var h, b;
          return ((h = s.$instance) === null || h === void 0 || (h = h.$binding) === null || h === void 0 || (h = h.value) === null || h === void 0 ? void 0 : h.unstyled) !== void 0 ? (b = s.$instance) === null || b === void 0 || (b = b.$binding) === null || b === void 0 || (b = b.value) === null || b === void 0 ? void 0 : b.unstyled : f?.unstyled;
        },
        /* instance's methods */
        ptm: function() {
          var h, b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return P._getPTValue(s.$instance, (h = s.$instance) === null || h === void 0 || (h = h.$binding) === null || h === void 0 || (h = h.value) === null || h === void 0 ? void 0 : h.pt, b, E({}, w));
        },
        ptmo: function() {
          var h = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return P._getPTValue(s.$instance, h, b, w, !1);
        },
        cx: function() {
          var h, b, w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return (h = s.$instance) !== null && h !== void 0 && h.isUnstyled() ? void 0 : P._getOptionValue((b = s.$instance) === null || b === void 0 || (b = b.$style) === null || b === void 0 ? void 0 : b.classes, w, E({}, $));
        },
        sx: function() {
          var h, b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, $ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return w ? P._getOptionValue((h = s.$instance) === null || h === void 0 || (h = h.$style) === null || h === void 0 ? void 0 : h.inlineStyles, b, E({}, $)) : void 0;
        }
      }, m), s.$instance = s._$instances[e], (d = (c = s.$instance)[r]) === null || d === void 0 || d.call(c, s, a, l, u), s["$".concat(e)] = s.$instance, P._hook(e, r, s, a, l, u);
    };
    return {
      created: function(r, s, a, l) {
        i("created", r, s, a, l);
      },
      beforeMount: function(r, s, a, l) {
        var u, d, c, f, p = P._getConfig(s, a);
        R.loadStyle({
          nonce: p == null || (u = p.csp) === null || u === void 0 ? void 0 : u.nonce
        }), !((d = r.$instance) !== null && d !== void 0 && d.isUnstyled()) && ((c = r.$instance) === null || c === void 0 || (c = c.$style) === null || c === void 0 || c.loadStyle({
          nonce: p == null || (f = p.csp) === null || f === void 0 ? void 0 : f.nonce
        })), i("beforeMount", r, s, a, l);
      },
      mounted: function(r, s, a, l) {
        var u, d, c, f, p = P._getConfig(s, a);
        R.loadStyle({
          nonce: p == null || (u = p.csp) === null || u === void 0 ? void 0 : u.nonce
        }), !((d = r.$instance) !== null && d !== void 0 && d.isUnstyled()) && ((c = r.$instance) === null || c === void 0 || (c = c.$style) === null || c === void 0 || c.loadStyle({
          nonce: p == null || (f = p.csp) === null || f === void 0 ? void 0 : f.nonce
        })), i("mounted", r, s, a, l);
      },
      beforeUpdate: function(r, s, a, l) {
        i("beforeUpdate", r, s, a, l);
      },
      updated: function(r, s, a, l) {
        i("updated", r, s, a, l);
      },
      beforeUnmount: function(r, s, a, l) {
        i("beforeUnmount", r, s, a, l);
      },
      unmounted: function(r, s, a, l) {
        i("unmounted", r, s, a, l);
      }
    };
  },
  extend: function() {
    var e = P._getMeta.apply(P, arguments), n = Je(e, 2), i = n[0], o = n[1];
    return E({
      extend: function() {
        var s = P._getMeta.apply(P, arguments), a = Je(s, 2), l = a[0], u = a[1];
        return P.extend(l, E(E(E({}, o), o?.methods), u));
      }
    }, P._extend(i, o));
  }
}, di = {
  root: "p-ink"
}, ci = R.extend({
  name: "ripple",
  classes: di
}), fi = P.extend({
  style: ci
});
function pi(t) {
  return vi(t) || mi(t) || gi(t) || hi();
}
function hi() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gi(t, e) {
  if (t) {
    if (typeof t == "string") return xe(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return xe(t, e);
  }
}
function mi(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function vi(t) {
  if (Array.isArray(t)) return xe(t);
}
function xe(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
  return i;
}
var yi = fi.extend("ripple", {
  mounted: function(e) {
    var n, i = e == null || (n = e.$instance) === null || n === void 0 ? void 0 : n.$primevueConfig;
    i && i.ripple && (this.create(e), this.bindEvents(e), e.setAttribute("data-pd-ripple", !0));
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
      var n = y.createElement("span", {
        role: "presentation",
        "aria-hidden": !0,
        "data-p-ink": !0,
        "data-p-ink-active": !1,
        class: !this.isUnstyled() && this.cx("root"),
        onAnimationEnd: this.onAnimationEnd.bind(this),
        "p-bind": this.ptm("root")
      });
      e.appendChild(n), this.$el = n;
    },
    remove: function(e) {
      var n = this.getInk(e);
      n && (this.unbindEvents(e), n.removeEventListener("animationend", this.onAnimationEnd), n.remove());
    },
    onMouseDown: function(e) {
      var n = this, i = e.currentTarget, o = this.getInk(i);
      if (!(!o || getComputedStyle(o, null).display === "none")) {
        if (!this.isUnstyled() && y.removeClass(o, "p-ink-active"), o.setAttribute("data-p-ink-active", "false"), !y.getHeight(o) && !y.getWidth(o)) {
          var r = Math.max(y.getOuterWidth(i), y.getOuterHeight(i));
          o.style.height = r + "px", o.style.width = r + "px";
        }
        var s = y.getOffset(i), a = e.pageX - s.left + document.body.scrollTop - y.getWidth(o) / 2, l = e.pageY - s.top + document.body.scrollLeft - y.getHeight(o) / 2;
        o.style.top = l + "px", o.style.left = a + "px", !this.isUnstyled() && y.addClass(o, "p-ink-active"), o.setAttribute("data-p-ink-active", "true"), this.timeout = setTimeout(function() {
          o && (!n.isUnstyled() && y.removeClass(o, "p-ink-active"), o.setAttribute("data-p-ink-active", "false"));
        }, 401);
      }
    },
    onAnimationEnd: function(e) {
      this.timeout && clearTimeout(this.timeout), !this.isUnstyled() && y.removeClass(e.currentTarget, "p-ink-active"), e.currentTarget.setAttribute("data-p-ink-active", "false");
    },
    getInk: function(e) {
      return e && e.children ? pi(e.children).find(function(n) {
        return y.getAttribute(n, "data-pc-name") === "ripple";
      }) : void 0;
    }
  }
}), bi = `
@layer primevue {
    .p-virtualscroller {
        position: relative;
        overflow: auto;
        contain: strict;
        transform: translateZ(0);
        will-change: scroll-position;
        outline: 0 none;
    }

    .p-virtualscroller-content {
        position: absolute;
        top: 0;
        left: 0;
        /* contain: content; */
        min-height: 100%;
        min-width: 100%;
        will-change: transform;
    }

    .p-virtualscroller-spacer {
        position: absolute;
        top: 0;
        left: 0;
        height: 1px;
        width: 1px;
        transform-origin: 0 0;
        pointer-events: none;
    }

    .p-virtualscroller .p-virtualscroller-loader {
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .p-virtualscroller-loader.p-component-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-virtualscroller-loading-icon {
        font-size: 2rem;
    }

    .p-virtualscroller-loading-icon.p-icon {
        width: 2rem;
        height: 2rem;
    }

    .p-virtualscroller-horizontal > .p-virtualscroller-content {
        display: flex;
    }

    /* Inline */
    .p-virtualscroller-inline .p-virtualscroller-content {
        position: static;
    }
}
`, tt = R.extend({
  name: "virtualscroller",
  css: bi
}), Si = {
  name: "BaseVirtualScroller",
  extends: ye,
  props: {
    id: {
      type: String,
      default: null
    },
    style: null,
    class: null,
    items: {
      type: Array,
      default: null
    },
    itemSize: {
      type: [Number, Array],
      default: 0
    },
    scrollHeight: null,
    scrollWidth: null,
    orientation: {
      type: String,
      default: "vertical"
    },
    numToleratedItems: {
      type: Number,
      default: null
    },
    delay: {
      type: Number,
      default: 0
    },
    resizeDelay: {
      type: Number,
      default: 10
    },
    lazy: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    loaderDisabled: {
      type: Boolean,
      default: !1
    },
    columns: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: !1
    },
    showSpacer: {
      type: Boolean,
      default: !0
    },
    showLoader: {
      type: Boolean,
      default: !1
    },
    tabindex: {
      type: Number,
      default: 0
    },
    inline: {
      type: Boolean,
      default: !1
    },
    step: {
      type: Number,
      default: 0
    },
    appendOnly: {
      type: Boolean,
      default: !1
    },
    autoSize: {
      type: Boolean,
      default: !1
    }
  },
  style: tt,
  provide: function() {
    return {
      $parentInstance: this
    };
  },
  beforeMount: function() {
    var e;
    tt.loadStyle({
      nonce: (e = this.$primevueConfig) === null || e === void 0 || (e = e.csp) === null || e === void 0 ? void 0 : e.nonce
    });
  }
};
function ce(t) {
  "@babel/helpers - typeof";
  return ce = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ce(t);
}
function nt(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function Q(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? nt(Object(n), !0).forEach(function(i) {
      mt(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : nt(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function mt(t, e, n) {
  return e = Oi(e), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function Oi(t) {
  var e = wi(t, "string");
  return ce(e) == "symbol" ? e : String(e);
}
function wi(t, e) {
  if (ce(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (ce(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var vt = {
  name: "VirtualScroller",
  extends: Si,
  inheritAttrs: !1,
  emits: ["update:numToleratedItems", "scroll", "scroll-index-change", "lazy-load"],
  data: function() {
    var e = this.isBoth();
    return {
      first: e ? {
        rows: 0,
        cols: 0
      } : 0,
      last: e ? {
        rows: 0,
        cols: 0
      } : 0,
      page: e ? {
        rows: 0,
        cols: 0
      } : 0,
      numItemsInViewport: e ? {
        rows: 0,
        cols: 0
      } : 0,
      lastScrollPos: e ? {
        top: 0,
        left: 0
      } : 0,
      d_numToleratedItems: this.numToleratedItems,
      d_loading: this.loading,
      loaderArr: [],
      spacerStyle: {},
      contentStyle: {}
    };
  },
  element: null,
  content: null,
  lastScrollPos: null,
  scrollTimeout: null,
  resizeTimeout: null,
  defaultWidth: 0,
  defaultHeight: 0,
  defaultContentWidth: 0,
  defaultContentHeight: 0,
  isRangeChanged: !1,
  lazyLoadState: {},
  resizeListener: null,
  initialized: !1,
  watch: {
    numToleratedItems: function(e) {
      this.d_numToleratedItems = e;
    },
    loading: function(e, n) {
      this.lazy && e !== n && e !== this.d_loading && (this.d_loading = e);
    },
    items: function(e, n) {
      (!n || n.length !== (e || []).length) && (this.init(), this.calculateAutoSize());
    },
    itemSize: function() {
      this.init(), this.calculateAutoSize();
    },
    orientation: function() {
      this.lastScrollPos = this.isBoth() ? {
        top: 0,
        left: 0
      } : 0;
    },
    scrollHeight: function() {
      this.init(), this.calculateAutoSize();
    },
    scrollWidth: function() {
      this.init(), this.calculateAutoSize();
    }
  },
  mounted: function() {
    this.viewInit(), this.lastScrollPos = this.isBoth() ? {
      top: 0,
      left: 0
    } : 0, this.lazyLoadState = this.lazyLoadState || {};
  },
  updated: function() {
    !this.initialized && this.viewInit();
  },
  unmounted: function() {
    this.unbindResizeListener(), this.initialized = !1;
  },
  methods: {
    viewInit: function() {
      y.isVisible(this.element) && (this.setContentEl(this.content), this.init(), this.calculateAutoSize(), this.bindResizeListener(), this.defaultWidth = y.getWidth(this.element), this.defaultHeight = y.getHeight(this.element), this.defaultContentWidth = y.getWidth(this.content), this.defaultContentHeight = y.getHeight(this.content), this.initialized = !0);
    },
    init: function() {
      this.disabled || (this.setSize(), this.calculateOptions(), this.setSpacerSize());
    },
    isVertical: function() {
      return this.orientation === "vertical";
    },
    isHorizontal: function() {
      return this.orientation === "horizontal";
    },
    isBoth: function() {
      return this.orientation === "both";
    },
    scrollTo: function(e) {
      this.element && this.element.scrollTo(e);
    },
    scrollToIndex: function(e) {
      var n = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "auto", o = this.isBoth(), r = this.isHorizontal(), s = o ? e.every(function(D) {
        return D > -1;
      }) : e > -1;
      if (s) {
        var a = this.first, l = this.element, u = l.scrollTop, d = u === void 0 ? 0 : u, c = l.scrollLeft, f = c === void 0 ? 0 : c, p = this.calculateNumItems(), m = p.numToleratedItems, v = this.getContentPosition(), h = this.itemSize, b = function() {
          var j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, H = arguments.length > 1 ? arguments[1] : void 0;
          return j <= H ? 0 : j;
        }, w = function(j, H, W) {
          return j * H + W;
        }, $ = function() {
          var j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, H = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          return n.scrollTo({
            left: j,
            top: H,
            behavior: i
          });
        }, I = o ? {
          rows: 0,
          cols: 0
        } : 0, M = !1, k = !1;
        o ? (I = {
          rows: b(e[0], m[0]),
          cols: b(e[1], m[1])
        }, $(w(I.cols, h[1], v.left), w(I.rows, h[0], v.top)), k = this.lastScrollPos.top !== d || this.lastScrollPos.left !== f, M = I.rows !== a.rows || I.cols !== a.cols) : (I = b(e, m), r ? $(w(I, h, v.left), d) : $(f, w(I, h, v.top)), k = this.lastScrollPos !== (r ? f : d), M = I !== a), this.isRangeChanged = M, k && (this.first = I);
      }
    },
    scrollInView: function(e, n) {
      var i = this, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "auto";
      if (n) {
        var r = this.isBoth(), s = this.isHorizontal(), a = r ? e.every(function(h) {
          return h > -1;
        }) : e > -1;
        if (a) {
          var l = this.getRenderedRange(), u = l.first, d = l.viewport, c = function() {
            var b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            return i.scrollTo({
              left: b,
              top: w,
              behavior: o
            });
          }, f = n === "to-start", p = n === "to-end";
          if (f) {
            if (r)
              d.first.rows - u.rows > e[0] ? c(d.first.cols * this.itemSize[1], (d.first.rows - 1) * this.itemSize[0]) : d.first.cols - u.cols > e[1] && c((d.first.cols - 1) * this.itemSize[1], d.first.rows * this.itemSize[0]);
            else if (d.first - u > e) {
              var m = (d.first - 1) * this.itemSize;
              s ? c(m, 0) : c(0, m);
            }
          } else if (p) {
            if (r)
              d.last.rows - u.rows <= e[0] + 1 ? c(d.first.cols * this.itemSize[1], (d.first.rows + 1) * this.itemSize[0]) : d.last.cols - u.cols <= e[1] + 1 && c((d.first.cols + 1) * this.itemSize[1], d.first.rows * this.itemSize[0]);
            else if (d.last - u <= e + 1) {
              var v = (d.first + 1) * this.itemSize;
              s ? c(v, 0) : c(0, v);
            }
          }
        }
      } else
        this.scrollToIndex(e, o);
    },
    getRenderedRange: function() {
      var e = function(c, f) {
        return Math.floor(c / (f || c));
      }, n = this.first, i = 0;
      if (this.element) {
        var o = this.isBoth(), r = this.isHorizontal(), s = this.element, a = s.scrollTop, l = s.scrollLeft;
        if (o)
          n = {
            rows: e(a, this.itemSize[0]),
            cols: e(l, this.itemSize[1])
          }, i = {
            rows: n.rows + this.numItemsInViewport.rows,
            cols: n.cols + this.numItemsInViewport.cols
          };
        else {
          var u = r ? l : a;
          n = e(u, this.itemSize), i = n + this.numItemsInViewport;
        }
      }
      return {
        first: this.first,
        last: this.last,
        viewport: {
          first: n,
          last: i
        }
      };
    },
    calculateNumItems: function() {
      var e = this.isBoth(), n = this.isHorizontal(), i = this.itemSize, o = this.getContentPosition(), r = this.element ? this.element.offsetWidth - o.left : 0, s = this.element ? this.element.offsetHeight - o.top : 0, a = function(f, p) {
        return Math.ceil(f / (p || f));
      }, l = function(f) {
        return Math.ceil(f / 2);
      }, u = e ? {
        rows: a(s, i[0]),
        cols: a(r, i[1])
      } : a(n ? r : s, i), d = this.d_numToleratedItems || (e ? [l(u.rows), l(u.cols)] : l(u));
      return {
        numItemsInViewport: u,
        numToleratedItems: d
      };
    },
    calculateOptions: function() {
      var e = this, n = this.isBoth(), i = this.first, o = this.calculateNumItems(), r = o.numItemsInViewport, s = o.numToleratedItems, a = function(d, c, f) {
        var p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
        return e.getLast(d + c + (d < f ? 2 : 3) * f, p);
      }, l = n ? {
        rows: a(i.rows, r.rows, s[0]),
        cols: a(i.cols, r.cols, s[1], !0)
      } : a(i, r, s);
      this.last = l, this.numItemsInViewport = r, this.d_numToleratedItems = s, this.$emit("update:numToleratedItems", this.d_numToleratedItems), this.showLoader && (this.loaderArr = n ? Array.from({
        length: r.rows
      }).map(function() {
        return Array.from({
          length: r.cols
        });
      }) : Array.from({
        length: r
      })), this.lazy && Promise.resolve().then(function() {
        var u;
        e.lazyLoadState = {
          first: e.step ? n ? {
            rows: 0,
            cols: i.cols
          } : 0 : i,
          last: Math.min(e.step ? e.step : l, ((u = e.items) === null || u === void 0 ? void 0 : u.length) || 0)
        }, e.$emit("lazy-load", e.lazyLoadState);
      });
    },
    calculateAutoSize: function() {
      var e = this;
      this.autoSize && !this.d_loading && Promise.resolve().then(function() {
        if (e.content) {
          var n = e.isBoth(), i = e.isHorizontal(), o = e.isVertical();
          e.content.style.minHeight = e.content.style.minWidth = "auto", e.content.style.position = "relative", e.element.style.contain = "none";
          var r = [y.getWidth(e.element), y.getHeight(e.element)], s = r[0], a = r[1];
          (n || i) && (e.element.style.width = s < e.defaultWidth ? s + "px" : e.scrollWidth || e.defaultWidth + "px"), (n || o) && (e.element.style.height = a < e.defaultHeight ? a + "px" : e.scrollHeight || e.defaultHeight + "px"), e.content.style.minHeight = e.content.style.minWidth = "", e.content.style.position = "", e.element.style.contain = "";
        }
      });
    },
    getLast: function() {
      var e, n, i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, o = arguments.length > 1 ? arguments[1] : void 0;
      return this.items ? Math.min(o ? ((e = this.columns || this.items[0]) === null || e === void 0 ? void 0 : e.length) || 0 : ((n = this.items) === null || n === void 0 ? void 0 : n.length) || 0, i) : 0;
    },
    getContentPosition: function() {
      if (this.content) {
        var e = getComputedStyle(this.content), n = parseFloat(e.paddingLeft) + Math.max(parseFloat(e.left) || 0, 0), i = parseFloat(e.paddingRight) + Math.max(parseFloat(e.right) || 0, 0), o = parseFloat(e.paddingTop) + Math.max(parseFloat(e.top) || 0, 0), r = parseFloat(e.paddingBottom) + Math.max(parseFloat(e.bottom) || 0, 0);
        return {
          left: n,
          right: i,
          top: o,
          bottom: r,
          x: n + i,
          y: o + r
        };
      }
      return {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        x: 0,
        y: 0
      };
    },
    setSize: function() {
      var e = this;
      if (this.element) {
        var n = this.isBoth(), i = this.isHorizontal(), o = this.element.parentElement, r = this.scrollWidth || "".concat(this.element.offsetWidth || o.offsetWidth, "px"), s = this.scrollHeight || "".concat(this.element.offsetHeight || o.offsetHeight, "px"), a = function(u, d) {
          return e.element.style[u] = d;
        };
        n || i ? (a("height", s), a("width", r)) : a("height", s);
      }
    },
    setSpacerSize: function() {
      var e = this, n = this.items;
      if (n) {
        var i = this.isBoth(), o = this.isHorizontal(), r = this.getContentPosition(), s = function(l, u, d) {
          var c = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
          return e.spacerStyle = Q(Q({}, e.spacerStyle), mt({}, "".concat(l), (u || []).length * d + c + "px"));
        };
        i ? (s("height", n, this.itemSize[0], r.y), s("width", this.columns || n[1], this.itemSize[1], r.x)) : o ? s("width", this.columns || n, this.itemSize, r.x) : s("height", n, this.itemSize, r.y);
      }
    },
    setContentPosition: function(e) {
      var n = this;
      if (this.content && !this.appendOnly) {
        var i = this.isBoth(), o = this.isHorizontal(), r = e ? e.first : this.first, s = function(d, c) {
          return d * c;
        }, a = function() {
          var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          return n.contentStyle = Q(Q({}, n.contentStyle), {
            transform: "translate3d(".concat(d, "px, ").concat(c, "px, 0)")
          });
        };
        if (i)
          a(s(r.cols, this.itemSize[1]), s(r.rows, this.itemSize[0]));
        else {
          var l = s(r, this.itemSize);
          o ? a(l, 0) : a(0, l);
        }
      }
    },
    onScrollPositionChange: function(e) {
      var n = this, i = e.target, o = this.isBoth(), r = this.isHorizontal(), s = this.getContentPosition(), a = function(x, _) {
        return x ? x > _ ? x - _ : x : 0;
      }, l = function(x, _) {
        return Math.floor(x / (_ || x));
      }, u = function(x, _, N, G, z, K) {
        return x <= z ? z : K ? N - G - z : _ + z - 1;
      }, d = function(x, _, N, G, z, K, he) {
        return x <= K ? 0 : Math.max(0, he ? x < _ ? N : x - K : x > _ ? N : x - 2 * K);
      }, c = function(x, _, N, G, z, K) {
        var he = _ + G + 2 * z;
        return x >= z && (he += z + 1), n.getLast(he, K);
      }, f = a(i.scrollTop, s.top), p = a(i.scrollLeft, s.left), m = o ? {
        rows: 0,
        cols: 0
      } : 0, v = this.last, h = !1, b = this.lastScrollPos;
      if (o) {
        var w = this.lastScrollPos.top <= f, $ = this.lastScrollPos.left <= p;
        if (!this.appendOnly || this.appendOnly && (w || $)) {
          var I = {
            rows: l(f, this.itemSize[0]),
            cols: l(p, this.itemSize[1])
          }, M = {
            rows: u(I.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], w),
            cols: u(I.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], $)
          };
          m = {
            rows: d(I.rows, M.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], w),
            cols: d(I.cols, M.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], $)
          }, v = {
            rows: c(I.rows, m.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
            cols: c(I.cols, m.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], !0)
          }, h = m.rows !== this.first.rows || v.rows !== this.last.rows || m.cols !== this.first.cols || v.cols !== this.last.cols || this.isRangeChanged, b = {
            top: f,
            left: p
          };
        }
      } else {
        var k = r ? p : f, D = this.lastScrollPos <= k;
        if (!this.appendOnly || this.appendOnly && D) {
          var j = l(k, this.itemSize), H = u(j, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, D);
          m = d(j, H, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, D), v = c(j, m, this.last, this.numItemsInViewport, this.d_numToleratedItems), h = m !== this.first || v !== this.last || this.isRangeChanged, b = k;
        }
      }
      return {
        first: m,
        last: v,
        isRangeChanged: h,
        scrollPos: b
      };
    },
    onScrollChange: function(e) {
      var n = this.onScrollPositionChange(e), i = n.first, o = n.last, r = n.isRangeChanged, s = n.scrollPos;
      if (r) {
        var a = {
          first: i,
          last: o
        };
        if (this.setContentPosition(a), this.first = i, this.last = o, this.lastScrollPos = s, this.$emit("scroll-index-change", a), this.lazy && this.isPageChanged(i)) {
          var l, u, d = {
            first: this.step ? Math.min(this.getPageByFirst(i) * this.step, (((l = this.items) === null || l === void 0 ? void 0 : l.length) || 0) - this.step) : i,
            last: Math.min(this.step ? (this.getPageByFirst(i) + 1) * this.step : o, ((u = this.items) === null || u === void 0 ? void 0 : u.length) || 0)
          }, c = this.lazyLoadState.first !== d.first || this.lazyLoadState.last !== d.last;
          c && this.$emit("lazy-load", d), this.lazyLoadState = d;
        }
      }
    },
    onScroll: function(e) {
      var n = this;
      if (this.$emit("scroll", e), this.delay) {
        if (this.scrollTimeout && clearTimeout(this.scrollTimeout), this.isPageChanged()) {
          if (!this.d_loading && this.showLoader) {
            var i = this.onScrollPositionChange(e), o = i.isRangeChanged, r = o || (this.step ? this.isPageChanged() : !1);
            r && (this.d_loading = !0);
          }
          this.scrollTimeout = setTimeout(function() {
            n.onScrollChange(e), n.d_loading && n.showLoader && (!n.lazy || n.loading === void 0) && (n.d_loading = !1, n.page = n.getPageByFirst());
          }, this.delay);
        }
      } else
        this.onScrollChange(e);
    },
    onResize: function() {
      var e = this;
      this.resizeTimeout && clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
        if (y.isVisible(e.element)) {
          var n = e.isBoth(), i = e.isVertical(), o = e.isHorizontal(), r = [y.getWidth(e.element), y.getHeight(e.element)], s = r[0], a = r[1], l = s !== e.defaultWidth, u = a !== e.defaultHeight, d = n ? l || u : o ? l : i ? u : !1;
          d && (e.d_numToleratedItems = e.numToleratedItems, e.defaultWidth = s, e.defaultHeight = a, e.defaultContentWidth = y.getWidth(e.content), e.defaultContentHeight = y.getHeight(e.content), e.init());
        }
      }, this.resizeDelay);
    },
    bindResizeListener: function() {
      this.resizeListener || (this.resizeListener = this.onResize.bind(this), window.addEventListener("resize", this.resizeListener), window.addEventListener("orientationchange", this.resizeListener));
    },
    unbindResizeListener: function() {
      this.resizeListener && (window.removeEventListener("resize", this.resizeListener), window.removeEventListener("orientationchange", this.resizeListener), this.resizeListener = null);
    },
    getOptions: function(e) {
      var n = (this.items || []).length, i = this.isBoth() ? this.first.rows + e : this.first + e;
      return {
        index: i,
        count: n,
        first: i === 0,
        last: i === n - 1,
        even: i % 2 === 0,
        odd: i % 2 !== 0
      };
    },
    getLoaderOptions: function(e, n) {
      var i = this.loaderArr.length;
      return Q({
        index: e,
        count: i,
        first: e === 0,
        last: e === i - 1,
        even: e % 2 === 0,
        odd: e % 2 !== 0
      }, n);
    },
    getPageByFirst: function(e) {
      return Math.floor(((e ?? this.first) + this.d_numToleratedItems * 4) / (this.step || 1));
    },
    isPageChanged: function(e) {
      return this.step ? this.page !== this.getPageByFirst(e ?? this.first) : !0;
    },
    setContentEl: function(e) {
      this.content = e || this.content || y.findSingle(this.element, '[data-pc-section="content"]');
    },
    elementRef: function(e) {
      this.element = e;
    },
    contentRef: function(e) {
      this.content = e;
    }
  },
  computed: {
    containerClass: function() {
      return ["p-virtualscroller", this.class, {
        "p-virtualscroller-inline": this.inline,
        "p-virtualscroller-both p-both-scroll": this.isBoth(),
        "p-virtualscroller-horizontal p-horizontal-scroll": this.isHorizontal()
      }];
    },
    contentClass: function() {
      return ["p-virtualscroller-content", {
        "p-virtualscroller-loading": this.d_loading
      }];
    },
    loaderClass: function() {
      return ["p-virtualscroller-loader", {
        "p-component-overlay": !this.$slots.loader
      }];
    },
    loadedItems: function() {
      var e = this;
      return this.items && !this.d_loading ? this.isBoth() ? this.items.slice(this.appendOnly ? 0 : this.first.rows, this.last.rows).map(function(n) {
        return e.columns ? n : n.slice(e.appendOnly ? 0 : e.first.cols, e.last.cols);
      }) : this.isHorizontal() && this.columns ? this.items : this.items.slice(this.appendOnly ? 0 : this.first, this.last) : [];
    },
    loadedRows: function() {
      return this.d_loading ? this.loaderDisabled ? this.loaderArr : [] : this.loadedItems;
    },
    loadedColumns: function() {
      if (this.columns) {
        var e = this.isBoth(), n = this.isHorizontal();
        if (e || n)
          return this.d_loading && this.loaderDisabled ? e ? this.loaderArr[0] : this.loaderArr : this.columns.slice(e ? this.first.cols : this.first, e ? this.last.cols : this.last);
      }
      return this.columns;
    }
  },
  components: {
    SpinnerIcon: Fe
  }
}, Ii = ["tabindex"];
function Ci(t, e, n, i, o, r) {
  var s = q("SpinnerIcon");
  return t.disabled ? (O(), C(X, {
    key: 1
  }, [A(t.$slots, "default"), A(t.$slots, "content", {
    items: t.items,
    rows: t.items,
    columns: r.loadedColumns
  })], 64)) : (O(), C("div", S({
    key: 0,
    ref: r.elementRef,
    class: r.containerClass,
    tabindex: t.tabindex,
    style: t.style,
    onScroll: e[0] || (e[0] = function() {
      return r.onScroll && r.onScroll.apply(r, arguments);
    })
  }, t.ptmi("root")), [A(t.$slots, "content", {
    styleClass: r.contentClass,
    items: r.loadedItems,
    getItemOptions: r.getOptions,
    loading: o.d_loading,
    getLoaderOptions: r.getLoaderOptions,
    itemSize: t.itemSize,
    rows: r.loadedRows,
    columns: r.loadedColumns,
    contentRef: r.contentRef,
    spacerStyle: o.spacerStyle,
    contentStyle: o.contentStyle,
    vertical: r.isVertical(),
    horizontal: r.isHorizontal(),
    both: r.isBoth()
  }, function() {
    return [T("div", S({
      ref: r.contentRef,
      class: r.contentClass,
      style: o.contentStyle
    }, t.ptm("content")), [(O(!0), C(X, null, $e(r.loadedItems, function(a, l) {
      return A(t.$slots, "item", {
        key: l,
        item: a,
        options: r.getOptions(l)
      });
    }), 128))], 16)];
  }), t.showSpacer ? (O(), C("div", S({
    key: 0,
    class: "p-virtualscroller-spacer",
    style: o.spacerStyle
  }, t.ptm("spacer")), null, 16)) : V("", !0), !t.loaderDisabled && t.showLoader && o.d_loading ? (O(), C("div", S({
    key: 1,
    class: r.loaderClass
  }, t.ptm("loader")), [t.$slots && t.$slots.loader ? (O(!0), C(X, {
    key: 0
  }, $e(o.loaderArr, function(a, l) {
    return A(t.$slots, "loader", {
      key: l,
      options: r.getLoaderOptions(l, r.isBoth() && {
        numCols: t.d_numItemsInViewport.cols
      })
    });
  }), 128)) : V("", !0), A(t.$slots, "loadingicon", {}, function() {
    return [Y(s, S({
      spin: "",
      class: "p-virtualscroller-loading-icon"
    }, t.ptm("loadingIcon")), null, 16)];
  })], 16)) : V("", !0)], 16, Ii));
}
vt.render = Ci;
var Pi = {
  root: function(e) {
    var n = e.instance, i = e.props, o = e.state;
    return ["p-dropdown p-component p-inputwrapper", {
      "p-disabled": i.disabled,
      "p-invalid": i.invalid,
      "p-variant-filled": i.variant ? i.variant === "filled" : n.$primevue.config.inputStyle === "filled",
      "p-dropdown-clearable": i.showClear,
      "p-focus": o.focused,
      "p-inputwrapper-filled": n.hasSelectedOption,
      "p-inputwrapper-focus": o.focused || o.overlayVisible,
      "p-overlay-open": o.overlayVisible
    }];
  },
  input: function(e) {
    var n, i = e.instance, o = e.props;
    return ["p-dropdown-label p-inputtext", {
      "p-placeholder": !o.editable && i.label === o.placeholder,
      "p-dropdown-label-empty": !o.editable && !i.$slots.value && (i.label === "p-emptylabel" || ((n = i.label) === null || n === void 0 ? void 0 : n.length) === 0)
    }];
  },
  clearIcon: "p-dropdown-clear-icon",
  trigger: "p-dropdown-trigger",
  loadingicon: "p-dropdown-trigger-icon",
  dropdownIcon: "p-dropdown-trigger-icon",
  panel: function(e) {
    e.props;
    var n = e.instance;
    return ["p-dropdown-panel p-component", {
      "p-ripple-disabled": n.$primevue.config.ripple === !1
    }];
  },
  header: "p-dropdown-header",
  filterContainer: "p-dropdown-filter-container",
  filterInput: function(e) {
    var n = e.props, i = e.instance;
    return ["p-dropdown-filter p-inputtext p-component", {
      "p-variant-filled": n.variant ? n.variant === "filled" : i.$primevue.config.inputStyle === "filled"
    }];
  },
  filterIcon: "p-dropdown-filter-icon",
  wrapper: "p-dropdown-items-wrapper",
  list: "p-dropdown-items",
  itemGroup: "p-dropdown-item-group",
  itemGroupLabel: "p-dropdown-item-group-label",
  item: function(e) {
    var n = e.instance, i = e.props, o = e.state, r = e.option, s = e.focusedOption;
    return ["p-dropdown-item", {
      "p-highlight": n.isSelected(r) && i.highlightOnSelect,
      "p-focus": o.focusedOptionIndex === s,
      "p-disabled": n.isOptionDisabled(r)
    }];
  },
  itemLabel: "p-dropdown-item-label",
  checkIcon: "p-dropdown-check-icon",
  blankIcon: "p-dropdown-blank-icon",
  emptyMessage: "p-dropdown-empty-message"
}, $i = R.extend({
  name: "dropdown",
  classes: Pi
}), Ti = {
  name: "BaseDropdown",
  extends: ye,
  props: {
    modelValue: null,
    options: Array,
    optionLabel: [String, Function],
    optionValue: [String, Function],
    optionDisabled: [String, Function],
    optionGroupLabel: [String, Function],
    optionGroupChildren: [String, Function],
    scrollHeight: {
      type: String,
      default: "200px"
    },
    filter: Boolean,
    filterPlaceholder: String,
    filterLocale: String,
    filterMatchMode: {
      type: String,
      default: "contains"
    },
    filterFields: {
      type: Array,
      default: null
    },
    editable: Boolean,
    placeholder: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    invalid: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    dataKey: null,
    showClear: {
      type: Boolean,
      default: !1
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: [String, Object],
      default: null
    },
    inputStyle: {
      type: Object,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    panelClass: {
      type: [String, Object],
      default: null
    },
    panelStyle: {
      type: Object,
      default: null
    },
    panelProps: {
      type: null,
      default: null
    },
    filterInputProps: {
      type: null,
      default: null
    },
    clearIconProps: {
      type: null,
      default: null
    },
    appendTo: {
      type: [String, Object],
      default: "body"
    },
    loading: {
      type: Boolean,
      default: !1
    },
    clearIcon: {
      type: String,
      default: void 0
    },
    dropdownIcon: {
      type: String,
      default: void 0
    },
    filterIcon: {
      type: String,
      default: void 0
    },
    loadingIcon: {
      type: String,
      default: void 0
    },
    resetFilterOnHide: {
      type: Boolean,
      default: !1
    },
    resetFilterOnClear: {
      type: Boolean,
      default: !1
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    autoOptionFocus: {
      type: Boolean,
      default: !1
    },
    autoFilterFocus: {
      type: Boolean,
      default: !1
    },
    selectOnFocus: {
      type: Boolean,
      default: !1
    },
    focusOnHover: {
      type: Boolean,
      default: !0
    },
    highlightOnSelect: {
      type: Boolean,
      default: !0
    },
    checkmark: {
      type: Boolean,
      default: !1
    },
    filterMessage: {
      type: String,
      default: null
    },
    selectionMessage: {
      type: String,
      default: null
    },
    emptySelectionMessage: {
      type: String,
      default: null
    },
    emptyFilterMessage: {
      type: String,
      default: null
    },
    emptyMessage: {
      type: String,
      default: null
    },
    tabindex: {
      type: Number,
      default: 0
    },
    ariaLabel: {
      type: String,
      default: null
    },
    ariaLabelledby: {
      type: String,
      default: null
    }
  },
  style: $i,
  provide: function() {
    return {
      $parentInstance: this
    };
  }
};
function fe(t) {
  "@babel/helpers - typeof";
  return fe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, fe(t);
}
function Li(t) {
  return _i(t) || xi(t) || Ai(t) || Ei();
}
function Ei() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ai(t, e) {
  if (t) {
    if (typeof t == "string") return _e(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _e(t, e);
  }
}
function xi(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function _i(t) {
  if (Array.isArray(t)) return _e(t);
}
function _e(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function it(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function rt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? it(Object(n), !0).forEach(function(i) {
      yt(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : it(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function yt(t, e, n) {
  return e = Vi(e), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function Vi(t) {
  var e = ki(t, "string");
  return fe(e) == "symbol" ? e : String(e);
}
function ki(t, e) {
  if (fe(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (fe(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var bt = {
  name: "Dropdown",
  extends: Ti,
  inheritAttrs: !1,
  emits: ["update:modelValue", "change", "focus", "blur", "before-show", "before-hide", "show", "hide", "filter"],
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  labelClickListener: null,
  overlay: null,
  list: null,
  virtualScroller: null,
  searchTimeout: null,
  searchValue: null,
  isModelValueChanged: !1,
  data: function() {
    return {
      id: this.$attrs.id,
      clicked: !1,
      focused: !1,
      focusedOptionIndex: -1,
      filterValue: null,
      overlayVisible: !1
    };
  },
  watch: {
    "$attrs.id": function(e) {
      this.id = e || He();
    },
    modelValue: function() {
      this.isModelValueChanged = !0;
    },
    options: function() {
      this.autoUpdateModel();
    }
  },
  mounted: function() {
    this.id = this.id || He(), this.autoUpdateModel(), this.bindLabelClickListener();
  },
  updated: function() {
    this.overlayVisible && this.isModelValueChanged && this.scrollInView(this.findSelectedOptionIndex()), this.isModelValueChanged = !1;
  },
  beforeUnmount: function() {
    this.unbindOutsideClickListener(), this.unbindResizeListener(), this.unbindLabelClickListener(), this.scrollHandler && (this.scrollHandler.destroy(), this.scrollHandler = null), this.overlay && (Ie.clear(this.overlay), this.overlay = null);
  },
  methods: {
    getOptionIndex: function(e, n) {
      return this.virtualScrollerDisabled ? e : n && n(e).index;
    },
    getOptionLabel: function(e) {
      return this.optionLabel ? g.resolveFieldData(e, this.optionLabel) : e;
    },
    getOptionValue: function(e) {
      return this.optionValue ? g.resolveFieldData(e, this.optionValue) : e;
    },
    getOptionRenderKey: function(e, n) {
      return (this.dataKey ? g.resolveFieldData(e, this.dataKey) : this.getOptionLabel(e)) + "_" + n;
    },
    getPTItemOptions: function(e, n, i, o) {
      return this.ptm(o, {
        context: {
          option: e,
          index: i,
          selected: this.isSelected(e),
          focused: this.focusedOptionIndex === this.getOptionIndex(i, n),
          disabled: this.isOptionDisabled(e)
        }
      });
    },
    isOptionDisabled: function(e) {
      return this.optionDisabled ? g.resolveFieldData(e, this.optionDisabled) : !1;
    },
    isOptionGroup: function(e) {
      return this.optionGroupLabel && e.optionGroup && e.group;
    },
    getOptionGroupLabel: function(e) {
      return g.resolveFieldData(e, this.optionGroupLabel);
    },
    getOptionGroupChildren: function(e) {
      return g.resolveFieldData(e, this.optionGroupChildren);
    },
    getAriaPosInset: function(e) {
      var n = this;
      return (this.optionGroupLabel ? e - this.visibleOptions.slice(0, e).filter(function(i) {
        return n.isOptionGroup(i);
      }).length : e) + 1;
    },
    show: function(e) {
      this.$emit("before-show"), this.overlayVisible = !0, this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.editable ? -1 : this.findSelectedOptionIndex(), e && y.focus(this.$refs.focusInput);
    },
    hide: function(e) {
      var n = this, i = function() {
        n.$emit("before-hide"), n.overlayVisible = !1, n.clicked = !1, n.focusedOptionIndex = -1, n.searchValue = "", n.resetFilterOnHide && (n.filterValue = null), e && y.focus(n.$refs.focusInput);
      };
      setTimeout(function() {
        i();
      }, 0);
    },
    onFocus: function(e) {
      this.disabled || (this.focused = !0, this.overlayVisible && (this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.editable ? -1 : this.findSelectedOptionIndex(), this.scrollInView(this.focusedOptionIndex)), this.$emit("focus", e));
    },
    onBlur: function(e) {
      this.focused = !1, this.focusedOptionIndex = -1, this.searchValue = "", this.$emit("blur", e);
    },
    onKeyDown: function(e) {
      if (this.disabled || y.isAndroid()) {
        e.preventDefault();
        return;
      }
      var n = e.metaKey || e.ctrlKey;
      switch (e.code) {
        case "ArrowDown":
          this.onArrowDownKey(e);
          break;
        case "ArrowUp":
          this.onArrowUpKey(e, this.editable);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(e, this.editable);
          break;
        case "Home":
          this.onHomeKey(e, this.editable);
          break;
        case "End":
          this.onEndKey(e, this.editable);
          break;
        case "PageDown":
          this.onPageDownKey(e);
          break;
        case "PageUp":
          this.onPageUpKey(e);
          break;
        case "Space":
          this.onSpaceKey(e, this.editable);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(e);
          break;
        case "Escape":
          this.onEscapeKey(e);
          break;
        case "Tab":
          this.onTabKey(e);
          break;
        case "Backspace":
          this.onBackspaceKey(e, this.editable);
          break;
        case "ShiftLeft":
        case "ShiftRight":
          break;
        default:
          !n && g.isPrintableCharacter(e.key) && (!this.overlayVisible && this.show(), !this.editable && this.searchOptions(e, e.key));
          break;
      }
      this.clicked = !1;
    },
    onEditableInput: function(e) {
      var n = e.target.value;
      this.searchValue = "";
      var i = this.searchOptions(e, n);
      !i && (this.focusedOptionIndex = -1), this.updateModel(e, n), !this.overlayVisible && g.isNotEmpty(n) && this.show();
    },
    onContainerClick: function(e) {
      this.disabled || this.loading || e.target.tagName === "INPUT" || e.target.getAttribute("data-pc-section") === "clearicon" || e.target.closest('[data-pc-section="clearicon"]') || ((!this.overlay || !this.overlay.contains(e.target)) && (this.overlayVisible ? this.hide(!0) : this.show(!0)), this.clicked = !0);
    },
    onClearClick: function(e) {
      this.updateModel(e, null), this.resetFilterOnClear && (this.filterValue = null);
    },
    onFirstHiddenFocus: function(e) {
      var n = e.relatedTarget === this.$refs.focusInput ? y.getFirstFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      y.focus(n);
    },
    onLastHiddenFocus: function(e) {
      var n = e.relatedTarget === this.$refs.focusInput ? y.getLastFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      y.focus(n);
    },
    onOptionSelect: function(e, n) {
      var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = this.getOptionValue(n);
      this.updateModel(e, o), i && this.hide(!0);
    },
    onOptionMouseMove: function(e, n) {
      this.focusOnHover && this.changeFocusedOptionIndex(e, n);
    },
    onFilterChange: function(e) {
      var n = e.target.value;
      this.filterValue = n, this.focusedOptionIndex = -1, this.$emit("filter", {
        originalEvent: e,
        value: n
      }), !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
    },
    onFilterKeyDown: function(e) {
      switch (e.code) {
        case "ArrowDown":
          this.onArrowDownKey(e);
          break;
        case "ArrowUp":
          this.onArrowUpKey(e, !0);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(e, !0);
          break;
        case "Home":
          this.onHomeKey(e, !0);
          break;
        case "End":
          this.onEndKey(e, !0);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(e);
          break;
        case "Escape":
          this.onEscapeKey(e);
          break;
        case "Tab":
          this.onTabKey(e, !0);
          break;
      }
    },
    onFilterBlur: function() {
      this.focusedOptionIndex = -1;
    },
    onFilterUpdated: function() {
      this.overlayVisible && this.alignOverlay();
    },
    onOverlayClick: function(e) {
      ni.emit("overlay-click", {
        originalEvent: e,
        target: this.$el
      });
    },
    onOverlayKeyDown: function(e) {
      e.code === "Escape" && this.onEscapeKey(e);
    },
    onArrowDownKey: function(e) {
      if (!this.overlayVisible)
        this.show(), this.editable && this.changeFocusedOptionIndex(e, this.findSelectedOptionIndex());
      else {
        var n = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
        this.changeFocusedOptionIndex(e, n);
      }
      e.preventDefault();
    },
    onArrowUpKey: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (e.altKey && !n)
        this.focusedOptionIndex !== -1 && this.onOptionSelect(e, this.visibleOptions[this.focusedOptionIndex]), this.overlayVisible && this.hide(), e.preventDefault();
      else {
        var i = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
        this.changeFocusedOptionIndex(e, i), !this.overlayVisible && this.show(), e.preventDefault();
      }
    },
    onArrowLeftKey: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      n && (this.focusedOptionIndex = -1);
    },
    onHomeKey: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (n) {
        var i = e.currentTarget;
        e.shiftKey ? i.setSelectionRange(0, e.target.selectionStart) : (i.setSelectionRange(0, 0), this.focusedOptionIndex = -1);
      } else
        this.changeFocusedOptionIndex(e, this.findFirstOptionIndex()), !this.overlayVisible && this.show();
      e.preventDefault();
    },
    onEndKey: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (n) {
        var i = e.currentTarget;
        if (e.shiftKey)
          i.setSelectionRange(e.target.selectionStart, i.value.length);
        else {
          var o = i.value.length;
          i.setSelectionRange(o, o), this.focusedOptionIndex = -1;
        }
      } else
        this.changeFocusedOptionIndex(e, this.findLastOptionIndex()), !this.overlayVisible && this.show();
      e.preventDefault();
    },
    onPageUpKey: function(e) {
      this.scrollInView(0), e.preventDefault();
    },
    onPageDownKey: function(e) {
      this.scrollInView(this.visibleOptions.length - 1), e.preventDefault();
    },
    onEnterKey: function(e) {
      this.overlayVisible ? (this.focusedOptionIndex !== -1 && this.onOptionSelect(e, this.visibleOptions[this.focusedOptionIndex]), this.hide()) : (this.focusedOptionIndex = -1, this.onArrowDownKey(e)), e.preventDefault();
    },
    onSpaceKey: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      !n && this.onEnterKey(e);
    },
    onEscapeKey: function(e) {
      this.overlayVisible && this.hide(!0), e.preventDefault(), e.stopPropagation();
    },
    onTabKey: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      n || (this.overlayVisible && this.hasFocusableElements() ? (y.focus(this.$refs.firstHiddenFocusableElementOnOverlay), e.preventDefault()) : (this.focusedOptionIndex !== -1 && this.onOptionSelect(e, this.visibleOptions[this.focusedOptionIndex]), this.overlayVisible && this.hide(this.filter)));
    },
    onBackspaceKey: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      n && !this.overlayVisible && this.show();
    },
    onOverlayEnter: function(e) {
      Ie.set("overlay", e, this.$primevue.config.zIndex.overlay), y.addStyles(e, {
        position: "absolute",
        top: "0",
        left: "0"
      }), this.alignOverlay(), this.scrollInView(), this.autoFilterFocus && y.focus(this.$refs.filterInput);
    },
    onOverlayAfterEnter: function() {
      this.bindOutsideClickListener(), this.bindScrollListener(), this.bindResizeListener(), this.$emit("show");
    },
    onOverlayLeave: function() {
      this.unbindOutsideClickListener(), this.unbindScrollListener(), this.unbindResizeListener(), this.$emit("hide"), this.overlay = null;
    },
    onOverlayAfterLeave: function(e) {
      Ie.clear(e);
    },
    alignOverlay: function() {
      this.appendTo === "self" ? y.relativePosition(this.overlay, this.$el) : (this.overlay.style.minWidth = y.getOuterWidth(this.$el) + "px", y.absolutePosition(this.overlay, this.$el));
    },
    bindOutsideClickListener: function() {
      var e = this;
      this.outsideClickListener || (this.outsideClickListener = function(n) {
        e.overlayVisible && e.overlay && !e.$el.contains(n.target) && !e.overlay.contains(n.target) && e.hide();
      }, document.addEventListener("click", this.outsideClickListener));
    },
    unbindOutsideClickListener: function() {
      this.outsideClickListener && (document.removeEventListener("click", this.outsideClickListener), this.outsideClickListener = null);
    },
    bindScrollListener: function() {
      var e = this;
      this.scrollHandler || (this.scrollHandler = new Ut(this.$refs.container, function() {
        e.overlayVisible && e.hide();
      })), this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function() {
      this.scrollHandler && this.scrollHandler.unbindScrollListener();
    },
    bindResizeListener: function() {
      var e = this;
      this.resizeListener || (this.resizeListener = function() {
        e.overlayVisible && !y.isTouchDevice() && e.hide();
      }, window.addEventListener("resize", this.resizeListener));
    },
    unbindResizeListener: function() {
      this.resizeListener && (window.removeEventListener("resize", this.resizeListener), this.resizeListener = null);
    },
    bindLabelClickListener: function() {
      var e = this;
      if (!this.editable && !this.labelClickListener) {
        var n = document.querySelector('label[for="'.concat(this.inputId, '"]'));
        n && y.isVisible(n) && (this.labelClickListener = function() {
          y.focus(e.$refs.focusInput);
        }, n.addEventListener("click", this.labelClickListener));
      }
    },
    unbindLabelClickListener: function() {
      if (this.labelClickListener) {
        var e = document.querySelector('label[for="'.concat(this.inputId, '"]'));
        e && y.isVisible(e) && e.removeEventListener("click", this.labelClickListener);
      }
    },
    hasFocusableElements: function() {
      return y.getFocusableElements(this.overlay, ':not([data-p-hidden-focusable="true"])').length > 0;
    },
    isOptionMatched: function(e) {
      var n;
      return this.isValidOption(e) && ((n = this.getOptionLabel(e)) === null || n === void 0 ? void 0 : n.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)));
    },
    isValidOption: function(e) {
      return g.isNotEmpty(e) && !(this.isOptionDisabled(e) || this.isOptionGroup(e));
    },
    isValidSelectedOption: function(e) {
      return this.isValidOption(e) && this.isSelected(e);
    },
    isSelected: function(e) {
      return this.isValidOption(e) && g.equals(this.modelValue, this.getOptionValue(e), this.equalityKey);
    },
    findFirstOptionIndex: function() {
      var e = this;
      return this.visibleOptions.findIndex(function(n) {
        return e.isValidOption(n);
      });
    },
    findLastOptionIndex: function() {
      var e = this;
      return g.findLastIndex(this.visibleOptions, function(n) {
        return e.isValidOption(n);
      });
    },
    findNextOptionIndex: function(e) {
      var n = this, i = e < this.visibleOptions.length - 1 ? this.visibleOptions.slice(e + 1).findIndex(function(o) {
        return n.isValidOption(o);
      }) : -1;
      return i > -1 ? i + e + 1 : e;
    },
    findPrevOptionIndex: function(e) {
      var n = this, i = e > 0 ? g.findLastIndex(this.visibleOptions.slice(0, e), function(o) {
        return n.isValidOption(o);
      }) : -1;
      return i > -1 ? i : e;
    },
    findSelectedOptionIndex: function() {
      var e = this;
      return this.hasSelectedOption ? this.visibleOptions.findIndex(function(n) {
        return e.isValidSelectedOption(n);
      }) : -1;
    },
    findFirstFocusedOptionIndex: function() {
      var e = this.findSelectedOptionIndex();
      return e < 0 ? this.findFirstOptionIndex() : e;
    },
    findLastFocusedOptionIndex: function() {
      var e = this.findSelectedOptionIndex();
      return e < 0 ? this.findLastOptionIndex() : e;
    },
    searchOptions: function(e, n) {
      var i = this;
      this.searchValue = (this.searchValue || "") + n;
      var o = -1, r = !1;
      return g.isNotEmpty(this.searchValue) && (this.focusedOptionIndex !== -1 ? (o = this.visibleOptions.slice(this.focusedOptionIndex).findIndex(function(s) {
        return i.isOptionMatched(s);
      }), o = o === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex(function(s) {
        return i.isOptionMatched(s);
      }) : o + this.focusedOptionIndex) : o = this.visibleOptions.findIndex(function(s) {
        return i.isOptionMatched(s);
      }), o !== -1 && (r = !0), o === -1 && this.focusedOptionIndex === -1 && (o = this.findFirstFocusedOptionIndex()), o !== -1 && this.changeFocusedOptionIndex(e, o)), this.searchTimeout && clearTimeout(this.searchTimeout), this.searchTimeout = setTimeout(function() {
        i.searchValue = "", i.searchTimeout = null;
      }, 500), r;
    },
    changeFocusedOptionIndex: function(e, n) {
      this.focusedOptionIndex !== n && (this.focusedOptionIndex = n, this.scrollInView(), this.selectOnFocus && this.onOptionSelect(e, this.visibleOptions[n], !1));
    },
    scrollInView: function() {
      var e = this, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
      this.$nextTick(function() {
        var i = n !== -1 ? "".concat(e.id, "_").concat(n) : e.focusedOptionId, o = y.findSingle(e.list, 'li[id="'.concat(i, '"]'));
        o ? o.scrollIntoView && o.scrollIntoView({
          block: "nearest"
        }) : e.virtualScrollerDisabled || e.virtualScroller && e.virtualScroller.scrollToIndex(n !== -1 ? n : e.focusedOptionIndex);
      });
    },
    autoUpdateModel: function() {
      this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption && (this.focusedOptionIndex = this.findFirstFocusedOptionIndex(), this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], !1));
    },
    updateModel: function(e, n) {
      this.$emit("update:modelValue", n), this.$emit("change", {
        originalEvent: e,
        value: n
      });
    },
    flatOptions: function(e) {
      var n = this;
      return (e || []).reduce(function(i, o, r) {
        i.push({
          optionGroup: o,
          group: !0,
          index: r
        });
        var s = n.getOptionGroupChildren(o);
        return s && s.forEach(function(a) {
          return i.push(a);
        }), i;
      }, []);
    },
    overlayRef: function(e) {
      this.overlay = e;
    },
    listRef: function(e, n) {
      this.list = e, n && n(e);
    },
    virtualScrollerRef: function(e) {
      this.virtualScroller = e;
    }
  },
  computed: {
    visibleOptions: function() {
      var e = this, n = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      if (this.filterValue) {
        var i = an.filter(n, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
        if (this.optionGroupLabel) {
          var o = this.options || [], r = [];
          return o.forEach(function(s) {
            var a = e.getOptionGroupChildren(s), l = a.filter(function(u) {
              return i.includes(u);
            });
            l.length > 0 && r.push(rt(rt({}, s), {}, yt({}, typeof e.optionGroupChildren == "string" ? e.optionGroupChildren : "items", Li(l))));
          }), this.flatOptions(r);
        }
        return i;
      }
      return n;
    },
    hasSelectedOption: function() {
      return g.isNotEmpty(this.modelValue);
    },
    label: function() {
      var e = this.findSelectedOptionIndex();
      return e !== -1 ? this.getOptionLabel(this.visibleOptions[e]) : this.placeholder || "p-emptylabel";
    },
    editableInputValue: function() {
      var e = this.findSelectedOptionIndex();
      return e !== -1 ? this.getOptionLabel(this.visibleOptions[e]) : this.modelValue || "";
    },
    equalityKey: function() {
      return this.optionValue ? null : this.dataKey;
    },
    searchFields: function() {
      return this.filterFields || [this.optionLabel];
    },
    filterResultMessageText: function() {
      return g.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptyFilterMessageText;
    },
    filterMessageText: function() {
      return this.filterMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptyFilterMessageText: function() {
      return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || "";
    },
    emptyMessageText: function() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage || "";
    },
    selectionMessageText: function() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText: function() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText: function() {
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll("{0}", "1") : this.emptySelectionMessageText;
    },
    listAriaLabel: function() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.listLabel : void 0;
    },
    focusedOptionId: function() {
      return this.focusedOptionIndex !== -1 ? "".concat(this.id, "_").concat(this.focusedOptionIndex) : null;
    },
    ariaSetSize: function() {
      var e = this;
      return this.visibleOptions.filter(function(n) {
        return !e.isOptionGroup(n);
      }).length;
    },
    virtualScrollerDisabled: function() {
      return !this.virtualScrollerOptions;
    }
  },
  directives: {
    ripple: yi
  },
  components: {
    VirtualScroller: vt,
    Portal: gt,
    TimesIcon: ht,
    ChevronDownIcon: ft,
    SpinnerIcon: Fe,
    SearchIcon: pt,
    CheckIcon: ct,
    BlankIcon: dt
  }
};
function pe(t) {
  "@babel/helpers - typeof";
  return pe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, pe(t);
}
function ot(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function B(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ot(Object(n), !0).forEach(function(i) {
      Fi(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ot(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function Fi(t, e, n) {
  return e = ji(e), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function ji(t) {
  var e = Di(t, "string");
  return pe(e) == "symbol" ? e : String(e);
}
function Di(t, e) {
  if (pe(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (pe(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var zi = ["id"], Mi = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-invalid"], Hi = ["id", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-disabled"], Bi = ["value", "placeholder", "aria-owns", "aria-activedescendant"], Ki = ["id", "aria-label"], Ri = ["id"], Wi = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove", "data-p-highlight", "data-p-focused", "data-p-disabled"];
function Ui(t, e, n, i, o, r) {
  var s = q("SpinnerIcon"), a = q("CheckIcon"), l = q("BlankIcon"), u = q("VirtualScroller"), d = q("Portal"), c = Tt("ripple");
  return O(), C("div", S({
    ref: "container",
    id: o.id,
    class: t.cx("root"),
    onClick: e[16] || (e[16] = function() {
      return r.onContainerClick && r.onContainerClick.apply(r, arguments);
    })
  }, t.ptmi("root")), [t.editable ? (O(), C("input", S({
    key: 0,
    ref: "focusInput",
    id: t.inputId,
    type: "text",
    class: [t.cx("input"), t.inputClass],
    style: t.inputStyle,
    value: r.editableInputValue,
    placeholder: t.placeholder,
    tabindex: t.disabled ? -1 : t.tabindex,
    disabled: t.disabled,
    autocomplete: "off",
    role: "combobox",
    "aria-label": t.ariaLabel,
    "aria-labelledby": t.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-expanded": o.overlayVisible,
    "aria-controls": o.id + "_list",
    "aria-activedescendant": o.focused ? r.focusedOptionId : void 0,
    "aria-invalid": t.invalid || void 0,
    onFocus: e[0] || (e[0] = function() {
      return r.onFocus && r.onFocus.apply(r, arguments);
    }),
    onBlur: e[1] || (e[1] = function() {
      return r.onBlur && r.onBlur.apply(r, arguments);
    }),
    onKeydown: e[2] || (e[2] = function() {
      return r.onKeyDown && r.onKeyDown.apply(r, arguments);
    }),
    onInput: e[3] || (e[3] = function() {
      return r.onEditableInput && r.onEditableInput.apply(r, arguments);
    })
  }, B(B({}, t.inputProps), t.ptm("input"))), null, 16, Mi)) : (O(), C("span", S({
    key: 1,
    ref: "focusInput",
    id: t.inputId,
    class: [t.cx("input"), t.inputClass],
    style: t.inputStyle,
    tabindex: t.disabled ? -1 : t.tabindex,
    role: "combobox",
    "aria-label": t.ariaLabel || (r.label === "p-emptylabel" ? void 0 : r.label),
    "aria-labelledby": t.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-expanded": o.overlayVisible,
    "aria-controls": o.id + "_list",
    "aria-activedescendant": o.focused ? r.focusedOptionId : void 0,
    "aria-disabled": t.disabled,
    onFocus: e[4] || (e[4] = function() {
      return r.onFocus && r.onFocus.apply(r, arguments);
    }),
    onBlur: e[5] || (e[5] = function() {
      return r.onBlur && r.onBlur.apply(r, arguments);
    }),
    onKeydown: e[6] || (e[6] = function() {
      return r.onKeyDown && r.onKeyDown.apply(r, arguments);
    })
  }, B(B({}, t.inputProps), t.ptm("input"))), [A(t.$slots, "value", {
    value: t.modelValue,
    placeholder: t.placeholder
  }, function() {
    return [be(F(r.label === "p-emptylabel" ? " " : r.label || "empty"), 1)];
  })], 16, Hi)), t.showClear && t.modelValue != null ? A(t.$slots, "clearicon", {
    key: 2,
    class: ee(t.cx("clearIcon")),
    onClick: r.onClearClick,
    clearCallback: r.onClearClick
  }, function() {
    return [(O(), U(me(t.clearIcon ? "i" : "TimesIcon"), S({
      ref: "clearIcon",
      class: [t.cx("clearIcon"), t.clearIcon],
      onClick: r.onClearClick
    }, B(B({}, t.clearIconProps), t.ptm("clearIcon")), {
      "data-pc-section": "clearicon"
    }), null, 16, ["class", "onClick"]))];
  }) : V("", !0), T("div", S({
    class: t.cx("trigger")
  }, t.ptm("trigger")), [t.loading ? A(t.$slots, "loadingicon", {
    key: 0,
    class: ee(t.cx("loadingIcon"))
  }, function() {
    return [t.loadingIcon ? (O(), C("span", S({
      key: 0,
      class: [t.cx("loadingIcon"), "pi-spin", t.loadingIcon],
      "aria-hidden": "true"
    }, t.ptm("loadingIcon")), null, 16)) : (O(), U(s, S({
      key: 1,
      class: t.cx("loadingIcon"),
      spin: "",
      "aria-hidden": "true"
    }, t.ptm("loadingIcon")), null, 16, ["class"]))];
  }) : A(t.$slots, "dropdownicon", {
    key: 1,
    class: ee(t.cx("dropdownIcon"))
  }, function() {
    return [(O(), U(me(t.dropdownIcon ? "span" : "ChevronDownIcon"), S({
      class: [t.cx("dropdownIcon"), t.dropdownIcon],
      "aria-hidden": "true"
    }, t.ptm("dropdownIcon")), null, 16, ["class"]))];
  })], 16), Y(d, {
    appendTo: t.appendTo
  }, {
    default: Z(function() {
      return [Y(Lt, S({
        name: "p-connected-overlay",
        onEnter: r.onOverlayEnter,
        onAfterEnter: r.onOverlayAfterEnter,
        onLeave: r.onOverlayLeave,
        onAfterLeave: r.onOverlayAfterLeave
      }, t.ptm("transition")), {
        default: Z(function() {
          return [o.overlayVisible ? (O(), C("div", S({
            key: 0,
            ref: r.overlayRef,
            class: [t.cx("panel"), t.panelClass],
            style: t.panelStyle,
            onClick: e[14] || (e[14] = function() {
              return r.onOverlayClick && r.onOverlayClick.apply(r, arguments);
            }),
            onKeydown: e[15] || (e[15] = function() {
              return r.onOverlayKeyDown && r.onOverlayKeyDown.apply(r, arguments);
            })
          }, B(B({}, t.panelProps), t.ptm("panel"))), [T("span", S({
            ref: "firstHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            class: "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: e[7] || (e[7] = function() {
              return r.onFirstHiddenFocus && r.onFirstHiddenFocus.apply(r, arguments);
            })
          }, t.ptm("hiddenFirstFocusableEl"), {
            "data-p-hidden-accessible": !0,
            "data-p-hidden-focusable": !0
          }), null, 16), A(t.$slots, "header", {
            value: t.modelValue,
            options: r.visibleOptions
          }), t.filter ? (O(), C("div", S({
            key: 0,
            class: t.cx("header")
          }, t.ptm("header")), [T("div", S({
            class: t.cx("filterContainer")
          }, t.ptm("filterContainer")), [T("input", S({
            ref: "filterInput",
            type: "text",
            value: o.filterValue,
            onVnodeMounted: e[8] || (e[8] = function() {
              return r.onFilterUpdated && r.onFilterUpdated.apply(r, arguments);
            }),
            onVnodeUpdated: e[9] || (e[9] = function() {
              return r.onFilterUpdated && r.onFilterUpdated.apply(r, arguments);
            }),
            class: t.cx("filterInput"),
            placeholder: t.filterPlaceholder,
            role: "searchbox",
            autocomplete: "off",
            "aria-owns": o.id + "_list",
            "aria-activedescendant": r.focusedOptionId,
            onKeydown: e[10] || (e[10] = function() {
              return r.onFilterKeyDown && r.onFilterKeyDown.apply(r, arguments);
            }),
            onBlur: e[11] || (e[11] = function() {
              return r.onFilterBlur && r.onFilterBlur.apply(r, arguments);
            }),
            onInput: e[12] || (e[12] = function() {
              return r.onFilterChange && r.onFilterChange.apply(r, arguments);
            })
          }, B(B({}, t.filterInputProps), t.ptm("filterInput"))), null, 16, Bi), A(t.$slots, "filtericon", {
            class: ee(t.cx("filterIcon"))
          }, function() {
            return [(O(), U(me(t.filterIcon ? "span" : "SearchIcon"), S({
              class: [t.cx("filterIcon"), t.filterIcon]
            }, t.ptm("filterIcon")), null, 16, ["class"]))];
          })], 16), T("span", S({
            role: "status",
            "aria-live": "polite",
            class: "p-hidden-accessible"
          }, t.ptm("hiddenFilterResult"), {
            "data-p-hidden-accessible": !0
          }), F(r.filterResultMessageText), 17)], 16)) : V("", !0), T("div", S({
            class: t.cx("wrapper"),
            style: {
              "max-height": r.virtualScrollerDisabled ? t.scrollHeight : ""
            }
          }, t.ptm("wrapper")), [Y(u, S({
            ref: r.virtualScrollerRef
          }, t.virtualScrollerOptions, {
            items: r.visibleOptions,
            style: {
              height: t.scrollHeight
            },
            tabindex: -1,
            disabled: r.virtualScrollerDisabled,
            pt: t.ptm("virtualScroller")
          }), Et({
            content: Z(function(f) {
              var p = f.styleClass, m = f.contentRef, v = f.items, h = f.getItemOptions, b = f.contentStyle, w = f.itemSize;
              return [T("ul", S({
                ref: function(I) {
                  return r.listRef(I, m);
                },
                id: o.id + "_list",
                class: [t.cx("list"), p],
                style: b,
                role: "listbox",
                "aria-label": r.listAriaLabel
              }, t.ptm("list")), [(O(!0), C(X, null, $e(v, function($, I) {
                return O(), C(X, {
                  key: r.getOptionRenderKey($, r.getOptionIndex(I, h))
                }, [r.isOptionGroup($) ? (O(), C("li", S({
                  key: 0,
                  id: o.id + "_" + r.getOptionIndex(I, h),
                  style: {
                    height: w ? w + "px" : void 0
                  },
                  class: t.cx("itemGroup"),
                  role: "option"
                }, t.ptm("itemGroup")), [A(t.$slots, "optiongroup", {
                  option: $.optionGroup,
                  index: r.getOptionIndex(I, h)
                }, function() {
                  return [T("span", S({
                    class: t.cx("itemGroupLabel")
                  }, t.ptm("itemGroupLabel")), F(r.getOptionGroupLabel($.optionGroup)), 17)];
                })], 16, Ri)) : At((O(), C("li", S({
                  key: 1,
                  id: o.id + "_" + r.getOptionIndex(I, h),
                  class: t.cx("item", {
                    option: $,
                    focusedOption: r.getOptionIndex(I, h)
                  }),
                  style: {
                    height: w ? w + "px" : void 0
                  },
                  role: "option",
                  "aria-label": r.getOptionLabel($),
                  "aria-selected": r.isSelected($),
                  "aria-disabled": r.isOptionDisabled($),
                  "aria-setsize": r.ariaSetSize,
                  "aria-posinset": r.getAriaPosInset(r.getOptionIndex(I, h)),
                  onClick: function(k) {
                    return r.onOptionSelect(k, $);
                  },
                  onMousemove: function(k) {
                    return r.onOptionMouseMove(k, r.getOptionIndex(I, h));
                  },
                  "data-p-highlight": r.isSelected($),
                  "data-p-focused": o.focusedOptionIndex === r.getOptionIndex(I, h),
                  "data-p-disabled": r.isOptionDisabled($)
                }, r.getPTItemOptions($, h, I, "item")), [t.checkmark ? (O(), C(X, {
                  key: 0
                }, [r.isSelected($) ? (O(), U(a, S({
                  key: 0,
                  class: t.cx("checkIcon")
                }, t.ptm("checkIcon")), null, 16, ["class"])) : (O(), U(l, S({
                  key: 1,
                  class: t.cx("blankIcon")
                }, t.ptm("blankIcon")), null, 16, ["class"]))], 64)) : V("", !0), A(t.$slots, "option", {
                  option: $,
                  index: r.getOptionIndex(I, h)
                }, function() {
                  return [T("span", S({
                    class: t.cx("itemLabel")
                  }, t.ptm("itemLabel")), F(r.getOptionLabel($)), 17)];
                })], 16, Wi)), [[c]])], 64);
              }), 128)), o.filterValue && (!v || v && v.length === 0) ? (O(), C("li", S({
                key: 0,
                class: t.cx("emptyMessage"),
                role: "option"
              }, t.ptm("emptyMessage"), {
                "data-p-hidden-accessible": !0
              }), [A(t.$slots, "emptyfilter", {}, function() {
                return [be(F(r.emptyFilterMessageText), 1)];
              })], 16)) : !t.options || t.options && t.options.length === 0 ? (O(), C("li", S({
                key: 1,
                class: t.cx("emptyMessage"),
                role: "option"
              }, t.ptm("emptyMessage"), {
                "data-p-hidden-accessible": !0
              }), [A(t.$slots, "empty", {}, function() {
                return [be(F(r.emptyMessageText), 1)];
              })], 16)) : V("", !0)], 16, Ki)];
            }),
            _: 2
          }, [t.$slots.loader ? {
            name: "loader",
            fn: Z(function(f) {
              var p = f.options;
              return [A(t.$slots, "loader", {
                options: p
              })];
            }),
            key: "0"
          } : void 0]), 1040, ["items", "style", "disabled", "pt"])], 16), A(t.$slots, "footer", {
            value: t.modelValue,
            options: r.visibleOptions
          }), !t.options || t.options && t.options.length === 0 ? (O(), C("span", S({
            key: 1,
            role: "status",
            "aria-live": "polite",
            class: "p-hidden-accessible"
          }, t.ptm("hiddenEmptyMessage"), {
            "data-p-hidden-accessible": !0
          }), F(r.emptyMessageText), 17)) : V("", !0), T("span", S({
            role: "status",
            "aria-live": "polite",
            class: "p-hidden-accessible"
          }, t.ptm("hiddenSelectedMessage"), {
            "data-p-hidden-accessible": !0
          }), F(r.selectedMessageText), 17), T("span", S({
            ref: "lastHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            class: "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: e[13] || (e[13] = function() {
              return r.onLastHiddenFocus && r.onLastHiddenFocus.apply(r, arguments);
            })
          }, t.ptm("hiddenLastFocusableEl"), {
            "data-p-hidden-accessible": !0,
            "data-p-hidden-focusable": !0
          }), null, 16)], 16)) : V("", !0)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16, zi);
}
bt.render = Ui;
var Ni = {
  root: function(e) {
    var n = e.props;
    return ["p-avatar p-component", {
      "p-avatar-image": n.image != null,
      "p-avatar-circle": n.shape === "circle",
      "p-avatar-lg": n.size === "large",
      "p-avatar-xl": n.size === "xlarge"
    }];
  },
  label: "p-avatar-text",
  icon: "p-avatar-icon"
}, Gi = R.extend({
  name: "avatar",
  classes: Ni
}), qi = {
  name: "BaseAvatar",
  extends: ye,
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "normal"
    },
    shape: {
      type: String,
      default: "square"
    },
    ariaLabelledby: {
      type: String,
      default: null
    },
    ariaLabel: {
      type: String,
      default: null
    }
  },
  style: Gi,
  provide: function() {
    return {
      $parentInstance: this
    };
  }
}, St = {
  name: "Avatar",
  extends: qi,
  inheritAttrs: !1,
  emits: ["error"],
  methods: {
    onError: function(e) {
      this.$emit("error", e);
    }
  }
}, Zi = ["aria-labelledby", "aria-label"], Xi = ["src", "alt"];
function Yi(t, e, n, i, o, r) {
  return O(), C("div", S({
    class: t.cx("root"),
    "aria-labelledby": t.ariaLabelledby,
    "aria-label": t.ariaLabel
  }, t.ptmi("root")), [A(t.$slots, "default", {}, function() {
    return [t.label ? (O(), C("span", S({
      key: 0,
      class: t.cx("label")
    }, t.ptm("label")), F(t.label), 17)) : t.$slots.icon ? (O(), U(me(t.$slots.icon), {
      key: 1,
      class: ee(t.cx("icon"))
    }, null, 8, ["class"])) : t.icon ? (O(), C("span", S({
      key: 2,
      class: [t.cx("icon"), t.icon]
    }, t.ptm("icon")), null, 16)) : t.image ? (O(), C("img", S({
      key: 3,
      src: t.image,
      alt: t.ariaLabel,
      onError: e[0] || (e[0] = function() {
        return r.onError && r.onError.apply(r, arguments);
      })
    }, t.ptm("image")), null, 16, Xi)) : V("", !0)];
  })], 16, Zi);
}
St.render = Yi;
const Ji = { class: "site-header" }, Qi = { class: "header-content" }, er = { class: "header-right" }, tr = { class: "profile-icon" }, nr = {
  key: 0,
  class: "language-item"
}, ir = { key: 1 }, rr = { class: "language-item" }, or = /* @__PURE__ */ xt({
  __name: "Header",
  setup(t) {
    const e = te([
      { name: "English", code: "EN", flag: "🇬🇧" },
      { name: "Deutsch", code: "DE", flag: "🇩🇪" },
      { name: "Français", code: "FR", flag: "🇫🇷" }
    ]), n = te(e.value[0]);
    return (i, o) => (O(), C("header", Ji, [
      T("div", Qi, [
        V(" Left side - could add title/logo here if needed "),
        o[1] || (o[1] = T(
          "div",
          { class: "header-left" },
          [
            V(" Empty for now, can add page title or breadcrumbs ")
          ],
          -1
          /* CACHED */
        )),
        V(" Right side - Profile & Language "),
        T("div", er, [
          V(" Profile Picture Icon "),
          T("div", tr, [
            Y(je(St), {
              icon: "pi pi-user",
              class: "profile-avatar",
              shape: "circle",
              size: "large"
            })
          ]),
          V(" Language Dropdown "),
          Y(je(bt), {
            modelValue: n.value,
            "onUpdate:modelValue": o[0] || (o[0] = (r) => n.value = r),
            options: e.value,
            optionLabel: "name",
            placeholder: "Select Language",
            class: "language-dropdown"
          }, {
            value: Z((r) => [
              r.value ? (O(), C("div", nr, [
                T(
                  "span",
                  null,
                  F(r.value.flag),
                  1
                  /* TEXT */
                ),
                T(
                  "span",
                  null,
                  F(r.value.code),
                  1
                  /* TEXT */
                )
              ])) : (O(), C(
                "span",
                ir,
                F(r.placeholder),
                1
                /* TEXT */
              ))
            ]),
            option: Z((r) => [
              T("div", rr, [
                T(
                  "span",
                  null,
                  F(r.option.flag),
                  1
                  /* TEXT */
                ),
                T(
                  "span",
                  null,
                  F(r.option.name),
                  1
                  /* TEXT */
                )
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue", "options"])
        ])
      ])
    ]));
  }
});
function sr(t) {
  return {};
}
const ar = sr, dr = _t(or, ar);
export {
  dr as default
};
