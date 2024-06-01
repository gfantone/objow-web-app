import { Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    height: 40,
    minHeight: 'initial',
    fontSize: 16,
    color: '#555555',
    minWidth: 'initial',
    textTransform: 'none',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  selected: {
    color: '#FFFFFF',
  },
  wrapper: {
    marginTop: 2,
  },
};

export default withStyles(styles)(Tab);
