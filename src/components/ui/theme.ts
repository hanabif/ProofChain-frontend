export const theme = {
  colors: {
    primary: '#6F26FF',
    background: '#11111B',
    text: {
      primary: '#FFFFFF',
      secondary: '#94A3B8',
    },
  },
  typography: {
    fontFamily: {
      header: '"Orbitron", sans-serif',
      body: '"Unbounded", sans-serif',
    },
  },
  spacing: {
    unit: 8,
    small: '4px',
    medium: '8px',
    large: '16px',
    xlarge: '32px',
  },
  borderRadius: {
    default: '8px',
    card: '12px',
    button: '8px',
  },
} as const;

export type Theme = typeof theme;
