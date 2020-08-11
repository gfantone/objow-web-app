import {DialogContent} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        padding: 0,
        fontSize: 13,
        textAlign: 'justify',
        textTransform: 'uppercase',
        overflowX: 'hidden',
        overflowY: 'hidden'
    }
};

export default withStyles(styles)(DialogContent)
