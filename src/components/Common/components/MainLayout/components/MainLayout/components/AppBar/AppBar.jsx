import { AppBar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
};

export default withStyles(styles)(AppBar);
