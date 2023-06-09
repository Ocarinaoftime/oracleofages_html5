(() => {
  // node_modules/kaboom/dist/kaboom.mjs
  var En = Object.defineProperty;
  var ci = (s, t, l) => t in s ? En(s, t, {enumerable: true, configurable: true, writable: true, value: l}) : s[t] = l;
  var o = (s, t) => En(s, "name", {value: t, configurable: true});
  var li = (s, t) => {
    for (var l in t)
      En(s, l, {get: t[l], enumerable: true});
  };
  var xe = (s, t, l) => (ci(s, typeof t != "symbol" ? t + "" : t, l), l);
  var hi = (() => {
    for (var s = new Uint8Array(128), t = 0; t < 64; t++)
      s[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t * 4 - 205] = t;
    return (l) => {
      for (var p = l.length, x = new Uint8Array((p - (l[p - 1] == "=") - (l[p - 2] == "=")) * 3 / 4 | 0), M = 0, q = 0; M < p; ) {
        var k = s[l.charCodeAt(M++)], j = s[l.charCodeAt(M++)], Z = s[l.charCodeAt(M++)], ae = s[l.charCodeAt(M++)];
        x[q++] = k << 2 | j >> 4, x[q++] = j << 4 | Z >> 2, x[q++] = Z << 6 | ae;
      }
      return x;
    };
  })();
  function De(s) {
    return s * Math.PI / 180;
  }
  o(De, "deg2rad");
  function at(s) {
    return s * 180 / Math.PI;
  }
  o(at, "rad2deg");
  function _e(s, t, l) {
    return t > l ? _e(s, l, t) : Math.min(Math.max(s, t), l);
  }
  o(_e, "clamp");
  function Le(s, t, l) {
    if (typeof s == "number" && typeof t == "number")
      return s + (t - s) * l;
    if (s instanceof b && t instanceof b)
      return s.lerp(t, l);
    if (s instanceof L && t instanceof L)
      return s.lerp(t, l);
    throw new Error(`Bad value for lerp(): ${s}, ${t}. Only number, Vec2 and Color is supported.`);
  }
  o(Le, "lerp");
  function qt(s, t, l, p, x) {
    return p + (s - t) / (l - t) * (x - p);
  }
  o(qt, "map");
  function ur(s, t, l, p, x) {
    return _e(qt(s, t, l, p, x), p, x);
  }
  o(ur, "mapc");
  var ge = class {
    x = 0;
    y = 0;
    constructor(t = 0, l = t) {
      this.x = t, this.y = l;
    }
    static fromAngle(t) {
      let l = De(t);
      return new ge(Math.cos(l), Math.sin(l));
    }
    clone() {
      return new ge(this.x, this.y);
    }
    add(...t) {
      let l = C(...t);
      return new ge(this.x + l.x, this.y + l.y);
    }
    sub(...t) {
      let l = C(...t);
      return new ge(this.x - l.x, this.y - l.y);
    }
    scale(...t) {
      let l = C(...t);
      return new ge(this.x * l.x, this.y * l.y);
    }
    dist(...t) {
      let l = C(...t);
      return this.sub(l).len();
    }
    sdist(...t) {
      let l = C(...t);
      return this.sub(l).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let t = this.len();
      return t === 0 ? new ge(0) : this.scale(1 / t);
    }
    normal() {
      return new ge(this.y, -this.x);
    }
    reflect(t) {
      return this.sub(t.scale(2 * this.dot(t)));
    }
    project(t) {
      return t.scale(t.dot(this) / t.len());
    }
    reject(t) {
      return this.sub(this.project(t));
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    angle(...t) {
      let l = C(...t);
      return at(Math.atan2(this.y - l.y, this.x - l.x));
    }
    angleBetween(...t) {
      let l = C(...t);
      return at(Math.atan2(this.cross(l), this.dot(l)));
    }
    lerp(t, l) {
      return new ge(Le(this.x, t.x, l), Le(this.y, t.y, l));
    }
    slerp(t, l) {
      let p = this.dot(t), x = this.cross(t), M = Math.atan2(x, p);
      return this.scale(Math.sin((1 - l) * M)).add(t.scale(Math.sin(l * M))).scale(1 / x);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(t) {
      return new ge(Number(this.x.toFixed(t)), Number(this.y.toFixed(t)));
    }
    transform(t) {
      return t.multVec2(this);
    }
    eq(t) {
      return this.x === t.x && this.y === t.y;
    }
    bbox() {
      return new te(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
  };
  var b = ge;
  o(b, "Vec2"), xe(b, "LEFT", new ge(-1, 0)), xe(b, "RIGHT", new ge(1, 0)), xe(b, "UP", new ge(0, -1)), xe(b, "DOWN", new ge(0, 1));
  function C(...s) {
    if (s.length === 1) {
      if (s[0] instanceof b)
        return new b(s[0].x, s[0].y);
      if (Array.isArray(s[0]) && s[0].length === 2)
        return new b(...s[0]);
    }
    return new b(...s);
  }
  o(C, "vec2");
  var ie = class {
    r = 255;
    g = 255;
    b = 255;
    constructor(t, l, p) {
      this.r = _e(t, 0, 255), this.g = _e(l, 0, 255), this.b = _e(p, 0, 255);
    }
    static fromArray(t) {
      return new ie(t[0], t[1], t[2]);
    }
    static fromHex(t) {
      if (typeof t == "number")
        return new ie(t >> 16 & 255, t >> 8 & 255, t >> 0 & 255);
      if (typeof t == "string") {
        let l = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return new ie(parseInt(l[1], 16), parseInt(l[2], 16), parseInt(l[3], 16));
      } else
        throw new Error("Invalid hex color format");
    }
    static fromHSL(t, l, p) {
      if (l == 0)
        return new ie(255 * p, 255 * p, 255 * p);
      let x = o((ae, U, J) => (J < 0 && (J += 1), J > 1 && (J -= 1), J < 1 / 6 ? ae + (U - ae) * 6 * J : J < 1 / 2 ? U : J < 2 / 3 ? ae + (U - ae) * (2 / 3 - J) * 6 : ae), "hue2rgb"), M = p < 0.5 ? p * (1 + l) : p + l - p * l, q = 2 * p - M, k = x(q, M, t + 1 / 3), j = x(q, M, t), Z = x(q, M, t - 1 / 3);
      return new ie(Math.round(k * 255), Math.round(j * 255), Math.round(Z * 255));
    }
    clone() {
      return new ie(this.r, this.g, this.b);
    }
    lighten(t) {
      return new ie(this.r + t, this.g + t, this.b + t);
    }
    darken(t) {
      return this.lighten(-t);
    }
    invert() {
      return new ie(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(t) {
      return new ie(this.r * t.r / 255, this.g * t.g / 255, this.b * t.b / 255);
    }
    lerp(t, l) {
      return new ie(Le(this.r, t.r, l), Le(this.g, t.g, l), Le(this.b, t.b, l));
    }
    eq(t) {
      return this.r === t.r && this.g === t.g && this.b === t.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
  };
  var L = ie;
  o(L, "Color"), xe(L, "RED", new ie(255, 0, 0)), xe(L, "GREEN", new ie(0, 255, 0)), xe(L, "BLUE", new ie(0, 0, 255)), xe(L, "YELLOW", new ie(255, 255, 0)), xe(L, "MAGENTA", new ie(255, 0, 255)), xe(L, "CYAN", new ie(0, 255, 255)), xe(L, "WHITE", new ie(255, 255, 255)), xe(L, "BLACK", new ie(0, 0, 0));
  function X(...s) {
    if (s.length === 0)
      return new L(255, 255, 255);
    if (s.length === 1) {
      if (s[0] instanceof L)
        return s[0].clone();
      if (typeof s[0] == "string")
        return L.fromHex(s[0]);
      if (Array.isArray(s[0]) && s[0].length === 3)
        return L.fromArray(s[0]);
    }
    return new L(...s);
  }
  o(X, "rgb");
  var cr = o((s, t, l) => L.fromHSL(s, t, l), "hsl2rgb");
  var Q = class {
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(t, l, p, x) {
      this.x = t, this.y = l, this.w = p, this.h = x;
    }
    scale(t) {
      return new Q(this.x + this.w * t.x, this.y + this.h * t.y, this.w * t.w, this.h * t.h);
    }
    pos() {
      return new b(this.x, this.y);
    }
    clone() {
      return new Q(this.x, this.y, this.w, this.h);
    }
    eq(t) {
      return this.x === t.x && this.y === t.y && this.w === t.w && this.h === t.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  };
  o(Q, "Quad");
  function oe(s, t, l, p) {
    return new Q(s, t, l, p);
  }
  o(oe, "quad");
  var W = class {
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(t) {
      t && (this.m = t);
    }
    static translate(t) {
      return new W([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, 0, 1]);
    }
    static scale(t) {
      return new W([t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(t) {
      t = De(-t);
      let l = Math.cos(t), p = Math.sin(t);
      return new W([1, 0, 0, 0, 0, l, -p, 0, 0, p, l, 0, 0, 0, 0, 1]);
    }
    static rotateY(t) {
      t = De(-t);
      let l = Math.cos(t), p = Math.sin(t);
      return new W([l, 0, p, 0, 0, 1, 0, 0, -p, 0, l, 0, 0, 0, 0, 1]);
    }
    static rotateZ(t) {
      t = De(-t);
      let l = Math.cos(t), p = Math.sin(t);
      return new W([l, -p, 0, 0, p, l, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(t) {
      return this.m[12] += this.m[0] * t.x + this.m[4] * t.y, this.m[13] += this.m[1] * t.x + this.m[5] * t.y, this.m[14] += this.m[2] * t.x + this.m[6] * t.y, this.m[15] += this.m[3] * t.x + this.m[7] * t.y, this;
    }
    scale(t) {
      return this.m[0] *= t.x, this.m[4] *= t.y, this.m[1] *= t.x, this.m[5] *= t.y, this.m[2] *= t.x, this.m[6] *= t.y, this.m[3] *= t.x, this.m[7] *= t.y, this;
    }
    rotate(t) {
      t = De(-t);
      let l = Math.cos(t), p = Math.sin(t), x = this.m[0], M = this.m[1], q = this.m[4], k = this.m[5];
      return this.m[0] = x * l + M * p, this.m[1] = -x * p + M * l, this.m[4] = q * l + k * p, this.m[5] = -q * p + k * l, this;
    }
    mult(t) {
      let l = [];
      for (let p = 0; p < 4; p++)
        for (let x = 0; x < 4; x++)
          l[p * 4 + x] = this.m[0 * 4 + x] * t.m[p * 4 + 0] + this.m[1 * 4 + x] * t.m[p * 4 + 1] + this.m[2 * 4 + x] * t.m[p * 4 + 2] + this.m[3 * 4 + x] * t.m[p * 4 + 3];
      return new W(l);
    }
    multVec2(t) {
      return new b(t.x * this.m[0] + t.y * this.m[4] + this.m[12], t.x * this.m[1] + t.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new b(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4], l = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new b(l, t / l);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4], l = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new b(t / l, l);
      } else
        return new b(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return at(this.m[1] > 0 ? Math.acos(this.m[0] / t) : -Math.acos(this.m[0] / t));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return at(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / t) : -Math.acos(this.m[4] / t)));
      } else
        return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new b(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new b(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t));
      } else
        return new b(0, 0);
    }
    invert() {
      let t = [], l = this.m[10] * this.m[15] - this.m[14] * this.m[11], p = this.m[9] * this.m[15] - this.m[13] * this.m[11], x = this.m[9] * this.m[14] - this.m[13] * this.m[10], M = this.m[8] * this.m[15] - this.m[12] * this.m[11], q = this.m[8] * this.m[14] - this.m[12] * this.m[10], k = this.m[8] * this.m[13] - this.m[12] * this.m[9], j = this.m[6] * this.m[15] - this.m[14] * this.m[7], Z = this.m[5] * this.m[15] - this.m[13] * this.m[7], ae = this.m[5] * this.m[14] - this.m[13] * this.m[6], U = this.m[4] * this.m[15] - this.m[12] * this.m[7], J = this.m[4] * this.m[14] - this.m[12] * this.m[6], d = this.m[5] * this.m[15] - this.m[13] * this.m[7], $ = this.m[4] * this.m[13] - this.m[12] * this.m[5], fe = this.m[6] * this.m[11] - this.m[10] * this.m[7], qe = this.m[5] * this.m[11] - this.m[9] * this.m[7], w = this.m[5] * this.m[10] - this.m[9] * this.m[6], ue = this.m[4] * this.m[11] - this.m[8] * this.m[7], me = this.m[4] * this.m[10] - this.m[8] * this.m[6], ce = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      t[0] = this.m[5] * l - this.m[6] * p + this.m[7] * x, t[4] = -(this.m[4] * l - this.m[6] * M + this.m[7] * q), t[8] = this.m[4] * p - this.m[5] * M + this.m[7] * k, t[12] = -(this.m[4] * x - this.m[5] * q + this.m[6] * k), t[1] = -(this.m[1] * l - this.m[2] * p + this.m[3] * x), t[5] = this.m[0] * l - this.m[2] * M + this.m[3] * q, t[9] = -(this.m[0] * p - this.m[1] * M + this.m[3] * k), t[13] = this.m[0] * x - this.m[1] * q + this.m[2] * k, t[2] = this.m[1] * j - this.m[2] * Z + this.m[3] * ae, t[6] = -(this.m[0] * j - this.m[2] * U + this.m[3] * J), t[10] = this.m[0] * d - this.m[1] * U + this.m[3] * $, t[14] = -(this.m[0] * ae - this.m[1] * J + this.m[2] * $), t[3] = -(this.m[1] * fe - this.m[2] * qe + this.m[3] * w), t[7] = this.m[0] * fe - this.m[2] * ue + this.m[3] * me, t[11] = -(this.m[0] * qe - this.m[1] * ue + this.m[3] * ce), t[15] = this.m[0] * w - this.m[1] * me + this.m[2] * ce;
      let le = this.m[0] * t[0] + this.m[1] * t[4] + this.m[2] * t[8] + this.m[3] * t[12];
      for (let be = 0; be < 4; be++)
        for (let G = 0; G < 4; G++)
          t[be * 4 + G] *= 1 / le;
      return new W(t);
    }
    clone() {
      return new W([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  o(W, "Mat4");
  function Sn(s, t, l, p = Math.sin) {
    return s + (p(l) + 1) / 2 * (t - s);
  }
  o(Sn, "wave");
  var di = 1103515245;
  var fi = 12345;
  var ar = 2147483648;
  var ot = class {
    seed;
    constructor(t) {
      this.seed = t;
    }
    gen() {
      return this.seed = (di * this.seed + fi) % ar, this.seed / ar;
    }
    genNumber(t, l) {
      return t + this.gen() * (l - t);
    }
    genVec2(t, l) {
      return new b(this.genNumber(t.x, l.x), this.genNumber(t.y, l.y));
    }
    genColor(t, l) {
      return new L(this.genNumber(t.r, l.r), this.genNumber(t.g, l.g), this.genNumber(t.b, l.b));
    }
    genAny(...t) {
      if (t.length === 0)
        return this.gen();
      if (t.length === 1) {
        if (typeof t[0] == "number")
          return this.genNumber(0, t[0]);
        if (t[0] instanceof b)
          return this.genVec2(C(0, 0), t[0]);
        if (t[0] instanceof L)
          return this.genColor(X(0, 0, 0), t[0]);
      } else if (t.length === 2) {
        if (typeof t[0] == "number" && typeof t[1] == "number")
          return this.genNumber(t[0], t[1]);
        if (t[0] instanceof b && t[1] instanceof b)
          return this.genVec2(t[0], t[1]);
        if (t[0] instanceof L && t[1] instanceof L)
          return this.genColor(t[0], t[1]);
      }
    }
  };
  o(ot, "RNG");
  var Cn = new ot(Date.now());
  function lr(s) {
    return s != null && (Cn.seed = s), Cn.seed;
  }
  o(lr, "randSeed");
  function yt(...s) {
    return Cn.genAny(...s);
  }
  o(yt, "rand");
  function Tn(...s) {
    return Math.floor(yt(...s));
  }
  o(Tn, "randi");
  function hr(s) {
    return yt() <= s;
  }
  o(hr, "chance");
  function dr(s) {
    return s[Tn(s.length)];
  }
  o(dr, "choose");
  function fr(s, t) {
    return s.pos.x + s.width > t.pos.x && s.pos.x < t.pos.x + t.width && s.pos.y + s.height > t.pos.y && s.pos.y < t.pos.y + t.height;
  }
  o(fr, "testRectRect");
  function mi(s, t) {
    if (s.p1.x === s.p2.x && s.p1.y === s.p2.y || t.p1.x === t.p2.x && t.p1.y === t.p2.y)
      return null;
    let l = (t.p2.y - t.p1.y) * (s.p2.x - s.p1.x) - (t.p2.x - t.p1.x) * (s.p2.y - s.p1.y);
    if (l === 0)
      return null;
    let p = ((t.p2.x - t.p1.x) * (s.p1.y - t.p1.y) - (t.p2.y - t.p1.y) * (s.p1.x - t.p1.x)) / l, x = ((s.p2.x - s.p1.x) * (s.p1.y - t.p1.y) - (s.p2.y - s.p1.y) * (s.p1.x - t.p1.x)) / l;
    return p < 0 || p > 1 || x < 0 || x > 1 ? null : p;
  }
  o(mi, "testLineLineT");
  function it(s, t) {
    let l = mi(s, t);
    return l ? C(s.p1.x + l * (s.p2.x - s.p1.x), s.p1.y + l * (s.p2.y - s.p1.y)) : null;
  }
  o(it, "testLineLine");
  function mr(s, t) {
    if (bt(s, t.p1) || bt(s, t.p2))
      return true;
    let l = s.points();
    return !!it(t, new Ee(l[0], l[1])) || !!it(t, new Ee(l[1], l[2])) || !!it(t, new Ee(l[2], l[3])) || !!it(t, new Ee(l[3], l[0]));
  }
  o(mr, "testRectLine");
  function bt(s, t) {
    return t.x > s.pos.x && t.x < s.pos.x + s.width && t.y > s.pos.y && t.y < s.pos.y + s.height;
  }
  o(bt, "testRectPoint");
  function pr(s, t) {
    let l = t.sub(s.p1), p = s.p2.sub(s.p1);
    if (Math.abs(l.cross(p)) > Number.EPSILON)
      return false;
    let x = l.dot(p) / p.dot(p);
    return x >= 0 && x <= 1;
  }
  o(pr, "testLinePoint");
  function An(s, t) {
    let l = s.p2.sub(s.p1), p = l.dot(l), x = s.p1.sub(t.center), M = 2 * l.dot(x), q = x.dot(x) - t.radius * t.radius, k = M * M - 4 * p * q;
    if (p <= Number.EPSILON || k < 0)
      return false;
    if (k == 0) {
      let j = -M / (2 * p);
      if (j >= 0 && j <= 1)
        return true;
    } else {
      let j = (-M + Math.sqrt(k)) / (2 * p), Z = (-M - Math.sqrt(k)) / (2 * p);
      if (j >= 0 && j <= 1 || Z >= 0 && Z <= 1)
        return true;
    }
    return gr(t, s.p1);
  }
  o(An, "testLineCircle");
  function gr(s, t) {
    return s.center.sdist(t) < s.radius * s.radius;
  }
  o(gr, "testCirclePoint");
  function wr(s, t) {
    let l = t.pts[t.pts.length - 1];
    for (let p of t.pts) {
      if (An(new Ee(l, p), s))
        return true;
      l = p;
    }
    return gr(s, t.pts[0]) ? true : On(t, s.center);
  }
  o(wr, "testCirclePolygon");
  function On(s, t) {
    let l = false, p = s.pts;
    for (let x = 0, M = p.length - 1; x < p.length; M = x++)
      p[x].y > t.y != p[M].y > t.y && t.x < (p[M].x - p[x].x) * (t.y - p[x].y) / (p[M].y - p[x].y) + p[x].x && (l = !l);
    return l;
  }
  o(On, "testPolygonPoint");
  var Ee = class {
    p1;
    p2;
    constructor(t, l) {
      this.p1 = t.clone(), this.p2 = l.clone();
    }
    transform(t) {
      return new Ee(t.multVec2(this.p1), t.multVec2(this.p2));
    }
    bbox() {
      return te.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new Ee(this.p1, this.p2);
    }
  };
  o(Ee, "Line");
  var te = class {
    pos;
    width;
    height;
    constructor(t, l, p) {
      this.pos = t.clone(), this.width = l, this.height = p;
    }
    static fromPoints(t, l) {
      return new te(t.clone(), l.x - t.x, l.y - t.y);
    }
    center() {
      return new b(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(t) {
      return new Re(this.points().map((l) => t.multVec2(l)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new te(this.pos.clone(), this.width, this.height);
    }
    distToPoint(t) {
      return Math.sqrt(this.sdistToPoint(t));
    }
    sdistToPoint(t) {
      let l = this.pos, p = this.pos.add(this.width, this.height), x = Math.max(l.x - t.x, 0, t.x - p.x), M = Math.max(l.y - t.y, 0, t.y - p.y);
      return x * x + M * M;
    }
  };
  o(te, "Rect");
  var ke = class {
    center;
    radius;
    constructor(t, l) {
      this.center = t.clone(), this.radius = l;
    }
    transform(t) {
      return new We(this.center, this.radius, this.radius).transform(t);
    }
    bbox() {
      return te.fromPoints(this.center.sub(C(this.radius)), this.center.add(C(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new ke(this.center, this.radius);
    }
  };
  o(ke, "Circle");
  var We = class {
    center;
    radiusX;
    radiusY;
    constructor(t, l, p) {
      this.center = t.clone(), this.radiusX = l, this.radiusY = p;
    }
    transform(t) {
      return new We(t.multVec2(this.center), t.m[0] * this.radiusX, t.m[5] * this.radiusY);
    }
    bbox() {
      return te.fromPoints(this.center.sub(C(this.radiusX, this.radiusY)), this.center.add(C(this.radiusX, this.radiusY)));
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new We(this.center, this.radiusX, this.radiusY);
    }
  };
  o(We, "Ellipse");
  var Re = class {
    pts;
    constructor(t) {
      if (t.length < 3)
        throw new Error("Polygons should have at least 3 vertices");
      this.pts = t;
    }
    transform(t) {
      return new Re(this.pts.map((l) => t.multVec2(l)));
    }
    bbox() {
      let t = C(Number.MAX_VALUE), l = C(-Number.MAX_VALUE);
      for (let p of this.pts)
        t.x = Math.min(t.x, p.x), l.x = Math.max(l.x, p.x), t.y = Math.min(t.y, p.y), l.y = Math.max(l.y, p.y);
      return te.fromPoints(t, l);
    }
    area() {
      let t = 0, l = this.pts.length;
      for (let p = 0; p < l; p++) {
        let x = this.pts[p], M = this.pts[(p + 1) % l];
        t += x.x * M.y * 0.5, t -= M.x * x.y * 0.5;
      }
      return Math.abs(t);
    }
    clone() {
      return new Re(this.pts.map((t) => t.clone()));
    }
  };
  o(Re, "Polygon");
  function vr(s, t) {
    let l = Number.MAX_VALUE, p = C(0);
    for (let x of [s, t])
      for (let M = 0; M < x.pts.length; M++) {
        let q = x.pts[M], j = x.pts[(M + 1) % x.pts.length].sub(q).normal().unit(), Z = Number.MAX_VALUE, ae = -Number.MAX_VALUE;
        for (let $ = 0; $ < s.pts.length; $++) {
          let fe = s.pts[$].dot(j);
          Z = Math.min(Z, fe), ae = Math.max(ae, fe);
        }
        let U = Number.MAX_VALUE, J = -Number.MAX_VALUE;
        for (let $ = 0; $ < t.pts.length; $++) {
          let fe = t.pts[$].dot(j);
          U = Math.min(U, fe), J = Math.max(J, fe);
        }
        let d = Math.min(ae, J) - Math.max(Z, U);
        if (d < 0)
          return null;
        if (d < Math.abs(l)) {
          let $ = J - Z, fe = U - ae;
          l = Math.abs($) < Math.abs(fe) ? $ : fe, p = j.scale(l);
        }
      }
    return p;
  }
  o(vr, "sat");
  var Qe = class extends Map {
    lastID;
    constructor(...t) {
      super(...t), this.lastID = 0;
    }
    push(t) {
      let l = this.lastID;
      return this.set(l, t), this.lastID++, l;
    }
    pushd(t) {
      let l = this.push(t);
      return () => this.delete(l);
    }
  };
  o(Qe, "IDList");
  var Ae = class {
    paused = false;
    cancel;
    constructor(t) {
      this.cancel = t;
    }
    static join(t) {
      let l = new Ae(() => t.forEach((p) => p.cancel()));
      return Object.defineProperty(l, "paused", {get: () => t[0].paused, set: (p) => t.forEach((x) => x.paused = p)}), l.paused = false, l;
    }
  };
  o(Ae, "EventController");
  var we = class {
    handlers = new Qe();
    add(t) {
      let l = this.handlers.pushd((...x) => {
        p.paused || t(...x);
      }), p = new Ae(l);
      return p;
    }
    addOnce(t) {
      let l = this.add((...p) => {
        l.cancel(), t(...p);
      });
      return l;
    }
    next() {
      return new Promise((t) => this.addOnce(t));
    }
    trigger(...t) {
      this.handlers.forEach((l) => l(...t));
    }
    numListeners() {
      return this.handlers.size;
    }
  };
  o(we, "Event");
  var Oe = class {
    handlers = {};
    on(t, l) {
      return this.handlers[t] || (this.handlers[t] = new we()), this.handlers[t].add(l);
    }
    onOnce(t, l) {
      let p = this.on(t, (...x) => {
        p.cancel(), l(...x);
      });
      return p;
    }
    next(t) {
      return new Promise((l) => {
        this.onOnce(t, (...p) => l(p[0]));
      });
    }
    trigger(t, ...l) {
      this.handlers[t] && this.handlers[t].trigger(...l);
    }
    remove(t) {
      delete this.handlers[t];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(t) {
      return this.handlers[t]?.numListeners() ?? 0;
    }
  };
  o(Oe, "EventHandler");
  function Pn(s, t) {
    let l = typeof s, p = typeof t;
    if (l !== p)
      return false;
    if (l === "object" && p === "object" && s !== null && t !== null) {
      let x = Object.keys(s), M = Object.keys(t);
      if (x.length !== M.length)
        return false;
      for (let q of x) {
        let k = s[q], j = t[q];
        if (!(typeof k == "function" && typeof j == "function") && !Pn(k, j))
          return false;
      }
      return true;
    }
    return s === t;
  }
  o(Pn, "deepEq");
  function pi(s) {
    let t = window.atob(s), l = t.length, p = new Uint8Array(l);
    for (let x = 0; x < l; x++)
      p[x] = t.charCodeAt(x);
    return p.buffer;
  }
  o(pi, "base64ToArrayBuffer");
  function br(s) {
    return pi(s.split(",")[1]);
  }
  o(br, "dataURLToArrayBuffer");
  function $t(s, t) {
    let l = document.createElement("a");
    l.href = t, l.download = s, l.click();
  }
  o($t, "download");
  function Rn(s, t) {
    $t(s, "data:text/plain;charset=utf-8," + t);
  }
  o(Rn, "downloadText");
  function yr(s, t) {
    Rn(s, JSON.stringify(t));
  }
  o(yr, "downloadJSON");
  function Mn(s, t) {
    let l = URL.createObjectURL(t);
    $t(s, l), URL.revokeObjectURL(l);
  }
  o(Mn, "downloadBlob");
  var Dn = o((s) => s.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var Ur = o((s) => s.split(".").pop(), "getExt");
  var xr = (() => {
    let s = 0;
    return () => s++;
  })();
  var Ut = class {
    _items;
    _compareFn;
    constructor(t = (l, p) => l < p) {
      this._compareFn = t, this._items = [];
    }
    insert(t) {
      this._items.push(t), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0)
        return null;
      let t = this._items[0], l = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = l, this.moveDown(0)), t;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(t) {
      for (; t > 0; ) {
        let l = Math.floor((t - 1) / 2);
        if (!this._compareFn(this._items[t], this._items[l]) && this._items[t] >= this._items[l])
          break;
        this.swap(t, l), t = l;
      }
    }
    moveDown(t) {
      for (; t < Math.floor(this._items.length / 2); ) {
        let l = 2 * t + 1;
        if (l < this._items.length - 1 && !this._compareFn(this._items[l], this._items[l + 1]) && ++l, this._compareFn(this._items[t], this._items[l]))
          break;
        this.swap(t, l), t = l;
      }
    }
    swap(t, l) {
      [this._items[t], this._items[l]] = [this._items[l], this._items[t]];
    }
    get length() {
      return this._items.length;
    }
  };
  o(Ut, "BinaryHeap");
  var Bn = {"Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {buttons: {"0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture"}, sticks: {left: {x: 0, y: 1}, right: {x: 2, y: 3}}}, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {buttons: {"0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "select", "10": "lstick", "16": "start"}, sticks: {left: {x: 0, y: 1}}}, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {buttons: {"0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "start", "10": "lstick", "16": "select"}, sticks: {left: {x: 0, y: 1}}}, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {buttons: {"0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture"}, sticks: {left: {x: 0, y: 1}, right: {x: 2, y: 3}}}, default: {buttons: {"0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home"}, sticks: {left: {x: 0, y: 1}, right: {x: 2, y: 3}}}};
  var ut = class {
    pressed = new Set([]);
    pressedRepeat = new Set([]);
    released = new Set([]);
    down = new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(t) {
      this.pressed.add(t), this.pressedRepeat.add(t), this.down.add(t);
    }
    pressRepeat(t) {
      this.pressedRepeat.add(t);
    }
    release(t) {
      this.down.delete(t), this.pressed.delete(t), this.released.add(t);
    }
  };
  o(ut, "ButtonState");
  var zt = class {
    dts = [];
    timer = 0;
    fps = 0;
    tick(t) {
      this.dts.push(t), this.timer += t, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((l, p) => l + p) / this.dts.length)), this.dts = []);
    }
  };
  o(zt, "FPSCounter");
  var Er = o((s) => {
    if (!s.canvas)
      throw new Error("Please provide a canvas");
    let t = {canvas: s.canvas, loopID: null, stopped: false, dt: 0, time: 0, realTime: 0, fpsCounter: new zt(), timeScale: 1, skipTime: false, numFrames: 0, paused: false, mousePos: new b(0), mouseDeltaPos: new b(0), keyState: new ut(), mouseState: new ut(), gamepadButtonState: new ut(), charInputted: [], isMouseMoved: false, lastWidth: s.canvas.offsetWidth, lastHeight: s.canvas.offsetHeight, events: new Oe()};
    function l() {
      return t.canvas;
    }
    o(l, "canvas");
    function p() {
      return t.dt * t.timeScale;
    }
    o(p, "dt");
    function x() {
      return t.time;
    }
    o(x, "time");
    function M() {
      return t.fpsCounter.fps;
    }
    o(M, "fps");
    function q() {
      return t.numFrames;
    }
    o(q, "numFrames");
    function k() {
      return t.canvas.toDataURL();
    }
    o(k, "screenshot");
    function j(f) {
      t.canvas.style.cursor = f;
    }
    o(j, "setCursor");
    function Z() {
      return t.canvas.style.cursor;
    }
    o(Z, "getCursor");
    function ae(f) {
      if (f)
        try {
          let E = t.canvas.requestPointerLock();
          E.catch && E.catch((T) => console.error(T));
        } catch (E) {
          console.error(E);
        }
      else
        document.exitPointerLock();
    }
    o(ae, "setCursorLocked");
    function U() {
      return !!document.pointerLockElement;
    }
    o(U, "isCursorLocked");
    function J(f) {
      f.requestFullscreen ? f.requestFullscreen() : f.webkitRequestFullscreen && f.webkitRequestFullscreen();
    }
    o(J, "enterFullscreen");
    function d() {
      document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    o(d, "exitFullscreen");
    function $() {
      return document.fullscreenElement || document.webkitFullscreenElement;
    }
    o($, "getFullscreenElement");
    function fe(f = true) {
      f ? J(t.canvas) : d();
    }
    o(fe, "setFullscreen");
    function qe() {
      return Boolean($());
    }
    o(qe, "isFullscreen");
    function w() {
      t.stopped = true;
      for (let f in he)
        t.canvas.removeEventListener(f, he[f]);
      for (let f in Ie)
        document.removeEventListener(f, Ie[f]);
      for (let f in Me)
        window.removeEventListener(f, Me[f]);
      Ft.disconnect();
    }
    o(w, "quit");
    function ue(f) {
      t.loopID !== null && cancelAnimationFrame(t.loopID);
      let E = o((T) => {
        if (t.stopped)
          return;
        if (t.paused || document.visibilityState !== "visible") {
          t.loopID = requestAnimationFrame(E);
          return;
        }
        let re = T / 1e3, z = re - t.realTime;
        t.realTime = re, t.skipTime || (t.dt = z, t.time += p(), t.fpsCounter.tick(t.dt)), t.skipTime = false, t.numFrames++, ln(), f(), Dt(), t.loopID = requestAnimationFrame(E);
      }, "frame");
      E(0);
    }
    o(ue, "run");
    function me() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    o(me, "isTouchScreen");
    function ce() {
      return t.mousePos.clone();
    }
    o(ce, "mousePos");
    function le() {
      return t.mouseDeltaPos.clone();
    }
    o(le, "mouseDeltaPos");
    function be(f = "left") {
      return t.mouseState.pressed.has(f);
    }
    o(be, "isMousePressed");
    function G(f = "left") {
      return t.mouseState.down.has(f);
    }
    o(G, "isMouseDown");
    function S(f = "left") {
      return t.mouseState.released.has(f);
    }
    o(S, "isMouseReleased");
    function lt() {
      return t.isMouseMoved;
    }
    o(lt, "isMouseMoved");
    function Be(f) {
      return f === void 0 ? t.keyState.pressed.size > 0 : t.keyState.pressed.has(f);
    }
    o(Be, "isKeyPressed");
    function Qt(f) {
      return f === void 0 ? t.keyState.pressedRepeat.size > 0 : t.keyState.pressedRepeat.has(f);
    }
    o(Qt, "isKeyPressedRepeat");
    function ht(f) {
      return f === void 0 ? t.keyState.down.size > 0 : t.keyState.down.has(f);
    }
    o(ht, "isKeyDown");
    function dt(f) {
      return f === void 0 ? t.keyState.released.size > 0 : t.keyState.released.has(f);
    }
    o(dt, "isKeyReleased");
    function Zt(f) {
      return f === void 0 ? t.gamepadButtonState.pressed.size > 0 : t.gamepadButtonState.pressed.has(f);
    }
    o(Zt, "isGamepadButtonPressed");
    function en(f) {
      return f === void 0 ? t.gamepadButtonState.down.size > 0 : t.gamepadButtonState.down.has(f);
    }
    o(en, "isGamepadButtonDown");
    function Ze(f) {
      return f === void 0 ? t.gamepadButtonState.released.size > 0 : t.gamepadButtonState.released.has(f);
    }
    o(Ze, "isGamepadButtonReleased");
    let $e = o((f, E) => {
      if (typeof f == "function")
        return t.events.on("keyDown", f);
      if (typeof f == "string" && typeof E == "function")
        return t.events.on("keyDown", (T) => T === f && E(f));
    }, "onKeyDown"), tn = o((f, E) => {
      if (typeof f == "function")
        return t.events.on("keyPress", f);
      if (typeof f == "string" && typeof E == "function")
        return t.events.on("keyPress", (T) => T === f && E(f));
    }, "onKeyPress"), nn = o((f, E) => {
      if (typeof f == "function")
        return t.events.on("keyPressRepeat", f);
      if (typeof f == "string" && typeof E == "function")
        return t.events.on("keyPressRepeat", (T) => T === f && E(f));
    }, "onKeyPressRepeat"), Et = o((f, E) => {
      if (typeof f == "function")
        return t.events.on("keyRelease", f);
      if (typeof f == "string" && typeof E == "function")
        return t.events.on("keyRelease", (T) => T === f && E(f));
    }, "onKeyRelease");
    function Ct(f, E) {
      return typeof f == "function" ? t.events.on("mouseDown", (T) => f(T)) : t.events.on("mouseDown", (T) => T === f && E(T));
    }
    o(Ct, "onMouseDown");
    function St(f, E) {
      return typeof f == "function" ? t.events.on("mousePress", (T) => f(T)) : t.events.on("mousePress", (T) => T === f && E(T));
    }
    o(St, "onMousePress");
    function ze(f, E) {
      return typeof f == "function" ? t.events.on("mouseRelease", (T) => f(T)) : t.events.on("mouseRelease", (T) => T === f && E(T));
    }
    o(ze, "onMouseRelease");
    function rn(f) {
      return t.events.on("mouseMove", () => f(ce(), le()));
    }
    o(rn, "onMouseMove");
    function sn(f) {
      return t.events.on("charInput", f);
    }
    o(sn, "onCharInput");
    function on(f) {
      return t.events.on("touchStart", f);
    }
    o(on, "onTouchStart");
    function an(f) {
      return t.events.on("touchMove", f);
    }
    o(an, "onTouchMove");
    function un(f) {
      return t.events.on("touchEnd", f);
    }
    o(un, "onTouchEnd");
    function cn(f) {
      return t.events.on("scroll", f);
    }
    o(cn, "onScroll");
    function Tt(f, E) {
      if (typeof f == "function")
        return t.events.on("gamepadButtonDown", f);
      if (typeof f == "string" && typeof E == "function")
        return t.events.on("gamepadButtonDown", (T) => T === f && E(f));
    }
    o(Tt, "onGamepadButtonDown");
    function At(f, E) {
      if (typeof f == "function")
        return t.events.on("gamepadButtonPress", f);
      if (typeof f == "string" && typeof E == "function")
        return t.events.on("gamepadButtonPress", (T) => T === f && E(f));
    }
    o(At, "onGamepadButtonPress");
    function Ot(f, E) {
      if (typeof f == "function")
        return t.events.on("gamepadButtonRelease", f);
      if (typeof f == "string" && typeof E == "function")
        return t.events.on("gamepadButtonRelease", (T) => T === f && E(f));
    }
    o(Ot, "onGamepadButtonRelease");
    function Pt(f, E) {
      return t.events.on("gamepadStick", (T, re) => T === f && E(re));
    }
    o(Pt, "onGamepadStick");
    function Rt(f) {
      return new b(0);
    }
    o(Rt, "getGamepadStick");
    function Mt() {
      return [...t.charInputted];
    }
    o(Mt, "charInputted");
    function In() {
      return [];
    }
    o(In, "getGamepads");
    function ln() {
      t.events.trigger("input"), t.keyState.down.forEach((f) => t.events.trigger("keyDown", f)), t.mouseState.down.forEach((f) => t.events.trigger("mouseDown", f)), hn();
    }
    o(ln, "processInput");
    function Dt() {
      t.keyState.update(), t.mouseState.update(), t.gamepadButtonState.update(), t.charInputted = [], t.isMouseMoved = false;
    }
    o(Dt, "resetInput");
    function hn() {
      for (let f of navigator.getGamepads()) {
        if (!f)
          continue;
        let T = (s.gamepads ?? {})[f.id] ?? Bn[f.id] ?? Bn.default;
        for (let re = 0; re < f.buttons.length; re++)
          f.buttons[re].pressed ? (t.gamepadButtonState.down.has(T.buttons[re]) || (t.gamepadButtonState.press(T.buttons[re]), t.events.trigger("gamepadButtonPress", T.buttons[re])), t.events.trigger("gamepadButtonDown", T.buttons[re])) : t.gamepadButtonState.down.has(T.buttons[re]) && (t.gamepadButtonState.release(T.buttons[re]), t.events.trigger("gamepadButtonRelease", T.buttons[re]));
        for (let re in T.sticks) {
          let z = T.sticks[re], Ve = f.axes[z.x], je = f.axes[z.y];
          t.events.trigger("gamepadStick", re, new b(Ve, je));
        }
      }
    }
    o(hn, "processGamepad");
    let he = {}, Ie = {}, Me = {};
    he.mousemove = (f) => {
      let E = new b(f.offsetX, f.offsetY), T = new b(f.movementX, f.movementY);
      t.events.onOnce("input", () => {
        t.isMouseMoved = true, t.mousePos = E, t.mouseDeltaPos = T, t.events.trigger("mouseMove");
      });
    };
    let Bt = ["left", "middle", "right", "back", "forward"];
    he.mousedown = (f) => {
      t.events.onOnce("input", () => {
        let E = Bt[f.button];
        E && (t.mouseState.press(E), t.events.trigger("mousePress", E));
      });
    }, he.mouseup = (f) => {
      t.events.onOnce("input", () => {
        let E = Bt[f.button];
        E && (t.mouseState.release(E), t.events.trigger("mouseRelease", E));
      });
    };
    let ft = new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]), Ce = {ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space"};
    he.keydown = (f) => {
      ft.has(f.key) && f.preventDefault(), t.events.onOnce("input", () => {
        let E = Ce[f.key] || f.key.toLowerCase();
        E.length === 1 ? (t.events.trigger("charInput", E), t.charInputted.push(E)) : E === "space" && (t.events.trigger("charInput", " "), t.charInputted.push(" ")), f.repeat ? (t.keyState.pressRepeat(E), t.events.trigger("keyPressRepeat", E)) : (t.keyState.press(E), t.events.trigger("keyPressRepeat", E), t.events.trigger("keyPress", E));
      });
    }, he.keyup = (f) => {
      t.events.onOnce("input", () => {
        let E = Ce[f.key] || f.key.toLowerCase();
        t.keyState.release(E), t.events.trigger("keyRelease", E);
      });
    }, he.touchstart = (f) => {
      f.preventDefault(), t.events.onOnce("input", () => {
        let E = [...f.changedTouches];
        E.forEach((T) => {
          t.events.trigger("touchStart", new b(T.clientX, T.clientY), T);
        }), s.touchToMouse !== false && (t.mousePos = new b(E[0].clientX, E[0].clientY), t.mouseState.press("left"), t.events.trigger("mousePress", "left"));
      });
    }, he.touchmove = (f) => {
      f.preventDefault(), t.events.onOnce("input", () => {
        let E = [...f.changedTouches];
        E.forEach((T) => {
          t.events.trigger("touchMove", new b(T.clientX, T.clientY), T);
        }), s.touchToMouse !== false && (t.mousePos = new b(E[0].clientX, E[0].clientY), t.events.trigger("mouseMove"));
      });
    }, he.touchend = (f) => {
      t.events.onOnce("input", () => {
        let E = [...f.changedTouches];
        E.forEach((T) => {
          t.events.trigger("touchEnd", new b(T.clientX, T.clientY), T);
        }), s.touchToMouse !== false && (t.mousePos = new b(E[0].clientX, E[0].clientY), t.mouseState.release("left"), t.events.trigger("mouseRelease", "left"));
      });
    }, he.touchcancel = (f) => {
      t.events.onOnce("input", () => {
        let E = [...f.changedTouches];
        E.forEach((T) => {
          t.events.trigger("touchEnd", new b(T.clientX, T.clientY), T);
        }), s.touchToMouse !== false && (t.mousePos = new b(E[0].clientX, E[0].clientY), t.mouseState.release("left"), t.events.trigger("mouseRelease", "left"));
      });
    }, he.wheel = (f) => {
      f.preventDefault(), t.events.onOnce("input", () => {
        t.events.trigger("scroll", new b(f.deltaX, f.deltaY));
      });
    }, he.contextmenu = (f) => f.preventDefault(), Ie.visibilitychange = () => {
      document.visibilityState === "visible" && (t.skipTime = true);
    }, Me.gamepadconnected = (f) => {
      t.events.onOnce("input", () => {
        t.events.trigger("gamepadConnect", f.gamepad);
      });
    }, Me.gamepaddisconnected = (f) => {
      t.events.onOnce("input", () => {
        t.events.trigger("gamepadDisconnect", f.gamepad);
      });
    };
    for (let f in he)
      t.canvas.addEventListener(f, he[f]);
    for (let f in Ie)
      document.addEventListener(f, Ie[f]);
    for (let f in Me)
      window.addEventListener(f, Me[f]);
    let Ft = new ResizeObserver((f) => {
      for (let E of f)
        if (E.target === t.canvas) {
          if (t.lastWidth === t.canvas.offsetWidth && t.lastHeight === t.canvas.offsetHeight)
            return;
          t.lastWidth = t.canvas.offsetWidth, t.lastHeight = t.canvas.offsetHeight, t.events.onOnce("input", () => {
            t.events.trigger("resize");
          });
        }
    });
    return Ft.observe(t.canvas), {dt: p, time: x, run: ue, canvas: l, fps: M, numFrames: q, quit: w, setFullscreen: fe, isFullscreen: qe, setCursor: j, screenshot: k, getCursor: Z, setCursorLocked: ae, isCursorLocked: U, isTouchScreen: me, mousePos: ce, mouseDeltaPos: le, isKeyDown: ht, isKeyPressed: Be, isKeyPressedRepeat: Qt, isKeyReleased: dt, isMouseDown: G, isMousePressed: be, isMouseReleased: S, isMouseMoved: lt, isGamepadButtonPressed: Zt, isGamepadButtonDown: en, isGamepadButtonReleased: Ze, getGamepadStick: Rt, charInputted: Mt, onKeyDown: $e, onKeyPress: tn, onKeyPressRepeat: nn, onKeyRelease: Et, onMouseDown: Ct, onMousePress: St, onMouseRelease: ze, onMouseMove: rn, onCharInput: sn, onTouchStart: on, onTouchMove: an, onTouchEnd: un, onScroll: cn, onGamepadButtonDown: Tt, onGamepadButtonPress: At, onGamepadButtonRelease: Ot, onGamepadStick: Pt, get paused() {
      return t.paused;
    }, set paused(f) {
      t.paused = f;
    }};
  }, "default");
  var Yt = 2.5949095;
  var Cr = 1.70158 + 1;
  var Sr = 2 * Math.PI / 3;
  var Tr = 2 * Math.PI / 4.5;
  var Kt = {linear: (s) => s, easeInSine: (s) => 1 - Math.cos(s * Math.PI / 2), easeOutSine: (s) => Math.sin(s * Math.PI / 2), easeInOutSine: (s) => -(Math.cos(Math.PI * s) - 1) / 2, easeInQuad: (s) => s * s, easeOutQuad: (s) => 1 - (1 - s) * (1 - s), easeInOutQuad: (s) => s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2, easeInCubic: (s) => s * s * s, easeOutCubic: (s) => 1 - Math.pow(1 - s, 3), easeInOutCubic: (s) => s < 0.5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2, easeInQuart: (s) => s * s * s * s, easeOutQuart: (s) => 1 - Math.pow(1 - s, 4), easeInOutQuart: (s) => s < 0.5 ? 8 * s * s * s * s : 1 - Math.pow(-2 * s + 2, 4) / 2, easeInQuint: (s) => s * s * s * s * s, easeOutQuint: (s) => 1 - Math.pow(1 - s, 5), easeInOutQuint: (s) => s < 0.5 ? 16 * s * s * s * s * s : 1 - Math.pow(-2 * s + 2, 5) / 2, easeInExpo: (s) => s === 0 ? 0 : Math.pow(2, 10 * s - 10), easeOutExpo: (s) => s === 1 ? 1 : 1 - Math.pow(2, -10 * s), easeInOutExpo: (s) => s === 0 ? 0 : s === 1 ? 1 : s < 0.5 ? Math.pow(2, 20 * s - 10) / 2 : (2 - Math.pow(2, -20 * s + 10)) / 2, easeInCirc: (s) => 1 - Math.sqrt(1 - Math.pow(s, 2)), easeOutCirc: (s) => Math.sqrt(1 - Math.pow(s - 1, 2)), easeInOutCirc: (s) => s < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * s, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * s + 2, 2)) + 1) / 2, easeInBack: (s) => Cr * s * s * s - 1.70158 * s * s, easeOutBack: (s) => 1 + Cr * Math.pow(s - 1, 3) + 1.70158 * Math.pow(s - 1, 2), easeInOutBack: (s) => s < 0.5 ? Math.pow(2 * s, 2) * ((Yt + 1) * 2 * s - Yt) / 2 : (Math.pow(2 * s - 2, 2) * ((Yt + 1) * (s * 2 - 2) + Yt) + 2) / 2, easeInElastic: (s) => s === 0 ? 0 : s === 1 ? 1 : -Math.pow(2, 10 * s - 10) * Math.sin((s * 10 - 10.75) * Sr), easeOutElastic: (s) => s === 0 ? 0 : s === 1 ? 1 : Math.pow(2, -10 * s) * Math.sin((s * 10 - 0.75) * Sr) + 1, easeInOutElastic: (s) => s === 0 ? 0 : s === 1 ? 1 : s < 0.5 ? -(Math.pow(2, 20 * s - 10) * Math.sin((20 * s - 11.125) * Tr)) / 2 : Math.pow(2, -20 * s + 10) * Math.sin((20 * s - 11.125) * Tr) / 2 + 1, easeInBounce: (s) => 1 - Kt.easeOutBounce(1 - s), easeOutBounce: (s) => s < 1 / 2.75 ? 7.5625 * s * s : s < 2 / 2.75 ? 7.5625 * (s -= 1.5 / 2.75) * s + 0.75 : s < 2.5 / 2.75 ? 7.5625 * (s -= 2.25 / 2.75) * s + 0.9375 : 7.5625 * (s -= 2.625 / 2.75) * s + 0.984375, easeInOutBounce: (s) => s < 0.5 ? (1 - Kt.easeOutBounce(1 - 2 * s)) / 2 : (1 + Kt.easeOutBounce(2 * s - 1)) / 2};
  var xt = Kt;
  var He = class {
    time;
    action;
    finished = false;
    paused = false;
    constructor(t, l) {
      this.time = t, this.action = l;
    }
    tick(t) {
      return this.finished || this.paused ? false : (this.time -= t, this.time <= 0 ? (this.action(), this.finished = true, this.time = 0, true) : false);
    }
    reset(t) {
      this.time = t, this.finished = false;
    }
  };
  o(He, "Timer");
  var Ar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var vi = {};
  li(vi, {default: () => Fn});
  var Fn = hi("SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPj4+Pj4+TExMTExZWVlZWVlnZ2dnZ3V1dXV1dYODg4ODkZGRkZGRn5+fn5+frKysrKy6urq6urrIyMjIyNbW1tbW1uTk5OTk8vLy8vLy//////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/7kGQAAANUMEoFPeACNQV40KEYABEY41g5vAAA9RjpZxRwAImU+W8eshaFpAQgALAAYALATx/nYDYCMJ0HITQYYA7AH4c7MoGsnCMU5pnW+OQnBcDrQ9Xx7w37/D+PimYavV8elKUpT5fqx5VjV6vZ38eJR48eRKa9KUp7v396UgPHkQwMAAAAAA//8MAOp39CECAAhlIEEIIECBAgTT1oj///tEQYT0wgEIYxgDC09aIiE7u7u7uIiIz+LtoIQGE/+XAGYLjpTAIOGYYy0ZACgDgSNFxC7YYiINocwERjAEDhIy0mRoGwAE7lOTBsGhj1qrXNCU9GrgwSPr80jj0dIpT9DRUNHKJbRxiWSiifVHuD2b0EbjLkOUzSXztP3uE1JpHzV6NPq+f3P5T0/f/lNH7lWTavQ5Xz1yLVe653///qf93B7f/vMdaKJAAJAMAIwIMAHMpzDkoYwD8CR717zVb8/p54P3MikXGCEWhQOEAOAdP6v8b8oNL/EzdnROC8Zo+z+71O8VVAGIKFEglKbidkoLam0mAFiwo0ZoVExf/7kmQLgAQyZFxvPWAENcVKXeK0ABAk2WFMaSNIzBMptBYfArbkZgpWjEQpcmjxQoG2qREWQcvpzuuIm29THt3ElhDNlrXV///XTGbm7Kbx0ymcRX///x7GVvquf5vk/dPs0Wi5Td1vggDxqbNII4bAPTU3Ix5h9FJTe7zv1LHG/uPsPrvth0ejchVzVT3giirs6sQAACgQAAIAdaXbRAYra/2t0//3HwqLKIlBOJhOg4BzAOkt+MOL6H8nlNvKyi3rOnqP//zf6AATwBAKIcHKixxwjl1TjDVIrvTqdmKQOFQBUBDwZ1EhHlDEGEVyGQWBAHrcJgRSXYbkvHK/8/6rbYjs4Qj0C8mRy2hwRv/82opGT55fROgRoBTjanaiQiMRHUu1/P3V9yGFffaVv78U1/6l/kpo0cz73vuSv/9GeaqDVRA5bWdHRKQKIEAAAAoIktKeEmdQFKN5sguv/ZSC0oxCAR7CzcJgEsd8cA0M/x0tzv15E7//5L5KCqoIAAmBFIKM1UxYtMMFjLKESTE8lhaelUyCBYeA2IN4rK1iDt//+5JkEgAkZzlVq29D8DJDWo0YLLARwPFZrL0PyLsUazTAlpI+hKSx01VSOfbjXg0iW9/jVPDleLJ15QQA4Okdc5ByMDFIeuCCE5CvevwBGH8YibiX9FtaIIgUikF42wrZw6ZJ6WlHrA+Ki5++NNMeYH1lEkwwJAIJB4ugVFguXFc20Vd/FLlvq1GSiSwAFABABABA47k6BFeNvxEQZO9v3L1IE4iEVElfrXmEmlyWIyGslFA55gH/sW7////o9AAFIBIIAAIUMzYTTNkgsAmYObfwQyzplrOmYvq0BKCKNN+nUTbvD7cJzvHxrEWG5QqvP8U1vFx6CwE8NoRc2ADBeEb/HoXh60N7ST8nw9QiiGoYvf/r6GtC9+vLwXHjaSkIp3iupC5+Nii81Zhu85pNYbFvrf+UFThDOYYY26off+W6b//73GTiN9xDfl0AAwBAiMBO8qsDBPOZtuT/dTbjVVbY/KSGH6ppHwKv/6X+s8gUCN/lODzv////GQAGAMQAADlXAUCBJiY0wFQZusYQOaQzaTwDBTcx0IvVp8m7uxKp//uSZBMCBHRI1eNPLHAyxNqWGeoYUIEnWYyxD8DUFSn0l6iojcd+oEOkzV6uWqyHNzjqmv+7V5xGUfY9yEmbziTzjRscm9OqFQp1PKFrqu3PX/7YuGtDU6bt0OUTpv38rdc+37dVDQLKUchaJ853E9edNDGqWwsYz1VoiSStEJtZvw6+sNqFWqaIXJjQCGAAGWAYVwmag/x3BRJw1wYF7IzVqDcNzn85d//FzK7IgwbQwccLoB4AsF8Nj/1ESRUAAVJwAFh0YOFEhmSJEHKQRDyhszgLUpHIgFrb5cySFg5jv10ImlYuvaaGBItfXqnNPmic+XNkmb5fW49vdhq97nQMQyGIlM2v8oQSrxKSxE4F1WqrduqvuJCRof1R7Gsre9KszUVF1/t3PzH2tnp+iSUG3rDwGNcDzxCGA8atuQF0paZAAkAhAQAEAC240yJV+nJgUrqq8axAYtVpYjZyFGb13/17jwiClQDaCdytZpyHHf1R/EG/+lUAgAAAChhmJvioVGGBCFgqdpsGAkUUrbTstwTCJgLQpFIsELW7t/68Iv/7kmQUgAQ9NFO9aeAAPAU6RKwUABClY2e5hoARGpDvPydCAsY8WO10fSvUOnfT98+n/l/6/+hxslhQ1DEOaevNKGocvIYba8WJpaP/15pX0NQ1DUNn/////k6lPp/N61rBi8RJFfERV3IgrqDsJA64sjCoKxDDQ9xEcWDpMBDwVFDIAEIAAzryxsjGi4q/oWpixKjhklAF4pUrDPjFhFVupDFZ/t/t0YPAygUBhADPR/KLCKJ8h2Oxhpxz/zNRAAFl0MAZLAYEAiVbEiz36LSgZ5QoQVat69KNy8FyM5Z80ACHAzgnISEkxUSJIDyBSwi5KF4mjBl4xJdbrG9ComLrL8YATiodhQKCkj6ROdyg1y5XmZlvMVmpJzYppJDwLi/Lp9vT3TfmimOGpuezi2U/9FNav0zX9Oja2r//8+hvuihuQAAMAVmqFgAgCcuboAEAAAUcqy8ca0BHBmwbFkED0CNA1YYDPkhcQrRJxcY3BzfxxltAz9vX62Xl3plAzWmRO+FkZyH///1qAAEjQBAACUpgU5o2AIBmFBGMamrGg0b/+5JkC4ADxyLWb2ngAEEkGofsoACP7U1JLaxTkOqFaKhspGgnW3SGC56ZgUJGCRnLOmIJAkuNBgvwU4Ocf8CJK9UsafH9/Frj///365XSoME+DZMw5UNjrMbVoeIj9EL91IuQ5KHyl5V2LCpdIdESgafOHxVGkAlkHuakmix/gN8+BP/sKguLAAoAtUjtvaoeEADwr3OK11E4KBlojgeQNQBJ4MvCAd/4t/xMMzeLhQGQ1//6tQu5BaBOGCT6U4aafvXZ//4iAPAAAAbLkgIlQmMSLA2H1CVNAlWwyVvKIQIxOSK1NWxs4MBUATlKrAkIMPAjCAdS6MVFzuURWa/+/qQWEGsA6EEpiBEJb9Q21lAHoBoD0B6aAPhyt+bG3muoXIN3RLadXxUfr/ohjGFF/p97eqNI5noKAqYLNPpUTDSI9/TmA6B+YAAADgA0Y4lxTW1SQfOQuDDDI0KTTuIrF5qoJrUFhUFAsg+AT2hbkaRZYGIjBKVDIa5VgNN/9P/rCDsBJbYJRKpCA1ArAkigIeYY61AjE+jubyiZFZ3+L789//uSZBCABHVj2entNmw1JXokLycYEFTFVa0wz4DYjKs08J2Q+r4n3lgbWaaMwMLEjFW88F39brqPF83cv1mCSJeY3Q2uiQxhBJxCBeR1D2LQRsYQcZUTzdNll8+OwZBsIwSgl45ymaHX603Mz7JmZuvt71GDTN66zev/+cLn/b5imV8pAHkg61FIJchBSG+zycgAZgADD6F1iQQRXRWmWS6bDIIgyBCZEcdl/KgXGmVKFv/vl8ry/5bLypf//U5jhYDhL9X/pAA0AKBIAAKgGtGXGGWJgEoF2JNsHlKfSKLRhGBAgIuWZKIJCFpF1VBhkB+EfzEyMUJdWuMrEZoPZ5BfF3/Nu62riIdjoO4AAKD2sTrDmpZZaYysf/810TitAVvn9xtFucieiaEy54YqiIO6RqkGAm5wVO0bFB0sDTdNxYGekKktR4KAAfAwUIgI8Ci6aXgtwbhPWAC+CKExAFydNtYGXNZoQjUsXv/9vKjgmdwieb+h7kHvPoc//0FaCACAATKFC4Y9ammklidbaiJNPBhGWTNhFSgdtalK12lpl//7kmQRAFN2NFI7TBvwNKNaTRsFGBWdfV2tPNcYvBHpgPKJsc8IUcTCxY3HSvUVNTWe/Z3YWlrJ0yrNRUiT19aprA7E+mPP+ZmC3/CsheOJXhc/9VJb3UZnphUBcqZUZQth1i3XqtPYu2Sy1s8DV9ZYACAAASAAHgFkQcOqgB5utFHFh3kSi4USs0yk4iOClREmjvdG+upaiLcRA6/9QGbOfxF/8sEAQAVG0G07YFMihKR4EXJCkRdX9isueLqUMRAQdhDZmv3KeR0nPqRVrZmSIXDt+BBSR7qqbKQcB98W9qiMb55preHIStxFWPE4lAyI+BKz2iSxonpvMR5DgKxTH6vGGXAbYCaAnJUW4W07EesQqbfqdbo4qNnPxSpn1H8eahszc/y9//dn1V7D/OYpn1szQKAPXTMlO/rO//u7JriJXbld7aP33v6RXYg/COIDzTWkTspg6Ay1YaDSwKxrP/LfIikHjmO871POf/kEAseAgoPEi9/0ZziNwfxVKy9qAEGEEAAq1EcOamDEGHAA0iao8k31rz2MiLNEik6VQ37/+5JkEAgEYU5WU0M3MDjDe0o9IjiOzSVM7aCzEM2GqXD8pFB0zxMcHCQNHtZD+R+pMWZxOJ/otEZTvVN/MeU12xTVcL+f2YaiNJTVoPd6SvzEnKel5GXOzEaazgdChnP2jOAwpfyRpVlQwoJBwpN1L1DL////6TVWcoepf7CVWrpEWiym5lR5U0BSMlxQC4qByOyQIAEuJfIriWixDqRgMfVZWuvRowjR9BzP5lZlT/+YG50CsSBG////////liXDQVMxEaBkbzKAAACnDIAstY7iK7gGSF7SIDexaTtPOHABk9YcmJEACmo50pgWal22etroBpYoVqtU6OPqvlf0c4QCAfLk9P/FJs4KCQMf6ECZyA6BwqqyJ0rMYj56k1/UlTIx1V3Rt5NF71D4qlptDC8VMgQVHFDlQnDFi06qQgKQAAIK4TxxJGFGYJuZNGXRdpq7IW/DYpPIQRFJLAc+qn1E0XYdOkQVJT+z8Lvff//8vbKAWTIBBUUdM6cOhlDry7x4dAkJXIBhbO3HSMMMGBQ9K9/JNfu09PjTO64wYEcR//uSZBeABP5g11NPRVwzQ4r8PMJVj7j9UU2wUwDPjeq0Z5w675D9+uDdL2QsuIry2lZtwn/pJYyRRjANEOQxNWw8mU7Tq+vueV7JrX/Pg7VIkEuZT5dwd85MVoq5lpStNICkBAcFR88//58KO8Zjt2PIGxWl1cVfXeNGH18SReNT//hYliWtQuNluxyxONbm4U+lpkAgpyE7yAIYUjIaqHmARJ0GQTtmH60xdwFp/u253XBCxD0f/lBcguCALn//Y5nqEv//1h4BAAwgAA5gcHmpIplgeW9fAOM6RFZUywrsGAiRmKkanQnCFBjYoPDS7bjwtPTkVI8D/P8VVLcTUz65n7PW2s3tNYHgEul4tBaIz0A9RgJAyAMI4/i0fpQKjhX9S+qIa0vmc4CZit/0/3UTDGeKNpkk0nu2rUE2ag8WErhE/kgAiQCJKQEYBA5Wn6CxHoIUh6dQ46nLIuwFk4S/LaDQxXu7Yf/pf//lwJB0S/Ff/4C///EiBEiAAAIAMnpngiIABAdMpKigkXaUwhLEGvpiofmXW57h2XAZO3CMRv/7kmQUAEOHQlHraRTQMkQp6GWFZBTVU1lNPTPYyIyocYeUoNgLBWAs1jPkTv/tXBaeZ/tbD/nAGP8/xT0SNEi5zof0KIVEzVe9r5lZOol7kyaXMYS4J/ZS3djp//UaeVyR0mUMlTgfz8XqMzIEgAQQ6UNQ1DSE0/C16OvyaocF4ijAGFci0FSYqCUSaWs6t9F6/699DKvMgMoK1//kSbvxtyBN27I7mdXgNMAW75sRU1UwUHYG5axI2tFIFpkgx7nnK+1JmRKjqeAd5Ph0QAL4QAnirmiPlg0yBDlrb/d3ngtA65rb999+8vdDCfnJuJAYIl285zklpVbrKpk1PEzrOY9NZUgyz6OiOsKt5qG/g2ibxSZ+/eTI/NB8n4ev//n2nIw85GAdwuJL7kYnnAbpcf1RBKH6b2U4RWP8dmWH5snsAFYwADBgAopKdzFJq4Jlmotloh/m4QpTSvJRE3nYZHephoqBhVf+P7vQ9BPlwZCP+3//+hdy5uUwS3LDEgQx4cdIgvDEBR1YqymCsSbKzRy2aQmSv+AAcAgAkvzPfuX/+5JkFQAj6VFX00Zr5DllOhhgpn4MmSs+zSRRiO8U5tWklYgSLKfs+Xheb/+6WaAQCKTztNeJ382MUltZNnjSJoFrCqB6C4mFcwJpJD4Oc8dLDXMTh9k1/rmTopfzqv9AvHWfOuZJlEvHSVMjyjpkVucKSzxJVQBgAAIo8DGqRdYCXPckFYg+dH9A/qUyljrtpxH9RJX/Z3Vv6uFkPg4M2jf3CL09QrwOrMt69n//8UFEAAMHWdhg1CcjyVBwiArOYlDL5NPY6x8ZLFBCGi6SVTKX5nqdSEFjebnv2zHdt0dj6xvORsSFzwqRNTJSZIrrlpXcURNL9WW7krBgr5jPMaGcvJ5v0N1s19CV7+7fvQfjySX2QECWUgKgeJCIif4WRBZ/6archpDkzE7oWctK3zEHP9Smeai8oeHkM6AK7pGjtOgeFv40ugqNd+Iv///uAZAMgAAAUeSWhLPpdwk3iXpBw43hOVIp1gliUOSaeZcZeZhLAH9TtD56wUpBduzLF5v5qViTH6o+I0+8Z1asaLgKVAohlpB72DgAQBQxEd3g//uSZCiAA6k0UdMPQfA+xcnBYON8E3WDVU0w1ZjPDSmo8IniHAFDNnkXF3B94gicH5d8MFw+IHZwufxOf/8gsHw+XrD4Jn8T4RAyQiABNBQg/3giEWuZ42mVFB3kkXNjhqBg1CghEUbN3/7/KBhyqNueef/MIDBClP3YRnKLiIlEFzf//0g+4zKpRIKTpqQgUtnHGFw6RSLN421iGcYapqFxny/capK9r9v+2BSy/RU1yZxa2eGaWK07ijfcxeiO3iuHJvjbXzts+Ny+XyFnsne1h0qG4mAaN6xRGaLVxKPlrri0Bg9oXGyxcw8JRBPkUzC8v451vVd9liSX85JMrmkVNwxOCwUg298////7ks//L409/hwMRIozKiIckXtjzDaAMTBcAACAwLGargPSEgEJZN/EFjfF/VKgaMYKMbwtf/T0UCGGfjfOAZ2frCigYdwh/+sGlQBxhCAAAUHkDPqOdmmUdAVYl3IhrEfR8qZFjLYEPOyzVGvm6lNUJCk2PNazwFxaijk+ZEaiTehoJGuDh6zN/EVP8BCLD/88BoY7Xv/7kmQlgBNmMtNTL0FwOGZJ/WHiKAyhJU+soE3A3JnmAa2oaCIru/+RrEHMTphxQ0X/LzoVy4gKhYl6ZUlklW7CLRVoYmgABwCRMAAMA/poCiEEYLsBVodWcVZ18+CcAfH165U4Xgh7/X1/BAQF6GN/BwQ/+D9S9P6wII//CoANYFYCBAKlGQDKhVjjylKARw2mPAtp8JjcQHggQswVsOEKsF6AIBWvmpIFdSZvRVv/LHWEy0+txMxu+VK9gEqG5pWf6GNGU4UBVkfd+bsj/6lZE0fkOpAqAOvyUO9oo+IiEtcLKOGzhhSGa4MYINHWoQsFr8zzmow0tRILkqz5/+vFxl/oZX/+qGW//xiLjR3xcGn//0QLkTQJh1UA8MAQAEXC/YxODKTDUEhrASs1512GRp+dRFFdTWIRaOXrve1eNjTNpreqQYrC9NBlQc1f8YO2po8bnH6qffuRvU7taiNF3baokE0YpmjRCHRclWBb9NCHKHpERwHRG3pqgXklq4sBpLjGvmekg8Y7SjM1FZopIM8IhB6dtMr8aKsdovh4FW//+5JkQ4CjTDdSU0gtIDiE+YBrKgwNbSVJTCBPwN8N5ZW8NKDnhRB8AXCm//KAsBUCwKU//oJQnET+UP3/zpYRocAAABJkVzzIuoLGEaDoxfsNva12EUdxhJMGFQioSg8GxKsLm8kWEmExJuNidarkk+OTXc0i2OZEq2v+tZr/MDZRS0I7LfRpHdlsiF6m/mEjk+XlK10UqtKYUwNgMx24hUtCJLfpM3ExUeKDYjClgZAzAjQ0qlNQBTsGpk9zSRkCiKkRGp572VXsPYChGvxhAuYkDYZK//jSRgto2mTf6+PJqgAAgIAAAACYZE6aZOHhYkYlcbpeYQq1RgLO4U8TIlL1sGw+iKZi5Kzc/bKT0yXrIUMES89RCWy8oWlxqIQlKANLFpT/KjUrK+UCYbZqGnjVj29aO5dzofWAskRX5eJWPi4kf/aRVjy3Wlyg2AnMYIDSTLwZUTASIzflPWUwwlUnIFMnGiyABeaXJcN91PmQJCLzmvUJkFOHCrX/+6O///IHnT4tT9YYBoNMQ09GfKIErwdwChNz1Qy5+5S/wWeY//uSZF+C03UyT2tMO0A3RRkhY20KzQjDMszhA8DjlGOBp5y4ZCS3ica52GIGiryv7FAaSDVZSXKFTiir+GvGiuK4rjgwPVTddso+W/42a4ueJJHDYtfj6YoKknnjzRgKA0fBIRZOSsprJqnoNN73ps/Z9DVgbKNbMGmRzrYBMAZCPUANkAZQ0syAC2ubK1NF90+WoesBpnhY8qwVDkNb/5Uof6//418TgElCSgAIgyAAQBHEmiaQFPIRmfAMELffpo0IflyEuAAQnSnKvwTlVlnIgOAAGS3P3IydjXPSh/CaVRqpSNCjQqDvPM+fLcuN+WgqNix6CoHomUWTT86JjziRSZ3yjnq+dIldKPU11KUuf6wAASMAAJxE+MlyktgE9UGSxjEx6RR0v1s9bWZ+EJSrGtjqUIhklG3J8eLRn/2U/nv7f///+7/6gBQgEAMUijVMwweWWMyYM/PLXuc7DptIQmBARMRCxXjEIcTNDQgSSeHpUNXO7dRSOllJPvnY7yzaO1hmUjsKvHe99fOxrabMX7mGTi5tsNkZVZLndzxse//7kmR7ABM2O0pbKTvQN4NI+WGFPA2ZESs1pYAAvA0jVrJwAHfbr/c6//vW790dzX36QNBRlDv/6QQAU3V64yUgBEAYc/lI8e5bm+Z9+j+4aaj4tFrb//iker/4a12b/V//q//9v+7vAEAAAAMqZTGd5gL4f54o6ZebKNrR/zWVYUEVYVVv8BuAV2OUT+DUQgkJ8J1Ey4ZbFCiAwgwzMSdHV4jQR+OoPWEASaPkyYq+PsQFFJCsEEJtOiUjI/+GRhtC2DnizTMXATJig9Ey/kAJMrkHGYJ8gpLjmJOYoskpav+ShRJInyGGZVJMihDi6pIxRZJJel/8iZPkYiREnyKE0akTL5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  var Or = "data:image/png;base64,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";
  var Pr = "data:image/png;base64,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";
  var xi = "3000.0.0-beta.3";
  var Rr = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var Xt = "topleft";
  var Mr = 64;
  var Ei = "monospace";
  var Jt = "monospace";
  var Ci = 36;
  var Dr = 64;
  var Br = 256;
  var Fr = 2048;
  var Gr = 2048;
  var Lr = 2048;
  var Ir = 2048;
  var Vr = 0.1;
  var Si = 64;
  var jr = "nearest";
  var Ti = 1;
  var kr = [{name: "a_pos", size: 2}, {name: "a_uv", size: 2}, {name: "a_color", size: 4}];
  var Wt = kr.reduce((s, t) => s + t.size, 0);
  var Hr = 2048;
  var Nr = Hr * 4 * Wt;
  var _r = Hr * 6;
  var Ai = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
  var Oi = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
  var Gn = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var Ln = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var Pi = new Set(["id", "require"]);
  var Ri = new Set(["add", "update", "draw", "destroy", "inspect", "drawInspect"]);
  function ct(s) {
    switch (s) {
      case "topleft":
        return new b(-1, -1);
      case "top":
        return new b(0, -1);
      case "topright":
        return new b(1, -1);
      case "left":
        return new b(-1, 0);
      case "center":
        return new b(0, 0);
      case "right":
        return new b(1, 0);
      case "botleft":
        return new b(-1, 1);
      case "bot":
        return new b(0, 1);
      case "botright":
        return new b(1, 1);
      default:
        return s;
    }
  }
  o(ct, "anchorPt");
  function Mi(s) {
    switch (s) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  o(Mi, "alignPt");
  function Di(s) {
    return s.createBuffer(1, 1, 44100);
  }
  o(Di, "createEmptyAudioBuffer");
  var ho = o((s = {}) => {
    let t = s.root ?? document.body;
    t === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
    let l = s.canvas ?? (() => {
      let e = document.createElement("canvas");
      return t.appendChild(e), e;
    })(), p = s.scale ?? 1, x = s.width && s.height && !s.stretch && !s.letterbox;
    x ? (l.width = s.width * p, l.height = s.height * p) : (l.width = l.parentElement.offsetWidth, l.height = l.parentElement.offsetHeight);
    let M = l.width, q = l.height, k = s.pixelDensity || window.devicePixelRatio;
    l.width *= k, l.height *= k;
    let j = ["outline: none", "cursor: default"];
    x ? (j.push(`width: ${M}px`), j.push(`height: ${q}px`)) : (j.push("width: 100%"), j.push("height: 100%")), s.crisp && (j.push("image-rendering: pixelated"), j.push("image-rendering: crisp-edges")), l.style.cssText = j.join(";"), l.tabIndex = 0;
    let Z = document.createElement("canvas");
    Z.width = Br, Z.height = Br;
    let ae = Z.getContext("2d", {willReadFrequently: true}), U = Er({canvas: l}), J = [], d = U.canvas().getContext("webgl", {antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true});
    class $ {
      src = null;
      glTex;
      width;
      height;
      constructor(n, r, a = {}) {
        this.glTex = d.createTexture(), J.push(() => this.free()), this.bind(), n && r && d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, n, r, 0, d.RGBA, d.UNSIGNED_BYTE, null), this.width = n, this.height = r;
        let u = (() => {
          switch (a.filter ?? s.texFilter) {
            case "linear":
              return d.LINEAR;
            case "nearest":
              return d.NEAREST;
            default:
              return d.NEAREST;
          }
        })(), i = (() => {
          switch (a.wrap) {
            case "repeat":
              return d.REPEAT;
            case "clampToEdge":
              return d.CLAMP_TO_EDGE;
            default:
              return d.CLAMP_TO_EDGE;
          }
        })();
        d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, u), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, u), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, i), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, i), this.unbind();
      }
      static fromImage(n, r = {}) {
        let a = new $(0, 0, r);
        return a.bind(), d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, d.RGBA, d.UNSIGNED_BYTE, n), a.width = n.width, a.height = n.height, a.unbind(), a.src = n, a;
      }
      update(n, r = 0, a = 0) {
        this.bind(), d.texSubImage2D(d.TEXTURE_2D, 0, r, a, d.RGBA, d.UNSIGNED_BYTE, n), this.unbind();
      }
      bind() {
        d.bindTexture(d.TEXTURE_2D, this.glTex);
      }
      unbind() {
        d.bindTexture(d.TEXTURE_2D, null);
      }
      free() {
        d.deleteTexture(this.glTex);
      }
    }
    o($, "Texture");
    class fe {
      tex;
      canvas;
      ctx;
      x = 0;
      y = 0;
      curHeight = 0;
      constructor(n, r) {
        this.canvas = document.createElement("canvas"), this.canvas.width = n, this.canvas.height = r, this.tex = $.fromImage(this.canvas), this.ctx = this.canvas.getContext("2d");
      }
      add(n) {
        if (n.width > this.canvas.width || n.height > this.canvas.height)
          throw new Error(`Texture size (${n.width} x ${n.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`);
        this.x + n.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + n.height > this.canvas.height && (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.tex = $.fromImage(this.canvas), this.x = 0, this.y = 0, this.curHeight = 0);
        let r = new b(this.x, this.y);
        return this.x += n.width, n.height > this.curHeight && (this.curHeight = n.height), n instanceof ImageData ? this.ctx.putImageData(n, r.x, r.y) : this.ctx.drawImage(n, r.x, r.y), this.tex.update(this.canvas), [this.tex, new Q(r.x / this.canvas.width, r.y / this.canvas.height, n.width / this.canvas.width, n.height / this.canvas.height)];
      }
    }
    o(fe, "TexPacker");
    class qe {
      tex;
      glFrameBuffer;
      glRenderBuffer;
      constructor(n, r, a = {}) {
        this.tex = new $(n, r, a), this.glFrameBuffer = d.createFramebuffer(), this.glRenderBuffer = d.createRenderbuffer(), J.push(() => this.free()), this.bind(), d.renderbufferStorage(d.RENDERBUFFER, d.DEPTH_STENCIL, n, r), d.framebufferTexture2D(d.FRAMEBUFFER, d.COLOR_ATTACHMENT0, d.TEXTURE_2D, this.tex.glTex, 0), d.framebufferRenderbuffer(d.FRAMEBUFFER, d.DEPTH_STENCIL_ATTACHMENT, d.RENDERBUFFER, this.glRenderBuffer), this.unbind();
      }
      bind() {
        d.bindFramebuffer(d.FRAMEBUFFER, this.glFrameBuffer), d.bindRenderbuffer(d.RENDERBUFFER, this.glRenderBuffer);
      }
      unbind() {
        d.bindFramebuffer(d.FRAMEBUFFER, null), d.bindRenderbuffer(d.RENDERBUFFER, null);
      }
      free() {
        d.deleteFramebuffer(this.glFrameBuffer), d.deleteRenderbuffer(this.glRenderBuffer);
      }
    }
    o(qe, "FrameBuffer");
    let w = (() => {
      let e = Me(Gn, Ln), n = $.fromImage(new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), r = new qe(d.drawingBufferWidth, d.drawingBufferHeight), a = null, u = 1;
      s.background && (a = L.fromArray(s.background), u = s.background[3] ?? 1, d.clearColor(a.r / 255, a.g / 255, a.b / 255, u)), d.enable(d.BLEND), d.enable(d.SCISSOR_TEST), d.blendFuncSeparate(d.SRC_ALPHA, d.ONE_MINUS_SRC_ALPHA, d.ONE, d.ONE_MINUS_SRC_ALPHA);
      let i = d.createBuffer();
      d.bindBuffer(d.ARRAY_BUFFER, i), d.bufferData(d.ARRAY_BUFFER, Nr * 4, d.DYNAMIC_DRAW), kr.reduce((h, g, y) => (d.vertexAttribPointer(y, g.size, d.FLOAT, false, Wt * 4, h), d.enableVertexAttribArray(y), h + g.size * 4), 0), d.bindBuffer(d.ARRAY_BUFFER, null);
      let c = d.createBuffer();
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, c), d.bufferData(d.ELEMENT_ARRAY_BUFFER, _r * 4, d.DYNAMIC_DRAW), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, null);
      let m = $.fromImage(new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), {wrap: "repeat", filter: "nearest"});
      return {drawCalls: 0, lastDrawCalls: 0, defShader: e, curShader: e, frameBuffer: r, postShader: null, postShaderUniform: null, defTex: n, curTex: n, curUniform: {}, vbuf: i, ibuf: c, vqueue: [], iqueue: [], transform: new W(), transformStack: [], bgTex: m, bgColor: a, bgAlpha: u, width: s.width, height: s.height, viewport: {x: 0, y: 0, width: d.drawingBufferWidth, height: d.drawingBufferHeight}};
    })();
    class ue {
      tex;
      frames = [new Q(0, 0, 1, 1)];
      anims = {};
      slice9 = null;
      constructor(n, r, a = {}, u = null) {
        this.tex = n, r && (this.frames = r), this.anims = a, this.slice9 = u;
      }
      static from(n, r = {}) {
        return typeof n == "string" ? ue.fromURL(n, r) : Promise.resolve(ue.fromImage(n, r));
      }
      static fromImage(n, r = {}) {
        let [a, u] = G.packer.add(n), i = r.frames ? r.frames.map((c) => new Q(u.x + c.x * u.w, u.y + c.y * u.h, c.w * u.w, c.h * u.h)) : Et(r.sliceX || 1, r.sliceY || 1, u.x, u.y, u.w, u.h);
        return new ue(a, i, r.anims, r.slice9);
      }
      static fromURL(n, r = {}) {
        return Ze(n).then((a) => ue.fromImage(a, r));
      }
    }
    o(ue, "SpriteData");
    class me {
      buf;
      constructor(n) {
        this.buf = n;
      }
      static fromArrayBuffer(n) {
        return new Promise((r, a) => ce.ctx.decodeAudioData(n, r, a)).then((r) => new me(r));
      }
      static fromURL(n) {
        return Dn(n) ? me.fromArrayBuffer(br(n)) : en(n).then((r) => me.fromArrayBuffer(r));
      }
    }
    o(me, "SoundData");
    let ce = (() => {
      let e = new (window.AudioContext || window.webkitAudioContext)(), n = e.createGain();
      n.connect(e.destination);
      let r = new me(Di(e));
      return e.decodeAudioData(Fn.buffer.slice(0)).then((a) => {
        r.buf = a;
      }).catch((a) => {
        console.error("Failed to load burp: ", a);
      }), {ctx: e, masterNode: n, burpSnd: r};
    })();
    class le {
      loaded = false;
      data = null;
      error = null;
      onLoadEvents = new we();
      onErrorEvents = new we();
      onFinishEvents = new we();
      constructor(n) {
        n.then((r) => {
          this.data = r, this.onLoadEvents.trigger(r);
        }).catch((r) => {
          if (this.error = r, this.onErrorEvents.numListeners() > 0)
            this.onErrorEvents.trigger(r);
          else
            throw r;
        }).finally(() => {
          this.onFinishEvents.trigger(), this.loaded = true;
        });
      }
      static loaded(n) {
        let r = new le(Promise.resolve(n));
        return r.data = n, r.loaded = true, r;
      }
      onLoad(n) {
        return this.onLoadEvents.add(n), this;
      }
      onError(n) {
        return this.onErrorEvents.add(n), this;
      }
      onFinish(n) {
        return this.onFinishEvents.add(n), this;
      }
      then(n) {
        return this.onLoad(n);
      }
      catch(n) {
        return this.onError(n);
      }
      finally(n) {
        return this.onFinish(n);
      }
    }
    o(le, "Asset");
    class be {
      assets = new Map();
      lastUID = 0;
      add(n, r) {
        let a = n ?? this.lastUID++ + "", u = new le(r);
        return this.assets.set(a, u), u;
      }
      addLoaded(n, r) {
        let a = n ?? this.lastUID++ + "", u = le.loaded(r);
        return this.assets.set(a, u), u;
      }
      get(n) {
        return this.assets.get(n);
      }
      progress() {
        if (this.assets.size === 0)
          return 1;
        let n = 0;
        return this.assets.forEach((r) => {
          r.loaded && n++;
        }), n / this.assets.size;
      }
    }
    o(be, "AssetBucket");
    let G = {urlPrefix: "", sprites: new be(), fonts: new be(), bitmapFonts: new be(), sounds: new be(), shaders: new be(), custom: new be(), packer: new fe(Lr, Ir), loaded: false}, S = {ev: new Oe(), objEvents: new Oe(), root: Yn([]), gravity: 0, scenes: {}, logs: [], cam: {pos: null, scale: new b(1), angle: 0, shake: 0, transform: new W()}};
    function lt(e) {
      return G.custom.add(null, e);
    }
    o(lt, "load");
    function Be() {
      let e = [G.sprites, G.sounds, G.shaders, G.fonts, G.bitmapFonts, G.custom];
      return e.reduce((n, r) => n + r.progress(), 0) / e.length;
    }
    o(Be, "loadProgress");
    function Qt(e) {
      return e !== void 0 && (G.urlPrefix = e), G.urlPrefix;
    }
    o(Qt, "loadRoot");
    function ht(e) {
      let n = G.urlPrefix + e;
      return fetch(n).then((r) => {
        if (!r.ok)
          throw new Error(`Failed to fetch ${n}`);
        return r;
      });
    }
    o(ht, "fetchURL");
    function dt(e) {
      return ht(e).then((n) => n.json());
    }
    o(dt, "fetchJSON");
    function Zt(e) {
      return ht(e).then((n) => n.text());
    }
    o(Zt, "fetchText");
    function en(e) {
      return ht(e).then((n) => n.arrayBuffer());
    }
    o(en, "fetchArrayBuffer");
    function Ze(e) {
      let n = new Image();
      return n.crossOrigin = "anonymous", n.src = Dn(e) ? e : G.urlPrefix + e, new Promise((r, a) => {
        n.onload = () => r(n), n.onerror = () => a(new Error(`Failed to load image from "${e}"`));
      });
    }
    o(Ze, "loadImg");
    class $e {
      fontface;
      outline;
      filter;
      constructor(n, r = {}) {
        this.fontface = n, this.outline = r.outline ?? 0, this.filter = r.filter ?? jr;
      }
    }
    o($e, "FontData");
    function tn(e, n, r = {}) {
      let a = new FontFace(e, typeof n == "string" ? `url(${n})` : n);
      return document.fonts.add(a), G.fonts.add(e, a.load().catch((u) => {
        throw new Error(`Failed to load font from "${n}": ${u}`);
      }).then((u) => new $e(u, r)));
    }
    o(tn, "loadFont");
    function nn(e, n, r, a, u = {}) {
      return G.bitmapFonts.add(e, Ze(n).then((i) => Bt($.fromImage(i, u), r, a, u.chars ?? Rr)));
    }
    o(nn, "loadBitmapFont");
    function Et(e = 1, n = 1, r = 0, a = 0, u = 1, i = 1) {
      let c = [], m = u / e, h = i / n;
      for (let g = 0; g < n; g++)
        for (let y = 0; y < e; y++)
          c.push(new Q(r + y * m, a + g * h, m, h));
      return c;
    }
    o(Et, "slice");
    function Ct(e, n) {
      return lt(typeof n == "string" ? new Promise((r, a) => {
        dt(n).then((u) => {
          Ct(e, u).then(r).catch(a);
        });
      }) : ue.from(e).then((r) => {
        let a = {};
        for (let u in n) {
          let i = n[u], c = r.frames[0], m = Lr * c.w, h = Ir * c.h, g = i.frames ? i.frames.map((B) => new Q(c.x + (i.x + B.x) / m * c.w, c.y + (i.y + B.y) / h * c.h, B.w / m * c.w, B.h / h * c.h)) : Et(i.sliceX || 1, i.sliceY || 1, c.x + i.x / m * c.w, c.y + i.y / h * c.h, i.width / m * c.w, i.height / h * c.h), y = new ue(r.tex, g, i.anims);
          G.sprites.addLoaded(u, y), a[u] = y;
        }
        return a;
      }));
    }
    o(Ct, "loadSpriteAtlas");
    function St(e, n = {}) {
      let r = document.createElement("canvas"), a = e[0].width, u = e[0].height;
      r.width = a * e.length, r.height = u;
      let i = r.getContext("2d");
      e.forEach((m, h) => {
        m instanceof ImageData ? i.putImageData(m, h * a, 0) : i.drawImage(m, h * a, 0);
      });
      let c = i.getImageData(0, 0, e.length * a, u);
      return ue.fromImage(c, {...n, sliceX: e.length, sliceY: 1});
    }
    o(St, "createSpriteSheet");
    function ze(e, n, r = {sliceX: 1, sliceY: 1, anims: {}}) {
      return Array.isArray(n) ? n.some((a) => typeof a == "string") ? G.sprites.add(e, Promise.all(n.map((a) => typeof a == "string" ? Ze(a) : Promise.resolve(a))).then((a) => St(a, r))) : G.sprites.addLoaded(e, St(n, r)) : typeof n == "string" ? G.sprites.add(e, ue.from(n, r)) : G.sprites.addLoaded(e, ue.fromImage(n, r));
    }
    o(ze, "loadSprite");
    function rn(e, n) {
      return G.sprites.add(e, new Promise(async (r) => {
        let a = typeof n == "string" ? await dt(n) : n, u = await Promise.all(a.frames.map(Ze)), i = document.createElement("canvas");
        i.width = a.width, i.height = a.height * a.frames.length;
        let c = i.getContext("2d");
        u.forEach((h, g) => {
          c.drawImage(h, 0, g * a.height);
        });
        let m = await ze(null, i, {sliceY: a.frames.length, anims: a.anims});
        r(m);
      }));
    }
    o(rn, "loadPedit");
    function sn(e, n, r) {
      typeof n == "string" && !r && (r = n.replace(new RegExp(`${Ur(n)}$`), "json"));
      let a = typeof r == "string" ? dt(r) : Promise.resolve(r);
      return G.sprites.add(e, a.then((u) => {
        let i = u.meta.size, c = u.frames.map((h) => new Q(h.frame.x / i.w, h.frame.y / i.h, h.frame.w / i.w, h.frame.h / i.h)), m = {};
        for (let h of u.meta.frameTags)
          h.from === h.to ? m[h.name] = h.from : m[h.name] = {from: h.from, to: h.to, speed: 10, loop: true, pingpong: h.direction === "pingpong"};
        return ue.from(n, {frames: c, anims: m});
      }));
    }
    o(sn, "loadAseprite");
    function on(e, n, r) {
      return G.shaders.addLoaded(e, Me(n, r));
    }
    o(on, "loadShader");
    function an(e, n, r) {
      let a = o((i) => i ? Zt(i) : Promise.resolve(null), "resolveUrl"), u = Promise.all([a(n), a(r)]).then(([i, c]) => Me(i, c));
      return G.shaders.add(e, u);
    }
    o(an, "loadShaderURL");
    function un(e, n) {
      return G.sounds.add(e, typeof n == "string" ? me.fromURL(n) : me.fromArrayBuffer(n));
    }
    o(un, "loadSound");
    function cn(e = "bean") {
      return ze(e, Ar);
    }
    o(cn, "loadBean");
    function Tt(e) {
      return G.sprites.get(e);
    }
    o(Tt, "getSprite");
    function At(e) {
      return G.sounds.get(e);
    }
    o(At, "getSound");
    function Ot(e) {
      return G.fonts.get(e);
    }
    o(Ot, "getFont");
    function Pt(e) {
      return G.bitmapFonts.get(e);
    }
    o(Pt, "getBitmapFont");
    function Rt(e) {
      return G.shaders.get(e);
    }
    o(Rt, "getShader");
    function Mt(e) {
      if (typeof e == "string") {
        let n = Tt(e);
        if (n)
          return n;
        if (Be() < 1)
          return null;
        throw new Error(`Sprite not found: ${e}`);
      } else {
        if (e instanceof ue)
          return le.loaded(e);
        if (e instanceof le)
          return e;
        throw new Error(`Invalid sprite: ${e}`);
      }
    }
    o(Mt, "resolveSprite");
    function In(e) {
      if (typeof e == "string") {
        let n = At(e);
        if (n)
          return n.data ?? n;
        if (Be() < 1)
          return null;
        throw new Error(`Sound not found: ${e}`);
      } else {
        if (e instanceof me)
          return e;
        if (e instanceof le)
          return e.data ? e.data : e;
        throw new Error(`Invalid sound: ${e}`);
      }
    }
    o(In, "resolveSound");
    function ln(e) {
      if (!e)
        return w.defShader;
      if (typeof e == "string") {
        let n = Rt(e);
        if (n)
          return n.data ?? n;
        if (Be() < 1)
          return null;
        throw new Error(`Shader not found: ${e}`);
      } else if (e instanceof le)
        return e.data ? e.data : e;
      return e;
    }
    o(ln, "resolveShader");
    function Dt(e) {
      if (!e)
        return Dt(s.font ?? Ei);
      if (typeof e == "string") {
        let n = Pt(e), r = Ot(e);
        if (n)
          return n.data ?? n;
        if (r)
          return r.data ?? r;
        if (document.fonts.check(`${Dr}px ${e}`))
          return e;
        if (Be() < 1)
          return null;
        throw new Error(`Font not found: ${e}`);
      } else if (e instanceof le)
        return e.data ? e.data : e;
      return e;
    }
    o(Dt, "resolveFont");
    function hn(e) {
      return e !== void 0 && (ce.masterNode.gain.value = e), ce.masterNode.gain.value;
    }
    o(hn, "volume");
    function he(e, n = {}) {
      let r = In(e), a = ce.ctx, u = n.paused ?? false, i = a.createBufferSource(), c = new we(), m = a.createGain(), h = n.seek ?? 0, g = 0, y = 0, B = false;
      i.loop = Boolean(n.loop), i.detune.value = n.detune ?? 0, i.playbackRate.value = n.speed ?? 1, i.connect(m), i.onended = () => {
        I() >= i.buffer?.duration && c.trigger();
      }, m.connect(ce.masterNode), m.gain.value = n.volume ?? 1;
      let K = o((O) => {
        i.buffer = O.buf, u || (g = a.currentTime, i.start(0, h), B = true);
      }, "start");
      r instanceof le ? r.onLoad(K) : r instanceof me && K(r);
      let I = o(() => {
        if (!i.buffer)
          return 0;
        let O = u ? y - g : a.currentTime - g, A = i.buffer.duration;
        return i.loop ? O % A : Math.min(O, A);
      }, "getTime"), H = o((O) => {
        let A = a.createBufferSource();
        return A.buffer = O.buffer, A.loop = O.loop, A.playbackRate.value = O.playbackRate.value, A.detune.value = O.detune.value, A.onended = O.onended, A.connect(m), A;
      }, "cloneNode");
      return {set paused(O) {
        if (u !== O)
          if (u = O, O)
            B && (i.stop(), B = false), y = a.currentTime;
          else {
            i = H(i);
            let A = y - g;
            i.start(0, A), B = true, g = a.currentTime - A, y = 0;
          }
      }, get paused() {
        return u;
      }, play(O = 0) {
        this.seek(O), this.paused = false;
      }, seek(O) {
        i.buffer?.duration && (O > i.buffer.duration || (u ? (i = H(i), g = y - O) : (i.stop(), i = H(i), g = a.currentTime - O, i.start(0, O), B = true, y = 0)));
      }, set speed(O) {
        i.playbackRate.value = O;
      }, get speed() {
        return i.playbackRate.value;
      }, set detune(O) {
        i.detune.value = O;
      }, get detune() {
        return i.detune.value;
      }, set volume(O) {
        m.gain.value = O;
      }, get volume() {
        return m.gain.value;
      }, set loop(O) {
        i.loop = O;
      }, get loop() {
        return i.loop;
      }, duration() {
        return i.buffer?.duration ?? 0;
      }, time() {
        return I() % this.duration();
      }, onEnd(O) {
        return c.add(O);
      }, then(O) {
        return this.onEnd(O);
      }};
    }
    o(he, "play");
    function Ie(e) {
      return he(ce.burpSnd, e);
    }
    o(Ie, "burp");
    function Me(e = Gn, n = Ln) {
      let r = Ai.replace("{{user}}", e ?? Gn), a = Oi.replace("{{user}}", n ?? Ln), u = d.createShader(d.VERTEX_SHADER), i = d.createShader(d.FRAGMENT_SHADER);
      d.shaderSource(u, r), d.shaderSource(i, a), d.compileShader(u), d.compileShader(i);
      let c = d.createProgram();
      if (J.push(() => d.deleteProgram(c)), d.attachShader(c, u), d.attachShader(c, i), d.bindAttribLocation(c, 0, "a_pos"), d.bindAttribLocation(c, 1, "a_uv"), d.bindAttribLocation(c, 2, "a_color"), d.linkProgram(c), !d.getProgramParameter(c, d.LINK_STATUS)) {
        let m = o((B) => {
          let K = /^ERROR:\s0:(?<line>\d+):\s(?<msg>.+)/, I = B.match(K);
          return {line: Number(I.groups.line), msg: I.groups.msg.replace(/\n\0$/, "")};
        }, "formatShaderError"), h = d.getShaderInfoLog(u), g = d.getShaderInfoLog(i), y = "";
        if (h) {
          let B = m(h);
          y += `Vertex shader line ${B.line - 14}: ${B.msg}`;
        }
        if (g) {
          let B = m(g);
          y += `Fragment shader line ${B.line - 14}: ${B.msg}`;
        }
        throw new Error(y);
      }
      return d.deleteShader(u), d.deleteShader(i), {bind() {
        d.useProgram(c);
      }, unbind() {
        d.useProgram(null);
      }, free() {
        d.deleteProgram(c);
      }, send(m) {
        for (let h in m) {
          let g = m[h], y = d.getUniformLocation(c, h);
          typeof g == "number" ? d.uniform1f(y, g) : g instanceof W ? d.uniformMatrix4fv(y, false, new Float32Array(g.m)) : g instanceof L ? d.uniform3f(y, g.r, g.g, g.b) : g instanceof b && d.uniform2f(y, g.x, g.y);
        }
      }};
    }
    o(Me, "makeShader");
    function Bt(e, n, r, a) {
      let u = e.width / n, i = {}, c = a.split("").entries();
      for (let [m, h] of c)
        i[h] = new Q(m % u * n, Math.floor(m / u) * r, n, r);
      return {tex: e, map: i, size: r};
    }
    o(Bt, "makeFont");
    function ft(e, n, r, a = w.defTex, u = w.defShader, i = {}) {
      let c = ln(u);
      if (!c || c instanceof le)
        return;
      (a !== w.curTex || c !== w.curShader || !Pn(w.curUniform, i) || w.vqueue.length + e.length * Wt > Nr || w.iqueue.length + n.length > _r) && Ce();
      let m = r ? w.transform : S.cam.transform.mult(w.transform);
      for (let h of e) {
        let g = T(m.multVec2(h.pos));
        w.vqueue.push(g.x, g.y, h.uv.x, h.uv.y, h.color.r / 255, h.color.g / 255, h.color.b / 255, h.opacity);
      }
      for (let h of n)
        w.iqueue.push(h + w.vqueue.length / Wt - e.length);
      w.curTex = a, w.curShader = c, w.curUniform = i;
    }
    o(ft, "drawRaw");
    function Ce() {
      !w.curTex || !w.curShader || w.vqueue.length === 0 || w.iqueue.length === 0 || (d.bindBuffer(d.ARRAY_BUFFER, w.vbuf), d.bufferSubData(d.ARRAY_BUFFER, 0, new Float32Array(w.vqueue)), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, w.ibuf), d.bufferSubData(d.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(w.iqueue)), w.curShader.bind(), w.curShader.send(w.curUniform), w.curTex.bind(), d.drawElements(d.TRIANGLES, w.iqueue.length, d.UNSIGNED_SHORT, 0), w.curTex.unbind(), w.curShader.unbind(), d.bindBuffer(d.ARRAY_BUFFER, null), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, null), w.vqueue.length = 0, w.iqueue.length = 0, w.drawCalls++);
    }
    o(Ce, "flush");
    function Ft() {
      d.clear(d.COLOR_BUFFER_BIT), w.frameBuffer.bind(), d.clear(d.COLOR_BUFFER_BIT), w.bgColor || Fe(() => {
        et({width: pe(), height: ve(), quad: new Q(0, 0, pe() / Mr, ve() / Mr), tex: w.bgTex, fixed: true});
      }), w.drawCalls = 0, w.transformStack.length = 0, w.transform = new W();
    }
    o(Ft, "frameStart");
    function f(e, n) {
      w.postShader = e, w.postShaderUniform = n ?? null;
    }
    o(f, "usePostEffect");
    function E() {
      Ce(), w.frameBuffer.unbind(), Fe(() => {
        Gt({flipY: true, tex: w.frameBuffer.tex, scale: new b(1 / k), shader: w.postShader, uniform: typeof w.postShaderUniform == "function" ? w.postShaderUniform() : w.postShaderUniform, fixed: true});
      }), Ce(), w.lastDrawCalls = w.drawCalls;
    }
    o(E, "frameEnd");
    function T(e) {
      return new b(e.x / pe() * 2 - 1, -e.y / ve() * 2 + 1);
    }
    o(T, "screen2ndc");
    function re(e) {
      w.transform = e.clone();
    }
    o(re, "pushMatrix");
    function z(...e) {
      if (e[0] === void 0)
        return;
      let n = C(...e);
      n.x === 0 && n.y === 0 || w.transform.translate(n);
    }
    o(z, "pushTranslate");
    function Ve(...e) {
      if (e[0] === void 0)
        return;
      let n = C(...e);
      n.x === 1 && n.y === 1 || w.transform.scale(n);
    }
    o(Ve, "pushScale");
    function je(e) {
      e && w.transform.rotate(e);
    }
    o(je, "pushRotate");
    function Se() {
      w.transformStack.push(w.transform.clone());
    }
    o(Se, "pushTransform");
    function ye() {
      w.transformStack.length > 0 && (w.transform = w.transformStack.pop());
    }
    o(ye, "popTransform");
    function et(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawUVQuad() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0)
        return;
      let n = e.width, r = e.height, u = ct(e.anchor || Xt).scale(new b(n, r).scale(-0.5)), i = e.quad || new Q(0, 0, 1, 1), c = e.color || X(255, 255, 255), m = e.opacity ?? 1, h = e.tex ? Vr / e.tex.width : 0, g = e.tex ? Vr / e.tex.height : 0, y = i.x + h, B = i.y + g, K = i.w - h * 2, I = i.h - g * 2;
      Se(), z(e.pos), je(e.angle), Ve(e.scale), z(u), ft([{pos: new b(-n / 2, r / 2), uv: new b(e.flipX ? y + K : y, e.flipY ? B : B + I), color: c, opacity: m}, {pos: new b(-n / 2, -r / 2), uv: new b(e.flipX ? y + K : y, e.flipY ? B + I : B), color: c, opacity: m}, {pos: new b(n / 2, -r / 2), uv: new b(e.flipX ? y : y + K, e.flipY ? B + I : B), color: c, opacity: m}, {pos: new b(n / 2, r / 2), uv: new b(e.flipX ? y : y + K, e.flipY ? B : B + I), color: c, opacity: m}], [0, 1, 3, 1, 2, 3], e.fixed, e.tex, e.shader, e.uniform), ye();
    }
    o(et, "drawUVQuad");
    function Gt(e) {
      if (!e.tex)
        throw new Error('drawTexture() requires property "tex".');
      let n = e.quad ?? new Q(0, 0, 1, 1), r = e.tex.width * n.w, a = e.tex.height * n.h, u = new b(1);
      if (e.tiled) {
        let i = Math.ceil((e.width || r) / r), c = Math.ceil((e.height || a) / a), h = ct(e.anchor || Xt).add(new b(1, 1)).scale(0.5).scale(i * r, c * a);
        for (let g = 0; g < i; g++)
          for (let y = 0; y < c; y++)
            et(Object.assign(e, {pos: (e.pos || new b(0)).add(new b(r * g, a * y)).sub(h), scale: u.scale(e.scale || new b(1)), tex: e.tex, quad: n, width: r, height: a, anchor: "topleft"}));
      } else
        e.width && e.height ? (u.x = e.width / r, u.y = e.height / a) : e.width ? (u.x = e.width / r, u.y = u.x) : e.height && (u.y = e.height / a, u.x = u.y), et(Object.assign(e, {scale: u.scale(e.scale || new b(1)), tex: e.tex, quad: n, width: r, height: a}));
    }
    o(Gt, "drawTexture");
    function qr(e) {
      if (!e.sprite)
        throw new Error('drawSprite() requires property "sprite"');
      let n = Mt(e.sprite);
      if (!n || !n.data)
        return;
      let r = n.data.frames[e.frame ?? 0];
      if (!r)
        throw new Error(`Frame not found: ${e.frame ?? 0}`);
      Gt(Object.assign(e, {tex: n.data.tex, quad: r.scale(e.quad ?? new Q(0, 0, 1, 1))}));
    }
    o(qr, "drawSprite");
    function mt(e, n, r, a, u, i = 1) {
      a = De(a % 360), u = De(u % 360), u <= a && (u += Math.PI * 2);
      let c = [], m = Math.ceil((u - a) / De(8) * i), h = (u - a) / m;
      for (let g = a; g < u; g += h)
        c.push(e.add(n * Math.cos(g), r * Math.sin(g)));
      return c.push(e.add(n * Math.cos(u), r * Math.sin(u))), c;
    }
    o(mt, "getArcPts");
    function Te(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawRect() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0)
        return;
      let n = e.width, r = e.height, u = ct(e.anchor || Xt).add(1, 1).scale(new b(n, r).scale(-0.5)), i = [new b(0, 0), new b(n, 0), new b(n, r), new b(0, r)];
      if (e.radius) {
        let c = Math.min(Math.min(n, r) / 2, e.radius);
        i = [new b(c, 0), new b(n - c, 0), ...mt(new b(n - c, c), c, c, 270, 360), new b(n, c), new b(n, r - c), ...mt(new b(n - c, r - c), c, c, 0, 90), new b(n - c, r), new b(c, r), ...mt(new b(c, r - c), c, c, 90, 180), new b(0, r - c), new b(0, c), ...mt(new b(c, c), c, c, 180, 270)];
      }
      Ye(Object.assign(e, {offset: u, pts: i, ...e.gradient ? {colors: e.horizontal ? [e.gradient[0], e.gradient[1], e.gradient[1], e.gradient[0]] : [e.gradient[0], e.gradient[0], e.gradient[1], e.gradient[1]]} : {}}));
    }
    o(Te, "drawRect");
    function pt(e) {
      let {p1: n, p2: r} = e;
      if (!n || !r)
        throw new Error('drawLine() requires properties "p1" and "p2".');
      let a = e.width || 1, u = r.sub(n).unit().normal().scale(a * 0.5), i = [n.sub(u), n.add(u), r.add(u), r.sub(u)].map((c) => ({pos: new b(c.x, c.y), uv: new b(0), color: e.color ?? L.WHITE, opacity: e.opacity ?? 1}));
      ft(i, [0, 1, 3, 1, 2, 3], e.fixed, w.defTex, e.shader, e.uniform);
    }
    o(pt, "drawLine");
    function Vn(e) {
      let n = e.pts;
      if (!n)
        throw new Error('drawLines() requires property "pts".');
      if (!(n.length < 2))
        if (e.radius && n.length >= 3) {
          let r = n[0].sdist(n[1]);
          for (let u = 1; u < n.length - 1; u++)
            r = Math.min(n[u].sdist(n[u + 1]), r);
          let a = Math.min(e.radius, Math.sqrt(r) / 2);
          pt(Object.assign(e, {p1: n[0], p2: n[1]}));
          for (let u = 1; u < n.length - 2; u++) {
            let i = n[u], c = n[u + 1];
            pt(Object.assign(e, {p1: i, p2: c}));
          }
          pt(Object.assign(e, {p1: n[n.length - 2], p2: n[n.length - 1]}));
        } else
          for (let r = 0; r < n.length - 1; r++)
            pt(Object.assign(e, {p1: n[r], p2: n[r + 1]})), e.join !== "none" && tt(Object.assign(e, {pos: n[r], radius: e.width / 2}));
    }
    o(Vn, "drawLines");
    function jn(e) {
      if (!e.p1 || !e.p2 || !e.p3)
        throw new Error('drawPolygon() requires properties "p1", "p2" and "p3".');
      return Ye(Object.assign(e, {pts: [e.p1, e.p2, e.p3]}));
    }
    o(jn, "drawTriangle");
    function tt(e) {
      if (!e.radius)
        throw new Error('drawCircle() requires property "radius".');
      e.radius !== 0 && Nn(Object.assign(e, {radiusX: e.radius, radiusY: e.radius, angle: 0}));
    }
    o(tt, "drawCircle");
    function Nn(e) {
      if (e.radiusX === void 0 || e.radiusY === void 0)
        throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
      if (e.radiusX === 0 || e.radiusY === 0)
        return;
      let n = e.start ?? 0, r = e.end ?? 360, a = ct(e.anchor ?? "center").scale(new b(-e.radiusX, -e.radiusY)), u = mt(a, e.radiusX, e.radiusY, n, r, e.resolution);
      u.unshift(a);
      let i = Object.assign(e, {pts: u, radius: 0, ...e.gradient ? {colors: [e.gradient[0], ...Array(u.length - 1).fill(e.gradient[1])]} : {}});
      if (r - n >= 360 && e.outline) {
        e.fill !== false && Ye(Object.assign(i, {outline: null})), Ye(Object.assign(i, {pts: u.slice(1), fill: false}));
        return;
      }
      Ye(i);
    }
    o(Nn, "drawEllipse");
    function Ye(e) {
      if (!e.pts)
        throw new Error('drawPolygon() requires property "pts".');
      let n = e.pts.length;
      if (!(n < 3)) {
        if (Se(), z(e.pos), Ve(e.scale), je(e.angle), z(e.offset), e.fill !== false) {
          let r = e.color ?? L.WHITE, a = e.pts.map((i, c) => ({pos: new b(i.x, i.y), uv: new b(0, 0), color: e.colors ? e.colors[c] ?? r : r, opacity: e.opacity ?? 1})), u = [...Array(n - 2).keys()].map((i) => [0, i + 1, i + 2]).flat();
          ft(a, e.indices ?? u, e.fixed, w.defTex, e.shader, e.uniform);
        }
        e.outline && Vn({pts: [...e.pts, e.pts[0]], radius: e.radius, width: e.outline.width, color: e.outline.color, join: e.outline.join, uniform: e.uniform, fixed: e.fixed, opacity: e.opacity}), ye();
      }
    }
    o(Ye, "drawPolygon");
    function _n(e, n, r) {
      Ce(), d.clear(d.STENCIL_BUFFER_BIT), d.enable(d.STENCIL_TEST), d.stencilFunc(d.NEVER, 1, 255), d.stencilOp(d.REPLACE, d.REPLACE, d.REPLACE), n(), Ce(), d.stencilFunc(r, 1, 255), d.stencilOp(d.KEEP, d.KEEP, d.KEEP), e(), Ce(), d.disable(d.STENCIL_TEST);
    }
    o(_n, "drawStenciled");
    function $r(e, n) {
      _n(e, n, d.EQUAL);
    }
    o($r, "drawMasked");
    function zr(e, n) {
      _n(e, n, d.NOTEQUAL);
    }
    o(zr, "drawSubtracted");
    function kn() {
      return (w.viewport.width + w.viewport.height) / (w.width + w.height);
    }
    o(kn, "getViewportScale");
    function Fe(e) {
      Ce();
      let n = w.width, r = w.height;
      w.width = w.viewport.width, w.height = w.viewport.height, e(), Ce(), w.width = n, w.height = r;
    }
    o(Fe, "drawUnscaled");
    function Hn(e, n) {
      n.pos && (e.pos = e.pos.add(n.pos)), n.scale && (e.scale = e.scale.scale(C(n.scale))), n.angle && (e.angle += n.angle), n.color && (e.color = e.color.mult(n.color)), n.opacity && (e.opacity *= n.opacity);
    }
    o(Hn, "applyCharTransform");
    let qn = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
    function Yr(e) {
      let n = {}, r = e.replace(qn, "$2"), a = 0;
      for (let u of e.matchAll(qn)) {
        let i = u.index - a;
        for (let c = 0; c < u.groups.text.length; c++)
          n[c + i] = [u.groups.style];
        a += u[0].length - u.groups.text.length;
      }
      return {charStyleMap: n, text: r};
    }
    o(Yr, "compileStyledText");
    let dn = {};
    function Ke(e) {
      if (e.text === void 0)
        throw new Error('formatText() requires property "text".');
      let n = Dt(e.font);
      if (e.text === "" || n instanceof le || !n)
        return {width: 0, height: 0, chars: [], opt: e};
      let {charStyleMap: r, text: a} = Yr(e.text + ""), u = a.split("");
      if (n instanceof $e || typeof n == "string") {
        let N = n instanceof $e ? n.fontface.family : n, _ = n instanceof $e ? {outline: n.outline, filter: n.filter} : {outline: 0, filter: jr}, F = dn[N] ?? {font: {tex: new $(Fr, Gr, {filter: _.filter}), map: {}, size: Dr}, cursor: new b(0), outline: _.outline};
        dn[N] || (dn[N] = F), n = F.font;
        for (let Ue of u)
          if (!F.font.map[Ue]) {
            let v = ae;
            v.clearRect(0, 0, Z.width, Z.height), v.font = `${n.size}px ${N}`, v.textBaseline = "top", v.textAlign = "left", v.fillStyle = "#ffffff";
            let R = v.measureText(Ue), P = Math.ceil(R.width), D = n.size;
            F.outline && (v.lineJoin = "round", v.lineWidth = F.outline * 2, v.strokeStyle = "#000000", v.strokeText(Ue, F.outline, F.outline), P += F.outline * 2, D += F.outline * 3), v.fillText(Ue, F.outline, F.outline);
            let V = v.getImageData(0, 0, P, D);
            if (F.cursor.x + P > Fr && (F.cursor.x = 0, F.cursor.y += D, F.cursor.y > Gr))
              throw new Error("Font atlas exceeds character limit");
            n.tex.update(V, F.cursor.x, F.cursor.y), n.map[Ue] = new Q(F.cursor.x, F.cursor.y, P, D), F.cursor.x += P;
          }
      }
      let i = e.size || n.size, c = C(e.scale ?? 1).scale(i / n.size), m = e.lineSpacing ?? 0, h = e.letterSpacing ?? 0, g = 0, y = 0, B = 0, K = [], I = [], H = 0, O = null, A = null;
      for (; H < u.length; ) {
        let N = u[H];
        if (N === `
`)
          B += i + m, K.push({width: g - h, chars: I}), O = null, A = null, g = 0, I = [];
        else {
          let _ = n.map[N];
          if (_) {
            let F = _.w * c.x;
            e.width && g + F > e.width && (B += i + m, O != null && (H -= I.length - O, N = u[H], _ = n.map[N], F = _.w * c.x, I = I.slice(0, O - 1), g = A), O = null, A = null, K.push({width: g - h, chars: I}), g = 0, I = []), I.push({tex: n.tex, width: _.w, height: _.h, quad: new Q(_.x / n.tex.width, _.y / n.tex.height, _.w / n.tex.width, _.h / n.tex.height), ch: N, pos: new b(g, B), opacity: e.opacity ?? 1, color: e.color ?? L.WHITE, scale: C(c), angle: 0}), N === " " && (O = I.length, A = g), g += F, y = Math.max(y, g), g += h;
          }
        }
        H++;
      }
      K.push({width: g - h, chars: I}), B += i, e.width && (y = e.width);
      let ee = [];
      for (let N of K) {
        let _ = (y - N.width) * Mi(e.align ?? "left");
        for (let F of N.chars) {
          let Ue = n.map[F.ch], v = ee.length;
          if (F.pos = F.pos.add(_, 0).add(Ue.w * c.x * 0.5, Ue.h * c.y * 0.5), e.transform) {
            let R = typeof e.transform == "function" ? e.transform(v, F.ch) : e.transform;
            R && Hn(F, R);
          }
          if (r[v]) {
            let R = r[v];
            for (let P of R) {
              let D = e.styles[P], V = typeof D == "function" ? D(v, F.ch) : D;
              V && Hn(F, V);
            }
          }
          ee.push(F);
        }
      }
      return {width: y, height: B, chars: ee, opt: e};
    }
    o(Ke, "formatText");
    function $n(e) {
      Xe(Ke(e));
    }
    o($n, "drawText");
    function Xe(e) {
      Se(), z(e.opt.pos), je(e.opt.angle), z(ct(e.opt.anchor ?? "topleft").add(1, 1).scale(e.width, e.height).scale(-0.5)), e.chars.forEach((n) => {
        et({tex: n.tex, width: n.width, height: n.height, pos: n.pos, scale: n.scale, angle: n.angle, color: n.color, opacity: n.opacity, quad: n.quad, anchor: "center", uniform: e.opt.uniform, shader: e.opt.shader, fixed: e.opt.fixed});
      }), ye();
    }
    o(Xe, "drawFormattedText");
    function Kr() {
      let e = k, n = d.drawingBufferWidth / e, r = d.drawingBufferHeight / e;
      if (U.isFullscreen()) {
        let u = window.innerWidth, i = window.innerHeight, c = u / i, m = n / r;
        if (c > m) {
          let h = window.innerHeight * m;
          w.viewport = {x: (u - h) / 2, y: 0, width: h, height: i};
        } else {
          let h = window.innerWidth / m;
          w.viewport = {x: 0, y: (i - h) / 2, width: u, height: h};
        }
        return;
      }
      if (s.letterbox) {
        if (!s.width || !s.height)
          throw new Error("Letterboxing requires width and height defined.");
        let u = n / r, i = s.width / s.height;
        if (u > i) {
          s.stretch || (w.width = r * i, w.height = r);
          let c = r * i, m = r, h = (n - c) / 2;
          d.scissor(h * e, 0, c * e, m * e), d.viewport(h * e, 0, c * e, r * e), w.viewport = {x: h, y: 0, width: c, height: r};
        } else {
          s.stretch || (w.width = n, w.height = n / i);
          let c = n, m = n / i, h = (r - m) / 2;
          d.scissor(0, h * e, c * e, m * e), d.viewport(0, h * e, n * e, m * e), w.viewport = {x: 0, y: h, width: n, height: m};
        }
        return;
      }
      if (s.stretch) {
        if (!s.width || !s.height)
          throw new Error("Stretching requires width and height defined.");
        d.viewport(0, 0, n * e, r * e), w.viewport = {x: 0, y: 0, width: n, height: r};
        return;
      }
      let a = s.scale ?? 1;
      w.width = n / a, w.height = r / a, d.viewport(0, 0, n * e, r * e), w.viewport = {x: 0, y: 0, width: n, height: r};
    }
    o(Kr, "updateViewport");
    function pe() {
      return w.width;
    }
    o(pe, "width");
    function ve() {
      return w.height;
    }
    o(ve, "height");
    let nt = {};
    function Bi(e) {
      return new b((e.x - w.viewport.x) * pe() / w.viewport.width, (e.y - w.viewport.y) * ve() / w.viewport.height);
    }
    o(Bi, "windowToContent");
    function Xr(e) {
      return new b(e.x * w.viewport.width / w.width, e.y * w.viewport.height / w.height);
    }
    o(Xr, "contentToView"), nt.error = (e) => {
      e.error ? vn(e.error) : vn(new Error(e.message));
    }, nt.unhandledrejection = (e) => vn(e.reason);
    for (let e in nt)
      window.addEventListener(e, nt[e]);
    let ne = {inspect: false, timeScale: 1, showLog: true, fps: () => U.fps(), numFrames: () => U.numFrames(), stepFrame: ir, drawCalls: () => w.drawCalls, clearLog: () => S.logs = [], log: (e) => {
      let n = s.logMax ?? Ti, r = e instanceof Error ? "error" : "info";
      S.logs.unshift(`${`[time]${U.time().toFixed(2)}[/time] `}[${r}]${e?.toString ? e.toString() : e}[/${r}]`), S.logs.length > n && (S.logs = S.logs.slice(0, n));
    }, error: (e) => ne.log(new Error(e.toString ? e.toString() : e)), curRecording: null, get paused() {
      return U.paused;
    }, set paused(e) {
      U.paused = e, e ? ce.ctx.suspend() : ce.ctx.resume();
    }};
    function Pe() {
      return U.dt();
    }
    o(Pe, "dt");
    function Jr(...e) {
      return e.length > 0 && (S.cam.pos = C(...e)), S.cam.pos ? S.cam.pos.clone() : _t();
    }
    o(Jr, "camPos");
    function Wr(...e) {
      return e.length > 0 && (S.cam.scale = C(...e)), S.cam.scale.clone();
    }
    o(Wr, "camScale");
    function Qr(e) {
      return e !== void 0 && (S.cam.angle = e), S.cam.angle;
    }
    o(Qr, "camRot");
    function Zr(e = 12) {
      S.cam.shake = e;
    }
    o(Zr, "shake");
    function fn(e) {
      return S.cam.transform.multVec2(e);
    }
    o(fn, "toScreen");
    function zn(e) {
      return S.cam.transform.invert().multVec2(e);
    }
    o(zn, "toWorld");
    function Lt(e) {
      let n = new W();
      return e.pos && n.translate(e.pos), e.scale && n.scale(e.scale), e.angle && n.rotate(e.angle), e.parent ? n.mult(e.parent.transform) : n;
    }
    o(Lt, "calcTransform");
    function Yn(e) {
      let n = new Map(), r = {}, a = new Oe(), u = {id: xr(), hidden: false, paused: false, transform: new W(), children: [], parent: null, add(i) {
        let c = (() => {
          if (Array.isArray(i))
            return Yn(i);
          if (i.parent)
            throw new Error("Cannot add a game obj that already has a parent.");
          return i;
        })();
        return c.parent = this, c.transform = Lt(c), this.children.push(c), c.trigger("add", c), S.ev.trigger("add", c), c;
      }, readd(i) {
        let c = this.children.indexOf(i);
        return c !== -1 && (this.children.splice(c, 1), this.children.push(i)), i;
      }, remove(i) {
        let c = this.children.indexOf(i);
        c !== -1 && (i.trigger("destroy"), S.ev.trigger("destroy", i), i.parent = null, this.children.splice(c, 1));
      }, removeAll(i) {
        this.get(i).forEach((c) => this.remove(c));
      }, update() {
        this.paused || (this.children.sort((i, c) => (i.z ?? 0) - (c.z ?? 0)).forEach((i) => i.update()), this.trigger("update"));
      }, draw() {
        this.hidden || (Se(), z(this.pos), Ve(this.scale), je(this.angle), this.trigger("draw"), this.children.sort((i, c) => (i.z ?? 0) - (c.z ?? 0)).forEach((i) => i.draw()), ye());
      }, drawInspect() {
        this.hidden || (Se(), z(this.pos), Ve(this.scale), je(this.angle), this.children.sort((i, c) => (i.z ?? 0) - (c.z ?? 0)).forEach((i) => i.drawInspect()), this.trigger("drawInspect"), ye());
      }, use(i) {
        if (!i)
          return;
        if (typeof i == "string")
          return this.use({id: i});
        let c = [];
        i.id && (this.unuse(i.id), r[i.id] = [], c = r[i.id], n.set(i.id, i));
        for (let h in i) {
          if (Pi.has(h))
            continue;
          let g = Object.getOwnPropertyDescriptor(i, h);
          if (typeof g.value == "function" && (i[h] = i[h].bind(this)), g.set && Object.defineProperty(i, h, {set: g.set.bind(this)}), g.get && Object.defineProperty(i, h, {get: g.get.bind(this)}), Ri.has(h))
            c.push(this.on(h, i[h]).cancel);
          else if (this[h] === void 0)
            Object.defineProperty(this, h, {get: () => i[h], set: (y) => i[h] = y, configurable: true, enumerable: true}), c.push(() => delete this[h]);
          else
            throw new Error(`Duplicate component property: "${h}"`);
        }
        let m = o(() => {
          if (i.require) {
            for (let h of i.require)
              if (!this.c(h))
                throw new Error(`Component "${i.id}" requires component "${h}"`);
          }
        }, "checkDeps");
        i.destroy && c.push(i.destroy.bind(this)), this.exists() ? (m(), i.add && i.add.call(this)) : i.require && c.push(this.on("add", m).cancel);
      }, unuse(i) {
        r[i] && (r[i].forEach((c) => c()), delete r[i]), n.has(i) && n.delete(i);
      }, c(i) {
        return n.get(i);
      }, get(i, c = {}) {
        let m = c.recursive ? this.children.flatMap((h) => [h, ...h.children]) : this.children;
        if (m = m.filter((h) => i ? h.is(i) : true), c.liveUpdate) {
          let h = o((g) => c.recursive ? this.isAncestorOf(g) : g.parent === this, "isChild");
          pn((g) => {
            h(g) && g.is(i) && m.push(g);
          }), Kn((g) => {
            if (h(g) && g.is(i)) {
              let y = m.findIndex((B) => B.id === g.id);
              y !== -1 && m.splice(y, 1);
            }
          });
        }
        return m;
      }, isAncestorOf(i) {
        return i.parent ? i.parent === this || this.isAncestorOf(i.parent) : false;
      }, exists() {
        return S.root.isAncestorOf(this);
      }, is(i) {
        if (i === "*")
          return true;
        if (Array.isArray(i)) {
          for (let c of i)
            if (!this.c(c))
              return false;
          return true;
        } else
          return this.c(i) != null;
      }, on(i, c) {
        return a.on(i, c.bind(this));
      }, trigger(i, ...c) {
        a.trigger(i, ...c), S.objEvents.trigger(i, this, ...c);
      }, destroy() {
        this.parent && this.parent.remove(this);
      }, inspect() {
        let i = {};
        for (let [c, m] of n)
          i[c] = m.inspect ? m.inspect() : null;
        return i;
      }, onAdd(i) {
        return this.on("add", i);
      }, onUpdate(i) {
        return this.on("update", i);
      }, onDraw(i) {
        return this.on("draw", i);
      }, onDestroy(i) {
        return this.on("destroy", i);
      }, clearEvents() {
        a.clear();
      }};
      for (let i of e)
        u.use(i);
      return u;
    }
    o(Yn, "make");
    function Ne(e, n, r) {
      return S.objEvents[e] || (S.objEvents[e] = new Qe()), S.objEvents.on(e, (a, ...u) => {
        a.is(n) && r(a, ...u);
      });
    }
    o(Ne, "on");
    let mn = o((e, n) => {
      if (typeof e == "function" && n === void 0) {
        let r = wt([{update: e}]);
        return {get paused() {
          return r.paused;
        }, set paused(a) {
          r.paused = a;
        }, cancel: () => r.destroy()};
      } else if (typeof e == "string")
        return Ne("update", e, n);
    }, "onUpdate"), es = o((e, n) => {
      if (typeof e == "function" && n === void 0) {
        let r = wt([{draw: e}]);
        return {get paused() {
          return r.hidden;
        }, set paused(a) {
          r.hidden = a;
        }, cancel: () => r.destroy()};
      } else if (typeof e == "string")
        return Ne("draw", e, n);
    }, "onDraw");
    function pn(e, n) {
      if (typeof e == "function" && n === void 0)
        return S.ev.on("add", e);
      if (typeof e == "string")
        return Ne("add", e, n);
    }
    o(pn, "onAdd");
    function Kn(e, n) {
      if (typeof e == "function" && n === void 0)
        return S.ev.on("destroy", e);
      if (typeof e == "string")
        return Ne("destroy", e, n);
    }
    o(Kn, "onDestroy");
    function ts(e, n, r) {
      return Ne("collide", e, (a, u, i) => u.is(n) && r(a, u, i));
    }
    o(ts, "onCollide");
    function ns(e, n, r) {
      return Ne("collideUpdate", e, (a, u, i) => u.is(n) && r(a, u, i));
    }
    o(ns, "onCollideUpdate");
    function rs(e, n, r) {
      return Ne("collideEnd", e, (a, u, i) => u.is(n) && r(a, u, i));
    }
    o(rs, "onCollideEnd");
    function It(e, n) {
      rr(e).forEach(n), pn(e, n);
    }
    o(It, "forAllCurrentAndFuture");
    function ss(e, n) {
      if (typeof e == "function")
        return U.onMousePress(e);
      {
        let r = [];
        return It(e, (a) => {
          if (!a.area)
            throw new Error("onClick() requires the object to have area() component");
          r.push(a.onClick(() => n(a)));
        }), Ae.join(r);
      }
    }
    o(ss, "onClick");
    function is(e, n) {
      let r = [];
      return It(e, (a) => {
        if (!a.area)
          throw new Error("onHover() requires the object to have area() component");
        r.push(a.onHover(() => n(a)));
      }), Ae.join(r);
    }
    o(is, "onHover");
    function os(e, n) {
      let r = [];
      return It(e, (a) => {
        if (!a.area)
          throw new Error("onHoverUpdate() requires the object to have area() component");
        r.push(a.onHoverUpdate(() => n(a)));
      }), Ae.join(r);
    }
    o(os, "onHoverUpdate");
    function as(e, n) {
      let r = [];
      return It(e, (a) => {
        if (!a.area)
          throw new Error("onHoverEnd() requires the object to have area() component");
        r.push(a.onHoverEnd(() => n(a)));
      }), Ae.join(r);
    }
    o(as, "onHoverEnd");
    function Vt(e, n) {
      let r = 0, a = [];
      n && a.push(n);
      let u = mn(() => {
        r += Pe(), r >= e && (u.cancel(), a.forEach((i) => i()));
      });
      return {paused: u.paused, cancel: u.cancel, onEnd(i) {
        a.push(i);
      }, then(i) {
        return this.onEnd(i), this;
      }};
    }
    o(Vt, "wait");
    function us(e, n) {
      let r = null, a = o(() => {
        r = Vt(e, a), n();
      }, "newAction");
      return r = Vt(0, a), {get paused() {
        return r.paused;
      }, set paused(u) {
        r.paused = u;
      }, cancel: () => r.cancel()};
    }
    o(us, "loop");
    function Xn() {
      U.onKeyPress("f1", () => {
        ne.inspect = !ne.inspect;
      }), U.onKeyPress("f2", () => {
        ne.clearLog();
      }), U.onKeyPress("f8", () => {
        ne.paused = !ne.paused;
      }), U.onKeyPress("f7", () => {
        ne.timeScale = gt(_e(ne.timeScale - 0.2, 0, 2), 1);
      }), U.onKeyPress("f9", () => {
        ne.timeScale = gt(_e(ne.timeScale + 0.2, 0, 2), 1);
      }), U.onKeyPress("f10", () => {
        ne.stepFrame();
      });
    }
    o(Xn, "enterDebugMode");
    function Jn() {
      U.onKeyPress("b", () => Ie());
    }
    o(Jn, "enterBurpMode");
    function cs(e) {
      S.gravity = e;
    }
    o(cs, "setGravity");
    function ls() {
      return S.gravity;
    }
    o(ls, "getGravity");
    function hs(...e) {
      e.length === 1 || e.length === 2 ? (w.bgColor = X(e[0]), e[1] && (w.bgAlpha = e[1])) : (e.length === 3 || e.length === 4) && (w.bgColor = X(e[0], e[1], e[2]), e[3] && (w.bgAlpha = e[3])), d.clearColor(w.bgColor.r / 255, w.bgColor.g / 255, w.bgColor.b / 255, w.bgAlpha);
    }
    o(hs, "setBackground");
    function ds() {
      return w.bgColor.clone();
    }
    o(ds, "getBackground");
    function fs() {
      return navigator.getGamepads().filter((e) => e !== null);
    }
    o(fs, "getGamepads");
    function jt(...e) {
      return {id: "pos", pos: C(...e), moveBy(...n) {
        this.pos = this.pos.add(C(...n));
      }, move(...n) {
        this.moveBy(C(...n).scale(Pe()));
      }, moveTo(...n) {
        if (typeof n[0] == "number" && typeof n[1] == "number")
          return this.moveTo(C(n[0], n[1]), n[2]);
        let r = n[0], a = n[1];
        if (a === void 0) {
          this.pos = C(r);
          return;
        }
        let u = r.sub(this.pos);
        if (u.len() <= a * Pe()) {
          this.pos = C(r);
          return;
        }
        this.move(u.unit().scale(a));
      }, worldPos() {
        return this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
      }, screenPos() {
        return this.fixed ? this.pos : fn(this.pos);
      }, inspect() {
        return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
      }, drawInspect() {
        tt({color: X(255, 0, 0), radius: 4 / kn()});
      }};
    }
    o(jt, "pos");
    function Nt(...e) {
      return e.length === 0 ? Nt(1) : {id: "scale", scale: C(...e), scaleTo(...n) {
        this.scale = C(...n);
      }, scaleBy(...n) {
        this.scale.scale(C(...n));
      }, inspect() {
        return `(${gt(this.scale.x, 2)}, ${gt(this.scale.y, 2)})`;
      }};
    }
    o(Nt, "scale");
    function ms(e) {
      return {id: "rotate", angle: e ?? 0, rotateBy(n) {
        this.angle += n;
      }, rotateTo(n) {
        this.angle = n;
      }, inspect() {
        return `${Math.round(this.angle)}`;
      }};
    }
    o(ms, "rotate");
    function ps(...e) {
      return {id: "color", color: X(...e), inspect() {
        return this.color.toString();
      }};
    }
    o(ps, "color");
    function gt(e, n) {
      return Number(e.toFixed(n));
    }
    o(gt, "toFixed");
    function gs(e) {
      return {id: "opacity", opacity: e ?? 1, inspect() {
        return `${gt(this.opacity, 1)}`;
      }, fadeOut(n = 1, r = xt.linear) {
        return bn(this.opacity, 0, n, (a) => this.opacity = a, r);
      }};
    }
    o(gs, "opacity");
    function gn(e) {
      if (!e)
        throw new Error("Please define an anchor");
      return {id: "anchor", anchor: e, inspect() {
        return typeof this.anchor == "string" ? this.anchor : this.anchor.toString();
      }};
    }
    o(gn, "anchor");
    function ws(e) {
      return {id: "z", z: e, inspect() {
        return `${this.z}`;
      }};
    }
    o(ws, "z");
    function vs(e, n) {
      return {id: "follow", require: ["pos"], follow: {obj: e, offset: n ?? C(0)}, add() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      }, update() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      }};
    }
    o(vs, "follow");
    function bs(e, n) {
      let r = typeof e == "number" ? b.fromAngle(e) : e.unit();
      return {id: "move", require: ["pos"], update() {
        this.move(r.scale(n));
      }};
    }
    o(bs, "move");
    let ys = 200;
    function Us(e = {}) {
      let n = e.distance ?? ys, r = false;
      return {id: "offscreen", require: ["pos"], isOffScreen() {
        let a = fn(this.pos), u = new te(C(0), pe(), ve());
        return !bt(u, a) && u.sdistToPoint(a) > n * n;
      }, onExitScreen(a) {
        return this.on("exitView", a);
      }, onEnterScreen(a) {
        return this.on("enterView", a);
      }, update() {
        this.isOffScreen() ? (r || (this.trigger("exitView"), r = true), e.hide && (this.hidden = true), e.pause && (this.paused = true), e.destroy && this.destroy()) : (r && (this.trigger("enterView"), r = false), e.hide && (this.hidden = false), e.pause && (this.paused = false));
      }};
    }
    o(Us, "offscreen");
    function xs(e = {}) {
      let n = [], r = {}, a = new Set();
      return {id: "area", collisionIgnore: e.collisionIgnore ?? [], add() {
        this.area.cursor && n.push(this.onHover(() => U.setCursor(this.area.cursor))), n.push(this.onCollideUpdate((u, i) => {
          r[u.id] || this.trigger("collide", u, i), r[u.id] = i, a.add(u.id);
        }));
      }, update() {
        for (let u in r)
          a.has(Number(u)) || (this.trigger("collideEnd", r[u].target), delete r[u]);
        a.clear();
      }, drawInspect() {
        let u = this.localArea();
        Se(), Ve(this.area.scale), z(this.area.offset);
        let i = {outline: {width: 4 / kn(), color: X(0, 0, 255)}, anchor: this.anchor, fill: false, fixed: this.fixed};
        u instanceof te ? Te({...i, pos: u.pos, width: u.width, height: u.height}) : u instanceof Re ? Ye({...i, pts: u.pts}) : u instanceof ke && tt({...i, pos: u.center, radius: u.radius}), ye();
      }, destroy() {
        n.forEach((u) => u.cancel());
      }, area: {shape: e.shape ?? null, scale: e.scale ? C(e.scale) : C(1), offset: e.offset ?? C(0), cursor: e.cursor ?? null}, isClicked() {
        return U.isMousePressed() && this.isHovering();
      }, isHovering() {
        let u = this.fixed ? U.mousePos() : zn(U.mousePos());
        return this.hasPoint(u);
      }, checkCollision(u) {
        return r[u.id] ?? null;
      }, getCollisions() {
        return Object.values(r);
      }, isColliding(u) {
        return Boolean(r[u.id]);
      }, isOverlapping(u) {
        let i = r[u.id];
        return i && i.hasOverlap();
      }, onClick(u) {
        return this.onUpdate(() => {
          this.isClicked() && u();
        });
      }, onHover(u) {
        let i = false;
        return this.onUpdate(() => {
          i ? i = this.isHovering() : this.isHovering() && (i = true, u());
        });
      }, onHoverUpdate(u) {
        return this.onUpdate(() => {
          this.isHovering() && u();
        });
      }, onHoverEnd(u) {
        let i = false;
        return this.onUpdate(() => {
          i ? this.isHovering() || (i = false, u()) : i = this.isHovering();
        });
      }, onCollide(u, i) {
        if (typeof u == "function" && i === void 0)
          return this.on("collide", u);
        if (typeof u == "string")
          return this.onCollide((c, m) => {
            c.is(u) && i(c, m);
          });
      }, onCollideUpdate(u, i) {
        if (typeof u == "function" && i === void 0)
          return this.on("collideUpdate", u);
        if (typeof u == "string")
          return this.on("collideUpdate", (c, m) => c.is(u) && i(c, m));
      }, onCollideEnd(u, i) {
        if (typeof u == "function" && i === void 0)
          return this.on("collideEnd", u);
        if (typeof u == "string")
          return this.on("collideEnd", (c) => c.is(u) && i(c));
      }, hasPoint(u) {
        return On(this.worldArea(), u);
      }, resolveCollision(u) {
        let i = this.checkCollision(u);
        i && !i.resolved && (this.pos = this.pos.add(i.displacement), i.resolved = true);
      }, localArea() {
        return this.area.shape ? this.area.shape : this.renderArea();
      }, worldArea() {
        let u = this.localArea();
        if (!(u instanceof Re || u instanceof te))
          throw new Error("Only support polygon and rect shapes for now");
        let i = this.transform.clone().scale(C(this.area.scale ?? 1)).translate(this.area.offset);
        if (u instanceof te) {
          let c = ct(this.anchor || Xt).add(1, 1).scale(-0.5).scale(u.width, u.height);
          i.translate(c);
        }
        return u.transform(i);
      }, screenArea() {
        let u = this.worldArea();
        return this.fixed ? u : u.transform(S.cam.transform);
      }};
    }
    o(xs, "area");
    function rt(e) {
      return {color: e.color, opacity: e.opacity, anchor: e.anchor, outline: e.outline, fixed: e.fixed, shader: e.shader, uniform: e.uniform};
    }
    o(rt, "getRenderProps");
    function wn(e, n = {}) {
      let r = null, a = null, u = new we();
      if (!e)
        throw new Error("Please pass the resource name or data to sprite()");
      let i = o((c, m, h, g) => {
        let y = C(1, 1);
        return h && g ? (y.x = h / (c.width * m.w), y.y = g / (c.height * m.h)) : h ? (y.x = h / (c.width * m.w), y.y = y.x) : g && (y.y = g / (c.height * m.h), y.x = y.y), y;
      }, "calcTexScale");
      return {id: "sprite", width: 0, height: 0, frame: n.frame || 0, quad: n.quad || new Q(0, 0, 1, 1), animSpeed: n.animSpeed ?? 1, flipX: n.flipX ?? false, flipY: n.flipY ?? false, draw() {
        if (!r)
          return;
        let c = r.frames[this.frame ?? 0];
        if (!c)
          throw new Error(`Frame not found: ${this.frame ?? 0}`);
        if (r.slice9) {
          let {left: m, right: h, top: g, bottom: y} = r.slice9, B = r.tex.width * c.w, K = r.tex.height * c.h, I = this.width - m - h, H = this.height - g - y, O = m / B, A = h / B, ee = 1 - O - A, N = g / K, _ = y / K, F = 1 - N - _, Ue = [oe(0, 0, O, N), oe(O, 0, ee, N), oe(O + ee, 0, A, N), oe(0, N, O, F), oe(O, N, ee, F), oe(O + ee, N, A, F), oe(0, N + F, O, _), oe(O, N + F, ee, _), oe(O + ee, N + F, A, _), oe(0, 0, m, g), oe(m, 0, I, g), oe(m + I, 0, h, g), oe(0, g, m, H), oe(m, g, I, H), oe(m + I, g, h, H), oe(0, g + H, m, y), oe(m, g + H, I, y), oe(m + I, g + H, h, y)];
          for (let v = 0; v < 9; v++) {
            let R = Ue[v], P = Ue[v + 9];
            Gt(Object.assign(rt(this), {pos: P.pos(), tex: r.tex, quad: c.scale(R), flipX: this.flipX, flipY: this.flipY, tiled: n.tiled, width: P.w, height: P.h}));
          }
        } else
          Gt(Object.assign(rt(this), {tex: r.tex, quad: c, flipX: this.flipX, flipY: this.flipY, tiled: n.tiled, width: this.width, height: this.height}));
      }, update() {
        if (!r) {
          let m = Mt(e);
          if (!m || !m.data)
            return;
          let h = m.data.frames[0].clone();
          n.quad && (h = h.scale(n.quad));
          let g = i(m.data.tex, h, n.width, n.height);
          this.width = m.data.tex.width * h.w * g.x, this.height = m.data.tex.height * h.h * g.y, n.anim && this.play(n.anim), r = m.data, u.trigger(r);
        }
        if (!a)
          return;
        let c = r.anims[a.name];
        if (typeof c == "number") {
          this.frame = c;
          return;
        }
        if (c.speed === 0)
          throw new Error("Sprite anim speed cannot be 0");
        a.timer += Pe() * this.animSpeed, a.timer >= 1 / a.speed && (a.timer = 0, c.from > c.to ? (this.frame--, this.frame < c.to && (a.loop ? this.frame = c.from : (this.frame++, a.onEnd(), this.stop()))) : (this.frame++, this.frame > c.to && (a.loop ? this.frame = c.from : (this.frame--, a.onEnd(), this.stop()))));
      }, play(c, m = {}) {
        if (!r) {
          u.add(() => this.play(c, m));
          return;
        }
        let h = r.anims[c];
        if (!h)
          throw new Error(`Anim not found: ${c}`);
        a && this.stop(), a = typeof h == "number" ? {name: c, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: () => {
        }} : {name: c, timer: 0, loop: m.loop ?? h.loop ?? false, pingpong: m.pingpong ?? h.pingpong ?? false, speed: m.speed ?? h.speed ?? 10, onEnd: m.onEnd ?? (() => {
        })}, this.frame = typeof h == "number" ? h : h.from, this.trigger("animStart", c);
      }, stop() {
        if (!a)
          return;
        let c = a.name;
        a = null, this.trigger("animEnd", c);
      }, numFrames() {
        return r?.frames.length ?? 0;
      }, curAnim() {
        return a?.name;
      }, onAnimEnd(c) {
        return this.on("animEnd", c);
      }, onAnimStart(c) {
        return this.on("animStart", c);
      }, renderArea() {
        return new te(C(0), this.width, this.height);
      }, inspect() {
        if (typeof e == "string")
          return `"${e}"`;
      }};
    }
    o(wn, "sprite");
    function Es(e, n = {}) {
      function r(a) {
        let u = Ke(Object.assign(rt(a), {text: a.text + "", size: a.textSize, font: a.font, width: n.width && a.width, align: a.align, letterSpacing: a.letterSpacing, lineSpacing: a.lineSpacing, transform: a.textTransform, styles: a.textStyles}));
        return n.width || (a.width = u.width / (a.scale?.x || 1)), a.height = u.height / (a.scale?.y || 1), u;
      }
      return o(r, "update"), {id: "text", text: e, textSize: n.size ?? Ci, font: n.font, width: n.width, height: 0, align: n.align, lineSpacing: n.lineSpacing, letterSpacing: n.letterSpacing, textTransform: n.transform, textStyles: n.styles, add() {
        Zn(() => r(this));
      }, draw() {
        Xe(r(this));
      }, renderArea() {
        return new te(C(0), this.width, this.height);
      }};
    }
    o(Es, "text");
    function Cs(e, n, r = {}) {
      return {id: "rect", width: e, height: n, radius: r.radius || 0, draw() {
        Te(Object.assign(rt(this), {width: this.width, height: this.height, radius: this.radius}));
      }, renderArea() {
        return new te(C(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      }};
    }
    o(Cs, "rect");
    function Ss(e, n) {
      return {id: "rect", width: e, height: n, draw() {
        et(Object.assign(rt(this), {width: this.width, height: this.height}));
      }, renderArea() {
        return new te(C(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      }};
    }
    o(Ss, "uvquad");
    function Ts(e) {
      return {id: "circle", radius: e, draw() {
        tt(Object.assign(rt(this), {radius: this.radius}));
      }, renderArea() {
        return new te(new b(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
      }, inspect() {
        return `${Math.ceil(this.radius)}`;
      }};
    }
    o(Ts, "circle");
    function As(e = 1, n = X(0, 0, 0)) {
      return {id: "outline", outline: {width: e, color: n}};
    }
    o(As, "outline");
    function Wn(e, n) {
      let r = new Qe();
      return e && n && r.pushd(new He(e, n)), {id: "timer", wait(a, u) {
        let i = [u], c = new He(a, () => i.forEach((h) => h())), m = r.pushd(c);
        return {get paused() {
          return c.paused;
        }, set paused(h) {
          c.paused = h;
        }, cancel: m, onEnd(h) {
          i.push(h);
        }, then(h) {
          return this.onEnd(h), this;
        }};
      }, update() {
        r.forEach((a, u) => {
          a.tick(Pe()) && r.delete(u);
        });
      }};
    }
    o(Wn, "timer");
    let Os = 640, Ps = 65536;
    function Rs(e = {}) {
      let n = C(0), r = null, a = null, u = false, i = [];
      return {id: "body", require: ["pos", "area"], jumpForce: e.jumpForce ?? Os, gravityScale: e.gravityScale ?? 1, isStatic: e.isStatic ?? false, mass: e.mass ?? 1, add() {
        if (this.mass === 0)
          throw new Error("Can't set body mass to 0");
        i.push(this.onCollideUpdate((c, m) => {
          if (c.is("body") && !m.resolved && (this.trigger("beforePhysicsResolve", m), c.trigger("beforePhysicsResolve", m.reverse()), !m.resolved && !(this.isStatic && c.isStatic))) {
            if (!this.isStatic && !c.isStatic) {
              let h = this.mass + c.mass;
              this.pos = this.pos.add(m.displacement.scale(c.mass / h)), c.pos = c.pos.add(m.displacement.scale(-this.mass / h)), this.transform = Lt(this), c.transform = Lt(c);
            } else {
              let h = !this.isStatic && c.isStatic ? m : m.reverse();
              h.source.pos = h.source.pos.add(h.displacement), h.source.transform = Lt(h.source);
            }
            m.resolved = true, this.trigger("physicsResolve", m), c.trigger("physicsResolve", m.reverse());
          }
        })), i.push(this.onPhysicsResolve((c) => {
          S.gravity && (c.isBottom() && this.isFalling() ? (n.y = 0, r = c.target, a = c.target.pos, u ? u = false : this.trigger("ground", r)) : c.isTop() && this.isJumping() && (n.y = 0, this.trigger("headbutt", c.target)));
        }));
      }, update() {
        if (!S.gravity || this.isStatic)
          return;
        if (u && (r = null, a = null, this.trigger("fallOff"), u = false), r)
          if (!this.isOverlapping(r) || !r.exists() || !r.is("body"))
            u = true;
          else {
            !r.pos.eq(a) && e.stickToPlatform !== false && this.moveBy(r.pos.sub(a)), a = r.pos;
            return;
          }
        let c = n.y;
        n.y += S.gravity * this.gravityScale * Pe(), n.y = Math.min(n.y, e.maxVelocity ?? Ps), c < 0 && n.y >= 0 && this.trigger("fall"), this.move(n);
      }, destroy() {
        i.forEach((c) => c.cancel());
      }, onPhysicsResolve(c) {
        return this.on("physicsResolve", c);
      }, onBeforePhysicsResolve(c) {
        return this.on("beforePhysicsResolve", c);
      }, curPlatform() {
        return r;
      }, isGrounded() {
        return r !== null;
      }, isFalling() {
        return n.y > 0;
      }, isJumping() {
        return n.y < 0;
      }, jump(c) {
        r = null, a = null, n.y = -c || -this.jumpForce;
      }, onGround(c) {
        return this.on("ground", c);
      }, onFall(c) {
        return this.on("fall", c);
      }, onFallOff(c) {
        return this.on("fallOff", c);
      }, onHeadbutt(c) {
        return this.on("headbutt", c);
      }};
    }
    o(Rs, "body");
    function Ms(e = 2) {
      let n = e, r = [];
      return {id: "doubleJump", require: ["body"], numJumps: e, add() {
        r.push(this.onGround(() => {
          n = this.numJumps;
        }));
      }, destroy() {
        r.forEach((a) => a.cancel());
      }, doubleJump(a) {
        n <= 0 || (n < this.numJumps && this.trigger("doubleJump"), n--, this.jump(a));
      }, onDoubleJump(a) {
        return this.on("doubleJump", a);
      }, inspect() {
        return `${n}`;
      }};
    }
    o(Ms, "doubleJump");
    function Ds(e, n) {
      return {id: "shader", shader: e, ...typeof n == "function" ? {uniform: n(), update() {
        this.uniform = n();
      }} : {uniform: n}};
    }
    o(Ds, "shader");
    function Bs() {
      return {id: "fixed", fixed: true};
    }
    o(Bs, "fixed");
    function Qn(e) {
      return {id: "stay", stay: true, scenesToStay: e};
    }
    o(Qn, "stay");
    function Fs(e) {
      if (e == null)
        throw new Error("health() requires the initial amount of hp");
      return {id: "health", hurt(n = 1) {
        this.setHP(e - n), this.trigger("hurt");
      }, heal(n = 1) {
        this.setHP(e + n), this.trigger("heal");
      }, hp() {
        return e;
      }, setHP(n) {
        e = n, e <= 0 && this.trigger("death");
      }, onHurt(n) {
        return this.on("hurt", n);
      }, onHeal(n) {
        return this.on("heal", n);
      }, onDeath(n) {
        return this.on("death", n);
      }, inspect() {
        return `${e}`;
      }};
    }
    o(Fs, "health");
    function Gs(e, n = {}) {
      if (e == null)
        throw new Error("lifespan() requires time");
      let r = n.fade ?? 0;
      return {id: "lifespan", async add() {
        await Vt(e), r > 0 && this.opacity && await bn(this.opacity, 0, r, (a) => this.opacity = a, xt.linear), this.destroy();
      }};
    }
    o(Gs, "lifespan");
    function Ls(e, n, r) {
      if (!e)
        throw new Error("state() requires an initial state");
      let a = {};
      function u(h) {
        a[h] || (a[h] = {enter: new we(), end: new we(), update: new we(), draw: new we()});
      }
      o(u, "initStateEvents");
      function i(h, g, y) {
        return u(g), a[g][h].add(y);
      }
      o(i, "on");
      function c(h, g, ...y) {
        u(g), a[g][h].trigger(...y);
      }
      o(c, "trigger");
      let m = false;
      return {id: "state", state: e, enterState(h, ...g) {
        if (m = true, n && !n.includes(h))
          throw new Error(`State not found: ${h}`);
        let y = this.state;
        if (r) {
          if (!r?.[y])
            return;
          let B = typeof r[y] == "string" ? [r[y]] : r[y];
          if (!B.includes(h))
            throw new Error(`Cannot transition state from "${y}" to "${h}". Available transitions: ${B.map((K) => `"${K}"`).join(", ")}`);
        }
        c("end", y, ...g), this.state = h, c("enter", h, ...g), c("enter", `${y} -> ${h}`, ...g);
      }, onStateTransition(h, g, y) {
        return i("enter", `${h} -> ${g}`, y);
      }, onStateEnter(h, g) {
        return i("enter", h, g);
      }, onStateUpdate(h, g) {
        return i("update", h, g);
      }, onStateDraw(h, g) {
        return i("draw", h, g);
      }, onStateEnd(h, g) {
        return i("end", h, g);
      }, update() {
        m || (c("enter", e), m = true), c("update", this.state);
      }, draw() {
        c("draw", this.state);
      }, inspect() {
        return this.state;
      }};
    }
    o(Ls, "state");
    function Is(e = 1) {
      let n = 0, r = false;
      return {require: ["opacity"], add() {
        this.opacity = 0;
      }, update() {
        r || (n += Pe(), this.opacity = qt(n, 0, e, 0, 1), n >= e && (this.opacity = 1, r = true));
      }};
    }
    o(Is, "fadeIn");
    function Zn(e) {
      G.loaded ? e() : S.ev.on("load", e);
    }
    o(Zn, "onLoad");
    function Vs(e, n) {
      S.scenes[e] = n;
    }
    o(Vs, "scene");
    function js(e, ...n) {
      if (!S.scenes[e])
        throw new Error(`Scene not found: ${e}`);
      S.ev.onOnce("frameEnd", () => {
        S.ev = new Oe(), S.objEvents = new Oe(), [...S.root.children].forEach((r) => {
          (!r.stay || r.scenesToStay && !r.scenesToStay.includes(e)) && S.root.remove(r);
        }), S.root.clearEvents(), S.cam = {pos: null, scale: C(1), angle: 0, shake: 0, transform: new W()}, S.scenes[e](...n), s.debug !== false && Xn(), s.burp && Jn();
      });
    }
    o(js, "go");
    function Ns(e, n) {
      try {
        return JSON.parse(window.localStorage[e]);
      } catch {
        return n ? (er(e, n), n) : null;
      }
    }
    o(Ns, "getData");
    function er(e, n) {
      window.localStorage[e] = JSON.stringify(n);
    }
    o(er, "setData");
    function tr(e) {
      let n = e(st);
      for (let r in n)
        st[r] = n[r], s.global !== false && (window[r] = n[r]);
      return st;
    }
    o(tr, "plug");
    function _t() {
      return C(pe() / 2, ve() / 2);
    }
    o(_t, "center");
    let _s;
    ((A) => (A[A.None = 0] = "None", A[A.Left = 1] = "Left", A[A.Top = 2] = "Top", A[A.LeftTop = 3] = "LeftTop", A[A.Right = 4] = "Right", A[A.Horizontal = 5] = "Horizontal", A[A.RightTop = 6] = "RightTop", A[A.HorizontalTop = 7] = "HorizontalTop", A[A.Bottom = 8] = "Bottom", A[A.LeftBottom = 9] = "LeftBottom", A[A.Vertical = 10] = "Vertical", A[A.LeftVertical = 11] = "LeftVertical", A[A.RightBottom = 12] = "RightBottom", A[A.HorizontalBottom = 13] = "HorizontalBottom", A[A.RightVertical = 14] = "RightVertical", A[A.All = 15] = "All"))(_s ||= {});
    function nr(e = {}) {
      let n = C(0), r = e.isObstacle ?? false, a = e.cost ?? 0, u = e.edges ?? [], i = o(() => {
        let m = {left: 1, top: 2, right: 4, bottom: 8};
        return u.map((h) => m[h] || 0).reduce((h, g) => h | g, 0);
      }, "getEdgeMask"), c = i();
      return {id: "tile", tilePosOffset: e.offset ?? C(0), set tilePos(m) {
        let h = this.getLevel();
        n = m.clone(), this.pos = C(this.tilePos.x * h.tileWidth(), this.tilePos.y * h.tileHeight()).add(this.tilePosOffset);
      }, get tilePos() {
        return n;
      }, set isObstacle(m) {
        r !== m && (r = m, this.getLevel().invalidateNavigationMap());
      }, get isObstacle() {
        return r;
      }, set cost(m) {
        a !== m && (a = m, this.getLevel().invalidateNavigationMap());
      }, get cost() {
        return a;
      }, set edges(m) {
        u = m, c = i(), this.getLevel().invalidateNavigationMap();
      }, get edges() {
        return u;
      }, get edgeMask() {
        return c;
      }, getLevel() {
        return this.parent;
      }, moveLeft() {
        this.tilePos = this.tilePos.add(C(-1, 0));
      }, moveRight() {
        this.tilePos = this.tilePos.add(C(1, 0));
      }, moveUp() {
        this.tilePos = this.tilePos.add(C(0, -1));
      }, moveDown() {
        this.tilePos = this.tilePos.add(C(0, 1));
      }};
    }
    o(nr, "tile");
    function ks(e, n) {
      if (!n.tileWidth || !n.tileHeight)
        throw new Error("Must provide tileWidth and tileHeight.");
      let r = wt([jt(n.pos ?? C(0))]), a = e.length, u = 0, i = null, c = null, m = null, h = null, g = o((v) => v.x + v.y * u, "tile2Hash"), y = o((v) => C(Math.floor(v % u), Math.floor(v / u)), "hash2Tile"), B = o(() => {
        i = [];
        for (let v of r.children)
          K(v);
      }, "createSpatialMap"), K = o((v) => {
        let R = g(v.tilePos);
        i[R] ? i[R].push(v) : i[R] = [v];
      }, "insertIntoSpatialMap"), I = o((v) => {
        let R = g(v.tilePos);
        if (i[R]) {
          let P = i[R].indexOf(v);
          P >= 0 && i[R].splice(P, 1);
        }
      }, "removeFromSpatialMap"), H = o(() => {
        let v = false;
        for (let R of r.children) {
          let P = r.pos2Tile(R.pos);
          (R.tilePos.x != P.x || R.tilePos.y != P.y) && (v = true, I(R), R.tilePos.x = P.x, R.tilePos.y = P.y, K(R));
        }
        v && r.trigger("spatial_map_changed");
      }, "updateSpatialMap"), O = o(() => {
        let v = r.getSpatialMap(), R = r.numRows() * r.numColumns();
        c ? c.length = R : c = new Array(R), c.fill(1, 0, R);
        for (let P = 0; P < v.length; P++) {
          let D = v[P];
          if (D) {
            let V = 0;
            for (let Y of D)
              if (Y.isObstacle) {
                V = 1 / 0;
                break;
              } else
                V += Y.cost;
            c[P] = V || 1;
          }
        }
      }, "createCostMap"), A = o(() => {
        let v = r.getSpatialMap(), R = r.numRows() * r.numColumns();
        m ? m.length = R : m = new Array(R), m.fill(15, 0, R);
        for (let P = 0; P < v.length; P++) {
          let D = v[P];
          if (D) {
            let V = D.length, Y = 15;
            for (let se = 0; se < V; se++)
              Y |= D[se].edgeMask;
            m[P] = Y;
          }
        }
      }, "createEdgeMap"), ee = o(() => {
        let v = r.numRows() * r.numColumns(), R = o((D, V) => {
          let Y = [];
          for (Y.push(D); Y.length > 0; ) {
            let se = Y.pop();
            F(se).forEach((de) => {
              h[de] < 0 && (h[de] = V, Y.push(de));
            });
          }
        }, "traverse");
        h ? h.length = v : h = new Array(v), h.fill(-1, 0, v);
        let P = 0;
        for (let D = 0; D < c.length; D++) {
          if (h[D] >= 0) {
            P++;
            continue;
          }
          R(D, P), P++;
        }
      }, "createConnectivityMap"), N = o((v, R) => c[R], "getCost"), _ = o((v, R) => {
        let P = y(v), D = y(R);
        return P.dist(D);
      }, "getHeuristic"), F = o((v, R) => {
        let P = [], D = Math.floor(v % u), V = D > 0 && m[v] & 1 && c[v - 1] !== 1 / 0, Y = v >= u && m[v] & 2 && c[v - u] !== 1 / 0, se = D < u - 1 && m[v] & 4 && c[v + 1] !== 1 / 0, de = v < u * a - u - 1 && m[v] & 8 && c[v + u] !== 1 / 0;
        return R ? (V && (Y && P.push(v - u - 1), P.push(v - 1), de && P.push(v + u - 1)), Y && P.push(v - u), se && (Y && P.push(v - u + 1), P.push(v + 1), de && P.push(v + u + 1)), de && P.push(v + u)) : (V && P.push(v - 1), Y && P.push(v - u), se && P.push(v + 1), de && P.push(v + u)), P;
      }, "getNeighbours"), Ue = {id: "level", tileWidth() {
        return n.tileWidth;
      }, tileHeight() {
        return n.tileHeight;
      }, spawn(v, ...R) {
        let P = C(...R), D = (() => {
          if (typeof v == "string") {
            if (n.tiles[v]) {
              if (typeof n.tiles[v] != "function")
                throw new Error("Level symbol def must be a function returning a component list");
              return n.tiles[v](P);
            } else if (n.wildcardTile)
              return n.wildcardTile(v, P);
          } else {
            if (Array.isArray(v))
              return v;
            throw new Error("Expected a symbol or a component list");
          }
        })();
        if (!D)
          return null;
        let V = false, Y = false;
        for (let de of D)
          de.id === "tile" && (Y = true), de.id === "pos" && (V = true);
        V || D.push(jt()), Y || D.push(nr());
        let se = r.add(D);
        return V && (se.tilePosOffset = se.pos.clone()), se.tilePos = P, i && (K(se), this.trigger("spatial_map_changed"), this.trigger("navigation_map_invalid")), se;
      }, numColumns() {
        return u;
      }, numRows() {
        return a;
      }, levelWidth() {
        return u * this.tileWidth();
      }, levelHeight() {
        return a * this.tileHeight();
      }, tile2Pos(...v) {
        return C(...v).scale(this.tileWidth(), this.tileHeight());
      }, pos2Tile(...v) {
        let R = C(...v);
        return C(Math.floor(R.x / this.tileWidth()), Math.floor(R.y / this.tileHeight()));
      }, getSpatialMap() {
        return i || B(), i;
      }, onSpatialMapChanged(v) {
        return this.on("spatial_map_changed", v);
      }, onNavigationMapInvalid(v) {
        return this.on("navigation_map_invalid", v);
      }, getAt(v) {
        i || B();
        let R = g(v);
        return i[R] || [];
      }, update() {
        i && H();
      }, invalidateNavigationMap() {
        c = null, m = null, h = null;
      }, onNavigationMapChanged(v) {
        return this.on("navigation_map_changed", v);
      }, getTilePath(v, R, P = {}) {
        if (c || O(), m || A(), h || ee(), v.x < 0 || v.x >= u || v.y < 0 || v.y >= a || R.x < 0 || R.x >= u || R.y < 0 || R.y >= a)
          return null;
        let D = g(v), V = g(R);
        if (c[V] === 1 / 0)
          return null;
        if (D === V)
          return [];
        if (h[D] != -1 && h[D] !== h[V])
          return null;
        let Y = new Ut((Ge, Un) => Ge.cost < Un.cost);
        Y.insert({cost: 0, node: D});
        let se = new Map();
        se.set(D, D);
        let de = new Map();
        for (de.set(D, 0); Y.length !== 0; ) {
          let Ge = Y.remove()?.node;
          if (Ge === V)
            break;
          let Un = F(Ge, P.allowDiagonals);
          for (let Je of Un) {
            let xn = (de.get(Ge) || 0) + N(Ge, Je) + _(Je, V);
            (!de.has(Je) || xn < de.get(Je)) && (de.set(Je, xn), Y.insert({cost: xn, node: Je}), se.set(Je, Ge));
          }
        }
        let yn = [], vt = V, ui = y(vt);
        for (yn.push(ui); vt !== D; ) {
          vt = se.get(vt);
          let Ge = y(vt);
          yn.push(Ge);
        }
        return yn.reverse();
      }, getPath(v, R, P = {}) {
        let D = this.tileWidth(), V = this.tileHeight(), Y = this.getTilePath(this.pos2Tile(v), this.pos2Tile(R), P);
        return Y ? [v, ...Y.slice(1, -1).map((se) => se.scale(D, V).add(D / 2, V / 2)), R] : null;
      }};
      return r.use(Ue), r.onNavigationMapInvalid(() => {
        r.invalidateNavigationMap(), r.trigger("navigation_map_changed");
      }), e.forEach((v, R) => {
        let P = v.split("");
        u = Math.max(P.length, u), P.forEach((D, V) => {
          r.spawn(D, C(V, R));
        });
      }), r;
    }
    o(ks, "addLevel");
    function Hs(e = {}) {
      let n = null, r = null, a = null, u = null;
      return {id: "agent", require: ["pos", "tile"], agentSpeed: e.speed ?? 100, allowDiagonals: e.allowDiagonals ?? true, getDistanceToTarget() {
        return n ? this.pos.dist(n) : 0;
      }, getNextLocation() {
        return r && a ? r[a] : null;
      }, getPath() {
        return r ? r.slice() : null;
      }, getTarget() {
        return n;
      }, isNavigationFinished() {
        return r ? a === null : true;
      }, isTargetReachable() {
        return r !== null;
      }, isTargetReached() {
        return n ? this.pos.eq(n) : true;
      }, setTarget(i) {
        n = i, r = this.getLevel().getPath(this.pos, n, {allowDiagonals: this.allowDiagonals}), a = r ? 0 : null, r ? (u || (u = this.getLevel().onNavigationMapChanged(() => {
          r && a !== null && (r = this.getLevel().getPath(this.pos, n, {allowDiagonals: this.allowDiagonals}), a = r ? 0 : null, r ? this.trigger("navigation-next", this, r[a]) : this.trigger("navigation-ended", this));
        }), this.onDestroy(() => u.cancel())), this.trigger("navigation-started", this), this.trigger("navigation-next", this, r[a])) : this.trigger("navigation-ended", this);
      }, update() {
        if (r && a !== null) {
          if (this.pos.sdist(r[a]) < 2)
            if (a === r.length - 1) {
              this.pos = n.clone(), a = null, this.trigger("navigation-ended", this), this.trigger("target-reached", this);
              return;
            } else
              a++, this.trigger("navigation-next", this, r[a]);
          this.moveTo(r[a], this.agentSpeed);
        }
      }, onNavigationStarted(i) {
        return this.on("navigation-started", i);
      }, onNavigationNext(i) {
        return this.on("navigation-next", i);
      }, onNavigationEnded(i) {
        return this.on("navigation-ended", i);
      }, onTargetReached(i) {
        return this.on("target-reached", i);
      }, inspect() {
        return JSON.stringify({target: JSON.stringify(n), path: JSON.stringify(r)});
      }};
    }
    o(Hs, "agent");
    function qs(e) {
      let n = U.canvas().captureStream(e), r = ce.ctx.createMediaStreamDestination();
      ce.masterNode.connect(r);
      let a = new MediaRecorder(n), u = [];
      return a.ondataavailable = (i) => {
        i.data.size > 0 && u.push(i.data);
      }, a.onerror = () => {
        ce.masterNode.disconnect(r), n.getTracks().forEach((i) => i.stop());
      }, a.start(), {resume() {
        a.resume();
      }, pause() {
        a.pause();
      }, stop() {
        return a.stop(), ce.masterNode.disconnect(r), n.getTracks().forEach((i) => i.stop()), new Promise((i) => {
          a.onstop = () => {
            i(new Blob(u, {type: "video/mp4"}));
          };
        });
      }, download(i = "kaboom.mp4") {
        this.stop().then((c) => Mn(i, c));
      }};
    }
    o(qs, "record");
    function $s() {
      return document.activeElement === U.canvas();
    }
    o($s, "isFocused");
    function zs(e) {
      e.destroy();
    }
    o(zs, "destroy");
    let wt = S.root.add.bind(S.root), Ys = S.root.readd.bind(S.root), Ks = S.root.removeAll.bind(S.root), rr = S.root.get.bind(S.root);
    function sr(e = 2, n = 1) {
      let r = 0;
      return {id: "boom", require: ["scale"], update() {
        let a = Math.sin(r * e) * n;
        a < 0 && this.destroy(), this.scale = C(a), r += Pe();
      }};
    }
    o(sr, "boom");
    let Xs = ze(null, Or), Js = ze(null, Pr);
    function Ws(e, n = {}) {
      let r = wt([jt(e), Qn()]), a = (n.speed || 1) * 5, u = n.scale || 1;
      r.add([wn(Js), Nt(0), gn("center"), sr(a, u), ...n.comps ?? []]);
      let i = r.add([wn(Xs), Nt(0), gn("center"), Wn(0.4 / a, () => i.use(sr(a, u))), ...n.comps ?? []]);
      return i.onDestroy(() => r.destroy()), r;
    }
    o(Ws, "addKaboom");
    function ir() {
      S.root.update();
    }
    o(ir, "updateFrame");
    class kt {
      source;
      target;
      displacement;
      resolved = false;
      constructor(n, r, a, u = false) {
        this.source = n, this.target = r, this.displacement = a, this.resolved = u;
      }
      reverse() {
        return new kt(this.target, this.source, this.displacement.scale(-1), this.resolved);
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.x > 0;
      }
      isRight() {
        return this.displacement.x < 0;
      }
      isTop() {
        return this.displacement.y > 0;
      }
      isBottom() {
        return this.displacement.y < 0;
      }
      preventResolution() {
        this.resolved = true;
      }
    }
    o(kt, "Collision");
    function Qs() {
      let e = {}, n = s.hashGridSize || Si, r = new W(), a = [];
      function u(i) {
        if (a.push(r.clone()), i.pos && r.translate(i.pos), i.scale && r.scale(i.scale), i.angle && r.rotate(i.angle), i.transform = r.clone(), i.c("area") && !i.paused) {
          let c = i, h = c.worldArea().bbox(), g = Math.floor(h.pos.x / n), y = Math.floor(h.pos.y / n), B = Math.ceil((h.pos.x + h.width) / n), K = Math.ceil((h.pos.y + h.height) / n), I = new Set();
          for (let H = g; H <= B; H++)
            for (let O = y; O <= K; O++)
              if (!e[H])
                e[H] = {}, e[H][O] = [c];
              else if (!e[H][O])
                e[H][O] = [c];
              else {
                let A = e[H][O];
                e:
                  for (let ee of A) {
                    if (!ee.exists() || I.has(ee.id))
                      continue;
                    for (let _ of c.collisionIgnore)
                      if (ee.is(_))
                        continue e;
                    for (let _ of ee.collisionIgnore)
                      if (c.is(_))
                        continue e;
                    let N = vr(c.worldArea(), ee.worldArea());
                    if (N) {
                      let _ = new kt(c, ee, N);
                      c.trigger("collideUpdate", ee, _);
                      let F = _.reverse();
                      F.resolved = _.resolved, ee.trigger("collideUpdate", c, F);
                    }
                    I.add(ee.id);
                  }
                A.push(c);
              }
        }
        i.children.forEach(u), r = a.pop();
      }
      o(u, "checkObj"), u(S.root);
    }
    o(Qs, "checkFrame");
    function Zs() {
      let e = S.cam, n = b.fromAngle(yt(0, 360)).scale(e.shake);
      e.shake = Le(e.shake, 0, 5 * Pe()), e.transform = new W().translate(_t()).scale(e.scale).rotate(e.angle).translate((e.pos ?? _t()).scale(-1).add(n)), S.root.draw(), Ce();
    }
    o(Zs, "drawFrame");
    function ei() {
      let e = Be();
      S.ev.numListeners("loading") > 0 ? S.ev.trigger("loading", e) : Fe(() => {
        let n = pe() / 2, r = 24, a = C(pe() / 2, ve() / 2).sub(C(n / 2, r / 2));
        Te({pos: C(0), width: pe(), height: ve(), color: X(0, 0, 0)}), Te({pos: a, width: n, height: r, fill: false, outline: {width: 4}}), Te({pos: a, width: n * e, height: r});
      });
    }
    o(ei, "drawLoadScreen");
    function or(e, n) {
      Fe(() => {
        let r = C(8);
        Se(), z(e);
        let a = Ke({text: n, font: Jt, size: 16, pos: r, color: X(255, 255, 255), fixed: true}), u = a.width + r.x * 2, i = a.height + r.x * 2;
        e.x + u >= pe() && z(C(-u, 0)), e.y + i >= ve() && z(C(0, -i)), Te({width: u, height: i, color: X(0, 0, 0), radius: 4, opacity: 0.8, fixed: true}), Xe(a), ye();
      });
    }
    o(or, "drawInspectText");
    function ti() {
      if (ne.inspect) {
        let e = null;
        for (let n of S.root.get("*", {recursive: true}))
          if (n.c("area") && n.isHovering()) {
            e = n;
            break;
          }
        if (S.root.drawInspect(), e) {
          let n = [], r = e.inspect();
          for (let a in r)
            r[a] ? n.push(`${a}: ${r[a]}`) : n.push(`${a}`);
          or(Xr(U.mousePos()), n.join(`
`));
        }
        or(C(8), `FPS: ${ne.fps()}`);
      }
      ne.paused && Fe(() => {
        Se(), z(pe(), 0), z(-8, 8);
        let e = 32;
        Te({width: e, height: e, anchor: "topright", color: X(0, 0, 0), opacity: 0.8, radius: 4, fixed: true});
        for (let n = 1; n <= 2; n++)
          Te({width: 4, height: e * 0.6, anchor: "center", pos: C(-e / 3 * n, e * 0.5), color: X(255, 255, 255), radius: 2, fixed: true});
        ye();
      }), ne.timeScale !== 1 && Fe(() => {
        Se(), z(pe(), ve()), z(-8, -8);
        let e = 8, n = Ke({text: ne.timeScale.toFixed(1), font: Jt, size: 16, color: X(255, 255, 255), pos: C(-e), anchor: "botright", fixed: true});
        Te({width: n.width + e * 2 + e * 4, height: n.height + e * 2, anchor: "botright", color: X(0, 0, 0), opacity: 0.8, radius: 4, fixed: true});
        for (let r = 0; r < 2; r++) {
          let a = ne.timeScale < 1;
          jn({p1: C(-n.width - e * (a ? 2 : 3.5), -e), p2: C(-n.width - e * (a ? 2 : 3.5), -e - n.height), p3: C(-n.width - e * (a ? 3.5 : 2), -e - n.height / 2), pos: C(-r * e * 1 + (a ? -e * 0.5 : 0), 0), color: X(255, 255, 255), fixed: true});
        }
        Xe(n), ye();
      }), ne.curRecording && Fe(() => {
        Se(), z(0, ve()), z(24, -24), tt({radius: 12, color: X(255, 0, 0), opacity: Sn(0, 1, U.time() * 4), fixed: true}), ye();
      }), ne.showLog && S.logs.length > 0 && Fe(() => {
        Se(), z(0, ve()), z(8, -8);
        let e = 8, n = Ke({text: S.logs.join(`
`), font: Jt, pos: C(e, -e), anchor: "botleft", size: 16, width: pe() * 0.6, lineSpacing: e / 2, fixed: true, styles: {time: {color: X(127, 127, 127)}, info: {color: X(255, 255, 255)}, error: {color: X(255, 0, 127)}}});
        Te({width: n.width + e * 2, height: n.height + e * 2, anchor: "botleft", color: X(0, 0, 0), radius: 4, opacity: 0.8, fixed: true}), Xe(n), ye();
      });
    }
    o(ti, "drawDebug"), s.debug !== false && Xn(), s.burp && Jn();
    function ni(e) {
      S.ev.on("loading", e);
    }
    o(ni, "onLoading");
    function ri(e) {
      S.ev.on("resize", e);
    }
    o(ri, "onResize");
    function si(e) {
      S.ev.on("gamepadConnect", e);
    }
    o(si, "onGamepadConnect");
    function ii(e) {
      S.ev.on("gamepadDisconnect", e);
    }
    o(ii, "onGamepadDisconnect");
    function oi(e) {
      S.ev.on("error", e);
    }
    o(oi, "onError");
    function vn(e) {
      U.run(() => {
        Fe(() => {
          let a = pe(), u = ve(), i = {size: 36, width: a - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: Jt, fixed: true};
          Te({width: a, height: u, color: X(0, 0, 255), fixed: true});
          let c = Ke({...i, text: e.name, pos: C(32), color: X(255, 128, 0), fixed: true});
          Xe(c), $n({...i, text: e.message, pos: C(32, 32 + c.height + 16), fixed: true}), ye(), S.ev.trigger("error", e);
        });
      });
    }
    o(vn, "handleErr");
    function ai() {
      S.ev.onOnce("frameEnd", () => {
        U.quit();
        for (let n in nt)
          window.removeEventListener(n, nt[n]);
        d.clear(d.COLOR_BUFFER_BIT | d.DEPTH_BUFFER_BIT | d.STENCIL_BUFFER_BIT);
        let e = d.getParameter(d.MAX_TEXTURE_IMAGE_UNITS);
        for (let n = 0; n < e; n++)
          d.activeTexture(d.TEXTURE0 + n), d.bindTexture(d.TEXTURE_2D, null), d.bindTexture(d.TEXTURE_CUBE_MAP, null);
        d.bindBuffer(d.ARRAY_BUFFER, null), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, null), d.bindRenderbuffer(d.RENDERBUFFER, null), d.bindFramebuffer(d.FRAMEBUFFER, null), J.forEach((n) => n()), d.deleteBuffer(w.vbuf), d.deleteBuffer(w.ibuf);
      });
    }
    o(ai, "quit");
    function bn(e, n, r, a, u = xt.linear) {
      let i = 0, c = [], m = mn(() => {
        i += Pe();
        let h = Math.min(i / r, 1);
        a(Le(e, n, u(h))), h === 1 && (m.cancel(), a(n), c.forEach((g) => g()));
      });
      return {get paused() {
        return m.paused;
      }, set paused(h) {
        m.paused = h;
      }, onEnd(h) {
        c.push(h);
      }, then(h) {
        return this.onEnd(h), this;
      }, cancel() {
        m.cancel();
      }, finish() {
        m.cancel(), a(n), c.forEach((h) => h());
      }};
    }
    o(bn, "tween");
    let Ht = true;
    U.run(() => {
      Ft(), G.loaded || Be() === 1 && !Ht && (G.loaded = true, S.ev.trigger("load")), !G.loaded && s.loadingScreen !== false || Ht ? ei() : (ne.paused || ir(), Qs(), Zs(), s.debug !== false && ti()), Ht && (Ht = false), E(), S.ev.trigger("frameEnd");
    }), Kr();
    let st = {VERSION: xi, loadRoot: Qt, loadProgress: Be, loadSprite: ze, loadSpriteAtlas: Ct, loadSound: un, loadBitmapFont: nn, loadFont: tn, loadShader: on, loadShaderURL: an, loadAseprite: sn, loadPedit: rn, loadBean: cn, load: lt, getSprite: Tt, getSound: At, getFont: Ot, getBitmapFont: Pt, getShader: Rt, Asset: le, SpriteData: ue, SoundData: me, width: pe, height: ve, center: _t, dt: Pe, time: U.time, screenshot: U.screenshot, record: qs, isFocused: $s, setCursor: U.setCursor, getCursor: U.getCursor, setCursorLocked: U.setCursorLocked, isCursorLocked: U.isCursorLocked, setFullscreen: U.setFullscreen, isFullscreen: U.isFullscreen, isTouchScreen: U.isTouchScreen, onLoad: Zn, onLoading: ni, onResize: ri, onGamepadConnect: si, onGamepadDisconnect: ii, onError: oi, camPos: Jr, camScale: Wr, camRot: Qr, shake: Zr, toScreen: fn, toWorld: zn, setGravity: cs, getGravity: ls, setBackground: hs, getBackground: ds, getGamepads: fs, add: wt, destroy: zs, destroyAll: Ks, get: rr, readd: Ys, pos: jt, scale: Nt, rotate: ms, color: ps, opacity: gs, anchor: gn, area: xs, sprite: wn, text: Es, rect: Cs, circle: Ts, uvquad: Ss, outline: As, body: Rs, doubleJump: Ms, shader: Ds, timer: Wn, fixed: Bs, stay: Qn, health: Fs, lifespan: Gs, z: ws, move: bs, offscreen: Us, follow: vs, state: Ls, fadeIn: Is, tile: nr, agent: Hs, on: Ne, onUpdate: mn, onDraw: es, onAdd: pn, onDestroy: Kn, onClick: ss, onCollide: ts, onCollideUpdate: ns, onCollideEnd: rs, onHover: is, onHoverUpdate: os, onHoverEnd: as, onKeyDown: U.onKeyDown, onKeyPress: U.onKeyPress, onKeyPressRepeat: U.onKeyPressRepeat, onKeyRelease: U.onKeyRelease, onMouseDown: U.onMouseDown, onMousePress: U.onMousePress, onMouseRelease: U.onMouseRelease, onMouseMove: U.onMouseMove, onCharInput: U.onCharInput, onTouchStart: U.onTouchStart, onTouchMove: U.onTouchMove, onTouchEnd: U.onTouchEnd, onScroll: U.onScroll, onGamepadButtonDown: U.onGamepadButtonDown, onGamepadButtonPress: U.onGamepadButtonPress, onGamepadButtonRelease: U.onGamepadButtonRelease, onGamepadStick: U.onGamepadStick, mousePos: U.mousePos, mouseDeltaPos: U.mouseDeltaPos, isKeyDown: U.isKeyDown, isKeyPressed: U.isKeyPressed, isKeyPressedRepeat: U.isKeyPressedRepeat, isKeyReleased: U.isKeyReleased, isMouseDown: U.isMouseDown, isMousePressed: U.isMousePressed, isMouseReleased: U.isMouseReleased, isMouseMoved: U.isMouseMoved, isGamepadButtonPressed: U.isGamepadButtonPressed, isGamepadButtonDown: U.isGamepadButtonDown, isGamepadButtonReleased: U.isGamepadButtonReleased, charInputted: U.charInputted, loop: us, wait: Vt, play: he, volume: hn, burp: Ie, audioCtx: ce.ctx, Timer: He, Line: Ee, Rect: te, Circle: ke, Polygon: Re, Vec2: b, Color: L, Mat4: W, Quad: Q, RNG: ot, rand: yt, randi: Tn, randSeed: lr, vec2: C, rgb: X, hsl2rgb: cr, quad: oe, choose: dr, chance: hr, lerp: Le, tween: bn, easings: xt, map: qt, mapc: ur, wave: Sn, deg2rad: De, rad2deg: at, testLineLine: it, testRectRect: fr, testRectLine: mr, testRectPoint: bt, testCirclePolygon: wr, testLinePoint: pr, testLineCircle: An, drawSprite: qr, drawText: $n, formatText: Ke, drawRect: Te, drawLine: pt, drawLines: Vn, drawTriangle: jn, drawCircle: tt, drawEllipse: Nn, drawUVQuad: et, drawPolygon: Ye, drawFormattedText: Xe, drawMasked: $r, drawSubtracted: zr, pushTransform: Se, popTransform: ye, pushTranslate: z, pushScale: Ve, pushRotate: je, pushMatrix: re, usePostEffect: f, debug: ne, scene: Vs, go: js, addLevel: ks, getData: Ns, setData: er, download: $t, downloadJSON: yr, downloadText: Rn, downloadBlob: Mn, plug: tr, ASCII_CHARS: Rr, canvas: U.canvas(), addKaboom: Ws, LEFT: b.LEFT, RIGHT: b.RIGHT, UP: b.UP, DOWN: b.DOWN, RED: L.RED, GREEN: L.GREEN, BLUE: L.BLUE, YELLOW: L.YELLOW, MAGENTA: L.MAGENTA, CYAN: L.CYAN, WHITE: L.WHITE, BLACK: L.BLACK, quit: ai, Event: we, EventHandler: Oe, EventController: Ae};
    if (s.plugins && s.plugins.forEach(tr), s.global !== false)
      for (let e in st)
        window[e] = st[e];
    return U.canvas().focus(), st;
  }, "default");

  // main.js
  ho();
  loadSprite("link", "assets/Link_LA.png");
  var link = add([
    sprite("link"),
    pos(80, 40)
  ]);
})();
