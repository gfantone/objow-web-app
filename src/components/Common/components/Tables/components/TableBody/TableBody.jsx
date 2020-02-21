import {TableBody} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        '& > tr:last-child > td': {
            borderBottom: 'none'
        }
    }
}

export default withStyles(styles)(TableBody)