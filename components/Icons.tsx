import React from 'react';

type P = { className?: string };
const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const IconHome: React.FC<P> = (p) => (<svg {...base} {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>);
export const IconDays: React.FC<P> = (p) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>);
export const IconWear: React.FC<P> = (p) => (<svg {...base} {...p}><path d="M8 4l4 2 4-2 4 4-3 2v11H7V10L4 8z" /></svg>);
export const IconPlane: React.FC<P> = (p) => (<svg {...base} {...p}><path d="M2 14l8 1 3 6 2-1-1-6 6-2 2-3-7-1-3-6-2 1 1 6-7 2z" /></svg>);
export const IconRsvp: React.FC<P> = (p) => (<svg {...base} {...p}><path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" /></svg>);
export const IconCheck: React.FC<P> = (p) => (<svg {...base} {...p}><path d="M5 12l5 5L20 7" /></svg>);
