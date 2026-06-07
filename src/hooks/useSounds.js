// Web Audio API-based sound engine — no files needed
let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone({ frequency = 440, type = 'square', duration = 0.1, volume = 0.15, detune = 0, attack = 0.01, decay = 0.05 } = {}) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.detune.setValueAtTime(detune, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration + 0.05);
  } catch (e) {
    // silently fail
  }
}

export const sounds = {
  // Click/open card — bright blip
  click: () => {
    playTone({ frequency: 880, type: 'square', duration: 0.08, volume: 0.12 });
    setTimeout(() => playTone({ frequency: 1100, type: 'square', duration: 0.06, volume: 0.08 }), 60);
  },

  // Close card — descending chime
  close: () => {
    playTone({ frequency: 660, type: 'sine', duration: 0.1, volume: 0.12 });
    setTimeout(() => playTone({ frequency: 440, type: 'sine', duration: 0.12, volume: 0.08 }), 80);
  },

  // Hover on project — soft ping
  hover: () => {
    playTone({ frequency: 1200, type: 'sine', duration: 0.06, volume: 0.06 });
  },

  // Resume download — calm melodic chime (like a lullaby ding)
  download: () => {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone({ frequency: freq, type: 'sine', duration: 0.3, volume: 0.1, attack: 0.02 }), i * 120);
    });
  },

  // Nav button click
  nav: () => {
    playTone({ frequency: 740, type: 'square', duration: 0.07, volume: 0.1 });
  },

  // Share/love button
  love: () => {
    const notes = [523, 659, 784];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone({ frequency: freq, type: 'sine', duration: 0.2, volume: 0.09 }), i * 80);
    });
  },

  // Email/contact button
  contact: () => {
    playTone({ frequency: 600, type: 'triangle', duration: 0.15, volume: 0.1 });
  },
};

export default sounds;
