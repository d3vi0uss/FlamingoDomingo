export class BackgroundEngine {
  constructor(config = {}) { this.canvas = config.canvas; this.ctx = this.canvas.getContext('2d'); this.t = 0; this.particles = []; }
  init() {
    this.particles = Array.from({ length: 80 }, () => ({ x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height, v: 0.2 + Math.random() }));
  }
  update(dt) {
    this.t += dt;
    const { ctx, canvas } = this;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0c0c12');
    gradient.addColorStop(1, '#1a1a26');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(122,92,255,0.08)';
    for (let x = 0; x < canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
    for (let y = 0; y < canvas.height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
    ctx.fillStyle = 'rgba(192,132,252,0.4)';
    this.particles.forEach((p) => { p.y = (p.y + p.v) % canvas.height; ctx.fillRect(p.x, p.y, 1.8, 1.8); });
  }
  destroy() { this.particles = []; }
}
