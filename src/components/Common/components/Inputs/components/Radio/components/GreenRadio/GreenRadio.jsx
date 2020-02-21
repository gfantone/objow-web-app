import {Radio} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        color: '#00E58D'
    },
    checked: {
        color: '#00E58D !important'
    }
}

export default withStyles(styles)(Radio)