import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageZoom({ src, alt, onClose }) {
  // close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99998,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            cursor: 'zoom-out',
          }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{    scale: 0.92, opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '88vh',
              border: '2px solid #1a1a1a',
              boxShadow: '8px 8px 0 #1a1a1a',
              background: '#000',
            }}
          >
            {/* title bar */}
            <div style={{
              background: '#1a1a1a',
              padding: '5px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#f5f0e8', letterSpacing: '0.05em' }}>
                {alt}
              </span>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid #555',
                  color: '#f5f0e8',
                  width: 20, height: 20,
                  cursor: 'pointer',
                  fontSize: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Share Tech Mono, monospace',
                }}
              >
                ✕
              </button>
            </div>

            <img
              src={src}
              alt={alt}
              style={{
                display: 'block',
                maxWidth: '90vw',
                maxHeight: 'calc(88vh - 34px)',
                objectFit: 'contain',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}