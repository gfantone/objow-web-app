import {TableHead} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        backgroundColor: '#103D5C',
        borderRadiusTopLeft: 10,
        color: '#FFFFFF'
    }
}

export default withStyles(styles)(TableHead)