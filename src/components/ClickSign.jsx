import React, { useState } from 'react';
import sounds from '../hooks/useSounds';

export default function ClickSign({ onOpen }) {
  const [clicked, setClicked] = useState(false);

  function handle() {
    sounds.click();
    setClicked(true);
    onOpen?.();
  }

  return (
    <div
      onClick={handle}
      style={{
        position: 'fixed',
        bottom: 80,
        left: 30,
        cursor: 'pointer',
        zIndex: 100,
        animation: 'bounce 1.5s ease-in-out infinite',
        opacity: clicked ? 0 : 1,
        transition: 'opacity 0.3s',
        pointerEvents: clicked ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
      <svg width="80" height="55" viewBox="0 0 40 28" style={{ imageRendering: 'pixelated' }}>
        {/* Sign post */}
        <rect x="19" y="18" width="2" height="10" fill="#4a2a10"/>
        {/* Sign boards */}
        <rect x="4" y="4" width="32" height="8" fill="#8B4513"/>
        <rect x="4" y="4" width="32" height="1" fill="#a05020"/>
        <rect x="4" y="11" width="32" height="1" fill="#6a3010"/>
        <rect x="4" y="14" width="32" height="8" fill="#8B4513"/>
        <rect x="4" y="14" width="32" height="1" fill="#a05020"/>
        <rect x="4" y="21" width="32" height="1" fill="#6a3010"/>
        {/* Text */}
        <text x="20" y="10" textAnchor="middle" fill="#ffcc00" fontSize="4" fontFamily="monospace" fontWeight="bold">CLICK</text>
        <text x="20" y="20" textAnchor="middle" fill="#ffcc00" fontSize="4" fontFamily="monospace" fontWeight="bold">HERE</text>
        {/* Arrow */}
        <polygon points="2,7 5,5 5,9" fill="#ffcc00"/>
      </svg>
    </div>
  );
}
