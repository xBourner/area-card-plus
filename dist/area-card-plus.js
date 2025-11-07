const ei = "v1.1", ti = {
  version: ei
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fe = globalThis, ht = Fe.ShadowRoot && (Fe.ShadyCSS === void 0 || Fe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ut = Symbol(), bt = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ht && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = bt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && bt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ii = (t) => new Vt(typeof t == "string" ? t : t + "", void 0, ut), we = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1]), t[0]);
  return new Vt(i, t, ut);
}, si = (t, e) => {
  if (ht) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), o = Fe.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, $t = ht ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return ii(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: oi, defineProperty: ni, getOwnPropertyDescriptor: ai, getOwnPropertyNames: ri, getOwnPropertySymbols: ci, getPrototypeOf: li } = Object, ae = globalThis, wt = ae.trustedTypes, di = wt ? wt.emptyScript : "", Ze = ae.reactiveElementPolyfillSupport, De = (t, e) => t, qe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? di : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, mt = (t, e) => !oi(t, e), Ct = { attribute: !0, type: String, converter: qe, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ae.litPropertyMetadata ?? (ae.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ye = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ct) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && ni(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = ai(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const a = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(De("elementProperties"))) return;
    const e = li(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(De("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(De("properties"))) {
      const i = this.properties, s = [...ri(i), ...ci(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) i.unshift($t(o));
    } else e !== void 0 && i.push($t(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise(((i) => this.enableUpdating = i)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach(((i) => i(this)));
  }
  addController(e) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$EO) == null || i.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return si(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach(((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach(((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    }));
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    var n;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : qe).toAttribute(i, s.type);
      this._$Em = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n, r;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = s.getPropertyOptions(o), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : qe;
      this._$Em = o;
      const l = c.fromAttribute(i, a.type);
      this[o] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    var o;
    if (e !== void 0) {
      const n = this.constructor, r = this[e];
      if (s ?? (s = n.getPropertyOptions(e)), !((s.hasChanged ?? mt)(r, i) || s.useDefault && s.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: n }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? i ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, r] of o) {
        const { wrapped: a } = r, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, r, c);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach(((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      })), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach(((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((i) => this._$ET(i, this[i])))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ye.elementStyles = [], ye.shadowRootOptions = { mode: "open" }, ye[De("elementProperties")] = /* @__PURE__ */ new Map(), ye[De("finalized")] = /* @__PURE__ */ new Map(), Ze == null || Ze({ ReactiveElement: ye }), (ae.reactiveElementVersions ?? (ae.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ze = globalThis, We = ze.trustedTypes, xt = We ? We.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Kt = "$lit$", ne = `lit$${Math.random().toFixed(9).slice(2)}$`, qt = "?" + ne, hi = `<${qt}>`, pe = document, Me = () => pe.createComment(""), Le = (t) => t === null || typeof t != "object" && typeof t != "function", _t = Array.isArray, ui = (t) => _t(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Xe = `[ 	
\f\r]`, ke = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, At = /-->/g, Et = />/g, de = RegExp(`>|${Xe}(?:([^\\s"'>=/]+)(${Xe}*=${Xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), St = /'/g, Ot = /"/g, Wt = /^(?:script|style|textarea|title)$/i, mi = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), $ = mi(1), Q = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), kt = /* @__PURE__ */ new WeakMap(), me = pe.createTreeWalker(pe, 129);
function Gt(t, e) {
  if (!_t(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return xt !== void 0 ? xt.createHTML(e) : e;
}
const _i = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = ke;
  for (let a = 0; a < i; a++) {
    const c = t[a];
    let l, m, u = -1, d = 0;
    for (; d < c.length && (r.lastIndex = d, m = r.exec(c), m !== null); ) d = r.lastIndex, r === ke ? m[1] === "!--" ? r = At : m[1] !== void 0 ? r = Et : m[2] !== void 0 ? (Wt.test(m[2]) && (o = RegExp("</" + m[2], "g")), r = de) : m[3] !== void 0 && (r = de) : r === de ? m[0] === ">" ? (r = o ?? ke, u = -1) : m[1] === void 0 ? u = -2 : (u = r.lastIndex - m[2].length, l = m[1], r = m[3] === void 0 ? de : m[3] === '"' ? Ot : St) : r === Ot || r === St ? r = de : r === At || r === Et ? r = ke : (r = de, o = void 0);
    const h = r === de && t[a + 1].startsWith("/>") ? " " : "";
    n += r === ke ? c + hi : u >= 0 ? (s.push(l), c.slice(0, u) + Kt + c.slice(u) + ne + h) : c + ne + (u === -2 ? a : h);
  }
  return [Gt(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Pe {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = e.length - 1, c = this.parts, [l, m] = _i(e, i);
    if (this.el = Pe.createElement(l, s), me.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = me.nextNode()) !== null && c.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(Kt)) {
          const d = m[r++], h = o.getAttribute(u).split(ne), p = /([.?@])?(.*)/.exec(d);
          c.push({ type: 1, index: n, name: p[2], strings: h, ctor: p[1] === "." ? fi : p[1] === "?" ? gi : p[1] === "@" ? vi : Ge }), o.removeAttribute(u);
        } else u.startsWith(ne) && (c.push({ type: 6, index: n }), o.removeAttribute(u));
        if (Wt.test(o.tagName)) {
          const u = o.textContent.split(ne), d = u.length - 1;
          if (d > 0) {
            o.textContent = We ? We.emptyScript : "";
            for (let h = 0; h < d; h++) o.append(u[h], Me()), me.nextNode(), c.push({ type: 2, index: ++n });
            o.append(u[d], Me());
          }
        }
      } else if (o.nodeType === 8) if (o.data === qt) c.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(ne, u + 1)) !== -1; ) c.push({ type: 7, index: n }), u += ne.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = pe.createElement("template");
    return s.innerHTML = e, s;
  }
}
function $e(t, e, i = t, s) {
  var r, a;
  if (e === Q) return e;
  let o = s !== void 0 ? (r = i._$Co) == null ? void 0 : r[s] : i._$Cl;
  const n = Le(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = $e(t, o._$AS(t, e.values), o, s)), e;
}
let pi = class {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? pe).importNode(i, !0);
    me.currentNode = o;
    let n = me.nextNode(), r = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let l;
        c.type === 2 ? l = new Ce(n, n.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (l = new yi(n, this, e)), this._$AV.push(l), c = s[++a];
      }
      r !== (c == null ? void 0 : c.index) && (n = me.nextNode(), r++);
    }
    return me.currentNode = pe, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
};
class Ce {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = $e(this, e, i), Le(e) ? e === x || e == null || e === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : e !== this._$AH && e !== Q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ui(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== x && Le(this._$AH) ? this._$AA.nextSibling.data = e : this.T(pe.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Pe.createElement(Gt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const r = new pi(o, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = kt.get(e.strings);
    return i === void 0 && kt.set(e.strings, i = new Pe(e)), i;
  }
  k(e) {
    _t(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new Ce(this.O(Me()), this.O(Me()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class Ge {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = x;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = $e(this, e, i, 0), r = !Le(e) || e !== this._$AH && e !== Q, r && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = n[0], c = 0; c < n.length - 1; c++) l = $e(this, a[s + c], i, c), l === Q && (l = this._$AH[c]), r || (r = !Le(l) || l !== this._$AH[c]), l === x ? e = x : e !== x && (e += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class fi extends Ge {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === x ? void 0 : e;
  }
}
class gi extends Ge {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== x);
  }
}
class vi extends Ge {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = $e(this, e, i, 0) ?? x) === Q) return;
    const s = this._$AH, o = e === x && s !== x || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== x && (s === x || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class yi {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    $e(this, e);
  }
}
const bi = { I: Ce }, Je = ze.litHtmlPolyfillSupport;
Je == null || Je(Pe, Ce), (ze.litHtmlVersions ?? (ze.litHtmlVersions = [])).push("3.3.1");
const Zt = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new Ce(e.insertBefore(Me(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis;
let Y = class extends ye {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Zt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return Q;
  }
};
var Ut;
Y._$litElement$ = !0, Y.finalized = !0, (Ut = _e.litElementHydrateSupport) == null || Ut.call(_e, { LitElement: Y });
const Ye = _e.litElementPolyfillSupport;
Ye == null || Ye({ LitElement: Y });
(_e.litElementVersions ?? (_e.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $i = { attribute: !0, type: String, converter: qe, reflect: !1, hasChanged: mt }, wi = (t = $i, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, c, t);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(a) {
      const c = this[r];
      e.call(this, a), this.requestUpdate(r, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function z(t) {
  return (e, i) => typeof i == "object" ? wi(t, e, i) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(t) {
  return z({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = { ATTRIBUTE: 1, CHILD: 2 }, Ie = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Ne = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, s) {
    this._$Ct = e, this._$AM = i, this._$Ci = s;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = Ie(class extends Ne {
  constructor(t) {
    var e;
    if (super(t), t.type !== pt.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(((e) => t[e])).join(" ") + " ";
  }
  update(t, [e]) {
    var s, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(((n) => n !== ""))));
      for (const n in e) e[n] && !((s = this.nt) != null && s.has(n)) && this.st.add(n);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const n of this.st) n in e || (i.remove(n), this.st.delete(n));
    for (const n in e) {
      const r = !!e[n];
      r === this.st.has(n) || (o = this.nt) != null && o.has(n) || (r ? (i.add(n), this.st.add(n)) : (i.remove(n), this.st.delete(n)));
    }
    return Q;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Ci } = bi, Dt = (t, e) => (t == null ? void 0 : t._$litType$) !== void 0, xi = (t) => {
  var e;
  return ((e = t == null ? void 0 : t._$litType$) == null ? void 0 : e.h) != null;
}, zt = () => document.createComment(""), ue = (t, e, i) => {
  var n;
  const s = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const r = s.insertBefore(zt(), o), a = s.insertBefore(zt(), o);
    i = new Ci(r, a, t, t.options);
  } else {
    const r = i._$AB.nextSibling, a = i._$AM, c = a !== t;
    if (c) {
      let l;
      (n = i._$AQ) == null || n.call(i, t), i._$AM = t, i._$AP !== void 0 && (l = t._$AU) !== a._$AU && i._$AP(l);
    }
    if (r !== o || c) {
      let l = i._$AA;
      for (; l !== r; ) {
        const m = l.nextSibling;
        s.insertBefore(l, o), l = m;
      }
    }
  }
  return i;
}, he = (t, e, i = t) => (t._$AI(e, i), t), Ai = {}, it = (t, e = Ai) => t._$AH = e, st = (t) => t._$AH, Qe = (t) => {
  t._$AR(), t._$AA.remove();
}, Ei = (t) => {
  t._$AR();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = (t) => xi(t) ? t._$litType$.h : t.strings, Mt = Ie(class extends Ne {
  constructor(t) {
    super(t), this.et = /* @__PURE__ */ new WeakMap();
  }
  render(t) {
    return [t];
  }
  update(t, [e]) {
    const i = Dt(this.it) ? Ht(this.it) : null, s = Dt(e) ? Ht(e) : null;
    if (i !== null && (s === null || i !== s)) {
      const o = st(t).pop();
      let n = this.et.get(i);
      if (n === void 0) {
        const r = document.createDocumentFragment();
        n = Zt(x, r), n.setConnected(!1), this.et.set(i, n);
      }
      it(n, [o]), ue(n, void 0, o);
    }
    if (s !== null) {
      if (i === null || i !== s) {
        const o = this.et.get(s);
        if (o !== void 0) {
          const n = st(o).pop();
          Ei(t), ue(t, void 0, n), it(t, [n]);
        }
      }
      this.it = e;
    } else this.it = void 0;
    return this.render(e);
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = "important", Si = " !" + Xt, N = Ie(class extends Ne {
  constructor(t) {
    var e;
    if (super(t), t.type !== pt.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce(((e, i) => {
      const s = t[i];
      return s == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }), "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? i.removeProperty(s) : i[s] = null);
    for (const s in e) {
      const o = e[s];
      if (o != null) {
        this.ft.add(s);
        const n = typeof o == "string" && o.endsWith(Si);
        s.includes("-") || n ? i.setProperty(s, n ? o.slice(0, -11) : o, n ? Xt : "") : i[s] = o;
      }
    }
    return Q;
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) s.set(t[o], o);
  return s;
}, ie = Ie(class extends Ne {
  constructor(t) {
    if (super(t), t.type !== pt.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let s;
    i === void 0 ? i = e : e !== void 0 && (s = e);
    const o = [], n = [];
    let r = 0;
    for (const a of t) o[r] = s ? s(a, r) : r, n[r] = i(a, r), r++;
    return { values: n, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, s]) {
    const o = st(t), { values: n, keys: r } = this.dt(e, i, s);
    if (!Array.isArray(o)) return this.ut = r, n;
    const a = this.ut ?? (this.ut = []), c = [];
    let l, m, u = 0, d = o.length - 1, h = 0, p = n.length - 1;
    for (; u <= d && h <= p; ) if (o[u] === null) u++;
    else if (o[d] === null) d--;
    else if (a[u] === r[h]) c[h] = he(o[u], n[h]), u++, h++;
    else if (a[d] === r[p]) c[p] = he(o[d], n[p]), d--, p--;
    else if (a[u] === r[p]) c[p] = he(o[u], n[p]), ue(t, c[p + 1], o[u]), u++, p--;
    else if (a[d] === r[h]) c[h] = he(o[d], n[h]), ue(t, o[u], o[d]), d--, h++;
    else if (l === void 0 && (l = Lt(r, h, p), m = Lt(a, u, d)), l.has(a[u])) if (l.has(a[d])) {
      const g = m.get(r[h]), _ = g !== void 0 ? o[g] : null;
      if (_ === null) {
        const f = ue(t, o[u]);
        he(f, n[h]), c[h] = f;
      } else c[h] = he(_, n[h]), ue(t, o[u], _), o[g] = null;
      h++;
    } else Qe(o[d]), d--;
    else Qe(o[u]), u++;
    for (; h <= p; ) {
      const g = ue(t, c[p + 1]);
      he(g, n[h]), c[h++] = g;
    }
    for (; u <= d; ) {
      const g = o[u++];
      g !== null && Qe(g);
    }
    return this.ut = r, it(t, c), Q;
  }
});
var Pt = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function Oi(t, e) {
  return !!(t === e || Pt(t) && Pt(e));
}
function ki(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!Oi(t[i], e[i]))
      return !1;
  return !0;
}
function E(t, e) {
  e === void 0 && (e = ki);
  var i = null;
  function s() {
    for (var o = [], n = 0; n < arguments.length; n++)
      o[n] = arguments[n];
    if (i && i.lastThis === this && e(o, i.lastArgs))
      return i.lastResult;
    var r = t.apply(this, o);
    return i = {
      lastResult: r,
      lastArgs: o,
      lastThis: this
    }, r;
  }
  return s.clear = function() {
    i = null;
  }, s;
}
const Re = ["sensor"], Ue = ["binary_sensor"], Ve = ["cover"], ot = ["climate"], Di = ["camera"], He = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
  "script",
  "scene"
], nt = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: ["garage"]
}, Be = {
  alarm_control_panel: { on: "mdi:alarm-light", off: "mdi:alarm-light-off" },
  siren: { on: "mdi:bell-ring", off: "mdi:bell_off" },
  lock: { on: "mdi:lock-open", off: "mdi:lock" },
  light: { on: "mdi:lightbulb", off: "mdi:lightbulb-off" },
  media_player: { on: "mdi:cast", off: "mdi:cast-off" },
  climate: { on: "mdi:thermostat", off: "mdi:thermostat-cog" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  switch: {
    on: "mdi:toggle-switch",
    off: "mdi:toggle-switch-off",
    switch: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
    outlet: { on: "mdi:power-plug", off: "mdi:power-plug-off" }
  },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  lawn_mower: { on: "robot-mower", off: "mdi:robot-mower" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  cover: {
    on: "mdi:garage-open",
    off: "mdi:garage",
    garage: { on: "mdi:garage-open", off: "mdi:garage" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    gate: { on: "mdi:gate-open", off: "mdi:gate" },
    blind: { on: "mdi:blinds-open", off: "mdi:blinds" },
    curtain: { on: "mdi:curtains", off: "mdi:curtains-closed" },
    damper: { on: "mdi:valve-open", off: "mdi:valve-closed" },
    awning: { on: "mdi:awning-outline", off: "mdi:awning-outline" },
    shutter: { on: "mdi:window-shutter-open", off: "mdi:window-shutter" },
    shade: { on: "mdi:roller-shade", off: "mdi:roller-shade-closed" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" }
  },
  binary_sensor: {
    on: "mdi:power-off",
    off: "mdi:power-off",
    motion: { on: "mdi:motion-sensor", off: "mdi:motion-sensor-off" },
    moisture: { on: "mdi:water-alert", off: "mdi:water-off" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    lock: { on: "mdi:lock-open", off: "mdi:lock" },
    presence: { on: "mdi:home-outline", off: "mdi:home-export-outline" },
    occupancy: { on: "mdi:seat", off: "mdi:seat-outline" },
    vibration: { on: "mdi:vibrate", off: "mdi:vibrate-off" },
    opening: { on: "mdi:shield-lock-open", off: "mdi:shield-lock" },
    garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
    problem: {
      on: "mdi:alert-circle-outline",
      off: "mdi:alert-circle-check-outline"
    },
    smoke: {
      on: "mdi:smoke-detector-outline",
      off: "mdi:smoke-detector-off-outline"
    },
    running: { on: "mdi:play", off: "mdi:pause" },
    plug: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
    power: { on: "mdi:power", off: "mdi:power-off" },
    battery: { on: "mdi:battery-alert", off: "mdi:battery" },
    battery_charging: { on: "mdi:battery-charging", off: "mdi:battery-check" },
    gas: { on: "mdi:gas-station-outline", off: "mdi:gas-station-off-outline" },
    carbon_monoxide: { on: "mdi:molecule-co", off: "mdi:molecule-co" },
    cold: { on: "mdi:snowflake", off: "mdi:snowflake-off" },
    heat: { on: "mdi:weather-sunny", off: "mdi:weather-sunny-off" },
    connectivity: { on: "mdi:connection", off: "mdi:connection" },
    safety: { on: "mdi:shield-alert-outline", off: "mdi:shield-check-outline" },
    sound: { on: "mdi:volume-high", off: "mdi:volume-off" },
    update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
    tamper: { on: "mdi:shield-home", off: "mdi:shield-home" },
    light: { on: "mdi:lightbulb-outline", off: "mdi:lightbulb-off-outline" },
    moving: { on: "mdi:car", off: "mdi:car-off" }
  },
  person: { on: "mdi:account", off: "mdi:account-off" },
  device_tracker: { on: "mdi:account", off: "mdi:account-off" },
  valve: { on: "mdi:valve", off: "mdi:valve-closed" },
  water_heater: { on: "mdi:water-boiler", off: "mdi:water-pump-off" },
  remote: { on: "mdi:remote", off: "mdi:remote-off" },
  update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
  air_quality: { on: "mdi:air-filter", off: "mdi:air-filter" },
  camera: { on: "mdi:camera", off: "mdi:camera-off" },
  calendar: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  scene: { on: "mdi:movie", off: "mdi:movie-off" },
  notifications: { on: "mdi:bell", off: "mdi:bell-off" },
  sensor: { on: "mdi:gauge", off: "mdi:gauge" },
  script: { on: "mdi:script-text", off: "mdi:script-text" },
  tags: { on: "mdi:tag-multiple", off: "mdi:tag-multiple" },
  select: { on: "mdi:format-list-bulleted", off: "mdi:format-list-bulleted" },
  automation: { on: "mdi:robot", off: "mdi:robot-off" },
  button: { on: "mdi:gesture-tap-button", off: "mdi:gesture-tap-button" },
  number: { on: "mdi:numeric", off: "mdi:numeric" },
  conversation: { on: "mdi:comment-multiple", off: "mdi:comment-multiple" },
  assist_satellite: {
    on: "mdi:satellite-variant",
    off: "mdi:satellite-variant"
  },
  counter: { on: "mdi:counter", off: "mdi:counter" },
  event: { on: "mdi:calendar-star", off: "mdi:calendar-star" },
  group: {
    on: "mdi:google-circles-communities",
    off: "mdi:google-circles-communities"
  },
  image: { on: "mdi:image", off: "mdi:image-off" },
  image_processing: {
    on: "mdi:image-filter-center-focus",
    off: "mdi:image-filter-center-focus"
  },
  input_boolean: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  input_datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  input_number: { on: "mdi:numeric", off: "mdi:numeric" },
  input_select: {
    on: "mdi:format-list-bulleted",
    off: "mdi:format-list-bulleted"
  },
  input_text: { on: "mdi:text-box", off: "mdi:text-box" },
  stt: { on: "mdi:record-rec", off: "mdi:record" },
  sun: { on: "mdi:weather-sunny", off: "mdi:weather-night" },
  text: { on: "mdi:text-box", off: "mdi:text-box" },
  date: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  time: { on: "mdi:clock-outline", off: "mdi:clock-off" },
  timer: { on: "mdi:timer-outline", off: "mdi:timer-off" },
  todo: {
    on: "mdi:check-circle-outline",
    off: "mdi:checkbox-blank-circle-outline"
  },
  tts: { on: "mdi:volume-high", off: "mdi:volume-off" },
  wake_word: { on: "mdi:microphone", off: "mdi:microphone-off" },
  weather: { on: "mdi:weather-partly-cloudy", off: "mdi:weather-night" },
  zone: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
  geo_location: { on: "mdi:map-marker", off: "mdi:map-marker-off" }
}, te = [
  "closed",
  "locked",
  "off",
  "docked",
  "idle",
  "standby",
  "paused",
  "auto",
  "not_home",
  "disarmed"
], zi = "unavailable", Hi = "unknown", oe = [zi, Hi], Mi = (t, e, i, s, o) => {
  var u, d, h, p, g;
  const n = i || void 0, r = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let a = n || "", c = {};
  if (n === "default" && ((u = t.__themes) == null ? void 0 : u.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((d = e == null ? void 0 : e.themes) != null && d[n])) {
    const { modes: _, ...f } = e.themes[n] || {};
    c = { ...c, ...f }, _ && (r && _.dark ? c = { ...c, ..._.dark } : !r && _.light && (c = { ...c, ..._.light }));
  } else if (!n && (!((h = t.__themes) != null && h.keys) || t.__themes.keys.size === 0))
    return;
  const l = ((p = t.__themes) == null ? void 0 : p.keys) || /* @__PURE__ */ new Set(), m = new Set(Object.keys(c));
  if (n === "default" && m.size === 0) {
    for (const _ of l)
      try {
        t.style.removeProperty(`--${_}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((g = t.__themes) == null ? void 0 : g.cacheKey) === a) {
    let _ = !0;
    if (l.size !== m.size)
      _ = !1;
    else
      for (const f of l)
        if (!m.has(f)) {
          _ = !1;
          break;
        }
    if (_) return;
  }
  for (const _ of l)
    if (!m.has(_))
      try {
        t.style.removeProperty(`--${_}`);
      } catch {
      }
  for (const [_, f] of Object.entries(c))
    t.style.setProperty(`--${_}`, String(f));
  t.__themes.cacheKey = a || null, t.__themes.keys = m;
}, L = (t, e, i, s) => {
  s = s || {}, i = i ?? {};
  const o = new Event(e, {
    bubbles: s.bubbles === void 0 ? !0 : s.bubbles,
    cancelable: !!s.cancelable,
    composed: s.composed === void 0 ? !0 : s.composed
  });
  return o.detail = i, t.dispatchEvent(o), o;
}, j = (t) => t.substr(0, t.indexOf("."));
var be = /* @__PURE__ */ ((t) => (t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none", t))(be || {});
const Li = (t, e = 2) => Math.round(t * 10 ** e) / 10 ** e, Pi = (t) => Bi(t.attributes), Bi = (t) => !!t.unit_of_measurement || !!t.state_class, Ti = (t) => {
  switch (t.number_format) {
    case be.comma_decimal:
      return ["en-US", "en"];
    // Use United States with fallback to English formatting 1,234,567.89
    case be.decimal_comma:
      return ["de", "es", "it"];
    // Use German with fallback to Spanish then Italian formatting 1.234.567,89
    case be.space_comma:
      return ["fr", "sv", "cs"];
    // Use French with fallback to Swedish and Czech formatting 1 234 567,89
    case be.system:
      return;
    default:
      return t.language;
  }
}, Bt = (t, e, i) => {
  const s = e ? Ti(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(n) {
    return typeof n == "number" && o(n);
  }, (e == null ? void 0 : e.number_format) !== be.none && !Number.isNaN(Number(t)) && Intl)
    try {
      return new Intl.NumberFormat(
        s,
        Tt(t, i)
      ).format(Number(t));
    } catch (o) {
      return console.error(o), new Intl.NumberFormat(
        void 0,
        Tt(t, i)
      ).format(Number(t));
    }
  return typeof t == "string" ? t : `${Li(t, i == null ? void 0 : i.maximumFractionDigits).toString()}${(i == null ? void 0 : i.style) === "currency" ? ` ${i.currency}` : ""}`;
}, Tt = (t, e) => {
  const i = {
    maximumFractionDigits: 2,
    ...e
  };
  if (typeof t != "string")
    return i;
  if (!e || e.minimumFractionDigits === void 0 && e.maximumFractionDigits === void 0) {
    const s = t.indexOf(".") > -1 ? t.split(".")[1].length : 0;
    i.minimumFractionDigits = s, i.maximumFractionDigits = s;
  }
  return i;
};
E(
  (t) => new Intl.Collator(t)
);
const Ii = E(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), Ni = (t, e) => t < e ? -1 : t > e ? 1 : 0, Jt = (t, e, i = void 0) => Intl != null && Intl.Collator ? Ii(i).compare(t, e) : Ni(t.toLowerCase(), e.toLowerCase()), ji = (t) => {
  switch (t.language) {
    case "cs":
    case "de":
    case "fi":
    case "fr":
    case "sk":
    case "sv":
      return " ";
    default:
      return "";
  }
}, It = (t, e) => t === "°" ? "" : e && t === "%" ? ji(e) : " ";
let je;
const Fi = async (t) => je || (je = t.callWS({
  type: "sensor/numeric_device_classes"
}), je), Ke = (t, e) => {
  if (t === e)
    return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor)
      return !1;
    let i, s;
    if (Array.isArray(t)) {
      if (s = t.length, s !== e.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (!Ke(t[i], e[i]))
          return !1;
      return !0;
    }
    if (t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (i of t.entries())
        if (!e.has(i[0]))
          return !1;
      for (i of t.entries())
        if (!Ke(i[1], e.get(i[0])))
          return !1;
      return !0;
    }
    if (t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (i of t.entries())
        if (!e.has(i[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
      if (s = t.length, s !== e.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (t[i] !== e[i])
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === e.toString();
    const o = Object.keys(t);
    if (s = o.length, s !== Object.keys(e).length)
      return !1;
    for (i = s; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, o[i]))
        return !1;
    for (i = s; i-- !== 0; ) {
      const n = o[i];
      if (!Ke(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
};
class Ri extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = 500, this.held = !1, this.cancelled = !1;
  }
  connectedCallback() {
    [
      "touchcancel",
      "mouseout",
      "mouseup",
      "touchmove",
      "mousewheel",
      "wheel",
      "scroll"
    ].forEach((e) => {
      document.addEventListener(
        e,
        () => {
          this.cancelled = !0, this.timer && (clearTimeout(this.timer), this.timer = void 0);
        },
        { passive: !0 }
      );
    });
  }
  bind(e, i = {}) {
    e.actionHandler && Ke(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
      "keydown",
      e.actionHandler.handleKeyDown
    )), e.actionHandler = { options: i }, !i.disabled && (e.actionHandler.start = (s) => {
      this.cancelled = !1, s.touches ? (s.touches[0].clientX, s.touches[0].clientY) : (s.clientX, s.clientY), i.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, e.actionHandler.end = (s) => {
      if (s.currentTarget !== s.target || s.type === "touchcancel" || s.type === "touchend" && this.cancelled)
        return;
      const o = s.target;
      s.cancelable && s.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? L(o, "action", { action: "hold" }) : i.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, L(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, L(o, "action", { action: "double_tap" })) : L(o, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-area-card", Ri);
const Ui = () => {
  const t = document.body;
  if (t.querySelector("action-handler-area-card"))
    return t.querySelector("action-handler-area-card");
  const e = document.createElement("action-handler-area-card");
  return t.appendChild(e), e;
}, Vi = (t, e) => {
  const i = Ui();
  i && i.bind(t, e);
}, W = Ie(
  class extends Ne {
    update(t, [e]) {
      return Vi(t.element, e), Q;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(t) {
    }
  }
), et = async (t, e, i, s) => {
  L(t, "hass-action", { config: i, action: s });
};
function H(t) {
  return t !== void 0 && t.action !== "none";
}
var Ki = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", qi = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", ft = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Wi = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", Nt = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", tt = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", jt = "M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z", Ft = "M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z", Gi = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", Zi = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z", Yt = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", Xi = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z";
function Rt(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
function Qt(t, e) {
  switch (e.name) {
    case "theme":
      return `${t.localize(
        "ui.panel.lovelace.editor.card.generic.theme"
      )} (${t.localize("ui.panel.lovelace.editor.card.config.optional")})`;
    case "area":
      return t.localize("ui.panel.lovelace.editor.card.area.name");
    case "navigation_path":
      return t.localize(
        "ui.panel.lovelace.editor.action-editor.navigation_path"
      );
    case "area_name":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.name");
    case "area_icon":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.icon");
    case "area_name_color":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.name") + " " + t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "area_icon_color":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.icon") + " " + t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "v2_color":
      return t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "css":
      return "CSS";
    case "domain_css":
      return "Domain CSS";
    case "cover_css":
      return "Cover CSS";
    case "alert_css":
      return "Alert CSS";
    case "icon_css":
      return "Icon CSS";
    case "name_css":
      return "Name CSS";
    case "mirrored":
      return "Mirror Card Layout";
    case "alert_color":
    case "sensor_color":
    case "domain_color":
      return t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "columns":
      return t.localize("ui.components.grid-size-picker.columns");
    case "appearance":
      return t.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance";
    case "toggle_domains":
      return t.localize("ui.panel.lovelace.editor.cardpicker.domain");
    case "popup":
      return "Popup";
    case "popup_domains":
      return "Popup " + t.localize("ui.panel.lovelace.editor.cardpicker.domain");
    case "extra_entities":
      return t.localize("ui.common.add") + " " + t.localize("ui.panel.lovelace.editor.card.generic.entities") + ":";
    case "hidden_entities":
      return t.localize("ui.common.hide") + " " + t.localize("ui.panel.lovelace.editor.card.generic.entities") + ":";
    case "hide_unavailable":
      return t.localize("ui.common.hide") + " " + t.localize("state.default.unavailable");
    case "show_active":
      return t.localize("ui.common.hide") + " " + t.localize("ui.components.entity.entity-state-picker.state") + " " + t.localize("component.binary_sensor.entity_component._.state.off");
    case "edit_filters":
      return t.localize("ui.panel.lovelace.editor.common.edit") + " " + t.localize("ui.components.subpage-data-table.filters");
    case "label_filter":
      return t.localize("ui.components.label-picker.label") + " " + t.localize("ui.components.related-filter-menu.filter");
    case "cover_classes":
      return t.localize("component.cover.entity_component._.name");
    case "label":
      return t.localize("ui.components.label-picker.label");
    case "show_sensor_icons":
      return t.localize("ui.panel.lovelace.editor.card.generic.show_icon");
    case "wrap_sensor_icons":
      return t.localize(
        "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
      ) + " " + t.localize("ui.panel.lovelace.editor.card.sensor.name");
    case "category_filter":
      return t.localize("ui.components.category-picker.category") + " " + t.localize("ui.components.related-filter-menu.filter");
    case "name":
      return t.localize("ui.common.name");
    case "state":
      return t.localize("ui.components.entity.entity-state-picker.state");
    case "ungroup_areas":
      return t.localize("ui.common.disable") + " " + t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("component.group.entity_component._.name");
    case "popup_sort":
      return "Popup Sort";
    case "show_icon":
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
    case "camera_view":
      return t.localize(
        `ui.panel.lovelace.editor.card.generic.${e.name}`
      );
    case "show_camera":
      return t.localize("ui.panel.lovelace.editor.card.area.show_camera");
    default:
      return t.localize(
        `ui.panel.lovelace.editor.card.area.${e.name}`
      );
  }
}
var Ji = Object.defineProperty, ce = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = r(e, i, o) || o);
  return o && Ji(e, i, o), o;
};
const Yi = [oe, te], gt = class gt extends Y {
  constructor() {
    super(...arguments), this._onPopState = (e) => {
      this.open && this._onClosed(e);
    }, this.open = !1, this.content = "", this.entities = [], this._cardEls = /* @__PURE__ */ new Map(), this._onClosed = (e) => {
      this.open = !1, this._cardEls.clear(), this.dispatchEvent(
        new CustomEvent("dialog-closed", {
          bubbles: !0,
          composed: !0,
          detail: { dialog: this }
        })
      ), this.dispatchEvent(
        new CustomEvent("popup-closed", {
          bubbles: !0,
          composed: !0,
          detail: { dialog: this }
        })
      );
    }, this.DOMAIN_FEATURES = {
      alarm_control_panel: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "alarm-modes",
            modes: [
              "armed_home",
              "armed_away",
              "armed_night",
              "armed_vacation",
              "armed_custom_bypass",
              "disarmed"
            ]
          }
        ]
      },
      light: {
        state_content: ["state", "brightness", "last_changed"],
        features: [{ type: "light-brightness" }]
      },
      cover: {
        state_content: ["state", "position", "last_changed"],
        features: [{ type: "cover-open-close" }, { type: "cover-position" }]
      },
      vacuum: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "vacuum-commands",
            commands: [
              "start_pause",
              "stop",
              "clean_spot",
              "locate",
              "return_home"
            ]
          }
        ]
      },
      climate: {
        state_content: ["state", "current_temperature", "last_changed"],
        features: [
          {
            type: "climate-hvac-modes",
            hvac_modes: [
              "auto",
              "heat_cool",
              "heat",
              "cool",
              "dry",
              "fan_only",
              "off"
            ]
          }
        ]
      },
      water_heater: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "water-heater-operation-modes",
            operation_modes: [
              "electric",
              "gas",
              "heat_pump",
              "eco",
              "performance",
              "high_demand",
              "off"
            ]
          }
        ]
      },
      humidifier: {
        state_content: ["state", "current_humidity", "last_changed"],
        features: [{ type: "target-humidity" }]
      },
      media_player: {
        show_entity_picture: !0,
        state_content: ["state", "volume_level", "last_changed"],
        features: [{ type: "media-player-playback" }]
      },
      lock: {
        state_content: ["state", "last_changed"],
        features: [{ type: "lock-commands" }]
      },
      fan: {
        state_content: ["state", "percentage", "last_changed"],
        features: [{ type: "fan-speed" }]
      },
      counter: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "counter-actions",
            actions: ["increment", "decrement", "reset"]
          }
        ]
      },
      lawn_mower: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "lawn-mower-commands",
            commands: ["start_pause", "dock"]
          }
        ]
      },
      update: {
        state_content: ["state", "latest_version", "last_changed"],
        features: [{ type: "update-actions", backup: "ask" }]
      },
      switch: {
        state_content: ["state", "last_changed"],
        features: [{ type: "toggle" }]
      },
      scene: {
        state_content: ["state", "last_changed"],
        features: [{ type: "button" }]
      },
      script: {
        state_content: ["state", "last_changed"],
        features: [{ type: "button" }]
      },
      input_boolean: {
        state_content: ["state", "last_changed"],
        features: [{ type: "toggle" }]
      },
      calendar: {
        state_content: "message"
      },
      timer: {
        state_content: ["state", "remaining_time"]
      },
      binary_sensor: {
        state_content: ["state", "last_changed"]
      },
      device_tracker: {
        state_content: ["state", "last_changed"]
      },
      remote: {
        state_content: ["state", "last_changed"]
      },
      valve: {
        state_content: ["state", "last_changed"],
        features: [{ type: "valve-open-close" }]
      }
    }, this.computeLabel = E(
      (e, i, s) => Qt(this.hass, e)
    );
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState), this._cardEls.clear();
  }
  getFriendlyName(e, i) {
    var s, o;
    return ((o = (s = e == null ? void 0 : e[i]) == null ? void 0 : s.attributes) == null ? void 0 : o.friendly_name) || i;
  }
  compareByFriendlyName(e, i) {
    return (s, o) => Jt(
      this.getFriendlyName(e, s),
      this.getFriendlyName(e, o),
      i
    );
  }
  async showDialog(e) {
    this.title = e.title ?? this.title, this.hass = e.hass, this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.selectedGroup = e.selectedGroup, this.card = e.card, this._cardEls.clear(), this.open = !0, this.requestUpdate();
    try {
      await this.updateComplete;
    } catch {
    }
    this._applyDialogStyleAfterRender();
  }
  _applyDialogStyleAfterRender() {
    try {
      requestAnimationFrame(() => {
        try {
          this._applyDialogStyle();
        } catch {
        }
      });
    } catch {
      try {
        this._applyDialogStyle();
      } catch {
      }
    }
  }
  _applyDialogStyle() {
    var i, s, o, n, r, a;
    const e = (a = (r = (n = (o = (s = (i = document.querySelector("body > home-assistant")) == null ? void 0 : i.shadowRoot) == null ? void 0 : s.querySelector("area-card-plus-popup")) == null ? void 0 : o.shadowRoot) == null ? void 0 : n.querySelector("ha-dialog")) == null ? void 0 : r.shadowRoot) == null ? void 0 : a.querySelector(
      "div > div.mdc-dialog__container > div.mdc-dialog__surface"
    );
    return e ? (e.style.minHeight = "unset", !0) : !1;
  }
  firstUpdated(e) {
    super.firstUpdated(e);
  }
  _toTileConfig(e) {
    return {
      type: "tile",
      entity: e.entity
    };
  }
  async _createCardElement(e, i, s = !1) {
    var o, n, r;
    try {
      const a = await ((o = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : o.call(window));
      if (a != null && a.createCardElement) {
        const c = a.createCardElement(i);
        return c.hass = e, (n = c.setAttribute) == null || n.call(c, "data-hui-card", ""), c;
      }
    } catch {
    }
    try {
      const a = i.type || "tile", c = typeof a == "string" && a.startsWith("custom:"), l = c ? a.slice(7) : `hui-${a}-card`;
      c && !customElements.get(l) && await customElements.whenDefined(l).catch(() => {
      });
      const m = document.createElement(l);
      return typeof m.setConfig == "function" && m.setConfig(i), m.hass = e, (r = m.setAttribute) == null || r.call(m, "data-hui-card", ""), m;
    } catch {
      if (!s)
        return this._createCardElement(
          e,
          this._toTileConfig(i),
          !0
        );
      const a = document.createElement("div");
      return a.setAttribute("data-hui-card", ""), a;
    }
  }
  _getPopupCardConfig(e) {
    var h, p, g, _, f, C, y, v, w, A, P;
    const i = this.card, s = j(e.entity_id), o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : (_ = (g = (p = (h = this.hass) == null ? void 0 : h.states) == null ? void 0 : p[e.entity_id]) == null ? void 0 : g.attributes) == null ? void 0 : _.device_class, r = (i == null ? void 0 : i._config) || {};
    let a;
    Ue.includes(o) ? (a = (f = r.customization_alert) == null ? void 0 : f.find(
      (S) => S.type === n
    ), a || (a = (C = r.customization_domain) == null ? void 0 : C.find(
      (S) => S.type === o
    ))) : Re.includes(o) ? (a = (y = r.customization_sensor) == null ? void 0 : y.find(
      (S) => S.type === n
    ), a || (a = (v = r.customization_domain) == null ? void 0 : v.find(
      (S) => S.type === o
    ))) : Ve.includes(o) ? (a = (w = r.customization_cover) == null ? void 0 : w.find(
      (S) => S.type === n
    ), a || (a = (A = r.customization_domain) == null ? void 0 : A.find(
      (S) => S.type === o
    ))) : a = (P = r.customization_domain) == null ? void 0 : P.find(
      (S) => S.type === o
    );
    const c = a == null ? void 0 : a.popup_card, l = c && typeof c.type == "string" && c.type || (a == null ? void 0 : a.popup_card_type) || "tile", m = l === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let u = {};
    if (c && typeof c == "object") {
      const { type: S, entity: B, ...V } = c;
      u = V;
    } else
      u = (a == null ? void 0 : a.popup_card_options) ?? {};
    return {
      type: l,
      entity: e.entity_id,
      ...m,
      ...u
    };
  }
  shouldUpdate(e) {
    return this.open ? !0 : e.has("open");
  }
  _getOrCreateCard(e) {
    const i = e.entity_id, s = this._cardEls.get(i);
    if (s) {
      try {
        s.hass = this.hass;
      } catch {
      }
      return s;
    }
    const o = document.createElement("div");
    o.classList.add("card-placeholder"), o.setAttribute("data-hui-card", ""), this._cardEls.set(i, o);
    const n = this._getPopupCardConfig(e);
    return this._createCardElement(this.hass, n).then((r) => {
      try {
        this._cardEls.get(i) === o && (o.replaceWith(r), this._cardEls.set(i, r)), r.hass = this.hass;
      } catch {
      }
    }), o;
  }
  _isActive(e) {
    return !Yi.flat().includes(e.state);
  }
  sortEntitiesForPopup(e) {
    var n, r;
    const i = ((r = (n = this.card) == null ? void 0 : n._config) == null ? void 0 : r.popup_sort) || "name", s = e.slice();
    if (i === "state") {
      const a = this.compareByFriendlyName(
        this.hass.states,
        this.hass.locale.language
      );
      return s.sort((c, l) => {
        const m = this._isActive(c) ? 0 : 1, u = this._isActive(l) ? 0 : 1;
        if (m !== u) return m - u;
        const d = j(c.entity_id), h = j(l.entity_id), p = this.hass ? Rt(this.hass, c.state, d) : c.state, g = this.hass ? Rt(this.hass, l.state, h) : l.state, _ = (p || "").localeCompare(g || "");
        return _ !== 0 ? _ : a(c.entity_id, l.entity_id);
      });
    }
    const o = this.compareByFriendlyName(
      this.hass.states,
      this.hass.locale.language
    );
    return s.sort((a, c) => o(a.entity_id, c.entity_id));
  }
  render() {
    var P, S, B, V, O, M, T, F, I, Z, Ae, Ee, Se, Oe;
    if (!this.open || !this.hass || !this.card) return $``;
    const e = this.card, i = (P = e._config) == null ? void 0 : P.area, s = e._devices && Array.isArray(e._devices) ? e._devices : e.hass && e.hass.devices ? Object.values(e.hass.devices) : [], o = ((S = e._devicesInArea) == null ? void 0 : S.call(e, i, s)) ?? /* @__PURE__ */ new Set(), n = e._entities && Array.isArray(e._entities) ? e._entities : e.hass && e.hass.entities ? Object.values(e.hass.entities).map((b) => ({
      id: b.entity_id,
      entity_id: b.entity_id,
      name: b.name ?? null,
      icon: null,
      platform: b.platform ?? "",
      config_entry_id: null,
      device_id: b.device_id ?? null,
      area_id: b.area_id ?? null,
      disabled_by: null,
      hidden_by: b.hidden ? "user" : null,
      entity_category: b.entity_category ?? null,
      has_entity_name: !!b.name,
      unique_id: b.entity_id,
      options: null,
      labels: Array.isArray(b.labels) ? b.labels : []
    })) : [], r = this.hass.states, a = ((B = e._config) == null ? void 0 : B.popup_domains) || [], c = ((V = e._config) == null ? void 0 : V.hidden_entities) || [], l = ((O = e._config) == null ? void 0 : O.extra_entities) || [], m = (M = e._config) == null ? void 0 : M.label, u = (T = e._config) == null ? void 0 : T.hide_unavailable, d = (F = e._config) == null ? void 0 : F.category_filter, h = this.selectedDomain || null, p = this.selectedDeviceClass || null, g = (b) => {
      if (!d) return !0;
      const k = n.find(
        (K) => K.entity_id === b
      ), D = k == null ? void 0 : k.entity_category;
      return D ? d === "config" ? D !== "config" : d === "diagnostic" ? D !== "diagnostic" : d === "config+diagnostic" ? D !== "config" && D !== "diagnostic" : !0 : !0;
    }, _ = n.reduce(
      (b, k) => {
        var D;
        if (!k.hidden_by && (k.area_id ? k.area_id === i : k.device_id && o.has(k.device_id)) && (!m || k.labels && k.labels.some(
          (K) => m.includes(K)
        ))) {
          const K = k.entity_id;
          !c.includes(K) && g(K) && (!u || !oe.includes((D = r[K]) == null ? void 0 : D.state)) && b.push(K);
        }
        return b;
      },
      []
    );
    let f = [];
    for (const b of _) {
      const k = j(b);
      if (a.length > 0 && !a.includes(k)) continue;
      const D = r[b];
      D && (h && k !== h || p && D.attributes.device_class !== p || f.push(D));
    }
    for (const b of l) {
      const k = j(b), D = r[b];
      D && (a.length > 0 && !a.includes(k) || h && k !== h || p && D.attributes.device_class !== p || g(b) && !f.some((K) => K.entity_id === b) && f.push(D));
    }
    const C = ((I = e == null ? void 0 : e._config) == null ? void 0 : I.ungroup_areas) === !0;
    let y = (Z = e._config) != null && Z.columns ? e._config.columns : 4, v = [], w = [];
    if (C)
      w = this.sortEntitiesForPopup(f), y = Math.min(y, Math.max(1, w.length));
    else {
      const b = {};
      for (const X of f) {
        const le = j(X.entity_id);
        le in b || (b[le] = []), b[le].push(X);
      }
      const k = Object.keys(Be || {}), D = a.length > 0 ? a : k;
      v = Object.entries(b).filter(([X]) => !h || X === h).sort(([X], [le]) => {
        const vt = D.indexOf(X), yt = D.indexOf(le);
        return (vt === -1 ? D.length : vt) - (yt === -1 ? D.length : yt);
      }).map(
        ([X, le]) => [X, this.sortEntitiesForPopup(le)]
      );
      const K = v.length ? Math.max(...v.map(([, X]) => X.length)) : 0;
      y = Math.min(y, Math.max(1, K));
    }
    const A = ((Se = e._area) == null ? void 0 : Se.call(e, (Ae = e._config) == null ? void 0 : Ae.area, (Ee = e.hass) == null ? void 0 : Ee.areas)) ?? null;
    return $`
      <ha-dialog
        hideActions
        id="more-info-dialog"
        style="--columns: ${y};"
        .open=${this.open}
        @closed=${this._onClosed}
      >
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${ft}
            @click=${this._onClosed}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${((Oe = e._config) == null ? void 0 : Oe.area_name) || A && A.name}</h3>
          </div>
        </div>
        <div class="dialog-content scrollable">
          ${C ? $`
                  <div class="cards-wrapper">
                    <div class="entity-cards">
                      ${w.map(
      (b) => $`
                          <div class="entity-card">
                            ${this._getOrCreateCard(b)}
                          </div>
                        `
    )}
                    </div>
                  </div>
                ` : $`${ie(
      v,
      ([b]) => b,
      ([b, k]) => $`
                    <div class="cards-wrapper">
                      <h4>
                        ${b === "binary_sensor" || b === "sensor" || b === "cover" ? this._getDomainName(
        b,
        p || void 0
      ) : this._getDomainName(b)}
                      </h4>
                      <div class="entity-cards">
                        ${ie(
        k,
        (D) => D.entity_id,
        (D) => $`
                            <div class="entity-card">
                              ${this._getOrCreateCard(D)}
                            </div>
                          `
      )}
                      </div>
                    </div>
                  `
    )}`}
              </div>
        </div>
      </ha-dialog>
    `;
  }
  _getDomainName(e, i) {
    return this.hass ? e === "scene" ? "Scene" : e === "binary_sensor" || e === "sensor" || e === "cover" ? i ? this.hass.localize(
      `component.${e}.entity_component.${i}.name`
    ) : this.hass.localize(`component.${e}.entity_component._.name`) : this.hass.localize(`component.${e}.entity_component._.name`) : e;
  }
};
gt.styles = we`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }
    ha-dialog {
      --dialog-content-padding: 12px;
      --mdc-dialog-min-width: calc((var(--columns, 4) * 22.5vw) + 3vw);
      --mdc-dialog-max-width: calc((var(--columns, 4) * 22.5vw) + 5vw);
      box-sizing: border-box;
      overflow-x: auto;
    }
    .dialog-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      min-width: 15vw;
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      background: transparent;
    }
    .dialog-header .menu-button {
      margin-left: auto;
    }
    .dialog-content.scrollable {
      margin-bottom: 16px;
      max-height: 80vh;
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .dialog-content.scrollable::-webkit-scrollbar {
      display: none;
    }
    .cards-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      overflow-x: auto;
    }
    h4 {
      width: 100%;
      padding-left: 1.5em;
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.6em 0;
    }
    .entity-cards {
      display: grid;
      grid-template-columns: repeat(var(--columns, 4), 22.5vw);
      gap: 4px;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      justify-content: center;
    }
    .entity-card {
      width: 22.5vw;
      box-sizing: border-box;
    }

    @media (max-width: 1200px) {
      ha-dialog {
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .entity-card {
        width: 30vw;
      }
      .entity-cards {
        grid-template-columns: repeat(3, 30vw);
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 1em;
        box-sizing: border-box;
      }
    }

    @media (max-width: 900px) {
      ha-dialog {
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .entity-card {
        width: 45vw;
      }
      .entity-cards {
        grid-template-columns: repeat(2, 45vw);
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 1em;
        box-sizing: border-box;
      }
    }

    @media (max-width: 700px) {
      ha-dialog {
        --dialog-content-padding: 8px;
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .cards-wrapper {
        align-items: stretch;
        width: 100%;
        overflow-x: hidden;
      }
      .entity-card {
        width: 92vw;
      }
      .entity-cards {
        grid-template-columns: 1fr;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 0.3em;
        box-sizing: border-box;
      }
    }
  `;
let G = gt;
ce([
  z({ type: Boolean })
], G.prototype, "open");
ce([
  z({ type: String })
], G.prototype, "selectedDomain");
ce([
  z({ type: String })
], G.prototype, "selectedDeviceClass");
ce([
  z({ type: String })
], G.prototype, "content");
ce([
  z({ type: Array })
], G.prototype, "entities");
ce([
  z({ attribute: !1 })
], G.prototype, "hass");
ce([
  z({ attribute: !1 })
], G.prototype, "card");
ce([
  R()
], G.prototype, "selectedGroup");
customElements.define("area-card-plus-popup", G);
var Qi = Object.defineProperty, es = Object.getOwnPropertyDescriptor, ge = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? es(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Qi(e, i, o), o;
};
let re = class extends Y {
  constructor() {
    super(...arguments), this.selectedDomain = null, this.selectedDeviceClass = null, this.selectedGroup = null, this._iconCache = /* @__PURE__ */ new Map(), this._styleCache = /* @__PURE__ */ new Map(), this._deviceClasses = nt, this._customizationDomainMap = /* @__PURE__ */ new Map(), this._customizationCoverMap = /* @__PURE__ */ new Map(), this._customizationAlertMap = /* @__PURE__ */ new Map(), this._customizationSensorMap = /* @__PURE__ */ new Map(), this._actionHandlerCache = /* @__PURE__ */ new Map(), this._hiddenEntitiesSet = /* @__PURE__ */ new Set(), this._excludedEntitiesSet = /* @__PURE__ */ new Set(), this._entitiesByDomain = E(
      (t, e, i, s) => {
        const o = Object.values(this.hass.entities).filter((r) => {
          var a;
          if (!r.area_id && !r.device_id || r.hidden || this._hiddenEntitiesSet.has(r.entity_id))
            return !1;
          if (r.area_id) {
            if (r.area_id !== t) return !1;
          } else if (!e.has(r.device_id)) return !1;
          return (a = this._config) != null && a.label ? r.labels && r.labels.some((c) => this._config.label.includes(c)) : !0;
        }).map((r) => r.entity_id), n = {};
        for (const r of o) {
          const a = j(r);
          if (!He.includes(a) && !Re.includes(a) && !Ue.includes(a) && !Ve.includes(a) && !Di.includes(a) && !ot.includes(a))
            continue;
          const c = s[r];
          c && ((Ue.includes(a) || Re.includes(a) || Ve.includes(a)) && !i[a].includes(
            c.attributes.device_class || ""
          ) || (a in n || (n[a] = []), n[a].push(c)));
        }
        return n;
      }
    ), this._area = E(
      (t, e) => (Array.isArray(e) ? e : e ? Object.values(e) : []).find((s) => s.area_id === t) || null
    ), this._devicesInArea = E(
      (t, e) => new Set(
        t ? e.reduce((i, s) => (s.area_id === t && i.push(s.id), i), []) : []
      )
    ), this._computeCovers = E(
      (t, e) => Ve.flatMap((i) => i in t ? e[i].map((s) => ({
        domain: i,
        deviceClass: s
      })) : [])
    ), this._computeAlerts = E(
      (t, e) => Ue.flatMap((i) => i in t ? e[i].map((s) => ({
        domain: i,
        deviceClass: s
      })) : [])
    ), this._computeSensors = E(
      (t, e) => Re.flatMap((i) => i in t ? e[i].map(
        (s, o) => ({
          domain: i,
          deviceClass: s,
          index: o
        })
      ) : [])
    ), this._computeButtons = E(
      (t, e) => (t || []).filter(
        (i) => i in e
      )
    ), this._computeCameraEntity = E(
      (t, e) => {
        var i;
        if (t && "camera" in e)
          return (i = e.camera[0]) == null ? void 0 : i.entity_id;
      }
    ), this._computeIconStyles = E(
      (t, e, i, s) => {
        const o = {
          ...t && e === 1 ? { "--mdc-icon-size": "20px" } : {},
          ...s ? { color: `var(--${s}-color)` } : {}
        };
        if (!i) return o;
        const n = this._getParsedCss(i);
        return { ...o, ...n };
      }
    );
  }
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }
  static async getStubConfig(t) {
    var i;
    return { type: "custom:area-card-plus", area: ((i = Object.values(t.areas)[0]) == null ? void 0 : i.area_id) || "" };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return {
      columns: 12,
      rows: 3,
      min_columns: 1,
      min_rows: 1
    };
  }
  setConfig(t) {
    var e, i, s, o, n, r;
    if (!t.area)
      throw new Error("Area Required");
    this._config = t, this._deviceClasses = { ...nt }, t.sensor_classes && (this._deviceClasses.sensor = t.sensor_classes), t.alert_classes && (this._deviceClasses.binary_sensor = t.alert_classes), t.cover_classes && (this._deviceClasses.cover = t.cover_classes), this._iconCache.clear(), this._styleCache.clear(), this._customizationDomainMap.clear(), (((e = this._config) == null ? void 0 : e.customization_domain) || []).forEach((a) => {
      const c = { ...a || {} };
      a != null && a.css && (c._parsedCss = this._parseCss(a.css)), a != null && a.icon_css && (c._parsedIconCss = this._parseCss(a.icon_css)), this._customizationDomainMap.set(c.type, c);
    }), this._customizationCoverMap.clear(), (((i = this._config) == null ? void 0 : i.customization_cover) || []).forEach((a) => {
      const c = { ...a || {} };
      a != null && a.css && (c._parsedCss = this._parseCss(a.css)), a != null && a.icon_css && (c._parsedIconCss = this._parseCss(a.icon_css)), this._customizationCoverMap.set(c.type, c);
    }), this._customizationAlertMap.clear(), (((s = this._config) == null ? void 0 : s.customization_alert) || []).forEach((a) => {
      const c = { ...a || {} };
      a != null && a.css && (c._parsedCss = this._parseCss(a.css)), a != null && a.icon_css && (c._parsedIconCss = this._parseCss(a.icon_css)), this._customizationAlertMap.set(c.type, c);
    }), this._customizationSensorMap.clear(), (((o = this._config) == null ? void 0 : o.customization_sensor) || []).forEach((a) => {
      const c = { ...a || {} };
      a != null && a.css && (c._parsedCss = this._parseCss(a.css)), a != null && a.icon_css && (c._parsedIconCss = this._parseCss(a.icon_css)), this._customizationSensorMap.set(c.type, c);
    }), this._hiddenEntitiesSet = new Set(((n = this._config) == null ? void 0 : n.hidden_entities) || []), this._excludedEntitiesSet = new Set(((r = this._config) == null ? void 0 : r.excluded_entities) || []), this._actionHandlerCache.clear();
  }
  updated(t) {
    if (super.updated(t), !this._config || !this.hass)
      return;
    if (t.has("selectedDomain") && this.selectedDomain) {
      const s = this.selectedDomain;
      this._openDomainPopup(s), setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    const e = t.get("hass"), i = t.get("_config");
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!i || i.theme !== this._config.theme)) && Mi(this, this.hass.themes, this._config.theme);
  }
  shouldUpdate(t) {
    var s, o;
    if (t.has("_config") || !this._config || t.has("_devicesInArea") || t.has("_entities"))
      return !0;
    if (!t.has("hass"))
      return !1;
    const e = t.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale)
      return !0;
    if (!((s = this.hass) != null && s.devices) || !this._devicesInArea(
      this._config.area,
      Object.values(this.hass.devices)
    ) || !((o = this.hass) != null && o.entities))
      return !1;
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    );
    for (const n of Object.values(i))
      for (const r of n)
        if (e.states[r.entity_id] !== r)
          return !0;
    return !1;
  }
  _isOn(t, e) {
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    )[t];
    if (i)
      return (e ? i.filter(
        (s) => s.attributes.device_class === e
      ) : i).find(
        (s) => !oe.includes(s.state) && !te.includes(s.state)
      );
  }
  _filterByCategory(t) {
    var o, n;
    const e = (o = this._config) == null ? void 0 : o.category_filter;
    if (!e) return !0;
    const i = (n = this.hass.entities) == null ? void 0 : n[t];
    if (!i) return !0;
    const s = typeof i.entity_category == "string" ? i.entity_category : null;
    if (!s) return !0;
    switch (e) {
      case "config":
        return s !== "config";
      case "diagnostic":
        return s !== "diagnostic";
      case "config+diagnostic":
        return s !== "config" && s !== "diagnostic";
      default:
        return !0;
    }
  }
  _average(t, e) {
    var r;
    (r = this._config) != null && r.excluded_entities;
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    )[t].filter(
      (a) => (e ? a.attributes.device_class === e : !0) && !this._excludedEntitiesSet.has(a.entity_id)
    );
    if (!i || i.length === 0)
      return;
    let s;
    const o = i.filter((a) => !Pi(a) || isNaN(Number(a.state)) ? !1 : s ? a.attributes.unit_of_measurement === s : (s = a.attributes.unit_of_measurement, !0));
    if (!o.length)
      return;
    const n = o.reduce(
      (a, c) => a + Number(c.state),
      0
    );
    return e === "power" ? `${Bt(n, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? It(s, this.hass.locale) : ""}${s || ""}` : `${Bt(n / o.length, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? It(s, this.hass.locale) : ""}${s || ""}`;
  }
  _parseCss(t) {
    if (!t) return {};
    const e = t.trim();
    if (this._styleCache.has(e)) return this._styleCache.get(e);
    const s = t.split(`
`).reduce((o, n) => {
      const r = n.trim();
      return r && r.includes(":") && (o += r.endsWith(";") ? r : `${r};`, o += " "), o;
    }, "").split(";").map((o) => o.trim()).filter(Boolean).reduce((o, n) => {
      const [r, ...a] = n.split(":"), c = a.join(":");
      if (r && c !== void 0) {
        const l = r.trim(), m = l.startsWith("--") ? l : l.replace(/-([a-z])/g, (u, d) => d.toUpperCase());
        o[m] = c.trim();
      }
      return o;
    }, {});
    return this._styleCache.set(e, s), s;
  }
  _getParsedCss(t, e) {
    return e && e._parsedCss ? e._parsedCss : t ? this._parseCss(t) : {};
  }
  _handleAction(t) {
    var o, n, r, a, c, l;
    const e = t.detail.action === "tap" ? (o = this._config) == null ? void 0 : o.tap_action : t.detail.action === "hold" ? (n = this._config) == null ? void 0 : n.hold_action : t.detail.action === "double_tap" ? (r = this._config) == null ? void 0 : r.double_tap_action : null;
    if (e === "more-info" || (e == null ? void 0 : e.action) === "more-info" || e === void 0) {
      this._openGeneralPopup();
      return;
    }
    const s = {
      tap_action: (a = this._config) == null ? void 0 : a.tap_action,
      hold_action: (c = this._config) == null ? void 0 : c.hold_action,
      double_tap_action: (l = this._config) == null ? void 0 : l.double_tap_action
    };
    et(this, this.hass, s, t.detail.action);
  }
  _handleDomainAction(t) {
    const e = `domain|${t}`;
    return this._actionHandlerCache.has(e) || this._actionHandlerCache.set(
      e,
      this._makeActionHandler("domain", t)
    ), this._actionHandlerCache.get(e);
  }
  _handleAlertAction(t, e) {
    const i = `alert|${t}|${e}`;
    return this._actionHandlerCache.has(i) || this._actionHandlerCache.set(
      i,
      this._makeActionHandler("alert", t, e)
    ), this._actionHandlerCache.get(i);
  }
  _handleCoverAction(t, e) {
    const i = `cover|${t}|${e}`;
    return this._actionHandlerCache.has(i) || this._actionHandlerCache.set(
      i,
      this._makeActionHandler("cover", t, e)
    ), this._actionHandlerCache.get(i);
  }
  _handleSensorAction(t, e) {
    const i = `sensor|${t}|${e}`;
    return this._actionHandlerCache.has(i) || this._actionHandlerCache.set(
      i,
      this._makeActionHandler("sensor", t, e)
    ), this._actionHandlerCache.get(i);
  }
  _makeActionHandler(t, e, i, s) {
    return (o) => {
      var l, m;
      o.stopPropagation();
      let n;
      t === "domain" ? n = this._customizationDomainMap.get(e) : t === "alert" ? n = this._customizationAlertMap.get(i || "") : t === "cover" ? n = this._customizationCoverMap.get(i || "") : t === "sensor" ? n = this._customizationSensorMap.get(i || "") : t === "custom_button" && (n = s);
      const r = o.detail.action === "tap" ? n == null ? void 0 : n.tap_action : o.detail.action === "hold" ? n == null ? void 0 : n.hold_action : o.detail.action === "double_tap" ? n == null ? void 0 : n.double_tap_action : null;
      if (t === "domain") {
        const u = r === "toggle" || (r == null ? void 0 : r.action) === "toggle", d = r === "more-info" || (r == null ? void 0 : r.action) === "more-info";
        if (u) {
          e === "media_player" ? this.hass.callService(
            e,
            this._isOn(e) ? "media_pause" : "media_play",
            void 0,
            { area_id: this._config.area }
          ) : e === "lock" ? this.hass.callService(
            e,
            this._isOn(e) ? "lock" : "unlock",
            void 0,
            { area_id: this._config.area }
          ) : e === "vacuum" ? this.hass.callService(
            e,
            this._isOn(e) ? "stop" : "start",
            void 0,
            { area_id: this._config.area }
          ) : He.includes(e) && this.hass.callService(
            e,
            this._isOn(e) ? "turn_off" : "turn_on",
            void 0,
            { area_id: this._config.area }
          );
          return;
        } else if (d || r === void 0) {
          if (e !== "binary_sensor" && e !== "sensor")
            if (e === "climate") {
              const p = (m = (l = this._config) == null ? void 0 : l.customization_domain) == null ? void 0 : m.find(
                (_) => _.type === "climate"
              ), g = p == null ? void 0 : p.display_mode;
              (g === "icon" || g === "text_icon") && this._showPopupForDomain(e);
            } else
              this._showPopupForDomain(e);
          return;
        }
        const h = {
          tap_action: n == null ? void 0 : n.tap_action,
          hold_action: n == null ? void 0 : n.hold_action,
          double_tap_action: n == null ? void 0 : n.double_tap_action
        };
        et(this, this.hass, h, o.detail.action);
        return;
      }
      const a = r === "more-info" || (r == null ? void 0 : r.action) === "more-info";
      if (t === "alert") {
        if (a || r === void 0) {
          e === "binary_sensor" && this._showPopupForDomain(e, i);
          return;
        }
      } else if (t === "cover") {
        if (a || r === void 0) {
          e === "cover" && this._showPopupForDomain(e, i);
          return;
        }
      } else if (t === "sensor") {
        if (a) {
          e === "sensor" && this._showPopupForDomain(e, i);
          return;
        }
        if (o.detail.action === "tap" && !(n != null && n.tap_action))
          return;
      }
      const c = {
        tap_action: n == null ? void 0 : n.tap_action,
        hold_action: n == null ? void 0 : n.hold_action,
        double_tap_action: n == null ? void 0 : n.double_tap_action
      };
      et(this, this.hass, c, o.detail.action);
    };
  }
  _getIcon(t, e, i) {
    if (t in Be) {
      const s = Be[t];
      if (i && typeof s == "object") {
        const o = s[i];
        if (o) {
          if (typeof o == "string") return o;
          if (typeof o == "object" && "on" in o && "off" in o)
            return e ? o.on : o.off;
        }
      }
      if (typeof s == "object" && "on" in s && "off" in s)
        return e ? s.on : s.off;
      if (typeof s == "string") return s;
    }
    return "";
  }
  _cachedIcon(t, e, i) {
    const s = `${t}|${i || ""}|${e ? "1" : "0"}`;
    if (this._iconCache.has(s)) return this._iconCache.get(s);
    const o = this._getIcon(t, e, i);
    return this._iconCache.set(s, o), o;
  }
  _renderCovers(t, e, i) {
    var o, n, r;
    (o = this._config) != null && o.excluded_entities;
    const s = {
      v2: ((n = this._config) == null ? void 0 : n.design) === "V2",
      row: ((r = this._config) == null ? void 0 : r.layout) === "horizontal"
    };
    return $`
      <div
        class="${J({
      covers: !0,
      ...s
    })}"
      >
        ${ie(
      t,
      (a) => a.domain + "-" + a.deviceClass,
      ({ domain: a, deviceClass: c }) => {
        var g, _;
        const l = i.get(c), m = (l == null ? void 0 : l.invert) === !0, u = e[a].filter((f) => {
          const C = f.attributes.device_class || "default", y = f.state === "open";
          return C === c && (m ? te.includes(f.state) : y) && !this._excludedEntitiesSet.has(f.entity_id) && this._filterByCategory(f.entity_id);
        }), d = (l == null ? void 0 : l.color) || ((g = this._config) == null ? void 0 : g.cover_color), h = l == null ? void 0 : l.icon, p = u.length;
        return p > 0 ? $`
                  <div
                    class="icon-with-count hover"
                    style=${N(
          this._getParsedCss(
            (l == null ? void 0 : l.css) || ((_ = this._config) == null ? void 0 : _.cover_css),
            l
          )
        )}
                    @action=${this._handleCoverAction(a, c)}
                    .actionHandler=${W({
          hasHold: H(l == null ? void 0 : l.hold_action),
          hasDoubleClick: H(
            l == null ? void 0 : l.double_tap_action
          )
        })}
                  >
                    <ha-state-icon
                      class="cover"
                      style=${N({
          ...d ? { color: `var(--${d}-color)` } : {},
          ...this._getParsedCss(
            l == null ? void 0 : l.icon_css,
            l
          )
        })}
                      .icon=${h || this._cachedIcon(
          a,
          !m,
          c
        )}
                    ></ha-state-icon>
                    <span
                      class="active-count text-small ${p > 0 ? "on" : "off"}"
                      >${p}</span
                    >
                  </div>
                ` : x;
      }
    )}
      </div>
    `;
  }
  _renderAlerts(t, e, i) {
    var o, n, r;
    const s = {
      v2: ((o = this._config) == null ? void 0 : o.design) === "V2",
      row: ((n = this._config) == null ? void 0 : n.layout) === "horizontal"
    };
    return (r = this._config) != null && r.excluded_entities, $`
      <div
        class="${J({
      alerts: !0,
      ...s
    })}"
      >
        ${ie(
      t,
      (a) => a.domain + "-" + a.deviceClass,
      ({ domain: a, deviceClass: c }) => {
        var g, _;
        const l = i.get(c), m = (l == null ? void 0 : l.invert) === !0, u = e[a].filter((f) => {
          const C = f.attributes.device_class || "default", y = f.state === "on";
          return C === c && (m ? te.includes(f.state) : y) && !this._excludedEntitiesSet.has(f.entity_id) && this._filterByCategory(f.entity_id);
        }), d = (l == null ? void 0 : l.color) || ((g = this._config) == null ? void 0 : g.alert_color), h = l == null ? void 0 : l.icon, p = u.length;
        return p > 0 ? $`
                  <div
                    class="icon-with-count hover"
                    style=${N(
          this._getParsedCss(
            (l == null ? void 0 : l.css) || ((_ = this._config) == null ? void 0 : _.alert_css),
            l
          )
        )}
                    @action=${this._handleAlertAction(a, c)}
                    .actionHandler=${W({
          hasHold: H(l == null ? void 0 : l.hold_action),
          hasDoubleClick: H(
            l == null ? void 0 : l.double_tap_action
          )
        })}
                  >
                    <ha-state-icon
                      class="alert"
                      style=${N({
          ...d ? { color: `var(--${d}-color)` } : {},
          ...this._getParsedCss(
            l == null ? void 0 : l.icon_css,
            l
          )
        })}
                      .icon=${h || this._cachedIcon(
          a,
          !m,
          c
        )}
                    ></ha-state-icon>
                    <span
                      class="active-count text-small ${p > 0 ? "on" : "off"}"
                      >${p}</span
                    >
                  </div>
                ` : x;
      }
    )}
      </div>
    `;
  }
  renderCustomButtons() {
    var e, i, s;
    if (!((e = this._config) != null && e.custom_buttons) || this._config.custom_buttons.length === 0)
      return x;
    const t = {
      v2: ((i = this._config) == null ? void 0 : i.design) === "V2",
      row: ((s = this._config) == null ? void 0 : s.layout) === "horizontal"
    };
    return $`
      <div
        class="${J({
      custom_buttons: !0,
      ...t
    })}"
      >
        ${this._config.custom_buttons.map((o) => {
      const n = o.color ? `color: var(--${o.color}-color, ${o.color});` : "";
      return $`
            <div
              class="icon-with-count hover"
              @action=${this._makeActionHandler(
        "custom_button",
        "",
        void 0,
        o
      )}
              .actionHandler=${W({
        hasHold: H(o.hold_action),
        hasDoubleClick: H(o.double_tap_action)
      })}
            >
              <ha-icon .icon=${o.icon} style="${n}"></ha-icon>
              ${o.name ? $`<span class="custom-button-label" style="${n}"
                    >${o.name}</span
                  >` : x}
            </div>
          `;
    })}
      </div>
    `;
  }
  _renderButtons(t, e, i) {
    var o, n, r;
    const s = {
      v2: ((o = this._config) == null ? void 0 : o.design) === "V2",
      row: ((n = this._config) == null ? void 0 : n.layout) === "horizontal"
    };
    return (r = this._config) != null && r.excluded_entities, $`
      <div
        class="${J({
      buttons: !0,
      ...s
    })}"
      >
        ${ie(
      t,
      (a) => a,
      (a) => {
        var y, v, w, A, P, S, B, V;
        if (a === "climate") {
          const O = (v = (y = this._config) == null ? void 0 : y.customization_domain) == null ? void 0 : v.find(
            (T) => T.type === "climate"
          ), M = O == null ? void 0 : O.display_mode;
          if (M !== "icon" && M !== "text_icon")
            return x;
        }
        const c = i.get(a), l = (c == null ? void 0 : c.color) || ((w = this._config) == null ? void 0 : w.domain_color), m = c == null ? void 0 : c.icon, u = a === "climate" ? (P = (A = this._config) == null ? void 0 : A.customization_domain) == null ? void 0 : P.find(
          (O) => O.type === "climate"
        ) : void 0, d = u == null ? void 0 : u.display_mode, h = u == null ? void 0 : u.show_set_temperature, p = a === "climate" && (d === "icon" || d === "text_icon") && h === !0, g = e[a].filter((O) => !(oe.includes(O.state) || this._excludedEntitiesSet.has(O.entity_id) || !this._filterByCategory(O.entity_id)));
        let _ = [], f;
        if (p) {
          _ = g;
          let O = !1, M = !1;
          for (const T of g) {
            const F = ((S = T.attributes) == null ? void 0 : S.hvac_action) ?? null, I = (T.state ?? "").toString().toLowerCase();
            if (F != null) {
              const Z = F.toString().toLowerCase();
              O = O || Z.includes("heat") || Z.includes("heating"), M = M || Z.includes("cool") || Z.includes("cooling");
            } else
              O = O || I.includes("heat") || I.includes("heating"), M = M || I.includes("cool") || I.includes("cooling");
            if (O && M) break;
          }
          O ? f = "red" : M && (f = "cornflowerblue");
        } else
          _ = g.filter((O) => {
            var M;
            if (a === "climate") {
              const T = (M = O.attributes) == null ? void 0 : M.hvac_action;
              if (T != null) {
                const I = T.toString().toLowerCase();
                return !(I === "off" || I === "idle");
              }
              const F = (O.state ?? "").toString().toLowerCase();
              return !(F === "off" || F === "idle");
            }
            return !te.includes(O.state);
          });
        const C = _.length;
        return this._config.show_active && C === 0 ? x : $`
              <div
                class="icon-with-count hover"
                style=${N(
          this._getParsedCss(
            (c == null ? void 0 : c.css) || ((B = this._config) == null ? void 0 : B.domain_css),
            c
          )
        )}
                @action=${this._handleDomainAction(a)}
                .actionHandler=${W({
          hasHold: H(c == null ? void 0 : c.hold_action),
          hasDoubleClick: H(c == null ? void 0 : c.double_tap_action)
        })}
              >
                <ha-state-icon
                  style=${N({
          ...f ? { color: f } : {},
          ...!f && l ? { color: `var(--${l}-color)` } : {},
          ...!f && !l && ((V = this._config) != null && V.domain_color) ? { color: this._config.domain_color } : {},
          ...this._getParsedCss(
            c == null ? void 0 : c.icon_css,
            c
          )
        })}
                  class=${C > 0 ? "toggle-on" : "toggle-off"}
                  .domain=${a}
                  .icon=${m || this._cachedIcon(a, C > 0)}
                ></ha-state-icon>
                <span
                  class="active-count text-small ${C > 0 ? "on" : "off"}"
                >
                  ${C}
                </span>
              </div>
            `;
      }
    )}
      </div>
    `;
  }
  _renderSensors(t, e, i, s) {
    var o, n;
    return (o = this._config) != null && o.excluded_entities, $`
      <div class="sensors">
        ${(n = this._config) != null && n.wrap_sensor_icons ? ie(
      t,
      (r) => r.domain + "-" + r.deviceClass,
      ({ domain: r, deviceClass: a, index: c }) => {
        var C, y, v, w;
        const l = e[r].filter(
          (A) => A.attributes.device_class === a && !this._excludedEntitiesSet.has(A.entity_id)
        );
        if (l.length === 0)
          return x;
        const m = (() => {
          switch (a) {
            case "temperature":
              return i.temperature_entity_id;
            case "humidity":
              return i.humidity_entity_id;
            default:
              return null;
          }
        })(), u = m ? this.hass.states[m] : void 0, d = s.get(a), h = (d == null ? void 0 : d.color) || ((C = this._config) == null ? void 0 : C.sensor_color), p = (d == null ? void 0 : d.invert) === !0, g = l.some(
          (A) => !oe.includes(A.state) && !te.includes(A.state) && !this._excludedEntitiesSet.has(A.entity_id) && this._filterByCategory(A.entity_id)
        );
        if (p && g)
          return x;
        const _ = (y = this._config) != null && y.show_sensor_icons ? $`<ha-domain-icon
                      style=${N({
          ...h ? { color: `var(--${h}-color)` } : {},
          ...this._getParsedCss(
            d == null ? void 0 : d.css,
            d
          )
        })}
                      .hass=${this.hass}
                      .domain=${r}
                      .deviceClass=${a}
                    ></ha-domain-icon>` : null, f = $`<span
                  class="sensor-value"
                  @action=${this._handleSensorAction(r, a)}
                  .actionHandler=${W({
          hasHold: H(d == null ? void 0 : d.hold_action),
          hasDoubleClick: H(d == null ? void 0 : d.double_tap_action)
        })}
                  style=${N({
          ...h ? { color: `var(--${h}-color)` } : {},
          ...this._getParsedCss(d == null ? void 0 : d.css, d)
        })}
                >
                  ${!((v = this._config) != null && v.show_sensor_icons) && !((w = this._config) != null && w.wrap_sensor_icons) && c > 0 ? " - " : ""}
                  ${u ? this.hass.formatEntityState(u) : this._average(r, a)}
                </span>`;
        return $`<div class="sensor-row off">${_}${f}</div>`;
      }
    ) : $`<div class="sensor text-medium off">
              ${ie(
      t,
      (r) => r.domain + "-" + r.deviceClass,
      ({ domain: r, deviceClass: a, index: c }) => {
        var C, y, v, w;
        const l = e[r].filter(
          (A) => A.attributes.device_class === a && !this._excludedEntitiesSet.has(A.entity_id)
        );
        if (l.length === 0)
          return x;
        const m = (() => {
          switch (a) {
            case "temperature":
              return i.temperature_entity_id;
            case "humidity":
              return i.humidity_entity_id;
            default:
              return null;
          }
        })(), u = m ? this.hass.states[m] : void 0, d = s.get(a), h = (d == null ? void 0 : d.color) || ((C = this._config) == null ? void 0 : C.sensor_color), p = (d == null ? void 0 : d.invert) === !0, g = l.some(
          (A) => !oe.includes(A.state) && !te.includes(A.state) && !this._excludedEntitiesSet.has(A.entity_id)
        );
        if (p && g)
          return x;
        const _ = (y = this._config) != null && y.show_sensor_icons ? $`<ha-domain-icon
                        style=${N({
          ...h ? { color: `var(--${h}-color)` } : {},
          ...this._getParsedCss(
            d == null ? void 0 : d.css,
            d
          )
        })}
                        .hass=${this.hass}
                        .domain=${r}
                        .deviceClass=${a}
                      ></ha-domain-icon>` : null, f = $`<span
                    class="sensor-value"
                    @action=${this._handleSensorAction(r, a)}
                    .actionHandler=${W({
          hasHold: H(d == null ? void 0 : d.hold_action),
          hasDoubleClick: H(
            d == null ? void 0 : d.double_tap_action
          )
        })}
                    style=${N({
          ...h ? { color: `var(--${h}-color)` } : {},
          ...this._getParsedCss(d == null ? void 0 : d.css, d)
        })}
                  >
                    ${!((v = this._config) != null && v.show_sensor_icons) && !((w = this._config) != null && w.wrap_sensor_icons) && c > 0 ? " - " : ""}
                    ${u ? this.hass.formatEntityState(u) : this._average(r, a)}
                  </span>`;
        return $`${_}${f}`;
      }
    )}
            </div>`}
      </div>
    `;
  }
  _renderClimates(t, e, i) {
    var o;
    const s = ((o = this._config) == null ? void 0 : o.excluded_entities) || [];
    return $`
      <div class="climate text-small off">
        ${ie(
      t,
      (n) => n.domain,
      ({ domain: n }) => {
        var d;
        const r = e[n] || [], a = i.get(n) || {};
        if ((a == null ? void 0 : a.display_mode) === "icon")
          return x;
        if ((a == null ? void 0 : a.show_set_temperature) === !0) {
          const h = r.filter((_) => !(this._excludedEntitiesSet.has(_.entity_id) || !this._filterByCategory(_.entity_id))).map((_) => {
            var V, O, M, T, F, I;
            const f = ((V = _.attributes) == null ? void 0 : V.temperature) ?? ((O = _.attributes) == null ? void 0 : O.target_temperature) ?? null;
            if (f == null) return null;
            const C = Number(f);
            if (Number.isNaN(C)) return null;
            const y = ((F = (T = (M = this.hass) == null ? void 0 : M.config) == null ? void 0 : T.unit_system) == null ? void 0 : F.temperature) || "", v = ((I = _.attributes) == null ? void 0 : I.hvac_action) ?? null, w = (_.state ?? "").toString().toLowerCase(), A = (v ?? w).toString().toLowerCase(), P = A.includes("heat") || A.includes("heating"), S = A.includes("cool") || A.includes("cooling");
            return $`<span style="color:${P ? "red" : S ? "cornflowerblue" : "var(--secondary-text-color)"};"
                    >${C}${y ? ` ${y}` : ""}</span
                  >`;
          }).filter((_) => _ !== null);
          if (h.length === 0) return x;
          const p = h.reduce(
            (_, f, C) => (C === 0 || _.push(
              $`<span style="color: var(--secondary-text-color)"
                        >,
                      </span>`
            ), _.push(f), _),
            []
          ), g = {
            ...a != null && a.color ? { color: `var(--${a.color}-color)` } : {},
            ...this._getParsedCss(a == null ? void 0 : a.css, a)
          };
          return $`<div
                class="climate"
                style=${N(g)}
                @action=${this._handleDomainAction(n)}
                .actionHandler=${W({
            hasHold: H(a == null ? void 0 : a.hold_action),
            hasDoubleClick: H(a == null ? void 0 : a.double_tap_action)
          })}
              >
                <span style="color: var(--secondary-text-color)">(</span
                >${p}<span
                  style="color: var(--secondary-text-color)"
                  >)</span
                >
              </div>`;
        }
        const l = (r || []).filter((h) => {
          var y;
          const p = (y = h.attributes) == null ? void 0 : y.hvac_action, g = h.state, _ = !oe.includes(g) && !te.includes(g) && !s.includes(h.entity_id) && this._filterByCategory(h.entity_id);
          if (p != null) {
            const v = p.toString().toLowerCase();
            return _ && (v !== "idle" && v !== "off");
          }
          const f = (g ?? "").toString().toLowerCase(), C = f.includes("heat") || f.includes("cool") || f !== "idle" && f !== "off";
          return _ && C;
        }).map((h) => {
          var g, _, f, C;
          return `${((g = h.attributes) == null ? void 0 : g.temperature) ?? "N/A"} ${((C = (f = (_ = this.hass) == null ? void 0 : _.config) == null ? void 0 : f.unit_system) == null ? void 0 : C.temperature) || ""}`;
        });
        if (l.length === 0)
          return x;
        const m = a == null ? void 0 : a.color, u = {
          ...m ? { color: `var(--${m}-color)` } : {},
          ...!m && ((d = this._config) != null && d.domain_color) ? { color: this._config.domain_color } : {},
          ...this._getParsedCss(a == null ? void 0 : a.css, a)
        };
        return $`<div
              class="climate"
              style=${N(u)}
              @action=${this._handleDomainAction(n)}
              .actionHandler=${W({
          hasHold: H(a == null ? void 0 : a.hold_action),
          hasDoubleClick: H(a == null ? void 0 : a.double_tap_action)
        })}
            >
              (${l.join(", ")})
            </div>`;
      }
    )}
      </div>
    `;
  }
  _renderBottom(t, e, i, s, o, n, r) {
    var a, c;
    return $`
      <div
        class="${J({
      bottom: !0,
      ...e
    })}"
      >
        <div
          class="${J({
      name: !0,
      ...e,
      "text-large": !0,
      on: !0
    })}"
          style=${N({
      ...(a = this._config) != null && a.area_name_color ? { color: `var(--${this._config.area_name_color}-color)` } : {},
      ...this._getParsedCss((c = this._config) == null ? void 0 : c.name_css, this._config)
    })}
          @action=${this._handleAction}
          .actionHandler=${W({
      hasHold: H(this._config.hold_action),
      hasDoubleClick: H(this._config.double_tap_action)
    })}
        >
          ${this._config.area_name || t.name}
        </div>
        ${this._renderSensors(
      i,
      s,
      t,
      o
    )}
        ${this._renderClimates(
      n,
      s,
      r
    )}
      </div>
    `;
  }
  render() {
    var V, O, M, T, F, I, Z, Ae, Ee, Se, Oe;
    if (!this._config || !this.hass || !this.hass.areas || !this.hass.devices || !this.hass.entities)
      return x;
    const t = ((V = this._config) == null ? void 0 : V.design) === "V2", e = t && ((O = this._config) != null && O.v2_color) ? `rgba(${this._config.v2_color.join(", ")})` : "var(--primary-color)", i = {
      mirrored: this._config.mirrored === !0
    }, s = {
      v2: ((M = this._config) == null ? void 0 : M.design) === "V2",
      row: ((T = this._config) == null ? void 0 : T.layout) === "horizontal"
    };
    let o = 3;
    try {
      const b = ((F = this.shadowRoot) == null ? void 0 : F.host) || document.documentElement, k = getComputedStyle(b).getPropertyValue("--row-size");
      k && (o = Number(k.trim()) || 3);
    } catch {
    }
    const n = t ? { background: e } : {}, r = t && o === 1 ? {} : t ? { background: e } : {}, a = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    ), c = {};
    Object.entries(a).forEach(([b, k]) => {
      c[b] = k.filter(
        (D) => this._filterByCategory(D.entity_id)
      );
    });
    const l = this._area(this._config.area, ((I = this.hass) == null ? void 0 : I.areas) || {}), m = this._customizationDomainMap, u = this._customizationCoverMap, d = this._customizationAlertMap, h = this._customizationSensorMap, p = this._computeCovers(c, this._deviceClasses), g = this._computeAlerts(c, this._deviceClasses), _ = this._computeButtons(
      this._config.toggle_domains,
      c
    ), f = this._computeSensors(c, this._deviceClasses), C = ((Ae = (Z = this._config) == null ? void 0 : Z.toggle_domains) != null && Ae.includes("climate") ? ot : []).filter((b) => b in c).map((b) => ({ domain: b })), y = (((Ee = this._config) == null ? void 0 : Ee.display_type) || "").toString().toLowerCase(), v = y.includes("camera"), w = y.includes("picture") || y.includes("image"), A = y === "" ? !0 : y.includes("icon"), P = this._computeCameraEntity(
      v,
      c
    );
    if (l === null)
      return $`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    const S = this._computeIconStyles(
      t,
      o,
      (Se = this._config) == null ? void 0 : Se.icon_css,
      (Oe = this._config) == null ? void 0 : Oe.area_icon_color
    ), B = this.layout === "grid" || this.layout === "panel";
    return $`
      <ha-card class="${J(i)}">
        <div
          class="header"
          style=${(w || v) && (P || l.picture) ? "padding-bottom:0em" : "padding-bottom:12em"}
          @action=${this._handleAction}
          .actionHandler=${W({
      hasHold: H(this._config.hold_action),
      hasDoubleClick: H(this._config.double_tap_action)
    })}
        >
          <div
            class="picture"
            style=${B ? x : "max-height:12em;"}
          >
            ${(() => {
      if ((w || v) && (P || l.picture))
        return $`
                  <hui-image
                    .config=${this._config}
                    .hass=${this.hass}
                    .image=${v ? void 0 : l.picture}
                    .cameraImage=${v ? P : void 0}
                    .cameraView=${this._config.camera_view}
                    fit-mode="cover"
                  ></hui-image>
                `;
    })()}
          </div>
        </div>

        <div
          class="${J({
      "icon-container": !0,
      ...s
    })}"
          style=${N(r)}
        >
          ${A ? $`
                <ha-icon
                  style=${N(S)}
                  icon=${this._config.area_icon || l.icon}
                ></ha-icon>
              ` : x}
        </div>

        <div
          class="${J({
      content: !0,
      ...s
    })}"
          @action=${this._handleAction}
          .actionHandler=${W({
      hasHold: H(this._config.hold_action),
      hasDoubleClick: H(this._config.double_tap_action)
    })}
        >
          ${Mt($`<div
            class="${J({
      right: !0,
      ...s
    })}"
            style=${N(n)}
          >
            ${this._renderCovers(
      p,
      c,
      u
    )}
            ${this._renderAlerts(
      g,
      c,
      d
    )}
            ${this.renderCustomButtons()}
            ${this._renderButtons(
      _,
      c,
      m
    )}
          </div>`)}
          ${Mt(
      this._renderBottom(
        l,
        s,
        f,
        c,
        h,
        C,
        m
      )
    )}
        </div>
      </ha-card>
    `;
  }
  showPopup(t, e, i) {
    t.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => customElements.whenDefined(e),
          dialogParams: i
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _showPopupForDomain(t, e) {
    this.selectedDeviceClass = e || null, this._openDomainPopup(t);
  }
  _openDomainPopup(t) {
    var o, n, r;
    const e = this._area((o = this._config) == null ? void 0 : o.area, ((n = this.hass) == null ? void 0 : n.areas) || {}), i = ((r = this._config) == null ? void 0 : r.area_name) || e && e.name || "Details";
    this.showPopup(this, "area-card-plus-popup", {
      title: i,
      hass: this.hass,
      selectedDomain: t,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup || void 0,
      card: this
    });
  }
  _openGeneralPopup() {
    var n, r, a;
    const t = this._area((n = this._config) == null ? void 0 : n.area, ((r = this.hass) == null ? void 0 : r.areas) || {}), e = ((a = this._config) == null ? void 0 : a.area_name) || t && t.name || "Details", i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    ), s = [];
    Object.values(i || {}).forEach((c) => {
      c.forEach((l) => {
        !oe.includes(l.state) && !te.includes(l.state) && s.push(l);
      });
    }), this.showPopup(this, "area-card-plus-popup", {
      title: e,
      hass: this.hass,
      entities: s,
      card: this,
      content: s.length ? void 0 : "Keine Entitäten"
    });
  }
  static get styles() {
    return we`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
      }
      .header {
        position: relative;
        height: 100%;
        width: 100%;
      }
      .picture {
        height: 100%;
        width: 100%;
        background-size: cover;
        background-position: center;
        position: relative;
      }
      hui-image {
        height: 100%;
        width: 100%;
      }
      .sensors {
        --mdc-icon-size: 20px;
      }
      .sensor-value {
        vertical-align: middle;
      }
      .sensor-row {
        display: flex;
        align-items: center;
        gap: 0.5em;
      }
      .icon-container {
        position: absolute;
        top: 16px;
        left: 16px;
        color: var(--primary-color);
        z-index: 1;
        pointer-events: none;
      }
      .icon-container.row {
        top: 25%;
      }
      .icon-container.v2 {
        top: 8px;
        left: 8px;
        border-radius: 50%;
      }
      .mirrored .icon-container {
        left: unset;
        right: 16px;
      }
      .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
      .content.row {
        flex-direction: column;
        justify-content: center;
      }
      .right {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
        position: absolute;
        top: 8px;
        right: 8px;
        gap: 7px;
      }
      .right.row {
        top: unset;
      }
      .mirrored .right {
        right: unset;
        left: 8px;
        flex-direction: row-reverse;
      }
      .alerts,
      .covers,
      .custom_buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: -3px;
        gap: 2px;
      }
      .alerts.row,
      .covers.row,
      .custom_buttons.row {
        flex-direction: row-reverse;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-right: -3px;
      }
      .buttons.row {
        flex-direction: row-reverse;
      }
      .bottom {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 8px;
        left: 16px;
      }
      .bottom.row {
        flex-direction: row;
        left: calc(var(--row-size, 3) * 20px + 25px);
        bottom: unset;
        align-items: baseline;
        gap: 5px;
      }
      .mirrored .bottom.row {
        flex-direction: row-reverse;
        right: calc(var(--row-size, 3) * 20px + 25px) !important;
      }
      .mirrored .bottom {
        left: unset;
        right: 16px;
        text-align: end;
      }
      .name {
        font-weight: bold;
        margin-bottom: 8px;
        z-index: 1;
      }
      .name.row {
        margin-bottom: 0;
      }
      .icon-with-count {
        display: flex;
        align-items: center;
        gap: 5px;
        background: none;
        border: solid 0.025rem rgba(var(--rgb-primary-text-color), 0.15);
        padding: 1px;
        border-radius: 5px;
        --mdc-icon-size: 20px;
      }
      .icon-with-count > ha-state-icon,
      .icon-with-count > span {
        pointer-events: none;
      }

      .toggle-on {
        color: var(--primary-text-color);
      }
      .toggle-off {
        color: var(--secondary-text-color) !important;
      }
      .off {
        color: var(--secondary-text-color);
      }
      .navigate {
        cursor: pointer;
      }
      .hover:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
      }
      .text-small {
        font-size: 0.9em;
      }
      .text-medium {
        font-size: 1em;
      }
      .text-large {
        font-size: 1.3em;
      }
      .right * {
        pointer-events: auto;
      }
      .v2 .covers {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .covers {
        flex-direction: row;
      }
      .v2 .custom_buttons {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .custom_buttons {
        flex-direction: row;
      }
      .v2 .alerts {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .areas {
        flex-direction: row;
      }
      .v2 .buttons {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .buttons {
        flex-direction: row;
      }
      .mirrored .v2 .bottom {
        right: 105px !important;
        left: unset;
      }
      .v2 .right {
        bottom: 0px;
        left: 0px;
        right: 0px;
        padding: calc(var(--row-size, 3) * 3px) 8px;
        top: unset;
        min-height: 24px;
        pointer-events: none;
      }
      .v2 .bottom {
        left: calc(var(--row-size, 3) * 15px + 55px);
        top: calc(var(--row-size, 3) * 5px + 4px);
        bottom: unset;
      }
      .v2 .bottom.row {
        top: calc(var(--row-size, 3) * 8px + 12px);
        left: calc(var(--row-size, 3) * 15px + 55px);
      }

      .v2 .name {
        margin-bottom: calc(var(--row-size, 3) * 1.5px + 1px);
      }
      .v2 .name.row {
        margin-bottom: 0px;
      }

      @supports (--row-size: 1) {
        .icon-container ha-icon {
          --mdc-icon-size: calc(var(--row-size, 3) * 20px);
        }
        .icon-container.v2 ha-icon {
          --mdc-icon-size: calc(var(--row-size, 3) * 15px);
          border-radius: 50%;
          display: flex;
          padding: 16px;
          color: var(--card-background-color);
        }
      }

      @media (max-width: 768px) {
        .name {
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
    `;
  }
};
ge([
  z({ attribute: !1 })
], re.prototype, "hass", 2);
ge([
  z({ attribute: !1 })
], re.prototype, "layout", 2);
ge([
  R()
], re.prototype, "_config", 2);
ge([
  R()
], re.prototype, "selectedDomain", 2);
ge([
  R()
], re.prototype, "selectedDeviceClass", 2);
ge([
  R()
], re.prototype, "selectedGroup", 2);
re = ge([
  se("area-card-plus")
], re);
var ts = Object.defineProperty, is = Object.getOwnPropertyDescriptor, U = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? is(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && ts(e, i, o), o;
};
class ve extends Y {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    if (!this.hass)
      return x;
    const e = new Set(
      (this.customization || []).map((s) => s.type)
    ), i = this.SelectOptions.filter(
      (s) => !e.has(s.value)
    );
    return $`
      <div class="customization">
        ${this.customization && ie(
      this.customization,
      (s) => this._getKey(s),
      (s, o) => {
        var n;
        return $`
            <div class="customize-item">
              <ha-select
                label=${this.hass.localize(
          "ui.panel.lovelace.editor.features.edit"
        )}
                name="Customize"
                class="select-customization"
                naturalMenuWidth
                fixedMenuPosition
                .value=${s.type}
                @closed=${(r) => r.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                <mwc-list-item .value=${s.type} selected disabled>
                  ${((n = this.SelectOptions.find((r) => r.value === s.type)) == null ? void 0 : n.label) || s.type}
                </mwc-list-item>
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${ft}
                class="remove-icon"
                .index=${o}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${Yt}
                class="edit-icon"
                .index=${o}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `;
      }
    )}

        <div class="add-item row">
          <ha-select
            label=${this.hass.localize(
      "ui.panel.lovelace.editor.common.edit"
    ) + " " + this.hass.localize(
      "ui.panel.lovelace.editor.card.markdown.content"
    )}
            name="Customize"
            class="add-customization"
            naturalMenuWidth
            fixedMenuPosition
            @closed=${(s) => s.stopPropagation()}
            @click=${this._addRow}
          >
            ${i.map(
      (s) => $`<mwc-list-item .value=${s.value}
                  >${s.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    `;
  }
  _valueChanged(e) {
    if (!this.customization || !this.hass)
      return;
    const i = e.detail.value, s = e.target.index, o = this.customization.concat();
    o[s] = { ...o[s], type: i || "" }, L(this, "config-changed", o);
  }
  _removeRow(e) {
    e.stopPropagation();
    const i = e.currentTarget.index;
    if (i != null) {
      const s = this.customization.concat();
      s.splice(i, 1), L(this, "config-changed", s);
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const i = e.target.index;
    i != null && L(this, "edit-item", i);
  }
  _addRow(e) {
    if (e.stopPropagation(), !this.customization || !this.hass)
      return;
    const i = this.shadowRoot.querySelector(
      ".add-customization"
    );
    if (!i || !i.value)
      return;
    const o = { type: i.value };
    L(this, "config-changed", [...this.customization, o]), i.value = "";
  }
  static get styles() {
    return we`
      .customization {
        margin-top: 16px;
      }
      .customize-item,
      .add-item {
        display: flex;
        align-items: center;
      }
      .add-customization,
      .select-customization {
        width: 100%;
        margin-top: 8px;
      }
      .remove-icon,
      .edit-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
        padding-left: 4px;
      }
    `;
  }
}
U([
  z({ attribute: !1 })
], ve.prototype, "hass", 2);
U([
  z({ type: Array })
], ve.prototype, "SelectOptions", 2);
let at = class extends ve {
  get customization() {
    return this.customization_domain;
  }
};
U([
  z({ attribute: !1 })
], at.prototype, "customization_domain", 2);
at = U([
  se("domain-items-editor")
], at);
let rt = class extends ve {
  get customization() {
    return this.customization_alert;
  }
};
U([
  z({ attribute: !1 })
], rt.prototype, "customization_alert", 2);
rt = U([
  se("alert-items-editor")
], rt);
let ct = class extends ve {
  get customization() {
    return this.customization_cover;
  }
};
U([
  z({ attribute: !1 })
], ct.prototype, "customization_cover", 2);
ct = U([
  se("cover-items-editor")
], ct);
let lt = class extends ve {
  get customization() {
    return this.customization_sensor;
  }
};
U([
  z({ attribute: !1 })
], lt.prototype, "customization_sensor", 2);
lt = U([
  se("sensor-items-editor")
], lt);
let dt = class extends ve {
  get customization() {
    return this.customization_popup;
  }
};
U([
  z({ attribute: !1 })
], dt.prototype, "customization_popup", 2);
dt = U([
  se("popup-items-editor")
], dt);
let Te = class extends Y {
  _editRow(t) {
    t.stopPropagation();
    const e = t.currentTarget.index;
    L(this, "edit-item", e);
  }
  _removeRow(t) {
    if (t.stopPropagation(), !this.custom_buttons) return;
    const e = t.currentTarget.index, i = [...this.custom_buttons];
    i.splice(e, 1), L(this, "config-changed", i);
  }
  _addRow() {
    const t = {
      name: "",
      icon: "",
      tap_action: { action: "none" }
    }, e = [...this.custom_buttons || [], t];
    L(this, "config-changed", e);
  }
  render() {
    var t;
    return this.hass ? $`
      <div class="custom-buttons">
        ${(t = this.custom_buttons) == null ? void 0 : t.map(
      (e, i) => $`
            <div class="row">
              <div class="item">
                <ha-icon
                  .icon=${e.icon || "mdi:gesture-tap-button"}
                ></ha-icon>
                <span class="name"
                  >${e.name || `Button ${i + 1}`}</span
                >
              </div>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${Yt}
                .index=${i}
                @click=${this._editRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${ft}
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>
            </div>
          `
    )}
        <div class="add-button-container">
          <mwc-button @click=${this._addRow} class="add-btn" outlined>
            Add Custom Button
          </mwc-button>
        </div>
      </div>
    ` : x;
  }
};
Te.styles = we`
    .row {
      display: flex;
      align-items: center;
      padding: 4px 0;
    }
    .item {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 16px;
    }
    .add-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: var(--primary-color);
      color: white;
      font-weight: 500;
      -webkit-align-self: flex-start;
      -ms-flex-item-align: flex-start;
      align-self: flex-start;
    }
    ha-icon {
      color: var(--secondary-text-color);
    }
    .add-button-container {
      padding: 8px 0;
      text-align: right;
    }
  `;
U([
  z({ attribute: !1 })
], Te.prototype, "hass", 2);
U([
  z({ attribute: !1 })
], Te.prototype, "custom_buttons", 2);
Te = U([
  se("custom-buttons-editor")
], Te);
var ss = Object.defineProperty, os = Object.getOwnPropertyDescriptor, xe = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? os(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && ss(e, i, o), o;
};
let fe = class extends Y {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = E(() => {
      var i;
      const t = [
        "more-info",
        "toggle",
        "navigate",
        "url",
        "perform-action",
        "none"
      ], e = [
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "css", selector: { template: {} } },
        { name: "icon_css", selector: { template: {} } },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        },
        { name: "popup_card", selector: { object: {} } }
      ];
      return ((i = this._config) == null ? void 0 : i.type) === "climate" && e.unshift(
        {
          name: "display_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "text", label: "Text" },
                { value: "icon", label: "Icon" },
                { value: "text_icon", label: "Text + Icon" }
              ]
            }
          }
        },
        {
          name: "show_set_temperature",
          selector: {
            boolean: {}
          }
        }
      ), e;
    }), this._schemaalert = E(() => {
      const t = [
        "more-info",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "invert", selector: { boolean: {} } },
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "css", selector: { template: {} } },
        { name: "icon_css", selector: { template: {} } },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        },
        { name: "popup_card", selector: { object: {} } }
      ];
    }), this._schemasensor = E(() => {
      const t = [
        "more-info",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "invert", selector: { boolean: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "css", selector: { template: {} } },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        },
        { name: "popup_card", selector: { object: {} } }
      ];
    }), this._schemacustombutton = E(() => {
      const t = [
        "more-info",
        "toggle",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "name", selector: { text: {} } },
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        }
      ];
    }), this._computeLabelCallback = (t) => {
      switch (t.name) {
        case "color":
          return this.hass.localize("ui.panel.lovelace.editor.card.tile.color");
        case "enable_popup_view":
          return this.hass.localize("ui.common.enable") + " " + this.hass.localize(
            "ui.panel.lovelace.editor.action-editor.actions.more-info"
          );
        case "disable_toggle_action":
          return this.hass.localize("ui.common.disable") + " " + this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.tap_action"
          );
        case "css":
          return "CSS";
        case "icon_css":
          return this.hass.localize("ui.panel.lovelace.editor.card.generic.icon") + " CSS";
        case "display_mode":
          return "Display Mode";
        case "popup_card":
          return "Change Popup Card Type";
        case "icon":
        case "tap_action":
        case "hold_action":
        case "double_tap_action":
          return this.hass.localize(
            `ui.panel.lovelace.editor.card.generic.${t.name}`
          );
        case "invert":
        case "invert_state":
          return this.hass.localize(
            "ui.dialogs.entity_registry.editor.invert.label"
          );
        case "name":
          return this.hass.localize("ui.common.name");
        case "show_set_temperature":
          return "Show Set Temperature";
        default:
          return this.hass.localize(
            `ui.panel.lovelace.editor.card.area.${t.name}`
          );
      }
    };
  }
  updated(t) {
    t.has("config") && this.config && (this._config = { ...this.config });
  }
  render() {
    if (!this.hass || !this.config)
      return $``;
    this._config || (this._config = { ...this.config, area: this.config.area || "" });
    let t;
    switch (this.getSchema) {
      case "sensor":
        t = this._schemasensor();
        break;
      case "domain":
        t = this._schemadomain();
        break;
      case "alert":
      case "cover":
        t = this._schemaalert();
        break;
      case "custom_button":
        t = this._schemacustombutton();
        break;
    }
    const e = { ...this._config };
    return $`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
  }
  _valueChangedSchema(t) {
    if (!this.config)
      return;
    const e = {
      ...this.config,
      ...t.detail.value
    };
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: e
      })
    );
  }
  static get styles() {
    return we`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
    `;
  }
};
xe([
  z({ attribute: !1 })
], fe.prototype, "config", 2);
xe([
  z({ attribute: !1 })
], fe.prototype, "hass", 2);
xe([
  z({ type: Boolean })
], fe.prototype, "useSensorSchema", 2);
xe([
  R()
], fe.prototype, "getSchema", 2);
xe([
  R()
], fe.prototype, "_config", 2);
fe = xe([
  se("item-editor")
], fe);
var ns = Object.defineProperty, as = Object.getOwnPropertyDescriptor, ee = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? as(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && ns(e, i, o), o;
};
let q = class extends Y {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this._subElementEditorCustomButton = void 0, this.computeLabel = E((t) => Qt(this.hass, t)), this._schema = E(
      (t, e) => {
        const i = (o) => this.hass.localize(o) || o, s = [
          "more-info",
          "navigate",
          "url",
          "perform-action",
          "none"
        ];
        return [
          { name: "area", selector: { area: {} } },
          {
            name: "appearance",
            flatten: !0,
            type: "expandable",
            icon: "mdi:palette",
            schema: [
              {
                name: "",
                type: "grid",
                schema: [
                  { name: "area_name", selector: { text: {} } },
                  {
                    name: "area_name_color",
                    selector: {
                      ui_color: { default_color: "state", include_state: !0 }
                    }
                  },
                  { name: "area_icon", selector: { icon: {} } },
                  {
                    name: "area_icon_color",
                    selector: {
                      ui_color: { default_color: "state", include_state: !0 }
                    }
                  },
                  {
                    name: "display_type",
                    selector: {
                      select: {
                        options: [
                          "icon",
                          "picture",
                          "icon & picture",
                          "camera",
                          "camera & icon"
                        ].map((o) => {
                          const n = (c) => {
                            const l = c.trim().toLowerCase();
                            return l === "icon" ? "ui.panel.lovelace.editor.card.generic.icon" : l === "picture" || l === "image" ? "ui.components.selectors.image.image" : l === "camera" ? "ui.panel.lovelace.editor.card.area.display_type_options.camera" : `ui.panel.lovelace.editor.card.area.display_type_options.${c}`;
                          }, a = o.split(" & ").map((c) => c.trim()).map((c) => i(n(c)) || c).join(" & ");
                          return { value: o, label: a };
                        }),
                        mode: "dropdown"
                      }
                    }
                  },
                  ...e === "camera" || e === "camera & icon" ? [
                    {
                      name: "camera_view",
                      selector: {
                        select: {
                          options: ["auto", "live"].map((o) => ({
                            value: o,
                            label: i(
                              `ui.panel.lovelace.editor.card.generic.camera_view_options.${o}`
                            )
                          })),
                          mode: "dropdown"
                        }
                      }
                    }
                  ] : []
                ]
              },
              { name: "mirrored", selector: { boolean: {} } },
              {
                name: "layout",
                required: !0,
                selector: {
                  select: {
                    mode: "box",
                    options: ["vertical", "horizontal"].map((o) => ({
                      label: this.hass.localize(
                        `ui.panel.lovelace.editor.card.tile.content_layout_options.${o}`
                      ),
                      value: o,
                      image: {
                        src: `/static/images/form/tile_content_layout_${o}.svg`,
                        src_dark: `/static/images/form/tile_content_layout_${o}_dark.svg`,
                        flip_rtl: !0
                      }
                    }))
                  }
                }
              },
              {
                name: "design",
                selector: {
                  select: { mode: "box", options: ["V1", "V2"] }
                }
              },
              ...t === "V2" ? [
                {
                  name: "v2_color",
                  selector: {
                    color_rgb: {
                      default_color: "state",
                      include_state: !0
                    }
                  }
                }
              ] : [],
              { name: "theme", required: !1, selector: { theme: {} } },
              {
                name: "css",
                flatten: !0,
                type: "expandable",
                icon: "mdi:palette",
                schema: [
                  { name: "icon_css", selector: { template: {} } },
                  { name: "name_css", selector: { template: {} } }
                ]
              },
              { name: "tap_action", selector: { ui_action: { actions: s } } },
              { name: "double_tap_action", selector: { ui_action: { actions: s } } },
              { name: "hold_action", selector: { ui_action: { actions: s } } }
            ]
          }
        ];
      }
    ), this._binaryschema = E((t) => [
      {
        name: "alert_classes",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "alert_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      },
      { name: "alert_css", selector: { template: {} } }
    ]), this._coverschema = E((t) => [
      {
        name: "cover_classes",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "cover_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      },
      { name: "cover_css", selector: { template: {} } }
    ]), this._sensorschema = E((t) => [
      {
        name: "",
        type: "grid",
        schema: [
          { name: "show_sensor_icons", selector: { boolean: {} } },
          { name: "wrap_sensor_icons", selector: { boolean: {} } }
        ]
      },
      {
        name: "sensor_classes",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "sensor_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      }
    ]), this._toggleschema = E((t) => [
      {
        name: "toggle_domains",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "domain_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      },
      { name: "domain_css", selector: { template: {} } },
      { name: "show_active", selector: { boolean: {} } }
    ]), this._popupschema = E(
      (t, e) => {
        const i = this.computeLabel({ name: "name" }), s = this.computeLabel({ name: "state" });
        return [
          {
            name: "columns",
            selector: { number: { min: 1, max: 4, mode: "box" } }
          },
          {
            name: "",
            type: "grid",
            schema: [
              {
                name: "ungroup_areas",
                selector: { boolean: {} }
              },
              { name: "hide_unavailable", selector: { boolean: {} } }
            ]
          },
          {
            name: "popup_sort",
            selector: {
              select: {
                options: [
                  { value: "name", label: i },
                  { value: "state", label: s }
                ]
              }
            }
          },
          {
            name: "popup_domains",
            selector: {
              select: {
                reorder: !0,
                multiple: !0,
                custom_value: !0,
                options: t
              }
            }
          },
          {
            name: "edit_filters",
            flatten: !0,
            type: "expandable",
            icon: "mdi:eye-plus",
            schema: [{ name: "label", selector: { label: { multiple: !0 } } }]
          },
          {
            name: "extra_entities",
            flatten: !0,
            type: "expandable",
            icon: "mdi:eye-plus",
            schema: [
              {
                name: "extra_entities",
                selector: { entity: { multiple: !0 } }
              }
            ]
          }
        ];
      }
    ), this._binaryClassesForArea = E(
      (t) => this._classesForArea(t, "binary_sensor")
    ), this._coverClassesForArea = E(
      (t) => this._classesForArea(t, "cover")
    ), this._sensorClassesForArea = E(
      (t, e) => this._classesForArea(t, "sensor", e)
    ), this._toggleDomainsForArea = E(
      (t) => this._classesForArea(t, "toggle")
    ), this._allDomainsForArea = E(
      (t) => this._classesForArea(t, "all")
    ), this._buildBinaryOptions = E(
      (t, e) => this._buildOptions("binary_sensor", t, e)
    ), this._buildCoverOptions = E(
      (t, e) => this._buildOptions("cover", t, e)
    ), this._buildSensorOptions = E(
      (t, e) => this._buildOptions("sensor", t, e)
    ), this._buildToggleOptions = E(
      (t, e) => this._buildOptions("toggle", t, e)
    ), this._buildAllOptions = E(
      (t, e) => this._buildOptions("all", t, e)
    ), this._entityOptions = [], this._toggleEntityHidden = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.hidden_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        hidden_entities: i
      }, L(this, "config-changed", { config: this._config });
    }, this._toggleEntityExcluded = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.excluded_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        excluded_entities: i
      }, L(this, "config-changed", { config: this._config });
    };
  }
  _classesForArea(t, e, i) {
    var o;
    let s;
    if (e === "toggle")
      return s = Object.values(this.hass.entities).filter(
        (n) => {
          var r;
          return (He.includes(j(n.entity_id)) || ot.includes(j(n.entity_id))) && !n.hidden && (n.area_id === t || n.device_id && ((r = this.hass.devices[n.device_id]) == null ? void 0 : r.area_id) === t);
        }
      ), [
        ...new Set(s.map((n) => j(n.entity_id)))
      ];
    if (e === "all") {
      const n = ((o = this._config) == null ? void 0 : o.extra_entities) || [];
      let r = Object.values(this.hass.entities).filter(
        (c) => {
          var l;
          return !c.hidden && (c.area_id === t || c.device_id && ((l = this.hass.devices[c.device_id]) == null ? void 0 : l.area_id) === t);
        }
      );
      const a = n.map((c) => this.hass.states[c]).filter((c) => c !== void 0);
      return r = [...r, ...a], [...new Set(r.map((c) => j(c.entity_id)))];
    } else {
      s = Object.values(this.hass.entities).filter(
        (r) => {
          var a;
          return j(r.entity_id) === e && !r.entity_category && !r.hidden && (r.area_id === t || r.device_id && ((a = this.hass.devices[r.device_id]) == null ? void 0 : a.area_id) === t);
        }
      );
      const n = s.map(
        (r) => {
          var a;
          return ((a = this.hass.states[r.entity_id]) == null ? void 0 : a.attributes.device_class) || "";
        }
      ).filter(
        (r) => r && (e !== "sensor" || !i || i.includes(r))
      );
      return [...new Set(n)];
    }
  }
  _buildOptions(t, e, i) {
    const o = [.../* @__PURE__ */ new Set([...e, ...i])].map((n) => ({
      value: n,
      label: n === "scene" ? "Scene" : t === "toggle" || t === "all" ? this.hass.localize(
        `component.${n}.entity_component._.name`
      ) || n : this.hass.localize(
        `component.${t}.entity_component.${n}.name`
      ) || n
    }));
    return o.sort(
      (n, r) => Jt(n.label, r.label, this.hass.locale.language)
    ), o;
  }
  setConfig(t) {
    this._config = {
      ...t,
      columns: t.columns || 4,
      mirrored: t.mirrored || !1,
      customization_domain: t.customization_domain || [],
      customization_alert: t.customization_alert || [],
      customization_cover: t.customization_cover || [],
      customization_sensor: t.customization_sensor || [],
      custom_buttons: t.custom_buttons || []
    };
  }
  async updated(t) {
    var e;
    if (super.updated(t), !(!this.hass || !this._config)) {
      if (t.has("_config")) {
        const i = t.get("_config"), s = i == null ? void 0 : i.area, o = this._config.area, n = (i == null ? void 0 : i.extra_entities) || [], r = this._config.extra_entities || [], a = (i == null ? void 0 : i.popup_domains) || [], c = ((e = this._config) == null ? void 0 : e.popup_domains) || [], l = n.length !== r.length || !n.every(
          (u) => r.includes(u)
        ), m = a.length !== c.length || !a.every(
          (u) => c.includes(u)
        );
        if (s !== void 0 && s !== o) {
          const u = this._toggleDomainsForArea(o), d = this._binaryClassesForArea(o), h = this._coverClassesForArea(o), p = this._allDomainsForArea(o), g = u.sort(
            (y, v) => He.indexOf(y) - He.indexOf(v)
          ), _ = Object.keys(Be || {}), f = new Map(
            _.map((y, v) => [y, v])
          ), C = p.sort((y, v) => {
            const w = f.has(y) ? f.get(y) : Number.MAX_SAFE_INTEGER, A = f.has(v) ? f.get(v) : Number.MAX_SAFE_INTEGER;
            return w === A ? y.localeCompare(v) : w - A;
          });
          if (this._config.toggle_domains = [
            ...g.filter((y) => y !== "scene" && y !== "script")
          ], this._config.alert_classes = [...d], this._config.cover_classes = [...h], this._config.popup_domains = [...C], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
            const y = this._config.hidden_entities, v = Object.values(this._hiddenEntitiesByDomain()).flat(), w = y.filter((A) => v.includes(A));
            w.length !== y.length && (this._config = {
              ...this._config || {},
              hidden_entities: w
            }, L(this, "config-changed", {
              config: { ...this._config }
            }));
          }
          this.requestUpdate();
        }
        if (l) {
          for (const u of r) {
            const d = j(u);
            this._config.popup_domains.includes(d) || this._config.popup_domains.push(d);
          }
          this.requestUpdate();
        }
        m && this._updateEntityOptions();
      }
      if (!this._numericDeviceClasses) {
        const { numeric_device_classes: i } = await Fi(this.hass);
        this._numericDeviceClasses = i;
      }
    }
  }
  _updateEntityOptions() {
    if (!this._config || !this.hass) return;
    const t = this._config.area, e = this._config.popup_domains || [];
    this._entityOptions = Object.values(this.hass.entities).filter(
      (i) => {
        var s;
        return !i.hidden && e.includes(j(i.entity_id)) && (i.area_id === t || i.device_id && ((s = this.hass.devices[i.device_id]) == null ? void 0 : s.area_id) === t);
      }
    ).map((i) => ({
      value: i.entity_id,
      label: i.entity_id
    })).sort((i, s) => i.value.localeCompare(s.value)), this._valueChanged({ detail: { value: this._config } });
  }
  _valueChanged(t) {
    this._config = t.detail.value, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config }
      })
    );
  }
  _isHiddenEntity(t) {
    var i;
    const e = ((i = this._config) == null ? void 0 : i.hidden_entities) ?? [];
    return Array.isArray(e) && e.includes(t);
  }
  _isExcludedEntity(t) {
    var i;
    const e = ((i = this._config) == null ? void 0 : i.excluded_entities) ?? [];
    return Array.isArray(e) && e.includes(t);
  }
  _hiddenCategoryChanged(t) {
    var i, s;
    const e = (s = (i = t.detail) == null ? void 0 : i.value) == null ? void 0 : s.category_filter;
    this._config = {
      ...this._config || {},
      category_filter: e
    }, L(this, "config-changed", { config: { ...this._config } });
  }
  _editItem(t, e) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const i = t.detail;
    this[`_subElementEditor${e}`] = { index: i, type: "element" };
  }
  _edit_itemDomain(t) {
    this._editItem(t, "Domain");
  }
  _edit_itemAlert(t) {
    this._editItem(t, "Alert");
  }
  _edit_itemCover(t) {
    this._editItem(t, "Cover");
  }
  _edit_itemSensor(t) {
    this._editItem(t, "Sensor");
  }
  _customizationChanged(t, e) {
    t.stopPropagation(), !(!this._config || !this.hass) && L(this, "config-changed", {
      config: {
        ...this._config,
        [`customization_${e}`]: t.detail
      }
    });
  }
  _customizationChangedDomain(t) {
    this._customizationChanged(t, "domain");
  }
  _customizationChangedAlert(t) {
    this._customizationChanged(t, "alert");
  }
  _customizationChangedCover(t) {
    this._customizationChanged(t, "cover");
  }
  _customizationChangedSensor(t) {
    this._customizationChanged(t, "sensor");
  }
  _renderSubElementEditorCustomButton() {
    var i, s, o;
    const t = ((i = this._subElementEditorCustomButton) == null ? void 0 : i.index) ?? 0, e = ((o = (s = this._config) == null ? void 0 : s.custom_buttons) == null ? void 0 : o[t]) || {};
    return $`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${this._goBackCustomButton}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </mwc-icon-button>
          <span slot="title"
            >${this.hass.localize(
      "ui.panel.lovelace.editor.card.generic.edit_button"
    )}</span
          >
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .config=${e}
        .getSchema=${"custom_button"}
        @config-changed=${this._itemChangedCustomButton}
      ></item-editor>
    `;
  }
  _edit_itemCustomButton(t) {
    t.stopPropagation(), !(!this._config || !this.hass) && (this._subElementEditorCustomButton = { index: t.detail, type: "element" });
  }
  _goBackCustomButton() {
    this._subElementEditorCustomButton = void 0;
  }
  _itemChangedCustomButton(t) {
    var i;
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = (i = this._subElementEditorCustomButton) == null ? void 0 : i.index;
    if (e !== void 0) {
      const s = [...this._config.custom_buttons || []];
      s[e] = t.detail, L(this, "config-changed", {
        config: { ...this._config, custom_buttons: s }
      });
    }
  }
  _customizationChangedCustomButtons(t) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = t.detail;
    L(this, "config-changed", {
      config: { ...this._config, custom_buttons: e }
    });
  }
  _renderSubElementEditor(t, e, i) {
    var m, u, d;
    const s = `customization_${t}`, o = (m = this._config) == null ? void 0 : m[s], n = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, r = ((u = this[n]) == null ? void 0 : u.index) ?? 0, a = ((d = o == null ? void 0 : o[r]) == null ? void 0 : d.type) ?? "unknown", c = a.match(/^(.+?)\s*-\s*(.+)$/);
    let l;
    if (c) {
      const h = c[1].toLowerCase().replace(" ", "_"), p = c[2].toLowerCase(), g = this.hass.localize(`component.${h}.entity_component._.name`) || c[1];
      let _ = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${h}.${p}`
      ) || c[2];
      _ = _.charAt(0).toUpperCase() + _.slice(1), l = `${g} – ${_}`;
    } else {
      let h = this.hass.localize(`component.${a}.entity_component._.name`) || a;
      h = h.charAt(0).toUpperCase() + h.slice(1), l = h;
    }
    return $`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${e}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </mwc-icon-button>
          <span slot="title">${l}</span>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .config=${(o == null ? void 0 : o[r]) || {}}
        .getSchema=${t}
        @config-changed=${i}
      ></item-editor>
    `;
  }
  _renderSubElementEditorByKey(t) {
    return this._renderSubElementEditor(
      t,
      () => this._goBackByKey(t),
      (e) => this._itemChangedByKey(e, t)
    );
  }
  _goBackByKey(t) {
    const e = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`;
    this[e] = void 0;
  }
  _itemChangedByKey(t, e) {
    const i = `_subElementEditor${e.charAt(0).toUpperCase() + e.slice(1)}`, s = this[i], o = `customization_${e}`;
    this._itemChanged(t, s, o);
  }
  _itemChanged(t, e, i) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const s = e == null ? void 0 : e.index;
    if (s != null) {
      const o = [...this._config[i]];
      o[s] = t.detail, L(this, "config-changed", {
        config: { ...this._config, [i]: o }
      });
    }
  }
  get toggleSelectOptions() {
    return this._selectOptions("toggle");
  }
  get AllSelectOptions() {
    return this._selectOptions("all");
  }
  get binarySelectOptions() {
    return this._selectOptions("binary");
  }
  get coverSelectOptions() {
    return this._selectOptions("cover");
  }
  get sensorSelectOptions() {
    return this._selectOptions("sensor");
  }
  _selectOptions(t) {
    var i, s, o, n, r, a;
    const e = ((i = this._config) == null ? void 0 : i.area) || "";
    switch (t) {
      case "toggle":
        return this._buildToggleOptions(
          this._toggleDomainsForArea(e),
          ((s = this._config) == null ? void 0 : s.toggle_domains) || this._toggleDomainsForArea(e)
        );
      case "all":
        return this._buildAllOptions(
          this._allDomainsForArea(e),
          ((o = this._config) == null ? void 0 : o.popup_domains) || this._allDomainsForArea(e)
        );
      case "binary":
        return this._buildBinaryOptions(
          this._binaryClassesForArea(e),
          ((n = this._config) == null ? void 0 : n.alert_classes) || this._binaryClassesForArea(e)
        );
      case "cover":
        return this._buildCoverOptions(
          this._coverClassesForArea(e),
          ((r = this._config) == null ? void 0 : r.cover_classes) || this._coverClassesForArea(e)
        );
      case "sensor":
        return this._buildSensorOptions(
          this._sensorClassesForArea(e),
          ((a = this._config) == null ? void 0 : a.sensor_classes) || this._sensorClassesForArea(e)
        );
    }
  }
  get entityOptions() {
    return this._entityOptions;
  }
  _domainIcon(t, e = "on", i) {
    const s = Be;
    if (t in s) {
      const o = s[t];
      return typeof o == "string" ? o : i && o[i] ? o[i][e === "off" ? "off" : "on"] || o[i] : o[e === "off" ? "off" : "on"] || Object.values(o)[0];
    }
    return "mdi:help-circle";
  }
  _groupAllEntitiesByDomain() {
    var r;
    const t = {}, e = (this.entityOptions || []).map((a) => a.value);
    for (const a of e) {
      const c = j(a);
      t[c] || (t[c] = []), t[c].push(a);
    }
    const i = this._hiddenEntitiesByDomain(), s = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])
    ), o = ((r = this.hass) == null ? void 0 : r.states) || {}, n = this.compareByFriendlyName ? this.compareByFriendlyName(o, this.hass.locale.language) : (a, c) => a.localeCompare(c);
    return s.sort((a, c) => a.localeCompare(c)).map((a) => {
      const c = /* @__PURE__ */ new Set([
        ...t[a] || [],
        ...i[a] || []
      ]);
      return { domain: a, entities: Array.from(c).sort(n) };
    });
  }
  _domainLabel(t) {
    var e, i;
    return ((i = (e = this.hass) == null ? void 0 : e.localize) == null ? void 0 : i.call(e, `component.${t}.entity_component._.name`)) || t;
  }
  _getDeviceClassLabel(t, e) {
    if (!e || e === "other")
      return this.hass.localize("ui.dialogs.helper_settings.generic.other") ?? "Other";
    const i = `ui.dialogs.entity_registry.editor.device_classes.${t}.${e}`;
    return this.hass.localize(i) || e;
  }
  _groupByDeviceClass(t, e) {
    var r, a, c;
    const i = ((r = this.hass) == null ? void 0 : r.states) || {}, s = {};
    for (const l of e) {
      const m = ((c = (a = i[l]) == null ? void 0 : a.attributes) == null ? void 0 : c.device_class) || "";
      m && (s[m] || (s[m] = []), s[m].push(l));
    }
    const o = this.compareByFriendlyName ? this.compareByFriendlyName(i, this.hass.locale.language) : (l, m) => l.localeCompare(m);
    return Object.keys(s).sort((l, m) => l.localeCompare(m)).map((l) => ({
      deviceClass: l,
      label: this._getDeviceClassLabel(t, l),
      entities: s[l].slice().sort(o)
    }));
  }
  _hiddenEntitiesByDomain() {
    var u, d, h, p, g, _, f;
    const t = {}, e = Array.isArray((u = this._config) == null ? void 0 : u.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const i = ((d = this.hass) == null ? void 0 : d.entities) || {}, s = ((h = this.hass) == null ? void 0 : h.devices) || {}, o = (p = this.hass) != null && p.areas ? Object.values(this.hass.areas) : [], n = (g = this._config) == null ? void 0 : g.area, r = (_ = this._config) == null ? void 0 : _.floor, a = (f = this._config) == null ? void 0 : f.label, c = n ? Array.isArray(n) ? n : [n] : [], l = r ? Array.isArray(r) ? r : [r] : [], m = a ? Array.isArray(a) ? a : [a] : [];
    for (const C of e) {
      const y = j(C), v = i[C], w = v != null && v.device_id ? s[v.device_id] : void 0;
      if (((v == null ? void 0 : v.area_id) != null || (w == null ? void 0 : w.area_id) != null) && !(m.length && !(Array.isArray(v == null ? void 0 : v.labels) && v.labels.some((S) => m.includes(S)) || Array.isArray(w == null ? void 0 : w.labels) && w.labels.some((S) => m.includes(S)))) && !(c.length && !(v != null && v.area_id && c.includes(v.area_id) || w != null && w.area_id && c.includes(w.area_id)))) {
        if (l.length) {
          const P = (v == null ? void 0 : v.area_id) && o.some(
            (B) => B.area_id === v.area_id && B.floor_id && l.includes(B.floor_id)
          ), S = (w == null ? void 0 : w.area_id) && o.some(
            (B) => B.area_id === w.area_id && B.floor_id && l.includes(B.floor_id)
          );
          if (!P && !S) continue;
        }
        t[y] || (t[y] = []), t[y].push(C);
      }
    }
    return t;
  }
  render() {
    var u;
    if (!this.hass || !this._config)
      return x;
    const t = this._toggleDomainsForArea(
      this._config.area || ""
    ), e = this._binaryClassesForArea(
      this._config.area || ""
    ), i = this._coverClassesForArea(
      this._config.area || ""
    ), s = this._allDomainsForArea(this._config.area || ""), o = this._schema(
      this._config.design || "V1",
      this._config.display_type
    ), n = this._binaryschema(this.binarySelectOptions), r = this._coverschema(this.coverSelectOptions), a = this._sensorschema(this.sensorSelectOptions), c = this._toggleschema(this.toggleSelectOptions), l = this._popupschema(
      this.AllSelectOptions,
      this.entityOptions
    ), m = {
      alert_classes: e,
      cover_classes: i,
      sensor_classes: nt.sensor,
      toggle_domains: t,
      popup_domains: s,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorByKey("domain") : this._subElementEditorAlert ? this._renderSubElementEditorByKey("alert") : this._subElementEditorCover ? this._renderSubElementEditorByKey("cover") : this._subElementEditorSensor ? this._renderSubElementEditorByKey("sensor") : this._subElementEditorCustomButton ? this._renderSubElementEditorCustomButton() : $`
      <ha-form
        .hass=${this.hass}
        .data=${m}
        .schema=${o}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Ki}></ha-svg-icon>
          ${this.computeLabel({ name: "alert_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${m}
            .schema=${n}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <alert-items-editor
            .hass=${this.hass}
            .customization_alert=${this._config.customization_alert}
            .SelectOptions=${this.binarySelectOptions}
            @edit-item=${this._edit_itemAlert}
            @config-changed=${this._customizationChangedAlert}
          >
          </alert-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Gi}></ha-svg-icon>
          ${this.computeLabel({ name: "cover_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${m}
            .schema=${r}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <cover-items-editor
            .hass=${this.hass}
            .customization_cover=${this._config.customization_cover}
            .SelectOptions=${this.coverSelectOptions}
            @edit-item=${this._edit_itemCover}
            @config-changed=${this._customizationChangedCover}
          >
          </cover-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${qi}></ha-svg-icon>
          ${this.computeLabel({ name: "sensor_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${m}
            .schema=${a}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <sensor-items-editor
            .hass=${this.hass}
            .customization_sensor=${this._config.customization_sensor}
            .SelectOptions=${this.sensorSelectOptions}
            @edit-item=${this._edit_itemSensor}
            @config-changed=${this._customizationChangedSensor}
          >
          </sensor-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main" .name="toggle_domains">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Wi}></ha-svg-icon>
          ${this.computeLabel({ name: "toggle_domains" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${m}
            .schema=${c}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <domain-items-editor
            .hass=${this.hass}
            .customization_domain=${this._config.customization_domain}
            .SelectOptions=${this.toggleSelectOptions}
            @edit-item=${this._edit_itemDomain}
            @config-changed=${this._customizationChangedDomain}
          >
          </domain-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Zi}></ha-svg-icon>
          Custom Buttons
        </div>
        <div class="content">
          <custom-buttons-editor
            .hass=${this.hass}
            .custom_buttons=${this._config.custom_buttons}
            @config-changed=${this._customizationChangedCustomButtons}
            @edit-item=${this._edit_itemCustomButton}
          >
          </custom-buttons-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main" .name="popup">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Xi}></ha-svg-icon>
          ${this.computeLabel({ name: "popup" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${m}
            .schema=${l}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>

          <ha-expansion-panel outlined class="main">
            <div slot="header" role="heading" aria-level="3">
              <ha-svg-icon .path=${tt}></ha-svg-icon>
              ${this.computeLabel({ name: "hidden_entities" })}
            </div>
            <div class="content">
              <ha-form
                .hass=${this.hass}
                .data=${{ category_filter: (u = this._config) == null ? void 0 : u.category_filter }}
                .schema=${[
      {
        name: "category_filter",
        selector: {
          select: {
            options: ["config", "diagnostic", "config+diagnostic"],
            mode: "dropdown"
          }
        }
      }
    ]}
                .computeLabel=${this.computeLabel}
                @value-changed=${(d) => this._hiddenCategoryChanged(d)}
              ></ha-form>
              ${this._groupAllEntitiesByDomain().map(
      (d) => $`
                  <ha-expansion-panel outlined class="domain-panel">
                    <div slot="header" class="domain-header">
                      <ha-icon
                        .icon=${this._domainIcon(d.domain, "on")}
                      ></ha-icon>
                      <span class="domain-title"
                        >${this._domainLabel(d.domain)}</span
                      >
                    </div>
                    <div class="content">
                      ${["binary_sensor", "cover"].includes(d.domain) ? this._groupByDeviceClass(
        d.domain,
        d.entities
      ).map(
        (h) => $`
                              <ha-expansion-panel outlined class="domain-panel">
                                <div slot="header" class="dc-header">
                                  <ha-icon
                                    .icon=${this._domainIcon(
          d.domain,
          "on",
          h.deviceClass
        )}
                                  ></ha-icon>
                                  <span class="dc-title">${h.label}</span>
                                </div>
                                <div class="content">
                                  ${h.entities.map(
          (p) => {
            var g, _;
            return $`
                                      <div class="entity-row">
                                        <span class="entity-name">
                                          ${((_ = (g = this.hass.states[p]) == null ? void 0 : g.attributes) == null ? void 0 : _.friendly_name) || p}
                                        </span>
                                        <ha-icon-button
                                          .path=${this._isHiddenEntity(p) ? tt : Nt}
                                          .label=${this._isHiddenEntity(p) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                          @click=${() => this._toggleEntityHidden(p)}
                                        ></ha-icon-button>
                                        <ha-icon-button
                                          .path=${this._isExcludedEntity(p) ? jt : Ft}
                                          .label=${this._isExcludedEntity(p) ? "Include" : "Exclude"}
                                          @click=${() => this._toggleEntityExcluded(p)}
                                        ></ha-icon-button>
                                      </div>
                                    `;
          }
        )}
                                </div>
                              </ha-expansion-panel>
                            `
      ) : d.entities.map(
        (h) => {
          var p, g;
          return $`
                              <div class="entity-row">
                                <span class="entity-name">
                                  ${((g = (p = this.hass.states[h]) == null ? void 0 : p.attributes) == null ? void 0 : g.friendly_name) || h}
                                </span>
                                <ha-icon-button
                                  .path=${this._isHiddenEntity(h) ? tt : Nt}
                                  .label=${this._isHiddenEntity(h) ? this.hass.localize("ui.common.show") ?? "Show" : this.hass.localize("ui.common.hide") ?? "Hide"}
                                  @click=${() => this._toggleEntityHidden(h)}
                                ></ha-icon-button>
                                <ha-icon-button
                                  .path=${this._isExcludedEntity(h) ? jt : Ft}
                                  .label=${this._isExcludedEntity(h) ? "Include" : "Exclude"}
                                  @click=${() => this._toggleEntityExcluded(h)}
                                ></ha-icon-button>
                              </div>
                            `;
        }
      )}
                    </div>
                  </ha-expansion-panel>
                `
    )}
            </div>
          </ha-expansion-panel>
        </div>
      </ha-expansion-panel>
    `;
  }
};
q.styles = we`
    :host {
      display: block;
    }
    select {
      padding: 5px;
      font-size: 14px;
    }
    ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .main {
      --ha-card-border-radius: 6px;
      border-radius: 6px;
      margin-top: 16px;
    }
    ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .content {
      padding: 12px 4px;
    }
    .back-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      gap: 0.5em;
    }
    ha-icon {
      display: flex;
    }
    .header {
      margin-bottom: 0.5em;
    }
    .entity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 4px 0;
    }
    .entity-name {
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .domain-panel {
      margin-top: 6px;
    }
    .domain-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .domain-header ha-icon {
      --mdc-icon-size: 20px;
    }
    .dc-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dc-header ha-icon {
      --mdc-icon-size: 20px;
    }
  `;
ee([
  z({ attribute: !1 })
], q.prototype, "hass", 2);
ee([
  R()
], q.prototype, "_config", 2);
ee([
  R()
], q.prototype, "_entities", 2);
ee([
  R()
], q.prototype, "_numericDeviceClasses", 2);
ee([
  R()
], q.prototype, "_subElementEditorDomain", 2);
ee([
  R()
], q.prototype, "_subElementEditorAlert", 2);
ee([
  R()
], q.prototype, "_subElementEditorCover", 2);
ee([
  R()
], q.prototype, "_subElementEditorSensor", 2);
ee([
  R()
], q.prototype, "_subElementEditorCustomButton", 2);
q = ee([
  se("area-card-plus-editor")
], q);
console.info(
  `%c AREA-CARD %c ${ti.version} `,
  "color: steelblue; background: black; font-weight: bold;",
  "color: white ; background: dimgray; font-weight: bold;"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "area-card-plus",
  name: "Area Card Plus",
  preview: !0,
  description: "A custom card to display area information."
});
