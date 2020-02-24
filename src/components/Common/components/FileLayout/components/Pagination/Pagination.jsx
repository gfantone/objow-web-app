import Pagination from '@material-ui/lab/Pagination'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        '& button, & div': {
            color: 'inherit'
        },
        '& .Mui-selected, & .Mui-selected:hover': {
            backgroundColor: '#00E58D'
        }
    }
};

export default withStyles(styles)(Pagination)
