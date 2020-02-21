import {Drawer} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    paper: {
        border: 'none',
        boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)'
    }
}

export default withStyles(styles)(Drawer)