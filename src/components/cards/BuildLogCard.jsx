import React from 'react';

const logs = [
  { 
    date: 'JUN 2026', 
    entry: "Portfolio rebuilt from the ground up — window system, sound effects, card interactions, the complete package. Worth every hour.",
    pinned: true,
    project: "Portfolio"
  },
  { 
    date: 'MAY 2026', 
    entry: "Shipped ai-assistant-vector-engine — custom C++ HNSW engine with Node.js backend. Fast semantic retrieval that actually works.",
    pinned: true,
    project: "AI Assistant Vector Engine"
  },
  { 
    date: 'APR 2026', 
    entry: "InceptaX went live — production-grade hackathon platform with GitHub integration and AI-powered feedback. Admin portal, submissions, the full stack.",
    pinned: true,
    project: "InceptaX"
  },
  { 
    date: 'MAR 2026', 
    entry: "am-i-hireable shipped. GitHub + LeetCode scanner that tells you straight-up if you're hireable in India. No filter, no sugarcoating.",
    pinned: true,
    project: "am-i-hireable"
  },
  { 
  date: 'FEB 2026', 
  entry: "ai-spend-audit shipped — track and optimize AI API costs across Claude, OpenAI, Anthropic. Real-time dashboards that actually save money.",
  pinned: true,
  project: "AI Spend Audit"
},
{ 
  date: 'JAN 2026', 
  entry: "E-commerce platform built and deployed. Full stack with payments, inventory, and order management. First time selling anything digital.",
  pinned: true,
  project: "E-commerce Platform"
},
];

export default function BuildLogCard() {
  return (
    <div>
      <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
        A running log of what I am building, breaking, and thinking about.
      </p>
      <div>
        {logs.map((log, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: 12,
            marginBottom: 14,
            paddingBottom: 14,
            borderBottom: i < logs.length - 1 ? '1px dashed #ddd' : 'none',
          }}>
            <div style={{
              minWidth: 70,
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: 10,
              color: '#fff',
              background: '#ff2d78',
              padding: '2px 4px',
              height: 'fit-content',
              textAlign: 'center',
            }}>
              {log.date}
            </div>
            <p style={{ fontSize: 12, color: '#333', lineHeight: 1.6 }}>{log.entry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
