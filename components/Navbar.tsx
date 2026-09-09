import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_story'), path: '/story' },
    { name: t('nav_events'), path: '/schedule' },
    { name: t('nav_travel'), path: '/travel' },
    { name: t('nav_traditions'), path: '/traditions' },
    { name: t('nav_qna'), path: '/qna' },
    { name: t('nav_registry'), path: '/registry' },
  ];

  // Logic: Navbar should have background if scrolled OR if menu is open on mobile
  const showBackground = scrolled || isOpen;

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    showBackground ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-4 md:py-6'
  }`;

  const isHome = location.pathname === '/';
  
  // Text color logic:
  // If menu is OPEN, text is always dark (because bg is white).
  // If NOT open:
  //   - If scrolled or not home: Dark.
  //   - If home top: White.
  const forceDark = isOpen || scrolled || !isHome;

  const textClasses = forceDark
    ? 'text-wedding-charcoal' 
    : 'text-wedding-charcoal lg:text-white';
    
  const logoColor = forceDark
    ? 'text-wedding-rani' 
    : 'text-wedding-rani lg:text-white';
    
  const buttonColor = forceDark
    ? 'text-wedding-rani'
    : 'text-white'; // On mobile home top, it should be white.

  const langButtonClasses = forceDark
    ? 'border-wedding-charcoal text-wedding-charcoal hover:bg-wedding-charcoal hover:text-white'
    : 'border-white text-white hover:bg-white hover:text-wedding-charcoal';

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className={`font-serif text-3xl tracking-widest font-bold ${logoColor} relative z-50`}>
              P <span className="text-wedding-gold">&</span> R
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-widest hover:text-wedding-rani transition-colors font-semibold ${
                  location.pathname === link.path 
                    ? 'text-wedding-rani border-b-2 border-wedding-rani' 
                    : textClasses
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* RSVP Button (Highlighted) */}
             <Link
                to="/rsvp"
                className="bg-wedding-rani hover:bg-pink-700 text-white text-xs px-5 py-2 rounded-full font-bold uppercase tracking-widest shadow-md transition-all hover:scale-105"
             >
                {t('nav_rsvp')}
             </Link>
            
            {/* Language Toggle Desktop */}
            <button 
                onClick={toggleLanguage}
                className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${langButtonClasses}`}
            >
                <Globe size={14} />
                <span>{language === 'en' ? 'ES' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4 relative z-50">
            <button 
                onClick={toggleLanguage}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${langButtonClasses}`}
            >
                <span>{language === 'en' ? 'ES' : 'EN'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 focus:outline-none transition-colors ${buttonColor}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg animate-fade-in-down border-t-2 border-gray-100 h-[calc(100vh-70px)] overflow-y-auto">
          <div className="px-4 py-8 space-y-4 flex flex-col items-center justify-center min-h-full">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 text-xl font-serif font-bold text-wedding-charcoal hover:text-wedding-rani transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
                to="/rsvp"
                className="block px-10 py-4 mt-6 bg-wedding-rani text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-lg transform hover:scale-105 transition-transform"
             >
                {t('nav_rsvp')}
             </Link>
            <div className="pt-8 pb-4">
              <Heart className="text-wedding-rani" size={24} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;