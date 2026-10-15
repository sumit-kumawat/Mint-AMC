import type { Config } from 'tailwindcss';

/**
 * Mint AMC — Light-Mode Enterprise Design System
 * Primary — Mint Green: #2FA878
 * Secondary — Technology Blue: #0076CE
 * Headings — Charcoal: #1B2430
 * Main background — White: #FFFFFF
 * Section background — Cool Gray: #F4F7F9
 * Body text — Slate: #526170
 * Borders — Light Slate: #DCE4EA
 * Border Radius Standard: 8px across all components
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        none: '0px',
        sm: '8px',
        DEFAULT: '8px',
        md: '8px',
        lg: '8px',
        xl: '8px',
        '2xl': '8px',
        '3xl': '8px',
        card: '8px',
        panel: '8px',
        button: '8px',
        input: '8px',
        full: '9999px',
      },
      colors: {
        brand: {
          DEFAULT: '#2FA878',
          hover: '#268E65',
          subtle: '#EAF7F1',
        },
        secondary: {
          DEFAULT: '#0076CE',
          hover: '#005FA7',
          subtle: '#EBF5FF',
        },
        accent: {
          DEFAULT: '#2FA878',
          hover: '#268E65',
          subtle: '#EAF7F1',
        },
        ink: {
          DEFAULT: '#1B2430',
          muted: '#526170',
          subtle: '#6E7E8F',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F4F7F9',
          elevated: '#FFFFFF',
        },
        line: {
          DEFAULT: '#DCE4EA',
          strong: '#C4D0DA',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: [
          'var(--font-sans)',
          'Plus Jakarta Sans',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        layout: '76rem',
        content: '68rem',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(27, 36, 48, 0.04)',
        card: '0 1px 3px 0 rgba(27, 36, 48, 0.05)',
        'card-hover': '0 4px 12px -2px rgba(27, 36, 48, 0.08)',
        header: '0 2px 8px -2px rgba(27, 36, 48, 0.05)',
        mega: '0 12px 24px -6px rgba(27, 36, 48, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
