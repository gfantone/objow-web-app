import { createTheme } from '@material-ui/core/styles';
import { gradients, neutralColors } from '../colors';

const typographyStyles = {
  typography: {
    color: neutralColors.neutral900,
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
    h1: {
      fontWeight: 700,
      fontSize: 32,
      lineHeight: '40px',
      color: neutralColors.neutral900,
      position: 'relative',
      display: 'inline-block',
      [createTheme().breakpoints.down('xs')]: {
        fontSize: 24,
      },
      '&.underline-center::after': {
        content: '""',
        background: gradients.gradientLeftToRight,
        borderRadius: '90px',
        display: 'block',
        height: '4px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '8px',
        width: '30px',
      },
      '&.underline-left::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: '-4px',
        width: '80px',
        height: '2px',
        background: gradients.gradientLeftToRight,
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: 18,
      lineHeight: '24px',
      color: neutralColors.neutral900,
      position: 'relative',
      display: 'inline-block',
    },
    body1: {
      color: neutralColors.neutral700,
      fontSize: '16px',
    },
    body2: {
      fontSize: '12px',
    },
  },
};

export default typographyStyles;
