export class Dice {
  constructor(config) { this.fair = config.fair; this.houseEdge = 0.02; this.last = null; }
  init() {}
  update() {}
  async play({ bet = 10, target = 50 }) {
    const roll = await this.fair.roll('dice');
    const value = roll.result * 100;
    const win = value < target;
    const payout = win ? bet * ((100 - this.houseEdge * 100) / target) : 0;
    this.last = { value, win, payout: Number(payout.toFixed(2)), roll };
    return this.last;
  }
  destroy() {}
}
