import {createTheme} from "@material-ui/core/styles";
import {neutralColors} from '../colors';

const appBarStyles = {
    MuiAppBar: {
        root: {
            padding: '16px 16px 8px 16px',
            '&.fullwidth': {
                padding: 0,
                '& .MuiToolbar-root': {
                    borderRadius: 0,
                    padding: '16px 88px !important',
                    [createTheme().breakpoints.down('sm')]: {
                        padding: '16px 8px 16px 24px !important',
                    }
                }
            }
        },
        colorPrimary: {
            backgroundColor: 'transparent',
            '& .MuiToolbar-root': {
                backgroundColor: neutralColors.neutralWhite,
            }
        }
    },
    MuiToolbar: {
        root: {
            borderRadius: '16px',
            padding: '16px !important'
        }
    }
};

export default appBarStyles;
