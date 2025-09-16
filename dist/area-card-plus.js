const wi = "b1.0", Ai = {
  version: wi
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis, Dt = it.ShadowRoot && (it.ShadyCSS === void 0 || it.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kt = Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let ci = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== kt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Dt && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Nt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Nt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ci = (t) => new ci(typeof t == "string" ? t : t + "", void 0, kt), Xe = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1]), t[0]);
  return new ci(i, t, kt);
}, xi = (t, e) => {
  if (Dt) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), o = it.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, jt = Dt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Ci(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ei, defineProperty: Si, getOwnPropertyDescriptor: Oi, getOwnPropertyNames: Di, getOwnPropertySymbols: ki, getPrototypeOf: zi } = Object, ue = globalThis, Ut = ue.trustedTypes, Hi = Ut ? Ut.emptyScript : "", mt = ue.reactiveElementPolyfillSupport, qe = (t, e) => t, rt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Hi : null;
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
} }, zt = (t, e) => !Ei(t, e), Bt = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: zt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ue.litPropertyMetadata ?? (ue.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Bt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && Si(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = Oi(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(qe("elementProperties"))) return;
    const e = zi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(qe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(qe("properties"))) {
      const i = this.properties, s = [...Di(i), ...ki(i)];
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
      for (const o of s) i.unshift(jt(o));
    } else e !== void 0 && i.push(jt(e));
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
    return xi(e, this.constructor.elementStyles), e;
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
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : rt).toAttribute(i, s.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n, a;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((n = r.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? r.converter : rt;
      this._$Em = o;
      const l = c.fromAttribute(i, r.type);
      this[o] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    var o;
    if (e !== void 0) {
      const n = this.constructor, a = this[e];
      if (s ?? (s = n.getPropertyOptions(e)), !((s.hasChanged ?? zt)(a, i) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, s)))) return;
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
Se.elementStyles = [], Se.shadowRootOptions = { mode: "open" }, Se[qe("elementProperties")] = /* @__PURE__ */ new Map(), Se[qe("finalized")] = /* @__PURE__ */ new Map(), mt == null || mt({ ReactiveElement: Se }), (ue.reactiveElementVersions ?? (ue.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = globalThis, ct = Ke.trustedTypes, Rt = ct ? ct.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, li = "$lit$", he = `lit$${Math.random().toFixed(9).slice(2)}$`, di = "?" + he, Mi = `<${di}>`, Ce = document, Ge = () => Ce.createComment(""), Ze = (t) => t === null || typeof t != "object" && typeof t != "function", Ht = Array.isArray, Pi = (t) => Ht(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, Fe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Vt = />/g, ge = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), qt = /'/g, Kt = /"/g, hi = /^(?:script|style|textarea|title)$/i, Li = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), $ = Li(1), ee = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), Wt = /* @__PURE__ */ new WeakMap(), be = Ce.createTreeWalker(Ce, 129);
function ui(t, e) {
  if (!Ht(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Rt !== void 0 ? Rt.createHTML(e) : e;
}
const Ti = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Fe;
  for (let r = 0; r < i; r++) {
    const c = t[r];
    let l, d, h = -1, m = 0;
    for (; m < c.length && (a.lastIndex = m, d = a.exec(c), d !== null); ) m = a.lastIndex, a === Fe ? d[1] === "!--" ? a = Ft : d[1] !== void 0 ? a = Vt : d[2] !== void 0 ? (hi.test(d[2]) && (o = RegExp("</" + d[2], "g")), a = ge) : d[3] !== void 0 && (a = ge) : a === ge ? d[0] === ">" ? (a = o ?? Fe, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? ge : d[3] === '"' ? Kt : qt) : a === Kt || a === qt ? a = ge : a === Ft || a === Vt ? a = Fe : (a = ge, o = void 0);
    const u = a === ge && t[r + 1].startsWith("/>") ? " " : "";
    n += a === Fe ? c + Mi : h >= 0 ? (s.push(l), c.slice(0, h) + li + c.slice(h) + he + u) : c + he + (h === -2 ? r : u);
  }
  return [ui(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Je {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const r = e.length - 1, c = this.parts, [l, d] = Ti(e, i);
    if (this.el = Je.createElement(l, s), be.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = be.nextNode()) !== null && c.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(li)) {
          const m = d[a++], u = o.getAttribute(h).split(he), _ = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: n, name: _[2], strings: u, ctor: _[1] === "." ? Ni : _[1] === "?" ? ji : _[1] === "@" ? Ui : dt }), o.removeAttribute(h);
        } else h.startsWith(he) && (c.push({ type: 6, index: n }), o.removeAttribute(h));
        if (hi.test(o.tagName)) {
          const h = o.textContent.split(he), m = h.length - 1;
          if (m > 0) {
            o.textContent = ct ? ct.emptyScript : "";
            for (let u = 0; u < m; u++) o.append(h[u], Ge()), be.nextNode(), c.push({ type: 2, index: ++n });
            o.append(h[m], Ge());
          }
        }
      } else if (o.nodeType === 8) if (o.data === di) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(he, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += he.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = Ce.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Oe(t, e, i = t, s) {
  var a, r;
  if (e === ee) return e;
  let o = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const n = Ze(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = Oe(t, o._$AS(t, e.values), o, s)), e;
}
let Ii = class {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? Ce).importNode(i, !0);
    be.currentNode = o;
    let n = be.nextNode(), a = 0, r = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new De(n, n.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (l = new Bi(n, this, e)), this._$AV.push(l), c = s[++r];
      }
      a !== (c == null ? void 0 : c.index) && (n = be.nextNode(), a++);
    }
    return be.currentNode = Ce, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
};
class De {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = Oe(this, e, i), Ze(e) ? e === A || e == null || e === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : e !== this._$AH && e !== ee && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Pi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== A && Ze(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ce.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Je.createElement(ui(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const a = new Ii(o, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Wt.get(e.strings);
    return i === void 0 && Wt.set(e.strings, i = new Je(e)), i;
  }
  k(e) {
    Ht(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new De(this.O(Ge()), this.O(Ge()), this, this.options)) : s = i[o], s._$AI(n), o++;
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
class dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = A;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = Oe(this, e, i, 0), a = !Ze(e) || e !== this._$AH && e !== ee, a && (this._$AH = e);
    else {
      const r = e;
      let c, l;
      for (e = n[0], c = 0; c < n.length - 1; c++) l = Oe(this, r[s + c], i, c), l === ee && (l = this._$AH[c]), a || (a = !Ze(l) || l !== this._$AH[c]), l === A ? e = A : e !== A && (e += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
let Ni = class extends dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === A ? void 0 : e;
  }
};
class ji extends dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== A);
  }
}
class Ui extends dt {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Oe(this, e, i, 0) ?? A) === ee) return;
    const s = this._$AH, o = e === A && s !== A || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== A && (s === A || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Bi {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Oe(this, e);
  }
}
const Ri = { I: De }, ft = Ke.litHtmlPolyfillSupport;
ft == null || ft(Je, De), (Ke.litHtmlVersions ?? (Ke.litHtmlVersions = [])).push("3.3.1");
const Fi = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new De(e.insertBefore(Ge(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = globalThis;
let ne = class extends Se {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Fi(i, this.renderRoot, this.renderOptions);
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
    return ee;
  }
};
var ri;
ne._$litElement$ = !0, ne.finalized = !0, (ri = we.litElementHydrateSupport) == null || ri.call(we, { LitElement: ne });
const _t = we.litElementPolyfillSupport;
_t == null || _t({ LitElement: ne });
(we.litElementVersions ?? (we.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vi = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: zt }, qi = (t = Vi, e, i) => {
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
function N(t) {
  return (e, i) => typeof i == "object" ? qi(t, e, i) : ((s, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function q(t) {
  return N({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = { ATTRIBUTE: 1, CHILD: 2 }, ht = (t) => (...e) => ({ _$litDirective$: t, values: e });
let ut = class {
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
const ie = ht(class extends ut {
  constructor(t) {
    var e;
    if (super(t), t.type !== Mt.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return ee;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi = "important", Ki = " !" + mi, Ye = ht(class extends ut {
  constructor(t) {
    var e;
    if (super(t), t.type !== Mt.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const n = typeof o == "string" && o.endsWith(Ki);
        s.includes("-") || n ? i.setProperty(s, n ? o.slice(0, -11) : o, n ? mi : "") : i[s] = o;
      }
    }
    return ee;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Wi } = Ri, Gt = () => document.createComment(""), Ve = (t, e, i) => {
  var n;
  const s = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = s.insertBefore(Gt(), o), r = s.insertBefore(Gt(), o);
    i = new Wi(a, r, t, t.options);
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
}, ve = (t, e, i = t) => (t._$AI(e, i), t), Gi = {}, Zi = (t, e = Gi) => t._$AH = e, Ji = (t) => t._$AH, gt = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) s.set(t[o], o);
  return s;
}, oe = ht(class extends ut {
  constructor(t) {
    if (super(t), t.type !== Mt.CHILD) throw Error("repeat() can only be used in text expressions");
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
    const o = Ji(t), { values: n, keys: a } = this.dt(e, i, s);
    if (!Array.isArray(o)) return this.ut = a, n;
    const r = this.ut ?? (this.ut = []), c = [];
    let l, d, h = 0, m = o.length - 1, u = 0, _ = n.length - 1;
    for (; h <= m && u <= _; ) if (o[h] === null) h++;
    else if (o[m] === null) m--;
    else if (r[h] === a[u]) c[u] = ve(o[h], n[u]), h++, u++;
    else if (r[m] === a[_]) c[_] = ve(o[m], n[_]), m--, _--;
    else if (r[h] === a[_]) c[_] = ve(o[h], n[_]), Ve(t, c[_ + 1], o[h]), h++, _--;
    else if (r[m] === a[u]) c[u] = ve(o[m], n[u]), Ve(t, o[h], o[m]), m--, u++;
    else if (l === void 0 && (l = Zt(a, u, _), d = Zt(r, h, m)), l.has(r[h])) if (l.has(r[m])) {
      const v = d.get(a[u]), g = v !== void 0 ? o[v] : null;
      if (g === null) {
        const w = Ve(t, o[h]);
        ve(w, n[u]), c[u] = w;
      } else c[u] = ve(g, n[u]), Ve(t, o[h], g), o[v] = null;
      u++;
    } else gt(o[m]), m--;
    else gt(o[h]), h++;
    for (; u <= _; ) {
      const v = Ve(t, c[_ + 1]);
      ve(v, n[u]), c[u++] = v;
    }
    for (; h <= m; ) {
      const v = o[h++];
      v !== null && gt(v);
    }
    return this.ut = a, Zi(t, c), ee;
  }
});
var Jt = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function Xi(t, e) {
  return !!(t === e || Jt(t) && Jt(e));
}
function Yi(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!Xi(t[i], e[i]))
      return !1;
  return !0;
}
function x(t, e) {
  e === void 0 && (e = Yi);
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
var $e, Xt;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})($e || ($e = {})), (function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
})(Xt || (Xt = {}));
function pi() {
  return (pi = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
    }
    return t;
  }).apply(this, arguments);
}
function F(t) {
  return t.substr(0, t.indexOf("."));
}
var Qi = function(t) {
  switch (t.number_format) {
    case $e.comma_decimal:
      return ["en-US", "en"];
    case $e.decimal_comma:
      return ["de", "es", "it"];
    case $e.space_comma:
      return ["fr", "sv", "cs"];
    case $e.system:
      return;
    default:
      return t.language;
  }
}, es = function(t, e) {
  return e === void 0 && (e = 2), Math.round(t * Math.pow(10, e)) / Math.pow(10, e);
}, Yt = function(t, e, i) {
  var s = e ? Qi(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(n) {
    return typeof n == "number" && o(n);
  }, (e == null ? void 0 : e.number_format) !== $e.none && !Number.isNaN(Number(t)) && Intl) try {
    return new Intl.NumberFormat(s, Qt(t, i)).format(Number(t));
  } catch (o) {
    return console.error(o), new Intl.NumberFormat(void 0, Qt(t, i)).format(Number(t));
  }
  return typeof t == "string" ? t : es(t, i == null ? void 0 : i.maximumFractionDigits).toString() + ((i == null ? void 0 : i.style) === "currency" ? " " + i.currency : "");
}, Qt = function(t, e) {
  var i = pi({ maximumFractionDigits: 2 }, e);
  if (typeof t != "string") return i;
  if (!e || !e.minimumFractionDigits && !e.maximumFractionDigits) {
    var s = t.indexOf(".") > -1 ? t.split(".")[1].length : 0;
    i.minimumFractionDigits = s, i.maximumFractionDigits = s;
  }
  return i;
}, ts = ["closed", "locked", "off"], lt = function(t, e, i, s) {
  s = s || {}, i = i ?? {};
  var o = new Event(e, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return o.detail = i, t.dispatchEvent(o), o;
}, Pt = function(t, e, i) {
  var s;
  return function() {
    var o = [].slice.call(arguments), n = this, a = function() {
      s = null;
    }, r = !s;
    clearTimeout(s), s = setTimeout(a, e), r && t.apply(n, o);
  };
}, Qe = function(t) {
  lt(window, "haptic", t);
}, is = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), lt(window, "location-changed", { replace: i });
}, ss = function(t, e, i) {
  i === void 0 && (i = !0);
  var s, o = F(e), n = o === "group" ? "homeassistant" : o;
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
}, os = function(t, e) {
  var i = ts.includes(t.states[e].state);
  return ss(t, e, i);
}, ns = function(t, e, i, s) {
  if (s || (s = { action: "more-info" }), !s.confirmation || s.confirmation.exemptions && s.confirmation.exemptions.some(function(n) {
    return n.user === e.user.id;
  }) || (Qe("warning"), confirm(s.confirmation.text || "Are you sure you want to " + s.action + "?"))) switch (s.action) {
    case "more-info":
      (i.entity || i.camera_image) && lt(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      s.navigation_path && is(0, s.navigation_path);
      break;
    case "url":
      s.url_path && window.open(s.url_path);
      break;
    case "toggle":
      i.entity && (os(e, i.entity), Qe("success"));
      break;
    case "call-service":
      if (!s.service) return void Qe("failure");
      var o = s.service.split(".", 2);
      e.callService(o[0], o[1], s.service_data, s.target), Qe("success");
      break;
    case "fire-dom-event":
      lt(t, "ll-custom", s);
  }
}, vt = function(t, e, i, s) {
  var o;
  s === "double_tap" && i.double_tap_action ? o = i.double_tap_action : s === "hold" && i.hold_action ? o = i.hold_action : s === "tap" && i.tap_action && (o = i.tap_action), ns(t, e, i, o);
};
function V(t) {
  return t !== void 0 && t.action !== "none";
}
const as = (t) => {
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
}, rs = 5e3, cs = (t, e, i, s, o = { unsubGrace: !0 }) => {
  if (t[e])
    return t[e];
  let n = 0, a, r, c = as();
  const l = () => {
    if (!i)
      throw new Error("Collection does not support refresh");
    return i(t).then((v) => c.setState(v, !0));
  }, d = () => l().catch((v) => {
    if (t.connected)
      throw v;
  }), h = () => {
    if (r !== void 0) {
      clearTimeout(r), r = void 0;
      return;
    }
    s && (a = s(t, c)), i && (t.addEventListener("ready", d), d()), t.addEventListener("disconnected", _);
  }, m = () => {
    r = void 0, a && a.then((v) => {
      v();
    }), c.clearState(), t.removeEventListener("ready", l), t.removeEventListener("disconnected", _);
  }, u = () => {
    r = setTimeout(m, rs);
  }, _ = () => {
    r && (clearTimeout(r), m());
  };
  return t[e] = {
    get state() {
      return c.state;
    },
    refresh: l,
    subscribe(v) {
      n++, n === 1 && h();
      const g = c.subscribe(v);
      return c.state !== void 0 && setTimeout(() => v(c.state), 0), () => {
        g(), n--, n || (o.unsubGrace ? u() : m());
      };
    }
  }, t[e];
}, Lt = (t, e, i, s, o) => cs(s, t, e, i).subscribe(o);
var ls = Object.defineProperty, ds = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && ls(e, i, o), o;
};
const hs = (t) => us(t.attributes), us = (t, e) => !!t.unit_of_measurement || !!t.state_class || [].includes(t.device_class || ""), ei = (t, e) => t === "°" ? "" : e && t === "%" ? ms(e) : " ", ms = (t) => {
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
}, ps = x(
  (t) => new Intl.Collator(t)
), fs = x(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), fi = (t, e) => t < e ? -1 : t > e ? 1 : 0, _s = (t, e, i = void 0) => Intl != null && Intl.Collator ? ps(i).compare(t, e) : fi(t, e), _i = (t, e, i = void 0) => Intl != null && Intl.Collator ? fs(i).compare(t, e) : fi(t.toLowerCase(), e.toLowerCase());
let et;
const gs = async (t) => et || (et = t.callWS({
  type: "sensor/numeric_device_classes"
}), et), gi = (t) => t.sendMessagePromise({
  type: "config/area_registry/list"
}).then(
  (e) => e.sort((i, s) => _s(i.name, s.name))
), vs = (t, e) => t.subscribeEvents(
  Pt(
    () => gi(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "area_registry_updated"
), ti = (t, e) => Lt(
  "_areaRegistry",
  gi,
  vs,
  t,
  e
), vi = (t) => t.sendMessagePromise({
  type: "config/device_registry/list"
}), ys = (t, e) => t.subscribeEvents(
  Pt(
    () => vi(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "device_registry_updated"
), bs = (t, e) => Lt(
  "_dr",
  vi,
  ys,
  t,
  e
), yi = (t) => t.sendMessagePromise({
  type: "config/entity_registry/list"
}), $s = (t, e) => t.subscribeEvents(
  Pt(
    () => yi(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "entity_registry_updated"
), ws = (t, e) => Lt(
  "_entityRegistry",
  yi,
  $s,
  t,
  e
), As = async (t, e) => new Promise((i) => {
  const s = e(t, (o) => {
    s(), i(o);
  });
}), Cs = (t) => {
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
  return ds([
    N({ attribute: !1 })
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
class xs extends HTMLElement {
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
    e.actionHandler && st(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
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
customElements.define("action-handler-area-card", xs);
const Es = () => {
  const t = document.body;
  if (t.querySelector("action-handler-area-card"))
    return t.querySelector("action-handler-area-card");
  const e = document.createElement("action-handler-area-card");
  return t.appendChild(e), e;
}, Ss = (t, e) => {
  const i = Es();
  i && i.bind(t, e);
}, de = ht(
  class extends ut {
    update(t, [e]) {
      return Ss(t.element, e), ee;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    render(t) {
    }
  }
), st = (t, e) => {
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
        if (!st(t[i], e[i]))
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
        if (!st(i[1], e.get(i[0])))
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
      if (!st(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}, tt = (t) => {
  const e = parseFloat(t);
  if (isNaN(e))
    throw new Error(`${t} is not a number`);
  return e;
};
function ii(t) {
  if (!t)
    return null;
  try {
    if (t.endsWith("%"))
      return { w: 100, h: tt(t.substr(0, t.length - 1)) };
    const e = t.replace(":", "x").split("x");
    return e.length === 0 ? null : e.length === 1 ? { w: tt(e[0]), h: 1 } : { w: tt(e[0]), h: tt(e[1]) };
  } catch {
  }
  return null;
}
const Os = (t, e, i, s, o) => {
  var h, m, u, _, v;
  const n = i || void 0, a = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let r = n || "", c = {};
  if (n === "default" && ((h = t.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((m = e == null ? void 0 : e.themes) != null && m[n])) {
    const { modes: g, ...w } = e.themes[n] || {};
    c = { ...c, ...w }, g && (a && g.dark ? c = { ...c, ...g.dark } : !a && g.light && (c = { ...c, ...g.light }));
  } else if (!n && (!((u = t.__themes) != null && u.keys) || t.__themes.keys.size === 0))
    return;
  const l = ((_ = t.__themes) == null ? void 0 : _.keys) || /* @__PURE__ */ new Set(), d = new Set(Object.keys(c));
  if (n === "default" && d.size === 0) {
    for (const g of l)
      try {
        t.style.removeProperty(`--${g}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((v = t.__themes) == null ? void 0 : v.cacheKey) === r) {
    let g = !0;
    if (l.size !== d.size)
      g = !1;
    else
      for (const w of l)
        if (!d.has(w)) {
          g = !1;
          break;
        }
    if (g) return;
  }
  for (const g of l)
    if (!d.has(g))
      try {
        t.style.removeProperty(`--${g}`);
      } catch {
      }
  for (const [g, w] of Object.entries(c))
    t.style.setProperty(`--${g}`, String(w));
  t.__themes.cacheKey = r || null, t.__themes.keys = d;
};
function si(t, e) {
  var i, s;
  return ((s = (i = t == null ? void 0 : t[e]) == null ? void 0 : i.attributes) == null ? void 0 : s.friendly_name) || e;
}
function oi(t, e) {
  return (i, s) => _i(
    si(t, i),
    si(t, s),
    e
  );
}
const ye = ["unavailable", "unknown"], se = [
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
], ot = ["sensor"], nt = ["binary_sensor"], at = ["cover"], bt = ["climate"], We = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
  "script",
  "scene"
], Ds = ["camera"], $t = [
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
], wt = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: ["garage"]
}, At = {
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
}, ks = "16:5";
var zs = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", Hs = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", bi = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Ms = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", ni = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", yt = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", Ps = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", Ls = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", Ts = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z";
function ai(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
function $i(t, e) {
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
var Is = Object.defineProperty, pe = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && Is(e, i, o), o;
};
const Ns = /* @__PURE__ */ new Set([
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
var Ae;
const re = (Ae = class extends ne {
  constructor() {
    super(...arguments), this.open = !1, this.content = "", this.entities = [], this._cardEls = /* @__PURE__ */ new Map(), this._onClosed = (e) => {
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
      (e, i, s) => $i(this.hass, e)
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
    var u, _, v, g, w, E, U, C, H, Z, K;
    const i = this.card, s = F(e.entity_id), o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : (g = (v = (_ = (u = this.hass) == null ? void 0 : u.states) == null ? void 0 : _[e.entity_id]) == null ? void 0 : v.attributes) == null ? void 0 : g.device_class, a = (i == null ? void 0 : i._config) || {};
    let r;
    nt.includes(o) ? (r = (w = a.customization_alert) == null ? void 0 : w.find(
      (M) => M.type === n
    ), r || (r = (E = a.customization_domain) == null ? void 0 : E.find(
      (M) => M.type === o
    ))) : ot.includes(o) ? (r = (U = a.customization_sensor) == null ? void 0 : U.find(
      (M) => M.type === n
    ), r || (r = (C = a.customization_domain) == null ? void 0 : C.find(
      (M) => M.type === o
    ))) : at.includes(o) ? (r = (H = a.customization_cover) == null ? void 0 : H.find(
      (M) => M.type === n
    ), r || (r = (Z = a.customization_domain) == null ? void 0 : Z.find(
      (M) => M.type === o
    ))) : r = (K = a.customization_domain) == null ? void 0 : K.find(
      (M) => M.type === o
    );
    const c = r == null ? void 0 : r.popup_card, l = c && typeof c.type == "string" && c.type || (r == null ? void 0 : r.popup_card_type) || "tile", d = l === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let h = {};
    if (c && typeof c == "object") {
      const { type: M, entity: W, ..._e } = c;
      h = _e;
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
    return !Ns.has(e.state);
  }
  sortEntitiesForPopup(e) {
    var n, a;
    const i = ((a = (n = this.card) == null ? void 0 : n._config) == null ? void 0 : a.popup_sort) || "name", s = e.slice();
    if (i === "state") {
      const r = oi(
        this.hass.states,
        this.hass.locale.language
      );
      return s.sort((c, l) => {
        const d = this._isActive(c) ? 0 : 1, h = this._isActive(l) ? 0 : 1;
        if (d !== h) return d - h;
        const m = F(c.entity_id), u = F(l.entity_id), _ = this.hass ? ai(this.hass, c.state, m) : c.state, v = this.hass ? ai(this.hass, l.state, u) : l.state, g = (_ || "").localeCompare(v || "");
        return g !== 0 ? g : r(c.entity_id, l.entity_id);
      });
    }
    const o = oi(
      this.hass.states,
      this.hass.locale.language
    );
    return s.sort((r, c) => o(r.entity_id, c.entity_id));
  }
  render() {
    var Z, K, M, W, _e, ze, He, Me, Pe, Le, Te, Ie, Ne;
    if (!this.open || !this.hass || !this.card) return $``;
    const e = this.card, i = (Z = e._config) == null ? void 0 : Z.area, s = ((K = e._devicesInArea) == null ? void 0 : K.call(e, i, e._devices)) ?? /* @__PURE__ */ new Set(), o = e._entities || [], n = this.hass.states, a = ((M = e._config) == null ? void 0 : M.popup_domains) || [], r = ((W = e._config) == null ? void 0 : W.hidden_entities) || [], c = ((_e = e._config) == null ? void 0 : _e.extra_entities) || [], l = (ze = e._config) == null ? void 0 : ze.label, d = (He = e._config) == null ? void 0 : He.hide_unavailable, h = (Me = e._config) == null ? void 0 : Me.category_filter, m = this.selectedDomain || null, u = this.selectedDeviceClass || null, _ = (S) => {
      if (!h) return !0;
      const k = o.find(
        (L) => L.entity_id === S
      ), P = k == null ? void 0 : k.entity_category;
      return P ? h === "config" ? P !== "config" : h === "diagnostic" ? P !== "diagnostic" : h === "config+diagnostic" ? P !== "config" && P !== "diagnostic" : !0 : !0;
    }, v = o.reduce(
      (S, k) => {
        var P;
        if (!k.hidden_by && (k.area_id ? k.area_id === i : k.device_id && s.has(k.device_id)) && (!l || k.labels && k.labels.some(
          (L) => l.includes(L)
        ))) {
          const L = k.entity_id;
          !r.includes(L) && _(L) && (!d || !ye.includes((P = n[L]) == null ? void 0 : P.state)) && S.push(L);
        }
        return S;
      },
      []
    );
    let g = [];
    for (const S of v) {
      const k = F(S);
      if (a.length > 0 && !a.includes(k)) continue;
      const P = n[S];
      P && (m && k !== m || u && P.attributes.device_class !== u || g.push(P));
    }
    for (const S of c) {
      const k = F(S), P = n[S];
      P && (a.length > 0 && !a.includes(k) || m && k !== m || u && P.attributes.device_class !== u || _(S) && !g.some((L) => L.entity_id === S) && g.push(P));
    }
    const w = ((Pe = e == null ? void 0 : e._config) == null ? void 0 : Pe.ungroup_areas) === !0;
    let E = (Le = e._config) != null && Le.columns ? e._config.columns : 4, U = [], C = [];
    if (w)
      C = this.sortEntitiesForPopup(g), E = Math.min(E, Math.max(1, C.length));
    else {
      const S = {};
      for (const L of g) {
        const Q = F(L.entity_id);
        Q in S || (S[Q] = []), S[Q].push(L);
      }
      const k = a.length > 0 ? a : $t;
      U = Object.entries(S).filter(([L]) => !m || L === m).sort(([L], [Q]) => {
        const je = k.indexOf(L), Ue = k.indexOf(Q);
        return (je === -1 ? k.length : je) - (Ue === -1 ? k.length : Ue);
      }).map(
        ([L, Q]) => [L, this.sortEntitiesForPopup(Q)]
      );
      const P = U.length ? Math.max(...U.map(([, L]) => L.length)) : 0;
      E = Math.min(E, Math.max(1, P));
    }
    const H = ((Ie = e._area) == null ? void 0 : Ie.call(e, (Te = e._config) == null ? void 0 : Te.area, e._areas)) ?? null;
    return $`
      <ha-dialog
        hideActions
        id="more-info-dialog"
        style="--columns: ${E};"
        .open=${this.open}
        @closed=${this._onClosed}
      >
        <style>
          ${Ae.styles}
        </style>
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${bi}
            @click=${this._onClosed}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${((Ne = e._config) == null ? void 0 : Ne.area_name) || H && H.name}</h3>
          </div>
        </div>

        <div class="dialog-content">
          ${w ? $`
                <div class="entity-cards">
                  ${C.map(
      (S) => $`
                      <div class="entity-card">
                        ${this._getOrCreateCard(S)}
                      </div>
                    `
    )}
                </div>
              ` : $`${oe(
      U,
      ([S]) => S,
      ([S, k]) => $`
                  <div class="cards-wrapper">
                    <h4>
                      ${S === "binary_sensor" || S === "sensor" || S === "cover" ? this._getDomainName(
        S,
        u || void 0
      ) : this._getDomainName(S)}
                    </h4>
                    <div class="entity-cards">
                      ${oe(
        k,
        (P) => P.entity_id,
        (P) => $`
                          <div class="entity-card">
                            ${this._getOrCreateCard(P)}
                          </div>
                        `
      )}
                    </div>
                  </div>
                `
    )}`}
        </div>
      </ha-dialog>
    `;
  }
  _getDomainName(e, i) {
    return this.hass ? e === "scene" ? "Scene" : e === "binary_sensor" || e === "sensor" || e === "cover" ? i ? this.hass.localize(
      `component.${e}.entity_component.${i}.name`
    ) : this.hass.localize(`component.${e}.entity_component._.name`) : this.hass.localize(`component.${e}.entity_component._.name`) : e;
  }
}, Ae.styles = Xe`
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
  `, Ae);
pe([
  N({ type: Boolean })
], re.prototype, "open");
pe([
  N({ type: String })
], re.prototype, "selectedDomain");
pe([
  N({ type: String })
], re.prototype, "selectedDeviceClass");
pe([
  N({ type: String })
], re.prototype, "content");
pe([
  N({ type: Array })
], re.prototype, "entities");
pe([
  N({ attribute: !1 })
], re.prototype, "hass");
pe([
  N({ attribute: !1 })
], re.prototype, "card");
pe([
  q()
], re.prototype, "selectedGroup");
let js = re;
customElements.define("area-card-plus-popup", js);
var Us = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, fe = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Bs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Us(e, i, o), o;
};
let ae = class extends Cs(ne) {
  constructor() {
    super(...arguments), this.selectedDomain = null, this.selectedDeviceClass = null, this._iconCache = /* @__PURE__ */ new Map(), this._styleCache = /* @__PURE__ */ new Map(), this._ratio = null, this._deviceClasses = wt, this._entitiesByDomain = x(
      (t, e, i, s, o) => {
        var c;
        const n = ((c = this._config) == null ? void 0 : c.hidden_entities) || [], a = i.reduce((l, d) => {
          var h;
          return !d.hidden_by && (d.area_id ? d.area_id === t : d.device_id && e.has(d.device_id)) && (!((h = this._config) != null && h.label) || d.labels && d.labels.some((m) => {
            var u;
            return (u = this._config) == null ? void 0 : u.label.includes(m);
          })) && !n.includes(d.entity_id) && l.push(d.entity_id), l;
        }, []), r = {};
        for (const l of a) {
          const d = F(l);
          if (!We.includes(d) && !ot.includes(d) && !nt.includes(d) && !at.includes(d) && !Ds.includes(d) && !bt.includes(d))
            continue;
          const h = o[l];
          h && ((nt.includes(d) || ot.includes(d) || at.includes(d)) && !s[d].includes(
            h.attributes.device_class || ""
          ) || (d in r || (r[d] = []), r[d].push(h)));
        }
        return r;
      }
    ), this._area = x(
      (t, e) => e.find((i) => i.area_id === t) || null
    ), this._devicesInArea = x(
      (t, e) => new Set(
        t ? e.reduce((i, s) => (s.area_id === t && i.push(s.id), i), []) : []
      )
    ), this._computeCovers = x(
      (t, e) => at.flatMap((i) => i in t ? e[i].map((s) => ({
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
          const r = a.trim();
          if (r && r.includes(":")) {
            const [c, l] = r.split(":");
            n[c.trim()] = l.trim().replace(";", "");
          }
          return n;
        }, o) : o;
      }
    ), this._computeAlerts = x(
      (t, e) => nt.flatMap((i) => i in t ? e[i].map((s) => ({
        domain: i,
        deviceClass: s
      })) : [])
    ), this._computeSensors = x(
      (t, e) => ot.flatMap((i) => i in t ? e[i].map(
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
    return { type: "custom:area-card-plus", area: ((s = (await As(e, ti))[0]) == null ? void 0 : s.area_id) || "" };
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
    Object.values(i || {}).forEach((r) => {
      r.forEach((c) => {
        !ye.includes(c.state) && !se.includes(c.state) && s.push(c);
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
        (s) => !ye.includes(s.state) && !se.includes(s.state)
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
    const o = i.filter((a) => !hs(a) || isNaN(Number(a.state)) ? !1 : s ? a.attributes.unit_of_measurement === s : (s = a.attributes.unit_of_measurement, !0));
    if (!o.length)
      return;
    const n = o.reduce(
      (a, r) => a + Number(r.state),
      0
    );
    return e === "power" ? `${Yt(n, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? ei(s, this.hass.locale) : ""}${s || ""}` : `${Yt(n / o.length, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? ei(s, this.hass.locale) : ""}${s || ""}`;
  }
  hassSubscribe() {
    const t = this.hass.connection;
    return [
      ti(t, (e) => {
        this._areas = e;
      }),
      bs(t, (e) => {
        this._devices = e;
      }),
      ws(t, (e) => {
        this._entities = e;
      })
    ];
  }
  getCardSize() {
    return 3;
  }
  willUpdate(t) {
    var e, i;
    (t.has("_config") || this._ratio === null) && (this._ratio = (e = this._config) != null && e.aspect_ratio ? ii((i = this._config) == null ? void 0 : i.aspect_ratio) : null, (this._ratio === null || this._ratio.w <= 0 || this._ratio.h <= 0) && (this._ratio = ii(ks)));
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
    this._config = t, this._deviceClasses = { ...wt }, t.sensor_classes && (this._deviceClasses.sensor = t.sensor_classes), t.alert_classes && (this._deviceClasses.binary_sensor = t.alert_classes), t.cover_classes && (this._deviceClasses.cover = t.cover_classes), this._iconCache.clear(), this._styleCache.clear();
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
    var s, o, n;
    const e = t.detail.action === "tap" ? (s = this._config) == null ? void 0 : s.tap_action : t.detail.action === "hold" ? (o = this._config) == null ? void 0 : o.hold_action : t.detail.action === "double_tap" ? (n = this._config) == null ? void 0 : n.double_tap_action : null;
    if (typeof e == "string" && e === "more-info" || typeof e == "object" && (e == null ? void 0 : e.action) === "more-info" || e === void 0) {
      this._openGeneralPopup();
      return;
    }
    vt(this, this.hass, this._config, t.detail.action);
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
  // Unified action handler factory for domain/alert/cover/sensor
  _makeActionHandler(t, e, i) {
    return (s) => {
      var c, l, d, h, m, u, _, v, g, w;
      s.stopPropagation();
      let o;
      t === "domain" ? o = (l = (c = this._config) == null ? void 0 : c.customization_domain) == null ? void 0 : l.find(
        (E) => E.type === e
      ) : t === "alert" ? o = (h = (d = this._config) == null ? void 0 : d.customization_alert) == null ? void 0 : h.find(
        (E) => E.type === i
      ) : t === "cover" ? o = (u = (m = this._config) == null ? void 0 : m.customization_cover) == null ? void 0 : u.find(
        (E) => E.type === i
      ) : t === "sensor" && (o = (v = (_ = this._config) == null ? void 0 : _.customization_sensor) == null ? void 0 : v.find(
        (E) => E.type === i
      ));
      const n = s.detail.action === "tap" ? o == null ? void 0 : o.tap_action : s.detail.action === "hold" ? o == null ? void 0 : o.hold_action : s.detail.action === "double_tap" ? o == null ? void 0 : o.double_tap_action : null;
      if (t === "domain") {
        const E = n === "toggle" || (n == null ? void 0 : n.action) === "toggle", U = n === "more-info" || (n == null ? void 0 : n.action) === "more-info";
        if (E) {
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
          ) : We.includes(e) && this.hass.callService(
            e,
            this._isOn(e) ? "turn_off" : "turn_on",
            void 0,
            { area_id: this._config.area }
          );
          return;
        } else if (U || n === void 0) {
          if (e !== "binary_sensor" && e !== "sensor")
            if (e === "climate") {
              const H = (w = (g = this._config) == null ? void 0 : g.customization_domain) == null ? void 0 : w.find(
                (K) => K.type === "climate"
              ), Z = H == null ? void 0 : H.display_mode;
              (Z === "icon" || Z === "text_icon") && this._showPopupForDomain(e);
            } else
              this._showPopupForDomain(e);
          return;
        }
        const C = {
          tap_action: o == null ? void 0 : o.tap_action,
          hold_action: o == null ? void 0 : o.hold_action,
          double_tap_action: o == null ? void 0 : o.double_tap_action
        };
        vt(this, this.hass, C, s.detail.action);
        return;
      }
      const a = n === "more-info" || (n == null ? void 0 : n.action) === "more-info";
      if (t === "alert") {
        if (a || n === void 0) {
          e === "binary_sensor" && this._showPopupForDomain(e, i);
          return;
        }
      } else if (t === "cover") {
        if (a || n === void 0) {
          e === "cover" && this._showPopupForDomain(e, i);
          return;
        }
      } else if (t === "sensor" && a) {
        e === "sensor" && this._showPopupForDomain(e, i);
        return;
      }
      const r = {
        tap_action: o == null ? void 0 : o.tap_action,
        hold_action: o == null ? void 0 : o.hold_action,
        double_tap_action: o == null ? void 0 : o.double_tap_action
      };
      vt(this, this.hass, r, s.detail.action);
    };
  }
  render() {
    var Z, K, M, W, _e, ze, He, Me, Pe, Le, Te, Ie, Ne, S, k, P, L, Q, je, Ue, Tt, It;
    if (!this._config || !this.hass || !this._areas || !this._devices || !this._entities)
      return A;
    const t = ((Z = this._config) == null ? void 0 : Z.design) === "V2", e = t && ((K = this._config) != null && K.v2_color) ? this._calculateV2Color(this._config.v2_color) : "var(--primary-color)", i = {
      mirrored: this._config.mirrored === !0
    }, s = {
      v2: ((M = this._config) == null ? void 0 : M.design) === "V2",
      row: ((W = this._config) == null ? void 0 : W.layout) === "horizontal"
    };
    let o = 3;
    try {
      const p = ((_e = this.shadowRoot) == null ? void 0 : _e.host) || document.documentElement, y = getComputedStyle(p).getPropertyValue("--row-size");
      y && (o = Number(y.trim()) || 3);
    } catch {
    }
    const n = t ? { background: e } : {}, a = t && o === 1 ? {} : t ? { background: e } : {}, r = this.layout === "grid", c = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), l = this._area(this._config.area, this._areas), d = /* @__PURE__ */ new Map();
    (((ze = this._config) == null ? void 0 : ze.customization_domain) || []).forEach(
      (p) => d.set(p.type, p)
    );
    const h = /* @__PURE__ */ new Map();
    (((He = this._config) == null ? void 0 : He.customization_cover) || []).forEach(
      (p) => h.set(p.type, p)
    );
    const m = /* @__PURE__ */ new Map();
    (((Me = this._config) == null ? void 0 : Me.customization_alert) || []).forEach(
      (p) => m.set(p.type, p)
    );
    const u = /* @__PURE__ */ new Map();
    (((Pe = this._config) == null ? void 0 : Pe.customization_sensor) || []).forEach(
      (p) => u.set(p.type, p)
    );
    const _ = this._computeCovers(c, this._deviceClasses), v = this._computeAlerts(c, this._deviceClasses), g = this._computeButtons(
      this._config.toggle_domains,
      c
    ), w = this._computeSensors(c, this._deviceClasses), E = ((Te = (Le = this._config) == null ? void 0 : Le.toggle_domains) != null && Te.includes("climate") ? bt : []).filter((p) => p in c).map((p) => ({ domain: p })), U = this._computeCameraEntity(
      this._config.show_camera,
      c
    ), C = (Ie = this._config) != null && Ie.show_camera ? ((Ne = this._config) == null ? void 0 : Ne.show_icon) === "icon" || ((S = this._config) == null ? void 0 : S.show_icon) === "icon + image" : ((k = this._config) == null ? void 0 : k.show_icon) === "icon" || ((P = this._config) == null ? void 0 : P.show_icon) === "icon + image" || ((L = this._config) == null ? void 0 : L.show_icon) === void 0;
    if (l === null)
      return $`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    const H = this._computeIconStyles(
      t,
      o,
      (Q = this._config) == null ? void 0 : Q.icon_css,
      (je = this._config) == null ? void 0 : je.area_icon_color
    );
    return $`
      <ha-card
        class="${ie(i)}"
        style=${Ye({
      paddingBottom: r ? "0" : "12em"
    })}
      >
        ${this._config.show_camera && U || (this._config.show_icon === "image" || this._config.show_icon === "icon + image") && l.picture ? $`
              <hui-image
                .config=${this._config}
                .hass=${this.hass}
                .image=${this._config.show_camera ? void 0 : l.picture}
                .cameraImage=${this._config.show_camera ? U : void 0}
                .cameraView=${this._config.camera_view}
                fitMode="cover"
              ></hui-image>
            ` : A}

        <div
          class="${ie({
      "icon-container": !0,
      ...s
    })}"
          style=${Ye(a)}
        >
          ${C ? $`
                <ha-icon
                  style=${Ye(H)}
                  icon=${this._config.area_icon || l.icon}
                ></ha-icon>
              ` : A}
        </div>

        <div
          class="${ie({
      content: !0,
      ...s
    })}"
          @action=${this._handleAction}
          .actionHandler=${de({
      hasHold: V(this._config.hold_action),
      hasDoubleClick: V(this._config.double_tap_action)
    })}
        >
          <div
            class="${ie({
      right: !0,
      ...s
    })}"
            style=${Ye(n)}
          >
            <!-- Covers -->
            <div
              class="${ie({
      covers: !0,
      ...s
    })}"
            >
              ${oe(
      _,
      (p) => p.domain + "-" + p.deviceClass,
      ({ domain: p, deviceClass: y }) => {
        var R, B;
        const f = h.get(y), O = (f == null ? void 0 : f.invert) === !0, X = c[p].filter(
          (D) => {
            const T = D.attributes.device_class || "default", z = !se.includes(D.state);
            return T === y && (O ? se.includes(D.state) : z);
          }
        ), j = (f == null ? void 0 : f.color) || ((R = this._config) == null ? void 0 : R.cover_color), b = f == null ? void 0 : f.icon, I = X.length;
        return I > 0 ? $`
                        <div
                          class="icon-with-count"
                          style=${this._parseCss(
          (f == null ? void 0 : f.css) || ((B = this._config) == null ? void 0 : B.cover_css)
        )}
                          @action=${this._handleCoverAction(
          p,
          y
        )}
                          .actionHandler=${de({
          hasHold: V(f == null ? void 0 : f.hold_action),
          hasDoubleClick: V(
            f == null ? void 0 : f.double_tap_action
          )
        })}
                        >
                          <ha-state-icon
                            class="cover"
                            style="${(j ? `color: var(--${j}-color);` : "") + " " + (f != null && f.icon_css ? f.icon_css.split(`
`).reduce((D, T) => {
          const z = T.trim();
          return z && z.includes(":") && (D += z.endsWith(";") ? z : `${z};`, D += " "), D;
        }, "") : "")}"
                            .icon=${b || this._cachedIcon(
          p,
          !O,
          y
        )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${I > 0 ? "on" : "off"}"
                            >${I}</span
                          >
                        </div>
                      ` : A;
      }
    )}
            </div>

            <!-- Alerts -->
            <div
              class="${ie({
      alerts: !0,
      ...s
    })}"
            >
              ${oe(
      v,
      (p) => p.domain + "-" + p.deviceClass,
      ({ domain: p, deviceClass: y }) => {
        var R, B;
        const f = m.get(y), O = (f == null ? void 0 : f.invert) === !0, X = c[p].filter(
          (D) => {
            const T = D.attributes.device_class || "default", z = D.state === "on";
            return T === y && (O ? se.includes(D.state) : z);
          }
        ), j = (f == null ? void 0 : f.color) || ((R = this._config) == null ? void 0 : R.alert_color), b = f == null ? void 0 : f.icon, I = X.length;
        return I > 0 ? $`
                        <div
                          class="icon-with-count"
                          style=${this._parseCss(
          (f == null ? void 0 : f.css) || ((B = this._config) == null ? void 0 : B.alert_css)
        )}
                          @action=${this._handleAlertAction(
          p,
          y
        )}
                          .actionHandler=${de({
          hasHold: V(f == null ? void 0 : f.hold_action),
          hasDoubleClick: V(
            f == null ? void 0 : f.double_tap_action
          )
        })}
                        >
                          <ha-state-icon
                            class="alert"
                            style="${(j ? `color: var(--${j}-color);` : "") + " " + (f != null && f.icon_css ? f.icon_css.split(`
`).reduce((D, T) => {
          const z = T.trim();
          return z && z.includes(":") && (D += z.endsWith(";") ? z : `${z};`, D += " "), D;
        }, "") : "")}"
                            .icon=${b || this._cachedIcon(
          p,
          !O,
          y
        )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${I > 0 ? "on" : "off"}"
                            >${I}</span
                          >
                        </div>
                      ` : A;
      }
    )}
            </div>

            <!-- Buttons -->
            <div
              class="${ie({
      buttons: !0,
      ...s
    })}"
            >
              ${oe(
      g,
      (p) => p,
      (p) => {
        var b, I, R, B, D;
        if (p === "climate") {
          const T = (I = (b = this._config) == null ? void 0 : b.customization_domain) == null ? void 0 : I.find(
            (le) => le.type === "climate"
          ), z = T == null ? void 0 : T.display_mode;
          if (z !== "icon" && z !== "text_icon")
            return A;
        }
        const y = d.get(p), f = (y == null ? void 0 : y.color) || ((R = this._config) == null ? void 0 : R.domain_color), O = y == null ? void 0 : y.icon, j = c[p].filter(
          (T) => !ye.includes(T.state) && !se.includes(T.state)
        ).length;
        return this._config.show_active && j === 0 ? A : $`
                    <div
                      class="icon-with-count hover"
                      style=${this._parseCss(
          (y == null ? void 0 : y.css) || ((B = this._config) == null ? void 0 : B.domain_css)
        )}
                      @action=${this._handleDomainAction(p)}
                      .actionHandler=${de({
          hasHold: V(y == null ? void 0 : y.hold_action),
          hasDoubleClick: V(
            y == null ? void 0 : y.double_tap_action
          )
        })}
                    >
                      <ha-state-icon
                        style=${f ? `color: var(--${f}-color);` : (D = this._config) != null && D.domain_color ? `color: ${this._config.domain_color};` : ""}
                        class=${j > 0 ? "toggle-on" : "toggle-off"}
                        .domain=${p}
                        .icon=${O || this._cachedIcon(
          p,
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
      }
    )}
            </div>
          </div>

          <!-- Bottom -->
          <div
            class="${ie({
      bottom: !0,
      ...s
    })}"
          >
            <div
              style=${`${(Ue = this._config) != null && Ue.area_name_color ? `color: var(--${this._config.area_name_color}-color);` : ""} ${(Tt = this._config) != null && Tt.name_css ? this._config.name_css.split(`
`).reduce((p, y) => {
      const f = y.trim();
      return f && f.includes(":") && (p += f.endsWith(";") ? f : `${f};`, p += " "), p;
    }, "") : ""}`}
            >
              <div
                class="${ie({
      name: !0,
      ...s,
      "text-large": !0,
      on: !0
    })}"
                @action=${this._handleAction}
                .actionHandler=${de({
      hasHold: V(this._config.hold_action),
      hasDoubleClick: V(this._config.double_tap_action)
    })}
              >
                ${this._config.area_name || l.name}
              </div>

              <!-- Sensors -->
              <div class="sensors">
                ${(It = this._config) != null && It.wrap_sensor_icons ? oe(
      w,
      (p) => p.domain + "-" + p.deviceClass,
      ({ domain: p, deviceClass: y, index: f }) => {
        var z, le, Be, Re;
        const O = c[p].filter(
          (te) => te.attributes.device_class === y
        );
        if (O.length === 0)
          return A;
        const X = (() => {
          switch (y) {
            case "temperature":
              return l.temperature_entity_id;
            case "humidity":
              return l.humidity_entity_id;
            default:
              return null;
          }
        })(), j = X ? this.hass.states[X] : void 0, b = u.get(y), I = (b == null ? void 0 : b.color) || ((z = this._config) == null ? void 0 : z.sensor_color), R = (b == null ? void 0 : b.invert) === !0, B = O.some(
          (te) => !ye.includes(te.state) && !se.includes(te.state)
        );
        if (R && B)
          return A;
        const D = (le = this._config) != null && le.show_sensor_icons ? $`<ha-domain-icon
                              style=${I ? `color: var(--${I}-color);` : ""}
                              .hass=${this.hass}
                              .domain=${p}
                              .deviceClass=${y}
                            ></ha-domain-icon>` : null, T = $`<span
                          class="sensor-value"
                          @action=${this._handleSensorAction(
          p,
          y
        )}
                          .actionHandler=${de({
          hasHold: V(b == null ? void 0 : b.hold_action),
          hasDoubleClick: V(
            b == null ? void 0 : b.double_tap_action
          )
        })}
                          style=${`${I ? `color: var(--${I}-color);` : ""} ${this._parseCss(b == null ? void 0 : b.css)}`}
                        >
                          ${!((Be = this._config) != null && Be.show_sensor_icons) && !((Re = this._config) != null && Re.wrap_sensor_icons) && f > 0 ? " - " : ""}
                          ${j ? this.hass.formatEntityState(j) : this._average(p, y)}
                        </span>`;
        return $`<div class="sensor-row off">
                          ${D}${T}
                        </div>`;
      }
    ) : $`<div class="sensor text-medium off">
                      ${oe(
      w,
      (p) => p.domain + "-" + p.deviceClass,
      ({ domain: p, deviceClass: y, index: f }) => {
        var z, le, Be, Re;
        const O = c[p].filter(
          (te) => te.attributes.device_class === y
        );
        if (O.length === 0)
          return A;
        const X = (() => {
          switch (y) {
            case "temperature":
              return l.temperature_entity_id;
            case "humidity":
              return l.humidity_entity_id;
            default:
              return null;
          }
        })(), j = X ? this.hass.states[X] : void 0, b = u.get(y), I = (b == null ? void 0 : b.color) || ((z = this._config) == null ? void 0 : z.sensor_color), R = (b == null ? void 0 : b.invert) === !0, B = O.some(
          (te) => !ye.includes(te.state) && !se.includes(te.state)
        );
        if (R && B)
          return A;
        const D = (le = this._config) != null && le.show_sensor_icons ? $`<ha-domain-icon
                                style=${I ? `color: var(--${I}-color);` : ""}
                                .hass=${this.hass}
                                .domain=${p}
                                .deviceClass=${y}
                              ></ha-domain-icon>` : null, T = $`<span
                            class="sensor-value"
                            @action=${this._handleSensorAction(
          p,
          y
        )}
                            .actionHandler=${de({
          hasHold: V(b == null ? void 0 : b.hold_action),
          hasDoubleClick: V(
            b == null ? void 0 : b.double_tap_action
          )
        })}
                            style=${`${I ? `color: var(--${I}-color);` : ""} ${this._parseCss(b == null ? void 0 : b.css)}`}
                          >
                            ${!((Be = this._config) != null && Be.show_sensor_icons) && !((Re = this._config) != null && Re.wrap_sensor_icons) && f > 0 ? " - " : ""}
                            ${j ? this.hass.formatEntityState(j) : this._average(p, y)}
                          </span>`;
        return $`${D}${T}`;
      }
    )}
                    </div>`}
              </div>

              <!-- Climates -->
              <div class="climate text-small off">
                ${oe(
      E,
      (p) => p.domain,
      ({ domain: p }) => {
        var I;
        const f = c[p].filter((R) => {
          const B = R.attributes.hvac_action, D = R.state, T = !ye.includes(D) && !se.includes(D);
          return B !== void 0 ? T && (B !== "idle" && B !== "off") && !(D === "heat" && (B === "idle" || B === "off")) : T;
        }).map((R) => {
          var D, T, z;
          return `${R.attributes.temperature || "N/A"} ${((z = (T = (D = this.hass) == null ? void 0 : D.config) == null ? void 0 : T.unit_system) == null ? void 0 : z.temperature) || ""}`;
        });
        if (f.length === 0)
          return A;
        const O = d.get(p);
        if ((O == null ? void 0 : O.display_mode) === "icon")
          return A;
        const j = O == null ? void 0 : O.color, b = `${j ? `color: var(--${j}-color);` : (I = this._config) != null && I.domain_color ? `color: ${this._config.domain_color};` : ""} ${this._parseCss(O == null ? void 0 : O.css)}`;
        return $`<div
                      class="climate"
                      style=${b}
                      @action=${this._handleDomainAction(p)}
                      .actionHandler=${de({
          hasHold: V(O == null ? void 0 : O.hold_action),
          hasDoubleClick: V(
            O == null ? void 0 : O.double_tap_action
          )
        })}
                    >
                      (${f.join(", ")})
                    </div>`;
      }
    )}
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
    if (super.updated(t), !this._config || !this.hass)
      return;
    if (t.has("selectedDomain") && this.selectedDomain) {
      const s = this.selectedDomain;
      if (s.includes(".")) {
        const o = s, n = this.hass.states[o];
        n && this.showMoreInfo(n);
      } else
        this._openDomainPopup(s);
      setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    const e = t.get("hass"), i = t.get("_config");
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!i || i.theme !== this._config.theme)) && Os(this, this.hass.themes, this._config.theme);
  }
  _showPopupForDomain(t, e) {
    this.selectedDeviceClass = e || null, this._openDomainPopup(t);
  }
  _getIcon(t, e, i) {
    if (t in At) {
      const s = At[t];
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
    return Xe`
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
      .right * {
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
fe([
  N({ attribute: !1 })
], ae.prototype, "hass", 2);
fe([
  q()
], ae.prototype, "_config", 2);
fe([
  q()
], ae.prototype, "_areas", 2);
fe([
  q()
], ae.prototype, "_devices", 2);
fe([
  q()
], ae.prototype, "_entities", 2);
fe([
  q()
], ae.prototype, "selectedDomain", 2);
fe([
  q()
], ae.prototype, "selectedDeviceClass", 2);
ae = fe([
  me("area-card-plus")
], ae);
var Rs = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, J = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Fs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Rs(e, i, o), o;
};
class Ee extends ne {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    return this.hass ? $`
      <div class="customization">
        ${this.customization && oe(
      this.customization,
      (e) => this._getKey(e),
      (e, i) => $`
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
        (s) => $`<mwc-list-item .value=${s.value}
                      >${s.label}</mwc-list-item
                    >`
      )}
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${bi}
                class="remove-icon"
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${Ls}
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
      (e) => $`<mwc-list-item .value=${e.value}
                  >${e.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    ` : A;
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
    return Xe`
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
  N({ attribute: !1 })
], Ee.prototype, "hass", 2);
J([
  N({ type: Array })
], Ee.prototype, "SelectOptions", 2);
let Ct = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_domain;
  }
};
J([
  N({ attribute: !1 })
], Ct.prototype, "customization_domain", 2);
Ct = J([
  me("domain-items-editor")
], Ct);
let xt = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_alert;
  }
};
J([
  N({ attribute: !1 })
], xt.prototype, "customization_alert", 2);
xt = J([
  me("alert-items-editor")
], xt);
let Et = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_cover;
  }
};
J([
  N({ attribute: !1 })
], Et.prototype, "customization_cover", 2);
Et = J([
  me("cover-items-editor")
], Et);
let St = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_sensor;
  }
};
J([
  N({ attribute: !1 })
], St.prototype, "customization_sensor", 2);
St = J([
  me("sensor-items-editor")
], St);
let Ot = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_popup;
  }
};
J([
  N({ attribute: !1 })
], Ot.prototype, "customization_popup", 2);
Ot = J([
  me("popup-items-editor")
], Ot);
var Vs = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, ke = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? qs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Vs(e, i, o), o;
};
let xe = class extends ne {
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
    return Xe`
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
ke([
  N({ attribute: !1 })
], xe.prototype, "config", 2);
ke([
  N({ attribute: !1 })
], xe.prototype, "hass", 2);
ke([
  N({ type: Boolean })
], xe.prototype, "useSensorSchema", 2);
ke([
  q()
], xe.prototype, "getSchema", 2);
ke([
  q()
], xe.prototype, "_config", 2);
xe = ke([
  me("item-editor")
], xe);
var Ks = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, ce = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ws(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Ks(e, i, o), o;
};
let Y = class extends ne {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this.computeLabel = x((t) => $i(this.hass, t)), this._schema = x((t, e) => {
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
    }), this._binaryschema = x((t) => [
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
      }, G(this, "config-changed", { config: { ...this._config } });
    };
  }
  _classesForArea(t, e, i) {
    var o;
    let s;
    if (e === "toggle")
      return s = Object.values(this.hass.entities).filter(
        (n) => {
          var a;
          return (We.includes(F(n.entity_id)) || bt.includes(F(n.entity_id))) && !n.hidden && (n.area_id === t || n.device_id && ((a = this.hass.devices[n.device_id]) == null ? void 0 : a.area_id) === t);
        }
      ), [...new Set(s.map((n) => F(n.entity_id)))];
    if (e === "all") {
      const n = ((o = this._config) == null ? void 0 : o.extra_entities) || [];
      let a = Object.values(this.hass.entities).filter(
        (c) => {
          var l;
          return !c.hidden && (c.area_id === t || c.device_id && ((l = this.hass.devices[c.device_id]) == null ? void 0 : l.area_id) === t);
        }
      );
      const r = n.map((c) => this.hass.states[c]).filter((c) => c !== void 0);
      return a = [...a, ...r], [...new Set(a.map((c) => F(c.entity_id)))];
    } else {
      s = Object.values(this.hass.entities).filter(
        (a) => {
          var r;
          return F(a.entity_id) === e && !a.entity_category && !a.hidden && (a.area_id === t || a.device_id && ((r = this.hass.devices[a.device_id]) == null ? void 0 : r.area_id) === t);
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
      (n, a) => _i(n.label, a.label, this.hass.locale.language)
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
          const h = this._toggleDomainsForArea(o), m = this._binaryClassesForArea(o), u = this._coverClassesForArea(o), _ = this._allDomainsForArea(o), v = h.sort(
            (w, E) => We.indexOf(w) - We.indexOf(E)
          ), g = _.sort(
            (w, E) => $t.indexOf(w) - $t.indexOf(E)
          );
          if (this._config.toggle_domains = [
            ...v.filter((w) => w !== "scene" && w !== "script")
          ], this._config.alert_classes = [...m], this._config.cover_classes = [...u], this._config.popup_domains = [...g], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
            const w = this._config.hidden_entities, E = Object.values(this._hiddenEntitiesByDomain()).flat(), U = w.filter((C) => E.includes(C));
            U.length !== w.length && (this._config = {
              ...this._config || {},
              hidden_entities: U
            }, G(this, "config-changed", { config: { ...this._config } }));
          }
          this.requestUpdate();
        }
        if (l) {
          for (const h of a) {
            const m = F(h);
            this._config.popup_domains.includes(m) || this._config.popup_domains.push(m);
          }
          this.requestUpdate();
        }
        d && this._updateEntityOptions();
      }
      if (!this._numericDeviceClasses) {
        const { numeric_device_classes: i } = await gs(this.hass);
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
        return !i.hidden && e.includes(F(i.entity_id)) && (i.area_id === t || i.device_id && ((s = this.hass.devices[i.device_id]) == null ? void 0 : s.area_id) === t);
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
    var d, h, m;
    const s = `customization_${t}`, o = (d = this._config) == null ? void 0 : d[s], n = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, a = ((h = this[n]) == null ? void 0 : h.index) ?? 0, r = ((m = o == null ? void 0 : o[a]) == null ? void 0 : m.type) ?? "unknown", c = r.match(/^(.+?)\s*-\s*(.+)$/);
    let l;
    if (c) {
      const u = c[1].toLowerCase().replace(" ", "_"), _ = c[2].toLowerCase(), v = this.hass.localize(`component.${u}.entity_component._.name`) || c[1];
      let g = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${u}.${_}`
      ) || c[2];
      g = g.charAt(0).toUpperCase() + g.slice(1), l = `${v} – ${g}`;
    } else {
      let u = this.hass.localize(`component.${r}.entity_component._.name`) || r;
      u = u.charAt(0).toUpperCase() + u.slice(1), l = u;
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
      o[s] = t.detail, G(this, "config-changed", {
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
  // Generic selector to produce the various SelectOption lists
  _selectOptions(t) {
    var i, s, o, n, a, r;
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
          ((r = this._config) == null ? void 0 : r.sensor_classes) || this._sensorClassesForArea(e)
        );
    }
  }
  get entityOptions() {
    return this._entityOptions;
  }
  _domainIcon(t, e = "on", i) {
    const s = At;
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
      const c = F(r);
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
    var h, m, u, _, v, g, w;
    const t = {}, e = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const i = ((m = this.hass) == null ? void 0 : m.entities) || {}, s = ((u = this.hass) == null ? void 0 : u.devices) || {}, o = (_ = this.hass) != null && _.areas ? Object.values(this.hass.areas) : [], n = (v = this._config) == null ? void 0 : v.area, a = (g = this._config) == null ? void 0 : g.floor, r = (w = this._config) == null ? void 0 : w.label, c = n ? Array.isArray(n) ? n : [n] : [], l = a ? Array.isArray(a) ? a : [a] : [], d = r ? Array.isArray(r) ? r : [r] : [];
    for (const E of e) {
      const U = F(E), C = i[E], H = C != null && C.device_id ? s[C.device_id] : void 0;
      if (((C == null ? void 0 : C.area_id) != null || (H == null ? void 0 : H.area_id) != null) && !(d.length && !(Array.isArray(C == null ? void 0 : C.labels) && C.labels.some((M) => d.includes(M)) || Array.isArray(H == null ? void 0 : H.labels) && H.labels.some((M) => d.includes(M)))) && !(c.length && !(C != null && C.area_id && c.includes(C.area_id) || H != null && H.area_id && c.includes(H.area_id)))) {
        if (l.length) {
          const K = (C == null ? void 0 : C.area_id) && o.some(
            (W) => W.area_id === C.area_id && W.floor_id && l.includes(W.floor_id)
          ), M = (H == null ? void 0 : H.area_id) && o.some(
            (W) => W.area_id === H.area_id && W.floor_id && l.includes(W.floor_id)
          );
          if (!K && !M) continue;
        }
        t[U] || (t[U] = []), t[U].push(E);
      }
    }
    return t;
  }
  render() {
    var h;
    if (!this.hass || !this._config)
      return A;
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
      sensor_classes: wt.sensor,
      toggle_domains: t,
      popup_domains: s,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorByKey("domain") : this._subElementEditorAlert ? this._renderSubElementEditorByKey("alert") : this._subElementEditorCover ? this._renderSubElementEditorByKey("cover") : this._subElementEditorSensor ? this._renderSubElementEditorByKey("sensor") : $`
      <ha-form
        .hass=${this.hass}
        .data=${d}
        .schema=${o}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${zs}></ha-svg-icon>
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
          <ha-svg-icon .path=${Ps}></ha-svg-icon>
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
          <ha-svg-icon .path=${Hs}></ha-svg-icon>
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
          <ha-svg-icon .path=${Ms}></ha-svg-icon>
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
          <ha-svg-icon .path=${Ts}></ha-svg-icon>
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
              <ha-svg-icon .path=${yt}></ha-svg-icon>
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
                @value-changed=${(m) => this._hiddenCategoryChanged(m)}
              ></ha-form>
              ${this._groupAllEntitiesByDomain().map(
      (m) => $`
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
        (u) => $`
                              <ha-expansion-panel outlined class="domain-panel">
                                <div slot="header" class="dc-header">
                                  <ha-icon
                                    .icon=${this._domainIcon(
          m.domain,
          "on",
          u.deviceClass
        )}
                                  ></ha-icon>
                                  <span class="dc-title">${u.label}</span>
                                </div>
                                <div class="content">
                                  ${u.entities.map(
          (_) => {
            var v, g;
            return $`
                                      <div class="entity-row">
                                        <span class="entity-name">
                                          ${((g = (v = this.hass.states[_]) == null ? void 0 : v.attributes) == null ? void 0 : g.friendly_name) || _}
                                        </span>
                                        <ha-icon-button
                                          .path=${this._isHiddenEntity(_) ? ni : yt}
                                          .label=${this._isHiddenEntity(_) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                          @click=${() => this._toggleEntityHidden(_)}
                                        ></ha-icon-button>
                                      </div>
                                    `;
          }
        )}
                                </div>
                              </ha-expansion-panel>
                            `
      ) : m.entities.map(
        (u) => {
          var _, v;
          return $`
                              <div class="entity-row">
                                <span class="entity-name">
                                  ${((v = (_ = this.hass.states[u]) == null ? void 0 : _.attributes) == null ? void 0 : v.friendly_name) || u}
                                </span>
                                <ha-icon-button
                                  .path=${this._isHiddenEntity(u) ? ni : yt}
                                  .label=${this._isHiddenEntity(u) ? this.hass.localize("ui.common.show") ?? "Show" : this.hass.localize("ui.common.hide") ?? "Hide"}
                                  @click=${() => this._toggleEntityHidden(u)}
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
Y.styles = Xe`
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
ce([
  N({ attribute: !1 })
], Y.prototype, "hass", 2);
ce([
  q()
], Y.prototype, "_config", 2);
ce([
  q()
], Y.prototype, "_entities", 2);
ce([
  q()
], Y.prototype, "_numericDeviceClasses", 2);
ce([
  q()
], Y.prototype, "_subElementEditorDomain", 2);
ce([
  q()
], Y.prototype, "_subElementEditorAlert", 2);
ce([
  q()
], Y.prototype, "_subElementEditorCover", 2);
ce([
  q()
], Y.prototype, "_subElementEditorSensor", 2);
Y = ce([
  me("area-card-plus-editor")
], Y);
console.info(
  `%c AREA-CARD %c ${Ai.version} `,
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
