import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollToId } from './DecoUI';

/**
 * The redesign merged Story/Schedule/Registry/RSVP into anchored sections on
 * the Home scroll. These stubs keep old deep links (e.g. shared before the
 * redesign) working by bouncing to the matching section on "/".
 */
const SectionRedirect: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
    setTimeout(() => scrollToId(sectionId), 80);
  }, [navigate, sectionId]);
  return null;
};

export default SectionRedirect;
