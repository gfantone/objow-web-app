import {neutralColors} from '../colors';

const cardStyles = {
    MuiCard: {
        root: {
            alignItems: 'center',
<<<<<<< HEAD
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            backgroundColor: neutralColors.neutralWhite,
            padding: '48px',
            borderRadius: '24px',
            maxWidth: '616px',
            boxShadow: 'none',
            margin: '24px auto',
            textAlign: 'center',
=======
            backgroundColor: neutralColors.neutralWhite,
            borderRadius: '16px',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            '&.selectable': {
                boxShadow: '0px 6px 10px 2px rgba(10, 31, 94, 0.12)',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-3px)',
                },
            },
            padding: 'initial'
>>>>>>> dev
        },
    },
};
export default cardStyles;
