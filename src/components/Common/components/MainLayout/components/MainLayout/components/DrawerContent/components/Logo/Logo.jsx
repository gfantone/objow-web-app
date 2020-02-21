import {CardMedia} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        width: '100%',
        height: 100,
        backgroundSize: 'contain'
    }
}

export default withStyles(styles)(CardMedia)