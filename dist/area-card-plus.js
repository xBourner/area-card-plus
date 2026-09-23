const Ss = "v1.4.1", ws = {
  version: Ss
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xe = globalThis, Et = Xe.ShadowRoot && (Xe.ShadyCSS === void 0 || Xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, zt = Symbol(), ti = /* @__PURE__ */ new WeakMap();
let vs = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Et && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = ti.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ti.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const xs = (t) => new vs(typeof t == "string" ? t : t + "", void 0, zt), Se = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, a, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + t[o + 1]), t[0]);
  return new vs(i, t, zt);
}, Es = (t, e) => {
  if (Et) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), a = Xe.litNonce;
    a !== void 0 && s.setAttribute("nonce", a), s.textContent = i.cssText, t.appendChild(s);
  }
}, ii = Et ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return xs(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zs, defineProperty: Ps, getOwnPropertyDescriptor: Os, getOwnPropertyNames: Is, getOwnPropertySymbols: js, getPrototypeOf: Ds } = Object, de = globalThis, si = de.trustedTypes, Ts = si ? si.emptyScript : "", ct = de.reactiveElementPolyfillSupport, Oe = (t, e) => t, it = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ts : null;
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
} }, Pt = (t, e) => !zs(t, e), ai = { attribute: !0, type: String, converter: it, reflect: !1, useDefault: !1, hasChanged: Pt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), de.litPropertyMetadata ?? (de.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ke = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ai) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), a = this.getPropertyDescriptor(e, s, i);
      a !== void 0 && Ps(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: a, set: o } = Os(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: a, set(n) {
      const r = a == null ? void 0 : a.call(this);
      o == null || o.call(this, n), this.requestUpdate(e, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ai;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Oe("elementProperties"))) return;
    const e = Ds(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Oe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Oe("properties"))) {
      const i = this.properties, s = [...Is(i), ...js(i)];
      for (const a of s) this.createProperty(a, i[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, a] of i) this.elementProperties.set(s, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const a = this._$Eu(i, s);
      a !== void 0 && this._$Eh.set(a, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const a of s) i.unshift(ii(a));
    } else e !== void 0 && i.push(ii(e));
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
    return Es(e, this.constructor.elementStyles), e;
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
    var o;
    const s = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, s);
    if (a !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : it).toAttribute(i, s.type);
      this._$Em = e, n == null ? this.removeAttribute(a) : this.setAttribute(a, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var o, n;
    const s = this.constructor, a = s._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const r = s.getPropertyOptions(a), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : it;
      this._$Em = a;
      const c = l.fromAttribute(i, r.type);
      this[a] = c ?? ((n = this._$Ej) == null ? void 0 : n.get(a)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    var a;
    if (e !== void 0) {
      const o = this.constructor, n = this[e];
      if (s ?? (s = o.getPropertyOptions(e)), !((s.hasChanged ?? Pt)(n, i) || s.useDefault && s.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: a, wrapped: o }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), a === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [o, n] of a) {
        const { wrapped: r } = n, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, n, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach(((a) => {
        var o;
        return (o = a.hostUpdate) == null ? void 0 : o.call(a);
      })), this.update(i)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach(((s) => {
      var a;
      return (a = s.hostUpdated) == null ? void 0 : a.call(s);
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
ke.elementStyles = [], ke.shadowRootOptions = { mode: "open" }, ke[Oe("elementProperties")] = /* @__PURE__ */ new Map(), ke[Oe("finalized")] = /* @__PURE__ */ new Map(), ct == null || ct({ ReactiveElement: ke }), (de.reactiveElementVersions ?? (de.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis, st = Ie.trustedTypes, oi = st ? st.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Cs = "$lit$", ne = `lit$${Math.random().toFixed(9).slice(2)}$`, bs = "?" + ne, Bs = `<${bs}>`, be = document, je = () => be.createComment(""), De = (t) => t === null || typeof t != "object" && typeof t != "function", Ot = Array.isArray, Rs = (t) => Ot(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", dt = `[ 	
\f\r]`, Pe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ni = /-->/g, ri = />/g, fe = RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), li = /'/g, ci = /"/g, ys = /^(?:script|style|textarea|title)$/i, Zs = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), _ = Zs(1), X = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), di = /* @__PURE__ */ new WeakMap(), ve = be.createTreeWalker(be, 129);
function As(t, e) {
  if (!Ot(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return oi !== void 0 ? oi.createHTML(e) : e;
}
const Ns = (t, e) => {
  const i = t.length - 1, s = [];
  let a, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = Pe;
  for (let r = 0; r < i; r++) {
    const l = t[r];
    let c, d, h = -1, f = 0;
    for (; f < l.length && (n.lastIndex = f, d = n.exec(l), d !== null); ) f = n.lastIndex, n === Pe ? d[1] === "!--" ? n = ni : d[1] !== void 0 ? n = ri : d[2] !== void 0 ? (ys.test(d[2]) && (a = RegExp("</" + d[2], "g")), n = fe) : d[3] !== void 0 && (n = fe) : n === fe ? d[0] === ">" ? (n = a ?? Pe, h = -1) : d[1] === void 0 ? h = -2 : (h = n.lastIndex - d[2].length, c = d[1], n = d[3] === void 0 ? fe : d[3] === '"' ? ci : li) : n === ci || n === li ? n = fe : n === ni || n === ri ? n = Pe : (n = fe, a = void 0);
    const u = n === fe && t[r + 1].startsWith("/>") ? " " : "";
    o += n === Pe ? l + Bs : h >= 0 ? (s.push(c), l.slice(0, h) + Cs + l.slice(h) + ne + u) : l + ne + (h === -2 ? r : u);
  }
  return [As(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Te {
  constructor({ strings: e, _$litType$: i }, s) {
    let a;
    this.parts = [];
    let o = 0, n = 0;
    const r = e.length - 1, l = this.parts, [c, d] = Ns(e, i);
    if (this.el = Te.createElement(c, s), ve.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (a = ve.nextNode()) !== null && l.length < r; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const h of a.getAttributeNames()) if (h.endsWith(Cs)) {
          const f = d[n++], u = a.getAttribute(h).split(ne), m = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: o, name: m[2], strings: u, ctor: m[1] === "." ? Gs : m[1] === "?" ? Ks : m[1] === "@" ? Us : nt }), a.removeAttribute(h);
        } else h.startsWith(ne) && (l.push({ type: 6, index: o }), a.removeAttribute(h));
        if (ys.test(a.tagName)) {
          const h = a.textContent.split(ne), f = h.length - 1;
          if (f > 0) {
            a.textContent = st ? st.emptyScript : "";
            for (let u = 0; u < f; u++) a.append(h[u], je()), ve.nextNode(), l.push({ type: 2, index: ++o });
            a.append(h[f], je());
          }
        }
      } else if (a.nodeType === 8) if (a.data === bs) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = a.data.indexOf(ne, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += ne.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const s = be.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Me(t, e, i = t, s) {
  var n, r;
  if (e === X) return e;
  let a = s !== void 0 ? (n = i._$Co) == null ? void 0 : n[s] : i._$Cl;
  const o = De(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== o && ((r = a == null ? void 0 : a._$AO) == null || r.call(a, !1), o === void 0 ? a = void 0 : (a = new o(t), a._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = a : i._$Cl = a), a !== void 0 && (e = Me(t, a._$AS(t, e.values), a, s)), e;
}
let Fs = class {
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
    const { el: { content: i }, parts: s } = this._$AD, a = ((e == null ? void 0 : e.creationScope) ?? be).importNode(i, !0);
    ve.currentNode = a;
    let o = ve.nextNode(), n = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new we(o, o.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (c = new qs(o, this, e)), this._$AV.push(c), l = s[++r];
      }
      n !== (l == null ? void 0 : l.index) && (o = ve.nextNode(), n++);
    }
    return ve.currentNode = be, a;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
};
class we {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, a) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
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
    e = Me(this, e, i), De(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== X && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Rs(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== C && De(this._$AH) ? this._$AA.nextSibling.data = e : this.T(be.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: i, _$litType$: s } = e, a = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Te.createElement(As(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === a) this._$AH.p(i);
    else {
      const n = new Fs(a, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = di.get(e.strings);
    return i === void 0 && di.set(e.strings, i = new Te(e)), i;
  }
  k(e) {
    Ot(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, a = 0;
    for (const o of e) a === i.length ? i.push(s = new we(this.O(je()), this.O(je()), this, this.options)) : s = i[a], s._$AI(o), a++;
    a < i.length && (this._$AR(s && s._$AB.nextSibling, a), i.length = a);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); e !== this._$AB; ) {
      const a = e.nextSibling;
      e.remove(), e = a;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class nt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, a, o) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = e, this.name = i, this._$AM = a, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = C;
  }
  _$AI(e, i = this, s, a) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = Me(this, e, i, 0), n = !De(e) || e !== this._$AH && e !== X, n && (this._$AH = e);
    else {
      const r = e;
      let l, c;
      for (e = o[0], l = 0; l < o.length - 1; l++) c = Me(this, r[s + l], i, l), c === X && (c = this._$AH[l]), n || (n = !De(c) || c !== this._$AH[l]), c === C ? e = C : e !== C && (e += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    n && !a && this.j(e);
  }
  j(e) {
    e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Gs extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === C ? void 0 : e;
  }
}
class Ks extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== C);
  }
}
class Us extends nt {
  constructor(e, i, s, a, o) {
    super(e, i, s, a, o), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Me(this, e, i, 0) ?? C) === X) return;
    const s = this._$AH, a = e === C && s !== C || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== C && (s === C || a);
    a && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class qs {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Me(this, e);
  }
}
const Ws = { I: we }, ht = Ie.litHtmlPolyfillSupport;
ht == null || ht(Te, we), (Ie.litHtmlVersions ?? (Ie.litHtmlVersions = [])).push("3.3.1");
const Ls = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let a = s._$litPart$;
  if (a === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = a = new we(e.insertBefore(je(), o), o, void 0, i ?? {});
  }
  return a._$AI(t), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce = globalThis;
let Y = class extends ke {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ls(i, this.renderRoot, this.renderOptions);
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
    return X;
  }
};
var _s;
Y._$litElement$ = !0, Y.finalized = !0, (_s = Ce.litElementHydrateSupport) == null || _s.call(Ce, { LitElement: Y });
const ut = Ce.litElementPolyfillSupport;
ut == null || ut({ LitElement: Y });
(Ce.litElementVersions ?? (Ce.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oe = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Js = { attribute: !0, type: String, converter: it, reflect: !1, hasChanged: Pt }, Ys = (t = Js, e, i) => {
  const { kind: s, metadata: a } = i;
  let o = globalThis.litPropertyMetadata.get(a);
  if (o === void 0 && globalThis.litPropertyMetadata.set(a, o = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), s === "accessor") {
    const { name: n } = i;
    return { set(r) {
      const l = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(n, l, t);
    }, init(r) {
      return r !== void 0 && this.C(n, void 0, t, r), r;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(r) {
      const l = this[n];
      e.call(this, r), this.requestUpdate(n, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function O(t) {
  return (e, i) => typeof i == "object" ? Ys(t, e, i) : ((s, a, o) => {
    const n = a.hasOwnProperty(o);
    return a.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(a, o) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Z(t) {
  return O({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = { ATTRIBUTE: 1, CHILD: 2 }, Ze = (t) => (...e) => ({ _$litDirective$: t, values: e });
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
const Q = Ze(class extends Ne {
  constructor(t) {
    var e;
    if (super(t), t.type !== It.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(((e) => t[e])).join(" ") + " ";
  }
  update(t, [e]) {
    var s, a;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(((o) => o !== ""))));
      for (const o in e) e[o] && !((s = this.nt) != null && s.has(o)) && this.st.add(o);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const o of this.st) o in e || (i.remove(o), this.st.delete(o));
    for (const o in e) {
      const n = !!e[o];
      n === this.st.has(o) || (a = this.nt) != null && a.has(o) || (n ? (i.add(o), this.st.add(o)) : (i.remove(o), this.st.delete(o)));
    }
    return X;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Xs } = Ws, hi = (t, e) => (t == null ? void 0 : t._$litType$) !== void 0, Qs = (t) => {
  var e;
  return ((e = t == null ? void 0 : t._$litType$) == null ? void 0 : e.h) != null;
}, ui = () => document.createComment(""), _e = (t, e, i) => {
  var o;
  const s = t._$AA.parentNode, a = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const n = s.insertBefore(ui(), a), r = s.insertBefore(ui(), a);
    i = new Xs(n, r, t, t.options);
  } else {
    const n = i._$AB.nextSibling, r = i._$AM, l = r !== t;
    if (l) {
      let c;
      (o = i._$AQ) == null || o.call(i, t), i._$AM = t, i._$AP !== void 0 && (c = t._$AU) !== r._$AU && i._$AP(c);
    }
    if (n !== a || l) {
      let c = i._$AA;
      for (; c !== n; ) {
        const d = c.nextSibling;
        s.insertBefore(c, a), c = d;
      }
    }
  }
  return i;
}, ge = (t, e, i = t) => (t._$AI(e, i), t), ea = {}, bt = (t, e = ea) => t._$AH = e, yt = (t) => t._$AH, pt = (t) => {
  t._$AR(), t._$AA.remove();
}, ta = (t) => {
  t._$AR();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pi = (t) => Qs(t) ? t._$litType$.h : t.strings, mi = Ze(class extends Ne {
  constructor(t) {
    super(t), this.et = /* @__PURE__ */ new WeakMap();
  }
  render(t) {
    return [t];
  }
  update(t, [e]) {
    const i = hi(this.it) ? pi(this.it) : null, s = hi(e) ? pi(e) : null;
    if (i !== null && (s === null || i !== s)) {
      const a = yt(t).pop();
      let o = this.et.get(i);
      if (o === void 0) {
        const n = document.createDocumentFragment();
        o = Ls(C, n), o.setConnected(!1), this.et.set(i, o);
      }
      bt(o, [a]), _e(o, void 0, a);
    }
    if (s !== null) {
      if (i === null || i !== s) {
        const a = this.et.get(s);
        if (a !== void 0) {
          const o = yt(a).pop();
          ta(t), _e(t, void 0, o), bt(t, [o]);
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
const ks = "important", ia = " !" + ks, x = Ze(class extends Ne {
  constructor(t) {
    var e;
    if (super(t), t.type !== It.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
      const a = e[s];
      if (a != null) {
        this.ft.add(s);
        const o = typeof a == "string" && a.endsWith(ia);
        s.includes("-") || o ? i.setProperty(s, o ? a.slice(0, -11) : a, o ? ks : "") : i[s] = a;
      }
    }
    return X;
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fi = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let a = e; a <= i; a++) s.set(t[a], a);
  return s;
}, ie = Ze(class extends Ne {
  constructor(t) {
    if (super(t), t.type !== It.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let s;
    i === void 0 ? i = e : e !== void 0 && (s = e);
    const a = [], o = [];
    let n = 0;
    for (const r of t) a[n] = s ? s(r, n) : n, o[n] = i(r, n), n++;
    return { values: o, keys: a };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, s]) {
    const a = yt(t), { values: o, keys: n } = this.dt(e, i, s);
    if (!Array.isArray(a)) return this.ut = n, o;
    const r = this.ut ?? (this.ut = []), l = [];
    let c, d, h = 0, f = a.length - 1, u = 0, m = o.length - 1;
    for (; h <= f && u <= m; ) if (a[h] === null) h++;
    else if (a[f] === null) f--;
    else if (r[h] === n[u]) l[u] = ge(a[h], o[u]), h++, u++;
    else if (r[f] === n[m]) l[m] = ge(a[f], o[m]), f--, m--;
    else if (r[h] === n[m]) l[m] = ge(a[h], o[m]), _e(t, l[m + 1], a[h]), h++, m--;
    else if (r[f] === n[u]) l[u] = ge(a[f], o[u]), _e(t, a[h], a[f]), f--, u++;
    else if (c === void 0 && (c = fi(n, u, m), d = fi(r, h, f)), c.has(r[h])) if (c.has(r[f])) {
      const p = d.get(n[u]), g = p !== void 0 ? a[p] : null;
      if (g === null) {
        const y = _e(t, a[h]);
        ge(y, o[u]), l[u] = y;
      } else l[u] = ge(g, o[u]), _e(t, a[h], g), a[p] = null;
      u++;
    } else pt(a[f]), f--;
    else pt(a[h]), h++;
    for (; u <= m; ) {
      const p = _e(t, l[m + 1]);
      ge(p, o[u]), l[u++] = p;
    }
    for (; h <= f; ) {
      const p = a[h++];
      p !== null && pt(p);
    }
    return this.ut = n, bt(t, l), X;
  }
});
var gi = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function sa(t, e) {
  return !!(t === e || gi(t) && gi(e));
}
function aa(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!sa(t[i], e[i]))
      return !1;
  return !0;
}
function L(t, e) {
  e === void 0 && (e = aa);
  var i = null;
  function s() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    if (i && i.lastThis === this && e(a, i.lastArgs))
      return i.lastResult;
    var n = t.apply(this, a);
    return i = {
      lastResult: n,
      lastArgs: a,
      lastThis: this
    }, n;
  }
  return s.clear = function() {
    i = null;
  }, s;
}
var _i = "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z", vi = "M12,4A4,4 0 0,1 16,8C16,9.95 14.6,11.58 12.75,11.93L8.07,7.25C8.42,5.4 10.05,4 12,4M12.28,14L18.28,20L20,21.72L18.73,23L15.73,20H4V18C4,16.16 6.5,14.61 9.87,14.14L2.78,7.05L4.05,5.78L12.28,14M20,18V19.18L15.14,14.32C18,14.93 20,16.35 20,18Z", Ci = "M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z", oa = "M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5", na = "M22.1 21.5L2.4 1.7L1.1 3L3.8 5.7C3.3 6.3 3 7.1 3 8V22H18V19.9L20.8 22.7L22.1 21.5M9.6 11.5L12.4 14.3C12.1 14.7 11.6 15 11 15C9.9 15 9 14.1 9 13C9 12.4 9.3 11.9 9.6 11.5M16 17.9V20H5V8C5 7.7 5.1 7.4 5.2 7.1L8.2 10.1C7.5 10.8 7 11.9 7 13C7 15.2 8.8 17 11 17C12.1 17 13.2 16.5 13.9 15.8L16 17.9M17 13.8C17.1 12.5 19 10.5 19 10.5S21 12.7 21 14C21 15 20.2 15.9 19.2 16L17 13.8M9.2 6L7.2 4H14C16.2 4 18 5.8 18 8V9H16V8C16 6.9 15.1 6 14 6H9.2Z", ra = "M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z", la = "M18 14.8L9 5.8C9.9 5.3 10.9 5 12 5C15.3 5 18 7.7 18 11V14.8M20.1 4.8L18.7 3.4L16.6 5.5L18 6.9L20.1 4.8M19.5 10.5V12.5H22.5V10.5H19.5M4.5 10.5H1.5V12.5H4.5V10.5M1.1 3L6.6 8.5C6.2 9.2 6 10.1 6 11V19H17.1L18.1 20H6C4.9 20 4 20.9 4 22H20.1L20.8 22.7L22.1 21.4L2.4 1.7L1.1 3M13 1H11V4H13V1Z", ca = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", da = "M18.75 22.16L16 19.16L17.16 18L18.75 19.59L22.34 16L23.5 17.41L18.75 22.16M11 15H13V17H11V15M11 7H13V13H11V7M12 2C17.5 2 22 6.5 22 12L21.92 13.31C21.31 13.11 20.67 13 19.94 13L20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C12.71 20 13.39 19.91 14.05 19.74C14.13 20.42 14.33 21.06 14.62 21.65C13.78 21.88 12.9 22 12 22C6.47 22 2 17.5 2 12C2 6.5 6.47 2 12 2Z", ha = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z", bi = "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z", yi = "M18 12C18 11 17.74 10.04 17.3 9.2L18.76 7.74C19.54 8.97 20 10.43 20 12C20 13.39 19.64 14.68 19 15.82L17.5 14.32C17.82 13.6 18 12.83 18 12M2.39 1.73L1.11 3L5.5 7.37C4.55 8.68 4 10.27 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13 6 12C6 10.83 6.34 9.74 6.92 8.81L15.19 17.08C14.26 17.66 13.17 18 12 18V15L8 19L12 23V20C13.73 20 15.32 19.45 16.63 18.5L20.84 22.73L22.11 21.46L2.39 1.73M12 6V8.8L12.1 8.9L16 5L12 1V4C10.62 4 9.32 4.36 8.18 5L9.68 6.5C10.4 6.18 11.18 6 12 6Z", Ai = "M5.06 7C4.63 7 4.22 7.14 3.84 7.42C3.46 7.7 3.24 8.06 3.14 8.5L2.11 12.91C1.86 14 2.06 14.92 2.69 15.73C2.81 15.85 2.93 15.97 3.04 16.07C3.63 16.64 4.28 17 5.22 17C6.16 17 6.91 16.59 7.47 16.05C8.1 16.67 8.86 17 9.8 17C10.64 17 11.44 16.63 12 16.07C12.68 16.7 13.45 17 14.3 17C15.17 17 15.91 16.67 16.54 16.05C17.11 16.62 17.86 17 18.81 17C19.76 17 20.43 16.65 21 16.06C21.09 15.97 21.18 15.87 21.28 15.77C21.94 14.95 22.14 14 21.89 12.91L20.86 8.5C20.73 8.06 20.5 7.7 20.13 7.42C19.77 7.14 19.38 7 18.94 7H5.06M18.89 8.97L19.97 13.38C20.06 13.81 19.97 14.2 19.69 14.55C19.44 14.86 19.13 15 18.75 15C18.44 15 18.17 14.9 17.95 14.66C17.73 14.43 17.61 14.16 17.58 13.84L16.97 9L18.89 8.97M5.06 9H7.03L6.42 13.84C6.3 14.63 5.91 15 5.25 15C4.84 15 4.53 14.86 4.31 14.55C4.03 14.2 3.94 13.81 4.03 13.38L5.06 9M9.05 9H11V13.7C11 14.05 10.89 14.35 10.64 14.62C10.39 14.88 10.08 15 9.7 15C9.36 15 9.07 14.88 8.84 14.59C8.61 14.3 8.5 14 8.5 13.66V13.5L9.05 9M13 9H14.95L15.5 13.5C15.58 13.92 15.5 14.27 15.21 14.57C14.95 14.87 14.61 15 14.2 15C13.89 15 13.61 14.88 13.36 14.62C13.11 14.35 13 14.05 13 13.7V9Z", ua = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z", pa = "M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z", ma = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15", fa = "M16.75 21.16L14 18.16L15.16 17L16.75 18.59L20.34 15L21.5 16.41L16.75 21.16M12 18C12 14.69 14.69 12 18 12V5.33C18 4.6 17.4 4 16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H13.54C12.58 20.94 12 19.54 12 18Z", ga = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21", Li = "M20.84,22.73L18.11,20H3V19L5,17V11C5,9.86 5.29,8.73 5.83,7.72L1.11,3L2.39,1.73L22.11,21.46L20.84,22.73M19,15.8V11C19,7.9 16.97,5.17 14,4.29C14,4.19 14,4.1 14,4A2,2 0 0,0 12,2A2,2 0 0,0 10,4C10,4.1 10,4.19 10,4.29C9.39,4.47 8.8,4.74 8.26,5.09L19,15.8M12,23A2,2 0 0,0 14,21H10A2,2 0 0,0 12,23Z", _a = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z", va = "M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z", Ca = "M3 2H21C21.55 2 22 2.45 22 3V5C22 5.55 21.55 6 21 6H20V7C20 7.55 19.55 8 19 8H13V10.17C14.17 10.58 15 11.7 15 13C15 14.66 13.66 16 12 16C10.34 16 9 14.66 9 13C9 11.69 9.84 10.58 11 10.17V8H5C4.45 8 4 7.55 4 7V6H3C2.45 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2M12 12C11.45 12 11 12.45 11 13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13C13 12.45 12.55 12 12 12Z", ki = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z", Ke = "M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z", Hi = "M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M9.31,17L11.75,14.56L14.19,17L15.25,15.94L12.81,13.5L15.25,11.06L14.19,10L11.75,12.44L9.31,10L8.25,11.06L10.69,13.5L8.25,15.94L9.31,17Z", Vi = "M19 19H5V8H19M16 1V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1M10.88 12H7.27L10.19 14.11L9.08 17.56L12 15.43L14.92 17.56L13.8 14.12L16.72 12H13.12L12 8.56L10.88 12Z", ba = "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z", ya = "M1.2,4.47L2.5,3.2L20,20.72L18.73,22L16.73,20H4A2,2 0 0,1 2,18V6C2,5.78 2.04,5.57 2.1,5.37L1.2,4.47M7,4L9,2H15L17,4H20A2,2 0 0,1 22,6V18C22,18.6 21.74,19.13 21.32,19.5L16.33,14.5C16.76,13.77 17,12.91 17,12A5,5 0 0,0 12,7C11.09,7 10.23,7.24 9.5,7.67L5.82,4H7M7,12A5,5 0 0,0 12,17C12.5,17 13.03,16.92 13.5,16.77L11.72,15C10.29,14.85 9.15,13.71 9,12.28L7.23,10.5C7.08,10.97 7,11.5 7,12M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9Z", Aa = "M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z", La = "M20.5,19.85L6.41,5.76L2.41,1.76L1.11,3L4.57,6.46L3,11V19A1,1 0 0,0 4,20H5A1,1 0 0,0 6,19V18H16.11L20.84,22.73L22.11,21.46L20.5,19.85M6.5,15A1.5,1.5 0 0,1 5,13.5A1.5,1.5 0 0,1 6.5,12A1.5,1.5 0 0,1 8,13.5A1.5,1.5 0 0,1 6.5,15M5,10L5.78,7.67L8.11,10H5M17.5,5.5L19,10H13.2L16.12,12.92C16.5,12.17 17.37,11.86 18.12,12.21C18.87,12.57 19.18,13.47 18.83,14.21C18.68,14.5 18.43,14.77 18.12,14.92L21,17.8V11L18.92,5C18.71,4.4 18.14,4 17.5,4H7.2L8.7,5.5H17.5Z", ka = "M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3Z", Ha = "M1.6,1.27L0.25,2.75L1.41,3.8C1.16,4.13 1,4.55 1,5V8H3V5.23L18.2,19H14V21H20.41L22.31,22.72L23.65,21.24M6.5,3L8.7,5H21V16.14L23,17.95V5C23,3.89 22.1,3 21,3M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.08,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18Z", Va = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", $a = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z", Ma = "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", $i = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Sa = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z", wa = "M13.72 21.84C13.16 21.94 12.59 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2 22 6.5 22 12C22 12.59 21.94 13.16 21.84 13.72C21 13.26 20.03 13 19 13C17.74 13 16.57 13.39 15.6 14.06L12.5 12.2V7H11V13L14.43 15.11C13.54 16.16 13 17.5 13 19C13 20.03 13.26 21 13.72 21.84M21.12 15.46L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88L21.12 15.46Z", at = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Mi = "M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z", Si = "M21.4 7.5C22.2 8.3 22.2 9.6 21.4 10.3L18.6 13.1L10.8 5.3L13.6 2.5C14.4 1.7 15.7 1.7 16.4 2.5L18.2 4.3L21.2 1.3L22.6 2.7L19.6 5.7L21.4 7.5M15.6 13.3L14.2 11.9L11.4 14.7L9.3 12.6L12.1 9.8L10.7 8.4L7.9 11.2L6.4 9.8L3.6 12.6C2.8 13.4 2.8 14.7 3.6 15.4L5.4 17.2L1.4 21.2L2.8 22.6L6.8 18.6L8.6 20.4C9.4 21.2 10.7 21.2 11.4 20.4L14.2 17.6L12.8 16.2L15.6 13.3Z", wi = "M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z", xa = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", Ea = "M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z", za = "M23 3H1V1H23V3M2 22H11V4H2V22M22 4H13V22H22V4Z", xi = "M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z", Ei = "M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z", zi = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", mt = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", Pi = "M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z", Oi = "M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z", Pa = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z", Oa = "M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z", Ue = "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z", Qe = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", ft = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z", Ia = "M1 4.27L2.28 3L6 6.72L21 21.72L19.73 23L17.72 21C16.56 20.85 15.65 19.94 15.5 18.78L14 17.27V21H4V7.27L1 4.27M19.77 7.23C20.22 7.68 20.5 8.31 20.5 9L20.5 18.67L19 17.18V11.29C18.69 11.42 18.36 11.5 18 11.5C16.62 11.5 15.5 10.38 15.5 9C15.5 7.93 16.17 7.03 17.11 6.67L15 4.56L16.06 3.5L19.78 7.22L19.77 7.23M11.82 10H12V5H6.82L5.06 3.24C5.34 3.09 5.66 3 6 3H12C13.1 3 14 3.9 14 5V12H15C16.1 12 17 12.9 17 14V15.18L11.82 10M6 10H6.73L6 9.27V10M6 12V19H12V15.27L8.73 12H6M18 10C18.55 10 19 9.55 19 9C19 8.45 18.55 8 18 8C17.45 8 17 8.45 17 9C17 9.55 17.45 10 18 10Z", ja = "M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M12,13.5V19H6V12H12V13.5M12,10H6V5H12V10M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10Z", Da = "M9 6V11H7V7H5V11H3V9H1V21H3V19H5V21H7V19H9V21H11V19H13V21H15V19H17V21H19V19H21V21H23V9H21V11H19V7H17V11H15V6H13V11H11V6H9M3 13H5V17H3V13M7 13H9V17H7V13M11 13H13V17H11V13M15 13H17V17H15V13M19 13H21V17H19V13Z", Ta = "M7 21V7H5V11H3V9H1V21H3V19H5V21H7M3 17V13H5V17H3M21 9V11H19V7H17V21H19V19H21V21H23V9H21M21 17H19V13H21V17Z", Ii = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z", ot = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z", ji = "M15,12C13.89,12 13,12.89 13,14A2,2 0 0,0 15,16A2,2 0 0,0 17,14C17,12.89 16.1,12 15,12M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M14,9C14,7.89 13.1,7 12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9M9,12A2,2 0 0,0 7,14A2,2 0 0,0 9,16A2,2 0 0,0 11,14C11,12.89 10.1,12 9,12Z", Ba = "M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", Ra = "M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z", Za = "M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22", Na = "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z", Di = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", Fa = "M21 17.2L6.8 3H19C20.1 3 21 3.9 21 5V17.2M20.7 22L19.7 21H5C3.9 21 3 20.1 3 19V4.3L2 3.3L3.3 2L22 20.7L20.7 22M16.8 18L12.9 14.1L11 16.5L8.5 13.5L5 18H16.8Z", Ga = "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z", Ka = "M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", Ua = "M12,2C9.76,2 7.78,3.05 6.5,4.68L7.93,6.11C8.84,4.84 10.32,4 12,4A5,5 0 0,1 17,9C17,10.68 16.16,12.16 14.89,13.06L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M7.23,10.5L12.73,16H10V13.58C8.68,13 7.66,11.88 7.23,10.5M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", qa = "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z", Ti = "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z", Bi = "M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z", Ri = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z", Zi = "M16.37,16.1L11.75,11.47L11.64,11.36L3.27,3L2,4.27L5.18,7.45C5.06,7.95 5,8.46 5,9C5,14.25 12,22 12,22C12,22 13.67,20.15 15.37,17.65L18.73,21L20,19.72M12,6.5A2.5,2.5 0 0,1 14.5,9C14.5,9.73 14.17,10.39 13.67,10.85L17.3,14.5C18.28,12.62 19,10.68 19,9A7,7 0 0,0 12,2C10,2 8.24,2.82 6.96,4.14L10.15,7.33C10.61,6.82 11.26,6.5 12,6.5Z", Wa = "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z", Ja = "M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z", Ni = "M8 7C6.9 7 6 7.9 6 9V15C6 16.11 6.9 17 8 17H11V15H8V9H11V7H8M14 7C12.9 7 12 7.9 12 9V15C12 16.11 12.9 17 14 17H16C17.11 17 18 16.11 18 15V9C18 7.9 17.11 7 16 7H14M14 9H16V15H14V9", Ya = "M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z", Xa = "M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z", Qa = "M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18Z", eo = "M22.11 21.46L20.84 22.73L18.11 20H4C2.9 20 2 19.11 2 18V6C2 5.42 2.25 4.9 2.65 4.54L1.11 3L2.39 1.73L22.11 21.46M21.88 18.68C21.96 18.47 22 18.24 22 18V4H18L20 8H17L15 4H13L15 8H12L10 4H8L8.8 5.6L21.88 18.68Z", qe = "M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z", to = "M14,19H18V5H14M6,19H10V5H6V19Z", Hs = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", io = "M8,5.14V19.14L19,12.14L8,5.14Z", so = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13", gt = "M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19Z", Fi = "M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z", Gi = "M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z", ao = "M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z", oo = "M12.5,5A7.5,7.5 0 0,0 5,12.5A7.5,7.5 0 0,0 12.5,20A7.5,7.5 0 0,0 20,12.5A7.5,7.5 0 0,0 12.5,5M7,10H9A1,1 0 0,1 10,11V12C10,12.5 9.62,12.9 9.14,12.97L10.31,15H9.15L8,13V15H7M12,10H14V11H12V12H14V13H12V14H14V15H12A1,1 0 0,1 11,14V11A1,1 0 0,1 12,10M16,10H18V11H16V14H18V15H16A1,1 0 0,1 15,14V11A1,1 0 0,1 16,10M8,11V12H9V11", no = "M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z", ro = "M2,5.27L3.28,4L21,21.72L19.73,23L16,19.27V22A1,1 0 0,1 15,23H9C8.46,23 8,22.55 8,22V11.27L2,5.27M12,0C15.05,0 17.8,1.23 19.77,3.23L18.36,4.64C16.75,3 14.5,2 12,2C9.72,2 7.64,2.85 6.06,4.24L4.64,2.82C6.59,1.07 9.17,0 12,0M12,4C13.94,4 15.69,4.78 16.95,6.05L15.55,7.46C14.64,6.56 13.39,6 12,6C10.83,6 9.76,6.4 8.9,7.08L7.5,5.66C8.7,4.62 10.28,4 12,4M15,9C15.56,9 16,9.45 16,10V14.18L13.5,11.69L13.31,11.5L10.82,9H15M10.03,13.3C10.16,14.16 10.84,14.85 11.71,15L10.03,13.3Z", lo = "M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z", Ki = "M1 14V5H13C18.5 5 23 9.5 23 15V17H20.83C20.42 18.17 19.31 19 18 19C16.69 19 15.58 18.17 15.17 17H10C9.09 18.21 7.64 19 6 19C3.24 19 1 16.76 1 14M6 11C4.34 11 3 12.34 3 14C3 15.66 4.34 17 6 17C7.66 17 9 15.66 9 14C9 12.34 7.66 11 6 11M15 10V12H20.25C19.92 11.27 19.5 10.6 19 10H15Z", co = "M23 15V18C23 18.5 22.64 18.88 22.17 18.97L18.97 15.77C19 15.68 19 15.59 19 15.5C19 14.12 17.88 13 16.5 13C16.41 13 16.32 13 16.23 13.03L10.2 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M22.11 21.46L20.84 22.73L19.89 21.78C19.62 21.92 19.32 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 11.53 4.29 9.36 6.22 8.11L1.11 3L2.39 1.73L22.11 21.46M10 15.5C10 14.12 8.88 13 7.5 13S5 14.12 5 15.5 6.12 18 7.5 18 10 16.88 10 15.5M16.07 17.96L14.04 15.93C14.23 16.97 15.04 17.77 16.07 17.96Z", ho = "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z", uo = "M20.8 22.7L18 19.9C16.3 21.2 14.2 22 12 22C6.5 22 2 17.5 2 12C2 10 2.6 8.1 3.7 6.5L5.2 7.9C4.4 9.2 4 10.6 4 12C4 16.4 7.6 20 12 20C13.7 20 15.3 19.4 16.6 18.5L13.7 15.6C13.2 15.9 12.6 16 12 16C10.9 16 9.9 15.6 9.2 14.8L7.8 16.2C6.6 15.1 6 13.6 6 12C6 10.8 6.3 9.7 6.9 8.8L1.1 3L2.4 1.7L22.1 21.4L20.8 22.7M20 12C20 13.4 19.6 14.7 19 15.8L20.5 17.3C21.5 15.8 22 14 22 12C22 10 21.4 8.1 20.3 6.5L18.8 7.9C19.6 9.2 20 10.6 20 12M12 4C14.1 4 16.2 4.8 17.7 6.3L19.1 4.9C17.2 3.1 14.7 2 12 2C10.1 2 8.3 2.5 6.7 3.5L8.2 5C9.3 4.3 10.7 4 12 4M17.5 14.3C17.8 13.6 18 12.8 18 12C18 8.7 15.3 6 12 6C11.2 6 10.4 6.2 9.7 6.5L11.4 8.2C11.6 8.1 11.8 8 12 8C12.6 8 13 8.4 13 9C13 9.2 12.9 9.4 12.8 9.6L17.5 14.3Z", po = "M20 19V3H4V19H2V21H22V19H20M6 19V13H11V14.8C10.6 15.1 10.2 15.6 10.2 16.2C10.2 17.2 11 18 12 18S13.8 17.2 13.8 16.2C13.8 15.6 13.5 15.1 13 14.8V13H18V19H6Z", mo = "M20 19V3H4V19H2V21H10.25C10.25 21.97 11.03 22.75 12 22.75S13.75 21.97 13.75 21H22V19H20M6 19V17H11V19H6M13 19V17H18V19H13Z", Ui = "M11.62,1L17.28,6.67L15.16,8.79L13.04,6.67L11.62,8.09L13.95,10.41L12.79,11.58L13.24,12.04C14.17,11.61 15.31,11.77 16.07,12.54L12.54,16.07C11.77,15.31 11.61,14.17 12.04,13.24L11.58,12.79L10.41,13.95L8.09,11.62L6.67,13.04L8.79,15.16L6.67,17.28L1,11.62L3.14,9.5L5.26,11.62L6.67,10.21L3.84,7.38C3.06,6.6 3.06,5.33 3.84,4.55L4.55,3.84C5.33,3.06 6.6,3.06 7.38,3.84L10.21,6.67L11.62,5.26L9.5,3.14L11.62,1M18,14A4,4 0 0,1 14,18V16A2,2 0 0,0 16,14H18M22,14A8,8 0 0,1 14,22V20A6,6 0 0,0 20,14H22Z", qi = "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z", fo = "M4,18V21H7V18H17V21H20V15H4V18M19,10H22V13H19V10M2,10H5V13H2V10M17,13H7V5A2,2 0 0,1 9,3H15A2,2 0 0,1 17,5V13Z", go = "M15,5V12H9V5H15M15,3H9A2,2 0 0,0 7,5V14H17V5A2,2 0 0,0 15,3M22,10H19V13H22V10M5,10H2V13H5V10M20,15H4V21H6V17H18V21H20V15Z", _o = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,7H13V13H11V7M11,15H13V17H11V15Z", vo = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9", Wi = "M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z", Co = "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z", bo = "M12 1L3 5V11C3 16.5 6.8 21.7 12 23C17.2 21.7 21 16.5 21 11V5L12 1M16 15.8C16 16.4 15.4 17 14.7 17H9.2C8.6 17 8 16.4 8 15.7V12.2C8 11.6 8.6 11 9.2 11V8.5C9.2 7.1 10.6 6 12 6S14.8 7.1 14.8 8.5V9H13.5V8.5C13.5 7.7 12.8 7.2 12 7.2S10.5 7.7 10.5 8.5V11H14.8C15.4 11 16 11.6 16 12.3V15.8Z", yo = "M8.2 5L6.2 3H19C20.11 3 21 3.9 21 5V17.8L19 15.8V5H8.2M17.5 14.32C17.82 13.6 18 12.83 18 12C18 8.68 15.31 6 12 6C11.17 6 10.4 6.18 9.68 6.5L11.27 8.07C11.5 8.03 11.75 8 12 8C14.21 8 16 9.79 16 12C16 12.25 15.97 12.5 15.93 12.73L17.5 14.32M22.11 21.46L20.84 22.73L19.1 21C19.07 21 19.03 21 19 21H5C3.89 21 3 20.1 3 19V5C3 4.97 3 4.93 3 4.9L1.11 3L2.39 1.73L22.11 21.46M8 12C8 14.21 9.79 16 12 16C12.62 16 13.19 15.85 13.71 15.6L8.4 10.29C8.15 10.81 8 11.39 8 12M17.11 19L15.19 17.08C14.26 17.66 13.17 18 12 18C8.69 18 6 15.31 6 12C6 10.83 6.34 9.74 6.92 8.81L5 6.89V19H17.11Z", Ao = "M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V5H19V19M12 18C15.31 18 18 15.31 18 12C18 8.68 15.31 6 12 6C8.68 6 6 8.68 6 12C6 15.31 8.69 18 12 18M12 8C14.21 8 16 9.79 16 12S14.21 16 12 16 8 14.21 8 12 9.79 8 12 8Z", Lo = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z", ko = "M11 5.12L9.29 3.41L10.71 2L12 3.29L13.29 2L14.71 3.41L13 5.12V7.38L15.45 8.82L17.45 7.69L18.07 5.36L20 5.88L19.54 7.65L21.31 8.12L20.79 10.05L18.46 9.43L16.46 10.56V13.26L14.5 11.3V10.56L12.74 9.54L10.73 7.53L11 7.38V5.12M18.46 14.57L16.87 13.67L19.55 16.35L21.3 15.88L20.79 13.95L18.46 14.57M13 16.62V18.88L14.7 20.59L13.29 22L12 20.71L10.71 22L9.29 20.59L11 18.88V16.62L8.55 15.18L6.55 16.31L5.93 18.64L4 18.12L4.47 16.36L2.7 15.89L3.22 13.96L5.55 14.58L7.55 13.45V10.56L5.55 9.43L3.22 10.05L2.7 8.12L4.47 7.65L4 5.89L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73L14.1 16L13 16.62M12 14.89L12.63 14.5L9.5 11.39V13.44L12 14.89Z", Ji = "M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.58,19.41L2.59,12.42C2.22,12.05 2,11.55 2,11V6C2,4.89 2.89,4 4,4H9C9.55,4 10.05,4.22 10.41,4.58L17.41,11.58M13.54,5.71L14.54,4.71L21.41,11.58C21.78,11.94 22,12.45 22,13C22,13.55 21.78,14.05 21.42,14.41L16.04,19.79L15.04,18.79L20.75,13L13.54,5.71Z", We = "M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z", Ho = "M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", Vo = "M22 12.66C21.07 12.24 20.07 12 19 12C19 10.43 18.5 9 17.6 7.81L15.43 10C15.79 10.57 16 11.26 16 12C16 12.24 16 12.5 15.94 12.7C13.61 13.84 12 16.23 12 19C12 20.07 12.24 21.07 12.66 22C12.44 22 12.22 22 12 22C10.69 22 9.39 21.74 8.17 21.24C6.96 20.74 5.86 20 4.93 19.07C3.05 17.2 2 14.65 2 12C2 9.35 3.05 6.8 4.93 4.93C5.86 4 6.96 3.26 8.17 2.76C9.39 2.26 10.69 2 12 2C17.5 2 22 6.47 22 12C22 12.22 22 12.44 22 12.66M12 5C10.14 5 8.36 5.74 7.05 7.05C5.74 8.36 5 10.14 5 12C5 13.93 5.78 15.68 7.05 16.95L9.17 14.83C8.45 14.1 8 13.1 8 12C8 10.94 8.42 9.92 9.17 9.17C9.92 8.42 10.94 8 12 8C12.74 8 13.43 8.21 14 8.56L16.19 6.4C15 5.5 13.57 5 12 5M23.83 20.64C23.89 20.53 23.87 20.39 23.77 20.32L22.72 19.5C22.74 19.33 22.75 19.16 22.75 19C22.75 18.84 22.74 18.67 22.72 18.5L23.77 17.68C23.87 17.61 23.89 17.5 23.83 17.36L22.83 15.64C22.77 15.53 22.64 15.5 22.53 15.53L21.28 16L21.14 15.91C20.91 15.77 20.7 15.64 20.44 15.54L20.25 14.21C20.23 14.09 20.13 14 20 14H18C17.88 14 17.77 14.09 17.75 14.21L17.57 15.54C17.3 15.64 17.09 15.78 16.86 15.92L16.72 16L15.5 15.53C15.37 15.5 15.23 15.53 15.17 15.64L14.17 17.36C14.11 17.5 14.14 17.61 14.23 17.68L15.29 18.5L15.29 18.53C15.27 18.69 15.25 18.84 15.25 19C15.25 19.16 15.27 19.31 15.29 19.47C15.29 19.5 15.29 19.5 15.29 19.5L14.23 20.32C14.14 20.39 14.11 20.53 14.17 20.64L15.17 22.37C15.23 22.5 15.37 22.5 15.5 22.5L16.72 21.97C17 22.17 17.25 22.34 17.57 22.47L17.75 23.79C17.77 23.91 17.88 24 18 24H20C20.13 24 20.23 23.91 20.25 23.79L20.44 22.47C20.75 22.34 21 22.17 21.28 21.97L22.53 22.5C22.64 22.5 22.77 22.5 22.83 22.37L23.83 20.64M19 17.25C19.97 17.25 20.75 18.03 20.75 19C20.75 19.97 19.96 20.75 19 20.75C18.04 20.75 17.25 19.97 17.25 19C17.25 18.03 18.03 17.25 19 17.25Z", $o = "M3 4L1.75 5.27L4.5 8.03C3.55 9.45 3 11.16 3 13C3 17.97 7.03 22 12 22C13.84 22 15.55 21.45 17 20.5L19.5 23L20.75 21.73L13.04 14L3 4M15 1H9V3H15M21 13C21 14.83 20.45 16.53 19.5 17.94L13 11.45V7H11V9.45L7.05 5.5C8.47 4.55 10.17 4 12 4C14.12 4 16.07 4.74 17.62 5.97L19.04 4.55L20.45 5.97L19.03 7.39C20.26 8.93 21 10.88 21 13Z", Mo = "M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z", _t = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z", vt = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z", So = "M4 22H2V2H4M22 2H20V22H22M17.24 5.34L13.24 9.34A3 3 0 0 0 9.24 13.34L5.24 17.34L6.66 18.76L10.66 14.76A3 3 0 0 0 14.66 10.76L18.66 6.76Z", Yi = "M22 2V22H20V13H14.82A3 3 0 0 1 9.18 13H4V22H2V2H4V11H9.18A3 3 0 0 1 14.82 11H20V2Z", wo = "M4 22H2V2H4M22 2H20V22H22M11 4V9.18A3 3 0 0 0 11 14.82V20H13V14.82A3 3 0 0 0 13 9.18V4Z", xo = "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z", Eo = "M8.2,5L6.55,3.35C6.81,3.12 7.15,3 7.5,3H16.5A1.5,1.5 0 0,1 18,4.5V14.8L16,12.8V5H8.2M0,15H2V9H0V15M21,17V7H19V15.8L20.2,17H21M3,17H5V7H3V17M18,17.35L22.11,21.46L20.84,22.73L18,19.85C17.83,20.54 17.21,21 16.5,21H7.5A1.5,1.5 0 0,1 6,19.5V7.89L1.11,3L2.39,1.73L6.09,5.44L8,7.34L16,15.34L18,17.34V17.35M16,17.89L8,9.89V19H16V17.89M22,9V15H24V9H22Z", zo = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z", Xi = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z", Qi = "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z", Po = "M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z", Oo = "M8 2C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H9V20H6V22H9C10.11 22 11 21.11 11 20V18H13V20C13 21.11 13.89 22 15 22H18V20H15V18H16C17.11 18 18 17.11 18 16V4C18 2.89 17.11 2 16 2H8M12 4.97A2 2 0 0 1 14 6.97A2 2 0 0 1 12 8.97A2 2 0 0 1 10 6.97A2 2 0 0 1 12 4.97M10 14.5H14V16H10V14.5Z", Io = "M20.84 22.73L16.29 18.18C15.2 19.3 13.69 20 12 20C8.69 20 6 17.31 6 14C6 12.67 6.67 11.03 7.55 9.44L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14C18 10 12 3.25 12 3.25S10.84 4.55 9.55 6.35L17.95 14.75C18 14.5 18 14.25 18 14Z", jo = "M5.7 2.5A2 2 0 0 1 7 2H9A2 2 0 0 1 11 4V5H19A2 2 0 0 1 21 7V11A1 1 0 0 1 21 13H17A1 1 0 0 1 17 11V9H12.2M20.84 22.73L22.11 21.46L11 10.34L2.39 1.73L1.11 3L3.65 5.54A2 2 0 0 0 5 9V18H4A2 2 0 0 0 2 20V22H14V20A2 2 0 0 0 12 18H11V12.89Z", es = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", Do = "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z", ts = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", To = "M22.11 21.46L2.39 1.73L1.11 3L4.97 6.86L3.34 7L5.11 10.79C5.25 10 5.5 9.24 5.94 8.5C6 8.36 6.13 8.24 6.22 8.11L7.66 9.55C7.25 10.27 7 11.11 7 12C7 14.76 9.24 17 12 17C12.9 17 13.73 16.75 14.45 16.34L20.84 22.73L22.11 21.46M12 15C10.34 15 9 13.66 9 12C9 11.67 9.07 11.36 9.17 11.06L12.94 14.83C12.64 14.93 12.33 15 12 15M18.05 8.5C17.63 7.78 17.1 7.15 16.5 6.64L20.65 7L18.88 10.79C18.74 10 18.47 9.23 18.05 8.5M12 7C14.76 7 17 9.24 17 12C17 12.54 16.89 13.05 16.74 13.54L15 11.78C14.87 10.3 13.7 9.13 12.22 9L10.47 7.27C10.95 7.11 11.46 7 12 7M12 5C11.16 5 10.35 5.15 9.61 5.42L12 2L14.39 5.42C13.65 5.15 12.84 5 12 5M18.87 13.21L20.64 17L20.24 17.04L18.25 15.05C18.54 14.45 18.76 13.84 18.87 13.21M12 19C12.82 19 13.63 18.83 14.37 18.56L12 22L9.59 18.56C10.33 18.83 11.14 19 12 19M5.95 15.5C6.37 16.24 6.91 16.86 7.5 17.37L3.36 17L5.12 13.23C5.26 14 5.53 14.78 5.95 15.5Z", is = "M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", ss = "M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", Bo = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z", Ro = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9Z";
const jt = ["sensor"], Dt = ["binary_sensor"], Tt = ["cover"], At = ["climate"], Zo = ["camera"], et = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
  "script",
  "scene"
], Lt = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: [
    "garage",
    "door",
    "gate",
    "blind",
    "curtain",
    "damper",
    "awning",
    "shutter",
    "shade",
    "window"
  ]
}, Be = {
  alarm_control_panel: { on: ra, off: la },
  siren: { on: _a, off: Li },
  lock: { on: Bi, off: Ti },
  light: { on: Ga, off: Ka },
  media_player: { on: ka, off: Ha },
  climate: { on: Ho, off: Vo },
  humidifier: { on: oa, off: na },
  switch: {
    on: _t,
    off: vt,
    switch: { on: _t, off: vt },
    outlet: { on: Fi, off: Gi }
  },
  vacuum: { on: ho, off: uo },
  lawn_mower: { on: Ki, off: Ki },
  fan: { on: Pa, off: Oa },
  cover: {
    on: ft,
    off: Qe,
    garage: { on: ft, off: Qe },
    door: { on: Ei, off: xi },
    gate: { on: Ta, off: Da },
    blind: { on: Ca, off: va },
    curtain: { on: Ea, off: za },
    damper: { on: wo, off: Yi },
    awning: { on: Ai, off: Ai },
    shutter: { on: Ro, off: Bo },
    shade: { on: po, off: mo },
    window: { on: ss, off: is }
  },
  binary_sensor: {
    on: gt,
    off: gt,
    motion: { on: Ya, off: Xa },
    moisture: { on: Po, off: Io },
    window: { on: ss, off: is },
    door: { on: Ei, off: xi },
    lock: { on: Bi, off: Ti },
    presence: { on: Za, off: Ra },
    occupancy: { on: fo, off: go },
    vibration: { on: xo, off: Eo },
    opening: { on: bo, off: Co },
    garage_door: { on: ft, off: Qe },
    problem: {
      on: ha,
      off: da
    },
    smoke: {
      on: Ao,
      off: yo
    },
    running: { on: io, off: to },
    plug: { on: Fi, off: Gi },
    power: { on: so, off: gt },
    battery: { on: pa, off: ua },
    battery_charging: { on: ma, off: fa },
    gas: { on: ja, off: Ia },
    carbon_monoxide: { on: Ni, off: Ni },
    cold: { on: Lo, off: ko },
    heat: { on: ts, off: To },
    connectivity: { on: Si, off: Si },
    safety: { on: _o, off: vo },
    sound: { on: Xi, off: Qi },
    update: { on: bi, off: yi },
    tamper: { on: Wi, off: Wi },
    light: { on: qa, off: Ua },
    moving: { on: Aa, off: La }
  },
  person: { on: _i, off: vi },
  device_tracker: { on: _i, off: vi },
  valve: { on: So, off: Yi },
  water_heater: { on: Oo, off: jo },
  remote: { on: no, off: ro },
  update: { on: bi, off: yi },
  air_quality: { on: Ci, off: Ci },
  camera: { on: ba, off: ya },
  calendar: { on: ki, off: Hi },
  scene: { on: Qa, off: eo },
  notifications: { on: ga, off: Li },
  sensor: { on: Ii, off: Ii },
  script: { on: qi, off: qi },
  tags: { on: Ji, off: Ji },
  select: { on: Ue, off: Ue },
  automation: { on: lo, off: co },
  button: { on: ot, off: ot },
  number: { on: qe, off: qe },
  conversation: { on: Mi, off: Mi },
  assist_satellite: {
    on: Ui,
    off: Ui
  },
  counter: { on: wi, off: wi },
  event: { on: Vi, off: Vi },
  group: {
    on: ji,
    off: ji
  },
  image: { on: Na, off: Fa },
  image_processing: {
    on: Di,
    off: Di
  },
  input_boolean: { on: _t, off: vt },
  input_datetime: { on: Ke, off: Ke },
  input_number: { on: qe, off: qe },
  input_select: {
    on: Ue,
    off: Ue
  },
  input_text: { on: We, off: We },
  stt: { on: oo, off: ao },
  sun: { on: ts, off: es },
  text: { on: We, off: We },
  date: { on: ki, off: Hi },
  datetime: { on: Ke, off: Ke },
  time: { on: Sa, off: wa },
  timer: { on: Mo, off: $o },
  todo: {
    on: $a,
    off: Ma
  },
  tts: { on: Xi, off: Qi },
  wake_word: { on: Wa, off: Ja },
  weather: { on: Do, off: es },
  zone: { on: Ri, off: Zi },
  geo_location: { on: Ri, off: Zi }
}, No = L(
  (t, e) => Tt.flatMap((i) => i in t ? e[i].map((s) => ({
    domain: i,
    deviceClass: s
  })) : [])
), Fo = L(
  (t, e) => Dt.flatMap((i) => i in t ? e[i].map((s) => ({
    domain: i,
    deviceClass: s
  })) : [])
), Go = L(
  (t, e) => jt.flatMap((i) => i in t ? e[i].map(
    (s, a) => ({
      domain: i,
      deviceClass: s,
      index: a
    })
  ) : [])
), Ko = L(
  (t, e) => (t || []).filter(
    (i) => i in e
  )
), Vs = (t, e) => {
  if (!t) return {};
  if (typeof t == "object")
    return Object.entries(t).reduce(
      (o, [n, r]) => {
        const l = n.startsWith("--") ? n : n.replace(/-([a-z])/g, (c, d) => d.toUpperCase());
        return o[l] = String(r), o;
      },
      {}
    );
  const i = t.trim();
  if (e && e.has(i)) return e.get(i);
  const a = t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n/g, " ").split(";").map((o) => o.trim()).filter((o) => o && o.includes(":")).reduce(
    (o, n) => {
      const r = n.split(":"), l = r[0], c = r.slice(1).join(":");
      if (l && c !== void 0) {
        const d = l.trim(), h = d.startsWith("--") ? d : d.replace(/-([a-z])/g, (f, u) => u.toUpperCase());
        o[h] = c.trim();
      }
      return o;
    },
    {}
  );
  return e && e.set(i, a), a;
}, $s = (t, e, i) => e && e._parsedCss ? e._parsedCss : t ? Vs(t, i) : {}, Uo = L(
  (t, e, i, s, a) => {
    const o = {
      ...t && e === 1 ? { "--mdc-icon-size": "20px" } : {},
      ...s ? { color: `var(--${s}-color)` } : {}
    };
    if (!i) return o;
    const n = $s(i, void 0, a);
    return { ...o, ...n };
  }
), qo = Se`
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
    pointer-events: auto;
  }
  .icon-with-count > * {
    pointer-events: none;
  }
  .entity-picture {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
  .positioned-button-group {
    position: absolute;
    z-index: 2;
    display: flex;
    gap: 4px;
  }
  .positioned-button-group.top-left {
    top: 8px;
    left: 8px;
  }
  .positioned-button-group.top-right {
    top: 8px;
    right: 8px;
  }
  .positioned-button-group.bottom-left {
    bottom: 8px;
    left: 8px;
  }
  .positioned-button-group.bottom-right {
    bottom: 8px;
    right: 8px;
  }
  .positioned-button {
    z-index: 2;
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
  .mirrored .v2 .alerts {
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
    .icon-container ha-icon,
    .icon-container ha-state-icon {
      --mdc-icon-size: calc(var(--row-size, 3) * 20px);
    }
    .icon-container.v2 ha-icon,
    .icon-container.v2 ha-state-icon {
      --mdc-icon-size: calc(var(--row-size, 3) * 15px);
      border-radius: 50%;
      display: flex;
      padding: 16px;
      color: var(--card-background-color);
    }
  }

  ha-svg-icon, ha-state-icon {
    display: var(--ha-icon-display, inline-flex);
    vertical-align: middle;
    fill: var(--icon-primary-color, currentcolor);
    width: var(--mdc-icon-size, 24px);
    height: var(--mdc-icon-size, 24px);
    justify-content: center;
    align-items: center;
    position: relative;
  }

  @media (max-width: 768px) {
    .name {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-6px);
    }
    60% {
      transform: translateY(-3px);
    }
  }
`, ee = [
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
], Wo = "unavailable", Jo = "unknown", te = [Wo, Jo], Yo = (t, e, i, s, a) => {
  var h, f, u, m, p;
  const o = i || void 0, n = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let r = o || "", l = {};
  if (o === "default" && ((h = t.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (o && o !== "default" && ((f = e == null ? void 0 : e.themes) != null && f[o])) {
    const { modes: g, ...y } = e.themes[o] || {};
    l = { ...l, ...y }, g && (n && g.dark ? l = { ...l, ...g.dark } : !n && g.light && (l = { ...l, ...g.light }));
  } else if (!o && (!((u = t.__themes) != null && u.keys) || t.__themes.keys.size === 0))
    return;
  const c = ((m = t.__themes) == null ? void 0 : m.keys) || /* @__PURE__ */ new Set(), d = new Set(Object.keys(l));
  if (o === "default" && d.size === 0) {
    for (const g of c)
      try {
        t.style.removeProperty(`--${g}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((p = t.__themes) == null ? void 0 : p.cacheKey) === r) {
    let g = !0;
    if (c.size !== d.size)
      g = !1;
    else
      for (const y of c)
        if (!d.has(y)) {
          g = !1;
          break;
        }
    if (g) return;
  }
  for (const g of c)
    if (!d.has(g))
      try {
        t.style.removeProperty(`--${g}`);
      } catch {
      }
  for (const [g, y] of Object.entries(l))
    t.style.setProperty(`--${g}`, String(y));
  t.__themes.cacheKey = r || null, t.__themes.keys = d;
}, T = (t, e, i, s) => {
  s = s || {}, i = i ?? {};
  const a = new Event(e, {
    bubbles: s.bubbles === void 0 ? !0 : s.bubbles,
    cancelable: !!s.cancelable,
    composed: s.composed === void 0 ? !0 : s.composed
  });
  return a.detail = i, t.dispatchEvent(a), a;
}, j = (t) => t.substr(0, t.indexOf(".")), Xo = (t) => (e, i) => t.includes(e, i), Bt = "unavailable", Qo = "unknown", en = "off", tn = [Bt, Qo], sn = Xo(tn), an = (t) => {
  const e = t.attributes.entity_id || [], i = [
    ...new Set(e.map((s) => j(s)))
  ];
  return i.length === 1 ? i[0] : void 0;
};
function on(t) {
  return Array.isArray(t) ? t.reverse().reduce((e, i) => `var(${i}${e ? `, ${e}` : ""})`, void 0) : `var(${t})`;
}
const nn = (t, e = "_") => {
  const i = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·", s = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${e}`, a = new RegExp(i.split("").join("|"), "g"), o = {
    ж: "zh",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ю: "iu",
    я: "ia"
  };
  let n;
  return t === "" ? n = "" : (n = t.toString().toLowerCase().replace(a, (r) => s.charAt(i.indexOf(r))).replace(/[а-я]/g, (r) => o[r] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, e).replace(new RegExp(`(${e})\\1+`, "g"), "$1").replace(new RegExp(`^${e}+`), "").replace(new RegExp(`${e}+$`), ""), n === "" && (n = "unknown")), n;
}, rn = (t) => {
  const e = Number(t);
  if (!isNaN(e))
    return e >= 70 ? "--state-sensor-battery-high-color" : e >= 30 ? "--state-sensor-battery-medium-color" : "--state-sensor-battery-low-color";
};
function ln(t, e) {
  const i = j(t.entity_id), s = t == null ? void 0 : t.state;
  if (["button", "event", "input_button", "scene"].includes(i))
    return s !== Bt;
  if (sn(s) || s === en && i !== "alert")
    return !1;
  switch (i) {
    case "alarm_control_panel":
      return s !== "disarmed";
    case "alert":
      return s !== "idle";
    case "cover":
      return s !== "closed";
    case "device_tracker":
    case "person":
      return s !== "not_home";
    case "lawn_mower":
      return ["mowing", "error"].includes(s);
    case "lock":
      return s !== "locked";
    case "media_player":
      return s !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(s);
    case "valve":
      return s !== "closed";
    case "plant":
      return s === "problem";
    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(s);
    case "timer":
      return s === "active";
    case "camera":
      return s === "streaming";
  }
  return !0;
}
const as = /* @__PURE__ */ new Set([
  "alarm_control_panel",
  "alert",
  "automation",
  "binary_sensor",
  "calendar",
  "camera",
  "climate",
  "cover",
  "device_tracker",
  "fan",
  "group",
  "humidifier",
  "input_boolean",
  "lawn_mower",
  "light",
  "lock",
  "media_player",
  "person",
  "plant",
  "remote",
  "schedule",
  "script",
  "siren",
  "sun",
  "switch",
  "timer",
  "update",
  "vacuum",
  "valve",
  "water_heater",
  "weather"
]), cn = (t, e, i, s) => {
  const a = [], o = nn(i, "_"), n = s ? "active" : "inactive";
  return e && a.push(`--state-${t}-${e}-${o}-color`), a.push(
    `--state-${t}-${o}-color`,
    `--state-${t}-${n}-color`,
    `--state-${n}-color`
  ), a;
}, os = (t, e, i) => {
  const s = e.state, a = ln(e);
  return cn(
    t,
    e.attributes.device_class,
    s,
    a
  );
}, dn = (t, e) => {
  const i = t == null ? void 0 : t.state, s = j(t.entity_id), a = t.attributes.device_class;
  if (s === "sensor" && a === "battery") {
    const o = rn(i);
    if (o)
      return [o];
  }
  if (s === "group") {
    const o = an(t);
    if (o && as.has(o))
      return os(o, t);
  }
  if (as.has(s))
    return os(s, t);
}, hn = (t, e) => {
  if ((t == null ? void 0 : t.state) === Bt)
    return "var(--state-unavailable-color)";
  const s = dn(t);
  if (s)
    return on(s);
}, un = (t) => {
  const e = j(t.entity_id), i = t.state;
  if (e === "light" && i === "on") {
    const s = t.attributes.rgb_color;
    if (s)
      return `rgb(${s.join(",")})`;
  }
  return hn(t);
};
var He = /* @__PURE__ */ ((t) => (t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none", t))(He || {});
const pn = (t, e = 2) => Math.round(t * 10 ** e) / 10 ** e, mn = (t) => fn(t.attributes), fn = (t) => !!t.unit_of_measurement || !!t.state_class, gn = (t) => {
  switch (t.number_format) {
    case He.comma_decimal:
      return ["en-US", "en"];
    // Use United States with fallback to English formatting 1,234,567.89
    case He.decimal_comma:
      return ["de", "es", "it"];
    // Use German with fallback to Spanish then Italian formatting 1.234.567,89
    case He.space_comma:
      return ["fr", "sv", "cs"];
    // Use French with fallback to Swedish and Czech formatting 1 234 567,89
    case He.system:
      return;
    default:
      return t.language;
  }
}, ns = (t, e, i) => {
  const s = e ? gn(e) : void 0;
  if (Number.isNaN = Number.isNaN || function a(o) {
    return typeof o == "number" && a(o);
  }, (e == null ? void 0 : e.number_format) !== He.none && !Number.isNaN(Number(t)) && Intl)
    try {
      return new Intl.NumberFormat(
        s,
        rs(t, i)
      ).format(Number(t));
    } catch (a) {
      return console.error(a), new Intl.NumberFormat(
        void 0,
        rs(t, i)
      ).format(Number(t));
    }
  return typeof t == "string" ? t : `${pn(t, i == null ? void 0 : i.maximumFractionDigits).toString()}${(i == null ? void 0 : i.style) === "currency" ? ` ${i.currency}` : ""}`;
}, _n = (t, e) => {
  var s;
  const i = e == null ? void 0 : e.display_precision;
  if (i != null)
    return {
      maximumFractionDigits: i,
      minimumFractionDigits: i
    };
  if (Number.isInteger(Number((s = t.attributes) == null ? void 0 : s.step)) && Number.isInteger(Number(t.state)))
    return { maximumFractionDigits: 0 };
  if (t.attributes.step != null)
    return {
      maximumFractionDigits: Math.ceil(
        Math.log10(1 / t.attributes.step)
      )
    };
}, rs = (t, e) => {
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
L(
  (t) => new Intl.Collator(t)
);
const vn = L(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), Cn = (t, e) => t < e ? -1 : t > e ? 1 : 0, bn = (t, e, i = void 0) => Intl != null && Intl.Collator ? vn(i).compare(t, e) : Cn(t.toLowerCase(), e.toLowerCase()), yn = (t) => {
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
}, ls = (t, e) => t === "°" ? "" : e && t === "%" ? yn(e) : " ";
let Je;
const An = async (t) => Je || (Je = t.callWS({
  type: "sensor/numeric_device_classes"
}), Je), tt = (t, e) => {
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
        if (!tt(t[i], e[i]))
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
        if (!tt(i[1], e.get(i[0])))
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
    const a = Object.keys(t);
    if (s = a.length, s !== Object.keys(e).length)
      return !1;
    for (i = s; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, a[i]))
        return !1;
    for (i = s; i-- !== 0; ) {
      const o = a[i];
      if (!tt(t[o], e[o]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
};
class Ln extends HTMLElement {
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
    e.actionHandler && tt(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
      "keydown",
      e.actionHandler.handleKeyDown
    )), e.actionHandler = { options: i }, !i.disabled && (e.actionHandler.start = (s) => {
      this.cancelled = !1, s.touches ? (s.touches[0].clientX, s.touches[0].clientY) : (s.clientX, s.clientY), i.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, e.actionHandler.end = (s) => {
      if (s.currentTarget !== s.target || s.type === "touchcancel" || s.type === "touchend" && this.cancelled)
        return;
      const a = s.target;
      s.cancelable && s.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? T(a, "action", { action: "hold" }) : i.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, T(a, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, T(a, "action", { action: "double_tap" })) : T(a, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-area-card", Ln);
const kn = () => {
  const t = document.body;
  if (t.querySelector("action-handler-area-card"))
    return t.querySelector("action-handler-area-card");
  const e = document.createElement("action-handler-area-card");
  return t.appendChild(e), e;
}, Hn = (t, e) => {
  const i = kn();
  i && i.bind(t, e);
}, Vn = Ze(
  class extends Ne {
    update(t, [e]) {
      return Hn(t.element, e), X;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(t) {
    }
  }
), kt = async (t, e, i, s) => {
  T(t, "hass-action", { config: i, action: s });
};
function cs(t) {
  return t !== void 0 && t.action !== "none";
}
const Ct = (t, e) => {
  const i = `domain|${e}`;
  return t._actionHandlerCache.has(i) || t._actionHandlerCache.set(
    i,
    Fe(t, "domain", e)
  ), t._actionHandlerCache.get(i);
}, $n = (t, e, i) => {
  const s = `alert|${e}|${i}`;
  return t._actionHandlerCache.has(s) || t._actionHandlerCache.set(
    s,
    Fe(t, "alert", e, i)
  ), t._actionHandlerCache.get(s);
}, Mn = (t, e, i) => {
  const s = `cover|${e}|${i}`;
  return t._actionHandlerCache.has(s) || t._actionHandlerCache.set(
    s,
    Fe(t, "cover", e, i)
  ), t._actionHandlerCache.get(s);
}, ds = (t, e, i) => {
  const s = `sensor|${e}|${i}`;
  return t._actionHandlerCache.has(s) || t._actionHandlerCache.set(
    s,
    Fe(t, "sensor", e, i)
  ), t._actionHandlerCache.get(s);
}, Fe = (t, e, i, s, a) => (o) => {
  var d, h;
  o.stopPropagation();
  let n;
  e === "domain" ? n = t._customizationDomainMap.get(i) : e === "alert" ? n = t._customizationAlertMap.get(s || "") : e === "cover" ? n = t._customizationCoverMap.get(s || "") : e === "sensor" ? n = t._customizationSensorMap.get(s || "") : e === "custom_button" && (n = a);
  const r = o.detail.action === "tap" ? n == null ? void 0 : n.tap_action : o.detail.action === "hold" ? n == null ? void 0 : n.hold_action : o.detail.action === "double_tap" ? n == null ? void 0 : n.double_tap_action : null;
  if (e === "domain") {
    const f = r === "toggle" || (r == null ? void 0 : r.action) === "toggle", u = r === "more-info" || (r == null ? void 0 : r.action) === "more-info";
    if (f) {
      i === "media_player" ? t.hass.callService(
        i,
        t._isOn(i) ? "media_pause" : "media_play",
        void 0,
        { area_id: t._config.area }
      ) : i === "lock" ? t.hass.callService(
        i,
        t._isOn(i) ? "lock" : "unlock",
        void 0,
        { area_id: t._config.area }
      ) : i === "vacuum" ? t.hass.callService(
        i,
        t._isOn(i) ? "stop" : "start",
        void 0,
        { area_id: t._config.area }
      ) : t.hass.callService(
        i,
        t._isOn(i) ? "turn_off" : "turn_on",
        void 0,
        { area_id: t._config.area }
      );
      return;
    } else if (u || r === void 0) {
      if (i !== "binary_sensor" && i !== "sensor")
        if (i === "climate") {
          const p = (h = (d = t._config) == null ? void 0 : d.customization_domain) == null ? void 0 : h.find(
            (y) => y.type === "climate"
          ), g = p == null ? void 0 : p.display_mode;
          (g === "icon" || g === "text_icon") && t._showPopupForDomain(i);
        } else
          t._showPopupForDomain(i);
      return;
    }
    const m = {
      tap_action: n == null ? void 0 : n.tap_action,
      hold_action: n == null ? void 0 : n.hold_action,
      double_tap_action: n == null ? void 0 : n.double_tap_action
    };
    kt(t, t.hass, m, o.detail.action);
    return;
  }
  const l = r === "more-info" || (r == null ? void 0 : r.action) === "more-info";
  if (e === "alert") {
    if (l || r === void 0) {
      i === "binary_sensor" && t._showPopupForDomain(i, s);
      return;
    }
  } else if (e === "cover") {
    if (l || r === void 0) {
      i === "cover" && t._showPopupForDomain(i, s);
      return;
    }
  } else if (e === "sensor") {
    if (l) {
      i === "sensor" && t._showPopupForDomain(i, s);
      return;
    }
    if (o.detail.action === "tap" && !(n != null && n.tap_action))
      return;
  }
  const c = {
    entity: n == null ? void 0 : n.entity,
    tap_action: n == null ? void 0 : n.tap_action,
    hold_action: n == null ? void 0 : n.hold_action,
    double_tap_action: n == null ? void 0 : n.double_tap_action
  };
  if (e === "custom_button" && (a != null && a.entity) && l) {
    const f = a.entity, u = new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: f }
    });
    t.dispatchEvent(u);
    return;
  }
  kt(t, t.hass, c, o.detail.action);
}, J = (t, e) => Vn({
  hasHold: cs(
    (t == null ? void 0 : t.hold_action) || (e == null ? void 0 : e.hold_action)
  ),
  hasDoubleClick: cs(
    (t == null ? void 0 : t.double_tap_action) || (e == null ? void 0 : e.double_tap_action)
  )
}), Sn = {
  area_name: {
    en: "Area Name",
    ar: "اسم المنطقة",
    bg: "Име на областта",
    bn: "এলাকার নাম",
    bs: "Naziv oblasti",
    cs: "Název oblasti",
    da: "Områdenavn",
    de: "Bereichsname",
    el: "Όνομα περιοχής",
    "en-GB": "Area Name",
    es: "Nombre del área",
    "es-419": "Nombre del área",
    et: "Ala nimi",
    eu: "Eremuaren izena",
    fa: "نام منطقه",
    fi: "Alueen nimi",
    fr: "Nom de la zone",
    "fr-CA": "Nom de la zone",
    gl: "Nome da área",
    he: "שם האזור",
    hi: "क्षेत्र का नाम",
    hu: "Terület neve",
    hy: "Տարածքի անուն",
    id: "Nama Area",
    it: "Nome dell'area",
    ja: "エリア名",
    ka: "ზონის სახელი",
    ko: "영역 이름",
    lt: "Zonos pavadinimas",
    lv: "Zonas nosaukums",
    mk: "Име на областа",
    nl: "Gebiedsnaam",
    nn: "Områdenamn",
    no: "Områdenavn",
    pl: "Nazwa obszaru",
    pt: "Nome da área",
    "pt-BR": "Nome da área",
    ro: "Numele zonei",
    ru: "Название области",
    sk: "Názov oblasti",
    sl: "Ime območja",
    sr: "Назив области",
    sv: "Områdesnamn",
    th: "ชื่อพื้นที่",
    tr: "Alan Adı",
    uk: "Назва зони",
    ur: "خطے کا نام",
    vi: "Tên khu vực",
    "zh-Hans": "区域名称",
    "zh-Hant": "區域名稱"
  },
  area_icon: {
    en: "Area Icon",
    ar: "أيقونة المنطقة",
    bg: "Икона на областта",
    bn: "এলাকার আইকন",
    bs: "Ikona oblasti",
    cs: "Ikona oblasti",
    da: "Områdeikon",
    de: "Bereichssymbol",
    el: "Εικονίδιο περιοχής",
    "en-GB": "Area Icon",
    es: "Icono del área",
    "es-419": "Icono del área",
    et: "Ala ikoon",
    eu: "Eremuaren ikonoa",
    fa: "آیکون منطقه",
    fi: "Alueen kuvake",
    fr: "Icône de la zone",
    "fr-CA": "Icône de la zone",
    gl: "Icona da área",
    he: "סמל האזור",
    hi: "क्षेत्र का आइकन",
    hu: "Terület ikonja",
    hy: "Տարածքի պատկեր",
    id: "Ikon Area",
    it: "Icona dell'area",
    ja: "エリアアイコン",
    ka: "ზონის ხატულა",
    ko: "영역 아이콘",
    lt: "Zonos piktograma",
    lv: "Zonas ikona",
    mk: "Икона на областа",
    nl: "Gebiedspictogram",
    nn: "Områdeikon",
    no: "Områdeikon",
    pl: "Ikona obszaru",
    pt: "Ícone da área",
    "pt-BR": "Ícone da área",
    ro: "Pictograma zonei",
    ru: "Иконка области",
    sk: "Ikona oblasti",
    sl: "Ikona območja",
    sr: "Икона области",
    sv: "Områdesikon",
    th: "ไอคอนพื้นที่",
    tr: "Alan Simgesi",
    uk: "Іконка зони",
    ur: "خطے کا آئیکون",
    vi: "Biểu tượng khu vực",
    "zh-Hans": "区域图标",
    "zh-Hant": "區域圖示"
  },
  area_name_color: {
    en: "Area Name Color",
    ar: "لون اسم المنطقة",
    bg: "Цвят на името на областта",
    bn: "এলাকার নামের রঙ",
    bs: "Boja naziva oblasti",
    cs: "Barva názvu oblasti",
    da: "Områdenavnefarve",
    de: "Bereichsname-Farbe",
    el: "Χρώμα ονόματος περιοχής",
    "en-GB": "Area Name Color",
    es: "Color del nombre del área",
    "es-419": "Color del nombre del área",
    et: "Ala nime värv",
    eu: "Eremuaren izenaren kolorea",
    fa: "رنگ نام منطقه",
    fi: "Alueen nimen väri",
    fr: "Couleur du nom de la zone",
    "fr-CA": "Couleur du nom de la zone",
    gl: "Cor do nome da área",
    he: "צבע שם האזור",
    hi: "क्षेत्र के नाम का रंग",
    hu: "Terület nevének színe",
    hy: "Տարածքի անվան գույն",
    id: "Warna Nama Area",
    it: "Colore del nome dell'area",
    ja: "エリア名の色",
    ka: "ზონის სახელის ფერი",
    ko: "영역 이름 색상",
    lt: "Zonos pavadinimo spalva",
    lv: "Zonas nosaukuma krāsa",
    mk: "Боја на името на областа",
    nl: "Gebiedsnaamkleur",
    nn: "Områdenamnfarge",
    no: "Områdenavnfarge",
    pl: "Kolor nazwy obszaru",
    pt: "Cor do nome da área",
    "pt-BR": "Cor do nome da área",
    ro: "Culoarea numelui zonei",
    ru: "Цвет названия области",
    sk: "Farba názvu oblasti",
    sl: "Barva imena območja",
    sr: "Боја назива области",
    sv: "Områdesnamnsfärg",
    th: "สีชื่อพื้นที่",
    tr: "Alan Adı Rengi",
    uk: "Колір назви зони",
    ur: "خطے کے نام کا رنگ",
    vi: "Màu tên khu vực",
    "zh-Hans": "区域名称颜色",
    "zh-Hant": "區域名稱顏色"
  },
  area_icon_color: {
    en: "Area Icon Color",
    ar: "لون أيقونة المنطقة",
    bg: "Цвят на иконата на областта",
    bn: "এলাকার আইকনের রঙ",
    bs: "Boja ikone oblasti",
    cs: "Barva ikony oblasti",
    da: "Områdeikonfarve",
    de: "Bereichssymbol-Farbe",
    el: "Χρώμα εικονιδίου περιοχής",
    "en-GB": "Area Icon Color",
    es: "Color del icono del área",
    "es-419": "Color del icono del área",
    et: "Ala ikooni värv",
    eu: "Eremuaren ikonoaren kolorea",
    fa: "رنگ آیکون منطقه",
    fi: "Alueen kuvakkeen väri",
    fr: "Couleur de l'icône de la zone",
    "fr-CA": "Couleur de l'icône de la zone",
    gl: "Cor da icona da área",
    he: "צבע סמל האזור",
    hi: "क्षेत्र के आइकन का रंग",
    hu: "Terület ikonjának színe",
    hy: "Տարածքի պատկերի գույն",
    id: "Warna Ikon Area",
    it: "Colore dell'icona dell'area",
    ja: "エリアアイコンの色",
    ka: "ზონის ხატულის ფერი",
    ko: "영역 아이콘 색상",
    lt: "Zonos piktogramos spalva",
    lv: "Zonas ikonas krāsa",
    mk: "Боја на иконата на областа",
    nl: "Gebiedspictogramkleur",
    nn: "Områdeikonfarge",
    no: "Områdeikonfarge",
    pl: "Kolor ikony obszaru",
    pt: "Cor do ícone da área",
    "pt-BR": "Cor do ícone da área",
    ro: "Culoarea pictogramei zonei",
    ru: "Цвет иконки области",
    sk: "Farba ikony oblasti",
    sl: "Barva ikone območja",
    sr: "Боја иконе области",
    sv: "Områdesikonfärg",
    th: "สีไอคอนพื้นที่",
    tr: "Alan Simgesi Rengi",
    uk: "Колір іконки зони",
    ur: "خطے کے آئیکون کا رنگ",
    vi: "Màu biểu tượng khu vực",
    "zh-Hans": "区域图标颜色",
    "zh-Hant": "區域圖示顏色"
  },
  hide_unavailable: {
    en: "Hide Unavailable",
    ar: "إخفاء غير المتاح",
    bg: "Скрий недостъпните",
    bn: "অনুপলব্ধ লুকান",
    bs: "Sakrij nedostupne",
    cs: "Skrýt nedostupné",
    da: "Skjul utilgængelige",
    de: "Nicht verfügbare ausblenden",
    el: "Απόκρυψη μη διαθέσιμων",
    "en-GB": "Hide Unavailable",
    es: "Ocultar no disponibles",
    "es-419": "Ocultar no disponibles",
    et: "Peida kättesaamatud",
    eu: "Ezkutatu erabilgarri ez daudenak",
    fa: "مخفی کردن غیرقابل دسترس",
    fi: "Piilota ei käytettävissäolevat",
    fr: "Masquer les indisponibles",
    "fr-CA": "Masquer les indisponibles",
    gl: "Agochar os non dispoñibles",
    he: "הסתר לא זמינים",
    hi: "अनुपलब्ध छुपाएं",
    hu: "Nem elérhetők elrejtése",
    hy: "Թաքցնել անհասանելիները",
    id: "Sembunyikan Yang Tidak Tersedia",
    it: "Nascondi non disponibili",
    ja: "利用不可を非表示",
    ka: "მიუწვდომელის დამალვა",
    ko: "사용 불가 숨기기",
    lt: "Slėpti nepasiekiamus",
    lv: "Paslēpt nepieejamos",
    mk: "Скриј ги недостапните",
    nl: "Niet-beschikbare verbergen",
    nn: "Gøym utilgjengelege",
    no: "Skjul utilgjengelige",
    pl: "Ukryj niedostępne",
    pt: "Ocultar indisponíveis",
    "pt-BR": "Ocultar indisponíveis",
    ro: "Ascunde indisponibilele",
    ru: "Скрыть недоступные",
    sk: "Skryť nedostupné",
    sl: "Skrij nedostopne",
    sr: "Сакриј недоступне",
    sv: "Dölj otillgängliga",
    th: "ซ่อนที่ไม่พร้อมใช้งาน",
    tr: "Kullanılamayanları Gizle",
    uk: "Приховати недоступні",
    ur: "غیر دستیاب چھپائیں",
    vi: "Ẩn các mục không khả dụng",
    "zh-Hans": "隐藏不可用的",
    "zh-Hant": "隱藏不可用的"
  },
  show_active: {
    en: "Hide Inactive Entities",
    ar: "إخفاء الكيانات غير النشطة",
    bg: "Скрий неактивните обекти",
    bn: "নিষ্ক্রিয় এন্টিটি লুকান",
    bs: "Sakrij neaktivne entitete",
    cs: "Skrýt neaktivní entity",
    da: "Skjul inaktive enheder",
    de: "Inaktive Entitäten ausblenden",
    el: "Απόκρυψη ανενεργών οντοτήτων",
    "en-GB": "Hide Inactive Entities",
    es: "Ocultar entidades inactivas",
    "es-419": "Ocultar entidades inactivas",
    et: "Peida mittetoimivad objektid",
    eu: "Ezkutatu aktibo ez dauden entitateak",
    fa: "مخفی کردن موجودیت‌های غیرفعال",
    fi: "Piilota ei-aktiiviset käsitteet",
    fr: "Masquer les entités inactives",
    "fr-CA": "Masquer les entités inactives",
    gl: "Agochar entidades inactivas",
    he: "הסתר ישויות לא פעילות",
    hi: "निष्क्रिय एंटिटी छुपाएं",
    hu: "Inaktív entitások elrejtése",
    hy: "Թաքցնել ոչ ակտիվ օբյեկտները",
    id: "Sembunyikan Entitas Tidak Aktif",
    it: "Nascondi entità inattive",
    ja: "非アクティブなエンティティを非表示",
    ka: "არააქტიური ობიექტების დამალვა",
    ko: "비활성 엔티티 숨기기",
    lt: "Slėpti neaktyvias entitetas",
    lv: "Paslēpt neaktīvās vienības",
    mk: "Скриј ги неактивните ентитети",
    nl: "Inactieve entiteiten verbergen",
    nn: "Gøym inaktive entitetar",
    no: "Skjul inaktive enheter",
    pl: "Ukryj nieaktywne encje",
    pt: "Ocultar entidades inativas",
    "pt-BR": "Ocultar entidades inativas",
    ro: "Ascunde entitățile inactive",
    ru: "Скрыть неактивные объекты",
    sk: "Skryť neaktívne entity",
    sl: "Skrij neaktivne entitete",
    sr: "Сакриј неактивне ентитете",
    sv: "Dölj inaktiva enheter",
    th: "ซ่อนเอนทิตีที่ไม่ทำงาน",
    tr: "Pasif Varlıkları Gizle",
    uk: "Приховати неактивні об'єкти",
    ur: "غیر فعال انتیٹیز چھپائیں",
    vi: "Ẩn các thực thể không hoạt động",
    "zh-Hans": "隐藏非活动实体",
    "zh-Hant": "隱藏非活動實體"
  },
  extra_entities: {
    en: "Add Entities",
    ar: "إضافة كيانات",
    bg: "Добави обекти",
    bn: "এন্টিটি যোগ করুন",
    bs: "Dodaj entitete",
    cs: "Přidat entity",
    da: "Tilføj enheder",
    de: "Entitäten hinzufügen",
    el: "Προσθήκη οντοτήτων",
    "en-GB": "Add Entities",
    es: "Agregar entidades",
    "es-419": "Agregar entidades",
    et: "Lisa objekte",
    eu: "Gehitu entitateak",
    fa: "افزودن موجودیت‌ها",
    fi: "Lisää käsitteitä",
    fr: "Ajouter des entités",
    "fr-CA": "Ajouter des entités",
    gl: "Engadir entidades",
    he: "הוסף ישויות",
    hi: "एंटिटी जोड़ें",
    hu: "Entitások hozzáadása",
    hy: "Ավելացնել օբյեկտներ",
    id: "Tambahkan Entitas",
    it: "Aggiungi entità",
    ja: "エンティティを追加",
    ka: "ობიექტების დამატება",
    ko: "엔티티 추가",
    lt: "Pridėti entitetų",
    lv: "Pievienot vienības",
    mk: "Додај ентитети",
    nl: "Entiteiten toevoegen",
    nn: "Legg til entitetar",
    no: "Legg til enheter",
    pl: "Dodaj encje",
    pt: "Adicionar entidades",
    "pt-BR": "Adicionar entidades",
    ro: "Adaugă entități",
    ru: "Добавить объекты",
    sk: "Pridať entity",
    sl: "Dodaj entitete",
    sr: "Додај ентитете",
    sv: "Lägg till enheter",
    th: "เพิ่มเอนทิตี",
    tr: "Varlık Ekle",
    uk: "Додати об'єкти",
    ur: "انٹیٹیز شامل کریں",
    vi: "Thêm thực thể",
    "zh-Hans": "添加实体",
    "zh-Hant": "新增實體"
  },
  hidden_entities: {
    en: "Hidden Entities",
    ar: "الكيانات المخفية",
    bg: "Скрити обекти",
    bn: "লুকানো এন্টিটি",
    bs: "Skrivene entitete",
    cs: "Skryté entity",
    da: "Skjulte enheder",
    de: "Ausgeblendete Entitäten",
    el: "Κρυφές οντότητες",
    "en-GB": "Hidden Entities",
    es: "Entidades ocultas",
    "es-419": "Entidades ocultas",
    et: "Peidetud objektid",
    eu: "Ezkutatutako entitateak",
    fa: "موجودیت‌های مخفی",
    fi: "Piilotetut käsitteet",
    fr: "Entités masquées",
    "fr-CA": "Entités masquées",
    gl: "Entidades agochadas",
    he: "ישויות מוסתרות",
    hi: "छिपी हुई एंटिटी",
    hu: "Rejtett entitások",
    hy: "Թաքնված օբյեկտներ",
    id: "Entitas Tersembunyi",
    it: "Entità nascoste",
    ja: "非表示のエンティティ",
    ka: "დამალული ობიექტები",
    ko: "숨겨진 엔티티",
    lt: "Slėpti entitetai",
    lv: "Paslēptās vienības",
    mk: "Скриени ентитети",
    nl: "Verborgen entiteiten",
    nn: "Gøymde entitetar",
    no: "Skjulte enheter",
    pl: "Ukryte encje",
    pt: "Entidades ocultas",
    "pt-BR": "Entidades ocultas",
    ro: "Entități ascunse",
    ru: "Скрытые объекты",
    sk: "Skryté entity",
    sl: "Skrite entitete",
    sr: "Скривени ентитети",
    sv: "Dolda enheter",
    th: "เอนทิตีที่ซ่อนอยู่",
    tr: "Gizli Varlıklar",
    uk: "Приховані об'єкti",
    ur: "چھپی ہوئی انتیٹیز",
    vi: "Thực thể bị ẩn",
    "zh-Hans": "隐藏的实体",
    "zh-Hant": "隱藏的實體"
  },
  edit_filters: {
    en: "Edit Filters",
    ar: "تعديل الفلاتر",
    bg: "Редактирай филтрите",
    bn: "ফিল্টার সম্পাদনা করুন",
    bs: "Uredi filtere",
    cs: "Upravit filtry",
    da: "Rediger filtre",
    de: "Filter bearbeiten",
    el: "Επεξεργασία φίλτρων",
    "en-GB": "Edit Filters",
    es: "Editar filtros",
    "es-419": "Editar filtros",
    et: "Muuda filtreid",
    eu: "Editatu iragazkiak",
    fa: "ویرایش فیلترها",
    fi: "Muokkaa suodattimia",
    fr: "Modifier les filtres",
    "fr-CA": "Modifier les filtres",
    gl: "Editar filtros",
    he: "עריכת מסננים",
    hi: "फ़िल्टर संपादित करें",
    hu: "Szűrők szerkesztése",
    hy: "Խմբագրել զտիչները",
    id: "Edit Filter",
    it: "Modifica filtri",
    ja: "フィルターを編集",
    ka: "ფილტრების რედაქტირება",
    ko: "필터 편집",
    lt: "Redaguoti filtrus",
    lv: "Rediģēt filtrus",
    mk: "Уреди филтри",
    nl: "Filters bewerken",
    nn: "Rediger filter",
    no: "Rediger filtre",
    pl: "Edytuj filtry",
    pt: "Editar filtros",
    "pt-BR": "Editar filtros",
    ro: "Editează filtrele",
    ru: "Редактировать фильтры",
    sk: "Upraviť filtre",
    sl: "Uredi filtre",
    sr: "Уреди филтере",
    sv: "Redigera filter",
    th: "แก้ไขตัวกรอง",
    tr: "Filtreleri Düzenle",
    uk: "Редагувати фільтри",
    ur: "فلٹرز میں ترمیم کریں",
    vi: "Chỉnh sửa bộ lọc",
    "zh-Hans": "编辑筛选器",
    "zh-Hant": "編輯篩選器"
  },
  label_filter: {
    en: "Label Filter",
    ar: "فلتر التسمية",
    bg: "Филтър по етикет",
    bn: "লেবেল ফিল্টার",
    bs: "Filter oznaka",
    cs: "Filtr štítků",
    da: "Etiketfilter",
    de: "Label-Filter",
    el: "Φίλτρο ετικέτας",
    "en-GB": "Label Filter",
    es: "Filtro de etiquetas",
    "es-419": "Filtro de etiquetas",
    et: "Sildifilter",
    eu: "Etiketa-iragazkia",
    fa: "فیلتر برچسب",
    fi: "Tarrasuodatin",
    fr: "Filtre d'étiquettes",
    "fr-CA": "Filtre d'étiquettes",
    gl: "Filtro de etiquetas",
    he: "מסנן תגיות",
    hi: "लेबल फ़िल्टर",
    hu: "Címke szűrő",
    hy: "Պիտակի զտիչ",
    id: "Filter Label",
    it: "Filtro etichette",
    ja: "ラベルフィルター",
    ka: "ლეიბლის ფილტრი",
    ko: "레이블 필터",
    lt: "Žymų filtras",
    lv: "Iezīmju filtrs",
    mk: "Филтер на ознаки",
    nl: "Label filter",
    nn: "Etikettfilter",
    no: "Etikettfilter",
    pl: "Filtr etykiet",
    pt: "Filtro de etiquetas",
    "pt-BR": "Filtro de etiquetas",
    ro: "Filtru de etichete",
    ru: "Фильтр по меткам",
    sk: "Filter štítkov",
    sl: "Filter oznak",
    sr: "Филтер ознака",
    sv: "Etikettfilter",
    th: "ตัวกรองป้ายกำกับ",
    tr: "Etiket Filtresi",
    uk: "Фільтр міток",
    ur: "لیبل فلٹر",
    vi: "Bộ lọc nhãn",
    "zh-Hans": "标签筛选器",
    "zh-Hant": "標籤篩選器"
  },
  ungroup_areas: {
    en: "Disable Area Groups",
    ar: "تعطيل مجموعات المناطق",
    bg: "Изключи групите на областите",
    bn: "এলাকা গ্রুপ নিষ্ক্রিয় করুন",
    bs: "Onemogući grupe oblasti",
    cs: "Zakázat skupiny oblastí",
    da: "Deaktiver områdegrupper",
    de: "Bereichsgruppen deaktivieren",
    el: "Απενεργοποίηση ομάδων περιοχής",
    "en-GB": "Disable Area Groups",
    es: "Desactivar grupos de áreas",
    "es-419": "Desactivar grupos de áreas",
    et: "Keela alagrupid",
    eu: "Desgaitu eremu taldeak",
    fa: "غیرفعال کردن گروه‌های منطقه",
    fi: "Poista alueet käytöstä",
    fr: "Désactiver les groupes de zones",
    "fr-CA": "Désactiver les groupes de zones",
    gl: "Desactivar grupos de áreas",
    he: "השבת קבוצות אזורים",
    hi: "क्षेत्र समूह अक्षम करें",
    hu: "Területcsoportok letiltása",
    hy: "Անջատել տարածքների խմբերը",
    id: "Nonaktifkan Grup Area",
    it: "Disattiva gruppi area",
    ja: "エリアグループを無効化",
    ka: "ზონის ჯგუფების გამორთვა",
    ko: "영역 그룹 비활성화",
    lt: "Išjungti zonų grupes",
    lv: "Atslēgt zonu grupas",
    mk: "Онеможи групи на области",
    nl: "Gebiedsgroepen uitschakelen",
    nn: "Deaktiver områdegrupper",
    no: "Deaktiver områdegrupper",
    pl: "Wyłącz grupy obszarów",
    pt: "Desativar grupos de áreas",
    "pt-BR": "Desativar grupos de áreas",
    ro: "Dezactivează grupurile de zone",
    ru: "Отключить группы областей",
    sk: "Zakázať skupiny oblastí",
    sl: "Onemogoči skupine območij",
    sr: "Онемогући групе области",
    sv: "Inaktivera områdesgrupper",
    th: "ปิดการใช้งานกลุ่มพื้นที่",
    tr: "Alan Gruplarını Devre Dışı Bırak",
    uk: "Вимкнути групи зон",
    ur: "خطے کے گروپس غیر فعال کریں",
    vi: "Vô hiệu hóa nhóm khu vực",
    "zh-Hans": "禁用区域分组",
    "zh-Hant": "停用區域群組"
  },
  popup_domains: {
    en: "Popup Domains",
    ar: "نطاقات النافذة المنبثقة",
    bg: "Изскачащи домейни",
    bn: "পপআপ ডোমেইন",
    bs: "Popup domeni",
    cs: "Vyskakovací domény",
    da: "Popup-domæner",
    de: "Popup Domains",
    el: "Παράθυρα πεδίων",
    "en-GB": "Popup Domains",
    es: "Dominios emergentes",
    "es-419": "Dominios emergentes",
    et: "Hüpikdomäänid",
    eu: "Popup domeinuak",
    fa: "دامنه‌های پاپ‌آپ",
    fi: "Ponnahusikkunadomainit",
    fr: "Domaines contextuels",
    "fr-CA": "Domaines contextuels",
    gl: "Dominios de ventás emerxentes",
    he: "תחומי חלון קופץ",
    hi: "पॉपअप डोमेन",
    hu: "Felugró domainek",
    hy: "Պատուհանի տիրույթներ",
    id: "Domain Popup",
    it: "Dominio popup",
    ja: "ポップアップドメイン",
    ka: "პოპაპ დომენები",
    ko: "팝업 도메인",
    lt: "Iškylančiųjų domenai",
    lv: "Uznirstošās domēns",
    mk: "Скокачки домени",
    nl: "Pop-up domeinen",
    nn: "Popup-domener",
    no: "Popup-domener",
    pl: "Domeny wyskakujące",
    pt: "Domínios pop-up",
    "pt-BR": "Domínios pop-up",
    ro: "Domenii pop-up",
    ru: "Всплывающие домены",
    sk: "Vyskakovacie domény",
    sl: "Pojavna domena",
    sr: "Искачући домени",
    sv: "Popup-domäner",
    th: "โดเมนป๊อปอัป",
    tr: "Pop-up Etki Alanları",
    uk: "Спливні домени",
    ur: "پاپ اپ ڈومینز",
    vi: "Tên miền bật lên",
    "zh-Hans": "弹窗域",
    "zh-Hant": "彈出視窗網域"
  },
  wrap_sensor_icons: {
    en: "Wrap Sensor Icons",
    ar: "تفاف أيقونات المستشعر",
    bg: "Пренасяне на иконите на сензорите",
    bn: "সেন্সর আইকন মোড়ানো",
    bs: "Prelomi ikone senzora",
    cs: "Zalamovat ikony senzorů",
    da: "Ombryd sensorikoner",
    de: "Sensor-Symbole umbrechen",
    el: "Αναδίπλωση εικονιδίων αισθητήρα",
    "en-GB": "Wrap Sensor Icons",
    es: "Ajustar iconos del sensor",
    "es-419": "Ajustar iconos del sensor",
    et: "Muru sensori ikoonid",
    eu: "Sentsore ikonoak egokitu",
    fa: "شکستن آیکون‌های سنسور",
    fi: "Käännä anturikuvakkeet",
    fr: "Retour à la ligne des icônes de capteurs",
    "fr-CA": "Retour à la ligne des icônes de capteurs",
    gl: "Axustar iconas do sensor",
    he: "גלגול סמלי חיישנים",
    hi: "सेंसर आइकन रैप करें",
    hu: "Szenzor ikonok tördelése",
    hy: "Գրել սենսորների պատկերները",
    id: "Gulung Ikon Sensor",
    it: "A capo icone sensore",
    ja: "センサーアイコンの折り返し",
    ka: "სენსორის ხატულების გადატანა",
    ko: "센서 아이콘 줄바꿈",
    lt: "Laužyti sensorių piktogramas",
    lv: "Aplauzt sensoru ikonas",
    mk: "Пренеси ги иконите на сензорите",
    nl: "Sensorpictogrammen afbreken",
    nn: "Bryt sensorikonar",
    no: "Bryt sensorikoner",
    pl: "Zawijaj ikony czujników",
    pt: "Quebrar ícones do sensor",
    "pt-BR": "Quebrar ícones do sensor",
    ro: "Împachetare pictograme senzor",
    ru: "Перенос иконок датчиков",
    sk: "Zalamovať ikony senzorov",
    sl: "Prelomi ikone senzorjev",
    sr: "Преломи иконе сензора",
    sv: "Bryt sensorikoner",
    th: "ตัดไอคอนเซ็นเซอร์",
    tr: "Sensör Simgelerini Kaydır",
    uk: "Перенос іконок датчиків",
    ur: "سینسر آئیکنز ریپ کریں",
    vi: "Xuống dòng biểu tượng cảm biến",
    "zh-Hans": "传感器图标换行",
    "zh-Hant": "感測器圖示換行"
  },
  category_filter: {
    en: "Category Filter",
    ar: "فلتر الفئة",
    bg: "Филтър по категория",
    bn: "ক্যাটাগরি ফিল্টার",
    bs: "Filter kategorija",
    cs: "Filtr kategorií",
    da: "Kategorifilter",
    de: "Kategoriefilter",
    el: "Φίλτρο κατηγορίας",
    "en-GB": "Category Filter",
    es: "Filtro de categorías",
    "es-419": "Filtro de categorías",
    et: "Kategooriafilter",
    eu: "Kategoria iragazkia",
    fa: "فیلتر دسته‌بندی",
    fi: "Kategoriasuodatin",
    fr: "Filtre de catégories",
    "fr-CA": "Filtre de catégories",
    gl: "Filtro de categorías",
    he: "מסנן קטגוריות",
    hi: "श्रेणी फ़िल्टर",
    hu: "Kategória szűrő",
    hy: "Կատեգորիայի զտիչ",
    id: "Filter Kategori",
    it: "Filtro categorie",
    ja: "カテゴリフィルター",
    ka: "კატეგორიის ფილტრი",
    ko: "카테고리 필터",
    lt: "Kategorijų filtras",
    lv: "Kategoriju filtrs",
    mk: "Филтер на категории",
    nl: "Categoriefilter",
    nn: "Kategorifilter",
    no: "Kategorifilter",
    pl: "Filtr kategorii",
    pt: "Filtro de categorias",
    "pt-BR": "Filtro de categorias",
    ro: "Filtru de categorii",
    ru: "Фильтр по категориям",
    sk: "Filter kategórií",
    sl: "Filter kategorij",
    sr: "Филтер категорија",
    sv: "Kategorifilter",
    th: "ตัวกรองหมวดหมู่",
    tr: "Kategori Filtresi",
    uk: "Фільтр категорій",
    ur: "زمرہ فلٹر",
    vi: "Bộ lọc danh mục",
    "zh-Hans": "分类筛选器",
    "zh-Hant": "分類篩選器"
  },
  mirrored: {
    en: "Mirror Card Layout",
    ar: "نسخ تخطيط البطاقة",
    bg: "Огледално оформление на картата",
    bn: "কার্ড লেআউট মিরর",
    bs: "Ogledalo rasporeda kartice",
    cs: "Zrcadlit rozložení karty",
    da: "Spejl kortlayout",
    de: "Kartenanordnung spiegeln",
    el: "Κατοπτρισμός διάταξης κάρτας",
    "en-GB": "Mirror Card Layout",
    es: "Reflejar diseño de tarjeta",
    "es-419": "Reflejar diseño de tarjeta",
    et: "Peegelda kaardipaigutust",
    eu: "Ispilu txartela diseinua",
    fa: "آینه چیدمان کارت",
    fi: "Peilaa kortin asettelua",
    fr: "Miroir de la disposition de la carte",
    "fr-CA": "Miroir de la disposition de la carte",
    gl: "Espellar disposición da tarxeta",
    he: "שיקוף פריסת כרטיס",
    hi: "कार्ड लेआउट मिरर",
    hu: "Kártya elrendezés tükrözése",
    hy: "Հայելային քարտի դասավորություն",
    id: "Cermin Tata Letak Kartu",
    it: "Specchio layout scheda",
    ja: "カードレイアウトをミラー",
    ka: "ბარათის განლაგების სარკე",
    ko: "카드 레이아웃 미러",
    lt: "Veidrodinis kortelės išdėstymas",
    lv: "Spoguļa kartes izkārtojums",
    mk: "Огледален распоред на картичката",
    nl: "Kaartindeling spiegelen",
    nn: "Spegl kortutforming",
    no: "Speil kortlayout",
    pl: "Odbij układ karty",
    pt: "Espelhar layout do cartão",
    "pt-BR": "Espelhar layout do cartão",
    ro: "Oglindește aspectul cardului",
    ru: "Зеркальная компоновка карточки",
    sk: "Zrkadliť rozloženie karty",
    sl: "Zrcali postavitev kartice",
    sr: "Огледални распоред картице",
    sv: "Spegla kortlayout",
    th: "พลิกเค้าโครงการ์ด",
    tr: "Kart Yerleşimini Ayna",
    uk: "Дзеркальне розташування картки",
    ur: "کارڈ لے آؤٹ میرر",
    vi: "Phản chiếu bố cục thẻ",
    "zh-Hans": "镜像卡片布局",
    "zh-Hant": "鏡像卡片佈局"
  },
  popup_sort: {
    en: "Popup Sorting",
    ar: "ترتيب منبثقة",
    bg: "Сортиране в изкачащ прозорец",
    bn: "পপআপ সাজানো",
    bs: "Sortiranje popupa",
    cs: "Řazení vyskakovacího okna",
    da: "Sortering i popup",
    de: "Sortierung im Popup",
    el: "Ταξινόμηση αναδυόμενου",
    "en-GB": "Popup Sorting",
    es: "Ordenación en popup",
    "es-419": "Ordenación en popup",
    et: "Hüpikakna sortimine",
    eu: "Popuparen sailketa",
    fa: "مرتب‌سازی پاپ آپ",
    fi: "Ponnahsuikkunan järjestäminen",
    fr: "Tri dans la fenêtre contextuelle",
    "fr-CA": "Tri dans la fenêtre contextuelle",
    gl: "Ordenación en popup",
    he: "מיון חלון קופץ",
    hi: "पॉपअप क्रमबद्ध करना",
    hu: "Felugró ablak rendezése",
    hy: "Պոպափի դասավորում",
    id: "Pengurutan Popup",
    it: "Ordinamento popup",
    ja: "ポップアップの並べ替え",
    ka: "პოპაპის დალაგება",
    ko: "팝업 정렬",
    lt: "Iškylančiojo lango rūšiavimas",
    lv: "Uznirstošā loga kārtošana",
    mk: "Подредување на скокачко",
    nl: "Popups sorteren",
    nn: "Sortering i popup",
    no: "Sortering i popup",
    pl: "Sortowanie w oknie podręcznym",
    pt: "Ordenação em popup",
    "pt-BR": "Ordenação em popup",
    ro: "Sortare în fereastra pop-up",
    ru: "Сортировка во всплывающем окне",
    sk: "Zoradenie vyskakovacieho okna",
    sl: "Razvrščanje pojavnega okna",
    sr: "Сортирање искачујућег прозора",
    sv: "Sortering i popup",
    th: "การเรียงลำดับป๊อปอัพ",
    tr: "Popup Sıralama",
    uk: "Сортування у спливаючому вікні",
    ur: "پاپ اپ ترتیب",
    vi: "Sắp xếp cửa sổ bật lên",
    "zh-Hans": "弹出窗口排序",
    "zh-Hant": "彈出視窗排序"
  },
  camera_mode: {
    en: "Camera Mode",
    ar: "وضع الكاميرا",
    bg: "Режим на камерата",
    bn: "ক্যামেরা মোড",
    bs: "Kamera režim",
    cs: "Režim kamery",
    da: "Kameratilstand",
    de: "Kameramodus",
    el: "Λειτουργία κάμερας",
    "en-GB": "Camera Mode",
    es: "Modo de cámara",
    "es-419": "Modo de cámara",
    et: "Kaamera režiim",
    eu: "Kamera modua",
    fa: "حالت دوربین",
    fi: "Kameratila",
    fr: "Mode caméra",
    "fr-CA": "Mode caméra",
    gl: "Modo de cámara",
    he: "מצב מצלמה",
    hi: "कैमरा मोड",
    hu: "Kamera mód",
    hy: "Տեսախցիկի ռեժիմ",
    id: "Mode Kamera",
    it: "Modalità fotocamera",
    ja: "カメラモード",
    ka: "კამერის რეჟიმი",
    ko: "카메라 모드",
    lt: "Kameros režimas",
    lv: "Kameras režīms",
    mk: "Режим на камера",
    nl: "Cameramodus",
    nn: "Kameramodus",
    no: "Kameramodus",
    pl: "Tryb kamery",
    pt: "Modo de câmera",
    "pt-BR": "Modo de câmera",
    ro: "Mod cameră",
    ru: "Режим камеры",
    sk: "Režim kamery",
    sl: "Način kamere",
    sr: "Режим камере",
    sv: "Kameratillstånd",
    th: "โหมดกล้อง",
    tr: "Kamera Modu",
    uk: "Режим камери",
    ur: "کیمرہ موڈ",
    vi: "Chế độ camera",
    "zh-Hans": "摄像头模式",
    "zh-Hant": "攝影機模式"
  },
  camera_mode_single: {
    en: "Single Camera",
    ar: "كاميرا واحدة",
    bg: "Единична камера",
    bn: "একক ক্যামেরা",
    bs: "Pojedinačna kamera",
    cs: "Jedna kamera",
    da: "Enkelt kamera",
    de: "Einzelkamera",
    el: "Μία κάμερα",
    "en-GB": "Single Camera",
    es: "Cámara única",
    "es-419": "Cámara única",
    et: "Üks kaamera",
    eu: "Kamera bakarra",
    fa: "دوربین تکی",
    fi: "Yksi kamera",
    fr: "Caméra unique",
    "fr-CA": "Caméra unique",
    gl: "Cámara única",
    he: "מצלמה אחת",
    hi: "एकल कैमरा",
    hu: "Egyetlen kamera",
    hy: "Մեկ տեսախցիկ",
    id: "Kamera Tunggal",
    it: "Telecamera singola",
    ja: "単一カメラ",
    ka: "ერთი კამერა",
    ko: "단일 카메라",
    lt: "Viena kamera",
    lv: "Viena kamera",
    mk: "Една камера",
    nl: "Enkele camera",
    nn: "Enkeltkamera",
    no: "Enkeltkamera",
    pl: "Jedna kamera",
    pt: "Câmera única",
    "pt-BR": "Câmera única",
    ro: "O singură cameră",
    ru: "Одна камера",
    sk: "Jedna kamera",
    sl: "Ena kamera",
    sr: "Једна камера",
    sv: "Enskild kamera",
    th: "กล้องเดียว",
    tr: "Tek Kamera",
    uk: "Одна камера",
    ur: "واحد کیمرہ",
    vi: "Một camera",
    "zh-Hans": "单摄像头",
    "zh-Hant": "單一攝影機"
  },
  camera_mode_auto: {
    en: "Auto Rotation",
    ar: "تدوير تلقائي",
    bg: "Автоматично завъртане",
    bn: "স্বয়ংক্রিয় ঘূর্ণন",
    bs: "Automatska rotacija",
    cs: "Automatická rotace",
    da: "Automatisk rotation",
    de: "Automatische Rotation",
    el: "Αυτόματη περιστροφή",
    "en-GB": "Auto Rotation",
    es: "Rotación automática",
    "es-419": "Rotación automática",
    et: "Automaatne pöörlemine",
    eu: "Biraketa automatikoa",
    fa: "چرخش خودکار",
    fi: "Automaattinen kierto",
    fr: "Rotation automatique",
    "fr-CA": "Rotation automatique",
    gl: "Rotación automática",
    he: "סיבוב אוטומטי",
    hi: "स्वचालित घुमाव",
    hu: "Automatikus forgatás",
    hy: "Ավտոմատ պտույտ",
    id: "Rotasi Otomatis",
    it: "Rotazione automatica",
    ja: "自動回転",
    ka: "ავტომატური ბრუნვა",
    ko: "자동 회전",
    lt: "Automatinis sukimas",
    lv: "Automātiska rotācija",
    mk: "Автоматска ротација",
    nl: "Automatische rotatie",
    nn: "Automatisk rotasjon",
    no: "Automatisk rotasjon",
    pl: "Automatyczna rotacja",
    pt: "Rotação automática",
    "pt-BR": "Rotação automática",
    ro: "Rotire automată",
    ru: "Автоматическое вращение",
    sk: "Automatická rotácia",
    sl: "Samodejno vrtenje",
    sr: "Аутоматска ротација",
    sv: "Automatisk rotation",
    th: "หมุนอัตโนมัติ",
    tr: "Otomatik Döndürme",
    uk: "Автоматичне обертання",
    ur: "خودکار گردش",
    vi: "Xoay tự động",
    "zh-Hans": "自动旋转",
    "zh-Hant": "自動旋轉"
  },
  camera_mode_split: {
    en: "Split View (50/50)",
    ar: "شاشة مقسمة (50/50)",
    bg: "Разделен изглед (50/50)",
    bn: "বিভক্ত ভিউ (50/50)",
    bs: "Podijeljen prikaz (50/50)",
    cs: "Rozdělené zobrazení (50/50)",
    da: "Opdelt visning (50/50)",
    de: "Geteilte Ansicht (50/50)",
    el: "Διαχωρισμένη προβολή (50/50)",
    "en-GB": "Split View (50/50)",
    es: "Vista dividida (50/50)",
    "es-419": "Vista dividida (50/50)",
    et: "Jagatud vaade (50/50)",
    eu: "Zatitako ikuspegia (50/50)",
    fa: "نمای تقسیمشده (50/50)",
    fi: "Jaettu näkymä (50/50)",
    fr: "Vue divisée (50/50)",
    "fr-CA": "Vue divisée (50/50)",
    gl: "Vista dividida (50/50)",
    he: "תצוגה מפוצלת (50/50)",
    hi: "विभाजित दृश्य (50/50)",
    hu: "Osztott nézet (50/50)",
    hy: "Բաժանված պատկեր (50/50)",
    id: "Tampilan Terpisah (50/50)",
    it: "Vista divisa (50/50)",
    ja: "分割ビュー (50/50)",
    ka: "გაყოფილი ხედი (50/50)",
    ko: "분할 보기 (50/50)",
    lt: "Padalintas vaizdas (50/50)",
    lv: "Sadalīts skats (50/50)",
    mk: "Поделен поглед (50/50)",
    nl: "Gesplitste weergave (50/50)",
    nn: "Delt visning (50/50)",
    no: "Delt visning (50/50)",
    pl: "Podzielony widok (50/50)",
    pt: "Vista dividida (50/50)",
    "pt-BR": "Vista dividida (50/50)",
    ro: "Vedere divizată (50/50)",
    ru: "Раздельный просмотр (50/50)",
    sk: "Rozdelené zobrazenie (50/50)",
    sl: "Deljen prikaz (50/50)",
    sr: "Подељени приказ (50/50)",
    sv: "Delad vy (50/50)",
    th: "มุมมองแบบแบ่งครึ่ง (50/50)",
    tr: "Bölünmüş Görünüm (50/50)",
    uk: "Розділений перегляд (50/50)",
    ur: "تقسیم شدہ ویو (50/50)",
    vi: "Chế độ xem chia đôi (50/50)",
    "zh-Hans": "分屏显示 (50/50)",
    "zh-Hant": "分割檢視 (50/50)"
  },
  camera_auto_interval: {
    en: "Interval (Seconds)",
    ar: "الفاصل (ثواني)",
    bg: "Интервал (секунди)",
    bn: "ইন্টারভাল (সেকেন্ড)",
    bs: "Interval (Sekunde)",
    cs: "Interval (vteřiny)",
    da: "Interval (Sekunder)",
    de: "Intervall (Sekunden)",
    el: "Διάστημα (δευτερόλεπτα)",
    "en-GB": "Interval (Seconds)",
    es: "Intervalo (Segundos)",
    "es-419": "Intervalo (Segundos)",
    et: "Intervall (sekundit)",
    eu: "Tartea (Segundoak)",
    fa: "فاصله (ثانیه)",
    fi: "Aikaväli (Sekuntia)",
    fr: "Intervalle (Secondes)",
    "fr-CA": "Intervalle (Secondes)",
    gl: "Intervalo (Segundos)",
    he: "מרווח (שניות)",
    hi: "अंतराल (सेकंड)",
    hu: "Intervallum (Másodperc)",
    hy: "Միջակայք (վայրկյան)",
    id: "Interval (Detik)",
    it: "Intervallo (Secondi)",
    ja: "間隔（秒）",
    ka: "ინტერვალი (წამი)",
    ko: "간격 (초)",
    lt: "Intervalas (sekundės)",
    lv: "Intervāls (sekundes)",
    mk: "Интервал (секунди)",
    nl: "Interval (Seconden)",
    nn: "Intervall (Sekund)",
    no: "Intervall (Sekunder)",
    pl: "Interwał (Sekundy)",
    pt: "Intervalo (Segundos)",
    "pt-BR": "Intervalo (Segundos)",
    ro: "Interval (Secunde)",
    ru: "Интервал (секунды)",
    sk: "Interval (Sekundy)",
    sl: "Interval (Sekunde)",
    sr: "Интервал (Секунде)",
    sv: "Intervall (Sekunder)",
    th: "ช่วงเวลา (วินาที)",
    tr: "Aralık (Saniye)",
    uk: "Інтервал (секунди)",
    ur: "انٹerval (سیکنڈ)",
    vi: "Khoảng thời gian (Giây)",
    "zh-Hans": "间隔（秒）",
    "zh-Hant": "間隔（秒）"
  },
  add_custom_button: {
    en: "Add Custom Button",
    ar: "إضافة زر مخصص",
    bg: "Добави персонализиран бутон",
    bn: "কাস্টম বোতাম যোগ করুন",
    bs: "Dodaj prilagođeno dugme",
    cs: "Přidat vlastní tlačítko",
    da: "Tilføj brugerdefineret knap",
    de: "Benutzerdefinierten Button hinzufügen",
    el: "Προσθήκη προσαρμοσμένου κουμπιού",
    "en-GB": "Add Custom Button",
    es: "Agregar botón personalizado",
    "es-419": "Agregar botón personalizado",
    et: "Lisa kohandatud nupp",
    eu: "Gehitu botoi pertsonalizatua",
    fa: "افزودن دکمه سفارشی",
    fi: "Lisää mukautettu painike",
    fr: "Ajouter un bouton personnalisé",
    "fr-CA": "Ajouter un bouton personnalisé",
    gl: "Engadir botón personalizado",
    he: "הוסף כפתור מותאם אישית",
    hi: "कस्टम बटन जोड़ें",
    hu: "Egyéni gomb hozzáadása",
    hy: "Ավելացնել հարմարեցված կոճակ",
    id: "Tambah Tombol Kustom",
    it: "Aggiungi pulsante personalizzato",
    ja: "カスタムボタンを追加",
    ka: "მორგებული ღილაკის დამატება",
    ko: "사용자 지정 버튼 추가",
    lt: "Pridėti pasirinktinį mygtuką",
    lv: "Pielāgoto pogu pievienot",
    mk: "Додади сопствено копче",
    nl: "Aangepaste knop toevoegen",
    nn: "Legg til eigendefinert knapp",
    no: "Legg til egendefinert knapp",
    pl: "Dodaj niestandardowy przycisk",
    pt: "Adicionar botão personalizado",
    "pt-BR": "Adicionar botão personalizado",
    ro: "Adaugă buton personalizat",
    ru: "Добавить пользовательскую кнопку",
    sk: "Pridať vlastné tlačidlo",
    sl: "Dodaj parameter gumbov",
    sr: "Додај прилагођено дугме",
    sv: "Lägg till anpassad knapp",
    th: "เพิ่มปุ่มที่กำหนดเอง",
    tr: "Özel Düğme Ekle",
    uk: "Додати користувацьку кнопку",
    ur: "حسب ضرورت بٹن شامل کریں",
    vi: "Thêm nút tùy chỉnh",
    "zh-Hans": "添加自定义按钮",
    "zh-Hant": "新增自訂按鈕"
  },
  color: {
    en: "Color",
    ar: "لون",
    bg: "Цвят",
    bn: "রঙ",
    bs: "Boja",
    cs: "Barva",
    da: "Farve",
    de: "Farbe",
    el: "Χρώμα",
    "en-GB": "Color",
    es: "Color",
    "es-419": "Color",
    et: "Värv",
    eu: "Kolorea",
    fa: "رنگ",
    fi: "Väri",
    fr: "Couleur",
    "fr-CA": "Couleur",
    gl: "Cor",
    he: "צבע",
    hi: "रंग",
    hu: "Szín",
    hy: "Գույն",
    id: "Warna",
    it: "Colore",
    ja: "色",
    ka: "ფერი",
    ko: "색상",
    lt: "Spalva",
    lv: "Krāsa",
    mk: "Боја",
    nl: "Kleur",
    nn: "Farge",
    no: "Farge",
    pl: "Kolor",
    pt: "Cor",
    "pt-BR": "Cor",
    ro: "Culoare",
    ru: "Цвет",
    sk: "Farba",
    sl: "Barva",
    sr: "Боја",
    sv: "Färg",
    th: "สี",
    tr: "Renk",
    uk: "Колір",
    ur: "رنگ",
    vi: "Màu",
    "zh-Hans": "颜色",
    "zh-Hant": "顏色"
  },
  edit_content: {
    en: "Edit Content",
    ar: "تعديل المحتوى",
    bg: "Редактиране на съдържанието",
    bn: "বিষয়বস্তু সম্পাদনা",
    bs: "Uredi sadržaj",
    cs: "Upravit obsah",
    da: "Rediger indhold",
    de: "Inhalt bearbeiten",
    el: "Επεξεργασία περιεχομένων",
    "en-GB": "Edit Content",
    es: "Editar contenido",
    "es-419": "Editar contenido",
    et: "Muuda sisu",
    eu: "Editatu edukia",
    fa: "ویرایش محتوا",
    fi: "Muokkaa sisältöä",
    fr: "Modifier le contenu",
    "fr-CA": "Modifier le contenu",
    gl: "Editar contido",
    he: "עריכת תוכן",
    hi: "सामग्री संपादित करें",
    hu: "Tartalom szerkesztése",
    hy: "Խմբագրել բովանդակությունը",
    id: "Edit Konten",
    it: "Modifica contenuto",
    ja: "コンテンツを編集",
    ka: "შიგთავსის რედაქტირება",
    ko: "콘텐츠 편집",
    lt: "Redaguoti turinį",
    lv: "Rediģēt saturu",
    mk: "Уреди содржина",
    nl: "Inhoud bewerken",
    nn: "Rediger innhald",
    no: "Rediger innhold",
    pl: "Edytuj zawartość",
    pt: "Editar conteúdo",
    "pt-BR": "Editar conteúdo",
    ro: "Editează conținutul",
    ru: "Редактировать содержание",
    sk: "Upraviť obsah",
    sl: "Uredi vsebino",
    sr: "Уреди садржај",
    sv: "Redigera innehåll",
    th: "แก้ไขเนื้อหา",
    tr: "İçeriği Düzenle",
    uk: "Редагувати вміст",
    ur: "مواد میں ترمیم کریں",
    vi: "Chỉnh sửa nội dung",
    "zh-Hans": "编辑内容",
    "zh-Hant": "編輯內容"
  },
  position_default: {
    en: "Default",
    ar: "الافتراضي",
    bg: "По подразбиране",
    bn: "ডিফল্ট",
    bs: "Zadano",
    cs: "Výchozí",
    da: "Standard",
    de: "Standard",
    el: "Προεπιλογή",
    "en-GB": "Default",
    es: "Por defecto",
    "es-419": "Por defecto",
    et: "Vaikimisi",
    eu: "Lehenetsia",
    fa: "پیشفرض",
    fi: "Oletus",
    fr: "Par défaut",
    "fr-CA": "Par défaut",
    gl: "Por defecto",
    he: "ברירת מחדל",
    hi: "डिफ़ॉल्ट",
    hu: "Alapértelmezett",
    hy: "Լռությամբ",
    id: "Default",
    it: "Predefinito",
    ja: "デフォルト",
    ka: "ნაგულისხმევი",
    ko: "기본값",
    lt: "Numatytasis",
    lv: "Noklusējums",
    mk: "Стандардно",
    nl: "Standaard",
    nn: "Standard",
    no: "Standard",
    pl: "Domyślne",
    pt: "Padrão",
    "pt-BR": "Padrão",
    ro: "Implicit",
    ru: "По умолчанию",
    sk: "Predvolené",
    sl: "Privzeto",
    sr: "Подразумевано",
    sv: "Standard",
    th: "ค่าเริ่มต้น",
    tr: "Varsayılan",
    uk: "За замовчуванням",
    ur: "پہلے سے طے شدہ",
    vi: "Mặc định",
    "zh-Hans": "默认",
    "zh-Hant": "預設"
  },
  position_top_left: {
    en: "Top Left",
    ar: "أعلى اليسار",
    bg: "Горе вляво",
    bn: "উপরে বাম",
    bs: "Gore lijevo",
    cs: "Nahoře vlevo",
    da: "Øverst til venstre",
    de: "Oben links",
    el: "Πάνω αριστερά",
    "en-GB": "Top Left",
    es: "Arriba a la izquierda",
    "es-419": "Arriba a la izquierda",
    et: "Üleval vasakul",
    eu: "Goian ezkerrera",
    fa: "بالا چپ",
    fi: "Ylhäällä vasemmalla",
    fr: "En haut à gauche",
    "fr-CA": "En haut à gauche",
    gl: "Arriba á esquerda",
    he: "למעלה שמאלה",
    hi: "ऊपर बाएं",
    hu: "Bal felső",
    hy: "Վերև ձախ",
    id: "Kiri Atas",
    it: "In alto a sinistra",
    ja: "左上",
    ka: "ზედა მარცხნივ",
    ko: "왼쪽 위",
    lt: "Viršuje kairėje",
    lv: "Augšā pa kreisi",
    mk: "Горе лево",
    nl: "Linksboven",
    nn: "Øverst til venstre",
    no: "Øverst til venstre",
    pl: "Góra lewa",
    pt: "Canto superior esquerdo",
    "pt-BR": "Canto superior esquerdo",
    ro: "Sus stânga",
    ru: "Сверху слева",
    sk: "Hore vľavo",
    sl: "Zgoraj levo",
    sr: "Горе лево",
    sv: "Överst till vänster",
    th: "บนซ้าย",
    tr: "Sol Üst",
    uk: "Вгорі ліворуч",
    ur: "اوپر بائیں",
    vi: "Trên bên trái",
    "zh-Hans": "左上",
    "zh-Hant": "左上"
  },
  position_top_right: {
    en: "Top Right",
    ar: "أعلى اليمين",
    bg: "Горе вдясно",
    bn: "উপরে ডান",
    bs: "Gore desno",
    cs: "Nahoře vpravo",
    da: "Øverst til højre",
    de: "Oben rechts",
    el: "Πάνω δεξιά",
    "en-GB": "Top Right",
    es: "Arriba a la derecha",
    "es-419": "Arriba a la derecha",
    et: "Üleval paremal",
    eu: "Goian eskuinera",
    fa: "بالا راست",
    fi: "Ylhäällä oikealla",
    fr: "En haut à droite",
    "fr-CA": "En haut à droite",
    gl: "Arriba á dereita",
    he: "למעלה ימינה",
    hi: "ऊपर दाएं",
    hu: "Jobb felső",
    hy: "Վերև աջ",
    id: "Kanan Atas",
    it: "In alto a destra",
    ja: "右上",
    ka: "ზედა მარჯვნივ",
    ko: "오른쪽 위",
    lt: "Viršuje dešinėje",
    lv: "Augšā pa labi",
    mk: "Горе десно",
    nl: "Rechtsboven",
    nn: "Øverst til høyre",
    no: "Øverst til høyre",
    pl: "Góra prawa",
    pt: "Canto superior direito",
    "pt-BR": "Canto superior direito",
    ro: "Sus dreapta",
    ru: "Сверху справа",
    sk: "Hore vpravo",
    sl: "Zgoraj desno",
    sr: "Горе десно",
    sv: "Överst till höger",
    th: "บนขวา",
    tr: "Sağ Üst",
    uk: "Вгорі праворуч",
    ur: "اوپر دائیں",
    vi: "Trên bên phải",
    "zh-Hans": "右上",
    "zh-Hant": "右上"
  },
  position_bottom_left: {
    en: "Bottom Left",
    ar: "أسفل اليسار",
    bg: "Долу вляво",
    bn: "নিচে বাম",
    bs: "Dolje lijevo",
    cs: "Dole vlevo",
    da: "Nederst til venstre",
    de: "Unten links",
    el: "Κάτω αριστερά",
    "en-GB": "Bottom Left",
    es: "Abajo a la izquierda",
    "es-419": "Abajo a la izquierda",
    et: "All vasakul",
    eu: "Behean ezkerrera",
    fa: "پایین چپ",
    fi: "Alhaalla vasemmalla",
    fr: "En bas à gauche",
    "fr-CA": "En bas à gauche",
    gl: "Abaixo á esquerda",
    he: "למטה שמאלה",
    hi: "नीचे बाएं",
    hu: "Bal alsó",
    hy: "Ներքև ձախ",
    id: "Kiri Bawah",
    it: "In basso a sinistra",
    ja: "左下",
    ka: "ქვედა მარცხნივ",
    ko: "왼쪽 아래",
    lt: "Apačioje kairėje",
    lv: "Apakšā pa kreisi",
    mk: "Доле лево",
    nl: "Linksonder",
    nn: "Nederst til venstre",
    no: "Nederst til venstre",
    pl: "Dół lewy",
    pt: "Canto inferior esquerdo",
    "pt-BR": "Canto inferior esquerdo",
    ro: "Jos stânga",
    ru: "Снизу слева",
    sk: "Dole vľavo",
    sl: "Spodaj levo",
    sr: "Доле лево",
    sv: "Nederst till vänster",
    th: "ล่างซ้าย",
    tr: "Sol Alt",
    uk: "Внизу ліворуч",
    ur: "نیچے بائیں",
    vi: "Dưới bên trái",
    "zh-Hans": "左下",
    "zh-Hant": "左下"
  },
  position_bottom_right: {
    en: "Bottom Right",
    ar: "أسفل اليمين",
    bg: "Долу вдясно",
    bn: "নিচে ডান",
    bs: "Dolje desno",
    cs: "Dole vpravo",
    da: "Nederst til højre",
    de: "Unten rechts",
    el: "Κάτω δεξιά",
    "en-GB": "Bottom Right",
    es: "Abajo a la derecha",
    "es-419": "Abajo a la derecha",
    et: "All paremal",
    eu: "Behean eskuinera",
    fa: "پایین راست",
    fi: "Alhaalla oikealla",
    fr: "En bas à droite",
    "fr-CA": "En bas à droite",
    gl: "Abaixo á dereita",
    he: "למטה ימינה",
    hi: "नीचे दाएं",
    hu: "Jobb alsó",
    hy: "Ներքև աջ",
    id: "Kanan Bawah",
    it: "In basso a destra",
    ja: "右下",
    ka: "ქვედა მარჯვნივ",
    ko: "오른쪽 아래",
    lt: "Apačioje dešinėje",
    lv: "Apakšā pa labi",
    mk: "Доле десно",
    nl: "Rechtsonder",
    nn: "Nederst til høyre",
    no: "Nederst til høyre",
    pl: "Dół prawy",
    pt: "Canto inferior direito",
    "pt-BR": "Canto inferior direito",
    ro: "Jos dreapta",
    ru: "Снизу справа",
    sk: "Dole vpravo",
    sl: "Spodaj desno",
    sr: "Доле десно",
    sv: "Nederst till höger",
    th: "ล่างขวา",
    tr: "Sağ Alt",
    uk: "Внизу праворуч",
    ur: "نیچے دائیں",
    vi: "Dưới bên phải",
    "zh-Hans": "右下",
    "zh-Hant": "右下"
  },
  position_custom: {
    en: "Custom",
    ar: "مخصص",
    bg: "По избор",
    bn: "কাস্টম",
    bs: "Prilagođeno",
    cs: "Vlastní",
    da: "Brugerdefineret",
    de: "Benutzerdefiniert",
    el: "Προσαρμογή",
    "en-GB": "Custom",
    es: "Personalizado",
    "es-419": "Personalizado",
    et: "Kohandatud",
    eu: "Pertsonalizatua",
    fa: "سفارشی",
    fi: "Mukautettu",
    fr: "Personnalisé",
    "fr-CA": "Personnalisé",
    gl: "Personalizado",
    he: "מותאם אישית",
    hi: "कस्टम",
    hu: "Egyéni",
    hy: "Հատուկ",
    id: "Kustom",
    it: "Personalizzato",
    ja: "カスタム",
    ka: "მორგებული",
    ko: "사용자 지정",
    lt: "Pasirinktinis",
    lv: "Pielāgots",
    mk: "Прилагодено",
    nl: "Aangepast",
    nn: "Tilpasset",
    no: "Tilpasset",
    pl: "Własne",
    pt: "Personalizado",
    "pt-BR": "Personalizado",
    ro: "Personalizat",
    ru: "По выбору",
    sk: "Vlastné",
    sl: "Po meri",
    sr: "Прилагођено",
    sv: "Anpassad",
    th: "กำหนดเอง",
    tr: "Özel",
    uk: "Власне",
    ur: "اپنی مرضی کے مطابق",
    vi: "Tùy chỉnh",
    "zh-Hans": "自定义",
    "zh-Hant": "自訂"
  },
  position_group: {
    en: "Group",
    ar: "مجموعة",
    bg: "Група",
    bn: "গ্রুপ",
    bs: "Grupa",
    cs: "Skupina",
    da: "Gruppe",
    de: "Gruppe",
    el: "Ομάδα",
    "en-GB": "Group",
    es: "Grupo",
    "es-419": "Grupo",
    et: "Grupp",
    eu: "Taldea",
    fa: "گروه",
    fi: "Ryhmä",
    fr: "Groupe",
    "fr-CA": "Groupe",
    gl: "Grupo",
    he: "קבוצה",
    hi: "समूह",
    hu: "Csoport",
    hy: "Խումբ",
    id: "Grup",
    it: "Gruppo",
    ja: "グループ",
    ka: "ჯგუფი",
    ko: "그룹",
    lt: "Grupė",
    lv: "Grupa",
    mk: "Група",
    nl: "Groep",
    nn: "Gruppe",
    no: "Gruppe",
    pl: "Grupa",
    pt: "Grupo",
    "pt-BR": "Grupo",
    ro: "Grup",
    ru: "Группа",
    sk: "Skupina",
    sl: "Skupina",
    sr: "Група",
    sv: "Grupp",
    th: "กลุ่ม",
    tr: "Grup",
    uk: "Група",
    ur: "گروپ",
    vi: "Nhóm",
    "zh-Hans": "组",
    "zh-Hant": "群組"
  },
  position_direction: {
    en: "Direction",
    ar: "اتجاه",
    bg: "Посока",
    bn: "দিক",
    bs: "Smjer",
    cs: "Směr",
    da: "Retning",
    de: "Richtung",
    el: "Κατεύθυνση",
    "en-GB": "Direction",
    es: "Dirección",
    "es-419": "Dirección",
    et: "Suund",
    eu: "Norabidea",
    fa: "جهت",
    fi: "Suunta",
    fr: "Direction",
    "fr-CA": "Direction",
    gl: "Dirección",
    he: "כיוון",
    hi: "दिशा",
    hu: "Irány",
    hy: "Ուղղություն",
    id: "Arah",
    it: "Direzione",
    ja: "方向",
    ka: "მიმართულება",
    ko: "방향",
    lt: "Kryptis",
    lv: "Virziens",
    mk: "Правец",
    nl: "Richting",
    nn: "Retning",
    no: "Retning",
    pl: "Kierunek",
    pt: "Direção",
    "pt-BR": "Direção",
    ro: "Direcție",
    ru: "Направление",
    sk: "Smer",
    sl: "Smer",
    sr: "Правац",
    sv: "Riktning",
    th: "ทิศทาง",
    tr: "Yön",
    uk: "Напрямок",
    ur: "سمت",
    vi: "Hướng",
    "zh-Hans": "方向",
    "zh-Hant": "方向"
  },
  position_row: {
    en: "Row",
    ar: "صف",
    bg: "Ред",
    bn: "সারি",
    bs: "Red",
    cs: "Řádek",
    da: "Række",
    de: "Zeile",
    el: "Σειρά",
    "en-GB": "Row",
    es: "Fila",
    "es-419": "Fila",
    et: "Rida",
    eu: "Errenkada",
    fa: "ردیف",
    fi: "Rivi",
    fr: "Ligne",
    "fr-CA": "Ligne",
    gl: "Fila",
    he: "שורה",
    hi: "पंक्ति",
    hu: "Sor",
    hy: "Շարք",
    id: "Baris",
    it: "Riga",
    ja: "行",
    ka: "მწკრივი",
    ko: "행",
    lt: "Eilutė",
    lv: "Rinda",
    mk: "Ред",
    nl: "Rij",
    nn: "Rekke",
    no: "Rad",
    pl: "Wiersz",
    pt: "Linha",
    "pt-BR": "Linha",
    ro: "Rând",
    ru: "Строка",
    sk: "Riadok",
    sl: "Vrstica",
    sr: "Ред",
    sv: "Rad",
    th: "แถว",
    tr: "Satır",
    uk: "Рядок",
    ur: "قطار",
    vi: "Hàng",
    "zh-Hans": "行",
    "zh-Hant": "列"
  },
  position_column: {
    en: "Column",
    ar: "عمود",
    bg: "Колона",
    bn: "কলাম",
    bs: "Kolona",
    cs: "Sloupec",
    da: "Kolonne",
    de: "Spalte",
    el: "Στήλη",
    "en-GB": "Column",
    es: "Columna",
    "es-419": "Columna",
    et: "Veerg",
    eu: "Zutabe",
    fa: "ستون",
    fi: "Sarake",
    fr: "Colonne",
    "fr-CA": "Colonne",
    gl: "Columna",
    he: "עמודה",
    hi: "स्तंभ",
    hu: "Oszlop",
    hy: "Սյունակ",
    id: "Kolom",
    it: "Colonna",
    ja: "列",
    ka: "სვეტი",
    ko: "열",
    lt: "Stulpelis",
    lv: "Kolonna",
    mk: "Колона",
    nl: "Kolom",
    nn: "Kolonne",
    no: "Kolonne",
    pl: "Kolumna",
    pt: "Coluna",
    "pt-BR": "Coluna",
    ro: "Coloană",
    ru: "Столбец",
    sk: "Stĺpec",
    sl: "Stolpec",
    sr: "Колона",
    sv: "Kolumn",
    th: "คอลัมน์",
    tr: "Sütun",
    uk: "Стовпець",
    ur: "کالم",
    vi: "Cột",
    "zh-Hans": "列",
    "zh-Hant": "欄"
  },
  position_group_hint: {
    en: "Same group name = buttons are grouped together. Leave empty for default grouping.",
    ar: "اسم المجموعة نفسه = يتم تجميع الأزرار معًا. اتركه فارغًا للتجميع الافتراضي.",
    bg: "Едно и също име на група = бутоните са групирани заедно. Оставете празно за групиране по подразбиране.",
    bn: "একই গ্রুপের নাম = বোতামগুলি একসাথে গ্রুপ করা হয়। ডিফল্ট গ্রুপিংয়ের জন্য খালি রাখুন।",
    bs: "Isti naziv grupe = dugmad se grupiraju zajedno. Ostavite prazno za zadano grupisanje.",
    cs: "Stejný název skupiny = tlačítka jsou seskupena společně. Pro výchozí seskupení nechte prázdné.",
    da: "Samme gruppenavn = knapper er grupperet sammen. Lad feltet være tomt for standardgruppering.",
    de: "Gleicher Gruppenname = Buttons werden zusammen gruppiert. Für die Standardgruppierung leer lassen.",
    el: "Ίδιο όνομα ομάδας = τα κουμπιά ομαδοποιούνται μαζί. Αφήστε κενό για προεπιλεγμένη ομαδοποίηση.",
    "en-GB": "Same group name = buttons are grouped together. Leave empty for default grouping.",
    es: "El mismo nombre de grupo = los botones se agrupan entre sí. Déjalo vacío para la agrupación predeterminada.",
    "es-419": "El mismo nombre de grupo = los botones se agrupan entre sí. Déjalo vacío para la agrupación predeterminada.",
    et: "Sama grupinimi = nupud rühmitatakse koos. Jätke vaikimisi rühmitamise jaoks tühjaks.",
    eu: "Talde-izen bera = botoiak elkarrekin taldekatzen dira. Utzi hutsik lehenetsitako taldekatzerako.",
    fa: "نام گروه یکسان = دکمه‌ها با هم گروه‌بندی می‌شوند. برای گروه‌بندی پیش‌فرض خالی بگذارید.",
    fi: "Sama ryhmänimi = painikkeet ryhmitellään yhteen. Jätä tyhjäksi oletusryhmittelyä varten.",
    fr: "Même nom de groupe = les boutons sont regroupés. Laissez vide pour le regroupement par défaut.",
    "fr-CA": "Même nom de groupe = les boutons sont regroupés. Laissez vide pour le regroupement par défaut.",
    gl: "Mesmo nome de grupo = os botóns agrúpanse xuntos. Déixao baleiro para a agrupación por defecto.",
    he: "אותו שם קבוצה = הכפתורים מקובצים יחד. השאר ריק עבור קיבוץ ברירת מחדל.",
    hi: "समान समूह नाम = बटन एक साथ समूहबद्ध होते हैं। डिफ़ॉल्ट समूहीकरण के लिए खाली छोड़ें।",
    hu: "Azonos csoportnév = a gombok együtt csoportosulnak. Hagyja üresen az alapértelmezett csoportosításhoz.",
    hy: "Նույն խմբի անունը = կոճակները խմբավորվում են միասին։ Թողեք դատարկ լռելյայն խմբավորման համար։",
    id: "Nama grup yang sama = tombol dikelompokkan bersama. Biarkan kosong untuk pengelompokan default.",
    it: "Stesso nome di gruppo = i pulsanti vengono raggruppati insieme. Lascia vuoto per il raggruppamento predefinito.",
    ja: "同じグループ名 = ボタンがまとめてグループ化されます。デフォルトのグルーピングにするには空のままにします。",
    ka: "იგივე ჯგუფის სახელი = ღილაკები ერთად ჯგუფდება. დატოვეთ ცარიელი ნაგულისხმევი დაჯგუფებისთვის.",
    ko: "같은 그룹 이름 = 버튼이 함께 그룹화됩니다. 기본 그룹화를 위해 비워 두세요.",
    lt: "Tas pats grupės pavadinimas = mygtukai sugrupuojami kartu. Palikite tuščią numatytojo grupavimo atveju.",
    lv: "Vienāds grupas nosaukums = pogas tiek grupētas kopā. Atstājiet tukšu noklusējuma grupēšanai.",
    mk: "Исто име на група = копчињата се групирани заедно. Оставете празно за стандардно групирање.",
    nl: "Zelfde groepsnaam = knoppen worden samen gegroepeerd. Laat leeg voor standaardgroepering.",
    nn: "Samme gruppenamn = knappane blir grupperte saman. La feltet stå tomt for standardgruppering.",
    no: "Samme gruppenavn = knapper blir gruppert sammen. La feltet stå tomt for standardgruppering.",
    pl: "Ta sama nazwa grupy = przyciski są zgrupowane razem. Pozostaw puste do domyślnego grupowania.",
    pt: "O mesmo nome de grupo = os botões são agrupados juntos. Deixe vazio para agrupamento padrão.",
    "pt-BR": "O mesmo nome de grupo = os botões são agrupados juntos. Deixe vazio para o agrupamento padrão.",
    ro: "Același nume de grup = butoanele sunt grupate împreună. Lăsați gol pentru gruparea implicită.",
    ru: "Одно и то же имя группы = кнопки группируются вместе. Оставьте пустым для группировки по умолчанию.",
    sk: "Rovnaký názov skupiny = tlačidlá sú zoskupené spolu. Pre predvolené zoskupenie nechajte prázdne.",
    sl: "Enako ime skupine = gumbi so združeni skupaj. Pustite prazno za privzeto združevanje.",
    sr: "Исто име групе = дугмад се групишу заједно. Оставите празно за подразумевано груписање.",
    sv: "Samma gruppnamn = knappar grupperas tillsammans. Lämna tomt för standardgruppering.",
    th: "ชื่อกลุ่มเดียวกัน = ปุ่มจะถูกจัดกลุ่มเข้าด้วยกัน เว้นว่างไว้สำหรับการจัดกลุ่มเริ่มต้น",
    tr: "Aynı grup adı = düğmeler birlikte gruplanır. Varsayılan gruplama için boş bırakın.",
    uk: "Однакове ім'я групи = кнопки групуються разом. Залиште порожнім для групування за замовчуванням.",
    ur: "ایک ہی گروپ کا نام = بٹن ایک ساتھ گروپ کیے جاتے ہیں۔ ڈیفالٹ گروپنگ کے لیے خالی چھوڑیں۔",
    vi: "Tên nhóm giống nhau = các nút được nhóm lại với nhau. Để trống để nhóm mặc định.",
    "zh-Hans": "相同的组名 = 按钮分组在一起。留空以使用默认分组。",
    "zh-Hant": "相同的組名 = 按鈕會分組在一起。留空以使用預設分組。"
  },
  position_top: {
    en: "Top",
    ar: "الأعلى",
    bg: "Горе",
    bn: "উপরে",
    bs: "Gore",
    cs: "Nahoru",
    da: "Top",
    de: "Oben",
    el: "Πάνω",
    "en-GB": "Top",
    es: "Arriba",
    "es-419": "Arriba",
    et: "Üles",
    eu: "Goian",
    fa: "بالا",
    fi: "Ylös",
    fr: "Haut",
    "fr-CA": "Haut",
    gl: "Arriba",
    he: "למעלה",
    hi: "ऊपर",
    hu: "Fent",
    hy: "Վերև",
    id: "Atas",
    it: "Sopra",
    ja: "上",
    ka: "ზედა",
    ko: "위",
    lt: "Viršuje",
    lv: "Augšā",
    mk: "Горе",
    nl: "Boven",
    nn: "Topp",
    no: "Topp",
    pl: "Góra",
    pt: "Superior",
    "pt-BR": "Superior",
    ro: "Sus",
    ru: "Сверху",
    sk: "Hore",
    sl: "Zgoraj",
    sr: "Горе",
    sv: "Topp",
    th: "บน",
    tr: "Üst",
    uk: "Вгорі",
    ur: "اوپر",
    vi: "Trên",
    "zh-Hans": "上",
    "zh-Hant": "上"
  },
  position_right: {
    en: "Right",
    ar: "اليمين",
    bg: "Вдясно",
    bn: "ডান",
    bs: "Desno",
    cs: "Vpravo",
    da: "Højre",
    de: "Rechts",
    el: "Δεξιά",
    "en-GB": "Right",
    es: "Derecha",
    "es-419": "Derecha",
    et: "Paremal",
    eu: "Eskuinera",
    fa: "راست",
    fi: "Oikea",
    fr: "Droite",
    "fr-CA": "Droite",
    gl: "Dereita",
    he: "ימינה",
    hi: "दाएं",
    hu: "Jobbra",
    hy: "Աջ",
    id: "Kanan",
    it: "Destra",
    ja: "右",
    ka: "მარჯვნივ",
    ko: "오른쪽",
    lt: "Dešinėje",
    lv: "Pa labi",
    mk: "Десно",
    nl: "Rechts",
    nn: "Høgre",
    no: "Høyre",
    pl: "Prawo",
    pt: "Direita",
    "pt-BR": "Direita",
    ro: "Dreapta",
    ru: "Справа",
    sk: "Vpravo",
    sl: "Desno",
    sr: "Десно",
    sv: "Höger",
    th: "ขวา",
    tr: "Sağ",
    uk: "Праворуч",
    ur: "دائیں",
    vi: "Phải",
    "zh-Hans": "右",
    "zh-Hant": "右"
  },
  position_bottom: {
    en: "Bottom",
    ar: "الأسفل",
    bg: "Долу",
    bn: "নিচে",
    bs: "Dolje",
    cs: "Dole",
    da: "Bund",
    de: "Unten",
    el: "Κάτω",
    "en-GB": "Bottom",
    es: "Abajo",
    "es-419": "Abajo",
    et: "All",
    eu: "Behean",
    fa: "پایین",
    fi: "Alas",
    fr: "Bas",
    "fr-CA": "Bas",
    gl: "Abaixo",
    he: "למטה",
    hi: "नीचे",
    hu: "Lent",
    hy: "Ներքև",
    id: "Bawah",
    it: "Sotto",
    ja: "下",
    ka: "ქვედა",
    ko: "아래",
    lt: "Apačioje",
    lv: "Apakšā",
    mk: "Доле",
    nl: "Onder",
    nn: "Botn",
    no: "Bunn",
    pl: "Dół",
    pt: "Inferior",
    "pt-BR": "Inferior",
    ro: "Jos",
    ru: "Снизу",
    sk: "Dole",
    sl: "Spodaj",
    sr: "Доле",
    sv: "Botten",
    th: "ล่าง",
    tr: "Alt",
    uk: "Внизу",
    ur: "نیچے",
    vi: "Dưới",
    "zh-Hans": "下",
    "zh-Hant": "下"
  },
  position_left: {
    en: "Left",
    ar: "اليسار",
    bg: "Вляво",
    bn: "বাম",
    bs: "Lijevo",
    cs: "Vlevo",
    da: "Venstre",
    de: "Links",
    el: "Αριστερά",
    "en-GB": "Left",
    es: "Izquierda",
    "es-419": "Izquierda",
    et: "Vasakul",
    eu: "Ezkerrera",
    fa: "چپ",
    fi: "Vasen",
    fr: "Gauche",
    "fr-CA": "Gauche",
    gl: "Esquerda",
    he: "שמאלה",
    hi: "बाएं",
    hu: "Balra",
    hy: "Ձախ",
    id: "Kiri",
    it: "Sinistra",
    ja: "左",
    ka: "მარცხნივ",
    ko: "왼쪽",
    lt: "Kairėje",
    lv: "Pa kreisi",
    mk: "Лево",
    nl: "Links",
    nn: "Venstre",
    no: "Venstre",
    pl: "Lewo",
    pt: "Esquerda",
    "pt-BR": "Esquerda",
    ro: "Stânga",
    ru: "Слева",
    sk: "Vľavo",
    sl: "Levo",
    sr: "Лево",
    sv: "Vänster",
    th: "ซ้าย",
    tr: "Sol",
    uk: "Ліворуч",
    ur: "بائیں",
    vi: "Trái",
    "zh-Hans": "左",
    "zh-Hant": "左"
  },
  display_mode_text: {
    en: "Text",
    ar: "نص",
    bg: "Текст",
    bn: "পাঠ্য",
    bs: "Tekst",
    cs: "Text",
    da: "Tekst",
    de: "Text",
    el: "Κείμενο",
    "en-GB": "Text",
    es: "Texto",
    "es-419": "Texto",
    et: "Tekst",
    eu: "Testua",
    fa: "متن",
    fi: "Teksti",
    fr: "Texte",
    "fr-CA": "Texte",
    gl: "Texto",
    he: "טקסט",
    hi: "टेक्स्ट",
    hu: "Szöveg",
    hy: "Տեքստ",
    id: "Teks",
    it: "Testo",
    ja: "テキスト",
    ka: "ტექსტი",
    ko: "텍스트",
    lt: "Tekstas",
    lv: "Teksts",
    mk: "Текст",
    nl: "Tekst",
    nn: "Tekst",
    no: "Tekst",
    pl: "Tekst",
    pt: "Texto",
    "pt-BR": "Texto",
    ro: "Text",
    ru: "Текст",
    sk: "Text",
    sl: "Besedilo",
    sr: "Текст",
    sv: "Text",
    th: "ข้อความ",
    tr: "Metin",
    uk: "Текст",
    ur: "متن",
    vi: "Văn bản",
    "zh-Hans": "文本",
    "zh-Hant": "文字"
  },
  display_mode_icon: {
    en: "Icon",
    ar: "أيقونة",
    bg: "Икона",
    bn: "আইকন",
    bs: "Ikona",
    cs: "Ikona",
    da: "Ikon",
    de: "Symbol",
    el: "Εικονίδιο",
    "en-GB": "Icon",
    es: "Icono",
    "es-419": "Icono",
    et: "Ikoon",
    eu: "Ikonoa",
    fa: "آیکون",
    fi: "Kuvake",
    fr: "Icône",
    "fr-CA": "Icône",
    gl: "Icona",
    he: "סמל",
    hi: "आइकन",
    hu: "Ikon",
    hy: "Պատկերակ",
    id: "Ikon",
    it: "Icona",
    ja: "アイコン",
    ka: "ხატულა",
    ko: "아이콘",
    lt: "Piktograma",
    lv: "Ikona",
    mk: "Икона",
    nl: "Pictogram",
    nn: "Ikon",
    no: "Ikon",
    pl: "Ikona",
    pt: "Ícone",
    "pt-BR": "Ícone",
    ro: "Pictogramă",
    ru: "Иконка",
    sk: "Ikona",
    sl: "Ikona",
    sr: "Икона",
    sv: "Ikon",
    th: "ไอคอน",
    tr: "Simge",
    uk: "Іконка",
    ur: "آئیکن",
    vi: "Biểu tượng",
    "zh-Hans": "图标",
    "zh-Hant": "圖示"
  },
  display_mode_text_icon: {
    en: "Text + Icon",
    ar: "نص + أيقونة",
    bg: "Текст + Икона",
    bn: "পাঠ্য + আইকন",
    bs: "Tekst + Ikona",
    cs: "Text + Ikona",
    da: "Tekst + Ikon",
    de: "Text + Symbol",
    el: "Κείμενο + Εικονίδιο",
    "en-GB": "Text + Icon",
    es: "Texto + Icono",
    "es-419": "Texto + Icono",
    et: "Tekst + Ikoon",
    eu: "Testua + Ikonoa",
    fa: "متن + آیکون",
    fi: "Teksti + Kuvake",
    fr: "Texte + Icône",
    "fr-CA": "Texte + Icône",
    gl: "Texto + Icona",
    he: "טקסט + סמל",
    hi: "टेक्स्ट + आइकन",
    hu: "Szöveg + Ikon",
    hy: "Տեքստ + Պատկերակ",
    id: "Teks + Ikon",
    it: "Testo + Icona",
    ja: "テキスト + アイコン",
    ka: "ტექსტი + ხატულა",
    ko: "텍스트 + 아이콘",
    lt: "Tekstas + Piktograma",
    lv: "Teksts + Ikona",
    mk: "Текст + Икона",
    nl: "Tekst + Pictogram",
    nn: "Tekst + Ikon",
    no: "Tekst + Ikon",
    pl: "Tekst + Ikona",
    pt: "Texto + Ícone",
    "pt-BR": "Texto + Ícone",
    ro: "Text + Pictogramă",
    ru: "Текст + Иконка",
    sk: "Text + Ikona",
    sl: "Besedilo + Ikona",
    sr: "Текст + Икона",
    sv: "Text + Ikon",
    th: "ข้อความ + ไอคอน",
    tr: "Metin + Simge",
    uk: "Текст + Іконка",
    ur: "متن + آئیکن",
    vi: "Văn bản + Biểu tượng",
    "zh-Hans": "文本 + 图标",
    "zh-Hant": "文字 + 圖示"
  },
  position: {
    en: "Position",
    ar: "الموقع",
    bg: "Позиция",
    bn: "অবস্থান",
    bs: "Pozicija",
    cs: "Pozice",
    da: "Position",
    de: "Position",
    el: "Θέση",
    "en-GB": "Position",
    es: "Posición",
    "es-419": "Posición",
    et: "Asend",
    eu: "Kokapena",
    fa: "موقعیت",
    fi: "Sijainti",
    fr: "Position",
    "fr-CA": "Position",
    gl: "Posición",
    he: "מיקום",
    hi: "स्थिति",
    hu: "Pozíció",
    hy: "Դիրք",
    id: "Posisi",
    it: "Posizione",
    ja: "位置",
    ka: "პოზიცია",
    ko: "위치",
    lt: "Pozicija",
    lv: "Pozīcija",
    mk: "Позиција",
    nl: "Positie",
    nn: "Posisjon",
    no: "Posisjon",
    pl: "Pozycja",
    pt: "Posição",
    "pt-BR": "Posição",
    ro: "Poziție",
    ru: "Позиция",
    sk: "Pozícia",
    sl: "Položaj",
    sr: "Позиција",
    sv: "Position",
    th: "ตำแหน่ง",
    tr: "Konum",
    uk: "Позиція",
    ur: "پوزیشن",
    vi: "Vị trí",
    "zh-Hans": "位置",
    "zh-Hant": "位置"
  },
  display_mode: {
    en: "Display Mode",
    ar: "وضع العرض",
    bg: "Режим на показване",
    bn: "প্রদর্শন মোড",
    bs: "Režim prikaza",
    cs: "Režim zobrazení",
    da: "Visningstilstand",
    de: "Anzeigemodus",
    el: "Λειτουργία εμφάνισης",
    "en-GB": "Display Mode",
    es: "Modo de visualización",
    "es-419": "Modo de visualización",
    et: "Kuvamisrežiim",
    eu: "Bistatze modua",
    fa: "حالت نمایش",
    fi: "Näyttötila",
    fr: "Mode d'affichage",
    "fr-CA": "Mode d'affichage",
    gl: "Modo de visualización",
    he: "מצב תצוגה",
    hi: "प्रदर्शन मोड",
    hu: "Megjelenítési mód",
    hy: "Ցուցադրման ռեժիմ",
    id: "Mode Tampilan",
    it: "Modalità di visualizzazione",
    ja: "表示モード",
    ka: "ჩვენების რეჟიმი",
    ko: "표시 모드",
    lt: "Rodymo režimas",
    lv: "Attēlošanas režīms",
    mk: "Режим на прикажување",
    nl: "Weergavemodus",
    nn: "Visningsmodus",
    no: "Visningsmodus",
    pl: "Tryb wyświetlania",
    pt: "Modo de exibição",
    "pt-BR": "Modo de exibição",
    ro: "Mod de afișare",
    ru: "Режим отображения",
    sk: "Režim zobrazenia",
    sl: "Način prikaza",
    sr: "Режим приказа",
    sv: "Visningsläge",
    th: "โหมดการแสดงผล",
    tr: "Görüntüleme Modu",
    uk: "Режим відображення",
    ur: "ڈسپلے موڈ",
    vi: "Chế độ hiển thị",
    "zh-Hans": "显示模式",
    "zh-Hant": "顯示模式"
  },
  popup_card: {
    en: "Change Popup Card Type",
    ar: "تغيير نوع بطاقة النافذة المنبثقة",
    bg: "Промяна на типа на изскачащата карта",
    bn: "পপআপ কার্ডের ধরন পরিবর্তন করুন",
    bs: "Promijeni tip popup kartice",
    cs: "Změnit typ vyskakovací karty",
    da: "Skift popup-korttype",
    de: "Popup-Kartentyp ändern",
    el: "Αλλαγή τύπου αναδυόμενης κάρτας",
    "en-GB": "Change Popup Card Type",
    es: "Cambiar el tipo de tarjeta emergente",
    "es-419": "Cambiar el tipo de tarjeta emergente",
    et: "Muuda hüpikakna kaardi tüüpi",
    eu: "Aldatu popup txartel mota",
    fa: "تغییر نوع کارت پاپ‌آپ",
    fi: "Muuta ponnahduskortin tyyppiä",
    fr: "Changer le type de carte contextuelle",
    "fr-CA": "Changer le type de carte contextuelle",
    gl: "Cambiar o tipo de tarxeta emerxente",
    he: "שנה את סוג כרטיס החלון הקופץ",
    hi: "पॉपअप कार्ड का प्रकार बदलें",
    hu: "Felugró kártya típusának módosítása",
    hy: "Փոփոխել popup քարտի տեսակը",
    id: "Ubah Jenis Kartu Popup",
    it: "Cambia il tipo di carta popup",
    ja: "ポップアップカードの種類を変更",
    ka: "პოპაპ ბარათის ტიპის შეცვლა",
    ko: "팝업 카드 유형 변경",
    lt: "Keisti iškylančios kortelės tipą",
    lv: "Mainīt uznirstošās kartītes veidu",
    mk: "Промени типот на поп-ап картичката",
    nl: "Popup-kaarttype wijzigen",
    nn: "Endre popup-korttype",
    no: "Endre popup-korttype",
    pl: "Zmień typ wyskakującej karty",
    pt: "Alterar o tipo de cartão pop-up",
    "pt-BR": "Alterar o tipo de cartão pop-up",
    ro: "Schimbă tipul cardului popup",
    ru: "Изменить тип всплывающей карточки",
    sk: "Zmeniť typ vyskakovacej karty",
    sl: "Spremeni vrsto pojavne kartice",
    sr: "Промени тип искачуће картице",
    sv: "Ändra popup-korttyp",
    th: "เปลี่ยนประเภทของการ์ดป๊อปอัป",
    tr: "Pop-up Kart Türünü Değiştir",
    uk: "Змінити тип спливаючої картки",
    ur: "پاپ اپ کارڈ کی قسم تبدیل کریں",
    vi: "Thay đổi loại thẻ bật lên",
    "zh-Hans": "更改弹出卡片类型",
    "zh-Hant": "更改彈出卡片類型"
  },
  show_set_temperature: {
    en: "Show Set Temperature",
    ar: "إظهار درجة الحرارة المحددة",
    bg: "Показване на зададената температура",
    bn: "সেট তাপমাত্রা দেখান",
    bs: "Prikaži zadanu temperaturu",
    cs: "Zobrazit nastavenou teplotu",
    da: "Vis indstillet temperatur",
    de: "Zeige Solltemperatur",
    el: "Εμφάνιση καθορισμένης θερμοκρασίας",
    "en-GB": "Show Set Temperature",
    es: "Mostrar temperatura establecida",
    "es-419": "Mostrar temperatura establecida",
    et: "Kuva seatud temperatuuri",
    eu: "Erakutsi ezarritako tenperatura",
    fa: "نمایش دمای تنظیم‌شده",
    fi: "Näytä asetettu lämpötila",
    fr: "Afficher la température de consigne",
    "fr-CA": "Afficher la température de consigne",
    gl: "Amosar a temperatura definida",
    he: "הצג טמפרטורה מוגדרת",
    hi: "सेट तापमान दिखाएं",
    hu: "Beállított hőmérséklet megjelenítése",
    hy: "Ցուցադրել սահմանված ջերմաստիճանը",
    id: "Tampilkan Suhu yang Disetel",
    it: "Mostra temperatura impostata",
    ja: "設定温度を表示",
    ka: "საჭირო ტემპერატურის ჩვენება",
    ko: "설정 온도 표시",
    lt: "Rodyti nustatytą temperatūrą",
    lv: "Rādīt iestatīto temperatūru",
    mk: "Прикажи поставена температура",
    nl: "Ingestelde temperatuur weergeven",
    nn: "Vis innstilt temperatur",
    no: "Vis innstilt temperatur",
    pl: "Pokaż zadaną temperaturę",
    pt: "Mostrar temperatura definida",
    "pt-BR": "Mostrar temperatura definida",
    ro: "Afișează temperatura setată",
    ru: "Показать заданную температуру",
    sk: "Zobraziť nastavenú teplotu",
    sl: "Prikaži nastavljeno temperaturo",
    sr: "Прикажи подешену температуру",
    sv: "Visa inställd temperatur",
    th: "แสดงอุณหภูมิที่ตั้งไว้",
    tr: "Ayarlanan Sıcaklığı Göster",
    uk: "Показати задану температуру",
    ur: "سیٹ درجہ حرارت دکھائیں",
    vi: "Hiển thị nhiệt độ đặt",
    "zh-Hans": "显示设定温度",
    "zh-Hant": "顯示設定溫度"
  }
};
function R(t, e) {
  const i = Sn[t];
  return i ? i[e] ? i[e] : i.en ? i.en : t : t;
}
function hs(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
const wn = [
  "area_name",
  "area_icon",
  "area_name_color",
  "area_icon_color",
  "hide_unavailable",
  "show_active",
  "extra_entities",
  "hidden_entities",
  "edit_filters",
  "label_filter",
  "ungroup_areas",
  "popup_domains",
  "wrap_sensor_icons",
  "category_filter",
  "mirrored",
  "popup_sort",
  "camera_mode",
  "camera_auto_interval",
  "add_custom_button",
  "color",
  "edit_content"
];
function Ms(t, e) {
  if (wn.includes(e.name))
    return R(
      e.name,
      t.locale.language
    );
  switch (e.name) {
    case "theme":
      return `${t.localize(
        "ui.panel.lovelace.editor.card.generic.theme"
      )} (${t.localize("ui.panel.lovelace.editor.card.config.optional")})`;
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
    case "columns":
      return t.localize("ui.components.grid-size-picker.columns");
    case "appearance":
      return t.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance";
    case "toggle_domains":
      return t.localize("ui.panel.lovelace.editor.cardpicker.domain");
    case "popup":
      return "Popup";
    case "cover_classes":
      return t.localize("component.cover.entity_component._.name");
    case "alert_color":
      return `${t.localize("ui.panel.lovelace.editor.card.area.alert_classes") || "Alert"} ${R("color", t.locale.language)}`;
    case "sensor_color":
      return `${t.localize("ui.panel.lovelace.editor.card.area.sensor_classes") || "Sensor"} ${R("color", t.locale.language)}`;
    case "domain_color":
      return `${t.localize("ui.panel.lovelace.editor.cardpicker.domain") || "Domain"} ${R("color", t.locale.language)}`;
    case "cover_color":
      return `${t.localize("component.cover.entity_component._.name") || "Cover"} ${R("color", t.locale.language)}`;
    case "label":
      return t.localize("ui.components.label-picker.label");
    case "show_sensor_icons":
      return t.localize("ui.panel.lovelace.editor.card.generic.show_icon");
    case "name":
      return t.localize("ui.common.name");
    case "state":
      return t.localize("ui.components.entity.entity-state-picker.state");
    case "show_icon":
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
    case "camera_view":
      return t.localize(
        `ui.panel.lovelace.editor.card.generic.${e.name}`
      );
    case "camera_entity":
      return t.localize(
        "ui.panel.lovelace.editor.card.area.display_type_options.camera"
      );
    case "camera_entity_left":
      return t.localize(
        "ui.panel.lovelace.editor.card.area.display_type_options.camera"
      ) + ` (${R("position_left", t.locale.language)})`;
    case "camera_entity_right":
      return t.localize(
        "ui.panel.lovelace.editor.card.area.display_type_options.camera"
      ) + ` (${R("position_right", t.locale.language)})`;
    default:
      return t.localize(
        `ui.panel.lovelace.editor.card.area.${e.name}`
      );
  }
}
const Ht = (t, e) => {
  var i, s;
  return ((s = (i = t == null ? void 0 : t[e]) == null ? void 0 : i.attributes) == null ? void 0 : s.friendly_name) || e;
}, Ve = (t, e) => (i, s) => bn(
  Ht(t, i),
  Ht(t, s),
  e
), re = L(
  (t, e) => {
    const i = /* @__PURE__ */ new Map(), s = (a, o) => {
      i.has(a) || i.set(a, /* @__PURE__ */ new Set()), i.get(a).add(o);
    };
    for (const a of Object.values(t))
      if (a.area_id)
        s(a.area_id, a.entity_id);
      else if (a.device_id) {
        const o = e[a.device_id];
        o && o.area_id && s(o.area_id, a.entity_id);
      }
    return i;
  }
), le = L(
  (t, e, i, s, a, o) => {
    let n = [];
    return o && o.has(t) ? n = Array.from(o.get(t)) : n = Object.values(i).filter((r) => {
      if (!r.area_id && !r.device_id) return !1;
      if (r.area_id) {
        if (r.area_id !== t) return !1;
      } else if (!e.has(r.device_id)) return !1;
      return !0;
    }).map((r) => r.entity_id), n.filter((r) => {
      const l = i[r];
      return !l || l.hidden || s.has(r) ? !1 : Array.isArray(a) && a.length > 0 ? l.labels && l.labels.some((c) => a.includes(c)) : !0;
    });
  }
), ce = L(
  (t, e) => new Set(
    t && e ? Object.values(e).reduce((i, s) => (s.area_id === t && i.push(s.id), i), []) : []
  )
), Vt = L(
  (t, e) => (Array.isArray(e) ? e : e ? Object.values(e) : []).find((s) => s.area_id === t) || null
), $e = (t, e, i) => {
  if (!i) return !0;
  const s = e == null ? void 0 : e[t];
  if (!s) return !0;
  const a = typeof s.entity_category == "string" ? s.entity_category : null;
  if (!a) return !0;
  switch (i) {
    case "config":
      return a !== "config";
    case "diagnostic":
      return a !== "diagnostic";
    case "config+diagnostic":
      return a !== "config" && a !== "diagnostic";
    default:
      return !0;
  }
}, us = (t, e, i, s, a) => {
  if (!i || i.length === 0)
    return;
  let o;
  const n = i.filter((d) => !mn(d) || isNaN(Number(d.state)) ? !1 : o ? d.attributes.unit_of_measurement === o : (o = d.attributes.unit_of_measurement, !0));
  if (!n.length)
    return;
  const r = n.reduce((d, h) => d + Number(h.state), 0);
  let l;
  if (a)
    for (const d of n) {
      const h = a[d.entity_id], f = _n(d, h);
      (f == null ? void 0 : f.maximumFractionDigits) != null && (l == null || f.maximumFractionDigits > l) && (l = f.maximumFractionDigits);
    }
  l == null && (l = 1);
  const c = {
    maximumFractionDigits: l
  };
  return e === "power" ? `${ns(r, s, c)}${o ? ls(o, s) : ""}${o || ""}` : `${ns(r / n.length, s, c)}${o ? ls(o, s) : ""}${o || ""}`;
}, ps = (t, e, i) => {
  if (t in Be) {
    const s = Be[t];
    if (i && typeof s == "object") {
      const a = s[i];
      if (a) {
        if (typeof a == "string") return a;
        if (typeof a == "object" && "on" in a && "off" in a)
          return e ? a.on : a.off;
      }
    }
    if (typeof s == "object" && "on" in s && "off" in s)
      return e ? s.on : s.off;
    if (typeof s == "string") return s;
  }
  return "";
}, Ye = (t, e) => {
  var s, a;
  const i = /* @__PURE__ */ new Map();
  if (!t) return i;
  for (const o of t) {
    const n = { ...o };
    n.styles = { ...o.styles || {} }, o.css && (n.styles.card = o.css), o.icon_css && (n.styles.icon = o.icon_css), (s = n.styles) != null && s.card && (n._parsedCss = e(n.styles.card)), (a = n.styles) != null && a.icon && (n._parsedIconCss = e(n.styles.icon)), i.set(n.type, n);
  }
  return i;
};
var xn = Object.defineProperty, he = (t, e, i, s) => {
  for (var a = void 0, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = n(e, i, a) || a);
  return a && xn(e, i, a), a;
};
const En = /* @__PURE__ */ new Set(), zn = [te, ee], Rt = class Rt extends Y {
  constructor() {
    super(...arguments), this._onPopState = (e) => {
      var i;
      this.open && !((i = window.history.state) != null && i.areaCardPlusPopup) && (this.open = !1);
    }, this.open = !1, this.content = "", this.entities = [], this._opener = null, this._cardEls = /* @__PURE__ */ new Map(), this._handleMoreInfo = (e) => {
      if (this._opener) {
        e.stopPropagation();
        const i = new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: e.detail
        });
        this._opener.dispatchEvent(i);
      }
    }, this._close = () => {
      var e;
      this.open && (this.open = !1, (e = window.history.state) != null && e.areaCardPlusPopup && window.history.back());
    }, this._onDialogClosed = (e) => {
      const i = e.target;
      i && i.tagName !== "HA-ADAPTIVE-DIALOG" || (this.open = !1, this._cardEls.clear(), this.dispatchEvent(
        new CustomEvent("dialog-closed", {
          bubbles: !0,
          composed: !0,
          detail: { dialog: this }
        })
      ));
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
    }, this._getCandidateEntityIds = L(
      (e, i, s, a, o, n, r) => {
        const l = new Set(
          (i == null ? void 0 : i.hidden_entities) || []
        ), c = le(
          s,
          a,
          e,
          l,
          i == null ? void 0 : i.label,
          r
        ), d = i == null ? void 0 : i.category_filter, h = (f) => $e(f, e, d);
        return c.filter((f) => {
          if (!h(f)) return !1;
          const u = j(f);
          return !(o.length > 0 && !o.includes(u) || n && u !== n);
        });
      }
    ), this.computeLabel = L(
      (e, i, s) => Ms(this.hass, e)
    );
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState), this._cardEls.clear();
  }
  async showDialog(e) {
    this.title = e.title ?? this.title, this.hass = e.hass, this._opener = e.opener, this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.selectedGroup = e.selectedGroup, this.card = e.card, this._cardEls.clear(), this.open = !0, window.history.pushState({ areaCardPlusPopup: !0 }, ""), this.requestUpdate();
    try {
      await this.updateComplete;
    } catch {
    }
    const i = this.renderRoot.querySelector("ha-adaptive-dialog");
    if (i && i.shadowRoot) {
      const s = i.shadowRoot.querySelector("ha-bottom-sheet");
      s && (s.style.removeProperty("--dialog-transform"), s.style.removeProperty("--dialog-transition"));
    }
  }
  _toTileConfig(e) {
    return {
      type: "tile",
      entity: e.entity
    };
  }
  async _createCardElement(e, i, s = !1) {
    var a, o, n;
    try {
      const r = await ((a = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : a.call(window));
      if (r != null && r.createCardElement) {
        const l = r.createCardElement(i);
        return l.hass = e, (o = l.setAttribute) == null || o.call(l, "data-hui-card", ""), l;
      }
    } catch {
    }
    try {
      const r = i.type || "tile", l = typeof r == "string" && r.startsWith("custom:"), c = l ? r.slice(7) : `hui-${r}-card`;
      l && !customElements.get(c) && await customElements.whenDefined(c).catch(() => {
      });
      const d = document.createElement(c);
      return typeof d.setConfig == "function" && d.setConfig(i), d.hass = e, (n = d.setAttribute) == null || n.call(d, "data-hui-card", ""), d;
    } catch {
      if (!s)
        return this._createCardElement(
          e,
          this._toTileConfig(i),
          !0
        );
      const r = document.createElement("div");
      return r.setAttribute("data-hui-card", ""), r;
    }
  }
  _getPopupCardConfig(e) {
    var u, m, p, g, y, V, H, v, A, M, z;
    const i = this.card, s = j(e.entity_id), a = this.selectedDomain || s, o = this.selectedDomain ? this.selectedDeviceClass : (g = (p = (m = (u = this.hass) == null ? void 0 : u.states) == null ? void 0 : m[e.entity_id]) == null ? void 0 : p.attributes) == null ? void 0 : g.device_class, n = (i == null ? void 0 : i._config) || {};
    let r;
    Dt.includes(a) ? (r = (y = n.customization_alert) == null ? void 0 : y.find(
      ($) => $.type === o
    ), r || (r = (V = n.customization_domain) == null ? void 0 : V.find(
      ($) => $.type === a
    ))) : jt.includes(a) ? (r = (H = n.customization_sensor) == null ? void 0 : H.find(
      ($) => $.type === o
    ), r || (r = (v = n.customization_domain) == null ? void 0 : v.find(
      ($) => $.type === a
    ))) : Tt.includes(a) ? (r = (A = n.customization_cover) == null ? void 0 : A.find(
      ($) => $.type === o
    ), r || (r = (M = n.customization_domain) == null ? void 0 : M.find(
      ($) => $.type === a
    ))) : r = (z = n.customization_domain) == null ? void 0 : z.find(
      ($) => $.type === a
    );
    const l = r == null ? void 0 : r.popup_card, c = l && typeof l.type == "string" && l.type || (r == null ? void 0 : r.popup_card_type) || "tile", d = c === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let h = {};
    if (l && typeof l == "object") {
      const { type: $, entity: b, ...w } = l;
      h = w;
    } else
      h = (r == null ? void 0 : r.popup_card_options) ?? {};
    return {
      type: c,
      entity: e.entity_id,
      ...d,
      ...h
    };
  }
  _getAreaEntitiesContext() {
    var n;
    const e = this.card, i = (n = e._config) == null ? void 0 : n.area, s = e._devices && Array.isArray(e._devices) ? e._devices : e.hass && e.hass.devices ? e.hass.devices : {}, a = this.hass && this.hass.devices && this.hass.entities ? re(this.hass.entities, this.hass.devices) : void 0, o = a ? En : ce(i, s);
    return { areaId: i, devicesArr: s, entitiesIndex: a, devicesInArea: o };
  }
  shouldUpdate(e) {
    var c, d;
    if (e.has("open") || e.has("card"))
      return !0;
    if (!this.open)
      return !1;
    if (e.has("selectedDomain") || e.has("selectedDeviceClass") || e.has("selectedGroup") || e.has("entities") || e.has("content"))
      return !0;
    if (!e.has("hass"))
      return !1;
    const i = e.get("hass");
    if (!i || i.themes !== this.hass.themes || i.locale !== this.hass.locale)
      return !0;
    const s = this.card;
    if (!s) return !1;
    const { areaId: a, devicesInArea: o, entitiesIndex: n } = this._getAreaEntitiesContext(), r = this._getCandidateEntityIds(
      this.hass.entities,
      s._config,
      a,
      o,
      ((c = s._config) == null ? void 0 : c.popup_domains) || [],
      this.selectedDomain || null,
      n
    ), l = ((d = s._config) == null ? void 0 : d.extra_entities) || [];
    for (const h of r)
      if (!i.states[h] || i.states[h] !== this.hass.states[h])
        return !0;
    for (const h of l)
      if (!i.states[h] || i.states[h] !== this.hass.states[h])
        return !0;
    return !1;
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
    const a = document.createElement("div");
    a.classList.add("card-placeholder"), a.setAttribute("data-hui-card", ""), this._cardEls.set(i, a);
    const o = this._getPopupCardConfig(e);
    return this._createCardElement(this.hass, o).then((n) => {
      try {
        this._cardEls.get(i) === a && (a.replaceWith(n), this._cardEls.set(i, n)), n.hass = this.hass;
      } catch {
      }
    }), a;
  }
  _isActive(e) {
    return !zn.flat().includes(e.state);
  }
  sortEntitiesForPopup(e) {
    var o, n;
    const i = ((n = (o = this.card) == null ? void 0 : o._config) == null ? void 0 : n.popup_sort) || "name", s = e.slice();
    if (i === "state") {
      const r = Ve(
        this.hass.states,
        this.hass.locale.language
      );
      return s.sort((l, c) => {
        const d = this._isActive(l) ? 0 : 1, h = this._isActive(c) ? 0 : 1;
        if (d !== h) return d - h;
        const f = j(l.entity_id), u = j(c.entity_id), m = this.hass ? hs(this.hass, l.state, f) : l.state, p = this.hass ? hs(this.hass, c.state, u) : c.state, g = (m || "").localeCompare(p || "");
        return g !== 0 ? g : r(l.entity_id, c.entity_id);
      });
    }
    const a = Ve(
      this.hass.states,
      this.hass.locale.language
    );
    return s.sort((r, l) => a(r.entity_id, l.entity_id));
  }
  render() {
    var A, M, z, $, b, w, I, D, P;
    if (!this.hass || !this.card) return _``;
    const e = this.card, { areaId: i, devicesInArea: s, entitiesIndex: a } = this._getAreaEntitiesContext(), o = this.hass.states, n = ((A = e._config) == null ? void 0 : A.popup_domains) || [], r = ((M = e._config) == null ? void 0 : M.extra_entities) || [], l = (z = e._config) == null ? void 0 : z.hide_unavailable, c = ($ = e._config) == null ? void 0 : $.category_filter, d = this.selectedDomain || null, h = this.selectedDeviceClass || null, f = (k) => $e(k, this.hass.entities, c);
    let u = [];
    this.entities && this.entities.length > 0 ? u = this.entities.reduce((k, E) => {
      const S = E.entity_id;
      if (!f(S)) return k;
      const B = j(S);
      return n.length > 0 && !n.includes(B) || d && B !== d || k.push(S), k;
    }, []) : u = this._getCandidateEntityIds(
      this.hass.entities,
      e._config,
      i,
      s,
      n,
      d,
      a
    );
    let m = [];
    for (const k of u) {
      const E = o[k];
      E && (l && te.includes(E.state) || h && E.attributes.device_class !== h || m.push(E));
    }
    for (const k of r) {
      const E = j(k), S = o[k];
      S && (n.length > 0 && !n.includes(E) || d && E !== d || h && S.attributes.device_class !== h || f(k) && !m.some((B) => B.entity_id === k) && m.push(S));
    }
    const p = ((b = e == null ? void 0 : e._config) == null ? void 0 : b.ungroup_areas) === !0;
    let g = (w = e._config) != null && w.columns ? e._config.columns : 4, y = [], V = [];
    if (p)
      V = this.sortEntitiesForPopup(m), g = Math.min(g, Math.max(1, V.length));
    else {
      const k = {};
      for (const N of m) {
        const W = j(N.entity_id);
        W in k || (k[W] = []), k[W].push(N);
      }
      const E = Object.keys(Be || {}), S = n.length > 0 ? n : E;
      y = Object.entries(k).filter(([N]) => !d || N === d).sort(([N], [W]) => {
        const xe = S.indexOf(N), Ee = S.indexOf(W);
        return (xe === -1 ? S.length : xe) - (Ee === -1 ? S.length : Ee);
      }).map(
        ([N, W]) => [N, this.sortEntitiesForPopup(W)]
      );
      const B = y.length ? Math.max(...y.map(([, N]) => N.length)) : 0;
      g = Math.min(g, Math.max(1, B));
    }
    if (this.style.setProperty("--columns", String(g)), !(y.length > 0 || V.length > 0))
      return _`
        <ha-adaptive-dialog
          .hass=${this.hass}
          .open=${this.open}
          @closed=${this._onDialogClosed}
        >
          <ha-icon-button
            slot="headerNavigationIcon"
            .path=${at}
            @click=${this._close}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <span slot="headerTitle">${this.title}</span>
          <div class="content dialog-content" style="padding: 16px;">
            ${this.content || this.hass.localize("ui.panel.lovelace.cards.entity.no_entities") || "No entities"}
          </div>
        </ha-adaptive-dialog>
      `;
    const v = Vt((I = e._config) == null ? void 0 : I.area, (D = e.hass) == null ? void 0 : D.areas) ?? null;
    return _`
      <ha-adaptive-dialog
        .hass=${this.hass}
        .open=${this.open}
        @closed=${this._onDialogClosed}
        flexcontent
      >
        <ha-icon-button
          slot="headerNavigationIcon"
          .path=${at}
          @click=${this._close}
          .label=${this.hass.localize("ui.common.close")}
        ></ha-icon-button>
        <span slot="headerTitle">
          ${((P = e._config) == null ? void 0 : P.area_name) || v && v.name}
        </span>
        <div class="dialog-content scrollable ha-scrollbar" @hass-more-info=${this._handleMoreInfo}>
          ${p ? _`
                  <div class="cards-wrapper">
                    <div class="entity-cards">
                      ${V.map(
      (k) => _`
                          <div class="entity-card">
                            ${this._getOrCreateCard(k)}
                          </div>
                        `
    )}
                    </div>
                  </div>
                ` : _`${ie(
      y,
      ([k]) => k,
      ([k, E]) => _`
                    <div class="cards-wrapper">
                      <h4>
                        ${k === "binary_sensor" || k === "sensor" || k === "cover" ? this._getDomainName(
        k,
        h || void 0
      ) : this._getDomainName(k)}
                      </h4>
                      <div class="entity-cards">
                        ${ie(
        E,
        (S) => S.entity_id,
        (S) => _`
                            <div class="entity-card">
                              ${this._getOrCreateCard(S)}
                            </div>
                          `
      )}
                      </div>
                    </div>
                  `
    )}`}
        </div>
      </ha-adaptive-dialog>
    `;
  }
  _getDomainName(e, i) {
    return this.hass ? e === "scene" ? "Scene" : e === "binary_sensor" || e === "sensor" || e === "cover" ? i ? this.hass.localize(
      `component.${e}.entity_component.${i}.name`
    ) : this.hass.localize(`component.${e}.entity_component._.name`) : this.hass.localize(`component.${e}.entity_component._.name`) : e;
  }
};
Rt.styles = Se`
    :host {
      display: block;
      --responsive-columns: var(--columns, 4);
    }
    :host([hidden]) {
      display: none;
    }

    ha-adaptive-dialog {
      --dialog-content-padding: 12px;
      --ha-dialog-max-width: 96vw !important;
      --ha-dialog-width-md: calc((var(--responsive-columns) * 22.5vw) + 3vw) !important;
      --ha-bottom-sheet-height: calc(100dvh - max(var(--safe-area-inset-top), 48px)) !important;
      --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height) !important;
    }

    .dialog-content.scrollable {
      margin-bottom: 16px;
      max-height: 80vh;
      overflow-y: auto;
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
      grid-template-columns: repeat(var(--responsive-columns), 1fr);
      gap: 8px;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      justify-content: center;
      padding: 8px;
    }
    .entity-card {
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }


    @media (max-width: 1200px) {
      :host {
        --responsive-columns: min(var(--columns, 4), 3);
      }
      ha-adaptive-dialog {
        --ha-dialog-width-md: calc((var(--responsive-columns) * 44.5vw) + 3vw) !important;
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
      :host {
        --responsive-columns: min(var(--columns, 4), 2);
      }
      ha-adaptive-dialog {
        --ha-dialog-width-md: calc((var(--responsive-columns) * 29.5vw) + 3vw) !important;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 1em;
        box-sizing: border-box;
      }
    }

    @media (max-width: 600px) {
      :host {
        --responsive-columns: 1;
      }
      ha-adaptive-dialog {
        --dialog-content-padding: 8px;
        --ha-dialog-width-md: 100vw !important;
      }
      .cards-wrapper {
        align-items: stretch;
        width: 100%;
        overflow-x: hidden;
      }
      .entity-cards {
        grid-template-columns: 1fr;
        width: 100%;
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
let U = Rt;
he([
  O({ type: Boolean })
], U.prototype, "open");
he([
  O({ type: String })
], U.prototype, "selectedDomain");
he([
  O({ type: String })
], U.prototype, "selectedDeviceClass");
he([
  O({ type: String })
], U.prototype, "content");
he([
  O({ type: Array })
], U.prototype, "entities");
he([
  O({ attribute: !1 })
], U.prototype, "hass");
he([
  O({ attribute: !1 })
], U.prototype, "card");
he([
  Z()
], U.prototype, "selectedGroup");
customElements.define("area-card-plus-popup", U);
var Pn = Object.defineProperty, On = Object.getOwnPropertyDescriptor, ue = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? On(e, i) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = (s ? n(e, i, a) : n(a)) || a);
  return s && a && Pn(e, i, a), a;
};
const ms = /* @__PURE__ */ new Set();
let se = class extends Y {
  constructor() {
    super(...arguments), this.selectedDomain = null, this.selectedDeviceClass = null, this.selectedGroup = null, this._currentCameraIndex = 0, this._iconCache = /* @__PURE__ */ new Map(), this._styleCache = /* @__PURE__ */ new Map(), this._deviceClasses = Lt, this._customizationDomainMap = /* @__PURE__ */ new Map(), this._customizationCoverMap = /* @__PURE__ */ new Map(), this._customizationAlertMap = /* @__PURE__ */ new Map(), this._customizationSensorMap = /* @__PURE__ */ new Map(), this._actionHandlerCache = /* @__PURE__ */ new Map(), this._hiddenEntitiesSet = /* @__PURE__ */ new Set(), this._excludedEntitiesSet = /* @__PURE__ */ new Set(), this._getOrganizedEntities = L(
      (t, e, i) => {
        const s = /* @__PURE__ */ new Map(), a = {};
        for (const o of t) {
          const n = e[o];
          if (!n) continue;
          const r = j(o);
          if (!et.includes(r) && !jt.includes(r) && !Dt.includes(r) && !Tt.includes(r) && !Zo.includes(r) && !At.includes(r))
            continue;
          a[r] || (a[r] = []), a[r].push(n), s.has(r) || s.set(r, /* @__PURE__ */ new Map());
          const l = s.get(r), c = n.attributes.device_class || "default";
          l.has(c) || l.set(c, []), l.get(c).push(n);
        }
        return { grouped: s, byDomain: a };
      }
    ), this._computeCovers = No, this._computeAlerts = Fo, this._computeSensors = Go, this._computeButtons = Ko;
  }
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }
  static async getStubConfig(t) {
    var i;
    return { type: "custom:area-card-plus", area: ((i = Object.values(t.areas)[0]) == null ? void 0 : i.area_id) || "" };
  }
  get _designClasses() {
    var t, e;
    return {
      v2: ((t = this._config) == null ? void 0 : t.design) === "V2",
      row: ((e = this._config) == null ? void 0 : e.layout) === "horizontal"
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._startCameraInterval();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopCameraInterval();
  }
  _startCameraInterval() {
    var t, e;
    if (this._stopCameraInterval(), ((t = this._config) == null ? void 0 : t.camera_mode) === "auto") {
      const i = ((e = this._config) == null ? void 0 : e.camera_auto_interval) || 10;
      this._cameraInterval = window.setInterval(() => {
        this._currentCameraIndex++, this.requestUpdate();
      }, i * 1e3);
    }
  }
  _stopCameraInterval() {
    this._cameraInterval && (clearInterval(this._cameraInterval), this._cameraInterval = void 0);
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
    var i, s, a, o, n, r;
    if (!t.area)
      throw new Error("Area Required");
    this._config = t, this._deviceClasses = { ...Lt }, t.sensor_classes && (this._deviceClasses.sensor = t.sensor_classes), t.alert_classes && (this._deviceClasses.binary_sensor = t.alert_classes), t.cover_classes && (this._deviceClasses.cover = t.cover_classes), this._iconCache.clear(), this._styleCache.clear();
    const e = this._parseCss.bind(this);
    this._customizationDomainMap = Ye(
      (i = this._config) == null ? void 0 : i.customization_domain,
      e
    ), this._customizationCoverMap = Ye(
      (s = this._config) == null ? void 0 : s.customization_cover,
      e
    ), this._customizationAlertMap = Ye(
      (a = this._config) == null ? void 0 : a.customization_alert,
      e
    ), this._customizationSensorMap = Ye(
      (o = this._config) == null ? void 0 : o.customization_sensor,
      e
    ), this._hiddenEntitiesSet = new Set(((n = this._config) == null ? void 0 : n.hidden_entities) || []), this._excludedEntitiesSet = new Set(((r = this._config) == null ? void 0 : r.excluded_entities) || []), this._actionHandlerCache.clear();
  }
  updated(t) {
    if (super.updated(t), t.has("_config") && this._startCameraInterval(), !this._config || !this.hass)
      return;
    if (t.has("selectedDomain") && this.selectedDomain) {
      const s = this.selectedDomain;
      this._openPopup({ domain: s }), setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    const e = t.get("hass"), i = t.get("_config");
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!i || i.theme !== this._config.theme)) && Yo(this, this.hass.themes, this._config.theme);
  }
  shouldUpdate(t) {
    var a, o;
    if (t.has("_config") || !this._config || t.has("_currentCameraIndex"))
      return !0;
    if (!t.has("hass"))
      return !1;
    const e = t.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale)
      return !0;
    if (!((a = this.hass) != null && a.devices) || !((o = this.hass) != null && o.entities))
      return !1;
    const i = this.hass.entities && this.hass.devices ? re(this.hass.entities, this.hass.devices) : void 0, s = le(
      this._config.area,
      i ? ms : ce(this._config.area, this.hass.devices),
      this.hass.entities,
      this._hiddenEntitiesSet,
      this._config.label,
      i
    );
    if (this._lastEntityIds !== s)
      return this._lastEntityIds = s, !0;
    for (const n of s)
      if (!e.states[n] || e.states[n] !== this.hass.states[n])
        return !0;
    return !1;
  }
  _isOn(t, e, i) {
    var a, o, n;
    let s;
    if (i)
      s = i[t] || [];
    else {
      const r = (a = this._config) == null ? void 0 : a.area, l = ce(r, (o = this.hass) == null ? void 0 : o.devices);
      s = le(
        r,
        l,
        this.hass.entities,
        this._excludedEntitiesSet,
        (n = this._config) == null ? void 0 : n.label,
        this.hass.entities && this.hass.devices ? re(this.hass.entities, this.hass.devices) : void 0
      ).filter((d) => d.split(".")[0] === t).map((d) => this.hass.states[d]).filter((d) => d !== void 0);
    }
    if (s.length)
      return (e ? s.filter(
        (r) => r.attributes.device_class === e
      ) : s).find(
        (r) => !te.includes(r.state) && !ee.includes(r.state)
      );
  }
  _parseCss(t) {
    return Vs(t, this._styleCache);
  }
  _getParsedCss(t, e) {
    return $s(t, e, this._styleCache);
  }
  _getClimateStyle(t) {
    var a, o;
    const e = (o = (a = this._config) == null ? void 0 : a.styles) == null ? void 0 : o.thermostat, i = typeof e == "string" ? this._getParsedCss(e) : {}, s = typeof e == "object" && e && e[t] ? this._getParsedCss(e[t]) : {};
    return { ...i, ...s };
  }
  _getClimateColor(t, e) {
    return this._getClimateStyle(t).color || e;
  }
  _handleAction(t) {
    var a, o, n, r, l, c;
    const e = t.detail.action === "tap" ? (a = this._config) == null ? void 0 : a.tap_action : t.detail.action === "hold" ? (o = this._config) == null ? void 0 : o.hold_action : t.detail.action === "double_tap" ? (n = this._config) == null ? void 0 : n.double_tap_action : null;
    if (e === "more-info" || (e == null ? void 0 : e.action) === "more-info" || e === void 0) {
      this._openPopup();
      return;
    }
    const s = {
      tap_action: (r = this._config) == null ? void 0 : r.tap_action,
      hold_action: (l = this._config) == null ? void 0 : l.hold_action,
      double_tap_action: (c = this._config) == null ? void 0 : c.double_tap_action
    };
    kt(this, this.hass, s, t.detail.action);
  }
  _cachedIcon(t, e, i) {
    const s = `${t}|${i || ""}|${e ? "1" : "0"}`;
    if (this._iconCache.has(s)) return this._iconCache.get(s);
    const a = ps(t, e, i);
    return this._iconCache.set(s, a), a;
  }
  _renderIcon(t, e, i, s) {
    return t && !t.startsWith("mdi:") ? t.startsWith("M") ? _`<ha-svg-icon
                  class=${i || C}
                  style=${e}
                  .path=${t}
                ></ha-svg-icon>` : _`<ha-icon
                class=${i || C}
                style=${e}
                .icon=${t}
              ></ha-icon>` : _`<ha-state-icon
              class=${i || C}
              style=${e}
              .domain=${s || C}
              .icon=${t}
            ></ha-state-icon>`;
  }
  _renderEntityGroup(t, e, i, s) {
    var d, h, f, u;
    const a = t === "cover", o = a ? "open" : "on", n = a ? (d = this._config) == null ? void 0 : d.cover_color : (h = this._config) == null ? void 0 : h.alert_color, r = a ? (f = this._config) == null ? void 0 : f.cover_css : (u = this._config) == null ? void 0 : u.alert_css, l = a ? "cover" : "alert", c = a ? (m, p) => Mn(this, m, p) : (m, p) => $n(this, m, p);
    return _`
      <div class="${Q({ [t + "s"]: !0, ...this._designClasses })}">
        ${ie(
      e,
      (m) => m.domain + "-" + m.deviceClass,
      ({ domain: m, deviceClass: p }) => {
        var z, $, b, w, I, D;
        const g = s.get(p), y = (g == null ? void 0 : g.invert) === !0, H = (((z = i.get(m)) == null ? void 0 : z.get(p)) || []).filter((P) => {
          var E;
          const k = P.state === o;
          return (y ? ee.includes(P.state) : k) && !this._excludedEntitiesSet.has(P.entity_id) && $e(P.entity_id, this.hass.entities, (E = this._config) == null ? void 0 : E.category_filter);
        }), v = (g == null ? void 0 : g.color) || n, A = g == null ? void 0 : g.icon, M = H.length;
        return M > 0 ? _`
                  <div
                    class="icon-with-count hover"
                    style=${x(this._getParsedCss(
          (($ = g == null ? void 0 : g.styles) == null ? void 0 : $.button) || ((b = g == null ? void 0 : g.styles) == null ? void 0 : b.card) || r || ((I = (w = this._config) == null ? void 0 : w.styles) == null ? void 0 : I[l]),
          g
        ))}
                    @action=${c(m, p)}
                    .actionHandler=${J(g)}
                  >
                    ${this._renderIcon(
          A || this._cachedIcon(m, !y, p),
          x({
            ...v ? { color: `var(--${v}-color)` } : {},
            ...this._getParsedCss((D = g == null ? void 0 : g.styles) == null ? void 0 : D.icon, g)
          }),
          t
        )}
                    <span class="active-count text-small ${M > 0 ? "on" : "off"}">${M}</span>
                  </div>
                ` : C;
      }
    )}
      </div>
    `;
  }
  _renderCovers(t, e, i) {
    return this._renderEntityGroup("cover", t, e, i);
  }
  _renderAlerts(t, e, i) {
    return this._renderEntityGroup("alert", t, e, i);
  }
  _renderSingleCustomButton(t, e) {
    var r, l, c, d, h, f;
    if (t.conditional) {
      const u = t.entity ? j(t.entity) : null;
      if (u && u in e) {
        const m = e[u].find(
          (p) => p.entity_id === t.entity
        );
        if (!m || te.includes(m.state) || ee.includes(m.state))
          return C;
      }
    }
    if (t.state_mode && t.entity && t.state_value) {
      const u = this.hass.states[t.entity];
      if (!u) return C;
      const m = u.state === t.state_value;
      if (t.state_mode === "equal" && !m || t.state_mode === "not_equal" && m)
        return C;
    }
    let i;
    t.entity && (i = this.hass.states[t.entity]);
    let s;
    t.activate_state_color && i && (!t.color || t.color === "state") && (s = un(i));
    const a = s ? { color: s } : t.color ? { color: `var(--${t.color}-color, ${t.color})` } : {};
    let o = t.icon;
    if (!o && i && (o = i.attributes.icon, !o)) {
      const u = j(i.entity_id), m = !te.includes(i.state) && !ee.includes(i.state);
      o = ps(u, m, i.attributes.device_class);
    }
    const n = !!t.name;
    return _`
      <div
        class="icon-with-count hover"
        style=${x(
      this._getParsedCss(
        ((r = t.styles) == null ? void 0 : r.button) || ((l = t.styles) == null ? void 0 : l.card) || t.css,
        t
      )
    )}
        @action=${Fe(
      this,
      "custom_button",
      "",
      void 0,
      t
    )}
        .actionHandler=${J(t)}
      >
        ${t.use_entity_picture && ((c = i == null ? void 0 : i.attributes) != null && c.entity_picture) ? _`<img
                    class="entity-picture"
                    src=${i.attributes.entity_picture}
                    style=${x({
      ...this._getParsedCss(((d = t.styles) == null ? void 0 : d.icon) || t.icon_css, t)
    })}
                  />` : o ? this._renderIcon(
      o,
      x({
        ...a,
        ...this._getParsedCss(((h = t.styles) == null ? void 0 : h.icon) || t.icon_css, t)
      })
    ) : C}
        ${n ? _`<span class="custom-button-label" style=${x({
      ...a,
      ...this._getParsedCss((f = t.styles) == null ? void 0 : f.name, t)
    })}"
                    >${t.name}</span
                  >` : C}
      </div>
    `;
  }
  renderCustomButtons(t) {
    var i;
    if (!((i = this._config) != null && i.custom_buttons) || this._config.custom_buttons.length === 0)
      return C;
    const e = this._config.custom_buttons.filter(
      (s) => !s.position || s.position === "default"
    );
    return e.length === 0 ? C : _`
      <div
        class="${Q({
      custom_buttons: !0,
      ...this._designClasses
    })}"
      >
        ${e.map((s) => this._renderSingleCustomButton(s, t))}
      </div>
    `;
  }
  renderPositionedCustomButtons(t) {
    var n;
    if (!((n = this._config) != null && n.custom_buttons) || this._config.custom_buttons.length === 0)
      return C;
    const e = this._config.custom_buttons.filter(
      (r) => r.position && r.position !== "default"
    );
    if (e.length === 0)
      return C;
    const i = (r) => r && !/[^0-9]/.test(r) ? `${r}px` : r, s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    for (const r of e)
      if (r.position_group) {
        const l = r.position_group;
        s.has(l) || s.set(l, []), s.get(l).push(r);
      } else {
        const l = r.position || "custom";
        a.has(l) || a.set(l, []), a.get(l).push(r);
      }
    const o = [
      ...Array.from(a.entries()).map(([r, l]) => {
        var c;
        return { position: r, buttons: l, direction: (c = l[0]) == null ? void 0 : c.position_direction };
      }),
      ...Array.from(s.entries()).map(([r, l]) => {
        var c, d;
        return { position: ((c = l[0]) == null ? void 0 : c.position) || "custom", buttons: l, direction: (d = l[0]) == null ? void 0 : d.position_direction };
      })
    ];
    return _`
      ${o.map(({ position: r, buttons: l, direction: c }) => {
      const d = r === "custom" ? (() => {
        const f = l[0];
        return {
          ...f.position_top ? { top: i(f.position_top) } : {},
          ...f.position_right ? { right: i(f.position_right) } : {},
          ...f.position_bottom ? { bottom: i(f.position_bottom) } : {},
          ...f.position_left ? { left: i(f.position_left) } : {}
        };
      })() : {};
      return _`
          <div
            class="positioned-button-group ${r !== "custom" ? r : ""}"
            style=${x({ ...d, flexDirection: c === "column" ? "column" : "row" })}
          >
            ${l.map((f) => {
        var u, m;
        return _`
              <div
                class="positioned-button"
                style=${x(
          this._getParsedCss(((u = f.styles) == null ? void 0 : u.button) || ((m = f.styles) == null ? void 0 : m.card) || f.css, f)
        )}
              >
                ${this._renderSingleCustomButton(f, t)}
              </div>
            `;
      })}
          </div>
        `;
    })}
    `;
  }
  _renderButtons(t, e, i) {
    return _`
      <div
        class="${Q({
      buttons: !0,
      ...this._designClasses
    })}"
      >
        ${ie(
      t,
      (s) => s,
      (s) => {
        var p, g, y, V, H, v, A, M, z, $;
        if (s === "climate") {
          const b = i.get("climate"), w = b == null ? void 0 : b.display_mode;
          if (b && b.hide === !0 || w !== "icon" && w !== "text_icon")
            return C;
        }
        const a = i.get(s), o = (a == null ? void 0 : a.color) || ((p = this._config) == null ? void 0 : p.domain_color), n = a == null ? void 0 : a.icon, r = s === "climate" ? i.get("climate") : void 0, l = r == null ? void 0 : r.display_mode, c = r == null ? void 0 : r.show_set_temperature, d = s === "climate" && (l === "icon" || l === "text_icon") && c === !0, h = e[s].filter((b) => !(te.includes(b.state) || this._excludedEntitiesSet.has(b.entity_id)));
        let f = [], u;
        if (d) {
          f = h;
          let b = !1, w = !1;
          for (const I of h) {
            const D = ((g = I.attributes) == null ? void 0 : g.hvac_action) ?? null, P = (I.state ?? "").toString().toLowerCase();
            if (D != null) {
              const k = D.toString().toLowerCase();
              b = b || k.includes("heat") || k.includes("heating"), w = w || k.includes("cool") || k.includes("cooling");
            } else
              b = b || P.includes("heat") || P.includes("heating"), w = w || P.includes("cool") || P.includes("cooling");
            if (b && w) break;
          }
          b ? u = this._getClimateColor("heat", "red") : w ? u = this._getClimateColor("cool", "cornflowerblue") : u = this._getClimateColor("standby", "") || ((y = this._config) == null ? void 0 : y.climate_standby_color);
        } else
          f = h.filter((b) => {
            var w;
            if (s === "climate") {
              const I = (w = b.attributes) == null ? void 0 : w.hvac_action;
              if (I != null) {
                const P = I.toString().toLowerCase();
                return !(P === "off" || P === "idle");
              }
              const D = (b.state ?? "").toString().toLowerCase();
              return !(D === "off" || D === "idle");
            }
            return !ee.includes(b.state);
          });
        const m = f.length;
        return this._config.show_active && m === 0 ? C : _`
              <div
                class="icon-with-count hover"
                style=${x(
          this._getParsedCss(
            ((V = a == null ? void 0 : a.styles) == null ? void 0 : V.button) || ((H = a == null ? void 0 : a.styles) == null ? void 0 : H.card) || (a == null ? void 0 : a.css) || ((v = this._config) == null ? void 0 : v.domain_css) || ((M = (A = this._config) == null ? void 0 : A.styles) == null ? void 0 : M.domain),
            a
          )
        )}
                @action=${Ct(this, s)}
                .actionHandler=${J(a)}
              >
                ${this._renderIcon(
          n || this._cachedIcon(s, m > 0),
          x({
            ...u ? { color: u } : {},
            ...!u && o ? { color: `var(--${o}-color)` } : {},
            ...!u && !o && ((z = this._config) != null && z.domain_color) ? { color: this._config.domain_color } : {},
            ...this._getParsedCss((($ = a == null ? void 0 : a.styles) == null ? void 0 : $.icon) || (a == null ? void 0 : a.icon_css), a)
          }),
          m > 0 ? "toggle-on" : "toggle-off",
          s
        )}
                <span
                  class="active-count text-small ${m > 0 ? "on" : "off"}"
                >
                  ${m}
                </span>
              </div>
            `;
      }
    )}
      </div>
    `;
  }
  _renderSensors(t, e, i, s, a) {
    var o, n, r;
    return _`
      <div 
        class="sensors"
        style=${x(
      this._getParsedCss(
        (n = (o = this._config) == null ? void 0 : o.styles) == null ? void 0 : n.sensors,
        this._config
      )
    )}
      >
        ${(r = this._config) != null && r.wrap_sensor_icons ? ie(
      t,
      (l) => l.domain + "-" + l.deviceClass,
      ({ domain: l, deviceClass: c, index: d }) => {
        var A, M, z, $, b, w, I, D, P, k, E;
        const f = (((A = i.get(l)) == null ? void 0 : A.get(c)) || []).filter(
          (S) => {
            var B;
            return !this._excludedEntitiesSet.has(S.entity_id) && $e(
              S.entity_id,
              this.hass.entities,
              (B = this._config) == null ? void 0 : B.category_filter
            );
          }
        );
        if (f.length === 0)
          return C;
        let u = null;
        switch (c) {
          case "temperature":
            u = s.temperature_entity_id;
            break;
          case "humidity":
            u = s.humidity_entity_id;
            break;
        }
        const m = u ? this.hass.states[u] : void 0, p = a.get(c), g = (p == null ? void 0 : p.color) || ((M = this._config) == null ? void 0 : M.sensor_color), y = (p == null ? void 0 : p.invert) === !0, V = f.some(
          (S) => !te.includes(S.state) && !ee.includes(S.state)
        );
        if (y && V)
          return C;
        const H = (z = this._config) != null && z.show_sensor_icons ? _`<ha-domain-icon
                      style=${x({
          ...g ? { color: `var(--${g}-color)` } : {},
          ...this._getParsedCss(
            (($ = p == null ? void 0 : p.styles) == null ? void 0 : $.icon) || (p == null ? void 0 : p.css),
            p
          )
        })}
                      .hass=${this.hass}
                      .domain=${l}
                      .deviceClass=${c}
                    ></ha-domain-icon>` : null, v = _`<span
                  class="sensor-value"
                  @action=${ds(this, l, c)}
                  .actionHandler=${J(p)}
                  style=${x({
          ...g ? { color: `var(--${g}-color)` } : {},
          ...this._getParsedCss(
            (w = (b = this._config) == null ? void 0 : b.styles) == null ? void 0 : w.sensor,
            this._config
          ),
          ...this._getParsedCss(
            ((I = p == null ? void 0 : p.styles) == null ? void 0 : I.sensor) || ((D = p == null ? void 0 : p.styles) == null ? void 0 : D.button) || ((P = p == null ? void 0 : p.styles) == null ? void 0 : P.card) || (p == null ? void 0 : p.css),
            p
          )
        })}
                >
                  ${!((k = this._config) != null && k.show_sensor_icons) && !((E = this._config) != null && E.wrap_sensor_icons) && d > 0 ? " - " : ""}
                  ${m ? this.hass.formatEntityState(m) : us(
          l,
          c,
          f,
          this.hass.locale,
          this.hass.entities
        )}
                </span>`;
        return _`<div class="sensor-row off">${H}${v}</div>`;
      }
    ) : _`<div class="sensor text-medium off">
              ${ie(
      t,
      (l) => l.domain + "-" + l.deviceClass,
      ({ domain: l, deviceClass: c, index: d }) => {
        var A, M, z, $, b, w, I, D, P, k, E;
        const f = (((A = i.get(l)) == null ? void 0 : A.get(c)) || []).filter(
          (S) => {
            var B;
            return !this._excludedEntitiesSet.has(S.entity_id) && $e(
              S.entity_id,
              this.hass.entities,
              (B = this._config) == null ? void 0 : B.category_filter
            );
          }
        );
        if (f.length === 0)
          return C;
        let u = null;
        switch (c) {
          case "temperature":
            u = s.temperature_entity_id;
            break;
          case "humidity":
            u = s.humidity_entity_id;
            break;
        }
        const m = u ? this.hass.states[u] : void 0, p = a.get(c), g = (p == null ? void 0 : p.color) || ((M = this._config) == null ? void 0 : M.sensor_color), y = (p == null ? void 0 : p.invert) === !0, V = f.some(
          (S) => !te.includes(S.state) && !ee.includes(S.state)
        );
        if (y && V)
          return C;
        const H = (z = this._config) != null && z.show_sensor_icons ? _`<ha-domain-icon
                        style=${x({
          ...g ? { color: `var(--${g}-color)` } : {},
          ...this._getParsedCss(
            (($ = p == null ? void 0 : p.styles) == null ? void 0 : $.icon) || (p == null ? void 0 : p.css),
            p
          )
        })}
                        .hass=${this.hass}
                        .domain=${l}
                        .deviceClass=${c}
                      ></ha-domain-icon>` : null, v = _`<span
                    class="sensor-value"
                    @action=${ds(this, l, c)}
                    .actionHandler=${J(p)}
                    style=${x({
          ...g ? { color: `var(--${g}-color)` } : {},
          ...this._getParsedCss(
            (w = (b = this._config) == null ? void 0 : b.styles) == null ? void 0 : w.sensor,
            this._config
          ),
          ...this._getParsedCss(
            ((I = p == null ? void 0 : p.styles) == null ? void 0 : I.sensor) || ((D = p == null ? void 0 : p.styles) == null ? void 0 : D.button) || ((P = p == null ? void 0 : p.styles) == null ? void 0 : P.card) || (p == null ? void 0 : p.css),
            p
          )
        })}
                  >
                    ${!((k = this._config) != null && k.show_sensor_icons) && !((E = this._config) != null && E.wrap_sensor_icons) && d > 0 ? " - " : ""}
                  ${m ? this.hass.formatEntityState(m) : us(
          l,
          c,
          f,
          this.hass.locale,
          this.hass.entities
        )}
                  </span>`;
        return _`${H}${v}`;
      }
    )}
            </div>`}
      </div>
    `;
  }
  _renderClimates(t, e, i) {
    return _`
      <div class="climate text-small off">
        ${ie(
      t,
      (s) => s.domain,
      ({ domain: s }) => {
        var d, h, f, u, m;
        const a = e[s] || [], o = i.get(s) || {};
        if ((o == null ? void 0 : o.display_mode) === "icon")
          return C;
        if ((o == null ? void 0 : o.show_set_temperature) === !0) {
          const p = a.filter((V) => !this._excludedEntitiesSet.has(V.entity_id)).map((V) => {
            var P, k, E, S, B, N;
            const H = ((P = V.attributes) == null ? void 0 : P.temperature) ?? ((k = V.attributes) == null ? void 0 : k.target_temperature) ?? null;
            if (H == null) return null;
            const v = Number(H);
            if (Number.isNaN(v)) return null;
            const A = ((B = (S = (E = this.hass) == null ? void 0 : E.config) == null ? void 0 : S.unit_system) == null ? void 0 : B.temperature) || "", M = ((N = V.attributes) == null ? void 0 : N.hvac_action) ?? null, z = (V.state ?? "").toString().toLowerCase(), $ = (M ?? z).toString().toLowerCase(), b = $.includes("heat") || $.includes("heating"), w = $.includes("cool") || $.includes("cooling"), I = b ? this._getClimateStyle("heat") : w ? this._getClimateStyle("cool") : this._getClimateStyle("standby"), D = I.color || (b ? "red" : w ? "cornflowerblue" : "var(--secondary-text-color)");
            return _`<span style=${x({
              color: D,
              ...I
            })}
                    >${v}${A ? ` ${A}` : ""}</span
                  >`;
          }).filter((V) => V !== null);
          if (p.length === 0) return C;
          const g = p.reduce(
            (V, H, v) => (v === 0 || V.push(
              _`<span
                        style=${x({
                color: "var(--secondary-text-color)",
                ...this._getClimateStyle("standby")
              })}
                        >,
                      </span>`
            ), V.push(H), V),
            []
          ), y = {
            ...o != null && o.color ? { color: `var(--${o.color}-color)` } : {},
            ...this._getParsedCss(
              ((d = o == null ? void 0 : o.styles) == null ? void 0 : d.button) || ((h = o == null ? void 0 : o.styles) == null ? void 0 : h.card) || (o == null ? void 0 : o.css),
              o
            )
          };
          return _`<div
                class="climate"
                style=${x(y)}
                @action=${Ct(this, s)}
                .actionHandler=${J(o)}
              >
                <span
                  style=${x({
            color: "var(--secondary-text-color)",
            ...this._getClimateStyle("standby")
          })}
                  >(</span
                >${g}<span
                  style=${x({
            color: "var(--secondary-text-color)",
            ...this._getClimateStyle("standby")
          })}
                  >)</span
                >
              </div>`;
        }
        const r = (a || []).filter((p) => {
          var A;
          const g = (A = p.attributes) == null ? void 0 : A.hvac_action, y = p.state, V = !te.includes(y) && !ee.includes(y) && !this._excludedEntitiesSet.has(p.entity_id);
          if (g != null) {
            const M = g.toString().toLowerCase();
            return V && (M !== "idle" && M !== "off");
          }
          const H = (y ?? "").toString().toLowerCase(), v = H.includes("heat") || H.includes("cool") || H !== "idle" && H !== "off";
          return V && v;
        }).map((p) => {
          var y, V, H, v;
          return `${((y = p.attributes) == null ? void 0 : y.temperature) ?? "N/A"} ${((v = (H = (V = this.hass) == null ? void 0 : V.config) == null ? void 0 : H.unit_system) == null ? void 0 : v.temperature) || ""}`;
        });
        if (r.length === 0)
          return C;
        const l = o == null ? void 0 : o.color, c = {
          ...l ? { color: `var(--${l}-color)` } : {},
          ...!l && ((f = this._config) != null && f.domain_color) ? { color: this._config.domain_color } : {},
          ...this._getParsedCss(
            ((u = o == null ? void 0 : o.styles) == null ? void 0 : u.button) || ((m = o == null ? void 0 : o.styles) == null ? void 0 : m.card) || (o == null ? void 0 : o.css),
            o
          )
        };
        return _`<div
              class="climate"
              style=${x(c)}
              @action=${Ct(this, s)}
              .actionHandler=${J(o)}
            >
              <span
                style=${x(
          this._getClimateStyle(
            r.length > 0 ? "heat" : "standby"
          )
        )}
                >(${r.join(", ")})</span
              >
            </div>`;
      }
    )}
      </div>
    `;
  }
  _renderBottom(t, e, i, s, a, o, n) {
    var r, l, c, d;
    return _`
      <div
        class="${Q({
      bottom: !0,
      ...this._designClasses
    })}"
      >
        <div
          class="${Q({
      name: !0,
      ...this._designClasses,
      "text-large": !0,
      on: !0
    })}"
          style=${x({
      ...(r = this._config) != null && r.area_name_color ? { color: `var(--${this._config.area_name_color}-color)` } : {},
      ...this._getParsedCss(
        ((c = (l = this._config) == null ? void 0 : l.styles) == null ? void 0 : c.name) || ((d = this._config) == null ? void 0 : d.name_css),
        this._config
      )
    })}
          @action=${this._handleAction}
          .actionHandler=${J(this._config)}
        >
          ${this._config.area_name || t.name}
        </div>
        ${this._renderSensors(
      e,
      i,
      s,
      t,
      a
    )}
        ${this._renderClimates(
      o,
      i,
      n
    )}
      </div>
    `;
  }
  render() {
    var k, E, S, B, N, W, xe, Ee, Zt, Nt, Ft, Gt, Kt, Ut;
    if (!this._config || !this.hass || !this.hass.areas || !this.hass.devices || !this.hass.entities)
      return C;
    const t = ((k = this._config) == null ? void 0 : k.design) === "V2", e = t && ((E = this._config) != null && E.v2_color) ? `rgba(${this._config.v2_color.join(", ")})` : "var(--primary-color)", i = {
      mirrored: this._config.mirrored === !0
    };
    let s = 3;
    try {
      const K = ((S = this.shadowRoot) == null ? void 0 : S.host) || document.documentElement, me = getComputedStyle(K).getPropertyValue("--row-size");
      me && (s = Number(me.trim()) || 3);
    } catch {
    }
    const a = t ? { background: e } : {}, o = t && s === 1 ? {} : t ? { background: e } : {}, n = this.hass.entities && this.hass.devices ? re(this.hass.entities, this.hass.devices) : void 0, r = le(
      this._config.area,
      n ? ms : ce(this._config.area, this.hass.devices),
      this.hass.entities,
      this._hiddenEntitiesSet,
      this._config.label,
      n
    ), { grouped: l, byDomain: c } = this._getOrganizedEntities(
      r,
      this.hass.states,
      this._deviceClasses
    ), d = {};
    Object.entries(c).forEach(([K, me]) => {
      d[K] = me.filter(
        (Ge) => {
          var ze;
          return $e(
            Ge.entity_id,
            this.hass.entities,
            (ze = this._config) == null ? void 0 : ze.category_filter
          );
        }
      );
    });
    const h = Vt(this._config.area, ((B = this.hass) == null ? void 0 : B.areas) || {}), f = this._customizationDomainMap, u = this._customizationCoverMap, m = this._customizationAlertMap, p = this._customizationSensorMap, g = this._computeCovers(d, this._deviceClasses), y = this._computeAlerts(d, this._deviceClasses), V = this._computeButtons(
      this._config.toggle_domains,
      d
    ), H = this._computeSensors(d, this._deviceClasses), v = ((W = (N = this._config) == null ? void 0 : N.toggle_domains) != null && W.includes("climate") ? At : []).filter((K) => K in d).map((K) => ({ domain: K })), A = (((xe = this._config) == null ? void 0 : xe.display_type) || "").toString().toLowerCase(), M = A.includes("camera"), z = A.includes("picture") || A.includes("image"), $ = A === "" ? !0 : A.includes("icon"), b = M ? d.camera || [] : [], w = M && (this._config.camera_entity || this._config.camera_entity_left || this._config.camera_entity_right);
    if (h === null)
      return _`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    const I = M && (b.length > 0 || w) || z && h.picture, D = Uo(
      t,
      s,
      ((Zt = (Ee = this._config) == null ? void 0 : Ee.styles) == null ? void 0 : Zt.icon) || ((Nt = this._config) == null ? void 0 : Nt.icon_css),
      (Ft = this._config) == null ? void 0 : Ft.area_icon_color,
      this._styleCache
    ), P = this.layout === "grid" || this.layout === "panel";
    return _`
      <ha-card
        class="${Q(i)}"
        style=${x(
      this._getParsedCss(
        ((Kt = (Gt = this._config) == null ? void 0 : Gt.styles) == null ? void 0 : Kt.card) || ((Ut = this._config) == null ? void 0 : Ut.css),
        this._config
      )
    )}
      >
        <div
          class="header"
          style=${I ? "padding-bottom:0em" : "padding-bottom:12em"}
          @action=${this._handleAction}
          .actionHandler=${J(this._config)}
        >
          <div
            class="picture"
            style=${P ? C : "max-height:12em;"}
          >
            ${(() => {
      var K, me, Ge, ze, qt, Wt, Jt, Yt, Xt, Qt, ei;
      if (!I) return C;
      if (M && b.length > 0) {
        const rt = ((K = this._config) == null ? void 0 : K.camera_mode) || "single", lt = this._getParsedCss((Ge = (me = this._config) == null ? void 0 : me.styles) == null ? void 0 : Ge.camera, this._config);
        if (rt === "split") {
          const Ae = ((ze = this._config) == null ? void 0 : ze.camera_entity_left) || ((qt = b[0]) == null ? void 0 : qt.entity_id), Le = ((Wt = this._config) == null ? void 0 : Wt.camera_entity_right) || ((Jt = b[1]) == null ? void 0 : Jt.entity_id);
          if (Ae && Le)
            return _`
                <div style="display: flex; height: 100%; width: 100%;">
                  <hui-image
                    style=${x({ flex: "1", width: "50%", "object-fit": "cover", ...lt })}
                    .config=${this._config}
                    .hass=${this.hass}
                    .cameraImage=${Ae}
                    .cameraView=${this._config.camera_view}
                    fit-mode="cover"
                  ></hui-image>
                  <div style="width: 2px; height: 100%; background: var(--divider-color, rgba(0,0,0,0.5)); z-index: 1;"></div>
                  <hui-image
                    style=${x({ flex: "1", width: "50%", "object-fit": "cover", ...lt })}
                    .config=${this._config}
                    .hass=${this.hass}
                    .cameraImage=${Le}
                    .cameraView=${this._config.camera_view}
                    fit-mode="cover"
                  ></hui-image>
                </div>
              `;
        } else {
          let Ae = (Yt = b[0]) == null ? void 0 : Yt.entity_id;
          return rt === "single" && ((Xt = this._config) != null && Xt.camera_entity) ? Ae = this._config.camera_entity : rt === "auto" && b.length > 0 && (Ae = b[this._currentCameraIndex % b.length].entity_id), _`
              ${ie([Ae], (Le) => Le, (Le) => _`
                <hui-image
                  .config=${this._config}
                  .hass=${this.hass}
                  style=${x({ width: "100%", height: "100%", ...lt })}
                  .cameraImage=${Le}
                  .cameraView=${this._config.camera_view}
                  fit-mode="cover"
                ></hui-image>
              `)}
            `;
        }
      }
      if (z && h.picture)
        return _`
            <hui-image
              .config=${this._config}
              .hass=${this.hass}
              style=${x({ width: "100%", height: "100%", ...this._getParsedCss((ei = (Qt = this._config) == null ? void 0 : Qt.styles) == null ? void 0 : ei.image, this._config) })}
              .image=${h.picture}
              fit-mode="cover"
            ></hui-image>
          `;
    })()}
          </div>
        </div>

        <div
          class="${Q({
      "icon-container": !0,
      ...this._designClasses
    })}"
          style=${x(o)}
        >
          ${$ ? this._renderIcon(
      this._config.area_icon || h.icon,
      x(D)
    ) : C}
        </div>

        <div
          class="${Q({
      content: !0,
      ...this._designClasses
    })}"
          @action=${this._handleAction}
          .actionHandler=${J(this._config)}
        >
          ${mi(_`<div
            class="${Q({
      right: !0,
      ...this._designClasses
    })}"
            style=${x(a)}
          >
            ${this._renderCovers(
      g,
      l,
      u
    )}
            ${this._renderAlerts(
      y,
      l,
      m
    )}
            ${this.renderCustomButtons(d)}
            ${this._renderButtons(
      V,
      d,
      f
    )}
          </div>`)}
          ${mi(
      this._renderBottom(
        h,
        H,
        d,
        l,
        p,
        v,
        f
      )
    )}
        </div>
        ${this.renderPositionedCustomButtons(d)}
      </ha-card>
    `;
  }
  _showPopup(t, e, i) {
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
    this.selectedDeviceClass = e || null, this._openPopup({ domain: t });
  }
  _openPopup(t) {
    var s, a, o;
    const e = Vt((s = this._config) == null ? void 0 : s.area, ((a = this.hass) == null ? void 0 : a.areas) || {}), i = ((o = this._config) == null ? void 0 : o.area_name) || e && e.name || "Details";
    this._showPopup(this, "area-card-plus-popup", {
      title: i,
      hass: this.hass,
      selectedDomain: t == null ? void 0 : t.domain,
      selectedDeviceClass: t != null && t.domain && this.selectedDeviceClass || void 0,
      selectedGroup: t != null && t.domain && this.selectedGroup || void 0,
      opener: this,
      card: this,
      entities: le(
        this._config.area,
        ce(this._config.area, this.hass.devices),
        this.hass.entities,
        this._hiddenEntitiesSet,
        this._config.label,
        this.hass.entities && this.hass.devices ? re(this.hass.entities, this.hass.devices) : void 0
      ).map((n) => this.hass.states[n]).filter((n) => n !== void 0)
    });
  }
  static get styles() {
    return qo;
  }
};
ue([
  O({ attribute: !1 })
], se.prototype, "hass", 2);
ue([
  O({ attribute: !1 })
], se.prototype, "layout", 2);
ue([
  Z()
], se.prototype, "_config", 2);
ue([
  Z()
], se.prototype, "selectedDomain", 2);
ue([
  Z()
], se.prototype, "selectedDeviceClass", 2);
ue([
  Z()
], se.prototype, "selectedGroup", 2);
ue([
  Z()
], se.prototype, "_currentCameraIndex", 2);
se = ue([
  oe("area-card-plus")
], se);
const In = L(() => [{ name: "area", selector: { area: {} } }]), jn = L(
  (t, e, i, s, a) => {
    const o = (l) => a.localize(l) || l, n = (l) => R(l, a.locale.language), r = [
      {
        name: "camera_view",
        selector: {
          select: {
            options: ["auto", "live"].map((l) => ({
              value: l,
              label: o(
                `ui.panel.lovelace.editor.card.generic.camera_view_options.${l}`
              )
            })),
            mode: "dropdown"
          }
        }
      },
      {
        name: "camera_mode",
        selector: {
          select: {
            options: [
              {
                value: "single",
                label: n("camera_mode_single")
              },
              { value: "auto", label: n("camera_mode_auto") },
              { value: "split", label: n("camera_mode_split") }
            ],
            mode: "dropdown"
          }
        }
      }
    ];
    return i === "single" ? r.push({
      name: "camera_entity",
      selector: {
        select: {
          options: s,
          mode: "dropdown"
        }
      }
    }) : i === "auto" ? r.push({
      name: "camera_auto_interval",
      selector: { number: { min: 1, max: 3600, mode: "box" } }
    }) : i === "split" && r.push(
      {
        name: "camera_entity_left",
        selector: {
          select: {
            options: s,
            mode: "dropdown"
          }
        }
      },
      {
        name: "camera_entity_right",
        selector: {
          select: {
            options: s,
            mode: "dropdown"
          }
        }
      }
    ), [
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
                ].map((l) => {
                  const c = (f) => {
                    const u = f.trim().toLowerCase();
                    return u === "icon" ? "ui.panel.lovelace.editor.card.generic.icon" : u === "picture" || u === "image" ? "ui.components.selectors.image.image" : u === "camera" ? "ui.panel.lovelace.editor.card.area.display_type_options.camera" : `ui.panel.lovelace.editor.card.area.display_type_options.${f}`;
                  }, h = l.split(" & ").map((f) => f.trim()).map((f) => o(c(f)) || f).join(" & ");
                  return { value: l, label: h };
                }),
                mode: "dropdown"
              }
            }
          },
          ...e === "camera" || e === "camera & icon" ? r : []
        ]
      },
      { name: "mirrored", selector: { boolean: {} } },
      {
        name: "layout",
        required: !0,
        selector: {
          select: {
            mode: "box",
            options: ["vertical", "horizontal"].map((l) => ({
              label: a.localize(
                `ui.panel.lovelace.editor.card.tile.content_layout_options.${l}`
              ),
              value: l,
              image: {
                src: `/static/images/form/tile_content_layout_${l}.svg`,
                src_dark: `/static/images/form/tile_content_layout_${l}_dark.svg`,
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
      { name: "theme", required: !1, selector: { theme: {} } }
    ];
  }
), Dn = L(() => {
  const t = [
    "more-info",
    "navigate",
    "url",
    "perform-action",
    "none"
  ];
  return [
    { name: "tap_action", selector: { ui_action: { actions: t } } },
    { name: "double_tap_action", selector: { ui_action: { actions: t } } },
    { name: "hold_action", selector: { ui_action: { actions: t } } }
  ];
}), Tn = L((t) => [
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
  }
]), Bn = L((t) => [
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
  }
]), Rn = L((t) => [
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
]), Zn = L((t) => [
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
  }
]), Nn = L(() => [
  {
    name: "styles",
    selector: {
      object: {}
    }
  }
]);
var Fn = Object.defineProperty, Gn = Object.getOwnPropertyDescriptor, F = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? Gn(e, i) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = (s ? n(e, i, a) : n(a)) || a);
  return s && a && Fn(e, i, a), a;
};
class ye extends Y {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    var s;
    if (!this.hass)
      return C;
    const e = new Set(
      (this.customization || []).map((a) => a.type)
    ), i = this.SelectOptions.filter(
      (a) => !e.has(a.value)
    );
    return _`
      <div class="customization">
        ${this.customization && ie(
      this.customization,
      (a) => this._getKey(a),
      (a, o) => {
        var n;
        return _`
            <div class="customize-item">
              <ha-selector
                .hass=${this.hass}
                .label=${R("edit_content", ((n = this.hass) == null ? void 0 : n.locale.language) ?? "en")}  
                .selector=${{ select: { options: this.SelectOptions, mode: "dropdown" } }}
                .value=${a.type}
                .required=${!1}
                .index=${o}
                @value-changed=${this._valueChanged}
              ></ha-selector>

              <ha-icon-button
                .label="Remove"
                .path=${at}
                class="remove-icon"
                .index=${o}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${Hs}
                class="edit-icon"
                .index=${o}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `;
      }
    )}

        <div class="add-item row">
          <ha-selector
            .hass=${this.hass}
            .label=${R("edit_content", ((s = this.hass) == null ? void 0 : s.locale.language) ?? "en")}
            .selector=${{ select: { options: i, mode: "dropdown" } }}
            .value=${""}
            .required=${!1}
            class="add-customization"
            @value-changed=${this._addRow}
          ></ha-selector>
        </div>
      </div>
    `;
  }
  _valueChanged(e) {
    if (!this.customization || !this.hass)
      return;
    const i = e.detail.value, s = e.target.index, a = this.customization.concat();
    a[s] = { ...a[s], type: i || "" }, T(this, "config-changed", a);
  }
  _removeRow(e) {
    e.stopPropagation();
    const i = e.currentTarget.index;
    if (i != null) {
      const s = this.customization.concat();
      s.splice(i, 1), T(this, "config-changed", s);
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const i = e.target.index;
    i != null && T(this, "edit-item", i);
  }
  _addRow(e) {
    if (e.stopPropagation(), !this.customization || !this.hass)
      return;
    const i = e.detail.value;
    if (!i)
      return;
    const s = { type: i };
    T(this, "config-changed", [...this.customization, s]);
    const a = e.target;
    a && (a.value = "");
  }
  static get styles() {
    return Se`
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
      .customize-item ha-selector,
      .add-item ha-selector {
        flex: 1;
      }
    `;
  }
}
F([
  O({ attribute: !1 })
], ye.prototype, "hass", 2);
F([
  O({ type: Array })
], ye.prototype, "SelectOptions", 2);
let $t = class extends ye {
  get customization() {
    return this.customization_domain;
  }
};
F([
  O({ attribute: !1 })
], $t.prototype, "customization_domain", 2);
$t = F([
  oe("domain-items-editor")
], $t);
let Mt = class extends ye {
  get customization() {
    return this.customization_alert;
  }
};
F([
  O({ attribute: !1 })
], Mt.prototype, "customization_alert", 2);
Mt = F([
  oe("alert-items-editor")
], Mt);
let St = class extends ye {
  get customization() {
    return this.customization_cover;
  }
};
F([
  O({ attribute: !1 })
], St.prototype, "customization_cover", 2);
St = F([
  oe("cover-items-editor")
], St);
let wt = class extends ye {
  get customization() {
    return this.customization_sensor;
  }
};
F([
  O({ attribute: !1 })
], wt.prototype, "customization_sensor", 2);
wt = F([
  oe("sensor-items-editor")
], wt);
let xt = class extends ye {
  get customization() {
    return this.customization_popup;
  }
};
F([
  O({ attribute: !1 })
], xt.prototype, "customization_popup", 2);
xt = F([
  oe("popup-items-editor")
], xt);
let Re = class extends Y {
  _editRow(t) {
    t.stopPropagation();
    const e = t.currentTarget.index;
    T(this, "edit-item", e);
  }
  _removeRow(t) {
    if (t.stopPropagation(), !this.custom_buttons) return;
    const e = t.currentTarget.index, i = [...this.custom_buttons];
    i.splice(e, 1), T(this, "config-changed", i);
  }
  _addRow() {
    const t = {
      name: "",
      icon: "",
      tap_action: { action: "none" }
    }, e = [...this.custom_buttons || [], t];
    T(this, "config-changed", e);
  }
  render() {
    var t, e;
    return this.hass ? _`
      <div class="custom-buttons">
        ${(t = this.custom_buttons) == null ? void 0 : t.map(
      (i, s) => _`
            <div class="row">
              <div class="item">
                ${(() => {
        var o, n;
        if (i.use_entity_picture && i.entity) {
          const r = (o = this.hass) == null ? void 0 : o.states[i.entity];
          if ((n = r == null ? void 0 : r.attributes) != null && n.entity_picture)
            return _`<img
                        class="entity-picture-preview"
                        src=${r.attributes.entity_picture}
                      />`;
        }
        const a = i.icon;
        return a != null && a.startsWith("M") ? _`<ha-svg-icon .path=${a}></ha-svg-icon>` : a ? _`<ha-icon .icon=${a}></ha-icon>` : _`<ha-svg-icon
                    .path=${ot}
                  ></ha-svg-icon>`;
      })()}
                <span class="name"
                  >${i.name || `Button ${s + 1}`}</span
                >
              </div>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${Hs}
                .index=${s}
                @click=${this._editRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${at}
                .index=${s}
                @click=${this._removeRow}
              ></ha-icon-button>
            </div>
          `
    )}
        <div class="add-button-container">
          <mwc-button @click=${this._addRow} class="add-btn" outlined>
            ${R("add_custom_button", ((e = this.hass) == null ? void 0 : e.locale.language) ?? "en")}
          </mwc-button>
        </div>
      </div>
    ` : C;
  }
};
Re.styles = Se`
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
    .entity-picture-preview {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
    }
    .add-button-container {
      padding: 8px 0;
      text-align: right;
    }
  `;
F([
  O({ attribute: !1 })
], Re.prototype, "hass", 2);
F([
  O({ attribute: !1 })
], Re.prototype, "custom_buttons", 2);
Re = F([
  oe("custom-buttons-editor")
], Re);
var Kn = Object.defineProperty, Un = Object.getOwnPropertyDescriptor, pe = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? Un(e, i) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = (s ? n(e, i, a) : n(a)) || a);
  return s && a && Kn(e, i, a), a;
};
const fs = [
  "more-info",
  "toggle",
  "navigate",
  "url",
  "perform-action",
  "none"
], qn = [
  "more-info",
  "navigate",
  "url",
  "perform-action",
  "none"
], Wn = [
  "more-info",
  "navigate",
  "url",
  "perform-action",
  "none"
];
let ae = class extends Y {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._activeTab = "config", this._schemadomainConfig = L((t) => {
      var i;
      const e = [
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        }
      ];
      return ((i = this._config) == null ? void 0 : i.type) === "climate" && e.unshift(
        {
          name: "display_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                {
                  value: "text",
                  label: R("display_mode_text", t)
                },
                {
                  value: "icon",
                  label: R("display_mode_icon", t)
                },
                {
                  value: "text_icon",
                  label: R("display_mode_text_icon", t)
                }
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
    }), this._schemadomainActions = L(() => {
      const t = fs;
      return [
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
    }), this._schemaalertConfig = L(() => [
      { name: "invert", selector: { boolean: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      }
    ]), this._schemaalertActions = L(() => {
      const t = qn;
      return [
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
    }), this._schemasensorConfig = L(() => [
      { name: "invert", selector: { boolean: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      }
    ]), this._schemasensorActions = L(() => {
      const t = Wn;
      return [
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
    }), this._schemacustombuttonConfig = L(() => [
      { name: "entity", selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "use_entity_picture", selector: { boolean: {} } }
    ]), this._schemacustombuttonConfigAfter = L(() => [
      { name: "activate_state_color", selector: { boolean: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      }
    ]), this._schemacustombuttonActions = L(() => {
      const t = fs;
      return [
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
    }), this._schemaStyle = L(() => [
      {
        name: "styles",
        selector: {
          object: {}
        }
      }
    ]), this._computeLabelCallback = (t) => {
      switch (t.name) {
        case "use_entity_picture":
          return this.hass.localize(
            "ui.panel.lovelace.editor.badge.entity.show_entity_picture"
          );
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
        case "styles":
          return "Styles";
        case "display_mode":
          return R("display_mode", this.hass.locale.language);
        case "popup_card":
          return R("popup_card", this.hass.locale.language);
        case "icon":
        case "tap_action":
        case "hold_action":
        case "double_tap_action":
          return this.hass.localize(
            `ui.panel.lovelace.editor.card.generic.${t.name}`
          );
        case "invert":
        case "invert_state":
          return this.hass.localize("ui.dialogs.entity_registry.editor.invert.label");
        case "name":
          return this.hass.localize("ui.common.name");
        case "entity":
          return this.hass.localize("ui.common.entity");
        case "activate_state_color":
          return this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.state_color"
          );
        case "show_set_temperature":
          return R("show_set_temperature", this.hass.locale.language);
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
    var n, r, l, c, d, h, f, u;
    if (!this.hass || !this.config)
      return _``;
    const t = this.hass, e = (m) => R(m, t.locale.language);
    this._config || (this._config = { ...this.config, area: this.config.area || "" });
    let i;
    if (this._activeTab === "config")
      switch (this.getSchema) {
        case "sensor":
          i = this._schemasensorConfig();
          break;
        case "domain":
          i = this._schemadomainConfig(t.locale.language);
          break;
        case "alert":
        case "cover":
          i = this._schemaalertConfig();
          break;
        case "custom_button":
          i = this._schemacustombuttonConfig();
          break;
      }
    else if (this._activeTab === "actions")
      switch (this.getSchema) {
        case "sensor":
          i = this._schemasensorActions();
          break;
        case "domain":
          i = this._schemadomainActions();
          break;
        case "alert":
        case "cover":
          i = this._schemaalertActions();
          break;
        case "custom_button":
          i = this._schemacustombuttonActions();
          break;
      }
    else this._activeTab === "style" && (i = this._schemaStyle());
    const s = { ...this._config }, a = this.getSchema === "custom_button" && this._activeTab === "config", o = a ? this._schemacustombuttonConfigAfter() : [];
    return _`
      <ha-tab-group>
        <ha-tab-group-tab
          .active=${this._activeTab === "config"}
          @click=${() => this._activeTab = "config"}
        >
          ${t.localize("ui.panel.lovelace.editor.edit_card.tab_config") ?? "Configuration"}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "actions"}
          @click=${() => this._activeTab = "actions"}
        >
          ${t.localize("ui.panel.lovelace.editor.card.generic.actions")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "style"}
          @click=${() => this._activeTab = "style"}
        >
          Style
        </ha-tab-group-tab>
        ${this.getSchema !== "custom_button" ? _`
              <ha-tab-group-tab
                .active=${this._activeTab === "popup"}
                @click=${() => this._activeTab = "popup"}
              >
                Popup Card
              </ha-tab-group-tab>
            ` : ""}
      </ha-tab-group>

      ${this._activeTab === "style" ? _`
            <ha-alert alert-type="info" title="Style Guide">
              <p>
                You can use standard CSS per identifier. <br />
                <strong>Identifiers:</strong>
              </p>
              <ul>
                <li><b>button</b>: Item Container (Background, Border)</li>
                <li><b>icon</b>: Item Icon</li>
                ${this.getSchema === "custom_button" ? _`<li><b>name</b>: Item Name (Label)</li>` : C}
              </ul>
              <p>
                <strong>Animations:</strong> <br />
                spin, pulse, shake, blink, bounce
              </p>
              <p><strong>Example:</strong></p>
              <pre>
button:
  --mdc-icon-size: 24px;
  color: green;          
icon:
  animation: spin 2s linear infinite;
  --mdc-icon-size: 40px;
  color: var(--primary-color);
</pre
              >
            </ha-alert>
          ` : C}
      ${this._activeTab === "popup" ? this._renderPopupTab() : _`
            <ha-form
              .hass=${t}
              .data=${s}
              .schema=${i}
              .computeLabel=${this._computeLabelCallback}
              @value-changed=${this._valueChangedSchema}
            ></ha-form>
            ${a ? _`
                  <ha-selector
                    class="manual-selector"
                    .hass=${t}
                    .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "default",
            label: e("position_default")
          },
          {
            value: "top-left",
            label: e("position_top_left")
          },
          {
            value: "top-right",
            label: e("position_top_right")
          },
          {
            value: "bottom-left",
            label: e("position_bottom_left")
          },
          {
            value: "bottom-right",
            label: e("position_bottom_right")
          },
          { value: "custom", label: e("position_custom") }
        ]
      }
    }}
                    .value=${((n = this._config) == null ? void 0 : n.position) || "default"}
                    .label=${e("position")}
                    .required=${!1}
                    @value-changed=${(m) => {
      this._updatePositionField("position", m.detail.value);
    }}
                  ></ha-selector>
                  ${(r = this._config) != null && r.position && this._config.position !== "default" ? _`
                        <div class="position-grid">
                          <ha-selector
                            .hass=${t}
                            .selector=${{ text: {} }}
                            .value=${((l = this._config) == null ? void 0 : l.position_group) || ""}
                            .label=${e("position_group")}
                            @value-changed=${(m) => {
      this._updatePositionField("position_group", m.detail.value);
    }}
                          ></ha-selector>
                          <ha-selector
                            .hass=${t}
                            .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "row", label: e("position_row") },
          {
            value: "column",
            label: e("position_column")
          }
        ]
      }
    }}
                            .value=${((c = this._config) == null ? void 0 : c.position_direction) || "row"}
                            .label=${e("position_direction")}
                            @value-changed=${(m) => {
      this._updatePositionField("position_direction", m.detail.value);
    }}
                          ></ha-selector>
                        </div>
                        <span class="position-group-hint">
                          ${e("position_group_hint")}
                        </span>
                      ` : C}
                  ${((d = this._config) == null ? void 0 : d.position) === "custom" ? _`
                        <div class="position-grid">
                          <ha-selector
                            .hass=${t}
                            .selector=${{ text: { suffix: "px" } }}
                            .value=${this._config.position_top || ""}
                            .label=${e("position_top")}
                            @value-changed=${(m) => {
      this._updatePositionField(
        "position_top",
        m.detail.value
      );
    }}
                          ></ha-selector>
                          <ha-selector
                            .hass=${t}
                            .selector=${{ text: { suffix: "px" } }}
                            .value=${this._config.position_right || ""}
                            .label=${e("position_right")}
                            @value-changed=${(m) => {
      this._updatePositionField(
        "position_right",
        m.detail.value
      );
    }}
                          ></ha-selector>
                          <ha-selector
                            .hass=${t}
                            .selector=${{ text: { suffix: "px" } }}
                            .value=${this._config.position_bottom || ""}
                            .label=${e("position_bottom")}
                            @value-changed=${(m) => {
      this._updatePositionField(
        "position_bottom",
        m.detail.value
      );
    }}
                          ></ha-selector>
                          <ha-selector
                            .hass=${t}
                            .selector=${{ text: { suffix: "px" } }}
                            .value=${this._config.position_left || ""}
                            .label=${e("position_left")}
                            @value-changed=${(m) => {
      this._updatePositionField(
        "position_left",
        m.detail.value
      );
    }}
                          ></ha-selector>
                        </div>
                      ` : C}
                  ${(h = this._config) != null && h.entity ? _`
                        <div class="state-grid">
                          <ha-selector
                            .hass=${t}
                            .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "equal",
            label: t.localize(
              "ui.panel.lovelace.editor.condition-editor.condition.state.state_equal"
            )
          },
          {
            value: "not_equal",
            label: t.localize(
              "ui.panel.lovelace.editor.condition-editor.condition.state.state_not_equal"
            )
          }
        ]
      }
    }}
                            .value=${((f = this._config) == null ? void 0 : f.state_mode) || ""}
                            .label=${t.localize("ui.dialogs.entity_registry.editor.invert.label") || "Invert State"}
                            @value-changed=${(m) => {
      this._updatePositionField("state_mode", m.detail.value);
    }}
                          ></ha-selector>
                          <ha-selector
                            .hass=${t}
                            .selector=${{
      state: { entity_id: this._config.entity }
    }}
                            .value=${((u = this._config) == null ? void 0 : u.state_value) || ""}
                            .label=${t.localize("ui.components.entity.entity-state-picker.state") || "State"}
                            @value-changed=${(m) => {
      this._updatePositionField("state_value", m.detail.value);
    }}
                          ></ha-selector>
                        </div>
                      ` : C}
                  <ha-form
                    .hass=${t}
                    .data=${s}
                    .schema=${o}
                    .computeLabel=${this._computeLabelCallback}
                    @value-changed=${this._valueChangedSchema}
                  ></ha-form>
                ` : C}
          `}
    `;
  }
  _renderPopupTab() {
    var e;
    const t = (e = this._config) == null ? void 0 : e.popup_card;
    return t ? _`
      <div class="card-editor">
        <div class="card-header">
          <h3>
            Popup
            ${this.hass.localize(
      "ui.panel.lovelace.editor.edit_card.tab_config"
    )}
          </h3>
          <ha-button
            class="warning"
            @click=${this._removePopupCard}
            .disabled=${!t}
          >
            ${this.hass.localize("ui.common.delete")}
          </ha-button>
        </div>
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${t}
          @config-changed=${this._popupCardChanged}
        ></hui-card-element-editor>
      </div>
    ` : _`
        <div class="card-picker">
          <hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${this._cardPicked}
          ></hui-card-picker>
        </div>
      `;
  }
  _cardPicked(t) {
    t.stopPropagation();
    const e = t.detail.config;
    this._updatePopupCard(e);
  }
  _popupCardChanged(t) {
    t.stopPropagation();
    const e = t.detail.config;
    this._updatePopupCard(e);
  }
  _updatePopupCard(t) {
    if (!this._config) return;
    const e = {
      ...this._config,
      popup_card: t
    };
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: e
      })
    );
  }
  _removePopupCard() {
    if (!this._config) return;
    const { popup_card: t, ...e } = this._config, i = {
      ...this._config,
      popup_card: t
    };
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: i
      })
    );
  }
  _updatePositionField(t, e) {
    if (!this.config) return;
    const i = { ...this.config, [t]: e };
    this._config = i, this.dispatchEvent(
      new CustomEvent("config-changed", { detail: i })
    );
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
    return Se`
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
      ha-form {
        display: block;
      }
      ha-selector {
        width: 100%;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
      ha-tab-group {
        display: block;
        margin-bottom: 16px;
        padding: 0 1em;
      }
      ha-tab-group-tab {
        flex: 1;
      }
      ha-tab-group-tab::part(base) {
        width: 100%;
        justify-content: center;
      }
      .position-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px 8px;
      }
      .position-grid ha-selector {
        width: 100%;
      }
      .state-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr;
        gap: 4px 8px;
        margin-bottom: 16px;
      }
      .state-grid ha-selector {
        width: 100%;
      }
      .manual-selector {
        display: block;
        margin-bottom: 16px;
      }
      .position-group-hint {
        display: block;
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: -8px;
        margin-bottom: 16px;
      }
    `;
  }
};
pe([
  O({ attribute: !1 })
], ae.prototype, "config", 2);
pe([
  O({ attribute: !1 })
], ae.prototype, "hass", 2);
pe([
  O({ type: Boolean })
], ae.prototype, "useSensorSchema", 2);
pe([
  O({ attribute: !1 })
], ae.prototype, "lovelace", 2);
pe([
  Z()
], ae.prototype, "getSchema", 2);
pe([
  Z()
], ae.prototype, "_config", 2);
pe([
  Z()
], ae.prototype, "_activeTab", 2);
ae = pe([
  oe("item-editor")
], ae);
var Jn = Object.defineProperty, Yn = Object.getOwnPropertyDescriptor, q = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? Yn(e, i) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = (s ? n(e, i, a) : n(a)) || a);
  return s && a && Jn(e, i, a), a;
};
const gs = /* @__PURE__ */ new Set();
let G = class extends Y {
  constructor() {
    super(...arguments), this._activeTab = "config", this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this._subElementEditorCustomButton = void 0, this._computeLabelCallback = L(
      (t, e) => Ms(e, t)
    ), this.computeLabel = (t) => this._computeLabelCallback(t, this.hass), this._schema = L(
      (t, e, i, s, a, o) => {
        switch (t) {
          case "appearance":
            return jn(
              e,
              i,
              s,
              a,
              this.hass
            );
          case "actions":
            return Dn();
          case "style":
            return Nn();
          case "config":
          default:
            return In();
        }
      }
    ), this._binaryschema = L(
      (t) => Tn(t)
    ), this._coverschema = L(
      (t) => Bn(t)
    ), this._sensorschema = L(
      (t) => Rn(t)
    ), this._toggleschema = L(
      (t) => Zn(t)
    ), this._popupschema = L(
      (t, e) => {
        const i = this.computeLabel({ name: "name" }), s = this.computeLabel({ name: "state" });
        return [
          {
            name: "columns",
            selector: { number: { min: 1, max: 4 } }
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
    ), this._binaryClassesForArea = L(
      (t, e, i) => this._classesForArea(t, "binary_sensor", void 0, e, i)
    ), this._coverClassesForArea = L(
      (t, e, i) => this._classesForArea(t, "cover", void 0, e, i)
    ), this._sensorClassesForArea = L(
      (t, e, i, s) => this._classesForArea(
        t,
        "sensor",
        e,
        i,
        s
      )
    ), this._toggleDomainsForArea = L(
      (t, e, i) => this._classesForArea(t, "toggle", void 0, e, i)
    ), this._allDomainsForArea = L(
      (t, e, i) => this._classesForArea(t, "all", void 0, e, i)
    ), this._cameraOptionsForArea = L(
      (t, e, i) => {
        const s = re(e, i), a = s ? gs : ce(t, i);
        return le(
          t,
          a,
          e,
          /* @__PURE__ */ new Set(),
          void 0,
          s
        ).filter((n) => j(n) === "camera").map((n) => ({
          value: n,
          label: Ht(this.hass.states, n)
        }));
      }
    ), this._buildBinaryOptions = L(
      (t, e) => this._buildOptions("binary_sensor", t, e)
    ), this._buildCoverOptions = L(
      (t, e) => this._buildOptions("cover", t, e)
    ), this._buildSensorOptions = L(
      (t, e) => this._buildOptions("sensor", t, e)
    ), this._buildToggleOptions = L(
      (t, e) => this._buildOptions("toggle", t, e)
    ), this._buildAllOptions = L(
      (t, e) => this._buildOptions("all", t, e)
    ), this._entityOptions = [], this._toggleEntityHidden = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.hidden_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        hidden_entities: i
      }, T(this, "config-changed", { config: this._config });
    }, this._toggleEntityExcluded = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.excluded_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        excluded_entities: i
      }, T(this, "config-changed", { config: this._config });
    };
  }
  _classesForArea(t, e, i, s, a) {
    var f;
    const o = re(s, a), n = o ? gs : ce(t, a), r = le(
      t,
      n,
      s,
      /* @__PURE__ */ new Set(),
      void 0,
      o
    ), l = ((f = this._config) == null ? void 0 : f.extra_entities) || [], c = r.map((u) => this.hass.states[u]).filter((u) => u !== void 0);
    if (e === "toggle") {
      const u = c.filter(
        (m) => et.includes(j(m.entity_id)) || At.includes(j(m.entity_id))
      );
      return [...new Set(u.map((m) => j(m.entity_id)))];
    }
    if (e === "all") {
      const u = l.map((p) => this.hass.states[p]).filter((p) => p !== void 0), m = [...c, ...u];
      return [...new Set(m.map((p) => j(p.entity_id)))];
    }
    const h = c.filter(
      (u) => {
        var m;
        return j(u.entity_id) === e && !((m = s[u.entity_id]) != null && m.entity_category);
      }
    ).map((u) => u.attributes.device_class || "").filter(
      (u) => u && (e !== "sensor" || !i || i.includes(u))
    );
    return [...new Set(h)];
  }
  _buildOptions(t, e, i) {
    const a = [.../* @__PURE__ */ new Set([...e, ...i])].map((n) => ({
      value: n,
      label: n === "scene" ? "Scene" : t === "toggle" || t === "all" ? this.hass.localize(
        `component.${n}.entity_component._.name`
      ) || n : this.hass.localize(
        `component.${t}.entity_component.${n}.name`
      ) || n
    })), o = Ve(
      this.hass.states,
      this.hass.locale.language
    );
    return a.sort((n, r) => o(n.value, r.value)), a;
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
        const i = t.get("_config"), s = i == null ? void 0 : i.area, a = this._config.area, o = (i == null ? void 0 : i.extra_entities) || [], n = this._config.extra_entities || [], r = (i == null ? void 0 : i.popup_domains) || [], l = ((e = this._config) == null ? void 0 : e.popup_domains) || [], c = o.length !== n.length || !o.every(
          (h) => n.includes(h)
        ), d = r.length !== l.length || !r.every(
          (h) => l.includes(h)
        );
        if (s !== void 0 && s !== a) {
          const h = this._toggleDomainsForArea(
            a,
            this.hass.entities,
            this.hass.devices
          ), f = this._binaryClassesForArea(
            a,
            this.hass.entities,
            this.hass.devices
          ), u = this._coverClassesForArea(
            a,
            this.hass.entities,
            this.hass.devices
          ), m = this._allDomainsForArea(
            a,
            this.hass.entities,
            this.hass.devices
          ), p = h.sort(
            (H, v) => et.indexOf(H) - et.indexOf(v)
          ), g = Object.keys(Be || {}), y = new Map(
            g.map((H, v) => [H, v])
          ), V = m.sort((H, v) => {
            const A = y.has(H) ? y.get(H) : Number.MAX_SAFE_INTEGER, M = y.has(v) ? y.get(v) : Number.MAX_SAFE_INTEGER;
            return A === M ? H.localeCompare(v) : A - M;
          });
          if (this._config.toggle_domains = [
            ...p.filter((H) => H !== "scene" && H !== "script")
          ], this._config.alert_classes = [...f], this._config.cover_classes = [...u], this._config.popup_domains = [...V], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
            const H = this._config.hidden_entities, v = Object.values(this._hiddenEntitiesByDomain()).flat(), A = H.filter((M) => v.includes(M));
            A.length !== H.length && (this._config = {
              ...this._config || {},
              hidden_entities: A
            }, T(this, "config-changed", {
              config: { ...this._config }
            }));
          }
          this.requestUpdate();
        }
        if (c) {
          for (const h of n) {
            const f = j(h);
            this._config.popup_domains.includes(f) || this._config.popup_domains.push(f);
          }
          this.requestUpdate();
        }
        d && this._updateEntityOptions();
      }
      if (!this._numericDeviceClasses) {
        const { numeric_device_classes: i } = await An(this.hass);
        this._numericDeviceClasses = i;
      }
    }
  }
  _updateEntityOptions() {
    if (!this._config || !this.hass) return;
    const t = this._config.area, e = this._config.popup_domains || [], i = ce(t, this.hass.devices), s = le(
      t,
      i,
      this.hass.entities,
      /* @__PURE__ */ new Set(),
      void 0,
      re(this.hass.entities, this.hass.devices)
    );
    this._entityOptions = s.filter((o) => {
      var r;
      return this.hass.states[o] ? !((r = this.hass.entities[o]) != null && r.hidden) && e.includes(j(o)) : !1;
    }).map((o) => ({
      value: o,
      label: o
    }));
    const a = Ve(
      this.hass.states,
      this.hass.locale.language
    );
    this._entityOptions.sort((o, n) => a(o.value, n.value)), this._valueChanged({ detail: { value: this._config } });
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
    }, T(this, "config-changed", { config: { ...this._config } });
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
    t.stopPropagation(), !(!this._config || !this.hass) && T(this, "config-changed", {
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
    var i, s, a;
    const t = ((i = this._subElementEditorCustomButton) == null ? void 0 : i.index) ?? 0, e = ((a = (s = this._config) == null ? void 0 : s.custom_buttons) == null ? void 0 : a[t]) || {};
    return _`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${$i}
            @click=${this._goBackCustomButton}
          ></ha-icon-button>
                <span>${(e == null ? void 0 : e.name) || `Button ${t + 1}`}</span>

        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
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
      s[e] = t.detail, T(this, "config-changed", {
        config: { ...this._config, custom_buttons: s }
      });
    }
  }
  _customizationChangedCustomButtons(t) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = t.detail;
    T(this, "config-changed", {
      config: { ...this._config, custom_buttons: e }
    });
  }
  _renderSubElementEditor(t, e, i) {
    var d, h, f, u;
    const s = `customization_${t}`, a = (d = this._config) == null ? void 0 : d[s], o = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, n = ((h = this[o]) == null ? void 0 : h.index) ?? 0, r = ((f = a == null ? void 0 : a[n]) == null ? void 0 : f.type) ?? "unknown", c = ((u = (t === "domain" ? this.toggleSelectOptions : t === "alert" ? this.binarySelectOptions : t === "cover" ? this.coverSelectOptions : this.sensorSelectOptions).find((m) => m.value === r)) == null ? void 0 : u.label) || this._localizeLegacyType(r);
    return _`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${$i}
            @click=${e}
          ></ha-icon-button>
          <span slot="title">${c}</span>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${(a == null ? void 0 : a[n]) || {}}
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
  _localizeLegacyType(t) {
    const e = t.match(/^(.+?)\s*-\s*(.+)$/);
    if (e) {
      const s = e[1].toLowerCase().replace(" ", "_"), a = e[2].toLowerCase(), o = this.hass.localize(`component.${s}.entity_component._.name`) || e[1];
      let n = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${s}.${a}`
      ) || e[2];
      return n = n.charAt(0).toUpperCase() + n.slice(1), `${o} – ${n}`;
    }
    let i = this.hass.localize(`component.${t}.entity_component._.name`) || t;
    return i = i.charAt(0).toUpperCase() + i.slice(1), i;
  }
  _goBackByKey(t) {
    switch (t) {
      case "domain":
        this._subElementEditorDomain = void 0;
        break;
      case "alert":
        this._subElementEditorAlert = void 0;
        break;
      case "cover":
        this._subElementEditorCover = void 0;
        break;
      case "sensor":
        this._subElementEditorSensor = void 0;
        break;
    }
  }
  _itemChangedByKey(t, e) {
    let i;
    switch (e) {
      case "domain":
        i = this._subElementEditorDomain;
        break;
      case "alert":
        i = this._subElementEditorAlert;
        break;
      case "cover":
        i = this._subElementEditorCover;
        break;
      case "sensor":
        i = this._subElementEditorSensor;
        break;
    }
    const s = `customization_${e}`;
    this._itemChanged(t, i, s);
  }
  _itemChanged(t, e, i) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const s = e == null ? void 0 : e.index;
    if (s != null) {
      const a = [...this._config[i]];
      a[s] = t.detail, T(this, "config-changed", {
        config: { ...this._config, [i]: a }
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
    var i, s, a, o, n, r;
    const e = ((i = this._config) == null ? void 0 : i.area) || "";
    switch (t) {
      case "toggle":
        return this._buildToggleOptions(
          this._toggleDomainsForArea(
            e,
            this.hass.entities,
            this.hass.devices
          ),
          ((s = this._config) == null ? void 0 : s.toggle_domains) || this._toggleDomainsForArea(
            e,
            this.hass.entities,
            this.hass.devices
          )
        );
      case "all":
        return this._buildAllOptions(
          this._allDomainsForArea(e, this.hass.entities, this.hass.devices),
          ((a = this._config) == null ? void 0 : a.popup_domains) || this._allDomainsForArea(e, this.hass.entities, this.hass.devices)
        );
      case "binary":
        return this._buildBinaryOptions(
          this._binaryClassesForArea(
            e,
            this.hass.entities,
            this.hass.devices
          ),
          ((o = this._config) == null ? void 0 : o.alert_classes) || this._binaryClassesForArea(
            e,
            this.hass.entities,
            this.hass.devices
          )
        );
      case "cover":
        return this._buildCoverOptions(
          this._coverClassesForArea(
            e,
            this.hass.entities,
            this.hass.devices
          ),
          ((n = this._config) == null ? void 0 : n.cover_classes) || this._coverClassesForArea(
            e,
            this.hass.entities,
            this.hass.devices
          )
        );
      case "sensor":
        return this._buildSensorOptions(
          this._sensorClassesForArea(
            e,
            this._numericDeviceClasses,
            this.hass.entities,
            this.hass.devices
          ),
          ((r = this._config) == null ? void 0 : r.sensor_classes) || this._sensorClassesForArea(
            e,
            this._numericDeviceClasses,
            this.hass.entities,
            this.hass.devices
          )
        );
    }
  }
  get entityOptions() {
    return this._entityOptions;
  }
  _domainIcon(t, e = "on", i) {
    const s = Be;
    if (t in s) {
      const a = s[t];
      return typeof a == "string" ? a : i && a[i] ? a[i][e === "off" ? "off" : "on"] || a[i] : a[e === "off" ? "off" : "on"] || Object.values(a)[0];
    }
    return Ba;
  }
  _groupAllEntitiesByDomain() {
    var n;
    const t = {}, e = (this.entityOptions || []).map((r) => r.value);
    for (const r of e) {
      const l = j(r);
      t[l] || (t[l] = []), t[l].push(r);
    }
    const i = this._hiddenEntitiesByDomain(), s = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])
    ), a = ((n = this.hass) == null ? void 0 : n.states) || {}, o = Ve(a, this.hass.locale.language);
    return s.sort((r, l) => r.localeCompare(l)).map((r) => {
      const l = /* @__PURE__ */ new Set([
        ...t[r] || [],
        ...i[r] || []
      ]);
      return { domain: r, entities: Array.from(l).sort(o) };
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
    var n, r, l;
    const i = ((n = this.hass) == null ? void 0 : n.states) || {}, s = {};
    for (const c of e) {
      const d = ((l = (r = i[c]) == null ? void 0 : r.attributes) == null ? void 0 : l.device_class) || "";
      d && (s[d] || (s[d] = []), s[d].push(c));
    }
    const a = Ve(i, this.hass.locale.language);
    return Object.keys(s).sort((c, d) => c.localeCompare(d)).map((c) => ({
      deviceClass: c,
      label: this._getDeviceClassLabel(t, c),
      entities: s[c].slice().sort(a)
    }));
  }
  _hiddenEntitiesByDomain() {
    var h, f, u, m, p, g, y;
    const t = {}, e = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const i = ((f = this.hass) == null ? void 0 : f.entities) || {}, s = ((u = this.hass) == null ? void 0 : u.devices) || {}, a = (m = this.hass) != null && m.areas ? Object.values(this.hass.areas) : [], o = (p = this._config) == null ? void 0 : p.area, n = (g = this._config) == null ? void 0 : g.floor, r = (y = this._config) == null ? void 0 : y.label, l = o ? Array.isArray(o) ? o : [o] : [], c = n ? Array.isArray(n) ? n : [n] : [], d = r ? Array.isArray(r) ? r : [r] : [];
    for (const V of e) {
      const H = j(V), v = i[V], A = v != null && v.device_id ? s[v.device_id] : void 0;
      if (((v == null ? void 0 : v.area_id) != null || (A == null ? void 0 : A.area_id) != null) && !(d.length && !(Array.isArray(v == null ? void 0 : v.labels) && v.labels.some(($) => d.includes($)) || Array.isArray(A == null ? void 0 : A.labels) && A.labels.some(($) => d.includes($)))) && !(l.length && !(v != null && v.area_id && l.includes(v.area_id) || A != null && A.area_id && l.includes(A.area_id)))) {
        if (c.length) {
          const z = (v == null ? void 0 : v.area_id) && a.some(
            (b) => b.area_id === v.area_id && b.floor_id && c.includes(b.floor_id)
          ), $ = (A == null ? void 0 : A.area_id) && a.some(
            (b) => b.area_id === A.area_id && b.floor_id && c.includes(b.floor_id)
          );
          if (!z && !$) continue;
        }
        t[H] || (t[H] = []), t[H].push(V);
      }
    }
    return t;
  }
  render() {
    var f;
    if (!this.hass || !this._config)
      return C;
    const t = this._toggleDomainsForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), e = this._binaryClassesForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), i = this._coverClassesForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), s = this._allDomainsForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), a = this._cameraOptionsForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), o = this._schema(
      this._activeTab,
      this._config.design || "V1",
      this._config.display_type,
      this._config.camera_mode,
      a,
      this.hass.locale.language
    ), n = this._binaryschema(this.binarySelectOptions), r = this._coverschema(this.coverSelectOptions), l = this._sensorschema(this.sensorSelectOptions), c = this._toggleschema(this.toggleSelectOptions), d = this._popupschema(
      this.AllSelectOptions,
      this.entityOptions
    ), h = {
      alert_classes: e,
      cover_classes: i,
      sensor_classes: Lt.sensor,
      toggle_domains: t,
      popup_domains: s,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorByKey("domain") : this._subElementEditorAlert ? this._renderSubElementEditorByKey("alert") : this._subElementEditorCover ? this._renderSubElementEditorByKey("cover") : this._subElementEditorSensor ? this._renderSubElementEditorByKey("sensor") : this._subElementEditorCustomButton ? this._renderSubElementEditorCustomButton() : _`
      <ha-tab-group>
        <ha-tab-group-tab
          .active=${this._activeTab === "config"}
          @click=${() => this._activeTab = "config"}
        >
          ${this.hass.localize(
      "ui.panel.lovelace.editor.edit_card.tab_config"
    ) ?? "Configuration"}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "appearance"}
          @click=${() => this._activeTab = "appearance"}
        >
          ${this.hass.localize(
      "ui.panel.lovelace.editor.card.map.appearance"
    ) || "Appearance"}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "actions"}
          @click=${() => this._activeTab = "actions"}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.card.generic.actions")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "style"}
          @click=${() => this._activeTab = "style"}
        >
          Style
        </ha-tab-group-tab>
      </ha-tab-group>

      ${this._activeTab === "style" ? _`
            <ha-alert alert-type="info" title="Style Guide">
              <p>
                You can use standard CSS per identifier. <br />
                <strong>Identifiers:</strong>
              </p>
              <ul>
                <li><b>card</b>: Card Background/Border</li>
                <li><b>icon</b>: Main Area Icon</li>
                <li><b>name</b>: Area Name</li>
                <li><b>domain</b>: Standard Buttons (Light, Switch...)</li>
                <li><b>cover</b>: Cover Buttons</li>
                <li><b>sensor</b>: Sensor Elements</li>
                <li><b>alert</b>: Alert Chips</li>
                <li><b>image</b>: Area Picture</li>
                <li><b>camera</b>: Camera View</li>
              </ul>
              <p>
                <strong>Animations:</strong> <br />
                spin, pulse, shake, blink, bounce
              </p>
              <p><strong>Example:</strong></p>
              <pre>
card:
  background-color: rgba(255, 0, 0, 0.1);
  border: none;              
icon:
  animation: spin 2s linear infinite;
  --mdc-icon-size: 40px;
  color: var(--primary-color);
name:
  font-size: 15px;  
domain:
  --mdc-icon-size: 24px;
image:
  opacity: 0.5;  
              </pre
              >
            </ha-alert>
          ` : C}

      <ha-form
        .hass=${this.hass}
        .data=${h}
        .schema=${o}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      ${this._activeTab === "config" ? _`
            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon .path=${ca}></ha-svg-icon>
                ${this.computeLabel({ name: "alert_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${h}
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
                <ha-svg-icon .path=${Qe}></ha-svg-icon>
                ${this.computeLabel({ name: "cover_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${h}
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
                <ha-svg-icon .path=${Va}></ha-svg-icon>
                ${this.computeLabel({ name: "sensor_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${h}
                  .schema=${l}
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
                <ha-svg-icon .path=${xa}></ha-svg-icon>
                ${this.computeLabel({ name: "toggle_domains" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${h}
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
                <ha-svg-icon .path=${ot}></ha-svg-icon>
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
                <ha-svg-icon .path=${zo}></ha-svg-icon>
                ${this.computeLabel({ name: "popup" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${h}
                  .schema=${d}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>

                <ha-expansion-panel outlined class="main">
                  <div slot="header" role="heading" aria-level="3">
                    <ha-svg-icon .path=${mt}></ha-svg-icon>
                    ${this.computeLabel({ name: "hidden_entities" })}
                  </div>
                  <div class="content">
                    <ha-form
                      .hass=${this.hass}
                      .data=${{
      category_filter: (f = this._config) == null ? void 0 : f.category_filter
    }}
                      .schema=${[
      {
        name: "category_filter",
        selector: {
          select: {
            options: [
              "config",
              "diagnostic",
              "config+diagnostic"
            ],
            mode: "dropdown"
          }
        }
      }
    ]}
                      .computeLabel=${this.computeLabel}
                      @value-changed=${(u) => this._hiddenCategoryChanged(u)}
                    ></ha-form>
                    ${this._groupAllEntitiesByDomain().map(
      (u) => _`
                        <ha-expansion-panel outlined class="domain-panel">
                          <div slot="header" class="domain-header">
                            <ha-svg-icon
                              .path=${this._domainIcon(u.domain, "on")}
                            ></ha-svg-icon>
                            <span class="domain-title"
                              >${this._domainLabel(u.domain)}</span
                            >
                          </div>
                          <div class="content">
                            ${["binary_sensor", "cover"].includes(u.domain) ? this._groupByDeviceClass(
        u.domain,
        u.entities
      ).map(
        (m) => _`
                                    <ha-expansion-panel
                                      outlined
                                      class="domain-panel"
                                    >
                                      <div slot="header" class="dc-header">
                                        <ha-svg-icon
                                          .path=${this._domainIcon(
          u.domain,
          "on",
          m.deviceClass
        )}
                                        ></ha-svg-icon>
                                        <span class="dc-title"
                                          >${m.label}</span
                                        >
                                      </div>
                                      <div class="content">
                                        ${m.entities.map(
          (p) => {
            var g, y;
            return _`
                                            <div class="entity-row">
                                              <span class="entity-name">
                                                ${((y = (g = this.hass.states[p]) == null ? void 0 : g.attributes) == null ? void 0 : y.friendly_name) || p}
                                              </span>
                                              <ha-icon-button
                                                .path=${this._isHiddenEntity(p) ? mt : zi}
                                                .label=${this._isHiddenEntity(
              p
            ) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                                @click=${() => this._toggleEntityHidden(p)}
                                              ></ha-icon-button>
                                              <ha-icon-button
                                                .path=${this._isExcludedEntity(
              p
            ) ? Pi : Oi}
                                                .label=${this._isExcludedEntity(
              p
            ) ? "Include" : "Exclude"}
                                                @click=${() => this._toggleEntityExcluded(
              p
            )}
                                              ></ha-icon-button>
                                            </div>
                                          `;
          }
        )}
                                      </div>
                                    </ha-expansion-panel>
                                  `
      ) : u.entities.map(
        (m) => {
          var p, g;
          return _`
                                    <div class="entity-row">
                                      <span class="entity-name">
                                        ${((g = (p = this.hass.states[m]) == null ? void 0 : p.attributes) == null ? void 0 : g.friendly_name) || m}
                                      </span>
                                      <ha-icon-button
                                        .path=${this._isHiddenEntity(m) ? mt : zi}
                                        .label=${this._isHiddenEntity(m) ? this.hass.localize(
            "ui.common.show"
          ) ?? "Show" : this.hass.localize(
            "ui.common.hide"
          ) ?? "Hide"}
                                        @click=${() => this._toggleEntityHidden(m)}
                                      ></ha-icon-button>
                                      <ha-icon-button
                                        .path=${this._isExcludedEntity(m) ? Pi : Oi}
                                        .label=${this._isExcludedEntity(m) ? "Include" : "Exclude"}
                                        @click=${() => this._toggleEntityExcluded(m)}
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
          ` : C}
    `;
  }
};
G.styles = Se`
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
    ha-form {
      display: block;
    }
    ha-selector {
      width: 100%;
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
    ha-tab-group {
      display: block;
      margin-bottom: 16px;
      padding: 0 1em;
    }
    ha-tab-group-tab {
      flex: 1;
    }
    ha-tab-group-tab::part(base) {
      width: 100%;
      justify-content: center;
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
q([
  O({ attribute: !1 })
], G.prototype, "hass", 2);
q([
  O({ attribute: !1 })
], G.prototype, "lovelace", 2);
q([
  Z()
], G.prototype, "_config", 2);
q([
  Z()
], G.prototype, "_activeTab", 2);
q([
  Z()
], G.prototype, "_numericDeviceClasses", 2);
q([
  Z()
], G.prototype, "_subElementEditorDomain", 2);
q([
  Z()
], G.prototype, "_subElementEditorAlert", 2);
q([
  Z()
], G.prototype, "_subElementEditorCover", 2);
q([
  Z()
], G.prototype, "_subElementEditorSensor", 2);
q([
  Z()
], G.prototype, "_subElementEditorCustomButton", 2);
G = q([
  oe("area-card-plus-editor")
], G);
console.info(
  `%c AREA-CARD %c ${ws.version} `,
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
