import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3em',
  marginBottom: '1rem',
});

export const label = style({
  fontSize: '14px',
});

export const error = style({
  fontSize: '12px',
  color: '#FFA726',
});
