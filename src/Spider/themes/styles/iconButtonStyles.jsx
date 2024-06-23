import {neutralColors, themeColors} from '../colors';

const iconButtonStyles = {
    MuiIconButton: {
        root: {
            border: 'none',
            borderRadius: '8px',
            boxShadow: 'none',
            padding: '4px',
            width: '32px',
            height: '32px',
            backgroundColor: themeColors.primaryRegular,
            color: themeColors.primaryContrastText,
            '&:hover': {
                backgroundColor: themeColors.primaryDark,
                boxShadow: 'none',
            },
            '&:focus': {
                border: `2px solid ${themeColors.secondaryLight}`,
            },
            '&:active': {
                backgroundColor: 'transparent',
                color: themeColors.primaryRegular,
                border: `2px solid ${themeColors.primaryRegular}`,
                boxShadow: 'none',
            },
            '&.Mui-disabled': {
                backgroundColor: neutralColors.neutral200,
                color: neutralColors.neutral400,
            },
            '& path': {
                fill: 'currentColor',
            },
        },
    },
};

export default iconButtonStyles;
