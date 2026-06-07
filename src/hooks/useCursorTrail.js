import { useEffect } from 'react';

const COLORS = [
  '#ff0000', '#ff4400', '#ff8800', '#ffcc00', '#ffff00',
  '#88ff00', '#00ff00', '#00ffaa', '#00ffff', '#0088ff',
  '#0044ff', '#4400ff', '#8800ff', '#cc00ff', '#ff00ff',
  '#ff0088',
];

export default function useCursorTrail() {
  useEffect(() => {
    const particles = [];
    let colorIdx = 0;
    let mouseX = -100, mouseY = -100;
    let rafId;

    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 99999; overflow: hidden;
    `;
    document.body.appendChild(container);

    // Custom cursor dot
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed; width: 8px; height: 8px;
      background: white; border: 2px solid #ff2d78;
      pointer-events: none; z-index: 999999;
      transform: translate(-50%, -50%);
      image-rendering: pixelated;
    `;
    document.body.appendChild(cursor);

    function spawnPixel(x, y) {
      const el = document.createElement('div');
      const color = COLORS[colorIdx % COLORS.length];
      colorIdx++;
      const size = 7 + Math.floor(Math.random() * 4);
      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        image-rendering: pixelated;
        pointer-events: none;
        opacity: 1;
      `;
      container.appendChild(el);
      particles.push({ el, life: 1, decay: 0.04 + Math.random() * 0.04 });
    }

    function animate() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) {
          p.el.remove();
          particles.splice(i, 1);
        } else {
          p.el.style.opacity = p.life;
          const top = parseFloat(p.el.style.top);
          p.el.style.top = (top + 0.5) + 'px';
        }
      }
      rafId = requestAnimationFrame(animate);
    }

    animate();

    let lastX = -999, lastY = -999;
    let spawnThrottle = 0;

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';

      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      spawnThrottle++;
      if (spawnThrottle % 2 === 0 && dist > 3) {
        spawnPixel(mouseX, mouseY);
        lastX = mouseX;
        lastY = mouseY;
      }
    }

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      container.remove();
      cursor.remove();
    };
  }, []);
}
