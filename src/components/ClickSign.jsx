import React, { useState } from 'react';
import sounds from '../hooks/useSounds';

export default function ClickSign({ onOpen }) {
  const [clicked, setClicked] = useState(false);
  const [muted, setMuted] = useState(false);

  function handle() {
    sounds.click();
    sounds.nature.start();
    setClicked(true);
    onOpen?.();
  }

  function toggleMute() {
    if (muted) {
      sounds.nature.start();
      setMuted(false);
    } else {
      sounds.nature.stop();
      setMuted(true);
    }
  }

  return (
    <>
      {/* Original bouncing sign — fades out on click */}
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
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <svg width="80" height="55" viewBox="0 0 40 28" style={{ imageRendering: 'pixelated' }}>
          <rect x="19" y="18" width="2" height="10" fill="#4a2a10"/>
          <rect x="4" y="4" width="32" height="8" fill="#8B4513"/>
          <rect x="4" y="4" width="32" height="1" fill="#a05020"/>
          <rect x="4" y="11" width="32" height="1" fill="#6a3010"/>
          <rect x="4" y="14" width="32" height="8" fill="#8B4513"/>
          <rect x="4" y="14" width="32" height="1" fill="#a05020"/>
          <rect x="4" y="21" width="32" height="1" fill="#6a3010"/>
          <text x="20" y="10" textAnchor="middle" fill="#ffcc00" fontSize="4" fontFamily="monospace" fontWeight="bold">CLICK</text>
          <text x="20" y="20" textAnchor="middle" fill="#ffcc00" fontSize="4" fontFamily="monospace" fontWeight="bold">HERE</text>
          <polygon points="2,7 5,5 5,9" fill="#ffcc00"/>
        </svg>
      </div>

      {/* Mute toggle — fades in after click */}
      {clicked && (
        <button
          onClick={toggleMute}
          title={muted ? 'Resume nature sounds' : 'Mute nature sounds'}
          style={{
            position: 'fixed',
            bottom: 80,
            left: 30,
            zIndex: 100,
            background: 'rgba(8,12,16,0.75)',
            border: '1px solid #333',
            borderRadius: 8,
            padding: '5px 9px',
            cursor: 'pointer',
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: 11,
            color: muted ? '#555' : '#88cc88',
            animation: 'fadeIn 0.4s ease forwards',
            transition: 'color 0.2s',
          }}
        >
          {muted ? '🔇 muted' : '🌿 ambient'}
        </button>
      )}
    </>
  );
}