'use client'

import {createTheme} from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// Color scheme settings
// blue/primary: #00a1fc
// pink/secondary: #FF8A8A
// yellow: #feb83d

const theme = createTheme({
    mode: 'light',
    palette: {
      primary: {
        main: '#00a1fc',
      },
      secondary: {
        main: '#feb83d',
      },
      text: {
        primary: 'rgba(7,70,86,0.94)',
        secondary: 'rgba(37,45,47,0.6)',
        disabled: 'rgba(37,45,47,0.4)',
      },
    },
    typography: {
        fontFamily: [
            'Arial',
            'Montserrat',
            'Poppins',
            'Helvetica',
            'sans-serif',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
        ].join(','),
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontWeight: 600,
            fontSize: '3rem',
            // lineHeight: 1.167,
        },
        h2: {
            fontWeight: 600,
            fontSize: '2.25rem',
            // lineHeight: 1.2
        },
        h3: {
            fontWeight: 400,
            fontSize: '3rem',
            // lineHeight: 1.167,
        },
        h4: {
            fontWeight: 400,
            fontSize: '2.125rem',
            // lineHeight: 1.235,
        },
        h5: {
            fontWeight: 400,
            fontSize: '1.25rem',
            // lineHeight: 1.334,
        },
        h6: {
            fontWeight: 500,
            fontSize: '1rem',
            // lineHeight: 1.6,
        }
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: {variant: 'contained'},
                    style: {
                        color: '#fff',
                        border: '1px solid',
                        boxShadow: '2px 2px 4px 0 rgba(1, 35, 54, 0.25)',

                    }
                },
            ],
            styleOverrides: {
            root: {
                borderRadius: 16,
                color: '#fff',
            },
            },
        },
    },
    //     MuiCard: {
    //         styleOverrides: {
    //         root: {
    //             borderRadius: 16,
    //             boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    //             backdropFilter: 'blur(4px)',
    //             border: '1px solid rgba(255, 255, 255, 0.18)',
    //         },
    //         },
    //     },
    // },
    // transitions: {
    //     easing: {
    //         easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    //         easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    //         easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    //         sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    //     },
    //     duration: {
    //         shortest: 150,
    //         shorter: 200,
    //         short: 250,
    //         standard: 300,
    //         complex: 375,
    //         enteringScreen: 225,
    //         leavingScreen: 195
    //     }
    // }
  });

export default theme;
