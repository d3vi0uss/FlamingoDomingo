import { EventBus } from './EventBus.js';
import { RNG } from './RNG.js';
import { ProvablyFair } from './ProvablyFair.js';
import { ProfileManager } from './ProfileManager.js';

export class GameState {
  constructor(config = {}) {
    this.config = config;
    this.modules = [];
    this.eventBus = new EventBus();
    this.rng = new RNG({ seed: 1337 });
    this.fair = new ProvablyFair();
    this.profile = new ProfileManager();
    this.lastUpdate = performance.now();
  }

  init() {
    [this.eventBus, this.rng, this.fair, this.profile].forEach((m) => m.init());
  }

  register(module) {
    this.modules.push(module);
    module.init();
  }

  update() {
    const now = performance.now();
    const dt = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;
    this.modules.forEach((m) => m.update(dt));
  }

  destroy() {
    this.modules.forEach((m) => m.destroy());
    [this.profile, this.fair, this.rng, this.eventBus].forEach((m) => m.destroy());
  }
}
