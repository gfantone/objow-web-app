import {Radio} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        color: '#FFB347'
    },
    checked: {
        color: '#FFB347 !important'
    }
}

export default withStyles(styles)(Radio)