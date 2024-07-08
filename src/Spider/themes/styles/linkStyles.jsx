import {systemColors, extendedColors, neutralColors} from '../colors';

const linkStyles = {
    MuiLink: {
        root: {
            color: systemColors.infoRegular,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 400,
            textDecoration: 'underline',
            '&.bold': {
                fontWeight: 700,
            },
            '&.large': {
                fontSize: 18,
            },
            '&.small': {
                fontSize: 14,
            },
            '&:hover': {
                color: systemColors.infoDark,
            },
            '&:focus': {
                color: systemColors.infoRegular,
                border: `2px solid ${systemColors.infoLight}`,
            },
            '&:active': {
                color: extendedColors.purpleRegular,
            },
            '&.disabled': {
                color: neutralColors.neutral400,
                pointerEvents: 'none',
                cursor: 'not-allowed',
            },
        },
        underlineHover: {
            textDecoration: 'underline',
        },
    },
};
export default linkStyles;
