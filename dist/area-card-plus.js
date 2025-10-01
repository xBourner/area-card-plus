const oi = "v1.0", ni = {
  version: oi
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis, ct = Ie.ShadowRoot && (Ie.ShadyCSS === void 0 || Ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, lt = Symbol(), yt = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ct && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = yt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && yt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ai = (t) => new Ut(typeof t == "string" ? t : t + "", void 0, lt), _e = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1]), t[0]);
  return new Ut(i, t, lt);
}, ri = (t, e) => {
  if (ct) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), o = Ie.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, bt = ct ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return ai(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ci, defineProperty: li, getOwnPropertyDescriptor: di, getOwnPropertyNames: hi, getOwnPropertySymbols: ui, getPrototypeOf: mi } = Object, ee = globalThis, $t = ee.trustedTypes, _i = $t ? $t.emptyScript : "", Ge = ee.reactiveElementPolyfillSupport, Se = (t, e) => t, Fe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? _i : null;
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
} }, dt = (t, e) => !ci(t, e), wt = { attribute: !0, type: String, converter: Fe, reflect: !1, useDefault: !1, hasChanged: dt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ee.litPropertyMetadata ?? (ee.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let he = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = wt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && li(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = di(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: o, set(a) {
      const c = o == null ? void 0 : o.call(this);
      n == null || n.call(this, a), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Se("elementProperties"))) return;
    const e = mi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Se("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Se("properties"))) {
      const i = this.properties, s = [...hi(i), ...ui(i)];
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
      for (const o of s) i.unshift(bt(o));
    } else e !== void 0 && i.push(bt(e));
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
    return ri(e, this.constructor.elementStyles), e;
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
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : Fe).toAttribute(i, s.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n, a;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const c = s.getPropertyOptions(o), r = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : Fe;
      this._$Em = o;
      const d = r.fromAttribute(i, c.type);
      this[o] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    var o;
    if (e !== void 0) {
      const n = this.constructor, a = this[e];
      if (s ?? (s = n.getPropertyOptions(e)), !((s.hasChanged ?? dt)(a, i) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, s)))) return;
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
        const { wrapped: c } = a, r = this[n];
        c !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, a, r);
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
he.elementStyles = [], he.shadowRootOptions = { mode: "open" }, he[Se("elementProperties")] = /* @__PURE__ */ new Map(), he[Se("finalized")] = /* @__PURE__ */ new Map(), Ge == null || Ge({ ReactiveElement: he }), (ee.reactiveElementVersions ?? (ee.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe = globalThis, Ve = Oe.trustedTypes, Ct = Ve ? Ve.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ft = "$lit$", Q = `lit$${Math.random().toFixed(9).slice(2)}$`, Vt = "?" + Q, pi = `<${Vt}>`, re = document, De = () => re.createComment(""), ze = (t) => t === null || typeof t != "object" && typeof t != "function", ht = Array.isArray, fi = (t) => ht(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Ze = `[ 	
\f\r]`, Ae = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xt = /-->/g, At = />/g, se = RegExp(`>|${Ze}(?:([^\\s"'>=/]+)(${Ze}*=${Ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Et = /'/g, St = /"/g, Kt = /^(?:script|style|textarea|title)$/i, gi = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), y = gi(1), q = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), Ot = /* @__PURE__ */ new WeakMap(), ne = re.createTreeWalker(re, 129);
function qt(t, e) {
  if (!ht(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ct !== void 0 ? Ct.createHTML(e) : e;
}
const vi = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Ae;
  for (let c = 0; c < i; c++) {
    const r = t[c];
    let d, l, u = -1, m = 0;
    for (; m < r.length && (a.lastIndex = m, l = a.exec(r), l !== null); ) m = a.lastIndex, a === Ae ? l[1] === "!--" ? a = xt : l[1] !== void 0 ? a = At : l[2] !== void 0 ? (Kt.test(l[2]) && (o = RegExp("</" + l[2], "g")), a = se) : l[3] !== void 0 && (a = se) : a === se ? l[0] === ">" ? (a = o ?? Ae, u = -1) : l[1] === void 0 ? u = -2 : (u = a.lastIndex - l[2].length, d = l[1], a = l[3] === void 0 ? se : l[3] === '"' ? St : Et) : a === St || a === Et ? a = se : a === xt || a === At ? a = Ae : (a = se, o = void 0);
    const h = a === se && t[c + 1].startsWith("/>") ? " " : "";
    n += a === Ae ? r + pi : u >= 0 ? (s.push(d), r.slice(0, u) + Ft + r.slice(u) + Q + h) : r + Q + (u === -2 ? c : h);
  }
  return [qt(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Le {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const c = e.length - 1, r = this.parts, [d, l] = vi(e, i);
    if (this.el = Le.createElement(d, s), ne.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = ne.nextNode()) !== null && r.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(Ft)) {
          const m = l[a++], h = o.getAttribute(u).split(Q), _ = /([.?@])?(.*)/.exec(m);
          r.push({ type: 1, index: n, name: _[2], strings: h, ctor: _[1] === "." ? bi : _[1] === "?" ? $i : _[1] === "@" ? wi : Ke }), o.removeAttribute(u);
        } else u.startsWith(Q) && (r.push({ type: 6, index: n }), o.removeAttribute(u));
        if (Kt.test(o.tagName)) {
          const u = o.textContent.split(Q), m = u.length - 1;
          if (m > 0) {
            o.textContent = Ve ? Ve.emptyScript : "";
            for (let h = 0; h < m; h++) o.append(u[h], De()), ne.nextNode(), r.push({ type: 2, index: ++n });
            o.append(u[m], De());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Vt) r.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(Q, u + 1)) !== -1; ) r.push({ type: 7, index: n }), u += Q.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = re.createElement("template");
    return s.innerHTML = e, s;
  }
}
function me(t, e, i = t, s) {
  var a, c;
  if (e === q) return e;
  let o = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const n = ze(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = me(t, o._$AS(t, e.values), o, s)), e;
}
let yi = class {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? re).importNode(i, !0);
    ne.currentNode = o;
    let n = ne.nextNode(), a = 0, c = 0, r = s[0];
    for (; r !== void 0; ) {
      if (a === r.index) {
        let d;
        r.type === 2 ? d = new pe(n, n.nextSibling, this, e) : r.type === 1 ? d = new r.ctor(n, r.name, r.strings, this, e) : r.type === 6 && (d = new Ci(n, this, e)), this._$AV.push(d), r = s[++c];
      }
      a !== (r == null ? void 0 : r.index) && (n = ne.nextNode(), a++);
    }
    return ne.currentNode = re, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
};
class pe {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = me(this, e, i), ze(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : fi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== C && ze(this._$AH) ? this._$AA.nextSibling.data = e : this.T(re.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Le.createElement(qt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const a = new yi(o, this), c = a.u(this.options);
      a.p(i), this.T(c), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Ot.get(e.strings);
    return i === void 0 && Ot.set(e.strings, i = new Le(e)), i;
  }
  k(e) {
    ht(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new pe(this.O(De()), this.O(De()), this, this.options)) : s = i[o], s._$AI(n), o++;
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
class Ke {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = C;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = me(this, e, i, 0), a = !ze(e) || e !== this._$AH && e !== q, a && (this._$AH = e);
    else {
      const c = e;
      let r, d;
      for (e = n[0], r = 0; r < n.length - 1; r++) d = me(this, c[s + r], i, r), d === q && (d = this._$AH[r]), a || (a = !ze(d) || d !== this._$AH[r]), d === C ? e = C : e !== C && (e += (d ?? "") + n[r + 1]), this._$AH[r] = d;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class bi extends Ke {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === C ? void 0 : e;
  }
}
class $i extends Ke {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== C);
  }
}
class wi extends Ke {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = me(this, e, i, 0) ?? C) === q) return;
    const s = this._$AH, o = e === C && s !== C || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== C && (s === C || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ci {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    me(this, e);
  }
}
const xi = { I: pe }, Ye = Oe.litHtmlPolyfillSupport;
Ye == null || Ye(Le, pe), (Oe.litHtmlVersions ?? (Oe.litHtmlVersions = [])).push("3.3.1");
const Ai = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new pe(e.insertBefore(De(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = globalThis;
let K = class extends he {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ai(i, this.renderRoot, this.renderOptions);
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
    return q;
  }
};
var jt;
K._$litElement$ = !0, K.finalized = !0, (jt = ae.litElementHydrateSupport) == null || jt.call(ae, { LitElement: K });
const Xe = ae.litElementPolyfillSupport;
Xe == null || Xe({ LitElement: K });
(ae.litElementVersions ?? (ae.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ei = { attribute: !0, type: String, converter: Fe, reflect: !1, hasChanged: dt }, Si = (t = Ei, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: a } = i;
    return { set(c) {
      const r = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, r, t);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, t, c), c;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(c) {
      const r = this[a];
      e.call(this, c), this.requestUpdate(a, r, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function L(t) {
  return (e, i) => typeof i == "object" ? Si(t, e, i) : ((s, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(t) {
  return L({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = { ATTRIBUTE: 1, CHILD: 2 }, qe = (t) => (...e) => ({ _$litDirective$: t, values: e });
let We = class {
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
const V = qe(class extends We {
  constructor(t) {
    var e;
    if (super(t), t.type !== ut.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return q;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = "important", Oi = " !" + Wt, Te = qe(class extends We {
  constructor(t) {
    var e;
    if (super(t), t.type !== ut.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const n = typeof o == "string" && o.endsWith(Oi);
        s.includes("-") || n ? i.setProperty(s, n ? o.slice(0, -11) : o, n ? Wt : "") : i[s] = o;
      }
    }
    return q;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: ki } = xi, kt = () => document.createComment(""), Ee = (t, e, i) => {
  var n;
  const s = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = s.insertBefore(kt(), o), c = s.insertBefore(kt(), o);
    i = new ki(a, c, t, t.options);
  } else {
    const a = i._$AB.nextSibling, c = i._$AM, r = c !== t;
    if (r) {
      let d;
      (n = i._$AQ) == null || n.call(i, t), i._$AM = t, i._$AP !== void 0 && (d = t._$AU) !== c._$AU && i._$AP(d);
    }
    if (a !== o || r) {
      let d = i._$AA;
      for (; d !== a; ) {
        const l = d.nextSibling;
        s.insertBefore(d, o), d = l;
      }
    }
  }
  return i;
}, oe = (t, e, i = t) => (t._$AI(e, i), t), Di = {}, zi = (t, e = Di) => t._$AH = e, Li = (t) => t._$AH, Je = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) s.set(t[o], o);
  return s;
}, X = qe(class extends We {
  constructor(t) {
    if (super(t), t.type !== ut.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let s;
    i === void 0 ? i = e : e !== void 0 && (s = e);
    const o = [], n = [];
    let a = 0;
    for (const c of t) o[a] = s ? s(c, a) : a, n[a] = i(c, a), a++;
    return { values: n, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, s]) {
    const o = Li(t), { values: n, keys: a } = this.dt(e, i, s);
    if (!Array.isArray(o)) return this.ut = a, n;
    const c = this.ut ?? (this.ut = []), r = [];
    let d, l, u = 0, m = o.length - 1, h = 0, _ = n.length - 1;
    for (; u <= m && h <= _; ) if (o[u] === null) u++;
    else if (o[m] === null) m--;
    else if (c[u] === a[h]) r[h] = oe(o[u], n[h]), u++, h++;
    else if (c[m] === a[_]) r[_] = oe(o[m], n[_]), m--, _--;
    else if (c[u] === a[_]) r[_] = oe(o[u], n[_]), Ee(t, r[_ + 1], o[u]), u++, _--;
    else if (c[m] === a[h]) r[h] = oe(o[m], n[h]), Ee(t, o[u], o[m]), m--, h++;
    else if (d === void 0 && (d = Dt(a, h, _), l = Dt(c, u, m)), d.has(c[u])) if (d.has(c[m])) {
      const g = l.get(a[h]), p = g !== void 0 ? o[g] : null;
      if (p === null) {
        const b = Ee(t, o[u]);
        oe(b, n[h]), r[h] = b;
      } else r[h] = oe(p, n[h]), Ee(t, o[u], p), o[g] = null;
      h++;
    } else Je(o[m]), m--;
    else Je(o[u]), u++;
    for (; h <= _; ) {
      const g = Ee(t, r[_ + 1]);
      oe(g, n[h]), r[h++] = g;
    }
    for (; u <= m; ) {
      const g = o[u++];
      g !== null && Je(g);
    }
    return this.ut = a, zi(t, r), q;
  }
});
var zt = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function Hi(t, e) {
  return !!(t === e || zt(t) && zt(e));
}
function Mi(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!Hi(t[i], e[i]))
      return !1;
  return !0;
}
function x(t, e) {
  e === void 0 && (e = Mi);
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
const Ne = ["sensor"], Re = ["binary_sensor"], je = ["cover"], tt = ["climate"], Ti = ["camera"], ke = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
  "script",
  "scene"
], it = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: ["garage"]
}, He = {
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
}, Y = [
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
], Pi = (t, e, i, s, o) => {
  var u, m, h, _, g;
  const n = i || void 0, a = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let c = n || "", r = {};
  if (n === "default" && ((u = t.__themes) == null ? void 0 : u.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((m = e == null ? void 0 : e.themes) != null && m[n])) {
    const { modes: p, ...b } = e.themes[n] || {};
    r = { ...r, ...b }, p && (a && p.dark ? r = { ...r, ...p.dark } : !a && p.light && (r = { ...r, ...p.light }));
  } else if (!n && (!((h = t.__themes) != null && h.keys) || t.__themes.keys.size === 0))
    return;
  const d = ((_ = t.__themes) == null ? void 0 : _.keys) || /* @__PURE__ */ new Set(), l = new Set(Object.keys(r));
  if (n === "default" && l.size === 0) {
    for (const p of d)
      try {
        t.style.removeProperty(`--${p}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((g = t.__themes) == null ? void 0 : g.cacheKey) === c) {
    let p = !0;
    if (d.size !== l.size)
      p = !1;
    else
      for (const b of d)
        if (!l.has(b)) {
          p = !1;
          break;
        }
    if (p) return;
  }
  for (const p of d)
    if (!l.has(p))
      try {
        t.style.removeProperty(`--${p}`);
      } catch {
      }
  for (const [p, b] of Object.entries(r))
    t.style.setProperty(`--${p}`, String(b));
  t.__themes.cacheKey = c || null, t.__themes.keys = l;
}, H = (t, e, i, s) => {
  s = s || {}, i = i ?? {};
  const o = new Event(e, {
    bubbles: s.bubbles === void 0 ? !0 : s.bubbles,
    cancelable: !!s.cancelable,
    composed: s.composed === void 0 ? !0 : s.composed
  });
  return o.detail = i, t.dispatchEvent(o), o;
}, P = (t) => t.substr(0, t.indexOf("."));
var ue = /* @__PURE__ */ ((t) => (t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none", t))(ue || {});
const Bi = (t, e = 2) => Math.round(t * 10 ** e) / 10 ** e, Ii = (t) => Ni(t.attributes), Ni = (t) => !!t.unit_of_measurement || !!t.state_class, Ri = (t) => {
  switch (t.number_format) {
    case ue.comma_decimal:
      return ["en-US", "en"];
    // Use United States with fallback to English formatting 1,234,567.89
    case ue.decimal_comma:
      return ["de", "es", "it"];
    // Use German with fallback to Spanish then Italian formatting 1.234.567,89
    case ue.space_comma:
      return ["fr", "sv", "cs"];
    // Use French with fallback to Swedish and Czech formatting 1 234 567,89
    case ue.system:
      return;
    default:
      return t.language;
  }
}, Lt = (t, e, i) => {
  const s = e ? Ri(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(n) {
    return typeof n == "number" && o(n);
  }, (e == null ? void 0 : e.number_format) !== ue.none && !Number.isNaN(Number(t)) && Intl)
    try {
      return new Intl.NumberFormat(
        s,
        Ht(t, i)
      ).format(Number(t));
    } catch (o) {
      return console.error(o), new Intl.NumberFormat(
        void 0,
        Ht(t, i)
      ).format(Number(t));
    }
  return typeof t == "string" ? t : `${Bi(t, i == null ? void 0 : i.maximumFractionDigits).toString()}${(i == null ? void 0 : i.style) === "currency" ? ` ${i.currency}` : ""}`;
}, Ht = (t, e) => {
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
}, ji = x(
  (t) => new Intl.Collator(t)
), Ui = x(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), Gt = (t, e) => t < e ? -1 : t > e ? 1 : 0, Fi = (t, e, i = void 0) => Intl != null && Intl.Collator ? ji(i).compare(t, e) : Gt(t, e), Zt = (t, e, i = void 0) => Intl != null && Intl.Collator ? Ui(i).compare(t, e) : Gt(t.toLowerCase(), e.toLowerCase()), Vi = (t) => {
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
}, Mt = (t, e) => t === "°" ? "" : e && t === "%" ? Vi(e) : " ", Ki = async (t, e) => new Promise((i) => {
  const s = e(t, (o) => {
    s(), i(o);
  });
}), Yt = "unavailable", Xt = "unknown", qi = (t) => {
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
    for (let c = 0; c < a.length; c++)
      a[c](t);
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
        for (let r = 0; r < arguments.length; r++)
          a.push(arguments[r]);
        let c = o.apply(this, a);
        if (c != null)
          return c instanceof Promise ? c.then(n) : n(c);
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
}, Wi = 5e3, Gi = (t, e, i, s, o = { unsubGrace: !0 }) => {
  if (t[e])
    return t[e];
  let n = 0, a, c, r = qi();
  const d = () => {
    if (!i)
      throw new Error("Collection does not support refresh");
    return i(t).then((g) => r.setState(g, !0));
  }, l = () => d().catch((g) => {
    if (t.connected)
      throw g;
  }), u = () => {
    if (c !== void 0) {
      clearTimeout(c), c = void 0;
      return;
    }
    s && (a = s(t, r)), i && (t.addEventListener("ready", l), l()), t.addEventListener("disconnected", _);
  }, m = () => {
    c = void 0, a && a.then((g) => {
      g();
    }), r.clearState(), t.removeEventListener("ready", d), t.removeEventListener("disconnected", _);
  }, h = () => {
    c = setTimeout(m, Wi);
  }, _ = () => {
    c && (clearTimeout(c), m());
  };
  return t[e] = {
    get state() {
      return r.state;
    },
    refresh: d,
    subscribe(g) {
      n++, n === 1 && u();
      const p = r.subscribe(g);
      return r.state !== void 0 && setTimeout(() => g(r.state), 0), () => {
        p(), n--, n || (o.unsubGrace ? h() : m());
      };
    }
  }, t[e];
}, mt = (t, e, i, s, o) => Gi(s, t, e, i).subscribe(o), _t = (t, e, i = !1) => {
  let s;
  const o = (...n) => {
    const a = () => {
      s = void 0, i || t(...n);
    }, c = i && !s;
    clearTimeout(s), s = window.setTimeout(a, e), c && t(...n);
  };
  return o.cancel = () => {
    clearTimeout(s);
  }, o;
}, Jt = (t) => t.sendMessagePromise({
  type: "config/entity_registry/list"
}), Zi = (t, e) => t.subscribeEvents(
  _t(
    () => Jt(t).then(
      (i) => e.setState(i, !0)
    ),
    500,
    !0
  ),
  "entity_registry_updated"
), Yi = (t, e) => mt(
  "_entityRegistry",
  Jt,
  Zi,
  t,
  e
);
x(
  (t) => {
    const e = {};
    for (const i of t)
      e[i.entity_id] = i;
    return e;
  }
);
x(
  (t) => {
    const e = {};
    for (const i of t)
      e[i.id] = i;
    return e;
  }
);
let Pe;
const Xi = async (t) => Pe || (Pe = t.callWS({
  type: "sensor/numeric_device_classes"
}), Pe), Qt = (t) => t.sendMessagePromise({
  type: "config/area_registry/list"
}).then(
  (e) => e.sort((i, s) => Fi(i.name, s.name))
), Ji = (t, e) => t.subscribeEvents(
  _t(
    () => Qt(t).then(
      (i) => e.setState(i, !0)
    ),
    500,
    !0
  ),
  "area_registry_updated"
), Tt = (t, e) => mt(
  "_areaRegistry",
  Qt,
  Ji,
  t,
  e
), ei = (t) => t.sendMessagePromise({
  type: "config/device_registry/list"
}), Qi = (t, e) => t.subscribeEvents(
  _t(
    () => ei(t).then(
      (i) => e.setState(i, !0)
    ),
    500,
    !0
  ),
  "device_registry_updated"
), es = (t, e) => mt(
  "_dr",
  ei,
  Qi,
  t,
  e
);
var ts = Object.defineProperty, is = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && ts(e, i, o), o;
};
const ss = (t) => {
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
  return is([
    L({ attribute: !1 })
  ], e.prototype, "hass"), e;
}, Ue = (t, e) => {
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
        if (!Ue(t[i], e[i]))
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
        if (!Ue(i[1], e.get(i[0])))
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
      if (!Ue(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
};
class os extends HTMLElement {
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
    e.actionHandler && Ue(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
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
      s.cancelable && s.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? H(o, "action", { action: "hold" }) : i.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, H(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, H(o, "action", { action: "double_tap" })) : H(o, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-area-card", os);
const ns = () => {
  const t = document.body;
  if (t.querySelector("action-handler-area-card"))
    return t.querySelector("action-handler-area-card");
  const e = document.createElement("action-handler-area-card");
  return t.appendChild(e), e;
}, as = (t, e) => {
  const i = ns();
  i && i.bind(t, e);
}, Z = qe(
  class extends We {
    update(t, [e]) {
      return as(t.element, e), q;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(t) {
    }
  }
), Qe = async (t, e, i, s) => {
  H(t, "hass-action", { config: i, action: s });
};
function T(t) {
  return t !== void 0 && t.action !== "none";
}
var rs = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", cs = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", pt = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", ls = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", Pt = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", et = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", Bt = "M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z", It = "M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z", ds = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", hs = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z", ti = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", us = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z";
function Nt(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
function ii(t, e) {
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
var ms = Object.defineProperty, te = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && ms(e, i, o), o;
};
const si = [Yt, Xt], _s = [si, Y], ft = class ft extends K {
  constructor() {
    super(...arguments), this._swipeStartY = null, this._swipeStartTime = null, this._swipeThreshold = 250, this._swipeTimeLimit = 800, this._onPopState = (e) => {
      this.open && this._onClosed(e);
    }, this._onTouchStart = (e) => {
      e.touches && e.touches.length === 1 && (this._swipeStartY = e.touches[0].clientY, this._swipeStartTime = Date.now());
    }, this._onTouchEnd = (e) => {
      if (this._swipeStartY !== null && this._swipeStartTime !== null && e.changedTouches && e.changedTouches.length === 1) {
        const s = e.changedTouches[0].clientY - this._swipeStartY, o = Date.now() - this._swipeStartTime;
        s > this._swipeThreshold && o < this._swipeTimeLimit && this._onClosed(e);
      }
      this._swipeStartY = null, this._swipeStartTime = null;
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
    }, this.computeLabel = x(
      (e, i, s) => ii(this.hass, e)
    );
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("touchstart", this._onTouchStart, { passive: !0 }), this.addEventListener("touchend", this._onTouchEnd), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("touchstart", this._onTouchStart), this.removeEventListener("touchend", this._onTouchEnd), window.removeEventListener("popstate", this._onPopState), this._cardEls.clear();
  }
  getFriendlyName(e, i) {
    var s, o;
    return ((o = (s = e == null ? void 0 : e[i]) == null ? void 0 : s.attributes) == null ? void 0 : o.friendly_name) || i;
  }
  compareByFriendlyName(e, i) {
    return (s, o) => Zt(
      this.getFriendlyName(e, s),
      this.getFriendlyName(e, o),
      i
    );
  }
  showDialog(e) {
    this.title = e.title ?? this.title, this.hass = e.hass, this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.selectedGroup = e.selectedGroup, this.card = e.card, this._cardEls.clear(), this.open = !0, this.requestUpdate();
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
      const c = await ((o = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : o.call(window));
      if (c != null && c.createCardElement) {
        const r = c.createCardElement(i);
        return r.hass = e, (n = r.setAttribute) == null || n.call(r, "data-hui-card", ""), r;
      }
    } catch {
    }
    try {
      const c = i.type || "tile", r = typeof c == "string" && c.startsWith("custom:"), d = r ? c.slice(7) : `hui-${c}-card`;
      r && !customElements.get(d) && await customElements.whenDefined(d).catch(() => {
      });
      const l = document.createElement(d);
      return typeof l.setConfig == "function" && l.setConfig(i), l.hass = e, (a = l.setAttribute) == null || a.call(l, "data-hui-card", ""), l;
    } catch {
      if (!s)
        return this._createCardElement(
          e,
          this._toTileConfig(i),
          !0
        );
      const c = document.createElement("div");
      return c.setAttribute("data-hui-card", ""), c;
    }
  }
  _getPopupCardConfig(e) {
    var h, _, g, p, b, $, v, f, w, z, E;
    const i = this.card, s = P(e.entity_id), o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : (p = (g = (_ = (h = this.hass) == null ? void 0 : h.states) == null ? void 0 : _[e.entity_id]) == null ? void 0 : g.attributes) == null ? void 0 : p.device_class, a = (i == null ? void 0 : i._config) || {};
    let c;
    Re.includes(o) ? (c = (b = a.customization_alert) == null ? void 0 : b.find(
      (k) => k.type === n
    ), c || (c = ($ = a.customization_domain) == null ? void 0 : $.find(
      (k) => k.type === o
    ))) : Ne.includes(o) ? (c = (v = a.customization_sensor) == null ? void 0 : v.find(
      (k) => k.type === n
    ), c || (c = (f = a.customization_domain) == null ? void 0 : f.find(
      (k) => k.type === o
    ))) : je.includes(o) ? (c = (w = a.customization_cover) == null ? void 0 : w.find(
      (k) => k.type === n
    ), c || (c = (z = a.customization_domain) == null ? void 0 : z.find(
      (k) => k.type === o
    ))) : c = (E = a.customization_domain) == null ? void 0 : E.find(
      (k) => k.type === o
    );
    const r = c == null ? void 0 : c.popup_card, d = r && typeof r.type == "string" && r.type || (c == null ? void 0 : c.popup_card_type) || "tile", l = d === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let u = {};
    if (r && typeof r == "object") {
      const { type: k, entity: N, ...ie } = r;
      u = ie;
    } else
      u = (c == null ? void 0 : c.popup_card_options) ?? {};
    return {
      type: d,
      entity: e.entity_id,
      ...l,
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
    return this._createCardElement(this.hass, n).then((a) => {
      try {
        this._cardEls.get(i) === o && (o.replaceWith(a), this._cardEls.set(i, a)), a.hass = this.hass;
      } catch {
      }
    }), o;
  }
  _isActive(e) {
    return !_s.flat().includes(e.state);
  }
  sortEntitiesForPopup(e) {
    var n, a;
    const i = ((a = (n = this.card) == null ? void 0 : n._config) == null ? void 0 : a.popup_sort) || "name", s = e.slice();
    if (i === "state") {
      const c = this.compareByFriendlyName(
        this.hass.states,
        this.hass.locale.language
      );
      return s.sort((r, d) => {
        const l = this._isActive(r) ? 0 : 1, u = this._isActive(d) ? 0 : 1;
        if (l !== u) return l - u;
        const m = P(r.entity_id), h = P(d.entity_id), _ = this.hass ? Nt(this.hass, r.state, m) : r.state, g = this.hass ? Nt(this.hass, d.state, h) : d.state, p = (_ || "").localeCompare(g || "");
        return p !== 0 ? p : c(r.entity_id, d.entity_id);
      });
    }
    const o = this.compareByFriendlyName(
      this.hass.states,
      this.hass.locale.language
    );
    return s.sort((c, r) => o(c.entity_id, r.entity_id));
  }
  render() {
    var z, E, k, N, ie, ge, ve, ye, be, $e, we, Ce, xe;
    if (!this.open || !this.hass || !this.card) return y``;
    const e = this.card, i = (z = e._config) == null ? void 0 : z.area, s = ((E = e._devicesInArea) == null ? void 0 : E.call(e, i, e._devices)) ?? /* @__PURE__ */ new Set(), o = e._entities || [], n = this.hass.states, a = ((k = e._config) == null ? void 0 : k.popup_domains) || [], c = ((N = e._config) == null ? void 0 : N.hidden_entities) || [], r = ((ie = e._config) == null ? void 0 : ie.extra_entities) || [], d = (ge = e._config) == null ? void 0 : ge.label, l = (ve = e._config) == null ? void 0 : ve.hide_unavailable, u = (ye = e._config) == null ? void 0 : ye.category_filter, m = this.selectedDomain || null, h = this.selectedDeviceClass || null, _ = (A) => {
      if (!u) return !0;
      const D = o.find(
        (B) => B.entity_id === A
      ), O = D == null ? void 0 : D.entity_category;
      return O ? u === "config" ? O !== "config" : u === "diagnostic" ? O !== "diagnostic" : u === "config+diagnostic" ? O !== "config" && O !== "diagnostic" : !0 : !0;
    }, g = o.reduce(
      (A, D) => {
        var O;
        if (!D.hidden_by && (D.area_id ? D.area_id === i : D.device_id && s.has(D.device_id)) && (!d || D.labels && D.labels.some(
          (B) => d.includes(B)
        ))) {
          const B = D.entity_id;
          !c.includes(B) && _(B) && (!l || !si.includes((O = n[B]) == null ? void 0 : O.state)) && A.push(B);
        }
        return A;
      },
      []
    );
    let p = [];
    for (const A of g) {
      const D = P(A);
      if (a.length > 0 && !a.includes(D)) continue;
      const O = n[A];
      O && (m && D !== m || h && O.attributes.device_class !== h || p.push(O));
    }
    for (const A of r) {
      const D = P(A), O = n[A];
      O && (a.length > 0 && !a.includes(D) || m && D !== m || h && O.attributes.device_class !== h || _(A) && !p.some((B) => B.entity_id === A) && p.push(O));
    }
    const b = ((be = e == null ? void 0 : e._config) == null ? void 0 : be.ungroup_areas) === !0;
    let $ = ($e = e._config) != null && $e.columns ? e._config.columns : 4, v = [], f = [];
    if (b)
      f = this.sortEntitiesForPopup(p), $ = Math.min($, Math.max(1, f.length));
    else {
      const A = {};
      for (const S of p) {
        const F = P(S.entity_id);
        F in A || (A[F] = []), A[F].push(S);
      }
      const D = Object.keys(He || {}), O = a.length > 0 ? a : D;
      v = Object.entries(A).filter(([S]) => !m || S === m).sort(([S], [F]) => {
        const gt = O.indexOf(S), vt = O.indexOf(F);
        return (gt === -1 ? O.length : gt) - (vt === -1 ? O.length : vt);
      }).map(
        ([S, F]) => [S, this.sortEntitiesForPopup(F)]
      );
      const B = v.length ? Math.max(...v.map(([, S]) => S.length)) : 0;
      $ = Math.min($, Math.max(1, B));
    }
    const w = ((Ce = e._area) == null ? void 0 : Ce.call(e, (we = e._config) == null ? void 0 : we.area, e._areas)) ?? null;
    return y`
      <ha-dialog
        hideActions
        id="more-info-dialog"
        style="--columns: ${$};"
        .open=${this.open}
        @closed=${this._onClosed}
      >
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${pt}
            @click=${this._onClosed}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${((xe = e._config) == null ? void 0 : xe.area_name) || w && w.name}</h3>
          </div>
        </div>
        <div class="dialog-content scrollable">
          ${b ? y`
                  <div class="cards-wrapper">
                    <div class="entity-cards">
                      ${f.map(
      (A) => y`
                          <div class="entity-card">
                            ${this._getOrCreateCard(A)}
                          </div>
                        `
    )}
                    </div>
                  </div>
                ` : y`${X(
      v,
      ([A]) => A,
      ([A, D]) => y`
                    <div class="cards-wrapper">
                      <h4>
                        ${A === "binary_sensor" || A === "sensor" || A === "cover" ? this._getDomainName(
        A,
        h || void 0
      ) : this._getDomainName(A)}
                      </h4>
                      <div class="entity-cards">
                        ${X(
        D,
        (O) => O.entity_id,
        (O) => y`
                            <div class="entity-card">
                              ${this._getOrCreateCard(O)}
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
ft.styles = _e`
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
      padding-bottom: 8px;
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
      width: calc(var(--columns, 4) * 22.5vw);
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.8em 0.2em 0em;
    }
    .entity-cards {
      display: grid;
      grid-template-columns: repeat(var(--columns, 4), 22.5vw);
      gap: 4px;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      justify-content: center;
      margin-top: 0.8em;
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
        width: 92vw;
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
  `;
let j = ft;
te([
  L({ type: Boolean })
], j.prototype, "open");
te([
  L({ type: String })
], j.prototype, "selectedDomain");
te([
  L({ type: String })
], j.prototype, "selectedDeviceClass");
te([
  L({ type: String })
], j.prototype, "content");
te([
  L({ type: Array })
], j.prototype, "entities");
te([
  L({ attribute: !1 })
], j.prototype, "hass");
te([
  L({ attribute: !1 })
], j.prototype, "card");
te([
  M()
], j.prototype, "selectedGroup");
customElements.define("area-card-plus-popup", j);
const Be = (t) => {
  const e = parseFloat(t);
  if (isNaN(e))
    throw new Error(`${t} is not a number`);
  return e;
};
function Rt(t) {
  if (!t)
    return null;
  try {
    if (t.endsWith("%"))
      return { w: 100, h: Be(t.substr(0, t.length - 1)) };
    const e = t.replace(":", "x").split("x");
    return e.length === 0 ? null : e.length === 1 ? { w: Be(e[0]), h: 1 } : { w: Be(e[0]), h: Be(e[1]) };
  } catch {
  }
  return null;
}
var ps = Object.defineProperty, fs = Object.getOwnPropertyDescriptor, W = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? fs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && ps(e, i, o), o;
};
const de = [Yt, Xt], gs = "16:5";
let U = class extends ss(K) {
  constructor() {
    super(...arguments), this.selectedDomain = null, this.selectedDeviceClass = null, this.selectedGroup = null, this.layout = "grid", this._iconCache = /* @__PURE__ */ new Map(), this._styleCache = /* @__PURE__ */ new Map(), this._ratio = null, this._deviceClasses = it, this._entitiesByDomain = x(
      (t, e, i, s, o) => {
        var r;
        const n = ((r = this._config) == null ? void 0 : r.hidden_entities) || [], a = i.reduce((d, l) => {
          var u;
          return !l.hidden_by && (l.area_id ? l.area_id === t : l.device_id && e.has(l.device_id)) && (!((u = this._config) != null && u.label) || l.labels && l.labels.some((m) => {
            var h;
            return (h = this._config) == null ? void 0 : h.label.includes(m);
          })) && !n.includes(l.entity_id) && d.push(l.entity_id), d;
        }, []), c = {};
        for (const d of a) {
          const l = P(d);
          if (!ke.includes(l) && !Ne.includes(l) && !Re.includes(l) && !je.includes(l) && !Ti.includes(l) && !tt.includes(l))
            continue;
          const u = o[d];
          u && ((Re.includes(l) || Ne.includes(l) || je.includes(l)) && !s[l].includes(
            u.attributes.device_class || ""
          ) || (l in c || (c[l] = []), c[l].push(u)));
        }
        return c;
      }
    ), this._area = x(
      (t, e) => e.find((i) => i.area_id === t) || null
    ), this._devicesInArea = x(
      (t, e) => new Set(
        t ? e.reduce((i, s) => (s.area_id === t && i.push(s.id), i), []) : []
      )
    ), this._computeCovers = x(
      (t, e) => je.flatMap((i) => i in t ? e[i].map((s) => ({
        domain: i,
        deviceClass: s
      })) : [])
    ), this._computeIconStyles = x(
      (t, e, i, s) => {
        const o = {
          ...t && e === 1 ? { "--mdc-icon-size": "20px" } : {},
          color: s ? `var(--${s}-color)` : ""
        };
        return i ? i.split(`
`).reduce((n, a) => {
          const c = a.trim();
          if (c && c.includes(":")) {
            const [r, d] = c.split(":");
            n[r.trim()] = d.trim().replace(";", "");
          }
          return n;
        }, o) : o;
      }
    ), this._computeAlerts = x(
      (t, e) => Re.flatMap((i) => i in t ? e[i].map((s) => ({
        domain: i,
        deviceClass: s
      })) : [])
    ), this._computeSensors = x(
      (t, e) => Ne.flatMap((i) => i in t ? e[i].map(
        (s, o) => ({
          domain: i,
          deviceClass: s,
          index: o
        })
      ) : [])
    ), this._computeButtons = x(
      (t, e) => (t || []).filter(
        (i) => i in e
      )
    ), this._computeCameraEntity = x(
      (t, e) => {
        var i;
        if (t && "camera" in e)
          return (i = e.camera[0]) == null ? void 0 : i.entity_id;
      }
    );
  }
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }
  static async getStubConfig(t) {
    var s;
    const e = t.connection;
    return { type: "custom:area-card-plus", area: ((s = (await Ki(e, Tt))[0]) == null ? void 0 : s.area_id) || "" };
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
    var n, a;
    const t = this._area((n = this._config) == null ? void 0 : n.area, this._areas || []), e = ((a = this._config) == null ? void 0 : a.area_name) || t && t.name || "Details", i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), s = [];
    Object.values(i || {}).forEach((c) => {
      c.forEach((r) => {
        !de.includes(r.state) && !Y.includes(r.state) && s.push(r);
      });
    }), this.showPopup(this, "area-card-plus-popup", {
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
        (s) => !de.includes(s.state) && !Y.includes(s.state)
      );
  }
  _average(t, e) {
    var c;
    const i = ((c = this._config) == null ? void 0 : c.excluded_entities) || [], s = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    )[t].filter(
      (r) => (e ? r.attributes.device_class === e : !0) && !i.includes(r.entity_id)
    );
    if (!s || s.length === 0)
      return;
    let o;
    const n = s.filter((r) => !Ii(r) || isNaN(Number(r.state)) ? !1 : o ? r.attributes.unit_of_measurement === o : (o = r.attributes.unit_of_measurement, !0));
    if (!n.length)
      return;
    const a = n.reduce(
      (r, d) => r + Number(d.state),
      0
    );
    return e === "power" ? `${Lt(a, this.hass.locale, {
      maximumFractionDigits: 1
    })}${o ? Mt(o, this.hass.locale) : ""}${o || ""}` : `${Lt(a / n.length, this.hass.locale, {
      maximumFractionDigits: 1
    })}${o ? Mt(o, this.hass.locale) : ""}${o || ""}`;
  }
  hassSubscribe() {
    const t = this.hass.connection;
    return [
      Tt(t, (e) => {
        this._areas = e;
      }),
      es(t, (e) => {
        this._devices = e;
      }),
      Yi(t, (e) => {
        this._entities = e;
      })
    ];
  }
  getCardSize() {
    return 3;
  }
  willUpdate(t) {
    var e, i;
    (t.has("_config") || this._ratio === null) && (this._ratio = (e = this._config) != null && e.aspect_ratio ? Rt((i = this._config) == null ? void 0 : i.aspect_ratio) : null, (this._ratio === null || this._ratio.w <= 0 || this._ratio.h <= 0) && (this._ratio = Rt(gs)));
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
    this._config = t, this._deviceClasses = { ...it }, t.sensor_classes && (this._deviceClasses.sensor = t.sensor_classes), t.alert_classes && (this._deviceClasses.binary_sensor = t.alert_classes), t.cover_classes && (this._deviceClasses.cover = t.cover_classes), this._iconCache.clear(), this._styleCache.clear();
  }
  _parseCss(t) {
    if (!t) return "";
    const e = t;
    if (this._styleCache.has(e)) return this._styleCache.get(e);
    const i = t.split(`
`).reduce((s, o) => {
      const n = o.trim();
      return n && n.includes(":") && (s += n.endsWith(";") ? n : `${n};`, s += " "), s;
    }, "");
    return this._styleCache.set(e, i), i;
  }
  shouldUpdate(t) {
    if (t.has("_config") || !this._config || t.has("_devicesInArea") || t.has("_areas") || t.has("_entities"))
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
    var o, n, a, c, r, d;
    const e = t.detail.action === "tap" ? (o = this._config) == null ? void 0 : o.tap_action : t.detail.action === "hold" ? (n = this._config) == null ? void 0 : n.hold_action : t.detail.action === "double_tap" ? (a = this._config) == null ? void 0 : a.double_tap_action : null;
    if (e === "more-info" || (e == null ? void 0 : e.action) === "more-info" || e === void 0) {
      this._openGeneralPopup();
      return;
    }
    const s = {
      tap_action: (c = this._config) == null ? void 0 : c.tap_action,
      hold_action: (r = this._config) == null ? void 0 : r.hold_action,
      double_tap_action: (d = this._config) == null ? void 0 : d.double_tap_action
    };
    Qe(this, this.hass, s, t.detail.action);
  }
  _handleDomainAction(t) {
    return this._makeActionHandler("domain", t);
  }
  _handleAlertAction(t, e) {
    return this._makeActionHandler("alert", t, e);
  }
  _handleCoverAction(t, e) {
    return this._makeActionHandler("cover", t, e);
  }
  _handleSensorAction(t, e) {
    return this._makeActionHandler("sensor", t, e);
  }
  _makeActionHandler(t, e, i, s) {
    return (o) => {
      var d, l, u, m, h, _, g, p, b, $;
      o.stopPropagation();
      let n;
      t === "domain" ? n = (l = (d = this._config) == null ? void 0 : d.customization_domain) == null ? void 0 : l.find(
        (v) => v.type === e
      ) : t === "alert" ? n = (m = (u = this._config) == null ? void 0 : u.customization_alert) == null ? void 0 : m.find(
        (v) => v.type === i
      ) : t === "cover" ? n = (_ = (h = this._config) == null ? void 0 : h.customization_cover) == null ? void 0 : _.find(
        (v) => v.type === i
      ) : t === "sensor" ? n = (p = (g = this._config) == null ? void 0 : g.customization_sensor) == null ? void 0 : p.find(
        (v) => v.type === i
      ) : t === "custom_button" && (n = s);
      const a = o.detail.action === "tap" ? n == null ? void 0 : n.tap_action : o.detail.action === "hold" ? n == null ? void 0 : n.hold_action : o.detail.action === "double_tap" ? n == null ? void 0 : n.double_tap_action : null;
      if (t === "domain") {
        const v = a === "toggle" || (a == null ? void 0 : a.action) === "toggle", f = a === "more-info" || (a == null ? void 0 : a.action) === "more-info";
        if (v) {
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
          ) : ke.includes(e) && this.hass.callService(
            e,
            this._isOn(e) ? "turn_off" : "turn_on",
            void 0,
            { area_id: this._config.area }
          );
          return;
        } else if (f || a === void 0) {
          if (e !== "binary_sensor" && e !== "sensor")
            if (e === "climate") {
              const z = ($ = (b = this._config) == null ? void 0 : b.customization_domain) == null ? void 0 : $.find(
                (k) => k.type === "climate"
              ), E = z == null ? void 0 : z.display_mode;
              (E === "icon" || E === "text_icon") && this._showPopupForDomain(e);
            } else
              this._showPopupForDomain(e);
          return;
        }
        const w = {
          tap_action: n == null ? void 0 : n.tap_action,
          hold_action: n == null ? void 0 : n.hold_action,
          double_tap_action: n == null ? void 0 : n.double_tap_action
        };
        Qe(this, this.hass, w, o.detail.action);
        return;
      }
      const c = a === "more-info" || (a == null ? void 0 : a.action) === "more-info";
      if (t === "alert") {
        if (c || a === void 0) {
          e === "binary_sensor" && this._showPopupForDomain(e, i);
          return;
        }
      } else if (t === "cover") {
        if (c || a === void 0) {
          e === "cover" && this._showPopupForDomain(e, i);
          return;
        }
      } else if (t === "sensor") {
        if (c) {
          e === "sensor" && this._showPopupForDomain(e, i);
          return;
        }
        if (o.detail.action === "tap" && !(n != null && n.tap_action))
          return;
      }
      const r = {
        tap_action: n == null ? void 0 : n.tap_action,
        hold_action: n == null ? void 0 : n.hold_action,
        double_tap_action: n == null ? void 0 : n.double_tap_action
      };
      Qe(this, this.hass, r, o.detail.action);
    };
  }
  _renderCovers(t, e, i) {
    var n, a, c;
    const s = ((n = this._config) == null ? void 0 : n.excluded_entities) || [], o = {
      v2: ((a = this._config) == null ? void 0 : a.design) === "V2",
      row: ((c = this._config) == null ? void 0 : c.layout) === "horizontal"
    };
    return y`
      <div
        class="${V({
      covers: !0,
      ...o
    })}"
      >
        ${X(
      t,
      (r) => r.domain + "-" + r.deviceClass,
      ({ domain: r, deviceClass: d }) => {
        var p, b;
        const l = i.get(d), u = (l == null ? void 0 : l.invert) === !0, m = e[r].filter(($) => {
          const v = $.attributes.device_class || "default", f = $.state === "open";
          return v === d && (u ? Y.includes($.state) : f) && !s.includes($.entity_id);
        }), h = (l == null ? void 0 : l.color) || ((p = this._config) == null ? void 0 : p.cover_color), _ = l == null ? void 0 : l.icon, g = m.length;
        return g > 0 ? y`
                  <div
                    class="icon-with-count hover"
                    style=${this._parseCss(
          (l == null ? void 0 : l.css) || ((b = this._config) == null ? void 0 : b.cover_css)
        )}
                    @action=${this._handleCoverAction(r, d)}
                    .actionHandler=${Z({
          hasHold: T(l == null ? void 0 : l.hold_action),
          hasDoubleClick: T(
            l == null ? void 0 : l.double_tap_action
          )
        })}
                  >
                    <ha-state-icon
                      class="cover"
                      style="${(h ? `color: var(--${h}-color);` : "") + " " + (l != null && l.icon_css ? l.icon_css.split(`
`).reduce(($, v) => {
          const f = v.trim();
          return f && f.includes(":") && ($ += f.endsWith(";") ? f : `${f};`, $ += " "), $;
        }, "") : "")}"
                      .icon=${_ || this._cachedIcon(
          r,
          !u,
          d
        )}
                    ></ha-state-icon>
                    <span
                      class="active-count text-small ${g > 0 ? "on" : "off"}"
                      >${g}</span
                    >
                  </div>
                ` : C;
      }
    )}
      </div>
    `;
  }
  _renderAlerts(t, e, i) {
    var n, a, c;
    const s = {
      v2: ((n = this._config) == null ? void 0 : n.design) === "V2",
      row: ((a = this._config) == null ? void 0 : a.layout) === "horizontal"
    }, o = ((c = this._config) == null ? void 0 : c.excluded_entities) || [];
    return y`
      <div
        class="${V({
      alerts: !0,
      ...s
    })}"
      >
        ${X(
      t,
      (r) => r.domain + "-" + r.deviceClass,
      ({ domain: r, deviceClass: d }) => {
        var p, b;
        const l = i.get(d), u = (l == null ? void 0 : l.invert) === !0, m = e[r].filter(($) => {
          const v = $.attributes.device_class || "default", f = $.state === "on";
          return v === d && (u ? Y.includes($.state) : f) && !o.includes($.entity_id);
        }), h = (l == null ? void 0 : l.color) || ((p = this._config) == null ? void 0 : p.alert_color), _ = l == null ? void 0 : l.icon, g = m.length;
        return g > 0 ? y`
                  <div
                    class="icon-with-count hover"
                    style=${this._parseCss(
          (l == null ? void 0 : l.css) || ((b = this._config) == null ? void 0 : b.alert_css)
        )}
                    @action=${this._handleAlertAction(r, d)}
                    .actionHandler=${Z({
          hasHold: T(l == null ? void 0 : l.hold_action),
          hasDoubleClick: T(
            l == null ? void 0 : l.double_tap_action
          )
        })}
                  >
                    <ha-state-icon
                      class="alert"
                      style="${(h ? `color: var(--${h}-color);` : "") + " " + (l != null && l.icon_css ? l.icon_css.split(`
`).reduce(($, v) => {
          const f = v.trim();
          return f && f.includes(":") && ($ += f.endsWith(";") ? f : `${f};`, $ += " "), $;
        }, "") : "")}"
                      .icon=${_ || this._cachedIcon(
          r,
          !u,
          d
        )}
                    ></ha-state-icon>
                    <span
                      class="active-count text-small ${g > 0 ? "on" : "off"}"
                      >${g}</span
                    >
                  </div>
                ` : C;
      }
    )}
      </div>
    `;
  }
  renderCustomButtons() {
    var e, i, s;
    if (!((e = this._config) != null && e.custom_buttons) || this._config.custom_buttons.length === 0)
      return C;
    const t = {
      v2: ((i = this._config) == null ? void 0 : i.design) === "V2",
      row: ((s = this._config) == null ? void 0 : s.layout) === "horizontal"
    };
    return y`
      <div
        class="${V({
      custom_buttons: !0,
      ...t
    })}"
      >
        ${this._config.custom_buttons.map((o) => {
      const n = o.color ? `color: var(--${o.color}-color, ${o.color});` : "";
      return y`
            <div
              class="icon-with-count hover"
              @action=${this._makeActionHandler(
        "custom_button",
        "",
        void 0,
        o
      )}
              .actionHandler=${Z({
        hasHold: T(o.hold_action),
        hasDoubleClick: T(o.double_tap_action)
      })}
            >
              <ha-icon .icon=${o.icon} style="${n}"></ha-icon>
              ${o.name ? y`<span class="custom-button-label" style="${n}"
                    >${o.name}</span
                  >` : C}
            </div>
          `;
    })}
      </div>
    `;
  }
  _renderButtons(t, e, i) {
    var n, a, c;
    const s = {
      v2: ((n = this._config) == null ? void 0 : n.design) === "V2",
      row: ((a = this._config) == null ? void 0 : a.layout) === "horizontal"
    }, o = ((c = this._config) == null ? void 0 : c.excluded_entities) || [];
    return y`
      <div
        class="${V({
      buttons: !0,
      ...s
    })}"
      >
        ${X(
      t,
      (r) => r,
      (r) => {
        var _, g, p, b, $;
        if (r === "climate") {
          const v = (g = (_ = this._config) == null ? void 0 : _.customization_domain) == null ? void 0 : g.find(
            (w) => w.type === "climate"
          ), f = v == null ? void 0 : v.display_mode;
          if (f !== "icon" && f !== "text_icon")
            return C;
        }
        const d = i.get(r), l = (d == null ? void 0 : d.color) || ((p = this._config) == null ? void 0 : p.domain_color), u = d == null ? void 0 : d.icon, h = e[r].filter(
          (v) => !de.includes(v.state) && !Y.includes(v.state) && !o.includes(v.entity_id)
        ).length;
        return this._config.show_active && h === 0 ? C : y`
              <div
                class="icon-with-count hover"
                style=${this._parseCss(
          (d == null ? void 0 : d.css) || ((b = this._config) == null ? void 0 : b.domain_css)
        )}
                @action=${this._handleDomainAction(r)}
                .actionHandler=${Z({
          hasHold: T(d == null ? void 0 : d.hold_action),
          hasDoubleClick: T(d == null ? void 0 : d.double_tap_action)
        })}
              >
                <ha-state-icon
                  style=${l ? `color: var(--${l}-color);` : ($ = this._config) != null && $.domain_color ? `color: ${this._config.domain_color};` : ""}
                  class=${h > 0 ? "toggle-on" : "toggle-off"}
                  .domain=${r}
                  .icon=${u || this._cachedIcon(r, h > 0)}
                ></ha-state-icon>
                <span
                  class="active-count text-small ${h > 0 ? "on" : "off"}"
                >
                  ${h}
                </span>
              </div>
            `;
      }
    )}
      </div>
    `;
  }
  _renderSensors(t, e, i, s) {
    var n, a;
    const o = ((n = this._config) == null ? void 0 : n.excluded_entities) || [];
    return y`
      <div class="sensors">
        ${(a = this._config) != null && a.wrap_sensor_icons ? X(
      t,
      (c) => c.domain + "-" + c.deviceClass,
      ({ domain: c, deviceClass: r, index: d }) => {
        var v, f, w, z;
        const l = e[c].filter(
          (E) => E.attributes.device_class === r && !o.includes(E.entity_id)
        );
        if (l.length === 0)
          return C;
        const u = (() => {
          switch (r) {
            case "temperature":
              return i.temperature_entity_id;
            case "humidity":
              return i.humidity_entity_id;
            default:
              return null;
          }
        })(), m = u ? this.hass.states[u] : void 0, h = s.get(r), _ = (h == null ? void 0 : h.color) || ((v = this._config) == null ? void 0 : v.sensor_color), g = (h == null ? void 0 : h.invert) === !0, p = l.some(
          (E) => !de.includes(E.state) && !Y.includes(E.state) && !o.includes(E.entity_id)
        );
        if (g && p)
          return C;
        const b = (f = this._config) != null && f.show_sensor_icons ? y`<ha-domain-icon
                      style=${_ ? `color: var(--${_}-color);` : ""}
                      .hass=${this.hass}
                      .domain=${c}
                      .deviceClass=${r}
                    ></ha-domain-icon>` : null, $ = y`<span
                  class="sensor-value"
                  @action=${this._handleSensorAction(c, r)}
                  .actionHandler=${Z({
          hasHold: T(h == null ? void 0 : h.hold_action),
          hasDoubleClick: T(h == null ? void 0 : h.double_tap_action)
        })}
                  style=${`${_ ? `color: var(--${_}-color);` : ""} ${this._parseCss(h == null ? void 0 : h.css)}`}
                >
                  ${!((w = this._config) != null && w.show_sensor_icons) && !((z = this._config) != null && z.wrap_sensor_icons) && d > 0 ? " - " : ""}
                  ${m ? this.hass.formatEntityState(m) : this._average(c, r)}
                </span>`;
        return y`<div class="sensor-row off">${b}${$}</div>`;
      }
    ) : y`<div class="sensor text-medium off">
              ${X(
      t,
      (c) => c.domain + "-" + c.deviceClass,
      ({ domain: c, deviceClass: r, index: d }) => {
        var v, f, w, z;
        const l = e[c].filter(
          (E) => E.attributes.device_class === r && !o.includes(E.entity_id)
        );
        if (l.length === 0)
          return C;
        const u = (() => {
          switch (r) {
            case "temperature":
              return i.temperature_entity_id;
            case "humidity":
              return i.humidity_entity_id;
            default:
              return null;
          }
        })(), m = u ? this.hass.states[u] : void 0, h = s.get(r), _ = (h == null ? void 0 : h.color) || ((v = this._config) == null ? void 0 : v.sensor_color), g = (h == null ? void 0 : h.invert) === !0, p = l.some(
          (E) => !de.includes(E.state) && !Y.includes(E.state) && !o.includes(E.entity_id)
        );
        if (g && p)
          return C;
        const b = (f = this._config) != null && f.show_sensor_icons ? y`<ha-domain-icon
                        style=${_ ? `color: var(--${_}-color);` : ""}
                        .hass=${this.hass}
                        .domain=${c}
                        .deviceClass=${r}
                      ></ha-domain-icon>` : null, $ = y`<span
                    class="sensor-value"
                    @action=${this._handleSensorAction(c, r)}
                    .actionHandler=${Z({
          hasHold: T(h == null ? void 0 : h.hold_action),
          hasDoubleClick: T(
            h == null ? void 0 : h.double_tap_action
          )
        })}
                    style=${`${_ ? `color: var(--${_}-color);` : ""} ${this._parseCss(h == null ? void 0 : h.css)}`}
                  >
                    ${!((w = this._config) != null && w.show_sensor_icons) && !((z = this._config) != null && z.wrap_sensor_icons) && d > 0 ? " - " : ""}
                    ${m ? this.hass.formatEntityState(m) : this._average(c, r)}
                  </span>`;
        return y`${b}${$}`;
      }
    )}
            </div>`}
      </div>
    `;
  }
  _renderClimates(t, e, i) {
    var o;
    const s = ((o = this._config) == null ? void 0 : o.excluded_entities) || [];
    return y`
      <div class="climate text-small off">
        ${X(
      t,
      (n) => n.domain,
      ({ domain: n }) => {
        var m;
        const c = e[n].filter((h) => {
          const _ = h.attributes.hvac_action, g = h.state, p = !de.includes(g) && !Y.includes(g) && !s.includes(h.entity_id);
          return _ !== void 0 ? p && (_ !== "idle" && _ !== "off") : p;
        }).map((h) => {
          var g, p, b;
          return `${h.attributes.temperature || "N/A"} ${((b = (p = (g = this.hass) == null ? void 0 : g.config) == null ? void 0 : p.unit_system) == null ? void 0 : b.temperature) || ""}`;
        });
        if (c.length === 0)
          return C;
        const r = i.get(n);
        if ((r == null ? void 0 : r.display_mode) === "icon")
          return C;
        const l = r == null ? void 0 : r.color, u = `${l ? `color: var(--${l}-color);` : (m = this._config) != null && m.domain_color ? `color: ${this._config.domain_color};` : ""} ${this._parseCss(r == null ? void 0 : r.css)}`;
        return y`<div
              class="climate"
              style=${u}
              @action=${this._handleDomainAction(n)}
              .actionHandler=${Z({
          hasHold: T(r == null ? void 0 : r.hold_action),
          hasDoubleClick: T(r == null ? void 0 : r.double_tap_action)
        })}
            >
              (${c.join(", ")})
            </div>`;
      }
    )}
      </div>
    `;
  }
  _renderBottom(t, e, i, s, o, n, a) {
    var c, r;
    return y`
      <div
        class="${V({
      bottom: !0,
      ...e
    })}"
        style=${`
          ${(c = this._config) != null && c.area_name_color ? `color: var(--${this._config.area_name_color}-color);` : ""}
          ${(r = this._config) != null && r.name_css ? this._config.name_css.split(`
`).reduce((d, l) => {
      const u = l.trim();
      return u && u.includes(":") && (d += u.endsWith(";") ? u : `${u};`, d += " "), d;
    }, "") : ""}
        `}
      >
        <div
          class="${V({
      name: !0,
      ...e,
      "text-large": !0,
      on: !0
    })}"
          @action=${this._handleAction}
          .actionHandler=${Z({
      hasHold: T(this._config.hold_action),
      hasDoubleClick: T(this._config.double_tap_action)
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
      a
    )}
      </div>
    `;
  }
  render() {
    var N, ie, ge, ve, ye, be, $e, we, Ce, xe, A, D, O, B;
    if (!this._config || !this.hass || !this._areas || !this._devices || !this._entities)
      return C;
    const t = ((N = this._config) == null ? void 0 : N.design) === "V2", e = t && ((ie = this._config) != null && ie.v2_color) ? this._calculateV2Color(this._config.v2_color) : "var(--primary-color)", i = {
      mirrored: this._config.mirrored === !0
    }, s = {
      v2: ((ge = this._config) == null ? void 0 : ge.design) === "V2",
      row: ((ve = this._config) == null ? void 0 : ve.layout) === "horizontal"
    };
    let o = 3;
    try {
      const S = ((ye = this.shadowRoot) == null ? void 0 : ye.host) || document.documentElement, F = getComputedStyle(S).getPropertyValue("--row-size");
      F && (o = Number(F.trim()) || 3);
    } catch {
    }
    const n = t ? { background: e } : {}, a = t && o === 1 ? {} : t ? { background: e } : {}, c = this.layout === "grid", r = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), d = this._area(this._config.area, this._areas), l = /* @__PURE__ */ new Map();
    (((be = this._config) == null ? void 0 : be.customization_domain) || []).forEach(
      (S) => l.set(S.type, S)
    );
    const u = /* @__PURE__ */ new Map();
    ((($e = this._config) == null ? void 0 : $e.customization_cover) || []).forEach(
      (S) => u.set(S.type, S)
    );
    const m = /* @__PURE__ */ new Map();
    (((we = this._config) == null ? void 0 : we.customization_alert) || []).forEach(
      (S) => m.set(S.type, S)
    );
    const h = /* @__PURE__ */ new Map();
    (((Ce = this._config) == null ? void 0 : Ce.customization_sensor) || []).forEach(
      (S) => h.set(S.type, S)
    );
    const _ = this._computeCovers(r, this._deviceClasses), g = this._computeAlerts(r, this._deviceClasses), p = this._computeButtons(
      this._config.toggle_domains,
      r
    ), b = this._computeSensors(r, this._deviceClasses), $ = ((A = (xe = this._config) == null ? void 0 : xe.toggle_domains) != null && A.includes("climate") ? tt : []).filter((S) => S in r).map((S) => ({ domain: S })), v = (((D = this._config) == null ? void 0 : D.display_type) || "").toString().toLowerCase(), f = v.includes("camera"), w = v.includes("picture") || v.includes("image"), z = v === "" ? !0 : v.includes("icon"), E = this._computeCameraEntity(
      f,
      r
    );
    if (d === null)
      return y`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    const k = this._computeIconStyles(
      t,
      o,
      (O = this._config) == null ? void 0 : O.icon_css,
      (B = this._config) == null ? void 0 : B.area_icon_color
    );
    return y`
      <ha-card
        class="${V(i)}"
        style=${Te({
      paddingBottom: c ? "0" : "12em"
    })}
      >
        ${f && E || w && d.picture ? y`
              <hui-image
                .config=${this._config}
                .hass=${this.hass}
                .image=${f ? void 0 : d.picture}
                .cameraImage=${f ? E : void 0}
                .cameraView=${this._config.camera_view}
                fitMode="cover"
              ></hui-image>
            ` : C}

        <div
          class="${V({
      "icon-container": !0,
      ...s
    })}"
          style=${Te(a)}
        >
          ${z ? y`
                <ha-icon
                  style=${Te(k)}
                  icon=${this._config.area_icon || d.icon}
                ></ha-icon>
              ` : C}
        </div>

        <div
          class="${V({
      content: !0,
      ...s
    })}"
          @action=${this._handleAction}
          .actionHandler=${Z({
      hasHold: T(this._config.hold_action),
      hasDoubleClick: T(this._config.double_tap_action)
    })}
        >
          <div
            class="${V({
      right: !0,
      ...s
    })}"
            style=${Te(n)}
          >
            <!-- Covers -->
            ${this._renderCovers(
      _,
      r,
      u
    )}

            <!-- Alerts -->
            ${this._renderAlerts(
      g,
      r,
      m
    )}
            ${this.renderCustomButtons()}

            <!-- Buttons -->
            ${this._renderButtons(
      p,
      r,
      l
    )}
          </div>

          ${this._renderBottom(
      d,
      s,
      b,
      r,
      h,
      $,
      l
    )}
        </div>
      </ha-card>
    `;
  }
  _calculateV2Color(t) {
    return `rgba(${t.join(", ")})`;
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
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!i || i.theme !== this._config.theme)) && Pi(this, this.hass.themes, this._config.theme);
  }
  _showPopupForDomain(t, e) {
    this.selectedDeviceClass = e || null, this._openDomainPopup(t);
  }
  _getIcon(t, e, i) {
    if (t in He) {
      const s = He[t];
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
  static get styles() {
    return _e`
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
        align-items: end;
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
W([
  L({ attribute: !1 })
], U.prototype, "hass", 2);
W([
  M()
], U.prototype, "_config", 2);
W([
  M()
], U.prototype, "_areas", 2);
W([
  M()
], U.prototype, "_devices", 2);
W([
  M()
], U.prototype, "_entities", 2);
W([
  M()
], U.prototype, "selectedDomain", 2);
W([
  M()
], U.prototype, "selectedDeviceClass", 2);
W([
  M()
], U.prototype, "selectedGroup", 2);
W([
  M()
], U.prototype, "layout", 2);
U = W([
  J("area-card-plus")
], U);
var vs = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, I = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ys(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && vs(e, i, o), o;
};
class le extends K {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    if (!this.hass)
      return C;
    const e = new Set(
      (this.customization || []).map((s) => s.type)
    ), i = this.SelectOptions.filter(
      (s) => !e.has(s.value)
    );
    return y`
      <div class="customization">
        ${this.customization && X(
      this.customization,
      (s) => this._getKey(s),
      (s, o) => {
        var n;
        return y`
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
                @closed=${(a) => a.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                <mwc-list-item .value=${s.type} selected disabled>
                  ${((n = this.SelectOptions.find((a) => a.value === s.type)) == null ? void 0 : n.label) || s.type}
                </mwc-list-item>
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${pt}
                class="remove-icon"
                .index=${o}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${ti}
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
      (s) => y`<mwc-list-item .value=${s.value}
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
    o[s] = { ...o[s], type: i || "" }, H(this, "config-changed", o);
  }
  _removeRow(e) {
    e.stopPropagation();
    const i = e.currentTarget.index;
    if (i != null) {
      const s = this.customization.concat();
      s.splice(i, 1), H(this, "config-changed", s);
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const i = e.target.index;
    i != null && H(this, "edit-item", i);
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
    H(this, "config-changed", [...this.customization, o]), i.value = "";
  }
  static get styles() {
    return _e`
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
I([
  L({ attribute: !1 })
], le.prototype, "hass", 2);
I([
  L({ type: Array })
], le.prototype, "SelectOptions", 2);
let st = class extends le {
  get customization() {
    return this.customization_domain;
  }
};
I([
  L({ attribute: !1 })
], st.prototype, "customization_domain", 2);
st = I([
  J("domain-items-editor")
], st);
let ot = class extends le {
  get customization() {
    return this.customization_alert;
  }
};
I([
  L({ attribute: !1 })
], ot.prototype, "customization_alert", 2);
ot = I([
  J("alert-items-editor")
], ot);
let nt = class extends le {
  get customization() {
    return this.customization_cover;
  }
};
I([
  L({ attribute: !1 })
], nt.prototype, "customization_cover", 2);
nt = I([
  J("cover-items-editor")
], nt);
let at = class extends le {
  get customization() {
    return this.customization_sensor;
  }
};
I([
  L({ attribute: !1 })
], at.prototype, "customization_sensor", 2);
at = I([
  J("sensor-items-editor")
], at);
let rt = class extends le {
  get customization() {
    return this.customization_popup;
  }
};
I([
  L({ attribute: !1 })
], rt.prototype, "customization_popup", 2);
rt = I([
  J("popup-items-editor")
], rt);
let Me = class extends K {
  _editRow(t) {
    t.stopPropagation();
    const e = t.currentTarget.index;
    H(this, "edit-item", e);
  }
  _removeRow(t) {
    if (t.stopPropagation(), !this.custom_buttons) return;
    const e = t.currentTarget.index, i = [...this.custom_buttons];
    i.splice(e, 1), H(this, "config-changed", i);
  }
  _addRow() {
    const t = {
      name: "",
      icon: "",
      tap_action: { action: "none" }
    }, e = [...this.custom_buttons || [], t];
    H(this, "config-changed", e);
  }
  render() {
    var t;
    return this.hass ? y`
      <div class="custom-buttons">
        ${(t = this.custom_buttons) == null ? void 0 : t.map(
      (e, i) => y`
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
                .path=${ti}
                .index=${i}
                @click=${this._editRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${pt}
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
    ` : C;
  }
};
Me.styles = _e`
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
I([
  L({ attribute: !1 })
], Me.prototype, "hass", 2);
I([
  L({ attribute: !1 })
], Me.prototype, "custom_buttons", 2);
Me = I([
  J("custom-buttons-editor")
], Me);
var bs = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, fe = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? $s(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && bs(e, i, o), o;
};
let ce = class extends K {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = x(() => {
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
    }), this._schemaalert = x(() => {
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
    }), this._schemasensor = x(() => {
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
    }), this._schemacustombutton = x(() => {
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
      return y``;
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
    return y`
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
    return _e`
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
fe([
  L({ attribute: !1 })
], ce.prototype, "config", 2);
fe([
  L({ attribute: !1 })
], ce.prototype, "hass", 2);
fe([
  L({ type: Boolean })
], ce.prototype, "useSensorSchema", 2);
fe([
  M()
], ce.prototype, "getSchema", 2);
fe([
  M()
], ce.prototype, "_config", 2);
ce = fe([
  J("item-editor")
], ce);
var ws = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, G = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Cs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && ws(e, i, o), o;
};
let R = class extends K {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this._subElementEditorCustomButton = void 0, this.computeLabel = x((t) => ii(this.hass, t)), this._schema = x(
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
                          const n = (r) => {
                            const d = r.trim().toLowerCase();
                            return d === "icon" ? "ui.panel.lovelace.editor.card.generic.icon" : d === "picture" || d === "image" ? "ui.components.selectors.image.image" : d === "camera" ? "ui.panel.lovelace.editor.card.area.display_type_options.camera" : `ui.panel.lovelace.editor.card.area.display_type_options.${r}`;
                          }, c = o.split(" & ").map((r) => r.trim()).map((r) => i(n(r)) || r).join(" & ");
                          return { value: o, label: c };
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
    ), this._binaryschema = x((t) => [
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
    ]), this._coverschema = x((t) => [
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
    ]), this._sensorschema = x((t) => [
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
    ]), this._toggleschema = x((t) => [
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
    ]), this._popupschema = x(
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
    ), this._binaryClassesForArea = x(
      (t) => this._classesForArea(t, "binary_sensor")
    ), this._coverClassesForArea = x(
      (t) => this._classesForArea(t, "cover")
    ), this._sensorClassesForArea = x(
      (t, e) => this._classesForArea(t, "sensor", e)
    ), this._toggleDomainsForArea = x(
      (t) => this._classesForArea(t, "toggle")
    ), this._allDomainsForArea = x(
      (t) => this._classesForArea(t, "all")
    ), this._buildBinaryOptions = x(
      (t, e) => this._buildOptions("binary_sensor", t, e)
    ), this._buildCoverOptions = x(
      (t, e) => this._buildOptions("cover", t, e)
    ), this._buildSensorOptions = x(
      (t, e) => this._buildOptions("sensor", t, e)
    ), this._buildToggleOptions = x(
      (t, e) => this._buildOptions("toggle", t, e)
    ), this._buildAllOptions = x(
      (t, e) => this._buildOptions("all", t, e)
    ), this._entityOptions = [], this._toggleEntityHidden = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.hidden_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        hidden_entities: i
      }, H(this, "config-changed", { config: this._config });
    }, this._toggleEntityExcluded = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.excluded_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        excluded_entities: i
      }, H(this, "config-changed", { config: this._config });
    };
  }
  _classesForArea(t, e, i) {
    var o;
    let s;
    if (e === "toggle")
      return s = Object.values(this.hass.entities).filter(
        (n) => {
          var a;
          return (ke.includes(P(n.entity_id)) || tt.includes(P(n.entity_id))) && !n.hidden && (n.area_id === t || n.device_id && ((a = this.hass.devices[n.device_id]) == null ? void 0 : a.area_id) === t);
        }
      ), [
        ...new Set(s.map((n) => P(n.entity_id)))
      ];
    if (e === "all") {
      const n = ((o = this._config) == null ? void 0 : o.extra_entities) || [];
      let a = Object.values(this.hass.entities).filter(
        (r) => {
          var d;
          return !r.hidden && (r.area_id === t || r.device_id && ((d = this.hass.devices[r.device_id]) == null ? void 0 : d.area_id) === t);
        }
      );
      const c = n.map((r) => this.hass.states[r]).filter((r) => r !== void 0);
      return a = [...a, ...c], [...new Set(a.map((r) => P(r.entity_id)))];
    } else {
      s = Object.values(this.hass.entities).filter(
        (a) => {
          var c;
          return P(a.entity_id) === e && !a.entity_category && !a.hidden && (a.area_id === t || a.device_id && ((c = this.hass.devices[a.device_id]) == null ? void 0 : c.area_id) === t);
        }
      );
      const n = s.map(
        (a) => {
          var c;
          return ((c = this.hass.states[a.entity_id]) == null ? void 0 : c.attributes.device_class) || "";
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
      (n, a) => Zt(n.label, a.label, this.hass.locale.language)
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
        const i = t.get("_config"), s = i == null ? void 0 : i.area, o = this._config.area, n = (i == null ? void 0 : i.extra_entities) || [], a = this._config.extra_entities || [], c = (i == null ? void 0 : i.popup_domains) || [], r = ((e = this._config) == null ? void 0 : e.popup_domains) || [], d = n.length !== a.length || !n.every(
          (u) => a.includes(u)
        ), l = c.length !== r.length || !c.every(
          (u) => r.includes(u)
        );
        if (s !== void 0 && s !== o) {
          const u = this._toggleDomainsForArea(o), m = this._binaryClassesForArea(o), h = this._coverClassesForArea(o), _ = this._allDomainsForArea(o), g = u.sort(
            (v, f) => ke.indexOf(v) - ke.indexOf(f)
          ), p = Object.keys(He || {}), b = new Map(
            p.map((v, f) => [v, f])
          ), $ = _.sort((v, f) => {
            const w = b.has(v) ? b.get(v) : Number.MAX_SAFE_INTEGER, z = b.has(f) ? b.get(f) : Number.MAX_SAFE_INTEGER;
            return w === z ? v.localeCompare(f) : w - z;
          });
          if (this._config.toggle_domains = [
            ...g.filter((v) => v !== "scene" && v !== "script")
          ], this._config.alert_classes = [...m], this._config.cover_classes = [...h], this._config.popup_domains = [...$], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
            const v = this._config.hidden_entities, f = Object.values(this._hiddenEntitiesByDomain()).flat(), w = v.filter((z) => f.includes(z));
            w.length !== v.length && (this._config = {
              ...this._config || {},
              hidden_entities: w
            }, H(this, "config-changed", {
              config: { ...this._config }
            }));
          }
          this.requestUpdate();
        }
        if (d) {
          for (const u of a) {
            const m = P(u);
            this._config.popup_domains.includes(m) || this._config.popup_domains.push(m);
          }
          this.requestUpdate();
        }
        l && this._updateEntityOptions();
      }
      if (!this._numericDeviceClasses) {
        const { numeric_device_classes: i } = await Xi(this.hass);
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
        return !i.hidden && e.includes(P(i.entity_id)) && (i.area_id === t || i.device_id && ((s = this.hass.devices[i.device_id]) == null ? void 0 : s.area_id) === t);
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
    }, H(this, "config-changed", { config: { ...this._config } });
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
    t.stopPropagation(), !(!this._config || !this.hass) && H(this, "config-changed", {
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
    return y`
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
      s[e] = t.detail, H(this, "config-changed", {
        config: { ...this._config, custom_buttons: s }
      });
    }
  }
  _customizationChangedCustomButtons(t) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = t.detail;
    H(this, "config-changed", {
      config: { ...this._config, custom_buttons: e }
    });
  }
  _renderSubElementEditor(t, e, i) {
    var l, u, m;
    const s = `customization_${t}`, o = (l = this._config) == null ? void 0 : l[s], n = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, a = ((u = this[n]) == null ? void 0 : u.index) ?? 0, c = ((m = o == null ? void 0 : o[a]) == null ? void 0 : m.type) ?? "unknown", r = c.match(/^(.+?)\s*-\s*(.+)$/);
    let d;
    if (r) {
      const h = r[1].toLowerCase().replace(" ", "_"), _ = r[2].toLowerCase(), g = this.hass.localize(`component.${h}.entity_component._.name`) || r[1];
      let p = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${h}.${_}`
      ) || r[2];
      p = p.charAt(0).toUpperCase() + p.slice(1), d = `${g} – ${p}`;
    } else {
      let h = this.hass.localize(`component.${c}.entity_component._.name`) || c;
      h = h.charAt(0).toUpperCase() + h.slice(1), d = h;
    }
    return y`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${e}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </mwc-icon-button>
          <span slot="title">${d}</span>
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
      o[s] = t.detail, H(this, "config-changed", {
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
    var i, s, o, n, a, c;
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
          ((a = this._config) == null ? void 0 : a.cover_classes) || this._coverClassesForArea(e)
        );
      case "sensor":
        return this._buildSensorOptions(
          this._sensorClassesForArea(e),
          ((c = this._config) == null ? void 0 : c.sensor_classes) || this._sensorClassesForArea(e)
        );
    }
  }
  get entityOptions() {
    return this._entityOptions;
  }
  _domainIcon(t, e = "on", i) {
    const s = He;
    if (t in s) {
      const o = s[t];
      return typeof o == "string" ? o : i && o[i] ? o[i][e === "off" ? "off" : "on"] || o[i] : o[e === "off" ? "off" : "on"] || Object.values(o)[0];
    }
    return "mdi:help-circle";
  }
  _groupAllEntitiesByDomain() {
    var a;
    const t = {}, e = (this.entityOptions || []).map((c) => c.value);
    for (const c of e) {
      const r = P(c);
      t[r] || (t[r] = []), t[r].push(c);
    }
    const i = this._hiddenEntitiesByDomain(), s = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])
    ), o = ((a = this.hass) == null ? void 0 : a.states) || {}, n = this.compareByFriendlyName ? this.compareByFriendlyName(o, this.hass.locale.language) : (c, r) => c.localeCompare(r);
    return s.sort((c, r) => c.localeCompare(r)).map((c) => {
      const r = /* @__PURE__ */ new Set([
        ...t[c] || [],
        ...i[c] || []
      ]);
      return { domain: c, entities: Array.from(r).sort(n) };
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
    var a, c, r;
    const i = ((a = this.hass) == null ? void 0 : a.states) || {}, s = {};
    for (const d of e) {
      const l = ((r = (c = i[d]) == null ? void 0 : c.attributes) == null ? void 0 : r.device_class) || "";
      l && (s[l] || (s[l] = []), s[l].push(d));
    }
    const o = this.compareByFriendlyName ? this.compareByFriendlyName(i, this.hass.locale.language) : (d, l) => d.localeCompare(l);
    return Object.keys(s).sort((d, l) => d.localeCompare(l)).map((d) => ({
      deviceClass: d,
      label: this._getDeviceClassLabel(t, d),
      entities: s[d].slice().sort(o)
    }));
  }
  _hiddenEntitiesByDomain() {
    var u, m, h, _, g, p, b;
    const t = {}, e = Array.isArray((u = this._config) == null ? void 0 : u.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const i = ((m = this.hass) == null ? void 0 : m.entities) || {}, s = ((h = this.hass) == null ? void 0 : h.devices) || {}, o = (_ = this.hass) != null && _.areas ? Object.values(this.hass.areas) : [], n = (g = this._config) == null ? void 0 : g.area, a = (p = this._config) == null ? void 0 : p.floor, c = (b = this._config) == null ? void 0 : b.label, r = n ? Array.isArray(n) ? n : [n] : [], d = a ? Array.isArray(a) ? a : [a] : [], l = c ? Array.isArray(c) ? c : [c] : [];
    for (const $ of e) {
      const v = P($), f = i[$], w = f != null && f.device_id ? s[f.device_id] : void 0;
      if (((f == null ? void 0 : f.area_id) != null || (w == null ? void 0 : w.area_id) != null) && !(l.length && !(Array.isArray(f == null ? void 0 : f.labels) && f.labels.some((k) => l.includes(k)) || Array.isArray(w == null ? void 0 : w.labels) && w.labels.some((k) => l.includes(k)))) && !(r.length && !(f != null && f.area_id && r.includes(f.area_id) || w != null && w.area_id && r.includes(w.area_id)))) {
        if (d.length) {
          const E = (f == null ? void 0 : f.area_id) && o.some(
            (N) => N.area_id === f.area_id && N.floor_id && d.includes(N.floor_id)
          ), k = (w == null ? void 0 : w.area_id) && o.some(
            (N) => N.area_id === w.area_id && N.floor_id && d.includes(N.floor_id)
          );
          if (!E && !k) continue;
        }
        t[v] || (t[v] = []), t[v].push($);
      }
    }
    return t;
  }
  render() {
    var u;
    if (!this.hass || !this._config)
      return C;
    const t = this._toggleDomainsForArea(
      this._config.area || ""
    ), e = this._binaryClassesForArea(
      this._config.area || ""
    ), i = this._coverClassesForArea(
      this._config.area || ""
    ), s = this._allDomainsForArea(this._config.area || ""), o = this._schema(
      this._config.design || "V1",
      this._config.display_type
    ), n = this._binaryschema(this.binarySelectOptions), a = this._coverschema(this.coverSelectOptions), c = this._sensorschema(this.sensorSelectOptions), r = this._toggleschema(this.toggleSelectOptions), d = this._popupschema(
      this.AllSelectOptions,
      this.entityOptions
    ), l = {
      alert_classes: e,
      cover_classes: i,
      sensor_classes: it.sensor,
      toggle_domains: t,
      popup_domains: s,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorByKey("domain") : this._subElementEditorAlert ? this._renderSubElementEditorByKey("alert") : this._subElementEditorCover ? this._renderSubElementEditorByKey("cover") : this._subElementEditorSensor ? this._renderSubElementEditorByKey("sensor") : this._subElementEditorCustomButton ? this._renderSubElementEditorCustomButton() : y`
      <ha-form
        .hass=${this.hass}
        .data=${l}
        .schema=${o}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${rs}></ha-svg-icon>
          ${this.computeLabel({ name: "alert_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
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
          <ha-svg-icon .path=${ds}></ha-svg-icon>
          ${this.computeLabel({ name: "cover_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
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
          <ha-svg-icon .path=${cs}></ha-svg-icon>
          ${this.computeLabel({ name: "sensor_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
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
          <ha-svg-icon .path=${ls}></ha-svg-icon>
          ${this.computeLabel({ name: "toggle_domains" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
            .schema=${r}
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
          <ha-svg-icon .path=${hs}></ha-svg-icon>
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
          <ha-svg-icon .path=${us}></ha-svg-icon>
          ${this.computeLabel({ name: "popup" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
            .schema=${d}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>

          <ha-expansion-panel outlined class="main">
            <div slot="header" role="heading" aria-level="3">
              <ha-svg-icon .path=${et}></ha-svg-icon>
              ${this.computeLabel({ name: "hidden_entities" })}
            </div>
            <div class="content">
              <!-- Category filter selector for hidden entities -->
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
                @value-changed=${(m) => this._hiddenCategoryChanged(m)}
              ></ha-form>
              ${this._groupAllEntitiesByDomain().map(
      (m) => y`
                  <ha-expansion-panel outlined class="domain-panel">
                    <div slot="header" class="domain-header">
                      <ha-icon
                        .icon=${this._domainIcon(m.domain, "on")}
                      ></ha-icon>
                      <span class="domain-title"
                        >${this._domainLabel(m.domain)}</span
                      >
                    </div>
                    <div class="content">
                      ${["binary_sensor", "cover"].includes(m.domain) ? this._groupByDeviceClass(
        m.domain,
        m.entities
      ).map(
        (h) => y`
                              <ha-expansion-panel outlined class="domain-panel">
                                <div slot="header" class="dc-header">
                                  <ha-icon
                                    .icon=${this._domainIcon(
          m.domain,
          "on",
          h.deviceClass
        )}
                                  ></ha-icon>
                                  <span class="dc-title">${h.label}</span>
                                </div>
                                <div class="content">
                                  ${h.entities.map(
          (_) => {
            var g, p;
            return y`
                                      <div class="entity-row">
                                        <span class="entity-name">
                                          ${((p = (g = this.hass.states[_]) == null ? void 0 : g.attributes) == null ? void 0 : p.friendly_name) || _}
                                        </span>
                                        <ha-icon-button
                                          .path=${this._isHiddenEntity(_) ? Pt : et}
                                          .label=${this._isHiddenEntity(_) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                          @click=${() => this._toggleEntityHidden(_)}
                                        ></ha-icon-button>
                                        <ha-icon-button
                                          .path=${this._isExcludedEntity(_) ? It : Bt}
                                          .label=${this._isExcludedEntity(_) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                          @click=${() => this._toggleEntityExcluded(_)}
                                        ></ha-icon-button>
                                      </div>
                                    `;
          }
        )}
                                </div>
                              </ha-expansion-panel>
                            `
      ) : m.entities.map(
        (h) => {
          var _, g;
          return y`
                              <div class="entity-row">
                                <span class="entity-name">
                                  ${((g = (_ = this.hass.states[h]) == null ? void 0 : _.attributes) == null ? void 0 : g.friendly_name) || h}
                                </span>
                                <ha-icon-button
                                  .path=${this._isHiddenEntity(h) ? Pt : et}
                                  .label=${this._isHiddenEntity(h) ? this.hass.localize("ui.common.show") ?? "Show" : this.hass.localize("ui.common.hide") ?? "Hide"}
                                  @click=${() => this._toggleEntityHidden(h)}
                                ></ha-icon-button>
                                <ha-icon-button
                                  .path=${this._isExcludedEntity(h) ? It : Bt}
                                  .label=${this._isExcludedEntity(h) ? this.hass.localize("ui.common.show") ?? "Show" : this.hass.localize("ui.common.hide") ?? "Hide"}
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
R.styles = _e`
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
G([
  L({ attribute: !1 })
], R.prototype, "hass", 2);
G([
  M()
], R.prototype, "_config", 2);
G([
  M()
], R.prototype, "_entities", 2);
G([
  M()
], R.prototype, "_numericDeviceClasses", 2);
G([
  M()
], R.prototype, "_subElementEditorDomain", 2);
G([
  M()
], R.prototype, "_subElementEditorAlert", 2);
G([
  M()
], R.prototype, "_subElementEditorCover", 2);
G([
  M()
], R.prototype, "_subElementEditorSensor", 2);
G([
  M()
], R.prototype, "_subElementEditorCustomButton", 2);
R = G([
  J("area-card-plus-editor")
], R);
console.info(
  `%c AREA-CARD %c ${ni.version} `,
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
