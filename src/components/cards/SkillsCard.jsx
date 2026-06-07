import React from 'react';
import { skills } from '../../data/content';

export default function SkillsCard() {
  return (
    <div>
      <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
        Everything I use to make things real. Tools and instincts that turn thoughts into shippable products.
      </p>

      <ul style={{ listStyle: 'none', marginBottom: 16, padding: 0 }}>
        <li style={{ marginBottom: 10 }}>
          <span style={{ fontWeight: 'bold', fontSize: 12, color: '#F5436D' }}>Frontend: </span>
          <span style={{ fontSize: 12, color: '#555' }}>{skills.frontend.join(', ')}</span>
        </li>
        <li style={{ marginBottom: 10 }}>
          <span style={{ fontWeight: 'bold', fontSize: 12, color: '#F5436D' }}>Backend: </span>
          <span style={{ fontSize: 12, color: '#555' }}>{skills.backend.join(', ')}</span>
        </li>
        <li style={{ marginBottom: 10 }}>
          <span style={{ fontWeight: 'bold', fontSize: 12, color: '#F5436D' }}>Databases: </span>
          <span style={{ fontSize: 12, color: '#555' }}>{skills.databases.join(', ')}</span>
        </li>
        <li style={{ marginBottom: 10 }}>
          <span style={{ fontWeight: 'bold', fontSize: 12, color: '#F5436D' }}>Tools: </span>
          <span style={{ fontSize: 12, color: '#555' }}>{skills.tools.join(', ')}</span>
        </li>
      </ul>

      {/* Pixel circles */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, justifyContent: 'center' }}>
        <PixelCircle color="#F5436D" />
        <PixelCircle color="#f5d020" />
        <PixelCircle color="#00e5ff" />
      </div>

      <p style={{ fontSize: 12, color: '#F5436D', fontWeight: 'bold', marginBottom: 8 }}>
        My process is simple:
      </p>
      <p style={{ fontSize: 12, color: '#555', marginBottom: 14 }}>
        Problem {'>'} Research {'>'} Build {'>'} Ship {'>'} Iterate
      </p>

      <div style={{ borderTop: '2px solid #1a1a1a', paddingTop: 12 }}>
        {[
          "I don't just use frameworks — I understand what's happening under the hood. That's what separates a builder from a copy-paster.",
          "I build full-stack, end-to-end. Design, frontend, backend, infra — I've touched every layer and I know which one is on fire.",
        ].map((txt, i) => (
          <p key={i} style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5436D' }}>
            • {txt}
          </p>
        ))}
      </div>
    </div>
  );
}

function PixelCircle({ color }) {
  return (
    <svg width="50" height="50" viewBox="0 0 12 12" style={{ imageRendering: 'pixelated' }}>
      {[
        [3,0,6,2],[1,1,2,2],[9,1,2,2],[0,3,2,6],[10,3,2,6],
        [1,9,2,2],[9,9,2,2],[3,10,6,2],[3,2,6,8]
      ].map(([x,y,w,h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={color} />
      ))}
      <rect x="4" y="4" width="4" height="4" fill={color} opacity="0.6"/>
      <rect x="5" y="5" width="2" height="2" fill="white" opacity="0.4"/>
    </svg>
  );
}