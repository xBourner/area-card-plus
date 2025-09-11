const fi = "b1.0", gi = {
  version: fi
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = globalThis, gt = qe.ShadowRoot && (qe.ShadyCSS === void 0 || qe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vt = Symbol(), Ht = /* @__PURE__ */ new WeakMap();
let ti = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (gt && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Ht.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ht.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const vi = (t) => new ti(typeof t == "string" ? t : t + "", void 0, vt), xe = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, o, a) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[a + 1]), t[0]);
  return new ti(i, t, vt);
}, yi = (t, e) => {
  if (gt) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), o = qe.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, zt = gt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return vi(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bi, defineProperty: $i, getOwnPropertyDescriptor: wi, getOwnPropertyNames: Ai, getOwnPropertySymbols: Ci, getPrototypeOf: Ei } = Object, de = globalThis, Mt = de.trustedTypes, xi = Mt ? Mt.emptyScript : "", it = de.reactiveElementPolyfillSupport, Pe = (t, e) => t, Je = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? xi : null;
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
} }, yt = (t, e) => !bi(t, e), Lt = { attribute: !0, type: String, converter: Je, reflect: !1, useDefault: !1, hasChanged: yt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), de.litPropertyMetadata ?? (de.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ce = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Lt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && $i(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: a } = wi(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: o, set(n) {
      const r = o == null ? void 0 : o.call(this);
      a == null || a.call(this, n), this.requestUpdate(e, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Pe("elementProperties"))) return;
    const e = Ei(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Pe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Pe("properties"))) {
      const i = this.properties, s = [...Ai(i), ...Ci(i)];
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
      for (const o of s) i.unshift(zt(o));
    } else e !== void 0 && i.push(zt(e));
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
    return yi(e, this.constructor.elementStyles), e;
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
    var a;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : Je).toAttribute(i, s.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var a, n;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((a = r.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? r.converter : Je;
      this._$Em = o;
      const l = c.fromAttribute(i, r.type);
      this[o] = l ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    var o;
    if (e !== void 0) {
      const a = this.constructor, n = this[e];
      if (s ?? (s = a.getPropertyOptions(e)), !((s.hasChanged ?? yt)(n, i) || s.useDefault && s.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: a }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [a, n] of this._$Ep) this[a] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [a, n] of o) {
        const { wrapped: r } = n, c = this[a];
        r !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, n, c);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach(((o) => {
        var a;
        return (a = o.hostUpdate) == null ? void 0 : a.call(o);
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
Ce.elementStyles = [], Ce.shadowRootOptions = { mode: "open" }, Ce[Pe("elementProperties")] = /* @__PURE__ */ new Map(), Ce[Pe("finalized")] = /* @__PURE__ */ new Map(), it == null || it({ ReactiveElement: Ce }), (de.reactiveElementVersions ?? (de.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis, Xe = Ie.trustedTypes, Pt = Xe ? Xe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ii = "$lit$", le = `lit$${Math.random().toFixed(9).slice(2)}$`, si = "?" + le, Si = `<${si}>`, $e = document, Ne = () => $e.createComment(""), je = (t) => t === null || typeof t != "object" && typeof t != "function", bt = Array.isArray, Di = (t) => bt(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", st = `[ 	
\f\r]`, ze = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, It = /-->/g, Tt = />/g, pe = RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Nt = /'/g, jt = /"/g, oi = /^(?:script|style|textarea|title)$/i, Oi = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), D = Oi(1), ie = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), Rt = /* @__PURE__ */ new WeakMap(), ge = $e.createTreeWalker($e, 129);
function ni(t, e) {
  if (!bt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(e) : e;
}
const ki = (t, e) => {
  const i = t.length - 1, s = [];
  let o, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = ze;
  for (let r = 0; r < i; r++) {
    const c = t[r];
    let l, d, h = -1, p = 0;
    for (; p < c.length && (n.lastIndex = p, d = n.exec(c), d !== null); ) p = n.lastIndex, n === ze ? d[1] === "!--" ? n = It : d[1] !== void 0 ? n = Tt : d[2] !== void 0 ? (oi.test(d[2]) && (o = RegExp("</" + d[2], "g")), n = pe) : d[3] !== void 0 && (n = pe) : n === pe ? d[0] === ">" ? (n = o ?? ze, h = -1) : d[1] === void 0 ? h = -2 : (h = n.lastIndex - d[2].length, l = d[1], n = d[3] === void 0 ? pe : d[3] === '"' ? jt : Nt) : n === jt || n === Nt ? n = pe : n === It || n === Tt ? n = ze : (n = pe, o = void 0);
    const m = n === pe && t[r + 1].startsWith("/>") ? " " : "";
    a += n === ze ? c + Si : h >= 0 ? (s.push(l), c.slice(0, h) + ii + c.slice(h) + le + m) : c + le + (h === -2 ? r : m);
  }
  return [ni(t, a + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Re {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let a = 0, n = 0;
    const r = e.length - 1, c = this.parts, [l, d] = ki(e, i);
    if (this.el = Re.createElement(l, s), ge.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = ge.nextNode()) !== null && c.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(ii)) {
          const p = d[n++], m = o.getAttribute(h).split(le), y = /([.?@])?(.*)/.exec(p);
          c.push({ type: 1, index: a, name: y[2], strings: m, ctor: y[1] === "." ? zi : y[1] === "?" ? Mi : y[1] === "@" ? Li : Qe }), o.removeAttribute(h);
        } else h.startsWith(le) && (c.push({ type: 6, index: a }), o.removeAttribute(h));
        if (oi.test(o.tagName)) {
          const h = o.textContent.split(le), p = h.length - 1;
          if (p > 0) {
            o.textContent = Xe ? Xe.emptyScript : "";
            for (let m = 0; m < p; m++) o.append(h[m], Ne()), ge.nextNode(), c.push({ type: 2, index: ++a });
            o.append(h[p], Ne());
          }
        }
      } else if (o.nodeType === 8) if (o.data === si) c.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(le, h + 1)) !== -1; ) c.push({ type: 7, index: a }), h += le.length - 1;
      }
      a++;
    }
  }
  static createElement(e, i) {
    const s = $e.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Ee(t, e, i = t, s) {
  var n, r;
  if (e === ie) return e;
  let o = s !== void 0 ? (n = i._$Co) == null ? void 0 : n[s] : i._$Cl;
  const a = je(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), a === void 0 ? o = void 0 : (o = new a(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = Ee(t, o._$AS(t, e.values), o, s)), e;
}
let Hi = class {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? $e).importNode(i, !0);
    ge.currentNode = o;
    let a = ge.nextNode(), n = 0, r = 0, c = s[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let l;
        c.type === 2 ? l = new Se(a, a.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (l = new Pi(a, this, e)), this._$AV.push(l), c = s[++r];
      }
      n !== (c == null ? void 0 : c.index) && (a = ge.nextNode(), n++);
    }
    return ge.currentNode = $e, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
};
class Se {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = Ee(this, e, i), je(e) ? e === S || e == null || e === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : e !== this._$AH && e !== ie && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Di(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== S && je(this._$AH) ? this._$AA.nextSibling.data = e : this.T($e.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Re.createElement(ni(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(i);
    else {
      const n = new Hi(o, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = Rt.get(e.strings);
    return i === void 0 && Rt.set(e.strings, i = new Re(e)), i;
  }
  k(e) {
    bt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const a of e) o === i.length ? i.push(s = new Se(this.O(Ne()), this.O(Ne()), this, this.options)) : s = i[o], s._$AI(a), o++;
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
class Qe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, a) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = S;
  }
  _$AI(e, i = this, s, o) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = Ee(this, e, i, 0), n = !je(e) || e !== this._$AH && e !== ie, n && (this._$AH = e);
    else {
      const r = e;
      let c, l;
      for (e = a[0], c = 0; c < a.length - 1; c++) l = Ee(this, r[s + c], i, c), l === ie && (l = this._$AH[c]), n || (n = !je(l) || l !== this._$AH[c]), l === S ? e = S : e !== S && (e += (l ?? "") + a[c + 1]), this._$AH[c] = l;
    }
    n && !o && this.j(e);
  }
  j(e) {
    e === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
let zi = class extends Qe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === S ? void 0 : e;
  }
};
class Mi extends Qe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== S);
  }
}
class Li extends Qe {
  constructor(e, i, s, o, a) {
    super(e, i, s, o, a), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Ee(this, e, i, 0) ?? S) === ie) return;
    const s = this._$AH, o = e === S && s !== S || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== S && (s === S || o);
    o && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Pi {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ee(this, e);
  }
}
const Ii = { I: Se }, ot = Ie.litHtmlPolyfillSupport;
ot == null || ot(Re, Se), (Ie.litHtmlVersions ?? (Ie.litHtmlVersions = [])).push("3.3.1");
const Ti = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new Se(e.insertBefore(Ne(), a), a, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = globalThis;
let te = class extends Ce {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ti(i, this.renderRoot, this.renderOptions);
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
    return ie;
  }
};
var ei;
te._$litElement$ = !0, te.finalized = !0, (ei = ye.litElementHydrateSupport) == null || ei.call(ye, { LitElement: te });
const nt = ye.litElementPolyfillSupport;
nt == null || nt({ LitElement: te });
(ye.litElementVersions ?? (ye.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ni = { attribute: !0, type: String, converter: Je, reflect: !1, hasChanged: yt }, ji = (t = Ni, e, i) => {
  const { kind: s, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(i.name, t), s === "accessor") {
    const { name: n } = i;
    return { set(r) {
      const c = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(n, c, t);
    }, init(r) {
      return r !== void 0 && this.C(n, void 0, t, r), r;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(r) {
      const c = this[n];
      e.call(this, r), this.requestUpdate(n, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function L(t) {
  return (e, i) => typeof i == "object" ? ji(t, e, i) : ((s, o, a) => {
    const n = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, s), n ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(t) {
  return L({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = { ATTRIBUTE: 1, CHILD: 2 }, et = (t) => (...e) => ({ _$litDirective$: t, values: e });
let tt = class {
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
const ne = et(class extends tt {
  constructor(t) {
    var e;
    if (super(t), t.type !== $t.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(((e) => t[e])).join(" ") + " ";
  }
  update(t, [e]) {
    var s, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(((a) => a !== ""))));
      for (const a in e) e[a] && !((s = this.nt) != null && s.has(a)) && this.st.add(a);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const a of this.st) a in e || (i.remove(a), this.st.delete(a));
    for (const a in e) {
      const n = !!e[a];
      n === this.st.has(a) || (o = this.nt) != null && o.has(a) || (n ? (i.add(a), this.st.add(a)) : (i.remove(a), this.st.delete(a)));
    }
    return ie;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ai = "important", Ri = " !" + ai, Ue = et(class extends tt {
  constructor(t) {
    var e;
    if (super(t), t.type !== $t.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const a = typeof o == "string" && o.endsWith(Ri);
        s.includes("-") || a ? i.setProperty(s, a ? o.slice(0, -11) : o, a ? ai : "") : i[s] = o;
      }
    }
    return ie;
  }
});
var Ut = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function Ui(t, e) {
  return !!(t === e || Ut(t) && Ut(e));
}
function Fi(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!Ui(t[i], e[i]))
      return !1;
  return !0;
}
function P(t, e) {
  e === void 0 && (e = Fi);
  var i = null;
  function s() {
    for (var o = [], a = 0; a < arguments.length; a++)
      o[a] = arguments[a];
    if (i && i.lastThis === this && e(o, i.lastArgs))
      return i.lastResult;
    var n = t.apply(this, o);
    return i = {
      lastResult: n,
      lastArgs: o,
      lastThis: this
    }, n;
  }
  return s.clear = function() {
    i = null;
  }, s;
}
var ve, Ft;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})(ve || (ve = {})), (function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
})(Ft || (Ft = {}));
function ri() {
  return (ri = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
    }
    return t;
  }).apply(this, arguments);
}
function B(t) {
  return t.substr(0, t.indexOf("."));
}
var Bi = function(t) {
  switch (t.number_format) {
    case ve.comma_decimal:
      return ["en-US", "en"];
    case ve.decimal_comma:
      return ["de", "es", "it"];
    case ve.space_comma:
      return ["fr", "sv", "cs"];
    case ve.system:
      return;
    default:
      return t.language;
  }
}, Vi = function(t, e) {
  return e === void 0 && (e = 2), Math.round(t * Math.pow(10, e)) / Math.pow(10, e);
}, Bt = function(t, e, i) {
  var s = e ? Bi(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(a) {
    return typeof a == "number" && o(a);
  }, (e == null ? void 0 : e.number_format) !== ve.none && !Number.isNaN(Number(t)) && Intl) try {
    return new Intl.NumberFormat(s, Vt(t, i)).format(Number(t));
  } catch (o) {
    return console.error(o), new Intl.NumberFormat(void 0, Vt(t, i)).format(Number(t));
  }
  return typeof t == "string" ? t : Vi(t, i == null ? void 0 : i.maximumFractionDigits).toString() + ((i == null ? void 0 : i.style) === "currency" ? " " + i.currency : "");
}, Vt = function(t, e) {
  var i = ri({ maximumFractionDigits: 2 }, e);
  if (typeof t != "string") return i;
  if (!e || !e.minimumFractionDigits && !e.maximumFractionDigits) {
    var s = t.indexOf(".") > -1 ? t.split(".")[1].length : 0;
    i.minimumFractionDigits = s, i.maximumFractionDigits = s;
  }
  return i;
}, qi = ["closed", "locked", "off"], Ye = function(t, e, i, s) {
  s = s || {}, i = i ?? {};
  var o = new Event(e, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return o.detail = i, t.dispatchEvent(o), o;
}, wt = function(t, e, i) {
  var s;
  return function() {
    var o = [].slice.call(arguments), a = this, n = function() {
      s = null;
    }, r = !s;
    clearTimeout(s), s = setTimeout(n, e), r && t.apply(a, o);
  };
}, Fe = function(t) {
  Ye(window, "haptic", t);
}, Wi = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), Ye(window, "location-changed", { replace: i });
}, Ki = function(t, e, i) {
  i === void 0 && (i = !0);
  var s, o = B(e), a = o === "group" ? "homeassistant" : o;
  switch (o) {
    case "lock":
      s = i ? "unlock" : "lock";
      break;
    case "cover":
      s = i ? "open_cover" : "close_cover";
      break;
    default:
      s = i ? "turn_on" : "turn_off";
  }
  return t.callService(a, s, { entity_id: e });
}, Gi = function(t, e) {
  var i = qi.includes(t.states[e].state);
  return Ki(t, e, i);
}, Zi = function(t, e, i, s) {
  if (s || (s = { action: "more-info" }), !s.confirmation || s.confirmation.exemptions && s.confirmation.exemptions.some(function(a) {
    return a.user === e.user.id;
  }) || (Fe("warning"), confirm(s.confirmation.text || "Are you sure you want to " + s.action + "?"))) switch (s.action) {
    case "more-info":
      (i.entity || i.camera_image) && Ye(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      s.navigation_path && Wi(0, s.navigation_path);
      break;
    case "url":
      s.url_path && window.open(s.url_path);
      break;
    case "toggle":
      i.entity && (Gi(e, i.entity), Fe("success"));
      break;
    case "call-service":
      if (!s.service) return void Fe("failure");
      var o = s.service.split(".", 2);
      e.callService(o[0], o[1], s.service_data, s.target), Fe("success");
      break;
    case "fire-dom-event":
      Ye(t, "ll-custom", s);
  }
}, Me = function(t, e, i, s) {
  var o;
  s === "double_tap" && i.double_tap_action ? o = i.double_tap_action : s === "hold" && i.hold_action ? o = i.hold_action : s === "tap" && i.tap_action && (o = i.tap_action), Zi(t, e, i, o);
};
function V(t) {
  return t !== void 0 && t.action !== "none";
}
const Ji = (t) => {
  let e = [];
  function i(o) {
    let a = [];
    for (let n = 0; n < e.length; n++)
      e[n] === o ? o = null : a.push(e[n]);
    e = a;
  }
  function s(o, a) {
    t = a ? o : Object.assign(Object.assign({}, t), o);
    let n = e;
    for (let r = 0; r < n.length; r++)
      n[r](t);
  }
  return {
    get state() {
      return t;
    },
    /**
     * Create a bound copy of the given action function.
     * The bound returned function invokes action() and persists the result back to the store.
     * If the return value of `action` is a Promise, the resolved value will be used as state.
     * @param {Function} action	An action of the form `action(state, ...args) -> stateUpdate`
     * @returns {Function} boundAction()
     */
    action(o) {
      function a(n) {
        s(n, !1);
      }
      return function() {
        let n = [t];
        for (let c = 0; c < arguments.length; c++)
          n.push(arguments[c]);
        let r = o.apply(this, n);
        if (r != null)
          return r instanceof Promise ? r.then(a) : a(r);
      };
    },
    /**
     * Apply a partial state object to the current state, invoking registered listeners.
     * @param {Object} update				An object with properties to be merged into state
     * @param {Boolean} [overwrite=false]	If `true`, update will replace state instead of being merged into it
     */
    setState: s,
    clearState() {
      t = void 0;
    },
    /**
     * Register a listener function to be called whenever state is changed. Returns an `unsubscribe()` function.
     * @param {Function} listener	A function to call when state changes. Gets passed the new state.
     * @returns {Function} unsubscribe()
     */
    subscribe(o) {
      return e.push(o), () => {
        i(o);
      };
    }
    // /**
    //  * Remove a previously-registered listener function.
    //  * @param {Function} listener	The callback previously passed to `subscribe()` that should be removed.
    //  * @function
    //  */
    // unsubscribe,
  };
}, Xi = 5e3, Yi = (t, e, i, s, o = { unsubGrace: !0 }) => {
  if (t[e])
    return t[e];
  let a = 0, n, r, c = Ji();
  const l = () => {
    if (!i)
      throw new Error("Collection does not support refresh");
    return i(t).then((A) => c.setState(A, !0));
  }, d = () => l().catch((A) => {
    if (t.connected)
      throw A;
  }), h = () => {
    if (r !== void 0) {
      clearTimeout(r), r = void 0;
      return;
    }
    s && (n = s(t, c)), i && (t.addEventListener("ready", d), d()), t.addEventListener("disconnected", y);
  }, p = () => {
    r = void 0, n && n.then((A) => {
      A();
    }), c.clearState(), t.removeEventListener("ready", l), t.removeEventListener("disconnected", y);
  }, m = () => {
    r = setTimeout(p, Xi);
  }, y = () => {
    r && (clearTimeout(r), p());
  };
  return t[e] = {
    get state() {
      return c.state;
    },
    refresh: l,
    subscribe(A) {
      a++, a === 1 && h();
      const b = c.subscribe(A);
      return c.state !== void 0 && setTimeout(() => A(c.state), 0), () => {
        b(), a--, a || (o.unsubGrace ? m() : p());
      };
    }
  }, t[e];
}, At = (t, e, i, s, o) => Yi(s, t, e, i).subscribe(o);
var Qi = Object.defineProperty, es = (t, e, i, s) => {
  for (var o = void 0, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = n(e, i, o) || o);
  return o && Qi(e, i, o), o;
};
const ts = (t) => is(t.attributes), is = (t, e) => !!t.unit_of_measurement || !!t.state_class || [].includes(t.device_class || ""), qt = (t, e) => t === "°" ? "" : e && t === "%" ? ss(e) : " ", ss = (t) => {
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
}, os = P(
  (t) => new Intl.Collator(t)
), ns = P(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), ci = (t, e) => t < e ? -1 : t > e ? 1 : 0, as = (t, e, i = void 0) => Intl != null && Intl.Collator ? os(i).compare(t, e) : ci(t, e), li = (t, e, i = void 0) => Intl != null && Intl.Collator ? ns(i).compare(t, e) : ci(t.toLowerCase(), e.toLowerCase());
let Be;
const rs = async (t) => Be || (Be = t.callWS({
  type: "sensor/numeric_device_classes"
}), Be), di = (t) => t.sendMessagePromise({
  type: "config/area_registry/list"
}).then(
  (e) => e.sort((i, s) => as(i.name, s.name))
), cs = (t, e) => t.subscribeEvents(
  wt(
    () => di(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "area_registry_updated"
), Wt = (t, e) => At(
  "_areaRegistry",
  di,
  cs,
  t,
  e
), hi = (t) => t.sendMessagePromise({
  type: "config/device_registry/list"
}), ls = (t, e) => t.subscribeEvents(
  wt(
    () => hi(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "device_registry_updated"
), ds = (t, e) => At(
  "_dr",
  hi,
  ls,
  t,
  e
), ui = (t) => t.sendMessagePromise({
  type: "config/entity_registry/list"
}), hs = (t, e) => t.subscribeEvents(
  wt(
    () => ui(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "entity_registry_updated"
), us = (t, e) => At(
  "_entityRegistry",
  ui,
  hs,
  t,
  e
), ms = async (t, e) => new Promise((i) => {
  const s = e(t, (o) => {
    s(), i(o);
  });
}), ps = (t) => {
  class e extends t {
    connectedCallback() {
      super.connectedCallback(), this._checkSubscribed();
    }
    disconnectedCallback() {
      if (super.disconnectedCallback(), this.__unsubs) {
        for (; this.__unsubs.length; ) {
          const s = this.__unsubs.pop();
          s instanceof Promise ? s.then((o) => o()) : s();
        }
        this.__unsubs = void 0;
      }
    }
    updated(s) {
      if (super.updated(s), s.has("hass")) {
        this._checkSubscribed();
        return;
      }
      if (this.hassSubscribeRequiredHostProps) {
        for (const o of s.keys())
          if (this.hassSubscribeRequiredHostProps.includes(o)) {
            this._checkSubscribed();
            return;
          }
      }
    }
    hassSubscribe() {
      return [];
    }
    _checkSubscribed() {
      var s;
      this.__unsubs !== void 0 || !this.isConnected || this.hass === void 0 || (s = this.hassSubscribeRequiredHostProps) != null && s.some(
        (o) => this[o] === void 0
      ) || (this.__unsubs = this.hassSubscribe());
    }
  }
  return es([
    L({ attribute: !1 })
  ], e.prototype, "hass"), e;
};
function G(t, e, i) {
  const s = new CustomEvent(e, {
    bubbles: !1,
    composed: !1,
    detail: i
  });
  t.dispatchEvent(s);
}
class _s extends HTMLElement {
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
    e.actionHandler && We(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
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
      s.cancelable && s.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? G(o, "action", { action: "hold" }) : i.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, G(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, G(o, "action", { action: "double_tap" })) : G(o, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-area-card", _s);
const fs = () => {
  const t = document.body;
  if (t.querySelector("action-handler-area-card"))
    return t.querySelector("action-handler-area-card");
  const e = document.createElement("action-handler-area-card");
  return t.appendChild(e), e;
}, gs = (t, e) => {
  const i = fs();
  i && i.bind(t, e);
}, ce = et(
  class extends tt {
    update(t, [e]) {
      return gs(t.element, e), ie;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    render(t) {
    }
  }
), We = (t, e) => {
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
        if (!We(t[i], e[i]))
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
        if (!We(i[1], e.get(i[0])))
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
      const a = o[i];
      if (!We(t[a], e[a]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}, Ve = (t) => {
  const e = parseFloat(t);
  if (isNaN(e))
    throw new Error(`${t} is not a number`);
  return e;
};
function Kt(t) {
  if (!t)
    return null;
  try {
    if (t.endsWith("%"))
      return { w: 100, h: Ve(t.substr(0, t.length - 1)) };
    const e = t.replace(":", "x").split("x");
    return e.length === 0 ? null : e.length === 1 ? { w: Ve(e[0]), h: 1 } : { w: Ve(e[0]), h: Ve(e[1]) };
  } catch {
  }
  return null;
}
const vs = (t, e, i, s, o) => {
  var h, p, m, y, A;
  const a = i || void 0, n = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let r = a || "", c = {};
  if (a === "default" && ((h = t.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (a && a !== "default" && ((p = e == null ? void 0 : e.themes) != null && p[a])) {
    const { modes: b, ...H } = e.themes[a] || {};
    c = { ...c, ...H }, b && (n && b.dark ? c = { ...c, ...b.dark } : !n && b.light && (c = { ...c, ...b.light }));
  } else if (!a && (!((m = t.__themes) != null && m.keys) || t.__themes.keys.size === 0))
    return;
  const l = ((y = t.__themes) == null ? void 0 : y.keys) || /* @__PURE__ */ new Set(), d = new Set(Object.keys(c));
  if (a === "default" && d.size === 0) {
    for (const b of l)
      try {
        t.style.removeProperty(`--${b}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((A = t.__themes) == null ? void 0 : A.cacheKey) === r) {
    let b = !0;
    if (l.size !== d.size)
      b = !1;
    else
      for (const H of l)
        if (!d.has(H)) {
          b = !1;
          break;
        }
    if (b) return;
  }
  for (const b of l)
    if (!d.has(b))
      try {
        t.style.removeProperty(`--${b}`);
      } catch {
      }
  for (const [b, H] of Object.entries(c))
    t.style.setProperty(`--${b}`, String(H));
  t.__themes.cacheKey = r || null, t.__themes.keys = d;
};
function Gt(t, e) {
  var i, s;
  return ((s = (i = t == null ? void 0 : t[e]) == null ? void 0 : i.attributes) == null ? void 0 : s.friendly_name) || e;
}
function Zt(t, e) {
  return (i, s) => li(
    Gt(t, i),
    Gt(t, s),
    e
  );
}
const fe = ["unavailable", "unknown"], ae = [
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
], Ke = ["sensor"], Ge = ["binary_sensor"], Ze = ["cover"], ct = ["climate"], Te = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
  "script",
  "scene"
], ys = ["camera"], lt = [
  "alarm_control_panel",
  "siren",
  "light",
  "switch",
  "media_player",
  "climate",
  "air_quality",
  "humdifier",
  "vacuum",
  "lawn_mower",
  "cover",
  "lock",
  "camera",
  "fan",
  "valve",
  "water_heater",
  "person",
  "calendar",
  "remote",
  "scene",
  "device_tracker",
  "update",
  "notifications",
  "binary_sensor",
  "sensor",
  "script",
  "tags",
  "select",
  "automation",
  "button",
  "number",
  "conversation",
  "assist_satellite",
  "counter",
  "event",
  "group",
  "image",
  "image_processing",
  "input_boolean",
  "input_datetime",
  "input_number",
  "input_select",
  "input_text",
  "stt",
  "sun",
  "text",
  "date",
  "datetime",
  "time",
  "timer",
  "todo",
  "tts",
  "wake_word",
  "weather",
  "zone",
  "geo_location"
], dt = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: ["garage"]
}, ht = {
  light: { on: "mdi:lightbulb-multiple", off: "mdi:lightbulb-multiple-off" },
  switch: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  climate: { on: "mdi:thermostat", off: "mdi:thermostat-cog" },
  media_player: { on: "mdi:cast", off: "mdi:cast-off" },
  lock: { on: "mdi:lock-open", off: "mdi:lock" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  button: { on: "mdi:gesture-tap-button", off: "mdi:gesture-tap-button" },
  device_tracker: { on: "mdi:account", off: "mdi:account-off" },
  person: { on: "mdi:account", off: "mdi:account-off" },
  alarm_control_panel: { on: "mdi:alarm-light", off: "mdi:alarm-light-off" },
  siren: { on: "mdi:bell-ring", off: "mdi:bell_off" },
  vacuum_cleaner: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  lawn_mower: { on: "robot-mower", off: "mdi:robot-mower" },
  calendar: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  counter: { on: "mdi:counter", off: "mdi:counter" },
  timer: { on: "mdi:timer-outline", off: "mdi:timer-off" },
  input_boolean: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  input_select: {
    on: "mdi:format-list-bulleted",
    off: "mdi:format-list-bulleted"
  },
  input_text: { on: "mdi:text-box", off: "mdi:text-box" },
  update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
  remote: { on: "mdi:remote", off: "mdi:remote-off" },
  water_heater: { on: "mdi:water-boiler", off: "mdi:water-pump-off" },
  valve: { on: "mdi:valve", off: "mdi:valve-closed" },
  sensor: { on: "mdi:gauge", off: "mdi:gauge" },
  number: { on: "mdi:numeric", off: "mdi:numeric" },
  script: { on: "mdi:script-text", off: "mdi:script-text" },
  scene: { on: "mdi:movie", off: "mdi:movie-off" },
  select: { on: "mdi:format-list-bulleted", off: "mdi:format-list-bulleted" },
  air_quality: { on: "mdi:air-filter", off: "mdi:air-filter" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  geo_location: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
  camera: { on: "mdi:camera", off: "mdi:camera-off" },
  weather: { on: "mdi:weather-partly-cloudy", off: "mdi:weather-night" },
  automation: { on: "mdi:robot", off: "mdi:robot-off" },
  notifications: { on: "mdi:bell", off: "mdi:bell-off" },
  tags: { on: "mdi:tag-multiple", off: "mdi:tag-multiple" },
  conversation: { on: "mdi:comment-multiple", off: "mdi:comment-multiple" },
  assist_satellite: {
    on: "mdi:satellite-variant",
    off: "mdi:satellite-variant"
  },
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
  input_datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  input_number: { on: "mdi:numeric", off: "mdi:numeric" },
  stt: { on: "mdi:record-rec", off: "mdi:record" },
  sun: { on: "mdi:weather-sunny", off: "mdi:weather-night" },
  text: { on: "mdi:text-box", off: "mdi:text-box" },
  date: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  time: { on: "mdi:clock-outline", off: "mdi:clock-off" },
  todo: {
    on: "mdi:check-circle-outline",
    off: "mdi:checkbox-blank-circle-outline"
  },
  tts: { on: "mdi:volume-high", off: "mdi:volume-off" },
  wake_word: { on: "mdi:microphone", off: "mdi:microphone-off" },
  zone: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
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
  }
}, bs = "16:5";
var $s = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", ws = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", mi = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", As = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", Jt = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", at = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", Cs = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", Es = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", xs = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z";
function Xt(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
function pi(t, e) {
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
    default:
      return t.localize(
        `ui.panel.lovelace.editor.card.area.${e.name}`
      );
  }
}
var Ss = Object.defineProperty, q = (t, e, i, s) => {
  for (var o = void 0, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = n(e, i, o) || o);
  return o && Ss(e, i, o), o;
};
const Ds = /* @__PURE__ */ new Set([
  "off",
  "idle",
  "not_home",
  "closed",
  "locked",
  "standby",
  "disarmed",
  "unknown",
  "unavailable"
]);
var be;
const Q = (be = class extends te {
  constructor() {
    super(...arguments), this.open = !1, this.title = "", this.content = "", this.entities = [], this._showAll = !1, this._cardEls = /* @__PURE__ */ new Map(), this._lastEntityIds = [], this._onClosed = (e) => {
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
    }, this.computeLabel = P(
      (e, i, s) => pi(this.hass, e)
    ), this.groupAndSortEntities = P(
      (e, i, s) => {
        const o = /* @__PURE__ */ new Map();
        for (const n of e) {
          const r = this.getAreaForEntity(n);
          o.has(r) || o.set(r, []), o.get(r).push(n);
        }
        return Array.from(o.entries()).sort(
          ([n], [r]) => {
            var d, h;
            const c = ((d = i.get(n)) == null ? void 0 : d.toLowerCase()) ?? (n === "unassigned" ? "unassigned" : n), l = ((h = i.get(r)) == null ? void 0 : h.toLowerCase()) ?? (r === "unassigned" ? "unassigned" : r);
            return c.localeCompare(l);
          }
        ).map(([n, r]) => [n, s(r)]);
      }
    );
  }
  showDialog(e) {
    this.title = e.title ?? this.title, this.hass = e.hass, this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.selectedGroup = e.selectedGroup, this.card = e.card, this._cardEls.clear(), this.open = !0, this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cardEls.clear();
  }
  _toTileConfig(e) {
    return {
      type: "tile",
      entity: e.entity
    };
  }
  async _createCardElement(e, i, s = !1) {
    var o, a, n;
    try {
      const r = await ((o = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : o.call(window));
      if (r != null && r.createCardElement) {
        const c = r.createCardElement(i);
        return c.hass = e, (a = c.setAttribute) == null || a.call(c, "data-hui-card", ""), c;
      }
    } catch {
    }
    try {
      const r = i.type || "tile", c = typeof r == "string" && r.startsWith("custom:"), l = c ? r.slice(7) : `hui-${r}-card`;
      c && !customElements.get(l) && await customElements.whenDefined(l).catch(() => {
      });
      const d = document.createElement(l);
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
    var m, y, A, b, H, R, F, k, N, oe, Z;
    const i = this.card, s = B(e.entity_id), o = this.selectedDomain || s, a = this.selectedDomain ? this.selectedDeviceClass : (b = (A = (y = (m = this.hass) == null ? void 0 : m.states) == null ? void 0 : y[e.entity_id]) == null ? void 0 : A.attributes) == null ? void 0 : b.device_class, n = (i == null ? void 0 : i._config) || {};
    let r;
    Ge.includes(o) ? (r = (H = n.customization_alert) == null ? void 0 : H.find(
      (I) => I.type === a
    ), r || (r = (R = n.customization_domain) == null ? void 0 : R.find(
      (I) => I.type === o
    ))) : Ke.includes(o) ? (r = (F = n.customization_sensor) == null ? void 0 : F.find(
      (I) => I.type === a
    ), r || (r = (k = n.customization_domain) == null ? void 0 : k.find(
      (I) => I.type === o
    ))) : Ze.includes(o) ? (r = (N = n.customization_cover) == null ? void 0 : N.find(
      (I) => I.type === a
    ), r || (r = (oe = n.customization_domain) == null ? void 0 : oe.find(
      (I) => I.type === o
    ))) : r = (Z = n.customization_domain) == null ? void 0 : Z.find(
      (I) => I.type === o
    );
    const c = r == null ? void 0 : r.popup_card, l = c && typeof c.type == "string" && c.type || (r == null ? void 0 : r.popup_card_type) || "tile", d = l === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let h = {};
    if (c && typeof c == "object") {
      const { type: I, entity: W, ...me } = c;
      h = me;
    } else
      h = (r == null ? void 0 : r.popup_card_options) ?? {};
    return {
      type: l,
      entity: e.entity_id,
      ...d,
      ...h
    };
  }
  shouldUpdate(e) {
    if (!this.open)
      return e.has("open");
    if (e.size === 1 && e.has("hass")) {
      const i = this._getCurrentEntities().map((a) => a.entity_id).sort(), s = (this._lastEntityIds || []).slice().sort(), o = i.length === s.length && i.every((a, n) => a === s[n]);
      return this._updateCardsHass(), !o;
    }
    return !0;
  }
  _updateCardsHass() {
    this.hass && this._cardEls.forEach((e) => {
      try {
        e.hass = this.hass;
      } catch {
      }
    });
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
    const a = this._getPopupCardConfig(e);
    return this._createCardElement(this.hass, a).then((n) => {
      try {
        this._cardEls.get(i) === o && (o.replaceWith(n), this._cardEls.set(i, n)), n.hass = this.hass;
      } catch {
      }
    }), o;
  }
  _getCurrentEntities() {
    var a, n;
    const e = this.card, i = this.selectedDomain, s = this.selectedDeviceClass, o = this.selectedGroup;
    if (o !== void 0 && ((n = (a = e == null ? void 0 : e._config) == null ? void 0 : a.content) != null && n[o]))
      return [];
    if (i) {
      const l = ((typeof (e == null ? void 0 : e._shouldShowTotalEntities) == "function" ? e._shouldShowTotalEntities(i, s) : !1) ? !0 : this._showAll) ? typeof (e == null ? void 0 : e._totalEntities) == "function" ? e._totalEntities(i, s) : void 0 : typeof (e == null ? void 0 : e._isOn) == "function" ? e._isOn(i, s) : void 0;
      return Array.isArray(l) ? l : l ? [l] : [];
    }
    return Array.isArray(this.entities) ? this.entities : [];
  }
  toggleAllOrOn() {
    this._showAll = !this._showAll;
  }
  getAreaForEntity(e) {
    var o, a;
    const i = this.card, s = (o = i._entities) == null ? void 0 : o.find(
      (n) => n.entity_id === e.entity_id
    );
    if (s) {
      if (s.area_id)
        return s.area_id;
      if (s.device_id) {
        const n = (a = i._devices) == null ? void 0 : a.find(
          (r) => r.id === s.device_id
        );
        if (n && n.area_id)
          return n.area_id;
      }
    }
    return "unassigned";
  }
  _isActive(e) {
    return !Ds.has(e.state);
  }
  sortEntitiesForPopup(e) {
    var a, n;
    const i = ((n = (a = this.card) == null ? void 0 : a._config) == null ? void 0 : n.popup_sort) || "name", s = e.slice();
    if (i === "state") {
      const r = Zt(
        this.hass.states,
        this.hass.locale.language
      );
      return s.sort((c, l) => {
        const d = this._isActive(c) ? 0 : 1, h = this._isActive(l) ? 0 : 1;
        if (d !== h) return d - h;
        const p = B(c.entity_id), m = B(l.entity_id), y = this.hass ? Xt(this.hass, c.state, p) : c.state, A = this.hass ? Xt(this.hass, l.state, m) : l.state, b = (y || "").localeCompare(A || "");
        return b !== 0 ? b : r(c.entity_id, l.entity_id);
      });
    }
    const o = Zt(
      this.hass.states,
      this.hass.locale.language
    );
    return s.sort((r, c) => o(r.entity_id, c.entity_id));
  }
  render() {
    var oe, Z, I, W, me, Oe, ke, $, f, u, C, K, j;
    if (!this.open || !this.hass || !this.card) return D``;
    const e = this.card, i = (oe = e._config) == null ? void 0 : oe.area, s = ((Z = e._devicesInArea) == null ? void 0 : Z.call(e, i, e._devices)) ?? /* @__PURE__ */ new Set(), o = e._entities || [], a = this.hass.states, n = ((I = e._config) == null ? void 0 : I.popup_domains) || [], r = ((W = e._config) == null ? void 0 : W.hidden_entities) || [], c = ((me = e._config) == null ? void 0 : me.extra_entities) || [], l = (Oe = e._config) == null ? void 0 : Oe.label, d = (ke = e._config) == null ? void 0 : ke.hide_unavailable, h = ($ = e._config) == null ? void 0 : $.category_filter, p = this.selectedDomain || null, m = this.selectedDeviceClass || null, y = (E) => {
      if (!h) return !0;
      const w = o.find(
        (g) => g.entity_id === E
      ), x = w == null ? void 0 : w.entity_category;
      return x ? h === "config" ? x !== "config" : h === "diagnostic" ? x !== "diagnostic" : h === "config+diagnostic" ? x !== "config" && x !== "diagnostic" : !0 : !0;
    }, A = o.reduce(
      (E, w) => {
        var x;
        if (!w.hidden_by && (w.area_id ? w.area_id === i : w.device_id && s.has(w.device_id)) && (!l || w.labels && w.labels.some(
          (g) => l.includes(g)
        ))) {
          const g = w.entity_id;
          !r.includes(g) && y(g) && (!d || !fe.includes((x = a[g]) == null ? void 0 : x.state)) && E.push(g);
        }
        return E;
      },
      []
    );
    let b = [];
    for (const E of A) {
      const w = B(E);
      if (n.length > 0 && !n.includes(w)) continue;
      const x = a[E];
      x && (p && w !== p || m && x.attributes.device_class !== m || b.push(x));
    }
    for (const E of c) {
      const w = B(E), x = a[E];
      x && (n.length > 0 && !n.includes(w) || p && w !== p || m && x.attributes.device_class !== m || y(E) && !b.some((g) => g.entity_id === E) && b.push(x));
    }
    const H = ((f = e == null ? void 0 : e._config) == null ? void 0 : f.ungroup_areas) === !0;
    let R = (u = e._config) != null && u.columns ? e._config.columns : 4, F = [], k = [];
    if (H)
      k = this.sortEntitiesForPopup(b), R = Math.min(R, Math.max(1, k.length));
    else {
      const E = {};
      for (const g of b) {
        const O = B(g.entity_id);
        O in E || (E[O] = []), E[O].push(g);
      }
      const w = n.length > 0 ? n : lt;
      F = Object.entries(E).filter(([g]) => !p || g === p).sort(([g], [O]) => {
        const T = w.indexOf(g), M = w.indexOf(O);
        return (T === -1 ? w.length : T) - (M === -1 ? w.length : M);
      }).map(
        ([g, O]) => [g, this.sortEntitiesForPopup(O)]
      );
      const x = F.length ? Math.max(...F.map(([, g]) => g.length)) : 0;
      R = Math.min(R, Math.max(1, x));
    }
    const N = ((K = e._area) == null ? void 0 : K.call(e, (C = e._config) == null ? void 0 : C.area, e._areas)) ?? null;
    return D`
      <ha-dialog
        id="more-info-dialog"
        style="--columns: ${R};"
        .open=${this.open}
        @closed=${this._onClosed}
      >
        <style>
          ${be.styles}
        </style>
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${mi}
            @click=${this._onClosed}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${((j = e._config) == null ? void 0 : j.area_name) || N && N.name}</h3>
          </div>
        </div>

        <div class="dialog-content">
          ${H ? D`
                <div class="entity-cards">
                  ${k.map(
      (E) => D`
                      <div class="entity-card">
                        ${this._getOrCreateCard(E)}
                      </div>
                    `
    )}
                </div>
              ` : D`${F.map(([E, w]) => D`
                  <div class="cards-wrapper">
                    <h4>
                      ${E === "binary_sensor" || E === "sensor" || E === "cover" ? this._getDomainName(
      E,
      m || void 0
    ) : this._getDomainName(E)}
                    </h4>
                    <div class="entity-cards">
                      ${w.map(
      (x) => D`
                          <div class="entity-card">
                            ${this._getOrCreateCard(x)}
                          </div>
                        `
    )}
                    </div>
                  </div>
                `)}`}
        </div>
      </ha-dialog>
    `;
  }
  _getDomainName(e, i) {
    return this.hass ? e === "scene" ? "Scene" : e === "binary_sensor" || e === "sensor" || e === "cover" ? i ? this.hass.localize(
      `component.${e}.entity_component.${i}.name`
    ) : this.hass.localize(`component.${e}.entity_component._.name`) : this.hass.localize(`component.${e}.entity_component._.name`) : e;
  }
}, be.styles = xe`
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
      margin-bottom: 12px;
      min-width: 15vw;
    }
    .dialog-header .menu-button {
      margin-left: auto;
    }
    .dialog-content {
      margin-bottom: 16px;
    }
    .dialog-actions {
      text-align: right;
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
    .entity-list {
      list-style: none;
      padding: 0 8px;
      margin: 0;
    }
    .entity-list .entity-item {
      list-style: none;
      margin: 0.2em 0;
    }
    h4 {
      width: calc(var(--columns, 4) * 22.5vw);
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.8em 0.2em;
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
        width: 45vw;
      }
      .entity-cards {
        grid-template-columns: repeat(var(--columns, 2), 45vw);
      }
      h4 {
        width: calc(var(--columns, 2) * 45vw);
        margin: 0.8em 0.2em;
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
        width: 100%;
      }
      .entity-cards {
        grid-template-columns: 1fr;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  `, be);
q([
  L({ type: Boolean })
], Q.prototype, "open");
q([
  L({ type: String })
], Q.prototype, "title");
q([
  L({ type: String })
], Q.prototype, "selectedDomain");
q([
  L({ type: String })
], Q.prototype, "selectedDeviceClass");
q([
  L({ type: String })
], Q.prototype, "content");
q([
  L({ type: Array })
], Q.prototype, "entities");
q([
  L({ attribute: !1 })
], Q.prototype, "hass");
q([
  L({ attribute: !1 })
], Q.prototype, "card");
q([
  U()
], Q.prototype, "_showAll");
q([
  U()
], Q.prototype, "selectedGroup");
let Os = Q;
customElements.define("area-card-plus-popup-dialog", Os);
const Ct = class Ct extends te {
  constructor() {
    super(...arguments), this.open = !1, this._onClosed = () => {
      this.open = !1, this.dispatchEvent(
        new CustomEvent("dialog-closed", { bubbles: !0, composed: !0 })
      );
    }, this._confirm = () => {
      var e, i;
      try {
        (i = (e = this.card) == null ? void 0 : e.toggleDomain) == null || i.call(e, this.selectedDomain, this.selectedDeviceClass);
      } catch {
      }
      this._onClosed();
    };
  }
  showDialog(e) {
    this.hass = e.hass, this.card = e.card, this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.open = !0, this.requestUpdate();
  }
  render() {
    var o, a;
    if (!this.open || !this.hass || !this.card) return D``;
    this.selectedDomain, this.selectedDeviceClass;
    const e = [], i = (a = (o = this.card) == null ? void 0 : o.getCustomizationForType) == null ? void 0 : a.call(o, e), s = (i == null ? void 0 : i.invert) === !0;
    return D`
      <ha-dialog
        .open=${this.open}
        heading="${s ? this.hass.localize("ui.card.common.turn_on") + "?" : this.hass.localize("ui.card.common.turn_off") + "?"}"
        @closed=${this._onClosed}
      >
        <div>
          ${this.hass.localize(
      "ui.panel.lovelace.cards.actions.action_confirmation",
      {
        action: s ? this.hass.localize("ui.card.common.turn_on") : this.hass.localize("ui.card.common.turn_off")
      }
    )}
        </div>
        <ha-button
          appearance="plain"
          slot="secondaryAction"
          dialogAction="close"
        >
          ${this.hass.localize("ui.common.no")}
        </ha-button>
        <ha-button
          appearance="accent"
          slot="primaryAction"
          @click=${this._confirm}
        >
          ${this.hass.localize("ui.common.yes")}
        </ha-button>
      </ha-dialog>
    `;
  }
};
Ct.styles = xe``;
let he = Ct;
q([
  L({ type: Boolean })
], he.prototype, "open");
q([
  L({ attribute: !1 })
], he.prototype, "hass");
q([
  L({ attribute: !1 })
], he.prototype, "card");
q([
  L({ type: String })
], he.prototype, "selectedDomain");
q([
  L({ type: String })
], he.prototype, "selectedDeviceClass");
customElements.define(
  "area-card-plus-popup-dialog-confirmation",
  he
);
var ks = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, se = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Hs(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && ks(e, i, o), o;
};
let X = class extends ps(te) {
  constructor() {
    super(...arguments), this._showPopup = !1, this.selectedDomain = null, this.selectedDeviceClass = null, this._ratio = null, this._deviceClasses = dt, this._entitiesByDomain = P(
      (t, e, i, s, o) => {
        var c;
        const a = ((c = this._config) == null ? void 0 : c.hidden_entities) || [], n = i.reduce((l, d) => {
          var h;
          return !d.hidden_by && (d.area_id ? d.area_id === t : d.device_id && e.has(d.device_id)) && (!((h = this._config) != null && h.label) || d.labels && d.labels.some((p) => {
            var m;
            return (m = this._config) == null ? void 0 : m.label.includes(p);
          })) && !a.includes(d.entity_id) && l.push(d.entity_id), l;
        }, []), r = {};
        for (const l of n) {
          const d = B(l);
          if (!Te.includes(d) && !Ke.includes(d) && !Ge.includes(d) && !Ze.includes(d) && !ys.includes(d) && !ct.includes(d))
            continue;
          const h = o[l];
          h && ((Ge.includes(d) || Ke.includes(d) || Ze.includes(d)) && !s[d].includes(
            h.attributes.device_class || ""
          ) || (d in r || (r[d] = []), r[d].push(h)));
        }
        return r;
      }
    ), this._area = P(
      (t, e) => e.find((i) => i.area_id === t) || null
    ), this._devicesInArea = P(
      (t, e) => new Set(
        t ? e.reduce((i, s) => (s.area_id === t && i.push(s.id), i), []) : []
      )
    );
  }
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }
  static async getStubConfig(t) {
    var s;
    const e = t.connection;
    return { type: "custom:area-card-plus", area: ((s = (await ms(e, Wt))[0]) == null ? void 0 : s.area_id) || "" };
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
  _openDomainPopup(t) {
    var o, a;
    const e = this._area((o = this._config) == null ? void 0 : o.area, this._areas || []), i = ((a = this._config) == null ? void 0 : a.area_name) || e && e.name || "Details";
    this.showPopup(this, "area-card-plus-popup-dialog", {
      title: i,
      hass: this.hass,
      selectedDomain: t,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup || void 0,
      card: this
    });
  }
  _openGeneralPopup() {
    var a, n;
    const t = this._area((a = this._config) == null ? void 0 : a.area, this._areas || []), e = ((n = this._config) == null ? void 0 : n.area_name) || t && t.name || "Details", i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), s = [];
    Object.values(i || {}).forEach((r) => {
      r.forEach((c) => {
        !fe.includes(c.state) && !ae.includes(c.state) && s.push(c);
      });
    }), this.showPopup(this, "area-card-plus-popup-dialog", {
      title: e,
      hass: this.hass,
      entities: s,
      card: this,
      content: s.length ? void 0 : "Keine Entitäten"
    });
  }
  _isOn(t, e) {
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    )[t];
    if (i)
      return (e ? i.filter(
        (s) => s.attributes.device_class === e
      ) : i).find(
        (s) => !fe.includes(s.state) && !ae.includes(s.state)
      );
  }
  _average(t, e) {
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    )[t].filter(
      (n) => e ? n.attributes.device_class === e : !0
    );
    if (!i || i.length === 0)
      return;
    let s;
    const o = i.filter((n) => !ts(n) || isNaN(Number(n.state)) ? !1 : s ? n.attributes.unit_of_measurement === s : (s = n.attributes.unit_of_measurement, !0));
    if (!o.length)
      return;
    const a = o.reduce(
      (n, r) => n + Number(r.state),
      0
    );
    return e === "power" ? `${Bt(a, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? qt(s, this.hass.locale) : ""}${s || ""}` : `${Bt(a / o.length, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? qt(s, this.hass.locale) : ""}${s || ""}`;
  }
  hassSubscribe() {
    const t = this.hass.connection;
    return [
      Wt(t, (e) => {
        this._areas = e;
      }),
      ds(t, (e) => {
        this._devices = e;
      }),
      us(t, (e) => {
        this._entities = e;
      })
    ];
  }
  getCardSize() {
    return 3;
  }
  willUpdate(t) {
    var e, i;
    (t.has("_config") || this._ratio === null) && (this._ratio = (e = this._config) != null && e.aspect_ratio ? Kt((i = this._config) == null ? void 0 : i.aspect_ratio) : null, (this._ratio === null || this._ratio.w <= 0 || this._ratio.h <= 0) && (this._ratio = Kt(bs)));
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
    if (!t.area)
      throw new Error("Area Required");
    this._config = t, this._deviceClasses = { ...dt }, t.sensor_classes && (this._deviceClasses.sensor = t.sensor_classes), t.alert_classes && (this._deviceClasses.binary_sensor = t.alert_classes), t.cover_classes && (this._deviceClasses.cover = t.cover_classes);
  }
  shouldUpdate(t) {
    if (t.has("_config") || !this._config || t.has("_devicesInArea") || t.has("_areas") || t.has("_entities") || t.has("_showPopup"))
      return !0;
    if (!t.has("hass"))
      return !1;
    const e = t.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale)
      return !0;
    if (!this._devices || !this._devicesInArea(this._config.area, this._devices) || !this._entities)
      return !1;
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    );
    for (const s of Object.values(i))
      for (const o of s)
        if (e.states[o.entity_id] !== o)
          return !0;
    return !1;
  }
  _handleAction(t) {
    var s, o, a;
    const e = t.detail.action === "tap" ? (s = this._config) == null ? void 0 : s.tap_action : t.detail.action === "hold" ? (o = this._config) == null ? void 0 : o.hold_action : t.detail.action === "double_tap" ? (a = this._config) == null ? void 0 : a.double_tap_action : null;
    if (typeof e == "string" && e === "more-info" || typeof e == "object" && (e == null ? void 0 : e.action) === "more-info" || e === void 0) {
      this._openGeneralPopup();
      return;
    }
    Me(this, this.hass, this._config, t.detail.action);
  }
  _handleDomainAction(t) {
    return (e) => {
      var r, c, l, d;
      e.stopPropagation();
      const i = (c = (r = this._config) == null ? void 0 : r.customization_domain) == null ? void 0 : c.find(
        (h) => h.type === t
      ), s = e.detail.action === "tap" ? i == null ? void 0 : i.tap_action : e.detail.action === "hold" ? i == null ? void 0 : i.hold_action : e.detail.action === "double_tap" ? i == null ? void 0 : i.double_tap_action : null, o = s === "toggle" || (s == null ? void 0 : s.action) === "toggle", a = s === "more-info" || (s == null ? void 0 : s.action) === "more-info";
      if (o) {
        t === "media_player" ? this.hass.callService(
          t,
          this._isOn(t) ? "media_pause" : "media_play",
          void 0,
          { area_id: this._config.area }
        ) : t === "lock" ? this.hass.callService(
          t,
          this._isOn(t) ? "lock" : "unlock",
          void 0,
          { area_id: this._config.area }
        ) : t === "vacuum" ? this.hass.callService(
          t,
          this._isOn(t) ? "stop" : "start",
          void 0,
          { area_id: this._config.area }
        ) : Te.includes(t) && this.hass.callService(
          t,
          this._isOn(t) ? "turn_off" : "turn_on",
          void 0,
          { area_id: this._config.area }
        );
        return;
      } else if (a || s === void 0) {
        if (t !== "binary_sensor" && t !== "sensor")
          if (t === "climate") {
            const h = (d = (l = this._config) == null ? void 0 : l.customization_domain) == null ? void 0 : d.find(
              (m) => m.type === "climate"
            ), p = h == null ? void 0 : h.display_mode;
            (p === "icon" || p === "text_icon") && this._showPopupForDomain(t);
          } else
            this._showPopupForDomain(t);
        return;
      }
      const n = {
        tap_action: i == null ? void 0 : i.tap_action,
        hold_action: i == null ? void 0 : i.hold_action,
        double_tap_action: i == null ? void 0 : i.double_tap_action
      };
      Me(this, this.hass, n, e.detail.action);
    };
  }
  _handleAlertAction(t, e) {
    return (i) => {
      var r, c;
      i.stopPropagation();
      const s = (c = (r = this._config) == null ? void 0 : r.customization_alert) == null ? void 0 : c.find(
        (l) => l.type === e
      ), o = i.detail.action === "tap" ? s == null ? void 0 : s.tap_action : i.detail.action === "hold" ? s == null ? void 0 : s.hold_action : i.detail.action === "double_tap" ? s == null ? void 0 : s.double_tap_action : null;
      if (o === "more-info" || (o == null ? void 0 : o.action) === "more-info" || o === void 0) {
        t === "binary_sensor" && this._showPopupForDomain(t, e);
        return;
      }
      const n = {
        tap_action: s == null ? void 0 : s.tap_action,
        hold_action: s == null ? void 0 : s.hold_action,
        double_tap_action: s == null ? void 0 : s.double_tap_action
      };
      Me(this, this.hass, n, i.detail.action);
    };
  }
  _handleCoverAction(t, e) {
    return (i) => {
      var r, c;
      i.stopPropagation();
      const s = (c = (r = this._config) == null ? void 0 : r.customization_cover) == null ? void 0 : c.find(
        (l) => l.type === e
      ), o = i.detail.action === "tap" ? s == null ? void 0 : s.tap_action : i.detail.action === "hold" ? s == null ? void 0 : s.hold_action : i.detail.action === "double_tap" ? s == null ? void 0 : s.double_tap_action : null;
      if (o === "more-info" || (o == null ? void 0 : o.action) === "more-info" || o === void 0) {
        t === "cover" && this._showPopupForDomain(t, e);
        return;
      }
      const n = {
        tap_action: s == null ? void 0 : s.tap_action,
        hold_action: s == null ? void 0 : s.hold_action,
        double_tap_action: s == null ? void 0 : s.double_tap_action
      };
      Me(this, this.hass, n, i.detail.action);
    };
  }
  _handleSensorAction(t, e) {
    return (i) => {
      var r, c;
      i.stopPropagation();
      const s = (c = (r = this._config) == null ? void 0 : r.customization_sensor) == null ? void 0 : c.find(
        (l) => l.type === e
      ), o = i.detail.action === "tap" ? s == null ? void 0 : s.tap_action : i.detail.action === "hold" ? s == null ? void 0 : s.hold_action : i.detail.action === "double_tap" ? s == null ? void 0 : s.double_tap_action : null;
      if (o === "more-info" || (o == null ? void 0 : o.action) === "more-info") {
        t === "sensor" && this._showPopupForDomain(t, e);
        return;
      }
      const n = {
        tap_action: s == null ? void 0 : s.tap_action,
        hold_action: s == null ? void 0 : s.hold_action,
        double_tap_action: s == null ? void 0 : s.double_tap_action
      };
      Me(this, this.hass, n, i.detail.action);
    };
  }
  render() {
    var h, p, m, y, A, b, H, R, F, k, N, oe, Z, I, W, me, Oe, ke;
    if (!this._config || !this.hass || !this._areas || !this._devices || !this._entities)
      return S;
    const t = ((h = this._config) == null ? void 0 : h.design) === "V2", e = t && ((p = this._config) != null && p.v2_color) ? this._calculateV2Color(this._config.v2_color) : "var(--primary-color)", i = {
      mirrored: this._config.mirrored === !0
    }, s = {
      v2: ((m = this._config) == null ? void 0 : m.design) === "V2",
      row: ((y = this._config) == null ? void 0 : y.layout) === "horizontal"
    }, o = t ? { background: e } : {}, a = this.layout === "grid", n = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), r = this._area(this._config.area, this._areas);
    let c;
    this._config.show_camera && "camera" in n && (c = n.camera[0].entity_id);
    const l = (A = this._config) != null && A.show_camera ? ((b = this._config) == null ? void 0 : b.show_icon) === "icon" || ((H = this._config) == null ? void 0 : H.show_icon) === "icon + image" : ((R = this._config) == null ? void 0 : R.show_icon) === "icon" || ((F = this._config) == null ? void 0 : F.show_icon) === "icon + image" || ((k = this._config) == null ? void 0 : k.show_icon) === void 0;
    if (r === null)
      return D`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    const d = {
      color: (N = this._config) != null && N.area_icon_color ? `var(--${this._config.area_icon_color}-color)` : "",
      ...(oe = this._config) != null && oe.icon_css ? this._config.icon_css.split(`
`).reduce(($, f) => {
        const u = f.trim();
        if (u && u.includes(":")) {
          const [C, K] = u.split(":");
          $[C.trim()] = K.trim().replace(";", "");
        }
        return $;
      }, {}) : {}
    };
    return D`
      <ha-card class="${ne(i)}" style=${Ue({
      paddingBottom: a ? "0" : "12em"
    })}>
        ${this._config.show_camera && c || (this._config.show_icon === "image" || this._config.show_icon === "icon + image") && r.picture ? D`
                <hui-image
                  .config=${this._config}
                  .hass=${this.hass}
                  .image=${this._config.show_camera ? void 0 : r.picture}
                  .cameraImage=${this._config.show_camera ? c : void 0}
                  .cameraView=${this._config.camera_view}
                  fitMode="cover"
                ></hui-image>
              ` : S}
          <div class="${ne({
      "icon-container": !0,
      ...s
    })}"
          style=${Ue(o)}>
          ${l ? D`
                  <ha-icon
                    style=${Ue(d)}
                    icon=${this._config.area_icon || r.icon}
                  ></ha-icon>
                ` : S}
          </div>
          <div class="${ne({
      content: !0,
      ...s
    })}"            @action=${this._handleAction}
            .actionHandler=${ce({
      hasHold: V(this._config.hold_action),
      hasDoubleClick: V(this._config.double_tap_action)
    })}>

        <div
          class="${ne({
      right: !0,
      ...s
    })}"
          style=${Ue(o)}
        >


                              <div class="${ne({
      covers: !0,
      ...s
    })}">
            ${Ze.map(($) => $ in n ? this._deviceClasses[$].map((f) => {
      var x, g, O, T, M;
      const u = (g = (x = this._config) == null ? void 0 : x.customization_cover) == null ? void 0 : g.find(
        (_) => _.type === f
      ), C = (u == null ? void 0 : u.invert) === !0, K = n[$].filter(
        (_) => {
          const z = _.attributes.device_class || "default", v = !ae.includes(_.state);
          return z === f && (C ? ae.includes(_.state) : v);
        }
      ), j = (u == null ? void 0 : u.color) || ((O = this._config) == null ? void 0 : O.cover_color), E = u == null ? void 0 : u.icon, w = K.length;
      return w > 0 ? D`
                      <div
                        class="icon-with-count"
                        style=${u != null && u.css || (T = this._config) != null && T.cover_css ? ((u == null ? void 0 : u.css) || ((M = this._config) == null ? void 0 : M.cover_css)).split(`
`).reduce((_, z) => {
        const v = z.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : ""}
                        @action=${this._handleCoverAction($, f)}
                        .actionHandler=${ce({
        hasHold: V(u == null ? void 0 : u.hold_action),
        hasDoubleClick: V(
          u == null ? void 0 : u.double_tap_action
        )
      })}
                      >
                        <ha-state-icon
                          class="cover"
                          style="${(j ? `color: var(--${j}-color);` : "") + " " + (u != null && u.icon_css ? u.icon_css.split(`
`).reduce((_, z) => {
        const v = z.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : "")}"
                          .icon="${E || this._getIcon(
        $,
        !C,
        f
      )}"
                        ></ha-state-icon>

                        <span
                          class="active-count  text-small${w > 0 ? "on" : "off"}"
                          >${w}</span
                        >
                      </div>
                    ` : S;
    }) : S)}
          </div>        

          <div class="${ne({
      alerts: !0,
      ...s
    })}">
            ${Ge.map(($) => $ in n ? this._deviceClasses[$].map((f) => {
      var x, g, O, T, M;
      const u = (g = (x = this._config) == null ? void 0 : x.customization_alert) == null ? void 0 : g.find(
        (_) => _.type === f
      ), C = (u == null ? void 0 : u.invert) === !0, K = n[$].filter(
        (_) => {
          const z = _.attributes.device_class || "default", v = _.state === "on";
          return z === f && (C ? ae.includes(_.state) : v);
        }
      ), j = (u == null ? void 0 : u.color) || ((O = this._config) == null ? void 0 : O.alert_color), E = u == null ? void 0 : u.icon, w = K.length;
      return w > 0 ? D`
                      <div
                        class="icon-with-count"
                        style=${u != null && u.css || (T = this._config) != null && T.alert_css ? ((u == null ? void 0 : u.css) || ((M = this._config) == null ? void 0 : M.alert_css)).split(`
`).reduce((_, z) => {
        const v = z.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : ""}
                        @action=${this._handleAlertAction($, f)}
                        .actionHandler=${ce({
        hasHold: V(u == null ? void 0 : u.hold_action),
        hasDoubleClick: V(
          u == null ? void 0 : u.double_tap_action
        )
      })}
                      >
                        <ha-state-icon
                          class="alert"
                          style="${(j ? `color: var(--${j}-color);` : "") + " " + (u != null && u.icon_css ? u.icon_css.split(`
`).reduce((_, z) => {
        const v = z.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : "")}"
                          .icon="${E || this._getIcon(
        $,
        !C,
        f
      )}"
                        ></ha-state-icon>

                        <span
                          class="active-count  text-small${w > 0 ? "on" : "off"}"
                          >${w}</span
                        >
                      </div>
                    ` : S;
    }) : S)}
          </div>          



  

          <div class="${ne({
      buttons: !0,
      ...s
    })}">
            ${this._config.show_active ? (Z = this._config.toggle_domains) == null ? void 0 : Z.map(($) => {
      var E, w, x, g, O, T, M;
      if (!($ in n))
        return S;
      if ($ === "climate") {
        const _ = (w = (E = this._config) == null ? void 0 : E.customization_domain) == null ? void 0 : w.find(
          (v) => v.type === "climate"
        ), z = _ == null ? void 0 : _.display_mode;
        if (z !== "icon" && z !== "text_icon")
          return S;
      }
      const f = (g = (x = this._config) == null ? void 0 : x.customization_domain) == null ? void 0 : g.find(
        (_) => _.type === $
      ), u = (f == null ? void 0 : f.color) || ((O = this._config) == null ? void 0 : O.domain_color), C = f == null ? void 0 : f.icon, j = n[$].filter(
        (_) => !fe.includes(_.state) && !ae.includes(_.state)
      ).length;
      return j > 0 ? D`
                        <div
                          class="icon-with-count hover"
                          style=${f != null && f.css || (T = this._config) != null && T.domain_css ? ((f == null ? void 0 : f.css) || ((M = this._config) == null ? void 0 : M.domain_css)).split(`
`).reduce((_, z) => {
        const v = z.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : ""}
                          @action=${this._handleDomainAction($)}
                          .actionHandler=${ce({
        hasHold: V(f == null ? void 0 : f.hold_action),
        hasDoubleClick: V(
          f == null ? void 0 : f.double_tap_action
        )
      })}
                        >
                          <ha-state-icon
                            style=${u ? `color: var(--${u}-color);` : S}
                            class=${j > 0 ? "toggle-on" : "toggle-off"}
                            .domain=${$}
                            .icon=${C || this._getIcon(
        $,
        j > 0
      )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${j > 0 ? "on" : "off"}"
                          >
                            ${j}
                          </span>
                        </div>
                      ` : S;
    }) : (I = this._config.toggle_domains) == null ? void 0 : I.map(($) => {
      var E, w, x, g, O, T, M;
      if (!($ in n))
        return S;
      if ($ === "climate") {
        const _ = (w = (E = this._config) == null ? void 0 : E.customization_domain) == null ? void 0 : w.find(
          (v) => v.type === "climate"
        ), z = _ == null ? void 0 : _.display_mode;
        if (z !== "icon" && z !== "text_icon")
          return S;
      }
      const f = (g = (x = this._config) == null ? void 0 : x.customization_domain) == null ? void 0 : g.find(
        (_) => _.type === $
      ), u = f == null ? void 0 : f.color, C = f == null ? void 0 : f.icon, j = n[$].filter(
        (_) => !fe.includes(_.state) && !ae.includes(_.state)
      ).length;
      return D`
                      <div
                        class="icon-with-count hover"
                        style=${f != null && f.css || (O = this._config) != null && O.domain_css ? ((f == null ? void 0 : f.css) || ((T = this._config) == null ? void 0 : T.domain_css)).split(`
`).reduce((_, z) => {
        const v = z.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : ""}
                        @action=${this._handleDomainAction($)}
                        .actionHandler=${ce({
        hasHold: V(f == null ? void 0 : f.hold_action),
        hasDoubleClick: V(
          f == null ? void 0 : f.double_tap_action
        )
      })}
                      >
                        <ha-state-icon
                          style=${(u ? `color: var(--${u}-color);` : (M = this._config) != null && M.domain_color ? `color: ${this._config.domain_color};` : "") + " " + (f != null && f.icon_css ? f.icon_css.split(`
`).reduce((_, z) => {
        const v = z.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : "")}
                          class=${j > 0 ? "toggle-on" : "toggle-off"}
                          .domain=${$}
                          .icon=${C || this._getIcon(
        $,
        j > 0
      )}
                        ></ha-state-icon>
                        <span
                          class="active-count text-small ${j > 0 ? "on" : "off"}"
                        >
                          ${j}
                        </span>
                      </div>
                    `;
    })}
          </div>
          

          </div>
          <div class="${ne({
      bottom: !0,
      ...s
    })}">
              <div style=${`${(W = this._config) != null && W.area_name_color ? `color: var(--${this._config.area_name_color}-color);` : ""} ${(me = this._config) != null && me.name_css ? this._config.name_css.split(`
`).reduce(($, f) => {
      const u = f.trim();
      return u && u.includes(":") && ($ += u.endsWith(";") ? u : `${u};`, $ += " "), $;
    }, "") : ""}`}"
              <div class="${ne({
      name: !0,
      ...s,
      "text-large": !0,
      on: !0
    })}"
                @action=${this._handleAction}
                .actionHandler=${ce({
      hasHold: V(this._config.hold_action),
      hasDoubleClick: V(this._config.double_tap_action)
    })}
              >
                ${this._config.area_name || r.name}
              </div>
              

              <div class="sensors">
                ${Ke.map(($) => {
      var u;
      if (!($ in n))
        return S;
      const f = this._deviceClasses[$].map((C, K, j) => {
        var v, Et, xt, St, Dt, Ot, kt;
        const E = n[$].filter(
          (ee) => ee.attributes.device_class === C
        );
        if (E.length === 0)
          return S;
        const w = (() => {
          switch (C) {
            case "temperature":
              return r.temperature_entity_id;
            case "humidity":
              return r.humidity_entity_id;
            default:
              return null;
          }
        })(), x = w ? this.hass.states[w] : void 0, g = (Et = (v = this._config) == null ? void 0 : v.customization_sensor) == null ? void 0 : Et.find(
          (ee) => ee.type === C
        ), O = (g == null ? void 0 : g.color) || ((xt = this._config) == null ? void 0 : xt.sensor_color), T = (g == null ? void 0 : g.invert) === !0, M = E.some(
          (ee) => !fe.includes(ee.state) && !ae.includes(ee.state)
        );
        if (T && M)
          return S;
        const _ = (St = this._config) != null && St.show_sensor_icons ? D`
                            <ha-domain-icon
                              style=${O ? `color: var(--${O}-color);` : ""}
                              .hass=${this.hass}
                              .domain=${$}
                              .deviceClass=${C}
                            ></ha-domain-icon>
                          ` : null, z = D`
                        <span
                          class="sensor-value"
                          @action=${this._handleSensorAction(
          $,
          C
        )}
                          .actionHandler=${ce({
          hasHold: V(g == null ? void 0 : g.hold_action),
          hasDoubleClick: V(
            g == null ? void 0 : g.double_tap_action
          )
        })}
                          style=${`
              ${O ? `color: var(--${O}-color);` : ""}
              ${g != null && g.css ? g.css.split(`
`).reduce((ee, _i) => {
          const He = _i.trim();
          return He && He.includes(":") && (ee += He.endsWith(";") ? He : `${He};`, ee += " "), ee;
        }, "") : ""}
            `}
                        >
                          ${!((Dt = this._config) != null && Dt.show_sensor_icons) && !((Ot = this._config) != null && Ot.wrap_sensor_icons) && K > 0 ? " - " : ""}
                          ${x ? this.hass.formatEntityState(x) : this._average($, C)}
                        </span>
                      `;
        return (kt = this._config) != null && kt.wrap_sensor_icons ? D`<div class="sensor-row">
                          ${_}${z}
                        </div>` : D`${_}${z}`;
      }).filter((C) => C !== S);
      return f.length === 0 ? S : (u = this._config) != null && u.wrap_sensor_icons ? D`<div class="sensor text-medium off">
                    ${f}
                  </div>` : D`<div class="sensor text-medium off">
                      ${f}
                    </div>`;
    })}
</div>
            <div class="climate text-small off" >
            ${(ke = (Oe = this._config) == null ? void 0 : Oe.toggle_domains) != null && ke.includes("climate") ? ct.map(($) => {
      var w, x, g;
      if (!($ in n))
        return "";
      const u = n[$].filter((O) => {
        const T = O.attributes.hvac_action, M = O.state, _ = !fe.includes(M) && !ae.includes(M);
        return T !== void 0 ? _ && (T !== "idle" && T !== "off") && !(M === "heat" && (T === "idle" || T === "off")) : _;
      }).map((O) => {
        var M, _, z;
        return `${O.attributes.temperature || "N/A"} ${((z = (_ = (M = this.hass) == null ? void 0 : M.config) == null ? void 0 : _.unit_system) == null ? void 0 : z.temperature) || ""}`;
      });
      if (u.length === 0)
        return "";
      const C = (x = (w = this._config) == null ? void 0 : w.customization_domain) == null ? void 0 : x.find(
        (O) => O.type === $
      );
      if ((C == null ? void 0 : C.display_mode) === "icon")
        return "";
      const j = C == null ? void 0 : C.color, E = `${j ? `color: var(--${j}-color);` : (g = this._config) != null && g.domain_color ? `color: ${this._config.domain_color};` : ""}${C != null && C.css ? " " + C.css.split(`
`).reduce((O, T) => {
        const M = T.trim();
        return M && M.includes(":") && (O += M.endsWith(";") ? M : `${M};`, O += " "), O;
      }, "") : ""}`;
      return D`
                      <div
                        class="climate"
                        style=${E}
                        @action=${this._handleDomainAction($)}
                        .actionHandler=${ce({
        hasHold: V(C == null ? void 0 : C.hold_action),
        hasDoubleClick: V(
          C == null ? void 0 : C.double_tap_action
        )
      })}
                      >
                        (${u.join(", ")})
                      </div>
                    `;
    }) : ""}
            </div>
          </div>
        </div>

        
        </div>
      </ha-card>
    `;
  }
  _calculateV2Color(t) {
    return `rgba(${t.join(", ")})`;
  }
  updated(t) {
    var a, n;
    if (super.updated(t), !this._config || !this.hass)
      return;
    const e = (a = this.renderRoot) == null ? void 0 : a.querySelector("ha-dialog"), i = (n = document.querySelector("home-assistant")) == null ? void 0 : n.shadowRoot;
    if (e && e.parentElement !== i && (i == null || i.appendChild(e)), t.has("selectedDomain") && this.selectedDomain) {
      const r = this.selectedDomain;
      if (r.includes(".")) {
        const c = r, l = this.hass.states[c];
        l && this.showMoreInfo(l);
      } else
        this._openDomainPopup(r);
      setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    const s = t.get("hass"), o = t.get("_config");
    (t.has("hass") && (!s || s.themes !== this.hass.themes) || t.has("_config") && (!o || o.theme !== this._config.theme)) && vs(this, this.hass.themes, this._config.theme);
  }
  _showPopupForDomain(t, e) {
    this.selectedDeviceClass = e || null, this._openDomainPopup(t);
  }
  _getIcon(t, e, i) {
    if (t in ht) {
      const s = ht[t];
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
  connectedCallback() {
    super.connectedCallback(), this._updateIsMobile(), window.addEventListener("resize", this._updateIsMobile.bind(this));
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this._updateIsMobile.bind(this)), super.disconnectedCallback();
  }
  _updateIsMobile() {
    this._isMobile = window.innerWidth <= 768;
  }
  static get styles() {
    return xe`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
      }
      hui-image {
        position: absolute;
        z-index: 0;
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
      .covers {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: -3px;
        gap: 2px;
      }
      .alerts.row,
      .covers.row {
        flex-direction: row-reverse;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 2px;
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
        align-items: end;
      }
      .name {
        font-weight: bold;
        margin-bottom: 8px;
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
      .v2 .covers {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .covers {
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
se([
  L({ attribute: !1 })
], X.prototype, "hass", 2);
se([
  L({ attribute: !1 })
], X.prototype, "layout", 2);
se([
  U()
], X.prototype, "_config", 2);
se([
  U()
], X.prototype, "_areas", 2);
se([
  U()
], X.prototype, "_devices", 2);
se([
  U()
], X.prototype, "_entities", 2);
se([
  U()
], X.prototype, "_showPopup", 2);
se([
  U()
], X.prototype, "selectedDomain", 2);
se([
  U()
], X.prototype, "selectedDeviceClass", 2);
X = se([
  ue("area-card-plus")
], X);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: zs } = Ii, Yt = () => document.createComment(""), Le = (t, e, i) => {
  var a;
  const s = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const n = s.insertBefore(Yt(), o), r = s.insertBefore(Yt(), o);
    i = new zs(n, r, t, t.options);
  } else {
    const n = i._$AB.nextSibling, r = i._$AM, c = r !== t;
    if (c) {
      let l;
      (a = i._$AQ) == null || a.call(i, t), i._$AM = t, i._$AP !== void 0 && (l = t._$AU) !== r._$AU && i._$AP(l);
    }
    if (n !== o || c) {
      let l = i._$AA;
      for (; l !== n; ) {
        const d = l.nextSibling;
        s.insertBefore(l, o), l = d;
      }
    }
  }
  return i;
}, _e = (t, e, i = t) => (t._$AI(e, i), t), Ms = {}, Ls = (t, e = Ms) => t._$AH = e, Ps = (t) => t._$AH, rt = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) s.set(t[o], o);
  return s;
}, Is = et(class extends tt {
  constructor(t) {
    if (super(t), t.type !== $t.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let s;
    i === void 0 ? i = e : e !== void 0 && (s = e);
    const o = [], a = [];
    let n = 0;
    for (const r of t) o[n] = s ? s(r, n) : n, a[n] = i(r, n), n++;
    return { values: a, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, s]) {
    const o = Ps(t), { values: a, keys: n } = this.dt(e, i, s);
    if (!Array.isArray(o)) return this.ut = n, a;
    const r = this.ut ?? (this.ut = []), c = [];
    let l, d, h = 0, p = o.length - 1, m = 0, y = a.length - 1;
    for (; h <= p && m <= y; ) if (o[h] === null) h++;
    else if (o[p] === null) p--;
    else if (r[h] === n[m]) c[m] = _e(o[h], a[m]), h++, m++;
    else if (r[p] === n[y]) c[y] = _e(o[p], a[y]), p--, y--;
    else if (r[h] === n[y]) c[y] = _e(o[h], a[y]), Le(t, c[y + 1], o[h]), h++, y--;
    else if (r[p] === n[m]) c[m] = _e(o[p], a[m]), Le(t, o[h], o[p]), p--, m++;
    else if (l === void 0 && (l = Qt(n, m, y), d = Qt(r, h, p)), l.has(r[h])) if (l.has(r[p])) {
      const A = d.get(n[m]), b = A !== void 0 ? o[A] : null;
      if (b === null) {
        const H = Le(t, o[h]);
        _e(H, a[m]), c[m] = H;
      } else c[m] = _e(b, a[m]), Le(t, o[h], b), o[A] = null;
      m++;
    } else rt(o[p]), p--;
    else rt(o[h]), h++;
    for (; m <= y; ) {
      const A = Le(t, c[y + 1]);
      _e(A, a[m]), c[m++] = A;
    }
    for (; h <= p; ) {
      const A = o[h++];
      A !== null && rt(A);
    }
    return this.ut = n, Ls(t, c), ie;
  }
});
var Ts = Object.defineProperty, Ns = Object.getOwnPropertyDescriptor, J = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ns(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Ts(e, i, o), o;
};
class Ae extends te {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    return this.hass ? D`
      <div class="customization">
        ${this.customization && Is(
      this.customization,
      (e) => this._getKey(e),
      (e, i) => D`
            <div class="customize-item">
              <ha-select
                label=${this.hass.localize(
        "ui.panel.lovelace.editor.features.edit"
      )}
                name="Customize"
                class="select-customization"
                naturalMenuWidth
                fixedMenuPosition
                .value=${e.type}
                @closed=${(s) => s.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${this.SelectOptions.map(
        (s) => D`<mwc-list-item .value=${s.value}
                      >${s.label}</mwc-list-item
                    >`
      )}
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${mi}
                class="remove-icon"
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${Es}
                class="edit-icon"
                .index=${i}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `
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
            @closed=${(e) => e.stopPropagation()}
            @click=${this._addRow}
          >
            ${this.SelectOptions.map(
      (e) => D`<mwc-list-item .value=${e.value}
                  >${e.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    ` : S;
  }
  _valueChanged(e) {
    if (!this.customization || !this.hass)
      return;
    const i = e.detail.value, s = e.target.index, o = this.customization.concat();
    o[s] = { ...o[s], type: i || "" }, G(this, this.customizationChangedEvent, o);
  }
  _removeRow(e) {
    e.stopPropagation();
    const i = e.currentTarget.index;
    if (i != null) {
      const s = this.customization.concat();
      s.splice(i, 1), G(
        this,
        this.customizationChangedEvent,
        s
      );
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const i = e.target.index;
    i != null && G(this, "edit-item", i);
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
    G(this, this.customizationChangedEvent, [
      ...this.customization,
      o
    ]), i.value = "";
  }
  static get styles() {
    return xe`
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
J([
  L({ attribute: !1 })
], Ae.prototype, "hass", 2);
J([
  L({ type: Array })
], Ae.prototype, "SelectOptions", 2);
let ut = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_domain;
  }
};
J([
  L({ attribute: !1 })
], ut.prototype, "customization_domain", 2);
ut = J([
  ue("domain-items-editor")
], ut);
let mt = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_alert;
  }
};
J([
  L({ attribute: !1 })
], mt.prototype, "customization_alert", 2);
mt = J([
  ue("alert-items-editor")
], mt);
let pt = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_cover;
  }
};
J([
  L({ attribute: !1 })
], pt.prototype, "customization_cover", 2);
pt = J([
  ue("cover-items-editor")
], pt);
let _t = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_sensor;
  }
};
J([
  L({ attribute: !1 })
], _t.prototype, "customization_sensor", 2);
_t = J([
  ue("sensor-items-editor")
], _t);
let ft = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_popup;
  }
};
J([
  L({ attribute: !1 })
], ft.prototype, "customization_popup", 2);
ft = J([
  ue("popup-items-editor")
], ft);
var js = Object.defineProperty, Rs = Object.getOwnPropertyDescriptor, De = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Rs(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && js(e, i, o), o;
};
let we = class extends te {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = P(() => {
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
      return ((i = this._config) == null ? void 0 : i.type) === "climate" && e.unshift({
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
      }), e;
    }), this._schemaalert = P(() => {
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
    }), this._schemasensor = P(() => {
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
      return D``;
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
    }
    const e = { ...this._config };
    return D`
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
    return xe`
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
De([
  L({ attribute: !1 })
], we.prototype, "config", 2);
De([
  L({ attribute: !1 })
], we.prototype, "hass", 2);
De([
  L({ type: Boolean })
], we.prototype, "useSensorSchema", 2);
De([
  U()
], we.prototype, "getSchema", 2);
De([
  U()
], we.prototype, "_config", 2);
we = De([
  ue("item-editor")
], we);
var Us = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, re = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Fs(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Us(e, i, o), o;
};
let Y = class extends te {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this.computeLabel = P((t) => pi(this.hass, t)), this._schema = P((t, e) => {
      const i = (a) => this.hass.localize(a) || a, s = [
        "more-info",
        "navigate",
        "url",
        "perform-action",
        "none"
      ], o = [
        {
          value: "icon",
          label: i("ui.panel.lovelace.editor.card.generic.icon")
        },
        {
          value: "image",
          label: i("ui.components.selectors.image.image")
        },
        {
          value: "icon + image",
          label: `${i(
            "ui.panel.lovelace.editor.card.generic.icon"
          )} & ${i("ui.components.selectors.image.image")}`
        }
      ];
      return [
        { name: "area", selector: { area: {} } },
        {
          name: "appearance",
          flatten: !0,
          type: "expandable",
          icon: "mdi:palette",
          schema: [
            { name: "theme", required: !1, selector: { theme: {} } },
            {
              name: "layout",
              required: !0,
              selector: {
                select: {
                  mode: "box",
                  options: ["vertical", "horizontal"].map((a) => ({
                    label: i(
                      `ui.panel.lovelace.editor.card.tile.content_layout_options.${a}`
                    ),
                    value: a
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
            ...e === "V2" ? [
              {
                name: "v2_color",
                selector: {
                  color_rgb: { default_color: "state", include_state: !0 }
                }
              }
            ] : [],
            { name: "mirrored", selector: { boolean: {} } },
            { name: "show_camera", required: !1, selector: { boolean: {} } },
            ...t ? [
              {
                name: "camera_view",
                selector: { select: { options: ["auto", "live"] } }
              }
            ] : [],
            {
              name: "show_icon",
              selector: { select: { options: o, mode: "dropdown" } }
            },
            { name: "area_icon", selector: { icon: {} } },
            {
              name: "area_icon_color",
              selector: {
                ui_color: { default_color: "state", include_state: !0 }
              }
            },
            { name: "area_name", selector: { text: {} } },
            {
              name: "area_name_color",
              selector: {
                ui_color: { default_color: "state", include_state: !0 }
              }
            },
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
    }), this._binaryschema = P((t) => [
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
    ]), this._coverschema = P((t) => [
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
    ]), this._sensorschema = P((t) => [
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
    ]), this._toggleschema = P((t) => [
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
    ]), this._popupschema = P(
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
    ), this._binaryClassesForArea = P(
      (t) => this._classesForArea(t, "binary_sensor")
    ), this._coverClassesForArea = P(
      (t) => this._classesForArea(t, "cover")
    ), this._sensorClassesForArea = P(
      (t, e) => this._classesForArea(t, "sensor", e)
    ), this._toggleDomainsForArea = P(
      (t) => this._classesForArea(t, "toggle")
    ), this._allDomainsForArea = P(
      (t) => this._classesForArea(t, "all")
    ), this._buildBinaryOptions = P(
      (t, e) => this._buildOptions("binary_sensor", t, e)
    ), this._buildCoverOptions = P(
      (t, e) => this._buildOptions("cover", t, e)
    ), this._buildSensorOptions = P(
      (t, e) => this._buildOptions("sensor", t, e)
    ), this._buildToggleOptions = P(
      (t, e) => this._buildOptions("toggle", t, e)
    ), this._buildAllOptions = P(
      (t, e) => this._buildOptions("all", t, e)
    ), this._entityOptions = [], this._toggleEntityHidden = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.hidden_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        hidden_entities: i
      }, G(this, "config-changed", { config: { ...this._config } });
    };
  }
  async firstUpdated() {
    var t, e;
    (!customElements.get("ha-form") || !customElements.get("hui-action-editor")) && ((t = customElements.get("hui-button-card")) == null || t.getConfigElement()), customElements.get("ha-entity-picker") || (e = customElements.get("hui-entities-card")) == null || e.getConfigElement();
  }
  _classesForArea(t, e, i) {
    var o;
    let s;
    if (e === "toggle")
      return s = Object.values(this.hass.entities).filter(
        (a) => {
          var n;
          return (Te.includes(B(a.entity_id)) || ct.includes(B(a.entity_id))) && !a.hidden && (a.area_id === t || a.device_id && ((n = this.hass.devices[a.device_id]) == null ? void 0 : n.area_id) === t);
        }
      ), [...new Set(s.map((a) => B(a.entity_id)))];
    if (e === "all") {
      const a = ((o = this._config) == null ? void 0 : o.extra_entities) || [];
      let n = Object.values(this.hass.entities).filter(
        (c) => {
          var l;
          return !c.hidden && (c.area_id === t || c.device_id && ((l = this.hass.devices[c.device_id]) == null ? void 0 : l.area_id) === t);
        }
      );
      const r = a.map((c) => this.hass.states[c]).filter((c) => c !== void 0);
      return n = [...n, ...r], [...new Set(n.map((c) => B(c.entity_id)))];
    } else {
      s = Object.values(this.hass.entities).filter(
        (n) => {
          var r;
          return B(n.entity_id) === e && !n.entity_category && !n.hidden && (n.area_id === t || n.device_id && ((r = this.hass.devices[n.device_id]) == null ? void 0 : r.area_id) === t);
        }
      );
      const a = s.map(
        (n) => {
          var r;
          return ((r = this.hass.states[n.entity_id]) == null ? void 0 : r.attributes.device_class) || "";
        }
      ).filter(
        (n) => n && (e !== "sensor" || !i || i.includes(n))
      );
      return [...new Set(a)];
    }
  }
  _buildOptions(t, e, i) {
    const o = [.../* @__PURE__ */ new Set([...e, ...i])].map((a) => ({
      value: a,
      label: a === "scene" ? "Scene" : t === "toggle" || t === "all" ? this.hass.localize(
        `component.${a}.entity_component._.name`
      ) || a : this.hass.localize(
        `component.${t}.entity_component.${a}.name`
      ) || a
    }));
    return o.sort(
      (a, n) => li(a.label, n.label, this.hass.locale.language)
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
      customization_sensor: t.customization_sensor || []
    };
  }
  async updated(t) {
    var e;
    if (super.updated(t), !(!this.hass || !this._config)) {
      if (t.has("_config")) {
        const i = t.get("_config"), s = i == null ? void 0 : i.area, o = this._config.area, a = (i == null ? void 0 : i.extra_entities) || [], n = this._config.extra_entities || [], r = (i == null ? void 0 : i.popup_domains) || [], c = ((e = this._config) == null ? void 0 : e.popup_domains) || [], l = a.length !== n.length || !a.every(
          (h) => n.includes(h)
        ), d = r.length !== c.length || !r.every(
          (h) => c.includes(h)
        );
        if (s !== void 0 && s !== o) {
          const h = this._toggleDomainsForArea(o), p = this._binaryClassesForArea(o), m = this._coverClassesForArea(o), y = this._allDomainsForArea(o), A = h.sort(
            (H, R) => Te.indexOf(H) - Te.indexOf(R)
          ), b = y.sort(
            (H, R) => lt.indexOf(H) - lt.indexOf(R)
          );
          if (this._config.toggle_domains = [
            ...A.filter((H) => H !== "scene" && H !== "script")
          ], this._config.alert_classes = [...p], this._config.cover_classes = [...m], this._config.popup_domains = [...b], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
            const H = this._config.hidden_entities, R = Object.values(this._hiddenEntitiesByDomain()).flat(), F = H.filter((k) => R.includes(k));
            F.length !== H.length && (this._config = {
              ...this._config || {},
              hidden_entities: F
            }, G(this, "config-changed", { config: { ...this._config } }));
          }
          this.requestUpdate();
        }
        if (l) {
          for (const h of n) {
            const p = B(h);
            this._config.popup_domains.includes(p) || this._config.popup_domains.push(p);
          }
          this.requestUpdate();
        }
        d && this._updateEntityOptions();
      }
      if (!this._numericDeviceClasses) {
        const { numeric_device_classes: i } = await rs(this.hass);
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
        return !i.hidden && e.includes(B(i.entity_id)) && (i.area_id === t || i.device_id && ((s = this.hass.devices[i.device_id]) == null ? void 0 : s.area_id) === t);
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
  _hiddenCategoryChanged(t) {
    var i, s;
    const e = (s = (i = t.detail) == null ? void 0 : i.value) == null ? void 0 : s.category_filter;
    this._config = {
      ...this._config || {},
      category_filter: e
    }, G(this, "config-changed", { config: { ...this._config } });
  }
  _editItem(t, e) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const i = t.detail;
    this[`_subElementEditor${e}`] = { index: i };
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
    t.stopPropagation(), !(!this._config || !this.hass) && G(this, "config-changed", {
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
  _renderSubElementEditor(t, e, i) {
    var d, h, p;
    const s = `customization_${t}`, o = (d = this._config) == null ? void 0 : d[s], a = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, n = ((h = this[a]) == null ? void 0 : h.index) ?? 0, r = ((p = o == null ? void 0 : o[n]) == null ? void 0 : p.type) ?? "unknown", c = r.match(/^(.+?)\s*-\s*(.+)$/);
    let l;
    if (c) {
      const m = c[1].toLowerCase().replace(" ", "_"), y = c[2].toLowerCase(), A = this.hass.localize(`component.${m}.entity_component._.name`) || c[1];
      let b = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${m}.${y}`
      ) || c[2];
      b = b.charAt(0).toUpperCase() + b.slice(1), l = `${A} – ${b}`;
    } else {
      let m = this.hass.localize(`component.${r}.entity_component._.name`) || r;
      m = m.charAt(0).toUpperCase() + m.slice(1), l = m;
    }
    return D`
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
        .config=${(o == null ? void 0 : o[n]) || {}}
        .getSchema=${t}
        @config-changed=${i}
      ></item-editor>
    `;
  }
  _renderSubElementEditorDomain() {
    return this._renderSubElementEditor(
      "domain",
      this._goBackDomain,
      this._itemChangedDomain
    );
  }
  _renderSubElementEditorAlert() {
    return this._renderSubElementEditor(
      "alert",
      this._goBackAlert,
      this._itemChangedAlert
    );
  }
  _renderSubElementEditorCover() {
    return this._renderSubElementEditor(
      "cover",
      this._goBackCover,
      this._itemChangedCover
    );
  }
  _renderSubElementEditorSensor() {
    return this._renderSubElementEditor(
      "sensor",
      this._goBackSensor,
      this._itemChangedSensor
    );
  }
  _goBackDomain() {
    this._subElementEditorDomain = void 0;
  }
  _goBackAlert() {
    this._subElementEditorAlert = void 0;
  }
  _goBackCover() {
    this._subElementEditorCover = void 0;
  }
  _goBackSensor() {
    this._subElementEditorSensor = void 0;
  }
  _itemChanged(t, e, i) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const s = e == null ? void 0 : e.index;
    if (s != null) {
      const o = [...this._config[i]];
      o[s] = t.detail, G(this, "config-changed", {
        config: { ...this._config, [i]: o }
      });
    }
  }
  _itemChangedDomain(t) {
    this._itemChanged(t, this._subElementEditorDomain, "customization_domain");
  }
  _itemChangedAlert(t) {
    this._itemChanged(t, this._subElementEditorAlert, "customization_alert");
  }
  _itemChangedCover(t) {
    this._itemChanged(t, this._subElementEditorCover, "customization_cover");
  }
  _itemChangedSensor(t) {
    this._itemChanged(t, this._subElementEditorSensor, "customization_sensor");
  }
  get toggleSelectOptions() {
    var t;
    return this._buildToggleOptions(
      this._toggleDomainsForArea(this._config.area || ""),
      ((t = this._config) == null ? void 0 : t.toggle_domains) || this._toggleDomainsForArea(this._config.area || "")
    );
  }
  get AllSelectOptions() {
    var t;
    return this._buildAllOptions(
      this._allDomainsForArea(this._config.area || ""),
      ((t = this._config) == null ? void 0 : t.popup_domains) || this._allDomainsForArea(this._config.area || "")
    );
  }
  get binarySelectOptions() {
    var t;
    return this._buildBinaryOptions(
      this._binaryClassesForArea(this._config.area || ""),
      ((t = this._config) == null ? void 0 : t.alert_classes) || this._binaryClassesForArea(this._config.area || "")
    );
  }
  get coverSelectOptions() {
    var t;
    return this._buildCoverOptions(
      this._coverClassesForArea(this._config.area || ""),
      ((t = this._config) == null ? void 0 : t.cover_classes) || this._coverClassesForArea(this._config.area || "")
    );
  }
  get sensorSelectOptions() {
    var t;
    return this._buildSensorOptions(
      this._sensorClassesForArea(this._config.area || ""),
      ((t = this._config) == null ? void 0 : t.sensor_classes) || this._sensorClassesForArea(this._config.area || "")
    );
  }
  get entityOptions() {
    return this._entityOptions;
  }
  _domainIcon(t, e = "on", i) {
    const s = ht;
    if (t in s) {
      const o = s[t];
      return typeof o == "string" ? o : i && o[i] ? o[i][e === "off" ? "off" : "on"] || o[i] : o[e === "off" ? "off" : "on"] || Object.values(o)[0];
    }
    return "mdi:help-circle";
  }
  _groupAllEntitiesByDomain() {
    var n;
    const t = {}, e = (this.entityOptions || []).map((r) => r.value);
    for (const r of e) {
      const c = B(r);
      t[c] || (t[c] = []), t[c].push(r);
    }
    const i = this._hiddenEntitiesByDomain(), s = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])
    ), o = ((n = this.hass) == null ? void 0 : n.states) || {}, a = this.compareByFriendlyName ? this.compareByFriendlyName(o, this.hass.locale.language) : (r, c) => r.localeCompare(c);
    return s.sort((r, c) => r.localeCompare(c)).map((r) => {
      const c = /* @__PURE__ */ new Set([
        ...t[r] || [],
        ...i[r] || []
      ]);
      return { domain: r, entities: Array.from(c).sort(a) };
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
    var n, r, c;
    const i = ((n = this.hass) == null ? void 0 : n.states) || {}, s = {};
    for (const l of e) {
      const d = ((c = (r = i[l]) == null ? void 0 : r.attributes) == null ? void 0 : c.device_class) || "";
      d && (s[d] || (s[d] = []), s[d].push(l));
    }
    const o = this.compareByFriendlyName ? this.compareByFriendlyName(i, this.hass.locale.language) : (l, d) => l.localeCompare(d);
    return Object.keys(s).sort((l, d) => l.localeCompare(d)).map((l) => ({
      deviceClass: l,
      label: this._getDeviceClassLabel(t, l),
      entities: s[l].slice().sort(o)
    }));
  }
  _hiddenEntitiesByDomain() {
    var h, p, m, y, A, b, H;
    const t = {}, e = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const i = ((p = this.hass) == null ? void 0 : p.entities) || {}, s = ((m = this.hass) == null ? void 0 : m.devices) || {}, o = (y = this.hass) != null && y.areas ? Object.values(this.hass.areas) : [], a = (A = this._config) == null ? void 0 : A.area, n = (b = this._config) == null ? void 0 : b.floor, r = (H = this._config) == null ? void 0 : H.label, c = a ? Array.isArray(a) ? a : [a] : [], l = n ? Array.isArray(n) ? n : [n] : [], d = r ? Array.isArray(r) ? r : [r] : [];
    for (const R of e) {
      const F = B(R), k = i[R], N = k != null && k.device_id ? s[k.device_id] : void 0;
      if (((k == null ? void 0 : k.area_id) != null || (N == null ? void 0 : N.area_id) != null) && !(d.length && !(Array.isArray(k == null ? void 0 : k.labels) && k.labels.some((I) => d.includes(I)) || Array.isArray(N == null ? void 0 : N.labels) && N.labels.some((I) => d.includes(I)))) && !(c.length && !(k != null && k.area_id && c.includes(k.area_id) || N != null && N.area_id && c.includes(N.area_id)))) {
        if (l.length) {
          const Z = (k == null ? void 0 : k.area_id) && o.some(
            (W) => W.area_id === k.area_id && W.floor_id && l.includes(W.floor_id)
          ), I = (N == null ? void 0 : N.area_id) && o.some(
            (W) => W.area_id === N.area_id && W.floor_id && l.includes(W.floor_id)
          );
          if (!Z && !I) continue;
        }
        t[F] || (t[F] = []), t[F].push(R);
      }
    }
    return t;
  }
  render() {
    var h;
    if (!this.hass || !this._config)
      return S;
    const t = this._toggleDomainsForArea(
      this._config.area || ""
    ), e = this._binaryClassesForArea(
      this._config.area || ""
    ), i = this._coverClassesForArea(
      this._config.area || ""
    ), s = this._allDomainsForArea(this._config.area || ""), o = this._schema(
      this._config.show_camera || !1,
      this._config.design || "V1"
    ), a = this._binaryschema(this.binarySelectOptions), n = this._coverschema(this.coverSelectOptions), r = this._sensorschema(this.sensorSelectOptions), c = this._toggleschema(this.toggleSelectOptions), l = this._popupschema(
      this.AllSelectOptions,
      this.entityOptions
    ), d = {
      alert_classes: e,
      cover_classes: i,
      sensor_classes: dt.sensor,
      toggle_domains: t,
      popup_domains: s,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorDomain() : this._subElementEditorAlert ? this._renderSubElementEditorAlert() : this._subElementEditorCover ? this._renderSubElementEditorCover() : this._subElementEditorSensor ? this._renderSubElementEditorSensor() : D`
      <ha-form
        .hass=${this.hass}
        .data=${d}
        .schema=${o}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${$s}></ha-svg-icon>
          ${this.computeLabel({ name: "alert_classes" })}
        </div>
            .schema=${a}
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
          <ha-svg-icon .path=${Cs}></ha-svg-icon>
          ${this.computeLabel({ name: "cover_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
            .schema=${n}
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
          <ha-svg-icon .path=${ws}></ha-svg-icon>
          ${this.computeLabel({ name: "sensor_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
            .schema=${r}
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
          <ha-svg-icon .path=${As}></ha-svg-icon>
          ${this.computeLabel({ name: "toggle_domains" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
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

      <ha-expansion-panel outlined class="main" .name="popup">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${xs}></ha-svg-icon>
          ${this.computeLabel({ name: "popup" })}
        </div>
        <div class="content">
          <ha-form             
            .hass=${this.hass}
            .data=${d}
            .schema=${l}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <ha-expansion-panel outlined class="main">
          <div slot="header" role="heading" aria-level="3">
            <ha-svg-icon .path=${at}></ha-svg-icon>
            ${this.computeLabel({ name: "hidden_entities" })}
          </div>
          <div class="content">
            <!-- Category filter selector for hidden entities -->
            <ha-form
              .hass=${this.hass}
              .data=${{ category_filter: (h = this._config) == null ? void 0 : h.category_filter }}
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
              @value-changed=${(p) => this._hiddenCategoryChanged(p)}
            ></ha-form>
            ${this._groupAllEntitiesByDomain().map(
      (p) => D`
                <ha-expansion-panel outlined class="domain-panel">
                  <div slot="header" class="domain-header">
                    <ha-icon
                      .icon=${this._domainIcon(p.domain, "on")}
                    ></ha-icon>
                    <span class="domain-title"
                      >${this._domainLabel(p.domain)}</span
                    >
                  </div>
                  <div class="content">
                    ${["binary_sensor", "cover"].includes(p.domain) ? this._groupByDeviceClass(
        p.domain,
        p.entities
      ).map(
        (m) => D`
                            <ha-expansion-panel outlined class="domain-panel">
                              <div slot="header" class="dc-header">
                                <ha-icon
                                  .icon=${this._domainIcon(
          p.domain,
          "on",
          m.deviceClass
        )}
                                ></ha-icon>
                                <span class="dc-title">${m.label}</span>
                              </div>
                              <div class="content">
                                ${m.entities.map(
          (y) => {
            var A, b;
            return D`
                                    <div class="entity-row">
                                      <span class="entity-name">
                                        ${((b = (A = this.hass.states[y]) == null ? void 0 : A.attributes) == null ? void 0 : b.friendly_name) || y}
                                      </span>
                                      <ha-icon-button
                                        .path=${this._isHiddenEntity(y) ? Jt : at}
                                        .label=${this._isHiddenEntity(y) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                        @click=${() => this._toggleEntityHidden(y)}
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
          var y, A;
          return D`
                            <div class="entity-row">
                              <span class="entity-name">
                                ${((A = (y = this.hass.states[m]) == null ? void 0 : y.attributes) == null ? void 0 : A.friendly_name) || m}
                              </span>
                              <ha-icon-button
                                .path=${this._isHiddenEntity(m) ? Jt : at}
                                .label=${this._isHiddenEntity(m) ? this.hass.localize("ui.common.show") ?? "Show" : this.hass.localize("ui.common.hide") ?? "Hide"}
                                @click=${() => this._toggleEntityHidden(m)}
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
    `;
  }
};
Y.styles = xe`
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
      margin-top: 24px;
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
      margin: 12px 0;
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
re([
  L({ attribute: !1 })
], Y.prototype, "hass", 2);
re([
  U()
], Y.prototype, "_config", 2);
re([
  U()
], Y.prototype, "_entities", 2);
re([
  U()
], Y.prototype, "_numericDeviceClasses", 2);
re([
  U()
], Y.prototype, "_subElementEditorDomain", 2);
re([
  U()
], Y.prototype, "_subElementEditorAlert", 2);
re([
  U()
], Y.prototype, "_subElementEditorCover", 2);
re([
  U()
], Y.prototype, "_subElementEditorSensor", 2);
Y = re([
  ue("area-card-plus-editor")
], Y);
console.info(
  `%c AREA-CARD %c ${gi.version} `,
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
