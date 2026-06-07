import React, { useState, useEffect } from 'react';
import sounds from '../../hooks/useSounds';

const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY;
const BASE = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const HEADERS = { 'X-Master-Key': API_KEY, 'Content-Type': 'application/json' };
const LS_KEY = 'azhan-portfolio-loved';

export default function GuideCard() {
  const [lovedCount, setLovedCount] = useState(0);
  const [hasLoved, setHasLoved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const siteUrl = 'https://azhanhashmi.vercel.app';

  useEffect(() => {
    setHasLoved(!!localStorage.getItem(LS_KEY));
    fetch(BASE, { headers: HEADERS })
      .then(r => r.json())
      .then(d => setLovedCount(d.record.count))
      .catch(() => {});
  }, []);

  async function handleLove() {
    if (hasLoved) return;
    sounds.love();
    const newCount = lovedCount + 1;
    setLovedCount(newCount);
    setHasLoved(true);
    localStorage.setItem(LS_KEY, 'true');
    await fetch(BASE, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify({ count: newCount }),
    });
  }

  function handleCopy() {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareLinks = [
    { label: 'WHATSAPP', url: `https://wa.me/?text=Check%20out%20this%20portfolio%20${siteUrl}` },
    { label: 'TWITTER',  url: `https://twitter.com/intent/tweet?text=Check%20out%20this%20portfolio&url=${siteUrl}` },
    { label: 'LINKEDIN', url: `https://www.linkedin.com/sharing/share-offsite/?url=${siteUrl}` },
  ];

  return (
    <div>
      <div style={{ marginBottom: 12, overflow: 'hidden', border: '2px solid #1a1a1a', background: '#1a1a1a', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/src/images/about-me.png"
          alt="Azhan Hashmi"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
        {[
          { title: 'Open & close cards', desc: 'Toggle from the menu below. Hit ✕ or tap it again to close.' },
          { title: 'Multiple cards', desc: 'You can keep multiple cards open at once.' },
          { title: 'Scroll the workspace', desc: 'Drag or use your trackpad to scroll horizontally and view more cards.' },
          { title: 'Keep your sound on', desc: 'Hidden effects across the site. Enjoy the experience!' },
        ].map(item => (
          <li key={item.title} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 'bold', fontSize: 12, color: '#1a1a1a', marginBottom: 2 }}>• {item.title}</div>
            <div style={{ fontSize: 12, color: '#555', paddingLeft: 12 }}>{item.desc}</div>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: 8, marginBottom: showShare ? 10 : 0 }}>
        <button
          style={btnStyle('#f5f0e8', '#1a1a1a')}
          onMouseEnter={() => sounds.hover()}
          onClick={() => { sounds.click?.(); setShowShare(s => !s); }}
        >
          {'>> SHARE PORTFOLIO'}
        </button>
        <button
          style={btnStyle(hasLoved ? '#F5436D' : '#1a1a1a', '#f5f0e8')}
          onMouseEnter={() => sounds.hover()}
          onClick={handleLove}
          disabled={hasLoved}
        >
          {hasLoved ? `>> LOVED ♥ (${lovedCount})` : `>> LOVE IT (${lovedCount})`}
        </button>
      </div>

      {showShare && (
        <div style={{ border: '2px solid #1a1a1a', padding: 10, background: '#f5f0e8', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button
            style={btnStyle(copied ? '#1a1a1a' : '#fff', copied ? '#f5f0e8' : '#1a1a1a')}
            onClick={handleCopy}
            onMouseEnter={() => sounds.hover()}
          >
            {copied ? '>> LINK COPIED ✓' : '>> COPY LINK'}
          </button>
          {shareLinks.map(s => (
            
          <a  key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnStyle('#fff', '#1a1a1a'), display: 'block', textAlign: 'center', textDecoration: 'none', fontFamily: 'Share Tech Mono, monospace', fontSize: 11, padding: '6px 10px' }}
              onMouseEnter={() => sounds.hover()}
            >
              {`>> SHARE ON ${s.label}`}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function btnStyle(bg, color) {
  return {
    background: bg,
    color,
    border: '2px solid #1a1a1a',
    padding: '6px 10px',
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 11,
    cursor: 'pointer',
    flex: 1,
  };
}