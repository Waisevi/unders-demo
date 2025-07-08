import { style } from '@vanilla-extract/css';

export const root = style({
  borderRadius: '8px',
  width: '100%',
  height: '2.85em',
  border: 0,
  padding: '0 0.9em',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  transition: 'background 0.12s ease-in-out, box-shadow 0.12s ease-in-out',

  selectors: {
    '&:focus-within': {
      boxShadow: '0 0 0 2px #3b82f6',
    },
  },
});

export const input = style({
  all: 'unset',
  fontFamily: 'inherit',
  flex: 1,
  height: '100%',
  fontSize: '14px',
  color: '#1a1a1a',

  selectors: {
    '&::placeholder': {
      color: '#7e7e7e',
    },
    '&:disabled': {
      color: '#c0c0c0',
    },
  },
});
