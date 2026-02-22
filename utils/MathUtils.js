export class MathUtils {
  static clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  static triangular(min, max, mode, rngValue) {
    const u = rngValue;
    const c = (mode - min) / (max - min);
    if (u <= c) return min + Math.sqrt(u * (max - min) * (mode - min));
    return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
  }

  static weightedPick(items, rngValue) {
    const total = items.reduce((sum, item) => sum + item.weight, 0);
    let threshold = rngValue * total;
    for (const item of items) {
      threshold -= item.weight;
      if (threshold <= 0) return item;
    }
    return items[items.length - 1];
  }

  static gbmStep(price, drift, volatility, dt, normal) {
    return price * Math.exp((drift - 0.5 * volatility ** 2) * dt + volatility * normal * Math.sqrt(dt));
  }
}
