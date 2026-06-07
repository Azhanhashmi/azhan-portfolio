import React from 'react';
import sounds from '../../hooks/useSounds';

const links = [
  { label: 'EMAIL ME', color: '#ff6b6b', bg: '#fff0f0', text: ">>Send Letters. Love'em", href: 'mailto:azhanhashmi788@gmail.com' },
  { label: 'LINKEDIN', color: '#0077b5', bg: '#f0f7ff', text: ">>Let's make it formal", href: 'https://linkedin.com/in/azhanhashmi' },
  { label: 'GITHUB',   color: '#1a1a1a', bg: '#f5f5f5', text: '>>See what I am building', href: 'https://github.com/azhanhashmi' },
  { label: 'RESUME', color: '#f5a623', bg: '#fffbf0', text: '>>Professional lore dump', href: '/Full-stack-developer-Azhan-Hashmi.pdf' },
];

export default function ContactCard() {
  function handleClick(link) {
    if (link.download) {
      sounds.download();
    } else {
      sounds.contact();
    }
  }

  return (
    <div>
      <div style={{
        marginBottom: 16,
        overflow: 'hidden',
        border: '2px solid #1a1a1a',
        background: '#1a1a1a',
        height: 130,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src="/images/contact.png"
          alt="Contact"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <p style={{ marginBottom: 16, fontSize: 13, lineHeight: 1.6 }}>
        If you made it this far, might as well try and{' '}
        <span style={{ color: '#F5436D', fontWeight: 'bold' }}>Say Hi</span>. Messages travel. Some land.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map(link => (
          
         <a   key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              height: 40,
              background: link.bg,
              border: '2px solid #1a1a1a',
              textDecoration: 'none',
              color: '#1a1a1a',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: 12,
              transition: 'transform 0.05s, box-shadow 0.05s',
              boxShadow: '2px 2px 0 #1a1a1a',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              sounds.hover();
              e.currentTarget.style.transform = 'translate(-1px, -1px)';
              e.currentTarget.style.boxShadow = '3px 3px 0 #1a1a1a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '2px 2px 0 #1a1a1a';
            }}
            onClick={() => handleClick(link)}
          >
            <span style={{
              background: link.color,
              color: 'white',
              padding: '0 10px',
              height: '100%',
              minWidth: 90,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {link.label}
            </span>
            <span style={{ color: '#555', fontSize: 12, paddingLeft: 12 }}>{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}