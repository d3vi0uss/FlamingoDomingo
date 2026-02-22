import { MathUtils } from '../utils/MathUtils.js';

export class MarketSystem {
  constructor(config) {
    this.rng = config.rng;
    this.items = [];
    this.lastTick = 0;
    this.tickRate = 5;
    this.drift = 0.0002;
  }

  init() {
    this.items = [
      { name: 'Vanguard SMG | Marble Flux', rarity: 'Mil-Spec', price: 3.12, volatility: 0.04, liquidity: 12000 },
      { name: 'Titan Railgun | Neon Fade', rarity: 'Covert', price: 22.11, volatility: 0.08, liquidity: 3000 },
      { name: 'Vertex Pistol | Carbon Mist', rarity: 'Industrial', price: 1.9, volatility: 0.02, liquidity: 18000 },
    ];
  }

  update(dt) {
    this.lastTick += dt;
    if (this.lastTick < this.tickRate) return;
    this.lastTick = 0;
    this.items = this.items.map((item) => {
      const shock = 1 + (this.rng.next() - 0.5) * 0.2;
      const nextPrice = MathUtils.gbmStep(item.price, this.drift, item.volatility, 1, this.rng.nextNormal()) * shock;
      return { ...item, price: Number(Math.max(0.1, nextPrice).toFixed(2)), spread: Number((0.01 + this.rng.next() * 0.03).toFixed(3)) };
    });
  }

  getQuote(index, size = 1) {
    const item = this.items[index];
    const slippage = size / item.liquidity;
    return item.price * (1 + item.spread + slippage);
  }

  destroy() {}
}
