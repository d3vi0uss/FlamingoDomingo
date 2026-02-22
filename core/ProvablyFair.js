const encoder = new TextEncoder();

async function sha256(str) {
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(str));
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export class ProvablyFair {
  constructor(config = {}) {
    this.clientSeed = config.clientSeed ?? `client-${Math.random().toString(36).slice(2)}`;
    this.serverSeed = config.serverSeed ?? `server-${Math.random().toString(36).slice(2)}`;
    this.nonce = 0;
    this.history = JSON.parse(localStorage.getItem('fd-provably-fair') || '[]');
  }

  init() {}
  update() {}

  async roll(context = 'default') {
    const payload = `${this.clientSeed}:${this.serverSeed}:${this.nonce}`;
    const hash = await sha256(payload);
    const number = parseInt(hash.substring(0, 13), 16);
    const result = number / 2 ** 52;
    const record = { context, clientSeed: this.clientSeed, serverSeed: this.serverSeed, nonce: this.nonce, hash, result, ts: Date.now() };
    this.history.unshift(record);
    this.history = this.history.slice(0, 200);
    localStorage.setItem('fd-provably-fair', JSON.stringify(this.history));
    this.nonce += 1;
    return record;
  }

  regenerateSeeds() {
    this.clientSeed = `client-${crypto.randomUUID()}`;
    this.serverSeed = `server-${crypto.randomUUID()}`;
    this.nonce = 0;
  }

  destroy() {}
}
