import { createTheme as createMuiTheme } from '@mui/material/styles';

import vars from './tokens.json';

export const muiTheme = createMuiTheme({
  cssVariables: {
    cssVarPrefix: 'mui',
  },
  palette: {
    background: {
      default: vars.color.background,
      paper: vars.color.surface,
    },
    error: { main: vars.color.error },
    mode: 'light',
    primary: {
      contrastText: vars.color.primaryContrastText,
      dark: vars.color.primaryDark,
      main: vars.color.primary,
    },
    secondary: {
      dark: vars.color.secondaryDark,
      main: vars.color.secondary,
    },
    text: {
      primary: vars.color.textPrimary,
      secondary: vars.color.textSecondary,
    },
  },
  spacing: (factor: number) => `${factor * 8}px`,
  typography: {
    fontFamily: vars.typography.fontFamily,
    fontSize: Number(vars.typography.fontSize.sm.match(/\d+/)?.[0]),
    h1: { fontSize: vars.typography.fontSize.xl },
    h2: { fontSize: vars.typography.fontSize.lg },
  },
});
