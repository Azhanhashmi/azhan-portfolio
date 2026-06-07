// src/components/cards/ProjectDetailCard.jsx — NEW FILE
import React from 'react';
import Card from '../Card';
import sounds from '../../hooks/useSounds';
import { projects } from '../../data/content';

export default function ProjectDetailCard({ projectId, onClose }) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  return (
    <Card
      title={`/my.work > ${project.title.toLowerCase().replace(/\s/g, '')}`}
      onClose={onClose}
      wide
    >
      <ProjectDetail project={project} />
    </Card>
  );
}

function ProjectDetail({ project }) {
  return (
    <div>
      {/* Hero image / mockup banner */}
      <div style={{
        background: project.bgColor,
        marginBottom: 16,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        border: '2px solid #1a1a1a',
      }}>
        <HeroBanner project={project} />
      </div>

      {/* Title + description */}
      <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 16, color: '#1a1a1a' }}>
        {project.description}
      </p>

      {/* Tags row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            border: '2px solid #1a1a1a',
            padding: '4px 10px',
            fontSize: 10,
            fontFamily: 'Share Tech Mono, monospace',
            color: '#1a1a1a',
            background: '#fff',
            letterSpacing: '0.05em',
          }}>
            {tag}
          </span>
        ))}
        <button
          style={{
            border: '2px solid #1a1a1a',
            padding: '4px 14px',
            fontSize: 10,
            fontFamily: 'Share Tech Mono, monospace',
            background: '#1a1a1a',
            color: '#fff',
            cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={() => sounds.hover()}
          onClick={() => sounds.click()}
        >
          {'>> VIEW PROTOTYPE'}
        </button>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '2px solid #eee', marginBottom: 16 }} />

      {/* Detailed write-up */}
      <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 16, color: '#333' }}>
        {project.details}
      </p>

      {/* Role / Team / Tools */}
      {project.meta && (
        <ul style={{ listStyle: 'none', marginBottom: 16, padding: 0 }}>
          {project.meta.role && (
            <li style={{ fontSize: 13, marginBottom: 6 }}>
              <span style={{ fontWeight: 'bold' }}>Role:</span> {project.meta.role}
            </li>
          )}
          {project.meta.team && (
            <li style={{ fontSize: 13, marginBottom: 6 }}>
              <span style={{ fontWeight: 'bold' }}>Team:</span> {project.meta.team}
            </li>
          )}
          {project.meta.tools && (
            <li style={{ fontSize: 13, marginBottom: 6 }}>
              <span style={{ fontWeight: 'bold' }}>Tools:</span> {project.meta.tools}
            </li>
          )}
        </ul>
      )}

      {/* Divider */}
      <div style={{ borderTop: '2px solid #eee', marginBottom: 16 }} />

      {/* Screenshot gallery — 3 mockup thumbnails */}
      <div style={{ display: 'flex', gap: 10 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            flex: 1,
            background: project.bgColor,
            border: '2px solid #1a1a1a',
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <ScreenMockup project={project} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroBanner({ project }) {
  return (
    <img
      src={`/images/projects/${project.id}-banner.png`}
      alt={project.title}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      onError={e => { e.currentTarget.style.display = 'none'; }}
    />
  );
}

function ScreenMockup({ project, index }) {
  return (
    <img
      src={`/images/projects/${project.id}-banner.png`}
      alt={project.title}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      onError={e => { e.currentTarget.style.display = 'none'; }}
    />
  );
}