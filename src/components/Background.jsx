import React, { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    }

    function draw() {
      const w = canvas.width;
      const h = canvas.height;

      drawFallback(w, h);

      const bg = new Image();
      bg.src = '/images/Background.png';
      bg.onload = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(bg, 0, 0, w, h);
      };
    }

    function drawFallback(w, h) {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#060a10');
      sky.addColorStop(0.4, '#0a1220');
      sky.addColorStop(0.7, '#0d1a10');
      sky.addColorStop(1, '#050d08');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      const starSeed = 42;
      for (let i = 0; i < 120; i++) {
        const sx = ((starSeed * (i * 7919 + 1)) % w);
        const sy = ((starSeed * (i * 6271 + 3)) % (h * 0.6));
        const size = i % 5 === 0 ? 2 : 1;
        ctx.fillRect(Math.abs(sx), Math.abs(sy), size, size);
      }

      ctx.fillStyle = '#e8e4d0';
      const moonX = w * 0.75;
      const moonY = h * 0.12;
      for (let py = -12; py <= 12; py++) {
        for (let px = -12; px <= 12; px++) {
          if (px * px + py * py <= 144) {
            ctx.fillRect(moonX + px * 3, moonY + py * 3, 3, 3);
          }
        }
      }

      drawForest(w, h);
    }

    function drawPixelTree(x, baseY, h2, color) {
      const size = 3;
      for (let i = 0; i < h2 * 0.3; i++) {
        ctx.fillStyle = '#1a120a';
        ctx.fillRect(x - size, baseY - i * size, size * 2, size);
      }
      const layers = Math.floor(h2 * 0.7 / 3);
      for (let l = 0; l < layers; l++) {
        const width = (layers - l) * 3;
        const y = baseY - h2 * 0.3 * size - l * size * 3;
        ctx.fillStyle = color;
        for (let px = -width; px <= width; px++) {
          ctx.fillRect(x + px * size, y, size, size * 3);
        }
      }
    }

    function drawForest(w, h) {
      const treeColors = ['#0d2e0a', '#112e0e', '#0a2208', '#0e3212', '#162a10'];
      const trees = [
        { x: 0.05, h: 0.45, c: 0 }, { x: 0.12, h: 0.55, c: 1 },
        { x: 0.22, h: 0.4,  c: 2 }, { x: 0.3,  h: 0.5,  c: 0 },
        { x: 0.4,  h: 0.35, c: 3 }, { x: 0.5,  h: 0.48, c: 1 },
        { x: 0.6,  h: 0.42, c: 4 }, { x: 0.7,  h: 0.52, c: 2 },
        { x: 0.8,  h: 0.38, c: 0 }, { x: 0.88, h: 0.46, c: 3 },
        { x: 0.95, h: 0.44, c: 1 },
      ];
      trees.forEach(t => drawPixelTree(t.x * w, h, t.h * h, treeColors[t.c]));

      const ground = ctx.createLinearGradient(0, h * 0.75, 0, h);
      ground.addColorStop(0, '#0a1a0a');
      ground.addColorStop(1, '#050d05');
      ctx.fillStyle = ground;
      ctx.fillRect(0, h * 0.8, w, h * 0.2);

      for (let i = 0; i < 20; i++) {
        const bx = (i * 0.05 + 0.02) * w;
        const by = h * (0.85 + (i % 3) * 0.03);
        const bw = 20 + (i % 4) * 10;
        ctx.fillStyle = '#071407';
        ctx.fillRect(bx, by, bw, 12);
      }
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        imageRendering: 'pixelated',
      }}
    />
  );
}