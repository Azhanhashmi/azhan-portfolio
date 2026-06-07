// src/App.jsx — FULL REPLACEMENT
import React, { useState } from 'react';
import Background from './components/Background';
import NavBar from './components/NavBar';
import Card from './components/Card';
import ClickSign from './components/ClickSign';
import GuideCard from './components/cards/GuideCard';
import AboutCard from './components/cards/AboutCard';
import ContactCard from './components/cards/ContactCard';
import WorkCard from './components/cards/WorkCard';
import SkillsCard from './components/cards/SkillsCard';
import ExperienceCard from './components/cards/ExperienceCard';
import BuildLogCard from './components/cards/BuildLogCard';
import ProjectDetailCard from './components/cards/ProjectDetailCard';
import useCursorTrail from './hooks/useCursorTrail';
import sounds from './hooks/useSounds';

const CARD_CONFIGS = {
  guide:      { title: '/how.to.use' },
  about:      { title: '/about.me' },
  contact:    { title: '/contact.me' },
  work:       { title: '/my.work' },
  skills:     { title: '/ethos.&.skills' },
  experience: { title: '/experience' },
  buildlog:   { title: '/build.log' },
};

export default function App() {
  useCursorTrail();

  const [openCards, setOpenCards] = useState(['guide', 'about']);
  const [openProject, setOpenProject] = useState(null); // project id
  const [lovedCount] = useState(323);

  function toggleCard(id) {
    setOpenCards(prev => {
      if (prev.includes(id)) {
        // closing work card also closes project detail
        if (id === 'work') setOpenProject(null);
        return prev.filter(c => c !== id);
      } else {
        sounds.click();
        return [...prev, id];
      }
    });
  }

  function closeCard(id) {
    if (id === 'work') setOpenProject(null);
    setOpenCards(prev => prev.filter(c => c !== id));
  }

  function openProjectDetail(projectId) {
    sounds.click();
    setOpenProject(projectId);
    // ensure work card is open
    if (!openCards.includes('work')) {
      setOpenCards(prev => [...prev, 'work']);
    }
  }

  function closeProject() {
    sounds.close();
    setOpenProject(null);
  }

  // Build ordered list: guide, about, contact, work, [project detail], skills, experience, buildlog
  const cardOrder = ['guide', 'about', 'contact', 'work', 'skills', 'experience', 'buildlog'];

  const CARD_CONTENT = {
    guide:      <GuideCard lovedCount={lovedCount} onShare={() => { try { navigator.clipboard.writeText(window.location.href); } catch {} }} />,
    about:      <AboutCard />,
    contact:    <ContactCard />,
    work:       <WorkCard onOpenProject={openProjectDetail} openProjectId={openProject} />,
    skills:     <SkillsCard />,
    experience: <ExperienceCard />,
    buildlog:   <BuildLogCard />,
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Background />

      {/* Horizontal scrollable workspace */}
      <div style={{
        position: 'absolute',
        inset: 0,
        bottom: 52,
        overflowX: 'auto',
        overflowY: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 16,
          padding: '40px 40px 20px 40px',
          minWidth: 'max-content',
          height: '100%',
        }}>
          {cardOrder.map(id => {
            if (!openCards.includes(id)) return null;
            const cfg = CARD_CONFIGS[id];

            // After work card, inject project detail card if open
            if (id === 'work') {
              return (
                <React.Fragment key="work-group">
                  <Card
                    title={cfg.title}
                    onClose={() => closeCard('work')}
                  >
                    {CARD_CONTENT['work']}
                  </Card>
                  {openProject && (
                    <ProjectDetailCard
                      key={openProject}
                      projectId={openProject}
                      onClose={closeProject}
                    />
                  )}
                </React.Fragment>
              );
            }

            return (
              <Card
                key={id}
                title={cfg.title}
                onClose={() => closeCard(id)}
              >
                {CARD_CONTENT[id]}
              </Card>
            );
          })}
        </div>
      </div>

      <ClickSign onOpen={() => {
        if (!openCards.includes('guide')) toggleCard('guide');
        if (!openCards.includes('about')) toggleCard('about');
      }} />

      <NavBar openCards={openCards} onToggle={toggleCard} />
    </div>
  );
}