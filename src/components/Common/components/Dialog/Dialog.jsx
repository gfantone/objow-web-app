import {Dialog} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    paper: {
        padding: 16,
        '& > div:first-child, & > form > div:first-child': {
            marginTop: 0,
            paddingTop: 0
        },
        '& > div:nth-child(2), & > div:nth-child(3), & > form > div:nth-child(2), & > form > div:nth-child(3)': {
            marginTop: 16
        }
    }
};

export default withStyles(styles)(Dialog)
