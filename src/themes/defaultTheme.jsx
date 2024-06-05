// themes/darkTheme.js
import { createTheme } from '@material-ui/core/styles';

// Base colors
const colorGreen = '#06e094';
const colorWhite='#FFFFFF';

// Palette colors
const colorPrimaryMain = colorGreen;

const defaultTheme = createTheme({
    palette: {
        type: 'light',
    },
    overrides: {
        MuiButton: {
            root: {
                height: 32,
                color: '#FFFFFF',
                backgroundColor: colorPrimaryMain,
                borderRadius: 16,
                paddingLeft: 32,
                paddingTop: 0,
                paddingRight: 32,
                paddingBottom: 0,
                '&:hover': {
                    backgroundColor: colorPrimaryMain,
                },
            },
            textPrimary: {
                color: colorWhite,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
            },
            textSecondary: {
                color: '#555555',
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
            },
        },
    },
});

export default defaultTheme;
