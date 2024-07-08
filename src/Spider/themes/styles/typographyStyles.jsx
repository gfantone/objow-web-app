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
        background: gradients.gradientLeftToRight100,
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
        background: gradients.gradientLeftToRight100,
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
      h3: {
          fontWeight: 700,
          fontSize: 16,
          lineHeight: '16px',
          color: neutralColors.neutral900,
          position: 'relative',
          display: 'inline-block',
          '&.underline-left::after': {
              content: '""',
              background: gradients.gradientLeftToRight100,
              borderRadius: '40px',
              display: 'block',
              height: '4px',
              marginRight: 'auto',
              marginTop: '8px',
              width: '30px',
          },
      },
      subtitle2: {
          fontSize: '16px',
      },
    body1: {
      color: neutralColors.neutral700,
      fontSize: '14px',
    },
    body2: {
      fontSize: '12px',
    },
  },
};

export default typographyStyles;
