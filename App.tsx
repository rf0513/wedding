import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Footer, TabBar, TopBar } from './components/Shell';
import Home from './pages/Home';
import Days from './pages/Days';
import Day from './pages/Day';
import Wear from './pages/Wear';
import Travel from './pages/Travel';
import Story from './pages/Story';
import RSVP from './pages/RSVP';
import Gifts from './pages/Gifts';

/** Scroll to the top on route change, or to an in-page anchor when the location carries one. */
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ block: 'start' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => (
  <LanguageProvider>
    <HashRouter>
      <ScrollManager />
      <TopBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/days" element={<Days />} />
          <Route path="/days/:id" element={<Day />} />
          <Route path="/wear" element={<Wear />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/story" element={<Story />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <TabBar />
    </HashRouter>
  </LanguageProvider>
);

export default App;
