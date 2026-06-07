// Web Audio API-based sound engine — no files needed
let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone({ frequency = 440, type = 'square', duration = 0.1, volume = 0.15, detune = 0, attack = 0.01 } = {}) {
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
  } catch (e) {}
}

// --- Ambient audio tracks (real files) ---
const tracks = {};

function getTrack(name, src, volume) {
  if (!tracks[name]) {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    tracks[name] = { audio, targetVol: volume, fadeTimer: null };
  }
  return tracks[name];
}

function fadeIn(name, src, targetVol, duration = 3000) {
  const track = getTrack(name, src, targetVol);
  const { audio } = track;

  // clear any existing fade
  if (track.fadeTimer) clearInterval(track.fadeTimer);

  audio.play().catch(() => {});

  const steps = 60;
  const interval = duration / steps;
  const stepSize = targetVol / steps;

  track.fadeTimer = setInterval(() => {
    audio.volume = Math.min(parseFloat((audio.volume + stepSize).toFixed(4)), targetVol);
    if (audio.volume >= targetVol) {
      clearInterval(track.fadeTimer);
      track.fadeTimer = null;
    }
  }, interval);
}

function fadeOut(name, duration = 2500) {
  const track = tracks[name];
  if (!track) return;

  const { audio } = track;
  if (track.fadeTimer) clearInterval(track.fadeTimer);

  const steps = 60;
  const interval = duration / steps;
  const stepSize = audio.volume / steps;

  track.fadeTimer = setInterval(() => {
    audio.volume = Math.max(parseFloat((audio.volume - stepSize).toFixed(4)), 0);
    if (audio.volume <= 0) {
      clearInterval(track.fadeTimer);
      track.fadeTimer = null;
      audio.pause();
      audio.currentTime = 0;
    }
  }, interval);
}

function startAmbient() {
  fadeIn('bird',  '/video/bird.mp3',  0.5, 4000);
  fadeIn('ocean', '/video/ocean.wav', 0.6, 5000);
}

function stopAmbient() {
  fadeOut('bird',  2500);
  fadeOut('ocean', 2500);
}

export const sounds = {
  click: () => {
    playTone({ frequency: 880, type: 'square', duration: 0.08, volume: 0.12 });
    setTimeout(() => playTone({ frequency: 1100, type: 'square', duration: 0.06, volume: 0.08 }), 60);
  },
  close: () => {
    playTone({ frequency: 660, type: 'sine', duration: 0.1, volume: 0.12 });
    setTimeout(() => playTone({ frequency: 440, type: 'sine', duration: 0.12, volume: 0.08 }), 80);
  },
  hover: () => {
    playTone({ frequency: 1200, type: 'sine', duration: 0.06, volume: 0.06 });
  },
  download: () => {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone({ frequency: freq, type: 'sine', duration: 0.3, volume: 0.1, attack: 0.02 }), i * 120);
    });
  },
  nav: () => {
    playTone({ frequency: 740, type: 'square', duration: 0.07, volume: 0.1 });
  },
  love: () => {
    const notes = [523, 659, 784];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone({ frequency: freq, type: 'sine', duration: 0.2, volume: 0.09 }), i * 80);
    });
  },
  contact: () => {
    playTone({ frequency: 600, type: 'triangle', duration: 0.15, volume: 0.1 });
  },

  nature: {
    start: startAmbient,
    stop:  stopAmbient,
  },
};

export default sounds;