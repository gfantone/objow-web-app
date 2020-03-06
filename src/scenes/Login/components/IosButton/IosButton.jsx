import {CardMedia} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        width: '100%',
        paddingTop: '30%',
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        cursor: 'pointer'
    }
};

export default withStyles(styles)(CardMedia)
