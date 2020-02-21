import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        height: 32,
        color: '#FFFFFF',
        backgroundColor: '#00E58D',
        borderRadius: 16,
        paddingLeft: 32,
        paddingTop: 0,
        paddingRight: 32,
        paddingBottom: 0,
        '&:hover': {
            backgroundColor: '#00E58D',
        }
    },
    secondary: {
        color: '#FFFFFF',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
    },
    textSecondary: {
        color: '#555555',
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
};

export default withStyles(styles)(Button)
