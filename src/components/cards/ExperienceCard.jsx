import React from 'react';
import { experience } from '../../data/content';

export default function ExperienceCard() {
  return (
    <div>
      <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
        Where I've shipped things, broken things, and learned which matters more.
      </p>
      {experience.map((exp, i) => (
        <div key={i} style={{
          marginBottom: 16,
          paddingBottom: 16,
          borderBottom: i < experience.length - 1 ? '1px dashed #ccc' : 'none',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 13, color: '#1a1a1a' }}>{exp.company}</div>
              <div style={{ fontSize: 12, color: '#ff2d78' }}>{exp.role}</div>
            </div>
            <div style={{
              fontSize: 10,
              fontFamily: 'Share Tech Mono, monospace',
              color: '#fff',
              background: '#1a1a1a',
              padding: '2px 6px',
              whiteSpace: 'nowrap',
            }}>
              {exp.period}
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#555', lineHeight: 1.6 }}>{exp.desc}</p>
        </div>
      ))}
    </div>
  );
}
