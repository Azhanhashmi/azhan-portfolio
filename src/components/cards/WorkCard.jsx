import React, { useState } from 'react';
import sounds from '../../hooks/useSounds';
import { projects } from '../../data/content';

export default function WorkCard({ onOpenProject, openProjectId }) {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(projects.length / perPage);
  const visible = projects.slice(page * perPage, (page + 1) * perPage);

  return (
    <div>
      <p style={{ marginBottom: 14, fontSize: 13, lineHeight: 1.6 }}>
        <span style={{ color: '#F5436D', fontWeight: 'bold' }}>A selection of things I've built</span>{' '}
        over time – some finished, some experimental, some still evolving. Only the ones worth keeping.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {visible.map((proj) => (
          <ProjectTile
            key={proj.id}
            project={proj}
            isActive={openProjectId === proj.id}
            onOpen={() => onOpenProject(proj.id)}
          />
        ))}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
        paddingTop: 10,
        borderTop: '2px solid #1a1a1a',
      }}>
        <button
          style={navBtn(page === 0)}
          disabled={page === 0}
          onClick={() => { sounds.nav(); setPage(p => p - 1); }}
          onMouseEnter={() => sounds.hover()}
        >
          {'<< BACK'}
        </button>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#555' }}>
          ({String(page + 1).padStart(2, '0')}) - ({String(totalPages).padStart(2, '0')})
        </span>
        <button
          style={navBtn(page >= totalPages - 1)}
          disabled={page >= totalPages - 1}
          onClick={() => { sounds.nav(); setPage(p => p + 1); }}
          onMouseEnter={() => sounds.hover()}
        >
          {'NEXT >>'}
        </button>
      </div>
    </div>
  );
}

function ProjectTile({ project, isActive, onOpen }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        border: isActive ? '2px solid #F5436D' : '2px solid #1a1a1a',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.05s',
        boxShadow: isActive ? '3px 3px 0 #F5436D' : '2px 2px 0 #1a1a1a',
      }}
      onClick={onOpen}
      onMouseEnter={e => {
        sounds.hover();
        e.currentTarget.style.transform = 'translate(-1px,-1px)';
      }}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      {/* Banner */}
      <div style={{
        background: project.bgColor,
        height: 100,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {!imgError ? (
          <img
            src={`/images/projects/${project.id}/${project.id}01.png`}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: project.bgColor,
          }}>
            <ProjectThumbnail project={project} />
          </div>
        )}
      </div>

      {/* Label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 10px',
        background: isActive ? '#F5436D' : project.color,
        borderTop: '2px solid #1a1a1a',
      }}>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, fontWeight: 'bold', color: '#1a1a1a' }}>
          {project.title} – {project.subtitle}
        </span>
        <span style={{ fontSize: 14 }}>▶</span>
      </div>
    </div>
  );
}

function ProjectThumbnail({ project }) {
  const colors = {
    vectorengine: { ui: '#00e5ff', accent: '#39ff14', bg: '#0d1b2a' },
    hireable:     { ui: '#f5d020', accent: '#ff8800', bg: '#1a1a0d' },
    inceptax:     { ui: '#b44fff', accent: '#ff2d78', bg: '#120a1e' },
  };
  const c = colors[project.id] || { ui: '#00e5ff', accent: '#f5d020', bg: '#0d1b2a' };

  return (
    <svg width="260" height="90" viewBox="0 0 65 22" style={{ imageRendering: 'pixelated', width: '90%' }}>
      <rect x="5" y="1" width="18" height="20" fill="#222" stroke={c.ui} strokeWidth="0.5"/>
      <rect x="6" y="3" width="16" height="14" fill={c.bg}/>
      <rect x="7" y="4" width="14" height="3" fill={c.ui} opacity="0.7"/>
      <rect x="7" y="8" width="10" height="1" fill={c.accent} opacity="0.8"/>
      <rect x="7" y="10" width="13" height="1" fill="#555"/>
      <rect x="7" y="12" width="8" height="1" fill="#555"/>
      <rect x="7" y="14" width="11" height="2" fill={c.ui} opacity="0.5"/>
      <rect x="25" y="2" width="18" height="20" fill="#222" stroke={c.accent} strokeWidth="0.5"/>
      <rect x="26" y="4" width="16" height="14" fill={c.bg}/>
      <rect x="27" y="5" width="14" height="5" fill={c.accent} opacity="0.4"/>
      <rect x="27" y="11" width="10" height="1" fill={c.ui} opacity="0.8"/>
      <rect x="27" y="13" width="12" height="1" fill="#555"/>
      <rect x="27" y="15" width="7" height="1" fill="#555"/>
      <rect x="45" y="3" width="16" height="18" fill="#222" stroke={c.ui} strokeWidth="0.5"/>
      <rect x="46" y="5" width="14" height="12" fill={c.bg}/>
      <rect x="47" y="6" width="12" height="4" fill={c.ui} opacity="0.3"/>
      <rect x="47" y="11" width="9" height="1" fill={c.accent} opacity="0.8"/>
      <rect x="47" y="13" width="11" height="1" fill="#555"/>
      <rect x="23" y="11" width="2" height="1" fill={c.ui} opacity="0.5"/>
      <rect x="43" y="11" width="2" height="1" fill={c.ui} opacity="0.5"/>
    </svg>
  );
}

function navBtn(disabled) {
  return {
    background: disabled ? '#ccc' : '#1a1a1a',
    color: disabled ? '#999' : '#f5f0e8',
    border: '2px solid #1a1a1a',
    padding: '5px 10px',
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: 11,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
}