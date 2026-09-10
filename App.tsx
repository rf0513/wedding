import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Story from './pages/Story';
import Events from './pages/Events';
import Registry from './pages/Registry';
import Traditions from './pages/Traditions';
import Travel from './pages/Travel';
import RSVP from './pages/RSVP';
import QnA from './pages/QnA';
import { LanguageProvider } from './contexts/LanguageContext';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="font-sans text-wedding-cream bg-wedding-ink antialiased selection:bg-wedding-gold selection:text-wedding-ink">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<Story />} />
              <Route path="/traditions" element={<Traditions />} />
              <Route path="/schedule" element={<Events />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/qna" element={<QnA />} />
              <Route path="/rsvp" element={<RSVP />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;