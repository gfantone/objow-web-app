import { Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: '#E50000',
  },
  checked: {
    color: '#E50000 !important',
  },
};

export default withStyles(styles)(Radio);
