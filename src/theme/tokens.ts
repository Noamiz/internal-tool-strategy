export const tokens = {
  colors: {
    background: '#f5f6fa',
    surface: '#ffffff',
    surfaceAlt: '#eef1f7',
    borderSubtle: '#d7dce8',
    borderStrong: '#c3c9d9',
    textPrimary: '#0f172a',
    textMuted: '#5f6b85',
    accent: '#3b82f6',
    accentSoft: '#dbeafe',
    success: '#22c55e',
    warning: '#facc15',
    danger: '#ef4444',
    info: '#2563eb',
    shadow: 'rgba(15, 23, 42, 0.08)',
    backdrop: 'rgba(15, 23, 42, 0.55)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '18px',
    pill: '999px',
  },
  typography: {
    headingLg: '1.75rem',
    headingMd: '1.25rem',
    body: '1rem',
    label: '0.875rem',
  },
  shadow: {
    soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
    elevated: '0 18px 50px rgba(15, 23, 42, 0.12)',
  },
} as const

export type Tokens = typeof tokens

