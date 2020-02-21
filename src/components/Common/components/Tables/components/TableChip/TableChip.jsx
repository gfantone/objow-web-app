import {Chip} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        height: 20,
        borderRadius: 10,
        background: '#103D5C',
        color: '#FFFFFF'
    },
    colorPrimary: {
        background: '#00E58D',
        color: '#FFFFFF'
    },
    label: {
        paddingLeft: 6,
        paddingRight: 6
    }
}

export default withStyles(styles)(Chip)