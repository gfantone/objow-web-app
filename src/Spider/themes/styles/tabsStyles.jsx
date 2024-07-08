import {neutralColors, themeColors} from '../colors';

const buttonStyles = {
    MuiTabs: {
        root: {
            background: `linear-gradient(to bottom, transparent calc(100% - 2px), ${neutralColors.neutral300} 2px)`,
            padding: '8px 24px 0px 24px',
        },
        indicator: {
            backgroundColor: themeColors.secondaryRegular,
        },
    },
    MuiTab: {
        root: {
            color: neutralColors.neutral900,
            textAlign: 'center',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            textTransform: 'none',
            '&.Mui-selected': {
                color: themeColors.secondaryRegular
            }
        },
        textColorInherit: {
            color: neutralColors.neutral900,
        }
    },
    MuiTabPanel: {
        root: {
            padding: '32px 24px 24px 24px',
        }
    }
};

export default buttonStyles;
