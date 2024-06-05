import { createTheme } from '@material-ui/core/styles';

// Base colors
//const colorBlack = '#18007C';
//const colorColdWhite = '#F1F7FF';
const colorGrayDark = '#0F172A';
const colorTransparent = 'transparent';
const colorWhite = '#FFFFFF';

// System colors
// TODO: system colors here

// Palette colors
const colorPrimaryMain = colorGrayDark;


const edenredTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: colorPrimaryMain,
        }
    },
    overrides: {
        MuiCard: {
            root: {
                backgroundColor: '#FFFFFF',
            }
        },
        MuiButton: {
            root: {
                borderRadius: '12',
            },
            containedPrimary: {
                backgroundColor: colorPrimaryMain,
                color: colorWhite,
            },
            outlinedPrimary: {
                backgroundColor: colorTransparent,
                border: `2px solid ${colorPrimaryMain}`,
                color: colorPrimaryMain,
            }
        },
    },
});

export default edenredTheme;
