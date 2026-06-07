import React from 'react';

export default function AboutCard() {
  return (
    <div>
      <p style={{ marginBottom: 14, fontSize: 13, lineHeight: 1.6 }}>
        I build things that work fast, look good, and don't embarrass me at 2am.
      </p>
      <p style={{ marginBottom: 14, fontSize: 13, lineHeight: 1.6 }}>
        I'm <span style={{ color: '#F5436D', fontWeight: 'bold' }}>Azhan Hashmi</span>, a{' '}
        <span style={{ color: '#F5436D', fontWeight: 'bold' }}>Full Stack Developer</span>{' '}
        who builds from{' '}
        <span style={{ color: '#F5436D', fontWeight: 'bold' }}>C++ vector engines to pixel-perfect UIs</span>
        {' '}— because stopping at one layer of the stack feels like leaving money on the table.
      </p>

      <div style={{
        marginBottom: 14,
        overflow: 'hidden',
        border: '2px solid #1a1a1a',
        background: '#1a1a1a',
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src="/src/images/about-me.png"
          alt="Azhan Hashmi"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <p style={{ marginBottom: 10, fontSize: 13, lineHeight: 1.6 }}>
        I've shipped{' '}
        <span style={{ color: '#F5436D', fontWeight: 'bold' }}>AI tools, competitive platforms, and full-stack products</span>
        {' '}— some with real users finding them organically. I don't wait for permission to build.
      </p>
      <p style={{ marginBottom: 10, fontSize: 13, lineHeight: 1.6 }}>
        I read internals, understand tradeoffs, and pick what actually fits —{' '}
        <span style={{ color: '#F5436D', fontWeight: 'bold' }}>not just what's trending on Twitter.</span>
      </p>
      <p style={{ marginBottom: 10, fontSize: 13, lineHeight: 1.6 }}>
        If you're building something that needs to{' '}
        <span style={{ color: '#F5436D', fontWeight: 'bold' }}>work, scale, and look good doing it</span>
        {' '}— that's exactly where I operate.
      </p>
    </div>
  );
}