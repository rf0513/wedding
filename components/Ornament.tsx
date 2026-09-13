import React from 'react';
const Ornament: React.FC<{ short?: boolean }> = ({ short }) => <div className={`orn ${short ? 'short' : ''}`} aria-hidden="true"><i /></div>;
export default Ornament;
