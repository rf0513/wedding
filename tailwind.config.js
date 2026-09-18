/** @type {import('tailwindcss').Config} */
// NOTE: colour opacity modifiers must be a multiple of 5 (e.g. bg-wedding-ink/95).
// Tailwind's opacity scale runs in steps of 5, so a class like `/96` or `/72` is
// silently dropped. Use an arbitrary value — `/[.96]` — if you need finer.
export default {
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}', './contexts/**/*.{ts,tsx}', './constants.ts'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Marcellus', 'serif'],
        sans: ['"Josefin Sans"', 'sans-serif'],
        italic: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        wedding: {
          ink: '#0C0B0A',       // Nero Marquina — warm black marble ground
          cream: '#F2EFE9',     // Calacatta — white marble
          gold: '#C8A75C',      // Brass
          goldLight: '#E2C88A', // Polished brass highlight
          bronze: '#7D6836',    // Aged brass (labels on white marble)
          pine: '#1B1A18',      // Charcoal — secondary dark surface
          marble: '#D9D3C7',    // Grey marble veining
        },
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        marquee: 'marquee 34s linear infinite',
        heroIn: 'heroIn 1.2s cubic-bezier(.2,.7,.2,1) both',
        frameIn: 'frameIn 1.4s cubic-bezier(.2,.7,.2,1) both',
        spinSlow: 'spin 240s linear infinite',
        raysIn: 'raysIn 2.4s cubic-bezier(.2,.7,.2,1) both',
      },
      keyframes: {
        fadeInDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        heroIn: { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'none' } },
        frameIn: { from: { opacity: '0', transform: 'scale(.97)' }, to: { opacity: '1', transform: 'none' } },
        raysIn: { from: { opacity: '0', transform: 'scale(.6)' }, to: { opacity: '1', transform: 'none' } },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
    },
  },
  plugins: [],
};
