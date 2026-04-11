const Es = "v1.2.1", Os = {
  version: Es
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, It = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = Symbol(), t1 = /* @__PURE__ */ new WeakMap();
let vs = class {
  constructor(e, s, i) {
    if (this._$cssResult$ = !0, i !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (It && e === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (e = t1.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && t1.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ks = (t) => new vs(typeof t == "string" ? t : t + "", void 0, Tt), Ee = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce(((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1]), t[0]);
  return new vs(s, t, Tt);
}, Ds = (t, e) => {
  if (It) t.adoptedStyleSheets = e.map(((s) => s instanceof CSSStyleSheet ? s : s.styleSheet));
  else for (const s of e) {
    const i = document.createElement("style"), o = ot.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, t.appendChild(i);
  }
}, s1 = It ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const i of e.cssRules) s += i.cssText;
  return ks(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ps, defineProperty: zs, getOwnPropertyDescriptor: Is, getOwnPropertyNames: Ts, getOwnPropertySymbols: Zs, getPrototypeOf: Ns } = Object, ue = globalThis, i1 = ue.trustedTypes, Bs = i1 ? i1.emptyScript : "", ft = ue.reactiveElementPolyfillSupport, Ie = (t, e) => t, rt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Bs : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, Zt = (t, e) => !Ps(t, e), o1 = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: Zt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ue.litPropertyMetadata ?? (ue.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Me = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = o1) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, s);
      o !== void 0 && zs(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, s, i) {
    const { get: o, set: n } = Is(this.prototype, e) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: o, set(r) {
      const a = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? o1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ie("elementProperties"))) return;
    const e = Ns(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ie("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ie("properties"))) {
      const s = this.properties, i = [...Ts(s), ...Zs(s)];
      for (const o of i) this.createProperty(o, s[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [i, o] of s) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const o = this._$Eu(s, i);
      o !== void 0 && this._$Eh.set(o, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i) s.unshift(s1(o));
    } else e !== void 0 && s.push(s1(e));
    return s;
  }
  static _$Eu(e, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise(((s) => this.enableUpdating = s)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach(((s) => s(this)));
  }
  addController(e) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var s;
    (s = this._$EO) == null || s.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ds(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach(((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach(((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    }));
  }
  attributeChangedCallback(e, s, i) {
    this._$AK(e, i);
  }
  _$ET(e, s) {
    var n;
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : rt).toAttribute(s, i.type);
      this._$Em = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : rt;
      this._$Em = o;
      const l = c.fromAttribute(s, a.type);
      this[o] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, s, i) {
    var o;
    if (e !== void 0) {
      const n = this.constructor, r = this[e];
      if (i ?? (i = n.getPropertyOptions(e)), !((i.hasChanged ?? Zt)(r, s) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? s ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (s = void 0), this._$AL.set(e, s)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
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
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach(((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      })), this.update(s)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var s;
    (s = this._$EO) == null || s.forEach(((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach(((s) => this._$ET(s, this[s])))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Me.elementStyles = [], Me.shadowRootOptions = { mode: "open" }, Me[Ie("elementProperties")] = /* @__PURE__ */ new Map(), Me[Ie("finalized")] = /* @__PURE__ */ new Map(), ft == null || ft({ ReactiveElement: Me }), (ue.reactiveElementVersions ?? (ue.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = globalThis, ct = Te.trustedTypes, n1 = ct ? ct.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ys = "$lit$", de = `lit$${Math.random().toFixed(9).slice(2)}$`, Ls = "?" + de, Rs = `<${Ls}>`, be = document, Be = () => be.createComment(""), Re = (t) => t === null || typeof t != "object" && typeof t != "function", Nt = Array.isArray, Fs = (t) => Nt(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", gt = `[ 	
\f\r]`, ze = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, a1 = /-->/g, r1 = />/g, ge = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), c1 = /'/g, l1 = /"/g, As = /^(?:script|style|textarea|title)$/i, Us = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), g = Us(1), oe = Symbol.for("lit-noChange"), V = Symbol.for("lit-nothing"), h1 = /* @__PURE__ */ new WeakMap(), Le = be.createTreeWalker(be, 129);
function bs(t, e) {
  if (!Nt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return n1 !== void 0 ? n1.createHTML(e) : e;
}
const js = (t, e) => {
  const s = t.length - 1, i = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = ze;
  for (let a = 0; a < s; a++) {
    const c = t[a];
    let l, d, h = -1, _ = 0;
    for (; _ < c.length && (r.lastIndex = _, d = r.exec(c), d !== null); ) _ = r.lastIndex, r === ze ? d[1] === "!--" ? r = a1 : d[1] !== void 0 ? r = r1 : d[2] !== void 0 ? (As.test(d[2]) && (o = RegExp("</" + d[2], "g")), r = ge) : d[3] !== void 0 && (r = ge) : r === ge ? d[0] === ">" ? (r = o ?? ze, h = -1) : d[1] === void 0 ? h = -2 : (h = r.lastIndex - d[2].length, l = d[1], r = d[3] === void 0 ? ge : d[3] === '"' ? l1 : c1) : r === l1 || r === c1 ? r = ge : r === a1 || r === r1 ? r = ze : (r = ge, o = void 0);
    const p = r === ge && t[a + 1].startsWith("/>") ? " " : "";
    n += r === ze ? c + Rs : h >= 0 ? (i.push(l), c.slice(0, h) + ys + c.slice(h) + de + p) : c + de + (h === -2 ? a : p);
  }
  return [bs(t, n + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Fe {
  constructor({ strings: e, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = e.length - 1, c = this.parts, [l, d] = js(e, s);
    if (this.el = Fe.createElement(l, i), Le.currentNode = this.el.content, s === 2 || s === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = Le.nextNode()) !== null && c.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(ys)) {
          const _ = d[r++], p = o.getAttribute(h).split(de), m = /([.?@])?(.*)/.exec(_);
          c.push({ type: 1, index: n, name: m[2], strings: p, ctor: m[1] === "." ? Ks : m[1] === "?" ? Gs : m[1] === "@" ? qs : pt }), o.removeAttribute(h);
        } else h.startsWith(de) && (c.push({ type: 6, index: n }), o.removeAttribute(h));
        if (As.test(o.tagName)) {
          const h = o.textContent.split(de), _ = h.length - 1;
          if (_ > 0) {
            o.textContent = ct ? ct.emptyScript : "";
            for (let p = 0; p < _; p++) o.append(h[p], Be()), Le.nextNode(), c.push({ type: 2, index: ++n });
            o.append(h[_], Be());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ls) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(de, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += de.length - 1;
      }
      n++;
    }
  }
  static createElement(e, s) {
    const i = be.createElement("template");
    return i.innerHTML = e, i;
  }
}
function Se(t, e, s = t, i) {
  var r, a;
  if (e === oe) return e;
  let o = i !== void 0 ? (r = s._$Co) == null ? void 0 : r[i] : s._$Cl;
  const n = Re(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (e = Se(t, o._$AS(t, e.values), o, i)), e;
}
let Ws = class {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: i } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? be).importNode(s, !0);
    Le.currentNode = o;
    let n = Le.nextNode(), r = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let l;
        c.type === 2 ? l = new Oe(n, n.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (l = new Ys(n, this, e)), this._$AV.push(l), c = i[++a];
      }
      r !== (c == null ? void 0 : c.index) && (n = Le.nextNode(), r++);
    }
    return Le.currentNode = be, o;
  }
  p(e) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, s), s += i.strings.length - 2) : i._$AI(e[s])), s++;
  }
};
class Oe {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, s, i, o) {
    this.type = 2, this._$AH = V, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = Se(this, e, s), Re(e) ? e === V || e == null || e === "" ? (this._$AH !== V && this._$AR(), this._$AH = V) : e !== this._$AH && e !== oe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Fs(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== V && Re(this._$AH) ? this._$AA.nextSibling.data = e : this.T(be.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: s, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Fe.createElement(bs(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(s);
    else {
      const r = new Ws(o, this), a = r.u(this.options);
      r.p(s), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let s = h1.get(e.strings);
    return s === void 0 && h1.set(e.strings, s = new Fe(e)), s;
  }
  k(e) {
    Nt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const n of e) o === s.length ? s.push(i = new Oe(this.O(Be()), this.O(Be()), this, this.options)) : i = s[o], i._$AI(n), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e, (s = this._$AP) == null || s.call(this, e));
  }
}
class pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, i, o, n) {
    this.type = 1, this._$AH = V, this._$AN = void 0, this.element = e, this.name = s, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = V;
  }
  _$AI(e, s = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = Se(this, e, s, 0), r = !Re(e) || e !== this._$AH && e !== oe, r && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = n[0], c = 0; c < n.length - 1; c++) l = Se(this, a[i + c], s, c), l === oe && (l = this._$AH[c]), r || (r = !Re(l) || l !== this._$AH[c]), l === V ? e = V : e !== V && (e += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ks extends pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === V ? void 0 : e;
  }
}
class Gs extends pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== V);
  }
}
class qs extends pt {
  constructor(e, s, i, o, n) {
    super(e, s, i, o, n), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = Se(this, e, s, 0) ?? V) === oe) return;
    const i = this._$AH, o = e === V && i !== V || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== V && (i === V || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ys {
  constructor(e, s, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Se(this, e);
  }
}
const Xs = { I: Oe }, Ct = Te.litHtmlPolyfillSupport;
Ct == null || Ct(Fe, Oe), (Te.litHtmlVersions ?? (Te.litHtmlVersions = [])).push("3.3.1");
const Hs = (t, e, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new Oe(e.insertBefore(Be(), n), n, void 0, s ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis;
let ie = class extends Me {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const e = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = e.firstChild), e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Hs(s, this.renderRoot, this.renderOptions);
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
    return oe;
  }
};
var Cs;
ie._$litElement$ = !0, ie.finalized = !0, (Cs = Ae.litElementHydrateSupport) == null || Cs.call(Ae, { LitElement: ie });
const vt = Ae.litElementPolyfillSupport;
vt == null || vt({ LitElement: ie });
(Ae.litElementVersions ?? (Ae.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Js = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: Zt }, Qs = (t = Js, e, s) => {
  const { kind: i, metadata: o } = s;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(s.name, t), i === "accessor") {
    const { name: r } = s;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, c, t);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(a) {
      const c = this[r];
      e.call(this, a), this.requestUpdate(r, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function z(t) {
  return (e, s) => typeof s == "object" ? Qs(t, e, s) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(t) {
  return z({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = { ATTRIBUTE: 1, CHILD: 2 }, qe = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Ye = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, s, i) {
    this._$Ct = e, this._$AM = s, this._$Ci = i;
  }
  _$AS(e, s) {
    return this.update(e, s);
  }
  update(e, s) {
    return this.render(...s);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = qe(class extends Ye {
  constructor(t) {
    var e;
    if (super(t), t.type !== Bt.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(((e) => t[e])).join(" ") + " ";
  }
  update(t, [e]) {
    var i, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(((n) => n !== ""))));
      for (const n in e) e[n] && !((i = this.nt) != null && i.has(n)) && this.st.add(n);
      return this.render(e);
    }
    const s = t.element.classList;
    for (const n of this.st) n in e || (s.remove(n), this.st.delete(n));
    for (const n in e) {
      const r = !!e[n];
      r === this.st.has(n) || (o = this.nt) != null && o.has(n) || (r ? (s.add(n), this.st.add(n)) : (s.remove(n), this.st.delete(n)));
    }
    return oe;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: ei } = Xs, d1 = (t, e) => (t == null ? void 0 : t._$litType$) !== void 0, ti = (t) => {
  var e;
  return ((e = t == null ? void 0 : t._$litType$) == null ? void 0 : e.h) != null;
}, u1 = () => document.createComment(""), ve = (t, e, s) => {
  var n;
  const i = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (s === void 0) {
    const r = i.insertBefore(u1(), o), a = i.insertBefore(u1(), o);
    s = new ei(r, a, t, t.options);
  } else {
    const r = s._$AB.nextSibling, a = s._$AM, c = a !== t;
    if (c) {
      let l;
      (n = s._$AQ) == null || n.call(s, t), s._$AM = t, s._$AP !== void 0 && (l = t._$AU) !== a._$AU && s._$AP(l);
    }
    if (r !== o || c) {
      let l = s._$AA;
      for (; l !== r; ) {
        const d = l.nextSibling;
        i.insertBefore(l, o), l = d;
      }
    }
  }
  return s;
}, Ce = (t, e, s = t) => (t._$AI(e, s), t), si = {}, Mt = (t, e = si) => t._$AH = e, wt = (t) => t._$AH, yt = (t) => {
  t._$AR(), t._$AA.remove();
}, ii = (t) => {
  t._$AR();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const p1 = (t) => ti(t) ? t._$litType$.h : t.strings, _1 = qe(class extends Ye {
  constructor(t) {
    super(t), this.et = /* @__PURE__ */ new WeakMap();
  }
  render(t) {
    return [t];
  }
  update(t, [e]) {
    const s = d1(this.it) ? p1(this.it) : null, i = d1(e) ? p1(e) : null;
    if (s !== null && (i === null || s !== i)) {
      const o = wt(t).pop();
      let n = this.et.get(s);
      if (n === void 0) {
        const r = document.createDocumentFragment();
        n = Hs(V, r), n.setConnected(!1), this.et.set(s, n);
      }
      Mt(n, [o]), ve(n, void 0, o);
    }
    if (i !== null) {
      if (s === null || s !== i) {
        const o = this.et.get(i);
        if (o !== void 0) {
          const n = wt(o).pop();
          ii(t), ve(t, void 0, n), Mt(t, [n]);
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
const Vs = "important", oi = " !" + Vs, E = qe(class extends Ye {
  constructor(t) {
    var e;
    if (super(t), t.type !== Bt.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce(((e, s) => {
      const i = t[s];
      return i == null ? e : e + `${s = s.includes("-") ? s : s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }), "");
  }
  update(t, [e]) {
    const { style: s } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const i of this.ft) e[i] == null && (this.ft.delete(i), i.includes("-") ? s.removeProperty(i) : s[i] = null);
    for (const i in e) {
      const o = e[i];
      if (o != null) {
        this.ft.add(i);
        const n = typeof o == "string" && o.endsWith(oi);
        i.includes("-") || n ? s.setProperty(i, n ? o.slice(0, -11) : o, n ? Vs : "") : s[i] = o;
      }
    }
    return oe;
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const m1 = (t, e, s) => {
  const i = /* @__PURE__ */ new Map();
  for (let o = e; o <= s; o++) i.set(t[o], o);
  return i;
}, se = qe(class extends Ye {
  constructor(t) {
    if (super(t), t.type !== Bt.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, s) {
    let i;
    s === void 0 ? s = e : e !== void 0 && (i = e);
    const o = [], n = [];
    let r = 0;
    for (const a of t) o[r] = i ? i(a, r) : r, n[r] = s(a, r), r++;
    return { values: n, keys: o };
  }
  render(t, e, s) {
    return this.dt(t, e, s).values;
  }
  update(t, [e, s, i]) {
    const o = wt(t), { values: n, keys: r } = this.dt(e, s, i);
    if (!Array.isArray(o)) return this.ut = r, n;
    const a = this.ut ?? (this.ut = []), c = [];
    let l, d, h = 0, _ = o.length - 1, p = 0, m = n.length - 1;
    for (; h <= _ && p <= m; ) if (o[h] === null) h++;
    else if (o[_] === null) _--;
    else if (a[h] === r[p]) c[p] = Ce(o[h], n[p]), h++, p++;
    else if (a[_] === r[m]) c[m] = Ce(o[_], n[m]), _--, m--;
    else if (a[h] === r[m]) c[m] = Ce(o[h], n[m]), ve(t, c[m + 1], o[h]), h++, m--;
    else if (a[_] === r[p]) c[p] = Ce(o[_], n[p]), ve(t, o[h], o[_]), _--, p++;
    else if (l === void 0 && (l = m1(r, p, m), d = m1(a, h, _)), l.has(a[h])) if (l.has(a[_])) {
      const f = d.get(r[p]), u = f !== void 0 ? o[f] : null;
      if (u === null) {
        const C = ve(t, o[h]);
        Ce(C, n[p]), c[p] = C;
      } else c[p] = Ce(u, n[p]), ve(t, o[h], u), o[f] = null;
      p++;
    } else yt(o[_]), _--;
    else yt(o[h]), h++;
    for (; p <= m; ) {
      const f = ve(t, c[m + 1]);
      Ce(f, n[p]), c[p++] = f;
    }
    for (; h <= _; ) {
      const f = o[h++];
      f !== null && yt(f);
    }
    return this.ut = r, Mt(t, c), oe;
  }
});
var f1 = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function ni(t, e) {
  return !!(t === e || f1(t) && f1(e));
}
function ai(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var s = 0; s < t.length; s++)
    if (!ni(t[s], e[s]))
      return !1;
  return !0;
}
function L(t, e) {
  e === void 0 && (e = ai);
  var s = null;
  function i() {
    for (var o = [], n = 0; n < arguments.length; n++)
      o[n] = arguments[n];
    if (s && s.lastThis === this && e(o, s.lastArgs))
      return s.lastResult;
    var r = t.apply(this, o);
    return s = {
      lastResult: r,
      lastArgs: o,
      lastThis: this
    }, r;
  }
  return i.clear = function() {
    s = null;
  }, i;
}
var g1 = "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z", C1 = "M12,4A4,4 0 0,1 16,8C16,9.95 14.6,11.58 12.75,11.93L8.07,7.25C8.42,5.4 10.05,4 12,4M12.28,14L18.28,20L20,21.72L18.73,23L15.73,20H4V18C4,16.16 6.5,14.61 9.87,14.14L2.78,7.05L4.05,5.78L12.28,14M20,18V19.18L15.14,14.32C18,14.93 20,16.35 20,18Z", v1 = "M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z", ri = "M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5", ci = "M22.1 21.5L2.4 1.7L1.1 3L3.8 5.7C3.3 6.3 3 7.1 3 8V22H18V19.9L20.8 22.7L22.1 21.5M9.6 11.5L12.4 14.3C12.1 14.7 11.6 15 11 15C9.9 15 9 14.1 9 13C9 12.4 9.3 11.9 9.6 11.5M16 17.9V20H5V8C5 7.7 5.1 7.4 5.2 7.1L8.2 10.1C7.5 10.8 7 11.9 7 13C7 15.2 8.8 17 11 17C12.1 17 13.2 16.5 13.9 15.8L16 17.9M17 13.8C17.1 12.5 19 10.5 19 10.5S21 12.7 21 14C21 15 20.2 15.9 19.2 16L17 13.8M9.2 6L7.2 4H14C16.2 4 18 5.8 18 8V9H16V8C16 6.9 15.1 6 14 6H9.2Z", li = "M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z", hi = "M18 14.8L9 5.8C9.9 5.3 10.9 5 12 5C15.3 5 18 7.7 18 11V14.8M20.1 4.8L18.7 3.4L16.6 5.5L18 6.9L20.1 4.8M19.5 10.5V12.5H22.5V10.5H19.5M4.5 10.5H1.5V12.5H4.5V10.5M1.1 3L6.6 8.5C6.2 9.2 6 10.1 6 11V19H17.1L18.1 20H6C4.9 20 4 20.9 4 22H20.1L20.8 22.7L22.1 21.4L2.4 1.7L1.1 3M13 1H11V4H13V1Z", di = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", ui = "M18.75 22.16L16 19.16L17.16 18L18.75 19.59L22.34 16L23.5 17.41L18.75 22.16M11 15H13V17H11V15M11 7H13V13H11V7M12 2C17.5 2 22 6.5 22 12L21.92 13.31C21.31 13.11 20.67 13 19.94 13L20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C12.71 20 13.39 19.91 14.05 19.74C14.13 20.42 14.33 21.06 14.62 21.65C13.78 21.88 12.9 22 12 22C6.47 22 2 17.5 2 12C2 6.5 6.47 2 12 2Z", pi = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z", y1 = "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z", L1 = "M18 12C18 11 17.74 10.04 17.3 9.2L18.76 7.74C19.54 8.97 20 10.43 20 12C20 13.39 19.64 14.68 19 15.82L17.5 14.32C17.82 13.6 18 12.83 18 12M2.39 1.73L1.11 3L5.5 7.37C4.55 8.68 4 10.27 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13 6 12C6 10.83 6.34 9.74 6.92 8.81L15.19 17.08C14.26 17.66 13.17 18 12 18V15L8 19L12 23V20C13.73 20 15.32 19.45 16.63 18.5L20.84 22.73L22.11 21.46L2.39 1.73M12 6V8.8L12.1 8.9L16 5L12 1V4C10.62 4 9.32 4.36 8.18 5L9.68 6.5C10.4 6.18 11.18 6 12 6Z", A1 = "M5.06 7C4.63 7 4.22 7.14 3.84 7.42C3.46 7.7 3.24 8.06 3.14 8.5L2.11 12.91C1.86 14 2.06 14.92 2.69 15.73C2.81 15.85 2.93 15.97 3.04 16.07C3.63 16.64 4.28 17 5.22 17C6.16 17 6.91 16.59 7.47 16.05C8.1 16.67 8.86 17 9.8 17C10.64 17 11.44 16.63 12 16.07C12.68 16.7 13.45 17 14.3 17C15.17 17 15.91 16.67 16.54 16.05C17.11 16.62 17.86 17 18.81 17C19.76 17 20.43 16.65 21 16.06C21.09 15.97 21.18 15.87 21.28 15.77C21.94 14.95 22.14 14 21.89 12.91L20.86 8.5C20.73 8.06 20.5 7.7 20.13 7.42C19.77 7.14 19.38 7 18.94 7H5.06M18.89 8.97L19.97 13.38C20.06 13.81 19.97 14.2 19.69 14.55C19.44 14.86 19.13 15 18.75 15C18.44 15 18.17 14.9 17.95 14.66C17.73 14.43 17.61 14.16 17.58 13.84L16.97 9L18.89 8.97M5.06 9H7.03L6.42 13.84C6.3 14.63 5.91 15 5.25 15C4.84 15 4.53 14.86 4.31 14.55C4.03 14.2 3.94 13.81 4.03 13.38L5.06 9M9.05 9H11V13.7C11 14.05 10.89 14.35 10.64 14.62C10.39 14.88 10.08 15 9.7 15C9.36 15 9.07 14.88 8.84 14.59C8.61 14.3 8.5 14 8.5 13.66V13.5L9.05 9M13 9H14.95L15.5 13.5C15.58 13.92 15.5 14.27 15.21 14.57C14.95 14.87 14.61 15 14.2 15C13.89 15 13.61 14.88 13.36 14.62C13.11 14.35 13 14.05 13 13.7V9Z", _i = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z", mi = "M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z", fi = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15", gi = "M16.75 21.16L14 18.16L15.16 17L16.75 18.59L20.34 15L21.5 16.41L16.75 21.16M12 18C12 14.69 14.69 12 18 12V5.33C18 4.6 17.4 4 16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H13.54C12.58 20.94 12 19.54 12 18Z", Ci = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21", b1 = "M20.84,22.73L18.11,20H3V19L5,17V11C5,9.86 5.29,8.73 5.83,7.72L1.11,3L2.39,1.73L22.11,21.46L20.84,22.73M19,15.8V11C19,7.9 16.97,5.17 14,4.29C14,4.19 14,4.1 14,4A2,2 0 0,0 12,2A2,2 0 0,0 10,4C10,4.1 10,4.19 10,4.29C9.39,4.47 8.8,4.74 8.26,5.09L19,15.8M12,23A2,2 0 0,0 14,21H10A2,2 0 0,0 12,23Z", vi = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z", yi = "M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z", Li = "M3 2H21C21.55 2 22 2.45 22 3V5C22 5.55 21.55 6 21 6H20V7C20 7.55 19.55 8 19 8H13V10.17C14.17 10.58 15 11.7 15 13C15 14.66 13.66 16 12 16C10.34 16 9 14.66 9 13C9 11.69 9.84 10.58 11 10.17V8H5C4.45 8 4 7.55 4 7V6H3C2.45 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2M12 12C11.45 12 11 12.45 11 13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13C13 12.45 12.55 12 12 12Z", H1 = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z", Qe = "M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z", V1 = "M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M9.31,17L11.75,14.56L14.19,17L15.25,15.94L12.81,13.5L15.25,11.06L14.19,10L11.75,12.44L9.31,10L8.25,11.06L10.69,13.5L8.25,15.94L9.31,17Z", $1 = "M19 19H5V8H19M16 1V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1M10.88 12H7.27L10.19 14.11L9.08 17.56L12 15.43L14.92 17.56L13.8 14.12L16.72 12H13.12L12 8.56L10.88 12Z", Ai = "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z", bi = "M1.2,4.47L2.5,3.2L20,20.72L18.73,22L16.73,20H4A2,2 0 0,1 2,18V6C2,5.78 2.04,5.57 2.1,5.37L1.2,4.47M7,4L9,2H15L17,4H20A2,2 0 0,1 22,6V18C22,18.6 21.74,19.13 21.32,19.5L16.33,14.5C16.76,13.77 17,12.91 17,12A5,5 0 0,0 12,7C11.09,7 10.23,7.24 9.5,7.67L5.82,4H7M7,12A5,5 0 0,0 12,17C12.5,17 13.03,16.92 13.5,16.77L11.72,15C10.29,14.85 9.15,13.71 9,12.28L7.23,10.5C7.08,10.97 7,11.5 7,12M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9Z", Hi = "M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z", Vi = "M20.5,19.85L6.41,5.76L2.41,1.76L1.11,3L4.57,6.46L3,11V19A1,1 0 0,0 4,20H5A1,1 0 0,0 6,19V18H16.11L20.84,22.73L22.11,21.46L20.5,19.85M6.5,15A1.5,1.5 0 0,1 5,13.5A1.5,1.5 0 0,1 6.5,12A1.5,1.5 0 0,1 8,13.5A1.5,1.5 0 0,1 6.5,15M5,10L5.78,7.67L8.11,10H5M17.5,5.5L19,10H13.2L16.12,12.92C16.5,12.17 17.37,11.86 18.12,12.21C18.87,12.57 19.18,13.47 18.83,14.21C18.68,14.5 18.43,14.77 18.12,14.92L21,17.8V11L18.92,5C18.71,4.4 18.14,4 17.5,4H7.2L8.7,5.5H17.5Z", $i = "M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3Z", Mi = "M1.6,1.27L0.25,2.75L1.41,3.8C1.16,4.13 1,4.55 1,5V8H3V5.23L18.2,19H14V21H20.41L22.31,22.72L23.65,21.24M6.5,3L8.7,5H21V16.14L23,17.95V5C23,3.89 22.1,3 21,3M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.08,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18Z", wi = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", xi = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z", Si = "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", M1 = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Ei = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z", Oi = "M13.72 21.84C13.16 21.94 12.59 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2 22 6.5 22 12C22 12.59 21.94 13.16 21.84 13.72C21 13.26 20.03 13 19 13C17.74 13 16.57 13.39 15.6 14.06L12.5 12.2V7H11V13L14.43 15.11C13.54 16.16 13 17.5 13 19C13 20.03 13.26 21 13.72 21.84M21.12 15.46L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88L21.12 15.46Z", lt = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", w1 = "M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z", x1 = "M21.4 7.5C22.2 8.3 22.2 9.6 21.4 10.3L18.6 13.1L10.8 5.3L13.6 2.5C14.4 1.7 15.7 1.7 16.4 2.5L18.2 4.3L21.2 1.3L22.6 2.7L19.6 5.7L21.4 7.5M15.6 13.3L14.2 11.9L11.4 14.7L9.3 12.6L12.1 9.8L10.7 8.4L7.9 11.2L6.4 9.8L3.6 12.6C2.8 13.4 2.8 14.7 3.6 15.4L5.4 17.2L1.4 21.2L2.8 22.6L6.8 18.6L8.6 20.4C9.4 21.2 10.7 21.2 11.4 20.4L14.2 17.6L12.8 16.2L15.6 13.3Z", S1 = "M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z", ki = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", Di = "M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z", Pi = "M23 3H1V1H23V3M2 22H11V4H2V22M22 4H13V22H22V4Z", E1 = "M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z", O1 = "M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z", k1 = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", Lt = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", D1 = "M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z", P1 = "M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z", zi = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z", Ii = "M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z", et = "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z", nt = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", At = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z", Ti = "M1 4.27L2.28 3L6 6.72L21 21.72L19.73 23L17.72 21C16.56 20.85 15.65 19.94 15.5 18.78L14 17.27V21H4V7.27L1 4.27M19.77 7.23C20.22 7.68 20.5 8.31 20.5 9L20.5 18.67L19 17.18V11.29C18.69 11.42 18.36 11.5 18 11.5C16.62 11.5 15.5 10.38 15.5 9C15.5 7.93 16.17 7.03 17.11 6.67L15 4.56L16.06 3.5L19.78 7.22L19.77 7.23M11.82 10H12V5H6.82L5.06 3.24C5.34 3.09 5.66 3 6 3H12C13.1 3 14 3.9 14 5V12H15C16.1 12 17 12.9 17 14V15.18L11.82 10M6 10H6.73L6 9.27V10M6 12V19H12V15.27L8.73 12H6M18 10C18.55 10 19 9.55 19 9C19 8.45 18.55 8 18 8C17.45 8 17 8.45 17 9C17 9.55 17.45 10 18 10Z", Zi = "M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M12,13.5V19H6V12H12V13.5M12,10H6V5H12V10M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10Z", Ni = "M9 6V11H7V7H5V11H3V9H1V21H3V19H5V21H7V19H9V21H11V19H13V21H15V19H17V21H19V19H21V21H23V9H21V11H19V7H17V11H15V6H13V11H11V6H9M3 13H5V17H3V13M7 13H9V17H7V13M11 13H13V17H11V13M15 13H17V17H15V13M19 13H21V17H19V13Z", Bi = "M7 21V7H5V11H3V9H1V21H3V19H5V21H7M3 17V13H5V17H3M21 9V11H19V7H17V21H19V19H21V21H23V9H21M21 17H19V13H21V17Z", z1 = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z", ht = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z", I1 = "M15,12C13.89,12 13,12.89 13,14A2,2 0 0,0 15,16A2,2 0 0,0 17,14C17,12.89 16.1,12 15,12M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M14,9C14,7.89 13.1,7 12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9M9,12A2,2 0 0,0 7,14A2,2 0 0,0 9,16A2,2 0 0,0 11,14C11,12.89 10.1,12 9,12Z", Ri = "M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", Fi = "M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z", Ui = "M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22", ji = "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z", T1 = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", Wi = "M21 17.2L6.8 3H19C20.1 3 21 3.9 21 5V17.2M20.7 22L19.7 21H5C3.9 21 3 20.1 3 19V4.3L2 3.3L3.3 2L22 20.7L20.7 22M16.8 18L12.9 14.1L11 16.5L8.5 13.5L5 18H16.8Z", Ki = "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z", Gi = "M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", qi = "M12,2C9.76,2 7.78,3.05 6.5,4.68L7.93,6.11C8.84,4.84 10.32,4 12,4A5,5 0 0,1 17,9C17,10.68 16.16,12.16 14.89,13.06L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M7.23,10.5L12.73,16H10V13.58C8.68,13 7.66,11.88 7.23,10.5M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", Yi = "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z", Z1 = "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z", N1 = "M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z", B1 = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z", R1 = "M16.37,16.1L11.75,11.47L11.64,11.36L3.27,3L2,4.27L5.18,7.45C5.06,7.95 5,8.46 5,9C5,14.25 12,22 12,22C12,22 13.67,20.15 15.37,17.65L18.73,21L20,19.72M12,6.5A2.5,2.5 0 0,1 14.5,9C14.5,9.73 14.17,10.39 13.67,10.85L17.3,14.5C18.28,12.62 19,10.68 19,9A7,7 0 0,0 12,2C10,2 8.24,2.82 6.96,4.14L10.15,7.33C10.61,6.82 11.26,6.5 12,6.5Z", Xi = "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z", Ji = "M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z", F1 = "M8 7C6.9 7 6 7.9 6 9V15C6 16.11 6.9 17 8 17H11V15H8V9H11V7H8M14 7C12.9 7 12 7.9 12 9V15C12 16.11 12.9 17 14 17H16C17.11 17 18 16.11 18 15V9C18 7.9 17.11 7 16 7H14M14 9H16V15H14V9", Qi = "M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z", eo = "M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z", to = "M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18Z", so = "M22.11 21.46L20.84 22.73L18.11 20H4C2.9 20 2 19.11 2 18V6C2 5.42 2.25 4.9 2.65 4.54L1.11 3L2.39 1.73L22.11 21.46M21.88 18.68C21.96 18.47 22 18.24 22 18V4H18L20 8H17L15 4H13L15 8H12L10 4H8L8.8 5.6L21.88 18.68Z", tt = "M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z", io = "M14,19H18V5H14M6,19H10V5H6V19Z", $s = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", oo = "M8,5.14V19.14L19,12.14L8,5.14Z", no = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13", bt = "M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19Z", U1 = "M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z", j1 = "M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z", ao = "M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z", ro = "M12.5,5A7.5,7.5 0 0,0 5,12.5A7.5,7.5 0 0,0 12.5,20A7.5,7.5 0 0,0 20,12.5A7.5,7.5 0 0,0 12.5,5M7,10H9A1,1 0 0,1 10,11V12C10,12.5 9.62,12.9 9.14,12.97L10.31,15H9.15L8,13V15H7M12,10H14V11H12V12H14V13H12V14H14V15H12A1,1 0 0,1 11,14V11A1,1 0 0,1 12,10M16,10H18V11H16V14H18V15H16A1,1 0 0,1 15,14V11A1,1 0 0,1 16,10M8,11V12H9V11", co = "M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z", lo = "M2,5.27L3.28,4L21,21.72L19.73,23L16,19.27V22A1,1 0 0,1 15,23H9C8.46,23 8,22.55 8,22V11.27L2,5.27M12,0C15.05,0 17.8,1.23 19.77,3.23L18.36,4.64C16.75,3 14.5,2 12,2C9.72,2 7.64,2.85 6.06,4.24L4.64,2.82C6.59,1.07 9.17,0 12,0M12,4C13.94,4 15.69,4.78 16.95,6.05L15.55,7.46C14.64,6.56 13.39,6 12,6C10.83,6 9.76,6.4 8.9,7.08L7.5,5.66C8.7,4.62 10.28,4 12,4M15,9C15.56,9 16,9.45 16,10V14.18L13.5,11.69L13.31,11.5L10.82,9H15M10.03,13.3C10.16,14.16 10.84,14.85 11.71,15L10.03,13.3Z", ho = "M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z", W1 = "M1 14V5H13C18.5 5 23 9.5 23 15V17H20.83C20.42 18.17 19.31 19 18 19C16.69 19 15.58 18.17 15.17 17H10C9.09 18.21 7.64 19 6 19C3.24 19 1 16.76 1 14M6 11C4.34 11 3 12.34 3 14C3 15.66 4.34 17 6 17C7.66 17 9 15.66 9 14C9 12.34 7.66 11 6 11M15 10V12H20.25C19.92 11.27 19.5 10.6 19 10H15Z", uo = "M23 15V18C23 18.5 22.64 18.88 22.17 18.97L18.97 15.77C19 15.68 19 15.59 19 15.5C19 14.12 17.88 13 16.5 13C16.41 13 16.32 13 16.23 13.03L10.2 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M22.11 21.46L20.84 22.73L19.89 21.78C19.62 21.92 19.32 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 11.53 4.29 9.36 6.22 8.11L1.11 3L2.39 1.73L22.11 21.46M10 15.5C10 14.12 8.88 13 7.5 13S5 14.12 5 15.5 6.12 18 7.5 18 10 16.88 10 15.5M16.07 17.96L14.04 15.93C14.23 16.97 15.04 17.77 16.07 17.96Z", po = "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z", _o = "M20.8 22.7L18 19.9C16.3 21.2 14.2 22 12 22C6.5 22 2 17.5 2 12C2 10 2.6 8.1 3.7 6.5L5.2 7.9C4.4 9.2 4 10.6 4 12C4 16.4 7.6 20 12 20C13.7 20 15.3 19.4 16.6 18.5L13.7 15.6C13.2 15.9 12.6 16 12 16C10.9 16 9.9 15.6 9.2 14.8L7.8 16.2C6.6 15.1 6 13.6 6 12C6 10.8 6.3 9.7 6.9 8.8L1.1 3L2.4 1.7L22.1 21.4L20.8 22.7M20 12C20 13.4 19.6 14.7 19 15.8L20.5 17.3C21.5 15.8 22 14 22 12C22 10 21.4 8.1 20.3 6.5L18.8 7.9C19.6 9.2 20 10.6 20 12M12 4C14.1 4 16.2 4.8 17.7 6.3L19.1 4.9C17.2 3.1 14.7 2 12 2C10.1 2 8.3 2.5 6.7 3.5L8.2 5C9.3 4.3 10.7 4 12 4M17.5 14.3C17.8 13.6 18 12.8 18 12C18 8.7 15.3 6 12 6C11.2 6 10.4 6.2 9.7 6.5L11.4 8.2C11.6 8.1 11.8 8 12 8C12.6 8 13 8.4 13 9C13 9.2 12.9 9.4 12.8 9.6L17.5 14.3Z", mo = "M20 19V3H4V19H2V21H22V19H20M6 19V13H11V14.8C10.6 15.1 10.2 15.6 10.2 16.2C10.2 17.2 11 18 12 18S13.8 17.2 13.8 16.2C13.8 15.6 13.5 15.1 13 14.8V13H18V19H6Z", fo = "M20 19V3H4V19H2V21H10.25C10.25 21.97 11.03 22.75 12 22.75S13.75 21.97 13.75 21H22V19H20M6 19V17H11V19H6M13 19V17H18V19H13Z", K1 = "M11.62,1L17.28,6.67L15.16,8.79L13.04,6.67L11.62,8.09L13.95,10.41L12.79,11.58L13.24,12.04C14.17,11.61 15.31,11.77 16.07,12.54L12.54,16.07C11.77,15.31 11.61,14.17 12.04,13.24L11.58,12.79L10.41,13.95L8.09,11.62L6.67,13.04L8.79,15.16L6.67,17.28L1,11.62L3.14,9.5L5.26,11.62L6.67,10.21L3.84,7.38C3.06,6.6 3.06,5.33 3.84,4.55L4.55,3.84C5.33,3.06 6.6,3.06 7.38,3.84L10.21,6.67L11.62,5.26L9.5,3.14L11.62,1M18,14A4,4 0 0,1 14,18V16A2,2 0 0,0 16,14H18M22,14A8,8 0 0,1 14,22V20A6,6 0 0,0 20,14H22Z", G1 = "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z", go = "M4,18V21H7V18H17V21H20V15H4V18M19,10H22V13H19V10M2,10H5V13H2V10M17,13H7V5A2,2 0 0,1 9,3H15A2,2 0 0,1 17,5V13Z", Co = "M15,5V12H9V5H15M15,3H9A2,2 0 0,0 7,5V14H17V5A2,2 0 0,0 15,3M22,10H19V13H22V10M5,10H2V13H5V10M20,15H4V21H6V17H18V21H20V15Z", vo = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,7H13V13H11V7M11,15H13V17H11V15Z", yo = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9", q1 = "M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z", Lo = "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z", Ao = "M12 1L3 5V11C3 16.5 6.8 21.7 12 23C17.2 21.7 21 16.5 21 11V5L12 1M16 15.8C16 16.4 15.4 17 14.7 17H9.2C8.6 17 8 16.4 8 15.7V12.2C8 11.6 8.6 11 9.2 11V8.5C9.2 7.1 10.6 6 12 6S14.8 7.1 14.8 8.5V9H13.5V8.5C13.5 7.7 12.8 7.2 12 7.2S10.5 7.7 10.5 8.5V11H14.8C15.4 11 16 11.6 16 12.3V15.8Z", bo = "M8.2 5L6.2 3H19C20.11 3 21 3.9 21 5V17.8L19 15.8V5H8.2M17.5 14.32C17.82 13.6 18 12.83 18 12C18 8.68 15.31 6 12 6C11.17 6 10.4 6.18 9.68 6.5L11.27 8.07C11.5 8.03 11.75 8 12 8C14.21 8 16 9.79 16 12C16 12.25 15.97 12.5 15.93 12.73L17.5 14.32M22.11 21.46L20.84 22.73L19.1 21C19.07 21 19.03 21 19 21H5C3.89 21 3 20.1 3 19V5C3 4.97 3 4.93 3 4.9L1.11 3L2.39 1.73L22.11 21.46M8 12C8 14.21 9.79 16 12 16C12.62 16 13.19 15.85 13.71 15.6L8.4 10.29C8.15 10.81 8 11.39 8 12M17.11 19L15.19 17.08C14.26 17.66 13.17 18 12 18C8.69 18 6 15.31 6 12C6 10.83 6.34 9.74 6.92 8.81L5 6.89V19H17.11Z", Ho = "M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V5H19V19M12 18C15.31 18 18 15.31 18 12C18 8.68 15.31 6 12 6C8.68 6 6 8.68 6 12C6 15.31 8.69 18 12 18M12 8C14.21 8 16 9.79 16 12S14.21 16 12 16 8 14.21 8 12 9.79 8 12 8Z", Vo = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z", $o = "M11 5.12L9.29 3.41L10.71 2L12 3.29L13.29 2L14.71 3.41L13 5.12V7.38L15.45 8.82L17.45 7.69L18.07 5.36L20 5.88L19.54 7.65L21.31 8.12L20.79 10.05L18.46 9.43L16.46 10.56V13.26L14.5 11.3V10.56L12.74 9.54L10.73 7.53L11 7.38V5.12M18.46 14.57L16.87 13.67L19.55 16.35L21.3 15.88L20.79 13.95L18.46 14.57M13 16.62V18.88L14.7 20.59L13.29 22L12 20.71L10.71 22L9.29 20.59L11 18.88V16.62L8.55 15.18L6.55 16.31L5.93 18.64L4 18.12L4.47 16.36L2.7 15.89L3.22 13.96L5.55 14.58L7.55 13.45V10.56L5.55 9.43L3.22 10.05L2.7 8.12L4.47 7.65L4 5.89L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73L14.1 16L13 16.62M12 14.89L12.63 14.5L9.5 11.39V13.44L12 14.89Z", Y1 = "M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.58,19.41L2.59,12.42C2.22,12.05 2,11.55 2,11V6C2,4.89 2.89,4 4,4H9C9.55,4 10.05,4.22 10.41,4.58L17.41,11.58M13.54,5.71L14.54,4.71L21.41,11.58C21.78,11.94 22,12.45 22,13C22,13.55 21.78,14.05 21.42,14.41L16.04,19.79L15.04,18.79L20.75,13L13.54,5.71Z", st = "M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z", Mo = "M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", wo = "M22 12.66C21.07 12.24 20.07 12 19 12C19 10.43 18.5 9 17.6 7.81L15.43 10C15.79 10.57 16 11.26 16 12C16 12.24 16 12.5 15.94 12.7C13.61 13.84 12 16.23 12 19C12 20.07 12.24 21.07 12.66 22C12.44 22 12.22 22 12 22C10.69 22 9.39 21.74 8.17 21.24C6.96 20.74 5.86 20 4.93 19.07C3.05 17.2 2 14.65 2 12C2 9.35 3.05 6.8 4.93 4.93C5.86 4 6.96 3.26 8.17 2.76C9.39 2.26 10.69 2 12 2C17.5 2 22 6.47 22 12C22 12.22 22 12.44 22 12.66M12 5C10.14 5 8.36 5.74 7.05 7.05C5.74 8.36 5 10.14 5 12C5 13.93 5.78 15.68 7.05 16.95L9.17 14.83C8.45 14.1 8 13.1 8 12C8 10.94 8.42 9.92 9.17 9.17C9.92 8.42 10.94 8 12 8C12.74 8 13.43 8.21 14 8.56L16.19 6.4C15 5.5 13.57 5 12 5M23.83 20.64C23.89 20.53 23.87 20.39 23.77 20.32L22.72 19.5C22.74 19.33 22.75 19.16 22.75 19C22.75 18.84 22.74 18.67 22.72 18.5L23.77 17.68C23.87 17.61 23.89 17.5 23.83 17.36L22.83 15.64C22.77 15.53 22.64 15.5 22.53 15.53L21.28 16L21.14 15.91C20.91 15.77 20.7 15.64 20.44 15.54L20.25 14.21C20.23 14.09 20.13 14 20 14H18C17.88 14 17.77 14.09 17.75 14.21L17.57 15.54C17.3 15.64 17.09 15.78 16.86 15.92L16.72 16L15.5 15.53C15.37 15.5 15.23 15.53 15.17 15.64L14.17 17.36C14.11 17.5 14.14 17.61 14.23 17.68L15.29 18.5L15.29 18.53C15.27 18.69 15.25 18.84 15.25 19C15.25 19.16 15.27 19.31 15.29 19.47C15.29 19.5 15.29 19.5 15.29 19.5L14.23 20.32C14.14 20.39 14.11 20.53 14.17 20.64L15.17 22.37C15.23 22.5 15.37 22.5 15.5 22.5L16.72 21.97C17 22.17 17.25 22.34 17.57 22.47L17.75 23.79C17.77 23.91 17.88 24 18 24H20C20.13 24 20.23 23.91 20.25 23.79L20.44 22.47C20.75 22.34 21 22.17 21.28 21.97L22.53 22.5C22.64 22.5 22.77 22.5 22.83 22.37L23.83 20.64M19 17.25C19.97 17.25 20.75 18.03 20.75 19C20.75 19.97 19.96 20.75 19 20.75C18.04 20.75 17.25 19.97 17.25 19C17.25 18.03 18.03 17.25 19 17.25Z", xo = "M3 4L1.75 5.27L4.5 8.03C3.55 9.45 3 11.16 3 13C3 17.97 7.03 22 12 22C13.84 22 15.55 21.45 17 20.5L19.5 23L20.75 21.73L13.04 14L3 4M15 1H9V3H15M21 13C21 14.83 20.45 16.53 19.5 17.94L13 11.45V7H11V9.45L7.05 5.5C8.47 4.55 10.17 4 12 4C14.12 4 16.07 4.74 17.62 5.97L19.04 4.55L20.45 5.97L19.03 7.39C20.26 8.93 21 10.88 21 13Z", So = "M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z", Ht = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z", Vt = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z", Eo = "M4 22H2V2H4M22 2H20V22H22M17.24 5.34L13.24 9.34A3 3 0 0 0 9.24 13.34L5.24 17.34L6.66 18.76L10.66 14.76A3 3 0 0 0 14.66 10.76L18.66 6.76Z", X1 = "M22 2V22H20V13H14.82A3 3 0 0 1 9.18 13H4V22H2V2H4V11H9.18A3 3 0 0 1 14.82 11H20V2Z", Oo = "M4 22H2V2H4M22 2H20V22H22M11 4V9.18A3 3 0 0 0 11 14.82V20H13V14.82A3 3 0 0 0 13 9.18V4Z", ko = "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z", Do = "M8.2,5L6.55,3.35C6.81,3.12 7.15,3 7.5,3H16.5A1.5,1.5 0 0,1 18,4.5V14.8L16,12.8V5H8.2M0,15H2V9H0V15M21,17V7H19V15.8L20.2,17H21M3,17H5V7H3V17M18,17.35L22.11,21.46L20.84,22.73L18,19.85C17.83,20.54 17.21,21 16.5,21H7.5A1.5,1.5 0 0,1 6,19.5V7.89L1.11,3L2.39,1.73L6.09,5.44L8,7.34L16,15.34L18,17.34V17.35M16,17.89L8,9.89V19H16V17.89M22,9V15H24V9H22Z", Po = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z", J1 = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z", Q1 = "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z", zo = "M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z", Io = "M8 2C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H9V20H6V22H9C10.11 22 11 21.11 11 20V18H13V20C13 21.11 13.89 22 15 22H18V20H15V18H16C17.11 18 18 17.11 18 16V4C18 2.89 17.11 2 16 2H8M12 4.97A2 2 0 0 1 14 6.97A2 2 0 0 1 12 8.97A2 2 0 0 1 10 6.97A2 2 0 0 1 12 4.97M10 14.5H14V16H10V14.5Z", To = "M20.84 22.73L16.29 18.18C15.2 19.3 13.69 20 12 20C8.69 20 6 17.31 6 14C6 12.67 6.67 11.03 7.55 9.44L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14C18 10 12 3.25 12 3.25S10.84 4.55 9.55 6.35L17.95 14.75C18 14.5 18 14.25 18 14Z", Zo = "M5.7 2.5A2 2 0 0 1 7 2H9A2 2 0 0 1 11 4V5H19A2 2 0 0 1 21 7V11A1 1 0 0 1 21 13H17A1 1 0 0 1 17 11V9H12.2M20.84 22.73L22.11 21.46L11 10.34L2.39 1.73L1.11 3L3.65 5.54A2 2 0 0 0 5 9V18H4A2 2 0 0 0 2 20V22H14V20A2 2 0 0 0 12 18H11V12.89Z", es = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", No = "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z", ts = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", Bo = "M22.11 21.46L2.39 1.73L1.11 3L4.97 6.86L3.34 7L5.11 10.79C5.25 10 5.5 9.24 5.94 8.5C6 8.36 6.13 8.24 6.22 8.11L7.66 9.55C7.25 10.27 7 11.11 7 12C7 14.76 9.24 17 12 17C12.9 17 13.73 16.75 14.45 16.34L20.84 22.73L22.11 21.46M12 15C10.34 15 9 13.66 9 12C9 11.67 9.07 11.36 9.17 11.06L12.94 14.83C12.64 14.93 12.33 15 12 15M18.05 8.5C17.63 7.78 17.1 7.15 16.5 6.64L20.65 7L18.88 10.79C18.74 10 18.47 9.23 18.05 8.5M12 7C14.76 7 17 9.24 17 12C17 12.54 16.89 13.05 16.74 13.54L15 11.78C14.87 10.3 13.7 9.13 12.22 9L10.47 7.27C10.95 7.11 11.46 7 12 7M12 5C11.16 5 10.35 5.15 9.61 5.42L12 2L14.39 5.42C13.65 5.15 12.84 5 12 5M18.87 13.21L20.64 17L20.24 17.04L18.25 15.05C18.54 14.45 18.76 13.84 18.87 13.21M12 19C12.82 19 13.63 18.83 14.37 18.56L12 22L9.59 18.56C10.33 18.83 11.14 19 12 19M5.95 15.5C6.37 16.24 6.91 16.86 7.5 17.37L3.36 17L5.12 13.23C5.26 14 5.53 14.78 5.95 15.5Z", ss = "M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", is = "M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", Ro = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z", Fo = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9Z";
const Ue = ["sensor"], je = ["binary_sensor"], We = ["cover"], dt = ["climate"], Ms = ["camera"], Ze = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
  "script",
  "scene"
], xt = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: ["garage"]
}, Ke = {
  alarm_control_panel: { on: li, off: hi },
  siren: { on: vi, off: b1 },
  lock: { on: N1, off: Z1 },
  light: { on: Ki, off: Gi },
  media_player: { on: $i, off: Mi },
  climate: { on: Mo, off: wo },
  humidifier: { on: ri, off: ci },
  switch: {
    on: Ht,
    off: Vt,
    switch: { on: Ht, off: Vt },
    outlet: { on: U1, off: j1 }
  },
  vacuum: { on: po, off: _o },
  lawn_mower: { on: W1, off: W1 },
  fan: { on: zi, off: Ii },
  cover: {
    on: At,
    off: nt,
    garage: { on: At, off: nt },
    door: { on: O1, off: E1 },
    gate: { on: Bi, off: Ni },
    blind: { on: Li, off: yi },
    curtain: { on: Di, off: Pi },
    damper: { on: Oo, off: X1 },
    awning: { on: A1, off: A1 },
    shutter: { on: Fo, off: Ro },
    shade: { on: mo, off: fo },
    window: { on: is, off: ss }
  },
  binary_sensor: {
    on: bt,
    off: bt,
    motion: { on: Qi, off: eo },
    moisture: { on: zo, off: To },
    window: { on: is, off: ss },
    door: { on: O1, off: E1 },
    lock: { on: N1, off: Z1 },
    presence: { on: Ui, off: Fi },
    occupancy: { on: go, off: Co },
    vibration: { on: ko, off: Do },
    opening: { on: Ao, off: Lo },
    garage_door: { on: At, off: nt },
    problem: {
      on: pi,
      off: ui
    },
    smoke: {
      on: Ho,
      off: bo
    },
    running: { on: oo, off: io },
    plug: { on: U1, off: j1 },
    power: { on: no, off: bt },
    battery: { on: mi, off: _i },
    battery_charging: { on: fi, off: gi },
    gas: { on: Zi, off: Ti },
    carbon_monoxide: { on: F1, off: F1 },
    cold: { on: Vo, off: $o },
    heat: { on: ts, off: Bo },
    connectivity: { on: x1, off: x1 },
    safety: { on: vo, off: yo },
    sound: { on: J1, off: Q1 },
    update: { on: y1, off: L1 },
    tamper: { on: q1, off: q1 },
    light: { on: Yi, off: qi },
    moving: { on: Hi, off: Vi }
  },
  person: { on: g1, off: C1 },
  device_tracker: { on: g1, off: C1 },
  valve: { on: Eo, off: X1 },
  water_heater: { on: Io, off: Zo },
  remote: { on: co, off: lo },
  update: { on: y1, off: L1 },
  air_quality: { on: v1, off: v1 },
  camera: { on: Ai, off: bi },
  calendar: { on: H1, off: V1 },
  scene: { on: to, off: so },
  notifications: { on: Ci, off: b1 },
  sensor: { on: z1, off: z1 },
  script: { on: G1, off: G1 },
  tags: { on: Y1, off: Y1 },
  select: { on: et, off: et },
  automation: { on: ho, off: uo },
  button: { on: ht, off: ht },
  number: { on: tt, off: tt },
  conversation: { on: w1, off: w1 },
  assist_satellite: {
    on: K1,
    off: K1
  },
  counter: { on: S1, off: S1 },
  event: { on: $1, off: $1 },
  group: {
    on: I1,
    off: I1
  },
  image: { on: ji, off: Wi },
  image_processing: {
    on: T1,
    off: T1
  },
  input_boolean: { on: Ht, off: Vt },
  input_datetime: { on: Qe, off: Qe },
  input_number: { on: tt, off: tt },
  input_select: {
    on: et,
    off: et
  },
  input_text: { on: st, off: st },
  stt: { on: ro, off: ao },
  sun: { on: ts, off: es },
  text: { on: st, off: st },
  date: { on: H1, off: V1 },
  datetime: { on: Qe, off: Qe },
  time: { on: Ei, off: Oi },
  timer: { on: So, off: xo },
  todo: {
    on: xi,
    off: Si
  },
  tts: { on: J1, off: Q1 },
  wake_word: { on: Xi, off: Ji },
  weather: { on: No, off: es },
  zone: { on: B1, off: R1 },
  geo_location: { on: B1, off: R1 }
}, Uo = L(
  (t, e) => We.flatMap((s) => s in t ? e[s].map((i) => ({
    domain: s,
    deviceClass: i
  })) : [])
), jo = L(
  (t, e) => je.flatMap((s) => s in t ? e[s].map((i) => ({
    domain: s,
    deviceClass: i
  })) : [])
), Wo = L(
  (t, e) => Ue.flatMap((s) => s in t ? e[s].map(
    (i, o) => ({
      domain: s,
      deviceClass: i,
      index: o
    })
  ) : [])
), Ko = L(
  (t, e) => (t || []).filter(
    (s) => s in e
  )
);
L(
  (t, e) => {
    var s;
    if (t && "camera" in e)
      return (s = e.camera[0]) == null ? void 0 : s.entity_id;
  }
);
const ws = (t, e) => {
  if (!t) return {};
  if (typeof t == "object")
    return Object.entries(t).reduce((n, [r, a]) => {
      const c = r.startsWith("--") ? r : r.replace(/-([a-z])/g, (l, d) => d.toUpperCase());
      return n[c] = String(a), n;
    }, {});
  const s = t.trim();
  if (e && e.has(s)) return e.get(s);
  const o = t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n/g, " ").split(";").map((n) => n.trim()).filter((n) => n && n.includes(":")).reduce((n, r) => {
    const a = r.split(":"), c = a[0], l = a.slice(1).join(":");
    if (c && l !== void 0) {
      const d = c.trim(), h = d.startsWith("--") ? d : d.replace(/-([a-z])/g, (_, p) => p.toUpperCase());
      n[h] = l.trim();
    }
    return n;
  }, {});
  return e && e.set(s, o), o;
}, xs = (t, e, s) => e && e._parsedCss ? e._parsedCss : t ? ws(t, s) : {}, Go = L(
  (t, e, s, i, o) => {
    const n = {
      ...t && e === 1 ? { "--mdc-icon-size": "20px" } : {},
      ...i ? { color: `var(--${i}-color)` } : {}
    };
    if (!s) return n;
    const r = xs(s, void 0, o);
    return { ...n, ...r };
  }
), qo = Ee`
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
`, te = [
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
], Yo = "unavailable", Xo = "unknown", ae = [Yo, Xo], Jo = (t, e, s, i, o) => {
  var h, _, p, m, f;
  const n = s || void 0, r = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let a = n || "", c = {};
  if (n === "default" && ((h = t.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((_ = e == null ? void 0 : e.themes) != null && _[n])) {
    const { modes: u, ...C } = e.themes[n] || {};
    c = { ...c, ...C }, u && (r && u.dark ? c = { ...c, ...u.dark } : !r && u.light && (c = { ...c, ...u.light }));
  } else if (!n && (!((p = t.__themes) != null && p.keys) || t.__themes.keys.size === 0))
    return;
  const l = ((m = t.__themes) == null ? void 0 : m.keys) || /* @__PURE__ */ new Set(), d = new Set(Object.keys(c));
  if (n === "default" && d.size === 0) {
    for (const u of l)
      try {
        t.style.removeProperty(`--${u}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((f = t.__themes) == null ? void 0 : f.cacheKey) === a) {
    let u = !0;
    if (l.size !== d.size)
      u = !1;
    else
      for (const C of l)
        if (!d.has(C)) {
          u = !1;
          break;
        }
    if (u) return;
  }
  for (const u of l)
    if (!d.has(u))
      try {
        t.style.removeProperty(`--${u}`);
      } catch {
      }
  for (const [u, C] of Object.entries(c))
    t.style.setProperty(`--${u}`, String(C));
  t.__themes.cacheKey = a || null, t.__themes.keys = d;
}, Z = (t, e, s, i) => {
  i = i || {}, s = s ?? {};
  const o = new Event(e, {
    bubbles: i.bubbles === void 0 ? !0 : i.bubbles,
    cancelable: !!i.cancelable,
    composed: i.composed === void 0 ? !0 : i.composed
  });
  return o.detail = s, t.dispatchEvent(o), o;
}, P = (t) => t.substr(0, t.indexOf(".")), Qo = (t) => (e, s) => t.includes(e, s), Rt = "unavailable", en = "unknown", tn = "off", sn = [Rt, en], on = Qo(sn), nn = (t) => {
  const e = t.attributes.entity_id || [], s = [
    ...new Set(e.map((i) => P(i)))
  ];
  return s.length === 1 ? s[0] : void 0;
};
function an(t) {
  return Array.isArray(t) ? t.reverse().reduce((e, s) => `var(${s}${e ? `, ${e}` : ""})`, void 0) : `var(${t})`;
}
const rn = (t, e = "_") => {
  const s = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·", i = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${e}`, o = new RegExp(s.split("").join("|"), "g"), n = {
    ж: "zh",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ю: "iu",
    я: "ia"
  };
  let r;
  return t === "" ? r = "" : (r = t.toString().toLowerCase().replace(o, (a) => i.charAt(s.indexOf(a))).replace(/[а-я]/g, (a) => n[a] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, e).replace(new RegExp(`(${e})\\1+`, "g"), "$1").replace(new RegExp(`^${e}+`), "").replace(new RegExp(`${e}+$`), ""), r === "" && (r = "unknown")), r;
}, cn = (t) => {
  const e = Number(t);
  if (!isNaN(e))
    return e >= 70 ? "--state-sensor-battery-high-color" : e >= 30 ? "--state-sensor-battery-medium-color" : "--state-sensor-battery-low-color";
};
function ln(t, e) {
  const s = P(t.entity_id), i = t == null ? void 0 : t.state;
  if (["button", "event", "input_button", "scene"].includes(s))
    return i !== Rt;
  if (on(i) || i === tn && s !== "alert")
    return !1;
  switch (s) {
    case "alarm_control_panel":
      return i !== "disarmed";
    case "alert":
      return i !== "idle";
    case "cover":
      return i !== "closed";
    case "device_tracker":
    case "person":
      return i !== "not_home";
    case "lawn_mower":
      return ["mowing", "error"].includes(i);
    case "lock":
      return i !== "locked";
    case "media_player":
      return i !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(i);
    case "valve":
      return i !== "closed";
    case "plant":
      return i === "problem";
    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(i);
    case "timer":
      return i === "active";
    case "camera":
      return i === "streaming";
  }
  return !0;
}
const os = /* @__PURE__ */ new Set([
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
]), hn = (t, e, s, i) => {
  const o = [], n = rn(s, "_"), r = i ? "active" : "inactive";
  return e && o.push(`--state-${t}-${e}-${n}-color`), o.push(
    `--state-${t}-${n}-color`,
    `--state-${t}-${r}-color`,
    `--state-${r}-color`
  ), o;
}, ns = (t, e, s) => {
  const i = e.state, o = ln(e);
  return hn(
    t,
    e.attributes.device_class,
    i,
    o
  );
}, dn = (t, e) => {
  const s = t == null ? void 0 : t.state, i = P(t.entity_id), o = t.attributes.device_class;
  if (i === "sensor" && o === "battery") {
    const n = cn(s);
    if (n)
      return [n];
  }
  if (i === "group") {
    const n = nn(t);
    if (n && os.has(n))
      return ns(n, t);
  }
  if (os.has(i))
    return ns(i, t);
}, un = (t, e) => {
  if ((t == null ? void 0 : t.state) === Rt)
    return "var(--state-unavailable-color)";
  const i = dn(t);
  if (i)
    return an(i);
}, pn = (t) => {
  const e = P(t.entity_id), s = t.state;
  if (e === "light" && s === "on") {
    const i = t.attributes.rgb_color;
    if (i)
      return `rgb(${i.join(",")})`;
  }
  return un(t);
};
var we = /* @__PURE__ */ ((t) => (t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none", t))(we || {});
const _n = (t, e = 2) => Math.round(t * 10 ** e) / 10 ** e, mn = (t) => fn(t.attributes), fn = (t) => !!t.unit_of_measurement || !!t.state_class, gn = (t) => {
  switch (t.number_format) {
    case we.comma_decimal:
      return ["en-US", "en"];
    // Use United States with fallback to English formatting 1,234,567.89
    case we.decimal_comma:
      return ["de", "es", "it"];
    // Use German with fallback to Spanish then Italian formatting 1.234.567,89
    case we.space_comma:
      return ["fr", "sv", "cs"];
    // Use French with fallback to Swedish and Czech formatting 1 234 567,89
    case we.system:
      return;
    default:
      return t.language;
  }
}, as = (t, e, s) => {
  const i = e ? gn(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(n) {
    return typeof n == "number" && o(n);
  }, (e == null ? void 0 : e.number_format) !== we.none && !Number.isNaN(Number(t)) && Intl)
    try {
      return new Intl.NumberFormat(
        i,
        rs(t, s)
      ).format(Number(t));
    } catch (o) {
      return console.error(o), new Intl.NumberFormat(
        void 0,
        rs(t, s)
      ).format(Number(t));
    }
  return typeof t == "string" ? t : `${_n(t, s == null ? void 0 : s.maximumFractionDigits).toString()}${(s == null ? void 0 : s.style) === "currency" ? ` ${s.currency}` : ""}`;
}, rs = (t, e) => {
  const s = {
    maximumFractionDigits: 2,
    ...e
  };
  if (typeof t != "string")
    return s;
  if (!e || e.minimumFractionDigits === void 0 && e.maximumFractionDigits === void 0) {
    const i = t.indexOf(".") > -1 ? t.split(".")[1].length : 0;
    s.minimumFractionDigits = i, s.maximumFractionDigits = i;
  }
  return s;
};
L(
  (t) => new Intl.Collator(t)
);
const Cn = L(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), vn = (t, e) => t < e ? -1 : t > e ? 1 : 0, yn = (t, e, s = void 0) => Intl != null && Intl.Collator ? Cn(s).compare(t, e) : vn(t.toLowerCase(), e.toLowerCase()), Ln = (t) => {
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
}, cs = (t, e) => t === "°" ? "" : e && t === "%" ? Ln(e) : " ";
let it;
const An = async (t) => it || (it = t.callWS({
  type: "sensor/numeric_device_classes"
}), it), at = (t, e) => {
  if (t === e)
    return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor)
      return !1;
    let s, i;
    if (Array.isArray(t)) {
      if (i = t.length, i !== e.length)
        return !1;
      for (s = i; s-- !== 0; )
        if (!at(t[s], e[s]))
          return !1;
      return !0;
    }
    if (t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (s of t.entries())
        if (!e.has(s[0]))
          return !1;
      for (s of t.entries())
        if (!at(s[1], e.get(s[0])))
          return !1;
      return !0;
    }
    if (t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (s of t.entries())
        if (!e.has(s[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
      if (i = t.length, i !== e.length)
        return !1;
      for (s = i; s-- !== 0; )
        if (t[s] !== e[s])
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
    if (i = o.length, i !== Object.keys(e).length)
      return !1;
    for (s = i; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, o[s]))
        return !1;
    for (s = i; s-- !== 0; ) {
      const n = o[s];
      if (!at(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
};
class bn extends HTMLElement {
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
  bind(e, s = {}) {
    e.actionHandler && at(s, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
      "keydown",
      e.actionHandler.handleKeyDown
    )), e.actionHandler = { options: s }, !s.disabled && (e.actionHandler.start = (i) => {
      this.cancelled = !1, i.touches ? (i.touches[0].clientX, i.touches[0].clientY) : (i.clientX, i.clientY), s.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, e.actionHandler.end = (i) => {
      if (i.currentTarget !== i.target || i.type === "touchcancel" || i.type === "touchend" && this.cancelled)
        return;
      const o = i.target;
      i.cancelable && i.preventDefault(), s.hasHold && (clearTimeout(this.timer), this.timer = void 0), s.hasHold && this.held ? Z(o, "action", { action: "hold" }) : s.hasDoubleClick ? i.type === "click" && i.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, Z(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, Z(o, "action", { action: "double_tap" })) : Z(o, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (i) => {
      ["Enter", " "].includes(i.key) && i.currentTarget.actionHandler.end(i);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-area-card", bn);
const Hn = () => {
  const t = document.body;
  if (t.querySelector("action-handler-area-card"))
    return t.querySelector("action-handler-area-card");
  const e = document.createElement("action-handler-area-card");
  return t.appendChild(e), e;
}, Vn = (t, e) => {
  const s = Hn();
  s && s.bind(t, e);
}, $n = qe(
  class extends Ye {
    update(t, [e]) {
      return Vn(t.element, e), oe;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(t) {
    }
  }
), St = async (t, e, s, i) => {
  Z(t, "hass-action", { config: s, action: i });
};
function ls(t) {
  return t !== void 0 && t.action !== "none";
}
const $t = (t, e) => {
  const s = `domain|${e}`;
  return t._actionHandlerCache.has(s) || t._actionHandlerCache.set(
    s,
    Xe(t, "domain", e)
  ), t._actionHandlerCache.get(s);
}, Mn = (t, e, s) => {
  const i = `alert|${e}|${s}`;
  return t._actionHandlerCache.has(i) || t._actionHandlerCache.set(
    i,
    Xe(t, "alert", e, s)
  ), t._actionHandlerCache.get(i);
}, wn = (t, e, s) => {
  const i = `cover|${e}|${s}`;
  return t._actionHandlerCache.has(i) || t._actionHandlerCache.set(
    i,
    Xe(t, "cover", e, s)
  ), t._actionHandlerCache.get(i);
}, hs = (t, e, s) => {
  const i = `sensor|${e}|${s}`;
  return t._actionHandlerCache.has(i) || t._actionHandlerCache.set(
    i,
    Xe(t, "sensor", e, s)
  ), t._actionHandlerCache.get(i);
}, Xe = (t, e, s, i, o) => (n) => {
  var d, h;
  n.stopPropagation();
  let r;
  e === "domain" ? r = t._customizationDomainMap.get(s) : e === "alert" ? r = t._customizationAlertMap.get(i || "") : e === "cover" ? r = t._customizationCoverMap.get(i || "") : e === "sensor" ? r = t._customizationSensorMap.get(i || "") : e === "custom_button" && (r = o);
  const a = n.detail.action === "tap" ? r == null ? void 0 : r.tap_action : n.detail.action === "hold" ? r == null ? void 0 : r.hold_action : n.detail.action === "double_tap" ? r == null ? void 0 : r.double_tap_action : null;
  if (e === "domain") {
    const _ = a === "toggle" || (a == null ? void 0 : a.action) === "toggle", p = a === "more-info" || (a == null ? void 0 : a.action) === "more-info";
    if (_) {
      s === "media_player" ? t.hass.callService(
        s,
        t._isOn(s) ? "media_pause" : "media_play",
        void 0,
        { area_id: t._config.area }
      ) : s === "lock" ? t.hass.callService(
        s,
        t._isOn(s) ? "lock" : "unlock",
        void 0,
        { area_id: t._config.area }
      ) : s === "vacuum" ? t.hass.callService(
        s,
        t._isOn(s) ? "stop" : "start",
        void 0,
        { area_id: t._config.area }
      ) : t.hass.callService(
        s,
        t._isOn(s) ? "turn_off" : "turn_on",
        void 0,
        { area_id: t._config.area }
      );
      return;
    } else if (p || a === void 0) {
      if (s !== "binary_sensor" && s !== "sensor")
        if (s === "climate") {
          const f = (h = (d = t._config) == null ? void 0 : d.customization_domain) == null ? void 0 : h.find(
            (C) => C.type === "climate"
          ), u = f == null ? void 0 : f.display_mode;
          (u === "icon" || u === "text_icon") && t._showPopupForDomain(s);
        } else
          t._showPopupForDomain(s);
      return;
    }
    const m = {
      tap_action: r == null ? void 0 : r.tap_action,
      hold_action: r == null ? void 0 : r.hold_action,
      double_tap_action: r == null ? void 0 : r.double_tap_action
    };
    St(t, t.hass, m, n.detail.action);
    return;
  }
  const c = a === "more-info" || (a == null ? void 0 : a.action) === "more-info";
  if (e === "alert") {
    if (c || a === void 0) {
      s === "binary_sensor" && t._showPopupForDomain(s, i);
      return;
    }
  } else if (e === "cover") {
    if (c || a === void 0) {
      s === "cover" && t._showPopupForDomain(s, i);
      return;
    }
  } else if (e === "sensor") {
    if (c) {
      s === "sensor" && t._showPopupForDomain(s, i);
      return;
    }
    if (n.detail.action === "tap" && !(r != null && r.tap_action))
      return;
  }
  const l = {
    entity: r == null ? void 0 : r.entity,
    tap_action: r == null ? void 0 : r.tap_action,
    hold_action: r == null ? void 0 : r.hold_action,
    double_tap_action: r == null ? void 0 : r.double_tap_action
  };
  if (e === "custom_button" && (o != null && o.entity) && c) {
    const _ = o.entity, p = new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: _ }
    });
    t.dispatchEvent(p);
    return;
  }
  St(t, t.hass, l, n.detail.action);
}, Y = (t, e) => $n({
  hasHold: ls(
    (t == null ? void 0 : t.hold_action) || (e == null ? void 0 : e.hold_action)
  ),
  hasDoubleClick: ls(
    (t == null ? void 0 : t.double_tap_action) || (e == null ? void 0 : e.double_tap_action)
  )
});
function ds(t, e, s) {
  return t.localize(
    `component.${s}.entity_component._.state.${e}`
  ) || e;
}
function Ss(t, e) {
  switch (e.name) {
    case "theme":
      return `${t.localize(
        "ui.panel.lovelace.editor.card.generic.theme"
      )} (${t.localize("ui.panel.lovelace.editor.card.config.optional")})`;
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
    case "camera_mode":
      return "Camera Mode";
    case "camera_entity":
      return t.localize("ui.panel.lovelace.editor.card.area.display_type_options.camera") || "Camera";
    case "camera_entity_left":
      return (t.localize("ui.panel.lovelace.editor.card.area.display_type_options.camera") || "Camera") + " (Left)";
    case "camera_entity_right":
      return (t.localize("ui.panel.lovelace.editor.card.area.display_type_options.camera") || "Camera") + " (Right)";
    case "camera_auto_interval":
      return "Interval (Seconds)";
    default:
      return t.localize(
        `ui.panel.lovelace.editor.card.area.${e.name}`
      );
  }
}
const Et = (t, e) => {
  var s, i;
  return ((i = (s = t == null ? void 0 : t[e]) == null ? void 0 : s.attributes) == null ? void 0 : i.friendly_name) || e;
}, ut = (t, e) => (s, i) => yn(
  Et(t, s),
  Et(t, i),
  e
), re = L(
  (t, e) => {
    const s = /* @__PURE__ */ new Map(), i = (o, n) => {
      s.has(o) || s.set(o, /* @__PURE__ */ new Set()), s.get(o).add(n);
    };
    for (const o of Object.values(t))
      if (o.area_id)
        i(o.area_id, o.entity_id);
      else if (o.device_id) {
        const n = e[o.device_id];
        n && n.area_id && i(n.area_id, o.entity_id);
      }
    return s;
  }
), Ne = L(
  (t, e, s, i, o, n) => {
    let r = [];
    return n && n.has(t) ? r = Array.from(n.get(t)) : r = Object.values(s).filter((a) => {
      if (!a.area_id && !a.device_id) return !1;
      if (a.area_id) {
        if (a.area_id !== t) return !1;
      } else if (!e.has(a.device_id)) return !1;
      return !0;
    }).map((a) => a.entity_id), r.filter((a) => {
      const c = s[a];
      return !c || c.hidden || i.has(a) ? !1 : Array.isArray(o) && o.length > 0 ? c.labels && c.labels.some((l) => o.includes(l)) : !0;
    });
  }
);
L(
  (t, e, s) => {
    const i = {};
    for (const o of t) {
      const n = P(o);
      if (!Ze.includes(n) && !Ue.includes(n) && !je.includes(n) && !We.includes(n) && !Ms.includes(n) && !dt.includes(n))
        continue;
      const r = e[o];
      r && ((je.includes(n) || Ue.includes(n) || We.includes(n)) && !s[n].includes(r.attributes.device_class || "") || (n in i || (i[n] = []), i[n].push(r)));
    }
    return i;
  }
);
const xe = L(
  (t, e) => new Set(
    t && e ? Object.values(e).reduce((s, i) => (i.area_id === t && s.push(i.id), s), []) : []
  )
), xn = L(
  (t, e) => (Array.isArray(e) ? e : e ? Object.values(e) : []).find((i) => i.area_id === t) || null
), ye = (t, e, s) => {
  if (!s) return !0;
  const i = e == null ? void 0 : e[t];
  if (!i) return !0;
  const o = typeof i.entity_category == "string" ? i.entity_category : null;
  if (!o) return !0;
  switch (s) {
    case "config":
      return o !== "config";
    case "diagnostic":
      return o !== "diagnostic";
    case "config+diagnostic":
      return o !== "config" && o !== "diagnostic";
    default:
      return !0;
  }
}, us = (t, e, s, i) => {
  if (!s || s.length === 0)
    return;
  let o;
  const n = s.filter((a) => !mn(a) || isNaN(Number(a.state)) ? !1 : o ? a.attributes.unit_of_measurement === o : (o = a.attributes.unit_of_measurement, !0));
  if (!n.length)
    return;
  const r = n.reduce((a, c) => a + Number(c.state), 0);
  return e === "power" ? `${as(r, i, {
    maximumFractionDigits: 1
  })}${o ? cs(o, i) : ""}${o || ""}` : `${as(r / n.length, i, {
    maximumFractionDigits: 1
  })}${o ? cs(o, i) : ""}${o || ""}`;
}, ps = (t, e, s) => {
  if (t in Ke) {
    const i = Ke[t];
    if (s && typeof i == "object") {
      const o = i[s];
      if (o) {
        if (typeof o == "string") return o;
        if (typeof o == "object" && "on" in o && "off" in o)
          return e ? o.on : o.off;
      }
    }
    if (typeof i == "object" && "on" in i && "off" in i)
      return e ? i.on : i.off;
    if (typeof i == "string") return i;
  }
  return "";
};
var Sn = Object.defineProperty, pe = (t, e, s, i) => {
  for (var o = void 0, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = r(e, s, o) || o);
  return o && Sn(e, s, o), o;
};
const _s = /* @__PURE__ */ new Set(), En = [ae, te], Ft = class Ft extends ie {
  constructor() {
    super(...arguments), this._onPopState = (e) => {
      var s;
      this.open && !((s = window.history.state) != null && s.areaCardPlusPopup) && (this.open = !1);
    }, this.open = !1, this.content = "", this.entities = [], this._opener = null, this._cardEls = /* @__PURE__ */ new Map(), this._handleMoreInfo = (e) => {
      if (this._opener) {
        e.stopPropagation();
        const s = new CustomEvent("hass-more-info", {
          bubbles: !0,
          composed: !0,
          detail: e.detail
        });
        this._opener.dispatchEvent(s);
      }
    }, this._close = () => {
      var e;
      this.open && (this.open = !1, (e = window.history.state) != null && e.areaCardPlusPopup && window.history.back());
    }, this._onDialogClosed = (e) => {
      const s = e.target;
      s && s.tagName !== "HA-ADAPTIVE-DIALOG" || (this.open = !1, this._cardEls.clear(), this.dispatchEvent(
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
      (e, s, i, o, n, r, a) => {
        const c = new Set(
          (s == null ? void 0 : s.hidden_entities) || []
        ), l = Ne(
          i,
          o,
          e,
          c,
          s == null ? void 0 : s.label,
          a
        ), d = s == null ? void 0 : s.category_filter, h = (_) => ye(_, e, d);
        return l.filter((_) => {
          if (!h(_)) return !1;
          const p = P(_);
          return !(n.length > 0 && !n.includes(p) || r && p !== r);
        });
      }
    ), this.computeLabel = L(
      (e, s, i) => Ss(this.hass, e)
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
    const s = this.renderRoot.querySelector("ha-adaptive-dialog");
    if (s && s.shadowRoot) {
      const i = s.shadowRoot.querySelector("ha-bottom-sheet");
      i && (i.style.removeProperty("--dialog-transform"), i.style.removeProperty("--dialog-transition"));
    }
  }
  _toTileConfig(e) {
    return {
      type: "tile",
      entity: e.entity
    };
  }
  async _createCardElement(e, s, i = !1) {
    var o, n, r;
    try {
      const a = await ((o = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : o.call(window));
      if (a != null && a.createCardElement) {
        const c = a.createCardElement(s);
        return c.hass = e, (n = c.setAttribute) == null || n.call(c, "data-hui-card", ""), c;
      }
    } catch {
    }
    try {
      const a = s.type || "tile", c = typeof a == "string" && a.startsWith("custom:"), l = c ? a.slice(7) : `hui-${a}-card`;
      c && !customElements.get(l) && await customElements.whenDefined(l).catch(() => {
      });
      const d = document.createElement(l);
      return typeof d.setConfig == "function" && d.setConfig(s), d.hass = e, (r = d.setAttribute) == null || r.call(d, "data-hui-card", ""), d;
    } catch {
      if (!i)
        return this._createCardElement(
          e,
          this._toTileConfig(s),
          !0
        );
      const a = document.createElement("div");
      return a.setAttribute("data-hui-card", ""), a;
    }
  }
  _getPopupCardConfig(e) {
    var p, m, f, u, C, $, H, v, y, w, A;
    const s = this.card, i = P(e.entity_id), o = this.selectedDomain || i, n = this.selectedDomain ? this.selectedDeviceClass : (u = (f = (m = (p = this.hass) == null ? void 0 : p.states) == null ? void 0 : m[e.entity_id]) == null ? void 0 : f.attributes) == null ? void 0 : u.device_class, r = (s == null ? void 0 : s._config) || {};
    let a;
    je.includes(o) ? (a = (C = r.customization_alert) == null ? void 0 : C.find(
      (b) => b.type === n
    ), a || (a = ($ = r.customization_domain) == null ? void 0 : $.find(
      (b) => b.type === o
    ))) : Ue.includes(o) ? (a = (H = r.customization_sensor) == null ? void 0 : H.find(
      (b) => b.type === n
    ), a || (a = (v = r.customization_domain) == null ? void 0 : v.find(
      (b) => b.type === o
    ))) : We.includes(o) ? (a = (y = r.customization_cover) == null ? void 0 : y.find(
      (b) => b.type === n
    ), a || (a = (w = r.customization_domain) == null ? void 0 : w.find(
      (b) => b.type === o
    ))) : a = (A = r.customization_domain) == null ? void 0 : A.find(
      (b) => b.type === o
    );
    const c = a == null ? void 0 : a.popup_card, l = c && typeof c.type == "string" && c.type || (a == null ? void 0 : a.popup_card_type) || "tile", d = l === "tile" ? this.DOMAIN_FEATURES[i] ?? {} : {};
    let h = {};
    if (c && typeof c == "object") {
      const { type: b, entity: x, ...D } = c;
      h = D;
    } else
      h = (a == null ? void 0 : a.popup_card_options) ?? {};
    return {
      type: l,
      entity: e.entity_id,
      ...d,
      ...h
    };
  }
  shouldUpdate(e) {
    var d, h, _;
    if (e.has("open") || e.has("card"))
      return !0;
    if (!this.open)
      return !1;
    if (e.has("selectedDomain") || e.has("selectedDeviceClass") || e.has("selectedGroup") || e.has("entities") || e.has("content"))
      return !0;
    if (!e.has("hass"))
      return !1;
    const s = e.get("hass");
    if (!s || s.themes !== this.hass.themes || s.locale !== this.hass.locale)
      return !0;
    const i = this.card;
    if (!i) return !1;
    const o = (d = i._config) == null ? void 0 : d.area, n = i._devices && Array.isArray(i._devices) ? i._devices : i.hass && i.hass.devices ? i.hass.devices : {}, r = re(
      this.hass.entities,
      this.hass.devices
    ), a = r ? _s : xe(o, n), c = this._getCandidateEntityIds(
      this.hass.entities,
      i._config,
      o,
      a,
      ((h = i._config) == null ? void 0 : h.popup_domains) || [],
      this.selectedDomain || null,
      r
    ), l = ((_ = i._config) == null ? void 0 : _.extra_entities) || [];
    for (const p of c)
      if (!s.states[p] || s.states[p] !== this.hass.states[p])
        return !0;
    for (const p of l)
      if (!s.states[p] || s.states[p] !== this.hass.states[p])
        return !0;
    return !1;
  }
  _getOrCreateCard(e) {
    const s = e.entity_id, i = this._cardEls.get(s);
    if (i) {
      try {
        i.hass = this.hass;
      } catch {
      }
      return i;
    }
    const o = document.createElement("div");
    o.classList.add("card-placeholder"), o.setAttribute("data-hui-card", ""), this._cardEls.set(s, o);
    const n = this._getPopupCardConfig(e);
    return this._createCardElement(this.hass, n).then((r) => {
      try {
        this._cardEls.get(s) === o && (o.replaceWith(r), this._cardEls.set(s, r)), r.hass = this.hass;
      } catch {
      }
    }), o;
  }
  _isActive(e) {
    return !En.flat().includes(e.state);
  }
  sortEntitiesForPopup(e) {
    var n, r;
    const s = ((r = (n = this.card) == null ? void 0 : n._config) == null ? void 0 : r.popup_sort) || "name", i = e.slice();
    if (s === "state") {
      const a = ut(
        this.hass.states,
        this.hass.locale.language
      );
      return i.sort((c, l) => {
        const d = this._isActive(c) ? 0 : 1, h = this._isActive(l) ? 0 : 1;
        if (d !== h) return d - h;
        const _ = P(c.entity_id), p = P(l.entity_id), m = this.hass ? ds(this.hass, c.state, _) : c.state, f = this.hass ? ds(this.hass, l.state, p) : l.state, u = (m || "").localeCompare(f || "");
        return u !== 0 ? u : a(c.entity_id, l.entity_id);
      });
    }
    const o = ut(
      this.hass.states,
      this.hass.locale.language
    );
    return i.sort((a, c) => o(a.entity_id, c.entity_id));
  }
  render() {
    var w, A, b, x, D, j, F, M, O, I, T, k, N;
    if (!this.hass || !this.card) return g``;
    const e = this.card, s = (w = e._config) == null ? void 0 : w.area, i = e._devices && Array.isArray(e._devices) ? e._devices : e.hass && e.hass.devices ? e.hass.devices : {}, o = e.hass && e.hass.devices && e.hass.entities ? re(e.hass.entities, e.hass.devices) : void 0, n = o ? _s : xe(s, i), r = this.hass.states, a = ((A = e._config) == null ? void 0 : A.popup_domains) || [];
    (b = e._config) != null && b.hidden_entities;
    const c = ((x = e._config) == null ? void 0 : x.extra_entities) || [];
    (D = e._config) == null || D.label;
    const l = (j = e._config) == null ? void 0 : j.hide_unavailable, d = (F = e._config) == null ? void 0 : F.category_filter, h = this.selectedDomain || null, _ = this.selectedDeviceClass || null, p = (S) => ye(S, this.hass.entities, d);
    let m = [];
    this.entities && this.entities.length > 0 ? m = this.entities.reduce((S, B) => {
      const R = B.entity_id;
      if (!p(R)) return S;
      const ne = P(R);
      return a.length > 0 && !a.includes(ne) || h && ne !== h || S.push(R), S;
    }, []) : m = this._getCandidateEntityIds(
      this.hass.entities,
      e._config,
      s,
      n,
      a,
      h,
      o
    );
    let f = [];
    for (const S of m) {
      const B = r[S];
      B && (l && ae.includes(B.state) || _ && B.attributes.device_class !== _ || f.push(B));
    }
    for (const S of c) {
      const B = P(S), R = r[S];
      R && (a.length > 0 && !a.includes(B) || h && B !== h || _ && R.attributes.device_class !== _ || p(S) && !f.some((ne) => ne.entity_id === S) && f.push(R));
    }
    const u = ((M = e == null ? void 0 : e._config) == null ? void 0 : M.ungroup_areas) === !0;
    let C = (O = e._config) != null && O.columns ? e._config.columns : 4, $ = [], H = [];
    if (u)
      H = this.sortEntitiesForPopup(f), C = Math.min(C, Math.max(1, H.length));
    else {
      const S = {};
      for (const K of f) {
        const Q = P(K.entity_id);
        Q in S || (S[Q] = []), S[Q].push(K);
      }
      const B = Object.keys(Ke || {}), R = a.length > 0 ? a : B;
      $ = Object.entries(S).filter(([K]) => !h || K === h).sort(([K], [Q]) => {
        const ke = R.indexOf(K), De = R.indexOf(Q);
        return (ke === -1 ? R.length : ke) - (De === -1 ? R.length : De);
      }).map(
        ([K, Q]) => [K, this.sortEntitiesForPopup(Q)]
      );
      const ne = $.length ? Math.max(...$.map(([, K]) => K.length)) : 0;
      C = Math.min(C, Math.max(1, ne));
    }
    if (this.style.setProperty("--columns", String(C)), !($.length > 0 || H.length > 0))
      return g`
        <ha-adaptive-dialog
          .hass=${this.hass}
          .open=${this.open}
          @closed=${this._onDialogClosed}
        >
          <ha-icon-button
            slot="headerNavigationIcon"
            .path=${lt}
            @click=${this._close}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <span slot="headerTitle">${this.title}</span>
          <div class="content dialog-content" style="padding: 16px;">
            ${this.content || this.hass.localize("ui.panel.lovelace.cards.entity.no_entities") || "No entities"}
          </div>
        </ha-adaptive-dialog>
      `;
    const y = ((k = e._area) == null ? void 0 : k.call(e, (I = e._config) == null ? void 0 : I.area, (T = e.hass) == null ? void 0 : T.areas)) ?? null;
    return g`
      <ha-adaptive-dialog
        .hass=${this.hass}
        .open=${this.open}
        @closed=${this._onDialogClosed}
        flexcontent
      >
        <ha-icon-button
          slot="headerNavigationIcon"
          .path=${lt}
          @click=${this._close}
          .label=${this.hass.localize("ui.common.close")}
        ></ha-icon-button>
        <span slot="headerTitle">
          ${((N = e._config) == null ? void 0 : N.area_name) || y && y.name}
        </span>
        <div class="dialog-content scrollable ha-scrollbar" @hass-more-info=${this._handleMoreInfo}>
          ${u ? g`
                  <div class="cards-wrapper">
                    <div class="entity-cards">
                      ${H.map(
      (S) => g`
                          <div class="entity-card">
                            ${this._getOrCreateCard(S)}
                          </div>
                        `
    )}
                    </div>
                  </div>
                ` : g`${se(
      $,
      ([S]) => S,
      ([S, B]) => g`
                    <div class="cards-wrapper">
                      <h4>
                        ${S === "binary_sensor" || S === "sensor" || S === "cover" ? this._getDomainName(
        S,
        _ || void 0
      ) : this._getDomainName(S)}
                      </h4>
                      <div class="entity-cards">
                        ${se(
        B,
        (R) => R.entity_id,
        (R) => g`
                            <div class="entity-card">
                              ${this._getOrCreateCard(R)}
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
  _getDomainName(e, s) {
    return this.hass ? e === "scene" ? "Scene" : e === "binary_sensor" || e === "sensor" || e === "cover" ? s ? this.hass.localize(
      `component.${e}.entity_component.${s}.name`
    ) : this.hass.localize(`component.${e}.entity_component._.name`) : this.hass.localize(`component.${e}.entity_component._.name`) : e;
  }
};
Ft.styles = Ee`
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
let X = Ft;
pe([
  z({ type: Boolean })
], X.prototype, "open");
pe([
  z({ type: String })
], X.prototype, "selectedDomain");
pe([
  z({ type: String })
], X.prototype, "selectedDeviceClass");
pe([
  z({ type: String })
], X.prototype, "content");
pe([
  z({ type: Array })
], X.prototype, "entities");
pe([
  z({ attribute: !1 })
], X.prototype, "hass");
pe([
  z({ attribute: !1 })
], X.prototype, "card");
pe([
  U()
], X.prototype, "selectedGroup");
customElements.define("area-card-plus-popup", X);
var On = Object.defineProperty, kn = Object.getOwnPropertyDescriptor, _e = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? kn(e, s) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && On(e, s, o), o;
};
const ms = /* @__PURE__ */ new Set();
let ce = class extends ie {
  constructor() {
    super(...arguments), this.selectedDomain = null, this.selectedDeviceClass = null, this.selectedGroup = null, this._currentCameraIndex = 0, this._iconCache = /* @__PURE__ */ new Map(), this._styleCache = /* @__PURE__ */ new Map(), this._deviceClasses = xt, this._customizationDomainMap = /* @__PURE__ */ new Map(), this._customizationCoverMap = /* @__PURE__ */ new Map(), this._customizationAlertMap = /* @__PURE__ */ new Map(), this._customizationSensorMap = /* @__PURE__ */ new Map(), this._actionHandlerCache = /* @__PURE__ */ new Map(), this._hiddenEntitiesSet = /* @__PURE__ */ new Set(), this._excludedEntitiesSet = /* @__PURE__ */ new Set(), this._getAreaEntityIds = L(
      (t, e, s, i, o, n) => Ne(
        t,
        e,
        s,
        i,
        o,
        n
      )
    ), this._getOrganizedEntities = L(
      (t, e, s) => {
        const i = /* @__PURE__ */ new Map(), o = {};
        for (const n of t) {
          const r = e[n];
          if (!r) continue;
          const a = P(n);
          if (!Ze.includes(a) && !Ue.includes(a) && !je.includes(a) && !We.includes(a) && !Ms.includes(a) && !dt.includes(a))
            continue;
          o[a] || (o[a] = []), o[a].push(r), i.has(a) || i.set(a, /* @__PURE__ */ new Map());
          const c = i.get(a), l = r.attributes.device_class || "default";
          c.has(l) || c.set(l, []), c.get(l).push(r);
        }
        return { grouped: i, byDomain: o };
      }
    ), this._area = L(
      (t, e) => xn(t, e)
    ), this._devicesInArea = L(
      (t, e) => xe(t, e)
    ), this._computeCovers = Uo, this._computeAlerts = jo, this._computeSensors = Wo, this._computeButtons = Ko, this._computeIconStyles = L(
      (t, e, s, i) => Go(
        t,
        e,
        s,
        i,
        this._styleCache
      )
    );
  }
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }
  static async getStubConfig(t) {
    var s;
    return { type: "custom:area-card-plus", area: ((s = Object.values(t.areas)[0]) == null ? void 0 : s.area_id) || "" };
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
      const s = ((e = this._config) == null ? void 0 : e.camera_auto_interval) || 10;
      this._cameraInterval = window.setInterval(() => {
        this._currentCameraIndex++, this.requestUpdate();
      }, s * 1e3);
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
    var e, s, i, o, n, r;
    if (!t.area)
      throw new Error("Area Required");
    this._config = t, this._deviceClasses = { ...xt }, t.sensor_classes && (this._deviceClasses.sensor = t.sensor_classes), t.alert_classes && (this._deviceClasses.binary_sensor = t.alert_classes), t.cover_classes && (this._deviceClasses.cover = t.cover_classes), this._iconCache.clear(), this._styleCache.clear(), this._customizationDomainMap.clear(), (((e = this._config) == null ? void 0 : e.customization_domain) || []).forEach((a) => {
      var l, d;
      const c = { ...a || {} };
      a.styles ? (c.styles || (c.styles = {}), typeof a.styles == "string" || (c.styles = { ...a.styles })) : c.styles = {}, a.css && (c.styles.card = a.css), a.icon_css && (c.styles.icon = a.icon_css), (l = c.styles) != null && l.card && (c._parsedCss = this._parseCss(c.styles.card)), (d = c.styles) != null && d.icon && (c._parsedIconCss = this._parseCss(c.styles.icon)), this._customizationDomainMap.set(c.type, c);
    }), this._customizationCoverMap.clear(), (((s = this._config) == null ? void 0 : s.customization_cover) || []).forEach((a) => {
      var l, d;
      const c = { ...a || {} };
      a.styles ? c.styles = { ...a.styles } : c.styles = {}, a.css && (c.styles.card = a.css), a.icon_css && (c.styles.icon = a.icon_css), (l = c.styles) != null && l.card && (c._parsedCss = this._parseCss(c.styles.card)), (d = c.styles) != null && d.icon && (c._parsedIconCss = this._parseCss(c.styles.icon)), this._customizationCoverMap.set(c.type, c);
    }), this._customizationAlertMap.clear(), (((i = this._config) == null ? void 0 : i.customization_alert) || []).forEach((a) => {
      var l, d;
      const c = { ...a || {} };
      a.styles ? c.styles = { ...a.styles } : c.styles = {}, a.css && (c.styles.card = a.css), a.icon_css && (c.styles.icon = a.icon_css), (l = c.styles) != null && l.card && (c._parsedCss = this._parseCss(c.styles.card)), (d = c.styles) != null && d.icon && (c._parsedIconCss = this._parseCss(c.styles.icon)), this._customizationAlertMap.set(c.type, c);
    }), this._customizationSensorMap.clear(), (((o = this._config) == null ? void 0 : o.customization_sensor) || []).forEach((a) => {
      var l, d;
      const c = { ...a || {} };
      a.styles ? c.styles = { ...a.styles } : c.styles = {}, a.css && (c.styles.card = a.css), a.icon_css && (c.styles.icon = a.icon_css), (l = c.styles) != null && l.card && (c._parsedCss = this._parseCss(c.styles.card)), (d = c.styles) != null && d.icon && (c._parsedIconCss = this._parseCss(c.styles.icon)), this._customizationSensorMap.set(c.type, c);
    }), this._hiddenEntitiesSet = new Set(((n = this._config) == null ? void 0 : n.hidden_entities) || []), this._excludedEntitiesSet = new Set(((r = this._config) == null ? void 0 : r.excluded_entities) || []), this._actionHandlerCache.clear();
  }
  updated(t) {
    if (super.updated(t), t.has("_config") && this._startCameraInterval(), !this._config || !this.hass)
      return;
    if (t.has("selectedDomain") && this.selectedDomain) {
      const i = this.selectedDomain;
      this._openDomainPopup(i), setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    const e = t.get("hass"), s = t.get("_config");
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!s || s.theme !== this._config.theme)) && Jo(this, this.hass.themes, this._config.theme);
  }
  shouldUpdate(t) {
    var o, n;
    if (t.has("_config") || !this._config || t.has("_currentCameraIndex") || t.has("_devicesInArea") || t.has("_entities"))
      return !0;
    if (!t.has("hass"))
      return !1;
    const e = t.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale)
      return !0;
    if (!((o = this.hass) != null && o.devices) || !((n = this.hass) != null && n.entities))
      return !1;
    const s = this.hass.entities && this.hass.devices ? re(this.hass.entities, this.hass.devices) : void 0, i = this._getAreaEntityIds(
      this._config.area,
      s ? ms : this._devicesInArea(this._config.area, this.hass.devices),
      this.hass.entities,
      this._hiddenEntitiesSet,
      this._config.label,
      s
    );
    if (this._lastEntityIds !== i)
      return this._lastEntityIds = i, !0;
    for (const r of i)
      if (!e.states[r] || e.states[r] !== this.hass.states[r])
        return !0;
    return !1;
  }
  _isOn(t, e, s) {
    const i = s[t];
    if (i)
      return (e ? i.filter(
        (o) => o.attributes.device_class === e
      ) : i).find(
        (o) => !ae.includes(o.state) && !te.includes(o.state)
      );
  }
  _parseCss(t) {
    return ws(t, this._styleCache);
  }
  _getParsedCss(t, e) {
    return xs(t, e, this._styleCache);
  }
  _getClimateStyle(t) {
    var o, n;
    const e = (n = (o = this._config) == null ? void 0 : o.styles) == null ? void 0 : n.thermostat, s = typeof e == "string" ? this._getParsedCss(e) : {}, i = typeof e == "object" && e && e[t] ? this._getParsedCss(e[t]) : {};
    return { ...s, ...i };
  }
  _getClimateColor(t, e) {
    return this._getClimateStyle(t).color || e;
  }
  _handleAction(t) {
    var o, n, r, a, c, l;
    const e = t.detail.action === "tap" ? (o = this._config) == null ? void 0 : o.tap_action : t.detail.action === "hold" ? (n = this._config) == null ? void 0 : n.hold_action : t.detail.action === "double_tap" ? (r = this._config) == null ? void 0 : r.double_tap_action : null;
    if (e === "more-info" || (e == null ? void 0 : e.action) === "more-info" || e === void 0) {
      this._openGeneralPopup();
      return;
    }
    const i = {
      tap_action: (a = this._config) == null ? void 0 : a.tap_action,
      hold_action: (c = this._config) == null ? void 0 : c.hold_action,
      double_tap_action: (l = this._config) == null ? void 0 : l.double_tap_action
    };
    St(this, this.hass, i, t.detail.action);
  }
  _cachedIcon(t, e, s) {
    const i = `${t}|${s || ""}|${e ? "1" : "0"}`;
    if (this._iconCache.has(i)) return this._iconCache.get(i);
    const o = ps(t, e, s);
    return this._iconCache.set(i, o), o;
  }
  _renderCovers(t, e, s) {
    var o, n, r;
    (o = this._config) != null && o.excluded_entities;
    const i = {
      v2: ((n = this._config) == null ? void 0 : n.design) === "V2",
      row: ((r = this._config) == null ? void 0 : r.layout) === "horizontal"
    };
    return g`
      <div
        class="${ee({
      covers: !0,
      ...i
    })}"
      >
        ${se(
      t,
      (a) => a.domain + "-" + a.deviceClass,
      ({ domain: a, deviceClass: c }) => {
        var u, C, $, H, v, y, w;
        const l = s.get(c), d = (l == null ? void 0 : l.invert) === !0, _ = (((u = e.get(a)) == null ? void 0 : u.get(c)) || []).filter((A) => {
          var x;
          const b = A.state === "open";
          return (d ? te.includes(A.state) : b) && !this._excludedEntitiesSet.has(A.entity_id) && ye(
            A.entity_id,
            this.hass.entities,
            (x = this._config) == null ? void 0 : x.category_filter
          );
        }), p = (l == null ? void 0 : l.color) || ((C = this._config) == null ? void 0 : C.cover_color), m = l == null ? void 0 : l.icon, f = _.length;
        return f > 0 ? g`
                  <div
                    class="icon-with-count hover"
                    style=${E(
          this._getParsedCss(
            (($ = l == null ? void 0 : l.styles) == null ? void 0 : $.button) || ((H = l == null ? void 0 : l.styles) == null ? void 0 : H.card) || ((v = this._config) == null ? void 0 : v.cover_css) || ((w = (y = this._config) == null ? void 0 : y.styles) == null ? void 0 : w.cover),
            l
          )
        )}
                    @action=${wn(this, a, c)}
                    .actionHandler=${Y(l)}
                  >
                    ${(() => {
          var x;
          const A = m || this._cachedIcon(
            a,
            !d,
            c
          ), b = E({
            ...p ? { color: `var(--${p}-color)` } : {},
            ...this._getParsedCss(
              (x = l == null ? void 0 : l.styles) == null ? void 0 : x.icon,
              l
            )
          });
          return A && !A.startsWith("mdi:") ? g`<ha-icon
                          class="cover"
                          style=${b}
                          .path=${A}
                        ></ha-icon>` : g`<ha-state-icon
                        class="cover"
                        style=${b}
                        .icon=${A}
                      ></ha-state-icon>`;
        })()}
                    <span
                      class="active-count text-small ${f > 0 ? "on" : "off"}"
                      >${f}</span
                    >
                  </div>
                ` : V;
      }
    )}
      </div>
    `;
  }
  _renderAlerts(t, e, s) {
    var o, n, r;
    const i = {
      v2: ((o = this._config) == null ? void 0 : o.design) === "V2",
      row: ((n = this._config) == null ? void 0 : n.layout) === "horizontal"
    };
    return (r = this._config) != null && r.excluded_entities, g`
      <div
        class="${ee({
      alerts: !0,
      ...i
    })}"
      >
        ${se(
      t,
      (a) => a.domain + "-" + a.deviceClass,
      ({ domain: a, deviceClass: c }) => {
        var u, C, $, H, v, y, w;
        const l = s.get(c), d = (l == null ? void 0 : l.invert) === !0, _ = (((u = e.get(a)) == null ? void 0 : u.get(c)) || []).filter((A) => {
          var x;
          const b = A.state === "on";
          return (d ? te.includes(A.state) : b) && !this._excludedEntitiesSet.has(A.entity_id) && ye(
            A.entity_id,
            this.hass.entities,
            (x = this._config) == null ? void 0 : x.category_filter
          );
        }), p = (l == null ? void 0 : l.color) || ((C = this._config) == null ? void 0 : C.alert_color), m = l == null ? void 0 : l.icon, f = _.length;
        return f > 0 ? g`
                  <div
                    class="icon-with-count hover"
                    style=${E(
          this._getParsedCss(
            (($ = l == null ? void 0 : l.styles) == null ? void 0 : $.button) || ((H = l == null ? void 0 : l.styles) == null ? void 0 : H.card) || ((v = this._config) == null ? void 0 : v.alert_css) || ((w = (y = this._config) == null ? void 0 : y.styles) == null ? void 0 : w.alert),
            l
          )
        )}
                    @action=${Mn(this, a, c)}
                    .actionHandler=${Y(l)}
                  >
                    ${(() => {
          var x;
          const A = m || this._cachedIcon(
            a,
            !d,
            c
          ), b = E({
            ...p ? { color: `var(--${p}-color)` } : {},
            ...this._getParsedCss(
              (x = l == null ? void 0 : l.styles) == null ? void 0 : x.icon,
              l
            )
          });
          return A && !A.startsWith("mdi:") ? A.startsWith("M") ? g`<ha-svg-icon
                            class="alert"
                            style=${b}
                            .path=${A}
                          ></ha-svg-icon>` : g`<ha-icon
                          class="alert"
                          style=${b}
                          .icon=${A}
                        ></ha-icon>` : g`<ha-state-icon
                        class="alert"
                        style=${b}
                        .icon=${A}
                      ></ha-state-icon>`;
        })()}
                    <span
                      class="active-count text-small ${f > 0 ? "on" : "off"}"
                      >${f}</span
                    >
                  </div>
                ` : V;
      }
    )}
      </div>
    `;
  }
  renderCustomButtons(t) {
    var s, i, o;
    if (!((s = this._config) != null && s.custom_buttons) || this._config.custom_buttons.length === 0)
      return V;
    const e = {
      v2: ((i = this._config) == null ? void 0 : i.design) === "V2",
      row: ((o = this._config) == null ? void 0 : o.layout) === "horizontal"
    };
    return g`
      <div
        class="${ee({
      custom_buttons: !0,
      ...e
    })}"
      >
        ${this._config.custom_buttons.map((n) => {
      var h, _, p, m, f;
      if (n.conditional) {
        const u = n.entity ? P(n.entity) : null;
        if (u && u in t) {
          const C = t[u].find(
            ($) => $.entity_id === n.entity
          );
          if (!C || ae.includes(C.state) || te.includes(C.state))
            return V;
        }
      }
      let r;
      n.entity && (r = this.hass.states[n.entity]);
      let a;
      n.activate_state_color && r && (!n.color || n.color === "state") && (a = pn(r));
      const c = a ? { color: a } : n.color ? { color: `var(--${n.color}-color, ${n.color})` } : {};
      let l = n.icon;
      if (!l && r && (l = r.attributes.icon, !l)) {
        const u = P(r.entity_id), C = !ae.includes(r.state) && !te.includes(r.state);
        l = ps(u, C, r.attributes.device_class);
      }
      const d = !!n.name;
      return g`
            <div
              class="icon-with-count hover"
              style=${E(
        this._getParsedCss(
          ((h = n.styles) == null ? void 0 : h.button) || ((_ = n.styles) == null ? void 0 : _.card) || n.css,
          n
        )
      )}
              @action=${Xe(
        this,
        "custom_button",
        "",
        void 0,
        n
      )}
              .actionHandler=${Y(n)}
            >
              ${l ? l.startsWith("M") ? g`<ha-svg-icon
                      .path=${l}
                      style=${E({
        ...c,
        ...this._getParsedCss(
          ((p = n.styles) == null ? void 0 : p.icon) || n.icon_css,
          n
        )
      })}
                    ></ha-svg-icon>` : g`<ha-icon
                      .icon=${l}
                      style=${E({
        ...c,
        ...this._getParsedCss(
          ((m = n.styles) == null ? void 0 : m.icon) || n.icon_css,
          n
        )
      })}
                    ></ha-icon>` : V}
              ${d ? g`<span class="custom-button-label" style=${E({
        ...c,
        ...this._getParsedCss((f = n.styles) == null ? void 0 : f.name, n)
      })}"
                    >${n.name}</span
                  >` : V}
            </div>
          `;
    })}
      </div>
    `;
  }
  _renderButtons(t, e, s) {
    var o, n, r;
    const i = {
      v2: ((o = this._config) == null ? void 0 : o.design) === "V2",
      row: ((n = this._config) == null ? void 0 : n.layout) === "horizontal"
    };
    return (r = this._config) != null && r.excluded_entities, g`
      <div
        class="${ee({
      buttons: !0,
      ...i
    })}"
      >
        ${se(
      t,
      (a) => a,
      (a) => {
        var H, v, y, w, A, b, x, D, j, F;
        if (a === "climate") {
          const M = s.get("climate"), O = M == null ? void 0 : M.display_mode;
          if (M && M.hide === !0 || O !== "icon" && O !== "text_icon")
            return V;
        }
        const c = s.get(a), l = (c == null ? void 0 : c.color) || ((H = this._config) == null ? void 0 : H.domain_color), d = c == null ? void 0 : c.icon, h = a === "climate" ? (y = (v = this._config) == null ? void 0 : v.customization_domain) == null ? void 0 : y.find(
          (M) => M.type === "climate"
        ) : void 0, _ = h == null ? void 0 : h.display_mode, p = h == null ? void 0 : h.show_set_temperature, m = a === "climate" && (_ === "icon" || _ === "text_icon") && p === !0, f = e[a].filter((M) => !(ae.includes(M.state) || this._excludedEntitiesSet.has(M.entity_id)));
        let u = [], C;
        if (m) {
          u = f;
          let M = !1, O = !1;
          for (const I of f) {
            const T = ((w = I.attributes) == null ? void 0 : w.hvac_action) ?? null, k = (I.state ?? "").toString().toLowerCase();
            if (T != null) {
              const N = T.toString().toLowerCase();
              M = M || N.includes("heat") || N.includes("heating"), O = O || N.includes("cool") || N.includes("cooling");
            } else
              M = M || k.includes("heat") || k.includes("heating"), O = O || k.includes("cool") || k.includes("cooling");
            if (M && O) break;
          }
          M ? C = this._getClimateColor("heat", "red") : O ? C = this._getClimateColor("cool", "cornflowerblue") : C = this._getClimateColor("standby", "") || ((A = this._config) == null ? void 0 : A.climate_standby_color);
        } else
          u = f.filter((M) => {
            var O;
            if (a === "climate") {
              const I = (O = M.attributes) == null ? void 0 : O.hvac_action;
              if (I != null) {
                const k = I.toString().toLowerCase();
                return !(k === "off" || k === "idle");
              }
              const T = (M.state ?? "").toString().toLowerCase();
              return !(T === "off" || T === "idle");
            }
            return !te.includes(M.state);
          });
        const $ = u.length;
        return this._config.show_active && $ === 0 ? V : g`
              <div
                class="icon-with-count hover"
                style=${E(
          this._getParsedCss(
            ((b = c == null ? void 0 : c.styles) == null ? void 0 : b.button) || ((x = c == null ? void 0 : c.styles) == null ? void 0 : x.card) || (c == null ? void 0 : c.css) || ((D = this._config) == null ? void 0 : D.domain_css) || ((F = (j = this._config) == null ? void 0 : j.styles) == null ? void 0 : F.domain),
            c
          )
        )}
                @action=${$t(this, a)}
                .actionHandler=${Y(c)}
              >
                ${(() => {
          var I, T;
          const M = d || this._cachedIcon(a, $ > 0), O = E({
            ...C ? { color: C } : {},
            ...!C && l ? { color: `var(--${l}-color)` } : {},
            ...!C && !l && ((I = this._config) != null && I.domain_color) ? { color: this._config.domain_color } : {},
            ...this._getParsedCss(
              ((T = c == null ? void 0 : c.styles) == null ? void 0 : T.icon) || (c == null ? void 0 : c.icon_css),
              c
            )
          });
          return M && !M.startsWith("mdi:") ? M.startsWith("M") ? g`<ha-svg-icon
                        class=${$ > 0 ? "toggle-on" : "toggle-off"}
                        style=${O}
                        .path=${M}
                      ></ha-svg-icon>` : g`<ha-icon
                      class=${$ > 0 ? "toggle-on" : "toggle-off"}
                      style=${O}
                      .icon=${M}
                    ></ha-icon>` : g`<ha-state-icon
                    style=${O}
                    class=${$ > 0 ? "toggle-on" : "toggle-off"}
                    .domain=${a}
                    .icon=${M}
                  ></ha-state-icon>`;
        })()}
                <span
                  class="active-count text-small ${$ > 0 ? "on" : "off"}"
                >
                  ${$}
                </span>
              </div>
            `;
      }
    )}
      </div>
    `;
  }
  _renderSensors(t, e, s, i, o) {
    var n, r, a, c;
    return (n = this._config) != null && n.excluded_entities, g`
      <div 
        class="sensors"
        style=${E(
      this._getParsedCss(
        (a = (r = this._config) == null ? void 0 : r.styles) == null ? void 0 : a.sensors,
        this._config
      )
    )}
      >
        ${(c = this._config) != null && c.wrap_sensor_icons ? se(
      t,
      (l) => l.domain + "-" + l.deviceClass,
      ({ domain: l, deviceClass: d, index: h }) => {
        var w, A, b, x, D, j, F, M, O, I, T;
        const p = (((w = s.get(l)) == null ? void 0 : w.get(d)) || []).filter(
          (k) => {
            var N;
            return !this._excludedEntitiesSet.has(k.entity_id) && ye(
              k.entity_id,
              this.hass.entities,
              (N = this._config) == null ? void 0 : N.category_filter
            );
          }
        );
        if (p.length === 0)
          return V;
        let m = null;
        switch (d) {
          case "temperature":
            m = i.temperature_entity_id;
            break;
          case "humidity":
            m = i.humidity_entity_id;
            break;
        }
        const f = m ? this.hass.states[m] : void 0, u = o.get(d), C = (u == null ? void 0 : u.color) || ((A = this._config) == null ? void 0 : A.sensor_color), $ = (u == null ? void 0 : u.invert) === !0, H = p.some(
          (k) => !ae.includes(k.state) && !te.includes(k.state)
        );
        if ($ && H)
          return V;
        const v = (b = this._config) != null && b.show_sensor_icons ? g`<ha-domain-icon
                      style=${E({
          ...C ? { color: `var(--${C}-color)` } : {},
          ...this._getParsedCss(
            ((x = u == null ? void 0 : u.styles) == null ? void 0 : x.icon) || (u == null ? void 0 : u.css),
            u
          )
        })}
                      .hass=${this.hass}
                      .domain=${l}
                      .deviceClass=${d}
                    ></ha-domain-icon>` : null, y = g`<span
                  class="sensor-value"
                  @action=${hs(this, l, d)}
                  .actionHandler=${Y(u)}
                  style=${E({
          ...C ? { color: `var(--${C}-color)` } : {},
          ...this._getParsedCss(
            (j = (D = this._config) == null ? void 0 : D.styles) == null ? void 0 : j.sensor,
            this._config
          ),
          ...this._getParsedCss(
            ((F = u == null ? void 0 : u.styles) == null ? void 0 : F.sensor) || ((M = u == null ? void 0 : u.styles) == null ? void 0 : M.button) || ((O = u == null ? void 0 : u.styles) == null ? void 0 : O.card) || (u == null ? void 0 : u.css),
            u
          )
        })}
                >
                  ${!((I = this._config) != null && I.show_sensor_icons) && !((T = this._config) != null && T.wrap_sensor_icons) && h > 0 ? " - " : ""}
                  ${f ? this.hass.formatEntityState(f) : us(
          l,
          d,
          p,
          this.hass.locale
        )}
                </span>`;
        return g`<div class="sensor-row off">${v}${y}</div>`;
      }
    ) : g`<div class="sensor text-medium off">
              ${se(
      t,
      (l) => l.domain + "-" + l.deviceClass,
      ({ domain: l, deviceClass: d, index: h }) => {
        var w, A, b, x, D, j, F, M, O, I, T;
        const p = (((w = s.get(l)) == null ? void 0 : w.get(d)) || []).filter(
          (k) => {
            var N;
            return !this._excludedEntitiesSet.has(k.entity_id) && ye(
              k.entity_id,
              this.hass.entities,
              (N = this._config) == null ? void 0 : N.category_filter
            );
          }
        );
        if (p.length === 0)
          return V;
        let m = null;
        switch (d) {
          case "temperature":
            m = i.temperature_entity_id;
            break;
          case "humidity":
            m = i.humidity_entity_id;
            break;
        }
        const f = m ? this.hass.states[m] : void 0, u = o.get(d), C = (u == null ? void 0 : u.color) || ((A = this._config) == null ? void 0 : A.sensor_color), $ = (u == null ? void 0 : u.invert) === !0, H = p.some(
          (k) => !ae.includes(k.state) && !te.includes(k.state)
        );
        if ($ && H)
          return V;
        const v = (b = this._config) != null && b.show_sensor_icons ? g`<ha-domain-icon
                        style=${E({
          ...C ? { color: `var(--${C}-color)` } : {},
          ...this._getParsedCss(
            ((x = u == null ? void 0 : u.styles) == null ? void 0 : x.icon) || (u == null ? void 0 : u.css),
            u
          )
        })}
                        .hass=${this.hass}
                        .domain=${l}
                        .deviceClass=${d}
                      ></ha-domain-icon>` : null, y = g`<span
                    class="sensor-value"
                    @action=${hs(this, l, d)}
                    .actionHandler=${Y(u)}
                    style=${E({
          ...C ? { color: `var(--${C}-color)` } : {},
          ...this._getParsedCss(
            (j = (D = this._config) == null ? void 0 : D.styles) == null ? void 0 : j.sensor,
            this._config
          ),
          ...this._getParsedCss(
            ((F = u == null ? void 0 : u.styles) == null ? void 0 : F.sensor) || ((M = u == null ? void 0 : u.styles) == null ? void 0 : M.button) || ((O = u == null ? void 0 : u.styles) == null ? void 0 : O.card) || (u == null ? void 0 : u.css),
            u
          )
        })}
                  >
                    ${!((I = this._config) != null && I.show_sensor_icons) && !((T = this._config) != null && T.wrap_sensor_icons) && h > 0 ? " - " : ""}
                    ${f ? this.hass.formatEntityState(f) : us(
          l,
          d,
          p,
          this.hass.locale
        )}
                  </span>`;
        return g`${v}${y}`;
      }
    )}
            </div>`}
      </div>
    `;
  }
  _renderClimates(t, e, s) {
    var o;
    const i = ((o = this._config) == null ? void 0 : o.excluded_entities) || [];
    return g`
      <div class="climate text-small off">
        ${se(
      t,
      (n) => n.domain,
      ({ domain: n }) => {
        var _, p, m, f, u;
        const r = e[n] || [], a = s.get(n) || {};
        if ((a == null ? void 0 : a.display_mode) === "icon")
          return V;
        if ((a == null ? void 0 : a.show_set_temperature) === !0) {
          const C = r.filter((v) => !this._excludedEntitiesSet.has(v.entity_id)).map((v) => {
            var I, T, k, N, S, B;
            const y = ((I = v.attributes) == null ? void 0 : I.temperature) ?? ((T = v.attributes) == null ? void 0 : T.target_temperature) ?? null;
            if (y == null) return null;
            const w = Number(y);
            if (Number.isNaN(w)) return null;
            const A = ((S = (N = (k = this.hass) == null ? void 0 : k.config) == null ? void 0 : N.unit_system) == null ? void 0 : S.temperature) || "", b = ((B = v.attributes) == null ? void 0 : B.hvac_action) ?? null, x = (v.state ?? "").toString().toLowerCase(), D = (b ?? x).toString().toLowerCase(), j = D.includes("heat") || D.includes("heating"), F = D.includes("cool") || D.includes("cooling"), M = j ? this._getClimateStyle("heat") : F ? this._getClimateStyle("cool") : this._getClimateStyle("standby"), O = M.color || (j ? "red" : F ? "cornflowerblue" : "var(--secondary-text-color)");
            return g`<span style=${E({
              color: O,
              ...M
            })}
                    >${w}${A ? ` ${A}` : ""}</span
                  >`;
          }).filter((v) => v !== null);
          if (C.length === 0) return V;
          const $ = C.reduce(
            (v, y, w) => (w === 0 || v.push(
              g`<span
                        style=${E({
                color: "var(--secondary-text-color)",
                ...this._getClimateStyle("standby")
              })}
                        >,
                      </span>`
            ), v.push(y), v),
            []
          ), H = {
            ...a != null && a.color ? { color: `var(--${a.color}-color)` } : {},
            ...this._getParsedCss(
              ((_ = a == null ? void 0 : a.styles) == null ? void 0 : _.button) || ((p = a == null ? void 0 : a.styles) == null ? void 0 : p.card) || (a == null ? void 0 : a.css),
              a
            )
          };
          return g`<div
                class="climate"
                style=${E(H)}
                @action=${$t(this, n)}
                .actionHandler=${Y(a)}
              >
                <span
                  style=${E({
            color: "var(--secondary-text-color)",
            ...this._getClimateStyle("standby")
          })}
                  >(</span
                >${$}<span
                  style=${E({
            color: "var(--secondary-text-color)",
            ...this._getClimateStyle("standby")
          })}
                  >)</span
                >
              </div>`;
        }
        const l = (r || []).filter((C) => {
          var A;
          const $ = (A = C.attributes) == null ? void 0 : A.hvac_action, H = C.state, v = !ae.includes(H) && !te.includes(H) && !i.includes(C.entity_id);
          if ($ != null) {
            const b = $.toString().toLowerCase();
            return v && (b !== "idle" && b !== "off");
          }
          const y = (H ?? "").toString().toLowerCase(), w = y.includes("heat") || y.includes("cool") || y !== "idle" && y !== "off";
          return v && w;
        }).map((C) => {
          var H, v, y, w;
          return `${((H = C.attributes) == null ? void 0 : H.temperature) ?? "N/A"} ${((w = (y = (v = this.hass) == null ? void 0 : v.config) == null ? void 0 : y.unit_system) == null ? void 0 : w.temperature) || ""}`;
        });
        if (l.length === 0)
          return V;
        const d = a == null ? void 0 : a.color, h = {
          ...d ? { color: `var(--${d}-color)` } : {},
          ...!d && ((m = this._config) != null && m.domain_color) ? { color: this._config.domain_color } : {},
          ...this._getParsedCss(
            ((f = a == null ? void 0 : a.styles) == null ? void 0 : f.button) || ((u = a == null ? void 0 : a.styles) == null ? void 0 : u.card) || (a == null ? void 0 : a.css),
            a
          )
        };
        return g`<div
              class="climate"
              style=${E(h)}
              @action=${$t(this, n)}
              .actionHandler=${Y(a)}
            >
              <span
                style=${E(
          this._getClimateStyle(
            l.length > 0 ? "heat" : "standby"
          )
        )}
                >(${l.join(", ")})</span
              >
            </div>`;
      }
    )}
      </div>
    `;
  }
  _renderBottom(t, e, s, i, o, n, r, a) {
    var c, l, d, h;
    return g`
      <div
        class="${ee({
      bottom: !0,
      ...e
    })}"
      >
        <div
          class="${ee({
      name: !0,
      ...e,
      "text-large": !0,
      on: !0
    })}"
          style=${E({
      ...(c = this._config) != null && c.area_name_color ? { color: `var(--${this._config.area_name_color}-color)` } : {},
      ...this._getParsedCss(
        ((d = (l = this._config) == null ? void 0 : l.styles) == null ? void 0 : d.name) || ((h = this._config) == null ? void 0 : h.name_css),
        this._config
      )
    })}
          @action=${this._handleAction}
          .actionHandler=${Y(this._config)}
        >
          ${this._config.area_name || t.name}
        </div>
        ${this._renderSensors(
      s,
      i,
      o,
      t,
      n
    )}
        ${this._renderClimates(
      r,
      i,
      a
    )}
      </div>
    `;
  }
  render() {
    var I, T, k, N, S, B, R, ne, K, Q, ke, De, Ut, jt, Wt, Kt;
    if (!this._config || !this.hass || !this.hass.areas || !this.hass.devices || !this.hass.entities)
      return V;
    const t = ((I = this._config) == null ? void 0 : I.design) === "V2", e = t && ((T = this._config) != null && T.v2_color) ? `rgba(${this._config.v2_color.join(", ")})` : "var(--primary-color)", s = {
      mirrored: this._config.mirrored === !0
    }, i = {
      v2: ((k = this._config) == null ? void 0 : k.design) === "V2",
      row: ((N = this._config) == null ? void 0 : N.layout) === "horizontal"
    };
    let o = 3;
    try {
      const q = ((S = this.shadowRoot) == null ? void 0 : S.host) || document.documentElement, fe = getComputedStyle(q).getPropertyValue("--row-size");
      fe && (o = Number(fe.trim()) || 3);
    } catch {
    }
    const n = t ? { background: e } : {}, r = t && o === 1 ? {} : t ? { background: e } : {}, a = this.hass.entities && this.hass.devices ? re(this.hass.entities, this.hass.devices) : void 0, c = this._getAreaEntityIds(
      this._config.area,
      a ? ms : this._devicesInArea(this._config.area, this.hass.devices),
      this.hass.entities,
      this._hiddenEntitiesSet,
      this._config.label,
      a
    ), { grouped: l, byDomain: d } = this._getOrganizedEntities(
      c,
      this.hass.states,
      this._deviceClasses
    ), h = {};
    Object.entries(d).forEach(([q, fe]) => {
      h[q] = fe.filter(
        (Je) => {
          var Pe;
          return ye(
            Je.entity_id,
            this.hass.entities,
            (Pe = this._config) == null ? void 0 : Pe.category_filter
          );
        }
      );
    });
    const _ = this._area(this._config.area, ((B = this.hass) == null ? void 0 : B.areas) || {}), p = this._customizationDomainMap, m = this._customizationCoverMap, f = this._customizationAlertMap, u = this._customizationSensorMap, C = this._computeCovers(h, this._deviceClasses), $ = this._computeAlerts(h, this._deviceClasses), H = this._computeButtons(
      this._config.toggle_domains,
      h
    ), v = this._computeSensors(h, this._deviceClasses), y = ((ne = (R = this._config) == null ? void 0 : R.toggle_domains) != null && ne.includes("climate") ? dt : []).filter((q) => q in h).map((q) => ({ domain: q })), w = (((K = this._config) == null ? void 0 : K.display_type) || "").toString().toLowerCase(), A = w.includes("camera"), b = w.includes("picture") || w.includes("image"), x = w === "" ? !0 : w.includes("icon"), D = A ? h.camera || [] : [], j = A && (this._config.camera_entity || this._config.camera_entity_left || this._config.camera_entity_right), F = A && (D.length > 0 || j) || b && _.picture;
    if (_ === null)
      return g`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    const M = this._computeIconStyles(
      t,
      o,
      ((ke = (Q = this._config) == null ? void 0 : Q.styles) == null ? void 0 : ke.icon) || ((De = this._config) == null ? void 0 : De.icon_css),
      (Ut = this._config) == null ? void 0 : Ut.area_icon_color
    ), O = this.layout === "grid" || this.layout === "panel";
    return g`
      <ha-card
        class="${ee(s)}"
        style=${E(
      this._getParsedCss(
        ((Wt = (jt = this._config) == null ? void 0 : jt.styles) == null ? void 0 : Wt.card) || ((Kt = this._config) == null ? void 0 : Kt.css),
        this._config
      )
    )}
      >
        <div
          class="header"
          style=${F ? "padding-bottom:0em" : "padding-bottom:12em"}
          @action=${this._handleAction}
          .actionHandler=${Y(this._config)}
        >
          <div
            class="picture"
            style=${O ? V : "max-height:12em;"}
          >
            ${(() => {
      var q, fe, Je, Pe, Gt, qt, Yt, Xt, Jt, Qt, e1;
      if (!F) return V;
      if (A && D.length > 0) {
        const _t = ((q = this._config) == null ? void 0 : q.camera_mode) || "single", mt = this._getParsedCss((Je = (fe = this._config) == null ? void 0 : fe.styles) == null ? void 0 : Je.camera, this._config);
        if (_t === "split") {
          const Ve = ((Pe = this._config) == null ? void 0 : Pe.camera_entity_left) || ((Gt = D[0]) == null ? void 0 : Gt.entity_id), $e = ((qt = this._config) == null ? void 0 : qt.camera_entity_right) || ((Yt = D[1]) == null ? void 0 : Yt.entity_id);
          if (Ve && $e)
            return g`
                <div style="display: flex; height: 100%; width: 100%;">
                  <hui-image
                    style=${E({ flex: "1", width: "50%", "object-fit": "cover", ...mt })}
                    .config=${this._config}
                    .hass=${this.hass}
                    .cameraImage=${Ve}
                    .cameraView=${this._config.camera_view}
                    fit-mode="cover"
                  ></hui-image>
                  <div style="width: 2px; height: 100%; background: var(--divider-color, rgba(0,0,0,0.5)); z-index: 1;"></div>
                  <hui-image
                    style=${E({ flex: "1", width: "50%", "object-fit": "cover", ...mt })}
                    .config=${this._config}
                    .hass=${this.hass}
                    .cameraImage=${$e}
                    .cameraView=${this._config.camera_view}
                    fit-mode="cover"
                  ></hui-image>
                </div>
              `;
        } else {
          let Ve = (Xt = D[0]) == null ? void 0 : Xt.entity_id;
          return _t === "single" && ((Jt = this._config) != null && Jt.camera_entity) ? Ve = this._config.camera_entity : _t === "auto" && D.length > 0 && (Ve = D[this._currentCameraIndex % D.length].entity_id), g`
              ${se([Ve], ($e) => $e, ($e) => g`
                <hui-image
                  .config=${this._config}
                  .hass=${this.hass}
                  style=${E({ width: "100%", height: "100%", ...mt })}
                  .cameraImage=${$e}
                  .cameraView=${this._config.camera_view}
                  fit-mode="cover"
                ></hui-image>
              `)}
            `;
        }
      }
      if (b && _.picture)
        return g`
            <hui-image
              .config=${this._config}
              .hass=${this.hass}
              style=${E({ width: "100%", height: "100%", ...this._getParsedCss((e1 = (Qt = this._config) == null ? void 0 : Qt.styles) == null ? void 0 : e1.image, this._config) })}
              .image=${_.picture}
              fit-mode="cover"
            ></hui-image>
          `;
    })()}
          </div>
        </div>

        <div
          class="${ee({
      "icon-container": !0,
      ...i
    })}"
          style=${E(r)}
        >
          ${x ? (this._config.area_icon || _.icon || "").startsWith("M") ? g`
                  <ha-svg-icon
                    style=${E(M)}
                    .path=${this._config.area_icon || _.icon}
                  ></ha-svg-icon>
                ` : g`
                  <ha-icon
                    style=${E(M)}
                    icon=${this._config.area_icon || _.icon}
                  ></ha-icon>
                ` : V}
        </div>

        <div
          class="${ee({
      content: !0,
      ...i
    })}"
          @action=${this._handleAction}
          .actionHandler=${Y(this._config)}
        >
          ${_1(g`<div
            class="${ee({
      right: !0,
      ...i
    })}"
            style=${E(n)}
          >
            ${this._renderCovers(
      C,
      l,
      m
    )}
            ${this._renderAlerts(
      $,
      l,
      f
    )}
            ${this.renderCustomButtons(h)}
            ${this._renderButtons(
      H,
      h,
      p
    )}
          </div>`)}
          ${_1(
      this._renderBottom(
        _,
        i,
        v,
        h,
        l,
        u,
        y,
        p
      )
    )}
        </div>
      </ha-card>
    `;
  }
  showPopup(t, e, s) {
    t.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => customElements.whenDefined(e),
          dialogParams: s
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
    const e = this._area((o = this._config) == null ? void 0 : o.area, ((n = this.hass) == null ? void 0 : n.areas) || {}), s = ((r = this._config) == null ? void 0 : r.area_name) || e && e.name || "Details";
    this.showPopup(this, "area-card-plus-popup", {
      title: s,
      hass: this.hass,
      selectedDomain: t,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup || void 0,
      opener: this,
      card: this,
      entities: this._getAreaEntityIds(
        this._config.area,
        this._devicesInArea(this._config.area, this.hass.devices),
        this.hass.entities,
        this._hiddenEntitiesSet,
        this._config.label,
        this.hass.entities && this.hass.devices ? re(this.hass.entities, this.hass.devices) : void 0
      ).map((a) => this.hass.states[a]).filter((a) => a !== void 0)
    });
  }
  _openGeneralPopup() {
    var i, o, n;
    const t = this._area((i = this._config) == null ? void 0 : i.area, ((o = this.hass) == null ? void 0 : o.areas) || {}), e = ((n = this._config) == null ? void 0 : n.area_name) || t && t.name || "Details";
    this.showPopup(this, "area-card-plus-popup", {
      title: e,
      hass: this.hass,
      opener: this,
      card: this,
      entities: this._getAreaEntityIds(
        this._config.area,
        this._devicesInArea(this._config.area, this.hass.devices),
        this.hass.entities,
        this._hiddenEntitiesSet,
        this._config.label,
        this.hass.entities && this.hass.devices ? re(this.hass.entities, this.hass.devices) : void 0
      ).map((r) => this.hass.states[r]).filter((r) => r !== void 0)
    });
  }
  static get styles() {
    return qo;
  }
};
_e([
  z({ attribute: !1 })
], ce.prototype, "hass", 2);
_e([
  z({ attribute: !1 })
], ce.prototype, "layout", 2);
_e([
  U()
], ce.prototype, "_config", 2);
_e([
  U()
], ce.prototype, "selectedDomain", 2);
_e([
  U()
], ce.prototype, "selectedDeviceClass", 2);
_e([
  U()
], ce.prototype, "selectedGroup", 2);
_e([
  U()
], ce.prototype, "_currentCameraIndex", 2);
ce = _e([
  he("area-card-plus")
], ce);
const Dn = L(() => [{ name: "area", selector: { area: {} } }]), Pn = L(
  (t, e, s, i, o) => {
    const n = (a) => o.localize(a) || a, r = [
      {
        name: "camera_view",
        selector: {
          select: {
            options: ["auto", "live"].map((a) => ({
              value: a,
              label: n(
                `ui.panel.lovelace.editor.card.generic.camera_view_options.${a}`
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
              { value: "single", label: "Single Camera" },
              { value: "auto", label: "Auto Rotation" },
              { value: "split", label: "Split View (50/50)" }
            ],
            mode: "dropdown"
          }
        }
      }
    ];
    return s === "single" ? r.push({
      name: "camera_entity",
      selector: {
        select: {
          options: i,
          mode: "dropdown"
        }
      }
    }) : s === "auto" ? r.push({
      name: "camera_auto_interval",
      selector: { number: { min: 1, max: 3600, mode: "box" } }
    }) : s === "split" && r.push(
      {
        name: "camera_entity_left",
        selector: {
          select: {
            options: i,
            mode: "dropdown"
          }
        }
      },
      {
        name: "camera_entity_right",
        selector: {
          select: {
            options: i,
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
                ].map((a) => {
                  const c = (h) => {
                    const _ = h.trim().toLowerCase();
                    return _ === "icon" ? "ui.panel.lovelace.editor.card.generic.icon" : _ === "picture" || _ === "image" ? "ui.components.selectors.image.image" : _ === "camera" ? "ui.panel.lovelace.editor.card.area.display_type_options.camera" : `ui.panel.lovelace.editor.card.area.display_type_options.${h}`;
                  }, d = a.split(" & ").map((h) => h.trim()).map((h) => n(c(h)) || h).join(" & ");
                  return { value: a, label: d };
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
            options: ["vertical", "horizontal"].map((a) => ({
              label: o.localize(
                `ui.panel.lovelace.editor.card.tile.content_layout_options.${a}`
              ),
              value: a,
              image: {
                src: `/static/images/form/tile_content_layout_${a}.svg`,
                src_dark: `/static/images/form/tile_content_layout_${a}_dark.svg`,
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
), zn = L(() => {
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
}), In = L((t) => [
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
]), Tn = L((t) => [
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
]), Zn = L((t) => [
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
]), Nn = L((t) => [
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
]), Bn = L(() => [
  {
    name: "styles",
    selector: {
      object: {}
    }
  }
]);
var Rn = Object.defineProperty, Fn = Object.getOwnPropertyDescriptor, W = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Fn(e, s) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Rn(e, s, o), o;
};
class He extends ie {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    if (!this.hass)
      return V;
    const e = new Set(
      (this.customization || []).map((i) => i.type)
    ), s = this.SelectOptions.filter(
      (i) => !e.has(i.value)
    );
    return g`
      <div class="customization">
        ${this.customization && se(
      this.customization,
      (i) => this._getKey(i),
      (i, o) => g`
            <div class="customize-item">
              <ha-selector
                .hass=${this.hass}
                .label=${this.hass.localize(
        "ui.panel.lovelace.editor.features.edit"
      )}
                .selector=${{ select: { options: this.SelectOptions, mode: "dropdown" } }}
                .value=${i.type}
                .index=${o}
                @value-changed=${this._valueChanged}
              ></ha-selector>

              <ha-icon-button
                .label="Remove"
                .path=${lt}
                class="remove-icon"
                .index=${o}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${$s}
                class="edit-icon"
                .index=${o}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `
    )}

        <div class="add-item row">
          <ha-selector
            .hass=${this.hass}
            .label=${this.hass.localize(
      "ui.panel.lovelace.editor.common.edit"
    ) + " " + this.hass.localize(
      "ui.panel.lovelace.editor.card.markdown.content"
    )}
            .selector=${{ select: { options: s, mode: "dropdown" } }}
            .value=${""}
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
    const s = e.detail.value, i = e.target.index, o = this.customization.concat();
    o[i] = { ...o[i], type: s || "" }, Z(this, "config-changed", o);
  }
  _removeRow(e) {
    e.stopPropagation();
    const s = e.currentTarget.index;
    if (s != null) {
      const i = this.customization.concat();
      i.splice(s, 1), Z(this, "config-changed", i);
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const s = e.target.index;
    s != null && Z(this, "edit-item", s);
  }
  _addRow(e) {
    if (e.stopPropagation(), !this.customization || !this.hass)
      return;
    const s = e.detail.value;
    if (!s)
      return;
    const i = { type: s };
    Z(this, "config-changed", [...this.customization, i]);
    const o = e.target;
    o && (o.value = "");
  }
  static get styles() {
    return Ee`
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
W([
  z({ attribute: !1 })
], He.prototype, "hass", 2);
W([
  z({ type: Array })
], He.prototype, "SelectOptions", 2);
let Ot = class extends He {
  get customization() {
    return this.customization_domain;
  }
};
W([
  z({ attribute: !1 })
], Ot.prototype, "customization_domain", 2);
Ot = W([
  he("domain-items-editor")
], Ot);
let kt = class extends He {
  get customization() {
    return this.customization_alert;
  }
};
W([
  z({ attribute: !1 })
], kt.prototype, "customization_alert", 2);
kt = W([
  he("alert-items-editor")
], kt);
let Dt = class extends He {
  get customization() {
    return this.customization_cover;
  }
};
W([
  z({ attribute: !1 })
], Dt.prototype, "customization_cover", 2);
Dt = W([
  he("cover-items-editor")
], Dt);
let Pt = class extends He {
  get customization() {
    return this.customization_sensor;
  }
};
W([
  z({ attribute: !1 })
], Pt.prototype, "customization_sensor", 2);
Pt = W([
  he("sensor-items-editor")
], Pt);
let zt = class extends He {
  get customization() {
    return this.customization_popup;
  }
};
W([
  z({ attribute: !1 })
], zt.prototype, "customization_popup", 2);
zt = W([
  he("popup-items-editor")
], zt);
let Ge = class extends ie {
  _editRow(t) {
    t.stopPropagation();
    const e = t.currentTarget.index;
    Z(this, "edit-item", e);
  }
  _removeRow(t) {
    if (t.stopPropagation(), !this.custom_buttons) return;
    const e = t.currentTarget.index, s = [...this.custom_buttons];
    s.splice(e, 1), Z(this, "config-changed", s);
  }
  _addRow() {
    const t = {
      name: "",
      icon: "",
      tap_action: { action: "none" }
    }, e = [...this.custom_buttons || [], t];
    Z(this, "config-changed", e);
  }
  render() {
    var t;
    return this.hass ? g`
      <div class="custom-buttons">
        ${(t = this.custom_buttons) == null ? void 0 : t.map(
      (e, s) => g`
            <div class="row">
              <div class="item">
                ${(() => {
        const i = e.icon;
        return i != null && i.startsWith("M") ? g`<ha-svg-icon .path=${i}></ha-svg-icon>` : i ? g`<ha-icon .icon=${i}></ha-icon>` : g`<ha-svg-icon
                    .path=${ht}
                  ></ha-svg-icon>`;
      })()}
                <span class="name"
                  >${e.name || `Button ${s + 1}`}</span
                >
              </div>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${$s}
                .index=${s}
                @click=${this._editRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${lt}
                .index=${s}
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
    ` : V;
  }
};
Ge.styles = Ee`
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
W([
  z({ attribute: !1 })
], Ge.prototype, "hass", 2);
W([
  z({ attribute: !1 })
], Ge.prototype, "custom_buttons", 2);
Ge = W([
  he("custom-buttons-editor")
], Ge);
var Un = Object.defineProperty, jn = Object.getOwnPropertyDescriptor, me = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? jn(e, s) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Un(e, s, o), o;
};
const fs = [
  "more-info",
  "toggle",
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
], Kn = [
  "more-info",
  "navigate",
  "url",
  "perform-action",
  "none"
];
let le = class extends ie {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._activeTab = "config", this._schemadomainConfig = L(() => {
      var e;
      const t = [
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        }
      ];
      return ((e = this._config) == null ? void 0 : e.type) === "climate" && t.unshift(
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
      ), t;
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
    }), this._schemasensorConfig = L(() => [
      { name: "invert", selector: { boolean: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      }
    ]), this._schemasensorActions = L(() => {
      const t = Kn;
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
        case "entity":
          return this.hass.localize("ui.common.entity");
        case "activate_state_color":
          return this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.state_color"
          );
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
      return g``;
    const t = this.hass;
    this._config || (this._config = { ...this.config, area: this.config.area || "" });
    let e;
    if (this._activeTab === "config")
      switch (this.getSchema) {
        case "sensor":
          e = this._schemasensorConfig();
          break;
        case "domain":
          e = this._schemadomainConfig();
          break;
        case "alert":
        case "cover":
          e = this._schemaalertConfig();
          break;
        case "custom_button":
          e = this._schemacustombuttonConfig();
          break;
      }
    else if (this._activeTab === "actions")
      switch (this.getSchema) {
        case "sensor":
          e = this._schemasensorActions();
          break;
        case "domain":
          e = this._schemadomainActions();
          break;
        case "alert":
        case "cover":
          e = this._schemaalertActions();
          break;
        case "custom_button":
          e = this._schemacustombuttonActions();
          break;
      }
    else this._activeTab === "style" && (e = this._schemaStyle());
    const s = { ...this._config };
    return g`
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
        ${this.getSchema !== "custom_button" ? g`
              <ha-tab-group-tab
                .active=${this._activeTab === "popup"}
                @click=${() => this._activeTab = "popup"}
              >
                Popup Card
              </ha-tab-group-tab>
            ` : ""}
      </ha-tab-group>

      ${this._activeTab === "style" ? g`
            <ha-alert alert-type="info" title="Style Guide">
              <p>
                You can use standard CSS per identifier. <br />
                <strong>Identifiers:</strong>
              </p>
              <ul>
                <li><b>button</b>: Item Container (Background, Border)</li>
                <li><b>icon</b>: Item Icon</li>
                ${this.getSchema === "custom_button" ? g`<li><b>name</b>: Item Name (Label)</li>` : V}
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
          ` : V}
      ${this._activeTab === "popup" ? this._renderPopupTab() : g`
            <ha-form
              .hass=${t}
              .data=${s}
              .schema=${e}
              .computeLabel=${this._computeLabelCallback}
              @value-changed=${this._valueChangedSchema}
            ></ha-form>
          `}
    `;
  }
  _renderPopupTab() {
    var e;
    const t = (e = this._config) == null ? void 0 : e.popup_card;
    return t ? g`
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
    ` : g`
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
    const { popup_card: t, ...e } = this._config;
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: this._config
      })
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
    return Ee`
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
    `;
  }
};
me([
  z({ attribute: !1 })
], le.prototype, "config", 2);
me([
  z({ attribute: !1 })
], le.prototype, "hass", 2);
me([
  z({ type: Boolean })
], le.prototype, "useSensorSchema", 2);
me([
  z({ attribute: !1 })
], le.prototype, "lovelace", 2);
me([
  U()
], le.prototype, "getSchema", 2);
me([
  U()
], le.prototype, "_config", 2);
me([
  U()
], le.prototype, "_activeTab", 2);
le = me([
  he("item-editor")
], le);
var Gn = Object.defineProperty, qn = Object.getOwnPropertyDescriptor, J = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? qn(e, s) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Gn(e, s, o), o;
};
const gs = /* @__PURE__ */ new Set();
let G = class extends ie {
  constructor() {
    super(...arguments), this._activeTab = "config", this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this._subElementEditorCustomButton = void 0, this._computeLabelCallback = L(
      (t, e) => Ss(e, t)
    ), this.computeLabel = (t) => this._computeLabelCallback(t, this.hass), this._schema = L(
      (t, e, s, i, o, n) => {
        switch (t) {
          case "appearance":
            return Pn(
              e,
              s,
              i,
              o,
              this.hass
            );
          case "actions":
            return zn();
          case "style":
            return Bn();
          case "config":
          default:
            return Dn();
        }
      }
    ), this._binaryschema = L(
      (t) => In(t)
    ), this._coverschema = L(
      (t) => Tn(t)
    ), this._sensorschema = L(
      (t) => Zn(t)
    ), this._toggleschema = L(
      (t) => Nn(t)
    ), this._popupschema = L(
      (t, e) => {
        const s = this.computeLabel({ name: "name" }), i = this.computeLabel({ name: "state" });
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
                  { value: "name", label: s },
                  { value: "state", label: i }
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
      (t, e, s) => this._classesForArea(t, "binary_sensor", void 0, e, s)
    ), this._coverClassesForArea = L(
      (t, e, s) => this._classesForArea(t, "cover", void 0, e, s)
    ), this._sensorClassesForArea = L(
      (t, e, s, i) => this._classesForArea(
        t,
        "sensor",
        e,
        s,
        i
      )
    ), this._toggleDomainsForArea = L(
      (t, e, s) => this._classesForArea(t, "toggle", void 0, e, s)
    ), this._allDomainsForArea = L(
      (t, e, s) => this._classesForArea(t, "all", void 0, e, s)
    ), this._cameraOptionsForArea = L(
      (t, e, s) => {
        const i = re(e, s), o = i ? gs : xe(t, s);
        return Ne(
          t,
          o,
          e,
          /* @__PURE__ */ new Set(),
          void 0,
          i
        ).filter((r) => P(r) === "camera").map((r) => ({
          value: r,
          label: Et(this.hass.states, r)
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
      var i;
      const e = new Set(((i = this._config) == null ? void 0 : i.hidden_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const s = Array.from(e);
      this._config = {
        ...this._config || {},
        hidden_entities: s
      }, Z(this, "config-changed", { config: this._config });
    }, this._toggleEntityExcluded = (t) => {
      var i;
      const e = new Set(((i = this._config) == null ? void 0 : i.excluded_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const s = Array.from(e);
      this._config = {
        ...this._config || {},
        excluded_entities: s
      }, Z(this, "config-changed", { config: this._config });
    };
  }
  _classesForArea(t, e, s, i, o) {
    var _;
    const n = re(i, o), r = n ? gs : xe(t, o), a = Ne(
      t,
      r,
      i,
      /* @__PURE__ */ new Set(),
      void 0,
      n
    ), c = ((_ = this._config) == null ? void 0 : _.extra_entities) || [], l = a.map((p) => this.hass.states[p]).filter((p) => p !== void 0);
    if (e === "toggle") {
      const p = l.filter(
        (m) => Ze.includes(P(m.entity_id)) || dt.includes(P(m.entity_id))
      );
      return [...new Set(p.map((m) => P(m.entity_id)))];
    }
    if (e === "all") {
      const p = c.map((f) => this.hass.states[f]).filter((f) => f !== void 0), m = [...l, ...p];
      return [...new Set(m.map((f) => P(f.entity_id)))];
    }
    const h = l.filter(
      (p) => {
        var m;
        return P(p.entity_id) === e && !((m = i[p.entity_id]) != null && m.entity_category);
      }
    ).map((p) => p.attributes.device_class || "").filter(
      (p) => p && (e !== "sensor" || !s || s.includes(p))
    );
    return [...new Set(h)];
  }
  _buildOptions(t, e, s) {
    const o = [.../* @__PURE__ */ new Set([...e, ...s])].map((r) => ({
      value: r,
      label: r === "scene" ? "Scene" : t === "toggle" || t === "all" ? this.hass.localize(
        `component.${r}.entity_component._.name`
      ) || r : this.hass.localize(
        `component.${t}.entity_component.${r}.name`
      ) || r
    })), n = ut(
      this.hass.states,
      this.hass.locale.language
    );
    return o.sort((r, a) => n(r.value, a.value)), o;
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
        const s = t.get("_config"), i = s == null ? void 0 : s.area, o = this._config.area, n = (s == null ? void 0 : s.extra_entities) || [], r = this._config.extra_entities || [], a = (s == null ? void 0 : s.popup_domains) || [], c = ((e = this._config) == null ? void 0 : e.popup_domains) || [], l = n.length !== r.length || !n.every(
          (h) => r.includes(h)
        ), d = a.length !== c.length || !a.every(
          (h) => c.includes(h)
        );
        if (i !== void 0 && i !== o) {
          const h = this._toggleDomainsForArea(
            o,
            this.hass.entities,
            this.hass.devices
          ), _ = this._binaryClassesForArea(
            o,
            this.hass.entities,
            this.hass.devices
          ), p = this._coverClassesForArea(
            o,
            this.hass.entities,
            this.hass.devices
          ), m = this._allDomainsForArea(
            o,
            this.hass.entities,
            this.hass.devices
          ), f = h.sort(
            (H, v) => Ze.indexOf(H) - Ze.indexOf(v)
          ), u = Object.keys(Ke || {}), C = new Map(
            u.map((H, v) => [H, v])
          ), $ = m.sort((H, v) => {
            const y = C.has(H) ? C.get(H) : Number.MAX_SAFE_INTEGER, w = C.has(v) ? C.get(v) : Number.MAX_SAFE_INTEGER;
            return y === w ? H.localeCompare(v) : y - w;
          });
          if (this._config.toggle_domains = [
            ...f.filter((H) => H !== "scene" && H !== "script")
          ], this._config.alert_classes = [..._], this._config.cover_classes = [...p], this._config.popup_domains = [...$], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
            const H = this._config.hidden_entities, v = Object.values(this._hiddenEntitiesByDomain()).flat(), y = H.filter((w) => v.includes(w));
            y.length !== H.length && (this._config = {
              ...this._config || {},
              hidden_entities: y
            }, Z(this, "config-changed", {
              config: { ...this._config }
            }));
          }
          this.requestUpdate();
        }
        if (l) {
          for (const h of r) {
            const _ = P(h);
            this._config.popup_domains.includes(_) || this._config.popup_domains.push(_);
          }
          this.requestUpdate();
        }
        d && this._updateEntityOptions();
      }
      if (!this._numericDeviceClasses) {
        const { numeric_device_classes: s } = await An(this.hass);
        this._numericDeviceClasses = s;
      }
    }
  }
  _updateEntityOptions() {
    if (!this._config || !this.hass) return;
    const t = this._config.area, e = this._config.popup_domains || [], s = xe(t, this.hass.devices), i = Ne(
      t,
      s,
      this.hass.entities,
      /* @__PURE__ */ new Set(),
      void 0,
      re(this.hass.entities, this.hass.devices)
    );
    this._entityOptions = i.filter((n) => {
      var a;
      return this.hass.states[n] ? !((a = this.hass.entities[n]) != null && a.hidden) && e.includes(P(n)) : !1;
    }).map((n) => ({
      value: n,
      label: n
    }));
    const o = ut(
      this.hass.states,
      this.hass.locale.language
    );
    this._entityOptions.sort((n, r) => o(n.value, r.value)), this._valueChanged({ detail: { value: this._config } });
  }
  _valueChanged(t) {
    this._config = t.detail.value, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config }
      })
    );
  }
  _isHiddenEntity(t) {
    var s;
    const e = ((s = this._config) == null ? void 0 : s.hidden_entities) ?? [];
    return Array.isArray(e) && e.includes(t);
  }
  _isExcludedEntity(t) {
    var s;
    const e = ((s = this._config) == null ? void 0 : s.excluded_entities) ?? [];
    return Array.isArray(e) && e.includes(t);
  }
  _hiddenCategoryChanged(t) {
    var s, i;
    const e = (i = (s = t.detail) == null ? void 0 : s.value) == null ? void 0 : i.category_filter;
    this._config = {
      ...this._config || {},
      category_filter: e
    }, Z(this, "config-changed", { config: { ...this._config } });
  }
  _editItem(t, e) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const s = t.detail;
    this[`_subElementEditor${e}`] = { index: s, type: "element" };
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
    t.stopPropagation(), !(!this._config || !this.hass) && Z(this, "config-changed", {
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
    var s, i, o;
    const t = ((s = this._subElementEditorCustomButton) == null ? void 0 : s.index) ?? 0, e = ((o = (i = this._config) == null ? void 0 : i.custom_buttons) == null ? void 0 : o[t]) || {};
    return g`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${this._goBackCustomButton}>
            <ha-svg-icon .path=${M1}></ha-svg-icon>
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
    var s;
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = (s = this._subElementEditorCustomButton) == null ? void 0 : s.index;
    if (e !== void 0) {
      const i = [...this._config.custom_buttons || []];
      i[e] = t.detail, Z(this, "config-changed", {
        config: { ...this._config, custom_buttons: i }
      });
    }
  }
  _customizationChangedCustomButtons(t) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = t.detail;
    Z(this, "config-changed", {
      config: { ...this._config, custom_buttons: e }
    });
  }
  _renderSubElementEditor(t, e, s) {
    var d, h, _;
    const i = `customization_${t}`, o = (d = this._config) == null ? void 0 : d[i], n = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, r = ((h = this[n]) == null ? void 0 : h.index) ?? 0, a = ((_ = o == null ? void 0 : o[r]) == null ? void 0 : _.type) ?? "unknown", c = a.match(/^(.+?)\s*-\s*(.+)$/);
    let l;
    if (c) {
      const p = c[1].toLowerCase().replace(" ", "_"), m = c[2].toLowerCase(), f = this.hass.localize(`component.${p}.entity_component._.name`) || c[1];
      let u = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${p}.${m}`
      ) || c[2];
      u = u.charAt(0).toUpperCase() + u.slice(1), l = `${f} – ${u}`;
    } else {
      let p = this.hass.localize(`component.${a}.entity_component._.name`) || a;
      p = p.charAt(0).toUpperCase() + p.slice(1), l = p;
    }
    return g`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${e}>
            <ha-svg-icon .path=${M1}></ha-svg-icon>
          </mwc-icon-button>
          <span slot="title">${l}</span>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${(o == null ? void 0 : o[r]) || {}}
        .getSchema=${t}
        @config-changed=${s}
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
    let s;
    switch (e) {
      case "domain":
        s = this._subElementEditorDomain;
        break;
      case "alert":
        s = this._subElementEditorAlert;
        break;
      case "cover":
        s = this._subElementEditorCover;
        break;
      case "sensor":
        s = this._subElementEditorSensor;
        break;
    }
    const i = `customization_${e}`;
    this._itemChanged(t, s, i);
  }
  _itemChanged(t, e, s) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const i = e == null ? void 0 : e.index;
    if (i != null) {
      const o = [...this._config[s]];
      o[i] = t.detail, Z(this, "config-changed", {
        config: { ...this._config, [s]: o }
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
    var s, i, o, n, r, a;
    const e = ((s = this._config) == null ? void 0 : s.area) || "";
    switch (t) {
      case "toggle":
        return this._buildToggleOptions(
          this._toggleDomainsForArea(
            e,
            this.hass.entities,
            this.hass.devices
          ),
          ((i = this._config) == null ? void 0 : i.toggle_domains) || this._toggleDomainsForArea(
            e,
            this.hass.entities,
            this.hass.devices
          )
        );
      case "all":
        return this._buildAllOptions(
          this._allDomainsForArea(e, this.hass.entities, this.hass.devices),
          ((o = this._config) == null ? void 0 : o.popup_domains) || this._allDomainsForArea(e, this.hass.entities, this.hass.devices)
        );
      case "binary":
        return this._buildBinaryOptions(
          this._binaryClassesForArea(
            e,
            this.hass.entities,
            this.hass.devices
          ),
          ((n = this._config) == null ? void 0 : n.alert_classes) || this._binaryClassesForArea(
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
          ((r = this._config) == null ? void 0 : r.cover_classes) || this._coverClassesForArea(
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
          ((a = this._config) == null ? void 0 : a.sensor_classes) || this._sensorClassesForArea(
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
  _domainIcon(t, e = "on", s) {
    const i = Ke;
    if (t in i) {
      const o = i[t];
      return typeof o == "string" ? o : s && o[s] ? o[s][e === "off" ? "off" : "on"] || o[s] : o[e === "off" ? "off" : "on"] || Object.values(o)[0];
    }
    return Ri;
  }
  _groupAllEntitiesByDomain() {
    var r;
    const t = {}, e = (this.entityOptions || []).map((a) => a.value);
    for (const a of e) {
      const c = P(a);
      t[c] || (t[c] = []), t[c].push(a);
    }
    const s = this._hiddenEntitiesByDomain(), i = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(s)])
    ), o = ((r = this.hass) == null ? void 0 : r.states) || {}, n = this.compareByFriendlyName ? this.compareByFriendlyName(o, this.hass.locale.language) : (a, c) => a.localeCompare(c);
    return i.sort((a, c) => a.localeCompare(c)).map((a) => {
      const c = /* @__PURE__ */ new Set([
        ...t[a] || [],
        ...s[a] || []
      ]);
      return { domain: a, entities: Array.from(c).sort(n) };
    });
  }
  _domainLabel(t) {
    var e, s;
    return ((s = (e = this.hass) == null ? void 0 : e.localize) == null ? void 0 : s.call(e, `component.${t}.entity_component._.name`)) || t;
  }
  _getDeviceClassLabel(t, e) {
    if (!e || e === "other")
      return this.hass.localize("ui.dialogs.helper_settings.generic.other") ?? "Other";
    const s = `ui.dialogs.entity_registry.editor.device_classes.${t}.${e}`;
    return this.hass.localize(s) || e;
  }
  _groupByDeviceClass(t, e) {
    var r, a, c;
    const s = ((r = this.hass) == null ? void 0 : r.states) || {}, i = {};
    for (const l of e) {
      const d = ((c = (a = s[l]) == null ? void 0 : a.attributes) == null ? void 0 : c.device_class) || "";
      d && (i[d] || (i[d] = []), i[d].push(l));
    }
    const o = this.compareByFriendlyName ? this.compareByFriendlyName(s, this.hass.locale.language) : (l, d) => l.localeCompare(d);
    return Object.keys(i).sort((l, d) => l.localeCompare(d)).map((l) => ({
      deviceClass: l,
      label: this._getDeviceClassLabel(t, l),
      entities: i[l].slice().sort(o)
    }));
  }
  _hiddenEntitiesByDomain() {
    var h, _, p, m, f, u, C;
    const t = {}, e = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const s = ((_ = this.hass) == null ? void 0 : _.entities) || {}, i = ((p = this.hass) == null ? void 0 : p.devices) || {}, o = (m = this.hass) != null && m.areas ? Object.values(this.hass.areas) : [], n = (f = this._config) == null ? void 0 : f.area, r = (u = this._config) == null ? void 0 : u.floor, a = (C = this._config) == null ? void 0 : C.label, c = n ? Array.isArray(n) ? n : [n] : [], l = r ? Array.isArray(r) ? r : [r] : [], d = a ? Array.isArray(a) ? a : [a] : [];
    for (const $ of e) {
      const H = P($), v = s[$], y = v != null && v.device_id ? i[v.device_id] : void 0;
      if (((v == null ? void 0 : v.area_id) != null || (y == null ? void 0 : y.area_id) != null) && !(d.length && !(Array.isArray(v == null ? void 0 : v.labels) && v.labels.some((b) => d.includes(b)) || Array.isArray(y == null ? void 0 : y.labels) && y.labels.some((b) => d.includes(b)))) && !(c.length && !(v != null && v.area_id && c.includes(v.area_id) || y != null && y.area_id && c.includes(y.area_id)))) {
        if (l.length) {
          const A = (v == null ? void 0 : v.area_id) && o.some(
            (x) => x.area_id === v.area_id && x.floor_id && l.includes(x.floor_id)
          ), b = (y == null ? void 0 : y.area_id) && o.some(
            (x) => x.area_id === y.area_id && x.floor_id && l.includes(x.floor_id)
          );
          if (!A && !b) continue;
        }
        t[H] || (t[H] = []), t[H].push($);
      }
    }
    return t;
  }
  render() {
    var _;
    if (!this.hass || !this._config)
      return V;
    const t = this._toggleDomainsForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), e = this._binaryClassesForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), s = this._coverClassesForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), i = this._allDomainsForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), o = this._cameraOptionsForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    ), n = this._schema(
      this._activeTab,
      this._config.design || "V1",
      this._config.display_type,
      this._config.camera_mode,
      o,
      this.hass.locale.language
    ), r = this._binaryschema(this.binarySelectOptions), a = this._coverschema(this.coverSelectOptions), c = this._sensorschema(this.sensorSelectOptions), l = this._toggleschema(this.toggleSelectOptions), d = this._popupschema(
      this.AllSelectOptions,
      this.entityOptions
    ), h = {
      alert_classes: e,
      cover_classes: s,
      sensor_classes: xt.sensor,
      toggle_domains: t,
      popup_domains: i,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorByKey("domain") : this._subElementEditorAlert ? this._renderSubElementEditorByKey("alert") : this._subElementEditorCover ? this._renderSubElementEditorByKey("cover") : this._subElementEditorSensor ? this._renderSubElementEditorByKey("sensor") : this._subElementEditorCustomButton ? this._renderSubElementEditorCustomButton() : g`
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

      ${this._activeTab === "style" ? g`
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
          ` : V}

      <ha-form
        .hass=${this.hass}
        .data=${h}
        .schema=${n}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      ${this._activeTab === "config" ? g`
            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon .path=${di}></ha-svg-icon>
                ${this.computeLabel({ name: "alert_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${h}
                  .schema=${r}
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
                <ha-svg-icon .path=${nt}></ha-svg-icon>
                ${this.computeLabel({ name: "cover_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${h}
                  .schema=${a}
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
                <ha-svg-icon .path=${wi}></ha-svg-icon>
                ${this.computeLabel({ name: "sensor_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${h}
                  .schema=${c}
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
                <ha-svg-icon .path=${ki}></ha-svg-icon>
                ${this.computeLabel({ name: "toggle_domains" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${h}
                  .schema=${l}
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
                <ha-svg-icon .path=${ht}></ha-svg-icon>
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
                <ha-svg-icon .path=${Po}></ha-svg-icon>
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
                    <ha-svg-icon .path=${Lt}></ha-svg-icon>
                    ${this.computeLabel({ name: "hidden_entities" })}
                  </div>
                  <div class="content">
                    <ha-form
                      .hass=${this.hass}
                      .data=${{
      category_filter: (_ = this._config) == null ? void 0 : _.category_filter
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
                      @value-changed=${(p) => this._hiddenCategoryChanged(p)}
                    ></ha-form>
                    ${this._groupAllEntitiesByDomain().map(
      (p) => g`
                        <ha-expansion-panel outlined class="domain-panel">
                          <div slot="header" class="domain-header">
                            <ha-svg-icon
                              .path=${this._domainIcon(p.domain, "on")}
                            ></ha-svg-icon>
                            <span class="domain-title"
                              >${this._domainLabel(p.domain)}</span
                            >
                          </div>
                          <div class="content">
                            ${["binary_sensor", "cover"].includes(p.domain) ? this._groupByDeviceClass(
        p.domain,
        p.entities
      ).map(
        (m) => g`
                                    <ha-expansion-panel
                                      outlined
                                      class="domain-panel"
                                    >
                                      <div slot="header" class="dc-header">
                                        <ha-svg-icon
                                          .path=${this._domainIcon(
          p.domain,
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
          (f) => {
            var u, C;
            return g`
                                            <div class="entity-row">
                                              <span class="entity-name">
                                                ${((C = (u = this.hass.states[f]) == null ? void 0 : u.attributes) == null ? void 0 : C.friendly_name) || f}
                                              </span>
                                              <ha-icon-button
                                                .path=${this._isHiddenEntity(f) ? Lt : k1}
                                                .label=${this._isHiddenEntity(
              f
            ) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                                @click=${() => this._toggleEntityHidden(f)}
                                              ></ha-icon-button>
                                              <ha-icon-button
                                                .path=${this._isExcludedEntity(
              f
            ) ? D1 : P1}
                                                .label=${this._isExcludedEntity(
              f
            ) ? "Include" : "Exclude"}
                                                @click=${() => this._toggleEntityExcluded(
              f
            )}
                                              ></ha-icon-button>
                                            </div>
                                          `;
          }
        )}
                                      </div>
                                    </ha-expansion-panel>
                                  `
      ) : p.entities.map(
        (m) => {
          var f, u;
          return g`
                                    <div class="entity-row">
                                      <span class="entity-name">
                                        ${((u = (f = this.hass.states[m]) == null ? void 0 : f.attributes) == null ? void 0 : u.friendly_name) || m}
                                      </span>
                                      <ha-icon-button
                                        .path=${this._isHiddenEntity(m) ? Lt : k1}
                                        .label=${this._isHiddenEntity(m) ? this.hass.localize(
            "ui.common.show"
          ) ?? "Show" : this.hass.localize(
            "ui.common.hide"
          ) ?? "Hide"}
                                        @click=${() => this._toggleEntityHidden(m)}
                                      ></ha-icon-button>
                                      <ha-icon-button
                                        .path=${this._isExcludedEntity(m) ? D1 : P1}
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
          ` : V}
    `;
  }
};
G.styles = Ee`
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
J([
  z({ attribute: !1 })
], G.prototype, "hass", 2);
J([
  z({ attribute: !1 })
], G.prototype, "lovelace", 2);
J([
  U()
], G.prototype, "_config", 2);
J([
  U()
], G.prototype, "_activeTab", 2);
J([
  U()
], G.prototype, "_numericDeviceClasses", 2);
J([
  U()
], G.prototype, "_subElementEditorDomain", 2);
J([
  U()
], G.prototype, "_subElementEditorAlert", 2);
J([
  U()
], G.prototype, "_subElementEditorCover", 2);
J([
  U()
], G.prototype, "_subElementEditorSensor", 2);
J([
  U()
], G.prototype, "_subElementEditorCustomButton", 2);
G = J([
  he("area-card-plus-editor")
], G);
console.info(
  `%c AREA-CARD %c ${Os.version} `,
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
