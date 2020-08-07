import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 11,
        height: 28,
        color: '#FFFFFF',
        backgroundColor: '#00E58D',
        borderRadius: 14,
        paddingLeft: 8,
        paddingTop: 0,
        paddingRight: 8,
        paddingBottom: 0,
        '&:hover': {
            backgroundColor: '#00E58D',
        }
    },
    textPrimary: {
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }
    },
    textSecondary: {
        color: '#555555',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
    }
}

export default withStyles(styles)(Button)
