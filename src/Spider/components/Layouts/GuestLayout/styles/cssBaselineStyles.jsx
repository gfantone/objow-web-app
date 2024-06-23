import {createTheme} from '@material-ui/core/styles';
import {neutralColors} from '../../../../themes/colors'

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
                '& .ft-main-top': {
                    marginBottom: '32px',
                    position: 'relative',
                },
                '& .ft-content': {
                    alignItems: 'center',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    gap: '40px',
                    justifyContent: 'center',
                },
                '& footer': {
                    backgroundColor: neutralColors.neutralWhite,
                    lineHeight: '16px',
                    padding: '24px 32px',
                },
            },
        },
    },
};

export default cssBaselineStyles;
