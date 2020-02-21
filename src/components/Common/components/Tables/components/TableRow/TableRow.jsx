import {TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        '& > td, & > th': {
            padding: 8
        },
        '& > td:first-child, & > th:first-child': {
            paddingLeft: 16
        },
        '& > td:last-child, & > th:last-child': {
            paddingRight: 16
        }
    }
}

export default withStyles(styles)(TableRow)