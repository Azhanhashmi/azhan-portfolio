import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useCursor from './hooks/useCursor';
import CustomCursor from './components/CustomCursor';
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

// Spring config — feels physical, not floaty
const SPRING = { type: 'spring', stiffness: 280, damping: 28, mass: 0.8 };

// Card enter from right, exit to left+fade
const cardVariants = {
  initial: { opacity: 0, x: 60, scale: 0.97 },
  animate: { opacity: 1, x: 0,  scale: 1,    transition: SPRING },
  exit:    { opacity: 0, x: -40, scale: 0.96, transition: { duration: 0.18, ease: 'easeIn' } },
};

export default function App() {
  useCursor();
  useCursorTrail();

  const [openCards, setOpenCards]   = useState(['guide', 'about', 'contact', 'work', 'skills']);
  const [openProject, setOpenProject] = useState(null);
  const [lovedCount] = useState(323);

  const scrollRef  = useRef(null);   // the overflow-x container
  const prevCount  = useRef(openCards.length);

  // Auto-scroll right whenever a new card is added
  useEffect(() => {
    const isAdding = openCards.length > prevCount.current;
    prevCount.current = openCards.length;

    if (isAdding && scrollRef.current) {
      // Small delay so the card has been inserted into the DOM
      setTimeout(() => {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          behavior: 'smooth',
        });
      }, 60);
    }
  }, [openCards]);

  // Also scroll right when a project detail opens
  useEffect(() => {
    if (openProject && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          behavior: 'smooth',
        });
      }, 60);
    }
  }, [openProject]);

  function toggleCard(id) {
    setOpenCards(prev => {
      if (prev.includes(id)) {
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
    if (!openCards.includes('work')) {
      setOpenCards(prev => [...prev, 'work']);
    }
  }

  function closeProject() {
    sounds.close();
    setOpenProject(null);
  }

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
    <div style={{ width: '100vw', height: '100vh', overflow: 'visible', position: 'relative' }}>
      <CustomCursor />
      <Background />

      {/* Horizontal scrollable workspace */}
    <div
  ref={scrollRef}
  data-workspace
  style={{
    position: 'absolute',
    inset: 0,
    bottom: 52,
    overflowX: 'auto',
    overflowY: 'auto',   // ← was 'hidden', this is the main fix
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
  }}
>
         <div style={{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 16,
  padding: '40px 40px 20px 40px',
  minWidth: 'max-content',
  height: window.innerWidth < 768 ? 'auto' : '100%',
}} className="workspace-inner">
          <AnimatePresence initial={false} mode="popLayout">
            {cardOrder.map(id => {
              if (!openCards.includes(id)) return null;
              const cfg = CARD_CONFIGS[id];

              if (id === 'work') {
                return (
                  <React.Fragment key="work-group">
                    <motion.div
                      key="work"
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      layout
                      layoutId="work"
                      style={{ flexShrink: 0 }}
                    >
                      <Card title={cfg.title} onClose={() => closeCard('work')}>
                        {CARD_CONTENT['work']}
                      </Card>
                    </motion.div>

                    <AnimatePresence mode="popLayout">
                      {openProject && (
                        <motion.div
                          key={openProject}
                          variants={cardVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          layout
                          style={{ flexShrink: 0 }}
                        >
                          <ProjectDetailCard
                            projectId={openProject}
                            onClose={closeProject}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              }

              return (
                <motion.div
                  key={id}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                  layoutId={id}
                  style={{ flexShrink: 0 }}
                >
                  <Card title={cfg.title} onClose={() => closeCard(id)}>
                    {CARD_CONTENT[id]}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
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