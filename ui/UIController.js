import { Components } from './Components.js';

export class UIController {
  constructor(config) {
    this.profile = config.profile;
    this.caseSystem = config.caseSystem;
    this.inventory = config.inventory;
    this.market = config.market;
    this.dice = config.dice;
    this.skinRenderer = config.skinRenderer;
    this.fair = config.fair;
  }

  init() {
    this.walletEl = document.querySelector('#wallet');
    this.evEl = document.querySelector('#ev');
    this.marketEl = document.querySelector('#market-list');
    this.fairEl = document.querySelector('#fair-log');
    document.querySelector('#open-case').addEventListener('click', () => this.handleOpenCase());
    document.querySelector('#play-dice').addEventListener('click', () => this.handleDice());
    this.render();
  }

  update() { this.renderStats(); }

  render() {
    this.renderStats();
    this.renderMarket();
    this.renderFair();
  }

  renderStats() {
    this.walletEl.textContent = `$${this.profile.profile.wallet.toFixed(2)}`;
    this.evEl.textContent = `$${this.caseSystem.expectedValue().toFixed(2)} (${((this.caseSystem.expectedValue() / this.caseSystem.casePrice) * 100).toFixed(1)}%)`;
  }

  renderMarket() {
    this.marketEl.innerHTML = this.market.items.map((i, idx) => Components.marketRow(i, idx)).join('');
    this.marketEl.querySelectorAll('.market-row').forEach((btn) => btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.idx);
      alert(`Quote: $${this.market.getQuote(idx, 10).toFixed(2)} for size 10`);
    }));
  }

  renderFair() {
    this.fairEl.textContent = this.fair.history.slice(0, 3).map((h) => `${h.context} n${h.nonce} ${h.result.toFixed(6)}`).join('\n') || 'No rolls yet';
  }

  async handleOpenCase() {
    if (this.profile.profile.wallet < this.caseSystem.casePrice) return;
    this.profile.debit(this.caseSystem.casePrice);
    const item = this.caseSystem.openCase();
    this.inventory.add(item);
    this.skinRenderer.render(item);
    this.render();
  }

  async handleDice() {
    const bet = 20;
    if (this.profile.profile.wallet < bet) return;
    this.profile.debit(bet);
    const result = await this.dice.play({ bet, target: 49.5 });
    if (result.win) this.profile.credit(result.payout);
    document.querySelector('#dice-result').textContent = `Roll ${result.value.toFixed(2)} · ${result.win ? 'WIN' : 'LOSS'} · ${result.payout.toFixed(2)}`;
    this.renderFair();
    this.renderStats();
  }

  destroy() {}
}
