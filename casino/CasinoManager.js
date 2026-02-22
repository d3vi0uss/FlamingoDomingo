export class CasinoManager {
  constructor(config) {
    this.games = config.games;
    this.activeGame = 'Dice';
  }

  init() { Object.values(this.games).forEach((g) => g.init()); }
  update(dt) { Object.values(this.games).forEach((g) => g.update(dt)); }
  setGame(name) { this.activeGame = name; }
  destroy() { Object.values(this.games).forEach((g) => g.destroy()); }
}
