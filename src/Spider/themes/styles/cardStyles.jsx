import {neutralColors} from '../colors';

const cardStyles = {
    MuiCard: {
        root: {
            alignItems: 'center',
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
        },
    },
};
export default cardStyles;
