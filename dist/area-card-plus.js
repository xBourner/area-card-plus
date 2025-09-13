const yi = "b1.0", bi = {
  version: yi
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = globalThis, bt = Ge.ShadowRoot && (Ge.ShadyCSS === void 0 || Ge.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = Symbol(), Pt = /* @__PURE__ */ new WeakMap();
let oi = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== $t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (bt && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Pt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Pt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const $i = (t) => new oi(typeof t == "string" ? t : t + "", void 0, $t), xe = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1]), t[0]);
  return new oi(i, t, $t);
}, wi = (t, e) => {
  if (bt) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), o = Ge.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, Lt = bt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return $i(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ai, defineProperty: Ci, getOwnPropertyDescriptor: Ei, getOwnPropertyNames: xi, getOwnPropertySymbols: Si, getPrototypeOf: Di } = Object, de = globalThis, Tt = de.trustedTypes, Oi = Tt ? Tt.emptyScript : "", nt = de.reactiveElementPolyfillSupport, Ne = (t, e) => t, Qe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Oi : null;
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
} }, wt = (t, e) => !Ai(t, e), It = { attribute: !0, type: String, converter: Qe, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), de.litPropertyMetadata ?? (de.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ce = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = It) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && Ci(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = Ei(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: o, set(a) {
      const r = o == null ? void 0 : o.call(this);
      n == null || n.call(this, a), this.requestUpdate(e, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? It;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ne("elementProperties"))) return;
    const e = Di(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ne("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ne("properties"))) {
      const i = this.properties, s = [...xi(i), ...Si(i)];
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
      for (const o of s) i.unshift(Lt(o));
    } else e !== void 0 && i.push(Lt(e));
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
    return wi(e, this.constructor.elementStyles), e;
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
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : Qe).toAttribute(i, s.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n, a;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((n = r.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? r.converter : Qe;
      this._$Em = o;
      const l = c.fromAttribute(i, r.type);
      this[o] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    var o;
    if (e !== void 0) {
      const n = this.constructor, a = this[e];
      if (s ?? (s = n.getPropertyOptions(e)), !((s.hasChanged ?? wt)(a, i) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: n }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, a] of o) {
        const { wrapped: r } = a, c = this[n];
        r !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, a, c);
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
Ce.elementStyles = [], Ce.shadowRootOptions = { mode: "open" }, Ce[Ne("elementProperties")] = /* @__PURE__ */ new Map(), Ce[Ne("finalized")] = /* @__PURE__ */ new Map(), nt == null || nt({ ReactiveElement: Ce }), (de.reactiveElementVersions ?? (de.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = globalThis, et = je.trustedTypes, Nt = et ? et.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ni = "$lit$", le = `lit$${Math.random().toFixed(9).slice(2)}$`, ai = "?" + le, ki = `<${ai}>`, $e = document, Ue = () => $e.createComment(""), Fe = (t) => t === null || typeof t != "object" && typeof t != "function", At = Array.isArray, Hi = (t) => At(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", at = `[ 	
\f\r]`, Le = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, jt = /-->/g, Rt = />/g, pe = RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ut = /'/g, Ft = /"/g, ri = /^(?:script|style|textarea|title)$/i, zi = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), S = zi(1), ie = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), Bt = /* @__PURE__ */ new WeakMap(), ge = $e.createTreeWalker($e, 129);
function ci(t, e) {
  if (!At(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Nt !== void 0 ? Nt.createHTML(e) : e;
}
const Mi = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Le;
  for (let r = 0; r < i; r++) {
    const c = t[r];
    let l, d, h = -1, p = 0;
    for (; p < c.length && (a.lastIndex = p, d = a.exec(c), d !== null); ) p = a.lastIndex, a === Le ? d[1] === "!--" ? a = jt : d[1] !== void 0 ? a = Rt : d[2] !== void 0 ? (ri.test(d[2]) && (o = RegExp("</" + d[2], "g")), a = pe) : d[3] !== void 0 && (a = pe) : a === pe ? d[0] === ">" ? (a = o ?? Le, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? pe : d[3] === '"' ? Ft : Ut) : a === Ft || a === Ut ? a = pe : a === jt || a === Rt ? a = Le : (a = pe, o = void 0);
    const m = a === pe && t[r + 1].startsWith("/>") ? " " : "";
    n += a === Le ? c + ki : h >= 0 ? (s.push(l), c.slice(0, h) + ni + c.slice(h) + le + m) : c + le + (h === -2 ? r : m);
  }
  return [ci(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Be {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const r = e.length - 1, c = this.parts, [l, d] = Mi(e, i);
    if (this.el = Be.createElement(l, s), ge.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = ge.nextNode()) !== null && c.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(ni)) {
          const p = d[a++], m = o.getAttribute(h).split(le), b = /([.?@])?(.*)/.exec(p);
          c.push({ type: 1, index: n, name: b[2], strings: m, ctor: b[1] === "." ? Li : b[1] === "?" ? Ti : b[1] === "@" ? Ii : it }), o.removeAttribute(h);
        } else h.startsWith(le) && (c.push({ type: 6, index: n }), o.removeAttribute(h));
        if (ri.test(o.tagName)) {
          const h = o.textContent.split(le), p = h.length - 1;
          if (p > 0) {
            o.textContent = et ? et.emptyScript : "";
            for (let m = 0; m < p; m++) o.append(h[m], Ue()), ge.nextNode(), c.push({ type: 2, index: ++n });
            o.append(h[p], Ue());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ai) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(le, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += le.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = $e.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Ee(t, e, i = t, s) {
  var a, r;
  if (e === ie) return e;
  let o = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const n = Fe(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = Ee(t, o._$AS(t, e.values), o, s)), e;
}
let Pi = class {
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
    let n = ge.nextNode(), a = 0, r = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new Se(n, n.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (l = new Ni(n, this, e)), this._$AV.push(l), c = s[++r];
      }
      a !== (c == null ? void 0 : c.index) && (n = ge.nextNode(), a++);
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
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = Ee(this, e, i), Fe(e) ? e === E || e == null || e === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : e !== this._$AH && e !== ie && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Hi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== E && Fe(this._$AH) ? this._$AA.nextSibling.data = e : this.T($e.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Be.createElement(ci(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const a = new Pi(o, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Bt.get(e.strings);
    return i === void 0 && Bt.set(e.strings, i = new Be(e)), i;
  }
  k(e) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new Se(this.O(Ue()), this.O(Ue()), this, this.options)) : s = i[o], s._$AI(n), o++;
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
class it {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = E;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = Ee(this, e, i, 0), a = !Fe(e) || e !== this._$AH && e !== ie, a && (this._$AH = e);
    else {
      const r = e;
      let c, l;
      for (e = n[0], c = 0; c < n.length - 1; c++) l = Ee(this, r[s + c], i, c), l === ie && (l = this._$AH[c]), a || (a = !Fe(l) || l !== this._$AH[c]), l === E ? e = E : e !== E && (e += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
let Li = class extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === E ? void 0 : e;
  }
};
class Ti extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== E);
  }
}
class Ii extends it {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Ee(this, e, i, 0) ?? E) === ie) return;
    const s = this._$AH, o = e === E && s !== E || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== E && (s === E || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ni {
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
const ji = { I: Se }, rt = je.litHtmlPolyfillSupport;
rt == null || rt(Be, Se), (je.litHtmlVersions ?? (je.litHtmlVersions = [])).push("3.3.1");
const Ri = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new Se(e.insertBefore(Ue(), n), n, void 0, i ?? {});
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ri(i, this.renderRoot, this.renderOptions);
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
var si;
te._$litElement$ = !0, te.finalized = !0, (si = ye.litElementHydrateSupport) == null || si.call(ye, { LitElement: te });
const ct = ye.litElementPolyfillSupport;
ct == null || ct({ LitElement: te });
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
const Ui = { attribute: !0, type: String, converter: Qe, reflect: !1, hasChanged: wt }, Fi = (t = Ui, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const c = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(a, c, t);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, t, r), r;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(r) {
      const c = this[a];
      e.call(this, r), this.requestUpdate(a, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function z(t) {
  return (e, i) => typeof i == "object" ? Fi(t, e, i) : ((s, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(t) {
  return z({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = { ATTRIBUTE: 1, CHILD: 2 }, st = (t) => (...e) => ({ _$litDirective$: t, values: e });
let ot = class {
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
const ne = st(class extends ot {
  constructor(t) {
    var e;
    if (super(t), t.type !== Ct.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
      const a = !!e[n];
      a === this.st.has(n) || (o = this.nt) != null && o.has(n) || (a ? (i.add(n), this.st.add(n)) : (i.remove(n), this.st.delete(n)));
    }
    return ie;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const li = "important", Bi = " !" + li, Ve = st(class extends ot {
  constructor(t) {
    var e;
    if (super(t), t.type !== Ct.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const n = typeof o == "string" && o.endsWith(Bi);
        s.includes("-") || n ? i.setProperty(s, n ? o.slice(0, -11) : o, n ? li : "") : i[s] = o;
      }
    }
    return ie;
  }
});
var Vt = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function Vi(t, e) {
  return !!(t === e || Vt(t) && Vt(e));
}
function qi(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!Vi(t[i], e[i]))
      return !1;
  return !0;
}
function L(t, e) {
  e === void 0 && (e = qi);
  var i = null;
  function s() {
    for (var o = [], n = 0; n < arguments.length; n++)
      o[n] = arguments[n];
    if (i && i.lastThis === this && e(o, i.lastArgs))
      return i.lastResult;
    var a = t.apply(this, o);
    return i = {
      lastResult: a,
      lastArgs: o,
      lastThis: this
    }, a;
  }
  return s.clear = function() {
    i = null;
  }, s;
}
var ve, qt;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})(ve || (ve = {})), (function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
})(qt || (qt = {}));
function di() {
  return (di = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
    }
    return t;
  }).apply(this, arguments);
}
function V(t) {
  return t.substr(0, t.indexOf("."));
}
var Wi = function(t) {
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
}, Ki = function(t, e) {
  return e === void 0 && (e = 2), Math.round(t * Math.pow(10, e)) / Math.pow(10, e);
}, Wt = function(t, e, i) {
  var s = e ? Wi(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(n) {
    return typeof n == "number" && o(n);
  }, (e == null ? void 0 : e.number_format) !== ve.none && !Number.isNaN(Number(t)) && Intl) try {
    return new Intl.NumberFormat(s, Kt(t, i)).format(Number(t));
  } catch (o) {
    return console.error(o), new Intl.NumberFormat(void 0, Kt(t, i)).format(Number(t));
  }
  return typeof t == "string" ? t : Ki(t, i == null ? void 0 : i.maximumFractionDigits).toString() + ((i == null ? void 0 : i.style) === "currency" ? " " + i.currency : "");
}, Kt = function(t, e) {
  var i = di({ maximumFractionDigits: 2 }, e);
  if (typeof t != "string") return i;
  if (!e || !e.minimumFractionDigits && !e.maximumFractionDigits) {
    var s = t.indexOf(".") > -1 ? t.split(".")[1].length : 0;
    i.minimumFractionDigits = s, i.maximumFractionDigits = s;
  }
  return i;
}, Gi = ["closed", "locked", "off"], tt = function(t, e, i, s) {
  s = s || {}, i = i ?? {};
  var o = new Event(e, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return o.detail = i, t.dispatchEvent(o), o;
}, Et = function(t, e, i) {
  var s;
  return function() {
    var o = [].slice.call(arguments), n = this, a = function() {
      s = null;
    }, r = !s;
    clearTimeout(s), s = setTimeout(a, e), r && t.apply(n, o);
  };
}, qe = function(t) {
  tt(window, "haptic", t);
}, Zi = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), tt(window, "location-changed", { replace: i });
}, Ji = function(t, e, i) {
  i === void 0 && (i = !0);
  var s, o = V(e), n = o === "group" ? "homeassistant" : o;
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
  return t.callService(n, s, { entity_id: e });
}, Xi = function(t, e) {
  var i = Gi.includes(t.states[e].state);
  return Ji(t, e, i);
}, Yi = function(t, e, i, s) {
  if (s || (s = { action: "more-info" }), !s.confirmation || s.confirmation.exemptions && s.confirmation.exemptions.some(function(n) {
    return n.user === e.user.id;
  }) || (qe("warning"), confirm(s.confirmation.text || "Are you sure you want to " + s.action + "?"))) switch (s.action) {
    case "more-info":
      (i.entity || i.camera_image) && tt(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      s.navigation_path && Zi(0, s.navigation_path);
      break;
    case "url":
      s.url_path && window.open(s.url_path);
      break;
    case "toggle":
      i.entity && (Xi(e, i.entity), qe("success"));
      break;
    case "call-service":
      if (!s.service) return void qe("failure");
      var o = s.service.split(".", 2);
      e.callService(o[0], o[1], s.service_data, s.target), qe("success");
      break;
    case "fire-dom-event":
      tt(t, "ll-custom", s);
  }
}, Te = function(t, e, i, s) {
  var o;
  s === "double_tap" && i.double_tap_action ? o = i.double_tap_action : s === "hold" && i.hold_action ? o = i.hold_action : s === "tap" && i.tap_action && (o = i.tap_action), Yi(t, e, i, o);
};
function q(t) {
  return t !== void 0 && t.action !== "none";
}
const Qi = (t) => {
  let e = [];
  function i(o) {
    let n = [];
    for (let a = 0; a < e.length; a++)
      e[a] === o ? o = null : n.push(e[a]);
    e = n;
  }
  function s(o, n) {
    t = n ? o : Object.assign(Object.assign({}, t), o);
    let a = e;
    for (let r = 0; r < a.length; r++)
      a[r](t);
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
      function n(a) {
        s(a, !1);
      }
      return function() {
        let a = [t];
        for (let c = 0; c < arguments.length; c++)
          a.push(arguments[c]);
        let r = o.apply(this, a);
        if (r != null)
          return r instanceof Promise ? r.then(n) : n(r);
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
}, es = 5e3, ts = (t, e, i, s, o = { unsubGrace: !0 }) => {
  if (t[e])
    return t[e];
  let n = 0, a, r, c = Qi();
  const l = () => {
    if (!i)
      throw new Error("Collection does not support refresh");
    return i(t).then((w) => c.setState(w, !0));
  }, d = () => l().catch((w) => {
    if (t.connected)
      throw w;
  }), h = () => {
    if (r !== void 0) {
      clearTimeout(r), r = void 0;
      return;
    }
    s && (a = s(t, c)), i && (t.addEventListener("ready", d), d()), t.addEventListener("disconnected", b);
  }, p = () => {
    r = void 0, a && a.then((w) => {
      w();
    }), c.clearState(), t.removeEventListener("ready", l), t.removeEventListener("disconnected", b);
  }, m = () => {
    r = setTimeout(p, es);
  }, b = () => {
    r && (clearTimeout(r), p());
  };
  return t[e] = {
    get state() {
      return c.state;
    },
    refresh: l,
    subscribe(w) {
      n++, n === 1 && h();
      const $ = c.subscribe(w);
      return c.state !== void 0 && setTimeout(() => w(c.state), 0), () => {
        $(), n--, n || (o.unsubGrace ? m() : p());
      };
    }
  }, t[e];
}, xt = (t, e, i, s, o) => ts(s, t, e, i).subscribe(o);
var is = Object.defineProperty, ss = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && is(e, i, o), o;
};
const os = (t) => ns(t.attributes), ns = (t, e) => !!t.unit_of_measurement || !!t.state_class || [].includes(t.device_class || ""), Gt = (t, e) => t === "°" ? "" : e && t === "%" ? as(e) : " ", as = (t) => {
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
}, rs = L(
  (t) => new Intl.Collator(t)
), cs = L(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), hi = (t, e) => t < e ? -1 : t > e ? 1 : 0, ls = (t, e, i = void 0) => Intl != null && Intl.Collator ? rs(i).compare(t, e) : hi(t, e), ui = (t, e, i = void 0) => Intl != null && Intl.Collator ? cs(i).compare(t, e) : hi(t.toLowerCase(), e.toLowerCase());
let We;
const ds = async (t) => We || (We = t.callWS({
  type: "sensor/numeric_device_classes"
}), We), mi = (t) => t.sendMessagePromise({
  type: "config/area_registry/list"
}).then(
  (e) => e.sort((i, s) => ls(i.name, s.name))
), hs = (t, e) => t.subscribeEvents(
  Et(
    () => mi(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "area_registry_updated"
), Zt = (t, e) => xt(
  "_areaRegistry",
  mi,
  hs,
  t,
  e
), pi = (t) => t.sendMessagePromise({
  type: "config/device_registry/list"
}), us = (t, e) => t.subscribeEvents(
  Et(
    () => pi(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "device_registry_updated"
), ms = (t, e) => xt(
  "_dr",
  pi,
  us,
  t,
  e
), fi = (t) => t.sendMessagePromise({
  type: "config/entity_registry/list"
}), ps = (t, e) => t.subscribeEvents(
  Et(
    () => fi(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "entity_registry_updated"
), fs = (t, e) => xt(
  "_entityRegistry",
  fi,
  ps,
  t,
  e
), _s = async (t, e) => new Promise((i) => {
  const s = e(t, (o) => {
    s(), i(o);
  });
}), gs = (t) => {
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
  return ss([
    z({ attribute: !1 })
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
class vs extends HTMLElement {
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
    e.actionHandler && Ze(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
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
customElements.define("action-handler-area-card", vs);
const ys = () => {
  const t = document.body;
  if (t.querySelector("action-handler-area-card"))
    return t.querySelector("action-handler-area-card");
  const e = document.createElement("action-handler-area-card");
  return t.appendChild(e), e;
}, bs = (t, e) => {
  const i = ys();
  i && i.bind(t, e);
}, ce = st(
  class extends ot {
    update(t, [e]) {
      return bs(t.element, e), ie;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    render(t) {
    }
  }
), Ze = (t, e) => {
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
        if (!Ze(t[i], e[i]))
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
        if (!Ze(i[1], e.get(i[0])))
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
      if (!Ze(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}, Ke = (t) => {
  const e = parseFloat(t);
  if (isNaN(e))
    throw new Error(`${t} is not a number`);
  return e;
};
function Jt(t) {
  if (!t)
    return null;
  try {
    if (t.endsWith("%"))
      return { w: 100, h: Ke(t.substr(0, t.length - 1)) };
    const e = t.replace(":", "x").split("x");
    return e.length === 0 ? null : e.length === 1 ? { w: Ke(e[0]), h: 1 } : { w: Ke(e[0]), h: Ke(e[1]) };
  } catch {
  }
  return null;
}
const $s = (t, e, i, s, o) => {
  var h, p, m, b, w;
  const n = i || void 0, a = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let r = n || "", c = {};
  if (n === "default" && ((h = t.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((p = e == null ? void 0 : e.themes) != null && p[n])) {
    const { modes: $, ...k } = e.themes[n] || {};
    c = { ...c, ...k }, $ && (a && $.dark ? c = { ...c, ...$.dark } : !a && $.light && (c = { ...c, ...$.light }));
  } else if (!n && (!((m = t.__themes) != null && m.keys) || t.__themes.keys.size === 0))
    return;
  const l = ((b = t.__themes) == null ? void 0 : b.keys) || /* @__PURE__ */ new Set(), d = new Set(Object.keys(c));
  if (n === "default" && d.size === 0) {
    for (const $ of l)
      try {
        t.style.removeProperty(`--${$}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((w = t.__themes) == null ? void 0 : w.cacheKey) === r) {
    let $ = !0;
    if (l.size !== d.size)
      $ = !1;
    else
      for (const k of l)
        if (!d.has(k)) {
          $ = !1;
          break;
        }
    if ($) return;
  }
  for (const $ of l)
    if (!d.has($))
      try {
        t.style.removeProperty(`--${$}`);
      } catch {
      }
  for (const [$, k] of Object.entries(c))
    t.style.setProperty(`--${$}`, String(k));
  t.__themes.cacheKey = r || null, t.__themes.keys = d;
};
function Xt(t, e) {
  var i, s;
  return ((s = (i = t == null ? void 0 : t[e]) == null ? void 0 : i.attributes) == null ? void 0 : s.friendly_name) || e;
}
function Yt(t, e) {
  return (i, s) => ui(
    Xt(t, i),
    Xt(t, s),
    e
  );
}
const _e = ["unavailable", "unknown"], ae = [
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
], Je = ["sensor"], Xe = ["binary_sensor"], Ye = ["cover"], ht = ["climate"], Re = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
  "script",
  "scene"
], ws = ["camera"], ut = [
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
], mt = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: ["garage"]
}, pt = {
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
}, As = "16:5";
var Cs = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", Es = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", _i = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", xs = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", Qt = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", lt = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", Ss = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", Ds = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", Os = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z";
function ei(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
function gi(t, e) {
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
var ks = Object.defineProperty, W = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && ks(e, i, o), o;
};
const Hs = /* @__PURE__ */ new Set([
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
    }, this.computeLabel = L(
      (e, i, s) => gi(this.hass, e)
    ), this.groupAndSortEntities = L(
      (e, i, s) => {
        const o = /* @__PURE__ */ new Map();
        for (const a of e) {
          const r = this.getAreaForEntity(a);
          o.has(r) || o.set(r, []), o.get(r).push(a);
        }
        return Array.from(o.entries()).sort(
          ([a], [r]) => {
            var d, h;
            const c = ((d = i.get(a)) == null ? void 0 : d.toLowerCase()) ?? (a === "unassigned" ? "unassigned" : a), l = ((h = i.get(r)) == null ? void 0 : h.toLowerCase()) ?? (r === "unassigned" ? "unassigned" : r);
            return c.localeCompare(l);
          }
        ).map(([a, r]) => [a, s(r)]);
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
    var o, n, a;
    try {
      const r = await ((o = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : o.call(window));
      if (r != null && r.createCardElement) {
        const c = r.createCardElement(i);
        return c.hass = e, (n = c.setAttribute) == null || n.call(c, "data-hui-card", ""), c;
      }
    } catch {
    }
    try {
      const r = i.type || "tile", c = typeof r == "string" && r.startsWith("custom:"), l = c ? r.slice(7) : `hui-${r}-card`;
      c && !customElements.get(l) && await customElements.whenDefined(l).catch(() => {
      });
      const d = document.createElement(l);
      return typeof d.setConfig == "function" && d.setConfig(i), d.hass = e, (a = d.setAttribute) == null || a.call(d, "data-hui-card", ""), d;
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
    var m, b, w, $, k, R, B, O, N, oe, Z;
    const i = this.card, s = V(e.entity_id), o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : ($ = (w = (b = (m = this.hass) == null ? void 0 : m.states) == null ? void 0 : b[e.entity_id]) == null ? void 0 : w.attributes) == null ? void 0 : $.device_class, a = (i == null ? void 0 : i._config) || {};
    let r;
    Xe.includes(o) ? (r = (k = a.customization_alert) == null ? void 0 : k.find(
      (T) => T.type === n
    ), r || (r = (R = a.customization_domain) == null ? void 0 : R.find(
      (T) => T.type === o
    ))) : Je.includes(o) ? (r = (B = a.customization_sensor) == null ? void 0 : B.find(
      (T) => T.type === n
    ), r || (r = (O = a.customization_domain) == null ? void 0 : O.find(
      (T) => T.type === o
    ))) : Ye.includes(o) ? (r = (N = a.customization_cover) == null ? void 0 : N.find(
      (T) => T.type === n
    ), r || (r = (oe = a.customization_domain) == null ? void 0 : oe.find(
      (T) => T.type === o
    ))) : r = (Z = a.customization_domain) == null ? void 0 : Z.find(
      (T) => T.type === o
    );
    const c = r == null ? void 0 : r.popup_card, l = c && typeof c.type == "string" && c.type || (r == null ? void 0 : r.popup_card_type) || "tile", d = l === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let h = {};
    if (c && typeof c == "object") {
      const { type: T, entity: K, ...me } = c;
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
      const i = this._getCurrentEntities().map((n) => n.entity_id).sort(), s = (this._lastEntityIds || []).slice().sort(), o = i.length === s.length && i.every((n, a) => n === s[a]);
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
    const n = this._getPopupCardConfig(e);
    return this._createCardElement(this.hass, n).then((a) => {
      try {
        this._cardEls.get(i) === o && (o.replaceWith(a), this._cardEls.set(i, a)), a.hass = this.hass;
      } catch {
      }
    }), o;
  }
  _getCurrentEntities() {
    var n, a;
    const e = this.card, i = this.selectedDomain, s = this.selectedDeviceClass, o = this.selectedGroup;
    if (o !== void 0 && ((a = (n = e == null ? void 0 : e._config) == null ? void 0 : n.content) != null && a[o]))
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
    var o, n;
    const i = this.card, s = (o = i._entities) == null ? void 0 : o.find(
      (a) => a.entity_id === e.entity_id
    );
    if (s) {
      if (s.area_id)
        return s.area_id;
      if (s.device_id) {
        const a = (n = i._devices) == null ? void 0 : n.find(
          (r) => r.id === s.device_id
        );
        if (a && a.area_id)
          return a.area_id;
      }
    }
    return "unassigned";
  }
  _isActive(e) {
    return !Hs.has(e.state);
  }
  sortEntitiesForPopup(e) {
    var n, a;
    const i = ((a = (n = this.card) == null ? void 0 : n._config) == null ? void 0 : a.popup_sort) || "name", s = e.slice();
    if (i === "state") {
      const r = Yt(
        this.hass.states,
        this.hass.locale.language
      );
      return s.sort((c, l) => {
        const d = this._isActive(c) ? 0 : 1, h = this._isActive(l) ? 0 : 1;
        if (d !== h) return d - h;
        const p = V(c.entity_id), m = V(l.entity_id), b = this.hass ? ei(this.hass, c.state, p) : c.state, w = this.hass ? ei(this.hass, l.state, m) : l.state, $ = (b || "").localeCompare(w || "");
        return $ !== 0 ? $ : r(c.entity_id, l.entity_id);
      });
    }
    const o = Yt(
      this.hass.states,
      this.hass.locale.language
    );
    return s.sort((r, c) => o(r.entity_id, c.entity_id));
  }
  render() {
    var oe, Z, T, K, me, Oe, ke, He, ze, Me, y, f, u;
    if (!this.open || !this.hass || !this.card) return S``;
    const e = this.card, i = (oe = e._config) == null ? void 0 : oe.area, s = ((Z = e._devicesInArea) == null ? void 0 : Z.call(e, i, e._devices)) ?? /* @__PURE__ */ new Set(), o = e._entities || [], n = this.hass.states, a = ((T = e._config) == null ? void 0 : T.popup_domains) || [], r = ((K = e._config) == null ? void 0 : K.hidden_entities) || [], c = ((me = e._config) == null ? void 0 : me.extra_entities) || [], l = (Oe = e._config) == null ? void 0 : Oe.label, d = (ke = e._config) == null ? void 0 : ke.hide_unavailable, h = (He = e._config) == null ? void 0 : He.category_filter, p = this.selectedDomain || null, m = this.selectedDeviceClass || null, b = (g) => {
      if (!h) return !0;
      const x = o.find(
        (C) => C.entity_id === g
      ), A = x == null ? void 0 : x.entity_category;
      return A ? h === "config" ? A !== "config" : h === "diagnostic" ? A !== "diagnostic" : h === "config+diagnostic" ? A !== "config" && A !== "diagnostic" : !0 : !0;
    }, w = o.reduce(
      (g, x) => {
        var A;
        if (!x.hidden_by && (x.area_id ? x.area_id === i : x.device_id && s.has(x.device_id)) && (!l || x.labels && x.labels.some(
          (C) => l.includes(C)
        ))) {
          const C = x.entity_id;
          !r.includes(C) && b(C) && (!d || !_e.includes((A = n[C]) == null ? void 0 : A.state)) && g.push(C);
        }
        return g;
      },
      []
    );
    let $ = [];
    for (const g of w) {
      const x = V(g);
      if (a.length > 0 && !a.includes(x)) continue;
      const A = n[g];
      A && (p && x !== p || m && A.attributes.device_class !== m || $.push(A));
    }
    for (const g of c) {
      const x = V(g), A = n[g];
      A && (a.length > 0 && !a.includes(x) || p && x !== p || m && A.attributes.device_class !== m || b(g) && !$.some((C) => C.entity_id === g) && $.push(A));
    }
    const k = ((ze = e == null ? void 0 : e._config) == null ? void 0 : ze.ungroup_areas) === !0;
    let R = (Me = e._config) != null && Me.columns ? e._config.columns : 4, B = [], O = [];
    if (k)
      O = this.sortEntitiesForPopup($), R = Math.min(R, Math.max(1, O.length));
    else {
      const g = {};
      for (const C of $) {
        const M = V(C.entity_id);
        M in g || (g[M] = []), g[M].push(C);
      }
      const x = a.length > 0 ? a : ut;
      B = Object.entries(g).filter(([C]) => !p || C === p).sort(([C], [M]) => {
        const U = x.indexOf(C), D = x.indexOf(M);
        return (U === -1 ? x.length : U) - (D === -1 ? x.length : D);
      }).map(
        ([C, M]) => [C, this.sortEntitiesForPopup(M)]
      );
      const A = B.length ? Math.max(...B.map(([, C]) => C.length)) : 0;
      R = Math.min(R, Math.max(1, A));
    }
    const N = ((f = e._area) == null ? void 0 : f.call(e, (y = e._config) == null ? void 0 : y.area, e._areas)) ?? null;
    return S`
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
            .path=${_i}
            @click=${this._onClosed}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${((u = e._config) == null ? void 0 : u.area_name) || N && N.name}</h3>
          </div>
        </div>

        <div class="dialog-content">
          ${k ? S`
                <div class="entity-cards">
                  ${O.map(
      (g) => S`
                      <div class="entity-card">
                        ${this._getOrCreateCard(g)}
                      </div>
                    `
    )}
                </div>
              ` : S`${B.map(([g, x]) => S`
                  <div class="cards-wrapper">
                    <h4>
                      ${g === "binary_sensor" || g === "sensor" || g === "cover" ? this._getDomainName(
      g,
      m || void 0
    ) : this._getDomainName(g)}
                    </h4>
                    <div class="entity-cards">
                      ${x.map(
      (A) => S`
                          <div class="entity-card">
                            ${this._getOrCreateCard(A)}
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
W([
  z({ type: Boolean })
], Q.prototype, "open");
W([
  z({ type: String })
], Q.prototype, "title");
W([
  z({ type: String })
], Q.prototype, "selectedDomain");
W([
  z({ type: String })
], Q.prototype, "selectedDeviceClass");
W([
  z({ type: String })
], Q.prototype, "content");
W([
  z({ type: Array })
], Q.prototype, "entities");
W([
  z({ attribute: !1 })
], Q.prototype, "hass");
W([
  z({ attribute: !1 })
], Q.prototype, "card");
W([
  F()
], Q.prototype, "_showAll");
W([
  F()
], Q.prototype, "selectedGroup");
let zs = Q;
customElements.define("area-card-plus-popup-dialog", zs);
const St = class St extends te {
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
    var o, n;
    if (!this.open || !this.hass || !this.card) return S``;
    this.selectedDomain, this.selectedDeviceClass;
    const e = [], i = (n = (o = this.card) == null ? void 0 : o.getCustomizationForType) == null ? void 0 : n.call(o, e), s = (i == null ? void 0 : i.invert) === !0;
    return S`
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
St.styles = xe``;
let he = St;
W([
  z({ type: Boolean })
], he.prototype, "open");
W([
  z({ attribute: !1 })
], he.prototype, "hass");
W([
  z({ attribute: !1 })
], he.prototype, "card");
W([
  z({ type: String })
], he.prototype, "selectedDomain");
W([
  z({ type: String })
], he.prototype, "selectedDeviceClass");
customElements.define(
  "area-card-plus-popup-dialog-confirmation",
  he
);
var Ms = Object.defineProperty, Ps = Object.getOwnPropertyDescriptor, se = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ps(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Ms(e, i, o), o;
};
let X = class extends gs(te) {
  constructor() {
    super(...arguments), this._showPopup = !1, this.selectedDomain = null, this.selectedDeviceClass = null, this._ratio = null, this._deviceClasses = mt, this._entitiesByDomain = L(
      (t, e, i, s, o) => {
        var c;
        const n = ((c = this._config) == null ? void 0 : c.hidden_entities) || [], a = i.reduce((l, d) => {
          var h;
          return !d.hidden_by && (d.area_id ? d.area_id === t : d.device_id && e.has(d.device_id)) && (!((h = this._config) != null && h.label) || d.labels && d.labels.some((p) => {
            var m;
            return (m = this._config) == null ? void 0 : m.label.includes(p);
          })) && !n.includes(d.entity_id) && l.push(d.entity_id), l;
        }, []), r = {};
        for (const l of a) {
          const d = V(l);
          if (!Re.includes(d) && !Je.includes(d) && !Xe.includes(d) && !Ye.includes(d) && !ws.includes(d) && !ht.includes(d))
            continue;
          const h = o[l];
          h && ((Xe.includes(d) || Je.includes(d) || Ye.includes(d)) && !s[d].includes(
            h.attributes.device_class || ""
          ) || (d in r || (r[d] = []), r[d].push(h)));
        }
        return r;
      }
    ), this._area = L(
      (t, e) => e.find((i) => i.area_id === t) || null
    ), this._devicesInArea = L(
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
    return { type: "custom:area-card-plus", area: ((s = (await _s(e, Zt))[0]) == null ? void 0 : s.area_id) || "" };
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
    var o, n;
    const e = this._area((o = this._config) == null ? void 0 : o.area, this._areas || []), i = ((n = this._config) == null ? void 0 : n.area_name) || e && e.name || "Details";
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
    var n, a;
    const t = this._area((n = this._config) == null ? void 0 : n.area, this._areas || []), e = ((a = this._config) == null ? void 0 : a.area_name) || t && t.name || "Details", i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), s = [];
    Object.values(i || {}).forEach((r) => {
      r.forEach((c) => {
        !_e.includes(c.state) && !ae.includes(c.state) && s.push(c);
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
        (s) => !_e.includes(s.state) && !ae.includes(s.state)
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
      (a) => e ? a.attributes.device_class === e : !0
    );
    if (!i || i.length === 0)
      return;
    let s;
    const o = i.filter((a) => !os(a) || isNaN(Number(a.state)) ? !1 : s ? a.attributes.unit_of_measurement === s : (s = a.attributes.unit_of_measurement, !0));
    if (!o.length)
      return;
    const n = o.reduce(
      (a, r) => a + Number(r.state),
      0
    );
    return e === "power" ? `${Wt(n, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? Gt(s, this.hass.locale) : ""}${s || ""}` : `${Wt(n / o.length, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? Gt(s, this.hass.locale) : ""}${s || ""}`;
  }
  hassSubscribe() {
    const t = this.hass.connection;
    return [
      Zt(t, (e) => {
        this._areas = e;
      }),
      ms(t, (e) => {
        this._devices = e;
      }),
      fs(t, (e) => {
        this._entities = e;
      })
    ];
  }
  getCardSize() {
    return 3;
  }
  willUpdate(t) {
    var e, i;
    (t.has("_config") || this._ratio === null) && (this._ratio = (e = this._config) != null && e.aspect_ratio ? Jt((i = this._config) == null ? void 0 : i.aspect_ratio) : null, (this._ratio === null || this._ratio.w <= 0 || this._ratio.h <= 0) && (this._ratio = Jt(As)));
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
    this._config = t, this._deviceClasses = { ...mt }, t.sensor_classes && (this._deviceClasses.sensor = t.sensor_classes), t.alert_classes && (this._deviceClasses.binary_sensor = t.alert_classes), t.cover_classes && (this._deviceClasses.cover = t.cover_classes);
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
    var s, o, n;
    const e = t.detail.action === "tap" ? (s = this._config) == null ? void 0 : s.tap_action : t.detail.action === "hold" ? (o = this._config) == null ? void 0 : o.hold_action : t.detail.action === "double_tap" ? (n = this._config) == null ? void 0 : n.double_tap_action : null;
    if (typeof e == "string" && e === "more-info" || typeof e == "object" && (e == null ? void 0 : e.action) === "more-info" || e === void 0) {
      this._openGeneralPopup();
      return;
    }
    Te(this, this.hass, this._config, t.detail.action);
  }
  _handleDomainAction(t) {
    return (e) => {
      var r, c, l, d;
      e.stopPropagation();
      const i = (c = (r = this._config) == null ? void 0 : r.customization_domain) == null ? void 0 : c.find(
        (h) => h.type === t
      ), s = e.detail.action === "tap" ? i == null ? void 0 : i.tap_action : e.detail.action === "hold" ? i == null ? void 0 : i.hold_action : e.detail.action === "double_tap" ? i == null ? void 0 : i.double_tap_action : null, o = s === "toggle" || (s == null ? void 0 : s.action) === "toggle", n = s === "more-info" || (s == null ? void 0 : s.action) === "more-info";
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
        ) : Re.includes(t) && this.hass.callService(
          t,
          this._isOn(t) ? "turn_off" : "turn_on",
          void 0,
          { area_id: this._config.area }
        );
        return;
      } else if (n || s === void 0) {
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
      const a = {
        tap_action: i == null ? void 0 : i.tap_action,
        hold_action: i == null ? void 0 : i.hold_action,
        double_tap_action: i == null ? void 0 : i.double_tap_action
      };
      Te(this, this.hass, a, e.detail.action);
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
      const a = {
        tap_action: s == null ? void 0 : s.tap_action,
        hold_action: s == null ? void 0 : s.hold_action,
        double_tap_action: s == null ? void 0 : s.double_tap_action
      };
      Te(this, this.hass, a, i.detail.action);
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
      const a = {
        tap_action: s == null ? void 0 : s.tap_action,
        hold_action: s == null ? void 0 : s.hold_action,
        double_tap_action: s == null ? void 0 : s.double_tap_action
      };
      Te(this, this.hass, a, i.detail.action);
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
      const a = {
        tap_action: s == null ? void 0 : s.tap_action,
        hold_action: s == null ? void 0 : s.hold_action,
        double_tap_action: s == null ? void 0 : s.double_tap_action
      };
      Te(this, this.hass, a, i.detail.action);
    };
  }
  render() {
    var m, b, w, $, k, R, B, O, N, oe, Z, T, K, me, Oe, ke, He, ze, Me;
    if (!this._config || !this.hass || !this._areas || !this._devices || !this._entities)
      return E;
    const t = ((m = this._config) == null ? void 0 : m.design) === "V2", e = t && ((b = this._config) != null && b.v2_color) ? this._calculateV2Color(this._config.v2_color) : "var(--primary-color)", i = {
      mirrored: this._config.mirrored === !0
    }, s = {
      v2: ((w = this._config) == null ? void 0 : w.design) === "V2",
      row: (($ = this._config) == null ? void 0 : $.layout) === "horizontal"
    };
    let o = 3;
    try {
      const y = ((k = this.shadowRoot) == null ? void 0 : k.host) || document.documentElement, f = getComputedStyle(y).getPropertyValue("--row-size");
      f && (o = Number(f.trim()) || 3);
    } catch {
    }
    const n = t ? { background: e } : {}, a = t && o === 1 ? {} : t ? { background: e } : {}, r = this.layout === "grid", c = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), l = this._area(this._config.area, this._areas);
    let d;
    this._config.show_camera && "camera" in c && (d = c.camera[0].entity_id);
    const h = (R = this._config) != null && R.show_camera ? ((B = this._config) == null ? void 0 : B.show_icon) === "icon" || ((O = this._config) == null ? void 0 : O.show_icon) === "icon + image" : ((N = this._config) == null ? void 0 : N.show_icon) === "icon" || ((oe = this._config) == null ? void 0 : oe.show_icon) === "icon + image" || ((Z = this._config) == null ? void 0 : Z.show_icon) === void 0;
    if (l === null)
      return S`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    const p = {
      ...t && o === 1 ? { "--mdc-icon-size": "20px" } : {},
      color: (T = this._config) != null && T.area_icon_color ? `var(--${this._config.area_icon_color}-color)` : "",
      ...(K = this._config) != null && K.icon_css ? this._config.icon_css.split(`
`).reduce((y, f) => {
        const u = f.trim();
        if (u && u.includes(":")) {
          const [g, x] = u.split(":");
          y[g.trim()] = x.trim().replace(";", "");
        }
        return y;
      }, {}) : {}
    };
    return S`
      <ha-card class="${ne(i)}" style=${Ve({
      paddingBottom: r ? "0" : "12em"
    })}>
        ${this._config.show_camera && d || (this._config.show_icon === "image" || this._config.show_icon === "icon + image") && l.picture ? S`
                <hui-image
                  .config=${this._config}
                  .hass=${this.hass}
                  .image=${this._config.show_camera ? void 0 : l.picture}
                  .cameraImage=${this._config.show_camera ? d : void 0}
                  .cameraView=${this._config.camera_view}
                  fitMode="cover"
                ></hui-image>
              ` : E}
          <div class="${ne({
      "icon-container": !0,
      ...s
    })}"
          style=${Ve(a)}>
          ${h ? S`
                  <ha-icon
                    style=${Ve(p)}
                    icon=${this._config.area_icon || l.icon}
                  ></ha-icon>
                ` : E}
          </div>
          <div class="${ne({
      content: !0,
      ...s
    })}"            @action=${this._handleAction}
            .actionHandler=${ce({
      hasHold: q(this._config.hold_action),
      hasDoubleClick: q(this._config.double_tap_action)
    })}>

        <div
          class="${ne({
      right: !0,
      ...s
    })}"
          style=${Ve(n)}
        >


                              <div class="${ne({
      covers: !0,
      ...s
    })}">
            ${Ye.map((y) => y in c ? this._deviceClasses[y].map((f) => {
      var U, D, P, j, I;
      const u = (D = (U = this._config) == null ? void 0 : U.customization_cover) == null ? void 0 : D.find(
        (_) => _.type === f
      ), g = (u == null ? void 0 : u.invert) === !0, x = c[y].filter(
        (_) => {
          const H = _.attributes.device_class || "default", v = !ae.includes(_.state);
          return H === f && (g ? ae.includes(_.state) : v);
        }
      ), A = (u == null ? void 0 : u.color) || ((P = this._config) == null ? void 0 : P.cover_color), C = u == null ? void 0 : u.icon, M = x.length;
      return M > 0 ? S`
                      <div
                        class="icon-with-count"
                        style=${u != null && u.css || (j = this._config) != null && j.cover_css ? ((u == null ? void 0 : u.css) || ((I = this._config) == null ? void 0 : I.cover_css)).split(`
`).reduce((_, H) => {
        const v = H.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : ""}
                        @action=${this._handleCoverAction(y, f)}
                        .actionHandler=${ce({
        hasHold: q(u == null ? void 0 : u.hold_action),
        hasDoubleClick: q(
          u == null ? void 0 : u.double_tap_action
        )
      })}
                      >
                        <ha-state-icon
                          class="cover"
                          style="${(A ? `color: var(--${A}-color);` : "") + " " + (u != null && u.icon_css ? u.icon_css.split(`
`).reduce((_, H) => {
        const v = H.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : "")}"
                          .icon="${C || this._getIcon(
        y,
        !g,
        f
      )}"
                        ></ha-state-icon>

                        <span
                          class="active-count  text-small${M > 0 ? "on" : "off"}"
                          >${M}</span
                        >
                      </div>
                    ` : E;
    }) : E)}
          </div>        

          <div class="${ne({
      alerts: !0,
      ...s
    })}">
            ${Xe.map((y) => y in c ? this._deviceClasses[y].map((f) => {
      var U, D, P, j, I;
      const u = (D = (U = this._config) == null ? void 0 : U.customization_alert) == null ? void 0 : D.find(
        (_) => _.type === f
      ), g = (u == null ? void 0 : u.invert) === !0, x = c[y].filter(
        (_) => {
          const H = _.attributes.device_class || "default", v = _.state === "on";
          return H === f && (g ? ae.includes(_.state) : v);
        }
      ), A = (u == null ? void 0 : u.color) || ((P = this._config) == null ? void 0 : P.alert_color), C = u == null ? void 0 : u.icon, M = x.length;
      return M > 0 ? S`
                      <div
                        class="icon-with-count"
                        style=${u != null && u.css || (j = this._config) != null && j.alert_css ? ((u == null ? void 0 : u.css) || ((I = this._config) == null ? void 0 : I.alert_css)).split(`
`).reduce((_, H) => {
        const v = H.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : ""}
                        @action=${this._handleAlertAction(y, f)}
                        .actionHandler=${ce({
        hasHold: q(u == null ? void 0 : u.hold_action),
        hasDoubleClick: q(
          u == null ? void 0 : u.double_tap_action
        )
      })}
                      >
                        <ha-state-icon
                          class="alert"
                          style="${(A ? `color: var(--${A}-color);` : "") + " " + (u != null && u.icon_css ? u.icon_css.split(`
`).reduce((_, H) => {
        const v = H.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : "")}"
                          .icon="${C || this._getIcon(
        y,
        !g,
        f
      )}"
                        ></ha-state-icon>

                        <span
                          class="active-count  text-small${M > 0 ? "on" : "off"}"
                          >${M}</span
                        >
                      </div>
                    ` : E;
    }) : E)}
          </div>          



  

          <div class="${ne({
      buttons: !0,
      ...s
    })}">
            ${this._config.show_active ? (me = this._config.toggle_domains) == null ? void 0 : me.map((y) => {
      var C, M, U, D, P, j, I;
      if (!(y in c))
        return E;
      if (y === "climate") {
        const _ = (M = (C = this._config) == null ? void 0 : C.customization_domain) == null ? void 0 : M.find(
          (v) => v.type === "climate"
        ), H = _ == null ? void 0 : _.display_mode;
        if (H !== "icon" && H !== "text_icon")
          return E;
      }
      const f = (D = (U = this._config) == null ? void 0 : U.customization_domain) == null ? void 0 : D.find(
        (_) => _.type === y
      ), u = (f == null ? void 0 : f.color) || ((P = this._config) == null ? void 0 : P.domain_color), g = f == null ? void 0 : f.icon, A = c[y].filter(
        (_) => !_e.includes(_.state) && !ae.includes(_.state)
      ).length;
      return A > 0 ? S`
                        <div
                          class="icon-with-count hover"
                          style=${f != null && f.css || (j = this._config) != null && j.domain_css ? ((f == null ? void 0 : f.css) || ((I = this._config) == null ? void 0 : I.domain_css)).split(`
`).reduce((_, H) => {
        const v = H.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : ""}
                          @action=${this._handleDomainAction(y)}
                          .actionHandler=${ce({
        hasHold: q(f == null ? void 0 : f.hold_action),
        hasDoubleClick: q(
          f == null ? void 0 : f.double_tap_action
        )
      })}
                        >
                          <ha-state-icon
                            style=${u ? `color: var(--${u}-color);` : E}
                            class=${A > 0 ? "toggle-on" : "toggle-off"}
                            .domain=${y}
                            .icon=${g || this._getIcon(
        y,
        A > 0
      )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${A > 0 ? "on" : "off"}"
                          >
                            ${A}
                          </span>
                        </div>
                      ` : E;
    }) : (Oe = this._config.toggle_domains) == null ? void 0 : Oe.map((y) => {
      var C, M, U, D, P, j, I;
      if (!(y in c))
        return E;
      if (y === "climate") {
        const _ = (M = (C = this._config) == null ? void 0 : C.customization_domain) == null ? void 0 : M.find(
          (v) => v.type === "climate"
        ), H = _ == null ? void 0 : _.display_mode;
        if (H !== "icon" && H !== "text_icon")
          return E;
      }
      const f = (D = (U = this._config) == null ? void 0 : U.customization_domain) == null ? void 0 : D.find(
        (_) => _.type === y
      ), u = f == null ? void 0 : f.color, g = f == null ? void 0 : f.icon, A = c[y].filter(
        (_) => !_e.includes(_.state) && !ae.includes(_.state)
      ).length;
      return S`
                      <div
                        class="icon-with-count hover"
                        style=${f != null && f.css || (P = this._config) != null && P.domain_css ? ((f == null ? void 0 : f.css) || ((j = this._config) == null ? void 0 : j.domain_css)).split(`
`).reduce((_, H) => {
        const v = H.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : ""}
                        @action=${this._handleDomainAction(y)}
                        .actionHandler=${ce({
        hasHold: q(f == null ? void 0 : f.hold_action),
        hasDoubleClick: q(
          f == null ? void 0 : f.double_tap_action
        )
      })}
                      >
                        <ha-state-icon
                          style=${(u ? `color: var(--${u}-color);` : (I = this._config) != null && I.domain_color ? `color: ${this._config.domain_color};` : "") + " " + (f != null && f.icon_css ? f.icon_css.split(`
`).reduce((_, H) => {
        const v = H.trim();
        return v && v.includes(":") && (_ += v.endsWith(";") ? v : `${v};`, _ += " "), _;
      }, "") : "")}
                          class=${A > 0 ? "toggle-on" : "toggle-off"}
                          .domain=${y}
                          .icon=${g || this._getIcon(
        y,
        A > 0
      )}
                        ></ha-state-icon>
                        <span
                          class="active-count text-small ${A > 0 ? "on" : "off"}"
                        >
                          ${A}
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
              <div style=${`${(ke = this._config) != null && ke.area_name_color ? `color: var(--${this._config.area_name_color}-color);` : ""} ${(He = this._config) != null && He.name_css ? this._config.name_css.split(`
`).reduce((y, f) => {
      const u = f.trim();
      return u && u.includes(":") && (y += u.endsWith(";") ? u : `${u};`, y += " "), y;
    }, "") : ""}`}"
              <div class="${ne({
      name: !0,
      ...s,
      "text-large": !0,
      on: !0
    })}"
                @action=${this._handleAction}
                .actionHandler=${ce({
      hasHold: q(this._config.hold_action),
      hasDoubleClick: q(this._config.double_tap_action)
    })}
              >
                ${this._config.area_name || l.name}
              </div>
              

              <div class="sensors">
                ${Je.map((y) => {
      var u;
      if (!(y in c))
        return E;
      const f = this._deviceClasses[y].map((g, x, A) => {
        var v, Dt, Ot, kt, Ht, zt, Mt;
        const C = c[y].filter(
          (ee) => ee.attributes.device_class === g
        );
        if (C.length === 0)
          return E;
        const M = (() => {
          switch (g) {
            case "temperature":
              return l.temperature_entity_id;
            case "humidity":
              return l.humidity_entity_id;
            default:
              return null;
          }
        })(), U = M ? this.hass.states[M] : void 0, D = (Dt = (v = this._config) == null ? void 0 : v.customization_sensor) == null ? void 0 : Dt.find(
          (ee) => ee.type === g
        ), P = (D == null ? void 0 : D.color) || ((Ot = this._config) == null ? void 0 : Ot.sensor_color), j = (D == null ? void 0 : D.invert) === !0, I = C.some(
          (ee) => !_e.includes(ee.state) && !ae.includes(ee.state)
        );
        if (j && I)
          return E;
        const _ = (kt = this._config) != null && kt.show_sensor_icons ? S`
                            <ha-domain-icon
                              style=${P ? `color: var(--${P}-color);` : ""}
                              .hass=${this.hass}
                              .domain=${y}
                              .deviceClass=${g}
                            ></ha-domain-icon>
                          ` : null, H = S`
                        <span
                          class="sensor-value"
                          @action=${this._handleSensorAction(
          y,
          g
        )}
                          .actionHandler=${ce({
          hasHold: q(D == null ? void 0 : D.hold_action),
          hasDoubleClick: q(
            D == null ? void 0 : D.double_tap_action
          )
        })}
                          style=${`
              ${P ? `color: var(--${P}-color);` : ""}
              ${D != null && D.css ? D.css.split(`
`).reduce((ee, vi) => {
          const Pe = vi.trim();
          return Pe && Pe.includes(":") && (ee += Pe.endsWith(";") ? Pe : `${Pe};`, ee += " "), ee;
        }, "") : ""}
            `}
                        >
                          ${!((Ht = this._config) != null && Ht.show_sensor_icons) && !((zt = this._config) != null && zt.wrap_sensor_icons) && x > 0 ? " - " : ""}
                          ${U ? this.hass.formatEntityState(U) : this._average(y, g)}
                        </span>
                      `;
        return (Mt = this._config) != null && Mt.wrap_sensor_icons ? S`<div class="sensor-row">
                          ${_}${H}
                        </div>` : S`${_}${H}`;
      }).filter((g) => g !== E);
      return f.length === 0 ? E : (u = this._config) != null && u.wrap_sensor_icons ? S`<div class="sensor text-medium off">
                    ${f}
                  </div>` : S`<div class="sensor text-medium off">
                      ${f}
                    </div>`;
    })}
</div>
            <div class="climate text-small off" >
            ${(Me = (ze = this._config) == null ? void 0 : ze.toggle_domains) != null && Me.includes("climate") ? ht.map((y) => {
      var M, U, D;
      if (!(y in c))
        return "";
      const u = c[y].filter((P) => {
        const j = P.attributes.hvac_action, I = P.state, _ = !_e.includes(I) && !ae.includes(I);
        return j !== void 0 ? _ && (j !== "idle" && j !== "off") && !(I === "heat" && (j === "idle" || j === "off")) : _;
      }).map((P) => {
        var I, _, H;
        return `${P.attributes.temperature || "N/A"} ${((H = (_ = (I = this.hass) == null ? void 0 : I.config) == null ? void 0 : _.unit_system) == null ? void 0 : H.temperature) || ""}`;
      });
      if (u.length === 0)
        return "";
      const g = (U = (M = this._config) == null ? void 0 : M.customization_domain) == null ? void 0 : U.find(
        (P) => P.type === y
      );
      if ((g == null ? void 0 : g.display_mode) === "icon")
        return "";
      const A = g == null ? void 0 : g.color, C = `${A ? `color: var(--${A}-color);` : (D = this._config) != null && D.domain_color ? `color: ${this._config.domain_color};` : ""}${g != null && g.css ? " " + g.css.split(`
`).reduce((P, j) => {
        const I = j.trim();
        return I && I.includes(":") && (P += I.endsWith(";") ? I : `${I};`, P += " "), P;
      }, "") : ""}`;
      return S`
                      <div
                        class="climate"
                        style=${C}
                        @action=${this._handleDomainAction(y)}
                        .actionHandler=${ce({
        hasHold: q(g == null ? void 0 : g.hold_action),
        hasDoubleClick: q(
          g == null ? void 0 : g.double_tap_action
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
    var n, a;
    if (super.updated(t), !this._config || !this.hass)
      return;
    const e = (n = this.renderRoot) == null ? void 0 : n.querySelector("ha-dialog"), i = (a = document.querySelector("home-assistant")) == null ? void 0 : a.shadowRoot;
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
    (t.has("hass") && (!s || s.themes !== this.hass.themes) || t.has("_config") && (!o || o.theme !== this._config.theme)) && $s(this, this.hass.themes, this._config.theme);
  }
  _showPopupForDomain(t, e) {
    this.selectedDeviceClass = e || null, this._openDomainPopup(t);
  }
  _getIcon(t, e, i) {
    if (t in pt) {
      const s = pt[t];
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
      .right  * {
        pointer-events: auto;
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
  z({ attribute: !1 })
], X.prototype, "hass", 2);
se([
  z({ attribute: !1 })
], X.prototype, "layout", 2);
se([
  F()
], X.prototype, "_config", 2);
se([
  F()
], X.prototype, "_areas", 2);
se([
  F()
], X.prototype, "_devices", 2);
se([
  F()
], X.prototype, "_entities", 2);
se([
  F()
], X.prototype, "_showPopup", 2);
se([
  F()
], X.prototype, "selectedDomain", 2);
se([
  F()
], X.prototype, "selectedDeviceClass", 2);
X = se([
  ue("area-card-plus")
], X);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Ls } = ji, ti = () => document.createComment(""), Ie = (t, e, i) => {
  var n;
  const s = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = s.insertBefore(ti(), o), r = s.insertBefore(ti(), o);
    i = new Ls(a, r, t, t.options);
  } else {
    const a = i._$AB.nextSibling, r = i._$AM, c = r !== t;
    if (c) {
      let l;
      (n = i._$AQ) == null || n.call(i, t), i._$AM = t, i._$AP !== void 0 && (l = t._$AU) !== r._$AU && i._$AP(l);
    }
    if (a !== o || c) {
      let l = i._$AA;
      for (; l !== a; ) {
        const d = l.nextSibling;
        s.insertBefore(l, o), l = d;
      }
    }
  }
  return i;
}, fe = (t, e, i = t) => (t._$AI(e, i), t), Ts = {}, Is = (t, e = Ts) => t._$AH = e, Ns = (t) => t._$AH, dt = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) s.set(t[o], o);
  return s;
}, js = st(class extends ot {
  constructor(t) {
    if (super(t), t.type !== Ct.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let s;
    i === void 0 ? i = e : e !== void 0 && (s = e);
    const o = [], n = [];
    let a = 0;
    for (const r of t) o[a] = s ? s(r, a) : a, n[a] = i(r, a), a++;
    return { values: n, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, s]) {
    const o = Ns(t), { values: n, keys: a } = this.dt(e, i, s);
    if (!Array.isArray(o)) return this.ut = a, n;
    const r = this.ut ?? (this.ut = []), c = [];
    let l, d, h = 0, p = o.length - 1, m = 0, b = n.length - 1;
    for (; h <= p && m <= b; ) if (o[h] === null) h++;
    else if (o[p] === null) p--;
    else if (r[h] === a[m]) c[m] = fe(o[h], n[m]), h++, m++;
    else if (r[p] === a[b]) c[b] = fe(o[p], n[b]), p--, b--;
    else if (r[h] === a[b]) c[b] = fe(o[h], n[b]), Ie(t, c[b + 1], o[h]), h++, b--;
    else if (r[p] === a[m]) c[m] = fe(o[p], n[m]), Ie(t, o[h], o[p]), p--, m++;
    else if (l === void 0 && (l = ii(a, m, b), d = ii(r, h, p)), l.has(r[h])) if (l.has(r[p])) {
      const w = d.get(a[m]), $ = w !== void 0 ? o[w] : null;
      if ($ === null) {
        const k = Ie(t, o[h]);
        fe(k, n[m]), c[m] = k;
      } else c[m] = fe($, n[m]), Ie(t, o[h], $), o[w] = null;
      m++;
    } else dt(o[p]), p--;
    else dt(o[h]), h++;
    for (; m <= b; ) {
      const w = Ie(t, c[b + 1]);
      fe(w, n[m]), c[m++] = w;
    }
    for (; h <= p; ) {
      const w = o[h++];
      w !== null && dt(w);
    }
    return this.ut = a, Is(t, c), ie;
  }
});
var Rs = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, J = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Us(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Rs(e, i, o), o;
};
class Ae extends te {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    return this.hass ? S`
      <div class="customization">
        ${this.customization && js(
      this.customization,
      (e) => this._getKey(e),
      (e, i) => S`
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
        (s) => S`<mwc-list-item .value=${s.value}
                      >${s.label}</mwc-list-item
                    >`
      )}
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${_i}
                class="remove-icon"
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${Ds}
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
      (e) => S`<mwc-list-item .value=${e.value}
                  >${e.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    ` : E;
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
  z({ attribute: !1 })
], Ae.prototype, "hass", 2);
J([
  z({ type: Array })
], Ae.prototype, "SelectOptions", 2);
let ft = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_domain;
  }
};
J([
  z({ attribute: !1 })
], ft.prototype, "customization_domain", 2);
ft = J([
  ue("domain-items-editor")
], ft);
let _t = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_alert;
  }
};
J([
  z({ attribute: !1 })
], _t.prototype, "customization_alert", 2);
_t = J([
  ue("alert-items-editor")
], _t);
let gt = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_cover;
  }
};
J([
  z({ attribute: !1 })
], gt.prototype, "customization_cover", 2);
gt = J([
  ue("cover-items-editor")
], gt);
let vt = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_sensor;
  }
};
J([
  z({ attribute: !1 })
], vt.prototype, "customization_sensor", 2);
vt = J([
  ue("sensor-items-editor")
], vt);
let yt = class extends Ae {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_popup;
  }
};
J([
  z({ attribute: !1 })
], yt.prototype, "customization_popup", 2);
yt = J([
  ue("popup-items-editor")
], yt);
var Fs = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, De = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Bs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Fs(e, i, o), o;
};
let we = class extends te {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = L(() => {
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
    }), this._schemaalert = L(() => {
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
    }), this._schemasensor = L(() => {
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
      return S``;
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
    return S`
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
  z({ attribute: !1 })
], we.prototype, "config", 2);
De([
  z({ attribute: !1 })
], we.prototype, "hass", 2);
De([
  z({ type: Boolean })
], we.prototype, "useSensorSchema", 2);
De([
  F()
], we.prototype, "getSchema", 2);
De([
  F()
], we.prototype, "_config", 2);
we = De([
  ue("item-editor")
], we);
var Vs = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, re = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? qs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Vs(e, i, o), o;
};
let Y = class extends te {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this.computeLabel = L((t) => gi(this.hass, t)), this._schema = L((t, e) => {
      const i = (n) => this.hass.localize(n) || n, s = [
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
                  options: ["vertical", "horizontal"].map((n) => ({
                    label: i(
                      `ui.panel.lovelace.editor.card.tile.content_layout_options.${n}`
                    ),
                    value: n
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
    }), this._binaryschema = L((t) => [
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
    ]), this._coverschema = L((t) => [
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
    ]), this._sensorschema = L((t) => [
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
    ]), this._toggleschema = L((t) => [
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
    ]), this._popupschema = L(
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
    ), this._binaryClassesForArea = L(
      (t) => this._classesForArea(t, "binary_sensor")
    ), this._coverClassesForArea = L(
      (t) => this._classesForArea(t, "cover")
    ), this._sensorClassesForArea = L(
      (t, e) => this._classesForArea(t, "sensor", e)
    ), this._toggleDomainsForArea = L(
      (t) => this._classesForArea(t, "toggle")
    ), this._allDomainsForArea = L(
      (t) => this._classesForArea(t, "all")
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
        (n) => {
          var a;
          return (Re.includes(V(n.entity_id)) || ht.includes(V(n.entity_id))) && !n.hidden && (n.area_id === t || n.device_id && ((a = this.hass.devices[n.device_id]) == null ? void 0 : a.area_id) === t);
        }
      ), [...new Set(s.map((n) => V(n.entity_id)))];
    if (e === "all") {
      const n = ((o = this._config) == null ? void 0 : o.extra_entities) || [];
      let a = Object.values(this.hass.entities).filter(
        (c) => {
          var l;
          return !c.hidden && (c.area_id === t || c.device_id && ((l = this.hass.devices[c.device_id]) == null ? void 0 : l.area_id) === t);
        }
      );
      const r = n.map((c) => this.hass.states[c]).filter((c) => c !== void 0);
      return a = [...a, ...r], [...new Set(a.map((c) => V(c.entity_id)))];
    } else {
      s = Object.values(this.hass.entities).filter(
        (a) => {
          var r;
          return V(a.entity_id) === e && !a.entity_category && !a.hidden && (a.area_id === t || a.device_id && ((r = this.hass.devices[a.device_id]) == null ? void 0 : r.area_id) === t);
        }
      );
      const n = s.map(
        (a) => {
          var r;
          return ((r = this.hass.states[a.entity_id]) == null ? void 0 : r.attributes.device_class) || "";
        }
      ).filter(
        (a) => a && (e !== "sensor" || !i || i.includes(a))
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
      (n, a) => ui(n.label, a.label, this.hass.locale.language)
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
        const i = t.get("_config"), s = i == null ? void 0 : i.area, o = this._config.area, n = (i == null ? void 0 : i.extra_entities) || [], a = this._config.extra_entities || [], r = (i == null ? void 0 : i.popup_domains) || [], c = ((e = this._config) == null ? void 0 : e.popup_domains) || [], l = n.length !== a.length || !n.every(
          (h) => a.includes(h)
        ), d = r.length !== c.length || !r.every(
          (h) => c.includes(h)
        );
        if (s !== void 0 && s !== o) {
          const h = this._toggleDomainsForArea(o), p = this._binaryClassesForArea(o), m = this._coverClassesForArea(o), b = this._allDomainsForArea(o), w = h.sort(
            (k, R) => Re.indexOf(k) - Re.indexOf(R)
          ), $ = b.sort(
            (k, R) => ut.indexOf(k) - ut.indexOf(R)
          );
          if (this._config.toggle_domains = [
            ...w.filter((k) => k !== "scene" && k !== "script")
          ], this._config.alert_classes = [...p], this._config.cover_classes = [...m], this._config.popup_domains = [...$], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
            const k = this._config.hidden_entities, R = Object.values(this._hiddenEntitiesByDomain()).flat(), B = k.filter((O) => R.includes(O));
            B.length !== k.length && (this._config = {
              ...this._config || {},
              hidden_entities: B
            }, G(this, "config-changed", { config: { ...this._config } }));
          }
          this.requestUpdate();
        }
        if (l) {
          for (const h of a) {
            const p = V(h);
            this._config.popup_domains.includes(p) || this._config.popup_domains.push(p);
          }
          this.requestUpdate();
        }
        d && this._updateEntityOptions();
      }
      if (!this._numericDeviceClasses) {
        const { numeric_device_classes: i } = await ds(this.hass);
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
        return !i.hidden && e.includes(V(i.entity_id)) && (i.area_id === t || i.device_id && ((s = this.hass.devices[i.device_id]) == null ? void 0 : s.area_id) === t);
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
    const s = `customization_${t}`, o = (d = this._config) == null ? void 0 : d[s], n = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, a = ((h = this[n]) == null ? void 0 : h.index) ?? 0, r = ((p = o == null ? void 0 : o[a]) == null ? void 0 : p.type) ?? "unknown", c = r.match(/^(.+?)\s*-\s*(.+)$/);
    let l;
    if (c) {
      const m = c[1].toLowerCase().replace(" ", "_"), b = c[2].toLowerCase(), w = this.hass.localize(`component.${m}.entity_component._.name`) || c[1];
      let $ = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${m}.${b}`
      ) || c[2];
      $ = $.charAt(0).toUpperCase() + $.slice(1), l = `${w} – ${$}`;
    } else {
      let m = this.hass.localize(`component.${r}.entity_component._.name`) || r;
      m = m.charAt(0).toUpperCase() + m.slice(1), l = m;
    }
    return S`
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
        .config=${(o == null ? void 0 : o[a]) || {}}
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
    const s = pt;
    if (t in s) {
      const o = s[t];
      return typeof o == "string" ? o : i && o[i] ? o[i][e === "off" ? "off" : "on"] || o[i] : o[e === "off" ? "off" : "on"] || Object.values(o)[0];
    }
    return "mdi:help-circle";
  }
  _groupAllEntitiesByDomain() {
    var a;
    const t = {}, e = (this.entityOptions || []).map((r) => r.value);
    for (const r of e) {
      const c = V(r);
      t[c] || (t[c] = []), t[c].push(r);
    }
    const i = this._hiddenEntitiesByDomain(), s = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])
    ), o = ((a = this.hass) == null ? void 0 : a.states) || {}, n = this.compareByFriendlyName ? this.compareByFriendlyName(o, this.hass.locale.language) : (r, c) => r.localeCompare(c);
    return s.sort((r, c) => r.localeCompare(c)).map((r) => {
      const c = /* @__PURE__ */ new Set([
        ...t[r] || [],
        ...i[r] || []
      ]);
      return { domain: r, entities: Array.from(c).sort(n) };
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
    var a, r, c;
    const i = ((a = this.hass) == null ? void 0 : a.states) || {}, s = {};
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
    var h, p, m, b, w, $, k;
    const t = {}, e = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const i = ((p = this.hass) == null ? void 0 : p.entities) || {}, s = ((m = this.hass) == null ? void 0 : m.devices) || {}, o = (b = this.hass) != null && b.areas ? Object.values(this.hass.areas) : [], n = (w = this._config) == null ? void 0 : w.area, a = ($ = this._config) == null ? void 0 : $.floor, r = (k = this._config) == null ? void 0 : k.label, c = n ? Array.isArray(n) ? n : [n] : [], l = a ? Array.isArray(a) ? a : [a] : [], d = r ? Array.isArray(r) ? r : [r] : [];
    for (const R of e) {
      const B = V(R), O = i[R], N = O != null && O.device_id ? s[O.device_id] : void 0;
      if (((O == null ? void 0 : O.area_id) != null || (N == null ? void 0 : N.area_id) != null) && !(d.length && !(Array.isArray(O == null ? void 0 : O.labels) && O.labels.some((T) => d.includes(T)) || Array.isArray(N == null ? void 0 : N.labels) && N.labels.some((T) => d.includes(T)))) && !(c.length && !(O != null && O.area_id && c.includes(O.area_id) || N != null && N.area_id && c.includes(N.area_id)))) {
        if (l.length) {
          const Z = (O == null ? void 0 : O.area_id) && o.some(
            (K) => K.area_id === O.area_id && K.floor_id && l.includes(K.floor_id)
          ), T = (N == null ? void 0 : N.area_id) && o.some(
            (K) => K.area_id === N.area_id && K.floor_id && l.includes(K.floor_id)
          );
          if (!Z && !T) continue;
        }
        t[B] || (t[B] = []), t[B].push(R);
      }
    }
    return t;
  }
  render() {
    var h;
    if (!this.hass || !this._config)
      return E;
    const t = this._toggleDomainsForArea(
      this._config.area || ""
    ), e = this._binaryClassesForArea(
      this._config.area || ""
    ), i = this._coverClassesForArea(
      this._config.area || ""
    ), s = this._allDomainsForArea(this._config.area || ""), o = this._schema(
      this._config.show_camera || !1,
      this._config.design || "V1"
    ), n = this._binaryschema(this.binarySelectOptions), a = this._coverschema(this.coverSelectOptions), r = this._sensorschema(this.sensorSelectOptions), c = this._toggleschema(this.toggleSelectOptions), l = this._popupschema(
      this.AllSelectOptions,
      this.entityOptions
    ), d = {
      alert_classes: e,
      cover_classes: i,
      sensor_classes: mt.sensor,
      toggle_domains: t,
      popup_domains: s,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorDomain() : this._subElementEditorAlert ? this._renderSubElementEditorAlert() : this._subElementEditorCover ? this._renderSubElementEditorCover() : this._subElementEditorSensor ? this._renderSubElementEditorSensor() : S`
      <ha-form
        .hass=${this.hass}
        .data=${d}
        .schema=${o}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Cs}></ha-svg-icon>
          ${this.computeLabel({ name: "alert_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
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
          <ha-svg-icon .path=${Ss}></ha-svg-icon>
          ${this.computeLabel({ name: "cover_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
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
          <ha-svg-icon .path=${Es}></ha-svg-icon>
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
          <ha-svg-icon .path=${xs}></ha-svg-icon>
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
          <ha-svg-icon .path=${Os}></ha-svg-icon>
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

        <ha-expansion-panel outlined class="main">
          <div slot="header" role="heading" aria-level="3">
            <ha-svg-icon .path=${lt}></ha-svg-icon>
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
      (p) => S`
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
        (m) => S`
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
          (b) => {
            var w, $;
            return S`
                                    <div class="entity-row">
                                      <span class="entity-name">
                                        ${(($ = (w = this.hass.states[b]) == null ? void 0 : w.attributes) == null ? void 0 : $.friendly_name) || b}
                                      </span>
                                      <ha-icon-button
                                        .path=${this._isHiddenEntity(b) ? Qt : lt}
                                        .label=${this._isHiddenEntity(b) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                        @click=${() => this._toggleEntityHidden(b)}
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
          var b, w;
          return S`
                            <div class="entity-row">
                              <span class="entity-name">
                                ${((w = (b = this.hass.states[m]) == null ? void 0 : b.attributes) == null ? void 0 : w.friendly_name) || m}
                              </span>
                              <ha-icon-button
                                .path=${this._isHiddenEntity(m) ? Qt : lt}
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

        </div>


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
re([
  z({ attribute: !1 })
], Y.prototype, "hass", 2);
re([
  F()
], Y.prototype, "_config", 2);
re([
  F()
], Y.prototype, "_entities", 2);
re([
  F()
], Y.prototype, "_numericDeviceClasses", 2);
re([
  F()
], Y.prototype, "_subElementEditorDomain", 2);
re([
  F()
], Y.prototype, "_subElementEditorAlert", 2);
re([
  F()
], Y.prototype, "_subElementEditorCover", 2);
re([
  F()
], Y.prototype, "_subElementEditorSensor", 2);
Y = re([
  ue("area-card-plus-editor")
], Y);
console.info(
  `%c AREA-CARD %c ${bi.version} `,
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
