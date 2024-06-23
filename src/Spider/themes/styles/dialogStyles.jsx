import {neutralColors} from '../colors';

const linkStyles = {
    MuiDialog: {
        root: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            gap: '32px',
        },
        paper: {
            background: neutralColors.neutralWhite,
            borderRadius: '16px',
            gap: '32px',
            padding: '32px',
        }
    },
    MuiDialogActions: {
        root: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
        }
    },
    MuiDialogContent: {
        root: {
            padding: 0,
        }
    },
    MuiDialogContentText: {
        root: {
            color: neutralColors.neutral900,
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            textAlign: 'center',
        }
    },
    MuiDialogTitle: {
        root: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap:'8px',
            padding: 0,
        }
    },
};
export default linkStyles;
