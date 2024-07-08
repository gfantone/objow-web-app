import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    fontSize: 13,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    padding: 'initial',
  },
};

export default withStyles(styles)(TableCell);
