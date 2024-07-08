import { themeColors, neutralColors } from '../colors';

const selectStyles = {
  MuiSelect: {
    selectMenu: {
      minWidth: 70,
      height: 32,
      margin: '0 8px',
      border: `2px solid ${neutralColors.neutral450}`,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      boxSizing: 'border-box',
      minHeight: 19,
      fontSize: 12,
    },
    select: {
      '&:focus': {
        borderRadius: 8,
        backgroundColor: neutralColors.neutralWhite,
      },
    },
    icon: {
      color: themeColors.secondaryRegular,
      top: `calc(50% - 13px)`,
      width: 26,
      height: 26,
      right: 15,
    },
  },

  MuiTypography: {
    body1: {
      color: neutralColors.neutral900,
      fontFamily: 'Ubuntu',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '24px',
    },
  },
};
export default selectStyles;
