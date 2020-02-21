import {CardMedia} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        width: '100%',
        paddingTop: '31%',
        backgroundSize: 'contain',
        backgroundPosition: 'right'
    }
};

export default withStyles(styles)(CardMedia)
