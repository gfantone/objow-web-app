import { themeColors, gradients, neutralColors } from '../colors';

const sidebarStyles = {
  MuiDrawer: {
    root: {
      padding: '8px 8px 0px 16px',
      marginBottom: 16,
    },
    paper: {
      width: 288,
      overflow: 'auto',
      position: 'relative',
      padding: 16,
      borderRadius: 16,
    },
    paperAnchorDockedLeft: {
      borderRight: 'none',
    },
  },
  MuiListItem: {
    root: {
      borderRadius: 16,
      height: 40,
      '&:not(:last-child)': {
        marginBottom: 8,
      },
      transition: 'background-color 0.3s, color 0.3s',
      '&.Mui-selected': {
        background: gradients.gradientLeftToRight100,
        color: themeColors.primaryContrastText,
        '& .MuiListItemText-primary, & .MuiListItemIcon-root': {
          color: themeColors.primaryContrastText,
          fontWeight: 700,
          transition: 'color 0.3s',
        },
        '&:focus': {
          border: `none`,
          background: gradients.gradientLeftToRight100,
          color: themeColors.primaryContrastText,
        },
      },
      '&:focus': {
        border: `1px solid ${neutralColors.neutral450}`,
        background: neutralColors.neutralWhite,
        color: neutralColors.neutral900,
      },
    },
    button: {
      '&:hover': {
        background: gradients.gradientLeftToRight20,
        color: neutralColors.neutral900,
        '& .MuiListItemText-primary, & .MuiListItemIcon-root': {
          color: neutralColors.neutral900,
          fontWeight: 700,
          transition: 'color 0.3s',
        },
      },
      // '&:active, &.Mui-selected': {
      //   background: gradients.gradientLeftToRight100,
      //   color: themeColors.primaryContrastText,
      //   '& .MuiListItemText-primary, & .MuiListItemIcon-root': {
      //     color: themeColors.primaryContrastText,
      //     fontWeight: 700,
      //     transition: 'color 0.3s',
      //   },
      // },
    },
  },
  MuiListItemText: {
    root: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 24,
    },
  },
  MuiListItemIcon: {
    root: {
      color: 'inherit',
    },
  },
};

export default sidebarStyles;
