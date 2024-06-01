import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    height: 32,
    color: '#FFFFFF',
    backgroundColor: '#E50000',
    borderRadius: 16,
    paddingLeft: 32,
    paddingTop: 0,
    paddingRight: 32,
    paddingBottom: 0,
    '&:hover': {
      backgroundColor: '#E50000',
    },
  },
};

export default withStyles(styles)(Button);
