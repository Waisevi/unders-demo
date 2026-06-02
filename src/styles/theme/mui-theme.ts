import { createTheme as createMuiTheme } from '@mui/material/styles';

import vars from './tokens.json';

export const muiTheme = createMuiTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: vars.color.primary,
          backgroundImage: 'none',
          border: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        containedPrimary: {
          '&:hover': {
            backgroundColor: vars.color.primaryDark,
          },
          borderRadius: '10px',
          textTransform: 'none',
        },
        outlined: {
          borderColor: vars.color.borderLight,
          borderRadius: '10px',
          textTransform: 'none',
        },
        root: {
          fontWeight: Number(vars.typography.fontWeight.medium),
          textTransform: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          backgroundColor: vars.color.tableSurface,
          borderColor: vars.color.borderLight,
          fontWeight: Number(vars.typography.fontWeight.medium),
        },
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            caretColor: vars.color.textPrimary,
            transition: 'background-color 9999s ease-out 0s',
            WebkitBoxShadow: `0 0 0 1000px ${vars.color.surface} inset`,
            WebkitTextFillColor: vars.color.textPrimary,
          },
          '&:-webkit-autofill:focus': {
            WebkitBoxShadow: `0 0 0 1000px ${vars.color.surface} inset`,
            WebkitTextFillColor: vars.color.textPrimary,
          },
          '&:-webkit-autofill:hover': {
            WebkitBoxShadow: `0 0 0 1000px ${vars.color.surface} inset`,
            WebkitTextFillColor: vars.color.textPrimary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${vars.color.borderLight}`,
          boxShadow: '0 4px 16px rgba(20, 16, 43, 0.06)',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: vars.color.surface,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          borderBottom: `1px solid ${vars.color.borderLight}`,
          paddingBottom: '12px',
          paddingTop: '12px',
        },
        head: {
          backgroundColor: vars.color.tableSurface,
          borderBottom: `1px solid ${vars.color.borderLight}`,
          color: vars.color.textPrimary,
          fontWeight: Number(vars.typography.fontWeight.semibold),
          paddingBottom: '12px',
          paddingTop: '12px',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: `1px solid ${vars.color.borderLight}`,
          borderRadius: '12px',
          overflow: 'hidden',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          boxShadow: 'inset 0 -1px 0 0 rgba(228, 221, 246, 1)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(143, 122, 219, 0.07)',
            transition: 'background-color 0.15s ease',
          },
          '&:last-child td, &:last-child th': {
            borderBottom: 'none',
          },
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(143, 122, 219, 0.035)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
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
  shape: {
    borderRadius: Number(vars.radius.md.replace('px', '')),
  },
  spacing: (factor: number) => `${factor * 8}px`,
  typography: {
    fontFamily: vars.typography.fontFamily,
    fontSize: Number(vars.typography.fontSize.sm.match(/\d+/)?.[0]),
    h1: { fontSize: vars.typography.fontSize.xl },
    h2: { fontSize: vars.typography.fontSize.lg },
  },
});
