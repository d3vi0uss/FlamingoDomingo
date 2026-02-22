import { TimeUtils } from '../utils/TimeUtils.js';

export class ProfileManager {
  constructor(config = {}) {
    this.key = config.key ?? 'fd-profile';
    this.profile = null;
  }

  init() {
    this.profile = JSON.parse(localStorage.getItem(this.key) || 'null') ?? {
      wallet: 1000,
      xp: 0,
      rank: 'Bronze I',
      streak: 0,
      lastLoginDay: 0,
      prestige: 0,
      multipliers: { prestige: 1 },
    };
    const today = TimeUtils.startOfDay();
    if (this.profile.lastLoginDay !== today) {
      this.profile.streak = this.profile.lastLoginDay === today - 86400000 ? this.profile.streak + 1 : 1;
      this.profile.lastLoginDay = today;
      this.profile.wallet += 25;
      this.save();
    }
  }

  update() {}
  credit(amount) { this.profile.wallet += amount; this.save(); }
  debit(amount) { this.profile.wallet = Math.max(0, this.profile.wallet - amount); this.save(); }
  save() { localStorage.setItem(this.key, JSON.stringify(this.profile)); }
  destroy() { this.save(); }
}
