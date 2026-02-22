export const Components = {
  stat(label, value) {
    return `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`;
  },
  marketRow(item, idx) {
    return `<button class="market-row" data-idx="${idx}"><span>${item.name}</span><span>$${item.price.toFixed(2)}</span></button>`;
  },
};
