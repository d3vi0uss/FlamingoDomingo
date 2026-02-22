import { MathUtils } from '../utils/MathUtils.js';

export class WearSystem {
  constructor(config) { this.rng = config.rng; }
  init() {}
  update() {}
  generateWear() {
    const value = MathUtils.triangular(0, 1, 0.25, this.rng.next());
    if (value < 0.07) return { float: value, tier: 'Factory New' };
    if (value < 0.15) return { float: value, tier: 'Minimal Wear' };
    if (value < 0.38) return { float: value, tier: 'Field-Tested' };
    if (value < 0.45) return { float: value, tier: 'Well-Worn' };
    return { float: value, tier: 'Battle-Scarred' };
  }
  destroy() {}
}
