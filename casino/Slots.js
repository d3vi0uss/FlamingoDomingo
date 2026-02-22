export class Slots {
  constructor(config = {}) { this.config = config; this.houseEdge = 0; }
  init() {
    const edges = { Blackjack:0.008, Roulette:0.027, Crash:0.015, Mines:0.03, Plinko:0.05, Slots:0.045, Coinflip:0.02, Jackpot:0.03 };
    this.houseEdge = edges['Slots'] ?? 0.02;
  }
  update() {}
  destroy() {}
}
