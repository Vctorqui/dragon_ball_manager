import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const colors = {
  primary: {
    main: '#000000',
    light: '#1E3E62',
    dark: '',
  },
  secondary: {
    main: '#FF6500',
    light: '#EEEEEE',
  },
  text: {
    primary: '#EEEEEE',
    secondary: '#FF6500',
  },
  backgroundOrange: {
    orange: '#FF6500',
  },
}

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: colors.primary.main,
        light: colors.primary.light,
      },
      secondary: {
        main: colors.secondary.main,
        light: colors.secondary.light,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
    typography: {
      fontFamily: ['Segoe-ui', 'Helvetica', 'Arial', 'Nulshock'].join(','),
      h1: {
        fontSize: '4.375rem',
        fontFamily: 'Saiyan-Sans',
        fontWeight: 100,
      },
      h2: {
        fontFamily: 'Saiyan-Sans',
        fontWeight: 100,
      },
      h3: {
        fontFamily: 'Saiyan-Sans',
        fontWeight: 100,
      },
      h4: {
        fontFamily: 'Arial',
      },
      h5: {
        fontFamily: 'Arial',
      },
      h6: {
        fontFamily: 'Arial',
      },
      button: {
        fontSize: 12,
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            ':disabled': {
              background: 'rgba(0, 0, 0, 0.12)',
            },
          },
          containedPrimary: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            height: '40px',
            border: '2px solid #FF6500',
            boxShadow: '4px 4px #323232',
            fontSize: '16px',
            fontWeight: 600,
            color: colors.text.primary,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            transition: 'all .2s ease-out,color .2s',
            '&::before': {
              content: `''`,
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%',
              width: '0',
              backgroundColor: '#FF6500',
              zIndex: -1,
              WebkitBoxShadow: '4px 8px 19px -3px rgba(0, 0, 0, 0.27)',
              boxShadow: '4px 8px 19px -3px rgba(0, 0, 0, 0.27)',
              transition: 'all 250ms',
            },
            '&:hover': { color: '#323232' },
            '&:hover::before': { width: '100%' },
          },
          outlinedPrimary: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            height: '40px',
            border: '2px solid #FF6500',
            backgroundColor: '#FF6500',
            boxShadow: '4px 4px #323232',
            fontSize: '16px',
            fontWeight: 600,
            color: '#323232',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            transition: 'all .2s ease-out,color .2s ease-out',
            '&::before': {
              content: `''`,
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%',
              width: '0',
              backgroundColor: '#212121',
              zIndex: -1,
              WebkitBoxShadow: '4px 8px 19px -3px rgba(0, 0, 0, 0.27)',
              boxShadow: '4px 8px 19px -3px rgba(0, 0, 0, 0.27)',
              transition: 'all 250ms',
            },
            '&:hover': { color: '#e8e8e8' },
            '&:hover::before': { width: '100%' },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: 'white', '&.Mui-focused': { color: 'white' } },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'blue' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
        },
      },
      MuiSelect: { styleOverrides: { icon: { color: 'white' } } },
      MuiMenuItem: {
        styleOverrides: { root: { '&:hover': { backgroundColor: 'blue' } } },
      },
      MuiPaper: { styleOverrides: { root: { backgroundColor: 'black' } } },
      MuiContainer: {
        styleOverrides: {
          root: {
            width: '100%',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Saiyan-Sans';
            src: local('Nulshock'), url(/fonts/saiyan-sans/Saiyan-Sans.ttf) format('truetype');
          }
        `,
      },
    },
  })
)

export default theme
