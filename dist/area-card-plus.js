//#region package.json
var e = "1.4.1", t = globalThis, n = t.ShadowRoot && (t.ShadyCSS === void 0 || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, r = Symbol(), i = /* @__PURE__ */ new WeakMap(), a = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== r) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (n && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = i.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && i.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, o = (e) => new a(typeof e == "string" ? e : e + "", void 0, r), s = (e, ...t) => new a(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, r), c = (e, r) => {
	if (n) e.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of r) {
		let r = document.createElement("style"), i = t.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, e.appendChild(r);
	}
}, l = n ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return o(t);
})(e) : e, { is: u, defineProperty: d, getOwnPropertyDescriptor: f, getOwnPropertyNames: p, getOwnPropertySymbols: m, getPrototypeOf: h } = Object, g = globalThis, _ = g.trustedTypes, ee = _ ? _.emptyScript : "", te = g.reactiveElementPolyfillSupport, v = (e, t) => e, y = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ee : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, b = (e, t) => !u(e, t), ne = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	useDefault: !1,
	hasChanged: b
};
Symbol.metadata ??= Symbol("metadata"), g.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var x = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ne) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && d(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = f(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ne;
	}
	static _$Ei() {
		if (this.hasOwnProperty(v("elementProperties"))) return;
		let e = h(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(v("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(v("properties"))) {
			let e = this.properties, t = [...p(e), ...m(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(l(e));
		} else e !== void 0 && t.push(l(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return c(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? y : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? y : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? b)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[v("elementProperties")] = /* @__PURE__ */ new Map(), x[v("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: x }), (g.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var S = globalThis, re = (e) => e, ie = S.trustedTypes, ae = ie ? ie.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, oe = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, se = "?" + C, ce = `<${se}>`, w = document, le = () => w.createComment(""), ue = (e) => e === null || typeof e != "object" && typeof e != "function", de = Array.isArray, fe = (e) => de(e) || typeof e?.[Symbol.iterator] == "function", pe = "[ 	\n\f\r]", me = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, ge = />/g, T = RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), _e = /'/g, ve = /"/g, ye = /^(?:script|style|textarea|title)$/i, E = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), D = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), be = /* @__PURE__ */ new WeakMap(), k = w.createTreeWalker(w, 129);
function xe(e, t) {
	if (!de(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ae === void 0 ? t : ae.createHTML(t);
}
var Se = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = me;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === me ? c[1] === "!--" ? o = he : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = T) : (ye.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = T) : o = ge : o === T ? c[0] === ">" ? (o = i ?? me, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? T : c[3] === "\"" ? ve : _e) : o === ve || o === _e ? o = T : o === he || o === ge ? o = me : (o = T, i = void 0);
		let d = o === T && e[t + 1].startsWith("/>") ? " " : "";
		a += o === me ? n + ce : l >= 0 ? (r.push(s), n.slice(0, l) + oe + n.slice(l) + C + d) : n + C + (l === -2 ? t : d);
	}
	return [xe(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Ce = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Se(t, n);
		if (this.el = e.createElement(l, r), k.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = k.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(oe)) {
					let t = u[o++], n = i.getAttribute(e).split(C), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? De : r[1] === "?" ? Oe : r[1] === "@" ? ke : Ee
					}), i.removeAttribute(e);
				} else e.startsWith(C) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (ye.test(i.tagName)) {
					let e = i.textContent.split(C), t = e.length - 1;
					if (t > 0) {
						i.textContent = ie ? ie.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], le()), k.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], le());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === se) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(C, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += C.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = w.createElement("template");
		return n.innerHTML = e, n;
	}
};
function A(e, t, n = e, r) {
	if (t === D) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = ue(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = A(e, i._$AS(e, t.values), i, r)), t;
}
var we = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? w).importNode(t, !0);
		k.currentNode = r;
		let i = k.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Te(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ae(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = k.nextNode(), a++);
		}
		return k.currentNode = w, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Te = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = A(this, e, t), ue(e) ? e === O || e == null || e === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : e !== this._$AH && e !== D && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? fe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== O && ue(this._$AH) ? this._$AA.nextSibling.data = e : this.T(w.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ce.createElement(xe(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new we(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = be.get(e.strings);
		return t === void 0 && be.set(e.strings, t = new Ce(e)), t;
	}
	k(t) {
		de(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(le()), this.O(le()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = re(e).nextSibling;
			re(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Ee = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = O, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = O;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = A(this, e, t, 0), a = !ue(e) || e !== this._$AH && e !== D, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = A(this, r[n + o], t, o), s === D && (s = this._$AH[o]), a ||= !ue(s) || s !== this._$AH[o], s === O ? e = O : e !== O && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, De = class extends Ee {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === O ? void 0 : e;
	}
}, Oe = class extends Ee {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== O);
	}
}, ke = class extends Ee {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = A(this, e, t, 0) ?? O) === D) return;
		let n = this._$AH, r = e === O && n !== O || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== O && (n === O || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ae = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		A(this, e);
	}
}, je = {
	M: oe,
	P: C,
	A: se,
	C: 1,
	L: Se,
	R: we,
	D: fe,
	V: A,
	I: Te,
	H: Ee,
	N: Oe,
	U: ke,
	B: De,
	F: Ae
}, Me = S.litHtmlPolyfillSupport;
Me?.(Ce, Te), (S.litHtmlVersions ??= []).push("3.3.3");
var Ne = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Te(t.insertBefore(le(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Pe = globalThis, j = class extends x {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ne(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return D;
	}
};
j._$litElement$ = !0, j.finalized = !0, Pe.litElementHydrateSupport?.({ LitElement: j });
var Fe = Pe.litElementPolyfillSupport;
Fe?.({ LitElement: j }), (Pe.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var M = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Ie = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	hasChanged: b
}, Le = (e = Ie, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function N(e) {
	return (t, n) => typeof n == "object" ? Le(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function P(e) {
	return N({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/lit-html/directive.js
var Re = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, ze = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Be = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, F = ze(class extends Be {
	constructor(e) {
		if (super(e), e.type !== Re.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
	}
	update(e, [t]) {
		if (this.st === void 0) {
			this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((e) => e !== "")));
			for (let e in t) t[e] && !this.nt?.has(e) && this.st.add(e);
			return this.render(t);
		}
		let n = e.element.classList;
		for (let e of this.st) e in t || (n.remove(e), this.st.delete(e));
		for (let e in t) {
			let r = !!t[e];
			r === this.st.has(e) || this.nt?.has(e) || (r ? (n.add(e), this.st.add(e)) : (n.remove(e), this.st.delete(e)));
		}
		return D;
	}
}), { I: Ve } = je, He = (e) => e, Ue = (e, t) => t === void 0 ? e?._$litType$ !== void 0 : e?._$litType$ === t, We = (e) => e?._$litType$?.h != null, Ge = () => document.createComment(""), I = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new Ve(r.insertBefore(Ge(), i), r.insertBefore(Ge(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = He(e).nextSibling;
				He(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, L = (e, t, n = e) => (e._$AI(t, n), e), Ke = {}, qe = (e, t = Ke) => e._$AH = t, Je = (e) => e._$AH, Ye = (e) => {
	e._$AR(), e._$AA.remove();
}, Xe = (e) => {
	e._$AR();
}, Ze = (e) => We(e) ? e._$litType$.h : e.strings, Qe = ze(class extends Be {
	constructor(e) {
		super(e), this.et = /* @__PURE__ */ new WeakMap();
	}
	render(e) {
		return [e];
	}
	update(e, [t]) {
		let n = Ue(this.it) ? Ze(this.it) : null, r = Ue(t) ? Ze(t) : null;
		if (n !== null && (r === null || n !== r)) {
			let t = Je(e).pop(), r = this.et.get(n);
			r === void 0 && (r = Ne(O, document.createDocumentFragment()), r.setConnected(!1), this.et.set(n, r)), qe(r, [t]), I(r, void 0, t);
		}
		if (r !== null) {
			if (n === null || n !== r) {
				let t = this.et.get(r);
				if (t !== void 0) {
					let n = Je(t).pop();
					Xe(e), I(e, void 0, n), qe(e, [n]);
				}
			}
			this.it = t;
		} else this.it = void 0;
		return this.render(t);
	}
}), $e = "important", et = " !" + $e, R = ze(class extends Be {
	constructor(e) {
		if (super(e), e.type !== Re.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return Object.keys(e).reduce((t, n) => {
			let r = e[n];
			return r == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
		}, "");
	}
	update(e, [t]) {
		let { style: n } = e.element;
		if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
		for (let e of this.ft) t[e] ?? (this.ft.delete(e), e.includes("-") ? n.removeProperty(e) : n[e] = null);
		for (let e in t) {
			let r = t[e];
			if (r != null) {
				this.ft.add(e);
				let t = typeof r == "string" && r.endsWith(et);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? $e : "") : n[e] = r;
			}
		}
		return D;
	}
}), tt = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, z = ze(class extends Be {
	constructor(e) {
		if (super(e), e.type !== Re.CHILD) throw Error("repeat() can only be used in text expressions");
	}
	dt(e, t, n) {
		let r;
		n === void 0 ? n = t : t !== void 0 && (r = t);
		let i = [], a = [], o = 0;
		for (let t of e) i[o] = r ? r(t, o) : o, a[o] = n(t, o), o++;
		return {
			values: a,
			keys: i
		};
	}
	render(e, t, n) {
		return this.dt(e, t, n).values;
	}
	update(e, [t, n, r]) {
		let i = Je(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = L(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = L(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = L(i[d], a[m]), I(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = L(i[f], a[p]), I(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = tt(o, p, m), u = tt(s, d, f)), l.has(s[d])) {
			if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = I(e, i[d]);
					L(t, a[p]), c[p] = t;
				} else c[p] = L(n, a[p]), I(e, i[d], n), i[t] = null;
				p++;
			} else Ye(i[f]), f--;
		} else Ye(i[d]), d++;
		for (; p <= m;) {
			let t = I(e, c[m + 1]);
			L(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && Ye(e);
		}
		return this.ut = o, qe(e, c), D;
	}
}), nt = Number.isNaN || function(e) {
	return typeof e == "number" && e !== e;
};
function rt(e, t) {
	return !!(e === t || nt(e) && nt(t));
}
function it(e, t) {
	if (e.length !== t.length) return !1;
	for (var n = 0; n < e.length; n++) if (!rt(e[n], t[n])) return !1;
	return !0;
}
function B(e, t) {
	t === void 0 && (t = it);
	var n = null;
	function r() {
		var r = [...arguments];
		if (n && n.lastThis === this && t(r, n.lastArgs)) return n.lastResult;
		var i = e.apply(this, r);
		return n = {
			lastResult: i,
			lastArgs: r,
			lastThis: this
		}, i;
	}
	return r.clear = function() {
		n = null;
	}, r;
}
//#endregion
//#region node_modules/@mdi/js/mdi.js
var at = "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z", ot = "M12,4A4,4 0 0,1 16,8C16,9.95 14.6,11.58 12.75,11.93L8.07,7.25C8.42,5.4 10.05,4 12,4M12.28,14L18.28,20L20,21.72L18.73,23L15.73,20H4V18C4,16.16 6.5,14.61 9.87,14.14L2.78,7.05L4.05,5.78L12.28,14M20,18V19.18L15.14,14.32C18,14.93 20,16.35 20,18Z", st = "M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z", ct = "M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5", lt = "M22.1 21.5L2.4 1.7L1.1 3L3.8 5.7C3.3 6.3 3 7.1 3 8V22H18V19.9L20.8 22.7L22.1 21.5M9.6 11.5L12.4 14.3C12.1 14.7 11.6 15 11 15C9.9 15 9 14.1 9 13C9 12.4 9.3 11.9 9.6 11.5M16 17.9V20H5V8C5 7.7 5.1 7.4 5.2 7.1L8.2 10.1C7.5 10.8 7 11.9 7 13C7 15.2 8.8 17 11 17C12.1 17 13.2 16.5 13.9 15.8L16 17.9M17 13.8C17.1 12.5 19 10.5 19 10.5S21 12.7 21 14C21 15 20.2 15.9 19.2 16L17 13.8M9.2 6L7.2 4H14C16.2 4 18 5.8 18 8V9H16V8C16 6.9 15.1 6 14 6H9.2Z", ut = "M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z", dt = "M18 14.8L9 5.8C9.9 5.3 10.9 5 12 5C15.3 5 18 7.7 18 11V14.8M20.1 4.8L18.7 3.4L16.6 5.5L18 6.9L20.1 4.8M19.5 10.5V12.5H22.5V10.5H19.5M4.5 10.5H1.5V12.5H4.5V10.5M1.1 3L6.6 8.5C6.2 9.2 6 10.1 6 11V19H17.1L18.1 20H6C4.9 20 4 20.9 4 22H20.1L20.8 22.7L22.1 21.4L2.4 1.7L1.1 3M13 1H11V4H13V1Z", ft = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", pt = "M18.75 22.16L16 19.16L17.16 18L18.75 19.59L22.34 16L23.5 17.41L18.75 22.16M11 15H13V17H11V15M11 7H13V13H11V7M12 2C17.5 2 22 6.5 22 12L21.92 13.31C21.31 13.11 20.67 13 19.94 13L20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C12.71 20 13.39 19.91 14.05 19.74C14.13 20.42 14.33 21.06 14.62 21.65C13.78 21.88 12.9 22 12 22C6.47 22 2 17.5 2 12C2 6.5 6.47 2 12 2Z", mt = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z", ht = "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z", gt = "M18 12C18 11 17.74 10.04 17.3 9.2L18.76 7.74C19.54 8.97 20 10.43 20 12C20 13.39 19.64 14.68 19 15.82L17.5 14.32C17.82 13.6 18 12.83 18 12M2.39 1.73L1.11 3L5.5 7.37C4.55 8.68 4 10.27 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13 6 12C6 10.83 6.34 9.74 6.92 8.81L15.19 17.08C14.26 17.66 13.17 18 12 18V15L8 19L12 23V20C13.73 20 15.32 19.45 16.63 18.5L20.84 22.73L22.11 21.46L2.39 1.73M12 6V8.8L12.1 8.9L16 5L12 1V4C10.62 4 9.32 4.36 8.18 5L9.68 6.5C10.4 6.18 11.18 6 12 6Z", _t = "M5.06 7C4.63 7 4.22 7.14 3.84 7.42C3.46 7.7 3.24 8.06 3.14 8.5L2.11 12.91C1.86 14 2.06 14.92 2.69 15.73C2.81 15.85 2.93 15.97 3.04 16.07C3.63 16.64 4.28 17 5.22 17C6.16 17 6.91 16.59 7.47 16.05C8.1 16.67 8.86 17 9.8 17C10.64 17 11.44 16.63 12 16.07C12.68 16.7 13.45 17 14.3 17C15.17 17 15.91 16.67 16.54 16.05C17.11 16.62 17.86 17 18.81 17C19.76 17 20.43 16.65 21 16.06C21.09 15.97 21.18 15.87 21.28 15.77C21.94 14.95 22.14 14 21.89 12.91L20.86 8.5C20.73 8.06 20.5 7.7 20.13 7.42C19.77 7.14 19.38 7 18.94 7H5.06M18.89 8.97L19.97 13.38C20.06 13.81 19.97 14.2 19.69 14.55C19.44 14.86 19.13 15 18.75 15C18.44 15 18.17 14.9 17.95 14.66C17.73 14.43 17.61 14.16 17.58 13.84L16.97 9L18.89 8.97M5.06 9H7.03L6.42 13.84C6.3 14.63 5.91 15 5.25 15C4.84 15 4.53 14.86 4.31 14.55C4.03 14.2 3.94 13.81 4.03 13.38L5.06 9M9.05 9H11V13.7C11 14.05 10.89 14.35 10.64 14.62C10.39 14.88 10.08 15 9.7 15C9.36 15 9.07 14.88 8.84 14.59C8.61 14.3 8.5 14 8.5 13.66V13.5L9.05 9M13 9H14.95L15.5 13.5C15.58 13.92 15.5 14.27 15.21 14.57C14.95 14.87 14.61 15 14.2 15C13.89 15 13.61 14.88 13.36 14.62C13.11 14.35 13 14.05 13 13.7V9Z", vt = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z", yt = "M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z", bt = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15", xt = "M16.75 21.16L14 18.16L15.16 17L16.75 18.59L20.34 15L21.5 16.41L16.75 21.16M12 18C12 14.69 14.69 12 18 12V5.33C18 4.6 17.4 4 16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H13.54C12.58 20.94 12 19.54 12 18Z", St = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21", Ct = "M20.84,22.73L18.11,20H3V19L5,17V11C5,9.86 5.29,8.73 5.83,7.72L1.11,3L2.39,1.73L22.11,21.46L20.84,22.73M19,15.8V11C19,7.9 16.97,5.17 14,4.29C14,4.19 14,4.1 14,4A2,2 0 0,0 12,2A2,2 0 0,0 10,4C10,4.1 10,4.19 10,4.29C9.39,4.47 8.8,4.74 8.26,5.09L19,15.8M12,23A2,2 0 0,0 14,21H10A2,2 0 0,0 12,23Z", wt = "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z", Tt = "M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z", Et = "M3 2H21C21.55 2 22 2.45 22 3V5C22 5.55 21.55 6 21 6H20V7C20 7.55 19.55 8 19 8H13V10.17C14.17 10.58 15 11.7 15 13C15 14.66 13.66 16 12 16C10.34 16 9 14.66 9 13C9 11.69 9.84 10.58 11 10.17V8H5C4.45 8 4 7.55 4 7V6H3C2.45 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2M12 12C11.45 12 11 12.45 11 13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13C13 12.45 12.55 12 12 12Z", Dt = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z", Ot = "M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z", kt = "M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M9.31,17L11.75,14.56L14.19,17L15.25,15.94L12.81,13.5L15.25,11.06L14.19,10L11.75,12.44L9.31,10L8.25,11.06L10.69,13.5L8.25,15.94L9.31,17Z", At = "M19 19H5V8H19M16 1V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1M10.88 12H7.27L10.19 14.11L9.08 17.56L12 15.43L14.92 17.56L13.8 14.12L16.72 12H13.12L12 8.56L10.88 12Z", jt = "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z", Mt = "M1.2,4.47L2.5,3.2L20,20.72L18.73,22L16.73,20H4A2,2 0 0,1 2,18V6C2,5.78 2.04,5.57 2.1,5.37L1.2,4.47M7,4L9,2H15L17,4H20A2,2 0 0,1 22,6V18C22,18.6 21.74,19.13 21.32,19.5L16.33,14.5C16.76,13.77 17,12.91 17,12A5,5 0 0,0 12,7C11.09,7 10.23,7.24 9.5,7.67L5.82,4H7M7,12A5,5 0 0,0 12,17C12.5,17 13.03,16.92 13.5,16.77L11.72,15C10.29,14.85 9.15,13.71 9,12.28L7.23,10.5C7.08,10.97 7,11.5 7,12M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9Z", Nt = "M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z", Pt = "M20.5,19.85L6.41,5.76L2.41,1.76L1.11,3L4.57,6.46L3,11V19A1,1 0 0,0 4,20H5A1,1 0 0,0 6,19V18H16.11L20.84,22.73L22.11,21.46L20.5,19.85M6.5,15A1.5,1.5 0 0,1 5,13.5A1.5,1.5 0 0,1 6.5,12A1.5,1.5 0 0,1 8,13.5A1.5,1.5 0 0,1 6.5,15M5,10L5.78,7.67L8.11,10H5M17.5,5.5L19,10H13.2L16.12,12.92C16.5,12.17 17.37,11.86 18.12,12.21C18.87,12.57 19.18,13.47 18.83,14.21C18.68,14.5 18.43,14.77 18.12,14.92L21,17.8V11L18.92,5C18.71,4.4 18.14,4 17.5,4H7.2L8.7,5.5H17.5Z", Ft = "M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3Z", It = "M1.6,1.27L0.25,2.75L1.41,3.8C1.16,4.13 1,4.55 1,5V8H3V5.23L18.2,19H14V21H20.41L22.31,22.72L23.65,21.24M6.5,3L8.7,5H21V16.14L23,17.95V5C23,3.89 22.1,3 21,3M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.08,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18Z", Lt = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", Rt = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z", zt = "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", Bt = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Vt = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z", Ht = "M13.72 21.84C13.16 21.94 12.59 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2 22 6.5 22 12C22 12.59 21.94 13.16 21.84 13.72C21 13.26 20.03 13 19 13C17.74 13 16.57 13.39 15.6 14.06L12.5 12.2V7H11V13L14.43 15.11C13.54 16.16 13 17.5 13 19C13 20.03 13.26 21 13.72 21.84M21.12 15.46L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88L21.12 15.46Z", Ut = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Wt = "M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z", Gt = "M21.4 7.5C22.2 8.3 22.2 9.6 21.4 10.3L18.6 13.1L10.8 5.3L13.6 2.5C14.4 1.7 15.7 1.7 16.4 2.5L18.2 4.3L21.2 1.3L22.6 2.7L19.6 5.7L21.4 7.5M15.6 13.3L14.2 11.9L11.4 14.7L9.3 12.6L12.1 9.8L10.7 8.4L7.9 11.2L6.4 9.8L3.6 12.6C2.8 13.4 2.8 14.7 3.6 15.4L5.4 17.2L1.4 21.2L2.8 22.6L6.8 18.6L8.6 20.4C9.4 21.2 10.7 21.2 11.4 20.4L14.2 17.6L12.8 16.2L15.6 13.3Z", Kt = "M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z", qt = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", Jt = "M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z", Yt = "M23 3H1V1H23V3M2 22H11V4H2V22M22 4H13V22H22V4Z", Xt = "M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z", Zt = "M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z", Qt = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", $t = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", en = "M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z", tn = "M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z", nn = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z", rn = "M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z", an = "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z", on = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", sn = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z", cn = "M1 4.27L2.28 3L6 6.72L21 21.72L19.73 23L17.72 21C16.56 20.85 15.65 19.94 15.5 18.78L14 17.27V21H4V7.27L1 4.27M19.77 7.23C20.22 7.68 20.5 8.31 20.5 9L20.5 18.67L19 17.18V11.29C18.69 11.42 18.36 11.5 18 11.5C16.62 11.5 15.5 10.38 15.5 9C15.5 7.93 16.17 7.03 17.11 6.67L15 4.56L16.06 3.5L19.78 7.22L19.77 7.23M11.82 10H12V5H6.82L5.06 3.24C5.34 3.09 5.66 3 6 3H12C13.1 3 14 3.9 14 5V12H15C16.1 12 17 12.9 17 14V15.18L11.82 10M6 10H6.73L6 9.27V10M6 12V19H12V15.27L8.73 12H6M18 10C18.55 10 19 9.55 19 9C19 8.45 18.55 8 18 8C17.45 8 17 8.45 17 9C17 9.55 17.45 10 18 10Z", ln = "M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M12,13.5V19H6V12H12V13.5M12,10H6V5H12V10M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10Z", un = "M9 6V11H7V7H5V11H3V9H1V21H3V19H5V21H7V19H9V21H11V19H13V21H15V19H17V21H19V19H21V21H23V9H21V11H19V7H17V11H15V6H13V11H11V6H9M3 13H5V17H3V13M7 13H9V17H7V13M11 13H13V17H11V13M15 13H17V17H15V13M19 13H21V17H19V13Z", dn = "M7 21V7H5V11H3V9H1V21H3V19H5V21H7M3 17V13H5V17H3M21 9V11H19V7H17V21H19V19H21V21H23V9H21M21 17H19V13H21V17Z", fn = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z", pn = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z", mn = "M15,12C13.89,12 13,12.89 13,14A2,2 0 0,0 15,16A2,2 0 0,0 17,14C17,12.89 16.1,12 15,12M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M14,9C14,7.89 13.1,7 12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9M9,12A2,2 0 0,0 7,14A2,2 0 0,0 9,16A2,2 0 0,0 11,14C11,12.89 10.1,12 9,12Z", hn = "M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", gn = "M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z", _n = "M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22", vn = "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z", yn = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z", bn = "M21 17.2L6.8 3H19C20.1 3 21 3.9 21 5V17.2M20.7 22L19.7 21H5C3.9 21 3 20.1 3 19V4.3L2 3.3L3.3 2L22 20.7L20.7 22M16.8 18L12.9 14.1L11 16.5L8.5 13.5L5 18H16.8Z", xn = "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z", Sn = "M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", Cn = "M12,2C9.76,2 7.78,3.05 6.5,4.68L7.93,6.11C8.84,4.84 10.32,4 12,4A5,5 0 0,1 17,9C17,10.68 16.16,12.16 14.89,13.06L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M7.23,10.5L12.73,16H10V13.58C8.68,13 7.66,11.88 7.23,10.5M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z", wn = "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z", Tn = "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z", En = "M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z", Dn = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z", On = "M16.37,16.1L11.75,11.47L11.64,11.36L3.27,3L2,4.27L5.18,7.45C5.06,7.95 5,8.46 5,9C5,14.25 12,22 12,22C12,22 13.67,20.15 15.37,17.65L18.73,21L20,19.72M12,6.5A2.5,2.5 0 0,1 14.5,9C14.5,9.73 14.17,10.39 13.67,10.85L17.3,14.5C18.28,12.62 19,10.68 19,9A7,7 0 0,0 12,2C10,2 8.24,2.82 6.96,4.14L10.15,7.33C10.61,6.82 11.26,6.5 12,6.5Z", kn = "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z", An = "M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z", jn = "M8 7C6.9 7 6 7.9 6 9V15C6 16.11 6.9 17 8 17H11V15H8V9H11V7H8M14 7C12.9 7 12 7.9 12 9V15C12 16.11 12.9 17 14 17H16C17.11 17 18 16.11 18 15V9C18 7.9 17.11 7 16 7H14M14 9H16V15H14V9", Mn = "M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z", Nn = "M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z", Pn = "M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18Z", Fn = "M22.11 21.46L20.84 22.73L18.11 20H4C2.9 20 2 19.11 2 18V6C2 5.42 2.25 4.9 2.65 4.54L1.11 3L2.39 1.73L22.11 21.46M21.88 18.68C21.96 18.47 22 18.24 22 18V4H18L20 8H17L15 4H13L15 8H12L10 4H8L8.8 5.6L21.88 18.68Z", In = "M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z", Ln = "M14,19H18V5H14M6,19H10V5H6V19Z", Rn = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", zn = "M8,5.14V19.14L19,12.14L8,5.14Z", Bn = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13", Vn = "M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19Z", Hn = "M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z", Un = "M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z", Wn = "M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z", Gn = "M12.5,5A7.5,7.5 0 0,0 5,12.5A7.5,7.5 0 0,0 12.5,20A7.5,7.5 0 0,0 20,12.5A7.5,7.5 0 0,0 12.5,5M7,10H9A1,1 0 0,1 10,11V12C10,12.5 9.62,12.9 9.14,12.97L10.31,15H9.15L8,13V15H7M12,10H14V11H12V12H14V13H12V14H14V15H12A1,1 0 0,1 11,14V11A1,1 0 0,1 12,10M16,10H18V11H16V14H18V15H16A1,1 0 0,1 15,14V11A1,1 0 0,1 16,10M8,11V12H9V11", Kn = "M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z", qn = "M2,5.27L3.28,4L21,21.72L19.73,23L16,19.27V22A1,1 0 0,1 15,23H9C8.46,23 8,22.55 8,22V11.27L2,5.27M12,0C15.05,0 17.8,1.23 19.77,3.23L18.36,4.64C16.75,3 14.5,2 12,2C9.72,2 7.64,2.85 6.06,4.24L4.64,2.82C6.59,1.07 9.17,0 12,0M12,4C13.94,4 15.69,4.78 16.95,6.05L15.55,7.46C14.64,6.56 13.39,6 12,6C10.83,6 9.76,6.4 8.9,7.08L7.5,5.66C8.7,4.62 10.28,4 12,4M15,9C15.56,9 16,9.45 16,10V14.18L13.5,11.69L13.31,11.5L10.82,9H15M10.03,13.3C10.16,14.16 10.84,14.85 11.71,15L10.03,13.3Z", Jn = "M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z", Yn = "M1 14V5H13C18.5 5 23 9.5 23 15V17H20.83C20.42 18.17 19.31 19 18 19C16.69 19 15.58 18.17 15.17 17H10C9.09 18.21 7.64 19 6 19C3.24 19 1 16.76 1 14M6 11C4.34 11 3 12.34 3 14C3 15.66 4.34 17 6 17C7.66 17 9 15.66 9 14C9 12.34 7.66 11 6 11M15 10V12H20.25C19.92 11.27 19.5 10.6 19 10H15Z", Xn = "M23 15V18C23 18.5 22.64 18.88 22.17 18.97L18.97 15.77C19 15.68 19 15.59 19 15.5C19 14.12 17.88 13 16.5 13C16.41 13 16.32 13 16.23 13.03L10.2 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M22.11 21.46L20.84 22.73L19.89 21.78C19.62 21.92 19.32 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 11.53 4.29 9.36 6.22 8.11L1.11 3L2.39 1.73L22.11 21.46M10 15.5C10 14.12 8.88 13 7.5 13S5 14.12 5 15.5 6.12 18 7.5 18 10 16.88 10 15.5M16.07 17.96L14.04 15.93C14.23 16.97 15.04 17.77 16.07 17.96Z", Zn = "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z", Qn = "M20.8 22.7L18 19.9C16.3 21.2 14.2 22 12 22C6.5 22 2 17.5 2 12C2 10 2.6 8.1 3.7 6.5L5.2 7.9C4.4 9.2 4 10.6 4 12C4 16.4 7.6 20 12 20C13.7 20 15.3 19.4 16.6 18.5L13.7 15.6C13.2 15.9 12.6 16 12 16C10.9 16 9.9 15.6 9.2 14.8L7.8 16.2C6.6 15.1 6 13.6 6 12C6 10.8 6.3 9.7 6.9 8.8L1.1 3L2.4 1.7L22.1 21.4L20.8 22.7M20 12C20 13.4 19.6 14.7 19 15.8L20.5 17.3C21.5 15.8 22 14 22 12C22 10 21.4 8.1 20.3 6.5L18.8 7.9C19.6 9.2 20 10.6 20 12M12 4C14.1 4 16.2 4.8 17.7 6.3L19.1 4.9C17.2 3.1 14.7 2 12 2C10.1 2 8.3 2.5 6.7 3.5L8.2 5C9.3 4.3 10.7 4 12 4M17.5 14.3C17.8 13.6 18 12.8 18 12C18 8.7 15.3 6 12 6C11.2 6 10.4 6.2 9.7 6.5L11.4 8.2C11.6 8.1 11.8 8 12 8C12.6 8 13 8.4 13 9C13 9.2 12.9 9.4 12.8 9.6L17.5 14.3Z", $n = "M20 19V3H4V19H2V21H22V19H20M6 19V13H11V14.8C10.6 15.1 10.2 15.6 10.2 16.2C10.2 17.2 11 18 12 18S13.8 17.2 13.8 16.2C13.8 15.6 13.5 15.1 13 14.8V13H18V19H6Z", er = "M20 19V3H4V19H2V21H10.25C10.25 21.97 11.03 22.75 12 22.75S13.75 21.97 13.75 21H22V19H20M6 19V17H11V19H6M13 19V17H18V19H13Z", tr = "M11.62,1L17.28,6.67L15.16,8.79L13.04,6.67L11.62,8.09L13.95,10.41L12.79,11.58L13.24,12.04C14.17,11.61 15.31,11.77 16.07,12.54L12.54,16.07C11.77,15.31 11.61,14.17 12.04,13.24L11.58,12.79L10.41,13.95L8.09,11.62L6.67,13.04L8.79,15.16L6.67,17.28L1,11.62L3.14,9.5L5.26,11.62L6.67,10.21L3.84,7.38C3.06,6.6 3.06,5.33 3.84,4.55L4.55,3.84C5.33,3.06 6.6,3.06 7.38,3.84L10.21,6.67L11.62,5.26L9.5,3.14L11.62,1M18,14A4,4 0 0,1 14,18V16A2,2 0 0,0 16,14H18M22,14A8,8 0 0,1 14,22V20A6,6 0 0,0 20,14H22Z", nr = "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z", rr = "M4,18V21H7V18H17V21H20V15H4V18M19,10H22V13H19V10M2,10H5V13H2V10M17,13H7V5A2,2 0 0,1 9,3H15A2,2 0 0,1 17,5V13Z", ir = "M15,5V12H9V5H15M15,3H9A2,2 0 0,0 7,5V14H17V5A2,2 0 0,0 15,3M22,10H19V13H22V10M5,10H2V13H5V10M20,15H4V21H6V17H18V21H20V15Z", ar = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,7H13V13H11V7M11,15H13V17H11V15Z", or = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9", sr = "M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z", cr = "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z", lr = "M12 1L3 5V11C3 16.5 6.8 21.7 12 23C17.2 21.7 21 16.5 21 11V5L12 1M16 15.8C16 16.4 15.4 17 14.7 17H9.2C8.6 17 8 16.4 8 15.7V12.2C8 11.6 8.6 11 9.2 11V8.5C9.2 7.1 10.6 6 12 6S14.8 7.1 14.8 8.5V9H13.5V8.5C13.5 7.7 12.8 7.2 12 7.2S10.5 7.7 10.5 8.5V11H14.8C15.4 11 16 11.6 16 12.3V15.8Z", ur = "M8.2 5L6.2 3H19C20.11 3 21 3.9 21 5V17.8L19 15.8V5H8.2M17.5 14.32C17.82 13.6 18 12.83 18 12C18 8.68 15.31 6 12 6C11.17 6 10.4 6.18 9.68 6.5L11.27 8.07C11.5 8.03 11.75 8 12 8C14.21 8 16 9.79 16 12C16 12.25 15.97 12.5 15.93 12.73L17.5 14.32M22.11 21.46L20.84 22.73L19.1 21C19.07 21 19.03 21 19 21H5C3.89 21 3 20.1 3 19V5C3 4.97 3 4.93 3 4.9L1.11 3L2.39 1.73L22.11 21.46M8 12C8 14.21 9.79 16 12 16C12.62 16 13.19 15.85 13.71 15.6L8.4 10.29C8.15 10.81 8 11.39 8 12M17.11 19L15.19 17.08C14.26 17.66 13.17 18 12 18C8.69 18 6 15.31 6 12C6 10.83 6.34 9.74 6.92 8.81L5 6.89V19H17.11Z", dr = "M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V5H19V19M12 18C15.31 18 18 15.31 18 12C18 8.68 15.31 6 12 6C8.68 6 6 8.68 6 12C6 15.31 8.69 18 12 18M12 8C14.21 8 16 9.79 16 12S14.21 16 12 16 8 14.21 8 12 9.79 8 12 8Z", fr = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z", pr = "M11 5.12L9.29 3.41L10.71 2L12 3.29L13.29 2L14.71 3.41L13 5.12V7.38L15.45 8.82L17.45 7.69L18.07 5.36L20 5.88L19.54 7.65L21.31 8.12L20.79 10.05L18.46 9.43L16.46 10.56V13.26L14.5 11.3V10.56L12.74 9.54L10.73 7.53L11 7.38V5.12M18.46 14.57L16.87 13.67L19.55 16.35L21.3 15.88L20.79 13.95L18.46 14.57M13 16.62V18.88L14.7 20.59L13.29 22L12 20.71L10.71 22L9.29 20.59L11 18.88V16.62L8.55 15.18L6.55 16.31L5.93 18.64L4 18.12L4.47 16.36L2.7 15.89L3.22 13.96L5.55 14.58L7.55 13.45V10.56L5.55 9.43L3.22 10.05L2.7 8.12L4.47 7.65L4 5.89L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73L14.1 16L13 16.62M12 14.89L12.63 14.5L9.5 11.39V13.44L12 14.89Z", mr = "M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.58,19.41L2.59,12.42C2.22,12.05 2,11.55 2,11V6C2,4.89 2.89,4 4,4H9C9.55,4 10.05,4.22 10.41,4.58L17.41,11.58M13.54,5.71L14.54,4.71L21.41,11.58C21.78,11.94 22,12.45 22,13C22,13.55 21.78,14.05 21.42,14.41L16.04,19.79L15.04,18.79L20.75,13L13.54,5.71Z", hr = "M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z", gr = "M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z", _r = "M22 12.66C21.07 12.24 20.07 12 19 12C19 10.43 18.5 9 17.6 7.81L15.43 10C15.79 10.57 16 11.26 16 12C16 12.24 16 12.5 15.94 12.7C13.61 13.84 12 16.23 12 19C12 20.07 12.24 21.07 12.66 22C12.44 22 12.22 22 12 22C10.69 22 9.39 21.74 8.17 21.24C6.96 20.74 5.86 20 4.93 19.07C3.05 17.2 2 14.65 2 12C2 9.35 3.05 6.8 4.93 4.93C5.86 4 6.96 3.26 8.17 2.76C9.39 2.26 10.69 2 12 2C17.5 2 22 6.47 22 12C22 12.22 22 12.44 22 12.66M12 5C10.14 5 8.36 5.74 7.05 7.05C5.74 8.36 5 10.14 5 12C5 13.93 5.78 15.68 7.05 16.95L9.17 14.83C8.45 14.1 8 13.1 8 12C8 10.94 8.42 9.92 9.17 9.17C9.92 8.42 10.94 8 12 8C12.74 8 13.43 8.21 14 8.56L16.19 6.4C15 5.5 13.57 5 12 5M23.83 20.64C23.89 20.53 23.87 20.39 23.77 20.32L22.72 19.5C22.74 19.33 22.75 19.16 22.75 19C22.75 18.84 22.74 18.67 22.72 18.5L23.77 17.68C23.87 17.61 23.89 17.5 23.83 17.36L22.83 15.64C22.77 15.53 22.64 15.5 22.53 15.53L21.28 16L21.14 15.91C20.91 15.77 20.7 15.64 20.44 15.54L20.25 14.21C20.23 14.09 20.13 14 20 14H18C17.88 14 17.77 14.09 17.75 14.21L17.57 15.54C17.3 15.64 17.09 15.78 16.86 15.92L16.72 16L15.5 15.53C15.37 15.5 15.23 15.53 15.17 15.64L14.17 17.36C14.11 17.5 14.14 17.61 14.23 17.68L15.29 18.5L15.29 18.53C15.27 18.69 15.25 18.84 15.25 19C15.25 19.16 15.27 19.31 15.29 19.47C15.29 19.5 15.29 19.5 15.29 19.5L14.23 20.32C14.14 20.39 14.11 20.53 14.17 20.64L15.17 22.37C15.23 22.5 15.37 22.5 15.5 22.5L16.72 21.97C17 22.17 17.25 22.34 17.57 22.47L17.75 23.79C17.77 23.91 17.88 24 18 24H20C20.13 24 20.23 23.91 20.25 23.79L20.44 22.47C20.75 22.34 21 22.17 21.28 21.97L22.53 22.5C22.64 22.5 22.77 22.5 22.83 22.37L23.83 20.64M19 17.25C19.97 17.25 20.75 18.03 20.75 19C20.75 19.97 19.96 20.75 19 20.75C18.04 20.75 17.25 19.97 17.25 19C17.25 18.03 18.03 17.25 19 17.25Z", vr = "M3 4L1.75 5.27L4.5 8.03C3.55 9.45 3 11.16 3 13C3 17.97 7.03 22 12 22C13.84 22 15.55 21.45 17 20.5L19.5 23L20.75 21.73L13.04 14L3 4M15 1H9V3H15M21 13C21 14.83 20.45 16.53 19.5 17.94L13 11.45V7H11V9.45L7.05 5.5C8.47 4.55 10.17 4 12 4C14.12 4 16.07 4.74 17.62 5.97L19.04 4.55L20.45 5.97L19.03 7.39C20.26 8.93 21 10.88 21 13Z", yr = "M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z", br = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z", xr = "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z", Sr = "M4 22H2V2H4M22 2H20V22H22M17.24 5.34L13.24 9.34A3 3 0 0 0 9.24 13.34L5.24 17.34L6.66 18.76L10.66 14.76A3 3 0 0 0 14.66 10.76L18.66 6.76Z", Cr = "M22 2V22H20V13H14.82A3 3 0 0 1 9.18 13H4V22H2V2H4V11H9.18A3 3 0 0 1 14.82 11H20V2Z", wr = "M4 22H2V2H4M22 2H20V22H22M11 4V9.18A3 3 0 0 0 11 14.82V20H13V14.82A3 3 0 0 0 13 9.18V4Z", Tr = "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z", Er = "M8.2,5L6.55,3.35C6.81,3.12 7.15,3 7.5,3H16.5A1.5,1.5 0 0,1 18,4.5V14.8L16,12.8V5H8.2M0,15H2V9H0V15M21,17V7H19V15.8L20.2,17H21M3,17H5V7H3V17M18,17.35L22.11,21.46L20.84,22.73L18,19.85C17.83,20.54 17.21,21 16.5,21H7.5A1.5,1.5 0 0,1 6,19.5V7.89L1.11,3L2.39,1.73L6.09,5.44L8,7.34L16,15.34L18,17.34V17.35M16,17.89L8,9.89V19H16V17.89M22,9V15H24V9H22Z", Dr = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z", Or = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z", kr = "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z", Ar = "M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z", jr = "M8 2C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H9V20H6V22H9C10.11 22 11 21.11 11 20V18H13V20C13 21.11 13.89 22 15 22H18V20H15V18H16C17.11 18 18 17.11 18 16V4C18 2.89 17.11 2 16 2H8M12 4.97A2 2 0 0 1 14 6.97A2 2 0 0 1 12 8.97A2 2 0 0 1 10 6.97A2 2 0 0 1 12 4.97M10 14.5H14V16H10V14.5Z", Mr = "M20.84 22.73L16.29 18.18C15.2 19.3 13.69 20 12 20C8.69 20 6 17.31 6 14C6 12.67 6.67 11.03 7.55 9.44L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14C18 10 12 3.25 12 3.25S10.84 4.55 9.55 6.35L17.95 14.75C18 14.5 18 14.25 18 14Z", Nr = "M5.7 2.5A2 2 0 0 1 7 2H9A2 2 0 0 1 11 4V5H19A2 2 0 0 1 21 7V11A1 1 0 0 1 21 13H17A1 1 0 0 1 17 11V9H12.2M20.84 22.73L22.11 21.46L11 10.34L2.39 1.73L1.11 3L3.65 5.54A2 2 0 0 0 5 9V18H4A2 2 0 0 0 2 20V22H14V20A2 2 0 0 0 12 18H11V12.89Z", Pr = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", Fr = "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z", Ir = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", Lr = "M22.11 21.46L2.39 1.73L1.11 3L4.97 6.86L3.34 7L5.11 10.79C5.25 10 5.5 9.24 5.94 8.5C6 8.36 6.13 8.24 6.22 8.11L7.66 9.55C7.25 10.27 7 11.11 7 12C7 14.76 9.24 17 12 17C12.9 17 13.73 16.75 14.45 16.34L20.84 22.73L22.11 21.46M12 15C10.34 15 9 13.66 9 12C9 11.67 9.07 11.36 9.17 11.06L12.94 14.83C12.64 14.93 12.33 15 12 15M18.05 8.5C17.63 7.78 17.1 7.15 16.5 6.64L20.65 7L18.88 10.79C18.74 10 18.47 9.23 18.05 8.5M12 7C14.76 7 17 9.24 17 12C17 12.54 16.89 13.05 16.74 13.54L15 11.78C14.87 10.3 13.7 9.13 12.22 9L10.47 7.27C10.95 7.11 11.46 7 12 7M12 5C11.16 5 10.35 5.15 9.61 5.42L12 2L14.39 5.42C13.65 5.15 12.84 5 12 5M18.87 13.21L20.64 17L20.24 17.04L18.25 15.05C18.54 14.45 18.76 13.84 18.87 13.21M12 19C12.82 19 13.63 18.83 14.37 18.56L12 22L9.59 18.56C10.33 18.83 11.14 19 12 19M5.95 15.5C6.37 16.24 6.91 16.86 7.5 17.37L3.36 17L5.12 13.23C5.26 14 5.53 14.78 5.95 15.5Z", Rr = "M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", zr = "M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z", Br = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z", Vr = "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9Z", Hr = ["sensor"], Ur = ["binary_sensor"], Wr = ["cover"], Gr = ["climate"], Kr = ["camera"], qr = [
	"light",
	"switch",
	"fan",
	"media_player",
	"lock",
	"vacuum",
	"cover",
	"script",
	"scene"
], Jr = {
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
}, Yr = {
	alarm_control_panel: {
		on: ut,
		off: dt
	},
	siren: {
		on: wt,
		off: Ct
	},
	lock: {
		on: En,
		off: Tn
	},
	light: {
		on: xn,
		off: Sn
	},
	media_player: {
		on: Ft,
		off: It
	},
	climate: {
		on: gr,
		off: _r
	},
	humidifier: {
		on: ct,
		off: lt
	},
	switch: {
		on: br,
		off: xr,
		switch: {
			on: br,
			off: xr
		},
		outlet: {
			on: Hn,
			off: Un
		}
	},
	vacuum: {
		on: Zn,
		off: Qn
	},
	lawn_mower: {
		on: Yn,
		off: Yn
	},
	fan: {
		on: nn,
		off: rn
	},
	cover: {
		on: sn,
		off: on,
		garage: {
			on: sn,
			off: on
		},
		door: {
			on: Zt,
			off: Xt
		},
		gate: {
			on: dn,
			off: un
		},
		blind: {
			on: Et,
			off: Tt
		},
		curtain: {
			on: Jt,
			off: Yt
		},
		damper: {
			on: wr,
			off: Cr
		},
		awning: {
			on: _t,
			off: _t
		},
		shutter: {
			on: Vr,
			off: Br
		},
		shade: {
			on: $n,
			off: er
		},
		window: {
			on: zr,
			off: Rr
		}
	},
	binary_sensor: {
		on: Vn,
		off: Vn,
		motion: {
			on: Mn,
			off: Nn
		},
		moisture: {
			on: Ar,
			off: Mr
		},
		window: {
			on: zr,
			off: Rr
		},
		door: {
			on: Zt,
			off: Xt
		},
		lock: {
			on: En,
			off: Tn
		},
		presence: {
			on: _n,
			off: gn
		},
		occupancy: {
			on: rr,
			off: ir
		},
		vibration: {
			on: Tr,
			off: Er
		},
		opening: {
			on: lr,
			off: cr
		},
		garage_door: {
			on: sn,
			off: on
		},
		problem: {
			on: mt,
			off: pt
		},
		smoke: {
			on: dr,
			off: ur
		},
		running: {
			on: zn,
			off: Ln
		},
		plug: {
			on: Hn,
			off: Un
		},
		power: {
			on: Bn,
			off: Vn
		},
		battery: {
			on: yt,
			off: vt
		},
		battery_charging: {
			on: bt,
			off: xt
		},
		gas: {
			on: ln,
			off: cn
		},
		carbon_monoxide: {
			on: jn,
			off: jn
		},
		cold: {
			on: fr,
			off: pr
		},
		heat: {
			on: Ir,
			off: Lr
		},
		connectivity: {
			on: Gt,
			off: Gt
		},
		safety: {
			on: ar,
			off: or
		},
		sound: {
			on: Or,
			off: kr
		},
		update: {
			on: ht,
			off: gt
		},
		tamper: {
			on: sr,
			off: sr
		},
		light: {
			on: wn,
			off: Cn
		},
		moving: {
			on: Nt,
			off: Pt
		}
	},
	person: {
		on: at,
		off: ot
	},
	device_tracker: {
		on: at,
		off: ot
	},
	valve: {
		on: Sr,
		off: Cr
	},
	water_heater: {
		on: jr,
		off: Nr
	},
	remote: {
		on: Kn,
		off: qn
	},
	update: {
		on: ht,
		off: gt
	},
	air_quality: {
		on: st,
		off: st
	},
	camera: {
		on: jt,
		off: Mt
	},
	calendar: {
		on: Dt,
		off: kt
	},
	scene: {
		on: Pn,
		off: Fn
	},
	notifications: {
		on: St,
		off: Ct
	},
	sensor: {
		on: fn,
		off: fn
	},
	script: {
		on: nr,
		off: nr
	},
	tags: {
		on: mr,
		off: mr
	},
	select: {
		on: an,
		off: an
	},
	automation: {
		on: Jn,
		off: Xn
	},
	button: {
		on: pn,
		off: pn
	},
	number: {
		on: In,
		off: In
	},
	conversation: {
		on: Wt,
		off: Wt
	},
	assist_satellite: {
		on: tr,
		off: tr
	},
	counter: {
		on: Kt,
		off: Kt
	},
	event: {
		on: At,
		off: At
	},
	group: {
		on: mn,
		off: mn
	},
	image: {
		on: vn,
		off: bn
	},
	image_processing: {
		on: yn,
		off: yn
	},
	input_boolean: {
		on: br,
		off: xr
	},
	input_datetime: {
		on: Ot,
		off: Ot
	},
	input_number: {
		on: In,
		off: In
	},
	input_select: {
		on: an,
		off: an
	},
	input_text: {
		on: hr,
		off: hr
	},
	stt: {
		on: Gn,
		off: Wn
	},
	sun: {
		on: Ir,
		off: Pr
	},
	text: {
		on: hr,
		off: hr
	},
	date: {
		on: Dt,
		off: kt
	},
	datetime: {
		on: Ot,
		off: Ot
	},
	time: {
		on: Vt,
		off: Ht
	},
	timer: {
		on: yr,
		off: vr
	},
	todo: {
		on: Rt,
		off: zt
	},
	tts: {
		on: Or,
		off: kr
	},
	wake_word: {
		on: kn,
		off: An
	},
	weather: {
		on: Fr,
		off: Pr
	},
	zone: {
		on: Dn,
		off: On
	},
	geo_location: {
		on: Dn,
		off: On
	}
}, Xr = (e) => B((t, n) => e.flatMap((e) => e in t ? n[e].map((t) => ({
	domain: e,
	deviceClass: t
})) : [])), Zr = Xr(Wr), Qr = Xr(Ur), $r = Xr(Hr), ei = B((e, t) => (e || []).filter((e) => e in t)), ti = (e, t) => {
	if (!e) return {};
	if (typeof e == "object") return Object.entries(e).reduce((e, [t, n]) => {
		let r = t.startsWith("--") ? t : t.replace(/-([a-z])/g, (e, t) => t.toUpperCase());
		return e[r] = String(n), e;
	}, {});
	let n = e.trim();
	if (t && t.has(n)) return t.get(n);
	let r = e.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n/g, " ").split(";").map((e) => e.trim()).filter((e) => e && e.includes(":")).reduce((e, t) => {
		let n = t.split(":"), r = n[0], i = n.slice(1).join(":");
		if (r && i !== void 0) {
			let t = r.trim(), n = t.startsWith("--") ? t : t.replace(/-([a-z])/g, (e, t) => t.toUpperCase());
			e[n] = i.trim();
		}
		return e;
	}, {});
	return t && t.set(n, r), r;
}, ni = B((e, t, n, r, i) => {
	let a = {
		...e && t === 1 ? { "--mdc-icon-size": "20px" } : {},
		...r ? { color: `var(--${r}-color)` } : {}
	};
	if (!n) return a;
	let o = ti(n, i);
	return {
		...a,
		...o
	};
}), ri = s`
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
  .dashed .sensor-value + .sensor-value::before {
    content: " - ";
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
`, V = [
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
], H = ["unavailable", "unknown"], ii = (e, t, n, r, i) => {
	let a = n || (i ? t?.theme : void 0), o = r?.dark === void 0 ? t?.darkMode || !1 : r.dark;
	e.__themes ||= {
		cacheKey: null,
		keys: /* @__PURE__ */ new Set()
	};
	let s = a || "", c = {};
	if (a === "default") {
		let t = r?.primaryColor, n = r?.accentColor;
		if (t && (s = `${s}__primary_${t}`, c["primary-color"] = String(t)), n && (s = `${s}__accent_${n}`, c["accent-color"] = String(n)), !t && !n && e.__themes?.cacheKey === "default") return;
	}
	if (a && a !== "default" && t?.themes?.[a]) {
		let { modes: e, ...n } = t.themes[a] || {};
		c = {
			...c,
			...n
		}, e && (o && e.dark ? c = {
			...c,
			...e.dark
		} : !o && e.light && (c = {
			...c,
			...e.light
		}));
	} else if (!a && (!e.__themes?.keys || e.__themes.keys.size === 0)) return;
	let l = e.__themes?.keys || /* @__PURE__ */ new Set(), u = new Set(Object.keys(c));
	if (a === "default" && u.size === 0) {
		for (let t of l) try {
			e.style.removeProperty(`--${t}`);
		} catch {}
		e.__themes = {
			cacheKey: "default",
			keys: /* @__PURE__ */ new Set()
		};
	} else {
		if (e.__themes?.cacheKey === s) {
			let e = !0;
			if (l.size !== u.size) e = !1;
			else for (let t of l) if (!u.has(t)) {
				e = !1;
				break;
			}
			if (e) return;
		}
		for (let t of l) if (!u.has(t)) try {
			e.style.removeProperty(`--${t}`);
		} catch {}
		for (let [t, n] of Object.entries(c)) e.style.setProperty(`--${t}`, String(n));
		e.__themes.cacheKey = s || null, e.__themes.keys = u;
	}
}, U = (e, t, n, r) => {
	r ||= {}, n ??= {};
	let i = new Event(t, {
		bubbles: r.bubbles === void 0 || r.bubbles,
		cancelable: !!r.cancelable,
		composed: r.composed === void 0 || r.composed
	});
	return i.detail = n, e.dispatchEvent(i), i;
}, W = (e) => e.substr(0, e.indexOf(".")), ai = (e) => (t, n) => e.includes(t, n), oi = "unavailable", si = ai([oi, "unknown"]), ci = (e) => {
	let t = e.attributes.entity_id || [], n = [...new Set(t.map((e) => W(e)))];
	return n.length === 1 ? n[0] : void 0;
};
//#endregion
//#region src/ha/resources/css-variables.ts
function li(e) {
	return Array.isArray(e) ? e.reverse().reduce((e, t) => `var(${t}${e ? `, ${e}` : ""})`, void 0) : `var(${e})`;
}
//#endregion
//#region src/ha/common/string/slugify.ts
var ui = (e, t = "_") => {
	let n = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·", r = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${t}`, i = new RegExp(n.split("").join("|"), "g"), a = {
		ж: "zh",
		х: "kh",
		ц: "ts",
		ч: "ch",
		ш: "sh",
		щ: "shch",
		ю: "iu",
		я: "ia"
	}, o;
	return e === "" ? o = "" : (o = e.toString().toLowerCase().replace(i, (e) => r.charAt(n.indexOf(e))).replace(/[а-я]/g, (e) => a[e] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, t).replace(RegExp(`(${t})\\1+`, "g"), "$1").replace(RegExp(`^${t}+`), "").replace(RegExp(`${t}+$`), ""), o === "" && (o = "unknown")), o;
}, di = (e) => {
	let t = Number(e);
	if (!isNaN(t)) return t >= 70 ? "--state-sensor-battery-high-color" : t >= 30 ? "--state-sensor-battery-medium-color" : "--state-sensor-battery-low-color";
};
//#endregion
//#region src/ha/common/entity/state_active.ts
function fi(e, t) {
	let n = W(e.entity_id), r = t === void 0 ? e?.state : t;
	if ([
		"button",
		"event",
		"input_button",
		"scene"
	].includes(n)) return r !== oi;
	if (si(r) || r === "off" && n !== "alert") return !1;
	switch (n) {
		case "alarm_control_panel": return r !== "disarmed";
		case "alert": return r !== "idle";
		case "cover": return r !== "closed";
		case "device_tracker":
		case "person": return r !== "not_home";
		case "lawn_mower": return ["mowing", "error"].includes(r);
		case "lock": return r !== "locked";
		case "media_player": return r !== "standby";
		case "vacuum": return ![
			"idle",
			"docked",
			"paused"
		].includes(r);
		case "valve": return r !== "closed";
		case "plant": return r === "problem";
		case "group": return [
			"on",
			"home",
			"open",
			"locked",
			"problem"
		].includes(r);
		case "timer": return r === "active";
		case "camera": return r === "streaming";
	}
	return !0;
}
//#endregion
//#region src/ha/common/entity/entity_color.ts
var pi = /* @__PURE__ */ new Set(/* @__PURE__ */ "alarm_control_panel.alert.automation.binary_sensor.calendar.camera.climate.cover.device_tracker.fan.group.humidifier.input_boolean.lawn_mower.light.lock.media_player.person.plant.remote.schedule.script.siren.sun.switch.timer.update.vacuum.valve.water_heater.weather".split(".")), mi = (e, t, n, r) => {
	let i = [], a = ui(n, "_"), o = r ? "active" : "inactive";
	return t && i.push(`--state-${e}-${t}-${a}-color`), i.push(`--state-${e}-${a}-color`, `--state-${e}-${o}-color`, `--state-${o}-color`), i;
}, hi = (e, t, n) => {
	let r = n === void 0 ? t.state : n, i = fi(t, n);
	return mi(e, t.attributes.device_class, r, i);
}, gi = (e, t) => {
	let n = t === void 0 ? e?.state : t, r = W(e.entity_id), i = e.attributes.device_class;
	if (r === "sensor" && i === "battery") {
		let e = di(n);
		if (e) return [e];
	}
	if (r === "group") {
		let n = ci(e);
		if (n && pi.has(n)) return hi(n, e, t);
	}
	if (pi.has(r)) return hi(r, e, t);
}, _i = (e, t) => {
	if ((t === void 0 ? e?.state : t) === "unavailable") return "var(--state-unavailable-color)";
	let n = gi(e, t);
	if (n) return li(n);
}, vi = (e) => {
	let t = W(e.entity_id), n = e.state;
	if (t === "light" && n === "on") {
		let t = e.attributes.rgb_color;
		if (t) return `rgb(${t.join(",")})`;
	}
	return _i(e);
}, yi = /* @__PURE__ */ function(e) {
	return e.language = "language", e.system = "system", e.comma_decimal = "comma_decimal", e.decimal_comma = "decimal_comma", e.space_comma = "space_comma", e.none = "none", e;
}({}), bi = (e, t = 2) => Math.round(e * 10 ** t) / 10 ** t, xi = (e) => Si(e.attributes), Si = (e) => !!e.unit_of_measurement || !!e.state_class, Ci = (e) => {
	switch (e.number_format) {
		case yi.comma_decimal: return ["en-US", "en"];
		case yi.decimal_comma: return [
			"de",
			"es",
			"it"
		];
		case yi.space_comma: return [
			"fr",
			"sv",
			"cs"
		];
		case yi.system: return;
		default: return e.language;
	}
}, wi = (e, t, n) => {
	let r = t ? Ci(t) : void 0;
	if (t?.number_format !== yi.none && !Number.isNaN(Number(e)) && Intl) try {
		return new Intl.NumberFormat(r, Ei(e, n)).format(Number(e));
	} catch (t) {
		return console.error(t), new Intl.NumberFormat(void 0, Ei(e, n)).format(Number(e));
	}
	return typeof e == "string" ? e : `${bi(e, n?.maximumFractionDigits).toString()}${n?.style === "currency" ? ` ${n.currency}` : ""}`;
}, Ti = (e, t) => {
	let n = t?.display_precision;
	if (n != null) return {
		maximumFractionDigits: n,
		minimumFractionDigits: n
	};
	if (Number.isInteger(Number(e.attributes?.step)) && Number.isInteger(Number(e.state))) return { maximumFractionDigits: 0 };
	if (e.attributes.step != null) return { maximumFractionDigits: Math.ceil(Math.log10(1 / e.attributes.step)) };
}, Ei = (e, t) => {
	let n = {
		maximumFractionDigits: 2,
		...t
	};
	if (typeof e != "string") return n;
	if (!t || t.minimumFractionDigits === void 0 && t.maximumFractionDigits === void 0) {
		let t = e.indexOf(".") > -1 ? e.split(".")[1].length : 0;
		n.minimumFractionDigits = t, n.maximumFractionDigits = t;
	}
	return n;
};
B((e) => new Intl.Collator(e));
var Di = B((e) => new Intl.Collator(e, { sensitivity: "accent" })), Oi = (e, t) => e < t ? -1 : +(e > t), ki = (e, t, n = void 0) => Intl?.Collator ? Di(n).compare(e, t) : Oi(e.toLowerCase(), t.toLowerCase()), Ai = (e) => {
	switch (e.language) {
		case "cs":
		case "de":
		case "fi":
		case "fr":
		case "sk":
		case "sv": return " ";
		default: return "";
	}
}, ji = (e, t) => e === "°" ? "" : t && e === "%" ? Ai(t) : " ", Mi, Ni = async (e) => Mi || (Mi = e.callWS({ type: "sensor/numeric_device_classes" }), Mi), Pi = (e, t) => {
	if (e === t) return !0;
	if (e && t && typeof e == "object" && typeof t == "object") {
		if (e.constructor !== t.constructor) return !1;
		let n, r;
		if (Array.isArray(e)) {
			if (r = e.length, r !== t.length) return !1;
			for (n = r; n-- !== 0;) if (!Pi(e[n], t[n])) return !1;
			return !0;
		}
		if (e instanceof Map && t instanceof Map) {
			if (e.size !== t.size) return !1;
			for (n of e.entries()) if (!t.has(n[0])) return !1;
			for (n of e.entries()) if (!Pi(n[1], t.get(n[0]))) return !1;
			return !0;
		}
		if (e instanceof Set && t instanceof Set) {
			if (e.size !== t.size) return !1;
			for (n of e.entries()) if (!t.has(n[0])) return !1;
			return !0;
		}
		if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
			if (r = e.length, r !== t.length) return !1;
			for (n = r; n-- !== 0;) if (e[n] !== t[n]) return !1;
			return !0;
		}
		if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
		if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
		if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
		let i = Object.keys(e);
		if (r = i.length, r !== Object.keys(t).length) return !1;
		for (n = r; n-- !== 0;) if (!Object.prototype.hasOwnProperty.call(t, i[n])) return !1;
		for (n = r; n-- !== 0;) {
			let r = i[n];
			if (!Pi(e[r], t[r])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}, Fi = class extends HTMLElement {
	constructor(...e) {
		super(...e), this.holdTime = 500, this.held = !1, this.cancelled = !1;
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
			document.addEventListener(e, () => {
				this.cancelled = !0, this.timer &&= (clearTimeout(this.timer), void 0);
			}, { passive: !0 });
		});
	}
	bind(e, t = {}) {
		e.actionHandler && Pi(t, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener("keydown", e.actionHandler.handleKeyDown)), e.actionHandler = { options: t }, !t.disabled && (e.actionHandler.start = () => {
			this.cancelled = !1, t.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
				this.held = !0;
			}, this.holdTime));
		}, e.actionHandler.end = (e) => {
			if (e.currentTarget !== e.target || e.type === "touchcancel" || e.type === "touchend" && this.cancelled) return;
			let n = e.target;
			e.cancelable && e.preventDefault(), t.hasHold && (clearTimeout(this.timer), this.timer = void 0), t.hasHold && this.held ? U(n, "action", { action: "hold" }) : t.hasDoubleClick ? e.type === "click" && e.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
				this.dblClickTimeout = void 0, U(n, "action", { action: "tap" });
			}, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, U(n, "action", { action: "double_tap" })) : U(n, "action", { action: "tap" });
		}, e.actionHandler.handleKeyDown = (e) => {
			["Enter", " "].includes(e.key) && e.currentTarget.actionHandler.end(e);
		}, e.addEventListener("touchstart", e.actionHandler.start, { passive: !0 }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, { passive: !0 }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
	}
};
customElements.define("action-handler-area-card", Fi);
var Ii = () => {
	let e = document.body;
	if (e.querySelector("action-handler-area-card")) return e.querySelector("action-handler-area-card");
	let t = document.createElement("action-handler-area-card");
	return e.appendChild(t), t;
}, Li = (e, t) => {
	let n = Ii();
	n && n.bind(e, t);
}, Ri = ze(class extends Be {
	update(e, [t]) {
		return Li(e.element, t), D;
	}
	render(e) {}
}), zi = async (e, t, n, r) => {
	U(e, "hass-action", {
		config: n,
		action: r
	});
};
//#endregion
//#region src/ha/panels/lovelace/common/has-action.ts
function Bi(e) {
	return e !== void 0 && e.action !== "none";
}
//#endregion
//#region src/card-actions.ts
var Vi = {
	media_player: ["media_pause", "media_play"],
	lock: ["lock", "unlock"],
	vacuum: ["stop", "start"]
}, Hi = (e, t, n, r) => {
	let i = r ? `${t}|${n}|${r}` : `${t}|${n}`;
	return e._actionHandlerCache.has(i) || e._actionHandlerCache.set(i, qi(e, t, n, r)), e._actionHandlerCache.get(i);
}, Ui = (e, t) => Hi(e, "domain", t), Wi = (e, t, n) => Hi(e, "alert", t, n), Gi = (e, t, n) => Hi(e, "cover", t, n), Ki = (e, t, n) => Hi(e, "sensor", t, n), qi = (e, t, n, r, i) => (a) => {
	a.stopPropagation();
	let o;
	t === "domain" ? o = e._customizationDomainMap.get(n) : t === "alert" ? o = e._customizationAlertMap.get(r || "") : t === "cover" ? o = e._customizationCoverMap.get(r || "") : t === "sensor" ? o = e._customizationSensorMap.get(r || "") : t === "custom_button" && (o = i);
	let s = a.detail.action === "tap" ? o?.tap_action : a.detail.action === "hold" ? o?.hold_action : a.detail.action === "double_tap" ? o?.double_tap_action : null;
	if (t === "domain") {
		let t = s === "toggle" || s?.action === "toggle", r = s === "more-info" || s?.action === "more-info";
		if (t) {
			let [t, r] = Vi[n] ?? ["turn_off", "turn_on"];
			e.hass.callService(n, e._isOn(n) ? t : r, void 0, { area_id: e._config.area });
			return;
		}
		if (r || s === void 0) {
			if (n !== "binary_sensor" && n !== "sensor") {
				if (n === "climate") {
					let t = o?.display_mode;
					(t === "icon" || t === "text_icon") && e._showPopupForDomain(n);
				} else e._showPopupForDomain(n);
			}
			return;
		}
		let i = {
			tap_action: o?.tap_action,
			hold_action: o?.hold_action,
			double_tap_action: o?.double_tap_action
		};
		zi(e, e.hass, i, a.detail.action);
		return;
	}
	let c = s === "more-info" || s?.action === "more-info";
	if (t === "alert") {
		if (c || s === void 0) {
			n === "binary_sensor" && e._showPopupForDomain(n, r);
			return;
		}
	} else if (t === "cover") {
		if (c || s === void 0) {
			n === "cover" && e._showPopupForDomain(n, r);
			return;
		}
	} else if (t === "sensor") {
		if (c) {
			n === "sensor" && e._showPopupForDomain(n, r);
			return;
		}
		if (a.detail.action === "tap" && !o?.tap_action) return;
	}
	let l = {
		entity: o?.entity,
		tap_action: o?.tap_action,
		hold_action: o?.hold_action,
		double_tap_action: o?.double_tap_action
	};
	if (t === "custom_button" && i?.entity && c) {
		let t = i.entity, n = new CustomEvent("hass-more-info", {
			bubbles: !0,
			composed: !0,
			detail: { entityId: t }
		});
		e.dispatchEvent(n);
	} else zi(e, e.hass, l, a.detail.action);
}, G = (e, t) => Ri({
	hasHold: Bi(e?.hold_action || t?.hold_action),
	hasDoubleClick: Bi(e?.double_tap_action || t?.double_tap_action)
}), Ji = {
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
function K(e, t) {
	let n = Ji[e];
	return n ? n[t] ? n[t] : n.en ? n.en : e : e;
}
//#endregion
//#region src/translations.ts
function Yi(e, t, n) {
	return e.localize(`component.${n}.entity_component._.state.${t}`) || t;
}
function Xi(e, t) {
	if (Object.prototype.hasOwnProperty.call(Ji, t.name)) return K(t.name, e.locale.language);
	switch (t.name) {
		case "theme": return `${e.localize("ui.panel.lovelace.editor.card.generic.theme")} (${e.localize("ui.panel.lovelace.editor.card.config.optional")})`;
		case "v2_color": return e.localize("ui.panel.lovelace.editor.card.tile.color");
		case "css": return "CSS";
		case "domain_css": return "Domain CSS";
		case "cover_css": return "Cover CSS";
		case "alert_css": return "Alert CSS";
		case "icon_css": return "Icon CSS";
		case "name_css": return "Name CSS";
		case "columns": return e.localize("ui.components.grid-size-picker.columns");
		case "appearance": return e.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance";
		case "toggle_domains": return e.localize("ui.panel.lovelace.editor.cardpicker.domain");
		case "popup": return "Popup";
		case "cover_classes": return e.localize("component.cover.entity_component._.name");
		case "alert_color": return `${e.localize("ui.panel.lovelace.editor.card.area.alert_classes") || "Alert"} ${K("color", e.locale.language)}`;
		case "sensor_color": return `${e.localize("ui.panel.lovelace.editor.card.area.sensor_classes") || "Sensor"} ${K("color", e.locale.language)}`;
		case "domain_color": return `${e.localize("ui.panel.lovelace.editor.cardpicker.domain") || "Domain"} ${K("color", e.locale.language)}`;
		case "cover_color": return `${e.localize("component.cover.entity_component._.name") || "Cover"} ${K("color", e.locale.language)}`;
		case "label": return e.localize("ui.components.label-picker.label");
		case "show_sensor_icons": return e.localize("ui.panel.lovelace.editor.card.generic.show_icon");
		case "name": return e.localize("ui.common.name");
		case "state": return e.localize("ui.components.entity.entity-state-picker.state");
		case "show_icon":
		case "tap_action":
		case "hold_action":
		case "double_tap_action":
		case "camera_view": return e.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`);
		case "camera_entity": return e.localize("ui.panel.lovelace.editor.card.area.display_type_options.camera");
		case "camera_entity_left": return e.localize("ui.panel.lovelace.editor.card.area.display_type_options.camera") + ` (${K("position_left", e.locale.language)})`;
		case "camera_entity_right": return e.localize("ui.panel.lovelace.editor.card.area.display_type_options.camera") + ` (${K("position_right", e.locale.language)})`;
		default: return e.localize(`ui.panel.lovelace.editor.card.area.${t.name}`);
	}
}
//#endregion
//#region src/helpers.ts
var Zi = (e, t) => e?.[t]?.attributes?.friendly_name || t, Qi = (e, t) => (n, r) => ki(Zi(e, n), Zi(e, r), t), q = B((e, t) => {
	let n = /* @__PURE__ */ new Map(), r = (e, t) => {
		n.has(e) || n.set(e, /* @__PURE__ */ new Set()), n.get(e).add(t);
	};
	for (let n of Object.values(e)) if (n.area_id) r(n.area_id, n.entity_id);
	else if (n.device_id) {
		let e = t[n.device_id];
		e && e.area_id && r(e.area_id, n.entity_id);
	}
	return n;
}), J = B((e, t, n, r, i, a) => {
	let o = [];
	return o = a && a.has(e) ? Array.from(a.get(e)) : Object.values(n).filter((n) => {
		if (!n.area_id && !n.device_id) return !1;
		if (n.area_id) {
			if (n.area_id !== e) return !1;
		} else if (!t.has(n.device_id)) return !1;
		return !0;
	}).map((e) => e.entity_id), o.filter((e) => {
		let t = n[e];
		return !t || t.hidden || r.has(e) ? !1 : Array.isArray(i) && i.length > 0 ? t.labels && t.labels.some((e) => i.includes(e)) : !0;
	});
}), Y = B((e, t) => new Set(e && t ? Object.values(t).reduce((t, n) => (n.area_id === e && t.push(n.id), t), []) : [])), $i = B((e, t) => (Array.isArray(t) ? t : t ? Object.values(t) : []).find((t) => t.area_id === e) || null), ea = (e, t, n) => {
	if (!n) return !0;
	let r = t?.[e];
	if (!r) return !0;
	let i = typeof r.entity_category == "string" ? r.entity_category : null;
	if (!i) return !0;
	switch (n) {
		case "config": return i !== "config";
		case "diagnostic": return i !== "diagnostic";
		case "config+diagnostic": return i !== "config" && i !== "diagnostic";
		default: return !0;
	}
}, ta = (e, t, n, r) => {
	if (!t || t.length === 0) return;
	let i, a = t.filter((e) => !xi(e) || isNaN(Number(e.state)) ? !1 : i ? e.attributes.unit_of_measurement === i : (i = e.attributes.unit_of_measurement, !0));
	if (!a.length) return;
	let o = a.reduce((e, t) => e + Number(t.state), 0), s;
	if (r) for (let e of a) {
		let t = r[e.entity_id], n = Ti(e, t);
		n?.maximumFractionDigits != null && (s == null || n.maximumFractionDigits > s) && (s = n.maximumFractionDigits);
	}
	s ??= 1;
	let c = { maximumFractionDigits: s };
	return e === "power" ? `${wi(o, n, c)}${i ? ji(i, n) : ""}${i || ""}` : `${wi(o / a.length, n, c)}${i ? ji(i, n) : ""}${i || ""}`;
}, na = (e, t, n) => {
	if (e in Yr) {
		let r = Yr[e];
		if (n && typeof r == "object") {
			let e = r[n];
			if (e) {
				if (typeof e == "string") return e;
				if (typeof e == "object" && "on" in e && "off" in e) return t ? e.on : e.off;
			}
		}
		if (typeof r == "object" && "on" in r && "off" in r) return t ? r.on : r.off;
		if (typeof r == "string") return r;
	}
	return "";
}, ra = (e) => {
	let t = /* @__PURE__ */ new Map();
	for (let n of e || []) {
		let e = { ...n.styles || {} };
		n.css && (e.card = n.css), n.icon_css && (e.icon = n.icon_css), t.set(n.type, {
			...n,
			styles: e
		});
	}
	return t;
};
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/decorate.js
function X(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/popup-dialog.ts
var ia = /* @__PURE__ */ new Set(), aa = [...H, ...V], Z = class extends j {
	constructor(...e) {
		super(...e), this._onPopState = () => {
			this.open && !window.history.state?.areaCardPlusPopup && (this.open = !1);
		}, this.open = !1, this.content = "", this.entities = [], this._opener = null, this._cardEls = /* @__PURE__ */ new Map(), this._handleMoreInfo = (e) => {
			if (this._opener) {
				e.stopPropagation();
				let t = new CustomEvent("hass-more-info", {
					bubbles: !0,
					composed: !0,
					detail: e.detail
				});
				this._opener.dispatchEvent(t);
			}
		}, this._close = () => {
			this.open && (this.open = !1, window.history.state?.areaCardPlusPopup && window.history.back());
		}, this._onDialogClosed = (e) => {
			let t = e.target;
			t && t.tagName !== "HA-ADAPTIVE-DIALOG" || (this.open = !1, this._cardEls.clear(), this.dispatchEvent(new CustomEvent("dialog-closed", {
				bubbles: !0,
				composed: !0,
				detail: { dialog: this }
			})));
		}, this.DOMAIN_FEATURES = {
			alarm_control_panel: {
				state_content: ["state", "last_changed"],
				features: [{
					type: "alarm-modes",
					modes: [
						"armed_home",
						"armed_away",
						"armed_night",
						"armed_vacation",
						"armed_custom_bypass",
						"disarmed"
					]
				}]
			},
			light: {
				state_content: [
					"state",
					"brightness",
					"last_changed"
				],
				features: [{ type: "light-brightness" }]
			},
			cover: {
				state_content: [
					"state",
					"position",
					"last_changed"
				],
				features: [{ type: "cover-open-close" }, { type: "cover-position" }]
			},
			vacuum: {
				state_content: ["state", "last_changed"],
				features: [{
					type: "vacuum-commands",
					commands: [
						"start_pause",
						"stop",
						"clean_spot",
						"locate",
						"return_home"
					]
				}]
			},
			climate: {
				state_content: [
					"state",
					"current_temperature",
					"last_changed"
				],
				features: [{
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
				}]
			},
			water_heater: {
				state_content: ["state", "last_changed"],
				features: [{
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
				}]
			},
			humidifier: {
				state_content: [
					"state",
					"current_humidity",
					"last_changed"
				],
				features: [{ type: "target-humidity" }]
			},
			media_player: {
				show_entity_picture: !0,
				state_content: [
					"state",
					"volume_level",
					"last_changed"
				],
				features: [{ type: "media-player-playback" }]
			},
			lock: {
				state_content: ["state", "last_changed"],
				features: [{ type: "lock-commands" }]
			},
			fan: {
				state_content: [
					"state",
					"percentage",
					"last_changed"
				],
				features: [{ type: "fan-speed" }]
			},
			counter: {
				state_content: ["state", "last_changed"],
				features: [{
					type: "counter-actions",
					actions: [
						"increment",
						"decrement",
						"reset"
					]
				}]
			},
			lawn_mower: {
				state_content: ["state", "last_changed"],
				features: [{
					type: "lawn-mower-commands",
					commands: ["start_pause", "dock"]
				}]
			},
			update: {
				state_content: [
					"state",
					"latest_version",
					"last_changed"
				],
				features: [{
					type: "update-actions",
					backup: "ask"
				}]
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
			calendar: { state_content: "message" },
			timer: { state_content: ["state", "remaining_time"] },
			binary_sensor: { state_content: ["state", "last_changed"] },
			device_tracker: { state_content: ["state", "last_changed"] },
			remote: { state_content: ["state", "last_changed"] },
			valve: {
				state_content: ["state", "last_changed"],
				features: [{ type: "valve-open-close" }]
			}
		}, this._getCandidateEntityIds = B((e, t, n, r, i, a, o) => {
			let s = J(n, r, e, new Set(t?.hidden_entities || []), t?.label, o), c = t?.category_filter, l = (t) => ea(t, e, c);
			return s.filter((e) => {
				if (!l(e)) return !1;
				let t = W(e);
				return !(i.length > 0 && !i.includes(t) || a && t !== a);
			});
		});
	}
	connectedCallback() {
		super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState), this._cardEls.clear();
	}
	async showDialog(e) {
		this.title = e.title ?? this.title, this.hass = e.hass, this._opener = e.opener, this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.card = e.card, this._cardEls.clear(), this.open = !0, window.history.pushState({ areaCardPlusPopup: !0 }, ""), this.requestUpdate();
		try {
			await this.updateComplete;
		} catch {}
		let t = this.renderRoot.querySelector("ha-adaptive-dialog");
		if (t && t.shadowRoot) {
			let e = t.shadowRoot.querySelector("ha-bottom-sheet");
			e && (e.style.removeProperty("--dialog-transform"), e.style.removeProperty("--dialog-transition"));
		}
	}
	_toTileConfig(e) {
		return {
			type: "tile",
			entity: e.entity
		};
	}
	async _createCardElement(e, t, n = !1) {
		try {
			let n = await window?.loadCardHelpers?.();
			if (n?.createCardElement) {
				let r = n.createCardElement(t);
				return r.hass = e, r.setAttribute?.("data-hui-card", ""), r;
			}
		} catch {}
		try {
			let n = t.type || "tile", r = typeof n == "string" && n.startsWith("custom:"), i = r ? n.slice(7) : `hui-${n}-card`;
			r && !customElements.get(i) && await customElements.whenDefined(i).catch(() => {});
			let a = document.createElement(i);
			return typeof a.setConfig == "function" && a.setConfig(t), a.hass = e, a.setAttribute?.("data-hui-card", ""), a;
		} catch {
			if (!n) return this._createCardElement(e, this._toTileConfig(t), !0);
			let r = document.createElement("div");
			return r.setAttribute("data-hui-card", ""), r;
		}
	}
	_getPopupCardConfig(e) {
		let t = this.card, n = W(e.entity_id), r = this.selectedDomain || n, i = this.selectedDomain ? this.selectedDeviceClass : this.hass?.states?.[e.entity_id]?.attributes?.device_class, a = t?._config || {}, o;
		Ur.includes(r) ? (o = a.customization_alert?.find((e) => e.type === i), o ||= a.customization_domain?.find((e) => e.type === r)) : Hr.includes(r) ? (o = a.customization_sensor?.find((e) => e.type === i), o ||= a.customization_domain?.find((e) => e.type === r)) : Wr.includes(r) ? (o = a.customization_cover?.find((e) => e.type === i), o ||= a.customization_domain?.find((e) => e.type === r)) : o = a.customization_domain?.find((e) => e.type === r);
		let s = o?.popup_card, c = s && typeof s.type == "string" && s.type || o?.popup_card_type || "tile", l = c === "tile" ? this.DOMAIN_FEATURES[n] ?? {} : {}, u = {};
		if (s && typeof s == "object") {
			let { type: e, entity: t, ...n } = s;
			u = n;
		} else u = o?.popup_card_options ?? {};
		return {
			type: c,
			entity: e.entity_id,
			...l,
			...u
		};
	}
	_getAreaEntitiesContext() {
		let e = this.card, t = e._config?.area, n = e.hass?.devices || {}, r = this.hass && this.hass.devices && this.hass.entities ? q(this.hass.entities, this.hass.devices) : void 0;
		return {
			areaId: t,
			devicesArr: n,
			entitiesIndex: r,
			devicesInArea: r ? ia : Y(t, n)
		};
	}
	shouldUpdate(e) {
		if (e.has("open") || e.has("card")) return !0;
		if (!this.open) return !1;
		if (e.has("selectedDomain") || e.has("selectedDeviceClass") || e.has("entities") || e.has("content")) return !0;
		if (!e.has("hass")) return !1;
		let t = e.get("hass");
		if (!t || t.themes !== this.hass.themes || t.locale !== this.hass.locale) return !0;
		let n = this.card;
		if (!n) return !1;
		let { areaId: r, devicesInArea: i, entitiesIndex: a } = this._getAreaEntitiesContext(), o = this._getCandidateEntityIds(this.hass.entities, n._config, r, i, n._config?.popup_domains || [], this.selectedDomain || null, a), s = n._config?.extra_entities || [];
		for (let e of o) if (!t.states[e] || t.states[e] !== this.hass.states[e]) return !0;
		for (let e of s) if (!t.states[e] || t.states[e] !== this.hass.states[e]) return !0;
		return !1;
	}
	_getOrCreateCard(e) {
		let t = e.entity_id, n = this._cardEls.get(t);
		if (n) {
			try {
				n.hass = this.hass;
			} catch {}
			return n;
		}
		let r = document.createElement("div");
		r.classList.add("card-placeholder"), r.setAttribute("data-hui-card", ""), this._cardEls.set(t, r);
		let i = this._getPopupCardConfig(e);
		return this._createCardElement(this.hass, i).then((e) => {
			try {
				this._cardEls.get(t) === r && (r.replaceWith(e), this._cardEls.set(t, e)), e.hass = this.hass;
			} catch {}
		}), r;
	}
	_isActive(e) {
		return !aa.includes(e.state);
	}
	sortEntitiesForPopup(e) {
		let t = this.card?._config?.popup_sort || "name", n = e.slice();
		if (t === "state") {
			let e = Qi(this.hass.states, this.hass.locale.language);
			return n.sort((t, n) => {
				let r = +!this._isActive(t), i = +!this._isActive(n);
				if (r !== i) return r - i;
				let a = W(t.entity_id), o = W(n.entity_id), s = this.hass ? Yi(this.hass, t.state, a) : t.state, c = this.hass ? Yi(this.hass, n.state, o) : n.state, l = (s || "").localeCompare(c || "");
				return l === 0 ? e(t.entity_id, n.entity_id) : l;
			});
		}
		let r = Qi(this.hass.states, this.hass.locale.language);
		return n.sort((e, t) => r(e.entity_id, t.entity_id));
	}
	render() {
		if (!this.hass || !this.card) return E``;
		let e = this.card, { areaId: t, devicesInArea: n, entitiesIndex: r } = this._getAreaEntitiesContext(), i = this.hass.states, a = e._config?.popup_domains || [], o = e._config?.extra_entities || [], s = e._config?.hide_unavailable, c = e._config?.category_filter, l = this.selectedDomain || null, u = this.selectedDeviceClass || null, d = (e) => ea(e, this.hass.entities, c), f = [];
		f = this.entities && this.entities.length > 0 ? this.entities.reduce((e, t) => {
			let n = t.entity_id;
			if (!d(n)) return e;
			let r = W(n);
			return a.length > 0 && !a.includes(r) || l && r !== l || e.push(n), e;
		}, []) : this._getCandidateEntityIds(this.hass.entities, e._config, t, n, a, l, r);
		let p = [];
		for (let e of f) {
			let t = i[e];
			t && (s && H.includes(t.state) || u && t.attributes.device_class !== u || p.push(t));
		}
		for (let e of o) {
			let t = W(e), n = i[e];
			n && (a.length > 0 && !a.includes(t) || l && t !== l || u && n.attributes.device_class !== u || d(e) && !p.some((t) => t.entity_id === e) && p.push(n));
		}
		let m = e?._config?.ungroup_areas === !0, h = e._config?.columns ? e._config.columns : 4, g = [], _ = [];
		if (m) _ = this.sortEntitiesForPopup(p), h = Math.min(h, Math.max(1, _.length));
		else {
			let e = {};
			for (let t of p) {
				let n = W(t.entity_id);
				n in e || (e[n] = []), e[n].push(t);
			}
			let t = Object.keys(Yr || {}), n = a.length > 0 ? a : t;
			g = Object.entries(e).filter(([e]) => !l || e === l).sort(([e], [t]) => {
				let r = n.indexOf(e), i = n.indexOf(t);
				return (r === -1 ? n.length : r) - (i === -1 ? n.length : i);
			}).map(([e, t]) => [e, this.sortEntitiesForPopup(t)]);
			let r = g.length ? Math.max(...g.map(([, e]) => e.length)) : 0;
			h = Math.min(h, Math.max(1, r));
		}
		return this.style.setProperty("--columns", String(h)), g.length > 0 || _.length > 0 ? E`
      <ha-adaptive-dialog
        .hass=${this.hass}
        .open=${this.open}
        @closed=${this._onDialogClosed}
        flexcontent
      >
        <ha-icon-button
          slot="headerNavigationIcon"
          .path=${Ut}
          @click=${this._close}
          .label=${this.hass.localize("ui.common.close")}
        ></ha-icon-button>
        <span slot="headerTitle">${this.title}</span>
        <div class="dialog-content scrollable ha-scrollbar" @hass-more-info=${this._handleMoreInfo}>
          ${m ? E`
                  <div class="cards-wrapper">
                    <div class="entity-cards">
                      ${_.map((e) => E`
                          <div class="entity-card">
                            ${this._getOrCreateCard(e)}
                          </div>
                        `)}
                    </div>
                  </div>
                ` : E`${z(g, ([e]) => e, ([e, t]) => E`
                    <div class="cards-wrapper">
                      <h4>
                        ${this._getDomainName(e, u || void 0)}
                      </h4>
                      <div class="entity-cards">
                        ${z(t, (e) => e.entity_id, (e) => E`
                            <div class="entity-card">
                              ${this._getOrCreateCard(e)}
                            </div>
                          `)}
                      </div>
                    </div>
                  `)}`}
        </div>
      </ha-adaptive-dialog>
    ` : E`
        <ha-adaptive-dialog
          .hass=${this.hass}
          .open=${this.open}
          @closed=${this._onDialogClosed}
        >
          <ha-icon-button
            slot="headerNavigationIcon"
            .path=${Ut}
            @click=${this._close}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <span slot="headerTitle">${this.title}</span>
          <div class="content dialog-content" style="padding: 16px;">
            ${this.content || this.hass.localize("ui.panel.lovelace.cards.entity.no_entities") || "No entities"}
          </div>
        </ha-adaptive-dialog>
      `;
	}
	_getDomainName(e, t) {
		return this.hass ? e === "scene" ? "Scene" : t && (e === "binary_sensor" || e === "sensor" || e === "cover") ? this.hass.localize(`component.${e}.entity_component.${t}.name`) : this.hass.localize(`component.${e}.entity_component._.name`) : e;
	}
	static {
		this.styles = s`
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
        padding: 0 1em;
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
        padding: 0 1em;
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
        padding: 0 0.3em;
      }
    }
  `;
	}
};
X([N({ type: Boolean })], Z.prototype, "open", void 0), X([N({ type: String })], Z.prototype, "selectedDomain", void 0), X([N({ type: String })], Z.prototype, "selectedDeviceClass", void 0), X([N({ type: String })], Z.prototype, "content", void 0), X([N({ type: Array })], Z.prototype, "entities", void 0), X([N({ attribute: !1 })], Z.prototype, "hass", void 0), X([N({ attribute: !1 })], Z.prototype, "card", void 0), customElements.define("area-card-plus-popup", Z);
//#endregion
//#region src/card.ts
var oa = /* @__PURE__ */ new Set(), sa = /* @__PURE__ */ new Set([
	...qr,
	...Hr,
	...Ur,
	...Wr,
	...Kr,
	...Gr
]), ca = class extends j {
	constructor(...e) {
		super(...e), this._selectedDeviceClass = null, this._currentCameraIndex = 0, this._iconCache = /* @__PURE__ */ new Map(), this._styleCache = /* @__PURE__ */ new Map(), this._deviceClasses = Jr, this._customizationDomainMap = /* @__PURE__ */ new Map(), this._customizationCoverMap = /* @__PURE__ */ new Map(), this._customizationAlertMap = /* @__PURE__ */ new Map(), this._customizationSensorMap = /* @__PURE__ */ new Map(), this._actionHandlerCache = /* @__PURE__ */ new Map(), this._hiddenEntitiesSet = /* @__PURE__ */ new Set(), this._excludedEntitiesSet = /* @__PURE__ */ new Set(), this._getOrganizedEntities = B((e, t) => {
			let n = /* @__PURE__ */ new Map(), r = {};
			for (let i of e) {
				let e = t[i];
				if (!e) continue;
				let a = W(i);
				if (!sa.has(a)) continue;
				r[a] || (r[a] = []), r[a].push(e), n.has(a) || n.set(a, /* @__PURE__ */ new Map());
				let o = n.get(a), s = e.attributes.device_class || "default";
				o.has(s) || o.set(s, []), o.get(s).push(e);
			}
			return {
				grouped: n,
				byDomain: r
			};
		});
	}
	static getConfigElement() {
		return document.createElement("area-card-plus-editor");
	}
	static async getStubConfig(e) {
		return {
			type: "custom:area-card-plus",
			area: Object.values(e.areas)[0]?.area_id || ""
		};
	}
	get _designClasses() {
		return {
			v2: this._config?.design === "V2",
			row: this._config?.layout === "horizontal"
		};
	}
	connectedCallback() {
		super.connectedCallback(), this._startCameraInterval();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._stopCameraInterval();
	}
	_startCameraInterval() {
		if (this._stopCameraInterval(), this._config?.camera_mode === "auto") {
			let e = this._config?.camera_auto_interval || 10;
			this._cameraInterval = window.setInterval(() => {
				this._currentCameraIndex++, this.requestUpdate();
			}, e * 1e3);
		}
	}
	_stopCameraInterval() {
		this._cameraInterval &&= (clearInterval(this._cameraInterval), void 0);
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
	setConfig(e) {
		if (!e.area) throw Error("Area Required");
		this._config = e, this._deviceClasses = { ...Jr }, e.sensor_classes && (this._deviceClasses.sensor = e.sensor_classes), e.alert_classes && (this._deviceClasses.binary_sensor = e.alert_classes), e.cover_classes && (this._deviceClasses.cover = e.cover_classes), this._iconCache.clear(), this._styleCache.clear(), this._customizationDomainMap = ra(e.customization_domain), this._customizationCoverMap = ra(e.customization_cover), this._customizationAlertMap = ra(e.customization_alert), this._customizationSensorMap = ra(e.customization_sensor), this._hiddenEntitiesSet = new Set(this._config?.hidden_entities || []), this._excludedEntitiesSet = new Set(this._config?.excluded_entities || []), this._actionHandlerCache.clear();
	}
	updated(e) {
		if (super.updated(e), e.has("_config") && this._startCameraInterval(), !this._config || !this.hass) return;
		let t = e.get("hass"), n = e.get("_config");
		(e.has("hass") && (!t || t.themes !== this.hass.themes) || e.has("_config") && (!n || n.theme !== this._config.theme)) && ii(this, this.hass.themes, this._config.theme);
	}
	shouldUpdate(e) {
		if (e.has("_config") || !this._config || e.has("_currentCameraIndex")) return !0;
		if (!e.has("hass")) return !1;
		let t = e.get("hass");
		if (!t || t.themes !== this.hass.themes || t.locale !== this.hass.locale) return !0;
		if (!this.hass?.devices || !this.hass?.entities) return !1;
		let n = this.hass.entities && this.hass.devices ? q(this.hass.entities, this.hass.devices) : void 0, r = J(this._config.area, n ? oa : Y(this._config.area, this.hass.devices), this.hass.entities, this._hiddenEntitiesSet, this._config.label, n);
		if (this._lastEntityIds !== r) return this._lastEntityIds = r, !0;
		for (let e of r) if (!t.states[e] || t.states[e] !== this.hass.states[e]) return !0;
		return !1;
	}
	_isOn(e) {
		let t = this._config?.area;
		return J(t, Y(t, this.hass?.devices), this.hass.entities, this._excludedEntitiesSet, this._config?.label, q(this.hass.entities, this.hass.devices)).filter((t) => W(t) === e).map((e) => this.hass.states[e]).find((e) => e !== void 0 && !H.includes(e.state) && !V.includes(e.state));
	}
	_getParsedCss(e) {
		return ti(e, this._styleCache);
	}
	_getClimateStyle(e) {
		let t = this._config?.styles?.thermostat, n = typeof t == "string" ? this._getParsedCss(t) : {}, r = typeof t == "object" && t && t[e] ? this._getParsedCss(t[e]) : {};
		return {
			...n,
			...r
		};
	}
	_getClimateColor(e, t) {
		return this._getClimateStyle(e).color || t;
	}
	_handleAction(e) {
		let t = e.detail.action === "tap" ? this._config?.tap_action : e.detail.action === "hold" ? this._config?.hold_action : e.detail.action === "double_tap" ? this._config?.double_tap_action : null;
		if (t === "more-info" || t?.action === "more-info" || t === void 0) {
			this._openPopup();
			return;
		}
		let n = {
			tap_action: this._config?.tap_action,
			hold_action: this._config?.hold_action,
			double_tap_action: this._config?.double_tap_action
		};
		zi(this, this.hass, n, e.detail.action);
	}
	_cachedIcon(e, t, n) {
		let r = `${e}|${n || ""}|${t ? "1" : "0"}`;
		if (this._iconCache.has(r)) return this._iconCache.get(r);
		let i = na(e, t, n);
		return this._iconCache.set(r, i), i;
	}
	_renderIcon(e, t, n, r) {
		return e && !e.startsWith("mdi:") ? e.startsWith("M") ? E`<ha-svg-icon
                  class=${n || O}
                  style=${t}
                  .path=${e}
                ></ha-svg-icon>` : E`<ha-icon
                class=${n || O}
                style=${t}
                .icon=${e}
              ></ha-icon>` : E`<ha-state-icon
              class=${n || O}
              style=${t}
              .domain=${r || O}
              .icon=${e}
            ></ha-state-icon>`;
	}
	_renderEntityGroup(e, t, n, r) {
		let i = e === "cover", a = i ? "open" : "on", o = i ? this._config?.cover_color : this._config?.alert_color, s = i ? this._config?.cover_css : this._config?.alert_css, c = i ? "cover" : "alert", l = i ? (e, t) => Gi(this, e, t) : (e, t) => Wi(this, e, t);
		return E`
      <div class="${F({
			[e + "s"]: !0,
			...this._designClasses
		})}">
        ${z(t, (e) => e.domain + "-" + e.deviceClass, ({ domain: t, deviceClass: i }) => {
			let u = r.get(i), d = u?.invert === !0, f = (n.get(t)?.get(i) || []).filter((e) => {
				let t = e.state === a;
				return (d ? V.includes(e.state) : t) && !this._excludedEntitiesSet.has(e.entity_id) && ea(e.entity_id, this.hass.entities, this._config?.category_filter);
			}), p = u?.color || o, m = u?.icon, h = f.length;
			return h > 0 ? E`
                  <div
                    class="icon-with-count hover"
                    style=${R(this._getParsedCss(u?.styles?.button || u?.styles?.card || s || this._config?.styles?.[c]))}
                    @action=${l(t, i)}
                    .actionHandler=${G(u)}
                  >
                    ${this._renderIcon(m || this._cachedIcon(t, !d, i), R({
				...p ? { color: `var(--${p}-color)` } : {},
				...this._getParsedCss(u?.styles?.icon)
			}), e)}
                    <span class="active-count text-small ${h > 0 ? "on" : "off"}">${h}</span>
                  </div>
                ` : O;
		})}
      </div>
    `;
	}
	_renderSingleCustomButton(e, t) {
		if (e.conditional) {
			let n = e.entity ? W(e.entity) : null;
			if (n && n in t) {
				let r = t[n].find((t) => t.entity_id === e.entity);
				if (!r || H.includes(r.state) || V.includes(r.state)) return O;
			}
		}
		if (e.state_mode && e.entity && e.state_value) {
			let t = this.hass.states[e.entity];
			if (!t) return O;
			let n = t.state === e.state_value;
			if (e.state_mode === "equal" && !n || e.state_mode === "not_equal" && n) return O;
		}
		let n;
		e.entity && (n = this.hass.states[e.entity]);
		let r;
		e.activate_state_color && n && (!e.color || e.color === "state") && (r = vi(n));
		let i = r ? { color: r } : e.color ? { color: `var(--${e.color}-color, ${e.color})` } : {}, a = e.icon;
		!a && n && (a = n.attributes.icon, a ||= na(W(n.entity_id), !H.includes(n.state) && !V.includes(n.state), n.attributes.device_class));
		let o = !!e.name;
		return E`
      <div
        class="icon-with-count hover"
        style=${R(this._getParsedCss(e.styles?.button || e.styles?.card || e.css))}
        @action=${qi(this, "custom_button", "", void 0, e)}
        .actionHandler=${G(e)}
      >
        ${e.use_entity_picture && n?.attributes?.entity_picture ? E`<img
                    class="entity-picture"
                    src=${n.attributes.entity_picture}
                    style=${R({ ...this._getParsedCss(e.styles?.icon || e.icon_css) })}
                  />` : a ? this._renderIcon(a, R({
			...i,
			...this._getParsedCss(e.styles?.icon || e.icon_css)
		})) : O}
        ${o ? E`<span class="custom-button-label" style=${R({
			...i,
			...this._getParsedCss(e.styles?.name)
		})}
                    >${e.name}</span
                  >` : O}
      </div>
    `;
	}
	renderCustomButtons(e) {
		if (!this._config?.custom_buttons || this._config.custom_buttons.length === 0) return O;
		let t = this._config.custom_buttons.filter((e) => !e.position || e.position === "default");
		return t.length === 0 ? O : E`
      <div
        class="${F({
			custom_buttons: !0,
			...this._designClasses
		})}"
      >
        ${t.map((t) => this._renderSingleCustomButton(t, e))}
      </div>
    `;
	}
	renderPositionedCustomButtons(e) {
		if (!this._config?.custom_buttons || this._config.custom_buttons.length === 0) return O;
		let t = this._config.custom_buttons.filter((e) => e.position && e.position !== "default");
		if (t.length === 0) return O;
		let n = (e) => e && !/[^0-9]/.test(e) ? `${e}px` : e, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
		for (let e of t) if (e.position_group) {
			let t = e.position_group;
			r.has(t) || r.set(t, []), r.get(t).push(e);
		} else {
			let t = e.position || "custom";
			i.has(t) || i.set(t, []), i.get(t).push(e);
		}
		return E`
      ${[...Array.from(i.entries()).map(([e, t]) => ({
			position: e,
			buttons: t,
			direction: t[0]?.position_direction
		})), ...Array.from(r.entries()).map(([, e]) => ({
			position: e[0]?.position || "custom",
			buttons: e,
			direction: e[0]?.position_direction
		}))].map(({ position: t, buttons: r, direction: i }) => {
			let a = t === "custom" ? (() => {
				let e = r[0];
				return {
					...e.position_top ? { top: n(e.position_top) } : {},
					...e.position_right ? { right: n(e.position_right) } : {},
					...e.position_bottom ? { bottom: n(e.position_bottom) } : {},
					...e.position_left ? { left: n(e.position_left) } : {}
				};
			})() : {}, o = i === "column" ? "column" : "row";
			return E`
          <div
            class="positioned-button-group ${t === "custom" ? "" : t}"
            style=${R({
				...a,
				flexDirection: o
			})}
          >
            ${r.map((t) => E`
              <div
                class="positioned-button"
                style=${R(this._getParsedCss(t.styles?.button || t.styles?.card || t.css))}
              >
                ${this._renderSingleCustomButton(t, e)}
              </div>
            `)}
          </div>
        `;
		})}
    `;
	}
	_renderButtons(e, t, n) {
		return E`
      <div
        class="${F({
			buttons: !0,
			...this._designClasses
		})}"
      >
        ${z(e, (e) => e, (e) => {
			let r = n.get(e);
			if (e === "climate") {
				let e = r?.display_mode;
				if (r?.hide === !0 || e !== "icon" && e !== "text_icon") return O;
			}
			let i = r?.color || this._config?.domain_color, a = r?.icon, o = e === "climate" && r?.show_set_temperature === !0, s = t[e].filter((e) => !(H.includes(e.state) || this._excludedEntitiesSet.has(e.entity_id))), c = [], l;
			if (o) {
				c = s;
				let e = !1, t = !1;
				for (let n of s) {
					let r = n.attributes?.hvac_action ?? null, i = (n.state ?? "").toString().toLowerCase();
					if (r != null) {
						let n = r.toString().toLowerCase();
						e ||= n.includes("heat"), t ||= n.includes("cool");
					} else e ||= i.includes("heat"), t ||= i.includes("cool");
					if (e && t) break;
				}
				l = e ? this._getClimateColor("heat", "red") : t ? this._getClimateColor("cool", "cornflowerblue") : this._getClimateColor("standby", "") || this._config?.climate_standby_color;
			} else c = s.filter((t) => {
				if (e === "climate") {
					let e = t.attributes?.hvac_action;
					if (e != null) {
						let t = e.toString().toLowerCase();
						return t !== "off" && t !== "idle";
					}
					let n = (t.state ?? "").toString().toLowerCase();
					return n !== "off" && n !== "idle";
				}
				return !V.includes(t.state);
			});
			let u = c.length;
			return this._config.show_active && u === 0 ? O : E`
              <div
                class="icon-with-count hover"
                style=${R(this._getParsedCss(r?.styles?.button || r?.styles?.card || r?.css || this._config?.domain_css || this._config?.styles?.domain))}
                @action=${Ui(this, e)}
                .actionHandler=${G(r)}
              >
                ${this._renderIcon(a || this._cachedIcon(e, u > 0), R({
				...l ? { color: l } : {},
				...!l && i ? { color: `var(--${i}-color)` } : {},
				...!l && !i && this._config?.domain_color ? { color: this._config.domain_color } : {},
				...this._getParsedCss(r?.styles?.icon || r?.icon_css)
			}), u > 0 ? "toggle-on" : "toggle-off", e)}
                <span
                  class="active-count text-small ${u > 0 ? "on" : "off"}"
                >
                  ${u}
                </span>
              </div>
            `;
		})}
      </div>
    `;
	}
	_renderSensors(e, t, n, r) {
		let i = this._config?.wrap_sensor_icons, a = z(e, (e) => e.domain + "-" + e.deviceClass, ({ domain: e, deviceClass: a }) => {
			let o = (t.get(e)?.get(a) || []).filter((e) => !this._excludedEntitiesSet.has(e.entity_id) && ea(e.entity_id, this.hass.entities, this._config?.category_filter));
			if (o.length === 0) return O;
			let s = r.get(a), c = o.some((e) => !H.includes(e.state) && !V.includes(e.state));
			if (s?.invert === !0 && c) return O;
			let l = a === "temperature" ? n.temperature_entity_id : a === "humidity" ? n.humidity_entity_id : null, u = l ? this.hass.states[l] : void 0, d = u ? this.hass.formatEntityState(u) : ta(a, o, this.hass.locale, this.hass.entities);
			if (!d) return O;
			let f = s?.color || this._config?.sensor_color, p = f ? { color: `var(--${f}-color)` } : {}, m = this._config?.show_sensor_icons ? E`<ha-domain-icon
              style=${R({
				...p,
				...this._getParsedCss(s?.styles?.icon || s?.css)
			})}
              .hass=${this.hass}
              .domain=${e}
              .deviceClass=${a}
            ></ha-domain-icon>` : O, h = E`<span
          class="sensor-value"
          @action=${Ki(this, e, a)}
          .actionHandler=${G(s)}
          style=${R({
				...p,
				...this._getParsedCss(this._config?.styles?.sensor),
				...this._getParsedCss(s?.styles?.sensor || s?.styles?.button || s?.styles?.card || s?.css)
			})}
        >${d}</span>`;
			return i ? E`<div class="sensor-row off">${m}${h}</div>` : E`${m}${h}`;
		});
		return E`
      <div
        class="sensors"
        style=${R(this._getParsedCss(this._config?.styles?.sensors))}
      >
        ${i ? a : E`<div
              class="sensor text-medium off ${this._config?.show_sensor_icons ? "" : "dashed"}"
            >
              ${a}
            </div>`}
      </div>
    `;
	}
	_renderClimates(e, t, n) {
		return E`
      <div class="climate text-small off">
        ${z(e, (e) => e.domain, ({ domain: e }) => {
			let r = t[e] || [], i = n.get(e) || {};
			if (i?.display_mode === "icon") return O;
			if (i?.show_set_temperature === !0) {
				let t = r.filter((e) => !this._excludedEntitiesSet.has(e.entity_id)).map((e) => {
					let t = e.attributes?.temperature ?? e.attributes?.target_temperature ?? null;
					if (t == null) return null;
					let n = Number(t);
					if (Number.isNaN(n)) return null;
					let r = this.hass?.config?.unit_system?.temperature || "", i = e.attributes?.hvac_action ?? null, a = (e.state ?? "").toString().toLowerCase(), o = (i ?? a).toString().toLowerCase(), s = o.includes("heat"), c = o.includes("cool"), l = s ? this._getClimateStyle("heat") : c ? this._getClimateStyle("cool") : this._getClimateStyle("standby");
					return E`<span style=${R({
						color: l.color || (s ? "red" : c ? "cornflowerblue" : "var(--secondary-text-color)"),
						...l
					})}
                    >${n}${r ? ` ${r}` : ""}</span
                  >`;
				}).filter((e) => e !== null);
				if (t.length === 0) return O;
				let n = t.reduce((e, t, n) => (n === 0 || e.push(E`<span
                        style=${R({
					color: "var(--secondary-text-color)",
					...this._getClimateStyle("standby")
				})}
                        >,
                      </span>`), e.push(t), e), []);
				return E`<div
                class="climate"
                style=${R({
					...i?.color ? { color: `var(--${i.color}-color)` } : {},
					...this._getParsedCss(i?.styles?.button || i?.styles?.card || i?.css)
				})}
                @action=${Ui(this, e)}
                .actionHandler=${G(i)}
              >
                <span
                  style=${R({
					color: "var(--secondary-text-color)",
					...this._getClimateStyle("standby")
				})}
                  >(</span
                >${n}<span
                  style=${R({
					color: "var(--secondary-text-color)",
					...this._getClimateStyle("standby")
				})}
                  >)</span
                >
              </div>`;
			}
			let a = (r || []).filter((e) => {
				let t = e.attributes?.hvac_action, n = e.state, r = !H.includes(n) && !V.includes(n) && !this._excludedEntitiesSet.has(e.entity_id);
				if (t != null) {
					let e = t.toString().toLowerCase();
					return r && e !== "idle" && e !== "off";
				}
				let i = (n ?? "").toString().toLowerCase();
				return r && i !== "idle" && i !== "off";
			}).map((e) => `${e.attributes?.temperature ?? "N/A"} ${this.hass?.config?.unit_system?.temperature || ""}`);
			if (a.length === 0) return O;
			let o = i?.color;
			return E`<div
              class="climate"
              style=${R({
				...o ? { color: `var(--${o}-color)` } : {},
				...!o && this._config?.domain_color ? { color: this._config.domain_color } : {},
				...this._getParsedCss(i?.styles?.button || i?.styles?.card || i?.css)
			})}
              @action=${Ui(this, e)}
              .actionHandler=${G(i)}
            >
              <span
                style=${R(this._getClimateStyle("heat"))}
                >(${a.join(", ")})</span
              >
            </div>`;
		})}
      </div>
    `;
	}
	_renderBottom(e, t, n, r, i, a, o) {
		return E`
      <div
        class="${F({
			bottom: !0,
			...this._designClasses
		})}"
      >
        <div
          class="${F({
			name: !0,
			...this._designClasses,
			"text-large": !0,
			on: !0
		})}"
          style=${R({
			...this._config?.area_name_color ? { color: `var(--${this._config.area_name_color}-color)` } : {},
			...this._getParsedCss(this._config?.styles?.name || this._config?.name_css)
		})}
          @action=${this._handleAction}
          .actionHandler=${G(this._config)}
        >
          ${this._config.area_name || e.name}
        </div>
        ${this._renderSensors(t, r, e, i)}
        ${this._renderClimates(a, n, o)}
      </div>
    `;
	}
	render() {
		if (!this._config || !this.hass || !this.hass.areas || !this.hass.devices || !this.hass.entities) return O;
		let e = this._config?.design === "V2", t = e && this._config?.v2_color ? `rgba(${this._config.v2_color.join(", ")})` : "var(--primary-color)", n = { mirrored: this._config.mirrored === !0 }, r = 3;
		try {
			let e = this.shadowRoot?.host || document.documentElement, t = getComputedStyle(e).getPropertyValue("--row-size");
			t && (r = Number(t.trim()) || 3);
		} catch {}
		let i = e ? { background: t } : {}, a = e && r === 1 ? {} : e ? { background: t } : {}, o = this.hass.entities && this.hass.devices ? q(this.hass.entities, this.hass.devices) : void 0, s = J(this._config.area, o ? oa : Y(this._config.area, this.hass.devices), this.hass.entities, this._hiddenEntitiesSet, this._config.label, o), { grouped: c, byDomain: l } = this._getOrganizedEntities(s, this.hass.states), u = {};
		Object.entries(l).forEach(([e, t]) => {
			u[e] = t.filter((e) => ea(e.entity_id, this.hass.entities, this._config?.category_filter));
		});
		let d = $i(this._config.area, this.hass?.areas || {}), f = this._customizationDomainMap, p = this._customizationCoverMap, m = this._customizationAlertMap, h = this._customizationSensorMap, g = Zr(u, this._deviceClasses), _ = Qr(u, this._deviceClasses), ee = ei(this._config.toggle_domains, u), te = $r(u, this._deviceClasses), v = (this._config?.toggle_domains?.includes("climate") ? Gr : []).filter((e) => e in u).map((e) => ({ domain: e })), y = (this._config?.display_type || "").toString().toLowerCase(), b = y.includes("camera"), ne = y.includes("picture") || y.includes("image"), x = y === "" || y.includes("icon"), S = b && u.camera || [], re = b && (this._config.camera_entity || this._config.camera_entity_left || this._config.camera_entity_right);
		if (d === null) return E`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
		let ie = b && (S.length > 0 || re) || ne && d.picture, ae = ni(e, r, this._config?.styles?.icon || this._config?.icon_css, this._config?.area_icon_color, this._styleCache), oe = this.layout === "grid" || this.layout === "panel";
		return E`
      <ha-card
        class="${F(n)}"
        style=${R(this._getParsedCss(this._config?.styles?.card || this._config?.css))}
      >
        <div
          class="header"
          style=${ie ? "padding-bottom:0em" : "padding-bottom:12em"}
          @action=${this._handleAction}
          .actionHandler=${G(this._config)}
        >
          <div
            class="picture"
            style=${oe ? O : "max-height:12em;"}
          >
            ${(() => {
			if (!ie) return O;
			if (b && S.length > 0) {
				let e = this._config?.camera_mode || "single", t = this._getParsedCss(this._config?.styles?.camera);
				if (e === "split") {
					let e = this._config?.camera_entity_left || S[0]?.entity_id, n = this._config?.camera_entity_right || S[1]?.entity_id;
					if (e && n) return E`
                <div style="display: flex; height: 100%; width: 100%;">
                  <hui-image
                    style=${R({
						flex: "1",
						width: "50%",
						"object-fit": "cover",
						...t
					})}
                    .config=${this._config}
                    .hass=${this.hass}
                    .cameraImage=${e}
                    .cameraView=${this._config.camera_view}
                    fit-mode="cover"
                  ></hui-image>
                  <div style="width: 2px; height: 100%; background: var(--divider-color, rgba(0,0,0,0.5)); z-index: 1;"></div>
                  <hui-image
                    style=${R({
						flex: "1",
						width: "50%",
						"object-fit": "cover",
						...t
					})}
                    .config=${this._config}
                    .hass=${this.hass}
                    .cameraImage=${n}
                    .cameraView=${this._config.camera_view}
                    fit-mode="cover"
                  ></hui-image>
                </div>
              `;
				} else {
					let n = S[0]?.entity_id;
					return e === "single" && this._config?.camera_entity ? n = this._config.camera_entity : e === "auto" && S.length > 0 && (n = S[this._currentCameraIndex % S.length].entity_id), E`
              ${z([n], (e) => e, (e) => E`
                <hui-image
                  .config=${this._config}
                  .hass=${this.hass}
                  style=${R({
						width: "100%",
						height: "100%",
						...t
					})}
                  .cameraImage=${e}
                  .cameraView=${this._config.camera_view}
                  fit-mode="cover"
                ></hui-image>
              `)}
            `;
				}
			}
			if (ne && d.picture) return E`
            <hui-image
              .config=${this._config}
              .hass=${this.hass}
              style=${R({
				width: "100%",
				height: "100%",
				...this._getParsedCss(this._config?.styles?.image)
			})}
              .image=${d.picture}
              fit-mode="cover"
            ></hui-image>
          `;
		})()}
          </div>
        </div>

        <div
          class="${F({
			"icon-container": !0,
			...this._designClasses
		})}"
          style=${R(a)}
        >
          ${x ? this._renderIcon(this._config.area_icon || d.icon, R(ae)) : O}
        </div>

        <div
          class="${F({
			content: !0,
			...this._designClasses
		})}"
          @action=${this._handleAction}
          .actionHandler=${G(this._config)}
        >
          ${Qe(E`<div
            class="${F({
			right: !0,
			...this._designClasses
		})}"
            style=${R(i)}
          >
            ${this._renderEntityGroup("cover", g, c, p)}
            ${this._renderEntityGroup("alert", _, c, m)}
            ${this.renderCustomButtons(u)}
            ${this._renderButtons(ee, u, f)}
          </div>`)}
          ${Qe(this._renderBottom(d, te, u, c, h, v, f))}
        </div>
        ${this.renderPositionedCustomButtons(u)}
      </ha-card>
    `;
	}
	_showPopup(e, t, n) {
		e.dispatchEvent(new CustomEvent("show-dialog", {
			detail: {
				dialogTag: t,
				dialogImport: () => customElements.whenDefined(t),
				dialogParams: n
			},
			bubbles: !0,
			composed: !0
		}));
	}
	_showPopupForDomain(e, t) {
		this._selectedDeviceClass = t || null, this._openPopup({ domain: e });
	}
	_openPopup(e) {
		let t = $i(this._config?.area, this.hass?.areas || {}), n = this._config?.area_name || t && t.name || "Details";
		this._showPopup(this, "area-card-plus-popup", {
			title: n,
			hass: this.hass,
			selectedDomain: e?.domain,
			selectedDeviceClass: e?.domain && this._selectedDeviceClass || void 0,
			opener: this,
			card: this,
			entities: J(this._config.area, Y(this._config.area, this.hass.devices), this.hass.entities, this._hiddenEntitiesSet, this._config.label, this.hass.entities && this.hass.devices ? q(this.hass.entities, this.hass.devices) : void 0).map((e) => this.hass.states[e]).filter((e) => e !== void 0)
		});
	}
	static get styles() {
		return ri;
	}
};
X([N({ attribute: !1 })], ca.prototype, "hass", void 0), X([N({ attribute: !1 })], ca.prototype, "layout", void 0), X([P()], ca.prototype, "_config", void 0), X([P()], ca.prototype, "_currentCameraIndex", void 0), ca = X([M("area-card-plus")], ca);
//#endregion
//#region src/editor-schema.ts
var la = B(() => [{
	name: "area",
	selector: { area: {} }
}]), ua = B((e, t, n, r, i) => {
	let a = (e) => i.localize(e) || e, o = (e) => K(e, i.locale.language), s = [{
		name: "camera_view",
		selector: { select: {
			options: ["auto", "live"].map((e) => ({
				value: e,
				label: a(`ui.panel.lovelace.editor.card.generic.camera_view_options.${e}`)
			})),
			mode: "dropdown"
		} }
	}, {
		name: "camera_mode",
		selector: { select: {
			options: [
				{
					value: "single",
					label: o("camera_mode_single")
				},
				{
					value: "auto",
					label: o("camera_mode_auto")
				},
				{
					value: "split",
					label: o("camera_mode_split")
				}
			],
			mode: "dropdown"
		} }
	}];
	return n === "single" ? s.push({
		name: "camera_entity",
		selector: { select: {
			options: r,
			mode: "dropdown"
		} }
	}) : n === "auto" ? s.push({
		name: "camera_auto_interval",
		selector: { number: {
			min: 1,
			max: 3600,
			mode: "box"
		} }
	}) : n === "split" && s.push({
		name: "camera_entity_left",
		selector: { select: {
			options: r,
			mode: "dropdown"
		} }
	}, {
		name: "camera_entity_right",
		selector: { select: {
			options: r,
			mode: "dropdown"
		} }
	}), [
		{
			name: "",
			type: "grid",
			schema: [
				{
					name: "area_name",
					selector: { text: {} }
				},
				{
					name: "area_name_color",
					selector: { ui_color: {
						default_color: "state",
						include_state: !0
					} }
				},
				{
					name: "area_icon",
					selector: { icon: {} }
				},
				{
					name: "area_icon_color",
					selector: { ui_color: {
						default_color: "state",
						include_state: !0
					} }
				},
				{
					name: "display_type",
					selector: { select: {
						options: [
							"icon",
							"picture",
							"icon & picture",
							"camera",
							"camera & icon"
						].map((e) => {
							let t = (e) => {
								let t = e.trim().toLowerCase();
								return t === "icon" ? "ui.panel.lovelace.editor.card.generic.icon" : t === "picture" || t === "image" ? "ui.components.selectors.image.image" : t === "camera" ? "ui.panel.lovelace.editor.card.area.display_type_options.camera" : `ui.panel.lovelace.editor.card.area.display_type_options.${e}`;
							};
							return {
								value: e,
								label: e.split(" & ").map((e) => e.trim()).map((e) => a(t(e)) || e).join(" & ")
							};
						}),
						mode: "dropdown"
					} }
				},
				...t === "camera" || t === "camera & icon" ? s : []
			]
		},
		{
			name: "mirrored",
			selector: { boolean: {} }
		},
		{
			name: "layout",
			required: !0,
			selector: { select: {
				mode: "box",
				options: ["vertical", "horizontal"].map((e) => ({
					label: i.localize(`ui.panel.lovelace.editor.card.tile.content_layout_options.${e}`),
					value: e,
					image: {
						src: `/static/images/form/tile_content_layout_${e}.svg`,
						src_dark: `/static/images/form/tile_content_layout_${e}_dark.svg`,
						flip_rtl: !0
					}
				}))
			} }
		},
		{
			name: "design",
			selector: { select: {
				mode: "box",
				options: ["V1", "V2"]
			} }
		},
		...e === "V2" ? [{
			name: "v2_color",
			selector: { color_rgb: {
				default_color: "state",
				include_state: !0
			} }
		}] : [],
		{
			name: "theme",
			required: !1,
			selector: { theme: {} }
		}
	];
}), da = B(() => {
	let e = [
		"more-info",
		"navigate",
		"url",
		"perform-action",
		"none"
	];
	return [
		{
			name: "tap_action",
			selector: { ui_action: { actions: e } }
		},
		{
			name: "double_tap_action",
			selector: { ui_action: { actions: e } }
		},
		{
			name: "hold_action",
			selector: { ui_action: { actions: e } }
		}
	];
}), fa = B((e) => [{
	name: "alert_classes",
	selector: { select: {
		reorder: !0,
		multiple: !0,
		custom_value: !0,
		options: e
	} }
}, {
	name: "alert_color",
	selector: { ui_color: {
		default_color: "state",
		include_state: !0
	} }
}]), pa = B((e) => [{
	name: "cover_classes",
	selector: { select: {
		reorder: !0,
		multiple: !0,
		custom_value: !0,
		options: e
	} }
}, {
	name: "cover_color",
	selector: { ui_color: {
		default_color: "state",
		include_state: !0
	} }
}]), ma = B((e) => [
	{
		name: "",
		type: "grid",
		schema: [{
			name: "show_sensor_icons",
			selector: { boolean: {} }
		}, {
			name: "wrap_sensor_icons",
			selector: { boolean: {} }
		}]
	},
	{
		name: "sensor_classes",
		selector: { select: {
			reorder: !0,
			multiple: !0,
			custom_value: !0,
			options: e
		} }
	},
	{
		name: "sensor_color",
		selector: { ui_color: {
			default_color: "state",
			include_state: !0
		} }
	}
]), ha = B((e) => [{
	name: "toggle_domains",
	selector: { select: {
		reorder: !0,
		multiple: !0,
		custom_value: !0,
		options: e
	} }
}, {
	name: "domain_color",
	selector: { ui_color: {
		default_color: "state",
		include_state: !0
	} }
}]), ga = B(() => [{
	name: "styles",
	selector: { object: {} }
}]), _a = class extends j {
	constructor(...e) {
		super(...e), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
	}
	_getKey(e) {
		return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
	}
	render() {
		if (!this.hass) return O;
		let e = new Set((this.customization || []).map((e) => e.type)), t = this.SelectOptions.filter((t) => !e.has(t.value));
		return E`
      <div class="customization">
        ${this.customization && z(this.customization, (e) => this._getKey(e), (e, t) => E`
            <div class="customize-item">
              <ha-selector
                .hass=${this.hass}
                .label=${K("edit_content", this.hass?.locale.language ?? "en")}  
                .selector=${{ select: {
			options: this.SelectOptions,
			mode: "dropdown"
		} }}
                .value=${e.type}
                .required=${!1}
                .index=${t}
                @value-changed=${this._valueChanged}
              ></ha-selector>

              <ha-icon-button
                .label="Remove"
                .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                class="remove-icon"
                .index=${t}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}
                class="edit-icon"
                .index=${t}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `)}

        <div class="add-item row">
          <ha-selector
            .hass=${this.hass}
            .label=${K("edit_content", this.hass?.locale.language ?? "en")}
            .selector=${{ select: {
			options: t,
			mode: "dropdown"
		} }}
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
		if (!this.customization || !this.hass) return;
		let t = e.detail.value, n = e.target.index, r = this.customization.concat();
		r[n] = {
			...r[n],
			type: t || ""
		}, U(this, "config-changed", r);
	}
	_removeRow(e) {
		e.stopPropagation();
		let t = e.currentTarget.index;
		if (t != null) {
			let e = this.customization.concat();
			e.splice(t, 1), U(this, "config-changed", e);
		}
	}
	_editRow(e) {
		e.stopPropagation();
		let t = e.target.index;
		t != null && U(this, "edit-item", t);
	}
	_addRow(e) {
		if (e.stopPropagation(), !this.customization || !this.hass) return;
		let t = e.detail.value;
		if (!t) return;
		let n = { type: t };
		U(this, "config-changed", [...this.customization, n]);
		let r = e.target;
		r && (r.value = "");
	}
	static get styles() {
		return s`
      .customization {
        margin-top: 16px;
      }
      .customize-item,
      .add-item {
        display: flex;
        align-items: center;
      }
      .add-customization {
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
};
X([N({ attribute: !1 })], _a.prototype, "hass", void 0), X([N({ type: Array })], _a.prototype, "SelectOptions", void 0);
var va = class extends _a {
	get customization() {
		return this.customization_domain;
	}
};
X([N({ attribute: !1 })], va.prototype, "customization_domain", void 0), va = X([M("domain-items-editor")], va);
var ya = class extends _a {
	get customization() {
		return this.customization_alert;
	}
};
X([N({ attribute: !1 })], ya.prototype, "customization_alert", void 0), ya = X([M("alert-items-editor")], ya);
var ba = class extends _a {
	get customization() {
		return this.customization_cover;
	}
};
X([N({ attribute: !1 })], ba.prototype, "customization_cover", void 0), ba = X([M("cover-items-editor")], ba);
var xa = class extends _a {
	get customization() {
		return this.customization_sensor;
	}
};
X([N({ attribute: !1 })], xa.prototype, "customization_sensor", void 0), xa = X([M("sensor-items-editor")], xa);
var Sa = class extends j {
	_editRow(e) {
		e.stopPropagation();
		let t = e.currentTarget.index;
		U(this, "edit-item", t);
	}
	_removeRow(e) {
		if (e.stopPropagation(), !this.custom_buttons) return;
		let t = e.currentTarget.index, n = [...this.custom_buttons];
		n.splice(t, 1), U(this, "config-changed", n);
	}
	_addRow() {
		let e = {
			name: "",
			icon: "",
			tap_action: { action: "none" }
		}, t = [...this.custom_buttons || [], e];
		U(this, "config-changed", t);
	}
	render() {
		return this.hass ? E`
      <div class="custom-buttons">
        ${this.custom_buttons?.map((e, t) => E`
            <div class="row">
              <div class="item">
                ${(() => {
			if (e.use_entity_picture && e.entity) {
				let t = this.hass?.states[e.entity];
				if (t?.attributes?.entity_picture) return E`<img
                        class="entity-picture-preview"
                        src=${t.attributes.entity_picture}
                      />`;
			}
			let t = e.icon;
			return t?.startsWith("M") ? E`<ha-svg-icon .path=${t}></ha-svg-icon>` : t ? E`<ha-icon .icon=${t}></ha-icon>` : E`<ha-svg-icon
                    .path=${pn}
                  ></ha-svg-icon>`;
		})()}
                <span class="name"
                  >${e.name || `Button ${t + 1}`}</span
                >
              </div>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${Rn}
                .index=${t}
                @click=${this._editRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${Ut}
                .index=${t}
                @click=${this._removeRow}
              ></ha-icon-button>
            </div>
          `)}
        <div class="add-button-container">
          <ha-button @click=${this._addRow}>
            ${K("add_custom_button", this.hass?.locale.language ?? "en")}
          </ha-button>
        </div>
      </div>
    ` : O;
	}
	static {
		this.styles = s`
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
	}
};
X([N({ attribute: !1 })], Sa.prototype, "hass", void 0), X([N({ attribute: !1 })], Sa.prototype, "custom_buttons", void 0), Sa = X([M("custom-buttons-editor")], Sa);
//#endregion
//#region src/item-editor.ts
var Ca = [
	"more-info",
	"toggle",
	"navigate",
	"url",
	"perform-action",
	"none"
], wa = Ca.filter((e) => e !== "toggle"), Ta = (e) => [
	"tap_action",
	"double_tap_action",
	"hold_action"
].map((t) => ({
	name: t,
	selector: { ui_action: { actions: e } }
})), Ea = Ta(Ca), Da = Ta(wa), Q = class extends j {
	constructor(...e) {
		super(...e), this._activeTab = "config", this._schemadomainConfig = B((e) => {
			let t = [{
				name: "icon",
				selector: { icon: {} }
			}, {
				name: "color",
				selector: { ui_color: {
					default_color: "state",
					include_state: !0
				} }
			}];
			return this._config?.type === "climate" && t.unshift({
				name: "display_mode",
				selector: { select: {
					mode: "dropdown",
					options: [
						{
							value: "text",
							label: K("display_mode_text", e)
						},
						{
							value: "icon",
							label: K("display_mode_icon", e)
						},
						{
							value: "text_icon",
							label: K("display_mode_text_icon", e)
						}
					]
				} }
			}, {
				name: "show_set_temperature",
				selector: { boolean: {} }
			}), t;
		}), this._schemaalertConfig = B(() => [
			{
				name: "invert",
				selector: { boolean: {} }
			},
			{
				name: "icon",
				selector: { icon: {} }
			},
			{
				name: "color",
				selector: { ui_color: {
					default_color: "state",
					include_state: !0
				} }
			}
		]), this._schemasensorConfig = B(() => [{
			name: "invert",
			selector: { boolean: {} }
		}, {
			name: "color",
			selector: { ui_color: {
				default_color: "state",
				include_state: !0
			} }
		}]), this._schemacustombuttonConfig = B(() => [
			{
				name: "entity",
				selector: { entity: {} }
			},
			{
				name: "name",
				selector: { text: {} }
			},
			{
				name: "icon",
				selector: { icon: {} }
			},
			{
				name: "use_entity_picture",
				selector: { boolean: {} }
			}
		]), this._schemacustombuttonConfigAfter = B(() => [{
			name: "activate_state_color",
			selector: { boolean: {} }
		}, {
			name: "color",
			selector: { ui_color: {
				default_color: "state",
				include_state: !0
			} }
		}]), this._schemaStyle = B(() => [{
			name: "styles",
			selector: { object: {} }
		}]), this._computeLabelCallback = (e) => {
			switch (e.name) {
				case "use_entity_picture": return this.hass.localize("ui.panel.lovelace.editor.badge.entity.show_entity_picture");
				case "color": return this.hass.localize("ui.panel.lovelace.editor.card.tile.color");
				case "styles": return "Styles";
				case "display_mode": return K("display_mode", this.hass.locale.language);
				case "icon":
				case "tap_action":
				case "hold_action":
				case "double_tap_action": return this.hass.localize(`ui.panel.lovelace.editor.card.generic.${e.name}`);
				case "invert": return this.hass.localize("ui.dialogs.entity_registry.editor.invert.label");
				case "name": return this.hass.localize("ui.common.name");
				case "entity": return this.hass.localize("ui.common.entity");
				case "activate_state_color": return this.hass.localize("ui.panel.lovelace.editor.card.generic.state_color");
				case "show_set_temperature": return K("show_set_temperature", this.hass.locale.language);
				default: return this.hass.localize(`ui.panel.lovelace.editor.card.area.${e.name}`);
			}
		};
	}
	updated(e) {
		e.has("config") && this.config && (this._config = { ...this.config });
	}
	render() {
		if (!this.hass || !this.config) return E``;
		let e = this.hass, t = (t) => K(t, e.locale.language);
		this._config ||= { ...this.config };
		let n;
		if (this._activeTab === "config") switch (this.getSchema) {
			case "sensor":
				n = this._schemasensorConfig();
				break;
			case "domain":
				n = this._schemadomainConfig(e.locale.language);
				break;
			case "alert":
			case "cover":
				n = this._schemaalertConfig();
				break;
			case "custom_button": n = this._schemacustombuttonConfig();
		}
		else if (this._activeTab === "actions") switch (this.getSchema) {
			case "domain":
			case "custom_button":
				n = Ea;
				break;
			case "sensor":
			case "alert":
			case "cover": n = Da;
		}
		else this._activeTab === "style" && (n = this._schemaStyle());
		let r = { ...this._config }, i = this.getSchema === "custom_button" && this._activeTab === "config", a = i ? this._schemacustombuttonConfigAfter() : [];
		return E`
      <ha-tab-group>
        <ha-tab-group-tab
          .active=${this._activeTab === "config"}
          @click=${() => this._activeTab = "config"}
        >
          ${e.localize("ui.panel.lovelace.editor.edit_card.tab_config") ?? "Configuration"}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "actions"}
          @click=${() => this._activeTab = "actions"}
        >
          ${e.localize("ui.panel.lovelace.editor.card.generic.actions")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "style"}
          @click=${() => this._activeTab = "style"}
        >
          Style
        </ha-tab-group-tab>
        ${this.getSchema === "custom_button" ? "" : E`
              <ha-tab-group-tab
                .active=${this._activeTab === "popup"}
                @click=${() => this._activeTab = "popup"}
              >
                Popup Card
              </ha-tab-group-tab>
            `}
      </ha-tab-group>

      ${this._activeTab === "style" ? E`
            <ha-alert alert-type="info" title="Style Guide">
              <p>
                You can use standard CSS per identifier. <br />
                <strong>Identifiers:</strong>
              </p>
              <ul>
                <li><b>button</b>: Item Container (Background, Border)</li>
                <li><b>icon</b>: Item Icon</li>
                ${this.getSchema === "custom_button" ? E`<li><b>name</b>: Item Name (Label)</li>` : O}
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
          ` : O}
      ${this._activeTab === "popup" ? this._renderPopupTab() : E`
            <ha-form
              .hass=${e}
              .data=${r}
              .schema=${n}
              .computeLabel=${this._computeLabelCallback}
              @value-changed=${this._valueChangedSchema}
            ></ha-form>
            ${i ? E`
                  <ha-selector
                    class="manual-selector"
                    .hass=${e}
                    .selector=${{ select: {
			mode: "dropdown",
			options: [
				{
					value: "default",
					label: t("position_default")
				},
				{
					value: "top-left",
					label: t("position_top_left")
				},
				{
					value: "top-right",
					label: t("position_top_right")
				},
				{
					value: "bottom-left",
					label: t("position_bottom_left")
				},
				{
					value: "bottom-right",
					label: t("position_bottom_right")
				},
				{
					value: "custom",
					label: t("position_custom")
				}
			]
		} }}
                    .value=${this._config?.position || "default"}
                    .label=${t("position")}
                    .required=${!1}
                    @value-changed=${(e) => {
			this._updatePositionField("position", e.detail.value);
		}}
                  ></ha-selector>
                  ${this._config?.position && this._config.position !== "default" ? E`
                        <div class="position-grid">
                          <ha-selector
                            .hass=${e}
                            .selector=${{ text: {} }}
                            .value=${this._config?.position_group || ""}
                            .label=${t("position_group")}
                            @value-changed=${(e) => {
			this._updatePositionField("position_group", e.detail.value);
		}}
                          ></ha-selector>
                          <ha-selector
                            .hass=${e}
                            .selector=${{ select: {
			mode: "dropdown",
			options: [{
				value: "row",
				label: t("position_row")
			}, {
				value: "column",
				label: t("position_column")
			}]
		} }}
                            .value=${this._config?.position_direction || "row"}
                            .label=${t("position_direction")}
                            @value-changed=${(e) => {
			this._updatePositionField("position_direction", e.detail.value);
		}}
                          ></ha-selector>
                        </div>
                        <span class="position-group-hint">
                          ${t("position_group_hint")}
                        </span>
                      ` : O}
                  ${this._config?.position === "custom" ? E`
                        <div class="position-grid">
                          <ha-selector
                            .hass=${e}
                            .selector=${{ text: { suffix: "px" } }}
                            .value=${this._config.position_top || ""}
                            .label=${t("position_top")}
                            @value-changed=${(e) => {
			this._updatePositionField("position_top", e.detail.value);
		}}
                          ></ha-selector>
                          <ha-selector
                            .hass=${e}
                            .selector=${{ text: { suffix: "px" } }}
                            .value=${this._config.position_right || ""}
                            .label=${t("position_right")}
                            @value-changed=${(e) => {
			this._updatePositionField("position_right", e.detail.value);
		}}
                          ></ha-selector>
                          <ha-selector
                            .hass=${e}
                            .selector=${{ text: { suffix: "px" } }}
                            .value=${this._config.position_bottom || ""}
                            .label=${t("position_bottom")}
                            @value-changed=${(e) => {
			this._updatePositionField("position_bottom", e.detail.value);
		}}
                          ></ha-selector>
                          <ha-selector
                            .hass=${e}
                            .selector=${{ text: { suffix: "px" } }}
                            .value=${this._config.position_left || ""}
                            .label=${t("position_left")}
                            @value-changed=${(e) => {
			this._updatePositionField("position_left", e.detail.value);
		}}
                          ></ha-selector>
                        </div>
                      ` : O}
                  ${this._config?.entity ? E`
                        <div class="state-grid">
                          <ha-selector
                            .hass=${e}
                            .selector=${{ select: {
			mode: "dropdown",
			options: [{
				value: "equal",
				label: e.localize("ui.panel.lovelace.editor.condition-editor.condition.state.state_equal")
			}, {
				value: "not_equal",
				label: e.localize("ui.panel.lovelace.editor.condition-editor.condition.state.state_not_equal")
			}]
		} }}
                            .value=${this._config?.state_mode || ""}
                            .label=${e.localize("ui.dialogs.entity_registry.editor.invert.label") || "Invert State"}
                            @value-changed=${(e) => {
			this._updatePositionField("state_mode", e.detail.value);
		}}
                          ></ha-selector>
                          <ha-selector
                            .hass=${e}
                            .selector=${{ state: { entity_id: this._config.entity } }}
                            .value=${this._config?.state_value || ""}
                            .label=${e.localize("ui.components.entity.entity-state-picker.state") || "State"}
                            @value-changed=${(e) => {
			this._updatePositionField("state_value", e.detail.value);
		}}
                          ></ha-selector>
                        </div>
                      ` : O}
                  <ha-form
                    .hass=${e}
                    .data=${r}
                    .schema=${a}
                    .computeLabel=${this._computeLabelCallback}
                    @value-changed=${this._valueChangedSchema}
                  ></ha-form>
                ` : O}
          `}
    `;
	}
	_renderPopupTab() {
		let e = this._config?.popup_card;
		return e ? E`
      <div class="card-editor">
        <div class="card-header">
          <h3>
            Popup
            ${this.hass.localize("ui.panel.lovelace.editor.edit_card.tab_config")}
          </h3>
          <ha-button
            class="warning"
            @click=${this._removePopupCard}
            .disabled=${!e}
          >
            ${this.hass.localize("ui.common.delete")}
          </ha-button>
        </div>
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${e}
          @config-changed=${this._popupCardChanged}
        ></hui-card-element-editor>
      </div>
    ` : E`
        <div class="card-picker">
          <hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${this._cardPicked}
          ></hui-card-picker>
        </div>
      `;
	}
	_cardPicked(e) {
		e.stopPropagation();
		let t = e.detail.config;
		this._updatePopupCard(t);
	}
	_popupCardChanged(e) {
		e.stopPropagation();
		let t = e.detail.config;
		this._updatePopupCard(t);
	}
	_updatePopupCard(e) {
		if (!this._config) return;
		let t = {
			...this._config,
			popup_card: e
		};
		this._config = t, this.dispatchEvent(new CustomEvent("config-changed", { detail: t }));
	}
	_removePopupCard() {
		if (!this._config) return;
		let { popup_card: e, ...t } = this._config;
		this._config = t, this.dispatchEvent(new CustomEvent("config-changed", { detail: t }));
	}
	_updatePositionField(e, t) {
		if (!this.config) return;
		let n = {
			...this.config,
			[e]: t
		};
		this._config = n, this.dispatchEvent(new CustomEvent("config-changed", { detail: n }));
	}
	_valueChangedSchema(e) {
		if (!this.config) return;
		let t = {
			...this.config,
			...e.detail.value
		};
		this._config = t, this.dispatchEvent(new CustomEvent("config-changed", { detail: t }));
	}
	static get styles() {
		return s`
      h3 {
        margin-bottom: 0.5em;
      }
      ha-form {
        display: block;
      }
      ha-selector {
        width: 100%;
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
      .state-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr;
        gap: 4px 8px;
        margin-bottom: 16px;
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
X([N({ attribute: !1 })], Q.prototype, "config", void 0), X([N({ attribute: !1 })], Q.prototype, "hass", void 0), X([N({ attribute: !1 })], Q.prototype, "lovelace", void 0), X([P()], Q.prototype, "getSchema", void 0), X([P()], Q.prototype, "_config", void 0), X([P()], Q.prototype, "_activeTab", void 0), Q = X([M("item-editor")], Q);
//#endregion
//#region src/editor.ts
var Oa = /* @__PURE__ */ new Set(), $ = class extends j {
	constructor(...e) {
		super(...e), this._activeTab = "config", this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this._subElementEditorCustomButton = void 0, this._computeLabelCallback = B((e, t) => Xi(t, e)), this.computeLabel = (e) => this._computeLabelCallback(e, this.hass), this._schema = B((e, t, n, r, i, a) => {
			switch (e) {
				case "appearance": return ua(t, n, r, i, this.hass);
				case "actions": return da();
				case "style": return ga();
				default: return la();
			}
		}), this._binaryschema = B((e) => fa(e)), this._coverschema = B((e) => pa(e)), this._sensorschema = B((e) => ma(e)), this._toggleschema = B((e) => ha(e)), this._popupschema = B((e) => {
			let t = this.computeLabel({ name: "name" }), n = this.computeLabel({ name: "state" });
			return [
				{
					name: "columns",
					selector: { number: {
						min: 1,
						max: 4
					} }
				},
				{
					name: "",
					type: "grid",
					schema: [{
						name: "ungroup_areas",
						selector: { boolean: {} }
					}, {
						name: "hide_unavailable",
						selector: { boolean: {} }
					}]
				},
				{
					name: "popup_sort",
					selector: { select: { options: [{
						value: "name",
						label: t
					}, {
						value: "state",
						label: n
					}] } }
				},
				{
					name: "popup_domains",
					selector: { select: {
						reorder: !0,
						multiple: !0,
						custom_value: !0,
						options: e
					} }
				},
				{
					name: "edit_filters",
					flatten: !0,
					type: "expandable",
					icon: "mdi:eye-plus",
					schema: [{
						name: "label",
						selector: { label: { multiple: !0 } }
					}]
				},
				{
					name: "extra_entities",
					flatten: !0,
					type: "expandable",
					icon: "mdi:eye-plus",
					schema: [{
						name: "extra_entities",
						selector: { entity: { multiple: !0 } }
					}]
				}
			];
		}), this._binaryClassesForArea = B((e, t, n) => this._classesForArea(e, "binary_sensor", void 0, t, n)), this._coverClassesForArea = B((e, t, n) => this._classesForArea(e, "cover", void 0, t, n)), this._sensorClassesForArea = B((e, t, n, r) => this._classesForArea(e, "sensor", t, n, r)), this._toggleDomainsForArea = B((e, t, n) => this._classesForArea(e, "toggle", void 0, t, n)), this._allDomainsForArea = B((e, t, n) => this._classesForArea(e, "all", void 0, t, n)), this._cameraOptionsForArea = B((e, t, n) => {
			let r = q(t, n);
			return J(e, r ? Oa : Y(e, n), t, /* @__PURE__ */ new Set(), void 0, r).filter((e) => W(e) === "camera").map((e) => ({
				value: e,
				label: Zi(this.hass.states, e)
			}));
		}), this._buildBinaryOptions = B((e, t) => this._buildOptions("binary_sensor", e, t)), this._buildCoverOptions = B((e, t) => this._buildOptions("cover", e, t)), this._buildSensorOptions = B((e, t) => this._buildOptions("sensor", e, t)), this._buildToggleOptions = B((e, t) => this._buildOptions("toggle", e, t)), this._buildAllOptions = B((e, t) => this._buildOptions("all", e, t)), this._entityOptions = [], this._toggleEntityHidden = (e) => {
			let t = new Set(this._config?.hidden_entities ?? []);
			t.has(e) ? t.delete(e) : t.add(e);
			let n = Array.from(t);
			this._config = {
				...this._config || {},
				hidden_entities: n
			}, U(this, "config-changed", { config: this._config });
		}, this._toggleEntityExcluded = (e) => {
			let t = new Set(this._config?.excluded_entities ?? []);
			t.has(e) ? t.delete(e) : t.add(e);
			let n = Array.from(t);
			this._config = {
				...this._config || {},
				excluded_entities: n
			}, U(this, "config-changed", { config: this._config });
		};
	}
	_classesForArea(e, t, n, r, i) {
		let a = q(r, i), o = J(e, a ? Oa : Y(e, i), r, /* @__PURE__ */ new Set(), void 0, a), s = this._config?.extra_entities || [], c = o.map((e) => this.hass.states[e]).filter((e) => e !== void 0);
		if (t === "toggle") {
			let e = c.filter((e) => qr.includes(W(e.entity_id)) || Gr.includes(W(e.entity_id)));
			return [...new Set(e.map((e) => W(e.entity_id)))];
		}
		if (t === "all") {
			let e = s.map((e) => this.hass.states[e]).filter((e) => e !== void 0), t = [...c, ...e];
			return [...new Set(t.map((e) => W(e.entity_id)))];
		}
		let l = c.filter((e) => W(e.entity_id) === t && !r[e.entity_id]?.entity_category).map((e) => e.attributes.device_class || "").filter((e) => e && (t !== "sensor" || !n || n.includes(e)));
		return [...new Set(l)];
	}
	_buildOptions(e, t, n) {
		let r = [.../* @__PURE__ */ new Set([...t, ...n])].map((t) => ({
			value: t,
			label: t === "scene" ? "Scene" : e === "toggle" || e === "all" ? this.hass.localize(`component.${t}.entity_component._.name`) || t : this.hass.localize(`component.${e}.entity_component.${t}.name`) || t
		})), i = Qi(this.hass.states, this.hass.locale.language);
		return r.sort((e, t) => i(e.value, t.value)), r;
	}
	setConfig(e) {
		this._config = {
			...e,
			columns: e.columns || 4,
			mirrored: e.mirrored || !1,
			customization_domain: e.customization_domain || [],
			customization_alert: e.customization_alert || [],
			customization_cover: e.customization_cover || [],
			customization_sensor: e.customization_sensor || [],
			custom_buttons: e.custom_buttons || []
		};
	}
	async updated(e) {
		if (super.updated(e), this.hass && this._config) {
			if (e.has("_config")) {
				let t = e.get("_config"), n = t?.area, r = this._config.area, i = t?.extra_entities || [], a = this._config.extra_entities || [], o = t?.popup_domains || [], s = this._config?.popup_domains || [], c = i.length !== a.length || !i.every((e) => a.includes(e)), l = o.length !== s.length || !o.every((e) => s.includes(e));
				if (n !== void 0 && n !== r) {
					let e = this._toggleDomainsForArea(r, this.hass.entities, this.hass.devices), t = this._binaryClassesForArea(r, this.hass.entities, this.hass.devices), n = this._coverClassesForArea(r, this.hass.entities, this.hass.devices), i = this._allDomainsForArea(r, this.hass.entities, this.hass.devices), a = e.sort((e, t) => qr.indexOf(e) - qr.indexOf(t)), o = Object.keys(Yr || {}), s = new Map(o.map((e, t) => [e, t])), c = i.sort((e, t) => {
						let n = s.has(e) ? s.get(e) : 2 ** 53 - 1, r = s.has(t) ? s.get(t) : 2 ** 53 - 1;
						return n === r ? e.localeCompare(t) : n - r;
					});
					if (this._config.toggle_domains = [...a.filter((e) => e !== "scene" && e !== "script")], this._config.alert_classes = [...t], this._config.cover_classes = [...n], this._config.popup_domains = [...c], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
						let e = this._config.hidden_entities, t = Object.values(this._hiddenEntitiesByDomain()).flat(), n = e.filter((e) => t.includes(e));
						n.length !== e.length && (this._config = {
							...this._config || {},
							hidden_entities: n
						}, U(this, "config-changed", { config: { ...this._config } }));
					}
					this.requestUpdate();
				}
				if (c && this._config.popup_domains?.length) {
					let e = [...this._config.popup_domains || []];
					for (let t of a) {
						let n = W(t);
						e.includes(n) || e.push(n);
					}
					e.length !== (this._config.popup_domains || []).length && (this._config = {
						...this._config,
						popup_domains: e
					});
				}
				l && this._updateEntityOptions();
			}
			if (!this._numericDeviceClasses) {
				let { numeric_device_classes: e } = await Ni(this.hass);
				this._numericDeviceClasses = e;
			}
		}
	}
	_updateEntityOptions() {
		if (!this._config || !this.hass) return;
		let e = this._config.area, t = this._config.popup_domains || [], n = J(e, Y(e, this.hass.devices), this.hass.entities, /* @__PURE__ */ new Set(), void 0, q(this.hass.entities, this.hass.devices));
		this._entityOptions = n.filter((e) => this.hass.states[e] ? !this.hass.entities[e]?.hidden && t.includes(W(e)) : !1).map((e) => ({
			value: e,
			label: e
		}));
		let r = Qi(this.hass.states, this.hass.locale.language);
		this._entityOptions.sort((e, t) => r(e.value, t.value)), this._valueChanged({ detail: { value: this._config } });
	}
	_valueChanged(e) {
		this._config = e.detail.value, U(this, "config-changed", { config: this._config });
	}
	_isHiddenEntity(e) {
		let t = this._config?.hidden_entities ?? [];
		return Array.isArray(t) && t.includes(e);
	}
	_isExcludedEntity(e) {
		let t = this._config?.excluded_entities ?? [];
		return Array.isArray(t) && t.includes(e);
	}
	_hiddenCategoryChanged(e) {
		let t = e.detail?.value?.category_filter;
		this._config = {
			...this._config || {},
			category_filter: t
		}, U(this, "config-changed", { config: { ...this._config } });
	}
	_editItem(e, t) {
		if (e.stopPropagation(), !this._config || !this.hass) return;
		let n = e.detail;
		this[`_subElementEditor${t}`] = {
			index: n,
			type: "element"
		};
	}
	_edit_itemDomain(e) {
		this._editItem(e, "Domain");
	}
	_edit_itemAlert(e) {
		this._editItem(e, "Alert");
	}
	_edit_itemCover(e) {
		this._editItem(e, "Cover");
	}
	_edit_itemSensor(e) {
		this._editItem(e, "Sensor");
	}
	_customizationChanged(e, t) {
		e.stopPropagation(), this._config && this.hass && U(this, "config-changed", { config: {
			...this._config,
			[`customization_${t}`]: e.detail
		} });
	}
	_customizationChangedDomain(e) {
		this._customizationChanged(e, "domain");
	}
	_customizationChangedAlert(e) {
		this._customizationChanged(e, "alert");
	}
	_customizationChangedCover(e) {
		this._customizationChanged(e, "cover");
	}
	_customizationChangedSensor(e) {
		this._customizationChanged(e, "sensor");
	}
	_renderSubElementEditorCustomButton() {
		let e = this._subElementEditorCustomButton?.index ?? 0, t = this._config?.custom_buttons?.[e] || {};
		return E`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${Bt}
            @click=${this._goBackCustomButton}
          ></ha-icon-button>
                <span>${t?.name || `Button ${e + 1}`}</span>

        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${t}
        .getSchema=${"custom_button"}
        @config-changed=${this._itemChangedCustomButton}
      ></item-editor>
    `;
	}
	_edit_itemCustomButton(e) {
		e.stopPropagation(), this._config && this.hass && (this._subElementEditorCustomButton = {
			index: e.detail,
			type: "element"
		});
	}
	_goBackCustomButton() {
		this._subElementEditorCustomButton = void 0;
	}
	_itemChangedCustomButton(e) {
		if (e.stopPropagation(), !this._config || !this.hass) return;
		let t = this._subElementEditorCustomButton?.index;
		if (t !== void 0) {
			let n = [...this._config.custom_buttons || []];
			n[t] = e.detail, U(this, "config-changed", { config: {
				...this._config,
				custom_buttons: n
			} });
		}
	}
	_customizationChangedCustomButtons(e) {
		if (e.stopPropagation(), !this._config || !this.hass) return;
		let t = e.detail;
		U(this, "config-changed", { config: {
			...this._config,
			custom_buttons: t
		} });
	}
	_renderSubElementEditor(e, t, n) {
		let r = `customization_${e}`, i = this._config?.[r], a = `_subElementEditor${e.charAt(0).toUpperCase() + e.slice(1)}`, o = this[a]?.index ?? 0, s = i?.[o]?.type ?? "unknown", c = (e === "domain" ? this.toggleSelectOptions : e === "alert" ? this.binarySelectOptions : e === "cover" ? this.coverSelectOptions : this.sensorSelectOptions).find((e) => e.value === s)?.label || this._localizeLegacyType(s);
		return E`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            slot="trigger"
            .label=${this.hass.localize("ui.common.back")}
            .path=${Bt}
            @click=${t}
          ></ha-icon-button>
          <span slot="title">${c}</span>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${i?.[o] || {}}
        .getSchema=${e}
        @config-changed=${n}
      ></item-editor>
    `;
	}
	_renderSubElementEditorByKey(e) {
		return this._renderSubElementEditor(e, () => this._goBackByKey(e), (t) => this._itemChangedByKey(t, e));
	}
	_localizeLegacyType(e) {
		let t = e.match(/^(.+?)\s*-\s*(.+)$/);
		if (t) {
			let e = t[1].toLowerCase().replace(" ", "_"), n = t[2].toLowerCase(), r = this.hass.localize(`component.${e}.entity_component._.name`) || t[1], i = this.hass.localize(`ui.dialogs.entity_registry.editor.device_classes.${e}.${n}`) || t[2];
			return i = i.charAt(0).toUpperCase() + i.slice(1), `${r} – ${i}`;
		}
		let n = this.hass.localize(`component.${e}.entity_component._.name`) || e;
		return n = n.charAt(0).toUpperCase() + n.slice(1), n;
	}
	_goBackByKey(e) {
		switch (e) {
			case "domain":
				this._subElementEditorDomain = void 0;
				break;
			case "alert":
				this._subElementEditorAlert = void 0;
				break;
			case "cover":
				this._subElementEditorCover = void 0;
				break;
			case "sensor": this._subElementEditorSensor = void 0;
		}
	}
	_itemChangedByKey(e, t) {
		let n;
		switch (t) {
			case "domain":
				n = this._subElementEditorDomain;
				break;
			case "alert":
				n = this._subElementEditorAlert;
				break;
			case "cover":
				n = this._subElementEditorCover;
				break;
			case "sensor": n = this._subElementEditorSensor;
		}
		let r = `customization_${t}`;
		this._itemChanged(e, n, r);
	}
	_itemChanged(e, t, n) {
		if (e.stopPropagation(), !this._config || !this.hass) return;
		let r = t?.index;
		if (r != null) {
			let t = [...this._config[n]];
			t[r] = e.detail, U(this, "config-changed", { config: {
				...this._config,
				[n]: t
			} });
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
	_selectOptions(e) {
		let t = this._config?.area || "";
		switch (e) {
			case "toggle": return this._buildToggleOptions(this._toggleDomainsForArea(t, this.hass.entities, this.hass.devices), this._config?.toggle_domains || this._toggleDomainsForArea(t, this.hass.entities, this.hass.devices));
			case "all": return this._buildAllOptions(this._allDomainsForArea(t, this.hass.entities, this.hass.devices), this._config?.popup_domains || this._allDomainsForArea(t, this.hass.entities, this.hass.devices));
			case "binary": return this._buildBinaryOptions(this._binaryClassesForArea(t, this.hass.entities, this.hass.devices), this._config?.alert_classes || this._binaryClassesForArea(t, this.hass.entities, this.hass.devices));
			case "cover": return this._buildCoverOptions(this._coverClassesForArea(t, this.hass.entities, this.hass.devices), this._config?.cover_classes || this._coverClassesForArea(t, this.hass.entities, this.hass.devices));
			case "sensor": return this._buildSensorOptions(this._sensorClassesForArea(t, this._numericDeviceClasses, this.hass.entities, this.hass.devices), this._config?.sensor_classes || this._sensorClassesForArea(t, this._numericDeviceClasses, this.hass.entities, this.hass.devices));
		}
	}
	get entityOptions() {
		return this._entityOptions;
	}
	_domainIcon(e, t = "on", n) {
		let r = Yr;
		if (e in r) {
			let i = r[e];
			return typeof i == "string" ? i : n && i[n] ? i[n][t === "off" ? "off" : "on"] || i[n] : i[t === "off" ? "off" : "on"] || Object.values(i)[0];
		}
		return hn;
	}
	_groupAllEntitiesByDomain() {
		let e = {}, t = (this.entityOptions || []).map((e) => e.value);
		for (let n of t) {
			let t = W(n);
			e[t] || (e[t] = []), e[t].push(n);
		}
		let n = this._hiddenEntitiesByDomain(), r = Array.from(/* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(n)])), i = Qi(this.hass?.states || {}, this.hass.locale.language);
		return r.sort((e, t) => e.localeCompare(t)).map((t) => {
			let r = /* @__PURE__ */ new Set([...e[t] || [], ...n[t] || []]);
			return {
				domain: t,
				entities: Array.from(r).sort(i)
			};
		});
	}
	_domainLabel(e) {
		return this.hass?.localize?.(`component.${e}.entity_component._.name`) || e;
	}
	_getDeviceClassLabel(e, t) {
		if (!t || t === "other") return this.hass.localize("ui.dialogs.helper_settings.generic.other") ?? "Other";
		let n = `ui.dialogs.entity_registry.editor.device_classes.${e}.${t}`;
		return this.hass.localize(n) || t;
	}
	_groupByDeviceClass(e, t) {
		let n = this.hass?.states || {}, r = {};
		for (let e of t) {
			let t = n[e]?.attributes?.device_class || "";
			t && (r[t] || (r[t] = []), r[t].push(e));
		}
		let i = Qi(n, this.hass.locale.language);
		return Object.keys(r).sort((e, t) => e.localeCompare(t)).map((t) => ({
			deviceClass: t,
			label: this._getDeviceClassLabel(e, t),
			entities: r[t].slice().sort(i)
		}));
	}
	_hiddenEntitiesByDomain() {
		let e = {}, t = Array.isArray(this._config?.hidden_entities) ? this._config.hidden_entities : [];
		if (t.length === 0) return e;
		let n = this.hass?.entities || {}, r = this.hass?.devices || {}, i = this._config?.area, a = this._config?.label, o = i ? Array.isArray(i) ? i : [i] : [], s = a ? Array.isArray(a) ? a : [a] : [];
		for (let i of t) {
			let t = W(i), a = n[i], c = a?.device_id ? r[a.device_id] : void 0;
			(a?.area_id != null || c?.area_id != null) && (!s.length || Array.isArray(a?.labels) && a.labels.some((e) => s.includes(e)) || Array.isArray(c?.labels) && c.labels.some((e) => s.includes(e))) && (!o.length || a?.area_id && o.includes(a.area_id) || c?.area_id && o.includes(c.area_id)) && (e[t] || (e[t] = []), e[t].push(i));
		}
		return e;
	}
	_renderEntityRow(e) {
		let t = this._isHiddenEntity(e), n = this._isExcludedEntity(e);
		return E`
      <div class="entity-row">
        <span class="entity-name">
          ${this.hass.states[e]?.attributes?.friendly_name || e}
        </span>
        <ha-icon-button
          .path=${t ? $t : Qt}
          .label=${t ? this.hass.localize("ui.common.show") ?? "Show" : this.hass.localize("ui.common.hide") ?? "Hide"}
          @click=${() => this._toggleEntityHidden(e)}
        ></ha-icon-button>
        <ha-icon-button
          .path=${n ? en : tn}
          .label=${n ? "Include" : "Exclude"}
          @click=${() => this._toggleEntityExcluded(e)}
        ></ha-icon-button>
      </div>
    `;
	}
	render() {
		if (!this.hass || !this._config) return O;
		let e = this._toggleDomainsForArea(this._config.area || "", this.hass.entities, this.hass.devices), t = this._binaryClassesForArea(this._config.area || "", this.hass.entities, this.hass.devices), n = this._coverClassesForArea(this._config.area || "", this.hass.entities, this.hass.devices), r = this._allDomainsForArea(this._config.area || "", this.hass.entities, this.hass.devices), i = this._cameraOptionsForArea(this._config.area || "", this.hass.entities, this.hass.devices), a = this._schema(this._activeTab, this._config.design || "V1", this._config.display_type, this._config.camera_mode, i, this.hass.locale.language), o = this._binaryschema(this.binarySelectOptions), s = this._coverschema(this.coverSelectOptions), c = this._sensorschema(this.sensorSelectOptions), l = this._toggleschema(this.toggleSelectOptions), u = this._popupschema(this.AllSelectOptions), d = {
			alert_classes: t,
			cover_classes: n,
			sensor_classes: Jr.sensor,
			toggle_domains: e,
			popup_domains: r,
			...this._config
		};
		return this._subElementEditorDomain ? this._renderSubElementEditorByKey("domain") : this._subElementEditorAlert ? this._renderSubElementEditorByKey("alert") : this._subElementEditorCover ? this._renderSubElementEditorByKey("cover") : this._subElementEditorSensor ? this._renderSubElementEditorByKey("sensor") : this._subElementEditorCustomButton ? this._renderSubElementEditorCustomButton() : E`
      <ha-tab-group>
        <ha-tab-group-tab
          .active=${this._activeTab === "config"}
          @click=${() => this._activeTab = "config"}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.edit_card.tab_config") ?? "Configuration"}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "appearance"}
          @click=${() => this._activeTab = "appearance"}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.card.map.appearance") || "Appearance"}
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

      ${this._activeTab === "style" ? E`
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
          ` : O}

      <ha-form
        .hass=${this.hass}
        .data=${d}
        .schema=${a}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      ${this._activeTab === "config" ? E`
            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon .path=${ft}></ha-svg-icon>
                ${this.computeLabel({ name: "alert_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${d}
                  .schema=${o}
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
                <ha-svg-icon .path=${on}></ha-svg-icon>
                ${this.computeLabel({ name: "cover_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${d}
                  .schema=${s}
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
                <ha-svg-icon .path=${Lt}></ha-svg-icon>
                ${this.computeLabel({ name: "sensor_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${d}
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
                <ha-svg-icon .path=${qt}></ha-svg-icon>
                ${this.computeLabel({ name: "toggle_domains" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${d}
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
                <ha-svg-icon .path=${pn}></ha-svg-icon>
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
                <ha-svg-icon .path=${Dr}></ha-svg-icon>
                ${this.computeLabel({ name: "popup" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${d}
                  .schema=${u}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>

                <ha-expansion-panel outlined class="main">
                  <div slot="header" role="heading" aria-level="3">
                    <ha-svg-icon .path=${$t}></ha-svg-icon>
                    ${this.computeLabel({ name: "hidden_entities" })}
                  </div>
                  <div class="content">
                    <ha-form
                      .hass=${this.hass}
                      .data=${{ category_filter: this._config?.category_filter }}
                      .schema=${[{
			name: "category_filter",
			selector: { select: {
				options: [
					"config",
					"diagnostic",
					"config+diagnostic"
				],
				mode: "dropdown"
			} }
		}]}
                      .computeLabel=${this.computeLabel}
                      @value-changed=${(e) => this._hiddenCategoryChanged(e)}
                    ></ha-form>
                    ${this._groupAllEntitiesByDomain().map((e) => E`
                        <ha-expansion-panel outlined class="domain-panel">
                          <div slot="header" class="domain-header">
                            <ha-svg-icon
                              .path=${this._domainIcon(e.domain, "on")}
                            ></ha-svg-icon>
                            <span class="domain-title"
                              >${this._domainLabel(e.domain)}</span
                            >
                          </div>
                          <div class="content">
                            ${["binary_sensor", "cover"].includes(e.domain) ? this._groupByDeviceClass(e.domain, e.entities).map((t) => E`
                                    <ha-expansion-panel
                                      outlined
                                      class="domain-panel"
                                    >
                                      <div slot="header" class="dc-header">
                                        <ha-svg-icon
                                          .path=${this._domainIcon(e.domain, "on", t.deviceClass)}
                                        ></ha-svg-icon>
                                        <span class="dc-title"
                                          >${t.label}</span
                                        >
                                      </div>
                                      <div class="content">
                                        ${t.entities.map((e) => E`
                                            ${this._renderEntityRow(e)}
                                          `)}
                                      </div>
                                    </ha-expansion-panel>
                                  `) : e.entities.map((e) => E`
                                    ${this._renderEntityRow(e)}
                                  `)}
                          </div>
                        </ha-expansion-panel>
                      `)}
                  </div>
                </ha-expansion-panel>
              </div>
            </ha-expansion-panel>
          ` : O}
    `;
	}
	static {
		this.styles = s`
    :host {
      display: block;
    }
    ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .main {
      --ha-card-border-radius: 6px;
      border-radius: 6px;
      margin-top: 16px;
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
    .dc-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `;
	}
};
X([N({ attribute: !1 })], $.prototype, "hass", void 0), X([N({ attribute: !1 })], $.prototype, "lovelace", void 0), X([P()], $.prototype, "_config", void 0), X([P()], $.prototype, "_activeTab", void 0), X([P()], $.prototype, "_numericDeviceClasses", void 0), X([P()], $.prototype, "_subElementEditorDomain", void 0), X([P()], $.prototype, "_subElementEditorAlert", void 0), X([P()], $.prototype, "_subElementEditorCover", void 0), X([P()], $.prototype, "_subElementEditorSensor", void 0), X([P()], $.prototype, "_subElementEditorCustomButton", void 0), $ = X([M("area-card-plus-editor")], $), console.info(`%c AREA-CARD-PLUS %c v${e} `, "color: steelblue; background: black; font-weight: bold;", "color: white ; background: dimgray; font-weight: bold;"), window.customCards = window.customCards || [], window.customCards.push({
	type: "area-card-plus",
	name: "Area Card Plus",
	preview: !0,
	description: "A custom card to display area information."
});
//#endregion
