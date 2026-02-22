export class InventorySystem {
  constructor(config = {}) { this.key = config.key ?? 'fd-inventory'; this.items = []; }
  init() { this.items = JSON.parse(localStorage.getItem(this.key) || '[]'); }
  update() {}
  add(item) { this.items.unshift(item); localStorage.setItem(this.key, JSON.stringify(this.items.slice(0, 500))); }
  destroy() {}
}
