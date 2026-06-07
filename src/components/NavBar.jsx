import React from 'react';
import sounds from '../hooks/useSounds';

const NAV_ITEMS = [
  { id: 'guide', label: 'guide', hasX: true },
  { id: 'about', label: 'about', hasX: true },
  { id: 'contact', label: 'contact', hasX: true },
  { id: 'work', label: 'my work', hasX: true },
  // { id: 'experience', label: 'experience', hasX: false },
  { id: 'skills', label: 'my skills', hasX: false },
  { id: 'buildlog', label: 'build log', hasX: false },
];

export default function NavBar({ openCards, onToggle }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 52,
      background: 'rgba(8, 12, 16, 0.92)',
      backdropFilter: 'blur(4px)',
      borderTop: '2px solid #1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingInline: 20,
      zIndex: 1000,
    }}>
      {/* Left marquee */}
      <div style={{
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: 12,
        color: '#f5f0e8',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
      }}>
        / HEYYOO, I AM AZHAN!
      </div>

      {/* Nav pills */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'nowrap' }}>
        {NAV_ITEMS.map(item => {
          const isOpen = openCards.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => {
                sounds.nav();
                onToggle(item.id);
              }}
              onMouseEnter={() => sounds.hover()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 12px',
                borderRadius: 999,
                border: isOpen ? '2px solid #f5f0e8' : '2px solid #444',
                background: isOpen ? '#f5f0e8' : 'transparent',
                color: isOpen ? '#1a1a1a' : '#888',
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: 11,
                cursor: 'pointer',
                transition: 'all 0.1s',
                whiteSpace: 'nowrap',
              }}
            >
              {item.hasX && isOpen && <span style={{ fontSize: 10 }}>✕</span>}
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right status */}
      <div style={{
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: 12,
        color: '#555',
        whiteSpace: 'nowrap',
      }}>
        / NOW SLEEPING @ SHHHH!
      </div>
    </div>
  );
}
