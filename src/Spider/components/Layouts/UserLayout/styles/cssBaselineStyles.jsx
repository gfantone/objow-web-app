import { createTheme } from '@material-ui/core/styles';
import { neutralColors } from '../../../../themes/colors';

const cssBaselineStyles = {
  MuiCssBaseline: {
    '@global': {
      html: {
        height: '100%',
        '& body': {
          height: '100%',
          backgroundColor: neutralColors.neutralBg,
          color: neutralColors.neutral900,
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '24px',
          margin: 0,
        },
        '& #root': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
        },
        '& .ft-wrapper': {
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        },
        '& main': {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '32px 88px 24px 88px',
          [createTheme().breakpoints.down('xs')]: {
            padding: '32px 16px 24px 16px',
          },
        },
        '& footer': {
          backgroundColor: 'transparent',
          lineHeight: '16px',
          padding: '16px 16px 16px 8px',
          '& .footer-content': {
            backgroundColor: neutralColors.neutralWhite,
            borderRadius: '16px',
            padding: '16px',
          },
        },
        '& .tabs-container': {
          backgroundColor: neutralColors.neutralWhite,
          borderRadius: '24px',
        },
        '& .sidebar-root': {
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        },
        '& .sidebar-content': {
          display: 'flex',
          flex: 1,
        },
      },
    },
  },
};

export default cssBaselineStyles;
