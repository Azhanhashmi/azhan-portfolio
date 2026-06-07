import React, { useState, useEffect } from 'react';
import sounds from '../hooks/useSounds';

const NAV_ITEMS = [
  { id: 'guide', label: 'guide', hasX: true },
  { id: 'about', label: 'about', hasX: true },
  { id: 'contact', label: 'contact', hasX: true },
  { id: 'work', label: 'my work', hasX: true },
  { id: 'skills', label: 'my skills', hasX: false },
  { id: 'buildlog', label: 'build log', hasX: false },
];

function useNewDelhiTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  // Get current hour in New Delhi (IST = UTC+5:30)
  const delhiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const hour = delhiTime.getHours();
  const minutes = delhiTime.getMinutes();
  const seconds = delhiTime.getSeconds();

  const isNight = hour >= 22 || hour < 7; // 10pm – 7am = night

  const timeStr = delhiTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  });

  return { isNight, timeStr, hour };
}

export default function NavBar({ openCards, onToggle }) {
  const { isNight, timeStr } = useNewDelhiTime();
  const [hovered, setHovered] = useState(false);

  const statusText = isNight
    ? hovered ? `/NEW DELHI INDIA ${timeStr} ` : '/ NOW SLEEPING @ SHHHH!'
    : hovered ? `/NEW DELHI INDIA ${timeStr} ` : "/ AVAILABLE — LET'S WORK!";

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
      {/* Left label */}
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

      {/* Right status — hover to reveal live time */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: 12,
          color: isNight ? '#555' : '#4caf7d',
          whiteSpace: 'nowrap',
          cursor: 'default',
          transition: 'color 0.2s',
          minWidth: 220,
          textAlign: 'right',
        }}
      >
        {statusText}
      </div>
    </div>
  );
}