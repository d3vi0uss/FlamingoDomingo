import { MathUtils } from '../utils/MathUtils.js';

const rarityTable = [
  { rarity: 'Consumer', weight: 79.92, priceMult: [0.4, 0.6] },
  { rarity: 'Industrial', weight: 15.98, priceMult: [0.7, 1.0] },
  { rarity: 'Mil-Spec', weight: 3.2, priceMult: [1.1, 1.5] },
  { rarity: 'Restricted', weight: 0.64, priceMult: [1.5, 2.5] },
  { rarity: 'Classified', weight: 0.13, priceMult: [3, 6] },
  { rarity: 'Covert', weight: 0.026, priceMult: [8, 15] },
  { rarity: 'Rare Special', weight: 0.005, priceMult: [30, 80] },
];

const weaponNames = ['Vanguard SMG', 'Sable Carbine', 'Vertex Pistol', 'Titan Railgun', 'Pulse Shotgun'];
const patternNames = ['Marble Flux', 'Hex Camo', 'Neon Fade', 'Carbon Mist', 'Aurora Alloy'];

export class CaseSystem {
  constructor(config) {
    this.rng = config.rng;
    this.wearSystem = config.wearSystem;
    this.casePrice = 2.5;
  }

  init() {}
  update() {}

  openCase() {
    const rarity = MathUtils.weightedPick(rarityTable, this.rng.next());
    const wear = this.wearSystem.generateWear();
    const min = rarity.priceMult[0] * this.casePrice;
    const max = rarity.priceMult[1] * this.casePrice;
    const value = min + (max - min) * this.rng.next();
    return {
      id: crypto.randomUUID(),
      rarity: rarity.rarity,
      name: `${weaponNames[Math.floor(this.rng.next() * weaponNames.length)]} | ${patternNames[Math.floor(this.rng.next() * patternNames.length)]}`,
      wear,
      value: Number(value.toFixed(2)),
      createdAt: Date.now(),
    };
  }

  expectedValue() {
    return rarityTable.reduce((sum, rarity) => {
      const avg = ((rarity.priceMult[0] + rarity.priceMult[1]) / 2) * this.casePrice;
      return sum + (rarity.weight / 100) * avg;
    }, 0);
  }

  destroy() {}
}
