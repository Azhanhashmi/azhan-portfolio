import React, { useEffect } from 'react';
import sounds from '../hooks/useSounds';

const cardStyles = `
  .card {
    position: relative;
    background: #ffffff;
    border: 2px solid #1a1a1a;
    width: 300px;
    flex-shrink: 0;
    font-family: 'Univers LT Std', 'Share Tech Mono', monospace;
    box-shadow: 4px 4px 0 #1a1a1a;
  }

  .card:hover {
    box-shadow: 6px 6px 0 #1a1a1a;
    transition: box-shadow 0.15s ease;
  }

  .card.card--wide {
    width: 560px;
  }

  .card-titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #1a1a1a;
    padding: 6px 10px;
    cursor: default;
  }

  .card-title {
    color: #f5f0e8;
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.05em;
  }

  .card-close {
    background: none;
    border: 1px solid #555;
    color: #f5f0e8;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Share Tech Mono', monospace;
    transition: background 0.1s, border-color 0.1s;
  }

  .card-close:hover {
    background: #F5436D;
    border-color: #F5436D;
  }

  .card-body {
    padding: 16px;
    overflow-y: auto;
    max-height: calc(100vh - 140px);
    color: #1a1a1a;
    font-size: 13px;
    line-height: 1.6;
  }
`;

export default function Card({ title, children, onClose, wide }) {
  useEffect(() => {
    if (!document.getElementById('card-styles')) {
      const el = document.createElement('style');
      el.id = 'card-styles';
      el.textContent = cardStyles;
      document.head.appendChild(el);
    }
  }, []);

  function handleClose() {
    sounds.close();
    onClose?.();
  }

  return (
    <div className={`card${wide ? ' card--wide' : ''}`}>
      <div className="card-titlebar">
        <span className="card-title">{title}</span>
        <button className="card-close" onClick={handleClose}>✕</button>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}