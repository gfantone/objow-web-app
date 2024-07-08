import { neutralColors, themeColors } from '../colors';
const tableDataStyles = {
  MuiTableContainer: {
    root: {
      overflow: 'hidden',
      boxShadow: 'none',
      borderRadius: '16px',
      border: `1px solid ${neutralColors.neutral100}`,
      marginTop: 16,
    },
  },
  MuiTableHead: {
    root: {
      backgroundColor: neutralColors.neutral100,

      '& .MuiTableCell-head': {
        color: neutralColors.neutral900,
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '24px',
      },
    },
  },
  MuiTableCell: {
    root: {
      color: neutralColors.neutral900,

      fontSize: '14px',
      lineHeight: '24px',
      borderBottom: `1px solid ${neutralColors.neutral100}`,
    },
  },
};
export default tableDataStyles;
