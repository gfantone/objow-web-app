import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    fontSize: 21,
    color: '#FFFFFF',
    flexGrow: 1,
    textAlign: 'center',
  },
};

export default withStyles(styles)(Typography);
