import {neutralColors, systemColors, themeColors} from '../colors';

const buttonStyles = {
    MuiButton: {
        root: {
            borderRadius: '16px',
            boxShadow: 'none',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '700',
            textTransform: 'none',
            transition: 'none',
        },
        containedPrimary: {
            backgroundColor: themeColors.primaryRegular,
            color: themeColors.primaryContrastText,
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: themeColors.primaryDark,
                boxShadow: 'none',
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
            '&.size-tiny': {
                borderRadius: '8px',
                padding: '4px 8px',
                '&.icon': {
                    minWidth: 0,
                    padding: '4px',
                }
            }
        },
        containedSizeLarge: {
            padding: '16px 24px',
            '&:active': {
                padding: '14px 22px',
            }
        },
        containedSizeSmall: {
            borderRadius: '8px',
            fontSize: 14,
            padding: '8px 12px',
            '&:active': {
                padding: '6px 10px',
            }
        },
        outlinedPrimary: {
            backgroundColor: 'transparent',
            border: `2px solid ${themeColors.primaryRegular}`,
            color: themeColors.primaryRegular,
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: 'transparent',
                color: themeColors.primaryLight,
                border: `2px solid ${themeColors.primaryDark}`,
            },
            '&:focus': {
                backgroundColor: 'transparent',
                color: themeColors.primaryRegular,
                border: `2px solid ${systemColors.infoLight}`,
            },
            '&:active': {
                backgroundColor: themeColors.primaryDark,
                border: `2px solid ${themeColors.primaryDark}`,
                color: themeColors.primaryContrastText,
            },
            '&.Mui-disabled': {
                backgroundColor: neutralColors.neutralBg,
                border: `2px solid ${neutralColors.neutral300}`,
                color: neutralColors.neutral400,
            },
        },
        outlinedSizeLarge: {
            padding: '14px 22px',
        },
        outlinedSizeSmall: {
            borderRadius: '8px',
            fontSize: 14,
            padding: '6px 10px',
        },
    },
};

export default buttonStyles;
