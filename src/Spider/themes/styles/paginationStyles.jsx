import { themeColors } from '../colors';

const paginationStyles = {
  MuiPagination: {
    root: {
      marginTop: '24px',
      '& > *': {
        justifyContent: 'center',
      },
    },
    ul: {
      '& > li:not(:last-child)': {
        paddingRight: 8,
      },
    },
  },
  MuiPaginationItem: {
    root: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 24,
    },
    page: {
      '&:hover': {
        backgroundColor: themeColors.primaryContrastText,
        color: themeColors.secondaryRegular,
        border: `2px solid ${themeColors.secondaryRegular}`,
        borderRadius: '50%',
      },
      '&:active': {
        backgroundColor: themeColors.primaryContrastText,
        color: themeColors.secondaryRegular,
        border: `2px solid ${themeColors.secondaryRegular}`,
        borderRadius: '50%',
      },
      '&:focus': {
        backgroundColor: themeColors.primaryContrastText,
        color: themeColors.secondaryRegular,
        border: `2px solid ${themeColors.secondaryRegular}`,
        borderRadius: '50%',
      },
      '&.Mui-selected': {
        backgroundColor: themeColors.primaryContrastText,
        color: themeColors.secondaryRegular,
        border: `2px solid ${themeColors.secondaryRegular}`,
        borderRadius: '50%',
      },
    },
  },
};

export default paginationStyles;
