import { GameState } from './core/GameState.js';
import { WearSystem } from './economy/WearSystem.js';
import { InventorySystem } from './economy/InventorySystem.js';
import { CaseSystem } from './economy/CaseSystem.js';
import { MarketSystem } from './economy/MarketSystem.js';
import { PrestigeSystem } from './economy/PrestigeSystem.js';
import { RankSystem } from './economy/RankSystem.js';
import { TournamentSystem } from './economy/TournamentSystem.js';
import { AchievementSystem } from './economy/AchievementSystem.js';
import { BehaviorSystem } from './economy/BehaviorSystem.js';
import { StatsSystem } from './economy/StatsSystem.js';
import { CasinoManager } from './casino/CasinoManager.js';
import { Dice } from './casino/Dice.js';
import { Blackjack } from './casino/Blackjack.js';
import { Roulette } from './casino/Roulette.js';
import { Crash } from './casino/Crash.js';
import { Mines } from './casino/Mines.js';
import { Plinko } from './casino/Plinko.js';
import { Slots } from './casino/Slots.js';
import { Coinflip } from './casino/Coinflip.js';
import { Jackpot } from './casino/Jackpot.js';
import { BackgroundEngine } from './graphics/BackgroundEngine.js';
import { SkinRenderer } from './graphics/SkinRenderer.js';
import { CaseRenderer } from './graphics/CaseRenderer.js';
import { ParticleEngine } from './graphics/ParticleEngine.js';
import { UIController } from './ui/UIController.js';

const game = new GameState();
game.init();

const canvas = document.querySelector('#bg');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bg = new BackgroundEngine({ canvas });
const wearSystem = new WearSystem({ rng: game.rng });
const inventory = new InventorySystem();
const caseSystem = new CaseSystem({ rng: game.rng, wearSystem });
const market = new MarketSystem({ rng: game.rng });
const skinRenderer = new SkinRenderer({ container: document.querySelector('#skin-preview') });
const dice = new Dice({ fair: game.fair });

const casino = new CasinoManager({
  games: { dice, blackjack: new Blackjack(), roulette: new Roulette(), crash: new Crash(), mines: new Mines(), plinko: new Plinko(), slots: new Slots(), coinflip: new Coinflip(), jackpot: new Jackpot() },
});

const modules = [
  bg, wearSystem, inventory, caseSystem, market, casino,
  new PrestigeSystem(), new RankSystem(), new TournamentSystem(), new AchievementSystem(), new BehaviorSystem(), new StatsSystem(),
  new CaseRenderer(), new ParticleEngine(),
  new UIController({ profile: game.profile, caseSystem, inventory, market, dice, skinRenderer, fair: game.fair }),
];

modules.forEach((m) => game.register(m));

function loop() {
  game.update();
  requestAnimationFrame(loop);
}
loop();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}
