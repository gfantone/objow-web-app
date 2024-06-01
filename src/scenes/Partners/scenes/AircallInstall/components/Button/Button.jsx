import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    height: 32,
    color: '#FFFFFF',
    backgroundColor: '#00E58D',
    borderRadius: 16,
    paddingLeft: 24,
    paddingTop: 0,
    paddingRight: 24,
    paddingBottom: 0,
    '&:hover': {
      backgroundColor: '#00E58D',
    },
  },
  textPrimary: {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  textSecondary: {
    backgroundColor: '#2B2E45',
    '&:hover': {
      backgroundColor: '#2B2E45',
    },
  },
};

export default withStyles(styles)(Button);
