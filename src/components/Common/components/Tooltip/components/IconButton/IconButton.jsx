import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: '#FFFFFF',
    backgroundColor: '#00E58D',
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#00E58D',
    },
  },
};

export default withStyles(styles)(IconButton);
