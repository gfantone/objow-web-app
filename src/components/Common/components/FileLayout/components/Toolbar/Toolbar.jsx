import { Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    padding: 0,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
};

export default withStyles(styles)(Toolbar);
