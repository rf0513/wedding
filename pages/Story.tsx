import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { STORY_EVENTS_EN, STORY_EVENTS_ES, STORY_MAIN_IMAGE } from '../constants';
import { Reveal, StepFrame, TileBand, PageHeader, btnGhostLight } from '../components/DecoUI';
import StoryJourney from '../components/StoryJourney';

/**
 * Our Journey, as its own page. It used to be a section on the Home scroll, where it
 * ran to roughly a third of the page's height — one full-width photo per milestone —
 * and pushed the guides, RSVP and registry a long way down. It reads better with room
 * of its own, and Home is now the practical page.
 */
const Story: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const storyEvents = language === 'en' ? STORY_EVENTS_EN : STORY_EVENTS_ES;
  const goHome = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <main className="marble-white text-wedding-ink pb-20">
      <PageHeader kicker={t('story_kicker')} title={t('story_title')} desc={t('story_desc')} />
      <TileBand />

      <div className="max-w-[760px] mx-auto px-6">
        <Reveal className="mt-12 mb-16">
          <StepFrame size={20} borderWidth={3} innerBg="#0C0B0A" innerPadding={14}>
            <img src={STORY_MAIN_IMAGE} alt="Pavitra and Ramon" className="block w-full aspect-[3/2] object-cover" />
          </StepFrame>
        </Reveal>

        {/* Milestones on an animated route: Albuquerque → Bay Area → Mumbai */}
        <StoryJourney events={storyEvents} />

        <div className="mt-16 text-center">
          <a href="#/" onClick={(e) => { e.preventDefault(); goHome(); }} className={btnGhostLight}>
            ← {t('rsvp_back_home')}
          </a>
        </div>
      </div>
    </main>
  );
};

export default Story;
