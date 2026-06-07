import React, { useState } from 'react';
import Card from '../Card';
import ImageZoom from '../ImageZoom';
import sounds from '../../hooks/useSounds';
import { projects } from '../../data/content';

// Map project id → its image filenames
const PROJECT_IMAGES = {
  vectorengine: [1, 2, 3, 4].map(n => `/images/projects/vectorengine/vectorengine0${n}.png`),
  hireable:     [1, 2, 3, 4].map(n => `/images/projects/hireable/hireable0${n}.png`),
  inceptax:     [1, 2, 3, 4].map(n => `/images/projects/inceptax/inceptax0${n}.png`),
};

export default function ProjectDetailCard({ projectId, onClose }) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  return (
    <Card
      title={`/my.work > ${project.id}`}
      onClose={onClose}
      wide
    >
      <ProjectDetail project={project} />
    </Card>
  );
}

function ProjectDetail({ project }) {
  const [zoomSrc, setZoomSrc] = useState(null);
  const [zoomAlt, setZoomAlt] = useState('');
  const [heroError, setHeroError] = useState(false);

  const images = PROJECT_IMAGES[project.id] || [];

  const typeTag = project.tags.find(t => t.startsWith('TYPE >>'));
  const dateTag = project.tags.find(t => /^[A-Z]{3}\s\d{4}/.test(t));
  const ctaTag  = project.tags.find(t => t.startsWith('>>'));
  const ctaUrl  = ctaTag?.includes('GITHUB') ? project.links?.github
                : ctaTag?.includes('LIVE')   ? project.links?.live : null;

  const detailSentences = project.details.split(/(?<=\.)\s+/).filter(Boolean);

  function openZoom(src, alt) {
    sounds.click();
    setZoomSrc(src);
    setZoomAlt(alt);
  }

  return (
    <div style={{ fontFamily: 'Share Tech Mono, monospace' }}>

      {/* ZOOM OVERLAY */}
      <ImageZoom src={zoomSrc} alt={zoomAlt} onClose={() => setZoomSrc(null)} />

      {/* ── HERO — first image as banner ── */}
      <div style={{
        background: project.bgColor,
        height: 180,
        border: '2px solid #1a1a1a',
        borderBottom: 'none',
        overflow: 'hidden',
        position: 'relative',
        cursor: images[0] ? 'zoom-in' : 'default',
      }}
        onClick={() => images[0] && openZoom(images[0], `${project.title} — screenshot 1`)}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: project.color }} />
        {!heroError && images[0] ? (
          <>
            <img
              src={images[0]}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={() => setHeroError(true)}
            />
            {/* zoom hint */}
            <div style={{
              position: 'absolute', bottom: 8, right: 10,
              background: 'rgba(0,0,0,0.6)',
              color: '#fff',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: 10,
              padding: '3px 8px',
              border: '1px solid #ffffff33',
              letterSpacing: '0.05em',
            }}>
              {'>> Click To Zoom!'}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 'bold', color: project.color, letterSpacing: '0.04em', textShadow: `0 0 30px ${project.color}55` }}>
                {project.title}
              </div>
              <div style={{ fontSize: 11, color: '#ffffff66', marginTop: 8 }}>{project.subtitle}</div>
            </div>
          </div>
        )}
      </div>

      {/* ── TITLE + DESCRIPTION ── */}
      <div style={{ border: '2px solid #1a1a1a', borderBottom: 'none', padding: '14px 16px', background: '#fff' }}>
        <div style={{ fontSize: 17, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 6 }}>{project.title}</div>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: '#333', margin: 0 }}>{project.description}</p>
      </div>

{/* ── TAGS + CTA ── */}
<div style={{
  display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
  border: '2px solid #1a1a1a', borderBottom: 'none',
  padding: '10px 16px', background: '#fafafa',
}}>
  {[typeTag, dateTag].filter(Boolean).map(tag => (
    <span key={tag} style={{
      border: '2px solid #1a1a1a', padding: '3px 10px',
      fontSize: 10, letterSpacing: '0.06em', color: '#1a1a1a', background: '#fff',
    }}>{tag}</span>
  ))}

  {/* right side buttons */}
  <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
    {/* GitHub — always black if exists */}
    {project.tags.find(t => t.includes('GITHUB')) && (
      
      <a  href={project.links?.github || '#'}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => sounds.hover()}
        onClick={() => sounds.click()}
        style={{
          border: '2px solid #1a1a1a', padding: '3px 14px',
          fontSize: 10, letterSpacing: '0.06em',
          background: '#1a1a1a', color: '#f5f0e8',
          textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
        }}
      >
        {'>> VIEW ON GITHUB'}
      </a>
    )}

    {/* Live — red, only if tag exists */}
    {project.tags.find(t => t.includes('LIVE')) && (
      
      <a  href={project.links?.live || '#'}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => sounds.hover()}
        onClick={() => sounds.click()}
        style={{
          border: '2px solid #F5436D', padding: '3px 14px',
          fontSize: 10, letterSpacing: '0.06em',
          background: '#F5436D', color: '#fff',
          textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
        }}
      >
        {'>> VIEW LIVE'}
      </a>
    )}
  </div>
</div>

      {/* ── META ── */}
      {project.meta && (
        <div style={{
          border: '2px solid #1a1a1a', borderBottom: 'none',
          padding: '12px 16px', background: '#fff',
          display: 'flex', gap: 24, flexWrap: 'wrap',
        }}>
          {[['Role', project.meta.role], ['Team', project.meta.team], ['Tools', project.meta.tools]]
            .filter(([, v]) => v)
            .map(([label, val]) => (
              <div key={label} style={{ fontSize: 12 }}>
                <span style={{ fontWeight: 'bold', color: '#1a1a1a' }}>{label}: </span>
                <span style={{ color: '#555' }}>{val}</span>
              </div>
            ))}
        </div>
      )}

      {/* ── WHAT I BUILT ── */}
      <div style={{ border: '2px solid #1a1a1a', borderBottom: 'none', background: '#fff' }}>
        <div style={{
          padding: '8px 16px', borderBottom: '2px solid #1a1a1a',
          background: '#f5f0e8', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: project.color, fontSize: 12, fontWeight: 'bold' }}>{'>>'}</span>
          <span style={{ fontSize: 12, fontWeight: 'bold', color: '#1a1a1a', letterSpacing: '0.04em' }}>What I Built</span>
        </div>
        <ul style={{ margin: 0, padding: '12px 16px 12px 28px' }}>
          {detailSentences.map((s, i) => (
            <li key={i} style={{ fontSize: 13, lineHeight: 1.75, color: '#333', marginBottom: i < detailSentences.length - 1 ? 6 : 0 }}>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* ── SCREENSHOT GALLERY ── */}
      {images.length > 1 && (
        <div style={{ border: '2px solid #1a1a1a', borderBottom: 'none', background: '#fff' }}>
          <div style={{
            padding: '8px 16px', borderBottom: '2px solid #1a1a1a',
            background: '#f5f0e8', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: project.color, fontSize: 12, fontWeight: 'bold' }}>{'>>'}</span>
            <span style={{ fontSize: 12, fontWeight: 'bold', color: '#1a1a1a', letterSpacing: '0.04em' }}>Screenshots</span>
            <span style={{ fontSize: 10, color: '#888', marginLeft: 4 }}>click to zoom</span>
          </div>
          <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {images.slice(1).map((src, i) => (
              <GalleryThumb
                key={src}
                src={src}
                alt={`${project.title} — screenshot ${i + 2}`}
                accentColor={project.color}
                onClick={() => openZoom(src, `${project.title} — screenshot ${i + 2}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── BOTTOM ACCENT CAP ── */}
      <div style={{ border: '2px solid #1a1a1a', borderTop: 'none', height: 4, background: project.color }} />
    </div>
  );
}

function GalleryThumb({ src, alt, accentColor, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); sounds.hover(); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `2px solid ${hovered ? accentColor : '#1a1a1a'}`,
        overflow: 'hidden',
        cursor: 'zoom-in',
        position: 'relative',
        height: 90,
        background: '#111',
        transition: 'border-color 0.1s, box-shadow 0.1s',
        boxShadow: hovered ? `2px 2px 0 ${accentColor}` : '2px 2px 0 #1a1a1a',
      }}
    >
      {!errored ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.15s ease',
          }}
          onError={() => setErrored(true)}
        />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#444', fontSize: 10 }}>
          no image
        </div>
      )}
      {hovered && !errored && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 18 }}>⊕</span>
        </div>
      )}
    </div>
  );
}