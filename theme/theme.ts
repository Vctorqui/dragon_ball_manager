import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const colors = {
  primary: {
    main: '#000000',
    light: '#1E3E62',
    dark: '',
  },
  secondary: {
    main: '#0B192C',
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
    },
    typography: {
      fontFamily: ['Segoe-ui', 'Helvetica', 'Arial', 'Nulshock'].join(','),
      h1: {
        fontSize: '4.375rem',
        fontFamily: 'Nulshock',
      },
      h2: {
        fontFamily: 'Nulshock',
      },
      h3: {
        fontFamily: 'Nulshock',
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
            font-family: 'Nulshock';
            src: local('Nulshock'), url(/fonts/nulshock.ttf) format('truetype');
          }
          @font-face {
            font-family: 'Segoe-ui';
            font-weight: 400;
            src: local('Segoe-ui'), url(/fonts/segoe/segoe-ui.ttf) format('truetype');
          }
          @font-face {
            font-family: 'Segoe-ui';
            font-weight: 700;
            src: local('Segoe-ui'), url(/fonts/segoe/segoe-ui-bold.ttf) format('truetype');
          }
          @font-face {
            font-family: 'Courier';
            font-weight: 400;
            src: local('Courier'), url(/fonts/courier-prime/CourierPrime-Regular.ttf) format('truetype');
          }
          @font-face {
            font-family: 'Courier';
            font-weight: 400;
            font-style: italic;
            src: local('Courier'), url(/fonts/courier-prime/CourierPrime-Italic.ttf) format('truetype');
          }
          @font-face {
            font-family: 'Courier';
            font-weight: 700;
            src: local('Courier'), url(/fonts/courier-prime/CourierPrime-Bold.ttf) format('truetype');
          }
          @font-face {
            font-family: 'Courier';
            font-weight: 700;
            font-style: italic;
            src: local('Courier'), url(/fonts/courier-prime/CourierPrime-BoldItalic.ttf) format('truetype');
          }
        `,
      },
    },
  })
)

export default theme
