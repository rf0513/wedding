import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { STORY_EVENTS_EN, STORY_EVENTS_ES, STORY_MAIN_IMAGE } from '../constants';
import { TileBand, PageHeader, btnGhostLight } from '../components/DecoUI';
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
      {/* The photo is the header's ground rather than a framed picture sitting under
          it: as a 3:2 crop of a portrait it kept the stone and cut the two of them off
          at the bottom edge, and it read as an odd first thing on the page. */}
      <PageHeader
        kicker={t('story_kicker')}
        title={t('story_title')}
        desc={t('story_desc')}
        bgImage={STORY_MAIN_IMAGE}
        bgPosition="center 66%"
        bgAlt="Pavitra and Ramon"
      />
      <TileBand />

      <div className="max-w-[760px] mx-auto px-6 pt-14">
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
