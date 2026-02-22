export class RNG {
  constructor(config = {}) {
    this.seed = config.seed ?? 0xdecafbad;
    this.state = this.seed >>> 0;
  }

  init() {}
  update() {}

  next() {
    this.state += 0x6D2B79F5;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  nextNormal() {
    const u = Math.max(this.next(), Number.EPSILON);
    const v = this.next();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  destroy() {}
}
