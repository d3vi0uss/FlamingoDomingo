export class SkinRenderer {
  constructor(config = {}) { this.container = config.container; }
  init() {}
  update() {}
  render(item) {
    const rarityColors = {
      Consumer: '#9ca3af', Industrial: '#60a5fa', 'Mil-Spec': '#7a5cff', Restricted: '#a855f7', Classified: '#ec4899', Covert: '#ef4444', 'Rare Special': '#facc15',
    };
    this.container.innerHTML = `<div class="skin-card" style="border-color:${rarityColors[item.rarity]}">
      <svg viewBox="0 0 300 120" class="weapon-svg"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0%" stop-color="#1f2937"/><stop offset="100%" stop-color="${rarityColors[item.rarity]}"/></linearGradient></defs><path d="M20,70 L180,70 L230,45 L290,45 L290,75 L230,75 L180,95 L20,95 Z" fill="url(#g)"/></svg>
      <div><strong>${item.name}</strong><div>${item.rarity} · ${item.wear.tier} · Float ${item.wear.float.toFixed(4)}</div><div>$${item.value.toFixed(2)}</div></div>
    </div>`;
  }
  destroy() {}
}
